'use client'

import { useEffect, useRef } from 'react'
import { useAirQuality } from '@/hooks/useAirQuality'
import GlassCard from '@/components/ui/GlassCard'

function getAqiColor(aqi: number): string {
  if (aqi <= 50) return '#1ABC9C'
  if (aqi <= 100) return '#F1C40F'
  if (aqi <= 150) return '#E67E22'
  return '#E74C3C'
}

function getAqiLabel(aqi: number): string {
  if (aqi <= 50) return 'Bom'
  if (aqi <= 100) return 'Moderado'
  if (aqi <= 150) return 'Insalubre (grupos)'
  return 'Insalubre'
}

function AqiArc({ value, max = 200 }: { value: number; max?: number }) {
  const circleRef = useRef<SVGCircleElement>(null)
  const color = getAqiColor(value)
  const R = 42
  const circumference = 2 * Math.PI * R
  const filled = (Math.min(value, max) / max) * circumference * 0.75

  useEffect(() => {
    const el = circleRef.current
    if (!el) return
    el.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease'
    el.style.strokeDasharray = `${filled} ${circumference}`
    el.style.stroke = color
  }, [value, color, filled, circumference])

  return (
    <svg width="110" height="80" viewBox="0 0 110 80">
      {/* Track */}
      <circle cx="55" cy="70" r={R} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${circumference * 0.75} ${circumference}`}
        transform="rotate(135 55 70)"
      />
      {/* Arc */}
      <circle ref={circleRef} cx="55" cy="70" r={R} fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`0 ${circumference}`}
        transform="rotate(135 55 70)"
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
      <text x="55" y="64" textAnchor="middle" fill={color}
        fontFamily="var(--font-dm-mono)" fontSize="22" fontWeight="700">
        {value}
      </text>
      <text x="55" y="76" textAnchor="middle" fill="rgba(255,255,255,0.35)"
        fontFamily="var(--font-dm-sans)" fontSize="8" letterSpacing="2">
        AQI
      </text>
    </svg>
  )
}

function PollutantRow({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', letterSpacing: '0.08em' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '11px', color: 'var(--text-primary)' }}>{value}</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color, borderRadius: '2px',
          boxShadow: `0 0 6px ${color}50`,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  )
}

const POLLEN_SEASON: Record<number, { grasses: number; olive: number; cypress: number }> = {
  1: { grasses: 5,  olive: 0,  cypress: 40 },
  2: { grasses: 8,  olive: 0,  cypress: 60 },
  3: { grasses: 20, olive: 5,  cypress: 80 },
  4: { grasses: 55, olive: 30, cypress: 40 },
  5: { grasses: 90, olive: 85, cypress: 10 },
  6: { grasses: 70, olive: 95, cypress: 5  },
  7: { grasses: 30, olive: 20, cypress: 5  },
  8: { grasses: 15, olive: 5,  cypress: 5  },
  9: { grasses: 10, olive: 2,  cypress: 5  },
  10:{ grasses: 8,  olive: 0,  cypress: 10 },
  11:{ grasses: 5,  olive: 0,  cypress: 20 },
  12:{ grasses: 5,  olive: 0,  cypress: 35 },
}

function pollenLabel(pct: number): { label: string; color: string } {
  if (pct <= 20) return { label: 'Baixo', color: '#1ABC9C' }
  if (pct <= 50) return { label: 'Moderado', color: '#F1C40F' }
  if (pct <= 75) return { label: 'Alto', color: '#E67E22' }
  return { label: 'Muito alto', color: '#E74C3C' }
}

function PollenSection() {
  const month = new Date().getMonth() + 1
  const data = POLLEN_SEASON[month] ?? POLLEN_SEASON[1]
  const rows = [
    { label: 'Gramíneas', value: data.grasses },
    { label: 'Oliveira', value: data.olive },
    { label: 'Cipreste', value: data.cypress },
  ]
  return (
    <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--glass-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          PÓLEN · COIMBRA
        </span>
        <span style={{ fontSize: '8px', color: 'var(--text-secondary)', opacity: 0.5 }}>Ref. APPA/SPAIC</span>
      </div>
      {rows.map((r) => {
        const { label: lvl, color } = pollenLabel(r.value)
        return (
          <div key={r.label} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{r.label}</span>
              <span style={{ fontSize: '9px', color, fontFamily: 'var(--font-dm-sans)', fontWeight: 600 }}>{lvl}</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${r.value}%`, background: color, borderRadius: '2px', boxShadow: `0 0 4px ${color}50`, transition: 'width 1s ease' }} />
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
          <div className="h-4 bg-[var(--bg-primary)] rounded w-24" />
          <div className="h-20 bg-[var(--bg-primary)] rounded" />
          <div className="h-4 bg-[var(--bg-primary)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const color = getAqiColor(air.aqi)

  return (
    <GlassCard style={{ overflow: 'hidden', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', display: 'block', marginBottom: '0.75rem' }}>
        QUALIDADE DO AR
      </span>

      {/* Arc + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--glass-border)' }}>
        <AqiArc value={air.aqi} />
        <div>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '9999px',
            fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-dm-sans)',
            background: `${color}20`, color,
            border: `1px solid ${color}40`,
            marginBottom: '6px',
          }}>
            {getAqiLabel(air.aqi)}
          </span>
          <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Índice de<br />Qualidade do Ar
          </p>
        </div>
      </div>

      {/* Pollutants */}
      <PollutantRow label="PM2.5 μg/m³" value={air.pm25} max={75} color="#C9A84C" />
      <PollutantRow label="PM10 μg/m³" value={air.pm10} max={150} color="#2E86C1" />
      <PollutantRow label="NO₂ μg/m³" value={air.no2} max={200} color="#9B59B6" />

      {/* Pollen */}
      <PollenSection />

      {air.fallback && (
        <p style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5, marginTop: '0.5rem' }}>referência</p>
      )}
    </GlassCard>
  )
}
