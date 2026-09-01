'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
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
  tone,
  emphasis = false,
}: {
  label: string
  value: number | null | undefined
  year: string | null | undefined
  note: string
  tone: string
  emphasis?: boolean
}) {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-panel)',
        borderLeft: emphasis ? `2px solid ${tone}` : '1px solid var(--border-panel)',
        borderRadius: '4px',
        padding: '1.5rem',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          display: 'block',
          marginBottom: '0.75rem',
        }}
      >
        {label}
      </span>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: emphasis ? '2.5rem' : '1.75rem',
            fontWeight: 700,
            lineHeight: 1,
            color: tone,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value != null ? value.toLocaleString('pt-PT') : '—'}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>€/m²</span>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '0.625rem', lineHeight: 1.55 }}>
        {note}
      </p>

      <span
        style={{
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-jetbrains)',
          marginTop: '0.5rem',
          display: 'block',
        }}
      >
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
          <div className="grid-cards" style={{ marginBottom: '1rem' }}>
            <PriceCard
              label="Casas usadas"
              value={data.saleExisting.value}
              year={data.saleExisting.year}
              note="Preço mediano de venda de habitação familiar já existente."
              tone="var(--tone-amber-text)"
              emphasis
            />
            <PriceCard
              label="Casas novas"
              value={data.saleNew.value}
              year={data.saleNew.year}
              note="Preço mediano de venda de habitação familiar nova."
              tone="var(--tone-clay-text)"
              emphasis
            />
          </div>

          <div className="grid-cards">
            <PriceCard
              label="Avaliação bancária"
              value={data.bankValuation.value}
              year={data.bankValuation.year}
              note="Valor mediano de avaliação bancária. É o que os bancos consideram, não o que se paga."
              tone="var(--tone-blue-text)"
            />
            <GlassCard>
              <span
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                Como ler estes números
              </span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
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
