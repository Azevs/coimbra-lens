import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import PlacePlate from '@/components/visitar/PlacePlate'
import { ATTRACTIONS, WALKING_ROUTE } from '@/lib/attractions'

export const metadata: Metadata = {
  title: 'Visitar',
  description:
    'Os lugares de Coimbra que valem uma manhã: a cidade alta, o jardim botânico e a margem esquerda, por ordem de caminhada.',
}

const porId = new Map(ATTRACTIONS.map((a) => [a.id, a]))

export default function VisitarPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        {/* Abertura */}
        <div className="section-container" style={{ padding: '0 1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              marginBottom: '1rem',
            }}
          >
            Visitar
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Sete colinas,
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>um dia inteiro</span>
          </h1>

          <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.75rem' }}>
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', fontWeight: 400, lineHeight: 1.3, maxWidth: '34rem', textWrap: 'pretty' }}
            >
              A cidade alta cabe numa caminhada de uma manhã — se souber por onde começar.
            </p>
          </div>
        </div>

        {/* Roteiro */}
        <SectionReveal id="roteiro" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="A PÉ, PELA CIDADE"
              title="Por que ordem"
              subtitle="A ordem que faz sentido a pé: subir à cidade alta primeiro, descer para o jardim, atravessar o rio ao fim da tarde."
            />

            <ol className="roteiro-lista">
              {WALKING_ROUTE.map((paragem, i) => {
                const lugar = porId.get(paragem.id)
                if (!lugar) return null
                return (
                  <li key={paragem.id} className="roteiro-item">
                    <span className="roteiro-numero">{i + 1}</span>
                    <span>
                      <a href={`#${lugar.id}`} className="font-display roteiro-nome">
                        {lugar.name}
                      </a>
                      <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
                        {paragem.note}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </SectionReveal>

        {/* Fichas de lugar */}
        <SectionReveal id="atraccoes" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="FICHAS DE LUGAR"
              title="Atracções"
              subtitle="Cada ficha diz o que o lugar é e manda para o sítio oficial, onde os horários e os bilhetes estão sempre certos."
            />

            <div className="grid-cards" style={{ gap: '3.5rem 1.75rem', alignItems: 'start' }}>
              {ATTRACTIONS.map((a) => (
                // O título e o texto vêm ANTES da chapa: com a imagem em cima,
                // o texto de cada ficha encostava à imagem da linha seguinte e
                // lia-se como legenda dela.
                <article key={a.id} id={a.id} style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.25rem' }}>
                  <h3 className="font-display" style={{ fontSize: '1.625rem', margin: '0 0 0.5rem' }}>
                    {a.name}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 300, margin: '0 0 0.875rem' }}>
                    {a.blurb}
                  </p>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'var(--text-tertiary)',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.75rem',
                      marginBottom: '1.125rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem 1rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{a.fact}</span>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-text)', textDecoration: 'none' }}
                    >
                      {a.hrefLabel} →
                    </a>
                  </div>
                  <PlacePlate kind={a.plate} />
                </article>
              ))}
            </div>

          </div>
        </SectionReveal>
      </main>

      <SiteFooter />
    </>
  )
}
