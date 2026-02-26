'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import { gsap } from '@/lib/gsap-config'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'

const ZONES = [
  { name: 'Baixa', base: 1450, growth: 0.08 },
  { name: 'Alta (UC)', base: 1200, growth: 0.07 },
  { name: 'Olivais', base: 980, growth: 0.065 },
  { name: 'Solum', base: 1050, growth: 0.075 },
  { name: 'Pedrulha', base: 780, growth: 0.055 },
  { name: 'Cernache', base: 620, growth: 0.04 },
]

function getPriceForYear(base: number, growth: number, year: number): number {
  const years = year - 2014
  return Math.round(base * Math.pow(1 + growth, years))
}

function getChangePercent(base: number, growth: number, year: number): number {
  if (year <= 2014) return 0
  const curr = getPriceForYear(base, growth, year)
  const prev = getPriceForYear(base, growth, year - 1)
  return +((curr - prev) / prev * 100).toFixed(1)
}

export default function RealEstate() {
  const [year, setYear] = useState(2024)
  const chartRef = useRef<SVGSVGElement>(null)
  const labelsRef = useRef<Map<string, HTMLSpanElement>>(new Map())

  const setLabelRef = useCallback((name: string) => (el: HTMLSpanElement | null) => {
    if (el) labelsRef.current.set(name, el)
  }, [])

  // Animate number labels on year change
  useEffect(() => {
    ZONES.forEach((zone) => {
      const el = labelsRef.current.get(zone.name)
      if (!el) return
      const target = getPriceForYear(zone.base, zone.growth, year)
      const obj = { v: parseFloat(el.textContent?.replace(/\s/g, '') || '0') }
      gsap.to(obj, {
        v: target,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(obj.v).toLocaleString('pt-PT')
        },
      })
    })
  }, [year])

  // Draw bar chart
  useEffect(() => {
    if (!chartRef.current) return

    const svg = d3.select(chartRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 20, right: 20, bottom: 40, left: 20 }
    const width = 600
    const height = 300
    const innerW = width - margin.left - margin.right
    const innerH = height - margin.top - margin.bottom

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const data = ZONES.map((z) => ({
      name: z.name,
      price: getPriceForYear(z.base, z.growth, year),
      change: getChangePercent(z.base, z.growth, year),
    }))

    const x = d3.scaleBand().domain(data.map((d) => d.name)).range([0, innerW]).padding(0.3)
    const y = d3.scaleLinear().domain([0, d3.max(data, (d) => d.price)! * 1.15]).range([innerH, 0])

    // Gradient defs
    const defs = svg.append('defs')
    defs.append('linearGradient')
      .attr('id', 'barGrad')
      .attr('x1', '0').attr('y1', '1').attr('x2', '0').attr('y2', '0')
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'var(--accent-blue)' },
        { offset: '100%', color: 'var(--accent-gold)' },
      ])
      .enter().append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color)

    // Bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name) || 0)
      .attr('width', x.bandwidth())
      .attr('rx', 6)
      .attr('fill', 'url(#barGrad)')
      .attr('y', innerH)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .delay((_, i) => i * 100)
      .attr('y', (d) => y(d.price))
      .attr('height', (d) => innerH - y(d.price))

    // Change badges
    g.selectAll('.badge')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.price) - 8)
      .attr('text-anchor', 'middle')
      .attr('fill', (d) => (d.change >= 0 ? 'var(--accent-teal)' : 'var(--accent-red)'))
      .attr('font-size', 11)
      .attr('font-family', 'var(--font-dm-mono)')
      .text((d) => `${d.change >= 0 ? '+' : ''}${d.change}%`)

    // X axis labels
    g.selectAll('.xLabel')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', innerH + 24)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', 11)
      .text((d) => d.name)
  }, [year])

  return (
    <SectionReveal id="imobiliario">
      <SectionTitle
        label="MERCADO IMOBILIÁRIO"
        title="Preços por Zona"
        subtitle="Evolução do preço médio por m² nas principais zonas de Coimbra."
      />

      {/* Timeline slider */}
      <GlassCard className="mb-8">
        <span className="label-text text-[var(--text-secondary)] block mb-4">LINHA TEMPORAL</span>
        <div style={{ position: 'relative', paddingBottom: '1.5rem' }}>
          {/* Sliding year tooltip */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: `calc(${((year - 2014) / 10) * 100}% - ${((year - 2014) / 10) * 48}px)`,
              transform: 'translateX(-50%)',
              transition: 'left 0.1s ease',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              background: 'var(--accent-gold)', color: '#070B14',
              borderRadius: '6px', padding: '2px 8px',
              fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1rem',
              whiteSpace: 'nowrap',
            }}>
              {year}
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--accent-gold)', margin: '0 auto' }} />
          </div>
        </div>
        <input
          type="range"
          min={2014}
          max={2024}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--accent-gold) ${((year - 2014) / 10) * 100}%, var(--bg-primary) ${((year - 2014) / 10) * 100}%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-[var(--text-secondary)]">2014</span>
          <span className="text-xs text-[var(--text-secondary)]">2024</span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <GlassCard className="lg:col-span-2">
          <svg ref={chartRef} className="w-full" style={{ maxHeight: 300 }} />
        </GlassCard>

        {/* Zone prices */}
        <GlassCard>
          <span className="label-text text-[var(--text-secondary)] block mb-4">€/m² POR ZONA</span>
          <div className="space-y-3">
            {ZONES.map((zone) => (
              <div key={zone.name} className="flex items-center justify-between gap-2">
                <span className="text-sm text-[var(--text-primary)] shrink-0">{zone.name}</span>
                <span className="flex-1 border-b border-dotted border-[var(--glass-border)]" />
                <span className="flex items-baseline gap-1 shrink-0">
                  <span ref={setLabelRef(zone.name)} className="font-data text-sm">
                    {getPriceForYear(zone.base, zone.growth, year).toLocaleString('pt-PT')}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">€/m²</span>
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <p className="text-[10px] text-[var(--text-secondary)] mt-2 opacity-60">
        Modelo baseado em tendências históricas INE / Idealista 2014–2024 · Dados de 2025 não disponíveis publicamente · Valores estimados para fins ilustrativos
      </p>
    </SectionReveal>
  )
}
