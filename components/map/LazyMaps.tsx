'use client'

import dynamic from 'next/dynamic'

/**
 * O Mapbox GL acede a `window` durante a inicialização, por isso o mapa de
 * trânsito continua fora do servidor. `ssr: false` só é válido dentro de um
 * Client Component — daí este invólucro, que mantém a página um Server
 * Component e o resto do painel renderizado no servidor.
 *
 * O mapa das freguesias deixou de precisar disto: é SVG desenhado a partir
 * da carta oficial, e renderiza no servidor como qualquer outra secção.
 */

function MapPlaceholder({ height }: { height: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height,
        borderRadius: '4px',
        border: '1px solid var(--border-panel)',
        background: 'var(--bg-sunken)',
      }}
    />
  )
}

/** A vista aérea do Metrobus. Mesmo motivo: é Mapbox. */
export const MetrobusAerial = dynamic(() => import('@/components/sections/MetrobusAerial'), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="metrobus-aerial"><div className="metrobus-aerial-map" /></div>,
})

export const TrafficMap = dynamic(() => import('@/components/sections/TrafficMap'), {
  ssr: false,
  loading: () => <MapPlaceholder height="480px" />,
})
