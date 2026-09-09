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

export const TrafficMap = dynamic(() => import('@/components/sections/TrafficMap'), {
  ssr: false,
  loading: () => <MapPlaceholder height="480px" />,
})
