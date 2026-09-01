/**
 * Proveniência dos dados — o contrato que cada rota de API cumpre.
 *
 * O site mostra números sobre uma cidade real. Cada número tem de dizer
 * de onde vem e o que é:
 *
 *   live        — medição obtida agora de uma fonte externa viva
 *   estimate    — valor calculado, modelado ou de um relatório publicado
 *   unavailable — a fonte não respondeu ou não existe; não há número a mostrar
 *
 * Um módulo `unavailable` diz que não sabe. Nunca inventa um valor plausível.
 */
export type Provenance = 'live' | 'estimate' | 'unavailable'

export interface Sourced {
  /** Estado da leitura. */
  provenance: Provenance
  /** Quem publica o dado, como aparece ao leitor. Ex.: 'Open-Meteo · CAMS'. */
  source: string
  /** Instante da medição (ISO). Ausente quando não é uma medição pontual. */
  observedAt?: string | null
  /** Uma frase que explica o método (estimate) ou a falha (unavailable). */
  note?: string
  /**
   * Substitui a palavra genérica do selo.
   *
   * "Estimativa" sugere imprecisão ou falta de actualização. Muitas vezes o
   * que se passa é outra coisa: é o limite do que existe publicado. Um
   * dado por freguesia em Portugal vem dos Censos, que são decenais — dizer
   * "Censos 2021" informa, dizer "Estimativa" desinforma.
   */
  label?: string
}

export const PROVENANCE_LABEL: Record<Provenance, string> = {
  live: 'Em directo',
  estimate: 'Estimativa',
  unavailable: 'Indisponível',
}

/** Cor semântica de cada estado — independente do acento da marca. */
export const PROVENANCE_COLOR: Record<Provenance, string> = {
  live: 'var(--tone-teal)',
  estimate: 'var(--tone-amber)',
  unavailable: 'var(--text-secondary)',
}

/** Constrói o descritor de uma fonte que respondeu. */
export function live(source: string, observedAt?: string | null): Sourced {
  return { provenance: 'live', source, observedAt: observedAt ?? new Date().toISOString() }
}

/** Constrói o descritor de um valor modelado ou publicado, com o método. */
export function estimate(
  source: string,
  note: string,
  observedAt?: string | null,
  label?: string,
): Sourced {
  return { provenance: 'estimate', source, note, observedAt: observedAt ?? null, label }
}

/**
 * Um valor que é o mais desagregado que existe publicado, e não uma
 * aproximação. Distingue "não temos melhor" de "não nos demos ao trabalho".
 */
export function published(
  source: string,
  label: string,
  note: string,
  observedAt?: string | null,
): Sourced {
  return { provenance: 'estimate', source, note, observedAt: observedAt ?? null, label }
}

/** Constrói o descritor de uma fonte que falhou, com a razão. */
export function unavailable(source: string, note: string): Sourced {
  return { provenance: 'unavailable', source, note, observedAt: null }
}
