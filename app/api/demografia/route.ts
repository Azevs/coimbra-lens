import { estimate, type Sourced } from '@/lib/provenance'

// Indicadores municipais do INE, obtidos em directo.
//
// O que aqui está deixou de ser fixo: quando o INE publicar um período novo,
// o site muda sozinho. Substitui valores que estavam escritos à mão e já
// tinham anos — a população dos Censos 2021, o ganho médio de 2022, e uma
// distribuição de nacionalidades que não correspondia a Coimbra.
const INE = (varcd: string) =>
  `https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=${varcd}&lang=PT`

/** População residente — estimativas anuais de base administrativa. */
const VAR_POPULACAO = '0008273'
/** População estrangeira com estatuto legal de residente, por nacionalidade. */
const VAR_ESTRANGEIROS = '0013219'
/** Ganho médio mensal (MTSSS/GEP), na geografia NUTS-2024. */
const VAR_GANHO = '0012656'

/** Coimbra na geografia NUTS-2013 usada pelo indicador de população. */
const GEO_2013 = '16E0603'
/** Coimbra nas geografias mais recentes. */
const GEO_2024 = '1920603'

/** Área do município em km² — DGT, Carta Administrativa Oficial de Portugal. */
const AREA_KM2 = 319.4

const SOURCE = 'INE'

export interface Nationality {
  country: string
  count: number
  pct: number
}

export interface IndicatorValue<T> {
  value: T | null
  /** Período a que o valor se refere, tal como o INE o devolve. */
  year: string | null
}

export interface DemografiaPayload {
  population: IndicatorValue<number>
  density: IndicatorValue<number>
  areaKm2: number
  foreigners: IndicatorValue<number>
  /** Nacionalidades ordenadas por dimensão, sem a linha de total. */
  nationalities: Nationality[]
  /** Ganho médio mensal em euros. */
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

const EMPTY = { value: null, year: null }

/**
 * Última leitura confirmada do INE, verificada a 01/09/2026.
 *
 * Serve de rede de segurança: se o INE não responder e a cache estiver
 * fria, mostrar isto é melhor do que mostrar traços — são valores reais,
 * do INE, com o período correcto. O que muda é a proveniência, que passa
 * a dizer que vêm de uma cópia local e de quando.
 *
 * Não é um valor inventado nem arredondado: é exactamente o que a fonte
 * devolveu. Actualiza-se sozinho assim que o INE voltar a responder.
 */
const SNAPSHOT = {
  verifiedOn: '2026-09-01',
  population: { value: 154224, year: '2023' },
  foreigners: { value: 13702, year: '2023' },
  income: { value: 1528.3, year: '2024' },
  nationalities: [
    { country: 'Brasil', count: 6578, pct: 48 },
    { country: 'Outros países', count: 4103, pct: 29.9 },
    { country: 'Angola', count: 1005, pct: 7.3 },
    { country: 'Cabo Verde', count: 576, pct: 4.2 },
    { country: 'Guiné Bissau', count: 396, pct: 2.9 },
    { country: 'China', count: 327, pct: 2.4 },
  ] as Nationality[],
}

/**
 * O indicador de população ronda os 4 MB e o INE é lento a servi-lo — e,
 * quando limita pedidos, deixa a ligação pendurada até estourar. Oito
 * segundos chegam para uma resposta boa e são o tempo máximo que vale a
 * pena esperar antes de servir a cópia local.
 */
const TIMEOUT_MS = 8_000

/** Devolve as linhas do período mais recente, com o rótulo desse período. */
async function fetchIndicator(varcd: string): Promise<{ year: string; rows: IneRow[] } | null> {
  const res = await fetch(INE(varcd), {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) return null

  const json = await res.json()
  const dados = json?.[0]?.Dados
  if (!dados) return null

  // O INE devolve os períodos por ordem decrescente.
  const year = Object.keys(dados)[0]
  return { year, rows: dados[year] ?? [] }
}

function toNumber(v: string | undefined): number | null {
  if (!v) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

async function getPopulation(): Promise<IndicatorValue<number>> {
  const d = await fetchIndicator(VAR_POPULACAO)
  if (!d) return EMPTY
  // A série inclui os próprios totais; somar as faixas etárias duplicaria.
  const row = d.rows.find(
    (r) => r.geocod === GEO_2013 && r.dim_3_t === 'HM' && r.dim_4_t === 'Total',
  )
  return { value: toNumber(row?.valor), year: d.year }
}

async function getForeigners(): Promise<{
  total: IndicatorValue<number>
  nationalities: Nationality[]
}> {
  const d = await fetchIndicator(VAR_ESTRANGEIROS)
  if (!d) return { total: EMPTY, nationalities: [] }

  const rows = d.rows.filter((r) => r.geocod === GEO_2024)
  const total = toNumber(rows.find((r) => r.dim_3 === 'T')?.valor)

  const nationalities: Nationality[] = rows
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
  const d = await fetchIndicator(VAR_GANHO)
  if (!d) return EMPTY
  const row = d.rows.find((r) => r.geocod === GEO_2024)
  return { value: toNumber(row?.valor), year: d.year }
}

export async function GET() {
  try {
    // Uma falha isolada não deve levar o resto do painel atrás.
    const [population, foreigners, income] = await Promise.all([
      getPopulation().catch(() => EMPTY),
      getForeigners().catch(() => ({ total: EMPTY, nationalities: [] })),
      getIncome().catch(() => EMPTY),
    ])

    const anyValue = population.value ?? foreigners.total.value ?? income.value
    if (anyValue === null) return Response.json(fromSnapshot())

    const density: IndicatorValue<number> =
      population.value === null
        ? EMPTY
        : { value: Math.round(population.value / AREA_KM2), year: population.year }

    // O período mais recente entre os indicadores obtidos data o conjunto.
    const newest = [population.year, foreigners.total.year, income.year]
      .filter((y): y is string => Boolean(y))
      .sort()
      .pop()

    return Response.json({
      population,
      density,
      areaKm2: AREA_KM2,
      foreigners: foreigners.total,
      nationalities: foreigners.nationalities,
      income,
      meta: estimate(
        SOURCE,
        'Indicadores municipais obtidos do INE a cada actualização. Cada valor mostra o período a que se refere.',
        newest ? `${newest}-12-31T12:00:00` : null,
      ),
    } satisfies DemografiaPayload)
  } catch {
    return Response.json(fromSnapshot())
  }
}

/** Resposta a partir da cópia local, com a proveniência a dizê-lo. */
function fromSnapshot(): DemografiaPayload {
  return {
    population: SNAPSHOT.population,
    density: {
      value: Math.round(SNAPSHOT.population.value / AREA_KM2),
      year: SNAPSHOT.population.year,
    },
    areaKm2: AREA_KM2,
    foreigners: SNAPSHOT.foreigners,
    nationalities: SNAPSHOT.nationalities,
    income: SNAPSHOT.income,
    meta: estimate(
      `${SOURCE} · cópia local`,
      `O INE não respondeu. Estes valores são a última leitura confirmada da fonte, ` +
        `verificada a ${new Date(SNAPSHOT.verifiedOn).toLocaleDateString('pt-PT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}.`,
      `${SNAPSHOT.population.year}-12-31T12:00:00`,
    ),
  }
}
