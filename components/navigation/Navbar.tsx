'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Barra de dois andares.
 *
 * Em cima, as ÁREAS do site; em baixo, as secções da área activa. A barra
 * de um andar que aqui estava punha nove links planos em fila e não tinha
 * para onde crescer quando o site deixou de ser só dados.
 *
 * Uma área só entra nesta lista quando a página existe — um link para uma
 * página por construir é a versão de navegação de um número inventado.
 */
const AREAS = [{ label: 'Dados', href: '/' }]

const SECTIONS = [
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

const subLinkStyle = {
  fontFamily: 'var(--font-jetbrains)',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  whiteSpace: 'nowrap' as const,
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{ position: 'fixed', top: '40px', left: 0, right: 0, zIndex: 50 }}>
      <div className="nav-panel">
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 900,
            fontSize: '1.1875rem',
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          CoimbraLens
        </Link>

        {/* Áreas — Fraunces, com o filete terracota na activa */}
        <div className="hidden md:flex items-center" style={{ gap: '1.875rem' }}>
          {AREAS.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="nav-area"
              aria-current={area.href === '/' ? 'page' : undefined}
              style={{ textDecoration: 'none' }}
            >
              {area.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
          style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Secções da área activa */}
      <div className="nav-sub hidden md:flex">
        {SECTIONS.map((link) => (
          <a key={link.href} href={link.href} style={subLinkStyle}>
            {link.label}
          </a>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--bg-primary)',
              borderBottom: '1px solid var(--border-panel)',
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0.5rem 0',
            }}
            className="md:hidden"
          >
            {SECTIONS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  ...subLinkStyle,
                  display: 'block',
                  padding: '0.75rem 2rem',
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
