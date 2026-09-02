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

const EVENTS: CulturalEvent[] = [
  {
    name: 'Queima das Fitas',
    description: 'A maior festa académica do país. Uma semana de cortejo, serenatas e concertos na Alta e Baixa de Coimbra.',
    month: 5, day: 10,
    color: 'var(--tone-amber-text)', icon: 'graduation', category: 'Academia',
    url: 'https://queima.academica.pt',
  },
  {
    name: 'Jazz ao Centro',
    description: 'Festival de jazz internacional no coração de Coimbra, com concertos em espaços históricos da cidade.',
    month: 6, day: 15,
    color: 'var(--tone-blue-text)', icon: 'music', category: 'Música',
    url: 'https://jazzaocentro.pt',
  },
  {
    name: 'Festa da Cidade',
    description: 'Celebração do Dia de Coimbra com espectáculos, exposições e animação de rua em toda a cidade.',
    month: 6, day: 4,
    color: 'var(--tone-teal-text)', icon: 'landmark', category: 'Cultura',
    url: 'https://www.cm-coimbra.pt',
  },
  {
    name: 'BTT Mondego',
    description: 'Prova de bicicleta de montanha ao longo do vale do Mondego. Um dos maiores eventos de BTT do país.',
    month: 10, day: 12,
    color: 'var(--tone-moss-text)', icon: 'bike', category: 'Desporto',
    url: 'https://www.bttmondego.com',
  },
  {
    name: 'Semana Académica',
    description: 'Semana cultural da Associação Académica com debates, exposições, workshops e serenatas.',
    month: 3, day: 20,
    color: 'var(--tone-violet-text)', icon: 'book', category: 'Academia',
    url: 'https://www.academica.pt',
  },
  {
    name: 'Festival das Artes',
    description: 'Programação multidisciplinar de artes performativas, instalações e cinema no Centro de Portugal.',
    month: 7, day: 1,
    color: 'var(--tone-crimson-text)', icon: 'theatre', category: 'Arte',
    url: 'https://www.festivalartes.pt',
  },
  {
    name: 'Magusto de Coimbra',
    description: 'Celebração de São Martinho com castanhas, jeropiga e animação popular nas ruas da Baixa.',
    month: 11, day: 11,
    color: 'var(--tone-clay-text)', icon: 'leaf', category: 'Tradição',
    url: 'https://www.cm-coimbra.pt',
  },
  {
    name: 'Mercado de Natal',
    description: 'Mercado natalício na Praça 8 de Maio com artesanato, gastronomia e espectáculos ao vivo.',
    month: 12, day: 1,
    color: 'var(--tone-blue-text)', icon: 'star', category: 'Tradição',
    url: 'https://www.cm-coimbra.pt',
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
