import { published, type Sourced } from '@/lib/provenance'
import { TURISMO, type SerieTurismo } from '@/lib/turismo-coimbra'

/**
 * Turismo em Coimbra — os números da página /turismo.
 *
 * Duas origens, cada uma com o seu selo:
 *
 *   PORDATA — o Retrato do Município compara 2019 com 2024 (o último ano
 *   antes da pandemia com o último fechado). Não há API: os valores foram
 *   lidos dos dados dos gráficos da página, à mão, e ficam aqui declarados.
 *   A PORDATA compila do INE.
 *
 *   INE — séries do Inquérito à permanência de hóspedes, geradas por
 *   `scripts/build-turismo.mjs` para `lib/turismo-coimbra.ts`. O site nunca
 *   pede nada ao INE em tempo real; o gerador vai buscando as séries aos
 *   poucos e a página mostra o que já chegou.
 *
 * Um relatório em PDF com uma série 2015–2024 foi posto de parte: os anos
 * que a PORDATA não confirma têm todos contagens acabadas em zero, a estada
 * média de 2022 (1,18) contradiz a do próprio relatório, e o número de
 * hotéis não bate com o do INE. Nada daí entra no site.
 */

export const PORDATA_TURISMO_URL = 'https://retratos.pordata.pt/turismo/coimbra'

/** Valores de Coimbra no Retrato do Município, lidos a 22-09-2026. */
export const PORDATA_TURISMO = {
  /** A página indica "Dados atualizados até 31 de agosto 2025". */
  atualizadoAte: '2025-08-31',
  dormidas: { 2019: 709_504, 2024: 708_604 },
  /** Variação das dormidas 2019→2024, em %, tal como a PORDATA a calcula. */
  variacaoDormidas: { coimbra: -0.1, portugal: 14.5 },
  /** Turistas por dia, em média, e o seu peso na população residente (%). */
  turistasPorDia: 1_941,
  turistasPorDiaPct: 1.3,
  camas: { 2019: 4_109, 2024: 4_550 },
  /** Dormidas na hotelaria em 2024. AL e TER vêm como "dado confidencial". */
  dormidasHotelaria2024: 509_511,
  estadaMedia2024: { coimbra: 1.5, portugal: 2.5 },
  /** Percentagem das dormidas do ano feitas entre 1 de julho e 30 de setembro. */
  dormidasVerao: {
    coimbra: { 2019: 31.7, 2024: 31.4 },
    portugal: { 2019: 36.3, 2024: 34.9 },
  },
  /** Taxa de ocupação entre 1 de julho e 30 de setembro (%). */
  ocupacaoVerao: {
    coimbra: { 2019: 59.5, 2024: 53.2 },
    portugal: { 2019: 62.5, 2024: 61.9 },
  },
} as const

export const PORDATA_META: Sourced = published(
  'PORDATA · Retrato do Município',
  'Ano 2024',
  'Retrato do Município da PORDATA, que compila do INE. Compara 2024 com 2019, o último ano antes da pandemia.',
)

// ─── INE ─────────────────────────────────────────────────────────────────

/** Último ponto de uma série do INE, com o período que a fonte declara. */
export function ultimoPonto(serie: SerieTurismo | undefined) {
  return serie?.pontos.at(-1) ?? null
}

/**
 * Estabelecimentos por tipo, no último ano publicado. Os códigos são os da
 * dimensão "Tipo (alojamento turístico)" do INE: 01 hotelaria, 0101 hotéis,
 * 0102 hotéis-apartamentos, 02 alojamento local, 03 turismo no espaço rural
 * e de habitação; as estrelas são subcódigos dos hotéis (0101xx) e dos
 * hotéis-apartamentos (0102xx).
 */
export function estabelecimentos() {
  const ponto = ultimoPonto(TURISMO.estabelecimentos)
  if (!ponto) return null
  const v = ponto.v
  const estrelas = [1, 2, 3, 4, 5].map((n) => {
    const hoteis = v[`01011${n}`] ?? null
    const apart = v[`01021${n}`] ?? null
    // Soma só o que o INE publica; um null não conta como zero.
    const partes = [hoteis, apart].filter((x): x is number => x !== null)
    return { estrelas: n, total: partes.length ? partes.reduce((a, b) => a + b, 0) : null, apart }
  })
  return {
    ano: ponto.p,
    total: v.T ?? null,
    hotelaria: v['01'] ?? null,
    hoteis: v['0101'] ?? null,
    hoteisApartamentos: v['0102'] ?? null,
    alojamentoLocal: v['02'] ?? null,
    turismoRural: v['03'] ?? null,
    estrelas,
  }
}

export function ineMeta(serie: SerieTurismo | undefined): Sourced {
  const ponto = ultimoPonto(serie)
  return published(
    'INE',
    ponto ? `Ano ${ponto.p}` : 'INE',
    'Inquérito à permanência de hóspedes na hotelaria e outros alojamentos.',
  )
}

/** Séries que a secção de evolução precisa para desenhar alguma coisa. */
export function evolucaoDisponivel() {
  const anual = TURISMO.dormidas?.pontos.length ?? 0
  const mensal = TURISMO.dormidasMes?.pontos.length ?? 0
  return { anual, mensal, pronta: anual >= 3 || mensal >= 12 }
}

export { TURISMO }
