'use client'

import { useUCNews } from '@/hooks/useUCNews'
import GlassCard from '@/components/ui/GlassCard'

export default function UCNewsPanel() {
  const { data, isLoading } = useUCNews()

  if (isLoading) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 bg-[var(--bg-primary)] rounded" style={{ width: `${70 + i * 5}%` }} />
          ))}
        </div>
      </GlassCard>
    )
  }

  const items = data?.items ?? []

  return (
    <GlassCard>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          NOTÍCIAS UC
        </span>
        {data?.fallback && (
          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>referência</span>
        )}
      </div>

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
                color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px',
                fontFamily: 'var(--font-dm-sans)',
              }}>
                {item.category}
              </span>
            </div>
            <p style={{
              fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.45,
              marginTop: '2px', transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {item.title}
            </p>
            {item.date && (
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-mono)' }}>
                {new Date(item.date + 'T12:00:00').toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )}
            {i < items.length - 1 && (
              <div style={{ height: '1px', background: 'var(--glass-border)', marginTop: '0.875rem' }} />
            )}
          </a>
        ))}
      </div>
    </GlassCard>
  )
}
