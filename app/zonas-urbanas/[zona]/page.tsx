import type { Metadata } from 'next'
import { ldPagina, pagina } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SeletorZonas from '@/components/urbano/SeletorZonas'
import ZonaUrbana from '@/components/urbano/ZonaUrbana'
import { ZONAS_URBANAS, textoDe } from '@/lib/urban-zones-textos'

type Props = { params: Promise<{ zona: string }> }

/** Só as zonas modeladas existem; qualquer outro endereço é 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return ZONAS_URBANAS.map(({ zona }) => ({ zona: zona.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const z = textoDe((await params).zona)
  if (!z) return {}
  return pagina({
    caminho: `zonas-urbanas/${z.zona.id}`,
    titulo: `${z.zona.nome}, Coimbra, em maqueta 3D`,
    tituloSocial: `${z.zona.nome} em maqueta`,
    descricao: `A ${z.zona.nome} em maqueta tridimensional: ${z.resumo}`,
  })
}

export default async function ZonaUrbanaPage({ params }: Props) {
  const z = textoDe((await params).zona)
  if (!z) notFound()

  return (
    <>
      <JsonLd
        dados={ldPagina([
          { nome: 'Zonas urbanas', caminho: 'zonas-urbanas' },
          { nome: z.zona.nome, caminho: `zonas-urbanas/${z.zona.id}` },
        ])}
      />
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        <SeletorZonas atual={z.zona.id} />
        <ZonaUrbana z={z} />
      </main>

      <SiteFooter />
    </>
  )
}
