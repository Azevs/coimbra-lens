'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import {
  CITY_FOCUS,
  CITY_RADIUS_KM,
  GREEN_VIEW,
  LANDMARKS,
  MUNICIPALITY_OUTLINE,
  RELIEF,
  ROADS,
  WATER,
} from '@/lib/green-spaces'
import { PARISH_SHAPES } from '@/lib/parish-map'
import { KINDS, UNITS_PER_KM, mapName, type GreenSpace } from '@/lib/green'

export type Scale = 'cidade' | 'concelho'

/**
 * A janela de cada escala, em unidades do desenho.
 *
 * O concelho é o viewBox inteiro. A cidade é a caixa dos 3 km à volta do
 * Largo da Portagem, com uma folga de 15% para o Choupal não ficar
 * encostado à margem — e ambos os números vêm do gerador, não da mão.
 */
export const BOXES: Record<Scale, { x: number; y: number; w: number; h: number }> = {
  concelho: { x: 0, y: 0, w: GREEN_VIEW.width, h: GREEN_VIEW.height },
  cidade: {
    x: CITY_FOCUS.x - CITY_FOCUS.r * 1.15,
    y: CITY_FOCUS.y - CITY_FOCUS.r * 1.15,
    w: CITY_FOCUS.r * 2.3,
    h: CITY_FOCUS.r * 2.3,
  },
}

/** Se o sítio onde o nome pousa cabe na janela de uma escala. */
export function inBox(space: GreenSpace, scale: Scale): boolean {
  const b = BOXES[scale]
  return (
    space.label.x >= b.x && space.label.x <= b.x + b.w && space.label.y >= b.y && space.label.y <= b.y + b.h
  )
}

/**
 * Abaixo de três pixéis um polígono deixa de ser uma forma e passa a ser
 * um cisco: não se vê, não se acerta com o rato e não se percebe que é
 * clicável. À escala do concelho isso é quase toda a lista. Quem cai
 * abaixo ganha um disco por baixo — não é o desenho do jardim, é a marca
 * de que ali está um, e é o que se pode acertar com o dedo.
 */
const MIN_SHAPE_PX = 3
const MARKER_PX = 4.5
/** Corpo mínimo de um nome escrito por dentro da forma, em pixéis. */
const MIN_LABEL_PX = 10
/** Corpo dos nomes escritos ao lado da forma, em pixéis. */
const SIDE_LABEL_PX = 11.5
/** Largura média de um caracter do IBM Plex a 600, em fracção do corpo. */
const CHAR_EM = 0.56

type Rect = [number, number, number, number]

interface Placed {
  id: string
  text: string
  x: number
  y: number
  size: number
  anchor: 'start' | 'middle' | 'end'
}

const overlaps = (a: Rect, b: Rect) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]

/**
 * Onde escrever cada nome.
 *
 * Quase nenhum jardim tem espaço para o nome por dentro: à escala da
 * cidade, só o Choupal e o Botânico. Os outros escrevem-no ao lado — à
 * direita, à esquerda, por baixo ou por cima, o primeiro destes sítios que
 * não tape outro nome nem outra forma. Os maiores escolhem primeiro; quem
 * não encontrar sítio fica sem nome escrito, e diz quem é quando tocado.
 * Um nome que se sobrepusesse a outro não se lia, e tirava a leitura ao
 * vizinho.
 */
