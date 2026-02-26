const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&timezone=Europe/Lisbon'

const FALLBACK = {
  temperature: 18.5,
  humidity: 62,
  windSpeed: 12,
  weatherCode: 2,
  precipitation: 0,
}

export async function GET() {
  try {
    const res = await fetch(WEATHER_URL, { next: { revalidate: 60 } })
    const data = await res.json()
    const c = data.current

    return Response.json({
      temperature: c.temperature_2m,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
      weatherCode: c.weather_code,
      precipitation: c.precipitation,
    })
  } catch {
    return Response.json({ ...FALLBACK, fallback: true })
  }
}
