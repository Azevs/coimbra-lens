import Navbar from '@/components/navigation/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import ClimateSection from '@/components/sections/ClimateSection'
import CityOverview from '@/components/sections/CityOverview'
import EventsSection from '@/components/sections/EventsSection'
import MobilityFlow from '@/components/sections/MobilityFlow'
import AcademicPulse from '@/components/sections/AcademicPulse'
import RealEstate from '@/components/sections/RealEstate'
import SiteFooter from '@/components/navigation/SiteFooter'
// O mapa de trânsito fica fora do servidor; tudo o resto é renderizado nele.
// O mapa das freguesias e o ranking mudaram-se para /territorio, e a agenda
// cultural para /agenda — cada área tem página própria desde que o site
// deixou de ser só dados.
import { TrafficMap } from '@/components/map/LazyMaps'

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
        <TrafficMap />
        <CityOverview />
        <EventsSection />
        <MobilityFlow />
        <AcademicPulse />
        <RealEstate />
      </main>
      <SiteFooter />
    </>
  )
}
