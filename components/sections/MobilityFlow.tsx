'use client'

import { useTransport } from '@/hooks/useTransport'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { unavailable } from '@/lib/provenance'

/**
 * Esta secção tinha um diagrama de fluxos casa–trabalho: oito ligações
 * origem→destino com volumes (Olivais→Universidade 2400, e por aí fora).
 * Nenhum desses números vinha de lado nenhum — não eram contagens nem um
 * modelo sobre dados reais, eram valores escolhidos à mão.
 *
 * Os Censos publicam movimentos pendulares, mas por município de origem e
 * destino, não entre zonas dentro de Coimbra. Enquanto não houver fonte,
 * a secção diz o que não tem — numa linha cada, não em dois painéis.
 */
const PENDULAR_META = unavailable(
  'INE · Censos',
  'Os Censos publicam movimentos pendulares entre municípios, não entre zonas dentro de Coimbra. Sem essa fonte, não há fluxos a mostrar.',
)

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
          <Label>Autocarros SMTUC</Label>

          {isLoading || !transport ? (
            <div className="animate-pulse space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
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
          <Label>Deslocações dentro da cidade</Label>
          <DataUnavailable meta={PENDULAR_META} />
          <DataSource meta={PENDULAR_META} showNote={false} />
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
