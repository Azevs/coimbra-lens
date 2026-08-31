'use client'

import { useWaterQuality } from '@/hooks/useWaterQuality'
import GlassCard from '@/components/ui/GlassCard'
import DataSource from '@/components/ui/DataSource'
import { colorMix } from '@/lib/color'

interface Param { label: string; value: number; unit: string; min: number; max: number; ideal: string }

function ParamBar({ label, value, unit, min, max, ideal }: Param) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  const inRange = pct > 10 && pct < 90
  const color = inRange ? 'var(--tone-teal)' : 'var(--tone-amber)'

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--font-ibm-plex)' }}>{label}</span>
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-jetbrains)', color }}>
          {value} <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{unit}</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px' }}>
        {/* Ideal zone highlight */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '100%',
          background: 'rgba(46,125,110,0.14)', borderRadius: '3px',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: `${pct}%`, height: '100%',
          background: color, borderRadius: '3px',
          boxShadow: `0 0 6px ${colorMix(color, 38)}`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
        <div style={{
          position: 'absolute', top: '-2px', left: `${pct}%`,
          transform: 'translateX(-50%)',
          width: '9px', height: '9px',
          borderRadius: '50%',
          background: color,
          border: '2px solid var(--bg-secondary)',
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
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-32" />
          <div className="h-16 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const isClean = water.status.startsWith('Própria')

  return (
    <GlassCard>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block' }}>
            ÁGUA DA TORNEIRA
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
            {water.origin}
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '9999px',
          background: isClean ? 'rgba(46,125,110,0.15)' : 'rgba(138,31,46,0.15)',
          border: `1px solid ${isClean ? 'rgba(46,125,110,0.45)' : 'rgba(138,31,46,0.45)'}`,
        }}>
          <span style={{ fontSize: '14px' }}>{isClean ? '💧' : '⚠️'}</span>
          <span style={{
            fontSize: '11px', fontWeight: 700,
            color: isClean ? 'var(--tone-teal)' : 'var(--tone-crimson)',
            fontFamily: 'var(--font-ibm-plex)',
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

      <DataSource meta={water.meta} />
    </GlassCard>
  )
}
