'use client'

import { motion } from 'framer-motion'
import { useMapLayers, type LayerType } from '@/hooks/useMapLayers'

const LAYERS: { key: LayerType; label: string }[] = [
  { key: 'economia', label: 'Economia' },
  { key: 'demografia', label: 'Demografia' },
  { key: 'mobilidade', label: 'Mobilidade' },
]

export default function MapLayerControls() {
  const { activeLayer, setLayer } = useMapLayers()

  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      {LAYERS.map(({ key, label }) => {
        const isActive = activeLayer === key
        return (
          <motion.button
            key={key}
            layout
            onClick={() => setLayer(key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              isActive
                ? 'bg-[var(--accent-gold)] text-[var(--bg-sunken)]'
                : 'glass-card text-[var(--accent-gold)] border border-[var(--glass-border)]'
            }`}
            style={{ fontFamily: 'var(--font-ibm-plex)' }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        )
      })}
    </div>
  )
}
