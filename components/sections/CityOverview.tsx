'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import Icon, { type IconName } from '@/components/ui/Icon'
import DataSource from '@/components/ui/DataSource'
import { useDemografia } from '@/hooks/useDemografia'
import { usePordata } from '@/hooks/usePordata'
import { MUNICIPIO } from '@/lib/municipio'
import { CITY_FACTS, CITY_STATS, type ReferenceValue } from '@/lib/reference-data'

/**
 * Cartão de indicador. O período do valor aparece ao lado da fonte, sempre —
 * um número sem data envelhece em silêncio, que é como este painel tinha
 * "Capital Europeia da Cultura candidata 2027" muito depois de o título ter
 * sido atribuído.
 *
 * É uma coluna aberta por um filete, como todos os outros blocos do site:
 * a caixa com fundo e borda que aqui estava era o terceiro sistema de
 * blocos numa página que só devia ter um.
 */
const NATIONALITY_TONES = [
  'var(--tone-moss)',
  'var(--tone-muted)',
  'var(--tone-clay)',
  'var(--tone-amber)',
  'var(--tone-blue)',
  'var(--tone-violet)',
]

/** Ícone de cada facto rápido, pela ordem de `CITY_FACTS`. */
const FACT_ICONS: IconName[] = ['hospital', 'bus', 'train', 'river', 'graduation', 'landmark']

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
    <div className="stat-card">
      <span aria-hidden="true" style={{ position: 'absolute', top: '-1px', left: 0, width: '2.5rem', height: '2px', background: tone }} />
      <Label style={{ marginBottom: '0.625rem' }}>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span className="stat-value" style={{ color: value === '—' ? 'var(--text-tertiary)' : undefined }}>{value}</span>
        <span className="stat-unit">{unit}</span>
      </div>
      <span className="ui-mono" style={{ display: 'block', marginTop: '0.5rem' }}>
        {source} · {asOf}
      </span>
    </div>
  )
}

/**
 * Indicadores municipais em directo.
 *
 * Duas fontes, escolhidas por quem publica mais cedo: a PORDATA tem a
 * população com ano de referência 2025, a API do INE ainda serve 2023; o
 * INE tem os estrangeiros por nacionalidade, que a PORDATA não expõe.
 * Cada cartão mostra o ano do seu próprio valor, não um ano comum.
 */
