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
      <footer style={{
        borderTop: '1px solid var(--border-panel)',
        background: 'var(--bg-sunken)',
        padding: '3rem 4rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
            }}>
              Coimbra<span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>Lens</span>
            </p>
            <p style={{ fontFamily: 'var(--font-ibm-plex)', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 300 }}>
              A cidade em dados · {new Date().getFullYear()}
            </p>
          </div>
          <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '9px', color: 'var(--text-tertiary)', letterSpacing: '0.06em', lineHeight: 1.8, maxWidth: '480px', textAlign: 'right' }}>
            FONTES:{' '}
            <a href="https://www.open-meteo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Open-Meteo</a>
            {' · '}
            <a href="https://openaq.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>OpenAQ</a>
            {' · INE · CAOP · UC · SNIRH · AIMA · '}
            <a href="https://www.transit.land/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Transitland</a>
            {' · Mapbox'}
          </p>
        </div>
      </footer>
    </main>
  )
}
