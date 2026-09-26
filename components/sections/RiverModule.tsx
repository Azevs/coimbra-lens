'use client'

import { useRiver, type RiverPoint, type RiverTrend } from '@/hooks/useRiver'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'

const TREND_ICON: Record<RiverTrend, string> = { rising: '↑', falling: '↓', stable: '→' }
const TREND_COLOR: Record<RiverTrend, string> = { rising: 'var(--tone-amber-text)', falling: 'var(--tone-blue-text)', stable: 'var(--tone-teal-text)' }
const TREND_LABEL: Record<RiverTrend, string> = { rising: 'A subir', falling: 'A descer', stable: 'Estável' }

// O pt-PT do Intl escreve "sábado" mesmo em formato curto.
const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const diaCurto = (date: string) => {
  const d = new Date(date + 'T12:00:00')
  return `${DIAS[d.getDay()]} ${d.getDate()}`
}
const diaLongo = (date: string) =>
  new Date(date + 'T12:00:00').toLocaleDateString('pt-PT', { weekday: 'long' }).replace('-feira', '')

/** Um tecto redondo para a escala: 10, 20, 25, 50, 100… */
function tecto(v: number): number {
  const p = 10 ** Math.floor(Math.log10(Math.max(v, 1)))
  for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10]) if (m * p >= v) return m * p
  return 10 * p
}

/**
 * Catorze dias do Mondego: sete para trás, a cheio, e sete previstos, a
 * tracejado. A escala começa no zero — assim uma variação de 1 % parece
 * o que é, e uma subida a sério vê-se sem ajuda.
 */
function Caudal({ series }: { series: RiverPoint[] }) {
  const n = series.length
  const corte = series.findIndex((p) => p.forecast)
  const iHoje = corte === -1 ? n - 1 : Math.max(0, corte - 1)
  const max = tecto(Math.max(...series.map((p) => p.discharge)) * 1.15)

  const x = (i: number) => (i / (n - 1)) * 100
  const y = (v: number) => 100 - (v / max) * 100
  const pts = series.map((p, i) => `${x(i)},${y(p.discharge)}`)
  const passado = pts.slice(0, iHoje + 1).join(' ')
  const futuro = pts.slice(iHoje).join(' ')

  const futuros = series.slice(iHoje + 1)
  const iPico = futuros.length
    ? iHoje + 1 + futuros.reduce((m, p, i) => (p.discharge > futuros[m].discharge ? i : m), 0)
    : -1
  const pico = iPico >= 0 && series[iPico].discharge > series[iHoje].discharge * 1.1 ? iPico : -1

  return (
    <div className="rio-grafico" role="img" aria-label={`Caudal do Mondego nos últimos 7 dias e previsão para 7 dias, numa escala de 0 a ${fmt(max)} m³/s.`}>
      <div className="rio-area">
        {[0, 0.5, 1].map((f) => (
          <span key={f} className="rio-grelha-linha" style={{ top: `${y(max * f)}%` }}>
            <span>{fmt(max * f)}</span>
          </span>
        ))}

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rio-agua" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--tone-blue)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--tone-blue)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <polygon points={`0,100 ${passado} ${x(iHoje)},100`} fill="url(#rio-agua)" />
          <polygon points={`${x(iHoje)},100 ${futuro} 100,100`} fill="url(#rio-agua)" opacity="0.45" />
          <polyline points={passado} fill="none" stroke="var(--tone-blue)" strokeWidth="2.25" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <polyline points={futuro} fill="none" stroke="var(--tone-blue)" strokeWidth="1.75" strokeDasharray="4 4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <line x1={x(iHoje)} x2={x(iHoje)} y1="0" y2="100" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        </svg>

        <span className="rio-ponto" style={{ left: `${x(iHoje)}%`, top: `${y(series[iHoje].discharge)}%` }} />
        <span className="rio-hoje" style={{ left: `${x(iHoje)}%` }}>hoje</span>
        <span className="rio-tramo" style={{ left: 0, right: `${100 - x(iHoje)}%` }}>últimos 7 dias</span>
        <span className="rio-tramo is-previsto" style={{ left: `${x(iHoje)}%`, right: 0 }}>previsão</span>

        {pico >= 0 && (
          <span className="rio-pico" style={{ left: `${x(pico)}%`, top: `${y(series[pico].discharge)}%` }}>
            {fmt(series[pico].discharge, 1)}
          </span>
        )}
      </div>

      <div className="rio-eixo" aria-hidden="true">
        {series.map((p, i) => (
          <span key={p.date} className={i % 2 ? 'rio-eixo-par' : ''} style={{ left: `${x(i)}%` }}>
            {diaCurto(p.date)}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function RiverModule() {
  const { data: river, isLoading } = useRiver()

  if (isLoading || !river) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-28" />
          <div className="h-32 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const header = <Label style={{ marginBottom: '0.75rem' }}>Rio Mondego · caudal em Coimbra</Label>

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

  const passados = river.series.filter((p) => !p.forecast).map((p) => p.discharge)
  const previstos = river.series.filter((p) => p.forecast)
  const picoPrevisto = previstos.length
    ? previstos.reduce((m, p) => (p.discharge > m.discharge ? p : m))
    : null

  return (
    <GlassCard>
      <div className="rio">
        <div className="rio-info">
          {header}

          {surge && (
            <div className="rio-alerta">
              Subida prevista até {fmt(river.forecastPeak ?? 0)} m³/s nos próximos dias.
            </div>
          )}

          <div className="rio-valor">
            <span className="rio-num">{fmt(river.discharge, 1)}</span>
            <span className="rio-unid">m³/s</span>
            <span style={{ color: trendColor }} className="rio-tendencia">
              <span aria-hidden="true">{TREND_ICON[river.trend]}</span> {TREND_LABEL[river.trend]}
            </span>
          </div>

          <dl className="rio-factos">
            {passados.length > 1 && (
              <div>
                <dt>Últimos 7 dias</dt>
                <dd>entre {fmt(Math.min(...passados), 1)} e {fmt(Math.max(...passados), 1)} m³/s</dd>
              </div>
            )}
            {picoPrevisto && (
              <div>
                <dt>Máximo previsto</dt>
                <dd>{fmt(picoPrevisto.discharge, 1)} m³/s, {diaLongo(picoPrevisto.date)}</dd>
              </div>
            )}
          </dl>

          <DataSource meta={river.meta} />
        </div>

        {river.series.length > 1 && <Caudal series={river.series} />}
      </div>
    </GlassCard>
  )
}
