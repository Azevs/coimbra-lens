'use client'

import { motion } from 'framer-motion'
import { useMapLayers } from '@/hooks/useMapLayers'
import { COIMBRA_PARISHES, PARISH_CENSUS_YEAR } from '@/lib/mapbox-config'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import GlassCard from '@/components/ui/GlassCard'
import DataSource from '@/components/ui/DataSource'
import { estimate } from '@/lib/provenance'

const PARISH_META = estimate(
  `INE · Censos ${PARISH_CENSUS_YEAR}`,
  'População residente por freguesia. O rendimento por freguesia não é publicado.',
  `${PARISH_CENSUS_YEAR}-12-31T12:00:00`,
)

export default function ParishPanel() {
  const { selectedParish, setParish } = useMapLayers()

  const parish = COIMBRA_PARISHES.find((p) => p.name === selectedParish)
  if (!parish) return null

  const total = COIMBRA_PARISHES.reduce((sum, p) => sum + p.population, 0)
  const share = ((parish.population / total) * 100).toFixed(1)

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute top-0 right-0 bottom-0 w-80 z-20 p-4 overflow-y-auto"
    >
      <GlassCard className="h-full">
        <button
          onClick={() => setParish(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontFamily: 'var(--font-ibm-plex)',
            marginBottom: '1rem',
            padding: 0,
          }}
          aria-label="Fechar painel da freguesia"
        >
          ✕ Fechar
        </button>

        <h3
          className="font-display"
          style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.25 }}
        >
          {parish.name}
        </h3>

        <span className="label-text" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
          População residente
        </span>
        <AnimatedNumber value={parish.population} className="text-3xl" />

        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.6 }}>
          {share}% da população do município.
        </p>

        <DataSource meta={PARISH_META} />
      </GlassCard>
    </motion.div>
  )
}
