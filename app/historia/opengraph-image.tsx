import { cartao } from '@/lib/og/cartao'
import { arteHistoria } from '@/lib/og/artes'

export const alt = 'Planta do centro de Coimbra com o criptopórtico romano de Aeminium destacado'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default function Imagem() {
  return cartao({
    rotulo: 'História',
    titulo: 'Aeminium',
    italico: 'a Coimbra romana',
    texto: 'O chão que os romanos construíram para o fórum ainda lá está, por baixo de um museu.',
    arte: arteHistoria(),
  })
}
