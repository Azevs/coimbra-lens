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

/** A maior da lista dá a escala da barra a todas as outras. */
const LARGEST = Math.max(...SPACES.map((s) => s.areaHa))

function Entry({ space }: { space: GreenSpace }) {
  const kind = KINDS[space.kind]
  return (
    <li className="green-row">
      <span className="green-row-kind" style={{ background: kind.color }} aria-hidden="true" />

      <div className="green-row-name">
        <span className="font-display" style={{ fontSize: '1.0625rem', lineHeight: 1.25 }}>
          {displayName(space)}
        </span>
        <span className="ui-note">
          {kind.label} · {parishName(space)}
        </span>
      </div>

      <div className="green-row-bar" aria-hidden="true">
        {/* Raiz quadrada, e não proporção directa: entre 0,2 e 586 hectares
            uma barra linear deixaria vinte e nove riscos invisíveis ao lado
            de um. A área lê-se no número; a barra serve para comparar. */}
        <span
          style={{
            width: `${Math.sqrt(space.areaHa / LARGEST) * 100}%`,
            background: kind.color,
          }}
        />
      </div>

      <span className="green-row-area font-data">{formatHa(space.areaHa)} ha</span>
      <span className="green-row-dist ui-note">{formatDistance(space.distanceKm)}</span>
    </li>
  )
}

function Group({ title, note, spaces }: { title: string; note: string; spaces: GreenSpace[] }) {
  if (!spaces.length) return null
  return (
    <div className="green-group">
      <div className="green-group-head">
        <h3 className="ui-label ui-label-accent">{title}</h3>
        <span className="ui-note">{note}</span>
      </div>
      <ul className="green-rows">
        {spaces.map((space) => (
          <Entry key={space.id} space={space} />
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
 */
export default function GreenList() {
  const [sort, setSort] = useState<SortId>('area')

  if (!SPACES.length) return null

  const order = SORTS[sort].compare
  const perto = [...IN_CITY].sort(order)
  const longe = [...OUT_OF_CITY].sort(order)

  return (
    <SectionReveal id="lista">
      <SectionTitle
        label="A LISTA"
        title="Todas, uma a uma"
        subtitle="Cada zona com a sua área medida no polígono, a freguesia onde cai e a distância em linha recta ao centro."
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
      />
      <Group
        title="Fora da cidade"
        note={`Mais de ${CITY_RADIUS_KM} km · ${longe.length} lugares`}
        spaces={longe}
      />

      <DataSource meta={GREEN_META} />
    </SectionReveal>
  )
}
