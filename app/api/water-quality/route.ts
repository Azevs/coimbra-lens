import { published, type Sourced } from '@/lib/provenance'

// A pergunta que as pessoas fazem sobre a água da torneira é "posso beber?".
// Isso responde-se com o que está publicado, sem precisar de um número.
//
// Esta rota já serviu pH 7.2, cloro 0.18, turvação 0.4 e nitratos 4.2 como
// "valores típicos do último relatório". Nunca foram confirmados — vieram do
// código original e foram sendo passados adiante. Ficaram a null e assim
// continuam: as Águas de Coimbra publicam-nos em PDF trimestral por zona de
// abastecimento, e enquanto não forem lidos daí não entram aqui.
//
// O que entra é o estado, que é verificável e estável: a rede é controlada
// pelas Águas de Coimbra ao abrigo do PCQA aprovado pela ERSAR, que lhe
// atribuiu o selo de qualidade exemplar da água para consumo humano.

const SOURCE = 'Águas de Coimbra · ERSAR'
const LABEL = 'ERSAR · 2025'
const NOTE =
  'Estado do controlo de qualidade da rede pública, não uma medição instantânea. Os valores por parâmetro saem em boletim trimestral por zona de abastecimento.'

/** Boletins trimestrais por zona — Boavista, Olhos de Fervença, Quinta das Cunhas. */
export const BULLETINS_URL = 'https://www.aguasdecoimbra.pt/qualidade-agua/'

export interface WaterQualityPayload {
  ph: number | null
  chlorine: number | null
  turbidity: number | null
  nitrates: number | null
  /** Resposta directa à pergunta do leitor. */
  status: string | null
  /** Uma frase que diz porquê, sem jargão. */
  detail: string
  origin: string
  bulletinsUrl: string
  meta: Sourced
}

export async function GET() {
  return Response.json({
    ph: null,
    chlorine: null,
    turbidity: null,
    nitrates: null,
    status: 'Própria para consumo',
    detail:
      'A rede pública é controlada ao abrigo do programa aprovado pelo regulador, com o selo de qualidade exemplar atribuído às Águas de Coimbra.',
    // A origem da água não é uma medição — é um facto geográfico estável.
    origin: 'Rio Mondego · Açude-ponte de Coimbra',
    bulletinsUrl: BULLETINS_URL,
    meta: published(SOURCE, LABEL, NOTE, null),
  } satisfies WaterQualityPayload)
}
