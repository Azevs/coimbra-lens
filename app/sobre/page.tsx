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

        <SectionReveal id="filme" className="page-section">
          <div className="section-container" style={{ maxWidth: '64rem' }}>
            <SectionTitle label="O FILME" title="Coimbra, em três minutos" />
            <figure style={{ margin: 0 }}>
              {/* preload="none": os 28 MB só descem quando alguém carrega no play */}
              <video
                controls
                playsInline
                preload="none"
                poster="/video/coimbra-poster.jpg"
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', display: 'block', background: '#0B0E18' }}
              >
                <source src="/video/coimbra.mp4" type="video/mp4" />
                <track kind="subtitles" src="/video/coimbra.pt.vtt" srcLang="pt" label="Português" default />
                <track kind="subtitles" src="/video/coimbra.en.vtt" srcLang="en" label="English" />
              </video>
              <figcaption
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginTop: '0.875rem',
                }}
              >
                Narrado em inglês · legendas em português
              </figcaption>
            </figure>
          </div>
        </SectionReveal>

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

        {/* Estes quatro temas eram secções da primeira página feitas só de
            estados vazios. Saíram da montra, mas o vazio continua dito. */}
        <SectionReveal id="em-falta" className="page-section">
          <div className="section-container" style={{ maxWidth: '46rem' }}>
            <SectionTitle label="O QUE FALTA" title="O que ainda não há" />
            <div className="prosa">
              <p>
                <strong>Autocarros dos SMTUC.</strong> Os SMTUC não publicam tempos de chegada em tempo real. Está
                prevista a importação do horário GTFS estático.
              </p>
              <p>
                <strong>Deslocações dentro da cidade.</strong> Os Censos publicam movimentos pendulares entre
                municípios, não entre zonas dentro de Coimbra. Sem essa fonte, não há fluxos a mostrar.
              </p>
              <p>
                <strong>Notícias da Universidade.</strong> A UC não publica actualmente um feed RSS de notícias.
              </p>
              <p>
                <strong>A UC em números.</strong> A UC publica estes números mas só através de JavaScript, sem API nem
                HTML legível. Estão em{' '}
                <a href="https://www.uc.pt/dados" target="_blank" rel="noopener noreferrer">
                  A UC em Números, no uc.pt
                </a>
                .
              </p>
            </div>
          </div>
        </SectionReveal>
      </main>

      <SiteFooter />
    </>
  )
}
