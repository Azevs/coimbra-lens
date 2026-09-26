'use client'

import { useEffect, useState, type ReactNode } from 'react'
import type { Sourced } from '@/lib/provenance'
import { fmt, fmtSigned } from '@/lib/format'
import { luzAgora, LUZ_ESCURA, type Luz } from '@/lib/sun'
import { useWeather } from '@/hooks/useWeather'
import { useAirQuality } from '@/hooks/useAirQuality'
import { useRiver, type RiverPoint, type RiverTrend } from '@/hooks/useRiver'
import { useForecast } from '@/hooks/useForecast'
import { useIpma, type Warning, type WarningLevel } from '@/hooks/useIpma'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { HeroMap } from '@/components/map/LazyMaps'

/**
 * Primeira página: Coimbra, agora.
 *
 * A cidade vista de cima ocupa o ecrã inteiro, com a luz da hora a que se
 * abre a página. Por cima, a manchete do dia — montada com as leituras
 * desta hora — e por baixo dela os quatro sinais que a sustentam. Cada
 * oração da manchete é sublinhada na cor do sinal de onde vem.
 *
 * O ticker, o boletim e o índice de conforto que aqui estavam diziam as
 * mesmas três leituras três vezes. Ficou uma vez, bem dita.
 */

const TREND_ARROW = { rising: '↑', falling: '↓', stable: '→' } as const
const TREND_LABEL = { rising: 'A subir', falling: 'A descer', stable: 'Estável' } as const

/** Bandas do European AQI, as mesmas do módulo do ar. */
function aqiTone(eaqi: number): string {
  if (eaqi <= 20) return 'var(--state-good)'
  if (eaqi <= 40) return 'var(--state-fair)'
  if (eaqi <= 60) return 'var(--state-warn)'
  if (eaqi <= 80) return 'var(--state-poor)'
  return 'var(--state-bad)'
}

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
  if (hora < 17) return 'a meio da tarde'
  if (hora < 20) return 'ao fim da tarde'
  return 'já de noite'
}

const TONE_TEMP = 'var(--tone-amber)'
const TONE_RIO = 'var(--tone-blue)'

const FIRE_TONE: Record<number, string> = {
  1: 'var(--state-good)',
  2: 'var(--state-fair)',
  3: 'var(--state-warn)',
  4: 'var(--state-poor)',
  5: 'var(--state-bad)',
}

const WARNING_STYLE: Record<WarningLevel, { label: string; tone: string }> = {
  green: { label: 'Sem avisos', tone: 'var(--state-good)' },
  yellow: { label: 'Aviso amarelo', tone: 'var(--tone-amber)' },
  orange: { label: 'Aviso laranja', tone: 'var(--tone-clay)' },
  red: { label: 'Aviso vermelho', tone: 'var(--tone-crimson)' },
}

interface Oracao { text: string; tone: string }

/**
 * A manchete do dia, oração a oração.
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
): Oracao[] | null {
  const oracoes: Oracao[] = []

  if (eaqi != null) oracoes.push({ text: qualidadeDoAr(eaqi), tone: aqiTone(eaqi) })
  if (temCaudal && rio) {
    oracoes.push({
      text: rio === 'rising' ? 'Mondego a subir' : rio === 'falling' ? 'Mondego a descer' : 'Mondego estável',
      tone: TONE_RIO,
    })
  }
  if (temperatura != null) {
    oracoes.push({ text: `${Math.round(temperatura)} graus ${alturaDoDia(new Date().getHours())}`, tone: TONE_TEMP })
  }

  if (oracoes.length === 0) return null
  const first = oracoes[0]
  oracoes[0] = { ...first, text: `${first.text.charAt(0).toUpperCase()}${first.text.slice(1)}` }
  return oracoes
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

/** Quem publica e há quanto tempo mediu. Nenhum número sem isto. */
function sourceNote(meta: Sourced | undefined): string {
  if (!meta) return 'a ler…'
  if (meta.provenance === 'unavailable') return meta.note ?? 'fonte sem resposta'
  if (!meta.observedAt) return meta.source
  const mins = Math.round((Date.now() - new Date(meta.observedAt).getTime()) / 60000)
  const quando = mins < 1 ? 'agora' : mins < 60 ? `há ${mins} min` : `há ${Math.round(mins / 60)} h`
  return `${meta.source} · ${quando}`
}

