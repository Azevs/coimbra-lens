/**
 * As 18 freguesias de Coimbra, com a população dos Censos 2021 do INE.
 *
 * A lista anterior estava errada de duas maneiras. Listava Almedina, Santa
 * Cruz, Sé Nova e São Bartolomeu como freguesias separadas, quando desde a
 * reorganização de 2013 são uma única união. E os números eram inventados:
 * somavam 125 380 habitantes num município de 140 816, e os 18 rendimentos
 * eram todos múltiplos de 10, com apenas 13 valores distintos.
 *
 * O rendimento por freguesia não é publicado — por isso deixou de existir
 * aqui. As coordenadas também: eram centros aproximados, escritos à mão
 * para pousar um marcador. Quem diz onde fica cada freguesia é agora a
 * carta oficial, em `parish-map.ts`, e o DICOFRE é o que liga as duas.
 */
export interface Parish {
  /** Código DICOFRE do INE. */
  code: string
  name: string
  /** Nome curto, para etiquetas e listas estreitas. */
  short: string
  /**
   * O nome como cabe no mapa, já partido em linhas.
   *
   * Partir por programa dava sempre um mau resultado num nome como "União
   * das freguesias de São Martinho de Árvore e Lamarosa": a quebra certa
   * depende do sentido, não da contagem de caracteres. São dezoito nomes,
   * partem-se uma vez.
   */
  mapLabel: string[]
  population: number
}

/** Ano dos Censos a que a população se refere. */
export const PARISH_CENSUS_YEAR = '2021'

/**
 * Os Censos são decenais. Dizer isto ao leitor distingue "o site está
 * desactualizado" de "é este o detalhe que existe publicado em Portugal".
 */
export const NEXT_CENSUS = '2031'

export const COIMBRA_PARISHES: Parish[] = [
  { code: '060318', name: 'Santo António dos Olivais', short: 'Santo António dos Olivais', mapLabel: ['Santo António', 'dos Olivais'], population: 41150 },
  { code: '060335', name: 'União das freguesias de Eiras e São Paulo de Frades', short: 'Eiras e S. Paulo de Frades', mapLabel: ['Eiras e S. Paulo', 'de Frades'], population: 17574 },
  { code: '060338', name: 'União das freguesias de São Martinho do Bispo e Ribeira de Frades', short: 'S. Martinho do Bispo', mapLabel: ['S. Martinho do Bispo', 'e Ribeira de Frades'], population: 15315 },
  { code: '060334', name: 'União das freguesias de Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)', short: 'Coimbra (centro histórico)', mapLabel: ['Coimbra'], population: 13880 },
  { code: '060336', name: 'União das freguesias de Santa Clara e Castelo Viegas', short: 'Santa Clara e Castelo Viegas', mapLabel: ['Santa Clara e', 'Castelo Viegas'], population: 11858 },
  { code: '060333', name: 'União das freguesias de Assafarge e Antanhol', short: 'Assafarge e Antanhol', mapLabel: ['Assafarge', 'e Antanhol'], population: 4993 },
  { code: '060339', name: 'União das freguesias de Souselas e Botão', short: 'Souselas e Botão', mapLabel: ['Souselas', 'e Botão'], population: 4188 },
  { code: '060340', name: 'União das freguesias de Taveiro, Ameal e Arzila', short: 'Taveiro, Ameal e Arzila', mapLabel: ['Taveiro, Ameal', 'e Arzila'], population: 3997 },
  { code: '060312', name: 'Cernache', short: 'Cernache', mapLabel: ['Cernache'], population: 3962 },
  { code: '060341', name: 'União das freguesias de Trouxemil e Torre de Vilela', short: 'Trouxemil e Torre de Vilela', mapLabel: ['Trouxemil e', 'Torre de Vilela'], population: 3659 },
  { code: '060311', name: 'Ceira', short: 'Ceira', mapLabel: ['Ceira'], population: 3244 },
  { code: '060301', name: 'Almalaguês', short: 'Almalaguês', mapLabel: ['Almalaguês'], population: 2853 },
  { code: '060332', name: 'União das freguesias de Antuzede e Vil de Matos', short: 'Antuzede e Vil de Matos', mapLabel: ['Antuzede e', 'Vil de Matos'], population: 2842 },
  { code: '060324', name: 'São Silvestre', short: 'São Silvestre', mapLabel: ['São Silvestre'], population: 2794 },
  { code: '060337', name: 'União das freguesias de São Martinho de Árvore e Lamarosa', short: 'S. Martinho de Árvore', mapLabel: ['S. Martinho de Árvore', 'e Lamarosa'], population: 2716 },
  { code: '060329', name: 'Torres do Mondego', short: 'Torres do Mondego', mapLabel: ['Torres', 'do Mondego'], population: 2034 },
  { code: '060309', name: 'Brasfemes', short: 'Brasfemes', mapLabel: ['Brasfemes'], population: 1932 },
  { code: '060320', name: 'São João do Campo', short: 'São João do Campo', mapLabel: ['São João', 'do Campo'], population: 1825 },
]

/** População residente do município, somada das 18 freguesias. */
export const PARISHES_TOTAL_POPULATION = COIMBRA_PARISHES.reduce(
  (sum, p) => sum + p.population,
  0,
)
