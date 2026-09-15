'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Label from '@/components/ui/Label'
import DataSource from '@/components/ui/DataSource'
import { canAnimate } from '@/lib/motion'
import { fmt } from '@/lib/format'
import { published, unavailable, type Sourced } from '@/lib/provenance'
import {
  METROBUS_SECTIONS,
  METROBUS_PATHS,
  METROBUS_FETCHED_AT,
  METROBUS_OSM_BASE,
} from '@/lib/metrobus'

/**
 * A cidade vista de cima, com o Metrobus a correr por ela.
 *
 * O traçado vem congelado de `lib/metrobus.ts`: a via dedicada do sistema,
 * como está no OpenStreetMap. Onde o Metrobus partilha a rua com o resto do
 * trânsito não há via, e o traço interrompe-se — não se cose com geometria
 * inventada. Os quilómetros contam-se nessa geometria.
 *
 * Os autocarros que andam por cima são uma ILUSTRAÇÃO, e o painel di-lo. A
 * Metro Mondego não publica posições em directo nem horários abertos; a
 * velocidade é acelerada e o espaçamento escolhido para a via se ler viva.
 * Uma camada com o aspecto de um mapa de frota, sem o aviso, passaria por
 * dado — é o que o resto desta página é.
 *
 * Passageiros e estações não entram: não há contagens abertas, e o OSM só
 * tem um terço das estações marcadas.
 */

/** O Mapbox avalia as cores fora do CSS: hexadecimais literais. */
const COLOUR = {
  // O acento da marca (#B03A0B) aclarado: ao entardecer, o terracota escuro
  // perde-se no casario; este acende-se por cima dele.
  servico: '#F0612A',
  obra: '#D9C7A3',
  flow: '#FFF1DC',
  glow: '#FFC58A',
} as const

/** De onde se vê: sobre o Mondego, a olhar a Alta e a Baixa. */
const VIEW = { center: [-8.4265, 40.2075] as [number, number], zoom: 13.3, pitch: 62, bearing: -20 }

/** De onde a câmara parte: o corredor inteiro, de Coimbra-B a Serpins. */
const OVERVIEW = { center: [-8.335, 40.163] as [number, number], zoom: 10.4, pitch: 45, bearing: 40 }
const INTRO_MS = 9000

/** Graus por segundo da órbita: uma volta em seis minutos. */
const ORBIT_DEG_PER_S = 1

/**
 * O traço que corre sobre a via: o padrão [0, 4, 3] deslizado meia unidade
 * de cada vez. Trocar a lista inteira é o que o Mapbox deixa animar — o
 * `line-dasharray` não aceita deslocamento.
 */
const DASH_SEQUENCE = [
  [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
  [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5],
]
const DASH_MS = 70

/* ── Os autocarros da ilustração ──────────────────────────────────────────
   Nada daqui é medido. A velocidade é tempo acelerado (um autocarro real a
   25 km/h, a esta distância, andaria meio píxel por segundo) e o
   espaçamento é o que deixa ver meia dúzia de cada vez sobre a cidade. */

/** Modelo gerado por `scripts/build-bus-model.mjs`. */
const BUS_MODEL_URL = '/models/metrobus.glb'
const BUS_SPEED_M_S = 140
const BUS_SPACING_M: Record<string, number> = { corredor: 3200, republica: 900 }
/** Comprimento do rasto de luz atrás de cada autocarro. */
const TRAIL_M = 700
/** Nas pontas do percurso o autocarro aparece e desaparece, em vez de saltar. */
const FADE_M = 400
/** O modelo tem a frente em +X; o Mapbox mede o rumo a partir do norte. */
const BUS_HEADING_OFFSET = -90

/**
 * Escala da miniatura por zoom. À escala verdadeira, um articulado de 18 m
 * teria um píxel sobre a cidade: é por isso que é uma miniatura.
 */
const BUS_SCALE: [number, number][] = [[10, 60], [13, 16], [15, 5], [17, 1.6]]

function busScale(zoom: number): number {
  if (zoom <= BUS_SCALE[0][0]) return BUS_SCALE[0][1]
  for (let i = 1; i < BUS_SCALE.length; i++) {
    const [z0, s0] = BUS_SCALE[i - 1]
    const [z1, s1] = BUS_SCALE[i]
    if (zoom <= z1) return s0 + ((zoom - z0) / (z1 - z0)) * (s1 - s0)
  }
  return BUS_SCALE[BUS_SCALE.length - 1][1]
}

/** A mesma curva, como expressão do Mapbox — a posição e o modelo crescem juntos. */
const BUS_SCALE_EXPRESSION = [
  'interpolate', ['linear'], ['zoom'],
  ...BUS_SCALE.flatMap(([z, s]) => [z, ['literal', [s, s, s]]]),
]

/* ── Geometria sobre o percurso ──────────────────────────────────────── */

type LngLat = [number, number]
const EARTH_M = 6371008.8
const RAD = Math.PI / 180

function metres(a: LngLat, b: LngLat): number {
  const dLat = (b[1] - a[1]) * RAD
  const dLon = (b[0] - a[0]) * RAD
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_M * Math.asin(Math.sqrt(h))
}

/** Rumo de a para b, em graus a partir do norte, no sentido dos ponteiros. */
function bearing(a: LngLat, b: LngLat): number {
  const φ1 = a[1] * RAD
  const φ2 = b[1] * RAD
  const Δλ = (b[0] - a[0]) * RAD
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  return Math.atan2(y, x) / RAD
}

/** Desloca um ponto m metros no rumo dado. */
function nudge(p: LngLat, towards: number, m: number): LngLat {
  const b = towards * RAD
  return [
    p[0] + (m * Math.sin(b)) / (EARTH_M * Math.cos(p[1] * RAD)) / RAD,
    p[1] + (m * Math.cos(b)) / EARTH_M / RAD,
  ]
}

interface Track { id: string; pts: LngLat[]; cum: number[]; length: number }

const TRACKS: Track[] = METROBUS_PATHS.map(({ id, coords }) => {
  const cum = [0]
  for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + metres(coords[i - 1], coords[i]))
  return { id, pts: coords, cum, length: cum[cum.length - 1] }
})

