import type { Metadata } from 'next'
import { PUBLICADORES, ldDataset, ldPagina, pagina } from '@/lib/seo'
import { LIDO_EM } from '@/lib/frescura'
import JsonLd from '@/components/seo/JsonLd'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import ParishMap from '@/components/map/ParishMap'
import ParishPieces from '@/components/sections/ParishPieces'
import { proportionalLayout } from '@/lib/parish-geometry'
import { MUNICIPALITY, PARISH_ROWS } from '@/lib/parish-metrics'
import { PARISH_CENSUS_YEAR } from '@/lib/parishes'
import { fmt } from '@/lib/format'

export const metadata: Metadata = pagina({
  caminho: 'territorio',
  titulo: 'As 18 freguesias de Coimbra: mapa e população',
  descricao: 'As 18 freguesias de Coimbra em mapa e em número: onde vive a população do município.',
})

const COUNT_WORDS = ['uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']

/**
 * Quantas freguesias, das mais povoadas para baixo, juntam mais de metade
 * da população, e que parte da área do concelho ocupam.
 */
function half() {
  const byPopulation = [...PARISH_ROWS].sort((a, b) => b.population - a.population)
  let people = 0
  let area = 0
  let n = 0
  for (const row of byPopulation) {
    people += row.population
    area += row.areaKm2 ?? 0
    n++
    if (people > MUNICIPALITY.population / 2) break
  }
  return { n, areaShare: (area / MUNICIPALITY.areaKm2) * 100 }
}

export default function TerritorioPage() {
  // A vista proporcional arruma-se aqui, no servidor e uma vez: são umas
  // centenas de milhares de contas que o telemóvel não tem de repetir.
  const { squares, unitsPerPerson } = proportionalLayout(PARISH_ROWS)
  const { n, areaShare } = half()

  return (
    <>
      <JsonLd dados={ldPagina([{ nome: 'Território', caminho: 'territorio' }])} />
      <JsonLd
        dados={ldDataset({
          caminho: 'territorio',
          nome: 'População e território das freguesias de Coimbra',
          descricao:
            'População residente, área, densidade, variação da população entre 2011 e 2021, índice de envelhecimento ' +
            'e alojamentos sem residentes, para cada uma das 18 freguesias do concelho de Coimbra e para o concelho.',
          publicadores: [PUBLICADORES.ine, PUBLICADORES.dgt],
          variaveis: [
            'População residente',
            'Área (km²)',
            'Densidade populacional (hab./km²)',
            'Variação da população 2011–2021 (%)',
            'Índice de envelhecimento',
            'Alojamentos clássicos sem residentes (%)',
          ],
          periodo: `2011/${PARISH_CENSUS_YEAR}`,
          lidoEm: LIDO_EM.territorio,
        })}
      />
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
            Território
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Dezoito
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>freguesias</span>
          </h1>

          <div className="green-hero-foot parish-hero-foot">
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', fontWeight: 400, lineHeight: 1.3, maxWidth: '36rem', textWrap: 'pretty' }}
            >
              Em {PARISH_CENSUS_YEAR}, o concelho de Coimbra tinha {fmt(MUNICIPALITY.population)} habitantes
              em dezoito freguesias, das colinas da cidade ao Baixo Mondego. Mais de metade de quem cá
              vive mora em {COUNT_WORDS[n - 1] ?? n} delas, que ocupam {Math.round(areaShare)}% da
              área do concelho.
            </p>
            <ParishPieces />
          </div>
        </div>

        <ParishMap squares={squares} unitsPerPerson={unitsPerPerson} />
      </main>

      <SiteFooter />
    </>
  )
}
