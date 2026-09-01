'use client'

import { useState } from 'react'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import RankedBars from '@/components/charts/RankedBars'
import DataSource from '@/components/ui/DataSource'
import { COIMBRA_PARISHES, PARISH_CENSUS_YEAR } from '@/lib/mapbox-config'
import { estimate } from '@/lib/provenance'

/**
 * O ranking tinha três métricas: população, rendimento e "fluxo diário".
 * Duas eram inventadas — o rendimento por freguesia não é publicado e o
 * fluxo era população × 0.12. Resta a população, dos Censos, e a ordenação
 * passa a ser só ascendente ou descendente.
 */
const PARISH_META = estimate(
  `INE · Censos ${PARISH_CENSUS_YEAR}`,
  'População residente por freguesia. A soma das 18 dá a população do município.',
  `${PARISH_CENSUS_YEAR}-12-31T12:00:00`,
)

type SortDir = 'asc' | 'desc'

export default function ParishRanking() {
  const [dir, setDir] = useState<SortDir>('desc')

  const total = COIMBRA_PARISHES.reduce((sum, p) => sum + p.population, 0)

  // 18 elementos: ordenar a cada render é mais barato do que memorizar.
  const rows = [...COIMBRA_PARISHES].sort((a, b) =>
    dir === 'desc' ? b.population - a.population : a.population - b.population,
  )

  return (
    <SectionReveal id="freguesias">
      <SectionTitle
        label="ANÁLISE TERRITORIAL"
        title="Freguesias por População"
        subtitle={`As 18 freguesias de Coimbra segundo os Censos ${PARISH_CENSUS_YEAR}, somando ${total.toLocaleString('pt-PT')} habitantes.`}
      />

      <button
        onClick={() => setDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
        className="btn-primary"
        style={{
          padding: '0.4rem 1rem',
          borderRadius: '3px',
          fontSize: '12px',
          fontFamily: 'var(--font-ibm-plex)',
          fontWeight: 600,
          cursor: 'pointer',
          background: 'transparent',
          color: 'var(--accent-text)',
          border: '1px solid var(--border-strong)',
          marginBottom: '1.5rem',
        }}
      >
        População {dir === 'desc' ? '↓ maior primeiro' : '↑ menor primeiro'}
      </button>

      <GlassCard>
        <RankedBars
          data={rows.map((r) => ({ name: r.short, full: r.name, value: r.population }))}
          unit="Habitantes"
          shareOf={total}
        />
      </GlassCard>

      <DataSource meta={PARISH_META} />
    </SectionReveal>
  )
}