function LiveIndicators() {
  const { data: ine } = useDemografia()
  const { data: pd } = usePordata()

  // A PORDATA primeiro quando tem o valor; o INE cobre o que ela não traz.
  const population = pd?.population.value != null ? pd.population : ine?.population
  const density = pd?.density.value != null ? pd.density : ine?.density
  const income = ine?.income.value != null ? ine.income : pd?.income

  const cards: {
    label: string
    value: string | undefined
    unit: string
    source: string
    year: string | null | undefined
    fallbackNote?: string
    tone: string
  }[] = [
    {
      label: 'População residente',
      value: population?.value?.toLocaleString('pt-PT'),
      unit: 'hab.',
      source: pd?.population.value != null ? 'PORDATA' : 'INE',
      year: population?.year,
      tone: 'var(--tone-teal)',
    },
    {
      label: 'Área do município',
      value: MUNICIPIO.areaKm2.toLocaleString('pt-PT'),
      unit: 'km²',
      source: MUNICIPIO.areaSource,
      year: MUNICIPIO.areaYear,
      tone: 'var(--tone-blue)',
    },
    {
      label: 'Densidade populacional',
      value: density?.value?.toLocaleString('pt-PT'),
      unit: 'hab/km²',
      source: pd?.density.value != null ? 'PORDATA' : 'INE',
      year: density?.year,
      tone: 'var(--tone-amber)',
    },
    {
      label: 'Residentes estrangeiros',
      value: ine?.foreigners.value?.toLocaleString('pt-PT'),
      unit: 'pessoas',
      source: 'INE',
      year: ine?.foreigners.year,
      // Só o INE desagrega estrangeiros por município; a PORDATA não o traz.
      fallbackNote: ine ? 'fonte sem resposta' : undefined,
      tone: 'var(--tone-violet)',
    },
    {
      label: 'Ganho médio mensal',
      value: income?.value?.toLocaleString('pt-PT', { maximumFractionDigits: 0 }),
      unit: '€/mês',
      source: ine?.income.value != null ? 'INE · MTSSS' : 'PORDATA',
      year: income?.year,
      tone: 'var(--tone-clay)',
    },
    {
      label: 'Saldo migratório',
      value: pd?.migrationBalance != null ? `+${pd.migrationBalance.toLocaleString('pt-PT')}` : undefined,
      unit: 'desde 2021',
      source: 'PORDATA',
      year: pd?.population.year,
      tone: 'var(--tone-moss)',
    },
    {
      label: 'Alunos matriculados',
      value: pd?.students.value?.toLocaleString('pt-PT'),
      unit: 'até ao secundário',
      source: 'PORDATA',
      year: pd?.students.year,
      tone: 'var(--tone-slate)',
    },
    {
      label: 'Preço mediano de venda',
      value: pd?.saleExisting.value?.toLocaleString('pt-PT'),
      unit: '€/m² usadas',
      source: 'PORDATA',
      year: pd?.saleExisting.year,
      tone: 'var(--tone-rose)',
    },
  ]

  return (
    <>
      {cards.map((c) => (
        <StatCard
          key={c.label}
          label={c.label}
          value={c.value ?? '—'}
          unit={c.unit}
          source={c.source}
          asOf={c.year ?? c.fallbackNote ?? 'a obter'}
          tone={c.tone}
        />
      ))}
    </>
  )
}

export default function CityOverview() {
  const { data: demo } = useDemografia()
  const { data: pd } = usePordata()

  return (
    <SectionReveal id="cidade-overview">
      <SectionTitle
        label="COIMBRA EM NÚMEROS"
        title="Retrato da Cidade"
        subtitle="Indicadores do município. Cada número mostra a fonte e o período a que se refere."
      />

      <div className="grid-stats" style={{ marginBottom: '2rem', columnGap: '2rem', rowGap: '1.5rem' }}>
        <LiveIndicators />
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

      <div style={{ marginBottom: '2rem', marginTop: '-1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {pd && <DataSource meta={pd.meta} />}
        {demo && <DataSource meta={demo.meta} />}
      </div>

      <div className="grid-split">
        <GlassCard>
          <Label style={{ marginBottom: '1rem' }}>Residentes estrangeiros — nacionalidades</Label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {(demo?.nationalities ?? []).slice(0, 6).map((n, i) => (
              <div key={n.country}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', gap: '1rem' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {n.country}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontFamily: 'var(--font-jetbrains)',
                      color: NATIONALITY_TONES[i % NATIONALITY_TONES.length],
                      fontVariantNumeric: 'tabular-nums',
                      flexShrink: 0,
                    }}
                  >
                    {n.count.toLocaleString('pt-PT')} · {n.pct}%
                  </span>
                </div>
                <div style={{ height: '4px', background: 'var(--bg-sunken)', borderRadius: '2px' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${n.pct}%`,
                      borderRadius: '2px',
                      background: NATIONALITY_TONES[i % NATIONALITY_TONES.length],
                      transition: 'width 1s ease',
                    }}
                  />
                </div>
              </div>
            ))}
            {!demo && <span className="ui-note">A obter do INE…</span>}
          </div>

          {demo && <DataSource meta={demo.meta} showNote={false} />}
        </GlassCard>

        <GlassCard>
          <Label style={{ marginBottom: '0.5rem' }}>Factos rápidos</Label>

          <div className="ruled-list">
            {CITY_FACTS.map((f, i) => (
              <div key={f.text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Icon name={FACT_ICONS[i] ?? 'landmark'} size={16} style={{ color: 'var(--accent-text)', marginTop: '3px' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
