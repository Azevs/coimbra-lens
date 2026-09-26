'use client'

import { useState } from 'react'

import { PARISH_BOXES } from '@/lib/parish-geometry'
import {
  METRICS,
  MUNICIPALITY,
  formatArea,
  metricFill,
  municipalValue,
  type Metric,
  type ShapedParishRow,
} from '@/lib/parish-metrics'

type SortId = 'nome' | 'populacao' | 'area' | 'grandeza'
type Dir = 'asc' | 'desc'

/**
 * A quarta coluna segue a grandeza pintada no mapa. Enquanto o mapa pinta
 * a população, mostra a densidade — a população já tem coluna própria.
 */
function sideMetric(metric: Metric): Metric {
  return metric.id === 'populacao' ? METRICS.densidade : metric
}

/**
 * A silhueta da freguesia, esticada à caixa, pintada com a cor que tem no
 * mapa. Não está à escala das outras: serve para a reconhecer, como a
 * silhueta de um país num atlas.
 */
function Thumb({ row, fill }: { row: ShapedParishRow; fill: string }) {
  const [x0, y0, x1, y1] = PARISH_BOXES[row.code]
  const side = Math.max(x1 - x0, y1 - y0) * 1.08
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  return (
    <svg
      className="parish-thumb"
      viewBox={`${cx - side / 2} ${cy - side / 2} ${side} ${side}`}
      aria-hidden="true"
    >
      <path d={row.shape.d} fill={fill} />
    </svg>
  )
}

/**
 * A barra por baixo do número. Numa grandeza que pode ser negativa parte
 * do meio: a perda cresce para a esquerda, o ganho para a direita.
 */
function Bar({ value, max, metric }: { value: number; max: number; metric: Metric }) {
  const fill = metricFill(metric, value)
  if (metric.ramp === 'div') {
    const w = (Math.abs(value) / max) * 50
    return (
      <span className="parish-bar is-div" aria-hidden="true">
        <span style={{ width: `${w}%`, left: value < 0 ? `${50 - w}%` : '50%', background: fill }} />
      </span>
    )
  }
  return (
    <span className="parish-bar" aria-hidden="true">
      <span style={{ width: `${(value / max) * 100}%`, background: fill }} />
    </span>
  )
}

/**
 * As dezoito em tabela, ao lado do mapa.
 *
 * Antes era uma lista de barras à parte, que repetia a população que o mapa
 * já pintava. Agora é o mesmo objecto que o mapa: o que se aponta numa
 * realça-se na outra, e a última coluna é a grandeza que o mapa pinta.
 */
export default function ParishTable({
  rows,
  metric,
  selected,
  active,
  onSelect,
  onActivate,
}: {
  rows: ShapedParishRow[]
  metric: Metric
  selected: string | null
  active: string | null
  onSelect: (code: string | null) => void
  onActivate: (code: string | null) => void
}) {
  const [sort, setSort] = useState<{ id: SortId; dir: Dir }>({ id: 'populacao', dir: 'desc' })
  const side = sideMetric(metric)

  const value: Record<SortId, (row: ShapedParishRow) => number | string> = {
    nome: (row) => row.short,
    populacao: (row) => row.population,
    area: (row) => row.areaKm2,
    grandeza: (row) => side.value(row) ?? -Infinity,
  }

  const sorted = [...rows].sort((a, b) => {
    const va = value[sort.id](a)
    const vb = value[sort.id](b)
    const c = typeof va === 'string' ? va.localeCompare(vb as string, 'pt') : va - (vb as number)
    return sort.dir === 'asc' ? c : -c
  })

  const maxPop = Math.max(...rows.map((r) => r.population))
  const maxSide = Math.max(...rows.map((r) => Math.abs(side.value(r) ?? 0)))
  const municipalSide = municipalValue(side)

  const columns: { id: SortId; label: string; numeric: boolean; className?: string; painted?: boolean }[] = [
    { id: 'nome', label: 'Freguesia', numeric: false },
    { id: 'populacao', label: 'Habitantes', numeric: true, painted: metric.id === 'populacao' },
    { id: 'area', label: 'km²', numeric: true, className: 'parish-col-area' },
    { id: 'grandeza', label: side.column, numeric: true, painted: metric.id !== 'populacao' },
  ]

  const onHeader = (id: SortId) =>
    setSort((s) =>
      s.id === id
        ? { id, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { id, dir: id === 'nome' ? 'asc' : 'desc' },
    )

  return (
    <div className="parish-table-wrap">
      <table className="parish-table">
        <caption className="sr-only">
          As 18 freguesias de Coimbra: habitantes, área e {side.label.toLowerCase()}. Ordenável por coluna.
        </caption>
        <thead>
          <tr>
            {columns.map((col) => {
              const on = sort.id === col.id
              return (
                <th
                  key={col.id}
                  scope="col"
                  aria-sort={on ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className={`${col.numeric ? 'is-num' : ''} ${col.className ?? ''}${col.painted ? ' is-painted' : ''}`}
                  title={col.id === 'grandeza' ? `${side.label} (${side.unit})` : undefined}
                >
                  <button type="button" onClick={() => onHeader(col.id)}>
                    {col.label}
                    <span className="parish-sort" aria-hidden="true">
                      {on ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
                    </span>
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const isSelected = row.code === selected
            const isActive = row.code === active
            const sideValue = side.value(row)
            return (
              <tr
                key={row.code}
                className={`${isSelected ? 'is-selected' : ''}${isActive ? ' is-active' : ''}`}
                onClick={() => onSelect(isSelected ? null : row.code)}
                onPointerEnter={() => onActivate(row.code)}
                onPointerLeave={() => onActivate(null)}
              >
                <th scope="row">
                  {/* O botão é o que o teclado alcança; o clique sobe até
                      à linha, que é quem escolhe. */}
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onFocus={() => onActivate(row.code)}
                    onBlur={() => onActivate(null)}
                  >
                    <Thumb row={row} fill={metricFill(metric, metric.value(row))} />
                    <span>{row.short}</span>
                  </button>
                </th>
                <td className="is-num">
                  <span className="font-data">{row.population.toLocaleString('pt-PT')}</span>
                  <Bar value={row.population} max={maxPop} metric={METRICS.populacao} />
                </td>
                <td className="is-num parish-col-area">
                  <span className="font-data">{formatArea(row.areaKm2)}</span>
                </td>
                <td className="is-num">
                  <span className="font-data">{sideValue === null ? '—' : side.format(sideValue)}</span>
                  {sideValue !== null && <Bar value={sideValue} max={maxSide} metric={side} />}
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Município</th>
            <td className="is-num font-data">{MUNICIPALITY.population.toLocaleString('pt-PT')}</td>
            <td className="is-num font-data parish-col-area">{formatArea(MUNICIPALITY.areaKm2)}</td>
            <td className="is-num font-data">{side.format(municipalSide)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
