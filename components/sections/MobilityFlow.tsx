'use client'

import { useTransport } from '@/hooks/useTransport'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'

const STATUS_COLORS: Record<string, string> = {
  'A caminho': 'var(--accent-teal)',
  'No horário': 'var(--accent-blue)',
  'Atrasado': 'var(--accent-red)',
}

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

function SankeySimple() {
  const maxVol = Math.max(...SANKEY_FLOWS.map((f) => f.volume))
  const origins = [...new Set(SANKEY_FLOWS.map((f) => f.from))]
  const destinations = [...new Set(SANKEY_FLOWS.map((f) => f.to))]

  return (
    <div className="space-y-2">
      <span className="label-text text-[var(--text-secondary)] block mb-3">
        FLUXO MATINAL · ORIGENS → DESTINOS
      </span>
      {SANKEY_FLOWS.map((flow, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span className="w-16 shrink-0 text-right text-[var(--text-secondary)] text-xs truncate">
            {flow.from}
          </span>
          <div className="flex-1 min-w-0 h-4 rounded-full bg-[var(--bg-primary)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(flow.volume / maxVol) * 100}%`,
                background: `linear-gradient(90deg, var(--accent-blue), ${
                  destinations.indexOf(flow.to) === 0
                    ? 'var(--accent-gold)'
                    : destinations.indexOf(flow.to) === 1
                    ? 'var(--accent-teal)'
                    : 'var(--accent-red)'
                })`,
              }}
            />
          </div>
          <span className="w-20 shrink-0 text-xs text-[var(--text-secondary)] truncate">{flow.to}</span>
          <span className="font-data text-xs w-10 shrink-0 text-right">{flow.volume}</span>
        </div>
      ))}
      <div className="flex gap-4 mt-4">
        {destinations.map((d, i) => (
          <div key={d} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? 'var(--accent-gold)' : i === 1 ? 'var(--accent-teal)' : 'var(--accent-red)',
              }}
            />
            <span className="text-[10px] text-[var(--text-secondary)]">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MobilityFlow() {
  const { data: transport, isLoading } = useTransport()
  const buses = transport?.buses || []

  return (
    <SectionReveal id="mobilidade">
      <SectionTitle
        label="MOBILIDADE URBANA"
        title="Fluxo & Transportes"
        subtitle="Autocarros SMTUC em tempo real e padrões de mobilidade urbana."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bus board */}
        <GlassCard>
          <span className="label-text text-[var(--text-secondary)] block mb-4">
            PRÓXIMAS PARTIDAS · PRAÇA DA REPÚBLICA
          </span>
          <div className="overflow-hidden rounded-lg">
            {/* Header */}
            <div className="grid grid-cols-[60px_1fr_70px_80px] gap-2 px-3 py-2 text-[10px] label-text text-[var(--text-secondary)] bg-[var(--bg-primary)]">
              <span>LINHA</span>
              <span>DESTINO</span>
              <span>CHEGADA</span>
              <span>STATUS</span>
            </div>
            {/* Rows */}
            {isLoading ? (
              <div className="p-4 text-center text-sm text-[var(--text-secondary)]">A carregar...</div>
            ) : (
              buses.map((bus, i) => (
                <div
                  key={`${bus.line}-${i}`}
                  className="grid grid-cols-[60px_1fr_70px_80px] gap-2 px-3 py-2.5 border-b border-[var(--glass-border)] flip-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="font-data text-sm">{bus.line}</span>
                  <span className="text-xs text-[var(--text-primary)] truncate">{bus.destination}</span>
                  <span className="font-data text-sm">{Math.max(1, bus.arrival)} min</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: STATUS_COLORS[bus.status] || 'var(--text-secondary)' }}
                  >
                    {bus.status}
                  </span>
                </div>
              ))
            )}
          </div>
          {transport?.fallback && (
            <p className="text-[10px] text-[var(--text-secondary)] mt-2 opacity-60">
              Dados de referência · Atualiza a cada 30s
            </p>
          )}
        </GlassCard>

        {/* Sankey-style flow */}
        <GlassCard>
          <SankeySimple />
          <p className="text-[10px] text-[var(--text-secondary)] mt-4 opacity-60">
            Volume estimado de passageiros/dia · Dados de referência 2024
          </p>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
