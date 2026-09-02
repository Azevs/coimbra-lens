import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'O que é o CoimbraLens, como é feito e que regras segue.',
}

export default function SobrePage() {
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
            Sobre
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Um painel
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>da cidade</span>
          </h1>
        </div>

        <SectionReveal id="projecto" className="page-section">
          <div className="section-container" style={{ maxWidth: '46rem' }}>
            <SectionTitle label="O PROJECTO" title="O que é isto" />
            <div className="prosa">
              <p>
                O CoimbraLens junta num sítio só o que se sabe sobre Coimbra e está espalhado por dezenas de portais: o
                tempo que faz, o ar que se respira, o caudal do Mondego, o trânsito, os preços das casas, quem vive em
                cada freguesia, o que há para fazer esta semana e as obras que a Câmara tem em curso.
              </p>
              <p>
                Não tem publicidade, não vende nada e não pede registo. É um painel civil: existe para responder a
                perguntas simples sobre a cidade sem obrigar ninguém a saber onde procurar.
              </p>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal id="metodo" className="page-section">
          <div className="section-container" style={{ maxWidth: '46rem' }}>
            <SectionTitle label="COMO É FEITO" title="As regras da casa" />
            <div className="prosa">
              <p>
                <strong>Um número sem origem confirmada não entra.</strong> O projecto começou com módulos que mostravam
                valores plausíveis mas inventados — uma feira de tecnologia que nunca existiu, freguesias cuja soma não
                batia certo com a população do concelho. Foram todos removidos. Quando não há dados, o módulo diz que
                não há e aponta para onde a informação existe hoje.
              </p>
              <p>
                <strong>Cada valor mostra de quando é.</strong> Os Censos são de dez em dez anos, as estatísticas do
                rendimento são anuais, a temperatura é da hora. Misturá-los sem dizer qual é qual seria enganador, por
                isso cada módulo traz o período a que se refere.
              </p>
              <p>
                <strong>Os avisos são automáticos.</strong> Há uma verificação que corre sobre os valores fixos e assinala
                os que passaram do prazo de revisão da respectiva fonte — para que nada envelheça em silêncio.
              </p>
            </div>
          </div>
        </SectionReveal>
      </main>

      <SiteFooter />
    </>
  )
}
