'use client'

import { useWeather } from '@/hooks/useWeather'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import Icon, { weatherIcon, type IconName } from '@/components/ui/Icon'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'

function getWeatherLabel(code: number): string {
  if (code === 0) return 'Céu limpo'
  if (code <= 3) return 'Parcialmente nublado'
  if (code <= 48) return 'Nevoeiro'
  if (code <= 67) return 'Chuva'
  if (code <= 77) return 'Neve'
  if (code <= 82) return 'Aguaceiros'
  return 'Trovoada'
}

function getTempColor(temp: number): string {
  if (temp < 10) return 'var(--tone-blue-text)'
  if (temp < 18) return 'var(--tone-teal-text)'
  if (temp < 28) return 'var(--tone-amber-text)'
  return 'var(--tone-crimson-text)'
}

function StatRow({ icon, label, value, unit, pct, color }: {
  icon: IconName; label: string; value: string; unit: string; pct: number; color: string
}) {
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <Icon name={icon} size={14} style={{ color: 'var(--text-tertiary)' }} />
          <Label style={{ margin: 0 }}>{label}</Label>
        </div>
        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '13px', color: 'var(--text-primary)' }}>
          {value}<span className="ui-mono" style={{ marginLeft: '3px' }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: '4px', background: 'rgba(20,23,28,0.10)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${Math.min(100, pct)}%`,
          background: color, borderRadius: '2px',
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

export default function WeatherModule() {
  const { data: weather, isLoading } = useWeather()

  if (isLoading || !weather) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-24" />
          <div className="h-16 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
      <div>
        <Label style={{ marginBottom: '4px' }}>Clima agora · Coimbra</Label>
        {weather.weatherCode !== null && (
          <span className="ui-note">{getWeatherLabel(weather.weatherCode)}</span>
        )}
      </div>
      {weather.weatherCode !== null && (
        <Icon name={weatherIcon(weather.weatherCode)} size={36} style={{ color: 'var(--text-secondary)', strokeWidth: 1.25 }} />
      )}
    </div>
  )

  // Sem leitura, o cartão diz que não sabe em vez de mostrar 18,5 °C fixos.
  if (weather.temperature === null) {
    return (
      <GlassCard>
        {header}
        <DataUnavailable meta={weather.meta} />
        <DataSource meta={weather.meta} showNote={false} />
      </GlassCard>
    )
  }

  const tempColor = getTempColor(weather.temperature)

  return (
    <GlassCard>
      {header}

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.375rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <span className="font-display" style={{ fontSize: '4rem', lineHeight: 0.9, color: tempColor }}>
          {fmt(weather.temperature, 1)}
        </span>
        <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 400, color: tempColor, opacity: 0.8, marginBottom: '4px' }}>°C</span>
      </div>

      {weather.humidity !== null && (
        <StatRow icon="drop" label="Humidade" value={fmt(weather.humidity)} unit="%" pct={weather.humidity} color="var(--tone-blue)" />
      )}
      {weather.windSpeed !== null && (
        <StatRow icon="wind" label="Vento" value={fmt(weather.windSpeed)} unit="km/h" pct={(weather.windSpeed / 80) * 100} color="var(--tone-teal)" />
      )}
      {weather.precipitation !== null && (
        <StatRow icon="rain" label="Precipitação" value={fmt(weather.precipitation, 1)} unit="mm" pct={Math.min((weather.precipitation / 20) * 100, 100)} color="var(--tone-amber)" />
      )}

      <DataSource meta={weather.meta} />
    </GlassCard>
  )
}
