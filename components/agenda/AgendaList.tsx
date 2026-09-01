'use client'

import { useEvents } from '@/hooks/useEvents'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import type { CityEvent } from '@/app/api/events/route'

/** Agrupa por dia de início; os que já decorrem ficam num grupo à parte. */
function agrupar(eventos: CityEvent[]) {
  const aDecorrer: CityEvent[] = []
  const porDia = new Map<string, CityEvent[]>()

  for (const e of eventos) {
    if (e.isOngoing) {
      aDecorrer.push(e)
      continue
    }
    const dia = e.date.slice(0, 10)
    porDia.set(dia, [...(porDia.get(dia) ?? []), e])
  }

  return { aDecorrer, dias: [...porDia.entries()].sort(([a], [b]) => a.localeCompare(b)) }
}

function tituloDoDia(iso: string): string {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })
}

function horaDe(evento: CityEvent): string {
  const d = new Date(evento.date)
  const h = d.getHours()
  const m = d.getMinutes()
  // Meia-noite em ponto é como a agenda marca o que não tem hora definida.
  if (h === 0 && m === 0) return 'todo o dia'
  return `${h}h${m ? String(m).padStart(2, '0') : ''}`
}

function Linha({ evento, prefixo }: { evento: CityEvent; prefixo: string }) {
  return (
    <a
      href={evento.url}
      target="_blank"
      rel="noopener noreferrer"
      className="agenda-linha"
    >
      <span className="agenda-hora">{prefixo}</span>
      <span>
        <span className="font-display" style={{ fontSize: '1.125rem', lineHeight: 1.3, display: 'block' }}>
          {evento.title}
        </span>
        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
          {[evento.category, evento.venue, evento.organiser].filter(Boolean).join(' · ')}
        </span>
      </span>
      {evento.price && (
        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          {evento.price}
        </span>
      )}
    </a>
  )
}

export default function AgendaList() {
  const { data, isLoading } = useEvents()

  if (isLoading || !data) {
    return (
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-[var(--bg-sunken)] rounded" />
        ))}
      </div>
    )
  }

  if (data.events.length === 0) {
    return (
      <>
        <DataUnavailable meta={data.meta} />
        <DataSource meta={data.meta} showNote={false} />
      </>
    )
  }

  const { aDecorrer, dias } = agrupar(data.events)

  return (
    <>
      {aDecorrer.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h3 className="agenda-dia">A decorrer</h3>
          {aDecorrer.map((e) => (
            <Linha
              key={e.id}
              evento={e}
              prefixo={
                e.endDate
                  ? `até ${new Date(e.endDate).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}`
                  : 'em curso'
              }
            />
          ))}
        </section>
      )}

      {dias.map(([dia, eventos]) => (
        <section key={dia} style={{ marginBottom: '3rem' }}>
          <h3 className="agenda-dia">{tituloDoDia(dia)}</h3>
          {eventos.map((e) => (
            <Linha key={e.id} evento={e} prefixo={horaDe(e)} />
          ))}
        </section>
      ))}

      <a
        href="https://agenda.coimbra.pt/explore"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '11px',
          color: 'var(--accent-text)',
          textDecoration: 'none',
        }}
      >
        Agenda completa, com filtros por categoria →
      </a>
      <DataSource meta={data.meta} showNote={false} />
    </>
  )
}
