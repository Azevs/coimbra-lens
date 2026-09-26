'use client'

import { useState } from 'react'

import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { published, estimate } from '@/lib/provenance'
import { useMapLayers } from '@/hooks/useMapLayers'
import { MAP_VIEW, BOUNDARIES_FETCHED_AT } from '@/lib/parish-map'
import { NEXT_CENSUS, PARISH_CENSUS_YEAR } from '@/lib/parishes'
import type { Square } from '@/lib/parish-geometry'
import { CENSUS_POINTS } from '@/lib/parish-census'
import {
  CLASS_COUNT,
  METRICS,
  METRIC_ORDER,
  MUNICIPALITY,
  SHAPED_PARISH_ROWS,
  classFill,
  signedPct,
  type MetricId,
} from '@/lib/parish-metrics'
import ParishDetail from './ParishDetail'
import ParishFigure, { type ParishView } from './ParishFigure'
import ParishTable from './ParishTable'

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

/**
 * As contagens por subsecção. O ficheiro do INE é de Novembro de 2022, com
 * os resultados definitivos: a soma por freguesia dá, ao habitante, a
 * população que o resto da página mostra — o gerador recusa-se a escrever
 * se não der.
 */
const BGRI_META = published(
  'INE · BGRI 2021 e 2011',
  'Censos por subsecção',
  'Contagens dos Censos 2021 e 2011 por subsecção estatística. A população de 2011 soma-se à freguesia de hoje onde cai cada subsecção; as casas sem residentes são os alojamentos clássicos vagos ou de residência secundária, que o INE publica juntos.',
  '2021-12-31T12:00:00',
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
            <span key={i} style={{ background: classFill(i, metric.ramp) }} />
          ))}
        </div>
        <div className="parish-legend-ticks" aria-hidden="true">
          {metric.breaks.map((value, i) => (
            <span key={value} style={{ left: `${((i + 1) / CLASS_COUNT) * 100}%` }}>
              {metric.tick(value)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * O quadrado de referência da vista proporcional: o maior número redondo de
 * habitantes cujo quadrado não passe de um oitavo da largura do desenho.
 */
function keyPopulation(unitsPerPerson: number): number {
  const fits = [1000, 2000, 5000, 10000].filter(
    (n) => Math.sqrt(unitsPerPerson * n) <= MAP_VIEW.width / 8,
  )
  return fits[fits.length - 1] ?? 1000
}

const VIEWS: { id: ParishView; label: string }[] = [
  { id: 'mapa', label: 'Mapa' },
  { id: 'proporcional', label: 'Proporcional' },
  { id: 'pessoas', label: 'Onde vivem' },
]

const pct1 = (v: number) =>
  v.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const int = (v: number) => Math.round(v).toLocaleString('pt-PT')

/** Junta nomes à portuguesa: "a, b e c". */
function joinNames(names: string[]): string {
  return names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`
}

/**
 * A frase que abre cada leitura do mapa. Tudo o que diz sai das contagens:
 * quem cresceu, quem mais perdeu, onde a proporção é maior. Se os Censos
 * de 2031 trocarem a ordem, a frase troca com eles.
 */
function lede(metricId: MetricId, view: ParishView): string {
  const rows = SHAPED_PARISH_ROWS
  const m = MUNICIPALITY
  if (view === 'pessoas') {
    return `Uma espiga por subsecção estatística — o quarteirão dos Censos —, com a altura dos seus residentes. São ${int(CENSUS_POINTS.length)} com gente a viver. Metade de quem mora no concelho mora em ${pct1(m.census.metadeArea * 100)}% da sua área.`
  }
  if (view === 'proporcional') {
    return `Cada quadrado tem a área proporcional aos habitantes da freguesia e fica perto de onde ela está. A cor é a ${METRICS[metricId].label.toLowerCase()}.`
  }
  if (metricId === 'variacao') {
    const grew = rows.filter((r) => (r.change ?? 0) > 0)
    const worst = [...rows].sort((a, b) => (a.change ?? 0) - (b.change ?? 0))[0]
    const lost = m.census.populacao2011 - m.census.populacao
    return (
      `Entre 2011 e 2021 o concelho ${lost > 0 ? 'perdeu' : 'ganhou'} ${int(Math.abs(lost))} residentes (${signedPct(m.change)}%). ` +
      `${grew.length === 1 ? 'Só uma' : `Só ${grew.length}`} das ${m.parishes} freguesias ${grew.length === 1 ? 'cresceu' : 'cresceram'}: ${joinNames(grew.map((r) => r.short))}. ` +
      `A que mais perdeu foi ${worst.short}, com ${signedPct(worst.change ?? 0)}%.`
    )
  }
  if (metricId === 'envelhecimento') {
    const younger = rows.filter((r) => r.ageing !== null && r.ageing2011 !== null && r.ageing < r.ageing2011)
    return (
      `Em 2021 havia ${int(m.ageing)} residentes com 65 anos ou mais por cada 100 com menos de 15; em 2011 eram ${int(m.ageing2011)}. ` +
      (younger.length === 0
        ? 'Todas as freguesias envelheceram.'
        : `${younger.length === 1 ? 'Só' : ''} ${joinNames(younger.map((r) => r.short))} ${younger.length === 1 ? 'rejuvenesceu' : 'rejuvenesceram'} — ${younger
            .map((r) => `de ${int(r.ageing2011!)} para ${int(r.ageing!)}`)
            .join('; ')}.`)
    ).replace('  ', ' ')
  }
  if (metricId === 'semResidentes') {
    const top = [...rows].sort((a, b) => (b.withoutResidents ?? 0) - (a.withoutResidents ?? 0))[0]
    return (
      `No concelho, ${pct1(m.withoutResidents)}% das casas não têm quem lá viva todo o ano: estão vagas ou são de uso ocasional — o INE conta as duas juntas. ` +
      `Em ${top.short} são ${pct1(top.withoutResidents ?? 0)}%.`
    )
  }
  return 'Toque numa freguesia, ou numa linha da tabela, para ver os números dela.'
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
 * Agora são os limites da carta oficial, pintados pela variável escolhida,
 * sobre o relevo e o rio. Não há zoom nem arrastar: o município cabe todo
 * de uma vez, e o que se quer saber de uma freguesia lê-se contra as
 * vizinhas, não aproximando. A vista proporcional troca a área de cada
 * freguesia pela sua população; a tabela ao lado é o mesmo objecto em
 * números, e o que se aponta num realça-se no outro.
 */
export default function ParishMap({
  squares,
  unitsPerPerson,
}: {
  squares: Square[]
  unitsPerPerson: number
}) {
  const { selectedParish, setParish, activeParish, setActiveParish } = useMapLayers()
  const [metricId, setMetricId] = useState<MetricId>('populacao')
  const [view, setView] = useState<ParishView>('mapa')

  const metric = METRICS[metricId]
  const rows = SHAPED_PARISH_ROWS
  const selected = rows.find((row) => row.code === selectedParish) ?? null
  const hovered = rows.find((row) => row.code === activeParish) ?? null
  const proportional = view === 'proporcional' && squares.length > 0
  const people = view === 'pessoas'

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

  // Onde assenta a caixa do valor: no nome da freguesia, ou no topo do
  // quadrado dela na vista proporcional.
  const tipAnchor = (() => {
    if (!hovered) return null
    const sq = proportional ? squares.find((s) => s.code === hovered.code) : undefined
    return sq
      ? { x: sq.x, y: sq.y - sq.side / 2 + 10 }
      : { x: hovered.shape.label.x, y: hovered.shape.label.y }
  })()

  return (
    <section id="mapa" className="page-section">
      <div className="section-container">
        <SectionTitle
          label="EXPLORAÇÃO GEOGRÁFICA"
          title="Mapa das Freguesias"
          subtitle="As 18 freguesias de Coimbra, pela população residente e pela densidade. Mais escuro é sempre mais."
        />

        <div className="parish-controls">
          <div className="parish-toggles">
            <div className="parish-metrics parish-metric-set" role="radiogroup" aria-label="Variável pintada" hidden={people}>
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
            {squares.length > 0 && (
              <div className="parish-metrics" role="radiogroup" aria-label="Vista">
                {VIEWS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={id === view}
                    onClick={() => setView(id)}
                    className={`parish-metric${id === view ? ' is-on' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {people ? (
            <p className="ui-mono parish-legend-note">Altura: residentes por subsecção · Censos 2021</p>
          ) : (
            <Legend metricId={metricId} />
          )}
        </div>

        <p className="parish-hint" aria-live="polite">
          {lede(metricId, proportional ? 'proporcional' : view)}
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
              view={view}
              squares={squares}
              keyPopulation={keyPopulation(unitsPerPerson)}
              unitsPerPerson={unitsPerPerson}
              selected={selectedParish}
              active={activeParish}
              onSelect={setParish}
              onActivate={setActiveParish}
            />

            {hovered && tipAnchor && hovered.code !== selectedParish && (
              <div
                className="parish-tip"
                aria-hidden="true"
                style={{
                  left: `${Math.min(Math.max((tipAnchor.x / MAP_VIEW.width) * 100, 16), 84)}%`,
                  top: `${(tipAnchor.y / MAP_VIEW.height) * 100}%`,
                  // O ponto de ancoragem é o mesmo onde assenta o nome da
                  // freguesia; os 30px afastam a caixa o suficiente para
                  // não lhe tapar a segunda linha.
                  transform:
                    tipAnchor.y / MAP_VIEW.height < 0.22
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

          <div className="parish-aside" id="freguesias">
            {selected ? (
              <ParishDetail parish={selected} onClear={() => setParish(null)} variant="aside" />
            ) : (
              <p className="ui-note parish-aside-hint">
                Aponte uma freguesia no mapa ou na tabela; escolha-a para ver os números dela.
              </p>
            )}
            <ParishTable
              rows={rows}
              metric={metric}
              selected={selectedParish}
              active={activeParish}
              onSelect={setParish}
              onActivate={setActiveParish}
            />
          </div>
        </div>

        <DataSource meta={BOUNDARIES_META} />
        <DataSource meta={CENSUS_META} />
        <DataSource meta={BGRI_META} />
      </div>

      {selected && (
        <ParishDetail parish={selected} onClear={() => setParish(null)} variant="sheet" />
      )}
    </section>
  )
}
