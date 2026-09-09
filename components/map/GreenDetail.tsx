'use client'

import {
  IN_CITY,
  KINDS,
  SPACES,
  TOTAL_HA,
  displayName,
  formatDistance,
  formatHa,
  inPitches,
  parishName,
  type GreenSpace,
} from '@/lib/green'
import { CITY_RADIUS_KM } from '@/lib/green-spaces'
import { fmt } from '@/lib/format'

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
 * A coluna ao lado do mapa. Como no Território, não é um modal nem uma
 * gaveta: fica sempre no mesmo sítio, ocupada com o conjunto enquanto não
 * há zona escolhida. Uma área lê-se contra as outras, e um modal tapava
 * justamente aquilo contra o que ela se lê.
 */
export default function GreenDetail({
  space,
  onClear,
}: {
  space: GreenSpace | null
  onClear: () => void
}) {
  if (!space) {
    const maior = SPACES[0]
    return (
      <div className="panel-accent green-detail">
        <span className="ui-label ui-label-accent">Conjunto</span>
        <h3 className="font-display" style={{ fontSize: '1.375rem', lineHeight: 1.2 }}>
          {SPACES.length} zonas verdes
        </h3>
        <p className="ui-note" style={{ margin: '0.625rem 0 1rem', maxWidth: '32ch' }}>
          Escolha uma no mapa ou na lista. A maior é {displayName(maior)}, a menor cabe
          numa praça de bairro.
        </p>
        <Row label="Área somada">{formatHa(TOTAL_HA)} ha</Row>
        <Row label={`A menos de ${CITY_RADIUS_KM} km do centro`}>
          {IN_CITY.length} de {SPACES.length}
        </Row>
        <Row label="Maior">{formatHa(maior.areaHa)} ha</Row>
      </div>
    )
  }

  const kind = KINDS[space.kind]
  const share = (space.areaHa / TOTAL_HA) * 100

  return (
    <div className="panel-accent green-detail">
      <span className="ui-label ui-label-accent" style={{ color: kind.color }}>
        {kind.label}
      </span>
      <h3 className="font-display" style={{ fontSize: '1.375rem', lineHeight: 1.2 }}>
        {displayName(space)}
      </h3>

      {/* Quando a cidade lhe chama outra coisa, o nome da carta fica dito —
          uma vez, em letra pequena, e não a competir com o que se usa. */}
      {displayName(space) !== space.name && (
        <p className="ui-note" style={{ margin: '0.375rem 0 0' }}>
          Na carta: {space.name}
        </p>
      )}

      <p className="ui-note" style={{ margin: '0.625rem 0 1rem', maxWidth: '32ch' }}>
        {kind.note}
      </p>

      <Row label="Área">{formatHa(space.areaHa)} ha</Row>
      <Row label="Equivale a">{fmt(inPitches(space.areaHa), 0)} campos de futebol</Row>
      <Row label="Do total desta lista">{fmt(share, 1)} %</Row>
      <Row label="Freguesia">{parishName(space)}</Row>
      <Row label="Do Largo da Portagem">{formatDistance(space.distanceKm)}</Row>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button onClick={onClear} className="green-detail-close">
          Limpar
        </button>
        {space.website && (
          <a
            href={space.website}
            target="_blank"
            rel="noopener noreferrer"
            className="green-detail-close"
          >
            Sítio oficial
          </a>
        )}
        {/* Quem achar o contorno errado corrige-o na fonte, e a correcção
            chega aqui na extracção seguinte. */}
        <a
          href={`https://www.openstreetmap.org/${space.osm}`}
          target="_blank"
          rel="noopener noreferrer"
          className="green-detail-close"
        >
          Ver na carta
        </a>
      </div>
    </div>
  )
}
