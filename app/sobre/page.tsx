import type { Metadata } from 'next'
import { ldMigalhas, pagina } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ReactNode } from 'react'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import FilmeCoimbra, { type Fala } from '@/components/sobre/FilmeCoimbra'
import { TRACKED } from '@/lib/reference-data'
import { published, unavailable, type Sourced } from '@/lib/provenance'

export const metadata: Metadata = pagina({
  caminho: 'sobre',
  titulo: 'Sobre o CoimbraLens',
  descricao: 'O que é o CoimbraLens, como é feito e que regras segue.',
})

/** As falas das legendas portuguesas, para ler a narração sem ver o filme. */
function lerFalas(): Fala[] {
  const vtt = readFileSync(join(process.cwd(), 'public/video/coimbra.pt.vtt'), 'utf8')
  return vtt
    .split(/\r?\n\r?\n/)
    .map((bloco) => {
      const linhas = bloco.trim().split(/\r?\n/)
      const i = linhas.findIndex((l) => l.includes('-->'))
      if (i < 0) return null
      const [h, m, s] = linhas[i].split('-->')[0].trim().split(':').map(Number)
      return { inicio: h * 3600 + m * 60 + s, texto: linhas.slice(i + 1).join(' ') }
    })
    .filter((f): f is Fala => f !== null)
}

const MES = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.']

/** '2026-09' → 'set. 2026'; '2021' fica '2021'. */
function periodo(asOf: string) {
  const [a, m] = asOf.split('-')
  return m ? `${MES[Number(m) - 1]} ${a}` : a
}

/** O mês em que o verificador passa a assinalar o valor. */
function proximaRevisao(asOf: string, meses: number) {
  const [a, m] = asOf.split('-').map(Number)
  const d = new Date(a, (m || 12) - 1 + meses, 1)
  return `${MES[d.getMonth()]} ${d.getFullYear()}`
}

const dado = (id: string) => TRACKED.find((t) => t.id === id)!

// Selos de exemplo: os três estados, com fontes que o site usa de facto.
// Sem hora de medição, para não mostrar um "há 2 min" que não aconteceu.
const EM_DIRECTO: Sourced = { provenance: 'live', source: 'Open-Meteo', observedAt: null }
const PUBLICADO = published('INE', 'Censos 2021', '')
const INDISPONIVEL = unavailable('SMTUC', '')

function Regra({ n, titulo, children, exemplo }: { n: string; titulo: string; children: ReactNode; exemplo: ReactNode }) {
  return (
    <article className="regra">
      <div className="regra-numero" aria-hidden="true">
        {n}
      </div>
      <div className="regra-corpo">
        <h3 className="regra-titulo">{titulo}</h3>
        <div className="prosa">{children}</div>
      </div>
      <div className="regra-exemplo">{exemplo}</div>
    </article>
  )
}

type Estado = 'previsto' | 'sem-fonte' | 'bloqueado'
const ESTADO: Record<Estado, { rotulo: string; cor: string }> = {
  previsto: { rotulo: 'Previsto', cor: 'var(--tone-teal)' },
  'sem-fonte': { rotulo: 'Não existe publicado', cor: 'var(--text-secondary)' },
  bloqueado: { rotulo: 'Publicado, mas ilegível', cor: 'var(--tone-amber)' },
}

const EM_FALTA: { tema: string; estado: Estado; texto: ReactNode }[] = [
  {
    tema: 'Autocarros dos SMTUC',
    estado: 'previsto',
    texto: 'Os SMTUC não publicam tempos de chegada em tempo real. Está prevista a importação do horário GTFS estático.',
  },
  {
    tema: 'Deslocações dentro da cidade',
    estado: 'sem-fonte',
    texto:
      'Os Censos publicam movimentos pendulares entre municípios, não entre zonas dentro de Coimbra. Sem essa fonte, não há fluxos a mostrar.',
  },
  {
    tema: 'Notícias da Universidade',
    estado: 'sem-fonte',
    texto: 'A UC não publica actualmente um feed RSS de notícias.',
  },
  {
    tema: 'A UC em números',
    estado: 'bloqueado',
    texto: (
      <>
        A UC publica estes números mas só através de JavaScript, sem API nem HTML legível. Estão em{' '}
        <a href="https://www.uc.pt/dados" target="_blank" rel="noopener noreferrer">
          A UC em Números, no uc.pt
        </a>
        .
      </>
    ),
  },
]

