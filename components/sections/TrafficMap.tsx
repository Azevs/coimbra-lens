'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource from '@/components/ui/DataSource'
import { live } from '@/lib/provenance'
import { colorMix } from '@/lib/color'

const TRAFFIC_LAYERS = [
  { id: 'flow', label: 'Fluxo', icon: '🚗' },
  { id: 'incidents', label: 'Incidentes', icon: '⚠️' },
]

/**
 * O Mapbox avalia estas cores fora do CSS, por isso são hexadecimais
 * literais e não tokens. Correspondem a --state-fair / warn / poor / bad.
 */
const CONGESTION = {
  low:      '#5C9A5C',
  moderate: '#B07D3A',
  heavy:    '#A05A3A',
  severe:   '#8A1F2E',
  unknown:  '#4A5568',
} as const

const LEGEND = [
  { color: CONGESTION.low,      label: 'Livre' },
  { color: CONGESTION.moderate, label: 'Moderado' },
  { color: CONGESTION.heavy,    label: 'Congestionado' },
  { color: CONGESTION.severe,   label: 'Parado' },
]

export default function TrafficMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [activeLayer, setActiveLayer] = useState<'flow' | 'incidents'>('flow')
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    const map = new mapboxgl.Map({
      container: containerRef.current,
      // Mapbox traffic style includes real-time flow colours for free
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [-8.4195, 40.2033] as [number, number],
      zoom: 13,
      pitch: 30,
      bearing: 0,
      antialias: true,
    })

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')

    map.on('load', () => {
      if (!map.getSource('mapbox-traffic')) {
        map.addSource('mapbox-traffic', {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-traffic-v1',
        })
      }

      if (!map.getLayer('traffic-flow')) {
        map.addLayer({
          id: 'traffic-flow',
          type: 'line',
          source: 'mapbox-traffic',
          'source-layer': 'traffic',
          paint: {
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.5, 15, 4],
            'line-color': [
              'match', ['get', 'congestion'],
              'low',      CONGESTION.low,
              'moderate', CONGESTION.moderate,
              'heavy',    CONGESTION.heavy,
              'severe',   CONGESTION.severe,
              CONGESTION.unknown,
            ],
            'line-opacity': 0.85,
          },
          layout: { 'line-join': 'round', 'line-cap': 'round' },
        })
      }

      if (!map.getLayer('traffic-incidents')) {
        map.addLayer({
          id: 'traffic-incidents',
          type: 'circle',
          source: 'mapbox-traffic',
          'source-layer': 'traffic',
          filter: ['==', ['get', 'congestion'], 'severe'],
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4, 15, 10],
            'circle-color': CONGESTION.severe,
            'circle-opacity': 0.9,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(138,31,46,0.35)',
          },
          layout: { visibility: 'none' },
        })
      }

      setMapLoaded(true)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return

    if (activeLayer === 'flow') {
      map.setLayoutProperty('traffic-flow', 'visibility', 'visible')
      map.setLayoutProperty('traffic-incidents', 'visibility', 'none')
    } else {
      map.setLayoutProperty('traffic-flow', 'visibility', 'none')
      map.setLayoutProperty('traffic-incidents', 'visibility', 'visible')
    }
  }, [activeLayer, mapLoaded])

  return (
    <SectionReveal id="transito">
      <SectionTitle
        label="MOBILIDADE URBANA"
        title="Trânsito em Tempo Real"
        subtitle="Fluxo de tráfego em Coimbra actualizado em tempo real via Mapbox Traffic."
      />

      <div className="grid-map-side">
        {/* Map */}
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--glass-border)', height: '480px' }}>
          {/* Layer controls */}
          <div style={{
            position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
            display: 'flex', gap: '0.5rem',
          }}>
            {TRAFFIC_LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as 'flow' | 'incidents')}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-ibm-plex)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.2s',
                  background: activeLayer === layer.id ? 'var(--accent)' : 'rgba(7,11,20,0.85)',
                  color: activeLayer === layer.id ? 'var(--bg-primary)' : 'var(--accent)',
                  borderColor: activeLayer === layer.id ? 'var(--accent)' : 'rgba(201,168,76,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {layer.icon} {layer.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '1rem', zIndex: 10,
            background: 'rgba(7,11,20,0.88)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201,168,76,0.15)', borderRadius: '10px',
            padding: '0.625rem 0.875rem',
          }}>
            {LEGEND.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: item.color, boxShadow: `0 0 4px ${colorMix(item.color, 50)}` }} />
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
              FONTE
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Dados de tráfego em tempo real fornecidos pelo{' '}
              <a href="https://www.mapbox.com/traffic-data" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Mapbox Traffic API
              </a>
              {' '}— actualização contínua via sondas GPS agregadas anonimamente.
            </p>
            <DataSource meta={live('Mapbox Traffic')} />
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
  )
}
