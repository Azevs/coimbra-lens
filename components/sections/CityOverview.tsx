'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import DataSource from '@/components/ui/DataSource'
import { useDemografia } from '@/hooks/useDemografia'
import { CITY_FACTS, CITY_STATS, NATIONALITIES, type ReferenceValue } from '@/lib/reference-data'
import { estimate } from '@/lib/provenance'

/**
 * Cartão de indicador. O período do valor aparece ao lado da fonte, sempre —
 * um número sem data envelhece em silêncio, que é como este painel tinha
 * "Capital Europeia da Cultura candidata 2027" muito depois de o título ter
 * sido atribuído.
 */
function StatCard({
  label,
  value,
  unit,
  source,
  asOf,
  tone,
}: {
  label: string
  value: string
  unit: string
  source: string
  asOf: string
  tone: string
}) {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-panel)',
        borderRadius: '4px',
        padding: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: tone, opacity: 0.75 }} />

      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          display: 'block',
          marginBottom: '0.625rem',
        }}
      >
        {label}
      </span>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '1.5rem',
            color: tone,
            fontWeight: 700,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{unit}</span>
      </div>

      <span
        style={{
          fontSize: '10px',
          color: 'var(--text-tertiary)',
          marginTop: '0.5rem',
          display: 'block',
          fontFamily: 'var(--font-jetbrains)',
        }}
      >
        {source} · {asOf}
      </span>
    </div>
  )
}

/** Indicadores obtidos do INE em directo, com o ano que a fonte devolver. */
function LiveDemographics() {
  const { data } = useDemografia()

  if (!data || data.population === null) {
    return (
      <>
        <StatCard
          label="População residente"
          value="—"
          unit="hab."
          source="INE"
          asOf="a obter"
          tone="var(--tone-teal)"
        />
        <StatCard
          label="Densidade populacional"
          value="—"
          unit="hab/km²"
          source="INE / CAOP"
          asOf="a obter"
          tone="var(--tone-amber)"
        />
      </>
    )
  }

  return (
    <>
      <StatCard
        label="População residente"
        value={data.population.toLocaleString('pt-PT')}
        unit="hab."
        source="INE"
        asOf={data.year ?? '—'}
        tone="var(--tone-teal)"
      />
      <StatCard
        label="Área do município"
        value={data.areaKm2.toLocaleString('pt-PT')}
        unit="km²"
        source="DGT · CAOP"
        asOf="2024"
        tone="var(--tone-blue)"
      />
      <StatCard
        label="Densidade populacional"
        value={String(data.density)}
        unit="hab/km²"
        source="INE / CAOP"
        asOf={data.year ?? '—'}
        tone="var(--tone-amber)"
      />
    </>
  )
}

const NATIONALITIES_META = estimate(
  `${NATIONALITIES.source} · ${NATIONALITIES.asOf}`,
  'Distribuição percentual dos residentes estrangeiros no município.',
  `${NATIONALITIES.asOf}-12-31T12:00:00`,
)

export default function CityOverview() {
  const { data: demo } = useDemografia()

  return (
    <SectionReveal id="cidade-overview">
      <SectionTitle
        label="COIMBRA EM NÚMEROS"
        title="Retrato da Cidade"
        subtitle="Indicadores do município. Cada número mostra a fonte e o período a que se refere."
      />

      <div className="grid-stats" style={{ marginBottom: '2rem' }}>
        <LiveDemographics />
        {CITY_STATS.map((s: ReferenceValue) => (
          <StatCard
            key={s.id}
            label={s.label}
            value={s.value}
            unit={s.unit}
            source={s.source}
            asOf={s.asOf}
            tone={s.tone}
          />
        ))}
      </div>

      {demo && demo.meta.provenance !== 'unavailable' && (
        <div style={{ marginBottom: '2rem', marginTop: '-1rem' }}>
          <DataSource meta={demo.meta} />
        </div>
      )}

      <div className="grid-split">
        <GlassCard>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Residentes estrangeiros — top nacionalidades
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {NATIONALITIES.rows.map((n) => (
              <div key={n.country}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{n.country}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: n.color,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {n.pct}%
                  </span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-sunken)', borderRadius: '2px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${n.pct}%`,
                      borderRadius: '2px',
                      background: n.color,
                      transition: 'width 1s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <DataSource meta={NATIONALITIES_META} />
        </GlassCard>

        <GlassCard>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Factos rápidos
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {CITY_FACTS.map((f) => (
              <div key={f.text} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <span aria-hidden="true" style={{ fontSize: '15px', flexShrink: 0, lineHeight: 1.4 }}>
                  {f.icon}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
