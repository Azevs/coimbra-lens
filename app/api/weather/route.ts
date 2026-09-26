import { live, unavailable, type Sourced } from '@/lib/provenance'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195' +
  '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation,' +
  'apparent_temperature,wind_direction_10m,wind_gusts_10m,uv_index' +
  '&timezone=Europe/Lisbon'

const SOURCE = 'Open-Meteo'

const num = (v: unknown) => (typeof v === 'number' && !Number.isNaN(v) ? v : null)

export interface WeatherPayload {
  temperature: number | null
  humidity: number | null
  windSpeed: number | null
  weatherCode: number | null
  precipitation: number | null
  apparentTemperature: number | null
  /** Direcção de onde sopra o vento, em graus (0 = norte). */
  windDirection: number | null
  windGusts: number | null
  uvIndex: number | null
  meta: Sourced
}

function noData(note: string): WeatherPayload {
  return {
    temperature: null,
    humidity: null,
    windSpeed: null,
    weatherCode: null,
    precipitation: null,
    apparentTemperature: null,
    windDirection: null,
    windGusts: null,
    uvIndex: null,
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
      apparentTemperature: num(c.apparent_temperature),
      windDirection: num(c.wind_direction_10m),
      windGusts: num(c.wind_gusts_10m),
      uvIndex: num(c.uv_index),
      meta: live(SOURCE, c.time ? new Date(`${c.time}:00`).toISOString() : null),
    }

    return Response.json(payload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
