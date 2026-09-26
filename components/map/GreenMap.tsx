'use client'

import { useState, type RefObject } from 'react'

import SectionTitle from '@/components/ui/SectionTitle'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { CITY_RADIUS_KM } from '@/lib/green-spaces'
import {
  GREEN_META,
  KINDS,
  KIND_ORDER,
  NO_GEOMETRY,
  OUT_OF_CITY,
  SPACES,
  TOTAL_HA,
  displayName,
  formatHa,
  type GreenKind,
} from '@/lib/green'
import GreenFigure, { BOXES, type Scale } from './GreenFigure'
import GreenDetail from './GreenDetail'

function Legend({
  hidden,
  onToggle,
}: {
  hidden: Set<GreenKind>
  onToggle: (kind: GreenKind) => void
}) {
  return (
    <div className="green-legend">
      {KIND_ORDER.map((kind) => {
        const off = hidden.has(kind)
        const count = SPACES.filter((s) => s.kind === kind).length
        return (
          <button
            key={kind}
            type="button"
            className={`green-legend-item${off ? ' is-off' : ''}`}
            aria-pressed={!off}
            onClick={() => onToggle(kind)}
          >
            <span
              className="green-legend-swatch"
              style={{ background: KINDS[kind].color, borderColor: KINDS[kind].edge }}
              aria-hidden="true"
            />
            {KINDS[kind].plural}
            <span className="green-legend-count">{count}</span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * O mapa das zonas verdes.
 *
 * Duas escalas, porque a cidade e o concelho não cabem no mesmo desenho: à
 * escala do concelho o Jardim da Sereia tem meio milímetro, e à escala da
 * cidade a Reserva do Paul de Arzila está a onze quilómetros de distância,
 * fora da caixa. Trocar de escala é trocar o viewBox — o desenho é o
 * mesmo, e não há nada a recarregar.
 *
 * O que está escolhido, a escala e as famílias à vista vivem no
 * `GreenExplorer`, porque o herbário e a lista também escolhem.
 */
export default function GreenMap({
  scale,
  onScale,
  selected,
  onSelect,
  hidden,
  onToggle,
  anchorRef,
}: {
  scale: Scale
  onScale: (scale: Scale) => void
  selected: string | null
  onSelect: (id: string | null) => void
  hidden: Set<GreenKind>
  onToggle: (kind: GreenKind) => void
  /** Para onde a página desce quando se escolhe um lugar fora do mapa. */
  anchorRef: RefObject<HTMLDivElement | null>
}) {
  const [active, setActive] = useState<string | null>(null)

  if (!SPACES.length) {
    return (
      <section id="mapa" className="page-section green-section">
        <div className="section-container">
          <SectionTitle
            label="ZONAS VERDES"
            title="Onde é verde"
            subtitle="Os espaços verdes públicos de Coimbra, em mapa e em lista."
          />
          <DataUnavailable meta={NO_GEOMETRY} />
          <DataSource meta={NO_GEOMETRY} showNote={false} />
        </div>
      </section>
    )
  }

  const visible = SPACES.filter((s) => !hidden.has(s.kind))
  const space = SPACES.find((s) => s.id === selected) ?? null
  const box = BOXES[scale]
  const hovered = visible.find((s) => s.id === active) ?? null

  return (
    <section id="mapa" className="page-section green-section">
      <div className="section-container">
        <SectionTitle
          label="ZONAS VERDES"
          title="Onde é verde"
          subtitle={`${SPACES.length} espaços públicos com nome, ${formatHa(
            TOTAL_HA,
          )} hectares somados. O círculo a tracejado é o raio de ${CITY_RADIUS_KM} km do Largo da Portagem: ${
            OUT_OF_CITY.length
          } destes lugares ficam fora dele.`}
        />

        <div className="green-controls" ref={anchorRef}>
          <div className="green-scales" role="group" aria-label="Escala do mapa">
            {(['cidade', 'concelho'] as Scale[]).map((option) => (
              <button
                key={option}
                type="button"
                className={`green-scale${scale === option ? ' is-on' : ''}`}
                aria-pressed={scale === option}
                onClick={() => onScale(option)}
              >
                {option === 'cidade' ? 'Cidade' : 'Concelho'}
              </button>
            ))}
          </div>
          <Legend hidden={hidden} onToggle={onToggle} />
        </div>

        <p className="green-hint ui-note">
          Toque numa forma para ver a ficha. As linhas finas são as freguesias.
        </p>

        <div className="green-layout" onKeyDown={(e) => e.key === 'Escape' && onSelect(null)}>
          {/* A razão do desenho muda com a escala — a cidade é uma caixa
              quadrada, o concelho é mais alto do que largo. Vai em variável
              para o CSS, que é quem impede a carta de passar do ecrã. */}
          <figure
            className="green-figure"
            style={{ '--map-ratio': box.w / box.h } as React.CSSProperties}
          >
            <GreenFigure
              spaces={visible}
              scale={scale}
              selected={selected}
              active={active}
              onSelect={onSelect}
              onActivate={setActive}
            />

            {/* Nem todas as formas ficam com o nome escrito. Esta etiqueta
                diz o de qualquer uma, debaixo do rato ou do foco. */}
            {hovered && hovered.id !== selected && (
              <div
                className="green-tip"
                aria-hidden="true"
                style={{
                  left: `${Math.min(Math.max(((hovered.label.x - box.x) / box.w) * 100, 14), 86)}%`,
                  top: `${((hovered.label.y - box.y) / box.h) * 100}%`,
                  transform:
                    (hovered.label.y - box.y) / box.h < 0.2
                      ? 'translate(-50%, 22px)'
                      : 'translate(-50%, calc(-100% - 22px))',
                }}
              >
                <span className="green-tip-name">{displayName(hovered)}</span>
                <span className="green-tip-value font-data">
                  {formatHa(hovered.areaHa)}
                  <span className="ui-mono"> ha</span>
                </span>
              </div>
            )}
          </figure>

          <div className="green-aside">
            <GreenDetail space={space} onClear={() => onSelect(null)} />
          </div>
        </div>

        <DataSource meta={GREEN_META} />
      </div>
    </section>
  )
}
