import { published, unavailable, type Sourced } from '@/lib/provenance'
import { MUNICIPIO } from '@/lib/municipio'

/**
 * Indicadores municipais do INE, pela API REST de indicadores.
 *
 * A forma do pedido importa. A versão anterior pedia o indicador inteiro e
 * filtrava em memória — 4 MB por chamada para ler uma linha. Isso é lento,
 * e o INE responde a esse padrão fechando a porta: passou a recusar
 * ligações a meio do trabalho.
 *
 * A API aceita `Dim1` (período) e `Dim2` (geografia). Com as duas, a
 * resposta traz só as linhas de Coimbra, na ordem dos kilobytes:
 *
 *   pindica.jsp?op=2&varcd={cod}&Dim1={periodo}&Dim2={geo}&lang=PT
 *
 * O período não é assumido: vem do `UltimoPeriodo` dos metadados, que é
 * barato de obter. Nunca se presume "ano actual".
 */
const INE_DATA = 'https://www.ine.pt/ine/json_indicador/pindica.jsp'
const INE_META = 'https://www.ine.pt/ine/json_indicador/pindicaMeta.jsp'

/**
 * Indicadores confirmados a desagregar até ao município.
 *
 * Ficaram de fora por não existirem a este nível:
 *   · taxa de desemprego anual — o INE publica-a por NUTS, e a série do
 *     IEFP (0014470) é nacional. Por município, só nos Censos.
 *   · densidade populacional — calcula-se da população e da área.
 */
const INDICATORS = {
  populacao: { varcd: '0008273', geo: '16E0603', dimPrefix: 'S7A' },
  estrangeiros: { varcd: '0013219', geo: '1920603', dimPrefix: 'S7A' },
  ganho: { varcd: '0012656', geo: '1920603', dimPrefix: 'S7A' },
} as const

const SOURCE = 'INE'

/**
 * Cada indicador faz duas chamadas em série (metadados, depois dados), e os
 * três correm em paralelo. Com o limite a 12s, uma fonte em silêncio deixava
 * o cartão em espera 24 segundos. Seis chegam para uma resposta boa.
 */
const TIMEOUT_MS = 6_000

export interface Nationality {
  country: string
  count: number
  pct: number
}

export interface IndicatorValue<T> {
  value: T | null
  /** Período tal como o INE o devolve. Nunca inferido. */
  year: string | null
}

export interface DemografiaPayload {
  population: IndicatorValue<number>
  density: IndicatorValue<number>
  areaKm2: number
  areaYear: string
  foreigners: IndicatorValue<number>
  nationalities: Nationality[]
  income: IndicatorValue<number>
  meta: Sourced
}

interface IneRow {
  geocod?: string
  dim_3?: string
  dim_3_t?: string
  dim_4_t?: string
  valor?: string
}

const NONE: IndicatorValue<number> = { value: null, year: null }

async function getJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** Último período publicado, segundo a própria fonte. */
async function latestPeriod(varcd: string): Promise<string | null> {
  const meta = await getJson(`${INE_META}?varcd=${varcd}&lang=PT`)
  return (meta as { UltimoPeriodo?: string }[] | null)?.[0]?.UltimoPeriodo ?? null
}

/** Linhas de um indicador, já restritas ao período e à geografia pedidos. */
async function fetchRows(
  key: keyof typeof INDICATORS,
): Promise<{ year: string; rows: IneRow[] } | null> {
  const { varcd, geo, dimPrefix } = INDICATORS[key]

  const year = await latestPeriod(varcd)
  if (!year) return null

  const url = `${INE_DATA}?op=2&varcd=${varcd}&Dim1=${dimPrefix}${year}&Dim2=${geo}&lang=PT`

  const json = await getJson(url)
  const dados = (json as { Dados?: Record<string, IneRow[]> }[] | null)?.[0]?.Dados
  if (!dados) return null

  const period = Object.keys(dados)[0] ?? year
  // Mesmo com Dim2, confirmar a geografia: um filtro ignorado passaria
  // valores de outro município sem dar sinal nenhum.
  const rows = (dados[period] ?? []).filter((r) => r.geocod === geo)
  return rows.length ? { year: period, rows } : null
}

function toNumber(v: string | undefined): number | null {
  if (!v) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

async function getPopulation(): Promise<IndicatorValue<number>> {
  const d = await fetchRows('populacao')
  if (!d) return NONE
  // A série traz os próprios totais; somar as faixas etárias duplicaria.
  const row = d.rows.find((r) => r.dim_3_t === 'HM' && r.dim_4_t === 'Total')
  return { value: toNumber(row?.valor), year: d.year }
}

async function getForeigners(): Promise<{
  total: IndicatorValue<number>
  nationalities: Nationality[]
}> {
  const d = await fetchRows('estrangeiros')
  if (!d) return { total: NONE, nationalities: [] }

  const total = toNumber(d.rows.find((r) => r.dim_3 === 'T')?.valor)

  const nationalities: Nationality[] = d.rows
    .filter((r) => r.dim_3 !== 'T' && r.dim_3_t)
    .map((r) => ({ country: r.dim_3_t as string, count: toNumber(r.valor) ?? 0, pct: 0 }))
    .filter((n) => n.count > 0)
    .sort((a, b) => b.count - a.count)

  if (total && total > 0) {
    for (const n of nationalities) n.pct = Math.round((n.count / total) * 1000) / 10
  }

  return { total: { value: total, year: d.year }, nationalities }
}

async function getIncome(): Promise<IndicatorValue<number>> {
  const d = await fetchRows('ganho')
  if (!d) return NONE
  return { value: toNumber(d.rows[0]?.valor), year: d.year }
}

function empty(note: string): DemografiaPayload {
  return {
    population: NONE,
    density: NONE,
    areaKm2: MUNICIPIO.areaKm2,
    areaYear: MUNICIPIO.areaYear,
    foreigners: NONE,
    nationalities: [],
    income: NONE,
    meta: unavailable(SOURCE, note),
  }
}

export async function GET() {
  const [population, foreigners, income] = await Promise.all([
    getPopulation().catch(() => NONE),
    getForeigners().catch(() => ({ total: NONE, nationalities: [] })),
    getIncome().catch(() => NONE),
  ])

  if (population.value === null && foreigners.total.value === null && income.value === null) {
    return Response.json(empty('O INE não respondeu.'))
  }

  const density: IndicatorValue<number> =
    population.value === null
      ? NONE
      : { value: Math.round(population.value / MUNICIPIO.areaKm2), year: population.year }

  return Response.json({
    population,
    density,
    areaKm2: MUNICIPIO.areaKm2,
    areaYear: MUNICIPIO.areaYear,
    foreigners: foreigners.total,
    nationalities: foreigners.nationalities,
    income,
    meta: published(
      SOURCE,
      'INE',
      'API de indicadores do INE. Cada valor mostra o período que a fonte devolve.',
      population.year ? `${population.year}-12-31T12:00:00` : null,
    ),
  } satisfies DemografiaPayload)
}
