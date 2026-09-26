/**
 * O que é dos Becos da Baixa no desenho do mundo: o rio e o parapeito do
 * cais, o barco à espera, o andar de cima das passagens cobertas, os portões
 * das vias privadas, as placas com o nome real dos becos e a roupa estendida
 * entre fachadas. Ruas, edifícios e o rio vêm do OSM; o barco, a roupa e o
 * pormenor são inventados.
 */
import * as THREE from 'three'
import { v3, p3, type Mundo, type Edificio, type Face } from '../mundo'
import { Esboco, aleatorio, semente, papel, type P3 } from '../tinta'
import { Grafo, privada, comprimento, aoLongo, distLinha, type XY } from './becos-grafo'
import type { DefMundo } from './tipos'

/** A Igreja de Santa Cruz, na Praça 8 de Maio. */
const ID_SANTA_CRUZ = 'way/204192080'

/** A Torre de Almedina e a Barbacã, com a via que passa por cada uma (como na Serenata). */
const PORTAS = { 'way/246397825': 'way/121298535', 'way/1165517467': 'way/1165517464' }

/** Onde tudo acontece, em coordenadas do nível (x nascente, y norte). */
const SITIOS = {
  inicio: [72, 209] as XY, // Praça 8 de Maio, do lado poente
  santaCruz: [104, 200] as XY, // a fachada da igreja
  estafeta: [95, 201] as XY, // diante da fachada
  portagem: [58, -190] as XY, // Largo da Portagem
  /** Onde o barco está amarrado: no cais da Av. Emídio Navarro, a poente da ponte. */
  cais: [-43, -214] as XY,
}

/** As ruas largas custam um pouco mais: quem foge prefere os becos. */
const LARGAS = /^(Rua Visconde da Luz|Rua Ferreira Borges|Praça do Comércio|Largo da Portagem|Praça 8 de Maio)$/

/** O que o desenho deixa à missão. */
export const becosMundo = {
  grafo: null as Grafo | null,
  /** Nós do grafo de onde se vai direito ao barco. */
  chegada: [] as number[],
  /** O caminho mais curto do Estafeta, da praça ao barco (o percurso da missão). */
  rota: [] as XY[],
  /** Os sítios onde se pode armar uma emboscada, com o nome. */
  pracas: [] as { nome: string; p: XY }[],
}

/** Caixa com colisão, desenhada ou não. `soFisica` pára o corpo e deixa passar as balas. */
function caixa(m: Mundo, esc: Esboco | null, w: number, h: number, d: number, x: number, y: number, z: number, ang: number,
  traco: 'aresta' | 'pormenor' | false = 'aresta', soFisica = false) {
  const g = new THREE.BoxGeometry(w, h, d)
  g.rotateY(ang)
  g.translate(x, z, -y)
  const c = new THREE.Mesh(g.clone())
  c.userData.soFisica = soFisica
  m.colisao.add(c)
  if (esc) esc.solido(g, traco)
}

/** Até quantos metros de uma rua as fachadas levam janelas e portas (mais longe só a cornija: poupa traço). */
const PORMENOR = 14

