'use client'

import { useForecast } from '@/hooks/useForecast'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import Icon, { weatherIcon } from '@/components/ui/Icon'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'

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
    <div style={{ marginTop: '0.5rem' }}>
      <Label style={{ marginBottom: '0.25rem' }}>Temperatura · próximas 24 h</Label>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '60px', display: 'block' }} role="img" aria-label={`Temperatura prevista nas próximas 24 horas, entre ${fmt(min, 1)} e ${fmt(max, 1)} graus`}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--tone-amber)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--tone-amber)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={fillPoints} fill="url(#sparkGrad)" />
        <polyline points={points} fill="none" stroke="var(--tone-amber)" strokeWidth="1.5" strokeLinejoin="round" />
        <text x={pad} y={H - 2} fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-jetbrains)">{fmt(min, 1)}°</text>
        <text x={W - pad} y={H - 2} fontSize="11" fill="var(--text-secondary)" fontFamily="var(--font-jetbrains)" textAnchor="end">{fmt(max, 1)}°</text>
      </svg>
    </div>
  )
}

export default function ForecastPanel() {
  const { data: forecast, isLoading } = useForecast()

  if (isLoading || !forecast) return null

  // Sem previsão, o painel diz que não tem em vez de desaparecer sem explicação.
  if (forecast.daily.length === 0) {
    return (
      <GlassCard>
        <Label>Previsão · 7 dias</Label>
        <DataUnavailable meta={forecast.meta} />
        <DataSource meta={forecast.meta} showNote={false} />
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <HourlySparkline data={forecast.hourly} />

      <div style={{ marginTop: '1.5rem' }}>
        <Label>Previsão · 7 dias</Label>
        <div className="grid-forecast">
          {forecast.daily.map((day, i) => (
            <div key={day.date} style={{ textAlign: 'center' }}>
              <span className="ui-note" style={{ display: 'block', marginBottom: '6px' }}>
                {getDayLabel(day.date, i)}
              </span>
              <Icon name={weatherIcon(day.weatherCode)} size={22} style={{ color: 'var(--text-secondary)', margin: '0 auto 6px', display: 'block' }} />
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-jetbrains)', color: 'var(--tone-amber-text)', display: 'block' }}>
                {fmt(day.maxTemp)}°
              </span>
              <span className="ui-mono" style={{ display: 'block' }}>
                {fmt(day.minTemp)}°
              </span>
              {day.precip > 0 && (
                <span className="ui-mono" style={{ display: 'block', color: 'var(--tone-blue-text)' }}>
                  {fmt(day.precip, 1)} mm
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <DataSource meta={forecast.meta} />
    </GlassCard>
  )
}
