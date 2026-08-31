'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { useEvents } from '@/hooks/useEvents'
import { useObras } from '@/hooks/useObras'

/**
 * Enquanto não há fonte, apontamos para onde a informação está mesmo hoje.
 * Um estado vazio que dá um destino útil vale mais do que uma lista inventada.
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
              color: 'var(--accent)',
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

export default function EventsSection() {
  const { data: eventsData, isLoading: evLoading } = useEvents()
  const { data: obrasData, isLoading: obLoading } = useObras()

  return (
    <SectionReveal id="cidade">
      <SectionTitle
        label="CIDADE VIVA"
        title="Eventos & Obras"
        subtitle="Agenda cultural e obras municipais. Ambas as fontes estão por integrar."
      />

      <div className="grid-split">
        <GlassCard>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
            Esta semana em Coimbra
          </span>

          {evLoading || !eventsData ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-[var(--bg-sunken)] rounded" />
              ))}
            </div>
          ) : (
            <>
              <DataUnavailable meta={eventsData.meta} />
              <Elsewhere
                links={[
                  { label: 'Agenda da Câmara Municipal', href: 'https://www.cm-coimbra.pt/agenda' },
                  { label: 'Convento São Francisco', href: 'https://conventosaofrancisco.cm-coimbra.pt' },
                  { label: 'Teatro Académico de Gil Vicente', href: 'https://www.tagv.pt' },
                ]}
              />
              <DataSource meta={eventsData.meta} showNote={false} />
            </>
          )}
        </GlassCard>

        <GlassCard>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
            Obras municipais
          </span>

          {obLoading || !obrasData ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-[var(--bg-sunken)] rounded" />
              ))}
            </div>
          ) : (
            <>
              <DataUnavailable meta={obrasData.meta} />
              <Elsewhere
                links={[
                  { label: 'Obras no portal da CMC', href: 'https://www.cm-coimbra.pt' },
                  { label: 'Datasets da CMC em dados.gov.pt', href: 'https://dados.gov.pt/pt/organizations/camara-municipal-de-coimbra/' },
                ]}
              />
              <DataSource meta={obrasData.meta} showNote={false} />
            </>
          )}
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
