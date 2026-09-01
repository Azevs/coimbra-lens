import { live, unavailable, type Sourced } from '@/lib/provenance'

// A Agenda.Coimbra — projecto conjunto da Câmara e da Universidade — é uma
// aplicação Nuxt servida por uma API JSON pública, a mesma que o site usa.
// Não é preciso raspar HTML: /v1/agenda/events/search devolve os eventos já
// estruturados, com sessões, categorias, local e ligação para bilhetes.
//
// Antes disto a rota devolvia vazio (a pesquisa pública da Eventbrite foi
// descontinuada) e a lista original era inventada — incluía uma
// "CoimbraTech 2026" que nunca existiu.

const API = 'https://content.fw.uc.pt/v1/agenda/events/search'
const SOURCE = 'Agenda.Coimbra'

/** Página pública de cada evento, para quem quiser os detalhes. */
const EVENT_URL = (key: string) => `https://agenda.coimbra.pt/event/${key}`

/** As categorias vêm em inglês; o site é português. */
const CATEGORIES: Record<string, string> = {
  cinema: 'Cinema',
  conference: 'Conferência',
  workshop: 'Workshop',
  dance: 'Dança',
  sport: 'Desporto',
  folklore: 'Folclore',
  exhibition: 'Exposição',
  community: 'Comunidade',
  food: 'Gastronomia',
  children: 'Infantil',
  literature: 'Literatura',
  music: 'Música',
  performance: 'Performance',
  theater: 'Teatro',
  tour_guide: 'Visita guiada',
  educational_services: 'Serviço educativo',
}

interface AgendaSession {
  start?: { datetime?: string | null } | null
  end?: { datetime?: string | null } | null
  is_ongoing?: boolean
  location?: string | null
}

interface AgendaEvent {
  key?: string
  title?: string
  source?: string
  categories?: string[]
  sessions?: AgendaSession[]
  metadata?: { location?: string | null; price?: string | null; tickets_url?: string | null }
}

export interface CityEvent {
  id: string
  title: string
  /** Início da próxima sessão, em ISO. */
  date: string
  /** Fim, quando o evento decorre ao longo de vários dias. */
  endDate: string | null
  /** Verdadeiro para exposições e programações que já começaram. */
  isOngoing: boolean
  venue: string
  category: string
  /** Quem publicou o evento na agenda (CM Coimbra, TAGV, Convento…). */
  organiser: string
  url: string
  /** Só quando a agenda traz preço; vazio não quer dizer grátis. */
  price: string | null
}

export interface EventsPayload {
  events: CityEvent[]
  meta: Sourced
}

function noData(note: string): EventsPayload {
  return { events: [], meta: unavailable(SOURCE, note) }
}

/** A sessão que interessa mostrar: a próxima que ainda não terminou. */
function proximaSessao(sessions: AgendaSession[]): AgendaSession | null {
  const agora = Date.now()
  const futuras = sessions
    .filter((s) => s.start?.datetime)
    .sort((a, b) => Date.parse(a.start!.datetime!) - Date.parse(b.start!.datetime!))

  return (
    futuras.find((s) => {
      const fim = s.end?.datetime ? Date.parse(s.end.datetime) : Date.parse(s.start!.datetime!)
      return fim >= agora
    }) ??
    futuras[futuras.length - 1] ??
    null
  )
}

export async function GET() {
  try {
    const res = await fetch(`${API}?time_frame=this_month&limit=30`, { next: { revalidate: 1800 } })
    if (!res.ok) return Response.json(noData(`A agenda respondeu ${res.status}.`))

    const data = await res.json()
    const brutos: AgendaEvent[] = Array.isArray(data?.events) ? data.events : []
    if (brutos.length === 0) return Response.json(noData('A agenda respondeu sem eventos para este período.'))

    const events: CityEvent[] = brutos
      .map((e) => {
        const sessao = proximaSessao(e.sessions ?? [])
        if (!e.key || !e.title || !sessao?.start?.datetime) return null

        const preco = e.metadata?.price?.trim()
        return {
          id: e.key,
          title: e.title.trim(),
          date: sessao.start.datetime,
          endDate: sessao.end?.datetime ?? null,
          isOngoing: sessao.is_ongoing === true,
          venue: (e.metadata?.location || sessao.location || '').trim(),
          category: CATEGORIES[e.categories?.[0] ?? ''] ?? '',
          organiser: (e.source ?? '').trim(),
          url: EVENT_URL(e.key),
          // O campo é texto livre: às vezes é "Entrada livre", às vezes um
          // parágrafo sobre inscrições. Só entra quando cabe numa etiqueta;
          // e vazio significa "não diz", não "entrada livre".
          price: preco && preco.length <= 24 ? preco : null,
        }
      })
      .filter((e): e is CityEvent => e !== null)
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))

    if (events.length === 0) return Response.json(noData('A agenda respondeu sem sessões utilizáveis.'))

    return Response.json({
      events,
      meta: live(SOURCE, new Date().toISOString()),
    } satisfies EventsPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar a agenda.'))
  }
}
