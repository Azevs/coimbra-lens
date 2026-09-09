import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import GreenMap from '@/components/map/GreenMap'
import GreenList from '@/components/sections/GreenList'
import { IN_CITY, SPACES, TOTAL_HA, formatHa } from '@/lib/green'

export const metadata: Metadata = {
  title: 'Zonas verdes',
  description:
    'Os espaços verdes públicos de Coimbra em mapa e em número: matas, parques e jardins com nome, ' +
    'a sua área medida e a distância a que ficam do centro.',
}

export default function ZonasVerdesPage() {
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
            Zonas verdes
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Onde a cidade
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>
              respira
            </span>
          </h1>

          <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.75rem' }}>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)',
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: '36rem',
                textWrap: 'pretty',
              }}
            >
              Da Mata do Choupal ao mais pequeno jardim de praça: {SPACES.length} lugares públicos
              com nome, {formatHa(TOTAL_HA)} hectares, dos quais {IN_CITY.length} se alcançam a pé
              de quem mora no centro.
            </p>
          </div>
        </div>

        <GreenMap />
        <GreenList />
      </main>

      <SiteFooter />
    </>
  )
}
