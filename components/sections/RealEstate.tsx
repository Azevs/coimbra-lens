'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { usePordata } from '@/hooks/usePordata'

/**
 * Esta secção mostrava seis zonas de Coimbra com preços por m² e um cursor
 * de 2014 a 2024. Nada disso era medido: os preços saíam de um modelo de
 * juro composto a partir de bases inventadas, e as zonas não correspondem
 * a nenhuma unidade estatística publicada.
 *
 * A PORDATA publica o preço mediano de venda e o valor mediano de
 * avaliação bancária do município. É menos granular — não há quebra por
 * zona — mas é medido.
 */

function PriceCard({
  label,
  value,
  year,
  note,
  emphasis = false,
}: {
  label: string
  value: number | null | undefined
  year: string | null | undefined
  note: string
  emphasis?: boolean
}) {
  return (
    <div className={`stat-card ${emphasis ? 'stat-card-emphasis' : ''}`} style={{ padding: '1.25rem 0 0.5rem' }}>
      <Label style={{ marginBottom: '0.75rem' }}>{label}</Label>

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span className="stat-value" style={{ color: value == null ? 'var(--text-tertiary)' : undefined }}>
          {value != null ? value.toLocaleString('pt-PT') : '—'}
        </span>
        <span className="stat-unit">€/m²</span>
      </div>

      <p className="ui-note" style={{ marginTop: '0.625rem', maxWidth: '38ch' }}>{note}</p>

      <span className="ui-mono" style={{ display: 'block', marginTop: '0.5rem' }}>
        PORDATA · {year ?? 'a obter'}
      </span>
    </div>
  )
}

export default function RealEstate() {
  const { data, isLoading } = usePordata()

  return (
    <SectionReveal id="imobiliario">
      <SectionTitle
        label="MERCADO IMOBILIÁRIO"
        title="Preços da Habitação"
        subtitle="Valores medianos do município. Não há quebra por zona publicada — o que existe é o concelho inteiro."
      />

      {isLoading || !data ? (
        <div className="grid-stats">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ height: '160px', background: 'var(--bg-sunken)', borderRadius: '4px' }} />
          ))}
        </div>
      ) : data.saleExisting.value === null && data.bankValuation.value === null ? (
        <GlassCard>
          <DataUnavailable meta={data.meta} />
          <DataSource meta={data.meta} showNote={false} />
        </GlassCard>
      ) : (
        <>
          <div className="grid-cards" style={{ marginBottom: '1.5rem', columnGap: '2rem' }}>
            <PriceCard
              label="Casas usadas"
              value={data.saleExisting.value}
              year={data.saleExisting.year}
              note="Preço mediano de venda de habitação familiar já existente."
              emphasis
            />
            <PriceCard
              label="Casas novas"
              value={data.saleNew.value}
              year={data.saleNew.year}
              note="Preço mediano de venda de habitação familiar nova."
              emphasis
            />
          </div>

          <div className="grid-cards" style={{ columnGap: '2rem' }}>
            <PriceCard
              label="Avaliação bancária"
              value={data.bankValuation.value}
              year={data.bankValuation.year}
              note="Valor mediano de avaliação bancária. É o que os bancos consideram, não o que se paga."
            />
            <GlassCard>
              <Label style={{ marginBottom: '0.75rem' }}>Como ler estes números</Label>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                São medianas do concelho de Coimbra: metade das transacções ficou acima, metade
                abaixo. A Baixa e a Alta não aparecem separadas porque não existe estatística
                pública de preço por zona da cidade — só por município.
              </p>
            </GlassCard>
          </div>

          <DataSource meta={data.meta} />
        </>
      )}
    </SectionReveal>
  )
}
