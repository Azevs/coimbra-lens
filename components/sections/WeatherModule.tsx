'use client'

import { useWeather } from '@/hooks/useWeather'
import GlassCard from '@/components/ui/GlassCard'

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '🌨️'
  if (code <= 82) return '🌧️'
  if (code <= 86) return '❄️'
  return '⛈️'
}

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
  if (temp < 10) return '#2E86C1'
  if (temp < 18) return '#1ABC9C'
  if (temp < 28) return '#C9A84C'
  return '#E74C3C'
}

function StatRow({ icon, label, value, unit, pct, color }: {
  icon: string; label: string; value: string; unit: string; pct: number; color: string
}) {
  return (
    <div style={{ marginBottom: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>{icon}</span>
          <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>{label}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px', color: 'var(--text-primary)' }}>
          {value}<span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginLeft: '2px' }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${Math.min(100, pct)}%`,
          background: color, borderRadius: '2px',
          boxShadow: `0 0 8px ${color}60`,
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
          <div className="h-4 bg-[var(--bg-primary)] rounded w-24" />
          <div className="h-16 bg-[var(--bg-primary)] rounded" />
          <div className="h-4 bg-[var(--bg-primary)] rounded" />
          <div className="h-4 bg-[var(--bg-primary)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const tempColor = getTempColor(weather.temperature)

  return (
    <GlassCard style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Subtle ambient glow behind temp */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-20px',
        width: '140px', height: '140px', borderRadius: '50%',
        background: `radial-gradient(circle, ${tempColor}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', display: 'block', marginBottom: '4px' }}>CLIMA AGORA · COIMBRA</span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{getWeatherLabel(weather.weatherCode)}</span>
        </div>
        <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>{getWeatherIcon(weather.weatherCode)}</span>
      </div>

      {/* Temperature hero */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.25rem' }}>
        <span style={{
          fontFamily: 'var(--font-dm-mono)', fontSize: '4rem', fontWeight: 700,
          lineHeight: 1, color: tempColor,
          textShadow: `0 0 30px ${tempColor}60`,
          letterSpacing: '-2px',
        }}>
          {weather.temperature.toFixed(1)}
        </span>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '1.5rem', color: tempColor, opacity: 0.7, marginBottom: '8px' }}>°C</span>
      </div>

      {/* Stats */}
      <StatRow
        icon="💧" label="Humidade" value={`${weather.humidity}`} unit="%"
        pct={weather.humidity} color="#2E86C1"
      />
      <StatRow
        icon="💨" label="Vento" value={weather.windSpeed.toFixed(0)} unit="km/h"
        pct={(weather.windSpeed / 80) * 100} color="#1ABC9C"
      />
      <StatRow
        icon="🌧️" label="Precipitação" value={`${weather.precipitation}`} unit="mm"
        pct={Math.min((weather.precipitation / 20) * 100, 100)} color="#9B59B6"
      />

      {weather.fallback && (
        <p style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5, marginTop: '0.5rem' }}>referência</p>
      )}
    </GlassCard>
  )
}
