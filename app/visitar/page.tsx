import type { Metadata } from 'next'
import { ldMigalhas, ldPercurso, pagina } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Link from 'next/link'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import DataSource from '@/components/ui/DataSource'
import SectionTitle from '@/components/ui/SectionTitle'
import PlacePlate from '@/components/visitar/PlacePlate'
import VisitaMonumento from '@/components/visitar/VisitaMonumento'
import Roteiro from '@/components/visitar/Roteiro'
import { ATTRACTIONS, AREAS, WALKING_ROUTE, type Attraction } from '@/lib/attractions'
import { monumentoPorId, type Monumento } from '@/lib/monumentos'
import { textosPorId, type TextoMonumento } from '@/lib/monumentos-textos'
import { estimate } from '@/lib/provenance'

export const metadata: Metadata = pagina({
  caminho: 'visitar',
  titulo: 'Visitar Coimbra a pé: um dia da Baixa à Alta',
  tituloSocial: 'Um dia em Coimbra a pé',
  descricao:
    'Um dia em Coimbra a pé, lugar a lugar: da Baixa à Alta, pelo Jardim Botânico, até à outra margem. Com o Mosteiro de Santa Cruz, a Sé Velha e o Paço das Escolas em três dimensões.',
})

/**
 * Visitar.
 *
 * A página é o percurso. Primeiro o dia inteiro no mapa, de relance; depois
 * um capítulo por lugar, pela ordem em que se chega lá, agrupados pelos
 * três tempos do dia. Cada lugar com maqueta tem a sua visita em 3D no
 * próprio capítulo; os que ainda não a têm ficam com a chapa desenhada, e
 * ganham a maqueta quando ela existir — sem mudar a arrumação.
 *
 * Página editorial (sem manifesto de frescura), com uma excepção: cada
 * maqueta é modelo medido e leva o seu selo, como as zonas urbanas.
 */

const porId = new Map(ATTRACTIONS.map((a) => [a.id, a]))

/** Âncora de cada tempo do dia (índice da abertura e barra de navegação). */
const ANCORA: Record<string, string> = { Manhã: 'manha', 'Meio do dia': 'meio-dia', Tarde: 'tarde' }

/** A altura que cada maqueta mostra no rodapé: o ponto e o que se diz dele. */
const DESTAQUE: Record<string, { ponto: string; nome: string }> = {
  'paco-das-escolas': { ponto: 'torre', nome: 'torre' },
  'santa-cruz': { ponto: 'fachada', nome: 'fachada' },
  'se-velha': { ponto: 'lanterna', nome: 'torre-lanterna' },
}

/** As paragens numeradas de seguida, através dos três tempos. */
const TEMPOS = (() => {
  let n = 0
  return WALKING_ROUTE.map((t) => ({
    ...t,
    ancora: ANCORA[t.tempo] ?? t.tempo,
    paragens: t.paragens
      .map((p) => {
        const a = porId.get(p.id)
        return a ? { a, nota: p.note, n: ++n } : null
      })
      .filter((p): p is NonNullable<typeof p> => p !== null),
  }))
})()

/**
 * A maqueta de um lugar mostra-se no primeiro lugar do percurso que a usa;
 * os seguintes que caem dentro dela (a Joanina, no Paço) apontam para lá.
 */
const primeiroCom = new Map<string, string>()
for (const t of TEMPOS) for (const { a } of t.paragens) if (a.em3d && !primeiroCom.has(a.em3d)) primeiroCom.set(a.em3d, a.id)

const dois = (n: number) => String(n).padStart(2, '0')

