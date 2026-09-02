'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'
import type { Sourced } from '@/lib/provenance'
import { fmt, fmtSigned } from '@/lib/format'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver, type RiverPoint, type RiverTrend } from '@/hooks/useRiver'
import { useForecast } from '@/hooks/useForecast'
import Label from '@/components/ui/Label'
import CityScore from './CityScore'

/**
 * Primeira página.
 *
 * A manchete é a frase do dia, montada com as leituras desta hora. A marca
 * já está na barra; repeti-la a 150px gastava o melhor espaço da página a
 * dizer o que a barra diz. Ao lado, o boletim aprofunda as mesmas leituras.
 */

const TREND_ARROW = { rising: '↑', falling: '↓', stable: '→' } as const

function qualidadeDoAr(eaqi: number): string {
  if (eaqi <= 20) return 'ar bom'
  if (eaqi <= 40) return 'ar razoável'
  if (eaqi <= 60) return 'ar médio'
  if (eaqi <= 80) return 'ar fraco'
  return 'ar mau'
}

function alturaDoDia(hora: number): string {
  if (hora < 7) return 'antes do nascer do sol'
  if (hora < 12) return 'a meio da manhã'
  if (hora < 15) return 'à hora de almoço'
  if (hora < 20) return 'a meio da tarde'
  return 'já de noite'
}

/**
 * A manchete do dia.
 *
 * Cada oração entra só se a leitura correspondente chegou: com o rio em
 * silêncio, a frase encolhe em vez de arredondar. Sem leitura nenhuma
 * devolve null — e a página mostra um marcador neutro, não uma afirmação.
 */
function manchete(
  temperatura: number | null | undefined,
  eaqi: number | null | undefined,
  rio: RiverTrend | undefined,
  temCaudal: boolean,
): string | null {
  const oracoes: string[] = []

  if (eaqi != null) oracoes.push(qualidadeDoAr(eaqi))
  if (temCaudal && rio) {
    oracoes.push(
      rio === 'rising' ? 'Mondego a subir' : rio === 'falling' ? 'Mondego a descer' : 'Mondego estável',
    )
  }
  if (temperatura != null) {
    oracoes.push(`${Math.round(temperatura)} graus ${alturaDoDia(new Date().getHours())}`)
  }

  if (oracoes.length === 0) return null

  const frase =
    oracoes.length === 1
      ? oracoes[0]
      : `${oracoes.slice(0, -1).join(', ')} e ${oracoes[oracoes.length - 1]}`

  return `${frase.charAt(0).toUpperCase()}${frase.slice(1)}.`
}

/** Variação do caudal entre a leitura mais antiga da série e a de hoje. */
function variacaoDoCaudal(serie: RiverPoint[] | undefined): number | null {
  if (!serie || serie.length === 0) return null
  const passado = serie.filter((p) => !p.forecast)
  if (passado.length < 2) return null
  const inicio = passado[0].discharge
  const fim = passado[passado.length - 1].discharge
  if (!inicio) return null
  return Math.round(((fim - inicio) / inicio) * 100)
}

/** Um número de apoio da manchete. Sem valor, mostra o traço. */
function Apoio({ label, value, unit }: { label: string; value: string | null; unit?: string }) {
  return (
    <div>
      <Label tone="tertiary" style={{ marginBottom: '0.5rem' }}>{label}</Label>
      <div
        className="font-display"
        style={{ fontSize: '2.125rem', lineHeight: 1, color: value === null ? 'var(--text-tertiary)' : 'var(--text-primary)' }}
      >
        {value ?? '—'}
        {value !== null && unit && (
          <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>{unit}</span>
        )}
      </div>
    </div>
  )
}

/**
 * Rodapé de uma leitura: quem publica e há quanto tempo mediu.
 *
 * O boletim tem três fontes diferentes numa coluna estreita, onde os selos
 * do <DataSource> não cabem — mas a regra é a mesma: nenhum número aparece
 * sem dizer de onde vem.
 */
