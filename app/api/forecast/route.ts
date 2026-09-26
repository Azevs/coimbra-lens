import { live, unavailable, type Sourced } from '@/lib/provenance'

// Horas em unixtime: a faixa do dia atravessa a meia-noite (e, duas vezes
// por ano, a mudança da hora), por isso cada hora leva o seu instante real.
const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195' +
  '&hourly=temperature_2m,precipitation_probability,cloud_cover' +
  '&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,sunrise,sunset' +
  '&forecast_days=7&timezone=Europe%2FLisbon&timeformat=unixtime'

const SOURCE = 'Open-Meteo'
const LISBOA = 'Europe/Lisbon'

export interface ForecastHour {
  /** Instante do início da hora, em ms. */
  ts: number
  /** Hora local (0–23). */
  hour: number
  temp: number
  precipProb: number | null
  cloudCover: number | null
}
export interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  weatherCode: number
  precip: number
  sunrise: number | null
  sunset: number | null
}

export interface ForecastPayload {
  /** Hoje e amanhã, de meia-noite a meia-noite: 48 horas. */
  hourly: ForecastHour[]
  daily: ForecastDay[]
  meta: Sourced
}

function noData(note: string): ForecastPayload {
  return { hourly: [], daily: [], meta: unavailable(SOURCE, note) }
}

const horaLocal = new Intl.DateTimeFormat('pt-PT', { hour: 'numeric', hourCycle: 'h23', timeZone: LISBOA })
const dataLocal = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: LISBOA })

const round1 = (v: number) => Math.round(v * 10) / 10
const orNull = (v: unknown) => (typeof v === 'number' ? v : null)

export async function GET() {
  try {
    const res = await fetch(FORECAST_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return Response.json(noData(`A fonte respondeu ${res.status}.`))

    const data = await res.json()
    if (!data?.hourly?.time || !data?.daily?.time) {
      return Response.json(noData('A fonte respondeu sem previsão.'))
    }

    const hourly: ForecastHour[] = data.hourly.time.slice(0, 48).map((t: number, i: number) => ({
      ts: t * 1000,
      hour: Number(horaLocal.format(t * 1000)),
      temp: round1(data.hourly.temperature_2m[i]),
      precipProb: orNull(data.hourly.precipitation_probability?.[i]),
      cloudCover: orNull(data.hourly.cloud_cover?.[i]),
    }))

    const daily: ForecastDay[] = data.daily.time.map((t: number, i: number) => ({
      date: dataLocal.format(t * 1000),
      maxTemp: round1(data.daily.temperature_2m_max[i]),
      minTemp: round1(data.daily.temperature_2m_min[i]),
      weatherCode: data.daily.weather_code[i],
      precip: data.daily.precipitation_sum[i],
      sunrise: typeof data.daily.sunrise?.[i] === 'number' ? data.daily.sunrise[i] * 1000 : null,
      sunset: typeof data.daily.sunset?.[i] === 'number' ? data.daily.sunset[i] * 1000 : null,
    }))

    return Response.json({ hourly, daily, meta: live(SOURCE) } satisfies ForecastPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
