'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

/**
 * As paragens do roteiro no mapa, numeradas pela ordem do dia.
 *
 * A linha liga as paragens pela ordem, em recta: diz a sequência, não o
 * caminho. O trajecto a pé com as escadas da Alta não está medido, e uma
 * linha a fingir ruas seria um percurso inventado.
 *
 * O mapa não apanha a roda do rato (`cooperativeGestures`): está no meio de
 * uma página que se lê a descer.
 */

export interface ParagemMapa {
  n: number
  id: string
  nome: string
  pos: [number, number]
}

export default function MapaRoteiro({
  paragens,
  activa,
  onEscolher,
}: {
  paragens: ParagemMapa[]
  activa: string | null
  onEscolher: (id: string) => void
}) {
  const caixa = useRef<HTMLDivElement>(null)
  const marcas = useRef(new Map<string, HTMLButtonElement>())
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

  useEffect(() => {
    if (!caixa.current || !token) return
    mapboxgl.accessToken = token
    const lngLat = paragens.map((p) => [p.pos[1], p.pos[0]] as [number, number])
    const limites = lngLat.reduce((b, c) => b.extend(c), new mapboxgl.LngLatBounds(lngLat[0], lngLat[0]))

    const map = new mapboxgl.Map({
      container: caixa.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          lightPreset: 'day',
          theme: 'faded',
          showPointOfInterestLabels: false,
          showTransitLabels: false,
          showPlaceLabels: false,
          showRoadLabels: true,
        },
      },
      bounds: limites,
      fitBoundsOptions: { padding: 48 },
      cooperativeGestures: true,
      attributionControl: false,
      antialias: true,
    })
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
    map.on('error', (e) => console.warn('[MapaRoteiro]', e.error?.message ?? e))

    map.on('style.load', () => {
      map.addSource('mapbox-dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512 })
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 })
      // Com inclinação, o enquadramento inicial de `bounds` não conta com a
      // perspectiva e as paragens do sul caíam fora; volta-se a enquadrar já
      // com o ângulo final.
      map.fitBounds(limites, { padding: { top: 60, bottom: 40, left: 48, right: 48 }, pitch: 40, bearing: -12, duration: 0 })
      map.addSource('roteiro', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: lngLat } },
      })
      map.addLayer({
        id: 'roteiro-linha',
        type: 'line',
        source: 'roteiro',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#B03A0B', 'line-width': 2.2, 'line-dasharray': [0.2, 2], 'line-emissive-strength': 1 },
      })
    })

    const criadas: mapboxgl.Marker[] = []
    for (const p of paragens) {
      const el = document.createElement('button')
      el.type = 'button'
      el.className = 'roteiro-pino'
      el.textContent = String(p.n)
      el.setAttribute('aria-label', `${p.n}. ${p.nome}`)
      el.title = p.nome
      el.addEventListener('click', () => onEscolher(p.id))
      marcas.current.set(p.id, el)
      criadas.push(new mapboxgl.Marker({ element: el }).setLngLat([p.pos[1], p.pos[0]]).addTo(map))
    }

    const mapaMarcas = marcas.current
    return () => {
      criadas.forEach((m) => m.remove())
      mapaMarcas.clear()
      map.remove()
    }
    // As paragens são estáticas; o clique chega pela referência mais recente
    // através do elemento, não recria o mapa.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    for (const [id, el] of marcas.current) el.classList.toggle('is-activa', id === activa)
  }, [activa])

  if (!token) return null
  return <div ref={caixa} className="roteiro-mapa" />
}