function sourceNote(meta: Sourced | undefined): string {
  if (!meta) return 'sem leitura'
  if (meta.provenance === 'unavailable') return meta.note ?? 'fonte sem resposta'
  if (!meta.observedAt) return meta.source
  const mins = Math.round((Date.now() - new Date(meta.observedAt).getTime()) / 60000)
  const quando = mins < 1 ? 'agora' : mins < 60 ? `há ${mins} min` : `há ${Math.round(mins / 60)} h`
  return `${meta.source} · ${quando}`
}

/**
 * Sparkline com dados a sério.
 *
 * As três linhas do boletim eram strings de pontos fixas — um desenho ao
 * lado de um número em directo, que se lia como dado. Agora cada linha é
 * a série que o resto da página também usa; sem série, não há linha.
 * `splitAt` marca onde acaba o medido e começa o previsto.
 */
function Spark({ values, splitAt, tone, title }: { values: number[]; splitAt?: number; tone: string; title: string }) {
  const W = 120
  const H = 46
  const pad = 3
  if (values.length < 2) {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} aria-hidden="true" style={{ flexShrink: 0 }}>
        <line x1="0" y1={H / 2} x2={W - 2} y2={H / 2} stroke="var(--border-panel)" strokeWidth="1.4" strokeDasharray="3 5" />
      </svg>
    )
  }
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * (W - pad * 2) + pad,
    H - pad - ((v - min) / range) * (H - pad * 2),
  ])
  const toPath = (slice: number[][]) => slice.map(([x, y]) => `${x},${y}`).join(' ')
  const cut = splitAt != null && splitAt > 0 && splitAt < pts.length ? splitAt : pts.length
  const past = pts.slice(0, cut)
  const future = pts.slice(cut - 1)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={title} style={{ flexShrink: 0 }}>
      <polyline points={toPath(past)} fill="none" stroke={tone} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {future.length > 1 && (
        <polyline points={toPath(future)} fill="none" stroke={tone} strokeWidth="1.2" strokeDasharray="2.5 3" opacity="0.7" strokeLinejoin="round" />
      )}
    </svg>
  )
}

/** Uma linha do boletim. Sem leitura, mostra o traço — nunca um número. */
function Reading({
  label,
  value,
  unit,
  note,
  suffix,
  spark,
  sparkSplit,
  sparkTitle,
  tone,
}: {
  label: string
  value: string | null
  unit?: string
  note: string
  suffix?: string
  spark: number[]
  sparkSplit?: number
  sparkTitle: string
  tone: string
}) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border-panel)',
        padding: '0.9375rem 0',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div>
        <Label tone="tertiary" style={{ marginBottom: '0.4375rem' }}>{label}</Label>
        <div
          className="font-display"
          style={{ fontSize: '2.875rem', lineHeight: 0.9, color: value === null ? 'var(--text-tertiary)' : 'var(--text-primary)' }}
        >
          {value ?? '—'}
          {value !== null && unit && (
            <span style={{ fontSize: '1.0625rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>{unit}</span>
          )}
          {value !== null && suffix && (
            <span style={{ fontSize: '1.25rem', color: tone, marginLeft: '0.375rem' }}>{suffix}</span>
          )}
        </div>
        <div className="ui-mono" style={{ marginTop: '0.5rem' }}>{note}</div>
      </div>
      {value === null ? <Spark values={[]} tone={tone} title="" /> : <Spark values={spark} splitAt={sparkSplit} tone={tone} title={sparkTitle} />}
    </div>
  )
}

