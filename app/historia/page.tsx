import type { Metadata } from 'next'
import { ldPagina, pagina } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import HeroAeminium from '@/components/historia/HeroAeminium'
import CorteAeminium from '@/components/historia/CorteAeminium'
import PlantaCorte from '@/components/historia/PlantaCorte'
import PisosCriptoportico from '@/components/historia/PisosCriptoportico'
import Estratigrafia from '@/components/historia/Estratigrafia'
import Selo from '@/components/historia/Selo'
import { EVIDENCIA_SENTIDO, type Evidencia } from '@/lib/evidencia'
import { MARGENS, REFERENCIAS } from '@/lib/historia-aeminium-textos'

export const metadata: Metadata = pagina({
  caminho: 'historia',
  titulo: 'Aeminium, a Coimbra romana',
  descricao:
    'Antes de ser Coimbra, a cidade chamava-se Aeminium. O chão que os romanos construíram para o fórum — o criptopórtico — ainda lá está, por baixo do Museu Nacional de Machado de Castro.',
})

/**
 * História — capítulo I, Aeminium.
 *
 * Página editorial, como o /visitar: fica fora do manifesto de frescura.
 * O que nela é medido (o terreno, a planta) vem de geradores; o que é
 * afirmação histórica leva selo de evidência e referência.
 */
export default function HistoriaPage() {
  return (
    <>
      <JsonLd dados={ldPagina([{ nome: 'História', caminho: 'historia' }])} />
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        {/* Abertura */}
        <header className="section-container" style={{ padding: '0 1.25rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent-text)',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <span>História · Capítulo I</span>
            <span style={{ color: 'var(--text-tertiary)' }}>27 a.C. – séc. VI</span>
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="sr-only">Aeminium</h1>
          <HeroAeminium />

          <div className="historia-entrada">
            <p className="historia-lede">
              Antes de ser Coimbra, a cidade romana chamava-se Aeminium. O chão que os romanos construíram para a
              praça principal <em>ainda lá está</em> — por baixo do Museu Nacional de Machado de Castro, na encosta que
              desce para o Mondego.
            </p>

            <div className="historia-chave-caixa">
              <span className="ui-label ui-label-tertiary">Como ler os selos</span>
              <ul className="historia-chave" aria-label="Como ler os selos desta página">
                {(Object.keys(EVIDENCIA_SENTIDO) as Evidencia[]).map((e) => (
                  <li key={e}>
                    <Selo evidencia={e} />
                    <span className="ui-note">{EVIDENCIA_SENTIDO[e]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        {/* O corte */}
        <section id="corte" className="page-section" style={{ paddingBottom: '2rem' }}>
          <div className="section-container">
            <SectionTitle
              label="O CORTE"
              title="Como se faz uma praça numa encosta"
              subtitle="A colina da Alta cortada ao meio, do rio ao alto. Ao perto, à mesma escala na horizontal e na vertical."
            />
            <CorteAeminium planta={<PlantaCorte />} />
          </div>
        </section>

        {/* Dentro do criptopórtico */}
        <SectionReveal id="criptoportico" className="historia-escuro">
          <SectionTitle
            label="DENTRO DO CRIPTOPÓRTICO"
            title="Catorze celas debaixo da praça"
            subtitle="Dois pisos de galerias abobadadas, fechadas, só com frestas para o ar e a luz. Por dentro, é assim que se organizam."
          />
          <PisosCriptoportico />

          <div className="margens">
            {MARGENS.map((m) => (
              <article key={m.titulo} className="margem">
                <h3 className="font-display">{m.titulo}</h3>
                <p>{m.texto}</p>
                <Selo evidencia={m.evidencia} refId={m.ref} />
              </article>
            ))}
          </div>
        </SectionReveal>

        {/* Estratigrafia */}
        <SectionReveal id="camadas">
          <SectionTitle
            label="EM CAMADAS"
            title="Dois mil anos, de cima para baixo"
            subtitle="Lê-se como se escava: o mais recente à superfície, Augusto no fundo."
          />
          <Estratigrafia />
        </SectionReveal>

        {/* Ir lá */}
        <section id="visitar" className="historia-faixa">
          <div className="section-container historia-visita">
            <p>
              O criptopórtico visita-se.
              <em>A entrada é pelo Museu Nacional Machado de Castro.</em>
            </p>
            <a href="http://www.museumachadocastro.gov.pt/" target="_blank" rel="noopener noreferrer">
              Horários e bilhetes no sítio do museu →
            </a>
          </div>
        </section>

        {/* Referências */}
        <section id="referencias" className="page-section" style={{ paddingTop: '4rem' }}>
          <div className="section-container">
            <span className="ui-label ui-label-tertiary">Referências</span>
            <ol className="historia-refs">
              {REFERENCIAS.map((r, i) => (
                <li key={r.id} id={`ref-${i + 1}`}>
                  {r.texto}{' '}
                  {r.href && (
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {r.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
