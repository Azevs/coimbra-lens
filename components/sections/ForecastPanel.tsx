'use client'

import { useForecast } from '@/hooks/useForecast'
import GlassCard from '@/components/ui/GlassCard'

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '🌨️'
  if (code <= 82) return '🌧️'
  return '⛈️'
}

function getDayLabel(dateStr: string, index: number): string {
  if (index === 0) return 'Hoje'
  if (index === 1) return 'Amanhã'
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-PT', { weekday: 'short' })
}

function HourlySparkline({ data }: { data: { hour: number; temp: number }[] }) {
  if (!data.length) return null
  const temps = data.map((d) => d.temp)
  const min = Math.min(...temps)
  const max = Math.max(...temps)
  const range = max - min || 1
  const W = 400
  const H = 60
  const pad = 4

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (W - pad * 2) + pad
    const y = H - pad - ((d.temp - min) / range) * (H - pad * 2)
    return `${x},${y}`
  }).join(' ')

  const fillPoints = `${pad},${H} ${points} ${W - pad},${H}`

  return (
    <div style={{ marginTop: '1rem' }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
        TEMPERATURA · PRÓXIMAS 24H
      </span>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '60px', display: 'block', marginTop: '0.25rem' }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-gold)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={fillPoints} fill="url(#sparkGrad)" />
        <polyline points={points} fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Min/max labels */}
        <text x={pad} y={H - 2} fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-dm-mono)">{min.toFixed(1)}°</text>
        <text x={W - pad} y={H - 2} fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-dm-mono)" textAnchor="end">{max.toFixed(1)}°</text>
      </svg>
    </div>
  )
}

export default function ForecastPanel() {
  const { data: forecast, isLoading } = useForecast()

  if (isLoading || !forecast) return null

  return (
    <GlassCard>
      <HourlySparkline data={forecast.hourly} />

      <div style={{ marginTop: '1.25rem' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
          PREVISÃO · 7 DIAS
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {forecast.daily.map((day, i) => (
            <div key={day.date} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                {getDayLabel(day.date, i)}
              </span>
              <span style={{ fontSize: '1.25rem', display: 'block', marginBottom: '4px' }}>
                {getWeatherIcon(day.weatherCode)}
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-dm-mono)', color: 'var(--accent-gold)', display: 'block' }}>
                {day.maxTemp.toFixed(0)}°
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-dm-mono)', color: 'var(--text-secondary)', display: 'block' }}>
                {day.minTemp.toFixed(0)}°
              </span>
              {day.precip > 0 && (
                <span style={{ fontSize: '9px', color: 'var(--accent-blue)', display: 'block' }}>
                  {day.precip.toFixed(1)}mm
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {forecast.fallback && (
        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '0.75rem', opacity: 0.6 }}>
          Dados de referência · Open-Meteo
        </p>
      )}
    </GlassCard>
  )
}