export default function HeroSection() {
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const { data: river } = useRiver()
  const { data: forecast } = useForecast()

  const kicker = useRef<HTMLDivElement>(null)
  const headline = useRef<HTMLHeadingElement>(null)
  const columns = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sem animação, o herói fica no estado de repouso — visível. Animar a
    // partir de opacity 0 sem esta guarda deixa o título invisível sempre
    // que o requestAnimationFrame não corre (separador em segundo plano).
    if (!canAnimate()) return

    const nodes = [kicker.current, headline.current, columns.current]
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(kicker.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo(headline.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo(columns.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')

    return () => {
      tl.kill()
      gsap.set(nodes, { clearProps: 'opacity,transform' })
    }
  }, [])

  const year = new Date().getFullYear()
  const hoje = forecast?.daily?.[0]
  const variacao = variacaoDoCaudal(river?.series)
  const lead = manchete(weather?.temperature, air?.aqi, river?.trend, river?.discharge != null)

  // Séries reais para os sparklines. A temperatura é a das próximas 24 h
  // (a única série horária que existe); o caudal tem 7 dias medidos e 7
  // previstos; o ar não tem série publicada, e a linha fica em branco.
  const tempSeries = forecast?.hourly?.map((h) => h.temp) ?? []
  const riverSeries = river?.series?.map((p) => p.discharge) ?? []
  const riverSplit = river?.series?.findIndex((p) => p.forecast) ?? -1

  return (
    <div className="hero-content">
      {/* Cabeçalho da edição */}
      <div
        ref={kicker}
        className="hero-kicker"
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--accent-text)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <span>Observatório civil de Coimbra</span>
        <span>40.2033° N · 8.4103° W · {year}</span>
      </div>

      <div style={{ height: '3px', background: 'var(--text-primary)' }} />

      {/* A manchete do dia — muda com as leituras da hora */}
      <h1 ref={headline} className={`hero-headline ${lead === null ? 'hero-headline-pending' : ''}`}>
        {lead ?? 'A ler a cidade…'}
      </h1>

      {/* Duas colunas de primeira página */}
      <div ref={columns} className="hero-columns">
        <div className="hero-lead">
          <p className="hero-lead-line">
            O que a cidade regista nesta hora: o ar que se respira, o caudal do Mondego e a temperatura, com o
            dia que aí vem. Cada leitura diz há quanto tempo foi medida.
          </p>

          <div className="hero-lead-support">
            <Apoio label="Máxima hoje" value={hoje?.maxTemp != null ? fmt(hoje.maxTemp, 1) : null} unit="°C" />
            <Apoio label="Mínima hoje" value={hoje?.minTemp != null ? fmt(hoje.minTemp, 1) : null} unit="°C" />
            <Apoio label="Caudal face a há 7 dias" value={variacao != null ? fmtSigned(variacao) : null} unit="%" />
          </div>
        </div>

        {/* Boletim */}
        <div className="hero-bulletin">
          <Label tone="accent">Boletim</Label>

          <Reading
            label="Temperatura"
            value={weather?.temperature != null ? fmt(weather.temperature, 1) : null}
            unit="°C"
            note={sourceNote(weather?.meta)}
            spark={tempSeries}
            sparkTitle="Temperatura prevista para as próximas 24 horas"
            tone="var(--tone-amber)"
          />
          <Reading
            label="Qualidade do ar · EAQI"
            value={air?.aqi != null ? String(air.aqi) : null}
            note={sourceNote(air?.meta)}
            spark={[]}
            sparkTitle=""
            tone="var(--tone-teal)"
          />
          <Reading
            label="Mondego · caudal"
            value={river?.discharge != null ? fmt(river.discharge, 1) : null}
            unit=" m³/s"
            suffix={river?.discharge != null ? TREND_ARROW[river.trend] : undefined}
            note={sourceNote(river?.meta)}
            spark={riverSeries}
            sparkSplit={riverSplit === -1 ? undefined : riverSplit}
            sparkTitle="Caudal dos últimos 7 dias e previsão para 7 dias"
            tone="var(--tone-blue)"
          />

          <CityScore />
        </div>
      </div>
    </div>
  )
}
