'use client'

import { useTransport } from '@/hooks/useTransport'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { estimate } from '@/lib/provenance'

/**
 * Fluxos casa–trabalho estimados a partir da população residente por zona.
 * Não são contagens — é um modelo, e está declarado como tal.
 */
const SANKEY_FLOWS = [
  { from: 'Olivais', to: 'Universidade', volume: 2400 },
  { from: 'Solum', to: 'Universidade', volume: 1800 },
  { from: 'Cernache', to: 'Hospital', volume: 1200 },
  { from: 'Olivais', to: 'Centro', volume: 1600 },
  { from: 'Pedrulha', to: 'Centro', volume: 900 },
  { from: 'Solum', to: 'Hospital', volume: 1100 },
  { from: 'Eiras', to: 'Centro', volume: 800 },
  { from: 'Cernache', to: 'Universidade', volume: 700 },
]

const FLOW_META = estimate(
  'Modelo próprio · base INE 2021',
  'Volumes estimados a partir da população residente por zona. Não são contagens de passageiros.',
)

const DEST_COLOR: Record<string, string> = {
  Universidade: 'var(--tone-amber)',
  Centro: 'var(--tone-teal)',
  Hospital: 'var(--accent)',
}

function FlowChart() {
  const maxVol = Math.max(...SANKEY_FLOWS.map((f) => f.volume))
  const destinations = [...new Set(SANKEY_FLOWS.map((f) => f.to))]

  return (
    <div>
      <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
        Fluxo matinal · origens → destinos
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {SANKEY_FLOWS.map((flow, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '4.5rem', flexShrink: 0, textAlign: 'right', fontSize: '11px', color: 'var(--text-secondary)' }}>
              {flow.from}
            </span>
            <div style={{ flex: 1, minWidth: 0, height: '14px', borderRadius: '2px', background: 'var(--bg-sunken)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${(flow.volume / maxVol) * 100}%`,
                  borderRadius: '2px',
                  background: `linear-gradient(90deg, var(--tone-blue), ${DEST_COLOR[flow.to] ?? 'var(--tone-amber)'})`,
                  transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                }}
              />
            </div>
            <span style={{ width: '5.5rem', flexShrink: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>{flow.to}</span>
            <span style={{ width: '2.75rem', flexShrink: 0, textAlign: 'right', fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: 'var(--text-data)' }}>
              {flow.volume}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {destinations.map((d) => (
          <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: DEST_COLOR[d] ?? 'var(--tone-amber)' }} />
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MobilityFlow() {
  const { data: transport, isLoading } = useTransport()

  return (
    <SectionReveal id="mobilidade">
      <SectionTitle
        label="MOBILIDADE URBANA"
        title="Fluxo & Transportes"
        subtitle="Padrões estimados de deslocação diária em Coimbra."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.875rem' }}>
            Autocarros SMTUC · Praça da República
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
          <FlowChart />
          <DataSource meta={FLOW_META} />
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
