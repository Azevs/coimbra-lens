'use client'

import { useState } from 'react'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { CITY_RADIUS_KM } from '@/lib/green-spaces'
import {
  GREEN_META,
  IN_CITY,
  KINDS,
  OUT_OF_CITY,
  SPACES,
  displayName,
  formatDistance,
  formatHa,
  parishName,
  type GreenSpace,
} from '@/lib/green'

type SortId = 'area' | 'distancia' | 'nome'

const SORTS: Record<SortId, { label: string; compare: (a: GreenSpace, b: GreenSpace) => number }> = {
  area: { label: 'Maior primeiro', compare: (a, b) => b.areaHa - a.areaHa },
  distancia: { label: 'Mais perto primeiro', compare: (a, b) => a.distanceKm - b.distanceKm },
  nome: {
    label: 'Por nome',
    compare: (a, b) => displayName(a).localeCompare(displayName(b), 'pt'),
  },
}

/**
 * A forma do lugar, em miniatura.
 *
 * Cada uma no seu próprio tamanho, esticada à caixa — não à mesma escala.
 * A comparação de tamanhos faz-se no herbário, lá em cima; aqui a forma
 * serve para reconhecer o lugar, como a silhueta de um país num atlas.
 */
function Thumb({ space }: { space: GreenSpace }) {
  const [x0, y0, x1, y1] = space.box
  const side = Math.max(x1 - x0, y1 - y0) * 1.1
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const kind = KINDS[space.kind]
  return (
    <svg
      className="green-row-thumb"
      viewBox={`${cx - side / 2} ${cy - side / 2} ${side} ${side}`}
      aria-hidden="true"
    >
      <path d={space.d} fill={kind.color} stroke={kind.edge} />
    </svg>
  )
}

function Entry({
  space,
  selected,
  onSelect,
}: {
  space: GreenSpace
  selected: boolean
  onSelect: (id: string) => void
}) {
  const kind = KINDS[space.kind]
  return (
    <li>
      <button
        type="button"
        className={`green-row${selected ? ' is-selected' : ''}`}
        aria-pressed={selected}
        onClick={() => onSelect(space.id)}
      >
        <Thumb space={space} />

        <span className="green-row-name">
          <span className="font-display" style={{ fontSize: '1.0625rem', lineHeight: 1.25 }}>
            {displayName(space)}
          </span>
          <span className="ui-note">
            <span style={{ color: kind.text, fontWeight: 600 }}>{kind.label}</span> · {parishName(space)}
            {space.paid && ' · entrada paga'}
          </span>
        </span>

        <span className="green-row-area font-data">{formatHa(space.areaHa)} ha</span>
        <span className="green-row-dist ui-note">{formatDistance(space.distanceKm)}</span>
        <span className="green-row-go ui-note" aria-hidden="true">
          Ver no mapa ↑
        </span>
      </button>
    </li>
  )
}

function Group({
  title,
  note,
  spaces,
  selected,
  onSelect,
}: {
  title: string
  note: string
  spaces: GreenSpace[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  if (!spaces.length) return null
  return (
    <div className="green-group">
      <div className="green-group-head">
        <h3 className="ui-label ui-label-accent">{title}</h3>
        <span className="ui-note">{note}</span>
      </div>
      <ul className="green-rows">
        {spaces.map((space) => (
          <Entry key={space.id} space={space} selected={space.id === selected} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  )
}

/**
 * A lista completa, partida em duas: o que se alcança a pé da cidade e o
 * que obriga a sair dela.
 *
 * A divisão não é decorativa. A Reserva do Paul de Arzila tem setenta por
 * cento de todos os hectares desta página e está a onze quilómetros e meio
 * do Largo da Portagem — misturá-la com o Jardim da Sereia numa só lista
 * daria a entender que se vai a um como se vai ao outro.
 *
 * Cada linha é um botão: escolhe o lugar e desce ao mapa.
 */
export default function GreenList({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  const [sort, setSort] = useState<SortId>('area')

  if (!SPACES.length) return null

  const order = SORTS[sort].compare
  const perto = [...IN_CITY].sort(order)
  const longe = [...OUT_OF_CITY].sort(order)

  return (
    <SectionReveal id="lista" className="green-section">
      <SectionTitle
        label="A LISTA"
        title="Todas, uma a uma"
        subtitle="Cada zona com a sua área medida no polígono, a freguesia onde cai e a distância em linha recta ao centro. Toque numa para a ver no mapa."
      />

      <div className="green-sorts" role="group" aria-label="Ordenação da lista">
        {(Object.keys(SORTS) as SortId[]).map((id) => (
          <button
            key={id}
            type="button"
            className={`green-sort${sort === id ? ' is-on' : ''}`}
            aria-pressed={sort === id}
            onClick={() => setSort(id)}
          >
            {SORTS[id].label}
          </button>
        ))}
      </div>

      <Group
        title="Na cidade"
        note={`Até ${CITY_RADIUS_KM} km do Largo da Portagem · ${perto.length} lugares`}
        spaces={perto}
        selected={selected}
        onSelect={onSelect}
      />
      <Group
        title="Fora da cidade"
        note={`Mais de ${CITY_RADIUS_KM} km · ${longe.length} lugares`}
        spaces={longe}
        selected={selected}
        onSelect={onSelect}
      />

      <DataSource meta={GREEN_META} />
    </SectionReveal>
  )
}
