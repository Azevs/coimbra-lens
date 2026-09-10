import type { Metadata } from 'next'
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
  return {
    title: `${z.zona.nome} · Zonas urbanas`,
    description: `A ${z.zona.nome} em maqueta tridimensional: ${z.resumo}`,
  }
}

export default async function ZonaUrbanaPage({ params }: Props) {
  const z = textoDe((await params).zona)
  if (!z) notFound()

  return (
    <>
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
