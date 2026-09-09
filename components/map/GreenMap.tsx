'use client'

import { useState } from 'react'

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
              style={{ background: KINDS[kind].color }}
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
 * Escolher uma zona que não esteja na janela actual muda de escala em vez
 * de a realçar onde não se vê.
 */
export default function GreenMap() {
  const [scale, setScale] = useState<Scale>('cidade')
  const [selected, setSelected] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [hidden, setHidden] = useState<Set<GreenKind>>(new Set())

  if (!SPACES.length) {
    return (
      <section id="mapa" className="page-section">
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

  const select = (id: string | null) => {
    setSelected(id)
    const chosen = SPACES.find((s) => s.id === id)
    if (chosen && chosen.distanceKm > CITY_RADIUS_KM) setScale('concelho')
  }

  const toggle = (kind: GreenKind) => {
    setHidden((current) => {
      const next = new Set(current)
      if (next.has(kind)) next.delete(kind)
      else next.add(kind)
      return next
    })
    // Esconder a família da zona escolhida deixava um painel a descrever
    // uma forma que já não está no mapa.
    if (space?.kind === kind) setSelected(null)
  }

  const box = BOXES[scale]
  const hovered = visible.find((s) => s.id === active) ?? null

  return (
    <section id="mapa" className="page-section">
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

        <div className="green-controls">
          <div className="green-scales" role="group" aria-label="Escala do mapa">
            {(['cidade', 'concelho'] as Scale[]).map((option) => (
              <button
                key={option}
                type="button"
                className={`green-scale${scale === option ? ' is-on' : ''}`}
                aria-pressed={scale === option}
                onClick={() => setScale(option)}
              >
                {option === 'cidade' ? 'Cidade' : 'Concelho'}
              </button>
            ))}
          </div>
          <Legend hidden={hidden} onToggle={toggle} />
        </div>

        <p className="green-hint ui-note">
          Toque numa forma para ver a ficha. As linhas finas são as freguesias.
        </p>

        <div className="green-layout" onKeyDown={(e) => e.key === 'Escape' && setSelected(null)}>
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
              onSelect={select}
              onActivate={setActive}
            />

            {/* Quase nenhuma forma tem espaço para o nome escrito por
                dentro. Sem isto, o mapa era um conjunto de manchas anónimas
                que só se identificavam depois de clicadas. */}
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
            <GreenDetail space={space} onClear={() => setSelected(null)} />
          </div>
        </div>

        <DataSource meta={GREEN_META} />
      </div>
    </section>
  )
}
