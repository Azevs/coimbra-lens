import { cartao } from '@/lib/og/cartao'
import { arteImagem } from '@/lib/og/artes'

export const alt = 'Pedro e Inês em desenho animado, à luz da lua, junto a uma fonte'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  return cartao({
    rotulo: 'Lendas',
    titulo: 'As lendas',
    italico: 'de Coimbra',
    texto: 'Em desenho animado, separando o que é história do que é lenda. Primeiro episódio: Pedro e Inês.',
    arte: await arteImagem('video/lendas/pedro-ines-cartaz.jpg', { recorte: { left: 440, top: 44, width: 1000, height: 985 } }),
  })
}
