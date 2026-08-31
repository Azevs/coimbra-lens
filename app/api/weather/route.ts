import { live, unavailable, type Sourced } from '@/lib/provenance'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195' +
  '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation' +
  '&timezone=Europe/Lisbon'

const SOURCE = 'Open-Meteo'

export interface WeatherPayload {
  temperature: number | null
  humidity: number | null
  windSpeed: number | null
  weatherCode: number | null
  precipitation: number | null
  meta: Sourced
}

function noData(note: string): WeatherPayload {
  return {
    temperature: null,
    humidity: null,
    windSpeed: null,
    weatherCode: null,
    precipitation: null,
    meta: unavailable(SOURCE, note),
  }
}

export async function GET() {
  try {
    const res = await fetch(WEATHER_URL, { next: { revalidate: 300 } })
    if (!res.ok) return Response.json(noData(`A fonte respondeu ${res.status}.`))

    const data = await res.json()
    const c = data?.current
    if (!c || typeof c.temperature_2m !== 'number') {
      return Response.json(noData('A fonte respondeu sem leitura actual.'))
    }

    const payload: WeatherPayload = {
      temperature: c.temperature_2m,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
      weatherCode: c.weather_code,
      precipitation: c.precipitation,
      meta: live(SOURCE, c.time ? new Date(`${c.time}:00`).toISOString() : null),
    }

    return Response.json(payload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
