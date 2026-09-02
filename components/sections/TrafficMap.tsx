'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource from '@/components/ui/DataSource'
import { live, unavailable, type Sourced } from '@/lib/provenance'

const TRAFFIC_LAYERS = [
  { id: 'flow', label: 'Fluxo' },
  { id: 'severe', label: 'Só parado' },
] as const

type LayerId = (typeof TRAFFIC_LAYERS)[number]['id']

/**
 * O Mapbox avalia estas cores fora do CSS, por isso são hexadecimais
 * literais e não tokens. Correspondem a --state-fair / warn / poor / bad.
 */
const CONGESTION = {
  low:      '#47723F',
  moderate: '#8A6220',
  heavy:    '#B03A0B',
  severe:   '#9B2F3C',
  unknown:  '#575D65',
} as const

const LEGEND = [
  { color: CONGESTION.low,      label: 'Livre' },
  { color: CONGESTION.moderate, label: 'Moderado' },
  { color: CONGESTION.heavy,    label: 'Congestionado' },
  { color: CONGESTION.severe,   label: 'Parado' },
]

const SOURCE = 'Mapbox Traffic'

/**
 * O mapa de trânsito tinha ficado no tema escuro antigo: estilo nocturno,
 * botões em azul-noite, filete dourado e cantos de 16px sobre o papel da
 * Gazeta. Passa a carta clara, tokens do papel e cantos de 4px como o
 * mapa das freguesias.
 *
 * A camada "Incidentes" era só o congestionamento severo com outro nome;
 * passa a chamar-se o que é.
 */
export default function TrafficMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [activeLayer, setActiveLayer] = useState<LayerId>('flow')
  const [mapLoaded, setMapLoaded] = useState(false)
  // O selo só diz "em directo" quando a camada de tráfego chegou mesmo.
  // Sem chave, o estado inicial já é o de falha e o efeito não corre.
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
  const [meta, setMeta] = useState<Sourced>(() =>
    token
      ? unavailable(SOURCE, 'A carregar a carta de tráfego.')
      : unavailable(SOURCE, 'Sem chave do Mapbox configurada; o mapa não pode carregar.'),
  )

  useEffect(() => {
    if (!containerRef.current || !token) return
    mapboxgl.accessToken = token

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-8.4195, 40.2033] as [number, number],
      zoom: 13,
      pitch: 30,
      bearing: 0,
      antialias: true,
    })

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')

    map.on('error', (e) => {
      setMeta(unavailable(SOURCE, e.error?.message ? `O Mapbox respondeu: ${e.error.message}` : 'O Mapbox não respondeu.'))
    })

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
            'line-opacity': 0.9,
          },
          layout: { 'line-join': 'round', 'line-cap': 'round' },
        })
      }

      if (!map.getLayer('traffic-severe')) {
        map.addLayer({
          id: 'traffic-severe',
          type: 'line',
          source: 'mapbox-traffic',
          'source-layer': 'traffic',
          filter: ['==', ['get', 'congestion'], 'severe'],
          paint: {
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 2.5, 15, 6],
            'line-color': CONGESTION.severe,
            'line-opacity': 0.95,
          },
          layout: { 'line-join': 'round', 'line-cap': 'round', visibility: 'none' },
        })
      }

      setMapLoaded(true)
      setMeta(live(SOURCE))
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [token])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapLoaded) return
    map.setLayoutProperty('traffic-flow', 'visibility', activeLayer === 'flow' ? 'visible' : 'none')
    map.setLayoutProperty('traffic-severe', 'visibility', activeLayer === 'severe' ? 'visible' : 'none')
  }, [activeLayer, mapLoaded])

  return (
    <SectionReveal id="transito">
      <SectionTitle
        label="MOBILIDADE URBANA"
        title="Trânsito em Tempo Real"
        subtitle="Fluxo de tráfego nas ruas de Coimbra, actualizado continuamente."
      />

      <div className="grid-map-side">
        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-panel)', height: '480px' }}>
          {/* Camadas */}
          <div
            role="group"
            aria-label="Camada do mapa"
            style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.375rem' }}
          >
            {TRAFFIC_LAYERS.map((layer) => {
              const on = activeLayer === layer.id
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  aria-pressed={on}
                  style={{
                    padding: '0 0.875rem',
                    height: '32px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-ibm-plex)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
                    background: on ? 'var(--accent)' : 'var(--bg-raised)',
                    color: on ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {layer.label}
                </button>
              )
            })}
          </div>

          {/* Legenda */}
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '1rem',
              zIndex: 10,
              background: 'var(--bg-raised)',
              border: '1px solid var(--border-panel)',
              borderRadius: '4px',
              padding: '0.625rem 0.875rem',
            }}
          >
            {LEGEND.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div style={{ width: '24px', height: '3px', borderRadius: '2px', background: item.color }} />
                <span className="ui-note" style={{ letterSpacing: '0.06em' }}>{item.label}</span>
              </div>
            ))}
          </div>

          <div ref={containerRef} style={{ width: '100%', height: '100%', background: 'var(--bg-sunken)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GlassCard>
            <Label>Como ler</Label>
            <p className="ui-note" style={{ margin: 0, lineHeight: 1.6 }}>
              A cor de cada rua é a velocidade actual face à velocidade habitual àquela hora, calculada a partir de
              sondas GPS agregadas de forma anónima. Não distingue obras de acidentes.
            </p>
            <DataSource meta={meta} />
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
  )
}
