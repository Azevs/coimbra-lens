import { cartao } from '@/lib/og/cartao'
import { arteImagem } from '@/lib/og/artes'

export const alt = 'A colina de Coimbra à noite, em desenho, com a lua a nascer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  return cartao({
    rotulo: 'Sobre',
    titulo: 'Um painel',
    italico: 'da cidade',
    texto: 'O que é o CoimbraLens e as regras que segue.',
    arte: await arteImagem('video/coimbra-poster.jpg', { recorte: { left: 1120, top: 330, width: 800, height: 750 } }),
    escuro: true,
  })
}
