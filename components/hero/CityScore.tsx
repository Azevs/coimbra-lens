'use client'

import { useEffect, useRef } from 'react'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'

function computeScore(aqi: number, temp: number, windSpeed: number): number {
  // AQI: 0=best, 300=worst → invert to 0–50 pts
  const aqiScore = Math.max(0, 50 - (aqi / 300) * 50)
  // Temp comfort: 15–22°C is ideal → 0–30 pts
  const tempDiff = Math.abs(temp - 18.5)
  const tempScore = Math.max(0, 30 - tempDiff * 2)
  // Wind: calm is good, gale is bad → 0–20 pts
  const windScore = Math.max(0, 20 - (windSpeed / 80) * 20)
  return Math.round(aqiScore + tempScore + windScore)
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excelente', color: '#27AE60' }
  if (score >= 65) return { label: 'Muito Bom', color: '#1ABC9C' }
  if (score >= 50) return { label: 'Bom', color: '#C9A84C' }
  if (score >= 35) return { label: 'Razoável', color: '#E67E22' }
  return { label: 'Atenção', color: '#E74C3C' }
}

export default function CityScore() {
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const arcRef = useRef<SVGCircleElement>(null)
  const prevScore = useRef(0)

  const score = weather && air
    ? computeScore(air.aqi, weather.temperature, weather.windSpeed)
    : 72 // default until data loads

  const { label, color } = getScoreLabel(score)

  // Arc animation
  useEffect(() => {
    const circle = arcRef.current
    if (!circle) return

    const R = 54
    const circumference = 2 * Math.PI * R
    const targetDash = (score / 100) * circumference

    circle.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease'
    circle.style.strokeDasharray = `${targetDash} ${circumference}`
    circle.style.stroke = color

    prevScore.current = score
  }, [score, color])

  const R = 54
  const circumference = 2 * Math.PI * R
  const initialDash = (score / 100) * circumference

  return (
    <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        {/* Track */}
        <circle
          cx="65" cy="65" r={R}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <circle
          ref={arcRef}
          cx="65" cy="65" r={R}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${initialDash} ${circumference}`}
          strokeDashoffset="0"
          transform="rotate(-90 65 65)"
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
        {/* Score number */}
        <text
          x="65" y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="26"
          fontWeight="700"
          fontFamily="var(--font-dm-mono)"
        >
          {score}
        </text>
        <text
          x="65" y="80"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="9"
          fontFamily="var(--font-dm-sans)"
          letterSpacing="2"
        >
          /100
        </text>
      </svg>
      <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '-4px' }}>
        ÍNDICE DA CIDADE
      </span>
      <span style={{ fontSize: '12px', color, fontWeight: 600, fontFamily: 'var(--font-dm-sans)', marginTop: '2px' }}>
        {label}
      </span>
    </div>
  )
}
