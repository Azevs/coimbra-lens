import { cartao } from '@/lib/og/cartao'
import { arteMaqueta } from '@/lib/og/artes'

export const alt = 'Maqueta tridimensional da Sé Velha de Coimbra e das ruas à sua volta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Imagem() {
  return cartao({
    rotulo: 'Visitar',
    titulo: 'Subir à Alta,',
    italico: 'descer ao rio',
    texto: 'Um dia em Coimbra a pé, lugar a lugar, com a Sé Velha, Santa Cruz e o Paço das Escolas em 3D.',
    arte: await arteMaqueta('maquetas/se-velha-conjunto-rico.webp', 720, 450, 110),
  })
}
