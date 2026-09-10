import Link from 'next/link'
import { ZONAS_URBANAS } from '@/lib/urban-zones-textos'

/**
 * O selector das zonas urbanas: parece um separador, é uma fila de links.
 *
 * Cada zona tem o seu endereço, para se poder partilhar, voltar atrás e
 * aparecer nas pesquisas com o seu título. Usa a mesma entrada da barra do
 * site (`.nav-area`, com o filete terracota na activa), e desliza para o
 * lado quando as zonas deixam de caber no ecrã.
 */
export default function SeletorZonas({ atual }: { atual: string }) {
  return (
    <nav aria-label="Zonas urbanas" className="section-container" style={{ padding: '0 1.25rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '1.875rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '0.25rem',
          borderBottom: '1px solid var(--border-panel)',
        }}
      >
        <Link href="/zonas-urbanas" className="nav-sub-link" style={{ height: 'auto' }}>
          Todas
        </Link>
        {ZONAS_URBANAS.map(({ zona }) => (
          <Link
            key={zona.id}
            href={`/zonas-urbanas/${zona.id}`}
            className="nav-area"
            aria-current={zona.id === atual ? 'page' : undefined}
            style={{ textDecoration: 'none' }}
          >
            {zona.nome}
          </Link>
        ))}
      </div>
    </nav>
  )
}