export default function SobrePage() {
  const censos = dado('freguesias-dados')
  const caop = dado('freguesias-limites')
  const metrobus = dado('metrobus-em-servico')

  return (
    <>
      <JsonLd dados={ldMigalhas([{ nome: 'Sobre', caminho: 'sobre' }])} />
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

        <section id="filme" className="filme-palco" aria-label="O filme">
          <div className="section-container filme-contentor">
            <div className="filme-cabeca">
              <span className="filme-kicker">O filme</span>
              <h2 className="filme-titulo">
                Coimbra, <em>em três minutos</em>
              </h2>
            </div>
            <FilmeCoimbra falas={lerFalas()} />
          </div>
        </section>

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
          <div className="section-container" style={{ maxWidth: '64rem' }}>
            <SectionTitle label="COMO É FEITO" title="As regras da casa" />
            <div className="regras">
              <Regra
                n="01"
                titulo="Um número sem origem confirmada não entra."
                exemplo={
                  <>
                    <span className="regra-exemplo-rotulo">Os três selos</span>
                    <DataSource meta={EM_DIRECTO} showNote={false} />
                    <DataSource meta={PUBLICADO} showNote={false} />
                    <DataSource meta={INDISPONIVEL} showNote={false} />
                  </>
                }
              >
                <p>
                  O projecto começou com módulos que mostravam valores plausíveis mas inventados — uma feira de
                  tecnologia que nunca existiu, freguesias cuja soma não batia certo com a população do concelho. Foram
                  todos removidos. Quando não há dados, o módulo diz que não há e aponta para onde a informação existe
                  hoje.
                </p>
              </Regra>

              <Regra
                n="02"
                titulo="Cada valor mostra de quando é."
                exemplo={
                  <>
                    <span className="regra-exemplo-rotulo">Três ritmos</span>
                    <dl className="regra-periodos">
                      <div>
                        <dt>Temperatura</dt>
                        <dd>da hora</dd>
                      </div>
                      <div>
                        <dt>{caop.label}</dt>
                        <dd>{periodo(caop.asOf)}</dd>
                      </div>
                      <div>
                        <dt>{censos.label}</dt>
                        <dd>{periodo(censos.asOf)}</dd>
                      </div>
                    </dl>
                  </>
                }
              >
                <p>
                  Os Censos são de dez em dez anos, as estatísticas do rendimento são anuais, a temperatura é da hora.
                  Misturá-los sem dizer qual é qual seria enganador, por isso cada módulo traz o período a que se refere.
                </p>
              </Regra>

              <Regra
                n="03"
                titulo="Os avisos são automáticos."
                exemplo={
                  <>
                    <span className="regra-exemplo-rotulo">Próximo aviso</span>
                    <p className="regra-aviso">
                      <span className="regra-aviso-tema">{metrobus.label}</span>
                      <span className="regra-aviso-data">{proximaRevisao(metrobus.asOf, metrobus.refreshEvery)}</span>
                    </p>
                  </>
                }
              >
                <p>
                  Há uma verificação que corre sobre os valores fixos e assinala os que passaram do prazo de revisão da
                  respectiva fonte — para que nada envelheça em silêncio.
                </p>
              </Regra>
            </div>
          </div>
        </SectionReveal>

        {/* Estes quatro temas eram secções da primeira página feitas só de
            estados vazios. Saíram da montra, mas o vazio continua dito. */}
        <SectionReveal id="em-falta" className="page-section">
          <div className="section-container" style={{ maxWidth: '64rem' }}>
            <SectionTitle label="O QUE FALTA" title="O que ainda não há" />
            <ul className="falta">
              {EM_FALTA.map((f) => (
                <li key={f.tema} className="falta-cartao" style={{ ['--estado' as string]: ESTADO[f.estado].cor }}>
                  <span className="falta-estado">{ESTADO[f.estado].rotulo}</span>
                  <h3 className="falta-tema">{f.tema}</h3>
                  <p className="falta-texto">{f.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </main>

      <SiteFooter />
    </>
  )
}