/** Índice do segmento onde cai a distância d, por bissecção. */
function segmentAt(t: Track, d: number): number {
  let lo = 0
  let hi = t.cum.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (t.cum[mid] <= d) lo = mid
    else hi = mid
  }
  return lo
}

function pointAt(t: Track, d: number): LngLat {
  const i = segmentAt(t, d)
  const span = t.cum[i + 1] - t.cum[i] || 1
  const f = (d - t.cum[i]) / span
  const a = t.pts[i]
  const b = t.pts[i + 1] ?? a
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]
}

/** Rumo em d, medido entre 15 m atrás e 15 m à frente — não salta nos vértices. */
function headingAt(t: Track, d: number): number {
  return bearing(pointAt(t, Math.max(0, d - 15)), pointAt(t, Math.min(t.length, d + 15)))
}

/** O pedaço do percurso entre d0 e d1. */
function slice(t: Track, d0: number, d1: number): LngLat[] {
  const a = Math.max(0, d0)
  const b = Math.min(t.length, d1)
  if (b - a < 1) return []
  const out: LngLat[] = [pointAt(t, a)]
  for (let i = segmentAt(t, a) + 1; i < t.pts.length && t.cum[i] < b; i++) out.push(t.pts[i])
  out.push(pointAt(t, b))
  return out
}

/** Desvia uma linha para a direita do sentido em que é percorrida. */
function keepRight(line: LngLat[], m: number): LngLat[] {
  return line.map((p, i) => nudge(p, bearing(line[Math.max(0, i - 1)], line[Math.min(line.length - 1, i + 1)]) + 90, m))
}

interface Bus { track: Track; dir: 1 | -1; phase: number }

/**
 * Abaixo disto o percurso não leva autocarros. À escala da cidade a
 * miniatura mede ~290 m: no ramal da Praça da República (0,6 km) os dois
 * sentidos tapavam a via inteira e a frente do autocarro entrava no troço
 * em obra — lia-se serviço onde ainda não há. O ramal fica com o brilho e
 * o traço a correr.
 */
const MIN_TRACK_FOR_BUSES_M = 2000

/** Os dois sentidos desencontrados meio intervalo, para não andarem aos pares. */
const BUSES: Bus[] = TRACKS.filter((t) => t.length >= MIN_TRACK_FOR_BUSES_M).flatMap((track) => {
  const n = Math.max(1, Math.floor(track.length / (BUS_SPACING_M[track.id] ?? 3000)))
  return ([1, -1] as const).flatMap((dir) =>
    Array.from({ length: n }, (_, k) => ({ track, dir, phase: ((k + (dir === -1 ? 0.5 : 0)) / n) * track.length })),
  )
})

type Collection = GeoJSON.FeatureCollection<GeoJSON.Geometry>

