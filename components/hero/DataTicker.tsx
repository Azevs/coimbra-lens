'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver } from '@/hooks/useRiver'

const TREND_ICON = { rising: '↑', falling: '↓', stable: '→' }

export default function DataTicker() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const { data: river } = useRiver()

  const riverAlert = river && river.level >= 2
  const riverLabel = river
    ? `${river.level.toFixed(2)} m ${TREND_ICON[river.trend]}${riverAlert ? ' ⚠️' : ''}`
    : '—'

  const allItems = [
    { icon: '🌡️', label: 'Temperatura', value: weather ? `${weather.temperature.toFixed(1)}` : '—', unit: '°C' },
    { icon: '💨', label: 'Qualidade do Ar', value: air ? `${air.aqi}` : '—', unit: 'AQI' },
    { icon: '🌬️', label: 'Vento', value: weather ? `${weather.windSpeed.toFixed(0)}` : '—', unit: 'km/h' },
    { icon: '🌊', label: 'Rio Mondego', value: riverLabel, unit: '' },
    { icon: '🚗', label: 'Trânsito Coimbra', value: 'Em tempo real', unit: '' },
  ]

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    gsap.killTweensOf(inner)
    gsap.set(inner, { x: 0 })

    const totalWidth = inner.scrollWidth / 2

    gsap.to(inner, {
      x: -totalWidth,
      duration: 18,
      ease: 'none',
      repeat: -1,
    })
  }, [weather, air, river])

  return (
    <div
      ref={tickerRef}
      className="fixed top-0 left-0 right-0 z-[60] h-10 overflow-hidden"
      style={{
        background: 'rgba(7, 11, 20, 0.85)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div ref={innerRef} className="flex items-center h-full whitespace-nowrap">
        {[...allItems, ...allItems].map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span style={{ margin: '0 6px' }}>{item.icon}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-dm-sans)', marginRight: '6px' }}>
              {item.label}
            </span>
            <span className="font-data" style={{ fontSize: '12px' }}>{item.value}</span>
            {item.unit && (
              <span style={{ color: 'var(--text-secondary)', fontSize: '11px', marginLeft: '3px', marginRight: '2px' }}>
                {item.unit}
              </span>
            )}
            <span style={{ color: 'var(--accent-blue)', margin: '0 14px', fontSize: '10px', opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
