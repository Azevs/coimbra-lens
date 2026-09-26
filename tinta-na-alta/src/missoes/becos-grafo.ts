/**
 * As ruas da Baixa como grafo: nós nas junções das vias do OSM, e cada aresta
 * com o traçado da via entre duas junções. Serve ao Estafeta (para onde
 * fugir), aos Borrões que vêm atrás de ti e ao desenho (percurso, placas,
 * roupa estendida).
 *
 * Coordenadas do nível: x nascente, y norte.
 */
import type { Mundo, Nivel, Via } from '../mundo'

export type XY = [number, number]
export type Aresta = { i: number; de: number; para: number; pts: XY[]; L: number; custo: number; via: Via }
export type No = { i: number; x: number; y: number; arestas: Aresta[] }

/** Por onde se anda a pé (as vias privadas ficam de fora, fechadas com portão). */
const TIPOS = new Set(['pedestrian', 'footway', 'steps', 'living_street', 'residential', 'service', 'path',
  'secondary', 'secondary_link', 'tertiary', 'unclassified', 'busway', 'cycleway'])
/** As avenidas abertas custam mais: quem foge prefere os becos. */
const PESO: Record<string, number> = { secondary: 1.6, secondary_link: 1.6, tertiary: 1.6, busway: 1.5, cycleway: 1.3, steps: 1.1 }

export const privada = (v: Via) => v.acesso === 'private' || v.acesso === 'no'

export function distSeg(x: number, y: number, a: XY, b: XY) {
  const vx = b[0] - a[0], vy = b[1] - a[1], L = vx * vx + vy * vy
  const t = L ? Math.max(0, Math.min(1, ((x - a[0]) * vx + (y - a[1]) * vy) / L)) : 0
  return Math.hypot(x - a[0] - t * vx, y - a[1] - t * vy)
}

/** Distância de um ponto a uma linha partida. */
export function distLinha(x: number, y: number, pts: XY[]) {
  let d = Infinity
  for (let k = 1; k < pts.length; k++) d = Math.min(d, distSeg(x, y, pts[k - 1], pts[k]))
  return d
}

export const comprimento = (pts: XY[]) => pts.reduce((s, p, k) => (k ? s + Math.hypot(p[0] - pts[k - 1][0], p[1] - pts[k - 1][1]) : 0), 0)

/** Ponto a `s` metros do início de uma linha partida. */
export function aoLongo(pts: XY[], s: number): XY {
  for (let k = 1; k < pts.length; k++) {
    const a = pts[k - 1], b = pts[k], L = Math.hypot(b[0] - a[0], b[1] - a[1])
    if (s <= L || k === pts.length - 1) { const t = L ? Math.min(1, Math.max(0, s / L)) : 0; return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] }
    s -= L
  }
  return pts[pts.length - 1]
}

export class Grafo {
  nos: No[] = []
  arestas: Aresta[] = []

