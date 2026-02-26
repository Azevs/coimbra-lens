const OPENAQ_URL = 'https://api.openaq.org/v2/latest?city=Coimbra&country=PT&limit=10'

const FALLBACK = {
  aqi: 42,
  pm25: 8.3,
  pm10: 15.1,
  no2: 12.4,
  status: 'Bom',
}

function getStatus(aqi: number): string {
  if (aqi <= 50) return 'Bom'
  if (aqi <= 100) return 'Moderado'
  if (aqi <= 150) return 'Insalubre para Sensíveis'
  return 'Insalubre'
}

export async function GET() {
  try {
    const headers: Record<string, string> = {}
    if (process.env.OPENAQ_API_KEY) {
      headers['X-API-Key'] = process.env.OPENAQ_API_KEY
    }

    const res = await fetch(OPENAQ_URL, {
      headers,
      next: { revalidate: 300 },
    })
    const data = await res.json()

    if (!data.results || data.results.length === 0) {
      return Response.json({ ...FALLBACK, fallback: true })
    }

    const measurements = data.results[0]?.measurements || []
    const pm25 = measurements.find((m: { parameter: string }) => m.parameter === 'pm25')?.value ?? FALLBACK.pm25
    const pm10 = measurements.find((m: { parameter: string }) => m.parameter === 'pm10')?.value ?? FALLBACK.pm10
    const no2 = measurements.find((m: { parameter: string }) => m.parameter === 'no2')?.value ?? FALLBACK.no2

    const aqi = Math.round(pm25 * 4.2)

    return Response.json({
      aqi,
      pm25,
      pm10,
      no2,
      status: getStatus(aqi),
    })
  } catch {
    return Response.json({ ...FALLBACK, fallback: true })
  }
}