export function mundoBecos(): DefMundo {
  /** Os trocos das ruas em quadrículas de 10 m, para saber depressa se uma fachada dá para uma. */
  const trocos = new Map<string, [XY, XY][]>()
  const perto = (x: number, y: number) => {
    for (let gx = Math.floor((x - PORMENOR) / 10); gx <= Math.floor((x + PORMENOR) / 10); gx++)
      for (let gy = Math.floor((y - PORMENOR) / 10); gy <= Math.floor((y + PORMENOR) / 10); gy++)
        for (const [a, b] of trocos.get(gx + ',' + gy) ?? []) if (distLinha(x, y, [a, b]) < PORMENOR) return true
    return false
  }
  const def: DefMundo = {
    portas: PORTAS,
    ajustar: (m) => {
      for (const v of m.n.vias) {
        if (privada(v) || v.tipo === 'platform') continue
        for (let k = 1; k < v.g.length; k++) {
          const a = v.g[k - 1] as XY, b = v.g[k] as XY
          const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 5))
          const cel = new Set<string>()
          for (let q = 0; q <= n; q++) cel.add(Math.floor((a[0] + ((b[0] - a[0]) * q) / n) / 10) + ',' + Math.floor((a[1] + ((b[1] - a[1]) * q) / n) / 10))
          for (const c of cel) { if (!trocos.has(c)) trocos.set(c, []); trocos.get(c)!.push([a, b]) }
        }
      }
    },
    pormenor: perto,
    especiais: { [ID_SANTA_CRUZ]: santaCruz },
    semParedes: [ID_SANTA_CRUZ],
    construir,
    // O percurso é o caminho mais curto do Estafeta, calculado em `construir` pelo grafo.
    percurso: { antes: [], vias: [], extra: [] },
    pontos: (m) => {
      const q = (xy: XY) => m.noChao(...xy)
      const cais = caisEm(m)
      return {
        inicio: q(SITIOS.inicio),
        olharInicio: q(SITIOS.santaCruz),
        estafeta: q(SITIOS.estafeta),
        portagem: q(SITIOS.portagem),
        rio: v3(cais.topo[0], cais.topo[1], m.chao(...cais.topo)),
        barco: v3(cais.barco[0], cais.barco[1], cais.agua),
        mendonca: q(lugar(m, 'Terreiro do Mendonça') ?? [-30, -9]),
        romal: q(lugar(m, 'Largo do Romal') ?? [27, -58]),
        visconde: q([93, 130]),
      }
    },
    placas: [],
    varandas: (m) => {
      const L = m.comprimentos[m.rotaBase.length - 1] ?? 0
      const out: [number, number, number][] = []
      let lado = 1
      for (let s = 55; s < L - 50; s += 48, lado = -lado) out.push([s, 5 * lado, 1 + ((s / 48) | 0) % 2])
      return out
    },
  }

  function construir(m: Mundo) {
    const esc = new Esboco('becos', 1, 1)
    rio(m, esc)
    barco(m)
    pontes(m, esc)
    portoes(m, esc)
    m.cena.add(esc.acabar('mundo', papel, true))
    // O grafo das ruas, depois de os edifícios estarem na grelha (as vias que entram num prédio ficam de fora).
    const g = new Grafo(m.n, m, (v) => (v.nome && LARGAS.test(v.nome) ? 1.35 : 1))
    becosMundo.grafo = g
    const cais = caisEm(m)
    becosMundo.chegada = g.nos
      .filter((n) => n.arestas.length && Math.hypot(n.x - cais.topo[0], n.y - cais.topo[1]) < 32 && livre(m, [n.x, n.y], cais.topo))
      .sort((a, b) => Math.hypot(a.x - cais.topo[0], a.y - cais.topo[1]) - Math.hypot(b.x - cais.topo[0], b.y - cais.topo[1]))
      .slice(0, 3).map((n) => n.i)
    const { seguinte } = g.distancias(becosMundo.chegada)
    const rota = g.caminho(g.noPerto(...SITIOS.estafeta).i, seguinte).pts
    becosMundo.rota = [SITIOS.estafeta, ...rota, cais.topo]
    def.percurso.antes = becosMundo.rota
    becosMundo.pracas = ['Terreiro do Mendonça', 'Largo do Romal', 'Largo da Portagem', 'Largo do Paço do Conde']
      .map((nome) => ({ nome, p: lugar(m, nome)! })).filter((x) => x.p)
    def.placas = placas(m, g)
    roupa(m, g)
  }

  return def
}

/**
 * Santa Cruz: paredes e telhado como os outros, e a fachada para a praça
 * esboçada: portal em arco com arquivoltas e nichos, a janela redonda por
 * cima, dois torreões com pináculos. Nas outras faces, janelas altas em arco.
 * O desenho é um esboço (o pormenor é inventado).
 */
function santaCruz(m: Mundo, b: Edificio, esc: Esboco) {
  m.paredes(b.anel, () => b.base - 0.8, b.topo, esc)
  m.tampa(b.anel, b.furos, b.topo, esc)
  m.fachadas(b, esc, (f: Face) => {
    const [mx, , mz] = f.P(f.L / 2, 0)
    if (Math.hypot(mx - SITIOS.santaCruz[0], -mz - SITIOS.santaCruz[1]) < 4 && f.L > 12) fachadaSantaCruz(m, b, esc, f)
    else janelasDeIgreja(b, esc, f)
  })
}

function janelasDeIgreja(b: Edificio, esc: Esboco, { L, P, chaoEm, rect }: Face) {
  const n = Math.floor(L / 6)
  for (let k = 0; k < n; k++) {
    const t = ((k + 0.5) * L) / n
    const z0 = chaoEm(t) + 7, z1 = Math.min(b.topo - 2.5, z0 + 5)
    if (z1 - z0 < 2) continue
    rect(t - 0.6, t + 0.6, z0, z1 - 0.6)
    const arco: P3[] = []
    for (let q = 0; q <= 8; q++) { const a = Math.PI * (q / 8); arco.push(P(t + Math.cos(a) * 0.6, z1 - 0.6 + Math.sin(a) * 0.6)) }
    esc.linha(arco, 'pormenor')
  }
}

