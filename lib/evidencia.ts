/**
 * Que tipo de prova sustenta cada afirmação da História.
 *
 * É o paralelo histórico do `Provenance` dos dados (`lib/provenance.ts`).
 * Um número tem de dizer se é medição ou estimativa; uma frase sobre a
 * cidade romana tem de dizer se alguém a mediu, a escavou, a leu num texto
 * antigo, a propõe como hipótese — ou se é só um desenho para se perceber.
 *
 *   medido      — lido hoje por instrumento (LiDAR, cartografia)
 *   escavado    — resultado de escavação arqueológica publicada
 *   documentado — escrito numa fonte antiga ou num registo histórico
 *   hipotese    — proposta pelos investigadores, sem prova que a feche
 *   esquema     — desenho para explicar; posição e proporções aproximadas
 */
export type Evidencia = 'medido' | 'escavado' | 'documentado' | 'hipotese' | 'esquema'

export const EVIDENCIA_LABEL: Record<Evidencia, string> = {
  medido: 'Medido',
  escavado: 'Escavado',
  documentado: 'Documentado',
  hipotese: 'Hipótese',
  esquema: 'Esquema',
}

/** O que cada selo quer dizer, numa frase — para a legenda da página. */
export const EVIDENCIA_SENTIDO: Record<Evidencia, string> = {
  medido: 'lido hoje por instrumento',
  escavado: 'encontrado em escavação e publicado',
  documentado: 'escrito numa fonte antiga ou num registo',
  hipotese: 'proposto pelos investigadores, por provar',
  esquema: 'desenho para explicar, não à escala do achado',
}

export const EVIDENCIA_COLOR: Record<Evidencia, string> = {
  medido: 'var(--tone-teal)',
  escavado: 'var(--accent)',
  documentado: 'var(--tone-blue)',
  hipotese: 'var(--tone-amber)',
  esquema: 'var(--tone-muted)',
}

/** A mesma cor, com contraste de texto AA sobre papel. */
export const EVIDENCIA_TEXT: Record<Evidencia, string> = {
  medido: 'var(--tone-teal-text)',
  escavado: 'var(--accent-text)',
  documentado: 'var(--tone-blue-text)',
  hipotese: 'var(--tone-amber-text)',
  esquema: 'var(--text-tertiary)',
}
