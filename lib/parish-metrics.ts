import { COIMBRA_PARISHES, PARISHES_TOTAL_POPULATION, type Parish } from './parishes'
import { PARISH_SHAPES, type ParishShape } from './parish-map'
import { CENSUS_MUNICIPALITY, CENSUS_PARISHES, type ParishCensus } from './parish-census'

/**
 * O cruzamento das metades do Território: a população dos Censos, que vive
 * em `parishes.ts`; a forma e a área da carta oficial, em `parish-map.ts`;
 * e os Censos por subsecção somados por freguesia, em `parish-census.ts`.
 * O DICOFRE é a chave.
 *
 * A densidade nasce aqui: é a divisão de um número do INE por uma área da
 * DGT. A variação, o índice de envelhecimento e a parte das casas sem
 * residentes são contas feitas sobre contagens do INE, pela definição que
 * o próprio INE usa — não são terceiras fontes.
 */
export interface ParishRow extends Parish {
  /** Ausente se a carta não trouxer esta freguesia; o mapa salta-a. */
  shape: ParishShape | null
  /** Área oficial da carta, km². */
  areaKm2: number | null
  /** Habitantes por km². Calculada, não publicada. */
  density: number | null
  /** Quota da população do município, em percentagem. */
  share: number
  /** Posição por população; 1 é a mais populosa. */
  rank: number
  census: ParishCensus | null
  /** Variação da população entre 2011 e 2021, em percentagem. */
  change: number | null
  /** Residentes com 65 ou mais anos por cada 100 com menos de 15. */
  ageing: number | null
  ageing2011: number | null
  /** Alojamentos clássicos sem residentes — vagos ou de uso ocasional — em percentagem. */
  withoutResidents: number | null
}

/** As contas sobre as contagens, iguais para uma freguesia e para o concelho. */
export function censusRates(c: ParishCensus) {
  return {
    change: (c.populacao / c.populacao2011 - 1) * 100,
    ageing: (c.idades[3] / c.idades[0]) * 100,
    ageing2011: (c.idosos2011 / c.jovens2011) * 100,
    withoutResidents:
      (c.alojamentosSemResidentes / (c.alojamentosHabituais + c.alojamentosSemResidentes)) * 100,
  }
}

const SHAPES = new Map(PARISH_SHAPES.map((s) => [s.code, s]))

const byPopulation = [...COIMBRA_PARISHES].sort((a, b) => b.population - a.population)

export const PARISH_ROWS: ParishRow[] = COIMBRA_PARISHES.map((parish) => {
  const shape = SHAPES.get(parish.code) ?? null
  const census = CENSUS_PARISHES[parish.code] ?? null
  const rates = census ? censusRates(census) : null
  return {
    ...parish,
    shape,
    areaKm2: shape?.areaKm2 ?? null,
    density: shape ? parish.population / shape.areaKm2 : null,
    share: (parish.population / PARISHES_TOTAL_POPULATION) * 100,
    rank: byPopulation.findIndex((p) => p.code === parish.code) + 1,
    census,
    change: rates?.change ?? null,
    ageing: rates?.ageing ?? null,
    ageing2011: rates?.ageing2011 ?? null,
    withoutResidents: rates?.withoutResidents ?? null,
  }
})

/**
 * As freguesias que a carta traz — na prática, todas. O tipo estreitado
 * poupa uma asserção por cada uso da forma dentro do mapa, e faz o
 * compilador garantir aquilo que o filtro promete.
 */
export type ShapedParishRow = ParishRow & {
  shape: ParishShape
  areaKm2: number
  density: number
}

export const SHAPED_PARISH_ROWS: ShapedParishRow[] = PARISH_ROWS.filter(
  (row): row is ShapedParishRow => row.shape !== null,
)

/** O município como um todo, para o estado de repouso do painel. */
export const MUNICIPALITY = {
  parishes: PARISH_ROWS.length,
  population: PARISHES_TOTAL_POPULATION,
  areaKm2: PARISH_ROWS.reduce((sum, r) => sum + (r.areaKm2 ?? 0), 0),
  get density(): number {
    return this.population / this.areaKm2
  },
  census: CENSUS_MUNICIPALITY,
  ...censusRates(CENSUS_MUNICIPALITY),
}

export type MetricId = 'populacao' | 'densidade' | 'variacao' | 'envelhecimento' | 'semResidentes'

