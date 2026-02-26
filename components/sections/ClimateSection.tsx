'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import WeatherModule from './WeatherModule'
import AirQualityModule from './AirQualityModule'
import ForecastPanel from './ForecastPanel'
import RiverModule from './RiverModule'
import WaterQualityModule from './WaterQualityModule'

export default function ClimateSection() {
  return (
    <SectionReveal id="clima">
      <SectionTitle
        label="AMBIENTE"
        title="Clima & Qualidade do Ar"
        subtitle="Dados meteorológicos e ambientais de Coimbra em tempo real."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <WeatherModule />
        <AirQualityModule />
        <WaterQualityModule />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem', alignItems: 'start' }}>
        <ForecastPanel />
        <RiverModule />
      </div>
    </SectionReveal>
  )
}