/** Onde está cada autocarro, e o seu rasto, ao fim de `simS` segundos. */
function frameAt(simS: number, zoom: number): { buses: Collection; trails: Collection } {
  // Circula-se pela direita, afastado do eixo o bastante para dois
  // autocarros em miniatura se cruzarem sem se atravessarem.
  const lateral = busScale(zoom) * 1.7
  const buses: GeoJSON.Feature[] = []
  const trails: GeoJSON.Feature[] = []
  for (const bus of BUSES) {
    const L = bus.track.length
    const s = (bus.phase + simS * BUS_SPEED_M_S) % L
    const d = bus.dir === 1 ? s : L - s
    const o = Math.max(0, Math.min(1, s / FADE_M, (L - s) / FADE_M))
    const head = headingAt(bus.track, d) + (bus.dir === 1 ? 0 : 180)
    buses.push({
      type: 'Feature',
      properties: { o, rotation: [0, 0, head + BUS_HEADING_OFFSET] },
      geometry: { type: 'Point', coordinates: nudge(pointAt(bus.track, d), head + 90, lateral) },
    })
    // O rasto vai da cauda (transparente) ao autocarro (aceso).
    const tail = bus.dir === 1 ? slice(bus.track, d - TRAIL_M, d) : slice(bus.track, d, d + TRAIL_M).reverse()
    if (tail.length > 1) {
      trails.push({ type: 'Feature', properties: { o }, geometry: { type: 'LineString', coordinates: keepRight(tail, lateral) } })
    }
  }
  return {
    buses: { type: 'FeatureCollection', features: buses },
    trails: { type: 'FeatureCollection', features: trails },
  }
}

/** Cadência a que se reescrevem as posições: 30 por segundo chega. */
const FRAME_MS = 33

const emServico = METROBUS_SECTIONS.filter((s) => s.status === 'servico')
const kmEmServico = emServico.reduce((n, s) => n + s.km, 0)

