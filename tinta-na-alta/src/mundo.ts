/**
 * O mundo: chão LiDAR, edifícios do OSM extrudidos até à altura medida, e
 * tudo desenhado a tinta. Coordenadas: o nível vem em (x nascente, y norte,
 * z cota); no three.js fica (x, cota, −y).
 */
import * as THREE from 'three'
import { Esboco, aleatorio, semente, papel, type P3 } from './tinta'

type Anel = [number, number][]
export type Edificio = {
  osm: string; nome: string | null; tipo: string; anel: Anel; furos: Anel[]
  base: number; topo: number; cumeeira: number; chaoMax: number; fonte: string; passagem: boolean
}
type Via = { osm: string; tipo: string; nome: string | null; passagem: boolean; area: boolean; largura: number | null; g: Anel }
export type Nivel = {
  meio: [number, number]
  dem: { x0: number; y0: number; passo: number; nCol: number; nRow: number; elev: number[] }
  edificios: Edificio[]; vias: Via[]; pracas: { osm: string; nome: string | null; g: Anel }[]
  muros: { osm: string; tipo: string; altura: number | null; g: Anel }[]
}

export const v3 = (x: number, yNorte: number, cota: number) => new THREE.Vector3(x, cota, -yNorte)
const p3 = (x: number, yNorte: number, cota: number): P3 => [x, cota, -yNorte]

/** Parâmetro t em [0,1] ao longo de AB onde este cruza CD, ou null. */
function cruzamento(A: [number, number], B: [number, number], C: [number, number], D: [number, number]) {
  const rx = B[0] - A[0], ry = B[1] - A[1], sx = D[0] - C[0], sy = D[1] - C[1]
  const den = rx * sy - ry * sx
  if (Math.abs(den) < 1e-9) return null
  const t = ((C[0] - A[0]) * sy - (C[1] - A[1]) * sx) / den
  const u = ((C[0] - A[0]) * ry - (C[1] - A[1]) * rx) / den
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? t : null
}

export function dentro(x: number, y: number, pol: Anel) {
  let d = false
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [xi, yi] = pol[i], [xj, yj] = pol[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d
  }
  return d
}

const IDS_PASSAGEM = new Set(['way/246397825', 'way/1165517467']) // Torre de Almedina, Porta da Barbacã
export const ID_SE = 'way/41222810'
export const ID_CLAUSTRO = 'relation/3475986'

export class Mundo {
  cena = new THREE.Group()
  colisao = new THREE.Group()
  pontos: Record<string, THREE.Vector3> = {}
  caminhoRota: THREE.Vector3[] = []
  private grelha = new Map<string, Edificio[]>()
  private quadriculas = new Map<string, Esboco>()

  /** O desenho da cidade vai em quadrículas de 48 m, para o three.js deixar de fora o que não se vê. */
  private quadricula(x: number, y: number) {
    const k = Math.floor(x / 48) + ',' + Math.floor(y / 48)
    let e = this.quadriculas.get(k)
    if (!e) { e = new Esboco('cidade:' + k, 1, 1.4); this.quadriculas.set(k, e) }
    return e
  }

  constructor(public n: Nivel) {
    for (const b of n.edificios) {
      const xs = b.anel.map((p) => p[0]), ys = b.anel.map((p) => p[1])
      for (let gx = Math.floor(Math.min(...xs) / 10); gx <= Math.floor(Math.max(...xs) / 10); gx++)
        for (let gy = Math.floor(Math.min(...ys) / 10); gy <= Math.floor(Math.max(...ys) / 10); gy++) {
          const k = gx + ',' + gy
          if (!this.grelha.has(k)) this.grelha.set(k, [])
          this.grelha.get(k)!.push(b)
        }
    }
  }

  /** Cota do chão (bilinear sobre os nós de 2 m). */
  chao(x: number, y: number) {
    const d = this.n.dem
    const c = Math.max(0, Math.min(d.nCol - 1.001, (x - d.x0) / d.passo))
    const r = Math.max(0, Math.min(d.nRow - 1.001, (y - d.y0) / d.passo))
    const c0 = Math.floor(c), r0 = Math.floor(r), fc = c - c0, fr = r - r0
    const e = (cc: number, rr: number) => d.elev[rr * d.nCol + cc]
    return (e(c0, r0) * (1 - fc) + e(c0 + 1, r0) * fc) * (1 - fr) + (e(c0, r0 + 1) * (1 - fc) + e(c0 + 1, r0 + 1) * fc) * fr
  }

  edificioEm(x: number, y: number, excepto?: Edificio) {
    for (const b of this.grelha.get(Math.floor(x / 10) + ',' + Math.floor(y / 10)) ?? []) {
      if (b === excepto) continue
      if (dentro(x, y, b.anel) && !b.furos.some((f) => dentro(x, y, f))) return b
    }
    return null
  }

