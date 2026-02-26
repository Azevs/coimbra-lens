'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'

const TRAFFIC_LAYERS = [
  { id: 'flow', label: 'Fluxo', icon: '🚗' },
  { id: 'incidents', label: 'Incidentes', icon: '⚠️' },
]

const LEGEND = [
  { color: '#27AE60', label: 'Livre' },
  { color: '#F1C40F', label: 'Moderado' },
  { color: '#E67E22', label: 'Congestionado' },
  { color: '#E74C3C', label: 'Parado' },
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
              'low',      '#27AE60',
              'moderate', '#F1C40F',
              'heavy',    '#E67E22',
              'severe',   '#E74C3C',
              '#8899BB',
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
            'circle-color': '#E74C3C',
            'circle-opacity': 0.9,
            'circle-stroke-width': 2,
            'circle-stroke-color': 'rgba(231,76,60,0.3)',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1.5rem', alignItems: 'start' }}>
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
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all 0.2s',
                  background: activeLayer === layer.id ? 'var(--accent-gold)' : 'rgba(7,11,20,0.85)',
                  color: activeLayer === layer.id ? '#070B14' : 'var(--accent-gold)',
                  borderColor: activeLayer === layer.id ? 'var(--accent-gold)' : 'rgba(201,168,76,0.3)',
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
                <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: item.color, boxShadow: `0 0 4px ${item.color}80` }} />
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Side panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
              ESTADO DO TRÂNSITO
            </span>
            {[
              { road: 'IC2 / EN1', status: 'Livre', color: '#27AE60' },
              { road: 'Av. Fernão Magalhães', status: 'Moderado', color: '#F1C40F' },
              { road: 'Ponte de Santa Clara', status: 'Livre', color: '#27AE60' },
              { road: 'N111 — Ceira', status: 'Livre', color: '#27AE60' },
              { road: 'Anel Viário Sul', status: 'Moderado', color: '#F1C40F' },
            ].map((r) => (
              <div key={r.road} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: '0.5rem', marginBottom: '0.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans)' }}>{r.road}</span>
                <span style={{
                  fontSize: '9px', padding: '2px 7px', borderRadius: '4px',
                  background: `${r.color}18`, color: r.color,
                  border: `1px solid ${r.color}35`,
                  whiteSpace: 'nowrap',
                }}>
                  {r.status}
                </span>
              </div>
            ))}
          </GlassCard>

          <GlassCard style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
              FONTE
            </span>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Dados de tráfego em tempo real fornecidos pelo{' '}
              <a href="https://www.mapbox.com/traffic-data" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>
                Mapbox Traffic API
              </a>
              {' '}— actualização contínua via sondas GPS agregadas anonimamente.
            </p>
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
  )
}
