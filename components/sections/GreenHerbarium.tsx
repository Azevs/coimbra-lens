'use client'

import { useState } from 'react'

import {
  KINDS,
  SPACES,
  UNITS_PER_KM,
  displayName,
  formatHa,
  mapName,
  parishName,
} from '@/lib/green'

/**
 * Píxeis por unidade do desenho à largura de secretária. É o valor que o
 * CSS dá a `--herb-s` a partir dos 1100 px; aqui serve só para decidir que
 * formas são largas o bastante para levar o nome por baixo. Abaixo disso o
 * CSS muda a escala e tira os nomes a todas.
 */
const DESKTOP_SCALE = 1.3
/** Largura mínima, em píxeis, de uma forma que leva o nome por baixo. */
const CAPTION_MIN_PX = 64

/**
 * O herbário: todas as zonas verdes desenhadas à mesma escala, lado a lado.
 *
 * O mapa diz onde ficam; isto diz o tamanho que têm umas ao lado das
 * outras, que é o que no mapa não se vê — lá, o Paul de Arzila está a
 * onze quilómetros do Jardim da Sereia e nunca aparecem juntos. Aqui a
 * reserva ocupa meia página e a praceta mais pequena é um grão. Não há
 * eixo nem barra: é a própria forma de cada lugar, e a escala é uma só.
 */
export default function GreenHerbarium({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  const [active, setActive] = useState<string | null>(null)
  if (!SPACES.length) return null

  const shown = SPACES.find((s) => s.id === (active ?? selected))
  const largest = SPACES[0]
  const smallest = SPACES[SPACES.length - 1]

  return (
    <figure className="herbarium">
      <div className="herbarium-head">
        <span className="ui-label ui-label-accent">À mesma escala</span>
        <span className="herbarium-bar" aria-hidden="true">
          <span style={{ width: `calc(var(--herb-s) * ${UNITS_PER_KM.toFixed(2)} * 1px)` }} />
          1 km
        </span>
      </div>

      <ul className="herbarium-grid">
        {SPACES.map((space) => {
          const [x0, y0, x1, y1] = space.box
          const w = x1 - x0
          const h = y1 - y0
          const kind = KINDS[space.kind]
          const on = space.id === selected
          return (
            <li key={space.id} className="herbarium-item">
              <button
                type="button"
                className={`herbarium-shape${on ? ' is-selected' : ''}`}
                aria-pressed={on}
                aria-label={`${displayName(space)}, ${formatHa(space.areaHa)} hectares. Ver no mapa.`}
                onClick={() => onSelect(space.id)}
                onPointerEnter={() => setActive(space.id)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(space.id)}
                onBlur={() => setActive(null)}
              >
                <svg
                  viewBox={`${x0} ${y0} ${w} ${h}`}
                  style={{
                    width: `calc(var(--herb-s) * ${w.toFixed(1)} * 1px)`,
                    height: `calc(var(--herb-s) * ${h.toFixed(1)} * 1px)`,
                  }}
                  aria-hidden="true"
                >
                  <path d={space.d} fill={kind.color} stroke={kind.edge} />
                </svg>
              </button>
              <span className="herbarium-name" aria-hidden="true">
                {w * DESKTOP_SCALE >= CAPTION_MIN_PX ? mapName(space) : ''}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Uma linha só, que diz de quem é a forma sob o rato. Sem nada
          escolhido, diz as duas pontas da escala. */}
      <figcaption className="herbarium-caption" aria-live="polite">
        {shown ? (
          <>
            <strong>{displayName(shown)}</strong>
            <span className="font-data"> {formatHa(shown.areaHa)} ha</span>
            <span className="ui-note">
              {' '}
              · {KINDS[shown.kind].label} · {parishName(shown)}
              {shown.paid ? ' · entrada paga' : ''}
            </span>
          </>
        ) : (
          <span className="ui-note">
            Os {SPACES.length} lugares, do maior ao mais pequeno: {displayName(largest)} tem{' '}
            {formatHa(largest.areaHa)} hectares, {displayName(smallest)} tem {formatHa(smallest.areaHa)}. Toque numa
            forma para a ver no mapa.
          </span>
        )}
      </figcaption>
    </figure>
  )
}
