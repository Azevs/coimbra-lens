// Eventbrite public search — no key needed for public events listing
const EVENTBRITE_URL =
  'https://www.eventbriteapi.com/v3/events/search/?location.address=Coimbra,Portugal&location.within=10km&expand=venue,category&sort_by=date'

function getWeekRange() {
  const now = new Date()
  const end = new Date(now)
  end.setDate(end.getDate() + 7)
  return {
    start: now.toISOString(),
    end: end.toISOString(),
  }
}

function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString()
}

const FALLBACK_EVENTS = [
  {
    id: '1',
    title: 'Festival de Música da Universidade de Coimbra',
    date: daysFromNow(1),
    venue: 'Praça da República',
    category: 'Música',
    url: 'https://www.uc.pt',
    isFree: true,
  },
  {
    id: '2',
    title: 'Exposição: Coimbra entre Dois Rios',
    date: daysFromNow(2),
    venue: 'Museu Nacional Machado de Castro',
    category: 'Arte',
    url: 'https://www.museumachadodecastro.pt',
    isFree: false,
  },
  {
    id: '3',
    title: 'Conferência de Startups — CoimbraTech 2026',
    date: daysFromNow(3),
    venue: 'Instituto Pedro Nunes',
    category: 'Tecnologia',
    url: 'https://ipn.pt',
    isFree: false,
  },
  {
    id: '4',
    title: 'Mercado de Produtores Locais — Feira Orgânica',
    date: daysFromNow(4),
    venue: 'Parque Verde do Mondego',
    category: 'Gastronomia',
    url: 'https://www.cm-coimbra.pt',
    isFree: true,
  },
  {
    id: '5',
    title: 'Visita Guiada — Alta Universitária de Coimbra',
    date: daysFromNow(5),
    venue: 'Universidade de Coimbra',
    category: 'Cultura',
    url: 'https://www.uc.pt/ruas',
    isFree: false,
  },
  {
    id: '6',
    title: 'Concerto Fado ao Centro',
    date: daysFromNow(6),
    venue: 'Fado ao Centro',
    category: 'Música',
    url: 'https://www.fadoaocentro.com',
    isFree: false,
  },
]

export async function GET(request: Request) {
  const apiKey = process.env.EVENTBRITE_API_KEY
  if (!apiKey) {
    return Response.json({ events: FALLBACK_EVENTS, fallback: true })
  }

  try {
    const { start, end } = getWeekRange()
    const url = `${EVENTBRITE_URL}&start_date.range_start=${start}&start_date.range_end=${end}`
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!res.ok) throw new Error(`Eventbrite: ${res.status}`)
    const data = await res.json()

    const events = (data.events ?? []).slice(0, 6).map((e: Record<string, unknown>) => {
      const start = e.start as Record<string, string>
      const venue = e.venue as Record<string, unknown> | null
      const category = e.category as Record<string, unknown> | null
      return {
        id: e.id,
        title: (e.name as Record<string, string>)?.text ?? '',
        date: start?.utc ?? '',
        venue: (venue?.name as string) ?? 'Coimbra',
        category: (category?.name as string) ?? 'Evento',
        url: e.url,
        isFree: e.is_free ?? false,
      }
    })

    if (events.length === 0) throw new Error('No events')
    return Response.json({ events })
  } catch {
    return Response.json({ events: FALLBACK_EVENTS, fallback: true })
  }
}
