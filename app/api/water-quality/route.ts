import { unavailable, type Sourced } from '@/lib/provenance'

// A ERSAR não expõe API: os dados de controlo da qualidade da água são
// publicados no relatório anual RASARP, em tabelas HTML e PDF.
//
// Esta rota servia pH 7.2, cloro 0.18, turvação 0.4 e nitratos 4.2 como
// "valores típicos do último relatório". Nunca foram confirmados contra o
// relatório — vieram do código original e foram sendo passados adiante.
// Valores plausíveis sem confirmação não são melhores do que inventados.
//
// Caminho para dados reais: extrair as tabelas do RASARP da ERSAR, ou o
// controlo de qualidade que as Águas de Coimbra publicam por zona.

const SOURCE = 'ERSAR · RASARP'
const NOTE =
  'A ERSAR publica a qualidade da água em relatório anual, sem API. Os valores anteriores não estavam confirmados contra a fonte e foram retirados.'

export interface WaterQualityPayload {
  ph: number | null
  chlorine: number | null
  turbidity: number | null
  nitrates: number | null
  status: string | null
  origin: string
  meta: Sourced
}

export async function GET() {
  return Response.json({
    ph: null,
    chlorine: null,
    turbidity: null,
    nitrates: null,
    status: null,
    // A origem da água não é uma medição — é um facto geográfico estável.
    origin: 'Rio Mondego · Açude-ponte de Coimbra',
    meta: unavailable(SOURCE, NOTE),
  } satisfies WaterQualityPayload)
}
