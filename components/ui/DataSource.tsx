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
 * medido. É deliberadamente legível: 10px, sem opacidade reduzida. A
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
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color,
          background: `${colorMix(color, 9)}`,
          border: `1px solid ${colorMix(color, 27)}`,
          borderRadius: '3px',
          padding: '2px 7px',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          aria-hidden="true"
          style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }}
        />
        {label}
      </span>

      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '10px',
          color: 'var(--text-secondary)',
          letterSpacing: '0.03em',
        }}
      >
        {meta.source}
        {meta.observedAt && ` · ${formatObserved(meta.observedAt)}`}
      </span>

      {meta.note && showNote && (
        <span
          style={{
            fontFamily: 'var(--font-ibm-plex)',
            fontSize: '10px',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            flexBasis: '100%',
          }}
        >
          {meta.note}
        </span>
      )}
    </div>
  )
}

/**
 * Estado vazio para um módulo cuja fonte não respondeu. Ocupa o lugar do
 * número que não temos, em vez de o substituir por um valor plausível.
 */
export function DataUnavailable({ meta }: { meta: Sourced }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1.75rem 1rem',
        background: 'var(--bg-sunken)',
        border: '1px dashed var(--border-panel)',
        borderRadius: '4px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '1.75rem',
          fontWeight: 500,
          color: 'var(--text-tertiary)',
          lineHeight: 1,
        }}
      >
        —
      </span>
      <span
        style={{
          fontFamily: 'var(--font-ibm-plex)',
          fontSize: '11px',
          color: 'var(--text-secondary)',
          maxWidth: '28ch',
          lineHeight: 1.5,
        }}
      >
        {meta.note ?? 'A fonte não respondeu.'}
      </span>
    </div>
  )
}
