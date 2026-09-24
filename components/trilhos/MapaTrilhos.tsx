'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl, { type ExpressionSpecification, type GeoJSONSource } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { canAnimate } from '@/lib/motion'
import { FAMILIAS, REGIAO_CAIXA, TRILHOS, TRILHO_POR_ID, km, passa } from '@/lib/trilhos'
import { useTrilhos } from '@/lib/trilhos-estado'
import { caminho, ponto, rodar, rumo, type Caminho, type LngLat } from '@/lib/trilhos-geo'
import { PAPEL, estiloCarta } from './estiloCarta'

/**
 * A carta dos trilhos.
 *
 * Abre como uma folha em branco: o relevo sobe do papel, a câmara vem do
 * mar para a serra, e os trilhos desenham-se à tinta pela mesma ordem —
 * primeiro os do litoral, por fim os do Açor. Depois é uma carta: passa-se
 * o rato por um trilho e ele engrossa, escolhe-se e a câmara vai lá, e o
 * perfil da ficha põe um ponto no sítio exacto do percurso.
 *
 * Cada trilho tem as suas duas camadas (auréola e linha) em vez de uma
 * camada para todos: o `line-trim-offset`, que é o que desenha a linha aos
 * poucos, não aceita um valor por elemento, e o desenho em onda precisa de
 * cada trilho no seu tempo. São 80 camadas sobre a mesma fonte — o Mapbox
 * aguenta-as sem esforço, e a alternativa (reescrever a geometria a cada
 * fotograma) não aguentava.
 *
 * Sem movimento (preferência do sistema ou separador em segundo plano) a
 * carta abre já no estado final.
 */

const LARGURA: Record<string, number> = { GR: 3.4, PR: 2.6, outro: 2.1 }
const COR_LINHA: ExpressionSpecification = [
  'match',
  ['get', 'tipo'],
  'GR',
  FAMILIAS.GR.linha,
  'PR',
  FAMILIAS.PR.linha,
  FAMILIAS.outro.linha,
]

const ESTADO = (nome: string): ExpressionSpecification => ['boolean', ['feature-state', nome], false]

/** Largura pela escala, engrossada quando o trilho está em foco. */
function largura(base: number, extra = 0): ExpressionSpecification {
  const f: ExpressionSpecification = ['case', ESTADO('foco'), 1.65, 1]
  return ['interpolate', ['linear'], ['zoom'], 7, ['*', base * 0.85 + extra, f], 11, ['*', base * 1.2 + extra, f], 15, ['*', base * 1.8 + extra, f]]
}

const OPACIDADE: ExpressionSpecification = ['case', ESTADO('apagado'), 0.2, 1]

/** Onde a folha começa: sobre o mar, a poente da Figueira. */
const ABERTURA = { center: [-9.45, 40.02] as LngLat, zoom: 7.7, pitch: 12, bearing: 28 }
const INCLINACAO = 50
const RUMO = -9

const facilitar = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

/** A região enquadrada, um pouco mais perto do que o `cameraForBounds` a deixa. */
function camaraRegiao(map: mapboxgl.Map, animar: boolean): mapboxgl.EasingOptions {
  const cam = map.cameraForBounds(REGIAO_CAIXA as unknown as mapboxgl.LngLatBoundsLike, { padding: margens(), pitch: INCLINACAO, bearing: RUMO })
  return {
    ...cam,
    // Num ecrã estreito a região comprida fica miúda: aproxima-se mais e
    // deixa-se o litoral e o Açor encostarem às margens.
    zoom: (cam?.zoom ?? 8) + (window.innerWidth < 640 ? 0.55 : 0.35),
    pitch: INCLINACAO,
    bearing: RUMO,
    padding: margens(),
    duration: animar ? 1800 : 0,
  }
}