export default function VisitarPage() {
  return (
    <>
      <JsonLd dados={ldMigalhas([{ nome: 'Visitar', caminho: 'visitar' }])} />
      <JsonLd dados={ldPercurso('Um dia em Coimbra a pé', TEMPOS.flatMap((t) => t.paragens.map((p) => p.a)))} />
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        {/* Abertura */}
        <header className="section-container visitar-abertura">
          <div className="visitar-kicker">
            <span>Visitar</span>
            <span style={{ color: 'var(--text-tertiary)' }}>Um dia a pé</span>
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Subir à Alta,
            <br />
            <em>descer ao rio</em>
          </h1>

          <div className="visitar-entrada">
            <p className="visitar-lede">
              Coimbra lê-se por andares. Em baixo, a Baixa e o Mondego; no alto da colina, o pátio da
              universidade; do outro lado da ponte, a margem de onde se vê a Alta inteira. Um dia chega para
              tudo — se se começar por baixo.
            </p>
            <ol className="visitar-indice" aria-label="Nesta página">
              <li>
                <a href="#percurso">
                  <span>00</span> O dia no mapa
                </a>
              </li>
              {TEMPOS.map((t, i) => (
                <li key={t.tempo}>
                  <a href={`#${t.ancora}`}>
                    <span>{dois(i + 1)}</span> {t.tempo} · {t.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </header>

        {/* O dia inteiro, de relance */}
        <section id="percurso" className="section-container visitar-percurso" aria-label="O dia no mapa">
          <SectionTitle
            label="O DIA NO MAPA"
            title={`${TEMPOS.reduce((s, t) => s + t.paragens.length, 0)} paragens, três tempos`}
            subtitle="De manhã sobe-se, porque a subir cansa menos com o dia fresco. Desce-se pelo jardim à hora do almoço e atravessa-se o rio à tarde, quando o sol bate na Alta."
          />
          <Roteiro />
        </section>

        {/* Os lugares, pela ordem do dia */}
        {TEMPOS.map((t) => (
          <section key={t.tempo} id={t.ancora} className="tempo" aria-labelledby={`${t.ancora}-titulo`}>
            <header className="section-container tempo-cabeca">
              <span className="ui-label ui-label-accent">{t.tempo}</span>
              <h2 id={`${t.ancora}-titulo`} className="font-display">
                {t.titulo}
              </h2>
            </header>

            {t.paragens.map(({ a, nota, n }) => {
              const id3d = a.em3d
              const monumento = id3d ? monumentoPorId(id3d) : undefined
              const textos = id3d ? textosPorId(id3d) : undefined
              if (monumento && textos && primeiroCom.get(id3d!) === a.id) {
                return <LugarEm3D key={a.id} a={a} n={n} nota={nota} monumento={monumento} textos={textos} />
              }
              const dentro = monumento && textos ? { casa: porId.get(primeiroCom.get(id3d!)!)!, textos } : undefined
              return <Lugar key={a.id} a={a} n={n} nota={nota} dentro={dentro} />
            })}
          </section>
        ))}
      </main>

      <SiteFooter />
    </>
  )
}

function Cabeca({ a, n, nota }: { a: Attraction; n: number; nota: string }) {
  return (
    <div className="lugar-cabeca">
      <span className="lugar-num font-display" aria-hidden>
        {dois(n)}
      </span>
      <div>
        <span className="lugar-onde">
          {AREAS[a.area].nome} · {nota}
        </span>
        <h3 id={`${a.id}-nome`} className="font-display lugar-nome">
          {a.name}
        </h3>
      </div>
    </div>
  )
}

function Sobre({ a }: { a: Attraction }) {
  return (
    <div className="lugar-sobre">
      <p className="lugar-texto">{a.blurb}</p>
      <div className="lugar-rodape">
        <span>{a.fact}</span>
        <a href={a.href} target="_blank" rel="noopener noreferrer">
          {a.hrefLabel} →
        </a>
      </div>
      {a.mais && (
        <Link href={a.mais.href} className="lugar-mais">
          {a.mais.label} →
        </Link>
      )}
    </div>
  )
}

/** Um lugar com maqueta: a visita em 3D ocupa o capítulo. */
function LugarEm3D({
  a,
  n,
  nota,
  monumento,
  textos,
}: {
  a: Attraction
  n: number
  nota: string
  monumento: Monumento
  textos: TextoMonumento
}) {
  const d = DESTAQUE[monumento.id]
  const alto = d && monumento.pontos.find((p) => p.id === d.ponto)?.altura
  return (
    <article id={a.id} className="lugar lugar--3d" aria-labelledby={`${a.id}-nome`}>
      <div className="section-container">
        <div className="lugar-topo">
          <Cabeca a={a} n={n} nota={nota} />
          <Sobre a={a} />
        </div>

        <VisitaMonumento monumento={monumento} textos={textos} largura={1800} altura={1125} />

        <div className="visitar-3d-rodape">
          <span className="ui-note">
            {monumento.raio * 2} m de diâmetro
            {alto != null && (
              <>
                {' '}
                · {d.nome} com {Math.round(alto)} m
              </>
            )}
          </span>
        </div>
        <DataSource
          meta={estimate('OpenStreetMap · LiDAR DGT (MDT e MDS 2 m) · ortofoto DGT 2025', '', monumento.lidoEm, 'Modelo')}
          showNote={false}
        />
      </div>
    </article>
  )
}

/** Um lugar sem maqueta própria: texto e chapa, ou a ligação à maqueta onde ele está. */
function Lugar({
  a,
  n,
  nota,
  dentro,
}: {
  a: Attraction
  n: number
  nota: string
  dentro?: { casa: Attraction; textos: TextoMonumento }
}) {
  const ponto = dentro ? dentro.textos.pontos.findIndex((p) => p.id === a.id) : -1
  return (
    <article id={a.id} className="lugar section-container" aria-labelledby={`${a.id}-nome`}>
      <div className="lugar-grelha">
        <div>
          <Cabeca a={a} n={n} nota={nota} />
          <Sobre a={a} />
        </div>
        <div className="lugar-chapa">
          <PlacePlate kind={a.plate} />
          {dentro && (
            <a href={`#${dentro.casa.id}`} className="lugar-3d">
              Na maqueta do {dentro.casa.name}
              {ponto >= 0 && <>, ponto {ponto + 1}</>} ↑
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