  construir() {
    this.terreno()
    for (const b of this.n.edificios) {
      const xs = b.anel.map((p) => p[0]), ys = b.anel.map((p) => p[1])
      const esc = this.quadricula(xs.reduce((a, c) => a + c) / xs.length, ys.reduce((a, c) => a + c) / ys.length)
      if (b.osm === ID_CLAUSTRO) this.claustro(b, esc)
      else this.edificio(b, esc)
    }
    this.chaoDesenhado()
    this.muros()
    for (const esc of this.quadriculas.values()) this.cena.add(esc.acabar('mundo', papel, true))
    this.limites()
    this.marcarPontos()
  }

  private terreno() {
    const d = this.n.dem
    const pos: number[] = [], idx: number[] = []
    for (let r = 0; r < d.nRow; r++)
      for (let c = 0; c < d.nCol; c++) pos.push(...p3(d.x0 + c * d.passo, d.y0 + r * d.passo, d.elev[r * d.nCol + c]))
    for (let r = 0; r < d.nRow - 1; r++)
      for (let c = 0; c < d.nCol - 1; c++) {
        const a = r * d.nCol + c, b = a + 1, e = a + d.nCol, f = e + 1
        idx.push(a, b, e, b, f, e)
      }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setIndex(idx)
    g.computeVertexNormals()
    const m = new THREE.Mesh(g, papel)
    m.name = 'terreno'
    this.cena.add(m)
    this.colisao.add(new THREE.Mesh(g))
    // Os degraus do terreno (muros de suporte, socalcos) desenham-se sozinhos.
    const e = new THREE.EdgesGeometry(g, 38)
    const a = e.getAttribute('position').array as Float32Array
    for (let i = 0; i < a.length; i += 6) {
      this.quadricula((a[i] + a[i + 3]) / 2, -(a[i + 2] + a[i + 5]) / 2).segmentos(Array.from(a.subarray(i, i + 6)), 'pormenor')
    }
  }