function fachadaSantaCruz(m: Mundo, b: Edificio, esc: Esboco, { L, P, chaoEm }: Face) {
  const tm = L / 2
  const z0 = chaoEm(tm)
  const H = b.topo - z0
  const arco = (t: number, zc: number, r: number, fora = 0.08, n = 14, ry = r): P3[] =>
    Array.from({ length: n + 1 }, (_, q) => { const a = Math.PI * (q / n); return P(t + Math.cos(a) * r, zc + Math.sin(a) * ry, fora) })
  // Soco, cornija e platibanda com pequenos arcos.
  esc.linha([P(0, z0 + 0.7, 0.12), P(L, z0 + 0.7, 0.12)], 'pormenor')
  esc.linha([P(0, b.topo - 0.5, 0.2), P(L, b.topo - 0.5, 0.2)], 'aresta')
  for (let t = 1.6; t < L - 1.6; t += 0.9) esc.linha(arco(t, b.topo - 1.3, 0.3, 0.14, 6), 'sombra')
  // O portal: arco de volta perfeita, três arquivoltas, porta escura, colunelos.
  const R = 1.7, zn = z0 + 4.2
  for (const [r, traco] of [[R, 'aresta'], [R + 0.35, 'pormenor'], [R + 0.7, 'pormenor'], [R + 1.05, 'aresta']] as const)
    esc.linha([P(tm - r, z0, 0.1 + r * 0.05), ...arco(tm, zn, r, 0.1 + r * 0.05), P(tm + r, z0, 0.1 + r * 0.05)], traco)
  const o = P(tm - R, z0, 0.04), fim = P(tm + R, z0, 0.04)
  esc.tracejar(o, [fim[0] - o[0], 0, fim[2] - o[2]], [0, 4.2, 0], 0.08, 'pormenor')
  esc.linha([P(tm, z0, 0.05), P(tm, zn + 0.2, 0.05)], 'aresta')
  // Por cima do portal, o corpo alto com nichos e figuras em silhueta, rematado por um pináculo.
  const zc = zn + R + 1.1
  esc.linha([P(tm - 3.2, zc, 0.3), P(tm + 3.2, zc, 0.3)], 'aresta')
  for (const s of [-1, 0, 1]) {
    const t = tm + s * 2, z = zc + 0.4 + (s ? 0 : 0.6), h = s ? 2.4 : 3
    esc.linha([P(t - 0.45, z, 0.25), P(t + 0.45, z, 0.25)], 'pormenor')
    esc.linha([P(t - 0.45, z, 0.2), ...arco(t, z + h, 0.45, 0.2, 8), P(t + 0.45, z, 0.2)], 'aresta')
    // A figura: cabeça e corpo, a tinta.
    esc.linha([P(t - 0.18, z + 0.1, 0.18), P(t - 0.12, z + h - 0.5, 0.18), P(t + 0.12, z + h - 0.5, 0.18), P(t + 0.18, z + 0.1, 0.18)], 'pormenor', true)
    esc.linha(arco(t, z + h - 0.3, 0.14, 0.18, 8, 0.2), 'pormenor')
  }
  esc.linha([P(tm - 3.4, zc + 4.4, 0.3), P(tm, zc + 6.4, 0.3), P(tm + 3.4, zc + 4.4, 0.3)], 'aresta')
  // Pilastras dos lados do portal, com três andares de nichos.
  for (const s of [-1, 1]) {
    const t = tm + s * (R + 1.8)
    esc.linha([P(t - 0.35, z0, 0.3), P(t - 0.35, zc + 4, 0.3), P(t + 0.35, zc + 4, 0.3), P(t + 0.35, z0, 0.3)], 'aresta')
    for (let z = z0 + 1.6; z < zc + 3; z += 2.6) esc.linha([P(t - 0.22, z, 0.32), ...arco(t, z + 1.4, 0.22, 0.32, 6), P(t + 0.22, z, 0.32), P(t - 0.22, z, 0.32)], 'pormenor')
    esc.linha([P(t, zc + 4, 0.3), P(t, zc + 5.4, 0.3)], 'pormenor')
  }
  // A janela redonda, no alto.
  const zr = Math.min(b.topo - 3.2, zc + 7.8)
  for (const r of [1.5, 1.2]) esc.linha(Array.from({ length: 25 }, (_, q) => { const a = (q / 24) * Math.PI * 2; return P(tm + Math.cos(a) * r, zr + Math.sin(a) * r, 0.1) }), r > 1.3 ? 'aresta' : 'pormenor')
  for (let q = 0; q < 8; q++) { const a = (q / 8) * Math.PI * 2; esc.linha([P(tm, zr, 0.1), P(tm + Math.cos(a) * 1.2, zr + Math.sin(a) * 1.2, 0.1)], 'sombra') }
  // Os dois torreões nas pontas: sobem acima da cornija e acabam em pináculo.
  for (const t of [1.1, L - 1.1]) {
    const [x, , zz] = P(t, 0, 0.6)
    const g = new THREE.CylinderGeometry(0.9, 0.9, H + 3.5, 8)
    g.translate(x, z0 + (H + 3.5) / 2, zz)
    esc.solido(g, 'aresta', 30)
    const c = new THREE.ConeGeometry(1.0, 3.2, 8)
    c.translate(x, z0 + H + 3.5 + 1.6, zz)
    esc.solido(c, 'aresta', 30)
    for (let z = z0 + 3; z < z0 + H; z += 3.5) esc.linha(arco(t, z + 1.2, 0.2, 1.0, 6), 'pormenor')
    m.colisao.add(new THREE.Mesh(g.clone()))
  }
  // Pináculos pequenos ao longo do remate.
  for (let t = 3.5; t < L - 3; t += 2.8) {
    const [x, , zz] = P(t, 0, 0.2)
    const c = new THREE.ConeGeometry(0.25, 1.6, 6)
    c.translate(x, b.topo + 0.8, zz)
    esc.solido(c, 'pormenor', 30)
  }
}

