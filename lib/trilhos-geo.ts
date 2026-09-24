/**
 * Geometria do lado do browser: andar ao longo de um traçado.
 *
 * O perfil e o voo falam em fracção do percurso (0 a 1); o mapa precisa de
 * coordenadas. As partes de um percurso partido contam em sequência — o
 * salto entre elas não soma distância, como não somou no gerador.
 */

export type LngLat = [number, number]

const R = 6371008.8
const RAD = Math.PI / 180

export function distancia(a: LngLat, b: LngLat): number {
  const dLat = (b[1] - a[1]) * RAD
  const dLon = (b[0] - a[0]) * RAD
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function rumo(a: LngLat, b: LngLat): number {
  const y = Math.sin((b[0] - a[0]) * RAD) * Math.cos(b[1] * RAD)
  const x = Math.cos(a[1] * RAD) * Math.sin(b[1] * RAD) - Math.sin(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.cos((b[0] - a[0]) * RAD)
  return (Math.atan2(y, x) / RAD + 360) % 360
}

export interface Caminho {
  pontos: LngLat[]
  /** Distância acumulada até cada ponto, m. */
  acum: number[]
  total: number
}

export function caminho(partes: LngLat[][]): Caminho {
  const pontos: LngLat[] = []
  const acum: number[] = []
  let total = 0
  for (const parte of partes) {
    for (const [i, p] of parte.entries()) {
      if (i > 0) total += distancia(parte[i - 1], p)
      pontos.push(p)
      acum.push(total)
    }
  }
  return { pontos, acum, total }
}

/** O ponto a `d` metros do início. */
export function ponto(c: Caminho, d: number): LngLat {
  if (d <= 0) return c.pontos[0]
  if (d >= c.total) return c.pontos[c.pontos.length - 1]
  let lo = 0
  let hi = c.acum.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (c.acum[mid] < d) lo = mid
    else hi = mid
  }
  const seg = c.acum[hi] - c.acum[lo]
  const t = seg ? (d - c.acum[lo]) / seg : 0
  const a = c.pontos[lo]
  const b = c.pontos[hi]
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

/** Diferença angular mais curta, em graus, de `a` para `b`. */
export function rodar(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180
}