  /** Paredes de um anel entre z0 e z1, com colisão. */
  private paredes(anel: Anel, z0: (i: number) => number, z1: number, esc: Esboco, colisao = true) {
    const pos: number[] = []
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], b = anel[(i + 1) % anel.length]
      const za = z0(i), zb = z0((i + 1) % anel.length)
      pos.push(...p3(a[0], a[1], za), ...p3(b[0], b[1], zb), ...p3(b[0], b[1], z1),
        ...p3(a[0], a[1], za), ...p3(b[0], b[1], z1), ...p3(a[0], a[1], z1))
      // Esquina só onde a parede vira: vértices a meio de uma parede recta não têm aresta.
      const ant = anel[(i - 1 + anel.length) % anel.length]
      const d1 = Math.atan2(a[1] - ant[1], a[0] - ant[0]), d2 = Math.atan2(b[1] - a[1], b[0] - a[0])
      if (Math.abs(Math.atan2(Math.sin(d2 - d1), Math.cos(d2 - d1))) > 0.2)
        esc.linha([p3(a[0], a[1], Math.max(za, this.chao(a[0], a[1]))), p3(a[0], a[1], z1)], 'aresta')
      // Onde a parede pousa no chão.
      if (za < this.chao(a[0], a[1]) + 0.2) {
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 1.5))
        const pe: P3[] = []
        for (let k = 0; k <= n; k++) {
          const x = a[0] + ((b[0] - a[0]) * k) / n, y = a[1] + ((b[1] - a[1]) * k) / n
          pe.push(p3(x, y, this.chao(x, y) + 0.03))
        }
        esc.linha(pe, 'aresta')
      }
    }
    esc.linha(anel.map(([x, y]) => p3(x, y, z1)), 'aresta', true)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    esc.solido(g, false)
    if (colisao) this.colisao.add(new THREE.Mesh(g.clone()))
  }

  private tampa(anel: Anel, furos: Anel[], z: number, esc: Esboco, colisao = true) {
    const s = new THREE.Shape(anel.map(([x, y]) => new THREE.Vector2(x, y)))
    for (const f of furos) s.holes.push(new THREE.Path(f.map(([x, y]) => new THREE.Vector2(x, y))))
    const g = new THREE.ShapeGeometry(s)
    g.rotateX(-Math.PI / 2) // (x, y) → (x, 0, −y)
    g.translate(0, z, 0)
    esc.solido(g, false)
    if (colisao) this.colisao.add(new THREE.Mesh(g.clone()))
  }

  private edificio(b: Edificio, esc: Esboco) {
    const passagem = IDS_PASSAGEM.has(b.osm)
    let fundo: (i: number) => number = () => b.base - 0.8
    if (passagem) {
      // O arco: o volume começa acima do chão mais alto da passagem.
      const cotas = this.n.vias.filter((v) => v.passagem).flatMap((v) => v.g)
        .filter(([x, y]) => dentro(x, y, b.anel)).map(([x, y]) => this.chao(x, y))
      const z = (cotas.length ? Math.max(...cotas) : b.base) + 4.2
      fundo = () => z
      this.tampa(b.anel, [], z, esc)
    }
    this.paredes(b.anel, fundo, b.topo, esc)
    this.tampa(b.anel, b.furos, b.topo, esc)
    for (const f of b.furos) this.paredes(f, () => b.base - 0.8, b.topo, esc)
    if (passagem) this.arcoPassagem(b, fundo(0), esc)
    const se = b.osm === ID_SE
    if (b.cumeeira - b.topo > 1.5 && !se) this.telhado(b, esc)
    this.fachadas(b, esc, se)
    if (se) this.ameias(b, esc)
  }

  /** Telhado de quatro águas simplificado: cumeeira ao longo do eixo maior. */
  private telhado(b: Edificio, esc: Esboco) {
    if (b.anel.length > 8) return
    const xs = b.anel.map((p) => p[0]), ys = b.anel.map((p) => p[1])
    const cx = xs.reduce((a, c) => a + c) / xs.length, cy = ys.reduce((a, c) => a + c) / ys.length
    const h = Math.min(b.cumeeira - b.topo, 4)
    const topo = p3(cx, cy, b.topo + h)
    for (let i = 0; i < b.anel.length; i++) {
      const a = b.anel[i], c = b.anel[(i + 1) % b.anel.length]
      esc.face([p3(a[0], a[1], b.topo), p3(c[0], c[1], b.topo), topo], false)
      esc.linha([p3(a[0], a[1], b.topo), topo], 'pormenor')
    }
  }

  private arcoPassagem(b: Edificio, z: number, esc: Esboco) {
    for (const v of this.n.vias.filter((v) => v.passagem)) {
      for (let i = 1; i < v.g.length; i++) {
        for (const p of [v.g[i - 1], v.g[i]]) {
          if (dentro(p[0], p[1], b.anel)) continue
          // Onde a via entra no edifício, desenha-se o arco na face.
          const q = p === v.g[i] ? v.g[i - 1] : v.g[i]
          const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy)
          const nx = -dy / L, ny = dx / L
          const pts: P3[] = []
          const raio = 1.8, base = z - 1.2
          for (let k = 0; k <= 16; k++) {
            const t = Math.PI * (k / 16)
            pts.push(p3(p[0] + (dx / L) * 0.5 + nx * Math.cos(t) * raio, p[1] + (dy / L) * 0.5 + ny * Math.cos(t) * raio, base + Math.sin(t) * 1.2))
          }
          esc.linha(pts, 'aresta')
        }
      }
    }
  }

  private livre(x: number, y: number, b: Edificio) {
    return !this.edificioEm(x, y, b) && !dentro(x, y, b.anel)
  }

  private fachadas(b: Edificio, esc: Esboco, se: boolean) {
    const r = aleatorio(semente(b.osm))
    const anel = b.anel
    if (se) this.portalSe(b, esc)
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], c = anel[(i + 1) % anel.length]
      const dx = c[0] - a[0], dy = c[1] - a[1], L = Math.hypot(dx, dy)
      if (L < 2.4) continue
      const ux = dx / L, uy = dy / L, nx = uy, ny = -ux // normal exterior (anel anti-horário)
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2
      if (!this.livre(mx + nx * 1.5, my + ny * 1.5, b)) continue
      const off = 0.04
      const P = (t: number, z: number, fora = off): P3 => p3(a[0] + ux * t + nx * fora, a[1] + uy * t + ny * fora, z)
      const chaoEm = (t: number) => this.chao(a[0] + ux * t + nx * 1.2, a[1] + uy * t + ny * 1.2)
      const rect = (t0: number, t1: number, z0: number, z1: number, traco: 'pormenor' | 'aresta' = 'pormenor') =>
        esc.linha([P(t0, z0), P(t1, z0), P(t1, z1), P(t0, z1)], traco, true)
      const tracejar = (t0: number, t1: number, z0: number, z1: number, espaco = 0.18) =>
        esc.tracejar(P(t0, z0), [ux * (t1 - t0), 0, -uy * (t1 - t0)], [0, z1 - z0, 0], espaco, 'sombra')

      if (se) {
        // Frestas altas e estreitas da catedral-fortaleza.
        const n = Math.floor(L / 6)
        for (let k = 0; k < n; k++) {
          const t = ((k + 0.5) * L) / n
          const z0 = Math.max(chaoEm(t) + 7, b.base + 9)
          if (z0 + 3 > b.topo - 1) continue
          rect(t - 0.25, t + 0.25, z0, z0 + 2.6)
          tracejar(t - 0.25, t + 0.25, z0, z0 + 2.6, 0.1)
        }
        continue
      }
      // Cornija
      esc.linha([P(0, b.topo - 0.35, 0.05), P(L, b.topo - 0.35, 0.05)], 'pormenor')
      const colunas = Math.floor(L / 3.1)
      if (!colunas) continue
      const passo = L / colunas
      let chaoMax = -Infinity
      for (let t = 0; t <= L; t += 1) chaoMax = Math.max(chaoMax, chaoEm(t))
      const rachas = r() < 0.3
      for (let k = 0; k < colunas; k++) {
        const t = passo * (k + 0.5)
        const zc = chaoEm(t)
        // Rés-do-chão: porta ou montra, a partir do chão desse ponto.
        if (zc < b.topo - 3 && zc > b.base - 1) {
          const tipo = r()
          if (tipo < 0.45) {
            rect(t - 0.55, t + 0.55, zc, zc + 2.3)
            esc.linha([P(t + 0.35, zc + 1.1), P(t + 0.35, zc + 1.2)], 'pormenor')
            if (r() < 0.5) tracejar(t - 0.55, t + 0.55, zc, zc + 2.3, 0.3)
          } else if (tipo < 0.75) {
            rect(t - 1.1, t + 1.1, zc + 0.5, zc + 2.6)
            esc.linha([P(t - 1.1, zc + 2.9), P(t + 1.1, zc + 2.9)], 'pormenor')
          }
        }
        // Andares de cima.
        for (let z = Math.max(zc, chaoMax - 2) + 3.6; z + 1.6 < b.topo - 0.6; z += 3.1) {
          if (r() < 0.08) continue
          const w = 0.5 + r() * 0.1
          rect(t - w, t + w, z, z + 1.5)
          esc.linha([P(t, z), P(t, z + 1.5)], 'pormenor')
          esc.linha([P(t - w - 0.12, z - 0.08, 0.1), P(t + w + 0.12, z - 0.08, 0.1)], 'pormenor')
          if (r() < 0.35) {
            // Vidro: dois ou três riscos, como nas janelas desenhadas à pressa.
            const s = t - w * 0.7
            esc.linha([P(s, z + 0.3), P(s + 0.35, z + 0.75)], 'sombra')
            esc.linha([P(s + 0.1, z + 0.2), P(s + 0.45, z + 0.65)], 'sombra')
          }
          if (r() < 0.12) {
            // Varanda de ferro.
            const g0 = z - 0.1
            esc.linha([P(t - w - 0.3, g0, 0.5), P(t + w + 0.3, g0, 0.5), P(t + w + 0.3, g0 + 0.9, 0.5), P(t - w - 0.3, g0 + 0.9, 0.5)], 'pormenor', true)
            for (let q = -w - 0.3; q <= w + 0.3; q += 0.2) esc.linha([P(t + q, g0, 0.5), P(t + q, g0 + 0.9, 0.5)], 'sombra')
          }
        }
        if (rachas && r() < 0.2) {
          const z = zc + 1 + r() * 4
          esc.linha([P(t + 1, z), P(t + 1.2, z - 0.4), P(t + 1.1, z - 0.8), P(t + 1.4, z - 1.3)], 'sombra')
        }
      }
    }
  }

