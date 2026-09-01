'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { useEvents } from '@/hooks/useEvents'
import { useObras } from '@/hooks/useObras'
import type { CityEvent } from '@/app/api/events/route'
import type { Obra } from '@/app/api/obras/route'

/**
 * Quando a fonte falha, apontamos para onde a informação está mesmo hoje.
 * Um estado vazio que dá um destino útil vale mais do que uma lista velha.
 */
function Elsewhere({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div style={{ marginTop: '0.875rem' }}>
      <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
        Entretanto, consulte
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: 'var(--accent-text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ibm-plex)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--text-tertiary)' }}>→</span>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}

/** Dia e hora como se lê em voz alta: "sex, 12 set · 21h30". */
function quando(evento: CityEvent): string {
  const d = new Date(evento.date)
  const dia = d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' })
  const horas = d.getHours()
  const minutos = d.getMinutes()

  // Uma exposição que já abriu não tem hora útil para mostrar.
  if (evento.isOngoing) {
    const fim = evento.endDate ? new Date(evento.endDate) : null
    return fim
      ? `até ${fim.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}`
      : 'a decorrer'
  }
  // Meia-noite em ponto é como a agenda marca os eventos sem hora definida.
  if (horas === 0 && minutos === 0) return dia
  return `${dia} · ${horas}h${minutos ? String(minutos).padStart(2, '0') : ''}`
}

function EventRow({ evento }: { evento: CityEvent }) {
  return (
    <a
      href={evento.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '0.75rem',
        alignItems: 'baseline',
        borderTop: '1px solid var(--border-subtle)',
        padding: '0.625rem 0',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <span>
        <span className="font-display" style={{ fontSize: '1rem', lineHeight: 1.3, display: 'block' }}>
          {evento.title}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-jetbrains)' }}>
          {[evento.category, evento.venue].filter(Boolean).join(' · ')}
        </span>
      </span>
      <span
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '11px',
          color: 'var(--accent-text)',
          whiteSpace: 'nowrap',
        }}
      >
        {quando(evento)}
      </span>
    </a>
  )
}

function ObraRow({ obra }: { obra: Obra }) {
  return (
    <a
      href={obra.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        borderTop: '1px solid var(--border-subtle)',
        padding: '0.625rem 0',
        textDecoration: 'none',
        color: 'inherit',
        fontSize: '0.9375rem',
        lineHeight: 1.4,
      }}
    >
      {obra.title}
    </a>
  )
}

export default function EventsSection() {
  const { data: eventsData, isLoading: evLoading } = useEvents()
  const { data: obrasData, isLoading: obLoading } = useObras()

  const eventos = eventsData?.events ?? []
  const obras = obrasData?.obras ?? []

  return (
    <SectionReveal id="cidade">
      <SectionTitle
        label="CIDADE VIVA"
        title="Eventos & Obras"
        subtitle="O que está marcado para este mês e as intervenções que o município tem em curso."
      />

      <div className="grid-split">
        <GlassCard>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
            Este mês em Coimbra
          </span>

          {evLoading || !eventsData ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-[var(--bg-sunken)] rounded" />
              ))}
            </div>
          ) : eventos.length === 0 ? (
            <>
              <DataUnavailable meta={eventsData.meta} />
              <Elsewhere
                links={[
                  { label: 'Agenda.Coimbra', href: 'https://agenda.coimbra.pt' },
                  { label: 'Convento São Francisco', href: 'https://conventosaofrancisco.cm-coimbra.pt' },
                  { label: 'Teatro Académico de Gil Vicente', href: 'https://www.tagv.pt' },
                ]}
              />
              <DataSource meta={eventsData.meta} showNote={false} />
            </>
          ) : (
            <>
              <div>
                {eventos.slice(0, 8).map((e) => (
                  <EventRow key={e.id} evento={e} />
                ))}
              </div>
              <a
                href="https://agenda.coimbra.pt/explore"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.875rem',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  color: 'var(--accent-text)',
                  textDecoration: 'none',
                }}
              >
                Agenda completa →
              </a>
              <DataSource meta={eventsData.meta} showNote={false} />
            </>
          )}
        </GlassCard>

        <GlassCard>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
            Obras municipais {obrasData?.total ? `· ${obrasData.total} em curso` : ''}
          </span>

          {obLoading || !obrasData ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-[var(--bg-sunken)] rounded" />
              ))}
            </div>
          ) : obras.length === 0 ? (
            <>
              <DataUnavailable meta={obrasData.meta} />
              <Elsewhere
                links={[
                  {
                    label: 'Projetos e intervenções em curso',
                    href: 'https://www.cm-coimbra.pt/areas/viver/espaco-publico/projetos-e-intervencoes-em-curso',
                  },
                ]}
              />
              <DataSource meta={obrasData.meta} showNote={false} />
            </>
          ) : (
            <>
              <div>
                {obras.slice(0, 8).map((o) => (
                  <ObraRow key={o.id} obra={o} />
                ))}
              </div>
              <a
                href="https://www.cm-coimbra.pt/areas/viver/espaco-publico/projetos-e-intervencoes-em-curso"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '0.875rem',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  color: 'var(--accent-text)',
                  textDecoration: 'none',
                }}
              >
                Todas as intervenções →
              </a>
              <DataSource meta={obrasData.meta} showNote={false} />
            </>
          )}
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
