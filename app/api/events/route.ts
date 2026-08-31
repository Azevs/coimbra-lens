import { unavailable, type Sourced } from '@/lib/provenance'

// A pesquisa pública da Eventbrite (/v3/events/search/) foi removida pela
// Eventbrite e responde HTTP 404. Não existe substituto directo com a mesma
// cobertura para Coimbra.
//
// Enquanto não houver fonte, esta rota não devolve eventos. A lista anterior
// era inventada — incluía uma "CoimbraTech 2026" que nunca existiu.
//
// Candidatos a fonte real (Fase 3): agenda da Câmara Municipal de Coimbra,
// Convento São Francisco, Teatro Académico de Gil Vicente, Casa da Cultura.

const SOURCE = 'Eventbrite'
const NOTE = 'A API pública de pesquisa da Eventbrite foi descontinuada. Sem fonte de agenda para Coimbra até à integração da agenda municipal.'

export interface CityEvent {
  id: string
  title: string
  date: string
  venue: string
  category: string
  url: string
  isFree: boolean
}

export interface EventsPayload {
  events: CityEvent[]
  meta: Sourced
}

export async function GET() {
  return Response.json({
    events: [],
    meta: unavailable(SOURCE, NOTE),
  } satisfies EventsPayload)
}
