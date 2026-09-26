import { cartao } from '@/lib/og/cartao'
import { arteMaquetas } from '@/lib/og/artes'
import { ZONAS_URBANAS } from '@/lib/urban-zones-textos'

export const alt = 'Maquetas tridimensionais das zonas urbanas de Coimbra'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  const nomes = ZONAS_URBANAS.map(({ zona }) => zona.nome)
  const lista = nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes.at(-1)}` : nomes[0]
  return cartao({
    rotulo: 'Zonas urbanas',
    titulo: 'A cidade',
    italico: 'em maqueta',
    texto: `${lista} em três dimensões, edifício a edifício.`,
    arte: await arteMaquetas(ZONAS_URBANAS.map(({ zona }) => `maquetas/${zona.id}-conjunto.webp`)),
  })
}
