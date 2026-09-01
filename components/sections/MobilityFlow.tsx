'use client'

import { useTransport } from '@/hooks/useTransport'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'

/**
 * Esta secção tinha um diagrama de fluxos casa–trabalho: oito ligações
 * origem→destino com volumes (Olivais→Universidade 2400, e por aí fora).
 * Nenhum desses números vinha de lado nenhum — não eram contagens nem um
 * modelo sobre dados reais, eram valores escolhidos à mão.
 *
 * Os Censos publicam movimentos pendulares, mas por município de origem e
 * destino, não entre zonas dentro de Coimbra. Enquanto não houver fonte,
 * a secção diz o que não tem.
 */
export default function MobilityFlow() {
  const { data: transport, isLoading } = useTransport()

  return (
    <SectionReveal id="mobilidade">
      <SectionTitle
        label="MOBILIDADE URBANA"
        title="Transportes"
        subtitle="Partidas dos SMTUC e padrões de deslocação. Ambos por integrar."
      />

      <div className="grid-split">
        <GlassCard>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '0.875rem',
            }}
          >
            Autocarros SMTUC
          </span>

          {isLoading || !transport ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 bg-[var(--bg-sunken)] rounded" />
              ))}
            </div>
          ) : (
            <>
              <DataUnavailable meta={transport.meta} />
              <DataSource meta={transport.meta} showNote={false} />
            </>
          )}
        </GlassCard>

        <GlassCard>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '0.875rem',
            }}
          >
            Deslocações dentro da cidade
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.75rem 1rem',
              background: 'var(--bg-sunken)',
              border: '1px dashed var(--border-panel)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '1.75rem',
                color: 'var(--text-tertiary)',
                lineHeight: 1,
              }}
            >
              —
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', maxWidth: '34ch', lineHeight: 1.55 }}>
              Os Censos publicam movimentos pendulares entre municípios, não entre zonas dentro de
              Coimbra. Sem essa fonte, não há fluxos a mostrar.
            </span>
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
