const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=40.2033&longitude=-8.4195' +
  '&hourly=temperature_2m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum' +
  '&forecast_days=7&timezone=Europe%2FLisbon'

const FALLBACK_HOURLY = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  temp: 15 + Math.sin((i / 24) * Math.PI * 2) * 5,
  precipProb: i > 14 ? 20 : 5,
}))

const FALLBACK_DAILY = [
  { date: '', maxTemp: 18, minTemp: 11, weatherCode: 2, precip: 0 },
  { date: '', maxTemp: 17, minTemp: 10, weatherCode: 3, precip: 0.2 },
  { date: '', maxTemp: 16, minTemp: 9, weatherCode: 61, precip: 3.1 },
  { date: '', maxTemp: 15, minTemp: 9, weatherCode: 63, precip: 7.4 },
  { date: '', maxTemp: 17, minTemp: 10, weatherCode: 2, precip: 0 },
  { date: '', maxTemp: 19, minTemp: 11, weatherCode: 1, precip: 0 },
  { date: '', maxTemp: 20, minTemp: 12, weatherCode: 0, precip: 0 },
].map((d, i) => {
  const dt = new Date(); dt.setDate(dt.getDate() + i)
  return { ...d, date: dt.toISOString().slice(0, 10) }
})

export async function GET() {
  try {
    const res = await fetch(FORECAST_URL, { next: { revalidate: 3600 } })
    const data = await res.json()

    const hourly = data.hourly.time.slice(0, 24).map((t: string, i: number) => ({
      hour: new Date(t).getHours(),
      temp: Math.round(data.hourly.temperature_2m[i] * 10) / 10,
      precipProb: data.hourly.precipitation_probability[i],
    }))

    const daily = data.daily.time.map((date: string, i: number) => ({
      date,
      maxTemp: Math.round(data.daily.temperature_2m_max[i] * 10) / 10,
      minTemp: Math.round(data.daily.temperature_2m_min[i] * 10) / 10,
      weatherCode: data.daily.weather_code[i],
      precip: data.daily.precipitation_sum[i],
    }))

    return Response.json({ hourly, daily })
  } catch {
    return Response.json({ hourly: FALLBACK_HOURLY, daily: FALLBACK_DAILY, fallback: true })
  }
}
