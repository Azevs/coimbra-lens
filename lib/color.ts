/**
 * Transparência sobre uma cor que pode ser um token CSS.
 *
 * O padrão antigo era concatenar alfa a um hexadecimal (`${color}18`), o que
 * deixa de ser CSS válido assim que `color` passa a ser `var(--tone-teal)`.
 * `color-mix` exprime a mesma coisa e aceita ambos.
 *
 * @param color  hexadecimal, `var(--token)`, ou qualquer cor CSS
 * @param pct    opacidade em percentagem (0–100)
 */
export function colorMix(color: string, pct: number): string {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`
}
