import type { Metadata } from 'next'
import { PUBLICADORES, ldDataset, ldPagina, ldParques, pagina } from '@/lib/seo'
import { LIDO_EM } from '@/lib/frescura'
import JsonLd from '@/components/seo/JsonLd'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import GreenExplorer from '@/components/sections/GreenExplorer'
import { IN_CITY, SPACES, TOTAL_HA, formatHa } from '@/lib/green'
import { CITY_RADIUS_KM } from '@/lib/green-spaces'

export const metadata: Metadata = pagina({
  caminho: 'zonas-verdes',
  titulo: 'Zonas verdes de Coimbra: parques, matas e jardins',
  descricao:
    'Os espaços verdes públicos de Coimbra em mapa e em número: matas, parques e jardins com nome, ' +
    'a sua área medida e a distância a que ficam do centro.',
})

export default function ZonasVerdesPage() {
  return (
    <>
      <JsonLd dados={ldPagina([{ nome: 'Zonas verdes', caminho: 'zonas-verdes' }])} />
      <JsonLd
        dados={ldDataset({
          caminho: 'zonas-verdes',
          nome: 'Espaços verdes públicos de Coimbra',
          descricao:
            'Matas, parques, jardins e reservas públicos com nome no concelho de Coimbra: tipo, área medida em ' +
            'hectares, freguesia e distância em linha recta ao Largo da Portagem.',
          publicadores: [PUBLICADORES.osm],
          variaveis: ['Área (ha)', 'Tipo de espaço verde', 'Distância ao centro (km)', 'Freguesia'],
          lidoEm: LIDO_EM['zonas-verdes'],
          licenca: 'https://opendatacommons.org/licenses/odbl/1-0/',
        })}
      />
      <JsonLd dados={ldParques(SPACES)} />
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

        </div>

        {/* A frase de abertura vai para dentro do explorador, que a põe ao
            lado do herbário: é o herbário que dá corpo ao que ela diz. */}
        <GreenExplorer
          intro={
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
              Coimbra tem {SPACES.length} espaços verdes públicos com nome, da Mata do Choupal ao mais
              pequeno jardim de praça: {formatHa(TOTAL_HA)} hectares, dos quais {IN_CITY.length} a menos
              de {CITY_RADIUS_KM} km do centro, a pé.
            </p>
          }
        />
      </main>

      <SiteFooter />
    </>
  )
}
