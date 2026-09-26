import { cartao } from '@/lib/og/cartao'
import { arteTurismo } from '@/lib/og/artes'
import { PORDATA_TURISMO } from '@/lib/turismo'
import { fmt } from '@/lib/format'

export const alt = 'Estada média dos turistas em 2024: Coimbra comparada com Portugal'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default function Imagem() {
  const e = PORDATA_TURISMO.estadaMedia2024
  return cartao({
    rotulo: 'Turismo',
    titulo: 'Uma noite',
    italico: 'e meia',
    texto: `Quem dorme em Coimbra fica, em média, ${fmt(e.coimbra, 1)} noites. No resto do país, ${fmt(e.portugal, 1)}.`,
    arte: arteTurismo(e, 2024),
  })
}
