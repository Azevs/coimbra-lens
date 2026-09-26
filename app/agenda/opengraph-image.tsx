import { cartao } from '@/lib/og/cartao'
import { arteAgenda } from '@/lib/og/artes'

export const alt = 'Agenda de Coimbra — o ano em doze meses, com as festas que voltam todos os anos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default function Imagem() {
  return cartao({
    rotulo: 'Agenda',
    titulo: 'O que há',
    italico: 'para fazer',
    texto: 'O que está marcado em Coimbra este mês, dia a dia, e as festas que voltam todos os anos.',
    arte: arteAgenda(),
  })
}
