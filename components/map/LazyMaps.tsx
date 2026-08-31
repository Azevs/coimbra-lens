'use client'

import dynamic from 'next/dynamic'

/**
 * O Mapbox GL acede a `window` durante a inicialização, por isso os dois
 * mapas continuam fora do servidor. `ssr: false` só é válido dentro de um
 * Client Component — daí este invólucro, que mantém a página um Server
 * Component e o resto do painel renderizado no servidor.
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

export const CoimbraMap = dynamic(() => import('./CoimbraMap'), {
  ssr: false,
  loading: () => <MapPlaceholder height="70vh" />,
})

export const TrafficMap = dynamic(() => import('@/components/sections/TrafficMap'), {
  ssr: false,
  loading: () => <MapPlaceholder height="480px" />,
})
