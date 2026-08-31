'use client'

import { useUCNews } from '@/hooks/useUCNews'
import GlassCard from '@/components/ui/GlassCard'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'

export default function UCNewsPanel() {
  const { data, isLoading } = useUCNews()

  if (isLoading) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-[var(--bg-sunken)] rounded" style={{ width: `${70 + i * 5}%` }} />
          ))}
        </div>
      </GlassCard>
    )
  }

  const items = data?.items ?? []

  if (!data) return null

  if (items.length === 0) {
    return (
      <GlassCard>
        <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
          Notícias UC
        </span>
        <DataUnavailable meta={data.meta} />
        <DataSource meta={data.meta} showNote={false} />
      </GlassCard>
    )
  }

  return (
    <GlassCard>
      <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
        Notícias UC
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--accent)', flexShrink: 0, marginTop: '2px',
                fontFamily: 'var(--font-ibm-plex)',
              }}>
                {item.category}
              </span>
            </div>
            <p style={{
              fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45,
              marginTop: '2px', transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {item.title}
            </p>
            {item.date && (
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-jetbrains)' }}>
                {new Date(item.date + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )}
            {i < items.length - 1 && (
              <div style={{ height: '1px', background: 'var(--glass-border)', marginTop: '0.875rem' }} />
            )}
          </a>
        ))}
      </div>

      <DataSource meta={data.meta} />
    </GlassCard>
  )
}
