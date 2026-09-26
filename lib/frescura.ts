import { BOUNDARIES_FETCHED_AT } from '@/lib/parish-map'
import { GREEN_FETCHED_AT } from '@/lib/green-spaces'
import { TRILHOS_OBTIDOS_EM } from '@/lib/trilhos-dados'
import { MODEL_FETCHED_AT, URBAN_ZONES } from '@/lib/urban-zones'
import { TURISMO } from '@/lib/turismo-coimbra'

/**
 * Quando mudaram, de facto, os dados de cada página — para o sitemap e
 * para o `dateModified` dos dados estruturados. Um `lastmod` que é sempre
 * "agora" é ignorado pelo Google; uma data verdadeira diz-lhe quando voltar.
 *
 * Páginas sem dados lidos de uma fonte (a História, as Lendas, o Sobre, o
 * Visitar) não têm data aqui: melhor nenhuma do que uma inventada.
 */
const dia = (iso: string) => iso.slice(0, 10)

/** A série do INE publicada mais recentemente, das que o Turismo mostra. */
const TURISMO_ATUALIZADO = Object.values(TURISMO)
  .map((s) => s?.atualizado)
  .filter((d): d is string => !!d)
  .sort()
  .at(-1)

export const LIDO_EM: Record<string, string | undefined> = {
  territorio: dia(BOUNDARIES_FETCHED_AT),
  'zonas-verdes': dia(GREEN_FETCHED_AT),
  trilhos: dia(TRILHOS_OBTIDOS_EM),
  'zonas-urbanas': dia(MODEL_FETCHED_AT),
  turismo: TURISMO_ATUALIZADO && dia(TURISMO_ATUALIZADO),
  ...Object.fromEntries(URBAN_ZONES.map((z) => [`zonas-urbanas/${z.id}`, dia(z.lidoEm)])),
}
