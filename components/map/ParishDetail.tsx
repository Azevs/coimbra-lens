'use client'

import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { MUNICIPALITY, formatArea, type ParishRow } from '@/lib/parish-metrics'
import { PARISH_CENSUS_YEAR } from '@/lib/parishes'

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0.5rem 0',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <span className="ui-note">{label}</span>
      <span
        className="font-data"
        style={{ fontSize: '13px', color: 'var(--text-primary)', textAlign: 'right' }}
      >
        {children}
      </span>
    </div>
  )
}

/**
 * A coluna ao lado do mapa. Não é um modal e não é uma gaveta que salta:
 * fica sempre no mesmo sítio, ocupada com o município enquanto não há
 * freguesia escolhida. Um modal tapava o mapa, e é contra as vizinhas que
 * um valor de uma freguesia se lê.
 */
export default function ParishDetail({
  parish,
  onClear,
}: {
  parish: ParishRow | null
  onClear: () => void
}) {
  if (!parish) {
    return (
      <div className="panel-accent parish-detail">
        <span className="ui-label ui-label-accent">Município</span>
        <h3 className="font-display" style={{ fontSize: '1.375rem', lineHeight: 1.2 }}>
          Coimbra
        </h3>
        <p className="ui-note" style={{ margin: '0.625rem 0 1rem', maxWidth: '32ch' }}>
          Escolha uma freguesia no mapa para ver os seus números.
        </p>

        <Row label="Freguesias">{MUNICIPALITY.parishes}</Row>
        <Row label={`População (${PARISH_CENSUS_YEAR})`}>
          {MUNICIPALITY.population.toLocaleString('pt-PT')}
        </Row>
        <Row label="Área">{formatArea(MUNICIPALITY.areaKm2)} km²</Row>
        <Row label="Densidade">
          {Math.round(MUNICIPALITY.density).toLocaleString('pt-PT')} hab./km²
        </Row>
      </div>
    )
  }

  return (
    <div className="panel-accent parish-detail">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <span className="ui-label ui-label-accent">Freguesia</span>
        <button type="button" onClick={onClear} className="parish-detail-close">
          Limpar
        </button>
      </div>

      <h3 className="font-display" style={{ fontSize: '1.375rem', lineHeight: 1.2 }}>
        {parish.name}
      </h3>

      <p className="ui-note" style={{ margin: '0.625rem 0 1.25rem' }}>
        {parish.rank}.ª mais populosa das {MUNICIPALITY.parishes}
      </p>

      <span className="ui-label ui-label-secondary" style={{ marginBottom: '0.25rem' }}>
        População residente
      </span>
      <AnimatedNumber value={parish.population} className="text-3xl" />

      <div style={{ marginTop: '1.25rem' }}>
        <Row label="Quota do município">
          {parish.share.toLocaleString('pt-PT', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}{' '}
          %
        </Row>
        {parish.areaKm2 === null ? (
          <Row label="Área">—</Row>
        ) : (
          <Row label="Área">{formatArea(parish.areaKm2)} km²</Row>
        )}
        {parish.density === null ? (
          <Row label="Densidade">—</Row>
        ) : (
          <Row label="Densidade">
            {Math.round(parish.density).toLocaleString('pt-PT')} hab./km²
          </Row>
        )}
      </div>
    </div>
  )
}
