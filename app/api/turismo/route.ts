import { published, unavailable, type Sourced } from '@/lib/provenance'

/**
 * Alojamento turístico no município, pela API de indicadores do INE.
 *
 * Mesmo padrão da rota da demografia: metadados primeiro para saber o último
 * mês publicado, depois só as linhas de Coimbra (`Dim1` + `Dim2`). As séries
 * são mensais e saem com cerca de dois meses de atraso.
 *
 * Os pedidos correm em série, não em paralelo. O INE fecha a porta a rajadas
 * — um varrimento de códigos com 16 pedidos em simultâneo deixou-o a recusar
 * ligações durante mais de meia hora.
 */
const INE_DATA = 'https://www.ine.pt/ine/json_indicador/pindica.jsp'
const INE_META = 'https://www.ine.pt/ine/json_indicador/pindicaMeta.jsp'

const INDICATORS = {
  /** Dormidas (N.º) nos estabelecimentos de alojamento turístico; Mensal. */
  dormidas: '0009808',
  /** Proveitos totais (€) nos estabelecimentos de alojamento turístico; Mensal. */
  proveitos: '0009813',
} as const

/** Município de Coimbra, NUTS 2013 — o mesmo código da população. */
const GEO = '16E0603'
const SOURCE = 'INE'
const TIMEOUT_MS = 6_000

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export interface MonthlyValue {
  value: number | null
  /** Mês tal como o INE o devolve, ex.: "Julho de 2026". */
  period: string | null
  /** Mesmo mês do ano anterior, para a variação homóloga. */
  previousYear: number | null
}

export interface TurismoPayload {
  dormidas: MonthlyValue
  proveitos: MonthlyValue
  meta: Sourced
}

interface IneRow {
  geocod?: string
  dim_3?: string
  dim_3_t?: string
  valor?: string
}

const NONE: MonthlyValue = { value: null, period: null, previousYear: null }

async function getJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(TIMEOUT_MS) })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** "Julho de 2026" → { year: 2026, month: 7 }. Nada de "mês actual" presumido. */
function parsePeriod(p: string): { year: number; month: number } | null {
  const m = p.trim().toLowerCase().match(/^(\S+) de (\d{4})$/)
  if (!m) return null
  const month = MESES.indexOf(m[1]) + 1
  return month > 0 ? { year: Number(m[2]), month } : null
}

const dimCode = (year: number, month: number) => `S3A${year}${String(month).padStart(2, '0')}`

/** Valor total (todos os tipos de alojamento) de um mês, em Coimbra. */
async function monthValue(varcd: string, year: number, month: number): Promise<number | null> {
  const json = await getJson(`${INE_DATA}?op=2&varcd=${varcd}&Dim1=${dimCode(year, month)}&Dim2=${GEO}&lang=PT`)
  const dados = (json as { Dados?: Record<string, IneRow[]> }[] | null)?.[0]?.Dados
  if (!dados) return null

  // Confirmar a geografia: um filtro ignorado passaria outro território.
  const rows = (Object.values(dados)[0] ?? []).filter((r) => r.geocod === GEO)
  // A série traz o total por tipo de alojamento; somar os tipos duplicaria.
  const total =
    rows.find((r) => r.dim_3 === 'T') ??
    rows.find((r) => r.dim_3_t?.toLowerCase().startsWith('total')) ??
    (rows.length === 1 ? rows[0] : undefined)

  const n = Number(total?.valor)
  return total?.valor && Number.isFinite(n) ? n : null
}

async function getIndicator(varcd: string): Promise<MonthlyValue> {
  const meta = await getJson(`${INE_META}?varcd=${varcd}&lang=PT`)
  const period = (meta as { UltimoPeriodo?: string }[] | null)?.[0]?.UltimoPeriodo ?? null
  const parsed = period ? parsePeriod(period) : null
  if (!period || !parsed) return NONE

  const value = await monthValue(varcd, parsed.year, parsed.month)
  if (value === null) return NONE
  const previousYear = await monthValue(varcd, parsed.year - 1, parsed.month)
  return { value, period, previousYear }
}

/** O INE publica uma vez por mês: um dia de cache não esconde nada. */
const CACHE_MS = 24 * 60 * 60 * 1000
let lastGood: { payload: TurismoPayload; at: number } | null = null

export async function GET() {
  if (lastGood && Date.now() - lastGood.at < CACHE_MS) return Response.json(lastGood.payload)

  // Em série, de propósito — ver o comentário do topo.
  const dormidas = await getIndicator(INDICATORS.dormidas).catch(() => NONE)
  const proveitos = await getIndicator(INDICATORS.proveitos).catch(() => NONE)

  if (dormidas.value === null && proveitos.value === null) {
    return Response.json(
      lastGood?.payload ?? { dormidas: NONE, proveitos: NONE, meta: unavailable(SOURCE, 'O INE não respondeu.') },
    )
  }

  const payload: TurismoPayload = {
    dormidas,
    proveitos,
    meta: published(
      SOURCE,
      'INE',
      'Inquérito à permanência de hóspedes na hotelaria e outros alojamentos. Cada valor mostra o mês que a fonte devolve.',
    ),
  }
  lastGood = { payload, at: Date.now() }
  return Response.json(payload)
}
