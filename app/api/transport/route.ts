import { unavailable, type Sourced } from '@/lib/provenance'

// Os SMTUC não publicam feed GTFS-Realtime aberto. A chave da Transitland dá
// acesso a paragens e horários estáticos, não a tempos de chegada em directo.
//
// A versão anterior desta rota devolvia uma lista fixa de autocarros com
// Math.random() somado aos minutos, apresentada como "tempo real". Foi removida.
//
// Caminho para dados reais (Fase 3): importar o GTFS estático dos SMTUC e
// calcular partidas segundo o horário publicado — honesto, e útil.

const SOURCE = 'SMTUC'
const NOTE = 'Os SMTUC não publicam tempos de chegada em tempo real. Está prevista a importação do horário GTFS estático.'

export interface Departure {
  line: string
  destination: string
  scheduled: string
}

export interface TransportPayload {
  departures: Departure[]
  meta: Sourced
}

export async function GET() {
  return Response.json({
    departures: [],
    meta: unavailable(SOURCE, NOTE),
  } satisfies TransportPayload)
}
