'use client'

import { useEffect, useRef } from 'react'
import { useAirQuality, type Pollen, type PollenLevel } from '@/hooks/useAirQuality'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { colorMix } from '@/lib/color'

/** Bandas do European AQI, em tons da paleta do painel. */
function getAqiColor(eaqi: number): string {
  if (eaqi <= 20) return 'var(--tone-teal)'
  if (eaqi <= 40) return 'var(--tone-moss)'
  if (eaqi <= 60) return 'var(--tone-amber)'
  if (eaqi <= 80) return 'var(--accent)'
  return 'var(--tone-crimson)'
}

/** O EAQI satura a 100; acima disso a escala é aberta. */
const EAQI_MAX = 100

function AqiArc({ value }: { value: number }) {
  const circleRef = useRef<SVGCircleElement>(null)
  const color = getAqiColor(value)
  const R = 42
  const circumference = 2 * Math.PI * R
  const filled = (Math.min(value, EAQI_MAX) / EAQI_MAX) * circumference * 0.75

  useEffect(() => {
    const el = circleRef.current
    if (!el) return
    el.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease'
    el.style.strokeDasharray = `${filled} ${circumference}`
    el.style.stroke = color
  }, [value, color, filled, circumference])

  return (
    <svg width="110" height="80" viewBox="0 0 110 80" role="img" aria-label={`Índice europeu de qualidade do ar: ${value}`}>
      <circle cx="55" cy="70" r={R} fill="none"
        stroke="rgba(20,23,28,0.10)" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${circumference * 0.75} ${circumference}`}
        transform="rotate(135 55 70)"
      />
      <circle ref={circleRef} cx="55" cy="70" r={R} fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`0 ${circumference}`}
        transform="rotate(135 55 70)"
        style={{ filter: `drop-shadow(0 0 6px ${colorMix(color, 50)})` }}
      />
      <text x="55" y="64" textAnchor="middle" fill={color}
        fontFamily="var(--font-jetbrains)" fontSize="22" fontWeight="700">
        {value}
      </text>
      <text x="55" y="76" textAnchor="middle" fill="var(--text-tertiary)"
        fontFamily="var(--font-ibm-plex)" fontSize="8" letterSpacing="2">
        EAQI
      </text>
    </svg>
  )
}

function PollutantRow({ label, value, max, color }: { label: string; value: number | null; max: number; color: string }) {
  const pct = value === null ? 0 : Math.min(100, (value / max) * 100)
  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ibm-plex)', letterSpacing: '0.06em' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: 'var(--text-primary)' }}>
          {value === null ? '—' : value}
        </span>
      </div>
      <div style={{ height: '3px', background: 'rgba(20,23,28,0.10)', borderRadius: '2px' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color, borderRadius: '2px',
          boxShadow: `0 0 6px ${colorMix(color, 31)}`,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

const POLLEN_STYLE: Record<PollenLevel, { label: string; color: string; pct: number }> = {
  'baixo':      { label: 'Baixo',      color: 'var(--tone-teal-text)', pct: 18 },
  'moderado':   { label: 'Moderado',   color: 'var(--tone-amber-text)', pct: 45 },
  'alto':       { label: 'Alto',       color: 'var(--accent-text)', pct: 72 },
  'muito-alto': { label: 'Muito alto', color: 'var(--tone-crimson-text)', pct: 100 },
}

function PollenSection({ pollen }: { pollen: Pollen[] }) {
  if (pollen.length === 0) return null

  return (
    <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          Pólen · grãos/m³
        </span>
      </div>
      {pollen.map((p) => {
        const s = POLLEN_STYLE[p.level]
        return (
          <div key={p.key} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.label}</span>
              <span style={{ fontSize: '10px', color: s.color, fontFamily: 'var(--font-jetbrains)', fontWeight: 600 }}>
                {s.label} <span style={{ color: 'var(--text-tertiary)' }}>{p.value}</span>
              </span>
            </div>
            <div style={{ height: '3px', background: 'rgba(20,23,28,0.10)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '2px', boxShadow: `0 0 4px ${colorMix(s.color, 31)}`, transition: 'width 1s ease' }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function AirQualityModule() {
  const { data: air, isLoading } = useAirQuality()

  if (isLoading || !air) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-24" />
          <div className="h-20 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const header = (
    <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-ibm-plex)', display: 'block', marginBottom: '0.75rem' }}>
      Qualidade do Ar
    </span>
  )

  // Sem leitura, o módulo diz que não sabe em vez de mostrar um valor plausível.
  if (air.aqi === null) {
    return (
      <GlassCard>
        {header}
        <DataUnavailable meta={air.meta} />
        <DataSource meta={air.meta} showNote={false} />
      </GlassCard>
    )
  }

  const color = getAqiColor(air.aqi)

  return (
    <GlassCard style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: `radial-gradient(circle, ${colorMix(color, 9)} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {header}

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <AqiArc value={air.aqi} />
        <div>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '3px',
            fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-ibm-plex)',
            background: `${colorMix(color, 13)}`, color,
            border: `1px solid ${colorMix(color, 27)}`,
            marginBottom: '6px',
          }}>
            {air.status}
          </span>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Índice Europeu de<br />Qualidade do Ar
          </p>
        </div>
      </div>

      <PollutantRow label="PM2.5 μg/m³" value={air.pm25} max={75} color="var(--tone-amber)" />
      <PollutantRow label="PM10 μg/m³" value={air.pm10} max={150} color="var(--tone-blue)" />
      <PollutantRow label="NO₂ μg/m³" value={air.no2} max={200} color="var(--tone-teal)" />
      <PollutantRow label="O₃ μg/m³" value={air.o3} max={240} color="var(--accent)" />

      <PollenSection pollen={air.pollen} />

      <DataSource meta={air.meta} />
    </GlassCard>
  )
}
