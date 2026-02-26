'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/navigation/Navbar'

const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false })
const CoimbraMap = dynamic(() => import('@/components/map/CoimbraMap'), { ssr: false })
const AcademicPulse = dynamic(() => import('@/components/sections/AcademicPulse'), { ssr: false })
const RealEstate = dynamic(() => import('@/components/sections/RealEstate'), { ssr: false })
const MobilityFlow = dynamic(() => import('@/components/sections/MobilityFlow'), { ssr: false })
const ClimateSection = dynamic(() => import('@/components/sections/ClimateSection'), { ssr: false })
const EventsSection = dynamic(() => import('@/components/sections/EventsSection'), { ssr: false })
const ParishRanking = dynamic(() => import('@/components/sections/ParishRanking'), { ssr: false })
const TrafficMap = dynamic(() => import('@/components/sections/TrafficMap'), { ssr: false })
const CityOverview = dynamic(() => import('@/components/sections/CityOverview'), { ssr: false })
const CultureSection = dynamic(() => import('@/components/sections/CultureSection'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] overflow-x-hidden">
      <Navbar />
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
      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p className="font-display" style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>
            Coimbra<span style={{ color: 'var(--accent-gold)' }}>Lens</span>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            A cidade em dados · {new Date().getFullYear()}
          </p>
          <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', marginTop: '1rem', opacity: 0.6 }}>
            Dados de referência 2024. Fontes:{' '}
            <a href="https://www.open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>Open-Meteo</a>
            {' · '}
            <a href="https://openaq.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>OpenAQ</a>
            {' · INE · CAOP · UC · '}
            <a href="https://www.transit.land/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>Transitland (Termos)</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
