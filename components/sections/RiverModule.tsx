'use client'

import { useRiver } from '@/hooks/useRiver'
import GlassCard from '@/components/ui/GlassCard'

const TREND_ICON = { rising: '↑', falling: '↓', stable: '→' }
const TREND_COLOR = { rising: 'var(--accent-red)', falling: 'var(--accent-blue)', stable: 'var(--accent-teal)' }
const TREND_LABEL = { rising: 'A subir', falling: 'A descer', stable: 'Estável' }

function RiverSparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 0.1
  const W = 200
  const H = 40
  const pad = 4

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (W - pad * 2) + pad
    const y = H - pad - ((v - min) / range) * (H - pad * 2)
    return `${x},${y}`
  }).join(' ')

  const fillPoints = `${pad},${H} ${points} ${W - pad},${H}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '40px', display: 'block' }}>
      <defs>
        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPoints} fill="url(#riverGrad)" />
      <polyline points={points} fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export default function RiverModule() {
  const { data: river, isLoading } = useRiver()

  if (isLoading || !river) {
    return (
      <GlassCard style={{ alignSelf: 'start' }}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-primary)] rounded w-28" />
          <div className="h-10 bg-[var(--bg-primary)] rounded w-20" />
        </div>
      </GlassCard>
    )
  }

  const trendColor = TREND_COLOR[river.trend]
  const alertLevel = river.level >= 3 ? 'danger' : river.level >= 2 ? 'warning' : null
  const alertColor = alertLevel === 'danger' ? 'var(--accent-red)' : '#E67E22'
  const alertText = alertLevel === 'danger' ? '⚠️ Nível crítico — risco de cheia' : '⚠️ Nível elevado — atenção'

  return (
    <GlassCard style={{
      alignSelf: 'start',
      ...(alertLevel ? { border: `1px solid ${alertColor}40`, boxShadow: `0 0 20px ${alertColor}20` } : {}),
    }}>
      <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
        RIO MONDEGO · COIMBRA
      </span>

      {alertLevel && (
        <div style={{
          padding: '6px 10px', borderRadius: '6px', marginBottom: '0.75rem',
          background: `${alertColor}18`, border: `1px solid ${alertColor}40`,
          fontSize: '10px', color: alertColor, fontFamily: 'var(--font-dm-sans)', fontWeight: 600,
        }}>
          {alertText}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '2.25rem', fontWeight: 600, color: alertLevel ? alertColor : 'var(--accent-blue)', lineHeight: 1 }}>
          {river.level.toFixed(2)}
          <span style={{ fontSize: '1rem', marginLeft: '4px', color: 'var(--text-secondary)' }}>m</span>
        </span>
        <span style={{ fontSize: '1.25rem', color: trendColor, lineHeight: 1, marginBottom: '4px', fontWeight: 700 }}>
          {TREND_ICON[river.trend]}
        </span>
      </div>

      <span style={{ fontSize: '11px', color: trendColor, marginBottom: '0.75rem', display: 'block' }}>
        {TREND_LABEL[river.trend]}
      </span>

      <RiverSparkline values={river.history} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>–7 dias</span>
        <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Agora</span>
      </div>

      {river.fallback && (
        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '0.5rem', opacity: 0.6 }}>
          Dados de referência · SNIRH
        </p>
      )}
    </GlassCard>
  )
}
