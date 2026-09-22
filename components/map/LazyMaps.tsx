'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * O Mapbox GL acede a `window` durante a inicialização, por isso os mapas
 * ficam fora do servidor. `ssr: false` só é válido dentro de um Client
 * Component — daí este invólucro, que mantém a página um Server Component
 * e o resto do painel renderizado no servidor.
 *
 * O mapa das freguesias deixou de precisar disto: é SVG desenhado a partir
 * da carta oficial, e renderiza no servidor como qualquer outra secção.
 */

/**
 * Monta os filhos só quando o lugar deles se aproxima do ecrã.
 *
 * A primeira página já abre com um mapa por trás da manchete; os dois de
 * baixo, cada um com o seu contexto WebGL e as suas teselas, esperam que
 * alguém desça até eles.
 */
function WhenNear({ children, placeholder }: { children: ReactNode; placeholder: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [near])

  if (near) return <>{children}</>
  return <div ref={ref}>{placeholder}</div>
}

/** A cidade por trás da manchete. */
export const HeroMap = dynamic(() => import('@/components/hero/HeroMap'), { ssr: false })

// Os lugares guardados levam o id da secção: um link da barra para
// #metrobus ou #transito tem onde aterrar antes de o mapa montar.
const metrobusPlaceholder = (
  <section id="metrobus" aria-hidden="true" className="metrobus-aerial">
    <div className="metrobus-aerial-map" />
  </section>
)

const trafficPlaceholder = (
  <section id="transito" aria-hidden="true" className="page-section" style={{ minHeight: '920px' }} />
)

const MetrobusAerialMap = dynamic(() => import('@/components/sections/MetrobusAerial'), {
  ssr: false,
  loading: () => metrobusPlaceholder,
})

const TrafficMapInner = dynamic(() => import('@/components/sections/TrafficMap'), {
  ssr: false,
  loading: () => trafficPlaceholder,
})

/** A vista aérea do Metrobus. Mesmo motivo: é Mapbox. */
export function MetrobusAerial() {
  return (
    <WhenNear placeholder={metrobusPlaceholder}>
      <MetrobusAerialMap />
    </WhenNear>
  )
}

export function TrafficMap() {
  return (
    <WhenNear placeholder={trafficPlaceholder}>
      <TrafficMapInner />
    </WhenNear>
  )
}
