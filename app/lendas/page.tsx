import type { Metadata } from 'next'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import FilmeLenda, { type Capitulo, type Fala } from '@/components/lendas/FilmeLenda'

export const metadata: Metadata = {
  title: 'Lendas',
  description: 'As lendas de Coimbra em desenho animado. Primeiro episódio: Pedro e Inês.',
}

/**
 * Lendas — um episódio por lenda, empilhados.
 *
 * Página editorial, fora do manifesto de frescura. Cada episódio separa, por
 * baixo do vídeo, o que é história do que é lenda.
 */

/** As falas das legendas, para ler a narração sem ver o episódio. */
function lerFalas(id: string): Fala[] {
  const vtt = readFileSync(join(process.cwd(), `public/video/lendas/${id}.pt.vtt`), 'utf8')
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

interface Episodio {
  id: string
  numero: number
  titulo: string
  italico: string
  resumo: string
  duracao: number
  // os tempos são as cenas de scripts/lendas/<id>/tempo.mjs
  capitulos: Capitulo[]
  historia: { quando: string; texto: string }[]
  lenda: string[]
}

const EPISODIOS: Episodio[] = [
  {
    id: 'pedro-ines',
    numero: 1,
    titulo: 'Pedro e',
    italico: 'Inês',
    resumo:
      'O infante que se apaixonou pela dama da mulher, o rei que não o aprovava, e o que aconteceu em Coimbra a 7 de janeiro de 1355.',
    duracao: 185,
    capitulos: [
      { titulo: 'A chegada', inicio: 4 },
      { titulo: 'O rei', inicio: 20 },
      { titulo: 'O regresso', inicio: 46 },
      { titulo: 'A fonte', inicio: 60 },
      { titulo: 'A morte', inicio: 92 },
      { titulo: 'O rei Pedro', inicio: 106 },
      { titulo: 'Alcobaça', inicio: 144 },
      { titulo: 'As lendas', inicio: 162 },
    ],
    historia: [
      { quando: '1340', texto: 'D. Constança Manuel chega a Portugal para casar com o infante D. Pedro. Inês de Castro vem entre as suas damas.' },
      { quando: '1344', texto: 'D. Afonso IV afasta Inês para o castelo de Albuquerque, em Castela.' },
      { quando: '1345', texto: 'Morre D. Constança, pouco depois de nascer o futuro rei D. Fernando.' },
      { quando: '7 jan. 1355', texto: 'Inês de Castro é morta em Coimbra, com o consentimento do rei.' },
      { quando: '1357 · 1360', texto: 'Pedro sobe ao trono e, em Cantanhede, declara que tinha casado com Inês em segredo.' },
      { quando: '1361', texto: 'Dois dos assassinos, entregues por Castela, são executados. Diogo Lopes Pacheco escapa.' },
      { quando: 'Hoje', texto: 'Os túmulos de Pedro e de Inês estão no Mosteiro de Alcobaça.' },
    ],
    lenda: [
      'Os encontros junto a uma fonte, na quinta a que hoje se chama das Lágrimas.',
      'A coroação de Inês depois de morta, e a corte obrigada a beijar-lhe a mão.',
      'A Fonte das Lágrimas, nascida do choro de Inês.',
    ],
  },
]

export default function LendasPage() {
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
            Lendas
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />
          <h1 className="visitar-headline">
            As lendas
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>de Coimbra</span>
          </h1>
          <p className="lendas-entrada">
            Histórias que a cidade conta há séculos, em desenho animado. Por baixo de cada episódio fica separado o que
            aconteceu do que se conta.
          </p>
        </div>

        {EPISODIOS.map((e) => (
          <section key={e.id} id={e.id} className="filme-palco filme-palco--sepia" aria-label={`${e.titulo} ${e.italico}`}>
            <div className="section-container filme-contentor">
              <div className="filme-cabeca">
                <span className="filme-kicker">Episódio {e.numero}</span>
                <h2 className="filme-titulo">
                  {e.titulo} <em>{e.italico}</em>
                </h2>
                <p className="lenda-resumo">{e.resumo}</p>
              </div>
              <FilmeLenda id={e.id} duracao={e.duracao} capitulos={e.capitulos} falas={lerFalas(e.id)} />

              <div className="lenda-nota">
                <div>
                  <h3 className="lenda-nota-titulo">O que aconteceu</h3>
                  <ol className="lenda-cronologia">
                    {e.historia.map((h) => (
                      <li key={h.quando}>
                        <span className="filme-cap-tempo">{h.quando}</span>
                        <span>{h.texto}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="lenda-nota-titulo">O que se conta</h3>
                  <ul className="lenda-contos">
                    {e.lenda.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  )
}
