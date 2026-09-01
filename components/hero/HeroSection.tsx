'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'
import type { Sourced } from '@/lib/provenance'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver, type RiverPoint, type RiverTrend } from '@/hooks/useRiver'
import { useForecast } from '@/hooks/useForecast'
import DataTicker from './DataTicker'
import CityScore from './CityScore'

/**
 * Primeira página.
 *
 * O herói anterior era um vídeo de stock a 22 % com um título por cima: um
 * ecrã inteiro sem uma única leitura. Aqui a manchete divide o espaço com o
 * boletim — as mesmas leituras que o resto da página aprofunda — e o fundo
 * é a carta do vale, desenhada, sem megabytes de vídeo.
 */

const TREND_ARROW = { rising: '↑', falling: '↓', stable: '→' } as const

/**
 * A manchete do dia.
 *
 * Uma frase montada com as leituras que existem NESTA hora. Cada oração
 * entra só se a leitura correspondente chegou: com o rio em silêncio, a
 * frase encolhe em vez de arredondar. Sem leitura nenhuma, não há frase —
 * a página abre com a linha neutra em vez de fingir que sabe.
 */
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

function manchete(
  temperatura: number | null | undefined,
  eaqi: number | null | undefined,
  rio: RiverTrend | undefined,
  temCaudal: boolean,
): string {
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

  if (oracoes.length === 0) return 'Nenhuma leitura chegou nesta hora.'

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
      <div
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginBottom: '0.5rem',
        }}
      >
        {label}
      </div>
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

/** Uma linha do boletim. Sem leitura, mostra o traço — nunca um número. */
function Reading({
  label,
  value,
  unit,
  note,
  suffix,
  spark,
  tone,
}: {
  label: string
  value: string | null
  unit?: string
  note: string
  suffix?: string
  spark: string
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
        <div
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            marginBottom: '0.4375rem',
          }}
        >
          {label}
        </div>
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
        <div
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: 'var(--text-tertiary)',
            marginTop: '0.5rem',
          }}
        >
          {note}
        </div>
      </div>
      <svg viewBox="0 0 120 46" width="120" height="46" aria-hidden="true" style={{ flexShrink: 0 }}>
        {value === null ? (
          <line x1="0" y1="23" x2="118" y2="23" stroke="var(--border-panel)" strokeWidth="1.4" strokeDasharray="3 5" />
        ) : (
          <polyline points={spark} fill="none" stroke={tone} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
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

  return (
    <>
      <DataTicker />

      <div className="hero-content">
        {/* Cabeçalho da edição */}
        <div
          ref={kicker}
          className="hero-kicker"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '10px',
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

        <h1 ref={headline} className="hero-headline">
          COIMBRA <span className="font-display-italic" style={{ color: 'var(--accent)' }}>Lens</span>
        </h1>

        {/* Três colunas de primeira página */}
        <div ref={columns} className="hero-columns">
          {/* Manchete do dia — a frase muda com as leituras da hora */}
          <div className="hero-lead">
            <p className="font-display hero-lead-line">{lead}</p>

            <div className="hero-lead-support">
              <Apoio
                label="Máxima hoje"
                value={hoje?.maxTemp != null ? hoje.maxTemp.toFixed(1).replace('.', ',') : null}
                unit="°C"
              />
              <Apoio
                label="Mínima hoje"
                value={hoje?.minTemp != null ? hoje.minTemp.toFixed(1).replace('.', ',') : null}
                unit="°C"
              />
              <Apoio
                label="Caudal face a há 7 dias"
                value={variacao != null ? `${variacao > 0 ? '+' : ''}${variacao}` : null}
                unit="%"
              />
            </div>
          </div>

          {/* Boletim */}
          <div className="hero-bulletin">
            <div
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent-text)',
                marginBottom: '0.875rem',
              }}
            >
              Boletim
            </div>

            <Reading
              label="Temperatura"
              value={weather?.temperature != null ? weather.temperature.toFixed(1).replace('.', ',') : null}
              unit="°C"
              note={sourceNote(weather?.meta)}
              spark="0,38 17,34 34,36 51,26 68,22 85,27 102,14 118,10"
              tone="var(--tone-amber)"
            />
            <Reading
              label="Qualidade do ar · EAQI"
              value={air?.aqi != null ? String(air.aqi) : null}
              note={sourceNote(air?.meta)}
              spark="0,16 17,22 34,18 51,28 68,24 85,32 102,29 118,34"
              tone="var(--tone-teal)"
            />
            <Reading
              label="Mondego · caudal"
              value={river?.discharge != null ? river.discharge.toFixed(1).replace('.', ',') : null}
              unit=" m³/s"
              suffix={river?.discharge != null ? TREND_ARROW[river.trend] : undefined}
              note={sourceNote(river?.meta)}
              spark="0,10 17,14 34,9 51,19 68,17 85,27 102,25 118,33"
              tone="var(--tone-blue)"
            />

            <CityScore />
          </div>
        </div>
      </div>
    </>
  )
}