function placeLabels(
  spaces: GreenSpace[],
  box: { x: number; y: number; w: number; h: number },
  k: number,
  selected: string | null,
  reserved: Rect[],
): Placed[] {
  const px = (n: number) => n / k
  const taken: Rect[] = [...reserved]
  const footprint = (s: GreenSpace): Rect => {
    if (s.label.r * k >= MIN_SHAPE_PX) return s.box
    const m = px(MARKER_PX)
    return [s.label.x - m, s.label.y - m, s.label.x + m, s.label.y + m]
  }
  const margin = px(4)
  const inside = (r: Rect) =>
    r[0] >= box.x + margin && r[2] <= box.x + box.w - margin && r[1] >= box.y + margin && r[3] <= box.y + box.h - margin

  const order = [...spaces].sort(
    (a, b) => Number(b.id === selected) - Number(a.id === selected) || b.areaHa - a.areaHa,
  )
  const out: Placed[] = []

  for (const s of order) {
    const text = mapName(s)

    // Por dentro, quando a forma tem altura e largura para o nome.
    const inner = Math.min(px(15), s.label.r * 0.62, (s.label.r * 3) / (CHAR_EM * text.length))
    if (inner * k >= MIN_LABEL_PX) {
      const w = CHAR_EM * inner * text.length
      const rect: Rect = [s.label.x - w / 2, s.label.y - inner * 0.7, s.label.x + w / 2, s.label.y + inner * 0.4]
      if (!taken.some((t) => overlaps(t, rect))) {
        taken.push(rect)
        out.push({ id: s.id, text, x: s.label.x, y: s.label.y, size: inner, anchor: 'middle' })
        continue
      }
    }

    // Ao lado. As formas dos outros contam como ocupadas; a própria não.
    const size = px(SIDE_LABEL_PX)
    const w = CHAR_EM * size * text.length
    const [x0, y0, x1, y1] = footprint(s)
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2
    const g = px(4)
    const others = spaces.filter((o) => o.id !== s.id && o.label.r * k >= MIN_SHAPE_PX).map((o) => o.box)
    const candidates: [Placed, Rect][] = [
      [{ id: s.id, text, x: x1 + g, y: cy + size * 0.35, size, anchor: 'start' }, [x1 + g, cy - size / 2, x1 + g + w, cy + size / 2]],
      [{ id: s.id, text, x: x0 - g, y: cy + size * 0.35, size, anchor: 'end' }, [x0 - g - w, cy - size / 2, x0 - g, cy + size / 2]],
      [{ id: s.id, text, x: cx, y: y1 + g + size * 0.8, size, anchor: 'middle' }, [cx - w / 2, y1 + g, cx + w / 2, y1 + g + size]],
      [{ id: s.id, text, x: cx, y: y0 - g - size * 0.2, size, anchor: 'middle' }, [cx - w / 2, y0 - g - size, cx + w / 2, y0 - g]],
    ]
    const fit = candidates.find(
      ([, rect]) => inside(rect) && !taken.some((t) => overlaps(t, rect)) && !others.some((o) => overlaps(o, rect)),
    )
    if (!fit) continue
    taken.push(fit[1])
    out.push(fit[0])
  }
  return out
}

/** Um número redondo de quilómetros que dê uma barra de 60 a 140 px. */
function scaleBarKm(k: number): number {
  for (const km of [0.5, 1, 2, 5, 10]) {
    if (km * UNITS_PER_KM * k >= 60) return km
  }
  return 10
}

interface Props {
  spaces: GreenSpace[]
  scale: Scale
  selected: string | null
  /** Sob o rato ou com o foco do teclado — a distinção não interessa aqui. */
  active: string | null
  onSelect: (id: string | null) => void
  onActivate: (id: string | null) => void
}

