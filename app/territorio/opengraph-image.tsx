import { cartao } from '@/lib/og/cartao'
import { arteTerritorio } from '@/lib/og/artes'

export const alt = 'Mapa das freguesias de Coimbra pintadas pela densidade populacional'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default function Imagem() {
  return cartao({
    rotulo: 'Território',
    titulo: 'Dezoito',
    italico: 'freguesias',
    texto: 'Onde vive a população do município, freguesia a freguesia, em mapa e em número.',
    arte: arteTerritorio(),
  })
}
