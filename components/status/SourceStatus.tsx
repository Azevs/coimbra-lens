'use client'

import { useWeather } from '@/hooks/useWeather'
import { useForecast } from '@/hooks/useForecast'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useIpma } from '@/hooks/useIpma'
import { useRiver } from '@/hooks/useRiver'
import { useWaterQuality } from '@/hooks/useWaterQuality'
import { useDemografia } from '@/hooks/useDemografia'
import { usePordata } from '@/hooks/usePordata'
import { useEvents } from '@/hooks/useEvents'
import { useObras } from '@/hooks/useObras'
import { useTransport } from '@/hooks/useTransport'
import { useUCNews } from '@/hooks/useUCNews'
import { live, type Provenance, type Sourced } from '@/lib/provenance'
import { colorMix } from '@/lib/color'

/**
 * Estado das fontes — o painel de saúde do próprio painel.
 *
 * A proveniência já aparece no rodapé de cada módulo, mas obriga a
 * percorrer a página inteira para saber o que está de pé. Aqui está tudo
 * numa linha: quantas fontes respondem, quais são estimativa e quais
 * caíram, com um salto directo para a secção de cada uma.
 *
 * Não faz pedidos novos: usa os mesmos hooks dos módulos, e o React Query
 * serve a resposta já em cache pela mesma queryKey.
 */

interface SourceRow {
  label: string
  meta: Sourced | undefined
  href: string
}

const STATE: Record<Provenance, { label: string; color: string; filled: boolean }> = {
  live: { label: 'em directo', color: 'var(--tone-teal-text)', filled: true },
  estimate: { label: 'estimativa', color: 'var(--tone-amber-text)', filled: true },
  // O ponto vazado distingue "sem dados" por forma, e não só por cor —
  // cinzento e âmbar são próximos de mais para se fiar só no tom.
  unavailable: { label: 'indisponível', color: 'var(--text-tertiary)', filled: false },
}

/** Ponto de estado: cheio quando há dados, vazado quando não há. */
function StatusDot({ provenance }: { provenance: Provenance }) {
  const s = STATE[provenance]
  return (
    <span
      aria-hidden="true"
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        flexShrink: 0,
        background: s.filled ? s.color : 'transparent',
        border: s.filled ? 'none' : `1.5px solid ${s.color}`,
        boxShadow: s.filled ? `0 0 6px ${colorMix(s.color, 45)}` : 'none',
      }}
    />
  )
}

function SourceChip({ row }: { row: SourceRow }) {
  const provenance = row.meta?.provenance
  const s = provenance ? STATE[provenance] : null

  return (
    <a
      href={row.href}
      title={row.meta ? `${row.label} · ${s?.label} · ${row.meta.source}` : `${row.label} · a carregar`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        padding: '6px 11px',
        borderRadius: '3px',
        textDecoration: 'none',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-panel)',
        transition: 'border-color 0.15s, background 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        e.currentTarget.style.background = 'var(--bg-raised)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-panel)'
        e.currentTarget.style.background = 'var(--bg-secondary)'
      }}
    >
      {provenance ? (
        <StatusDot provenance={provenance} />
      ) : (
        <span
          aria-hidden="true"
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            flexShrink: 0,
            border: '1.5px dotted var(--text-tertiary)',
          }}
        />
      )}
      <span
        style={{
          fontFamily: 'var(--font-ibm-plex)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          whiteSpace: 'nowrap',
        }}
      >
        {row.label}
      </span>
      <span className="sr-only">{s?.label ?? 'a carregar'}</span>
    </a>
  )
}

/** Contagem por estado, à frente do detalhe. */
function Tally({ rows }: { rows: SourceRow[] }) {
  const counts: Record<Provenance, number> = { live: 0, estimate: 0, unavailable: 0 }
  let pending = 0
  for (const r of rows) {
    if (r.meta) counts[r.meta.provenance]++
    else pending++
  }

  const order: Provenance[] = ['live', 'estimate', 'unavailable']

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
      {order.map((p) => (
        <span key={p} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '1.5rem',
              fontWeight: 700,
              lineHeight: 1,
              color: STATE[p].color,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {counts[p]}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ibm-plex)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {STATE[p].label}
          </span>
        </span>
      ))}
      {pending > 0 && (
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-ibm-plex)' }}>
          {pending} a carregar
        </span>
      )}
    </div>
  )
}

export default function SourceStatus() {
  // Mesmas queryKeys dos módulos: o React Query devolve a cache partilhada.
  const weather = useWeather().data?.meta
  const forecast = useForecast().data?.meta
  const air = useAirQuality().data?.meta
  const ipma = useIpma().data?.meta
  const river = useRiver().data?.meta
  const water = useWaterQuality().data?.meta
  const ine = useDemografia().data?.meta
  const pordata = usePordata().data?.meta
  const events = useEvents().data?.meta
  const obras = useObras().data?.meta
  const transport = useTransport().data?.meta
  const news = useUCNews().data?.meta

  const rows: SourceRow[] = [
    { label: 'Clima', meta: weather, href: '#clima' },
    { label: 'Previsão', meta: forecast, href: '#clima' },
    { label: 'Qualidade do ar', meta: air, href: '#clima' },
    { label: 'Avisos IPMA', meta: ipma, href: '#clima' },
    { label: 'Rio Mondego', meta: river, href: '#clima' },
    { label: 'Água da torneira', meta: water, href: '#clima' },
    // O Mapbox Traffic não passa por um hook — os tiles são a própria fonte.
    { label: 'Trânsito', meta: live('Mapbox Traffic'), href: '#transito' },
    { label: 'PORDATA', meta: pordata, href: '#cidade-overview' },
    { label: 'Indicadores INE', meta: ine, href: '#cidade-overview' },
    { label: 'Eventos', meta: events, href: '#cidade' },
    { label: 'Obras', meta: obras, href: '#cidade' },
    { label: 'Autocarros', meta: transport, href: '#mobilidade' },
    { label: 'Notícias UC', meta: news, href: '#academico' },
  ]

  return (
    <section id="fontes" className="page-section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="section-container">
        <div
          style={{
            background: 'var(--bg-sunken)',
            border: '1px solid var(--border-panel)',
            borderLeft: '2px solid var(--accent)',
            borderRadius: '4px',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.25rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-ibm-plex)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              Estado das fontes
            </h2>
            <Tally rows={rows} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {rows.map((r) => (
              <SourceChip key={r.label} row={r} />
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-ibm-plex)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              marginTop: '1.25rem',
              lineHeight: 1.6,
              maxWidth: '64ch',
            }}
          >
            Cada módulo diz se o valor é uma medição obtida agora, uma estimativa publicada, ou se a
            fonte não respondeu. Nenhum número é preenchido quando não há dados.
          </p>
        </div>
      </div>
    </section>
  )
}