/**
   * O portal da Sé: no corpo saliente da fachada poente (o troço virado a
   * poente que mais avança para o Largo, juntando arestas alinhadas que o OSM
   * parte em bocados), com a escadaria a descer dele para o Largo.
   */
  private portalSe(b: Edificio, esc: Esboco) {
    const anel = b.anel, n = anel.length
    const dir = (i: number) => {
      const a = anel[i], c = anel[(i + 1) % n]
      return Math.atan2(c[1] - a[1], c[0] - a[0])
    }
    type Troco = { i0: number; i1: number }
    const trocos: Troco[] = []
    for (let i = 0; i < n; i++) {
      const ult = trocos[trocos.length - 1]
      const d = ult ? Math.abs(Math.atan2(Math.sin(dir(i) - dir(ult.i1)), Math.cos(dir(i) - dir(ult.i1)))) : 9
      if (ult && d < 0.2) ult.i1 = i
      else trocos.push({ i0: i, i1: i })
    }
    let melhor: { a: [number, number]; c: [number, number]; L: number } | null = null
    for (const tr of trocos) {
      const a = anel[tr.i0], c = anel[(tr.i1 + 1) % n]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      if (L < 4 || (c[1] - a[1]) / L > -0.7) continue // normal exterior a apontar a poente
      if (!melhor || (a[0] + c[0]) / 2 < (melhor.a[0] + melhor.c[0]) / 2) melhor = { a, c, L }
    }
    if (!melhor) return
    const { a, c, L } = melhor
    const ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L, nx = uy, ny = -ux
    const P = (t: number, z: number, fora = 0.04): P3 => p3(a[0] + ux * t + nx * fora, a[1] + uy * t + ny * fora, z)
    const chaoEm = (t: number) => this.chao(a[0] + ux * t + nx * 0.6, a[1] + uy * t + ny * 0.6)
    const tracejar = (t0: number, t1: number, z0: number, z1: number, espaco = 0.18) =>
      esc.tracejar(P(t0, z0), [ux * (t1 - t0), 0, -uy * (t1 - t0)], [0, z1 - z0, 0], espaco, 'sombra')
    this.portal(P, L, chaoEm, esc, tracejar)
    // Escadaria: degraus do portal para o Largo, sobre o chão medido.
    const t = L / 2, meia = Math.min(L / 2 - 0.3, 3.4)
    const pe = (tt: number, fora: number): P3 => {
      const x = a[0] + ux * tt + nx * fora, y = a[1] + uy * tt + ny * fora
      return p3(x, y, this.chao(x, y) + 0.04)
    }
    for (let f = 0.4; f <= 5.6; f += 0.42) esc.linha([pe(t - meia, f), pe(t + meia, f)], f < 0.5 ? 'aresta' : 'chao')
    for (const s of [-1, 1]) {
      const pts: P3[] = []
      for (let f = 0; f <= 5.6; f += 0.7) pts.push(pe(t + s * meia, f))
      esc.linha(pts, 'pormenor')
    }
    this.pontos.portalSe = v3(a[0] + ux * t + nx * 6, a[1] + uy * t + ny * 6, this.chao(a[0] + ux * t + nx * 6, a[1] + uy * t + ny * 6))
  }

  private portal(P: (t: number, z: number, f?: number) => P3, L: number, chaoEm: (t: number) => number, esc: Esboco,
    tracejar: (t0: number, t1: number, z0: number, z1: number, e?: number) => void) {
    const t = L / 2, z = chaoEm(t)
    for (let k = 0; k < 4; k++) {
      const R = 1.6 + k * 0.45, h = 3.2
      const pts: P3[] = [P(t - R, z, 0.05 + k * 0.1)]
      for (let q = 0; q <= 20; q++) {
        const a = Math.PI * (1 - q / 20)
        pts.push(P(t + Math.cos(a) * R, z + h + Math.sin(a) * R, 0.05 + k * 0.1))
      }
      pts.push(P(t + R, z, 0.05 + k * 0.1))
      esc.linha(pts, k === 0 ? 'aresta' : 'pormenor')
    }
    tracejar(t - 1.6, t + 1.6, z, z + 3.2, 0.12)
    // Janela românica por cima do portal.
    const zj = z + 8
    const pts: P3[] = []
    for (let q = 0; q <= 16; q++) {
      const a = Math.PI * (1 - q / 16)
      pts.push(P(t + Math.cos(a) * 1.3, zj + 2 + Math.sin(a) * 1.3))
    }
    esc.linha([P(t - 1.3, zj), ...pts, P(t + 1.3, zj), P(t - 1.3, zj)], 'aresta')
  }

  /** Merlões ao longo do beirado da Sé. */
  private ameias(b: Edificio, esc: Esboco) {
    const z = b.topo
    for (let i = 0; i < b.anel.length; i++) {
      const a = b.anel[i], c = b.anel[(i + 1) % b.anel.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      const ang = Math.atan2(c[1] - a[1], c[0] - a[0])
      for (let t = 0.6; t < L - 0.6; t += 1.9) {
        const x = a[0] + ((c[0] - a[0]) * t) / L, y = a[1] + ((c[1] - a[1]) * t) / L
        esc.caixa(1.0, 1.3, 0.7, x, z + 0.65, -y, ang)
      }
    }
  }

  /**
   * O claustro: galeria entre o anel exterior e o pátio, porta para o Largo e
   * arcaria para o pátio. Tudo inventado a partir da planta — é um jogo.
   */
  private claustro(b: Edificio, esc: Esboco) {
    const exterior = b.anel
    const patio = b.furos[0]
    const zTopo = b.topo
    const fundo = b.base - 0.8
    // Porta na face exterior livre mais próxima do Largo da Sé Velha.
    const largo = this.pontoLargo()
    let melhor = -1, dist = Infinity
    for (let i = 0; i < exterior.length; i++) {
      const a = exterior[i], c = exterior[(i + 1) % exterior.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      if (L < 6) continue
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2
      const nx = (c[1] - a[1]) / L, ny = -(c[0] - a[0]) / L
      if (!this.livre(mx + nx * 2, my + ny * 2, b)) continue
      const d = Math.hypot(mx - largo[0], my - largo[1])
      if (d < dist) { dist = d; melhor = i }
    }
    const aberturas = new Map<number, [number, number, number][]>() // aresta → [t0, t1, altura]
    if (melhor >= 0) {
      const a = exterior[melhor], c = exterior[(melhor + 1) % exterior.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      aberturas.set(melhor, [[L / 2 - 1.3, L / 2 + 1.3, 3.4]])
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2
      const nx = (c[1] - a[1]) / L, ny = -(c[0] - a[0]) / L
      this.pontos.portaClaustro = v3(mx + nx * 2.5, my + ny * 2.5, this.chao(mx + nx * 2.5, my + ny * 2.5))
      this.pontos.dentroClaustro = v3(mx - nx * 2.5, my - ny * 2.5, this.chao(mx - nx * 2.5, my - ny * 2.5))
    }
    this.paredesComAberturas(exterior, fundo, zTopo, aberturas, esc, 0.6, false)
    if (patio) {
      // Arcaria: aberturas regulares em todas as faces do pátio.
      const arcos = new Map<number, [number, number, number][]>()
      const pr = [...patio].reverse() // anti-horário visto do pátio para fora
      for (let i = 0; i < pr.length; i++) {
        const a = pr[i], c = pr[(i + 1) % pr.length]
        const L = Math.hypot(c[0] - a[0], c[1] - a[1])
        const n = Math.floor(L / 3.4)
        const lista: [number, number, number][] = []
        for (let k = 0; k < n; k++) {
          const t = (L / n) * (k + 0.5)
          lista.push([t - 1.1, t + 1.1, 3.0])
        }
        arcos.set(i, lista)
      }
      this.paredesComAberturas(pr, fundo, zTopo, arcos, esc, 0.6, true)
      const xs = patio.map((p) => p[0]), ys = patio.map((p) => p[1])
      const cx = xs.reduce((s, v) => s + v) / xs.length, cy = ys.reduce((s, v) => s + v) / ys.length
      this.pontos.patio = v3(cx, cy, this.chao(cx, cy))
    }
    // Tecto da galeria: laje entre os dois anéis, com a cota do terreno a subir
    // por dentro; fica ao beirado para não se ver o céu por cima da galeria.
    this.tampa(exterior, patio ? [patio] : [], zTopo, esc)
    // Um fontanário no meio do pátio.
    if (this.pontos.patio) {
      const p = this.pontos.patio
      const g = new THREE.CylinderGeometry(1.4, 1.6, 0.8, 24)
      g.translate(p.x + 3, p.y + 0.4, p.z + 2)
      esc.solido(g, 'aresta', 50)
      const e = new THREE.CylinderGeometry(1.4, 1.4, 0.01, 24, 1, true)
      e.translate(p.x + 3, p.y + 0.8, p.z + 2)
      esc.solido(e, false)
      const cop = new THREE.CylinderGeometry(0.15, 0.2, 1.4, 8)
      cop.translate(p.x + 3, p.y + 1.1, p.z + 2)
      esc.solido(cop, 'pormenor', 50)
      const col = new THREE.CylinderGeometry(1.6, 1.6, 1.4, 12)
      col.translate(p.x + 3, p.y + 0.7, p.z + 2)
      this.colisao.add(new THREE.Mesh(col))
    }
  }

  /**
   * Paredes grossas com vãos. Cada aresta vira caixa: pedaços cheios entre os
   * vãos e um lintel por cima de cada vão (com arco desenhado).
   */
  private paredesComAberturas(anel: Anel, fundo: number, topo: number,
    vaos: Map<number, [number, number, number][]>, esc: Esboco, esp: number, arcos: boolean) {
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], c = anel[(i + 1) % anel.length]
      const dx = c[0] - a[0], dy = c[1] - a[1], L = Math.hypot(dx, dy)
      if (L < 0.2) continue
      const ux = dx / L, uy = dy / L
      const ang = Math.atan2(dy, dx)
      const lista = (vaos.get(i) ?? []).filter(([t0, t1]) => t0 > 0.3 && t1 < L - 0.3)
      const bloco = (t0: number, t1: number, z0: number, z1: number) => {
        if (t1 - t0 < 0.05 || z1 - z0 < 0.05) return
        const tm = (t0 + t1) / 2
        // As paredes ficam para dentro do anel (esquerda do sentido de percurso).
        const x = a[0] + ux * tm - uy * esp * 0.5, y = a[1] + uy * tm + ux * esp * 0.5
        const g = new THREE.BoxGeometry(t1 - t0, z1 - z0, esp)
        g.rotateY(ang)
        g.translate(x, (z0 + z1) / 2, -y)
        this.colisao.add(new THREE.Mesh(g.clone()))
        esc.solido(g, 'aresta')
      }
      let t = 0
      for (const [t0, t1, h] of lista) {
        bloco(t, t0, fundo, topo)
        const zc = Math.min(this.chao(a[0] + ux * t0, a[1] + uy * t0), this.chao(a[0] + ux * t1, a[1] + uy * t1))
        bloco(t0, t1, fundo, zc - 0.05)
        bloco(t0, t1, zc + h, topo)
        if (arcos) {
          const pts: P3[] = []
          const R = (t1 - t0) / 2, tm = (t0 + t1) / 2
          for (let q = 0; q <= 14; q++) {
            const ang2 = Math.PI * (q / 14)
            const tt = tm + Math.cos(ang2) * R
            pts.push(p3(a[0] + ux * tt + uy * 0.02, a[1] + uy * tt - ux * 0.02, zc + h - R * 0.6 + Math.sin(ang2) * R * 0.6))
          }
          esc.linha(pts, 'pormenor')
        }
        t = t1
      }
      bloco(t, L, fundo, topo)
    }
  }

  private pontoLargo(): [number, number] {
    const l = this.n.pracas.find((p) => p.osm === 'way/201639837')
    if (!l) return [30, 5]
    const xs = l.g.map((p) => p[0]), ys = l.g.map((p) => p[1])
    return [xs.reduce((a, b) => a + b) / xs.length, ys.reduce((a, b) => a + b) / ys.length]
  }

  /** Degraus desenhados sobre as escadas do OSM, e o traço das vias. */
  private chaoDesenhado() {
    for (const v of this.n.vias) {
      if (v.tipo !== 'steps') continue
      const W = v.largura ?? 2.6
      for (let i = 1; i < v.g.length; i++) {
        const a = v.g[i - 1], b = v.g[i]
        const L = Math.hypot(b[0] - a[0], b[1] - a[1])
        const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L
        for (let t = 0; t < L; t += 0.45) {
          const x = a[0] + ux * t, y = a[1] + uy * t
          const z = this.chao(x, y) + 0.04
          this.quadricula(x, y).linha([p3(x - uy * W / 2, y + ux * W / 2, z), p3(x + uy * W / 2, y - ux * W / 2, z)], 'chao')
        }
        for (const s of [-1, 1]) {
          const pts: P3[] = []
          for (let t = 0; t <= L; t += 1) {
            const x = a[0] + ux * t + s * -uy * W / 2, y = a[1] + uy * t + s * ux * W / 2
            pts.push(p3(x, y, this.chao(x, y) + 0.05))
          }
          this.quadricula(a[0], a[1]).linha(pts, 'pormenor')
        }
      }
    }
    // Calçada: pequenas marcas espalhadas pelas ruas, poucas, como quem sugere.
    const r = aleatorio(7)
    for (const v of this.n.vias) {
      if (v.tipo === 'steps' || v.tipo === 'service') continue
      for (let i = 1; i < v.g.length; i++) {
        const a = v.g[i - 1], b = v.g[i]
        const L = Math.hypot(b[0] - a[0], b[1] - a[1])
        for (let t = r() * 4; t < L; t += 3 + r() * 5) {
          const x = a[0] + ((b[0] - a[0]) * t) / L + (r() - 0.5) * 3, y = a[1] + ((b[1] - a[1]) * t) / L + (r() - 0.5) * 3
          if (this.edificioEm(x, y)) continue
          const z = this.chao(x, y) + 0.04
          const s = 0.18 + r() * 0.15
          this.quadricula(x, y).linha([p3(x - s, y, z), p3(x, y + s * 0.4, z), p3(x + s, y, z)], 'chao')
        }
      }
    }
  }

  private muros() {
    for (const m of this.n.muros) {
      if (m.tipo === 'retaining_wall') continue
      const h = m.altura ?? (m.tipo === 'city_wall' ? 4 : 1.6)
      for (let i = 1; i < m.g.length; i++) {
        const A = m.g[i - 1], B = m.g[i]
        const LL = Math.hypot(B[0] - A[0], B[1] - A[1])
        if (LL < 0.3) continue
        // Onde o muro cruza uma rua há passagem (o OSM desenha a cerca por cima dos arcos).
        const cortes: number[] = []
        for (const v of this.n.vias) {
          if (v.area) continue
          for (let k = 1; k < v.g.length; k++) {
            const t = cruzamento(A, B, v.g[k - 1], v.g[k])
            if (t !== null) cortes.push(t)
          }
        }
        const folga = 1.8 / LL
        const pedacos: [number, number][] = []
        let t0 = 0
        for (const t of cortes.sort((p, q) => p - q)) {
          if (t - folga > t0) pedacos.push([t0, t - folga])
          t0 = Math.max(t0, t + folga)
        }
        if (t0 < 1) pedacos.push([t0, 1])
        for (const [u0, u1] of pedacos) {
          const a: [number, number] = [A[0] + (B[0] - A[0]) * u0, A[1] + (B[1] - A[1]) * u0]
          const b: [number, number] = [A[0] + (B[0] - A[0]) * u1, A[1] + (B[1] - A[1]) * u1]
          const L = LL * (u1 - u0)
          if (L < 0.3) continue
          const za = this.chao(a[0], a[1]), zb = this.chao(b[0], b[1])
          const z0 = Math.min(za, zb) - 0.5, z1 = Math.max(za, zb) + h
          const g = new THREE.BoxGeometry(L, z1 - z0, 0.5)
          g.rotateY(Math.atan2(b[1] - a[1], b[0] - a[0]))
          g.translate((a[0] + b[0]) / 2, (z0 + z1) / 2, -(a[1] + b[1]) / 2)
          this.colisao.add(new THREE.Mesh(g.clone()))
          this.quadricula(a[0], a[1]).solido(g)
        }
      }
    }
  }

  private limites() {
    const [mx, my] = this.n.meio
    const X = mx - 4, Y = my - 4
    for (const [a, b] of [[[-X, -Y], [X, -Y]], [[X, -Y], [X, Y]], [[X, Y], [-X, Y]], [[-X, Y], [-X, -Y]]] as [number, number][][]) {
      const L = Math.hypot(b[0] - a[0], b[1] - a[1])
      const g = new THREE.BoxGeometry(L, 300, 1)
      g.rotateY(Math.atan2(b[1] - a[1], b[0] - a[0]))
      g.translate((a[0] + b[0]) / 2, 50, -(a[1] + b[1]) / 2)
      this.colisao.add(new THREE.Mesh(g))
    }
  }

  /**
   * O percurso da missão pelas ruas do OSM: Ferreira Borges, Barbacã, Arco,
   * a dobra para o Quebra-Costas, as escadas, o Largo e o claustro.
   */
  percurso: THREE.Vector3[] = []
  private comprimentos: number[] = []

  private marcarPontos() {
    const via = (id: string) => this.n.vias.find((v) => v.osm === id)?.g ?? []
    const plano: [number, number][] = [
      ...via('way/1165517465'), ...via('way/1165517464'), ...via('way/41222814'), ...via('way/121298535'),
      ...via('way/121298533'), ...via('way/121298534'), ...via('way/1128379641'), ...via('way/116224908'),
      [24, 18], [32, 6], [38, -1], [41, -9],
    ]
    const limpo: [number, number][] = []
    for (const p of plano) if (!limpo.length || Math.hypot(p[0] - limpo[limpo.length - 1][0], p[1] - limpo[limpo.length - 1][1]) > 0.5) limpo.push(p)
    const noChao = (x: number, y: number) => v3(x, y, this.chao(x, y))
    const P = this.pontos
    const perto = (alvo: [number, number]) => limpo.reduce((m, p) => Math.hypot(p[0] - alvo[0], p[1] - alvo[1]) < Math.hypot(m[0] - alvo[0], m[1] - alvo[1]) ? p : m)
    P.inicio = noChao(...limpo[0])
    P.olharInicio = noChao(...perto([-99, 19]))
    P.arco = noChao(-82, 12.5)
    P.largoArco = noChao(...perto([-70, -1]))
    P.escadasBase = noChao(...perto([-45, 7]))
    P.escadasMeio = noChao(...perto([-16, 17]))
    P.escadasTopo = noChao(...perto([16, 13]))
    P.largo = noChao(32, 6)
    const extra = [P.portaClaustro, P.dentroClaustro, P.patio].filter(Boolean)
    this.percurso = [...limpo.map(([x, y]) => noChao(x, y)), ...extra]
    let acc = 0
    this.comprimentos = this.percurso.map((p, k) => (acc += k ? p.distanceTo(this.percurso[k - 1]) : 0))
    this.caminhoRota = this.percurso
  }

  /** Distância ao longo do percurso do vértice mais perto de um ponto. */
  sDe(v: THREE.Vector3) {
    let m = 0, d = Infinity
    this.percurso.forEach((p, k) => { const q = p.distanceTo(v); if (q < d) { d = q; m = k } })
    return this.comprimentos[m]
  }

  /** Ponto a s metros do início do percurso, com desvio lateral (fora dos edifícios). */
  noPercurso(s: number, lateral = 0) {
    const C = this.comprimentos, Pp = this.percurso
    let k = 1
    while (k < C.length - 1 && C[k] < s) k++
    const a = Pp[k - 1], b = Pp[k]
    const t = THREE.MathUtils.clamp((s - C[k - 1]) / Math.max(C[k] - C[k - 1], 1e-3), 0, 1)
    const x0 = a.x + (b.x - a.x) * t, y0 = -(a.z + (b.z - a.z) * t)
    const dx = b.x - a.x, dy = -(b.z - a.z), L = Math.hypot(dx, dy) || 1
    for (let f = 1; f >= 0; f -= 0.25) {
      const x = x0 - (dy / L) * lateral * f, y = y0 + (dx / L) * lateral * f
      if (!this.edificioEm(x, y)) return v3(x, y, this.chao(x, y))
    }
    return v3(x0, y0, this.chao(x0, y0))
  }
}
