'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import WeatherModule from './WeatherModule'
import AirQualityModule from './AirQualityModule'
import ForecastPanel from './ForecastPanel'
import RiverModule from './RiverModule'
import WaterQualityModule from './WaterQualityModule'
import IpmaModule from './IpmaModule'

export default function ClimateSection() {
  return (
    <SectionReveal id="clima">
      <SectionTitle
        label="AMBIENTE"
        title="Clima & Qualidade do Ar"
        subtitle="Clima, ar e avisos em directo. Água e caudal do rio a partir de fontes publicadas."
      />

      {/* Os avisos vêm primeiro: é a única coisa aqui que pede uma decisão. */}
      <div style={{ marginBottom: '1.5rem' }}>
        <IpmaModule />
      </div>

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
