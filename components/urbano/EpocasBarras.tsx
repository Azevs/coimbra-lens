'use client'

import { ChartTooltip, useChartTooltip } from '@/components/charts/ChartTooltip'

/**
 * Os prédios por época de construção, numa zona e no concelho: duas barras
 * a 100 %, uma por baixo da outra, para a comparação ser de proporções e
 * não de contagens (setecentos prédios contra quarenta mil).
 *
 * Três épocas e não as cinco do INE: as três mais recentes somam pouco na
 * Baixa e ficavam lascas sem rótulo. A rampa é a sequencial do mapa, e o
 * mais escuro é o mais antigo — o que a barra está a dizer.
 */

export interface Epocas {
  ate1945: number
  de1946a1980: number
  depois1980: number
}

const FAIXAS: { k: keyof Epocas; nome: string; cor: string; texto: string }[] = [
  { k: 'ate1945', nome: 'até 1945', cor: 'var(--map-5)', texto: '#fff' },
  { k: 'de1946a1980', nome: '1946 a 1980', cor: 'var(--map-3)', texto: 'var(--text-primary)' },
  { k: 'depois1980', nome: 'depois de 1980', cor: 'var(--map-2)', texto: 'var(--text-primary)' },
]

const pct = (v: number) => `${Math.round(v * 100)} %`
const num = (n: number) => n.toLocaleString('pt-PT')

export default function EpocasBarras({ linhas }: { linhas: { nome: string; epocas: Epocas }[] }) {
  const { tip, show, hide } = useChartTooltip()
  return (
    <figure style={{ margin: 0, position: 'relative' }} onMouseLeave={hide}>
      <div style={{ display: 'grid', gap: '0.875rem' }}>
        {linhas.map(({ nome, epocas }) => {
          const total = epocas.ate1945 + epocas.de1946a1980 + epocas.depois1980
          return (
            <div key={nome} className="epocas-linha">
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{nome}</div>
              <div style={{ display: 'flex', gap: '2px', height: '30px' }} role="img" aria-label={
                `${nome}: ` + FAIXAS.map((f) => `${pct(epocas[f.k] / total)} ${f.nome}`).join(', ')
              }>
                {FAIXAS.map((f, i) => {
                  const v = epocas[f.k] / total
                  return (
                    <div
                      key={f.k}
                      className={v < 0.2 ? 'epoca-estreita' : undefined}
                      onMouseMove={(e) => {
                        const caixa = (e.currentTarget.closest('figure') as HTMLElement).getBoundingClientRect()
                        show({
                          x: e.clientX - caixa.left,
                          y: e.clientY - caixa.top,
                          title: `${nome} · ${f.nome}`,
                          rows: [{ label: 'prédios', value: `${num(epocas[f.k])} (${pct(v)})` }],
                        })
                      }}
                      style={{
                        flex: `${v} 0 0`,
                        minWidth: v > 0 ? '2px' : 0,
                        background: f.cor,
                        color: f.texto,
                        // Pontas de 4 px só nas extremidades da barra.
                        borderRadius: i === 0 ? '4px 0 0 4px' : i === FAIXAS.length - 1 ? '0 4px 4px 0' : 0,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '0.5rem',
                        fontFamily: 'var(--font-jetbrains)',
                        fontSize: '11px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {/* Rótulo só onde cabe; o resto lê-se ao passar o rato. */}
                      {v >= 0.08 ? <span className="epoca-rotulo">{pct(v)}</span> : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <ul
        className="epocas-legenda"
        style={{
          listStyle: 'none',
          margin: '0.875rem 0 0',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem 1.25rem',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
        }}
      >
        {FAIXAS.map((f) => (
          <li key={f.k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span aria-hidden style={{ width: 14, height: 14, borderRadius: 3, background: f.cor, flexShrink: 0 }} />
            {f.nome}
          </li>
        ))}
      </ul>
      <ChartTooltip tip={tip} />
    </figure>
  )
}
