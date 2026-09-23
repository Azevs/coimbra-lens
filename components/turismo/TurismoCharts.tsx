'use client'

import { useRef, type ReactNode } from 'react'
import { ChartTooltip, useChartTooltip, type TooltipRow } from '@/components/charts/ChartTooltip'

/**
 * Gráficos da página de Turismo.
 *
 * São poucas barras, com poucos valores, e cada uma leva o número ao lado:
 * HTML chega, e é o que se lê melhor num telemóvel. O tooltip repete o
 * valor com o contexto (ano, fonte) — acrescenta, nunca é a única via.
 *
 * Cores: azul para a hotelaria e terracota para os outros alojamentos, as
 * únicas duas categorias que o INE separa nas dormidas de Coimbra. Nas
 * comparações (2024 face a 2019, Coimbra face a Portugal) o termo de
 * referência vai a cinzento e o que interessa leva o acento.
 */

const fmt = (n: number, dec = 0) =>
  n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec })

export const COR = {
  hotelaria: 'var(--tone-blue)',
  outros: 'var(--tone-clay)',
  destaque: 'var(--accent)',
  referencia: 'color-mix(in srgb, var(--text-tertiary) 45%, transparent)',
}

/** Contentor com tooltip: as coordenadas são relativas a ele. */
function useTip() {
  const ref = useRef<HTMLDivElement>(null)
  const { tip, show, hide } = useChartTooltip()
  const at = (e: React.PointerEvent | React.FocusEvent, title: string, rows: TooltipRow[]) => {
    const box = ref.current?.getBoundingClientRect()
    const target = (e.currentTarget as HTMLElement).getBoundingClientRect()
    if (!box) return
    const x = 'clientX' in e ? e.clientX : target.left + target.width / 2
    const y = 'clientY' in e ? e.clientY : target.top
    show({ x: x - box.left, y: y - box.top, title, rows })
  }
  return { ref, tip, at, hide }
}

function Legenda({ itens }: { itens: { cor: string; nome: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem 1.25rem', marginBottom: '0.875rem' }}>
      {itens.map((i) => (
        <span key={i.nome} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, background: i.cor }} />
          {i.nome}
        </span>
      ))}
    </div>
  )
}

// ─── Barra repartida ─────────────────────────────────────────────────────

export interface Segmento {
  nome: string
  valor: number
  cor: string
  /** Texto do tooltip, quando o nome precisa de explicação. */
  nota?: string
}

/**
 * Uma barra a 100%, repartida por segmentos. Serve para ler a parte de
 * cada tipo de alojamento num total. O rótulo de cada segmento vai por
 * baixo da barra, não dentro: um segmento estreito não o comportava.
 */
