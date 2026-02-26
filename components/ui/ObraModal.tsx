'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Obra } from '@/hooks/useObras'

interface Props {
  obra: Obra | null
  onClose: () => void
}

function daysSince(dateStr: string): number {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
}

const TYPE_ICONS: Record<string, string> = {
  'Requalificação Urbana': '🏙️',
  'Mobilidade Suave': '🚲',
  'Infraestrutura': '🔧',
  'Espaço Verde': '🌿',
  'Património': '🏛️',
  'Pavimentação': '🛣️',
}

export default function ObraModal({ obra, onClose }: Props) {
  useEffect(() => {
    if (!obra) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [obra, onClose])

  return (
    <AnimatePresence>
      {obra && (
        <>
          {/* Centred overlay: backdrop + panel in one flex layer */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(7,11,20,0.75)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
          {/* Panel — stop propagation so clicks inside don't close */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '86vh',
              overflowY: 'auto',
              background: 'rgba(13,21,37,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'rgba(255,255,255,0.07)', border: 'none',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '16px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              aria-label="Fechar"
            >
              ×
            </button>

            {/* Type badge + icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: `${obra.color}20`,
                border: `1px solid ${obra.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>
                {TYPE_ICONS[obra.type] ?? '🏗️'}
              </div>
              <div>
                <span style={{
                  fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: obra.color, fontFamily: 'var(--font-dm-sans)', fontWeight: 600,
                  display: 'block',
                }}>
                  {obra.type}
                </span>
                <span style={{
                  fontSize: '9px', padding: '2px 8px', borderRadius: '4px', marginTop: '3px',
                  display: 'inline-block',
                  background: obra.status === 'Em Curso' ? 'rgba(26,188,156,0.15)' : 'rgba(46,134,193,0.15)',
                  color: obra.status === 'Em Curso' ? '#1ABC9C' : '#2E86C1',
                  border: `1px solid ${obra.status === 'Em Curso' ? 'rgba(26,188,156,0.35)' : 'rgba(46,134,193,0.35)'}`,
                }}>
                  {obra.status}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-playfair)', fontSize: '1.25rem',
              color: 'var(--text-primary)', margin: '0 0 1.5rem',
              lineHeight: 1.3,
            }}>
              {obra.title}
            </h3>

            {/* Detail rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { icon: '📍', label: 'Freguesia', value: obra.parish },
                { icon: '📅', label: 'Início', value: formatDate(obra.startDate) },
                { icon: '⏱️', label: 'Duração', value: `${daysSince(obra.startDate)} dias em curso` },
              ].map((row) => (
                <div key={row.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{row.icon}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', width: '80px', flexShrink: 0 }}>
                    {row.label}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontFamily: 'var(--font-dm-sans)' }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Progresso estimado</span>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-dm-mono)', color: obra.color }}>
                  {obra.status === 'Prevista' ? '0%' : `${Math.min(95, Math.round((daysSince(obra.startDate) / 180) * 100))}%`}
                </span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: '3px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: obra.status === 'Prevista' ? '0%' : `${Math.min(95, Math.round((daysSince(obra.startDate) / 180) * 100))}%` }}
                  transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                  style={{
                    height: '100%', borderRadius: '3px',
                    background: obra.color,
                    boxShadow: `0 0 8px ${obra.color}60`,
                  }}
                />
              </div>
            </div>

            {/* CMC link */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>Câmara Municipal de Coimbra</span>
              <a
                href="https://www.cm-coimbra.pt/areas/projeto-cidades-e-regioes-digitais/obras"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '10px', color: 'var(--accent-gold)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px',
                }}
              >
                Ver em cm-coimbra.pt →
              </a>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
