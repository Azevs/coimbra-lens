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
      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', margin: '2px 0 1rem' }}>
        {water.origin}
      </span>

      {water.status === null ? (
        <DataUnavailable meta={water.meta} />
      ) : (
        <>
          <p
            className="font-display"
            style={{ fontSize: '1.75rem', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}
          >
            {water.status}
          </p>
          <p style={{ fontSize: '0.8125rem', lineHeight: 1.65, color: 'var(--text-secondary)', fontWeight: 300, margin: 0 }}>
            {water.detail}
          </p>
          <a
            href={water.bulletinsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.875rem',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'var(--accent-text)',
              textDecoration: 'none',
            }}
          >
            Boletins trimestrais por zona →
          </a>
        </>
      )}

      <DataSource meta={water.meta} showNote={false} />
    </GlassCard>
  )
}
