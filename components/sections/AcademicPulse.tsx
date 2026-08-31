'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import UCNewsPanel from './UCNewsPanel'

const UNIVERSITY_DATA = {
  totalStudents: 23847,
  international: 3421,
  national: 20426,
  faculties: 8,
  researchers: 1200,
  topNationalities: [
    { country: 'Brasil', count: 1203, flag: '🇧🇷' },
    { country: 'Cabo Verde', count: 445, flag: '🇨🇻' },
    { country: 'Angola', count: 389, flag: '🇦🇴' },
    { country: 'Itália', count: 201, flag: '🇮🇹' },
    { country: 'Alemanha', count: 178, flag: '🇩🇪' },
  ],
}

const FACULTIES = [
  { name: 'Letras', students: 3200, color: 'var(--accent-gold)' },
  { name: 'Ciências', students: 4100, color: 'var(--accent-teal)' },
  { name: 'Medicina', students: 2800, color: 'var(--accent-red)' },
  { name: 'Direito', students: 2600, color: 'var(--accent-blue)' },
  { name: 'Economia', students: 3400, color: 'var(--tone-violet)' },
  { name: 'Engenharia', students: 3800, color: 'var(--tone-clay)' },
  { name: 'Psicologia', students: 1900, color: 'var(--tone-rose)' },
  { name: 'Farmácia', students: 2047, color: 'var(--tone-moss)' },
]

export default function AcademicPulse() {
  const donutRef = useRef<SVGSVGElement>(null)
  const barsRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!donutRef.current) return

    const svg = d3.select(donutRef.current)
    svg.selectAll('*').remove()

    const width = 240
    const height = 240
    const radius = Math.min(width, height) / 2

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)

    const pie = d3.pie<{ label: string; value: number }>().value((d) => d.value).sort(null)
    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.9)

    const data = [
      { label: 'Nacional', value: UNIVERSITY_DATA.national },
      { label: 'Internacional', value: UNIVERSITY_DATA.international },
    ]

    const colors = ['var(--accent-blue)', 'var(--accent-gold)']

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          g.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('fill', (_, i) => colors[i])
            .attr('stroke', 'var(--bg-primary)')
            .attr('stroke-width', 2)
            .transition()
            .duration(1200)
            .ease(d3.easeElasticOut.amplitude(1).period(0.4))
            .attrTween('d', function (d) {
              const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
              return (t) => arc(interpolate(t)) || ''
            })

          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(donutRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!barsRef.current) return

    const svg = d3.select(barsRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 10, right: 60, bottom: 10, left: 90 }
    const width = 500
    const height = FACULTIES.length * 40
    const innerW = width - margin.left - margin.right
    const innerH = height - margin.top - margin.bottom

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([0, d3.max(FACULTIES, (d) => d.students) || 4500]).range([0, innerW])
    const y = d3.scaleBand().domain(FACULTIES.map((d) => d.name)).range([0, innerH]).padding(0.35)

    g.selectAll('.label')
      .data(FACULTIES)
      .enter()
      .append('text')
      .attr('x', -8)
      .attr('y', (d) => (y(d.name) || 0) + y.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', 12)
      .text((d) => d.name)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          g.selectAll('.bar')
            .data(FACULTIES)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', (d) => y(d.name) || 0)
            .attr('height', y.bandwidth())
            .attr('rx', 4)
            .attr('fill', (d) => d.color)
            .attr('opacity', 0.85)
            .attr('width', 0)
            .transition()
            .duration(1000)
            .delay((_, i) => i * 100)
            .attr('width', (d) => x(d.students))

          g.selectAll('.value')
            .data(FACULTIES)
            .enter()
            .append('text')
            .attr('x', (d) => x(d.students) + 8)
            .attr('y', (d) => (y(d.name) || 0) + y.bandwidth() / 2)
            .attr('dominant-baseline', 'middle')
            .attr('fill', 'var(--accent-gold)')
            .attr('font-size', 11)
            .attr('font-family', 'var(--font-jetbrains)')
            .attr('opacity', 0)
            .text((d) => d.students.toLocaleString('pt-PT'))
            .transition()
            .duration(600)
            .delay((_, i) => i * 100 + 800)
            .attr('opacity', 1)

          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionReveal id="academico">
      <SectionTitle
        label="PULSO ACADÉMICO"
        title="Universidade de Coimbra"
        subtitle="A mais antiga universidade de Portugal em números — dados de referência 2024."
      />

      <div className="grid-academic">
        {/* Key metrics */}
        <GlassCard className="flex flex-col items-center justify-center text-center">
          <div style={{ position: 'relative', width: '100%', maxWidth: '260px', margin: '0 auto' }}>
            <svg ref={donutRef} style={{ width: '100%', height: 'auto', display: 'block' }} viewBox="0 0 240 240" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
              <AnimatedNumber value={UNIVERSITY_DATA.totalStudents} className="text-3xl block" />
              <span className="label-text text-[var(--text-secondary)]" style={{ fontSize: '9px' }}>estudantes</span>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--accent-blue)]" />
              <span className="text-xs text-[var(--text-secondary)]">Nacional</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--accent-gold)]" />
              <span className="text-xs text-[var(--text-secondary)]">Internacional</span>
            </div>
          </div>
        </GlassCard>

        {/* Faculty bars */}
        <GlassCard>
          <span className="label-text text-[var(--text-secondary)] block mb-4">Estudantes por Faculdade</span>
          <svg ref={barsRef} className="w-full" style={{ maxHeight: 340 }} />
        </GlassCard>
      </div>

      {/* Top nationalities */}
      <div className="grid-flags" style={{ marginTop: '1.5rem' }}>
        {UNIVERSITY_DATA.topNationalities.map((n) => (
          <GlassCard key={n.country} className="text-center py-4">
            <span className="text-3xl block mb-2">{n.flag}</span>
            <AnimatedNumber value={n.count} className="text-xl block" />
            <span className="text-xs text-[var(--text-secondary)]">{n.country}</span>
          </GlassCard>
        ))}
      </div>

      {/* UC News */}
      <div className="grid-split" style={{ marginTop: '1.5rem' }}>
        <UCNewsPanel />
        <GlassCard>
          <span style={{ fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>
            EM NÚMEROS
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Faculdades & Institutos', value: UNIVERSITY_DATA.faculties, suffix: '' },
              { label: 'Investigadores', value: UNIVERSITY_DATA.researchers, suffix: '+' },
              { label: 'Estudantes Internacionais', value: UNIVERSITY_DATA.international, suffix: '' },
              { label: 'Países de Origem', value: 68, suffix: '' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '1.25rem', color: 'var(--accent-gold)' }}>
                  <AnimatedNumber value={item.value} />{item.suffix}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
