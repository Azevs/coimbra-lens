import { cartao } from '@/lib/og/cartao'
import { arteMaquetas } from '@/lib/og/artes'
import { ZONAS_URBANAS, textoDe } from '@/lib/urban-zones-textos'

export const alt = 'Maqueta tridimensional de uma zona urbana de Coimbra'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export function generateStaticParams() {
  return ZONAS_URBANAS.map(({ zona }) => ({ zona: zona.id }))
}

export default async function Imagem({ params }: { params: Promise<{ zona: string }> }) {
  const z = textoDe((await params).zona)!
  return cartao({
    rotulo: 'Zonas urbanas',
    titulo: z.zona.nome,
    italico: 'em maqueta',
    texto: z.resumo,
    arte: await arteMaquetas([`maquetas/${z.zona.id}-conjunto.webp`]),
  })
}
