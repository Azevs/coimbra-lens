'use client'

import { MAP_VIEW, MUNICIPALITY_OUTLINE } from '@/lib/parish-map'
import {
  classFill,
  classIsDark,
  metricClass,
  type Metric,
  type ShapedParishRow,
} from '@/lib/parish-metrics'

interface Props {
  rows: ShapedParishRow[]
  metric: Metric
  selected: string | null
  /** Sob o rato ou com o foco do teclado — a distinção não interessa aqui. */
  active: string | null
  onSelect: (code: string | null) => void
  onActivate: (code: string | null) => void
}

/**
 * Corpo de letra de uma etiqueta, em unidades do viewBox.
 *
 * Duas restrições, e vence a mais apertada. A primeira é o espaço da
 * freguesia: o raio da circunferência inscrita, que o gerador já calculou.
 * A segunda é o comprimento do nome — de nada serve haver espaço em altura
 * se "S. Martinho de Árvore" transborda para a vizinha em largura.
 *
 * O 0,52 é a largura média de um caracter do IBM Plex Sans semibold em
 * fracção do corpo. É uma aproximação: medir a sério exigiria o tipo de
 * letra carregado, e isto tem de dar o mesmo resultado no servidor.
 */
const CHAR_WIDTH = 0.52
const MIN_SIZE = 15
const MAX_SIZE = 24

function labelSize(radius: number, longestLine: number): number {
  const byRoom = radius * 0.36
  // A etiqueta pode ocupar até 1,6 diâmetros: uma freguesia é quase sempre
  // mais larga do que a circunferência que lhe cabe dentro.
  const byWidth = (radius * 2 * 1.6) / (CHAR_WIDTH * longestLine)
  return Math.max(MIN_SIZE, Math.min(MAX_SIZE, byRoom, byWidth))
}

export default function ParishFigure({
  rows,
  metric,
  selected,
  active,
  onSelect,
  onActivate,
}: Props) {
  const find = (code: string | null) => rows.find((row) => row.code === code)
  const activeRow = active === selected ? undefined : find(active)
  const selectedRow = find(selected)

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
      className="parish-map"
      role="group"
      aria-label={`Mapa das freguesias de Coimbra por ${metric.label.toLowerCase()}`}
    >
      {/* Camada dos dados. A ordem é a da lista; o realce vive por cima. */}
      {rows.map((row) => {
        const value = metric.value(row)
        const index = metricClass(metric, value)
        const label =
          value === null
            ? `${row.name}: sem valor`
            : `${row.name}: ${metric.format(value)} ${metric.unit}`
        return (
          <path
            key={row.code}
            d={row.shape.d}
            className="parish-shape"
            fill={classFill(index)}
            role="button"
            tabIndex={0}
            aria-pressed={selected === row.code}
            aria-label={label}
            onClick={() => onSelect(selected === row.code ? null : row.code)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(selected === row.code ? null : row.code)
              }
            }}
            onPointerEnter={() => onActivate(row.code)}
            onPointerLeave={() => onActivate(null)}
            onFocus={() => onActivate(row.code)}
            onBlur={() => onActivate(null)}
          />
        )
      })}

      <path d={MUNICIPALITY_OUTLINE} className="parish-outline" />

      {/* O realce é um caminho à parte por cima de tudo. Um SVG não tem
          z-index: mudar o contorno da própria freguesia deixava-o meio
          tapado pelas vizinhas desenhadas depois. */}
      {activeRow && <path d={activeRow.shape.d} className="parish-active" />}
      {selectedRow && <path d={selectedRow.shape.d} className="parish-selected" />}

      {rows.map((row) => {
        const shape = row.shape
        const index = metricClass(metric, metric.value(row))
        const longest = Math.max(...row.mapLabel.map((line) => line.length))
        const size = labelSize(shape.label.r, longest)
        const half = (longest * CHAR_WIDTH * size) / 2
        // Último recurso para as freguesias encostadas à margem: o nome
        // desliza para dentro da caixa em vez de sair cortado.
        const x = Math.min(Math.max(shape.label.x, half + 2), MAP_VIEW.width - half - 2)
        const dy = row.mapLabel.length === 1 ? 0.34 : -0.22

        return (
          <text
            key={row.code}
            x={x}
            y={shape.label.y}
            fontSize={size}
            className={`parish-label${classIsDark(index) ? ' parish-label-inverse' : ''}${
              row.code === selected ? ' parish-label-selected' : ''
            }`}
            style={{ strokeWidth: size * 0.24 }}
          >
            {row.mapLabel.map((line, i) => (
              <tspan key={line} x={x} dy={`${i === 0 ? dy : 1.05}em`}>
                {line}
              </tspan>
            ))}
          </text>
        )
      })}
    </svg>
  )
}
