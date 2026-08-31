import { estimate, unavailable, type Sourced } from '@/lib/provenance'

// INE — Estimativas Anuais de População Residente, por município.
//
// Buscar em vez de fixar: quando o INE publicar 2024, o número no site muda
// sozinho. O valor anterior era o dos Censos 2021 (143 396); as estimativas
// passaram a ser de base administrativa a partir de 2021 e dão um número
// bastante mais alto, por isso não são a mesma série.
const INE_URL = 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0008273&lang=PT'
const INE_META = 'https://www.ine.pt/ine/json_indicador/pindicaMeta.jsp?varcd=0008273&lang=PT'

/** Código do município de Coimbra na geografia NUTS-2013 do INE. */
const GEO = '16E0603'

/** Área do município em km² — DGT, Carta Administrativa Oficial de Portugal. */
const AREA_KM2 = 319.4

const SOURCE = 'INE · Estimativas anuais'
const METHOD =
  'Estimativa anual de base administrativa do INE, obtida da fonte a cada actualização. Não é o valor dos Censos.'

export interface DemografiaPayload {
  population: number | null
  /** Habitantes por km², calculado sobre a área da CAOP. */
  density: number | null
  areaKm2: number
  /** Ano a que a estimativa se refere. */
  year: string | null
  meta: Sourced
}

interface IneRow {
  geocod?: string
  dim_3_t?: string
  dim_4_t?: string
  valor?: string
}

function noData(note: string): DemografiaPayload {
  return { population: null, density: null, areaKm2: AREA_KM2, year: null, meta: unavailable(SOURCE, note) }
}

export async function GET() {
  try {
    // A resposta ronda os 4 MB — uma vez por dia chega e sobra.
    const res = await fetch(INE_URL, { next: { revalidate: 86400 } })
    if (!res.ok) return Response.json(noData(`O INE respondeu ${res.status}.`))

    const json = await res.json()
    const dados = json?.[0]?.Dados
    if (!dados) return Response.json(noData('O INE respondeu sem dados.'))

    // A resposta traz os períodos por ordem decrescente; o primeiro é o mais recente.
    const year = Object.keys(dados)[0]
    const rows: IneRow[] = dados[year] ?? []

    // O INE publica um total explícito (HM / Total). Somar as faixas etárias
    // à mão duplicaria linhas, porque a série já inclui os próprios totais.
    const total = rows.find(
      (r) => r.geocod === GEO && r.dim_3_t === 'HM' && r.dim_4_t === 'Total',
    )

    const population = total?.valor ? Number(total.valor) : null
    if (population === null || Number.isNaN(population)) {
      return Response.json(noData('Não foi encontrado o total do município na resposta do INE.'))
    }

    return Response.json({
      population,
      density: Math.round(population / AREA_KM2),
      areaKm2: AREA_KM2,
      year,
      meta: estimate(SOURCE, METHOD, `${year}-12-31T12:00:00`),
    } satisfies DemografiaPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar o INE.'))
  }
}

/** Usado pelo `npm run check:data` para saber se já há período mais recente. */
export const INE_META_URL = INE_META
