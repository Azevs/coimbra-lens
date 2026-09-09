import { COIMBRA_PARISHES, PARISHES_TOTAL_POPULATION, type Parish } from './parishes'
import { PARISH_SHAPES, type ParishShape } from './parish-map'

/**
 * O cruzamento das duas metades do Território: a população dos Censos, que
 * vive em `parishes.ts`, e a forma e a área da carta oficial, que vivem em
 * `parish-map.ts`. O DICOFRE é a chave.
 *
 * A densidade nasce aqui, e é a única grandeza desta página que não vem
 * publicada: é a divisão de um número do INE por uma área da DGT. Está
 * assinalada como tal no selo do módulo — não é uma terceira fonte.
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
}

const SHAPES = new Map(PARISH_SHAPES.map((s) => [s.code, s]))

const byPopulation = [...COIMBRA_PARISHES].sort((a, b) => b.population - a.population)

export const PARISH_ROWS: ParishRow[] = COIMBRA_PARISHES.map((parish) => {
  const shape = SHAPES.get(parish.code) ?? null
  return {
    ...parish,
    shape,
    areaKm2: shape?.areaKm2 ?? null,
    density: shape ? parish.population / shape.areaKm2 : null,
    share: (parish.population / PARISHES_TOTAL_POPULATION) * 100,
    rank: byPopulation.findIndex((p) => p.code === parish.code) + 1,
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
  get density() {
    return this.population / this.areaKm2
  },
}

export type MetricId = 'populacao' | 'densidade'

export interface Metric {
  id: MetricId
  /** Nome no selector. */
  label: string
  /** Unidade, para a legenda e para o painel. */
  unit: string
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
  value: (row: ParishRow) => number | null
  format: (value: number) => string
}

const int = (v: number) => Math.round(v).toLocaleString('pt-PT')

export const METRICS: Record<MetricId, Metric> = {
  populacao: {
    id: 'populacao',
    label: 'População',
    unit: 'habitantes',
    breaks: [2000, 4000, 10000, 20000],
    value: (row) => row.population,
    format: int,
  },
  densidade: {
    id: 'densidade',
    label: 'Densidade',
    unit: 'hab./km²',
    breaks: [150, 250, 500, 1000],
    value: (row) => row.density,
    format: int,
  },
}

export const METRIC_ORDER: MetricId[] = ['populacao', 'densidade']

/** Número de classes da rampa. Tem de bater certo com os tokens --map-N. */
export const CLASS_COUNT = 5

/** Índice da classe (0 a 4) de um valor; `null` quando não há valor. */
export function metricClass(metric: Metric, value: number | null): number | null {
  if (value === null) return null
  return metric.breaks.filter((b) => value >= b).length
}

/** Cor de preenchimento de uma classe. `null` fica sem cor de dado. */
export function classFill(index: number | null): string {
  return index === null ? 'var(--bg-sunken)' : `var(--map-${index + 1})`
}

/**
 * As duas classes mais escuras não aceitam texto a tinta por cima: o nome
 * passa a papel, com o halo invertido.
 */
export function classIsDark(index: number | null): boolean {
  return index !== null && index >= 3
}

/** Área em km², com a vírgula decimal portuguesa. */
export function formatArea(km2: number): string {
  return km2.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