/** O centro de uma praça ou via com este nome. */
function lugar(m: Mundo, nome: string): XY | null {
  const pr = m.n.pracas.find((p) => p.nome === nome)?.g ?? m.n.vias.find((v) => v.nome === nome)?.g
  if (!pr) return null
  return [pr.reduce((s, p) => s + p[0], 0) / pr.length, pr.reduce((s, p) => s + p[1], 0) / pr.length]
}

/** Não há edifícios pelo meio de a a b. */
function livre(m: Mundo, a: XY, b: XY) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.max(1, Math.ceil(L / 0.5))
  for (let k = 0; k <= n; k++) if (m.edificioEm(a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n)) return false
  return true
}

// ---------------------------------------------------------------- o rio --

/** As margens do rio (arestas da água que não são a borda da caixa), com a normal para terra. */
function margens(m: Mundo) {
  const [mx, my] = m.n.meio
  const borda = (p: XY) => Math.abs(p[0]) > mx - 0.6 || Math.abs(p[1]) > my - 0.6
  const out: { a: XY; b: XY; ux: number; uy: number; tx: number; ty: number; L: number }[] = []
  for (const anel of m.n.agua ?? []) {
    for (let i = 0; i < anel.length; i++) {
      const a = anel[i] as XY, b = anel[(i + 1) % anel.length] as XY
      if (borda(a) && borda(b)) continue
      const L = Math.hypot(b[0] - a[0], b[1] - a[1])
      if (L < 0.3) continue
      const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L
      // O anel é anti-horário: a água fica à esquerda, a terra à direita.
      out.push({ a, b, ux, uy, tx: uy, ty: -ux, L })
    }
  }
  return out
}

/** O LiDAR alisa o muro do cais: o topo fica uns 3 m para terra da linha de água do OSM. */
const RECUO_CAIS = 3.4

/** O cais do barco: o topo do muro (onde se espera), o barco na água e a cota dela. */
function caisEm(m: Mundo) {
  const [cx, cy] = SITIOS.cais
  let melhor = margens(m)[0], dm = Infinity
  for (const e of margens(m)) {
    const t = Math.max(0, Math.min(e.L, (cx - e.a[0]) * e.ux + (cy - e.a[1]) * e.uy))
    const d = Math.hypot(e.a[0] + e.ux * t - cx, e.a[1] + e.uy * t - cy)
    if (d < dm) { dm = d; melhor = e }
  }
  const e = melhor
  const t = Math.max(0, Math.min(e.L, (cx - e.a[0]) * e.ux + (cy - e.a[1]) * e.uy))
  const x = e.a[0] + e.ux * t, y = e.a[1] + e.uy * t
  const topo: XY = [x + e.tx * (RECUO_CAIS + 0.6), y + e.ty * (RECUO_CAIS + 0.6)]
  const barco: XY = [x - e.tx * 3.6, y - e.ty * 3.6]
  return { topo, barco, agua: m.chao(x - e.tx * 8, y - e.ty * 8), ux: e.ux, uy: e.uy, tx: e.tx, ty: e.ty, borda: [x, y] as XY }
}

/**
 * A água em papel com riscas, e o parapeito de ferro no topo do muro do cais,
 * com uma guarda invisível (não se salta para o rio, mas as balas passam).
 */