export default function GreenFigure({
  spaces,
  scale,
  selected,
  active,
  onSelect,
  onActivate,
}: Props) {
  const box = BOXES[scale]
  const relief = RELIEF[scale]

  /* A largura a que a carta está de facto desenhada. Os limiares em pixéis
     — o corpo dos nomes, o tamanho mínimo de uma forma — são pixéis do
     ecrã, e num telemóvel a carta mede um terço do que mede numa
     secretária. Até à primeira medição vale a largura de referência. */
  const svgRef = useRef<SVGSVGElement>(null)
  const [widthPx, setWidthPx] = useState(900)
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width) setWidthPx(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const k = widthPx / box.w
  const px = (n: number) => n / k

  const find = (id: string | null) => spaces.find((s) => s.id === id)
  const activeSpace = active === selected ? undefined : find(active)
  const selectedSpace = find(selected)

  // Os pontos de referência escrevem-se primeiro e reservam o seu sítio.
  // No concelho fica só a Portagem: a Universidade está a meio quilómetro
  // dela, que a essa escala são quatro píxeis.
  const landmarks = LANDMARKS.filter((l) => scale === 'cidade' || l.id === 'portagem').map((l, i) => {
    const size = px(10.5)
    const w = CHAR_EM * size * l.name.length * 1.15
    // A Portagem escreve à esquerda do ponto, a Universidade à direita:
    // estão a meio quilómetro uma da outra e não cabiam do mesmo lado.
    const left = i === 0
    const x = left ? l.x - px(7) : l.x + px(7)
    const rect: Rect = left
      ? [x - w, l.y - size, x, l.y + size * 0.4]
      : [x, l.y - size, x + w, l.y + size * 0.4]
    return { ...l, size, tx: x, anchor: (left ? 'end' : 'start') as 'end' | 'start', rect }
  })

  const barKm = scaleBarKm(k)
  const barUnits = barKm * UNITS_PER_KM
  const barX = box.x + px(16)
  const barY = box.y + box.h - px(18)

  // A barra de escala e o rótulo do raio também ocupam sítio: um nome por
  // cima de qualquer deles não se lia.
  const radiusText = `${CITY_RADIUS_KM} km da Portagem`
  const radiusW = CHAR_EM * px(10.5) * radiusText.length * 1.15
  const fixed: Rect[] = [
    [barX, barY - px(12), barX + barUnits + px(40), barY + px(6)],
    [
      CITY_FOCUS.x - radiusW / 2,
      CITY_FOCUS.y - CITY_FOCUS.r - px(16),
      CITY_FOCUS.x + radiusW / 2,
      CITY_FOCUS.y - CITY_FOCUS.r,
    ],
  ]

  /* No concelho, os lugares dentro do raio dos 3 km amontoam-se num
     centímetro de mapa; os nomes deles ficam para a escala da cidade, e
     aqui escrevem-se os de fora, o Choupal e o escolhido. */
  const named = scale === 'cidade'
    ? spaces
    : spaces.filter((s) => s.distanceKm > CITY_RADIUS_KM || s.areaHa >= 50 || s.id === selected)
  const labels = useMemo(
    () => placeLabels(named, box, k, selected, [...fixed, ...landmarks.map((l) => l.rect)]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spaces, scale, k, selected],
  )


  return (
    <svg
      ref={svgRef}
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className="green-map"
      role="group"
      aria-label={`Mapa das zonas verdes de Coimbra, à escala ${scale === 'cidade' ? 'da cidade' : 'do concelho'}`}
    >
      <defs>
        <clipPath id="green-municipio">
          <path d={MUNICIPALITY_OUTLINE} />
        </clipPath>
      </defs>

      {/* O chão. O relevo dá a forma à cidade — a colina da Alta, o vale
          do Mondego, as serras a nascente — e só existe dentro do concelho,
          que é o que o mapa mede. */}
      <image
        href={relief.href}
        x={relief.x}
        y={relief.y}
        width={relief.w}
        height={relief.h}
        preserveAspectRatio="none"
        clipPath="url(#green-municipio)"
        className="green-relief"
        aria-hidden="true"
      />

      {/* A água antes das estradas, para as pontes passarem por cima do rio,
          e antes do verde, porque é o que está por baixo: um parque na
          margem desenha-se sobre o rio, e não ao lado dele. */}
      <g className="green-water" aria-hidden="true">
        <path d={WATER.areas} />
        <path d={WATER.lines} className="green-river" />
      </g>

      <g className="green-roads" aria-hidden="true">
        <path d={ROADS.minor} className="green-road-minor" />
        <path d={ROADS.secondary} className="green-road-secondary" />
        <path d={ROADS.major} className="green-road-major" />
      </g>

      {/* As freguesias, em traço fino, só para situar. Mesma projecção e
          mesmo viewBox do mapa do Território — não há nada a converter. */}
      <g className="green-context" aria-hidden="true">
        {PARISH_SHAPES.map((shape) => (
          <path key={shape.code} d={shape.d} />
        ))}
      </g>

      <path d={MUNICIPALITY_OUTLINE} className="green-outline" aria-hidden="true" />

      {/* O raio dos 3 km, nas duas escalas. Na cidade diz onde acaba o
          "a pé"; no concelho, quanto da mancha verde fica fora dele. */}
      <g aria-hidden="true">
        <circle cx={CITY_FOCUS.x} cy={CITY_FOCUS.y} r={CITY_FOCUS.r} className="green-radius" />
        <text
          x={CITY_FOCUS.x}
          y={CITY_FOCUS.y - CITY_FOCUS.r - px(5)}
          fontSize={px(10.5)}
          className="green-radius-label"
          style={{ strokeWidth: px(3) }}
        >
          {radiusText}
        </text>
      </g>

      {spaces.map((space) => {
        const kind = KINDS[space.kind]
        const tiny = space.label.r * k < MIN_SHAPE_PX
        const label = `${space.name}: ${kind.label.toLowerCase()} de ${space.areaHa} hectares`
        return (
          <g
            key={space.id}
            className={`green-shape${selected === space.id ? ' is-selected' : ''}`}
            role="button"
            tabIndex={0}
            aria-pressed={selected === space.id}
            aria-label={label}
            onClick={() => onSelect(selected === space.id ? null : space.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(selected === space.id ? null : space.id)
              }
            }}
            onPointerEnter={() => onActivate(space.id)}
            onPointerLeave={() => onActivate(null)}
            onFocus={() => onActivate(space.id)}
            onBlur={() => onActivate(null)}
          >
            {tiny && (
              <circle
                cx={space.label.x}
                cy={space.label.y}
                r={px(MARKER_PX)}
                fill={kind.color}
                stroke={kind.edge}
                className="green-marker"
              />
            )}
            <path d={space.d} fill={kind.color} stroke={kind.edge} />
          </g>
        )
      })}

      {/* O realce é um caminho à parte por cima de tudo: um SVG não tem
          z-index, e mudar o traço no sítio deixava-o tapado pelos vizinhos
          desenhados depois. */}
      {activeSpace && <path d={activeSpace.d} className="green-active" aria-hidden="true" />}
      {selectedSpace && <path d={selectedSpace.d} className="green-selected" aria-hidden="true" />}

      {/* O nome do rio só na cidade: no concelho cairia em cima do
          aglomerado de jardins do centro. */}
      {WATER.label && scale === 'cidade' && (
        <text
          x={WATER.label.x}
          y={WATER.label.y}
          fontSize={px(13)}
          transform={`rotate(${WATER.label.angle} ${WATER.label.x} ${WATER.label.y})`}
          className="green-river-label"
          style={{ strokeWidth: px(3) }}
          aria-hidden="true"
        >
          Mondego
        </text>
      )}

      <g aria-hidden="true">
        {landmarks.map((l) => (
          <g key={l.id} className={`green-landmark green-landmark-${l.id}`}>
            {l.id === 'portagem' ? (
              <circle cx={l.x} cy={l.y} r={px(4.5)} style={{ strokeWidth: px(2) }} />
            ) : (
              <rect x={l.x - px(3.5)} y={l.y - px(3.5)} width={px(7)} height={px(7)} style={{ strokeWidth: px(1.5) }} />
            )}
            <text
              x={l.tx}
              y={l.y + l.size * 0.35}
              fontSize={l.size}
              textAnchor={l.anchor}
              style={{ strokeWidth: l.size * 0.3 }}
            >
              {l.name}
            </text>
          </g>
        ))}
      </g>

      <g aria-hidden="true">
        {labels.map((label) => (
          <text
            key={label.id}
            x={label.x}
            y={label.y}
            fontSize={label.size}
            textAnchor={label.anchor}
            className={`green-label${label.id === selected ? ' is-selected' : ''}`}
            style={{ strokeWidth: label.size * 0.28 }}
          >
            {label.text}
          </text>
        ))}
      </g>

      {/* Barra de escala: um número redondo de quilómetros, do tamanho que
          a janela e o ecrã deixam. */}
      <g className="green-scalebar" aria-hidden="true">
        <path
          d={`M${barX},${barY - px(4)}V${barY}H${barX + barUnits}V${barY - px(4)}`}
          style={{ strokeWidth: px(1.25) }}
        />
        <text x={barX + barUnits + px(6)} y={barY + px(1)} fontSize={px(10.5)} style={{ strokeWidth: px(3) }}>
          {barKm < 1 ? `${barKm * 1000} m` : `${barKm} km`}
        </text>
      </g>
    </svg>
  )
}
