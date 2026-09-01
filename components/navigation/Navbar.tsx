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
    <nav style={{ position: 'fixed', top: '40px', left: 0, right: 0, zIndex: 50 }}>
      <div className="nav-panel">
        {/* Wordmark */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 700,
            fontSize: '1.125rem',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          Coimbra
          <span style={{ color: 'var(--accent-text)', fontStyle: 'italic', fontWeight: 300 }}>Lens</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: '0' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-ibm-plex)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '0 0.875rem',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                borderRight: '1px solid var(--border-subtle)',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'var(--text-primary)'
                el.style.background = 'rgba(255,255,255,0.03)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'var(--text-secondary)'
                el.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-panel)',
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0.5rem 0',
            }}
            className="md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 2rem',
                  fontFamily: 'var(--font-ibm-plex)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
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
