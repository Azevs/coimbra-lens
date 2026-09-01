'use client'

import { useWaterQuality } from '@/hooks/useWaterQuality'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'

export default function WaterQualityModule() {
  const { data: water, isLoading } = useWaterQuality()

  if (isLoading || !water) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-32" />
          <div className="h-16 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          display: 'block',
        }}
      >
        Água da torneira
      </span>
      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', margin: '2px 0 0.75rem' }}>
        {water.origin}
      </span>

      <DataUnavailable meta={water.meta} />
      <DataSource meta={water.meta} showNote={false} />
    </GlassCard>
  )
}