const LISBOA = 'Europe/Lisbon'

function dataDeEdicao(d: Date): string {
  const dia = new Intl.DateTimeFormat('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', timeZone: LISBOA }).format(d)
  const hora = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: LISBOA }).format(d)
  return `${dia} · ${hora.replace(':', 'h')}`
}

const diaLisboa = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: LISBOA }).format(d)

/** "18h00" se for hoje, "amanhã, 09h00" ou "qui., 09h00" se não for. */
function quandoDe(iso: string, agora: Date): string {
  if (!iso) return ''
  const d = new Date(iso)
  const hora = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: LISBOA }).format(d).replace(':', 'h')
  if (diaLisboa(d) === diaLisboa(agora)) return hora
  if (diaLisboa(d) === diaLisboa(new Date(agora.getTime() + 86400000))) return `amanhã, ${hora}`
  return `${new Intl.DateTimeFormat('pt-PT', { weekday: 'short', timeZone: LISBOA }).format(d)}, ${hora}`
}

/* ── Os desenhos dos sinais ───────────────────────────────────────────── */

const VW = 200
const VH = 44

/**
 * Uma série como linha, com o ponto de "agora" marcado. `splitAt` separa o
 * medido (cheio) do previsto (tracejado). Sem série, um traço neutro — o
 * desenho nunca finge uma linha que não existe.
 */
