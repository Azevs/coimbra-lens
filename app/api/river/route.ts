// SNIRH - Sistema Nacional de Informação de Recursos Hídricos
// Station 17H/02A - Rio Mondego em Coimbra
const SNIRH_URL =
  'https://snirh.apambiente.pt/snirh/_dadosbase/site/janela_verdados.php?sites=0200501020&parms=1028&tmin=&tmax=&formato=json'

const FALLBACK = {
  level: 1.42,
  flow: 28.5,
  trend: 'stable' as const,
  history: [1.38, 1.40, 1.41, 1.43, 1.42, 1.44, 1.42],
}

export async function GET() {
  try {
    const res = await fetch(SNIRH_URL, {
      next: { revalidate: 1800 },
      headers: { 'User-Agent': 'CoimbraLens/1.0' },
    })
    if (!res.ok) throw new Error('SNIRH unavailable')
    const data = await res.json()

    const values: number[] = (data?.data ?? [])
      .slice(-7)
      .map((row: [string, string]) => parseFloat(row[1]))
      .filter((v: number) => !isNaN(v))

    if (values.length === 0) throw new Error('No data')

    const level = values[values.length - 1]
    const prev = values[values.length - 2] ?? level
    const trend = level > prev + 0.05 ? 'rising' : level < prev - 0.05 ? 'falling' : 'stable'

    return Response.json({ level, flow: null, trend, history: values })
  } catch {
    return Response.json({ ...FALLBACK, fallback: true })
  }
}
