import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import Maqueta, { LegendaMaqueta } from '@/components/urbano/Maqueta'
import MaquetaViva from '@/components/urbano/MaquetaViva'
import { byId, type UrbanZone } from '@/lib/urban-zones'
import { estimate } from '@/lib/provenance'

const brasil = byId('rua-do-brasil')!
const baixa = byId('baixa')!

const numero = (n: number) => n.toLocaleString('pt-PT')
const km = (m: number) =>
  `${(m / 1000).toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`

export const metadata: Metadata = {
  title: 'Zonas urbanas',
  description:
    `As zonas de Coimbra em maqueta tridimensional. A Rua do Brasil, ${km(brasil.comprimento)} ` +
    `e ${numero(brasil.edificios)} edifícios a subir do Mondego a Santo António dos Olivais; ` +
    `e a Baixa, ${numero(baixa.edificios)} edifícios em menos de um quilómetro, da Portagem à Rua da Sofia.`,
}

/** Metros por piso usados no modelo — o mesmo valor do gerador. */
const PE_DIREITO = 3

interface Ficha {
  termo: string
  valor: string
  nota: string
}

interface Zona {
  zona: UrbanZone
  titulo: [string, string]
  abertura: string
  /** A fonte do terreno muda de zona para zona; o selo diz qual. */
  fonte: string
  ficha: Ficha[]
  conjunto: { legenda: string; azimute: number; elevacao: number }
  trocos: { subtitulo: string; vistas: { vista: string; legenda: string }[] }
}

const edificiosFicha = (z: UrbanZone): Ficha => ({
  termo: 'Edifícios',
  valor: numero(z.edificios),
  nota: `a menos de ${z.raio} m do eixo`,
})

const maisAltoFicha = (z: UrbanZone): Ficha => ({
  termo: 'Mais alto',
  valor: `${z.maisAlto.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} m`,
  nota: `cerca de ${Math.round(z.maisAlto / PE_DIREITO)} pisos`,
})

const ZONAS: Zona[] = [
  {
    zona: baixa,
    titulo: ['Novecentos metros', 'de malha'],
    abertura:
      `Da Portagem a Santa Cruz pela Ferreira Borges e pela Visconde da Luz, e daí pela Rua da Sofia. ` +
      `Em menos de um quilómetro de percurso cabem ${numero(baixa.edificios)} edifícios — mais do que ` +
      `nos dois quilómetros da Rua do Brasil.`,
    fonte: 'OpenStreetMap · LiDAR DGT (MDT 2 m)',
    ficha: [
      { termo: 'Percurso', valor: km(baixa.comprimento), nota: 'da Portagem ao fim da Sofia' },
      {
        termo: 'Altitude',
        valor: `${Math.round(baixa.cotaMin)}–${Math.round(baixa.cotaMax)} m`,
        nota: 'da Praça 8 de Maio à entrada do Arco de Almedina',
      },
      edificiosFicha(baixa),
      maisAltoFicha(baixa),
    ],
    conjunto: {
      legenda:
        'A Baixa vista do lado do rio. O eixo corre de sul para norte, da Portagem à Rua da Sofia; por trás, o terreno começa a subir para a Alta.',
      azimute: 196,
      elevacao: 34,
    },
    trocos: {
      subtitulo: 'Três partes de um percurso curto, cada uma com o seu tecido.',
      vistas: [
        {
          vista: 'sul',
          legenda:
            'Sul: a Portagem e a Ferreira Borges, que sobe devagar desde o largo até à passagem para o Arco de Almedina.',
        },
        {
          vista: 'centro',
          legenda:
            'Centro: a Visconde da Luz desce oito metros até à Praça 8 de Maio, o ponto mais baixo do percurso, com o quarteirão apertado da Baixa entre o eixo e o rio.',
        },
        {
          vista: 'norte',
          legenda:
            'Norte: a Rua da Sofia, larga, recta e quase plana ao pé da encosta. Do lado da encosta, os edifícios grandes ficam desenhados no chão: a altura está por registar.',
        },
      ],
    },
  },
  {
    zona: brasil,
    titulo: ['Dois quilómetros', 'a subir'],
    abertura:
      `A Rua do Brasil começa quase ao nível do Mondego e acaba vinte e seis metros acima, ` +
      `onde era a Ladeira do Baptista. Pelo caminho passa ${numero(brasil.edificios)} edifícios ` +
      `e duas rotundas.`,
    fonte: 'OpenStreetMap · EU-DEM (Copernicus)',
    ficha: [
      { termo: 'Percurso', valor: km(brasil.comprimento), nota: 'de uma ponta à outra' },
      {
        termo: 'Subida',
        valor: `${Math.round(brasil.cotaMax - brasil.cotaMin)} m`,
        nota: `dos ${Math.round(brasil.cotaMin)} aos ${Math.round(brasil.cotaMax)} de altitude`,
      },
      edificiosFicha(brasil),
      maisAltoFicha(brasil),
    ],
    conjunto: {
      legenda:
        'A rua inteira, de poente para nascente. A oeste desce para a ponte; a leste estabiliza no planalto de Santo António dos Olivais.',
      azimute: -104,
      elevacao: 34,
    },
    trocos: {
      subtitulo: 'A frente construída muda de carácter três vezes pelo caminho.',
      vistas: [
        {
          vista: 'poente',
          legenda:
            'Poente: a descida para a Portagem. A frente afasta-se do eixo e o edificado rareia — é o troço onde a rua é sobretudo declive.',
        },
        {
          vista: 'centro',
          legenda:
            'Centro: a frente contínua de prédios de quatro e cinco pisos que dá o carácter à avenida, com a rotunda a marcar o meio.',
        },
        {
          vista: 'nascente',
          legenda:
            'Nascente: já no alto, o tecido abre-se em quarteirões mais soltos e blocos isolados de maior altura.',
        },
      ],
    },
  },
]

