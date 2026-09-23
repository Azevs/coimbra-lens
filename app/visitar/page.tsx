import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import PlacePlate from '@/components/visitar/PlacePlate'
import VisitaMonumento from '@/components/visitar/VisitaMonumento'
import Roteiro from '@/components/visitar/Roteiro'
import { ATTRACTIONS, AREAS, type Area } from '@/lib/attractions'
import { monumentoPorId } from '@/lib/monumentos'
import { textosPorId } from '@/lib/monumentos-textos'
import { estimate } from '@/lib/provenance'

export const metadata: Metadata = {
  title: 'Visitar',
  description:
    'Um dia em Coimbra a pé: subir da Baixa à Alta, descer pelo Jardim Botânico, atravessar o Mondego. Com o Paço das Escolas em três dimensões.',
}

/**
 * Visitar.
 *
 * Página editorial (sem manifesto de frescura), com uma excepção: a maqueta
 * do Paço é modelo medido e leva o seu selo, como as zonas urbanas.
 *
 * A ordem é a de quem vai lá: primeiro o lugar que mais se quer ver, de
 * perto e em volta; depois o dia inteiro, no mapa; no fim, as fichas por
 * zona da cidade, para consultar.
 */

const PACO = monumentoPorId('paco-das-escolas')!
const PACO_TEXTOS = textosPorId('paco-das-escolas')!
const torre = PACO.pontos.find((p) => p.id === 'torre')

const ORDEM_AREAS: Area[] = ['baixa', 'alta', 'margem']

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
                <a href="#paco-3d">
                  <span>01</span> O Paço das Escolas, em 3D
                </a>
              </li>
              <li>
                <a href="#roteiro">
                  <span>02</span> O dia, paragem a paragem
                </a>
              </li>
              <li>
                <a href="#lugares">
                  <span>03</span> Os lugares, por zona
                </a>
              </li>
            </ol>
          </div>
        </header>

        {/* O Paço em três dimensões */}
        <section id="paco-3d" className="visitar-3d" aria-labelledby="paco-3d-titulo">
          <div className="section-container">
            <div className="visitar-3d-cabeca">
              <span className="ui-label ui-label-accent">Em três dimensões</span>
              <h2 id="paco-3d-titulo" className="font-display">
                O Paço das Escolas
              </h2>
              <p>
                O alto da colina, à escala, vestido com a fotografia aérea e com a Alta à volta serrada em
                disco. Rode a maqueta e escolha um número: a visita vai até lá.
              </p>
            </div>

            <VisitaMonumento monumento={PACO} textos={PACO_TEXTOS} largura={1800} altura={1125} />

            <div className="visitar-3d-rodape">
              <span className="ui-note">
                {PACO.raio * 2} m de diâmetro
                {torre?.altura != null && <> · torre com {Math.round(torre.altura)} m</>}
              </span>
            </div>
            <DataSource
              meta={estimate('OpenStreetMap · LiDAR DGT (MDT e MDS 2 m) · ortofoto DGT 2025', '', PACO.lidoEm, 'Modelo')}
              showNote={false}
            />
          </div>
        </section>

        {/* O dia a pé */}
        <SectionReveal id="roteiro" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="UM DIA A PÉ"
              title="Da Baixa à outra margem"
              subtitle="De manhã sobe-se, porque a subir cansa menos com o dia fresco. Desce-se pelo jardim à hora do almoço e atravessa-se o rio à tarde, quando o sol bate na Alta."
            />
            <Roteiro />
          </div>
        </SectionReveal>

        {/* Os lugares */}
        <SectionReveal id="lugares" className="page-section lugares">
          <div className="section-container">
            <SectionTitle
              label="FICHAS DE LUGAR"
              title="Os lugares"
              subtitle="O que cada lugar é, e o sítio oficial onde os horários e os bilhetes estão sempre certos."
            />

            {ORDEM_AREAS.map((area) => {
              const lugares = ATTRACTIONS.filter((a) => a.area === area)
              return (
                <section key={area} className="lugares-area" aria-labelledby={`area-${area}`}>
                  <header className="lugares-area-cabeca">
                    <h3 id={`area-${area}`} className="font-display">
                      {AREAS[area].nome}
                    </h3>
                    <p>{AREAS[area].frase}</p>
                  </header>
                  <div className={`lugares-grelha${lugares.length === 1 ? ' lugares-grelha--um' : ''}`}>
                    {lugares.map((a) => (
                      // O título e o texto vêm ANTES da chapa: com a imagem em
                      // cima, o texto de cada ficha encostava à imagem da linha
                      // seguinte e lia-se como legenda dela.
                      <article key={a.id} id={a.id} className="ficha">
                        <h4 className="font-display ficha-nome">{a.name}</h4>
                        <p className="ficha-texto">{a.blurb}</p>
                        <div className="ficha-rodape">
                          <span>{a.fact}</span>
                          <a href={a.href} target="_blank" rel="noopener noreferrer">
                            {a.hrefLabel} →
                          </a>
                        </div>
                        <div className="ficha-chapa">
                          <PlacePlate kind={a.plate} />
                          {a.em3d && (
                            <a href="#paco-3d" className="ficha-3d">
                              Ver em 3D ↑
                            </a>
                          )}
                        </div>
                        {a.mais && (
                          <Link href={a.mais.href} className="ficha-mais">
                            {a.mais.label} →
                          </Link>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </SectionReveal>
      </main>

      <SiteFooter />
    </>
  )
}
