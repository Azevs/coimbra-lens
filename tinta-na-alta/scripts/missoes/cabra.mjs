// A Cabra não toca: das Escadas Monumentais, pela Rua Larga e pela Porta Férrea, ao Pátio das Escolas e à Torre.

/** Centro do nível e meia largura/altura, em metros. */
export const CENTRO = { lat: 40.2076, lon: -8.42435 }
export const MEIO = [236, 105]
/** Nomes do OSM que se pedem mesmo sem outra etiqueta (e que o gerador lista no fim). */
export const NOMES = 'Porta Férrea|Via Latina|Paço das Escolas|Torre da Universidade|Rua Larga|Escadas Monumentais|Reitoria|Joanina|São Miguel|Dom Dinis|D. Dinis'
/** Linhas a mais na query Overpass, com `{bb}` no lugar da caixa. */
export const EXTRA = [
  'node["barrier"~"gate|sally_port"]({bb});',
  'way["man_made"="courtyard"]({bb});',
  'node["historic"]({bb});',
  'node["tourism"="artwork"]({bb});',
]
/** O que se vê ao longe das sineiras: a cidade até ao rio (só desenho). */
export const LONGE = { raio: 950 }
