'use client'

import { useRiver, type RiverPoint, type RiverTrend } from '@/hooks/useRiver'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'

const TREND_ICON: Record<RiverTrend, string> = { rising: '↑', falling: '↓', stable: '→' }
const TREND_COLOR: Record<RiverTrend, string> = { rising: 'var(--tone-amber)', falling: 'var(--tone-blue)', stable: 'var(--tone-teal)' }
const TREND_LABEL: Record<RiverTrend, string> = { rising: 'A subir', falling: 'A descer', stable: 'Estável' }

/**
 * Série de 14 dias: 7 passados a cheio, 7 previstos a tracejado, com o
 * dia de hoje marcado. O corte entre medido e previsto é a informação
 * mais importante do gráfico, por isso é visível na própria linha.
 */
function DischargeSparkline({ series }: { series: RiverPoint[] }) {
  if (series.length < 2) return null

  const values = series.map((p) => p.discharge)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const W = 220
  const H = 52
  const pad = 5

  const xy = (i: number, v: number): [number, number] => [
    (i / (series.length - 1)) * (W - pad * 2) + pad,
    H - pad - ((v - min) / range) * (H - pad * 2),
  ]

  const pts = series.map((p, i) => xy(i, p.discharge))
  const splitIdx = series.findIndex((p) => p.forecast)
  const lastPast = splitIdx === -1 ? pts.length - 1 : splitIdx - 1

  const toPath = (slice: [number, number][]) => slice.map(([x, y]) => `${x},${y}`).join(' ')
  const pastPts = pts.slice(0, lastPast + 1)
  // A linha prevista começa no último ponto medido para não haver salto.
  const futurePts = pts.slice(lastPast)

  const [cx, cy] = pts[lastPast] ?? pts[0]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '52px', display: 'block' }} role="img" aria-label="Caudal dos últimos 7 dias e previsão para 7 dias">
      <defs>
        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--tone-blue)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--tone-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pad},${H} ${toPath(pastPts)} ${cx},${H}`} fill="url(#riverGrad)" />
      <polyline points={toPath(pastPts)} fill="none" stroke="var(--tone-blue)" strokeWidth="2" strokeLinejoin="round" />
      <polyline points={toPath(futurePts)} fill="none" stroke="var(--tone-blue)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r="3" fill="var(--tone-blue)" stroke="var(--bg-secondary)" strokeWidth="1.5" />
    </svg>
  )
}

export default function RiverModule() {
  const { data: river, isLoading } = useRiver()

  if (isLoading || !river) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-28" />
          <div className="h-10 bg-[var(--bg-sunken)] rounded w-20" />
        </div>
      </GlassCard>
    )
  }

  const header = (
    <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.75rem' }}>
      Rio Mondego · Caudal
    </span>
  )

  if (river.discharge === null) {
    return (
      <GlassCard>
        {header}
        <DataUnavailable meta={river.meta} />
        <DataSource meta={river.meta} showNote={false} />
      </GlassCard>
    )
  }

  const trendColor = TREND_COLOR[river.trend]

  // Um pico previsto muito acima do caudal actual é a informação accionável.
  // Não afirmamos "risco de cheia" — não temos o limiar hidrológico para isso.
  const surge = river.forecastPeak !== null && river.forecastPeak > river.discharge * 1.6

  return (
    <GlassCard>
      {header}

      {surge && (
        <div style={{
          padding: '7px 10px', borderRadius: '3px', marginBottom: '0.75rem',
          background: 'rgba(176,125,58,0.15)', border: '1px solid rgba(176,125,58,0.45)',
          fontSize: '11px', color: 'var(--tone-amber-text)', fontFamily: 'var(--font-ibm-plex)', fontWeight: 600, lineHeight: 1.45,
        }}>
          Subida prevista até {river.forecastPeak?.toFixed(0)} m³/s nos próximos dias.
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', marginBottom: '0.35rem' }}>
        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '2.25rem', fontWeight: 600, color: 'var(--tone-blue-text)', lineHeight: 1 }}>
          {river.discharge.toFixed(1)}
          <span style={{ fontSize: '0.9rem', marginLeft: '5px', color: 'var(--text-secondary)' }}>m³/s</span>
        </span>
        <span style={{ fontSize: '1.25rem', color: trendColor, lineHeight: 1, marginBottom: '4px', fontWeight: 700 }} aria-hidden="true">
          {TREND_ICON[river.trend]}
        </span>
      </div>

      <span style={{ fontSize: '11px', color: trendColor, marginBottom: '0.75rem', display: 'block' }}>
        {TREND_LABEL[river.trend]}
      </span>

      <DischargeSparkline series={river.series} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>–7 dias</span>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>previsão +7</span>
      </div>

      <DataSource meta={river.meta} />
    </GlassCard>
  )
}
