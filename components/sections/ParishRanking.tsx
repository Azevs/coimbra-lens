'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import { COIMBRA_PARISHES } from '@/lib/mapbox-config'
import { colorMix } from '@/lib/color'

type SortKey = 'name' | 'population' | 'income' | 'mobility'
type SortDir = 'asc' | 'desc'

const METRICS: { key: SortKey; label: string; unit: string; format: (v: number | string) => string }[] = [
  { key: 'population', label: 'População', unit: 'hab.', format: (v) => Number(v).toLocaleString('pt-PT') },
  { key: 'income', label: 'Rendimento', unit: '€/mês', format: (v) => `€${Number(v).toLocaleString('pt-PT')}` },
  { key: 'mobility', label: 'Fluxo Diário', unit: 'viagens', format: (v) => Number(v).toLocaleString('pt-PT') },
]

function getMobilityFlow(pop: number) {
  return Math.round(pop * 0.12)
}

function getBarColor(rank: number, total: number): string {
  const t = 1 - rank / total
  const r = Math.round(46 + t * (201 - 46))
  const g = Math.round(134 + t * (168 - 134))
  const b = Math.round(193 + t * (76 - 193))
  return `rgb(${r},${g},${b})`
}

export default function ParishRanking() {
  const [sortKey, setSortKey] = useState<SortKey>('population')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const rows = useMemo(() => {
    const data = COIMBRA_PARISHES.map((p) => ({
      name: p.name,
      population: p.population,
      income: p.income,
      mobility: getMobilityFlow(p.population),
    }))

    data.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (typeof av === 'string' && typeof bv === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv, 'pt') : bv.localeCompare(av, 'pt')
      }
      return sortDir === 'asc' ? Number(av) - Number(bv) : Number(bv) - Number(av)
    })
    return data
  }, [sortKey, sortDir])

  const maxVal = useMemo(() => {
    if (sortKey === 'name') return 1
    return Math.max(...rows.map((r) => Number(r[sortKey])))
  }, [rows, sortKey])

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const activeMetric = METRICS.find((m) => m.key === sortKey)

  return (
    <SectionReveal id="freguesias">
      <SectionTitle
        label="ANÁLISE TERRITORIAL"
        title="Ranking de Freguesias"
        subtitle="Compare as 18 freguesias de Coimbra por população, rendimento e mobilidade."
      />

      {/* Sort buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {METRICS.map((m) => (
          <button
            key={m.key}
            onClick={() => handleSort(m.key)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '12px',
              fontFamily: 'var(--font-ibm-plex)',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid',
              transition: 'all 0.2s',
              background: sortKey === m.key ? 'var(--accent-gold)' : 'transparent',
              color: sortKey === m.key ? 'var(--bg-sunken)' : 'var(--accent-gold)',
              borderColor: sortKey === m.key ? 'var(--accent-gold)' : 'var(--glass-border)',
            }}
          >
            {m.label}
            {sortKey === m.key && (
              <span style={{ marginLeft: '4px' }}>{sortDir === 'desc' ? '↓' : '↑'}</span>
            )}
          </button>
        ))}
      </div>

      <GlassCard style={{ padding: '0' }}>
        {/* Header */}
        <div className="rank-row" style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-panel)' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>#</span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Freguesia</span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>
            {activeMetric?.label ?? '—'}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>Distribuição</span>
        </div>

        {/* Rows */}
        <AnimatePresence mode="popLayout">
          {rows.map((row, i) => {
            const val = sortKey === 'name' ? row.population : Number(row[sortKey])
            const pct = sortKey === 'name' ? 50 : (val / maxVal) * 100
            const color = getBarColor(i, rows.length)
            const fmt = activeMetric?.format ?? ((v) => String(v))

            return (
              <motion.div
                key={row.name}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="rank-row"
                style={{
                  padding: '0.7rem 1.25rem',
                  borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Rank */}
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-jetbrains)',
                  color: i < 3 ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  fontWeight: i < 3 ? 700 : 400,
                }}>
                  {i < 3 ? ['①', '②', '③'][i] : String(i + 1).padStart(2, '0')}
                </span>

                {/* Name */}
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontFamily: 'var(--font-ibm-plex)' }}>
                  {row.name}
                </span>

                {/* Value */}
                <span style={{
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-jetbrains)',
                  color: color,
                  textAlign: 'right',
                }}>
                  {fmt(sortKey === 'name' ? row.population : row[sortKey])}
                </span>

                {/* Bar */}
                <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    style={{
                      height: '100%',
                      borderRadius: '3px',
                      background: color,
                      boxShadow: `0 0 6px ${colorMix(color, 38)}`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </GlassCard>
    </SectionReveal>
  )
}
