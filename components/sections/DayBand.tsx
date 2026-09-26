'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useForecast, type ForecastHour } from '@/hooks/useForecast'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { solar } from '@/lib/sun'
import { fmt } from '@/lib/format'

/**
 * As próximas 24 horas como uma paisagem: o céu por cima tem a cor que o
 * sol e as nuvens lhe dão a cada hora, a temperatura é a linha do
 * horizonte, e a chuva provável cai do alto. A cor do céu é astronomia
 * (a altura do sol) mais a nebulosidade prevista — nada é inventado.
 */

const LISBOA = 'Europe/Lisbon'
const HORA = 3_600_000
const hhmm = new Intl.DateTimeFormat('pt-PT', { hour: '2-digit', minute: '2-digit', timeZone: LISBOA })
const diaSemana = new Intl.DateTimeFormat('pt-PT', { weekday: 'long', timeZone: LISBOA })

type RGB = [number, number, number]

/** Cor do céu pela elevação do sol, em graus. */
const CEU: [number, RGB][] = [
  [-18, [24, 30, 52]],
  [-9, [38, 46, 86]],
  [-5, [86, 74, 118]],
  [-1.5, [184, 112, 104]],
  [1.5, [222, 150, 96]],
  [6, [232, 190, 126]],
  [13, [178, 202, 210]],
  [30, [136, 178, 204]],
  [70, [118, 166, 200]],
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
const rgb = (c: RGB) => `rgb(${c.map(Math.round).join(',')})`
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

function corDoCeu(elev: number, nuvens: number): RGB {
  let c = CEU[CEU.length - 1][1]
  if (elev <= CEU[0][0]) c = CEU[0][1]
  else {
    for (let i = 1; i < CEU.length; i++) {
      if (elev <= CEU[i][0]) {
        const [e0, c0] = CEU[i - 1]
        const [e1, c1] = CEU[i]
        c = mix(c0, c1, (elev - e0) / (e1 - e0))
        break
      }
    }
  }
  // Nuvens: o céu perde cor em direcção a um cinzento que também escurece à noite.
  const cinzento = mix([40, 44, 54], [176, 182, 186], clamp01((elev + 8) / 20))
  return mix(c, cinzento, (nuvens / 100) * 0.55)
}

/** Valor de uma série horária num instante qualquer, por interpolação linear. */
function aHora(horas: ForecastHour[], ts: number, campo: 'cloudCover' | 'temp'): number {
  const i = Math.max(0, Math.min(horas.length - 2, Math.floor((ts - horas[0].ts) / HORA)))
  const a = horas[i][campo] ?? 0
  const b = horas[i + 1][campo] ?? a
  return lerp(a, b, clamp01((ts - horas[i].ts) / HORA))
}

/** Curva suave (Catmull-Rom) pelos pontos, como caminho SVG. */
function curva(p: [number, number][]): string {
  let d = `M${p[0][0]},${p[0][1]}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2] ?? p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`
  }
  return d
}

/** Estrelas em posições fixas (pseudo-aleatórias, sempre as mesmas). */
const ESTRELAS = Array.from({ length: 90 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1
  return { x: r(1) * 100, y: r(2) * 30 + 3, s: r(3) < 0.2 ? 2 : 1 }
})

const Y_MAX = 24 // % da altura onde fica a temperatura mais alta
const Y_MIN = 64 // … e a mais baixa