function rio(m: Mundo, esc: Esboco) {
  const cais = caisEm(m)
  const z = cais.agua + 0.05
  for (const anel of m.n.agua ?? []) {
    const s = new THREE.Shape(anel.map(([x, y]) => new THREE.Vector2(x, y)))
    const g = new THREE.ShapeGeometry(s)
    g.rotateX(-Math.PI / 2)
    g.translate(0, z, 0)
    esc.solido(g, false)
    // Riscas na água, em filas, como no rio ao longe.
    const ys = anel.map((p) => p[1])
    for (let y = Math.min(...ys) + 4; y < Math.max(...ys); y += 7) {
      const xs: number[] = []
      for (let i = 0; i < anel.length; i++) {
        const [x1, y1] = anel[i], [x2, y2] = anel[(i + 1) % anel.length]
        if ((y1 > y) !== (y2 > y)) xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1))
      }
      xs.sort((p, q) => p - q)
      for (let i = 0; i + 1 < xs.length; i += 2)
        for (let x = xs[i] + 3 + ((y * 7) % 5); x + 4 < xs[i + 1] - 3; x += 9) esc.linha([p3(x, y, z + 0.02), p3(x + 2.5, y + 0.4, z + 0.02), p3(x + 4, y, z + 0.02)], 'sombra')
    }
  }
  // Parapeito: postes, dois ferros, e a guarda por cima.
  for (const e of margens(m)) {
    const A: XY = [e.a[0] + e.tx * RECUO_CAIS, e.a[1] + e.ty * RECUO_CAIS]
    const P = (t: number, dz: number): P3 => { const x = A[0] + e.ux * t, y = A[1] + e.uy * t; return p3(x, y, m.chao(x, y) + dz) }
    const n = Math.max(1, Math.ceil(e.L / 1.6))
    const topo: P3[] = [], meio: P3[] = []
    for (let k = 0; k <= n; k++) {
      const t = (e.L * k) / n
      // Na abertura do cais, só uma corrente.
      const xk = A[0] + e.ux * t, yk = A[1] + e.uy * t
      const naAbertura = Math.hypot(xk - cais.topo[0] + cais.tx * 0.6, yk - cais.topo[1] + cais.ty * 0.6) < 0.9
      if (!naAbertura) esc.linha([P(t, 0), P(t, 1.0)], 'pormenor')
      topo.push(P(t, 1.0)); meio.push(P(t, 0.5))
    }
    esc.linha(topo, 'aresta')
    esc.linha(meio, 'sombra')
    esc.linha(Array.from({ length: n + 1 }, (_, k) => P((e.L * k) / n, 0.03)), 'pormenor')
    const zs = Array.from({ length: n + 1 }, (_, k) => { const t = (e.L * k) / n; return m.chao(A[0] + e.ux * t, A[1] + e.uy * t) })
    const z0 = Math.min(...zs) - 0.5, z1 = Math.max(...zs) + 1.8
    caixa(m, null, e.L + 0.3, z1 - z0, 0.12, A[0] + e.ux * e.L / 2, A[1] + e.uy * e.L / 2, (z0 + z1) / 2, Math.atan2(e.uy, e.ux), false, true)
  }
}

/**
 * O barco (inventado): casco, cabine, motor fora de borda, amarrado ao cais
 * com duas cordas, e uma escada de ferro no muro. A missão leva-o rio abaixo.
 */
