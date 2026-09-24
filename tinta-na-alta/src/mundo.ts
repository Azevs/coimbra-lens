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

/** Placa toponímica desenhada à mão: moldura dupla e letras de caneta. */
function placa(texto: string) {
  const c = document.createElement('canvas')
  const g = c.getContext('2d')!
  const fonte = '600 64px "Patrick Hand", "Segoe Print", cursive'
  g.font = fonte
  c.width = Math.ceil(g.measureText(texto.toUpperCase()).width) + 90
  c.height = 130
  g.fillStyle = '#fff'
  g.fillRect(0, 0, c.width, c.height)
  g.strokeStyle = '#111'
  g.lineWidth = 5
  g.strokeRect(8, 8, c.width - 16, c.height - 16)
  g.lineWidth = 2
  g.strokeRect(20, 20, c.width - 40, c.height - 40)
  g.font = fonte
  g.fillStyle = '#111'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(texto.toUpperCase(), c.width / 2, c.height / 2 + 3)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  const h = 0.5
  return new THREE.Mesh(new THREE.PlaneGeometry((h * c.width) / c.height, h),
    new THREE.MeshBasicMaterial({ map: t, polygonOffset: true, polygonOffsetFactor: -2 }))
}

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

/** Portas da cerca e a rua que passa por cada uma. */
const PORTAS: Record<string, string> = {
  'way/246397825': 'way/121298535', // Torre de Almedina
  'way/1165517467': 'way/1165517464', // Porta da Barbacã
}
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

  /** Cota do chão nivelado da galeria do claustro (o LiDAR lá dentro tem saliências). */
  pisoClaustro = 0

  constructor(public n: Nivel) {
    this.nivelarClaustro()
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

  /**
   * Dentro do claustro o chão fica entre a cota do pátio e 1,6 m abaixo dela:
   * as saliências de até 6 m que o laser mede ali (muros, coberturas) não são
   * chão por onde se ande, e a rampa desde a porta continua suave.
   */
  private nivelarClaustro() {
    const c = this.n.edificios.find((b) => b.osm === ID_CLAUSTRO)
    if (!c || !c.furos[0]) return
    const d = this.n.dem, patio: number[] = [], nos: number[] = []
    for (let r = 0; r < d.nRow; r++)
      for (let k = 0; k < d.nCol; k++) {
        const x = d.x0 + k * d.passo, y = d.y0 + r * d.passo
        if (!dentro(x, y, c.anel)) continue
        nos.push(r * d.nCol + k)
        if (dentro(x, y, c.furos[0])) patio.push(d.elev[r * d.nCol + k])
      }
    patio.sort((a, b) => a - b)
    const med = patio[patio.length >> 1]
    for (const i of nos) d.elev[i] = Math.min(med + 0.4, Math.max(med - 1.6, d.elev[i]))
    this.pisoClaustro = med + 0.4
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
    this.mobiliario()
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
    const e = new THREE.EdgesGeometry(g, 46)
    const a = e.getAttribute('position').array as Float32Array
    for (let i = 0; i < a.length; i += 6) {
      const mx = (a[i] + a[i + 3]) / 2, my = -(a[i + 2] + a[i + 5]) / 2
      // Debaixo dos prédios não se vê, e a rua não precisa de rabiscos.
      if (this.edificioEm(mx, my)) continue
      this.quadricula(mx, my).segmentos(Array.from(a.subarray(i, i + 6)), 'pormenor')
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
    const via = PORTAS[b.osm]
    if (via) return this.portaDaCidade(b, via, esc)
    this.paredes(b.anel, () => b.base - 0.8, b.topo, esc)
    this.tampa(b.anel, b.furos, b.topo, esc)
    for (const f of b.furos) this.paredes(f, () => b.base - 0.8, b.topo, esc)
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

  /**
   * Pedra de uma torre, desenhada como num esboço: cunhais alternados nas
   * esquinas, uma cornija debaixo dos merlões e fiadas soltas aqui e ali.
   */
  private pedra(anel: Anel, b: Edificio, esc: Esboco) {
    const r = aleatorio(semente(b.osm + ':pedra'))
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], c = anel[(i + 1) % anel.length], ant = anel[(i - 1 + anel.length) % anel.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      const ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L, nx = uy, ny = -ux
      const La = Math.hypot(a[0] - ant[0], a[1] - ant[1])
      const vx = (ant[0] - a[0]) / La, vy = (ant[1] - a[1]) / La // ao longo da face anterior
      const F = (t: number, z: number, sx = ux, sy = uy, fx = nx, fy = ny): P3 => p3(a[0] + sx * t + fx * 0.05, a[1] + sy * t + fy * 0.05, z)
      const z0 = Math.max(this.chao(a[0] + nx, a[1] + ny), b.base)
      // Cunhais: blocos alternados, compridos numa face e curtos na outra.
      let alt = 0
      for (let z = z0 + 0.1; z + 0.5 < b.topo - 0.6; z += 0.52, alt ^= 1) {
        const w1 = alt ? 0.75 : 0.4, w2 = alt ? 0.4 : 0.75
        esc.linha([F(0, z + 0.5), F(w1, z + 0.5), F(w1, z)], 'pormenor')
        esc.linha([F(0, z + 0.5, vx, vy, -vy, vx), F(w2, z + 0.5, vx, vy, -vy, vx), F(w2, z, vx, vy, -vy, vx)], 'pormenor')
      }
      // Cornija por baixo dos merlões.
      esc.linha([F(0, b.topo - 0.45), F(L, b.topo - 0.45)], 'pormenor')
      // Fiadas soltas: poucas, como quem sugere a pedra sem a desenhar toda.
      for (let k = 0; k < L * (b.topo - z0) * 0.05; k++) {
        const t = 1 + r() * Math.max(0.1, L - 2), z = z0 + 1 + r() * (b.topo - z0 - 3)
        const w = 0.5 + r() * 0.5
        esc.linha([F(t, z), F(t + w, z)], 'sombra')
        if (r() < 0.6) esc.linha([F(t + w, z), F(t + w, z + 0.32)], 'sombra')
        if (r() < 0.4) esc.linha([F(t + w * 0.4, z - 0.32), F(t + w * 0.4 + w, z - 0.32)], 'sombra')
      }
    }
  }

  /**
   * Porta medieval da cerca (Torre de Almedina, Barbacã): paredes até ao chão,
   * arco de volta perfeita onde a rua entra e sai, e túnel abobadado por dentro.
   */
  private portaDaCidade(b: Edificio, viaId: string, esc: Esboco) {
    const g = this.n.vias.find((v) => v.osm === viaId)?.g
    if (!g) return
    // A via do OSM começa e acaba em cima do contorno: prolonga-se para cruzar de certeza.
    const pr = (p: [number, number], q: [number, number]): [number, number] => {
      const L = Math.hypot(p[0] - q[0], p[1] - q[1]) || 1
      return [p[0] + ((p[0] - q[0]) / L) * 3, p[1] + ((p[1] - q[1]) / L) * 3]
    }
    const via: [number, number][] = [pr(g[0], g[1]), ...g.slice(1, -1), pr(g[g.length - 1], g[g.length - 2])]
    const NASCENCA = 2.9
    const vaos = new Map<number, [number, number, number][]>()
    const bocas: [number, number][] = []
    // Contorno sem os vértices a meio de paredes rectas (o OSM parte a Barbacã em bocados de 1 m).
    const anel = b.anel.filter((p, i, A) => {
      const q = A[(i - 1 + A.length) % A.length], r = A[(i + 1) % A.length]
      if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 0.05) return false
      const d1 = Math.atan2(p[1] - q[1], p[0] - q[0]), d2 = Math.atan2(r[1] - p[1], r[0] - p[0])
      return Math.abs(Math.atan2(Math.sin(d2 - d1), Math.cos(d2 - d1))) > 0.12
    })
    const cruzes: { i: number; t: number; L: number }[] = []
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], c = anel[(i + 1) % anel.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      for (let k = 1; k < via.length; k++) {
        const t = cruzamento(a, c, via[k - 1], via[k])
        if (t !== null) cruzes.push({ i, t, L })
      }
    }
    // O arco cabe na parede mais estreita por onde a rua passa (a Barbacã tem 4 m).
    const W = Math.min(3.6, ...cruzes.map((c) => c.L - 0.8)), R = W / 2
    for (const { i, t, L } of cruzes) {
      if (W < 2) continue
      const a = anel[i], c = anel[(i + 1) % anel.length]
      // Vão centrado no cruzamento, sem sair da aresta.
      const tm = THREE.MathUtils.clamp(t * L, R + 0.35, L - R - 0.35)
      vaos.set(i, [...(vaos.get(i) ?? []), [tm - R, tm + R, NASCENCA + R]])
      bocas.push([a[0] + ((c[0] - a[0]) * tm) / L, a[1] + ((c[1] - a[1]) * tm) / L])
    }
    this.paredesComAberturas(anel, b.base - 0.8, b.topo, vaos, esc, 0.7, 'real')
    this.tampa(anel, [], b.topo, esc)
    this.ameias({ ...b, anel }, esc)
    this.pedra(anel, b, esc)
    // Túnel entre as duas bocas: paredes laterais e abóbada de berço.
    if (bocas.length >= 2) {
      const [e1, e2] = bocas
      const dx = e2[0] - e1[0], dy = e2[1] - e1[1], L = Math.hypot(dx, dy)
      const ux = dx / L, uy = dy / L, lx = -uy, ly = ux
      const z1 = this.chao(...e1), z2 = this.chao(...e2)
      for (const s of [-1, 1]) {
        const o = s * (R + 0.35)
        const zb = Math.min(z1, z2) - 1, zt = Math.max(z1, z2) + NASCENCA + R + 0.5
        const gg = new THREE.BoxGeometry(L, zt - zb, 0.7)
        gg.rotateY(Math.atan2(dy, dx))
        gg.translate((e1[0] + e2[0]) / 2 + lx * o, (zb + zt) / 2, -((e1[1] + e2[1]) / 2 + ly * o))
        this.colisao.add(new THREE.Mesh(gg.clone()))
        esc.solido(gg, false)
        // Linha de nascença da abóbada e o rodapé, nas duas paredes do túnel.
        const x0 = e1[0] + lx * s * R, y0 = e1[1] + ly * s * R, x1 = e2[0] + lx * s * R, y1 = e2[1] + ly * s * R
        esc.linha([p3(x0, y0, z1 + NASCENCA), p3(x1, y1, z2 + NASCENCA)], 'pormenor')
        esc.linha([p3(x0, y0, this.chao(x0, y0) + 0.03), p3(x1, y1, this.chao(x1, y1) + 0.03)], 'aresta')
      }
      const n = 16, pos: number[] = []
      const arco = (e: [number, number], z: number, k: number): P3 => {
        const a = Math.PI * (k / n)
        return p3(e[0] + lx * Math.cos(a) * R, e[1] + ly * Math.cos(a) * R, z + NASCENCA + Math.sin(a) * R)
      }
      for (let k = 0; k < n; k++) {
        pos.push(...arco(e1, z1, k), ...arco(e2, z2, k), ...arco(e2, z2, k + 1), ...arco(e1, z1, k), ...arco(e2, z2, k + 1), ...arco(e1, z1, k + 1))
      }
      const v = new THREE.BufferGeometry()
      v.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
      esc.solido(v, false)
      // Juntas das aduelas ao longo da abóbada: três riscos finos.
      for (const k of [4, 8, 12]) esc.linha([arco(e1, z1, k), arco(e2, z2, k)], 'sombra')
      // Uma janela por cima de cada boca.
      for (const e of [e1, e2]) {
        const z = this.chao(...e) + NASCENCA + R + 3
        if (z + 2 > b.topo - 1.5) continue
        const pts: P3[] = []
        for (let k = 0; k <= 10; k++) {
          const a = Math.PI * (k / 10)
          pts.push(p3(e[0] + lx * Math.cos(a) * 0.5, e[1] + ly * Math.cos(a) * 0.5, z + 1.2 + Math.sin(a) * 0.5))
        }
        const sx = e === e1 ? -ux : ux, sy = e === e1 ? -uy : uy
        const fora = (p: P3): P3 => [p[0] + sx * 0.06, p[1], p[2] - sy * 0.06]
        esc.linha([fora(p3(e[0] + lx * 0.5, e[1] + ly * 0.5, z)), ...pts.map(fora), fora(p3(e[0] - lx * 0.5, e[1] - ly * 0.5, z))], 'pormenor')
        esc.linha([fora(p3(e[0] + lx * 0.5, e[1] + ly * 0.5, z)), fora(p3(e[0] - lx * 0.5, e[1] - ly * 0.5, z))], 'pormenor')
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
      if (L < 1.8) continue
      const ux = dx / L, uy = dy / L, nx = uy, ny = -ux // normal exterior (anel anti-horário)
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2
      // Fachada com rua à frente em pelo menos parte do comprimento (cada vão confirma o seu).
      const livreEm = (t: number) => this.livre(a[0] + ux * t + nx * 1.1, a[1] + uy * t + ny * 1.1, b)
      // Onde há um vizinho encostado, a parede só se vê acima do telhado dele.
      const acimaDe = (t: number) => {
        if (livreEm(t)) return -Infinity
        const v = this.edificioEm(a[0] + ux * t + nx * 1.1, a[1] + uy * t + ny * 1.1, b)
        return v ? Math.max(v.topo, v.cumeeira) + 0.5 : Infinity
      }
      if (![0.15, 0.5, 0.85].some((f) => acimaDe(f * L) < b.topo - 2.6)) continue
      void mx; void my
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
      const colunas = Math.max(1, Math.floor(L / 3.1))
      const passo = L / colunas
      let chaoMax = -Infinity
      for (let t = 0; t <= L; t += 1) chaoMax = Math.max(chaoMax, chaoEm(t))
      const rachas = r() < 0.3
      for (let k = 0; k < colunas; k++) {
        const t = passo * (k + 0.5)
        const desde = acimaDe(t)
        if (desde >= b.topo - 2.6) continue
        const rua = desde === -Infinity
        const zc = chaoEm(t)
        // Rés-do-chão: porta ou montra, a partir do chão desse ponto (só com rua à frente).
        if (rua && zc < b.topo - 3 && zc > b.base - 1) {
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
          if (z < desde) continue
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
    // Telhado ao beirado e, por baixo, o tecto da galeria à altura de gente.
    this.tampa(exterior, patio ? [patio] : [], zTopo, esc)
    if (patio && this.pisoClaustro) {
      const zg = this.pisoClaustro + 4.5
      this.tampa(exterior, [patio], zg, esc)
      // Onde o tecto encontra as paredes, e as traves de madeira a cada 2,5 m.
      const inset = (anel: Anel, o: number) => anel.map(([x, y], i): P3 => {
        const a = anel[(i - 1 + anel.length) % anel.length], c = anel[(i + 1) % anel.length]
        const d1 = Math.hypot(x - a[0], y - a[1]) || 1, d2 = Math.hypot(c[0] - x, c[1] - y) || 1
        const n1 = [(y - a[1]) / d1, -(x - a[0]) / d1], n2 = [(c[1] - y) / d2, -(c[0] - x) / d2]
        return p3(x - (n1[0] + n2[0]) * 0.5 * o, y - (n1[1] + n2[1]) * 0.5 * o, zg - 0.02)
      })
      esc.linha(inset(patio, 0.03), 'aresta', true)
      for (let i = 0; i < patio.length; i++) {
        const a = patio[i], c = patio[(i + 1) % patio.length]
        const L = Math.hypot(c[0] - a[0], c[1] - a[1]), ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L
        for (let t = 1.2; t < L - 1; t += 2.5) {
          // Trave do pátio para fora, até ao muro exterior (ou 8 m).
          const x0 = a[0] + ux * t, y0 = a[1] + uy * t, nx = -uy, ny = ux
          let fim = 0.1
          while (fim < 8 && dentro(x0 + nx * fim, y0 + ny * fim, exterior)) fim += 0.3
          esc.linha([p3(x0 + nx * 0.1, y0 + ny * 0.1, zg - 0.03), p3(x0 + nx * (fim - 0.4), y0 + ny * (fim - 0.4), zg - 0.03)], 'pormenor')
        }
      }
    }
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
    vaos: Map<number, [number, number, number][]>, esc: Esboco, esp: number, arcos: boolean | 'real') {
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i], c = anel[(i + 1) % anel.length]
      const dx = c[0] - a[0], dy = c[1] - a[1], L = Math.hypot(dx, dy)
      if (L < 0.2) continue
      const ux = dx / L, uy = dy / L
      const ang = Math.atan2(dy, dx)
      const lista = (vaos.get(i) ?? []).filter(([t0, t1]) => t0 > 0.3 && t1 < L - 0.3)
      const bloco = (t0: number, t1: number, z0: number, z1: number, arestas = true) => {
        if (t1 - t0 < 0.05 || z1 - z0 < 0.05) return
        const tm = (t0 + t1) / 2
        // As paredes ficam para dentro do anel (esquerda do sentido de percurso).
        const x = a[0] + ux * tm - uy * esp * 0.5, y = a[1] + uy * tm + ux * esp * 0.5
        const g = new THREE.BoxGeometry(t1 - t0, z1 - z0, esp)
        g.rotateY(ang)
        g.translate(x, (z0 + z1) / 2, -y)
        this.colisao.add(new THREE.Mesh(g.clone()))
        esc.solido(g, arestas ? 'aresta' : false)
      }
      // Ponto na parede: t ao longo da aresta, o para dentro, z cota.
      const W = (t: number, o: number, z: number): P3 => p3(a[0] + ux * t - uy * o, a[1] + uy * t + ux * o, z)
      let t = 0
      for (const [t0, t1, h] of lista) {
        bloco(t, t0, fundo, topo)
        const zc = Math.min(this.chao(a[0] + ux * t0, a[1] + uy * t0), this.chao(a[0] + ux * t1, a[1] + uy * t1))
        if (arcos === 'real') {
          // Arco de volta perfeita: tímpanos cheios nas duas faces, intradorso, aduelas.
          const R = (t1 - t0) / 2, tm = (t0 + t1) / 2, zn = zc + h - R, zt = zc + h
          bloco(t0, t1, fundo, zc - 0.05, false)
          bloco(t0, t1, zt, topo, false)
          esc.linha([W(t0, -0.01, topo), W(t1, -0.01, topo)], 'aresta')
          esc.linha([W(t0, esp + 0.01, topo), W(t1, esp + 0.01, topo)], 'aresta')
          const n = 18
          const P = (k: number, o: number, r = R): P3 => {
            const q = Math.PI * (1 - k / n)
            return W(tm + Math.cos(q) * r, o, zn + Math.sin(q) * r)
          }
          const pos: number[] = []
          for (const o of [-0.01, esp + 0.01]) {
            for (let k = 0; k < n; k++) {
              const canto = k < n / 2 ? W(t0, o, zt) : W(t1, o, zt)
              pos.push(...canto, ...P(k, o), ...P(k + 1, o))
            }
            pos.push(...W(t0, o, zt), ...P(n / 2, o), ...W(t1, o, zt))
          }
          for (let k = 0; k < n; k++) pos.push(...P(k, 0), ...P(k, esp), ...P(k + 1, esp), ...P(k, 0), ...P(k + 1, esp), ...P(k + 1, 0))
          const gg = new THREE.BufferGeometry()
          gg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
          esc.solido(gg, false)
          for (const o of [-0.02, esp + 0.02]) {
            esc.linha(Array.from({ length: n + 1 }, (_, k) => P(k, o)), 'aresta')
            esc.linha(Array.from({ length: n + 1 }, (_, k) => P(k, o, R + 0.5)), 'pormenor')
            // Aduelas: raios entre o intradorso e o extradorso; a do meio é o fecho.
            for (let k = 1; k < 9; k++) esc.linha([P((k * n) / 9, o), P((k * n) / 9, o, R + 0.5)], 'pormenor')
            esc.linha([W(t0, o, zc), W(t0, o, zn)], 'aresta')
            esc.linha([W(t1, o, zc), W(t1, o, zn)], 'aresta')
          }
          t = t1
          continue
        }
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
      // Amostras ao longo da escada; cada degrau perpendicular à direcção média
      // ali, para as curvas abrirem em leque em vez de os degraus se cruzarem.
      const cum = [0]
      for (let i = 1; i < v.g.length; i++) cum.push(cum[i - 1] + Math.hypot(v.g[i][0] - v.g[i - 1][0], v.g[i][1] - v.g[i - 1][1]))
      const total = cum[cum.length - 1]
      const em = (t: number): [number, number] => {
        t = Math.max(0, Math.min(total, t))
        let i = 1
        while (i < cum.length - 1 && cum[i] < t) i++
        const f = (t - cum[i - 1]) / Math.max(1e-6, cum[i] - cum[i - 1])
        return [v.g[i - 1][0] + (v.g[i][0] - v.g[i - 1][0]) * f, v.g[i - 1][1] + (v.g[i][1] - v.g[i - 1][1]) * f]
      }
      const lado = (t: number) => {
        const a = em(t - 1.2), b = em(t + 1.2), L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
        return [-(b[1] - a[1]) / L, (b[0] - a[0]) / L]
      }
      const bordas: P3[][] = [[], []]
      for (let t = 0; t <= total; t += 0.45) {
        const [x, y] = em(t), [lx, ly] = lado(t)
        const e: [number, number] = [x + (lx * W) / 2, y + (ly * W) / 2], d: [number, number] = [x - (lx * W) / 2, y - (ly * W) / 2]
        this.quadricula(x, y).linha([p3(...e, this.chao(...e) + 0.04), p3(...d, this.chao(...d) + 0.04)], 'chao')
        bordas[0].push(p3(...e, this.chao(...e) + 0.05))
        bordas[1].push(p3(...d, this.chao(...d) + 0.05))
      }
      for (const b of bordas) if (b.length > 1) this.quadricula(v.g[0][0], v.g[0][1]).linha(b, 'pormenor')
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
  comprimentos: number[] = []

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

  /** A fachada mais perto de um ponto: onde, e para onde está virada. */
  paredePerto(x: number, y: number, max = 8) {
    let melhor: { x: number; y: number; nx: number; ny: number; ux: number; uy: number; d: number } | null = null
    const vistos = new Set<Edificio>()
    for (let gx = Math.floor((x - max) / 10); gx <= Math.floor((x + max) / 10); gx++)
      for (let gy = Math.floor((y - max) / 10); gy <= Math.floor((y + max) / 10); gy++)
        for (const b of this.grelha.get(gx + ',' + gy) ?? []) {
          if (vistos.has(b) || b.osm === ID_SE || b.osm === ID_CLAUSTRO) continue
          vistos.add(b)
          for (let i = 0; i < b.anel.length; i++) {
            const a = b.anel[i], c = b.anel[(i + 1) % b.anel.length]
            const vx = c[0] - a[0], vy = c[1] - a[1], L = Math.hypot(vx, vy)
            if (L < 2.5) continue
            const t = THREE.MathUtils.clamp(((x - a[0]) * vx + (y - a[1]) * vy) / (L * L), 0.15, 0.85)
            const px = a[0] + vx * t, py = a[1] + vy * t, d = Math.hypot(x - px, y - py)
            const nx = vy / L, ny = -vx / L
            if (d < max && (!melhor || d < melhor.d) && (x - px) * nx + (y - py) * ny > 0)
              melhor = { x: px, y: py, nx, ny, ux: vx / L, uy: vy / L, d }
          }
        }
    return melhor
  }

  /**
   * Candeeiros de braço nas fachadas e placas com o nome das ruas, ao longo do
   * percurso — o que faz uma rua desenhada parecer habitada.
   */
  /** Varandas de onde disparam os atiradores: posição onde ficam e para onde olham. */
  varandas: { pos: THREE.Vector3; olhar: THREE.Vector3 }[] = []

  /**
   * Varanda de ferro num primeiro ou segundo andar, com a porta aberta e
   * escura atrás. O desenho, a laje e o parapeito (com colisão).
   */
  private varanda(x: number, y: number, andar: number, esc: Esboco) {
    const w = this.paredePerto(x, y, 8)
    if (!w) return
    const chao = this.chao(w.x + w.nx * 1.2, w.y + w.ny * 1.2)
    const z = chao + 0.6 + andar * 3.1
    const dono = this.edificioEm(w.x - w.nx * 0.5, w.y - w.ny * 0.5)
    if (!dono || z + 2.8 > dono.topo) return
    const P = (fora: number, lat: number, dz: number): P3 => p3(w.x + w.nx * fora + w.ux * lat, w.y + w.ny * fora + w.uy * lat, z + dz)
    const ang = Math.atan2(w.uy, w.ux)
    const caixa = (lat: number, fora: number, dz: number, cL: number, cF: number, h: number, desenhar: boolean) => {
      const g = new THREE.BoxGeometry(cL, h, cF)
      g.rotateY(ang)
      const [cx, cy, cz] = P(fora, lat, dz)
      g.translate(cx, cy, cz)
      this.colisao.add(new THREE.Mesh(g.clone()))
      if (desenhar) esc.solido(g, 'aresta')
    }
    // Laje e parapeito (o parapeito só colide: desenha-se em ferro).
    caixa(0, 0.45, -0.06, 1.9, 0.9, 0.12, true)
    caixa(0, 0.88, 0.5, 1.9, 0.06, 1.0, false)
    caixa(-0.93, 0.45, 0.5, 0.06, 0.9, 1.0, false)
    caixa(0.93, 0.45, 0.5, 0.06, 0.9, 1.0, false)
    esc.linha([P(0, -0.95, 1), P(0.9, -0.95, 1), P(0.9, 0.95, 1), P(0, 0.95, 1)], 'aresta')
    esc.linha([P(0.9, -0.95, 0.12), P(0.9, 0.95, 0.12)], 'pormenor')
    for (let l = -0.95; l <= 0.96; l += 0.14) esc.linha([P(0.9, l, 0), P(0.9, l, 1)], 'sombra')
    for (let f = 0.14; f < 0.9; f += 0.14) for (const l of [-0.95, 0.95]) esc.linha([P(f, l, 0), P(f, l, 1)], 'sombra')
    // Mísulas por baixo da laje.
    for (const l of [-0.7, 0.7]) esc.linha([P(0.02, l, -0.55), P(0.7, l, -0.12)], 'pormenor')
    // Porta aberta: moldura e o escuro de dentro.
    esc.linha([P(0.03, -0.55, 0), P(0.03, -0.55, 2.3), P(0.03, 0.55, 2.3), P(0.03, 0.55, 0)], 'aresta')
    const o = P(0.02, -0.55, 0), fim = P(0.02, 0.55, 0)
    esc.tracejar(o, [fim[0] - o[0], 0, fim[2] - o[2]], [0, 2.3, 0], 0.06, 'pormenor')
    this.varandas.push({ pos: v3(...([w.x + w.nx * 0.45, w.y + w.ny * 0.45] as [number, number]), z + 0.02), olhar: v3(w.x + w.nx * 8, w.y + w.ny * 8, z - 2) })
  }

  private mobiliario() {
    const esc = new Esboco('mobiliario', 0.4, 0.3)
    // Varandas com atiradores ao longo da subida ("olha para as janelas").
    const S = (a: THREE.Vector3, b: THREE.Vector3, t: number) => this.sDe(a) + (this.sDe(b) - this.sDe(a)) * t
    const P0 = this.pontos
    const locais: [number, number, number][] = [
      [S(P0.arco, P0.largoArco, 0.9), 3, 1],
      [S(P0.largoArco, P0.escadasBase, 0.5), -3, 1],
      [S(P0.escadasBase, P0.escadasMeio, 0.35), 3, 1],
      [S(P0.escadasBase, P0.escadasMeio, 0.8), -3, 2],
      [S(P0.escadasMeio, P0.escadasTopo, 0.55), 3, 1],
      [S(P0.escadasTopo, P0.largo, 0.4), -4, 1],
    ]
    for (const [s, lat, andar] of locais) {
      const p = this.noPercurso(s, lat)
      this.varanda(p.x, -p.z, andar, esc)
    }
    const fimRua = this.comprimentos[this.percurso.indexOf(this.pontos.portaClaustro)] ?? this.comprimentos[this.comprimentos.length - 1]
    let lado = 1
    for (let s = 6; s < fimRua - 4; s += 13) {
      const p = this.noPercurso(s)
      const k = Math.min(this.percurso.length - 1, this.comprimentos.findIndex((c) => c >= s) || 1)
      const q = this.percurso[k], a = this.percurso[k - 1] ?? q
      const dx = q.x - a.x, dy = -(q.z - a.z), L = Math.hypot(dx, dy) || 1
      lado = -lado
      const x = p.x - (dy / L) * 3 * lado, y = -p.z + (dx / L) * 3 * lado
      const w = this.paredePerto(x, y, 7)
      if (!w) continue
      const z = this.chao(w.x + w.nx, w.y + w.ny) + 4.3
      const P = (fora: number, dz: number, lat = 0): P3 => p3(w.x + w.nx * fora + w.ux * lat, w.y + w.ny * fora + w.uy * lat, z + dz)
      // Braço de ferro com volta, e o candeeiro pendurado.
      esc.linha([P(0.02, 0), P(0.75, 0)], 'aresta')
      esc.linha([P(0.02, -0.45), P(0.3, -0.15), P(0.55, -0.02)], 'pormenor')
      esc.linha(Array.from({ length: 9 }, (_, i) => { const t = (i / 8) * Math.PI * 1.6; return P(0.3 + Math.cos(t) * 0.1, 0.12 + Math.sin(t) * 0.1) }), 'pormenor')
      const lanterna = new THREE.CylinderGeometry(0.2, 0.13, 0.42, 6)
      const [lx, ly, lz] = P(0.75, -0.35)
      lanterna.translate(lx, ly, lz)
      esc.solido(lanterna, 'aresta', 30)
      const tecto = new THREE.ConeGeometry(0.26, 0.2, 6)
      tecto.translate(lx, ly + 0.31, lz)
      esc.solido(tecto, 'aresta', 30)
      esc.linha([P(0.75, 0), P(0.75, -0.04)], 'aresta')
    }
    this.cena.add(esc.acabar())
    const placas: [string, [number, number]][] = [
      ['Rua Ferreira Borges', [-106, 15]],
      ['Arco de Almedina', [-72, -1]],
      ['Rua de Quebra-Costas', [-56, 6]],
      ['Largo da Sé Velha', [20, 19]],
    ]
    for (const [texto, [x, y]] of placas) {
      const w = this.paredePerto(x, y, 9)
      if (!w) continue
      const z = this.chao(w.x + w.nx, w.y + w.ny) + 3.1
      const m = placa(texto)
      const [px, py, pz] = p3(w.x + w.nx * 0.05, w.y + w.ny * 0.05, z)
      m.position.set(px, py, pz)
      m.lookAt(px + w.nx, py, pz - w.ny)
      this.cena.add(m)
    }
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
