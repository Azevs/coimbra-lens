'use client'

import { useIpma, type Warning, type WarningLevel } from '@/hooks/useIpma'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { colorMix } from '@/lib/color'

const LEVEL_STYLE: Record<WarningLevel, { label: string; color: string }> = {
  green: { label: 'Sem avisos', color: 'var(--tone-teal)' },
  yellow: { label: 'Aviso amarelo', color: 'var(--tone-amber)' },
  orange: { label: 'Aviso laranja', color: 'var(--tone-clay)' },
  red: { label: 'Aviso vermelho', color: 'var(--tone-crimson)' },
}

/** A escala do IPMA vai de 1 a 5; a cor acompanha a gravidade. */
const FIRE_COLOR: Record<number, string> = {
  1: 'var(--tone-teal)',
  2: 'var(--tone-moss)',
  3: 'var(--tone-amber)',
  4: 'var(--accent)',
  5: 'var(--tone-crimson)',
}

function formatWindow(start: string, end: string): string {
  if (!start || !end) return ''
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }
  const s = new Date(start).toLocaleString('pt-PT', opts)
  const e = new Date(end).toLocaleString('pt-PT', opts)
  return `${s} → ${e}`
}

function WarningRow({ warning }: { warning: Warning }) {
  const { color } = LEVEL_STYLE[warning.level]
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.625rem',
        alignItems: 'flex-start',
        padding: '0.625rem 0.75rem',
        borderRadius: '3px',
        background: colorMix(color, 10),
        border: `1px solid ${colorMix(color, 32)}`,
        marginBottom: '0.5rem',
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0, marginTop: '6px' }}
      />
      <div style={{ minWidth: 0 }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color, display: 'block', fontFamily: 'var(--font-ibm-plex)' }}>
          {warning.type}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-jetbrains)' }}>
          {formatWindow(warning.startTime, warning.endTime)}
        </span>
        {warning.text && (
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '3px 0 0', lineHeight: 1.45 }}>
            {warning.text}
          </p>
        )}
      </div>
    </div>
  )
}

/** Cinco segmentos, o activo aceso — a escala inteira é a informação. */
function FireScale({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginTop: '0.5rem' }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = n <= level
        const color = FIRE_COLOR[level] ?? 'var(--tone-muted)'
        return (
          <div
            key={n}
            style={{
              flex: 1,
              height: '5px',
              borderRadius: '2px',
              background: on ? color : 'var(--bg-sunken)',
              border: on ? 'none' : '1px solid var(--border-subtle)',
              boxShadow: on ? `0 0 6px ${colorMix(color, 40)}` : 'none',
              transition: 'background 0.6s ease',
            }}
          />
        )
      })}
    </div>
  )
}

export default function IpmaModule() {
  const { data, isLoading } = useIpma()

  if (isLoading || !data) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-32" />
          <div className="h-16 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const header = (
    <span
      style={{
        fontSize: '10px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        display: 'block',
        marginBottom: '0.75rem',
      }}
    >
      Avisos & Risco de Incêndio
    </span>
  )

  if (data.meta.provenance === 'unavailable') {
    return (
      <GlassCard>
        {header}
        <DataUnavailable meta={data.meta} />
        <DataSource meta={data.meta} showNote={false} />
      </GlassCard>
    )
  }

  const status = LEVEL_STYLE[data.maxLevel]
  const fireColor = data.fire ? FIRE_COLOR[data.fire.level] ?? 'var(--tone-muted)' : 'var(--tone-muted)'

  return (
    <GlassCard>
      {header}

      {/* Estado geral dos avisos */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '5px 12px',
          borderRadius: '3px',
          background: colorMix(status.color, 12),
          border: `1px solid ${colorMix(status.color, 40)}`,
          marginBottom: '1rem',
        }}
      >
        <span aria-hidden="true" style={{ width: '7px', height: '7px', borderRadius: '50%', background: status.color }} />
        <span style={{ fontSize: '12px', fontWeight: 700, color: status.color, fontFamily: 'var(--font-ibm-plex)' }}>
          {status.label}
        </span>
      </div>

      {data.warnings.length > 0 ? (
        <div style={{ marginBottom: '0.5rem' }}>
          {data.warnings.map((w, i) => (
            <WarningRow key={`${w.type}-${i}`} warning={w} />
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.5rem' }}>
          Nenhum aviso meteorológico em vigor para o distrito de Coimbra.
        </p>
      )}

      {/* Risco de incêndio rural */}
      {data.fire && (
        <div style={{ marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              Risco de incêndio rural
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: fireColor, fontFamily: 'var(--font-ibm-plex)' }}>
              {data.fire.label}
            </span>
          </div>
          <FireScale level={data.fire.level} />
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '5px', display: 'block', fontFamily: 'var(--font-jetbrains)' }}>
            Concelho de Coimbra · {data.fire.level}/5
          </span>
        </div>
      )}

      <DataSource meta={data.meta} />
    </GlassCard>
  )
}
