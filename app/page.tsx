import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import ClimateSection from '@/components/sections/ClimateSection'
import CityOverview from '@/components/sections/CityOverview'
import EventsSection from '@/components/sections/EventsSection'
import RealEstate from '@/components/sections/RealEstate'
import Explorar from '@/components/sections/Explorar'
import SiteFooter from '@/components/navigation/SiteFooter'
// Os mapas ficam fora do servidor; tudo o resto é renderizado nele.
// O mapa das freguesias e o ranking mudaram-se para /territorio, e a agenda
// cultural para /agenda — cada área tem página própria desde que o site
// deixou de ser só dados.
import { MetrobusAerial, TrafficMap } from '@/components/map/LazyMaps'
import { leiturasIniciais } from '@/lib/leituras'

/** O título, a descrição e o Open Graph vêm do layout; aqui só o endereço canónico. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * O herói abre com as leituras feitas no servidor, e a página refaz-se de
 * cinco em cinco minutos — o ritmo a que a rota do tempo se renova.
 */
export const revalidate = 300

/**
 * A ordem é a de quem abre a página: primeiro o agora (o herói), depois o
 * dia em detalhe, a cidade a mexer — os dois mapas, juntos —, o que está
 * marcado, os números do município e, no fim, as portas para o resto.
 *
 * Os Transportes e a Universidade saíram daqui enquanto não tiverem dados:
 * eram duas secções só de estados vazios na montra. O que falta está dito
 * em /sobre, com o porquê.
 */
export default async function Home() {
  const inicial = await leiturasIniciais()
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
        <HeroSection inicial={inicial} />
        <ClimateSection />
        <MetrobusAerial />
        <TrafficMap />
        <EventsSection />
        <CityOverview />
        <RealEstate />
        <Explorar />
      </main>
      <SiteFooter />
    </>
  )
}
