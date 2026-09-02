import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import ParishRanking from '@/components/sections/ParishRanking'
import { CoimbraMap } from '@/components/map/LazyMaps'

export const metadata: Metadata = {
  title: 'Território',
  description: 'As 18 freguesias de Coimbra em mapa e em número: onde vive a população do município.',
}

export default function TerritorioPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        <div className="section-container" style={{ padding: '0 1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              marginBottom: '1rem',
            }}
          >
            Território
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Dezoito
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>freguesias</span>
          </h1>

          <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.75rem' }}>
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', fontWeight: 400, lineHeight: 1.3, maxWidth: '36rem', textWrap: 'pretty' }}
            >
              Dezoito freguesias, das colinas da cidade ao Baixo Mondego. O mapa mostra onde vive quem cá vive; a lista mostra quantos são.
            </p>
          </div>
        </div>

        <CoimbraMap />
        <ParishRanking />
      </main>

      <SiteFooter />
    </>
  )
}
