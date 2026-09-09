'use client'

import { CITY_FOCUS, GREEN_VIEW, MUNICIPALITY_OUTLINE, WATER } from '@/lib/green-spaces'
import { PARISH_SHAPES } from '@/lib/parish-map'
import { KINDS, mapName, type GreenSpace } from '@/lib/green'

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

/**
 * Abaixo de três pixéis um polígono deixa de ser uma forma e passa a ser
 * um cisco: não se vê, não se acerta com o rato e não se percebe que é
 * clicável. À escala do concelho isso é quase toda a lista. Quem cai
 * abaixo ganha um disco por baixo — não é o desenho do jardim, é a marca
 * de que ali está um, e é o que se pode acertar com o dedo.
 */
const MIN_SHAPE_PX = 3
const MARKER_PX = 4.5
/** Corpo mínimo de um nome no mapa, em pixéis. Abaixo disto não se lê. */
const MIN_LABEL_PX = 9

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
  /* Quanto a janela escolhida amplia o desenho. Os limiares abaixo estão em
     pixéis de uma carta servida à largura de referência — mil unidades —,
     que é aproximadamente o que ela mede num ecrã de secretária. Num ecrã
     estreito a carta é menor e o que se vê também: é por isso que os nomes
     desaparecem abaixo dos 720px, no CSS, em vez de encolherem aqui.

     As espessuras de traço não passam por aqui: essas são pixéis do ecrã a
     sério, feitas no CSS com `vector-effect`. */
  const k = GREEN_VIEW.width / box.w
  const px = (n: number) => n / k

  const find = (id: string | null) => spaces.find((s) => s.id === id)
  const activeSpace = active === selected ? undefined : find(active)
  const selectedSpace = find(selected)

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      className="green-map"
      role="group"
      aria-label={`Mapa das zonas verdes de Coimbra, à escala ${scale === 'cidade' ? 'da cidade' : 'do concelho'}`}
    >
      {/* As freguesias, em traço fino, só para situar. Mesma projecção e
          mesmo viewBox do mapa do Território — não há nada a converter. */}
      <g className="green-context" aria-hidden="true">
        {PARISH_SHAPES.map((shape) => (
          <path key={shape.code} d={shape.d} />
        ))}
      </g>

      {/* A água antes do verde, porque é o que está por baixo: um parque
          na margem desenha-se sobre o rio, e não ao lado dele. A margem
          pinta-se; o eixo traça-se, com espessura em pixéis para não
          engrossar quando o mapa aproxima. */}
      <g className="green-water" aria-hidden="true">
        <path d={WATER.areas} />
        <path d={WATER.lines} className="green-river" />
      </g>

      <path d={MUNICIPALITY_OUTLINE} className="green-outline" aria-hidden="true" />

      {/* O raio de 3 km. À escala do concelho mostra quanto da mancha verde
          fica fora do alcance de quem sai de casa a pé. */}
      {scale === 'concelho' && (
        <circle
          cx={CITY_FOCUS.x}
          cy={CITY_FOCUS.y}
          r={CITY_FOCUS.r}
          className="green-radius"
          aria-hidden="true"
        />
      )}

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
                className="green-marker"
              />
            )}
            <path d={space.d} fill={kind.color} />
          </g>
        )
      })}

      {/* O realce é um caminho à parte por cima de tudo: um SVG não tem
          z-index, e mudar o traço no sítio deixava-o tapado pelos vizinhos
          desenhados depois. */}
      {activeSpace && (
        <path d={activeSpace.d} className="green-active" aria-hidden="true" />
      )}
      {selectedSpace && (
        <path d={selectedSpace.d} className="green-selected" aria-hidden="true" />
      )}

      <g aria-hidden="true">
        {spaces.map((space) => {
          const text = mapName(space)
          // Duas restrições, e vence a mais apertada: o espaço em altura
          // que a forma tem, e o comprimento do nome em largura. O 0,52 é a
          // largura média de um caracter do IBM Plex em fracção do corpo.
          const size = Math.min(px(15), space.label.r * 0.62, (space.label.r * 3) / (0.52 * text.length))
          // Um nome que não caiba com corpo legível não se encolhe: sai. A
          // forma continua lá, e diz quem é quando for tocada.
          if (size * k < MIN_LABEL_PX) return null
          return (
            <text
              key={space.id}
              x={space.label.x}
              y={space.label.y}
              fontSize={size}
              className={`green-label${space.id === selected ? ' is-selected' : ''}`}
              style={{ strokeWidth: size * 0.26 }}
            >
              {text}
            </text>
          )
        })}
      </g>
    </svg>
  )
}