  /** `fator` agrava (ou alivia) o custo de uma via inteira: a missão diz por onde se prefere fugir. */
  constructor(nivel: Nivel, mundo: Mundo, fator: (v: Via) => number = () => 1) {
    const [mx, my] = nivel.meio
    const vias = nivel.vias.filter((v) => TIPOS.has(v.tipo) && !privada(v) && v.g.length > 1)
    // Um vértice partilhado por duas vias (ou duas vezes pela mesma) é uma junção.
    const chave = (p: XY) => p[0].toFixed(2) + ',' + p[1].toFixed(2)
    const usos = new Map<string, number>()
    for (const v of vias) v.g.forEach((p, k) => usos.set(chave(p), (usos.get(chave(p)) ?? 0) + (k === 0 || k === v.g.length - 1 ? 2 : 1)))
    const indice = new Map<string, number>()
    const no = (p: XY) => {
      const k = chave(p)
      let i = indice.get(k)
      if (i === undefined) { i = this.nos.length; indice.set(k, i); this.nos.push({ i, x: p[0], y: p[1], arestas: [] }) }
      return i
    }
    /** Por onde se passa de facto: dentro da caixa e fora dos edifícios (o que resta de uma via que entra num prédio fica de fora). */
    const livre = (pts: XY[]) => {
      for (let k = 1; k < pts.length; k++) {
        const a = pts[k - 1], b = pts[k], L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 0.5))
        for (let q = 0; q <= n; q++) {
          const x = a[0] + ((b[0] - a[0]) * q) / n, y = a[1] + ((b[1] - a[1]) * q) / n
          if (Math.abs(x) > mx - 6 || Math.abs(y) > my - 6 || mundo.edificioEm(x, y)) return false
        }
      }
      return true
    }
    const juntar = (a: number, b: number, pts: XY[], via: Via) => {
      if (a === b && pts.length < 3) return
      const L = comprimento(pts)
      if (L < 0.05) return
      const r: Aresta = { i: this.arestas.length, de: a, para: b, pts, L, custo: L * (PESO[via.tipo] ?? 1) * fator(via), via }
      this.arestas.push(r)
      this.nos[a].arestas.push(r)
      if (a !== b) this.nos[b].arestas.push(r)
    }
    for (const v of vias) {
      let ini = 0
      for (let k = 1; k < v.g.length; k++) {
        if (k < v.g.length - 1 && (usos.get(chave(v.g[k])) ?? 0) < 2) continue
        const pts = v.g.slice(ini, k + 1).map((p) => [p[0], p[1]] as XY)
        if (livre(pts)) juntar(no(v.g[ini]), no(v.g[k]), pts, v)
        ini = k
      }
    }
    // Pontas soltas a menos de 2,5 m de outro nó, com o caminho livre: o OSM nem sempre as liga.
    for (const n of this.nos) {
      if (n.arestas.length !== 1) continue
      let melhor: No | null = null, dm = 2.5
      for (const o of this.nos) {
        if (o === n || !o.arestas.length || o.arestas.some((a) => a.de === n.i || a.para === n.i)) continue
        const d = Math.hypot(o.x - n.x, o.y - n.y)
        if (d < dm && livre([[n.x, n.y], [o.x, o.y]])) { dm = d; melhor = o }
      }
      if (melhor) juntar(n.i, melhor.i, [[n.x, n.y], [melhor.x, melhor.y]], n.arestas[0].via)
    }
  }

  outro(a: Aresta, n: number) { return a.de === n ? a.para : a.de }

  /** O traçado de uma aresta a partir do nó `n`. */
  desde(a: Aresta, n: number): XY[] { return a.de === n ? a.pts : [...a.pts].reverse() }

  /** O nó mais perto de um ponto (entre os que têm arestas). */
  noPerto(x: number, y: number, filtro?: (n: No) => boolean) {
    let m: No | null = null, d = Infinity
    for (const n of this.nos) {
      if (!n.arestas.length || (filtro && !filtro(n))) continue
      const q = Math.hypot(n.x - x, n.y - y)
      if (q < d) { d = q; m = n }
    }
    return m!
  }

  /** A aresta mais perto de um ponto. */
  arestaPerto(x: number, y: number) {
    let m: Aresta | null = null, d = Infinity
    for (const a of this.arestas) {
      const q = distLinha(x, y, a.pts)
      if (q < d) { d = q; m = a }
    }
    return { aresta: m!, d }
  }

  /**
   * Distâncias até aos nós de chegada, para todos os nós de uma vez (o A*
   * visto ao contrário, sem heurística), com o custo de cada aresta dado por
   * `peso`. `seguinte[n]` é a aresta por onde se sai de n no caminho mais curto.
   */
  distancias(chegada: number[], peso: (a: Aresta) => number = (a) => a.custo) {
    const N = this.nos.length
    const dist = new Float64Array(N).fill(Infinity)
    const seguinte: (Aresta | null)[] = new Array(N).fill(null)
    const feito = new Uint8Array(N)
    // Monte binário à mão: o grafo tem centenas de nós e isto corre a cada decisão.
    const monte: [number, number][] = []
    const meter = (d: number, n: number) => {
      monte.push([d, n])
      let i = monte.length - 1
      while (i > 0) { const p = (i - 1) >> 1; if (monte[p][0] <= monte[i][0]) break; [monte[p], monte[i]] = [monte[i], monte[p]]; i = p }
    }
    const tirar = () => {
      const topo = monte[0], ult = monte.pop()!
      if (monte.length) {
        monte[0] = ult
        let i = 0
        for (;;) {
          const l = 2 * i + 1, r = l + 1
          let m = i
          if (l < monte.length && monte[l][0] < monte[m][0]) m = l
          if (r < monte.length && monte[r][0] < monte[m][0]) m = r
          if (m === i) break
          ;[monte[m], monte[i]] = [monte[i], monte[m]]; i = m
        }
      }
      return topo
    }
    for (const c of chegada) { dist[c] = 0; meter(0, c) }
    while (monte.length) {
      const [d, n] = tirar()
      if (feito[n]) continue
      feito[n] = 1
      for (const a of this.nos[n].arestas) {
        const o = this.outro(a, n)
        const nd = d + peso(a)
        if (nd < dist[o]) { dist[o] = nd; seguinte[o] = a; meter(nd, o) }
      }
    }
    return { dist, seguinte }
  }

  /** O caminho de `n` até à chegada, em pontos, seguindo `seguinte`. */
  caminho(n: number, seguinte: (Aresta | null)[]) {
    const pts: XY[] = [[this.nos[n].x, this.nos[n].y]]
    const arestas: Aresta[] = []
    for (let k = 0; k < 400 && seguinte[n]; k++) {
      const a = seguinte[n]!
      pts.push(...this.desde(a, n).slice(1))
      arestas.push(a)
      n = this.outro(a, n)
    }
    return { pts, arestas, fim: n }
  }
}
