import { cartao } from '@/lib/og/cartao'
import { arteTrilhos } from '@/lib/og/artes'
import { TOTAL_KM, TRILHOS } from '@/lib/trilhos'
import { fmt } from '@/lib/format'

export const alt = 'Mapa da Região de Coimbra com os percursos pedestres traçados'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  return cartao({
    rotulo: 'Trilhos',
    titulo: 'Da serra',
    italico: 'ao mar',
    texto: `${TRILHOS.length} percursos a pé na Região de Coimbra, ${fmt(TOTAL_KM)} quilómetros de caminho.`,
    arte: await arteTrilhos(),
  })
}
