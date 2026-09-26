// Becos da Baixa: da Praça 8 de Maio, pelos becos a poente da Rua Ferreira Borges, ao Largo da Portagem e ao rio.

/** Centro do nível e meia largura/altura, em metros. */
export const CENTRO = { lat: 40.20911, lon: -8.43017 }
export const MEIO = [118, 240]
/** Nomes do OSM que se pedem mesmo sem outra etiqueta (e que o gerador lista no fim). */
export const NOMES = 'Santa Cruz|Praça 8 de Maio|Portagem|Mendonça|Mondego'
/** Linhas a mais na query Overpass, com `{bb}` no lugar da caixa. */
export const EXTRA = [
  'node["barrier"~"gate"]({bb});',
  'nwr["natural"="water"]({bb});',
  'nwr["waterway"="riverbank"]({bb});',
]
/** O rio dentro do nível (recortado à caixa). */
export const AGUA = true
/**
 * Os becos da Baixa: onde uma via pedonal com nome atravessa a pegada de um
 * edifício do OSM, recorta-se a pegada ao longo da via (largura da etiqueta
 * `width`, ou esta por omissão). Nas passagens cobertas fica o andar de cima.
 */
export const RECORTES = {
  largura: 1.8,
  // A Torre de Almedina e a Barbacã: a missão desenha-as como portas da cerca (arco e túnel).
  excepto: ['way/246397825', 'way/1165517467'],
}