function Linha({ values, now, splitAt, label }: { values: number[]; now?: number; splitAt?: number; label: string }) {
  if (values.length < 2) {
    return (
      <svg className="sinal-viz" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1={VH / 2} x2={VW} y2={VH / 2} stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
      </svg>
    )
  }
  const pad = 5
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * VW,
    VH - pad - ((v - min) / range) * (VH - pad * 2),
  ])
  const path = (p: number[][]) => p.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const cut = splitAt != null && splitAt > 0 && splitAt < pts.length ? splitAt : pts.length
  const past = pts.slice(0, cut)
  const future = pts.slice(cut - 1)
  const area = `${path(past)}L${past[past.length - 1][0]},${VH}L0,${VH}Z`
  const dot = now != null && pts[now] ? pts[now] : null

  return (
    <svg className="sinal-viz" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none" role="img" aria-label={label}>
      <path d={area} fill="var(--sinal)" opacity="0.12" />
      <path d={path(past)} fill="none" stroke="var(--sinal)" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="sinal-traco" />
      {future.length > 1 && (
        <path d={path(future)} fill="none" stroke="var(--sinal)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.75" vectorEffect="non-scaling-stroke" />
      )}
      {dot && (
        <line x1={dot[0]} x2={dot[0]} y1="0" y2={VH} stroke="var(--sinal)" strokeWidth="1" opacity="0.5" vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  )
}

/** Escala em segmentos, os activos acesos. Serve o ar (EAQI) e o risco de incêndio. */
function Escala({ steps, lit, tones, marker, label }: { steps: number; lit: number; tones: string[]; marker?: number; label: string }) {
  return (
    <div className="sinal-escala" role="img" aria-label={label}>
      {Array.from({ length: steps }, (_, i) => (
        <span key={i} style={{ background: tones[i], opacity: i < lit ? 1 : 0.18 }} />
      ))}
      {marker != null && <i style={{ left: `${Math.min(100, Math.max(0, marker))}%` }} aria-hidden="true" />}
    </div>
  )
}

const AQI_TONES = ['var(--state-good)', 'var(--state-fair)', 'var(--state-warn)', 'var(--state-poor)', 'var(--state-bad)']

/* ── Um sinal ─────────────────────────────────────────────────────────── */

function Sinal({
  label,
  tone,
  value,
  decimals = 0,
  unit,
  suffix,
  qualifier,
  note,
  children,
  index,
  animate = true,
}: {
  label: string
  tone: string
  value: number | null
  decimals?: number
  unit?: string
  suffix?: string
  qualifier: string | null
  note: string
  children: ReactNode
  index: number
  /** Uma escala (o risco de 1 a 5) não se conta: passar por 4 a caminho do 5 diria outra coisa. */
  animate?: boolean
}) {
  return (
    <a href="#clima" className="sinal" style={{ ['--sinal' as string]: tone, ['--i' as string]: index }}>
      <span className="sinal-label">{label}</span>
      <span className={`sinal-valor ${value === null ? 'is-vazio' : ''}`}>
        {value === null ? '—' : animate ? <AnimatedNumber value={value} decimals={decimals} duration={1.4} /> : fmt(value, decimals)}
        {value !== null && unit && <span className="sinal-unid">{unit}</span>}
        {value !== null && suffix && <span className="sinal-sufixo" aria-hidden="true">{suffix}</span>}
      </span>
      <span className="sinal-qual">{qualifier ?? ' '}</span>
      {children}
      <span className="sinal-fonte">{note}</span>
    </a>
  )
}

/* ── O aviso ──────────────────────────────────────────────────────────── */

/**
 * O aviso mais grave que ainda não acabou. O IPMA mantém no ficheiro
 * avisos já terminados; às 18h31 um "até às 18h00" já não é aviso.
 */
function Aviso({ warnings, agora }: { warnings: Warning[]; agora: Date }) {
  const [w, ...resto] = warnings
  const { label, tone } = WARNING_STYLE[w.level]
  const futuro = w.startTime && new Date(w.startTime) > agora
  const quando = futuro ? `a partir de ${quandoDe(w.startTime, agora)}` : w.endTime ? `até ${quandoDe(w.endTime, agora)}` : ''
  return (
    <a href="#clima" className="hero-aviso" style={{ ['--aviso' as string]: tone }}>
      <span className="hero-aviso-ponto" aria-hidden="true" />
      <strong>{label}</strong>
      <span>{w.type}{quando && ` · ${quando}`}</span>
      {resto.length > 0 && <span className="hero-aviso-mais">+{resto.length} {resto.length === 1 ? 'aviso' : 'avisos'}</span>}
    </a>
  )
}

/* ── O herói ──────────────────────────────────────────────────────────── */

export default function HeroSection() {
  const { data: weather } = useWeather()
  const { data: air } = useAirQuality()
  const { data: river } = useRiver()
  const { data: forecast } = useForecast()
  const { data: ipma } = useIpma()

  // A hora e a luz são do browser de quem lê: calculadas depois de montar,
  // para o HTML do servidor não discordar do do cliente.
  const [agora, setAgora] = useState<Date | null>(null)
  const [luz, setLuz] = useState<Luz | null>(null)
  useEffect(() => {
    // Em desenvolvimento, `?luz=night` (ou dawn, day, dusk) força a luz —
    // para ver os quatro temas sem esperar pelo pôr do sol.
    const forcada =
      process.env.NODE_ENV !== 'production'
        ? (new URLSearchParams(window.location.search).get('luz') as Luz | null)
        : null
    const tick = () => {
      const d = new Date()
      setAgora(d)
      setLuz(forcada && forcada in LUZ_ESCURA ? forcada : luzAgora(d))
    }
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  const hoje = forecast?.daily?.[0]
  const variacao = variacaoDoCaudal(river?.series)
  const lead = manchete(weather?.temperature, air?.aqi, river?.trend, river?.discharge != null)

  const tempSeries = forecast?.hourly?.slice(0, 24).map((h) => h.temp) ?? []
  const horaAgora = agora ? Number(new Intl.DateTimeFormat('pt-PT', { hour: 'numeric', hourCycle: 'h23', timeZone: LISBOA }).format(agora)) : undefined
  const riverSeries = river?.series?.map((p) => p.discharge) ?? []
  const riverSplit = river?.series?.findIndex((p) => p.forecast) ?? -1

  const aqi = air?.aqi ?? null
  const fire = ipma?.fire ?? null
  const warnings = agora ? (ipma?.warnings ?? []).filter((w) => !w.endTime || new Date(w.endTime) > agora) : []

  const escura = luz ? LUZ_ESCURA[luz] : false

  return (
    <section className={`hero ${escura ? 'hero-noite' : ''}`} data-luz={luz ?? 'day'} aria-labelledby="hero-manchete">
      <div className="hero-fundo" aria-hidden="true" />
      {luz && <HeroMap luz={luz} />}
      <div className="hero-veu" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-topo">
          <p className="hero-dateline">
            <span className="hero-pulso" aria-hidden="true" />
            <span>Coimbra</span>
            {agora && (
              <>
                <span className="hero-dateline-sep" aria-hidden="true">·</span>
                <span className="hero-dateline-data">{dataDeEdicao(agora)}</span>
              </>
            )}
          </p>

          {agora && warnings.length > 0 && <Aviso warnings={warnings} agora={agora} />}

          <h1 id="hero-manchete" key={lead ? 'lida' : 'pendente'} className={`hero-headline ${lead === null ? 'hero-headline-pending' : ''}`}>
            {lead === null
              ? 'A ler a cidade…'
              : lead.map((o, i) => (
                  <span key={o.text}>
                    <span className="hero-oracao" style={{ ['--oracao' as string]: o.tone, ['--i' as string]: i }}>{o.text}</span>
                    {i < lead.length - 2 ? ', ' : i === lead.length - 2 ? ' e ' : '.'}
                  </span>
                ))}
          </h1>
        </div>

        <div className="hero-sinais">
          <Sinal
            index={0}
            label="Temperatura"
            tone={TONE_TEMP}
            value={weather?.temperature ?? null}
            decimals={1}
            unit="°C"
            qualifier={hoje ? `máx. ${fmt(hoje.maxTemp, 0)}° · mín. ${fmt(hoje.minTemp, 0)}°` : null}
            note={sourceNote(weather?.meta)}
          >
            <Linha values={tempSeries} now={horaAgora} label="Temperatura de hoje, hora a hora, com a hora actual marcada" />
          </Sinal>

          <Sinal
            index={1}
            label="Qualidade do ar"
            tone={aqi != null ? aqiTone(aqi) : 'var(--tone-muted)'}
            value={aqi}
            unit=" EAQI"
            qualifier={air?.status ?? null}
            note={sourceNote(air?.meta)}
          >
            <Escala
              steps={5}
              lit={5}
              tones={AQI_TONES}
              marker={aqi != null ? aqi : undefined}
              label={aqi != null ? `Índice ${aqi} na escala europeia de 0 a 100` : 'Sem leitura'}
            />
          </Sinal>

          <Sinal
            index={2}
            label="Mondego · caudal"
            tone={TONE_RIO}
            value={river?.discharge ?? null}
            decimals={1}
            unit=" m³/s"
            suffix={river?.discharge != null ? TREND_ARROW[river.trend] : undefined}
            qualifier={
              river?.discharge != null
                ? `${TREND_LABEL[river.trend]}${variacao != null ? ` · ${fmtSigned(variacao)}% em 7 dias` : ''}`
                : null
            }
            note={sourceNote(river?.meta)}
          >
            <Linha
              values={riverSeries}
              splitAt={riverSplit === -1 ? undefined : riverSplit}
              now={riverSplit > 0 ? riverSplit - 1 : undefined}
              label="Caudal dos últimos 7 dias e previsão para os próximos 7"
            />
          </Sinal>

          <Sinal
            index={3}
            animate={false}
            label="Risco de incêndio"
            tone={fire ? FIRE_TONE[fire.level] ?? 'var(--tone-muted)' : 'var(--tone-muted)'}
            value={fire?.level ?? null}
            unit=" / 5"
            qualifier={fire?.label ?? null}
            note={sourceNote(ipma?.meta)}
          >
            <Escala
              steps={5}
              lit={fire?.level ?? 0}
              tones={[1, 2, 3, 4, 5].map((n) => FIRE_TONE[n])}
              label={fire ? `Risco ${fire.label.toLowerCase()}, nível ${fire.level} de 5` : 'Sem leitura'}
            />
          </Sinal>
        </div>
      </div>

      <a href="#clima" className="hero-descer" aria-label="Descer para o tempo em detalhe">
        <span aria-hidden="true" />
      </a>
    </section>
  )
}
