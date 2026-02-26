'use client'

import { useWaterQuality } from '@/hooks/useWaterQuality'
import GlassCard from '@/components/ui/GlassCard'

interface Param { label: string; value: number; unit: string; min: number; max: number; ideal: string }

function ParamBar({ label, value, unit, min, max, ideal }: Param) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const inRange = pct > 10 && pct < 90
  const color = inRange ? '#1ABC9C' : '#E67E22'

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)' }}>{label}</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-dm-mono)', color }}>
          {value} <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{unit}</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
        {/* Ideal zone highlight */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '100%',
          background: 'rgba(26,188,156,0.12)', borderRadius: '3px',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: `${pct}%`, height: '100%',
          background: color, borderRadius: '3px',
          boxShadow: `0 0 6px ${color}60`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
        <div style={{
          position: 'absolute', top: '-2px', left: `${pct}%`,
          transform: 'translateX(-50%)',
          width: '9px', height: '9px',
          borderRadius: '50%',
          background: color,
          border: '2px solid var(--bg-card)',
          transition: 'left 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.6, marginTop: '2px', display: 'block' }}>
        Ideal: {ideal}
      </span>
    </div>
  )
}

export default function WaterQualityModule() {
  const { data: water, isLoading } = useWaterQuality()

  if (isLoading || !water) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-primary)] rounded w-32" />
          <div className="h-16 bg-[var(--bg-primary)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const isClean = water.status === 'Própria'

  return (
    <GlassCard>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>
            ÁGUA DA TORNEIRA
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
            {water.source}
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '9999px',
          background: isClean ? 'rgba(26,188,156,0.15)' : 'rgba(231,76,60,0.15)',
          border: `1px solid ${isClean ? 'rgba(26,188,156,0.4)' : 'rgba(231,76,60,0.4)'}`,
        }}>
          <span style={{ fontSize: '14px' }}>{isClean ? '💧' : '⚠️'}</span>
          <span style={{
            fontSize: '11px', fontWeight: 700,
            color: isClean ? '#1ABC9C' : '#E74C3C',
            fontFamily: 'var(--font-dm-sans)',
          }}>
            {water.status}
          </span>
        </div>
      </div>

      {/* Parameters */}
      <ParamBar label="pH" value={water.ph} unit="" min={6.5} max={9.0} ideal="6.5 – 9.0" />
      <ParamBar label="Cloro Residual" value={water.chlorine} unit="mg/L" min={0.1} max={0.6} ideal="0.1 – 0.6 mg/L" />
      <ParamBar label="Turbidez" value={water.turbidity} unit="NTU" min={0} max={4} ideal="< 1.0 NTU" />
      <ParamBar label="Nitratos" value={water.nitrates} unit="mg/L" min={0} max={50} ideal="< 50 mg/L" />

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--glass-border)' }}>
        <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.6 }}>
          Fonte: ERSAR / SMAS Coimbra
        </span>
        <span style={{ fontSize: '9px', fontFamily: 'var(--font-dm-mono)', color: 'var(--text-secondary)', opacity: 0.6 }}>
          {new Date(water.lastAnalysis + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </GlassCard>
  )
}
