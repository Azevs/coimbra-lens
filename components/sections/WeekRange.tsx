'use client'

import { useForecast } from '@/hooks/useForecast'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import Icon, { weatherIcon } from '@/components/ui/Icon'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'

/** A mesma escala do cartão do clima: frio, ameno, quente, muito quente. */
function corDaTemp(t: number): string {
  if (t < 10) return 'var(--tone-blue)'
  if (t < 18) return 'var(--tone-teal)'
  if (t < 28) return 'var(--tone-amber)'
  return 'var(--tone-crimson)'
}

function nomeDoDia(date: string, i: number): string {
  if (i === 0) return 'Hoje'
  if (i === 1) return 'Amanhã'
  const d = new Date(date + 'T12:00:00')
  return d.toLocaleDateString('pt-PT', { weekday: 'long' }).replace('-feira', '')
}

/**
 * A semana em barras de amplitude: cada dia vai da mínima à máxima numa
 * escala comum aos sete, para que um dia mais frio se veja pelo lugar da
 * barra e não só pelo número.
 */
export default function WeekRange() {
  const { data: forecast, isLoading } = useForecast()

  if (isLoading || !forecast) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-28" />
          <div className="h-40 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  if (forecast.daily.length === 0) {
    return (
      <GlassCard>
        <Label>A semana</Label>
        <DataUnavailable meta={forecast.meta} />
        <DataSource meta={forecast.meta} showNote={false} />
      </GlassCard>
    )
  }

  const dias = forecast.daily
  const lo = Math.floor(Math.min(...dias.map((d) => d.minTemp)))
  const hi = Math.ceil(Math.max(...dias.map((d) => d.maxTemp)))
  const pos = (t: number) => ((t - lo) / (hi - lo || 1)) * 100

  return (
    <GlassCard>
      <Label style={{ marginBottom: '1rem' }}>A semana</Label>

      <ol className="semana" aria-label="Previsão para sete dias">
        {dias.map((d, i) => (
          <li key={d.date} className="semana-dia">
            <span className="semana-nome">{nomeDoDia(d.date, i)}</span>
            <Icon name={weatherIcon(d.weatherCode)} size={20} className="semana-icone" style={{ color: 'var(--text-secondary)' }} />
            <span className="semana-min">{fmt(d.minTemp)}°</span>
            <span className="semana-pista" aria-hidden="true">
              <span
                className="semana-barra"
                style={{
                  left: `${pos(d.minTemp)}%`,
                  right: `${100 - pos(d.maxTemp)}%`,
                  background: `linear-gradient(90deg, ${corDaTemp(d.minTemp)}, ${corDaTemp(d.maxTemp)})`,
                }}
              />
            </span>
            <span className="semana-max">{fmt(d.maxTemp)}°</span>
            <span className="semana-chuva">
              {d.precip >= 0.1 && (
                <>
                  <Icon name="drop" size={11} />
                  {fmt(d.precip, 1)} mm
                </>
              )}
            </span>
          </li>
        ))}
      </ol>

      <DataSource meta={forecast.meta} showNote={false} />
    </GlassCard>
  )
}