export function BarraRepartida({
  titulo,
  unidade,
  segmentos,
}: {
  titulo: string
  unidade: string
  segmentos: Segmento[]
}) {
  const { ref, tip, at, hide } = useTip()
  const total = segmentos.reduce((a, s) => a + s.valor, 0)
  if (total <= 0) return null

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>{titulo}</span>
        <span className="ui-mono">
          {fmt(total)} {unidade}
        </span>
      </div>
      <div role="img" aria-label={`${titulo}: ${segmentos.map((s) => `${s.nome} ${fmt(s.valor)}`).join(', ')}`} style={{ display: 'flex', gap: '2px', height: 20 }}>
        {segmentos.map((s, i) => {
          const pct = (s.valor / total) * 100
          const primeiro = i === 0
          const ultimo = i === segmentos.length - 1
          return (
            <div
              key={s.nome}
              tabIndex={0}
              onPointerMove={(e) => at(e, s.nome, [{ label: unidade, value: fmt(s.valor) }, { label: 'Do total', value: `${fmt(pct, 1)}%` }])}
              onFocus={(e) => at(e, s.nome, [{ label: unidade, value: fmt(s.valor) }, { label: 'Do total', value: `${fmt(pct, 1)}%` }])}
              onPointerLeave={hide}
              onBlur={hide}
              style={{
                width: `${pct}%`,
                minWidth: 3,
                background: s.cor,
                borderRadius: `${primeiro ? 4 : 0}px ${ultimo ? 4 : 0}px ${ultimo ? 4 : 0}px ${primeiro ? 4 : 0}px`,
                cursor: 'default',
                outlineOffset: 2,
              }}
            />
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem', marginTop: '0.625rem' }}>
        {segmentos.map((s) => (
          <span key={s.nome} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.45rem', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: 2, background: s.cor, alignSelf: 'center' }} />
            <span>
              {s.nome}{' '}
              <span style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--text-primary)' }}>
                {fmt((s.valor / total) * 100, 1)}%
              </span>
            </span>
          </span>
        ))}
      </div>
      <ChartTooltip tip={tip} />
    </div>
  )
}

// ─── Par de barras ───────────────────────────────────────────────────────

/**
 * Como escrever o valor. É um nome e não uma função porque a página é um
 * componente de servidor: funções não atravessam para o cliente.
 */
export type Formato = 'numero' | 'pct' | 'variacao' | 'noites'

const FORMATOS: Record<Formato, (n: number) => string> = {
  numero: (n) => fmt(n),
  pct: (n) => `${fmt(n, 1)}%`,
  variacao: (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${fmt(Math.abs(n), 1)}%`,
  noites: (n) => `${fmt(n, 1)} noites`,
}

export interface Termo {
  nome: string
  valor: number
  destaque?: boolean
}

/**
 * Duas (ou poucas) barras da mesma grandeza, cada uma com o seu valor na
 * ponta. Uma escala por gráfico, sempre a partir de zero: comparar 2019
 * com 2024 ou Coimbra com Portugal lê-se no comprimento.
 */
export function Barras({
  titulo,
  termos,
  formato,
  rodape,
}: {
  titulo: string
  termos: Termo[]
  formato: Formato
  rodape?: ReactNode
}) {
  const { ref, tip, at, hide } = useTip()
  const escrever = FORMATOS[formato]
  const max = Math.max(...termos.map((t) => Math.abs(t.valor)), 0)
  if (max === 0) return null

  return (
    <div ref={ref} style={{ position: 'relative', borderTop: '1px solid var(--border-panel)', paddingTop: '1rem' }}>
      <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.75rem' }}>{titulo}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '0.75rem', rowGap: '0.5rem', alignItems: 'center' }}>
        {termos.map((t) => {
          const pct = (Math.abs(t.valor) / max) * 100
          const cor = t.destaque ? COR.destaque : COR.referencia
          return (
            <div key={t.nome} style={{ display: 'contents' }}>
              <span style={{ fontSize: '12px', color: t.destaque ? 'var(--text-primary)' : 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{t.nome}</span>
              <div
                tabIndex={0}
                onPointerMove={(e) => at(e, t.nome, [{ label: titulo, value: escrever(t.valor) }])}
                onFocus={(e) => at(e, t.nome, [{ label: titulo, value: escrever(t.valor) }])}
                onPointerLeave={hide}
                onBlur={hide}
                style={{ minHeight: 24, display: 'flex', alignItems: 'center', outlineOffset: 2 }}
              >
                {/* A pista reserva à direita o lugar do número: a barra é uma
                    percentagem exacta da pista, e o número segue-lhe a ponta. */}
                <div style={{ width: 'calc(100% - 4.5rem)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    aria-hidden="true"
                    style={{
                      width: `${pct}%`,
                      minWidth: 3,
                      flexShrink: 0,
                      height: 14,
                      background: cor,
                      borderRadius: '0 4px 4px 0',
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', color: t.destaque ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {escrever(t.valor)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {rodape && (
        <div className="ui-mono" style={{ marginTop: '0.625rem' }}>
          {rodape}
        </div>
      )}
      <ChartTooltip tip={tip} />
    </div>
  )
}

// ─── Colunas por estrelas ────────────────────────────────────────────────

/**
 * Hotelaria por categoria. As estrelas são uma ordem, não identidades:
 * uma cor só, a da hotelaria, e o número em cima de cada coluna.
 */
export function ColunasEstrelas({ dados }: { dados: { estrelas: number; total: number | null; apart: number | null }[] }) {
  const { ref, tip, at, hide } = useTip()
  const max = Math.max(...dados.map((d) => d.total ?? 0), 0)
  if (max === 0) return null
  const ALTURA = 120

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div role="img" aria-label={dados.map((d) => `${d.estrelas} estrelas: ${d.total ?? 'sem dado'}`).join(', ')} style={{ display: 'grid', gridTemplateColumns: `repeat(${dados.length}, 1fr)`, gap: '0.5rem', alignItems: 'end', height: ALTURA + 24, borderBottom: '1px solid var(--border-panel)' }}>
        {dados.map((d) => {
          const titulo = `${d.estrelas} ${d.estrelas === 1 ? 'estrela' : 'estrelas'}`
          const rows = [
            { label: 'Estabelecimentos', value: d.total === null ? 'sem dado' : fmt(d.total) },
            ...(d.apart ? [{ label: 'dos quais hotéis-apartamentos', value: fmt(d.apart) }] : []),
          ]
          return (
            <div
              key={d.estrelas}
              tabIndex={0}
              onPointerMove={(e) => at(e, titulo, rows)}
              onFocus={(e) => at(e, titulo, rows)}
              onPointerLeave={hide}
              onBlur={hide}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', outlineOffset: 2 }}
            >
              <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '12px', color: 'var(--text-primary)', marginBottom: 4 }}>
                {d.total === null ? '—' : d.total}
              </span>
              <div style={{ width: '100%', maxWidth: 24, height: d.total ? (d.total / max) * ALTURA : 0, background: COR.hotelaria, borderRadius: '4px 4px 0 0' }} />
            </div>
          )
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${dados.length}, 1fr)`, gap: '0.5rem', marginTop: 6 }}>
        {dados.map((d) => (
          <span key={d.estrelas} aria-hidden="true" style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-tertiary)', letterSpacing: '0.05em' }}>
            {'★'.repeat(d.estrelas)}
          </span>
        ))}
      </div>
      <ChartTooltip tip={tip} />
    </div>
  )
}

export { Legenda, fmt }
