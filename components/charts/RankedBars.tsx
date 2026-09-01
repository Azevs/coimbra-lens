'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ChartTooltip, useChartTooltip } from './ChartTooltip'
import { canAnimate } from '@/lib/motion'

export interface RankedDatum {
  /** Rótulo curto, para o eixo. */
  name: string
  value: number
  /** Nome completo, para o tooltip e o title. */
  full?: string
}

/**
 * Barras horizontais para uma grandeza ordenada por categoria.
 *
 * Uma série, uma cor. Categorias com nomes longos pedem barras
 * horizontais: o rótulo cabe à esquerda sem rodar texto.
 *
 * @param unit      unidade a mostrar no tooltip, ex. 'habitantes'
 * @param shareOf   quando definido, o tooltip mostra a quota sobre este total
 */
export default function RankedBars({
  data,
  unit,
  shareOf,
}: {
  data: RankedDatum[]
  unit: string
  shareOf?: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const { tip, show, hide } = useChartTooltip()

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 8, right: 62, bottom: 30, left: 158 }
    const width = 560
    const height = data.length * 34 + margin.top + margin.bottom
    const innerW = width - margin.left - margin.right
    const innerH = height - margin.top - margin.bottom

    svg.attr('viewBox', `0 0 ${width} ${height}`)
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

    const max = d3.max(data, (d) => d.value) ?? 0
    const x = d3.scaleLinear().domain([0, max]).nice(4).range([0, innerW])
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerH])
      // O intervalo garante o espaçador de 2px entre barras adjacentes.
      .padding(0.32)

    // ── Grelha, recessiva: atrás das barras e sem competir com elas ──────
    const ticks = x.ticks(4)
    g.append('g')
      .selectAll('line')
      .data(ticks)
      .join('line')
      .attr('x1', (d) => x(d))
      .attr('x2', (d) => x(d))
      .attr('y1', 0)
      .attr('y2', innerH)
      .attr('stroke', 'var(--border-subtle)')
      .attr('stroke-width', 1)

    // ── Eixo x: valores da escala, não um número em cada barra ───────────
    g.append('g')
      .selectAll('text')
      .data(ticks)
      .join('text')
      .attr('x', (d) => x(d))
      .attr('y', innerH + 18)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--text-tertiary)')
      .attr('font-size', 10)
      .attr('font-family', 'var(--font-jetbrains)')
      .text((d) => d3.format('~s')(d).replace('k', ' mil'))

    // ── Linha de base: onde as barras assentam ───────────────────────────
    g.append('line')
      .attr('x1', 0)
      .attr('x2', innerW)
      .attr('y1', innerH)
      .attr('y2', innerH)
      .attr('stroke', 'var(--border-panel)')
      .attr('stroke-width', 1)

    // ── Rótulos das faculdades ───────────────────────────────────────────
    g.append('g')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', -10)
      .attr('y', (d) => (y(d.name) ?? 0) + y.bandwidth() / 2)
      .attr('text-anchor', 'end')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', 11)
      .attr('font-family', 'var(--font-ibm-plex)')
      .text((d) => d.name)

    // ── Barras ───────────────────────────────────────────────────────────
    const animate = canAnimate()

    const bars = g
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.name) ?? 0)
      .attr('height', y.bandwidth())
      // Extremidade arredondada só do lado do valor; a base fica esquadrada.
      .attr('rx', 3)
      .attr('fill', 'var(--tone-blue)')
      .attr('width', animate ? 0 : (d) => x(d.value))
      .style('cursor', 'pointer')

    // ── Valores directos na ponta de cada barra ──────────────────────────
    const labels = g
      .append('g')
      .selectAll('text')
      .data(data)
      .join('text')
      .attr('x', (d) => x(d.value) + 8)
      .attr('y', (d) => (y(d.name) ?? 0) + y.bandwidth() / 2)
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--text-secondary)')
      .attr('font-size', 11)
      .attr('font-family', 'var(--font-jetbrains)')
      .attr('opacity', animate ? 0 : 1)
      .text((d) => d.value.toLocaleString('pt-PT'))

    // ── Alvos de leitura, mais altos do que a barra ──────────────────────
    g.append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', 0)
      .attr('y', (d) => y(d.name) ?? 0)
      .attr('width', innerW)
      .attr('height', y.bandwidth())
      .attr('fill', 'transparent')
      .style('cursor', 'pointer')
      .on('mouseenter mousemove', function (event: MouseEvent, d) {
        const wrap = wrapRef.current
        if (!wrap) return
        const box = wrap.getBoundingClientRect()
        bars.attr('fill', (b) => (b.name === d.name ? 'var(--tone-blue-text)' : 'var(--tone-blue)'))
        show({
          x: event.clientX - box.left,
          y: event.clientY - box.top,
          title: d.full ?? d.name,
          rows: [
            { label: unit, value: d.value.toLocaleString('pt-PT') },
            ...(shareOf
              ? [{ label: 'Do total', value: `${((d.value / shareOf) * 100).toFixed(1)}%` }]
              : []),
          ],
        })
      })
      .on('mouseleave', () => {
        bars.attr('fill', 'var(--tone-blue)')
        hide()
      })

    if (!animate) return

    // Uma passagem só, disparada quando o gráfico entra no ecrã.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        bars
          .transition()
          .duration(800)
          .delay((_, i) => i * 60)
          .attr('width', (d) => x(d.value))
        labels
          .transition()
          .duration(400)
          .delay((_, i) => i * 60 + 500)
          .attr('opacity', 1)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [data, unit, shareOf, show, hide])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        role="img"
        aria-label={`${unit} por categoria: ${data
          .map((d) => `${d.full ?? d.name} ${d.value}`)
          .join(', ')}`}
      />
      <ChartTooltip tip={tip} />
    </div>
  )
}
