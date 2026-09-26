'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { MAP_VIEW, MUNICIPALITY_OUTLINE } from '@/lib/parish-map'
import { RELIEF, WATER } from '@/lib/green-spaces'
import {
  MONDEGO_LABEL,
  PARISH_DRAWN_AREA,
  UNITS_PER_KM,
  type Square,
} from '@/lib/parish-geometry'
import { CENSUS_POINTS, CENSUS_POINT_PARISHES } from '@/lib/parish-census'
import { canAnimate } from '@/lib/motion'
import {
  classFill,
  classIsDark,
  metricClass,
  type Metric,
  type ShapedParishRow,
} from '@/lib/parish-metrics'

export type ParishView = 'mapa' | 'proporcional' | 'pessoas'

interface Props {
  rows: ShapedParishRow[]
  metric: Metric
  view: ParishView
  squares: Square[]
  /** Habitantes do quadrado de referência da vista proporcional. */
  keyPopulation: number
  unitsPerPerson: number
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
/** Abaixo disto, em píxeis do ecrã, um nome não se lê. */
const MIN_LABEL_PX = 9.5
/** Largura da carta, em píxeis, abaixo da qual os nomes deixam de caber todos. */
const NARROW_PX = 560

function labelSize(radius: number, longestLine: number): number {
  const byRoom = radius * 0.36
  // A etiqueta pode ocupar até 1,6 diâmetros: uma freguesia é quase sempre
  // mais larga do que a circunferência que lhe cabe dentro.
  const byWidth = (radius * 2 * 1.6) / (CHAR_WIDTH * longestLine)
  return Math.max(MIN_SIZE, Math.min(MAX_SIZE, byRoom, byWidth))
}

/**
 * Num telemóvel a carta mede um terço do que mede numa secretária, e o
 * corpo mínimo da secretária daria nomes de cinco píxeis. Aqui o nome só
 * se escreve quando cabe inteiro dentro da freguesia a um corpo legível;
 * as que não o têm dizem-no quando tocadas.
 */
function narrowLabelSize(radius: number, longestLine: number, lines: number, k: number): number | null {
  const byRoom = (radius * 1.3) / (lines * 1.1)
  const byWidth = (radius * 2 * 1.35) / (CHAR_WIDTH * longestLine)
  const size = Math.min(12 / k, byRoom, byWidth)
  return size * k >= MIN_LABEL_PX ? size : null
}

/**
 * A escala das espigas: unidades do desenho por residente. A subsecção
 * mais povoada do concelho tem mil residentes e fica com 150 unidades — um
 * oitavo da altura da carta, alto o bastante para se ver a Alta e o vale
 * de Santo António dos Olivais a crescer, baixo o bastante para as espigas
 * do centro não taparem as freguesias de cima.
 */
export const SPIKE_UNITS_PER_PERSON = 150 / Math.max(...CENSUS_POINTS.map((p) => p[2]))
/** Residentes da espiga de referência. */
export const SPIKE_KEY = 500

/** Um número redondo de quilómetros que dê uma barra de 50 a 120 px. */
function scaleBarKm(k: number): number {
  for (const km of [1, 2, 5, 10]) {
    if (km * UNITS_PER_KM * k >= 50) return km
  }
  return 10
}

export default function ParishFigure({
  rows,
  metric,
  view,
  squares,
  keyPopulation,
  unitsPerPerson,
  selected,
  active,
  onSelect,
  onActivate,
}: Props) {
  /* A largura a que a carta está de facto desenhada: os corpos de letra e
     a barra de escala medem-se em píxeis do ecrã. Até à primeira medição
     vale a largura de secretária. */
  const svgRef = useRef<SVGSVGElement>(null)
  const [widthPx, setWidthPx] = useState(720)
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width) setWidthPx(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const k = widthPx / MAP_VIEW.width
  const px = (n: number) => n / k
  const narrow = widthPx < NARROW_PX

  const proportional = view === 'proporcional' && squares.length > 0
  const people = view === 'pessoas' && CENSUS_POINTS.length > 0

  /* As espigas nascem do chão quando se entra na vista: a altura cresce de
     zero ao valor em pouco menos de um segundo. Sem animação, aparecem já
     inteiras. */
  const [grow, setGrow] = useState(1)
  useEffect(() => {
    if (!people || !canAnimate()) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900)
      setGrow(1 - (1 - t) ** 3)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [people])

  const spikes = useMemo(() => {
    if (!people) return { all: '', chosen: '' }
    const half = Math.max(2.5, 2.2 / k)
    const chosenIndex = selected ? CENSUS_POINT_PARISHES.indexOf(selected) : -1
    let all = ''
    let chosen = ''
    for (const [x, y, pop, parish] of CENSUS_POINTS) {
      const h = pop * SPIKE_UNITS_PER_PERSON * grow
      const d = `M${(x - half).toFixed(1)},${y}L${x},${(y - h).toFixed(1)}L${(x + half).toFixed(1)},${y}`
      if (parish === chosenIndex) chosen += d
      else all += d
    }
    return { all, chosen }
  }, [people, grow, k, selected])
  const squareOf = new Map(squares.map((s) => [s.code, s]))
  const find = (code: string | null) => rows.find((row) => row.code === code)
  const activeRow = active === selected ? undefined : find(active)
  const selectedRow = find(selected)

  const barKm = scaleBarKm(k)
  const barUnits = barKm * UNITS_PER_KM
  const barX = px(16)
  const barY = MAP_VIEW.height - px(18)

  const keySide = Math.sqrt(unitsPerPerson * keyPopulation)

  /* Os nomes da vista do mapa. Numa secretária cabem todos; num ecrã
     estreito, só os que cabem dentro da freguesia, e das que cabem, um nome
     que tocasse outro já escrito fica por escrever — os maiores escolhem
     primeiro. */
  const mapLabels: { row: ShapedParishRow; size: number; x: number }[] = []
  const taken: [number, number, number, number][] = []
  for (const row of [...rows].sort((a, b) => b.shape.label.r - a.shape.label.r)) {
    const shape = row.shape
    const longest = Math.max(...row.mapLabel.map((line) => line.length))
    const size = narrow
      ? narrowLabelSize(shape.label.r, longest, row.mapLabel.length, k)
      : labelSize(shape.label.r, longest)
    if (size === null) continue
    const half = (longest * CHAR_WIDTH * size) / 2
    // Último recurso para as freguesias encostadas à margem: o nome
    // desliza para dentro da caixa em vez de sair cortado.
    const x = Math.min(Math.max(shape.label.x, half + 2), MAP_VIEW.width - half - 2)
    const h = row.mapLabel.length * size * 1.05
    const rect: [number, number, number, number] = [
      x - half,
      shape.label.y - h / 2,
      x + half,
      shape.label.y + h / 2,
    ]
    if (
      narrow &&
      taken.some((t) => t[0] < rect[2] && t[2] > rect[0] && t[1] < rect[3] && t[3] > rect[1])
    ) {
      continue
    }
    taken.push(rect)
    mapLabels.push({ row, size, x })
  }

  // O nome do rio também não sai cortado pela margem.
  const riverHalf = (7 * 0.62 * px(13)) / 2 + px(4)
  // Desliza ao longo da direcção do rio, para não sair de cima dele.
  const riverX = MONDEGO_LABEL ? Math.max(MONDEGO_LABEL.x, riverHalf) : 0
  const riverY = MONDEGO_LABEL
    ? MONDEGO_LABEL.y + (riverX - MONDEGO_LABEL.x) * Math.tan((MONDEGO_LABEL.angle * Math.PI) / 180)
    : 0

  const shapeProps = (row: ShapedParishRow, label: string, hidden: boolean) => ({
    role: 'button',
    tabIndex: hidden ? -1 : 0,
    'aria-hidden': hidden || undefined,
    'aria-pressed': selected === row.code,
    'aria-label': label,
    onClick: () => onSelect(selected === row.code ? null : row.code),
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(selected === row.code ? null : row.code)
      }
    },
    onPointerEnter: () => onActivate(row.code),
    onPointerLeave: () => onActivate(null),
    onFocus: () => onActivate(row.code),
    onBlur: () => onActivate(null),
  })

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
      className={`parish-map${proportional ? ' is-proporcional' : ''}${people ? ' is-pessoas' : ''}`}
      role="group"
      aria-label={
        people
          ? 'Onde vivem os residentes de Coimbra: uma espiga por subsecção estatística, com altura proporcional aos residentes'
          : proportional
            ? `Quadrados proporcionais à população das freguesias de Coimbra, pintados por ${metric.label.toLowerCase()}`
            : `Mapa das freguesias de Coimbra por ${metric.label.toLowerCase()}`
      }
    >
      <defs>
        <clipPath id="parish-municipio">
          <path d={MUNICIPALITY_OUTLINE} />
        </clipPath>
        {/* O relevo de fora esbate-se para as margens: é paisagem à volta,
            não um rectângulo recortado. */}
        <radialGradient id="parish-fade" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0.55" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </radialGradient>
        <mask id="parish-fade-mask">
          <rect width={MAP_VIEW.width} height={MAP_VIEW.height} fill="url(#parish-fade)" />
        </mask>
      </defs>

      {/* O chão. Fora do concelho, o relevo em papel dá-lhe o sítio onde
          está: o Baixo Mondego plano a poente, as serras a nascente. */}
      <image
        href={RELIEF.concelho.href}
        x={RELIEF.concelho.x}
        y={RELIEF.concelho.y}
        width={RELIEF.concelho.w}
        height={RELIEF.concelho.h}
        preserveAspectRatio="none"
        mask="url(#parish-fade-mask)"
        className="parish-relief-out"
        aria-hidden="true"
      />

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
            fill={classFill(index, metric.ramp)}
            {...shapeProps(row, label, proportional)}
          />
        )
      })}

      {/* Dentro do concelho o relevo multiplica-se sobre as cores: a classe
          continua a ler-se, e as colinas por cima dela. */}
      <image
        href={RELIEF.concelho.href}
        x={RELIEF.concelho.x}
        y={RELIEF.concelho.y}
        width={RELIEF.concelho.w}
        height={RELIEF.concelho.h}
        preserveAspectRatio="none"
        clipPath="url(#parish-municipio)"
        className="parish-relief"
        aria-hidden="true"
      />

      <g className="parish-water" mask="url(#parish-fade-mask)" aria-hidden="true">
        <path d={WATER.areas} />
        <path d={WATER.lines} className="parish-river" />
      </g>

      <path d={MUNICIPALITY_OUTLINE} className="parish-outline" />

      {/* O realce é um caminho à parte por cima de tudo. Um SVG não tem
          z-index: mudar o contorno da própria freguesia deixava-o meio
          tapado pelas vizinhas desenhadas depois. */}
      {!proportional && activeRow && <path d={activeRow.shape.d} className="parish-active" />}
      {!proportional && selectedRow && <path d={selectedRow.shape.d} className="parish-selected" />}

      {MONDEGO_LABEL && (
        <text
          x={riverX}
          y={riverY - px(5)}
          fontSize={px(13)}
          transform={`rotate(${MONDEGO_LABEL.angle} ${riverX} ${riverY})`}
          className="parish-river-label parish-map-only"
          style={{ strokeWidth: px(3) }}
          aria-hidden="true"
        >
          Mondego
        </text>
      )}

      <g className="parish-map-only parish-names" aria-hidden="true">
        {mapLabels.map(({ row, size, x }) => {
          const shape = row.shape
          const index = metricClass(metric, metric.value(row))
          const dy = row.mapLabel.length === 1 ? 0.34 : -0.22

          return (
            <text
              key={row.code}
              x={x}
              y={shape.label.y}
              fontSize={size}
              className={`parish-label${classIsDark(index, metric.ramp) ? ' parish-label-inverse' : ''}${
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
      </g>

      {/* A vista proporcional. Cada quadrado está desenhado no seu sítio
          final; na vista do mapa, o CSS encolhe-o para a área que a
          freguesia tem no desenho e leva-o para cima dela, invisível. Ao
          mudar de vista, cada freguesia troca a área pela população à
          frente do leitor. */}
      <g className="parish-squares">
        {rows.map((row, i) => {
          const sq = squareOf.get(row.code)
          if (!sq) return null
          const value = metric.value(row)
          const index = metricClass(metric, value)
          const s0 = Math.sqrt(PARISH_DRAWN_AREA[row.code]) / sq.side
          const label = `${row.name}: ${row.population.toLocaleString('pt-PT')} habitantes`
          return (
            <rect
              key={row.code}
              x={sq.x - sq.side / 2}
              y={sq.y - sq.side / 2}
              width={sq.side}
              height={sq.side}
              fill={classFill(index, metric.ramp)}
              className="parish-square"
              style={
                {
                  '--dx': `${(row.shape.label.x - sq.x).toFixed(1)}px`,
                  '--dy': `${(row.shape.label.y - sq.y).toFixed(1)}px`,
                  '--s0': s0.toFixed(3),
                  '--i': i,
                } as React.CSSProperties
              }
              {...shapeProps(row, label, !proportional)}
            />
          )
        })}
      </g>

      {proportional &&
        [find(active === selected ? null : active), selectedRow].map((row, i) => {
          const sq = row && squareOf.get(row.code)
          if (!sq) return null
          return (
            <rect
              key={i}
              x={sq.x - sq.side / 2}
              y={sq.y - sq.side / 2}
              width={sq.side}
              height={sq.side}
              className={i === 0 ? 'parish-active' : 'parish-selected'}
            />
          )
        })}

      <g className="parish-square-labels" aria-hidden="true">
        {rows.map((row) => {
          const sq = squareOf.get(row.code)
          if (!sq) return null
          const index = metricClass(metric, metric.value(row))
          const lines = row.mapLabel
          const longest = Math.max(...lines.map((line) => line.length))
          const size = Math.min(
            px(13),
            (sq.side * 0.8) / (lines.length * 1.1 + 0.4),
            (sq.side * 0.86) / (CHAR_WIDTH * longest),
          )
          if (size * k < MIN_LABEL_PX) return null
          // O número só entra quando há altura para ele debaixo do nome.
          const withValue = sq.side * k >= 64
          const lineCount = lines.length + (withValue ? 1 : 0)
          const top = sq.y - ((lineCount - 1) * size * 1.1) / 2 + size * 0.34
          return (
            <text
              key={row.code}
              x={sq.x}
              y={top}
              fontSize={size}
              className={`parish-label${classIsDark(index, metric.ramp) ? ' parish-label-inverse' : ''}${
                row.code === selected ? ' parish-label-selected' : ''
              }`}
              style={{ strokeWidth: size * 0.24 }}
            >
              {lines.map((line, i) => (
                <tspan key={line} x={sq.x} dy={i === 0 ? 0 : `${1.1}em`}>
                  {line}
                </tspan>
              ))}
              {withValue && (
                <tspan x={sq.x} dy="1.2em" className="parish-square-value">
                  {row.population.toLocaleString('pt-PT')}
                </tspan>
              )}
            </text>
          )
        })}
      </g>

      {/* As espigas. Uma por subsecção com residentes, de trás para a
          frente, para as da frente taparem as de trás como numa paisagem.
          As da freguesia escolhida desenham-se por cima, a acento. */}
      {people && (
        <g className="parish-spikes" aria-hidden="true">
          <path d={spikes.all} />
          {spikes.chosen && <path d={spikes.chosen} className="is-chosen" />}
        </g>
      )}

      {/* Barra de escala na vista do mapa; na proporcional, o quadrado de
          referência — ali o que se mede já não são quilómetros. */}
      <g className="parish-scalebar parish-map-only" aria-hidden="true">
        <path
          d={`M${barX},${barY - px(4)}V${barY}H${barX + barUnits}V${barY - px(4)}`}
          style={{ strokeWidth: px(1.25) }}
        />
        <text x={barX + barUnits + px(6)} y={barY + px(1)} fontSize={px(10.5)} style={{ strokeWidth: px(3) }}>
          {barKm} km
        </text>
      </g>

      {people && (
        <g className="parish-key" aria-hidden="true">
          <path
            d={`M${px(16)},${MAP_VIEW.height - px(40)}l${Math.max(2.5, 2.2 / k)},${-SPIKE_KEY * SPIKE_UNITS_PER_PERSON}l${Math.max(2.5, 2.2 / k)},${SPIKE_KEY * SPIKE_UNITS_PER_PERSON}`}
            className="parish-spike-key"
          />
          <text x={px(16) + px(12)} y={MAP_VIEW.height - px(40)} fontSize={px(10.5)} style={{ strokeWidth: px(3) }}>
            {SPIKE_KEY} residentes
          </text>
        </g>
      )}

      {keySide > 0 && (
        <g className="parish-key parish-prop-only" aria-hidden="true">
          <rect x={px(16)} y={MAP_VIEW.height - px(18) - keySide} width={keySide} height={keySide} />
          <text
            x={px(16) + keySide + px(8)}
            y={MAP_VIEW.height - px(18)}
            fontSize={px(10.5)}
            style={{ strokeWidth: px(3) }}
          >
            {keyPopulation.toLocaleString('pt-PT')} habitantes
          </text>
        </g>
      )}
    </svg>
  )
}
