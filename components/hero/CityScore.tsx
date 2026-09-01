'use client'

import { useEffect, useRef } from 'react'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { colorMix } from '@/lib/color'

/**
 * Conforto atmosférico — NÃO é um índice geral da cidade.
 *
 * Combina apenas três leituras meteorológicas e de ar. O nome anterior
 * ("Índice da Cidade") prometia um retrato de Coimbra que estes três
 * valores não conseguem dar.
 *
 *   Ar          0–50 pts  · European AQI invertido (satura a 100)
 *   Temperatura 0–30 pts  · conforto máximo a 18,5 °C
 *   Vento       0–20 pts  · calmo é melhor
 */
function computeScore(eaqi: number, temp: number, windSpeed: number): number {
  const airScore = Math.max(0, 50 - (Math.min(eaqi, 100) / 100) * 50)
  const tempScore = Math.max(0, 30 - Math.abs(temp - 18.5) * 2)
  const windScore = Math.max(0, 20 - (windSpeed / 80) * 20)
  return Math.round(airScore + tempScore + windScore)
}

const FORMULA = 'Ar (50) + temperatura (30) + vento (20). Não inclui trânsito, ruído nem serviços.'

function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 80) return { label: 'Excelente', color: 'var(--tone-teal-text)' }
  if (score >= 65) return { label: 'Muito bom', color: 'var(--tone-moss-text)' }
  if (score >= 50) return { label: 'Bom', color: 'var(--tone-amber-text)' }
  if (score >= 35) return { label: 'Razoável', color: 'var(--accent-text)' }
  return { label: 'Atenção', color: 'var(--tone-crimson-text)' }
}

export default function CityScore() {
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const arcRef = useRef<SVGCircleElement>(null)

  // As três leituras têm de existir. Sem uma delas não há pontuação — o arco
  // fica vazio em vez de mostrar um 72 inventado enquanto os dados não chegam.
  const score =
    air?.aqi != null && weather?.temperature != null && weather.windSpeed != null
      ? computeScore(air.aqi, weather.temperature, weather.windSpeed)
      : null

  const { label, color } = score === null
    ? { label: 'Sem leitura', color: 'var(--text-tertiary)' }
    : getScoreLabel(score)

  // Arc animation
  useEffect(() => {
    const circle = arcRef.current
    if (!circle) return

    const R = 54
    const circumference = 2 * Math.PI * R
    const targetDash = ((score ?? 0) / 100) * circumference

    circle.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease'
    circle.style.strokeDasharray = `${targetDash} ${circumference}`
    circle.style.stroke = color
  }, [score, color])

  const R = 54
  const circumference = 2 * Math.PI * R
  const initialDash = ((score ?? 0) / 100) * circumference

  return (
    <div
      title={FORMULA}
      className="city-score"
      style={{ position: 'absolute', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
          style={{ filter: `drop-shadow(0 0 8px ${colorMix(color, 50)})` }}
        />
        {/* Score number */}
        <text
          x="65" y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="26"
          fontWeight="700"
          fontFamily="var(--font-jetbrains)"
        >
          {score ?? '—'}
        </text>
        <text
          x="65" y="80"
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize="9"
          fontFamily="var(--font-ibm-plex)"
          letterSpacing="2"
        >
          /100
        </text>
      </svg>
      <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginTop: '-4px' }}>
        CONFORTO ATMOSFÉRICO
      </span>
      <span style={{ fontSize: '12px', color, fontWeight: 600, fontFamily: 'var(--font-ibm-plex)', marginTop: '2px' }}>
        {label}
      </span>
    </div>
  )
}