export interface Metric {
  id: MetricId
  /** Nome no selector. */
  label: string
  /** Unidade, para a legenda e para o painel. */
  unit: string
  /** Cabeçalho curto da coluna na tabela. */
  column: string
  /**
   * Os quatro cortes entre as cinco classes.
   *
   * São números redondos escolhidos à vista da distribuição, e não
   * quantis. Um quantil dá cinco classes com o mesmo número de freguesias
   * dentro, o que é arrumado e engana: faz o corte parecer natural quando
   * é só uma consequência de haver dezoito. Números redondos dizem ao
   * leitor onde estão os degraus, e a legenda mostra-os.
   */
  breaks: number[]
  /**
   * `map` é a rampa sequencial, do papel à tinta: mais escuro é mais.
   * `div` é a divergente, para o que pode ser perda ou ganho: barro para
   * baixo de zero, azul para cima, e nenhum degrau neutro — uma freguesia
   * que perdeu 2% perdeu, e não deve ficar da cor do papel.
   */
  ramp: 'map' | 'div'
  value: (row: ParishRow) => number | null
  format: (value: number) => string
  /** Os números dos degraus na legenda, sem as casas decimais do valor. */
  tick: (value: number) => string
}

const int = (v: number) => Math.round(v).toLocaleString('pt-PT')
const pct = (v: number) =>
  `${v.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`
/** Com sinal: uma variação sem "+" lê-se como um nível, não como uma mudança. */
export const signedPct = (v: number) =>
  `${v > 0 ? '+' : v < 0 ? '−' : ''}${pct(Math.abs(v))}`

export const METRICS: Record<MetricId, Metric> = {
  populacao: {
    id: 'populacao',
    label: 'População',
    unit: 'habitantes',
    column: 'Habitantes',
    breaks: [2000, 4000, 10000, 20000],
    ramp: 'map',
    value: (row) => row.population,
    format: int,
    tick: int,
  },
  densidade: {
    id: 'densidade',
    label: 'Densidade',
    unit: 'hab./km²',
    column: 'hab./km²',
    breaks: [150, 250, 500, 1000],
    ramp: 'map',
    value: (row) => row.density,
    format: int,
    tick: int,
  },
  variacao: {
    id: 'variacao',
    label: '2011→2021',
    unit: '% de população',
    column: '2011–21',
    breaks: [-10, -5, 0, 5],
    ramp: 'div',
    value: (row) => row.change,
    format: signedPct,
    tick: (v) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : '0'),
  },
  envelhecimento: {
    id: 'envelhecimento',
    label: 'Envelhecimento',
    unit: 'idosos por 100 jovens',
    column: 'Idosos/100',
    breaks: [180, 220, 260, 300],
    ramp: 'map',
    value: (row) => row.ageing,
    format: int,
    tick: int,
  },
  semResidentes: {
    id: 'semResidentes',
    label: 'Casas sem residentes',
    unit: '% dos alojamentos',
    column: '% s/ resid.',
    breaks: [20, 25, 30, 40],
    ramp: 'map',
    value: (row) => row.withoutResidents,
    format: pct,
    tick: int,
  },
}

export const METRIC_ORDER: MetricId[] = [
  'populacao',
  'densidade',
  'variacao',
  'envelhecimento',
  'semResidentes',
]

/** Número de classes da rampa. Tem de bater certo com os tokens --map-N e --div-N. */
export const CLASS_COUNT = 5

/** Índice da classe (0 a 4) de um valor; `null` quando não há valor. */
export function metricClass(metric: Metric, value: number | null): number | null {
  if (value === null) return null
  return metric.breaks.filter((b) => value >= b).length
}

/** Cor de preenchimento de uma classe. `null` fica sem cor de dado. */
export function classFill(index: number | null, ramp: Metric['ramp'] = 'map'): string {
  return index === null ? 'var(--bg-sunken)' : `var(--${ramp}-${index + 1})`
}

/** A cor de um valor na rampa da sua grandeza. */
export function metricFill(metric: Metric, value: number | null): string {
  return classFill(metricClass(metric, value), metric.ramp)
}

/**
 * As classes que não aceitam texto a tinta por cima: o nome passa a papel,
 * com o halo invertido. Na rampa sequencial são as duas mais escuras; na
 * divergente, as duas pontas.
 */
export function classIsDark(index: number | null, ramp: Metric['ramp'] = 'map'): boolean {
  if (index === null) return false
  return ramp === 'div' ? index === 0 || index === 4 : index >= 3
}

/** O valor da grandeza para o concelho inteiro, pela mesma conta. */
export function municipalValue(metric: Metric): number {
  switch (metric.id) {
    case 'populacao':
      return MUNICIPALITY.population
    case 'densidade':
      return MUNICIPALITY.density
    case 'variacao':
      return MUNICIPALITY.change
    case 'envelhecimento':
      return MUNICIPALITY.ageing
    case 'semResidentes':
      return MUNICIPALITY.withoutResidents
  }
}

/** Área em km², com a vírgula decimal portuguesa. */
export function formatArea(km2: number): string {
  return km2.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