/** A Rua do Brasil abre a página, como antes; a Baixa acrescenta-se a seguir. */
const ORDEM = ['rua-do-brasil', 'baixa'].map((id) => ZONAS.find((z) => z.zona.id === id)!)

const rotulo = {
  fontFamily: 'var(--font-jetbrains)',
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: 'var(--accent-text)',
}

function SeccaoZona({ z, primeira }: { z: Zona; primeira: boolean }) {
  const { zona } = z
  return (
    <section id={zona.id} aria-labelledby={`${zona.id}-titulo`} style={{ scrollMarginTop: '6rem' }}>
      {/* Abertura */}
      <div
        className="section-container"
        style={{ padding: primeira ? '0 1.25rem' : '4.5rem 1.25rem 0' }}
      >
        <div style={{ ...rotulo, marginBottom: '1rem' }}>{zona.nome}</div>
        <div style={{ height: '3px', background: 'var(--text-primary)' }} />

        <h2 id={`${zona.id}-titulo`} className="visitar-headline">
          {z.titulo[0]}
          <br />
          <span className="font-display-italic" style={{ color: 'var(--accent)' }}>
            {z.titulo[1]}
          </span>
        </h2>

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
            {z.abertura}
          </p>
        </div>
      </div>

      {/* A maqueta inteira */}
      <SectionReveal id={`${zona.id}-maqueta`}>
        <div className="section-container" style={{ padding: '3.5rem 1.25rem 0' }}>
          <MaquetaViva
            zona={zona}
            cartaz="conjunto"
            largura={1800}
            altura={810}
            legenda={z.conjunto.legenda}
            azimute={z.conjunto.azimute}
            elevacao={z.conjunto.elevacao}
          />

          <div
            style={{
              marginTop: '2.5rem',
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              alignItems: 'start',
            }}
          >
            {z.ficha.map((f) => (
              <div key={f.termo}>
                <div className="label-text" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                  {f.termo}
                </div>
                <div className="font-display" style={{ fontSize: '2rem', lineHeight: 1, color: 'var(--text-data)' }}>
                  {f.valor}
                </div>
                <div style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                  {f.nota}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <LegendaMaqueta />
          </div>

          <DataSource meta={estimate(z.fonte, '', zona.lidoEm, 'Modelo')} showNote={false} />
        </div>
      </SectionReveal>

      {/* Três troços */}
      <SectionReveal id={`${zona.id}-trocos`}>
        <div className="section-container" style={{ padding: '4.5rem 1.25rem 4rem' }}>
          <SectionTitle label="Troços" title="De uma ponta à outra" subtitle={z.trocos.subtitulo} />

          <div style={{ display: 'grid', gap: '3rem' }}>
            {z.trocos.vistas.map((v) => (
              <Maqueta key={v.vista} zona={zona} vista={v.vista} largura={1600} altura={1000} legenda={v.legenda} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}

export default function ZonasUrbanasPage() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        {/* O índice das zonas é a sub-navegação do Navbar, como nas outras páginas. */}
        <div className="section-container" style={{ padding: '0 1.25rem 3rem' }}>
          <h1 style={{ ...rotulo, margin: 0 }}>Zonas urbanas</h1>
        </div>

        {ORDEM.map((z, i) => (
          <SeccaoZona key={z.zona.id} z={z} primeira={i === 0} />
        ))}
      </main>

      <SiteFooter />
    </>
  )
}
