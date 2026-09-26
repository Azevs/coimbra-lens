'use client'

import { MAP_VIEW, MUNICIPALITY_OUTLINE } from '@/lib/parish-map'
import { MUNICIPALITY, formatArea, signedPct, type ShapedParishRow } from '@/lib/parish-metrics'
import type { ParishCensus } from '@/lib/parish-census'
import { PARISH_CENSUS_YEAR } from '@/lib/parishes'

function Row({
  label,
  children,
  extra = false,
}: {
  label: string
  children: React.ReactNode
  /** Linhas que o cartão colado ao fundo do ecrã deixa de fora, por espaço. */
  extra?: boolean
}) {
  return (
    <div className={`parish-detail-row${extra ? ' is-extra' : ''}`}>
      <span className="ui-note">{label}</span>
      <span className="font-data">{children}</span>
    </div>
  )
}

/**
 * A densidade contra a do concelho. Acima da média diz-se em vezes; abaixo,
 * em percentagem — "0,3 vezes a média" obriga o leitor a fazer a conta.
 */
function vsAverage(density: number): string {
  const r = density / MUNICIPALITY.density
  return r >= 1
    ? `${r.toLocaleString('pt-PT', { maximumFractionDigits: 1 })}× a média do concelho`
    : `${Math.round(r * 100)}% da média do concelho`
}

const pct1 = (v: number) =>
  v.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

const AGES = ['0–14', '15–24', '25–64', '65 +'] as const

/**
 * Os quatro grupos etários numa barra só, com a do concelho por baixo, mais
 * fina, para comparar. É a pirâmide que os Censos dão por subsecção: quatro
 * degraus, sem sexos nem anos a anos.
 */
function AgeBar({ census }: { census: ParishCensus }) {
  const row = (c: ParishCensus, className: string) => {
    const total = c.idades.reduce((a, b) => a + b, 0)
    return (
      <div className={`parish-ages-bar ${className}`}>
        {c.idades.map((n, i) => (
          <span key={AGES[i]} className={`age-${i}`} style={{ width: `${(n / total) * 100}%` }} />
        ))}
      </div>
    )
  }
  const total = census.idades.reduce((a, b) => a + b, 0)
  return (
    <figure className="parish-ages">
      <figcaption className="ui-note">Idades · 2021</figcaption>
      {row(census, 'is-parish')}
      {row(MUNICIPALITY.census, 'is-municipality')}
      <ul className="parish-ages-key">
        {census.idades.map((n, i) => (
          <li key={AGES[i]}>
            <span className={`age-${i}`} aria-hidden="true" />
            {AGES[i]} <span className="font-data">{Math.round((n / total) * 100)}%</span>
          </li>
        ))}
      </ul>
      <p className="parish-ages-note ui-note">A barra fina é o concelho.</p>
    </figure>
  )
}

/** O concelho em miniatura, com a freguesia a acento: diz onde ela fica. */
function Locator({ parish }: { parish: ShapedParishRow }) {
  return (
    <svg
      className="parish-locator"
      viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
      aria-hidden="true"
    >
      <path d={MUNICIPALITY_OUTLINE} className="parish-locator-all" />
      <path d={parish.shape.d} className="parish-locator-one" />
    </svg>
  )
}

/**
 * O que se sabe de uma freguesia escolhida.
 *
 * Numa secretária fica ao lado do mapa, por cima da tabela. No telemóvel e
 * nos ecrãs em que a tabela desce para debaixo do mapa, o mesmo cartão
 * cola-se ao fundo do ecrã: tocar numa freguesia tem de dar resposta ali
 * mesmo, e não num painel que ficou dois ecrãs mais abaixo.
 */
export default function ParishDetail({
  parish,
  onClear,
  variant,
}: {
  parish: ShapedParishRow
  onClear: () => void
  variant: 'aside' | 'sheet'
}) {
  return (
    <div
      className={`parish-detail parish-detail-${variant}`}
      role={variant === 'sheet' ? 'region' : undefined}
      aria-label={variant === 'sheet' ? `Freguesia escolhida: ${parish.short}` : undefined}
    >
      <Locator parish={parish} />
      <div className="parish-detail-body">
        <div className="parish-detail-head">
          <span className="ui-label ui-label-accent">
            {parish.rank}.ª em população · {PARISH_CENSUS_YEAR}
          </span>
          <button type="button" onClick={onClear} className="parish-detail-close">
            {variant === 'sheet' ? 'Fechar' : 'Limpar'}
          </button>
        </div>

        <h3 className="font-display parish-detail-name">{parish.name}</h3>

        <div className="parish-detail-rows">
          <Row label="Habitantes">{parish.population.toLocaleString('pt-PT')}</Row>
          <Row label="Do concelho" extra>
            {parish.share.toLocaleString('pt-PT', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}{' '}
            %
          </Row>
          <Row label="Área" extra>{formatArea(parish.areaKm2)} km²</Row>
          <Row label="Densidade">
            {Math.round(parish.density).toLocaleString('pt-PT')} hab./km²
            <span className="parish-detail-vs">{vsAverage(parish.density)}</span>
          </Row>
          {parish.census && parish.change !== null && (
            <Row label="Desde 2011">
              {signedPct(parish.change)} %
              <span className="parish-detail-vs">
                eram {parish.census.populacao2011.toLocaleString('pt-PT')}
              </span>
            </Row>
          )}
          {parish.ageing !== null && parish.ageing2011 !== null && (
            <Row label="Idosos por 100 jovens">
              {Math.round(parish.ageing)}
              <span className="parish-detail-vs">em 2011, {Math.round(parish.ageing2011)}</span>
            </Row>
          )}
          {parish.withoutResidents !== null && (
            <Row label="Casas sem residentes" extra>
              {pct1(parish.withoutResidents)} %
              <span className="parish-detail-vs">vagas ou de uso ocasional</span>
            </Row>
          )}
        </div>

        {parish.census && variant === 'aside' && (
          <>
            <AgeBar census={parish.census} />
            <p className="parish-detail-half">
              Metade dos residentes vive em{' '}
              <strong className="font-data">{pct1(parish.census.metadeArea * 100)} %</strong> da área
              da freguesia — as subsecções mais densas.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