export default function DayBand() {
  const { data: forecast, isLoading } = useForecast()

  // A hora é a do browser de quem lê, depois de montar.
  const [agora, setAgora] = useState<number | null>(null)
  useEffect(() => {
    const tick = () => setAgora(Date.now())
    tick()
    const id = setInterval(tick, 5 * 60_000)
    return () => clearInterval(id)
  }, [])

  const faixa = useMemo(() => {
    if (!forecast || agora === null) return null
    const inicio = Math.floor(agora / HORA) * HORA
    const horas = forecast.hourly.filter((h) => h.ts >= inicio).slice(0, 25)
    if (horas.length < 13) return null

    const t0 = horas[0].ts
    const t1 = horas[horas.length - 1].ts
    const x = (ts: number) => ((ts - t0) / (t1 - t0)) * 100

    const temps = horas.map((h) => h.temp)
    const tMin = Math.min(...temps)
    const tMax = Math.max(...temps)
    const amp = Math.max(tMax - tMin, 4) // uma variação pequena não se estica até parecer grande
    const meio = (tMax + tMin) / 2
    const y = (t: number) => (Y_MAX + Y_MIN) / 2 - ((t - meio) / amp) * (Y_MIN - Y_MAX)

    const pontos = horas.map((h) => [x(h.ts), y(h.temp)] as [number, number])
    const linha = curva(pontos)

    // O céu, amostrado de quarto em quarto de hora.
    const paragens: { offset: number; cor: string }[] = []
    let escuridao = 0
    const estrelasVisiveis: typeof ESTRELAS = []
    for (let ts = t0; ts <= t1; ts += HORA / 4) {
      const { elevation } = solar(new Date(ts))
      const nuvens = aHora(horas, ts, 'cloudCover')
      paragens.push({ offset: x(ts) / 100, cor: rgb(corDoCeu(elevation, nuvens)) })
      escuridao = Math.max(escuridao, elevation < -10 ? 1 : 0)
    }
    if (escuridao) {
      for (const e of ESTRELAS) {
        const ts = t0 + (e.x / 100) * (t1 - t0)
        const { elevation } = solar(new Date(ts))
        if (elevation < -10 && aHora(horas, ts, 'cloudCover') < 60) estrelasVisiveis.push(e)
      }
    }

    const iMax = temps.indexOf(tMax)
    const iMin = temps.indexOf(tMin)
    const marcas = [0, iMax, iMin].filter((v, i, a) => a.indexOf(v) === i)

    const sol = forecast.daily
      .flatMap((d) => [
        d.sunrise !== null ? { ts: d.sunrise, tipo: 'nasce' as const } : null,
        d.sunset !== null ? { ts: d.sunset, tipo: 'põe-se' as const } : null,
      ])
      .filter((s): s is { ts: number; tipo: 'nasce' | 'põe-se' } => s !== null && s.ts > t0 && s.ts < t1)
      .map((s) => ({ ...s, x: x(s.ts), y: y(aHora(horas, s.ts, 'temp')) }))

    // Meia-noite dentro da janela: o dia muda de nome.
    const meiaNoite = horas.find((h, i) => i > 0 && h.hour === 0)

    const chuvaMax = Math.max(0, ...horas.map((h) => h.precipProb ?? 0))

    return {
      horas, x, y, linha, pontos, paragens, estrelasVisiveis, marcas, iMax, iMin, sol, meiaNoite, tMin, tMax, chuvaMax,
    }
  }, [forecast, agora])

  const ref = useRef<HTMLDivElement>(null)
  const [foco, setFoco] = useState<number | null>(null)

  if (isLoading || !forecast) {
    return <div className="dia-faixa dia-faixa-vazia" aria-hidden="true" />
  }

  if (forecast.hourly.length === 0) {
    return (
      <div className="dia-cabeca">
        <Label>Próximas 24 horas</Label>
        <DataUnavailable meta={forecast.meta} />
        <DataSource meta={forecast.meta} showNote={false} />
      </div>
    )
  }

  if (!faixa) return <div className="dia-faixa dia-faixa-vazia" aria-hidden="true" />

  const { horas, linha, pontos, paragens, estrelasVisiveis, marcas, iMax, iMin, sol, meiaNoite, tMin, tMax, chuvaMax } = faixa

  const resumo =
    `Próximas 24 horas em Coimbra: temperatura entre ${fmt(tMin, 1)} e ${fmt(tMax, 1)} graus, ` +
    `máxima às ${horas[iMax].hour} h, mínima às ${horas[iMin].hour} h` +
    (chuvaMax >= 10 ? `; probabilidade de chuva até ${chuvaMax} %.` : '; sem chuva provável.')

  const mover = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const f = clamp01((clientX - r.left) / r.width)
    setFoco(Math.round(f * (horas.length - 1)))
  }

  const h = foco !== null ? horas[foco] : null

  // Para lá da janela, o horizonte segue a direito enquanto o céu se esbate.
  const primeiro = pontos[0]
  const ultimo = pontos[pontos.length - 1]
  const horizonte = `M-8,${primeiro[1]} L${linha.slice(1)} L108,${ultimo[1]}`

  return (
    <figure className="dia">
      <figcaption className="dia-cabeca">
        <Label style={{ margin: 0 }}>Próximas 24 horas</Label>
        <span className="dia-legenda" aria-hidden="true">
          <span><i className="dia-leg-linha" />temperatura</span>
          <span><i className="dia-leg-chuva" />probabilidade de chuva</span>
        </span>
      </figcaption>

      <div
        ref={ref}
        className="dia-faixa"
        role="img"
        aria-label={resumo}
        onPointerMove={(e) => mover(e.clientX)}
        onPointerDown={(e) => mover(e.clientX)}
        onPointerLeave={() => setFoco(null)}
      >
        {estrelasVisiveis.map((e, i) => (
          <span key={i} className="dia-estrela" style={{ left: `${e.x}%`, top: `${e.y}%`, width: e.s, height: e.s }} />
        ))}

        <svg className="dia-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            {/* Em coordenadas do desenho: fora da janela, o céu segura a cor das pontas. */}
            <linearGradient id="dia-ceu" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
              {paragens.map((p, i) => <stop key={i} offset={p.offset} stopColor={p.cor} />)}
            </linearGradient>
            {/* Fora da janela de 24 h o céu esbate-se no papel. */}
            <linearGradient id="dia-esbater" gradientUnits="userSpaceOnUse" x1="-8" y1="0" x2="108" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset={8 / 116} stopColor="#fff" stopOpacity="1" />
              <stop offset={108 / 116} stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="dia-mascara" maskUnits="userSpaceOnUse" x={-400} y={0} width={900} height={100}>
              <rect x={-400} y={0} width={900} height={100} fill="url(#dia-esbater)" />
            </mask>
            <linearGradient id="dia-chuva" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* O céu passa um pouco para as margens; os dados ficam na coluna do texto. */}
          <rect x={-400} y={0} width={900} height={100} fill="url(#dia-ceu)" mask="url(#dia-mascara)" />

          {/* A chuva cai do alto: comprimento = probabilidade, até à linha. */}
          {horas.map((hr, i) => {
            const p = hr.precipProb ?? 0
            if (p < 10) return null
            const w = 100 / (horas.length - 1)
            return (
              <rect
                key={hr.ts}
                x={Math.max(0, pontos[i][0] - w * 0.3)}
                y={0}
                width={w * 0.6}
                height={(p / 100) * (pontos[i][1] - 4)}
                fill="url(#dia-chuva)"
              />
            )
          })}

          {sol.map((s) => (
            <line key={s.ts} x1={s.x} x2={s.x} y1={12} y2={s.y} className="dia-sol-fio" vectorEffect="non-scaling-stroke" />
          ))}
          {meiaNoite && (
            <line x1={faixa.x(meiaNoite.ts)} x2={faixa.x(meiaNoite.ts)} y1={0} y2={100} className="dia-meia-noite" vectorEffect="non-scaling-stroke" />
          )}

          <path d={`${horizonte} L500,100 L-400,100 Z`} className="dia-terra" />
          <path d={horizonte} className="dia-horizonte" vectorEffect="non-scaling-stroke" mask="url(#dia-mascara)" />
        </svg>

        {sol.map((s) => (
          <span key={s.ts} className="dia-sol" style={{ left: `${s.x}%` }}>
            <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {s.tipo} {hhmm.format(s.ts)}
          </span>
        ))}

        {meiaNoite && (
          <span className="dia-dia" style={{ left: `${faixa.x(meiaNoite.ts)}%` }}>{diaSemana.format(meiaNoite.ts)}</span>
        )}

        {marcas.map((i) => (
          <span
            key={i}
            className={`dia-marca ${i === iMax ? 'is-max' : ''} ${i === iMin ? 'is-min' : ''} ${i === 0 ? 'is-agora' : ''}`}
            style={{ left: `${pontos[i][0]}%`, top: `${pontos[i][1]}%` }}
          >
            <span className="dia-marca-valor">{fmt(horas[i].temp, 0)}°</span>
          </span>
        ))}

        <div className="dia-eixo" aria-hidden="true">
          {horas.map((hr, i) =>
            hr.hour % 3 === 0 && i < horas.length - 1 ? (
              <span key={hr.ts} className={hr.hour % 6 === 0 ? '' : 'dia-eixo-3'} style={{ left: `${pontos[i][0]}%` }}>
                {String(hr.hour).padStart(2, '0')}h
              </span>
            ) : null
          )}
        </div>

        {h && foco !== null && (
          <div className="dia-foco" aria-hidden="true" style={{ left: `${pontos[foco][0]}%` }}>
            <span className="dia-foco-ponto" style={{ top: `${pontos[foco][1]}%` }} />
            <span className={`dia-foco-cartao ${pontos[foco][0] > 70 ? 'a-esquerda' : ''}`}>
              <b>{String(h.hour).padStart(2, '0')}h</b> · {fmt(h.temp, 1)}°
              {h.precipProb !== null && <> · chuva {h.precipProb} %</>}
              {h.cloudCover !== null && <> · nuvens {h.cloudCover} %</>}
            </span>
          </div>
        )}
      </div>

      <div className="dia-rodape">
        <DataSource meta={forecast.meta} showNote={false} />
      </div>
    </figure>
  )
}
