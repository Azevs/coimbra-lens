/**
 * Um único formatador de números para todo o site.
 *
 * O ticker escrevia "29.4", o boletim "29,4". Em português a vírgula é o
 * separador decimal, e o mesmo valor não pode mudar de grafia consoante o
 * componente que o mostra.
 */
export function fmt(value: number, decimals = 0): string {
  return value.toLocaleString('pt-PT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Variação com sinal explícito: "+12", "-18", "0". */
export function fmtSigned(value: number, decimals = 0): string {
  const s = fmt(Math.abs(value), decimals)
  if (value > 0) return `+${s}`
  if (value < 0) return `-${s}`
  return s
}