function margens(): mapboxgl.PaddingOptions {
  const w = window.innerWidth
  const h = window.innerHeight
  if (w >= 1024) return { left: Math.min(470, w * 0.38) + 24, right: 48, top: 56, bottom: 56 }
  // No telemóvel o painel vem por baixo da carta, fora dela.
  return { left: 20, right: 20, top: Math.round(h * 0.04), bottom: 20 }
}

interface Pairar {
  id: string
  x: number
  y: number
}

export default function MapaTrilhos() {
  const caixa = useRef<HTMLDivElement>(null)
  const mapaRef = useRef<mapboxgl.Map | null>(null)
  const caminhos = useRef(new Map<string, Caminho>())
  const pronto = useRef(false)
  const [rumoCarta, setRumoCarta] = useState(0)
  const [dica, setDica] = useState<Pairar | null>(null)
  const [falhou, setFalhou] = useState(false)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

  const selecionado = useTrilhos((s) => s.selecionado)
  const aPercorrer = useTrilhos((s) => s.aPercorrer)
  const posicao = useTrilhos((s) => s.posicao)
  const filtros = useTrilhos((s) => s.filtros)

  // ── Criar a carta ────────────────────────────────────────────────────
  useEffect(() => {
    if (!caixa.current || !token) return
    mapboxgl.accessToken = token
    const animar = canAnimate()
    const tracado = fetch('/data/trilhos.geojson').then((r) => r.json() as Promise<GeoJSON.FeatureCollection>)

    const map = new mapboxgl.Map({
      container: caixa.current,
      style: estiloCarta(),
      ...(animar ? ABERTURA : { bounds: REGIAO_CAIXA as unknown as mapboxgl.LngLatBoundsLike, pitch: INCLINACAO, bearing: RUMO }),
      minZoom: 7,
      maxZoom: 16,
      maxPitch: 72,
      cooperativeGestures: true,
      attributionControl: false,
      antialias: true,
      projection: 'mercator',
      locale: {
        'ScrollZoomBlocker.CtrlMessage': 'Ctrl + roda do rato para aproximar a carta',
        'ScrollZoomBlocker.CmdMessage': '⌘ + roda do rato para aproximar a carta',
        'TouchPanBlocker.Message': 'Dois dedos para mexer na carta',
      },
    })
    mapaRef.current = map
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false, visualizePitch: true }), 'bottom-right')
    map.on('error', (e) => console.warn('[MapaTrilhos]', e.error?.message ?? e))
    map.on('rotate', () => setRumoCarta(map.getBearing()))

    let cancelada = false
    let rafAbertura = 0

    map.on('load', async () => {
      let dados: GeoJSON.FeatureCollection
      try {
        dados = await tracado
      } catch {
        setFalhou(true)
        return
      }
      if (cancelada) return

      // Caminhos para andar ao longo de cada trilho (perfil, voo, cabeças).
      for (const f of dados.features) {
        const g = f.geometry as GeoJSON.LineString | GeoJSON.MultiLineString
        const partes = (g.type === 'LineString' ? [g.coordinates] : g.coordinates) as LngLat[][]
        caminhos.current.set(String(f.properties?.id), caminho(partes))
      }
      ;(map.getSource('trilhos') as GeoJSONSource).setData(dados)

      map.setTerrain({ source: 'dem', exaggeration: animar ? 0.01 : 1.5 })
      map.setFog({
        range: [1.2, 9],
        color: PAPEL,
        'high-color': '#E9E0CC',
        'horizon-blend': 0.12,
        'space-color': PAPEL,
        'star-intensity': 0,
      })

      // Auréola de papel e linha, por trilho.
      for (const t of TRILHOS) {
        const filtro: ExpressionSpecification = ['==', ['get', 'id'], t.id]
        const base = LARGURA[t.familia]
        map.addLayer({
          id: `aureola-${t.id}`,
          type: 'line',
          source: 'trilhos',
          filter: filtro,
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': PAPEL,
            'line-width': largura(base, 3),
            'line-opacity': ['case', ESTADO('apagado'), 0.25, 0.92],
            'line-trim-offset': animar ? [0, 1] : [0, 0],
          },
        })
      }
      // O brilho do escolhido fica por baixo das linhas e por cima das auréolas.
      map.addLayer({
        id: 'brilho',
        type: 'line',
        source: 'trilhos',
        filter: ['==', ['get', 'id'], ''],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#E0642C', 'line-width': 16, 'line-blur': 9, 'line-opacity': 0.45 },
      })
      for (const t of TRILHOS) {
        map.addLayer({
          id: `linha-${t.id}`,
          type: 'line',
          source: 'trilhos',
          filter: ['==', ['get', 'id'], t.id],
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': COR_LINHA,
            'line-width': largura(LARGURA[t.familia]),
            'line-opacity': OPACIDADE,
            'line-trim-offset': animar ? [0, 1] : [0, 0],
            ...(t.familia === 'outro' ? { 'line-dasharray': [2.2, 1.4] } : {}),
          },
        })
      }
      // O troço já percorrido no voo, a tinta mais viva por cima de tudo.
      map.addLayer({
        id: 'percorrido',
        type: 'line',
        source: 'trilhos',
        filter: ['==', ['get', 'id'], ''],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#F2A33A', 'line-width': 4.5, 'line-trim-offset': [0, 1] },
      })
      // A área de toque: invisível e larga, para o dedo e o rato.
      map.addLayer({
        id: 'toque',
        type: 'line',
        source: 'trilhos',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#000', 'line-width': 16, 'line-opacity': 0 },
      })
      map.addLayer({
        id: 'codigos',
        type: 'symbol',
        source: 'trilhos',
        minzoom: 11.5,
        filter: ['!=', ['get', 'codigo'], ''],
        layout: {
          'symbol-placement': 'line',
          'text-field': ['get', 'codigo'],
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': 10.5,
          'text-letter-spacing': 0.08,
          'symbol-spacing': 360,
          'text-keep-upright': true,
        },
        paint: { 'text-color': COR_LINHA, 'text-halo-color': PAPEL, 'text-halo-width': 2 },
      })
      // Cabeças da tinta na abertura, e o caminhante no perfil e no voo.
      map.addLayer({
        id: 'cabecas-brilho',
        type: 'circle',
        source: 'cabecas',
        paint: {
          'circle-radius': ['coalesce', ['get', 'r'], 9],
          'circle-color': '#F2A33A',
          'circle-blur': 0.9,
          'circle-opacity': 0.85,
          'circle-pitch-alignment': 'viewport',
        },
      })
      map.addLayer({
        id: 'cabecas',
        type: 'circle',
        source: 'cabecas',
        paint: {
          // O caminhante é maior do que as cabeças da tinta na abertura.
          'circle-radius': ['case', ['has', 'caminhante'], 6.5, 3.6],
          'circle-color': '#FFF6E4',
          'circle-stroke-color': ['case', ['has', 'caminhante'], '#14171C', COR_LINHA],
          'circle-stroke-width': ['case', ['has', 'caminhante'], 3, 2],
          'circle-pitch-alignment': 'viewport',
        },
      })

      pronto.current = true
      aplicarFiltros()
      if (useTrilhos.getState().selecionado) focar(useTrilhos.getState().selecionado, false)

      // ── Abertura ──
      if (!animar) {
        map.setPaintProperty('sombreado', 'hillshade-exaggeration', 0.62)
        map.jumpTo(camaraRegiao(map, false))
        return
      }
      map.easeTo({ ...camaraRegiao(map, true), duration: 5600, easing: (t) => 1 - Math.pow(1 - t, 3) })

      const [oeste, , leste] = REGIAO_CAIXA
      const atraso = new Map(TRILHOS.map((t) => [t.id, 1.3 + (2.9 * (t.inicio[0] - oeste)) / (leste - oeste)]))
      const DESENHO = 1.7
      const inicio = performance.now()
      let acabou = false

      const terminar = () => {
        if (acabou) return
        acabou = true
        cancelAnimationFrame(rafAbertura)
        map.setTerrain({ source: 'dem', exaggeration: 1.5 })
        map.setPaintProperty('sombreado', 'hillshade-exaggeration', 0.62)
        for (const t of TRILHOS) {
          map.setPaintProperty(`aureola-${t.id}`, 'line-trim-offset', [0, 0])
          map.setPaintProperty(`linha-${t.id}`, 'line-trim-offset', [0, 0])
        }
        ;(map.getSource('cabecas') as GeoJSONSource).setData({ type: 'FeatureCollection', features: [] })
      }
      // Quem pega na carta a meio da abertura quer a carta, não o filme.
      map.once('dragstart', terminar)
      map.once('wheel', terminar)
      map.once('touchstart', terminar)

      const quadro = (agora: number) => {
        if (acabou || cancelada) return
        const s = (agora - inicio) / 1000
        const relevo = facilitar(s / 2.6)
        map.setTerrain({ source: 'dem', exaggeration: 0.01 + 1.49 * relevo })
        map.setPaintProperty('sombreado', 'hillshade-exaggeration', 0.62 * facilitar(s / 1.8))

        const cabecas: GeoJSON.Feature[] = []
        let todos = true
        for (const t of TRILHOS) {
          const p = facilitar((s - (atraso.get(t.id) ?? 0)) / DESENHO)
          if (p < 1) todos = false
          const trim: [number, number] = [Math.min(p, 1), 1]
          map.setPaintProperty(`aureola-${t.id}`, 'line-trim-offset', trim)
          map.setPaintProperty(`linha-${t.id}`, 'line-trim-offset', trim)
          const c = caminhos.current.get(t.id)
          if (c && p > 0 && p < 1) {
            cabecas.push({ type: 'Feature', properties: { tipo: t.tipo ?? 'outro', r: 10 }, geometry: { type: 'Point', coordinates: ponto(c, p * c.total) } })
          }
        }
        ;(map.getSource('cabecas') as GeoJSONSource).setData({ type: 'FeatureCollection', features: cabecas })
        if (todos && s > 2.6) terminar()
        else rafAbertura = requestAnimationFrame(quadro)
      }
      rafAbertura = requestAnimationFrame(quadro)
    })

    // ── Rato e toque ──
    let foco: string | null = null
    const porFoco = (id: string | null) => {
      if (foco === id) return
      if (foco) map.setFeatureState({ source: 'trilhos', id: foco }, { foco: false })
      foco = id
      const sel = useTrilhos.getState().selecionado
      if (id) map.setFeatureState({ source: 'trilhos', id }, { foco: true })
      if (sel && sel !== foco) map.setFeatureState({ source: 'trilhos', id: sel }, { foco: true })
      useTrilhos.getState().pairar(id)
    }
    map.on('mousemove', 'toque', (e) => {
      const id = e.features?.[0]?.properties?.id as string | undefined
      if (!id) return
      map.getCanvas().style.cursor = 'pointer'
      porFoco(id)
      setDica({ id, x: e.point.x, y: e.point.y })
    })
    map.on('mouseleave', 'toque', () => {
      map.getCanvas().style.cursor = ''
      porFoco(null)
      setDica(null)
    })
    map.on('click', 'toque', (e) => {
      const id = e.features?.[0]?.properties?.id as string | undefined
      if (id) useTrilhos.getState().escolher(id)
    })

    const aoRedimensionar = () => map.resize()
    window.addEventListener('resize', aoRedimensionar)

    return () => {
      cancelada = true
      cancelAnimationFrame(rafAbertura)
      window.removeEventListener('resize', aoRedimensionar)
      pronto.current = false
      map.remove()
      mapaRef.current = null
    }
    // A carta cria-se uma vez; o resto do estado entra pelos efeitos abaixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  // ── Filtros ──────────────────────────────────────────────────────────
  function aplicarFiltros() {
    const map = mapaRef.current
    if (!map || !pronto.current) return
    const { filtros: f, selecionado: sel } = useTrilhos.getState()
    const visiveis = TRILHOS.filter((t) => passa(t, f) || t.id === sel).map((t) => t.id)
    const ver = new Set(visiveis)
    for (const t of TRILHOS) {
      const v = ver.has(t.id) ? 'visible' : 'none'
      map.setLayoutProperty(`aureola-${t.id}`, 'visibility', v)
      map.setLayoutProperty(`linha-${t.id}`, 'visibility', v)
    }
    const filtro: ExpressionSpecification = ['in', ['get', 'id'], ['literal', visiveis]]
    map.setFilter('toque', filtro)
    map.setFilter('codigos', ['all', ['!=', ['get', 'codigo'], ''], filtro])
  }
  useEffect(aplicarFiltros, [filtros])

  // ── Escolher um trilho ───────────────────────────────────────────────
  const anterior = useRef<string | null>(null)
  function focar(id: string | null, animar = canAnimate()) {
    const map = mapaRef.current
    if (!map || !pronto.current) return
    for (const t of TRILHOS) map.setFeatureState({ source: 'trilhos', id: t.id }, { apagado: Boolean(id) && t.id !== id, foco: t.id === id })
    map.setFilter('brilho', ['==', ['get', 'id'], id ?? ''])
    map.setFilter('percorrido', ['==', ['get', 'id'], id ?? ''])
    map.setPaintProperty('percorrido', 'line-trim-offset', [0, 1])
    aplicarFiltros()

    if (!id) {
      if (anterior.current) {
        map.easeTo(camaraRegiao(map, animar))
      }
      anterior.current = null
      return
    }
    anterior.current = id
    const t = TRILHO_POR_ID.get(id)
    if (!t) return
    // Virada a norte, com a luz de noroeste do sombreado: é assim que as
    // cartas se lêem. Um ângulo de lado ao traçado ficava bonito nas
    // planícies e escondia metade do trilho atrás da encosta na serra.
    const olhar = RUMO
    const cam = map.cameraForBounds(t.caixa as unknown as mapboxgl.LngLatBoundsLike, { padding: margens(), pitch: 52, bearing: olhar, maxZoom: 15 })
    if (cam) map.flyTo({ ...cam, pitch: 52, bearing: olhar, padding: margens(), duration: animar ? 2600 : 0, curve: 1.5, essential: true })

    // O trilho escolhido volta a desenhar-se.
    if (animar) {
      const ini = performance.now()
      const passo = (agora: number) => {
        if (useTrilhos.getState().selecionado !== id || !mapaRef.current) return
        const p = facilitar((agora - ini - 900) / 1600)
        map.setPaintProperty(`linha-${id}`, 'line-trim-offset', [p, 1])
        map.setPaintProperty(`aureola-${id}`, 'line-trim-offset', [p, 1])
        if (p < 1) requestAnimationFrame(passo)
      }
      requestAnimationFrame(passo)
    }
  }
  useEffect(() => {
    focar(selecionado)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecionado])

  // ── O ponto do perfil ────────────────────────────────────────────────
  useEffect(() => {
    const map = mapaRef.current
    if (!map || !pronto.current) return
    const fonte = map.getSource('cabecas') as GeoJSONSource | undefined
    if (!fonte) return
    const c = selecionado ? caminhos.current.get(selecionado) : null
    if (!c || posicao == null) {
      fonte.setData({ type: 'FeatureCollection', features: [] })
      if (!aPercorrer) map.setPaintProperty('percorrido', 'line-trim-offset', [0, 1])
      return
    }
    const t = TRILHO_POR_ID.get(selecionado!)
    fonte.setData({
      type: 'FeatureCollection',
      features: [{ type: 'Feature', properties: { tipo: t?.tipo ?? 'outro', r: 26, caminhante: 1 }, geometry: { type: 'Point', coordinates: ponto(c, posicao * c.total) } }],
    })
    map.setPaintProperty('percorrido', 'line-trim-offset', [Math.min(Math.max(posicao, 0), 1), 1])
  }, [posicao, selecionado, aPercorrer])

  // ── Percorrer: a câmara vai atrás do caminhante ───────────────────────
  useEffect(() => {
    const map = mapaRef.current
    if (!map || !pronto.current || !aPercorrer || !selecionado) return
    const c = caminhos.current.get(selecionado)
    if (!c) return
    const totalKm = c.total / 1000
    // Um trilho de 5 km leva ~16 s; um de 70, um minuto. Mais longo e
    // ninguém fica; mais curto e não se vê nada.
    const duracaoS = Math.min(60, Math.max(14, 9 + totalKm * 1.4))
    const zoom = Math.max(12.6, Math.min(15.2, 15.6 - Math.log2(Math.max(totalKm, 2) / 2) * 0.55))
    const olharM = Math.max(250, c.total * 0.04)
    let rumoActual = rumo(ponto(c, 0), ponto(c, olharM))
    const ini = performance.now()
    let raf = 0
    let parado = false

    const parar = () => {
      if (parado) return
      parado = true
      cancelAnimationFrame(raf)
      useTrilhos.getState().percorrer(false)
    }
    map.once('dragstart', parar)
    map.once('wheel', parar)

    const passo = (agora: number) => {
      if (parado) return
      const f = Math.min((agora - ini) / 1000 / duracaoS, 1)
      const d = f * c.total
      const aqui = ponto(c, d)
      const adiante = ponto(c, Math.min(d + olharM, c.total))
      if (d + 5 < c.total) rumoActual += rodar(rumoActual, rumo(aqui, adiante)) * 0.035
      map.jumpTo({ center: aqui, bearing: rumoActual, pitch: 66, zoom, padding: margens() })
      useTrilhos.getState().posicionar(f)
      if (f >= 1) {
        parado = true
        setTimeout(() => {
          if (useTrilhos.getState().selecionado === selecionado) {
            useTrilhos.getState().percorrer(false)
            focar(selecionado)
          }
        }, 900)
        return
      }
      raf = requestAnimationFrame(passo)
    }
    raf = requestAnimationFrame(passo)
    return () => {
      parado = true
      cancelAnimationFrame(raf)
      map.off('dragstart', parar)
      map.off('wheel', parar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aPercorrer, selecionado])

  if (!token) return null
  const dicaTrilho = dica ? TRILHO_POR_ID.get(dica.id) : null

  return (
    <div className="trilhos-carta">
      <div ref={caixa} className="trilhos-carta-mapa" />
      {/* Grão e vinheta: a carta impressa, não o ecrã. */}
      <div className="trilhos-carta-papel" aria-hidden="true" />

      <div className="trilhos-rosa" aria-hidden="true" style={{ transform: `rotate(${-rumoCarta}deg)` }}>
        <svg viewBox="-30 -30 60 60" width="52" height="52">
          <circle r="21" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          <circle r="17.5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.5" />
          <path d="M0 -26 L4.5 0 L0 5 L-4.5 0 Z" fill="currentColor" />
          <path d="M0 26 L4.5 0 L0 -5 L-4.5 0 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M-26 0 L0 3 L26 0 L0 -3 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          <text y="-24" textAnchor="middle" fontSize="7" fontStyle="italic" fill="currentColor" dy="-3">
            N
          </text>
        </svg>
      </div>

      {dicaTrilho && dica && dica.id !== selecionado && (
        <div className="trilhos-dica" style={{ left: dica.x, top: dica.y }} aria-hidden="true">
          {dicaTrilho.codigo && <span className="trilhos-dica-codigo">{dicaTrilho.codigo}</span>}
          <span className="trilhos-dica-nome">{dicaTrilho.titulo}</span>
          <span className="trilhos-dica-km">{km(dicaTrilho.distanciaKm)}</span>
        </div>
      )}

      {falhou && <p className="trilhos-carta-falha ui-note">Não foi possível carregar os traçados.</p>}
    </div>
  )
}