function barco(m: Mundo) {
  const cais = caisEm(m)
  const esc = new Esboco('barco', 0.5, 0.5)
  const L = 6.4, W = 2.3
  // Local: x ao longo do barco (proa em +x), z para o lado, y para cima.
  const conv: [number, number][] = [[-L / 2, -W / 2], [L / 2 - 1.6, -W / 2], [L / 2, 0], [L / 2 - 1.6, W / 2], [-L / 2, W / 2]]
  const bordo = 0.55, quilha = -0.45
  const pos: number[] = []
  const C = (x: number, z: number, y: number) => [x, y, z]
  for (let i = 0; i < conv.length; i++) {
    const [ax, az] = conv[i], [bx, bz] = conv[(i + 1) % conv.length]
    pos.push(...C(ax, az, bordo), ...C(bx, bz, bordo), ...C(bx * 0.8, bz * 0.55, quilha), ...C(ax, az, bordo), ...C(bx * 0.8, bz * 0.55, quilha), ...C(ax * 0.8, az * 0.55, quilha))
  }
  const casco = new THREE.BufferGeometry()
  casco.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  esc.solido(casco, false)
  esc.linha(conv.map(([x, z]) => C(x, z, bordo) as P3), 'aresta', true)
  esc.linha(conv.map(([x, z]) => C(x * 0.8, z * 0.55, quilha) as P3), 'pormenor', true)
  for (const [x, z] of conv) esc.linha([C(x, z, bordo) as P3, C(x * 0.8, z * 0.55, quilha) as P3], 'pormenor')
  esc.face([[-L / 2, 0.15, -W / 2 + 0.1], [L / 2 - 1.6, 0.15, -W / 2 + 0.1], [L / 2 - 0.2, 0.15, 0], [L / 2 - 1.6, 0.15, W / 2 - 0.1], [-L / 2, 0.15, W / 2 - 0.1]], false)
  // Riscas de tábuas no costado.
  for (const s of [-1, 1]) esc.linha([[-L / 2, 0.2, (s * W) / 2 * 0.95], [L / 2 - 1.7, 0.2, (s * W) / 2 * 0.95]], 'sombra')
  esc.caixa(1.7, 1.15, 1.5, -0.9, 0.15 + 0.58, 0, 0, 'aresta') // cabine
  esc.caixa(1.9, 0.08, 1.7, -0.9, 1.34, 0, 0, 'aresta')
  esc.linha([[0.02, 0.9, -0.76], [0.02, 1.2, -0.76], [0.02, 1.2, 0.76], [0.02, 0.9, 0.76]], 'pormenor', true) // vidro
  // Toldo de lona por cima da popa, e um mastro com flâmula: vê-se por cima do muro do cais.
  for (const [x, z] of [[-L / 2 + 0.3, -0.95], [-L / 2 + 0.3, 0.95], [0.4, -0.95], [0.4, 0.95]]) esc.linha([[x, 0.55, z], [x, 2.4, z]], 'pormenor')
  esc.face([[-L / 2 + 0.1, 2.4, -1.1], [0.6, 2.4, -1.1], [0.6, 2.55, 0], [0.6, 2.4, 1.1], [-L / 2 + 0.1, 2.4, 1.1], [-L / 2 + 0.1, 2.55, 0]], 'aresta')
  for (let x = -L / 2 + 0.5; x < 0.6; x += 0.6) esc.linha([[x, 2.41, -1.1], [x, 2.56, 0], [x, 2.41, 1.1]], 'sombra')
  esc.linha([[L / 2 - 1.3, 0.55, 0], [L / 2 - 1.3, 5.6, 0]], 'aresta')
  esc.face([[L / 2 - 1.3, 5.6, 0], [L / 2 - 2.5, 5.35, 0.05], [L / 2 - 1.3, 5.1, 0]], 'pormenor')
  esc.caixa(0.35, 0.6, 0.3, -L / 2 - 0.15, 0.45, 0, 0, 'aresta') // motor
  esc.linha([[-L / 2 - 0.15, 0.15, 0], [-L / 2 - 0.2, -0.5, 0]], 'aresta')
  const g = esc.acabar('mundo', papel, false)
  g.name = 'barco'
  g.position.set(cais.barco[0], cais.agua + 0.05, -cais.barco[1])
  // Proa rio abaixo (para poente, ao longo do cais).
  const dirX = -cais.ux, dirY = -cais.uy
  g.rotation.y = Math.atan2(dirY, dirX)
  g.userData.rio = { dx: dirX, dy: dirY, tx: cais.tx, ty: cais.ty }
  m.cena.add(g)
  // Cordas do barco ao cais, a escada no muro e dois cabeços.
  const e2 = new Esboco('cais', 0.4, 0.4)
  const [bx, by] = cais.topo
  const zt = m.chao(bx, by)
  const W2 = (x: number, y: number, z: number): P3 => p3(x, y, z)
  for (const s of [-1, 1]) {
    const cx = bx + cais.ux * s * 1.4 - cais.tx * 0.5, cy = by + cais.uy * s * 1.4 - cais.ty * 0.5
    e2.caixa(0.3, 0.45, 0.3, cx, zt + 0.22, -cy, 0, 'aresta')
    const px = cais.barco[0] + dirX * s * 2.4, py = cais.barco[1] + dirY * s * 2.4
    const pts: P3[] = []
    for (let k = 0; k <= 8; k++) {
      const t = k / 8
      pts.push(W2(cx + (px - cx) * t, cy + (py - cy) * t, zt + 0.4 + (cais.agua + 0.6 - zt - 0.4) * t - Math.sin(t * Math.PI) * 0.5))
    }
    e2.linha(pts, 'pormenor')
  }
  // Corrente na abertura do parapeito.
  const a: XY = [bx - cais.tx * 0.6 - cais.ux * 0.8, by - cais.ty * 0.6 - cais.uy * 0.8], b: XY = [bx - cais.tx * 0.6 + cais.ux * 0.8, by - cais.ty * 0.6 + cais.uy * 0.8]
  e2.linha(Array.from({ length: 7 }, (_, k) => { const t = k / 6; return W2(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, zt + 0.85 - Math.sin(t * Math.PI) * 0.2) }), 'pormenor')
  // Escada de ferro pelo muro abaixo.
  const [wx, wy] = cais.borda
  for (const s of [-0.25, 0.25]) e2.linha([W2(bx - cais.tx * 0.7 + cais.ux * s, by - cais.ty * 0.7 + cais.uy * s, zt), W2(wx + cais.ux * s, wy + cais.uy * s, cais.agua + 0.3)], 'pormenor')
  for (let k = 1; k < 8; k++) {
    const t = k / 8
    const x = bx - cais.tx * 0.7 + (wx - bx + cais.tx * 0.7) * t, y = by - cais.ty * 0.7 + (wy - by + cais.ty * 0.7) * t, z = zt + (cais.agua + 0.3 - zt) * t
    e2.linha([W2(x - cais.ux * 0.25, y - cais.uy * 0.25, z), W2(x + cais.ux * 0.25, y + cais.uy * 0.25, z)], 'sombra')
  }
  m.cena.add(e2.acabar())
}

