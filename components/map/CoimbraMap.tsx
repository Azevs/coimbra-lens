'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { AnimatePresence } from 'framer-motion'
import { MAP_CONFIG, BUILDING_LAYER, COIMBRA_PARISHES, PARISH_CENSUS_YEAR, NEXT_CENSUS } from '@/lib/mapbox-config'
import { useMapLayers } from '@/hooks/useMapLayers'
import ParishPanel from './ParishPanel'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { published } from '@/lib/provenance'
import { colorMix } from '@/lib/color'

/**
 * O mapa tinha três camadas — economia, demografia e mobilidade. Só uma
 * assentava em dados reais: o rendimento por freguesia não é publicado e a
 * "mobilidade" era população × 0.12. Restou a população, dos Censos.
 */
const PARISH_META = published(
  `INE · Censos ${PARISH_CENSUS_YEAR}`,
  `Censos ${PARISH_CENSUS_YEAR}`,
  `Última desagregação por freguesia disponível em Portugal. Os Censos são decenais — o próximo é em ${NEXT_CENSUS}.`,
  `${PARISH_CENSUS_YEAR}-12-31T12:00:00`,
)

const MAX_POP = Math.max(...COIMBRA_PARISHES.map((p) => p.population))
const TOTAL_POP = COIMBRA_PARISHES.reduce((s, p) => s + p.population, 0)

/** Uma variável, uma rampa sequencial: escuro é menos gente, claro é mais. */
function popColor(population: number): string {
  const t = Math.sqrt(population / MAX_POP)
  const from = [40, 62, 78]
  const to = [122, 166, 190]
  const c = from.map((v, i) => Math.round(v + t * (to[i] - v)))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

/** O raio codifica a mesma grandeza que a cor — redundância deliberada. */
function popRadius(population: number): number {
  return 9 + Math.sqrt(population / MAX_POP) * 15
}

function Legend() {
  const steps = [2000, 10000, 25000, MAX_POP]
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '1rem',
        zIndex: 10,
        background: 'var(--bg-sunken)',
        border: '1px solid var(--border-panel)',
        borderRadius: '4px',
        padding: '0.75rem 1rem',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: '0.625rem',
        }}
      >
        População · Censos {PARISH_CENSUS_YEAR}
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
        {steps.map((v) => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span
              style={{
                width: `${popRadius(v)}px`,
                height: `${popRadius(v)}px`,
                borderRadius: '50%',
                background: popColor(v),
                border: '1px solid rgba(20,23,28,0.35)',
                display: 'block',
              }}
            />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains)', color: 'var(--text-tertiary)' }}>
              {v >= 1000 ? `${Math.round(v / 1000)}k` : v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CoimbraMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const { setParish } = useMapLayers()

  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_CONFIG.style,
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
      pitch: MAP_CONFIG.pitch,
      bearing: MAP_CONFIG.bearing,
      antialias: MAP_CONFIG.antialias,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    map.on('load', () => {
      map.addLayer(BUILDING_LAYER as unknown as mapboxgl.AnyLayer)
    })

    const markers = markersRef.current

    COIMBRA_PARISHES.forEach((parish) => {
      const color = popColor(parish.population)
      const size = popRadius(parish.population)
      const share = ((parish.population / TOTAL_POP) * 100).toFixed(1)

      // Um botão a sério: o marcador passa a ser operável por teclado, e não
      // apenas uma <div> com onClick como estava.
      const el = document.createElement('button')
      el.type = 'button'
      el.setAttribute(
        'aria-label',
        `${parish.name}: ${parish.population.toLocaleString('pt-PT')} habitantes`,
      )
      el.style.cssText = `
        width:${size}px; height:${size}px; border-radius:50%; cursor:pointer;
        background:${color}; border:2px solid rgba(242,238,230,0.85); padding:0;
        box-shadow:0 0 8px ${colorMix(color, 50)};
        transition:transform .2s ease;
      `

      const card = document.createElement('div')
      card.style.cssText = `
        position:absolute; bottom:${size + 8}px; left:50%; transform:translateX(-50%);
        background:var(--bg-raised); border:1px solid var(--border-panel);
        border-radius:4px; padding:9px 11px; width:190px;
        box-shadow:var(--shadow-lg); pointer-events:none; opacity:0;
        transition:opacity .15s ease; z-index:100; text-align:left;
      `
      card.innerHTML = `
        <div style="font-family:var(--font-ibm-plex);font-size:11px;font-weight:600;color:var(--text-primary);margin-bottom:5px;line-height:1.3">${parish.short}</div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">
          <span style="font-family:var(--font-jetbrains);font-size:15px;color:var(--tone-blue-text)">${parish.population.toLocaleString('pt-PT')}</span>
          <span style="font-family:var(--font-ibm-plex);font-size:10px;color:var(--text-secondary)">${share}% do concelho</span>
        </div>
      `

      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative;display:flex;align-items:center;justify-content:center'
      wrapper.appendChild(el)
      wrapper.appendChild(card)

      const reveal = () => {
        el.style.transform = 'scale(1.15)'
        card.style.opacity = '1'
      }
      const conceal = () => {
        el.style.transform = 'scale(1)'
        card.style.opacity = '0'
      }
      el.addEventListener('mouseenter', reveal)
      el.addEventListener('focus', reveal)
      el.addEventListener('mouseleave', conceal)
      el.addEventListener('blur', conceal)

      el.addEventListener('click', () => {
        conceal()
        setParish(parish.name)
        map.flyTo({ center: parish.center, zoom: 14, pitch: 55, duration: 1400 })
      })

      markers.push(new mapboxgl.Marker({ element: wrapper }).setLngLat(parish.center).addTo(map))
    })

    mapRef.current = map

    return () => {
      markers.forEach((m) => m.remove())
      markers.length = 0
      map.remove()
      mapRef.current = null
    }
  }, [setParish])

  return (
    <section id="mapa" className="page-section" style={{ position: 'relative' }}>
      <div className="section-container">
        <SectionTitle
          label="EXPLORAÇÃO GEOGRÁFICA"
          title="Mapa das Freguesias"
          subtitle="As 18 freguesias de Coimbra por população residente. O tamanho e a cor do marcador codificam a mesma grandeza."
        />
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid var(--border-panel)',
            height: '70vh',
          }}
        >
          <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
          <Legend />
          <AnimatePresence>
            <ParishPanel />
          </AnimatePresence>
        </div>
        <DataSource meta={PARISH_META} />
      </div>
    </section>
  )
}
