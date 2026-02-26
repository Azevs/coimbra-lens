'use client'

import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Clima', href: '#clima' },
  { label: 'Trânsito', href: '#transito' },
  { label: 'Cidade', href: '#cidade' },
  { label: 'Mapa', href: '#mapa' },
  { label: 'Freg.', href: '#freguesias' },
]

export default function BottomNav() {
  const [active, setActive] = useState('#mapa')

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.slice(1))
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.href
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setActive(item.href)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 10px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s',
              background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent',
              minWidth: '48px',
              position: 'relative',
            }}
          >
            <span style={{
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: isActive ? 700 : 500,
              transition: 'color 0.2s',
            }}>
              {item.label}
            </span>
            {isActive && (
              <span style={{
                position: 'absolute',
                bottom: '3px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent-gold)',
              }} />
            )}
          </a>
        )
      })}
    </nav>
  )
}
