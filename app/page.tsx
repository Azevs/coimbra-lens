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

/** O título, a descrição e o Open Graph vêm do layout; aqui só o endereço canónico. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/**
 * A ordem é a de quem abre a página: primeiro o agora (o herói), depois o
 * dia em detalhe, a cidade a mexer — os dois mapas, juntos —, o que está
 * marcado, os números do município e, no fim, as portas para o resto.
 *
 * Os Transportes e a Universidade saíram daqui enquanto não tiverem dados:
 * eram duas secções só de estados vazios na montra. O que falta está dito
 * em /sobre, com o porquê.
 */
export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo" className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
        <HeroSection />
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
