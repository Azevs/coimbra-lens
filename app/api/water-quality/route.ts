import { estimate, type Sourced } from '@/lib/provenance'

// A ERSAR não expõe API — os dados de controlo da qualidade da água são
// publicados no relatório anual RASARP, em tabelas HTML e PDF.
//
// Estes são valores típicos do sistema de abastecimento de Coimbra segundo
// o último relatório publicado. NÃO são uma análise de hoje: a versão
// anterior carimbava a data actual, o que sugeria uma medição diária que
// não existe.
const SOURCE = 'ERSAR · RASARP'
const METHOD = 'Valores típicos do último relatório anual publicado. Não é uma análise diária.'

/** Ano do relatório de onde vêm os valores abaixo. */
const REPORT_YEAR = 2023

export interface WaterQualityPayload {
  ph: number
  chlorine: number
  turbidity: number
  nitrates: number
  conductivity: number
  status: string
  origin: string
  reportYear: number
  meta: Sourced
}

export async function GET() {
  return Response.json({
    ph: 7.2,
    chlorine: 0.18,
    turbidity: 0.4,
    nitrates: 4.2,
    conductivity: 285,
    status: 'Própria para consumo',
    origin: 'Rio Mondego · Açude-ponte de Coimbra',
    reportYear: REPORT_YEAR,
    meta: estimate(SOURCE, METHOD, `${REPORT_YEAR}-12-31T12:00:00`),
  } satisfies WaterQualityPayload)
}
