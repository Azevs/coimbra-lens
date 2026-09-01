'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Barra de dois andares.
 *
 * Em cima, as ÁREAS do site; em baixo, as secções da área activa. A barra de
 * um andar que aqui estava punha nove links planos em fila e não tinha para
 * onde crescer quando o site deixou de ser só dados.
 *
 * Uma área só entra nesta lista quando a página existe — um link para uma
 * página por construir é a versão de navegação de um número inventado.
 */
const AREAS = [
  { label: 'Dados', href: '/' },
  { label: 'Visitar', href: '/visitar' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Território', href: '/territorio' },
  { label: 'Sobre', href: '/sobre' },
]

/** As secções de cada área, na ordem em que aparecem na página. */
const SECTIONS: Record<string, { label: string; href: string }[]> = {
  '/': [
    { label: 'Clima', href: '#clima' },
    { label: 'Trânsito', href: '#transito' },
    { label: 'Cidade', href: '#cidade-overview' },
    { label: 'Eventos & obras', href: '#cidade' },
    { label: 'Mobilidade', href: '#mobilidade' },
    { label: 'Universidade', href: '#academico' },
    { label: 'Imobiliário', href: '#imobiliario' },
  ],
  '/visitar': [
    { label: 'Roteiro a pé', href: '#roteiro' },
    { label: 'Atracções', href: '#atraccoes' },
  ],
  '/agenda': [
    { label: 'Este mês', href: '#este-mes' },
    { label: 'Todos os anos', href: '#cultura' },
  ],
  '/territorio': [
    { label: 'Mapa', href: '#mapa' },
    { label: 'Freguesias', href: '#freguesias' },
  ],
  '/sobre': [
    { label: 'O projecto', href: '#projecto' },
    { label: 'Como é feito', href: '#metodo' },
  ],
}

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
  const pathname = usePathname() ?? '/'
  const area = AREAS.find((a) => a.href !== '/' && pathname.startsWith(a.href))?.href ?? '/'
  const sections = SECTIONS[area] ?? []

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
          {AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="nav-area"
              aria-current={a.href === area ? 'page' : undefined}
              style={{ textDecoration: 'none' }}
            >
              {a.label}
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
      {sections.length > 0 && (
        <div className="nav-sub hidden md:flex">
          {sections.map((link) => (
            <a key={link.href} href={link.href} style={subLinkStyle}>
              {link.label}
            </a>
          ))}
        </div>
      )}

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
            {AREAS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '0.75rem 2rem',
                  fontFamily: 'var(--font-fraunces)',
                  fontWeight: 700,
                  fontSize: '1.0625rem',
                  color: a.href === area ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {a.label}
              </Link>
            ))}
            {sections.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ ...subLinkStyle, display: 'block', padding: '0.625rem 2rem' }}
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
