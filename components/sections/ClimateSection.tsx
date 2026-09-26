'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import { useIpma } from '@/hooks/useIpma'
import WeatherModule from './WeatherModule'
import AirQualityModule from './AirQualityModule'
import DayBand from './DayBand'
import WeekRange from './WeekRange'
import RiverModule from './RiverModule'
import WaterQualityModule from './WaterQualityModule'
import IpmaModule from './IpmaModule'

export default function ClimateSection() {
  const { data: ipma } = useIpma()
  // Com um aviso em vigor, os avisos passam para o topo: é a única coisa
  // aqui que pede uma decisão. Sem avisos, abre a faixa do dia.
  const alerta = ipma !== undefined && ipma.maxLevel !== 'green'

  return (
    <SectionReveal id="clima">
      <SectionTitle
        label="HOJE"
        title="O tempo, o ar e o rio"
        subtitle="As próximas 24 horas, a semana que aí vem, os avisos do dia e a leitura desta hora em detalhe."
      />

      {alerta && (
        <div style={{ marginBottom: '2.5rem' }}>
          <IpmaModule />
        </div>
      )}

      <DayBand />

      <div className="grid-semana">
        <WeekRange />
        {!alerta && <IpmaModule />}
      </div>

      {/* O detalhe por trás dos sinais do hero, sem repetir o número grande de cada um. */}
      <div className="grid-modules">
        <WeatherModule />
        <AirQualityModule />
        <WaterQualityModule />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <RiverModule />
      </div>
    </SectionReveal>
  )
}
