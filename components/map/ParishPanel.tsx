'use client'

import { motion } from 'framer-motion'
import { useMapLayers } from '@/hooks/useMapLayers'
import { COIMBRA_PARISHES } from '@/lib/mapbox-config'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import GlassCard from '@/components/ui/GlassCard'
import DataSource from '@/components/ui/DataSource'
import { estimate } from '@/lib/provenance'

/**
 * O painel mostrava três barras — Comércio 72 %, Serviços 58 %, Educação
 * 85 % — iguais para as dezoito freguesias, e uma densidade calculada com
 * `população ÷ 3.2`, como se todas tivessem a mesma área. Ambos saíram:
 * não temos esses dados por freguesia.
 */
const PARISH_META = estimate(
  'INE · Censos 2021',
  'População e rendimento por freguesia. Sem dados de área, não é possível calcular densidade.',
  '2021-12-31T12:00:00',
)

export default function ParishPanel() {
  const { selectedParish, setParish } = useMapLayers()

  const parish = COIMBRA_PARISHES.find((p) => p.name === selectedParish)
  if (!parish) return null

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

        <h3 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          {parish.name}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <span className="label-text" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
              População
            </span>
            <AnimatedNumber value={parish.population} className="text-2xl" />
          </div>
          <div>
            <span className="label-text" style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
              Rendimento
            </span>
            <AnimatedNumber value={parish.income} suffix=" €" className="text-2xl" />
          </div>
        </div>

        <DataSource meta={PARISH_META} />
      </GlassCard>
    </motion.div>
  )
}
