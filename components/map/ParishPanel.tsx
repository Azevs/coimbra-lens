'use client'

import { motion } from 'framer-motion'
import { useMapLayers } from '@/hooks/useMapLayers'
import { COIMBRA_PARISHES } from '@/lib/mapbox-config'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import GlassCard from '@/components/ui/GlassCard'

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
          className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors mb-4"
        >
          ✕ Fechar
        </button>

        <h3 className="font-display text-2xl text-[var(--text-primary)] mb-6">
          {parish.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="label-text text-[var(--text-secondary)] block mb-1">População</span>
            <AnimatedNumber value={parish.population} className="text-2xl" />
          </div>
          <div>
            <span className="label-text text-[var(--text-secondary)] block mb-1">Rendimento</span>
            <AnimatedNumber value={parish.income} suffix="€" className="text-2xl" />
          </div>
          <div>
            <span className="label-text text-[var(--text-secondary)] block mb-1">Densidade</span>
            <AnimatedNumber
              value={Math.round(parish.population / 3.2)}
              suffix="/km²"
              className="text-2xl"
            />
          </div>
          <div>
            <span className="label-text text-[var(--text-secondary)] block mb-1">Transportes</span>
            <AnimatedNumber value={Math.round(parish.population * 0.12)} className="text-2xl" />
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="mb-4">
          <span className="label-text text-[var(--text-secondary)] block mb-3">Indicadores</span>
          {[
            { label: 'Comércio', value: 72 },
            { label: 'Serviços', value: 58 },
            { label: 'Educação', value: 85 },
          ].map((item) => (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[var(--text-secondary)]">{item.label}</span>
                <span className="font-data text-xs">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--bg-primary)]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, var(--accent-blue), var(--accent-gold))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-[var(--text-secondary)] mt-4 opacity-60">
          Dados de referência 2024
        </p>
      </GlassCard>
    </motion.div>
  )
}
