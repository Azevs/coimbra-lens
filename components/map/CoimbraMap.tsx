'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { AnimatePresence, motion } from 'framer-motion'
import { MAP_CONFIG, BUILDING_LAYER, COIMBRA_PARISHES } from '@/lib/mapbox-config'
import { useMapLayers, type LayerType } from '@/hooks/useMapLayers'
import MapLayerControls from './MapLayerControls'
import ParishPanel from './ParishPanel'
import SectionTitle from '@/components/ui/SectionTitle'
import { colorMix } from '@/lib/color'

const LAYER_META: Record<LayerType, { label: string; unit: string; min: string; max: string; gradFrom: string; gradTo: string }> = {
  economia: { label: 'Rendimento Médio', unit: '€/mês', min: '€980', max: '€1 420', gradFrom: 'var(--tone-blue)', gradTo: 'var(--tone-amber)' },
  demografia: { label: 'População', unit: 'habitantes', min: '580', max: '38 200', gradFrom: 'var(--tone-teal)', gradTo: 'var(--tone-crimson)' },
  mobilidade: { label: 'Fluxo Diário', unit: 'viagens est.', min: '70', max: '4 584', gradFrom: 'var(--bg-secondary)', gradTo: 'var(--tone-blue)' },
}

function MapLegend({ layer }: { layer: LayerType }) {
  const meta = LAYER_META[layer]
  return (
    <motion.div
      key={layer}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute', bottom: '2.5rem', left: '1rem', zIndex: 10,
        background: 'rgba(7,11,20,0.82)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(201,168,76,0.15)', borderRadius: '12px',
        padding: '0.75rem 1rem', minWidth: '180px',
      }}
    >
      <p style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
        {meta.label}
      </p>
      <div style={{ height: '8px', borderRadius: '4px', background: `linear-gradient(90deg, ${meta.gradFrom}, ${meta.gradTo})`, marginBottom: '0.35rem' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains)', color: 'var(--text-secondary)' }}>{meta.min}</span>
        <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{meta.unit}</span>
        <span style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains)', color: 'var(--text-secondary)' }}>{meta.max}</span>
      </div>
    </motion.div>
  )
}

function getLayerColor(layer: string, parish: typeof COIMBRA_PARISHES[0]): string {
  if (layer === 'economia') {
    const norm = (parish.income - 900) / 600
    const r = Math.round(46 + norm * (201 - 46))
    const g = Math.round(134 + norm * (168 - 134))
    const b = Math.round(193 + norm * (76 - 193))
    return `rgb(${r},${g},${b})`
  }
  if (layer === 'demografia') {
    const norm = Math.min(parish.population / 40000, 1)
    const r = Math.round(26 + norm * (231 - 26))
    const g = Math.round(188 + norm * (76 - 188))
    const b = Math.round(156 + norm * (60 - 156))
    return `rgb(${r},${g},${b})`
  }
  // mobilidade
  const norm = Math.min((parish.population * 0.12) / 5000, 1)
  const r = Math.round(13 + norm * (46 - 13))
  const g = Math.round(21 + norm * (134 - 21))
  const b = Math.round(37 + norm * (193 - 37))
  return `rgb(${r},${g},${b})`
}

