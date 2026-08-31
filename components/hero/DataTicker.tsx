'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver } from '@/hooks/useRiver'

const TREND_ICON = { rising: '↑', falling: '↓', stable: '→' } as const

export default function DataTicker() {
  const tickerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const { data: river } = useRiver()

  // Um traço quando não há leitura. O ticker nunca inventa um número.
  const allItems = [
    {
      icon: '🌡️',
      label: 'Temperatura',
      value: weather?.temperature != null ? weather.temperature.toFixed(1) : '—',
      unit: '°C',
    },
    {
      icon: '💨',
      label: 'Qualidade do Ar',
      value: air?.aqi != null ? String(air.aqi) : '—',
      unit: 'EAQI',
    },
    {
      icon: '🌬️',
      label: 'Vento',
      value: weather?.windSpeed != null ? weather.windSpeed.toFixed(0) : '—',
      unit: 'km/h',
    },
    {
      icon: '🌊',
      label: 'Mondego',
      value: river?.discharge != null ? `${river.discharge.toFixed(1)} ${TREND_ICON[river.trend]}` : '—',
      unit: 'm³/s',
    },
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
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden"
      style={{
        background: 'var(--bg-sunken)',
        borderBottom: '1px solid var(--border-subtle)',
        height: '36px',
      }}
    >
      <div ref={innerRef} className="flex items-center h-full whitespace-nowrap">
        {[...allItems, ...allItems].map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '9px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              marginRight: '6px',
              marginLeft: '18px',
            }}>
              {item.icon} {item.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--text-data)',
              fontFeatureSettings: "'tnum' 1",
            }}>
              {item.value}
            </span>
            {item.unit && (
              <span style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '9px',
                color: 'var(--text-tertiary)',
                marginLeft: '3px',
              }}>
                {item.unit}
              </span>
            )}
            <span style={{
              color: 'var(--accent)',
              margin: '0 4px 0 18px',
              fontSize: '6px',
              opacity: 0.5,
              flexShrink: 0,
            }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
