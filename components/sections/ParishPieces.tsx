'use client'

import { useMapLayers } from '@/hooks/useMapLayers'
import { MAP_VIEW } from '@/lib/parish-map'
import { MUNICIPALITY_CENTER } from '@/lib/parish-geometry'
import {
  METRICS,
  MUNICIPALITY,
  SHAPED_PARISH_ROWS,
  classFill,
  formatArea,
  metricClass,
} from '@/lib/parish-metrics'
import { canAnimate } from '@/lib/motion'

/** Quanto cada peça se afasta do centro, em fracção da distância a ele. */
const SPREAD = 0.2
/** Folga à volta do desenho afastado, em unidades do viewBox. */
const PAD = 24

/**
 * O concelho desmontado nas suas dezoito peças.
 *
 * Cada freguesia afasta-se do centro na direcção em que está, e o que
 * sobra entre elas é o traço das fronteiras. A cor é a da população, a
 * mesma rampa do mapa lá em baixo: logo aqui se vê que as peças grandes
 * não são as mais povoadas. Escolher uma leva ao mapa, com ela escolhida.
 */
export default function ParishPieces() {
  const { selectedParish, setParish, activeParish, setActiveParish } = useMapLayers()
  const rows = SHAPED_PARISH_ROWS
  if (!rows.length) return null

  const [cx, cy] = MUNICIPALITY_CENTER
  const offsets = new Map(
    rows.map((row) => [
      row.code,
      { dx: (row.shape.label.x - cx) * SPREAD, dy: (row.shape.label.y - cy) * SPREAD },
    ]),
  )

  // A caixa cresce com o afastamento: as peças da orla saem para fora da
  // caixa original tanto quanto se afastam.
  const grow = (1 + SPREAD) * 1.02
  const w = MAP_VIEW.width * grow + PAD * 2
  const h = MAP_VIEW.height * grow + PAD * 2
  const x0 = cx - w / 2
  const y0 = cy - h / 2

  const shown = rows.find((r) => r.code === (activeParish ?? selectedParish))
  const largest = rows[0]
  const smallest = rows[rows.length - 1]

  const choose = (code: string) => {
    setParish(code)
    document.getElementById('mapa')?.scrollIntoView({
      behavior: canAnimate() ? 'smooth' : 'auto',
      block: 'start',
    })
  }

  return (
    <figure className="pieces">
      <svg viewBox={`${x0} ${y0} ${w} ${h}`} className="pieces-svg" role="group" aria-label="As 18 freguesias de Coimbra, separadas">
        {rows.map((row, i) => {
          const { dx, dy } = offsets.get(row.code)!
          const on = row.code === selectedParish
          return (
            <path
              key={row.code}
              d={row.shape.d}
              fill={classFill(metricClass(METRICS.populacao, row.population))}
              className={`pieces-piece${on ? ' is-selected' : ''}${row.code === activeParish ? ' is-active' : ''}`}
              style={
                {
                  '--dx': `${dx.toFixed(1)}px`,
                  '--dy': `${dy.toFixed(1)}px`,
                  '--i': i,
                } as React.CSSProperties
              }
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${row.name}, ${row.population.toLocaleString('pt-PT')} habitantes. Ver no mapa.`}
              onClick={() => choose(row.code)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  choose(row.code)
                }
              }}
              onPointerEnter={() => setActiveParish(row.code)}
              onPointerLeave={() => setActiveParish(null)}
              onFocus={() => setActiveParish(row.code)}
              onBlur={() => setActiveParish(null)}
            />
          )
        })}
      </svg>

      {/* Uma linha só, que diz de quem é a peça sob o rato. Sem nada
          apontado, diz as duas pontas. */}
      <figcaption className="pieces-caption" aria-live="polite">
        {shown ? (
          <>
            <strong>{shown.short}</strong>
            <span className="font-data"> {shown.population.toLocaleString('pt-PT')} hab.</span>
            <span className="ui-note"> · {formatArea(shown.areaKm2)} km² · {shown.rank}.ª de {MUNICIPALITY.parishes}</span>
          </>
        ) : (
          <span className="ui-note">
            Da mais povoada, {largest.short}, com {largest.population.toLocaleString('pt-PT')} habitantes, à menos,{' '}
            {smallest.short}, com {smallest.population.toLocaleString('pt-PT')}. Toque numa peça para a ver no mapa.
          </span>
        )}
      </figcaption>
    </figure>
  )
}
