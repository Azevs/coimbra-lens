import type { Metadata } from 'next'
import { ldMigalhas, pagina } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import PalcoTrilhos from '@/components/trilhos/PalcoTrilhos'
import ListaTrilhos from '@/components/trilhos/ListaTrilhos'
import RedeGuia from '@/components/trilhos/RedeGuia'

export const metadata: Metadata = pagina({
  caminho: 'trilhos',
  titulo: 'Trilhos e percursos pedestres da Região de Coimbra',
  tituloSocial: 'Trilhos da Região de Coimbra, da serra ao mar',
  descricao:
    'Os percursos pedestres da Região de Coimbra numa carta em relevo: pequenas e grandes rotas da serra ao mar, ' +
    'com extensão, perfil de altitude e, quando existe, a ficha oficial com duração e dificuldade.',
})

/**
 * Sem o ticker de dados por cima: a carta ocupa o ecrã logo abaixo da
 * barra, e uma tira de números da cidade entre as duas era ruído.
 */
export default function TrilhosPage() {
  return (
    <>
      <JsonLd dados={ldMigalhas([{ nome: 'Trilhos', caminho: 'trilhos' }])} />
      <a href="#mapa" className="skip-link">
        Saltar para a carta
      </a>
      <Navbar />
      <main id="conteudo" style={{ background: 'var(--bg-primary)' }}>
        <PalcoTrilhos />
        <ListaTrilhos />
        <RedeGuia />
      </main>
      <SiteFooter />
    </>
  )
}