// ------------------------------------------------------------ passagens --

/** O andar de cima de cada passagem coberta: paredes a partir de 3 m do chão, tecto e cobertura. */
function pontes(m: Mundo, esc: Esboco) {
  for (const p of m.n.pontes ?? []) {
    const zc = Math.max(...p.anel.map(([x, y]) => m.chao(x, y)))
    const zb = Math.min(zc + 3.2, p.topo - 1)
    if (zb >= p.topo - 0.3) continue
    m.paredes(p.anel, () => zb, p.topo, esc)
    m.tampa(p.anel, [], p.topo, esc)
    m.tampa(p.anel, [], zb, esc)
  }
}

// -------------------------------------------------------------- portões --

/** Portões fechados onde uma via privada sai para a rua (a Travessa Adelino Veiga e outras). */
function portoes(m: Mundo, esc: Esboco) {
  const chave = (p: [number, number]) => p[0].toFixed(2) + ',' + p[1].toFixed(2)
  const publicos = new Set<string>()
  for (const v of m.n.vias) if (!privada(v)) for (const p of v.g) publicos.add(chave(p))
  for (const v of m.n.vias) {
    if (!privada(v)) continue
    for (const [e, f] of [[v.g[0], v.g[1]], [v.g[v.g.length - 1], v.g[v.g.length - 2]]]) {
      if (!f || !publicos.has(chave(e))) continue
      const L = Math.hypot(f[0] - e[0], f[1] - e[1]) || 1
      const ux = (f[0] - e[0]) / L, uy = (f[1] - e[1]) / L, nx = -uy, ny = ux
      const d = Math.min(1.2, L / 2)
      const cx = e[0] + ux * d, cy = e[1] + uy * d
      // Largura: até às paredes de cada lado (no máximo 2,5 m para cada).
      const ate = (s: number) => { let o = 0.2; while (o < 2.5 && !m.edificioEm(cx + nx * s * o, cy + ny * s * o)) o += 0.1; return o + 0.15 }
      const a = ate(1), b = ate(-1)
      const mx = cx + nx * (a - b) / 2, my = cy + ny * (a - b) / 2, W = a + b
      const zp = m.chao(mx, my)
      const ang = Math.atan2(ny, nx)
      caixa(m, null, W, 3.2, 0.12, mx, my, zp + 1.3, ang, false)
      const G = (t: number, z: number): P3 => p3(mx + nx * t, my + ny * t, zp + z)
      esc.linha([G(-W / 2, 0.12), G(W / 2, 0.12)], 'aresta')
      esc.linha([G(-W / 2, 2.2), G(W / 2, 2.2)], 'aresta')
      esc.linha([G(-W / 2, 1.1), G(W / 2, 1.1)], 'pormenor')
      for (let t = -W / 2 + 0.06; t <= W / 2; t += 0.13) esc.linha([G(t, 0.04), G(t, 2.45 + Math.sin(t * 9) * 0.05)], 'pormenor')
      // Cadeado e corrente.
      esc.caixa(0.14, 0.18, 0.18, mx, zp + 1.05, -my, ang)
      esc.linha([G(-0.3, 1.25), G(-0.1, 1.0), G(0.1, 1.22), G(0.3, 0.98)], 'aresta')
    }
  }
}

// --------------------------------------------------------------- placas --

/**
 * Placas com o nome real das ruas: nas praças, uma na fachada mais perto do
 * centro; nas ruas e becos, uma em cada ponta que dá para outra rua.
 */
function placas(m: Mundo, g: Grafo): [string, XY][] {
  const out: [string, XY][] = []
  const vistas = new Set<string>()
  const [mx, my] = m.n.meio
  const dentroCaixa = (p: XY) => Math.abs(p[0]) < mx - 12 && Math.abs(p[1]) < my - 12
  for (const v of m.n.vias) {
    if (!v.nome || privada(v) || !/^(Rua|Beco|Travessa|Largo|Terreiro|Adro|Escadas?|Praça|Avenida|Pátio)\b/.test(v.nome)) continue
    if (!g.arestas.some((a) => a.via === v)) continue
    if (v.area || m.n.pracas.some((p) => p.nome === v.nome)) {
      if (vistas.has(v.nome)) continue
      const c = lugar(m, v.nome)
      if (c && dentroCaixa(c)) { vistas.add(v.nome); out.push([v.nome, c]) }
      continue
    }
    for (const [e, f] of [[v.g[0], v.g[1]], [v.g[v.g.length - 1], v.g[v.g.length - 2]]]) {
      const no = g.nos.find((n) => Math.abs(n.x - e[0]) < 0.01 && Math.abs(n.y - e[1]) < 0.01)
      if (!no || no.arestas.length < 3) continue
      const k = v.nome + '@' + no.i
      if (vistas.has(k)) continue
      vistas.add(k)
      // Um passo para dentro da rua: a placa fica na esquina dela, não na do vizinho.
      const L = Math.hypot(f[0] - e[0], f[1] - e[1]) || 1
      const p: XY = [e[0] + ((f[0] - e[0]) / L) * Math.min(2.5, L / 2), e[1] + ((f[1] - e[1]) / L) * Math.min(2.5, L / 2)]
      if (dentroCaixa(p)) out.push([v.nome, p])
    }
  }
  return out
}

