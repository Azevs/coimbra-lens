import { live, unavailable, type Sourced } from '@/lib/provenance'

const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195' +
  '&hourly=temperature_2m,precipitation_probability' +
  '&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum' +
  '&forecast_days=7&timezone=Europe%2FLisbon'

const SOURCE = 'Open-Meteo'

export interface ForecastHour { hour: number; temp: number; precipProb: number }
export interface ForecastDay { date: string; maxTemp: number; minTemp: number; weatherCode: number; precip: number }

export interface ForecastPayload {
  hourly: ForecastHour[]
  daily: ForecastDay[]
  meta: Sourced
}

function noData(note: string): ForecastPayload {
  return { hourly: [], daily: [], meta: unavailable(SOURCE, note) }
}

export async function GET() {
  try {
    const res = await fetch(FORECAST_URL, { next: { revalidate: 3600 } })
    if (!res.ok) return Response.json(noData(`A fonte respondeu ${res.status}.`))

    const data = await res.json()
    if (!data?.hourly?.time || !data?.daily?.time) {
      return Response.json(noData('A fonte respondeu sem previsão.'))
    }

    const hourly: ForecastHour[] = data.hourly.time.slice(0, 24).map((t: string, i: number) => ({
      hour: new Date(t).getHours(),
      temp: Math.round(data.hourly.temperature_2m[i] * 10) / 10,
      precipProb: data.hourly.precipitation_probability[i],
    }))

    const daily: ForecastDay[] = data.daily.time.map((date: string, i: number) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[i] * 10) / 10,
      minTemp: Math.round(data.daily.temperature_2m_min[i] * 10) / 10,
      weatherCode: data.daily.weather_code[i],
      precip: data.daily.precipitation_sum[i],
    }))

    return Response.json({ hourly, daily, meta: live(SOURCE) } satisfies ForecastPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
