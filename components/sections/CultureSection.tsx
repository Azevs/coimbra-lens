'use client'

import { useSyncExternalStore } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import Label from '@/components/ui/Label'
import Icon, { type IconName } from '@/components/ui/Icon'

interface CulturalEvent {
  name: string
  description: string
  month: number
  day: number
  color: string
  icon: IconName
  category: string
  url: string
}

/**
 * Só entra o que se confirmou no organizador ou na Câmara (Setembro de 2026).
 * `day` serve apenas para ordenar dentro do mês; o que se mostra é o mês.
 *
 * Saíram da versão anterior, por não se confirmarem: "Semana Académica" em
 * março, "Magusto de Coimbra", "BTT Mondego" e "Mercado de Natal" na Praça
 * 8 de Maio. A "Festa da Cidade" estava a 4 de junho; é a 4 de julho, dia da
 * Rainha Santa. O Jazz ao Centro estava em junho; é no início do outono.
 */
const EVENTS: CulturalEvent[] = [
  {
    name: 'Queima das Fitas',
    description: 'A festa dos finalistas da universidade. Abre com a Serenata Monumental, à meia-noite, no largo da Sé Velha; segue-se mais de uma semana de cortejo e concertos.',
    month: 5, day: 21,
    color: 'var(--tone-amber-text)', icon: 'graduation', category: 'Academia',
    url: 'https://www.cm-coimbra.pt/areas/viver/cultura/eventos-regulares/queima-das-fitas',
  },
  {
    name: 'Festas da Cidade e da Rainha Santa',
    description: 'A partir de 4 de julho, feriado municipal e dia da padroeira: dez dias de concertos e animação, e as procissões da Rainha Santa entre Santa Clara-a-Nova e Santa Cruz.',
    month: 7, day: 4,
    color: 'var(--tone-teal-text)', icon: 'landmark', category: 'Cidade',
    url: 'https://www.cm-coimbra.pt/areas/viver/cultura/eventos-regulares/festas-da-cidade-de-coimbra',
  },
  {
    name: 'Festival das Artes QuebraJazz',
    description: 'Música clássica e jazz ao ar livre, no anfiteatro da Colina de Camões, nos jardins da Quinta das Lágrimas. Estende-se por julho e agosto.',
    month: 7, day: 12,
    color: 'var(--tone-crimson-text)', icon: 'theatre', category: 'Música',
    url: 'https://www.festivaldasartes.com/',
  },
  {
    name: 'Festa das Latas',
    description: 'A Latada recebe os novos estudantes: serenata no Largo da Sé Nova, cortejo pela cidade e concertos na Praça da Canção.',
    month: 10, day: 1,
    color: 'var(--tone-violet-text)', icon: 'graduation', category: 'Academia',
    url: 'https://www.festadaslatas.pt/pt',
  },
  {
    name: 'Jazz ao Centro',
    description: 'Os encontros internacionais de jazz do Jazz ao Centro Clube, em várias salas da cidade; as noites acabam no Salão Brazil.',
    month: 10, day: 2,
    color: 'var(--tone-blue-text)', icon: 'music', category: 'Música',
    url: 'https://www.jazzaocentroclube.pt/',
  },
]

function getNextDate(month: number, day: number): Date {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), month - 1, day)
  if (thisYear > now) return thisYear
  return new Date(now.getFullYear() + 1, month - 1, day)
}

/** Meses até ao próximo. As datas são aproximadas, por isso os dias não. */
function mesesAte(date: Date): string {
  const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (days <= 31) return 'este mês'
  const months = Math.round(days / 30)
  return `daqui a ${months} ${months === 1 ? 'mês' : 'meses'}`
}

/**
 * Agenda anual — as festas que se repetem.
 *
 * Os cartões com cantos redondos e fundos coloridos eram o terceiro sistema
 * de blocos do site; passam a linhas com filete, como a agenda do mês.
 * A contagem em dias saiu: as datas são os meses habituais, e uma contagem
 * a dias dava precisão a algo que não a tem.
 */
export default function CultureSection() {
  // A ordenação depende da data actual, que difere entre o servidor e o
  // browser. Renderizamos só depois da hidratação, sem setState em efeito.
  const now = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const sorted = [...EVENTS]
    .map((e) => ({ ...e, nextDate: getNextDate(e.month, e.day) }))
    .sort((a, b) => a.nextDate.getTime() - b.nextDate.getTime())

  const next = sorted[0]

  return (
    <SectionReveal id="cultura">
      <SectionTitle
        label="CULTURA & TRADIÇÃO"
        title="Todos os anos"
        subtitle="As festas, festivais e tradições que voltam sempre. As datas exactas mudam de ano para ano e são confirmadas pelos organizadores — aqui está o mês habitual de cada uma."
      />

      {/* O próximo, em destaque */}
      {now && (
        <div className="panel-accent" style={{ marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.25rem', alignItems: 'start' }}>
          <Icon name={next.icon} size={36} style={{ color: next.color, marginTop: '0.25rem' }} />
          <div style={{ minWidth: 0 }}>
            <Label tone="accent" style={{ marginBottom: '0.375rem' }}>
              A seguir · {next.nextDate.toLocaleDateString('pt-PT', { month: 'long' })} · {mesesAte(next.nextDate)}
            </Label>
            <h3 className="font-display" style={{ fontSize: '1.75rem', margin: '0 0 0.375rem', lineHeight: 1.15 }}>
              <a href={next.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                {next.name}
              </a>
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, maxWidth: '60ch', fontWeight: 300 }}>
              {next.description}
            </p>
          </div>
        </div>
      )}

      {/* A lista, por ordem de chegada */}
      <div className="ruled-list">
        {sorted.map((event) => (
          <a
            key={event.name}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="agenda-anual-linha"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5rem 7rem 1fr',
              gap: '1rem',
              alignItems: 'baseline',
              textDecoration: 'none',
              color: 'inherit',
              padding: '0.875rem 0',
            }}
          >
            <Icon name={event.icon} size={16} style={{ color: event.color, alignSelf: 'center' }} />
            <span className="ui-mono" style={{ color: 'var(--accent-text)', textTransform: 'uppercase' }}>
              {event.nextDate.toLocaleDateString('pt-PT', { month: 'long' })}
            </span>
            <span style={{ minWidth: 0 }}>
              <span className="font-display" style={{ fontSize: '1.125rem', display: 'block', lineHeight: 1.3 }}>
                {event.name}
              </span>
              <span className="ui-note" style={{ display: 'block', marginTop: '2px' }}>
                {event.category} · {event.description}
              </span>
            </span>
          </a>
        ))}
      </div>
    </SectionReveal>
  )
}