// ------------------------------------------------------- roupa estendida --

/**
 * Estendais de lado a lado dos becos estreitos: um fio com camisas, toalhas,
 * calças e meias. Inventado, mas é da Baixa; tapa a vista, não colide.
 */
function roupa(m: Mundo, g: Grafo) {
  const esc = new Esboco('roupa', 0.4, 0.35)
  const r = aleatorio(semente('roupa'))
  const vistos = new Set<string>()
  for (const a of g.arestas) {
    const v = a.via
    if (!v.nome || !/^(Beco|Travessa|Rua)\b/.test(v.nome) || v.tipo === 'secondary' || /Visconde|Ferreira Borges|Sofia/.test(v.nome)) continue
    if (vistos.has(v.osm + ':' + a.i)) continue
    vistos.add(v.osm + ':' + a.i)
    const L = comprimento(a.pts)
    for (let s = 3 + r() * 5; s < L - 2; s += 7 + r() * 6) {
      if (r() > 0.5) continue
      const p = aoLongo(a.pts, s), q = aoLongo(a.pts, s + 0.5)
      const d = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1
      const nx = -(q[1] - p[1]) / d, ny = (q[0] - p[0]) / d
      // As duas paredes, de um lado e do outro (um beco é estreito: até 3,5 m para cada lado).
      const parede = (sn: number) => { for (let o = 0.3; o < 3.5; o += 0.15) if (m.edificioEm(p[0] + nx * sn * o, p[1] + ny * sn * o)) return o; return null }
      const oa = parede(1), ob = parede(-1)
      if (oa === null || ob === null) continue
      const A: XY = [p[0] + nx * (oa - 0.1), p[1] + ny * (oa - 0.1)], B: XY = [p[0] - nx * (ob - 0.1), p[1] - ny * (ob - 0.1)]
      const ba = m.edificioEm(p[0] + nx * (oa + 0.1), p[1] + ny * (oa + 0.1)), bb = m.edificioEm(p[0] - nx * (ob + 0.1), p[1] - ny * (ob + 0.1))
      const z0 = m.chao(...p)
      const z = z0 + 4.4 + r() * 2.2
      if (!ba || !bb || z > Math.min(ba.topo, bb.topo) - 1.2) continue
      const W = oa + ob, flecha = 0.12 + W * 0.05
      const fio = (t: number): P3 => p3(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, z - Math.sin(t * Math.PI) * flecha)
      esc.linha(Array.from({ length: 9 }, (_, k) => fio(k / 8)), 'pormenor')
      // Peças penduradas no fio, viradas para quem passa no beco.
      const ux = (B[0] - A[0]) / W, uy = (B[1] - A[1]) / W
      const peca = (t: number, forma: [number, number][]) => {
        const [x, zz, y] = fio(t)
        const pts = forma.map(([l, h]): P3 => [x + ux * l, zz + h, y - uy * l])
        esc.face(pts, 'pormenor')
        esc.linha([[x + ux * forma[0][0], zz + 0.02, y - uy * forma[0][0]], [x + ux * forma[0][0], zz - 0.04, y - uy * forma[0][0]]], 'aresta') // mola
      }
      for (let t = 0.12; t < 0.9; t += 0.16 + r() * 0.14) {
        const k = r()
        if (k < 0.3) peca(t, [[-0.25, 0], [0.25, 0], [0.38, -0.12], [0.3, -0.2], [0.2, -0.14], [0.2, -0.62], [-0.2, -0.62], [-0.2, -0.14], [-0.3, -0.2], [-0.38, -0.12]]) // camisa
        else if (k < 0.55) peca(t, [[-0.22, 0], [0.22, 0], [0.22, -0.7], [-0.22, -0.7]]) // toalha
        else if (k < 0.75) peca(t, [[-0.18, 0], [0.18, 0], [0.2, -0.8], [0.05, -0.8], [0, -0.25], [-0.05, -0.8], [-0.2, -0.8]]) // calças
        else peca(t, [[-0.04, 0], [0.04, 0], [0.04, -0.22], [0.1, -0.28], [0.08, -0.32], [-0.04, -0.28]]) // meia
      }
    }
  }
  m.cena.add(esc.acabar('mundo', papel, true))
}
