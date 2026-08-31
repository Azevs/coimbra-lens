'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap-config'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import { colorMix } from '@/lib/color'

const STATS = [
  { label: 'População municipal', value: '143 396', unit: 'hab.', source: 'INE 2021', color: 'var(--accent-teal)' },
  { label: 'Área do município', value: '319.4', unit: 'km²', source: 'CAOP 2023', color: 'var(--accent-blue)' },
  { label: 'Densidade populacional', value: '449', unit: 'hab/km²', source: 'INE 2021', color: 'var(--accent-gold)' },
  { label: 'Residentes estrangeiros', value: '14 200+', unit: 'pessoas', source: 'AIMA 2024', color: 'var(--tone-violet)' },
  { label: 'Estudantes universitários', value: '50 000+', unit: 'estudantes', source: 'UC / IPC 2024', color: 'var(--accent-gold)' },
  { label: 'Freguesias', value: '18', unit: 'freguesias', source: 'CAOP 2023', color: 'var(--accent-teal)' },
  { label: 'Taxa de desemprego', value: '6.2', unit: '%', source: 'INE 2023', color: 'var(--accent-red)' },
  { label: 'Rendimento médio líquido', value: '1 142', unit: '€/mês', source: 'INE 2022', color: 'var(--accent-blue)' },
]

const NATIONALITIES = [
  { country: 'Brasil', pct: 34, color: 'var(--tone-moss)' },
  { country: 'Nepal', pct: 18, color: 'var(--tone-crimson)' },
  { country: 'Índia', pct: 12, color: 'var(--tone-clay)' },
  { country: 'China', pct: 9, color: 'var(--tone-crimson)' },
  { country: 'Outros', pct: 27, color: 'var(--tone-muted)' },
]

function StatCard({ label, value, unit, source, color }: typeof STATS[0]) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  }, [])

  return (
    <div style={{
      background: 'rgba(13,21,37,0.6)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '1.25rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: color, opacity: 0.7,
      }} />
      <span style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.625rem' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
        <span ref={numRef} style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '1.5rem', color, fontWeight: 700, lineHeight: 1 }}>
          {value}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{unit}</span>
      </div>
      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.5, marginTop: '0.375rem', display: 'block' }}>
        {source}
      </span>
    </div>
  )
}

export default function CityOverview() {
  return (
    <SectionReveal id="cidade-overview">
      <SectionTitle
        label="COIMBRA EM NÚMEROS"
        title="Retrato da Cidade"
        subtitle="Indicadores demográficos, económicos e sociais do município de Coimbra."
      />

      {/* Main stats grid */}
      <div className="grid-stats" style={{ marginBottom: '2rem' }}>
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Bottom row: nationalities + quick facts */}
      <div className="grid-split">

        {/* Nationality breakdown */}
        <GlassCard>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
            RESIDENTES ESTRANGEIROS — TOP NACIONALIDADES
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {NATIONALITIES.map((n) => (
              <div key={n.country}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontFamily: 'var(--font-ibm-plex)' }}>{n.country}</span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-jetbrains)', color: n.color }}>{n.pct}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                  <div style={{
                    height: '100%', width: `${n.pct}%`, borderRadius: '2px',
                    background: n.color, boxShadow: `0 0 6px ${colorMix(n.color, 31)}`,
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.4, marginTop: '1rem' }}>
            Fonte: AIMA 2024
          </p>
        </GlassCard>

        {/* City facts */}
        <GlassCard>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
            FACTOS RÁPIDOS
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {[
              { icon: '🏫', text: '3 hospitais públicos (HUC, Pediátrico, Psiquiátrico)' },
              { icon: '🚌', text: 'Rede SMTUC: 28 linhas urbanas de autocarro' },
              { icon: '🚂', text: 'Coimbra-B: hub ferroviário com ligações a Lisboa e Porto' },
              { icon: '🌊', text: 'Rio Mondego atravessa 18 km do município' },
              { icon: '🎓', text: 'Universidade fundada em 1290 — Património UNESCO' },
              { icon: '🏅', text: 'Capital Europeia da Cultura candidata 2027' },
            ].map((f) => (
              <div key={f.text} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '14px', flexShrink: 0, lineHeight: 1.4 }}>{f.icon}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
