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
        subtitle="Clima e ar em directo. Água e caudal do rio a partir de fontes publicadas."
      />
      <div className="grid-modules">
        <WeatherModule />
        <AirQualityModule />
        <WaterQualityModule />
        <RiverModule />
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <ForecastPanel />
      </div>
    </SectionReveal>
  )
}
