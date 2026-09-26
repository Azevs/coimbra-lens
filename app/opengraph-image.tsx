import { cartao } from '@/lib/og/cartao'
import { arteInicio } from '@/lib/og/artes'
import { MUNICIPALITY } from '@/lib/parish-metrics'

export const alt = 'CoimbraLens — mapa das freguesias do concelho de Coimbra, com o Mondego'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default function Imagem() {
  return cartao({
    rotulo: 'Coimbra · dados abertos',
    titulo: 'A cidade,',
    italico: 'agora',
    texto: `O tempo, o ar e o Mondego em directo, e as ${MUNICIPALITY.parishes} freguesias em mapa e em número.`,
    arte: arteInicio(),
  })
}