export default function MetrobusAerial() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [ready, setReady] = useState(false)
  const [focus, setFocus] = useState<string | null>(null)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
  const [mapFailed, setMapFailed] = useState<string | null>(token ? null : 'Sem chave do Mapbox configurada.')

  // A geometria é datada, e o selo di-lo — não é uma leitura em directo.
  const meta: Sourced = mapFailed
    ? unavailable('Mapbox', mapFailed)
    : published(
        'OpenStreetMap',
        `Traçado de ${METROBUS_FETCHED_AT}`,
        `Via dedicada do sistema no OSM, base de ${METROBUS_OSM_BASE}. O estado de cada troço é o anunciado pela Metro Mondego.`,
      )

  useEffect(() => {
    if (!containerRef.current || !token) return
    mapboxgl.accessToken = token
    const animate = canAnimate()

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          lightPreset: 'dusk',
          showPointOfInterestLabels: false,
          showTransitLabels: false,
          showRoadLabels: false,
        },
      },
      // Com movimento, a câmara parte do corredor inteiro e desce à cidade
      // quando a secção entra no ecrã; sem ele, começa já na cidade.
      ...(animate ? OVERVIEW : VIEW),
      antialias: true,
      // É uma vista, não uma ferramenta: a roda do rato continua a fazer
      // scroll à página em vez de aproximar o mapa.
      scrollZoom: false,
    })

    map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right')
    map.on('error', (e) => {
      if (!map.isStyleLoaded()) {
        setMapFailed(e.error?.message ? `O Mapbox respondeu: ${e.error.message}` : 'O Mapbox não respondeu.')
        return
      }
      // Depois de o mapa carregar, um erro já não o deita abaixo — um modelo
      // que não chega, uma expressão mal formada. Ouvir o evento cala o aviso
      // que o Mapbox daria sozinho; sem esta linha, falhava em silêncio.
      console.warn('[Metrobus]', e.error?.message ?? e)
    })

    let frame = 0
    let dashTimer: ReturnType<typeof setInterval> | undefined
    let visible = false
    let interacting = false
    let loaded = false
    let introDone = !animate
    let flying = false

    // A descida de abertura: uma vez, na primeira vez que a secção se vê.
    const intro = () => {
      if (introDone || !loaded || !visible) return
      introDone = true
      flying = true
      map.flyTo({ ...VIEW, duration: INTRO_MS, curve: 1.2, essential: true })
      map.once('moveend', () => { flying = false })
    }

    map.on('style.load', () => {
      // O estilo Standard não traz o modelo de terreno; sem ele a Alta e o
      // vale do Mondego ficam no mesmo plano, e a vista perde o relevo que
      // é metade da cidade.
      map.addSource('mapbox-dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512 })
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.3 })

      map.addSource('metrobus', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: METROBUS_SECTIONS.map((s) => ({
            type: 'Feature',
            properties: { id: s.id, status: s.status },
            geometry: { type: 'MultiLineString', coordinates: s.coords },
          })),
        },
      })

      const inService = ['==', ['get', 'status'], 'servico'] as mapboxgl.FilterSpecification
      const inWorks = ['==', ['get', 'status'], 'obra'] as mapboxgl.FilterSpecification

      // Halo largo e difuso por baixo: é ele que faz a via brilhar ao
      // entardecer. `slot: 'top'` põe-na acima dos edifícios 3D.
      map.addLayer({
        id: 'metrobus-glow',
        type: 'line',
        source: 'metrobus',
        slot: 'top',
        filter: inService,
        paint: {
          'line-color': COLOUR.servico,
          'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 5, 16, 30],
          'line-blur': ['interpolate', ['linear'], ['zoom'], 10, 3, 16, 18],
          'line-opacity': 0.5,
          'line-emissive-strength': 1,
        },
        layout: { 'line-join': 'round', 'line-cap': 'round' },
      })

      map.addLayer({
        id: 'metrobus-line',
        type: 'line',
        source: 'metrobus',
        slot: 'top',
        filter: inService,
        paint: {
          'line-color': COLOUR.servico,
          'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 2, 16, 8],
          'line-emissive-strength': 1,
        },
        layout: { 'line-join': 'round', 'line-cap': 'round' },
      })

      // A via em obra: tracejado baço, sem halo e sem movimento — está lá,
      // mas ainda não anda nada nela.
      map.addLayer({
        id: 'metrobus-works',
        type: 'line',
        source: 'metrobus',
        slot: 'top',
        filter: inWorks,
        paint: {
          'line-color': COLOUR.obra,
          'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 1.5, 16, 5],
          'line-dasharray': [1.2, 1.4],
          'line-opacity': 0.9,
          'line-emissive-strength': 1,
        },
        layout: { 'line-join': 'round' },
      })

      // O traço claro que corre por cima da via em serviço.
      map.addLayer({
        id: 'metrobus-flow',
        type: 'line',
        source: 'metrobus',
        slot: 'top',
        filter: inService,
        paint: {
          'line-color': COLOUR.flow,
          'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 0.8, 16, 3],
          'line-dasharray': DASH_SEQUENCE[0],
          'line-opacity': 0.9,
          'line-emissive-strength': 1,
        },
        layout: { 'line-join': 'round' },
      })

      /* Os autocarros: rasto, poça de luz e o modelo por cima. */
      const first = frameAt(0, map.getZoom())
      map.addModel('metrobus-bus', BUS_MODEL_URL)
      map.addSource('metrobus-trails', { type: 'geojson', lineMetrics: true, data: first.trails })
      map.addSource('metrobus-buses', { type: 'geojson', data: first.buses })

      map.addLayer({
        id: 'metrobus-bus-trail',
        type: 'line',
        source: 'metrobus-trails',
        slot: 'top',
        paint: {
          'line-gradient': [
            'interpolate', ['linear'], ['line-progress'],
            0, 'rgba(255, 150, 90, 0)',
            0.7, 'rgba(255, 190, 130, 0.55)',
            1, 'rgba(255, 236, 205, 1)',
          ],
          'line-width': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 2, 16, 10],
          'line-opacity': ['get', 'o'],
          'line-emissive-strength': 1,
        },
        layout: { 'line-join': 'round', 'line-cap': 'round' },
      })

      map.addLayer({
        id: 'metrobus-bus-glow',
        type: 'circle',
        source: 'metrobus-buses',
        slot: 'top',
        paint: {
          'circle-radius': ['interpolate', ['exponential', 1.6], ['zoom'], 10, 7, 13, 16, 16, 44],
          'circle-color': COLOUR.glow,
          'circle-blur': 1,
          'circle-opacity': ['*', 0.6, ['get', 'o']],
          'circle-emissive-strength': 1,
          'circle-pitch-alignment': 'map',
        },
      })

      map.addLayer({
        id: 'metrobus-bus',
        type: 'model',
        source: 'metrobus-buses',
        slot: 'top',
        layout: { 'model-id': 'metrobus-bus' },
        paint: {
          'model-scale': BUS_SCALE_EXPRESSION as never,
          'model-rotation': ['get', 'rotation'] as never,
          'model-opacity': ['get', 'o'],
          'model-type': 'common-3d',
        },
      })

      loaded = true
      setReady(true)
      intro()
      if (!animate) return

      let step = 0
      dashTimer = setInterval(() => {
        if (!visible) return
        step = (step + 1) % DASH_SEQUENCE.length
        map.setPaintProperty('metrobus-flow', 'line-dasharray', DASH_SEQUENCE[step])
      }, DASH_MS)

      // Um só ciclo para tudo o que se mexe. O relógio da ilustração só
      // anda com a secção à vista: ao voltar, os autocarros estão onde
      // ficaram, em vez de terem dado um salto.
      const buses = map.getSource('metrobus-buses') as mapboxgl.GeoJSONSource
      const trails = map.getSource('metrobus-trails') as mapboxgl.GeoJSONSource
      let simS = 0
      let last = performance.now()
      let lastWrite = 0
      const tick = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.1)
        last = now
        if (visible) {
          simS += dt
          // Nunca por cima de outra animação de câmara: um salto de rumo
          // interrompe-a.
          if (!interacting && !flying && !map.isEasing()) map.setBearing(map.getBearing() + ORBIT_DEG_PER_S * dt)
          if (now - lastWrite >= FRAME_MS) {
            lastWrite = now
            const f = frameAt(simS, map.getZoom())
            buses.setData(f.buses)
            trails.setData(f.trails)
          }
        }
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })

    // Qualquer toque no mapa pára a órbita de vez — incluindo os botões de
    // zoom, que não são o canvas e por isso não disparam o `mousedown` do
    // Mapbox. Com a órbita a correr, o `setBearing` de cada fotograma
    // cortava a animação do "+" à nascença e o zoom não andava.
    const stop = () => { interacting = true }
    const container = containerRef.current
    container.addEventListener('pointerdown', stop, { capture: true })
    container.addEventListener('keydown', stop, { capture: true })

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      intro()
    }, { threshold: 0.25 })
    io.observe(containerRef.current)

    mapRef.current = map
    return () => {
      cancelAnimationFrame(frame)
      if (dashTimer) clearInterval(dashTimer)
      io.disconnect()
      container.removeEventListener('pointerdown', stop, { capture: true })
      container.removeEventListener('keydown', stop, { capture: true })
      map.remove()
      mapRef.current = null
      // O mapa seguinte nasce sem camadas: o destaque espera por ele.
      setReady(false)
    }
  }, [token])

  // Destacar um troço na legenda apaga os outros, sem os esconder.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready || !map.getLayer('metrobus-line')) return
    const pick =(on: number, off: number) =>
      (focus ? ['case', ['==', ['get', 'id'], focus], on, off] : on) as mapboxgl.DataDrivenPropertyValueSpecification<number>
    map.setPaintProperty('metrobus-line', 'line-opacity', pick(1, 0.25))
    map.setPaintProperty('metrobus-glow', 'line-opacity', pick(0.5, 0.06))
    map.setPaintProperty('metrobus-flow', 'line-opacity', pick(0.9, 0))
    map.setPaintProperty('metrobus-works', 'line-opacity', pick(0.9, 0.3))
  }, [focus, ready])

  return (
    <section id="metrobus" className="metrobus-aerial" aria-labelledby="metrobus-title">
      <div ref={containerRef} className="metrobus-aerial-map" aria-hidden="true" />

      <div className="metrobus-aerial-panel">
        <Label tone="accent">Mobilidade · Metrobus</Label>
        <h2 id="metrobus-title" className="font-display metrobus-aerial-title">
          {/* Hífen inquebrável: "Coimbra-" numa linha e "B" na seguinte lia-se mal. */}
          De Coimbra‑B a Serpins, em via própria
        </h2>

        <div className="metrobus-aerial-figures">
          <div>
            <span className="metrobus-aerial-figure">{fmt(kmEmServico, 1)}</span>
            <span className="ui-note"> km de via dedicada em serviço</span>
          </div>
        </div>

        <ul className="metrobus-aerial-legend">
          {METROBUS_SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={focus === s.id}
                onMouseEnter={() => setFocus(s.id)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(s.id)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus((f) => (f === s.id ? null : s.id))}
              >
                <span
                  className={`metrobus-aerial-swatch ${s.status === 'obra' ? 'metrobus-aerial-swatch-obra' : ''}`}
                  style={{ ['--swatch' as string]: s.status === 'obra' ? COLOUR.obra : COLOUR.servico }}
                />
                <span>
                  <strong>{s.name}</strong>
                  <span className="ui-note" style={{ display: 'block' }}>
                    {s.note} · {fmt(s.km, 1)} km
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="ui-note" style={{ margin: '0.75rem 0 0', lineHeight: 1.55 }}>
          Onde o traço se interrompe, o Metrobus partilha a rua com o resto do trânsito. Os autocarros são uma
          ilustração em tempo acelerado, não posições em directo.
        </p>

        <DataSource meta={meta} />
      </div>
    </section>
  )
}
