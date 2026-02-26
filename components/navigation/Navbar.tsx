'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Clima', href: '#clima' },
  { label: 'Trânsito', href: '#transito' },
  { label: 'Cidade', href: '#cidade' },
  { label: 'Cultura', href: '#cultura' },
  { label: 'Mobilidade', href: '#mobilidade' },
  { label: 'Mapa', href: '#mapa' },
  { label: 'Universidade', href: '#academico' },
  { label: 'Imobiliário', href: '#imobiliario' },
  { label: 'Freguesias', href: '#freguesias' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ position: 'fixed', top: '40px', left: 0, right: 0, zIndex: 50, padding: '0 2rem' }}>
      <div className="glass-card" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" className="font-display text-xl text-[var(--text-primary)]">
          Coimbra<span className="text-[var(--accent-gold)]">Lens</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-text text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card mt-2 max-w-6xl mx-auto p-6 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 label-text text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
