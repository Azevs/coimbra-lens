'use client'

import { useAirQuality, type Pollen, type PollenLevel } from '@/hooks/useAirQuality'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { colorMix } from '@/lib/color'
import { fmt } from '@/lib/format'

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

const POLUENTES = [
  { key: 'pm25', nome: 'PM2.5', artigo: 'pelas partículas finas (PM2.5)' },
  { key: 'pm10', nome: 'PM10', artigo: 'pelas partículas (PM10)' },
  { key: 'no2', nome: 'NO₂', artigo: 'pelo dióxido de azoto' },
  { key: 'o3', nome: 'O₃', artigo: 'pelo ozono' },
] as const

/**
 * Cada poluente no seu sub-índice, todos na mesma escala do índice geral.
 * O índice é o pior deles — as barras mostram qual o está a puxar.
 */
function PoluenteRow({ nome, conc, sub, dominante }: { nome: string; conc: number | null; sub: number | null; dominante: boolean }) {
  const color = sub === null ? 'var(--tone-muted)' : getAqiColor(sub)
  return (
    <div className={`ar-poluente ${dominante ? 'is-dominante' : ''}`}>
      <span className="ar-nome">{nome}</span>
      <span className="ar-pista" aria-hidden="true">
        {sub !== null && (
          <i style={{ width: `${Math.min(100, (sub / EAQI_MAX) * 100)}%`, background: color, boxShadow: dominante ? `0 0 8px ${colorMix(color, 40)}` : 'none' }} />
        )}
      </span>
      <span className="ar-conc">
        {conc === null ? '—' : fmt(conc, conc < 10 ? 1 : 0)}
        <small> µg/m³</small>
      </span>
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

  // Tudo baixo é uma frase, não quatro barras vazias.
  if (pollen.every((p) => p.level === 'baixo')) {
    return (
      <p className="ar-polen-resumo">
        <Label style={{ margin: 0 }}>Pólen</Label>
        <span>
          <b style={{ color: POLLEN_STYLE.baixo.color }}>Baixo</b> em todas as espécies —{' '}
          {pollen.map((p) => p.label.toLowerCase()).join(', ')}.
        </span>
      </p>
    )
  }

  return (
    <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
      <Label style={{ marginBottom: '0.625rem' }}>Pólen · grãos/m³</Label>
      {pollen.map((p) => {
        const s = POLLEN_STYLE[p.level]
        return (
          <div key={p.key} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.label}</span>
              <span style={{ fontSize: '11px', color: s.color, fontFamily: 'var(--font-jetbrains)', fontWeight: 600 }}>
                {s.label} <span style={{ color: 'var(--text-tertiary)' }}>{p.value}</span>
              </span>
            </div>
            <div style={{ height: '3px', background: 'rgba(20,23,28,0.10)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '2px', transition: 'width 1s ease' }} />
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

  const header = <Label style={{ marginBottom: '0.75rem' }}>Qualidade do ar</Label>

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
  const sub = air.subIndex ?? { pm25: null, pm10: null, no2: null, o3: null }
  const subs = POLUENTES.map((p) => sub[p.key] ?? -1)
  const iDom = subs.indexOf(Math.max(...subs))
  const dominante = subs[iDom] >= 0 ? POLUENTES[iDom] : null

  return (
    <GlassCard>
      {header}

      <p className="ar-frase">
        <span className="ar-estado" style={{ color, background: colorMix(color, 13), borderColor: colorMix(color, 30) }}>
          {air.status}
        </span>
        {/* Com ar bom, não há nada a puxar o índice. */}
        {dominante && air.aqi > 20 ? <> — puxada {dominante.artigo}.</> : null}
      </p>

      <div className="ar-escala" aria-hidden="true">
        <span />
        <span className="ar-escala-marcas"><span>0</span><span>sub-índice europeu</span><span>100</span></span>
        <span />
      </div>
      {POLUENTES.map((p, i) => (
        <PoluenteRow
          key={p.key}
          nome={p.nome}
          conc={air[p.key]}
          sub={sub[p.key]}
          dominante={i === iDom && dominante !== null}
        />
      ))}

      <PollenSection pollen={air.pollen} />

      <DataSource meta={air.meta} />
    </GlassCard>
  )
}
