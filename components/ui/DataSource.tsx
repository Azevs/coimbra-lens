'use client'

import { PROVENANCE_COLOR, PROVENANCE_LABEL, type Sourced } from '@/lib/provenance'
import { colorMix } from '@/lib/color'

function formatObserved(iso: string): string {
  const d = new Date(iso)
  const mins = Math.round((Date.now() - d.getTime()) / 60000)
  if (mins < 1) return 'agora'
  if (mins < 60) return `há ${mins} min`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `há ${hours} h`
  return d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * Selo de proveniência — o rodapé de cada módulo de dados.
 *
 * Diz sempre três coisas: o estado da leitura, quem publica, e quando foi
 * medido. É deliberadamente legível: 11px, sem opacidade reduzida. A
 * credibilidade do painel depende de isto não parecer letra pequena.
 */
export default function DataSource({
  meta,
  align = 'left',
  showNote = true,
}: {
  meta: Sourced
  align?: 'left' | 'right'
  /** Desligar quando o DataUnavailable acima já mostra a mesma explicação. */
  showNote?: boolean
}) {
  const color = PROVENANCE_COLOR[meta.provenance]
  // O rótulo específico da fonte tem precedência sobre a palavra genérica.
  const label = meta.label ?? PROVENANCE_LABEL[meta.provenance]

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginTop: '0.875rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color,
          background: `${colorMix(color, 9)}`,
          border: `1px solid ${colorMix(color, 27)}`,
          borderRadius: '3px',
          padding: '3px 8px',
          whiteSpace: 'nowrap',
          lineHeight: 1.3,
        }}
      >
        <span
          aria-hidden="true"
          style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }}
        />
        {label}
      </span>

      <span className="ui-mono" style={{ color: 'var(--text-secondary)' }}>
        {meta.source}
        {meta.observedAt && ` · ${formatObserved(meta.observedAt)}`}
      </span>

      {meta.note && showNote && (
        <span className="ui-note" style={{ flexBasis: '100%' }}>
          {meta.note}
        </span>
      )}
    </div>
  )
}

/**
 * Estado vazio para um módulo cuja fonte não respondeu.
 *
 * Era um painel tracejado de meia secção com um traço no meio, que se lia
 * como um erro. Passa a uma linha: o traço, e a explicação ao lado. O
 * lugar do número que não temos continua ocupado, sem ocupar a página.
 */
export function DataUnavailable({ meta }: { meta: Sourced }) {
  return (
    <div className="empty-line">
      <span className="empty-line-dash" aria-hidden="true">—</span>
      <span className="ui-note" style={{ maxWidth: '44ch' }}>
        {meta.note ?? 'A fonte não respondeu.'}
      </span>
    </div>
  )
}
