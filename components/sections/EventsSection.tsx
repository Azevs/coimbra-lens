'use client'

import { useState } from 'react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import ObraModal from '@/components/ui/ObraModal'
import { useEvents } from '@/hooks/useEvents'
import { useObras } from '@/hooks/useObras'
import type { Obra } from '@/hooks/useObras'

const CATEGORY_COLORS: Record<string, string> = {
  'Música': '#C9A84C',
  'Arte': '#9B59B6',
  'Tecnologia': '#2E86C1',
  'Gastronomia': '#27AE60',
  'Cultura': '#1ABC9C',
  'Desporto': '#E74C3C',
  'Evento': '#E67E22',
}

function formatEventDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-PT', { weekday: 'short', day: 'numeric', month: 'short' })
}

function daysSince(dateStr: string): number {
  const d = new Date(dateStr)
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
}

export default function EventsSection() {
  const { data: eventsData, isLoading: evLoading } = useEvents()
  const { data: obrasData, isLoading: obLoading } = useObras()
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null)

  return (
    <>
    <ObraModal obra={selectedObra} onClose={() => setSelectedObra(null)} />
    <SectionReveal id="cidade">
      <SectionTitle
        label="CIDADE VIVA"
        title="Eventos & Obras"
        subtitle="O que acontece esta semana em Coimbra e as obras em curso no município."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

        {/* Events */}
        <GlassCard>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              ESTA SEMANA EM COIMBRA
            </span>
            {eventsData?.fallback && (
              <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>referência</span>
            )}
          </div>

          {evLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse" style={{ height: '48px', background: 'var(--bg-primary)', borderRadius: '8px' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {(eventsData?.events ?? []).map((event, i, arr) => {
                const color = CATEGORY_COLORS[event.category] ?? '#C9A84C'
                return (
                  <a
                    key={event.id}
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block', padding: '0.75rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      {/* Date block */}
                      <div style={{
                        flexShrink: 0, width: '40px', textAlign: 'center',
                        background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '4px 0',
                        border: `1px solid ${color}30`,
                      }}>
                        <span style={{ fontSize: '16px', fontFamily: 'var(--font-dm-mono)', fontWeight: 700, color, display: 'block', lineHeight: 1 }}>
                          {new Date(event.date).getDate()}
                        </span>
                        <span style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                          {new Date(event.date).toLocaleDateString('pt-PT', { month: 'short' })}
                        </span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '9px', letterSpacing: '0.1em', color, textTransform: 'uppercase', fontFamily: 'var(--font-dm-sans)', fontWeight: 600 }}>
                            {event.category}
                          </span>
                          {event.isFree && (
                            <span style={{ fontSize: '8px', background: `${color}20`, color, borderRadius: '4px', padding: '1px 5px', border: `1px solid ${color}40` }}>
                              GRÁTIS
                            </span>
                          )}
                        </div>
                        <p
                          style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', lineHeight: 1.4, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        >
                          {event.title}
                        </p>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-mono)' }}>
                          📍 {event.venue}
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </GlassCard>

        {/* Obras em Curso */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Stats row */}
          {!obLoading && obrasData && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { label: 'Total Obras', value: obrasData.total, color: 'var(--accent-gold)' },
                { label: 'Em Curso', value: obrasData.emCurso, color: '#1ABC9C' },
                { label: 'Previstas', value: obrasData.previstas, color: '#2E86C1' },
              ].map((s) => (
                <GlassCard key={s.label} style={{ textAlign: 'center', padding: '0.875rem' }}>
                  <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-dm-mono)', fontWeight: 700, color: s.color, display: 'block' }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {s.label}
                  </span>
                </GlassCard>
              ))}
            </div>
          )}

          {/* Obras list */}
          <GlassCard style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                OBRAS MUNICIPAIS — CMC
              </span>
              {obrasData?.reference && (
                <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5 }}>referência</span>
              )}
            </div>

            {obLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse" style={{ height: '36px', background: 'var(--bg-primary)', borderRadius: '6px' }} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {(obrasData?.obras ?? []).map((obra, i, arr) => (
                  <div
                    key={obra.id}
                    onClick={() => setSelectedObra(obra)}
                    style={{
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      borderRadius: '6px',
                      margin: '0 -4px',
                      padding: '0.625rem 4px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: obra.color, flexShrink: 0, boxShadow: `0 0 6px ${obra.color}80` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {obra.title}
                      </p>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                        {obra.parish} · {daysSince(obra.startDate)}d
                      </span>
                    </div>
                    <span style={{
                      fontSize: '9px', padding: '2px 7px', borderRadius: '4px',
                      background: obra.status === 'Em Curso' ? 'rgba(26,188,156,0.15)' : 'rgba(46,134,193,0.15)',
                      color: obra.status === 'Em Curso' ? '#1ABC9C' : '#2E86C1',
                      border: `1px solid ${obra.status === 'Em Curso' ? 'rgba(26,188,156,0.3)' : 'rgba(46,134,193,0.3)'}`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}>
                      {obra.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
    </>
  )
}
