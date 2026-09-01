'use client'

import { useState, useCallback } from 'react'

export interface TooltipRow {
  label: string
  value: string
}

export interface TooltipState {
  x: number
  y: number
  title: string
  rows: TooltipRow[]
}

/**
 * Estado de tooltip partilhado pelos gráficos.
 *
 * Um gráfico em HTML é interactivo por natureza; sem leitura ao passar o
 * rato, as barras mostram forma mas não deixam ler valores intermédios.
 * As posições vêm em coordenadas do contentor, não da página, para que o
 * tooltip acompanhe o gráfico quando a página faz scroll.
 */
export function useChartTooltip() {
  const [tip, setTip] = useState<TooltipState | null>(null)
  const hide = useCallback(() => setTip(null), [])
  return { tip, show: setTip, hide }
}

export function ChartTooltip({ tip }: { tip: TooltipState | null }) {
  if (!tip) return null

  return (
    <div
      role="tooltip"
      style={{
        position: 'absolute',
        left: tip.x,
        top: tip.y,
        transform: 'translate(-50%, calc(-100% - 10px))',
        pointerEvents: 'none',
        zIndex: 20,
        background: 'var(--bg-raised)',
        border: '1px solid var(--border-panel)',
        borderRadius: '3px',
        boxShadow: 'var(--shadow-lg)',
        padding: '0.5rem 0.7rem',
        minWidth: '110px',
        whiteSpace: 'nowrap',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-ibm-plex)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: tip.rows.length ? '4px' : 0,
        }}
      >
        {tip.title}
      </div>
      {tip.rows.map((r) => (
        <div
          key={r.label}
          style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'baseline' }}
        >
          <span style={{ fontFamily: 'var(--font-ibm-plex)', fontSize: '10px', color: 'var(--text-secondary)' }}>
            {r.label}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              color: 'var(--text-primary)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  )
}
