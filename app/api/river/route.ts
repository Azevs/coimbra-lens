import { estimate, unavailable, type Sourced } from '@/lib/provenance'

// Open-Meteo Flood (modelo GloFAS) — caudal do Mondego à latitude de Coimbra.
// Substitui o endpoint do SNIRH, que exige sessão e devolve HTML em vez de JSON.
//
// Nota importante: isto é CAUDAL modelado (m³/s), não a altura hidrométrica
// medida numa estação. O módulo mostrava "1,42 m" — uma grandeza diferente,
// e constante. Passamos a mostrar o que temos mesmo.
const FLOOD_URL =
  'https://flood-api.open-meteo.com/v1/flood?latitude=40.2033&longitude=-8.4195' +
  '&daily=river_discharge&past_days=7&forecast_days=7&timezone=Europe%2FLisbon'

const SOURCE = 'Open-Meteo · GloFAS'
const METHOD = 'Caudal modelado, não medição de estação hidrométrica.'

export type RiverTrend = 'rising' | 'falling' | 'stable'

export interface RiverPoint { date: string; discharge: number; forecast: boolean }

export interface RiverPayload {
  /** Caudal actual em m³/s. */
  discharge: number | null
  trend: RiverTrend
  /** Máximo previsto nos próximos 7 dias, em m³/s. */
  forecastPeak: number | null
  /** 7 dias passados + 7 previstos. */
  series: RiverPoint[]
  meta: Sourced
}

function noData(note: string): RiverPayload {
  return { discharge: null, trend: 'stable', forecastPeak: null, series: [], meta: unavailable(SOURCE, note) }
}

export async function GET() {
  try {
    const res = await fetch(FLOOD_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return Response.json(noData(`A fonte respondeu ${res.status}.`))

    const data = await res.json()
    const dates: string[] = data?.daily?.time ?? []
    const values: number[] = data?.daily?.river_discharge ?? []
    if (dates.length === 0 || values.length !== dates.length) {
      return Response.json(noData('A fonte respondeu sem série de caudal.'))
    }

    const today = new Date().toISOString().slice(0, 10)
    const todayIdx = dates.indexOf(today)
    // Sem a data de hoje na série, o último dia passado é o melhor que temos.
    const currentIdx = todayIdx >= 0 ? todayIdx : Math.min(6, dates.length - 1)

    const series: RiverPoint[] = dates.map((date, i) => ({
      date,
      discharge: Math.round(values[i] * 100) / 100,
      forecast: i > currentIdx,
    }))

    const discharge = series[currentIdx].discharge
    const prev = series[Math.max(0, currentIdx - 1)].discharge

    // 8 % de variação diária separa uma tendência de ruído do modelo.
    const delta = (discharge - prev) / (prev || 1)
    const trend: RiverTrend = delta > 0.08 ? 'rising' : delta < -0.08 ? 'falling' : 'stable'

    const future = series.slice(currentIdx + 1)
    const forecastPeak = future.length > 0 ? Math.max(...future.map((p) => p.discharge)) : null

    return Response.json({
      discharge,
      trend,
      forecastPeak,
      series,
      meta: estimate(SOURCE, METHOD, `${dates[currentIdx]}T12:00:00`),
    } satisfies RiverPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
