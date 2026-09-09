'use client'

import { useState } from 'react'

import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { published, estimate } from '@/lib/provenance'
import { useMapLayers } from '@/hooks/useMapLayers'
import { MAP_VIEW, BOUNDARIES_FETCHED_AT } from '@/lib/parish-map'
import { NEXT_CENSUS, PARISH_CENSUS_YEAR } from '@/lib/parishes'
import {
  CLASS_COUNT,
  METRICS,
  METRIC_ORDER,
  SHAPED_PARISH_ROWS,
  classFill,
  type MetricId,
} from '@/lib/parish-metrics'
import ParishDetail from './ParishDetail'
import ParishFigure from './ParishFigure'

const CENSUS_META = published(
  `INE · Censos ${PARISH_CENSUS_YEAR}`,
  `Censos ${PARISH_CENSUS_YEAR}`,
  `Última desagregação por freguesia disponível em Portugal. Os Censos são decenais — o próximo é em ${NEXT_CENSUS}.`,
  `${PARISH_CENSUS_YEAR}-12-31T12:00:00`,
)

/**
 * A carta não tem instante de medição: é uma edição, não uma leitura. Por
 * isso o selo não leva data relativa — dizer "há 2 h" de uma carta
 * administrativa era anunciar frescura que ela não tem. A data em que foi
 * obtida vai na nota, por extenso.
 */
const BOUNDARIES_META = published(
  'DGT · CAOP',
  'Carta oficial',
  `Limites e áreas da Carta Administrativa Oficial de Portugal, obtidos em ${new Date(
    BOUNDARIES_FETCHED_AT,
  ).toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })} através da geoapi.pt. A densidade é a população dos Censos dividida por esta área.`,
)

/** Sem geometria não há mapa — e um mapa vazio diz-se, não se disfarça. */
const NO_GEOMETRY = estimate(
  'DGT · CAOP',
  'A carta das freguesias não foi gerada. Correr `node scripts/build-parish-map.mjs`.',
)

function Legend({ metricId }: { metricId: MetricId }) {
  const metric = METRICS[metricId]
  return (
    <div className="parish-legend">
      <span className="ui-mono" style={{ whiteSpace: 'nowrap' }}>
        {metric.unit}
      </span>
      <div>
        <div className="parish-legend-ramp" aria-hidden="true">
          {Array.from({ length: CLASS_COUNT }, (_, i) => (
            <span key={i} style={{ background: classFill(i) }} />
          ))}
        </div>
        <div className="parish-legend-ticks" aria-hidden="true">
          {metric.breaks.map((value, i) => (
            <span key={value} style={{ left: `${((i + 1) / CLASS_COUNT) * 100}%` }}>
              {metric.format(value)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * O mapa do Território.
 *
 * Era um Mapbox com um marcador redondo por freguesia, pousado num centro
 * escrito à mão. Uma população é uma grandeza de área e estava desenhada
 * como um ponto: o mapa não dizia que Santo António dos Olivais é enorme
 * nem que a união do centro histórico é um retalho apertado, que é
 * exactamente a diferença entre população e densidade.
 *
 * Agora são os limites da carta oficial, pintados pela variável escolhida.
 * Não há zoom nem arrastar: o município cabe todo de uma vez, e o que se
 * quer saber de uma freguesia lê-se contra as vizinhas, não aproximando.
 */
export default function ParishMap() {
  const { selectedParish, setParish } = useMapLayers()
  const [metricId, setMetricId] = useState<MetricId>('populacao')
  const [active, setActive] = useState<string | null>(null)

  const metric = METRICS[metricId]
  const rows = SHAPED_PARISH_ROWS
  const selected = rows.find((row) => row.code === selectedParish) ?? null
  const hovered = rows.find((row) => row.code === active) ?? null

  if (rows.length === 0) {
    return (
      <section id="mapa" className="page-section">
        <div className="section-container">
          <SectionTitle
            label="EXPLORAÇÃO GEOGRÁFICA"
            title="Mapa das Freguesias"
            subtitle="As 18 freguesias de Coimbra, pela população residente e pela densidade."
          />
          <DataSource meta={NO_GEOMETRY} />
        </div>
      </section>
    )
  }

  return (
    <section id="mapa" className="page-section">
      <div className="section-container">
        <SectionTitle
          label="EXPLORAÇÃO GEOGRÁFICA"
          title="Mapa das Freguesias"
          subtitle="As 18 freguesias de Coimbra, pela população residente e pela densidade. Mais escuro é sempre mais."
        />

        <div className="parish-controls">
          <div className="parish-metrics" role="radiogroup" aria-label="Variável do mapa">
            {METRIC_ORDER.map((id) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={id === metricId}
                onClick={() => setMetricId(id)}
                className={`parish-metric${id === metricId ? ' is-on' : ''}`}
              >
                {METRICS[id].label}
              </button>
            ))}
          </div>
          <Legend metricId={metricId} />
        </div>

        <p className="parish-hint ui-note">
          Toque numa freguesia para ver o nome e os números.
        </p>

        <div
          className="parish-layout"
          onKeyDown={(event) => {
            if (event.key === 'Escape') setParish(null)
          }}
        >
          {/* A razão do desenho vai para o CSS: é ela que impede a carta
              de ficar mais alta do que o ecrã. Sai daqui, e não de um
              número escrito à mão, para acompanhar o viewBox gerado. */}
          <figure
            className="parish-figure"
            style={
              { '--map-ratio': MAP_VIEW.width / MAP_VIEW.height } as React.CSSProperties
            }
          >
            <ParishFigure
              rows={rows}
              metric={metric}
              selected={selectedParish}
              active={active}
              onSelect={setParish}
              onActivate={setActive}
            />

            {hovered && hovered.code !== selectedParish && (
              <div
                className="parish-tip"
                aria-hidden="true"
                style={{
                  left: `${Math.min(Math.max((hovered.shape.label.x / MAP_VIEW.width) * 100, 16), 84)}%`,
                  top: `${(hovered.shape.label.y / MAP_VIEW.height) * 100}%`,
                  // O ponto de ancoragem é o mesmo onde assenta o nome da
                  // freguesia; os 30px afastam a caixa o suficiente para
                  // não lhe tapar a segunda linha.
                  transform:
                    hovered.shape.label.y / MAP_VIEW.height < 0.22
                      ? 'translate(-50%, 30px)'
                      : 'translate(-50%, calc(-100% - 30px))',
                }}
              >
                <span className="parish-tip-name">{hovered.short}</span>
                <span className="parish-tip-value font-data">
                  {(() => {
                    const value = metric.value(hovered)
                    return value === null ? '—' : metric.format(value)
                  })()}
                  <span className="ui-mono"> {metric.unit}</span>
                </span>
              </div>
            )}
          </figure>

          <div className="parish-aside">
            <ParishDetail parish={selected} onClear={() => setParish(null)} />
          </div>
        </div>

        <DataSource meta={BOUNDARIES_META} />
        <DataSource meta={CENSUS_META} />
      </div>
    </section>
  )
}
