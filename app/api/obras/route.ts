import { unavailable, type Sourced } from '@/lib/provenance'

// O dataset de obras da Câmara Municipal de Coimbra em dados.gov.pt é
// publicado em CSV, sem API de consulta. A rota anterior fazia um pedido
// e lançava 'use-fallback' de propósito para servir uma lista escrita à mão
// — os títulos das obras eram inventados.
//
// Caminho para dados reais (Fase 3): descarregar e converter o CSV do
// dataset no build, ou raspar a página de obras da CMC.

const SOURCE = 'Câmara Municipal de Coimbra'
const NOTE = 'O dataset municipal de obras é publicado em CSV, sem API de consulta. A importação está por fazer.'

export interface Obra {
  id: string
  title: string
  parish: string
  type: string
  status: string
  startDate: string
  color: string
}

export interface ObrasPayload {
  obras: Obra[]
  total: number | null
  emCurso: number | null
  previstas: number | null
  meta: Sourced
}

export async function GET() {
  return Response.json({
    obras: [],
    total: null,
    emCurso: null,
    previstas: null,
    meta: unavailable(SOURCE, NOTE),
  } satisfies ObrasPayload)
}
