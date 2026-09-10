import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import { ZONAS_URBANAS, km, numero } from '@/lib/urban-zones-textos'

export const metadata: Metadata = {
  title: 'Zonas urbanas',
  description:
    'As zonas de Coimbra em maqueta tridimensional. ' +
    ZONAS_URBANAS.map(({ zona, resumo }) => `${zona.nome}: ${resumo}`).join(' '),
}

/**
 * O índice das zonas urbanas. Cada zona tem página própria; aqui fica a
 * estampa de conjunto e dois números, e a grelha cresce com as zonas.
 */
export default function ZonasUrbanasPage() {
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
            Zonas urbanas
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            A cidade
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>
              em maqueta
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
              Cada zona é uma rua, ou uma sequência de ruas, e o que está construído de um lado e do
              outro. Escolha uma para a ver inteira e rodá-la.
            </p>
          </div>
        </div>

        <div className="section-container" style={{ padding: '3.5rem 1.25rem 4.5rem' }}>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: '3rem 2.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))',
            }}
          >
            {ZONAS_URBANAS.map(({ zona, resumo }) => (
              <li key={zona.id}>
                <Link
                  href={`/zonas-urbanas/${zona.id}`}
                  style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}
                >
                  <Image
                    src={`/maquetas/${zona.id}-conjunto.webp`}
                    width={1800}
                    height={810}
                    alt=""
                    // Como nas outras estampas: o optimizador perde o canal alfa.
                    unoptimized
                    sizes="(min-width: 1000px) 560px, 100vw"
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                  />
                  <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1rem', marginTop: '0.75rem' }}>
                    <h2
                      className="font-display"
                      style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.1, margin: 0 }}
                    >
                      {zona.nome}
                    </h2>
                    <p
                      style={{
                        margin: '0.5rem 0 0',
                        fontSize: '0.9375rem',
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                        maxWidth: '32rem',
                      }}
                    >
                      {resumo}
                    </p>
                    <div className="label-text" style={{ marginTop: '0.875rem', color: 'var(--text-tertiary)' }}>
                      {km(zona.comprimento)} · {numero(zona.edificios)} edifícios
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
