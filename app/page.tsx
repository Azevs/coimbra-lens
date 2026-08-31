import Navbar from '@/components/navigation/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import ClimateSection from '@/components/sections/ClimateSection'
import CityOverview from '@/components/sections/CityOverview'
import EventsSection from '@/components/sections/EventsSection'
import CultureSection from '@/components/sections/CultureSection'
import MobilityFlow from '@/components/sections/MobilityFlow'
import AcademicPulse from '@/components/sections/AcademicPulse'
import RealEstate from '@/components/sections/RealEstate'
import ParishRanking from '@/components/sections/ParishRanking'
import SiteFooter from '@/components/navigation/SiteFooter'
// Os dois mapas ficam fora do servidor; tudo o resto é renderizado nele.
import { CoimbraMap, TrafficMap } from '@/components/map/LazyMaps'


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
        <CultureSection />
        <MobilityFlow />
        <CoimbraMap />
        <AcademicPulse />
        <RealEstate />
        <ParishRanking />
      </main>
      <SiteFooter />
    </>
  )
}
