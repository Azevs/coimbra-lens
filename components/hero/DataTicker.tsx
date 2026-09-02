'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver } from '@/hooks/useRiver'
import { fmt } from '@/lib/format'

const TREND_ICON = { rising: '↑', falling: '↓', stable: '→' } as const

/**
 * Tira de edição no topo do documento. Estática: rola com a página e
 * devolve os 40px que antes ocupava em permanência.
 */
export default function DataTicker() {
  const innerRef = useRef<HTMLDivElement>(null)
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const { data: river } = useRiver()

  // Um traço quando não há leitura. O ticker nunca inventa um número.
  const allItems = [
    {
      label: 'Temperatura',
      value: weather?.temperature != null ? fmt(weather.temperature, 1) : '—',
      unit: '°C',
    },
    {
      label: 'Qualidade do Ar',
      value: air?.aqi != null ? String(air.aqi) : '—',
      unit: 'EAQI',
    },
    {
      label: 'Vento',
      value: weather?.windSpeed != null ? fmt(weather.windSpeed, 0) : '—',
      unit: 'km/h',
    },
    {
      label: 'Mondego',
      value: river?.discharge != null ? `${fmt(river.discharge, 1)} ${TREND_ICON[river.trend]}` : '—',
      unit: 'm³/s',
    },
  ]

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    gsap.killTweensOf(inner)
    gsap.set(inner, { x: 0 })
    if (!canAnimate()) return

    const totalWidth = inner.scrollWidth / 2

    gsap.to(inner, {
      x: -totalWidth,
      duration: 18,
      ease: 'none',
      repeat: -1,
    })
  }, [weather, air, river])

  return (
    <div className="ticker" role="marquee" aria-label="Leituras da hora">
      <div ref={innerRef} className="flex items-center h-full whitespace-nowrap">
        {[...allItems, ...allItems].map((item, i) => (
          <span key={i} className="flex items-center shrink-0" aria-hidden={i >= allItems.length}>
            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(242,238,230,0.72)',
              marginRight: '7px',
              marginLeft: '20px',
            }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--bg-primary)',
              fontFeatureSettings: "'tnum' 1",
            }}>
              {item.value}
            </span>
            {item.unit && (
              <span style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '11px',
                color: 'rgba(242,238,230,0.72)',
                marginLeft: '3px',
              }}>
                {item.unit}
              </span>
            )}
            <span style={{
              color: '#D9762F',
              margin: '0 4px 0 20px',
              fontSize: '6px',
              opacity: 0.7,
              flexShrink: 0,
            }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
