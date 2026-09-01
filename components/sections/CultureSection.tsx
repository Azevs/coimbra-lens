'use client'

import { useSyncExternalStore } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import { colorMix } from '@/lib/color'

interface CulturalEvent {
  name: string
  description: string
  month: number
  day: number
  color: string
  icon: string
  category: string
  url: string
}

const EVENTS: CulturalEvent[] = [
  {
    name: 'Queima das Fitas',
    description: 'A maior festa académica do país. Uma semana de cortejo, serenatas e concertos na Alta e Baixa de Coimbra.',
    month: 5, day: 10,
    color: 'var(--tone-amber-text)', icon: '🎓', category: 'Academia',
    url: 'https://queima.academica.pt',
  },
  {
    name: 'Jazz ao Centro',
    description: 'Festival de jazz internacional no coração de Coimbra, com concertos em espaços históricos da cidade.',
    month: 6, day: 15,
    color: 'var(--tone-blue-text)', icon: '🎷', category: 'Música',
    url: 'https://jazzaocentro.pt',
  },
  {
    name: 'Festa da Cidade',
    description: 'Celebração do Dia de Coimbra com espectáculos, exposições e animação de rua em toda a cidade.',
    month: 6, day: 4,
    color: 'var(--tone-teal-text)', icon: '🏛️', category: 'Cultura',
    url: 'https://www.cm-coimbra.pt',
  },
  {
    name: 'BTT Mondego',
    description: 'Prova de bicicleta de montanha ao longo do vale do Mondego. Um dos maiores eventos de BTT do país.',
    month: 10, day: 12,
    color: 'var(--tone-moss-text)', icon: '🚵', category: 'Desporto',
    url: 'https://www.bttmondego.com',
  },
  {
    name: 'Semana Académica',
    description: 'Semana cultural da Associação Académica com debates, exposições, workshops e serenatas.',
    month: 3, day: 20,
    color: 'var(--tone-violet-text)', icon: '📚', category: 'Academia',
    url: 'https://www.academica.pt',
  },
  {
    name: 'Festival das Artes',
    description: 'Programação multidisciplinar de artes performativas, instalações e cinema no Centro de Portugal.',
    month: 7, day: 1,
    color: 'var(--tone-crimson-text)', icon: '🎭', category: 'Arte',
    url: 'https://www.festivalartes.pt',
  },
  {
    name: 'Magusto de Coimbra',
    description: 'Celebração de São Martinho com castanhas, jeropiga e animação popular nas ruas da Baixa.',
    month: 11, day: 11,
    color: 'var(--tone-clay-text)', icon: '🌰', category: 'Tradição',
    url: 'https://www.cm-coimbra.pt',
  },
  {
    name: 'Mercado de Natal',
    description: 'Mercado natalício na Praça 8 de Maio com artesanato, gastronomia e espectáculos ao vivo.',
    month: 12, day: 1,
    color: 'var(--tone-blue-text)', icon: '🎄', category: 'Tradição',
    url: 'https://www.cm-coimbra.pt',
  },
]

function getNextDate(month: number, day: number): Date {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), month - 1, day)
  if (thisYear > now) return thisYear
  return new Date(now.getFullYear() + 1, month - 1, day)
}

function daysUntil(date: Date): number {
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

function CountdownBadge({ days, color }: { days: number; color: string }) {
  if (days === 0) return (
    <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: `${colorMix(color, 15)}`, color, border: `1px solid ${colorMix(color, 31)}`, fontWeight: 700 }}>
      HOJE
    </span>
  )
  if (days <= 7) return (
    <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: `${colorMix(color, 15)}`, color, border: `1px solid ${colorMix(color, 31)}`, fontWeight: 700 }}>
      {days}d
    </span>
  )
  if (days <= 30) return (
    <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-sunken)', color: 'var(--text-secondary)', border: '1px solid var(--border-panel)' }}>
      {days}d
    </span>
  )
  const months = Math.floor(days / 30)
  return (
    <span style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-sunken)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
      ~{months} {months === 1 ? 'mês' : 'meses'}
    </span>
  )
}

export default function CultureSection() {
  // A contagem decrescente depende da hora actual, que difere entre o
  // servidor e o browser. Renderizamos apenas depois da hidratação, sem
  // setState dentro de um efeito (que provoca renders em cascata).
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
        title="Agenda Cultural"
        subtitle="Os grandes eventos anuais de Coimbra — festas, festivais e tradições da cidade."
      />

      {/* Next event hero */}
      {now && (
        <GlassCard style={{ marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px',
            borderRadius: '50%', background: `radial-gradient(circle, ${colorMix(next.color, 8)} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px', flexShrink: 0,
              background: `${colorMix(next.color, 9)}`, border: `1px solid ${colorMix(next.color, 19)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
            }}>
              {next.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '4px' }}>
                <span style={{ fontSize: '9px', color: next.color, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  PRÓXIMO EVENTO
                </span>
                <CountdownBadge days={daysUntil(next.nextDate)} color={next.color} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.375rem', color: 'var(--text-primary)', margin: '0 0 4px', lineHeight: 1.2 }}>
                {next.name}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {next.description}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '2.5rem', color: next.color, fontWeight: 700, lineHeight: 1, display: 'block' }}>
                {daysUntil(next.nextDate)}
              </span>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>DIAS</span>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Full calendar list */}
      <div className="grid-cards">
        {sorted.map((event) => {
          const days = daysUntil(event.nextDate)
          const isNext = event.name === next.name
          return (
            <a
              key={event.name}
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                padding: '1rem',
                background: isNext ? `${colorMix(event.color, 6)}` : 'transparent',
                border: `1px solid ${isNext ? `${colorMix(event.color, 19)}` : 'var(--border-subtle)'}`,
                borderRadius: '12px',
                display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
                transition: 'background 0.2s, border-color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = `${colorMix(event.color, 7)}`; (e.currentTarget as HTMLDivElement).style.borderColor = `${colorMix(event.color, 25)}` }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = isNext ? `${colorMix(event.color, 6)}` : 'transparent'; (e.currentTarget as HTMLDivElement).style.borderColor = isNext ? `${colorMix(event.color, 19)}` : 'var(--border-subtle)' }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                  background: `${colorMix(event.color, 9)}`, border: `1px solid ${colorMix(event.color, 19)}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                }}>
                  {event.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-ibm-plex)', fontWeight: 600 }}>
                      {event.name}
                    </span>
                    {now && <CountdownBadge days={days} color={event.color} />}
                  </div>
                  <span style={{ fontSize: '9px', color: event.color, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    {event.category} · {event.nextDate.toLocaleDateString('pt-PT', { month: 'long' })}
                  </span>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {event.description}
                  </p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      <p style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.4, marginTop: '1rem', textAlign: 'right' }}>
        Meses habituais. As datas exactas mudam todos os anos e são confirmadas pelos organizadores — siga a ligação de cada evento.
      </p>
    </SectionReveal>
  )
}