export default function CoimbraMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const { activeLayer, setParish } = useMapLayers()

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
      // 3D buildings
      map.addLayer(BUILDING_LAYER as unknown as mapboxgl.AnyLayer)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Update markers when layer changes
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Remove old markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    const maxIncome = Math.max(...COIMBRA_PARISHES.map((p) => p.income))
    const maxPop = Math.max(...COIMBRA_PARISHES.map((p) => p.population))

    COIMBRA_PARISHES.forEach((parish) => {
      const color = getLayerColor(activeLayer, parish)
      // Estimativa grosseira: 12 % da população residente. Não é uma contagem,
      // e está identificada como estimativa na legenda e no cartão.
      const mobility = Math.round(parish.population * 0.12)
      const maxMobility = Math.round(maxPop * 0.12)

      const incomePct = Math.round((parish.income / maxIncome) * 100)
      const popPct = Math.round((parish.population / maxPop) * 100)
      const mobPct = Math.round((mobility / maxMobility) * 100)

      // Outer container
      const el = document.createElement('div')
      el.style.width = '22px'
      el.style.height = '22px'
      el.style.cursor = 'pointer'
      el.style.display = 'flex'
      el.style.alignItems = 'center'
      el.style.justifyContent = 'center'
      el.style.position = 'relative'

      // Inner dot
      const dot = document.createElement('div')
      dot.style.width = '14px'
      dot.style.height = '14px'
      dot.style.borderRadius = '50%'
      dot.style.background = color
      dot.style.border = '2px solid rgba(255,255,255,0.5)'
      dot.style.boxShadow = `0 0 6px ${colorMix(color, 50)}`
      dot.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
      dot.style.transformOrigin = 'center center'
      el.appendChild(dot)

      // Hovercard
      const card = document.createElement('div')
      card.style.cssText = `
        position:absolute; bottom:26px; left:50%; transform:translateX(-50%);
        background:rgba(7,11,20,0.95); border:1px solid rgba(255,255,255,0.12);
        border-radius:10px; padding:10px 12px; width:180px;
        backdrop-filter:blur(12px); box-shadow:0 8px 32px rgba(0,0,0,0.6);
        pointer-events:none; opacity:0; transition:opacity 0.15s ease;
        font-family:sans-serif; z-index:100;
      `
      card.innerHTML = `
        <div style="font-size:11px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:0.02em">${parish.name}</div>
        <div style="margin-bottom:5px">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:9px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.08em">Rendimento</span>
            <span style="font-size:9px;font-family:monospace;color:var(--tone-amber)">€${parish.income}/mês</span>
          </div>
          <div style="height:3px;background:rgba(255,255,255,0.07);border-radius:2px">
            <div style="height:100%;width:${incomePct}%;background:var(--tone-amber);border-radius:2px;box-shadow:0 0 4px color-mix(in srgb, var(--tone-amber) 38%, transparent)"></div>
          </div>
        </div>
        <div style="margin-bottom:5px">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:9px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.08em">População</span>
            <span style="font-size:9px;font-family:monospace;color:var(--tone-teal)">${parish.population.toLocaleString('pt-PT')}</span>
          </div>
          <div style="height:3px;background:rgba(255,255,255,0.07);border-radius:2px">
            <div style="height:100%;width:${popPct}%;background:var(--tone-teal);border-radius:2px;box-shadow:0 0 4px color-mix(in srgb, var(--tone-teal) 38%, transparent)"></div>
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:9px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.08em">Mobilidade est.</span>
            <span style="font-size:9px;font-family:monospace;color:var(--tone-blue)">${mobility.toLocaleString('pt-PT')}/dia</span>
          </div>
          <div style="height:3px;background:rgba(255,255,255,0.07);border-radius:2px">
            <div style="height:100%;width:${mobPct}%;background:var(--tone-blue);border-radius:2px;box-shadow:0 0 4px color-mix(in srgb, var(--tone-blue) 38%, transparent)"></div>
          </div>
        </div>
        <div style="font-size:8px;color:rgba(255,255,255,0.25);margin-top:7px;text-align:center">clique para detalhes</div>
      `
      el.appendChild(card)

      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'scale(1.6)'
        dot.style.boxShadow = `0 0 16px ${color}`
        card.style.opacity = '1'
      })
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'scale(1)'
        dot.style.boxShadow = `0 0 6px ${colorMix(color, 50)}`
        card.style.opacity = '0'
      })

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(parish.center as [number, number])
        .addTo(map)

      el.addEventListener('click', () => {
        card.style.opacity = '0'
        setParish(parish.name)
        map.flyTo({
          center: parish.center as [number, number],
          zoom: 15,
          pitch: 60,
          duration: 1500,
        })
      })

      markersRef.current.push(marker)
    })
  }, [activeLayer, setParish])

  return (
    <section id="mapa" className="page-section" style={{ position: 'relative' }}>
      <div className="section-container">
        <SectionTitle
          label="EXPLORAÇÃO GEOGRÁFICA"
          title="Mapa Interativo"
          subtitle="Explore as 18 freguesias de Coimbra com dados de economia, demografia e mobilidade."
        />
        <div className="relative rounded-2xl overflow-hidden border border-[var(--glass-border)]" style={{ height: '70vh' }}>
          <MapLayerControls />
          <div ref={mapContainer} className="w-full h-full" />
          <MapLegend layer={activeLayer} />
          <AnimatePresence>
            <ParishPanel />
          </AnimatePresence>
        </div>
        <p className="text-[10px] text-[var(--text-secondary)] mt-2 opacity-60">
          População e rendimento por freguesia · INE, Censos 2021
        </p>
      </div>
    </section>
  )
}
