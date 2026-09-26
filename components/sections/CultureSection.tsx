'use client'

import { useSyncExternalStore } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import Label from '@/components/ui/Label'
import Icon from '@/components/ui/Icon'
import { EVENTS } from '@/lib/festas'

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
