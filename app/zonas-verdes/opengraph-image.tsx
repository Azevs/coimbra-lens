import { cartao } from '@/lib/og/cartao'
import { arteZonasVerdes } from '@/lib/og/artes'

export const alt = 'Mapa em relevo do centro de Coimbra com as matas, parques e jardins a verde'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  return cartao({
    rotulo: 'Zonas verdes',
    titulo: 'Onde a cidade',
    italico: 'respira',
    texto: 'As matas, os parques e os jardins de Coimbra, a área de cada um e a distância a que ficam do centro.',
    arte: await arteZonasVerdes(),
  })
}
