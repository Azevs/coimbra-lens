/**
 * O que é da Serenata no desenho do mundo: a Sé Velha (portal, frestas,
 * merlões, contrafortes), o claustro, as portas da cerca, o percurso do Arco
 * ao pátio e os pontos com nome.
 */
import * as THREE from 'three'
import { dentro, v3, p3, type Mundo, type Edificio, type Face } from '../mundo'
import { aleatorio, semente, type Esboco, type P3 } from '../tinta'
import type { DefMundo } from './tipos'

type Anel = [number, number][]

export const ID_SE = 'way/41222810'
export const ID_CLAUSTRO = 'relation/3475986'
const ID_LARGO = 'way/201639837' // Largo da Sé Velha

export function mundoSerenata(): DefMundo {
  /** Cota do chão nivelado da galeria do claustro (o LiDAR lá dentro tem saliências). */
  let pisoClaustro = 0

  /**
   * Dentro do claustro o chão fica entre a cota do pátio e 1,6 m abaixo dela:
   * as saliências de até 6 m que o laser mede ali (muros, coberturas) não são
   * chão por onde se ande, e a rampa desde a porta continua suave.
   */
  function nivelarClaustro(m: Mundo) {
    const c = m.n.edificios.find((b) => b.osm === ID_CLAUSTRO)
    if (!c || !c.furos[0]) return
    const d = m.n.dem, patio: number[] = [], nos: number[] = []
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
    pisoClaustro = med + 0.4
  }

  /** A Sé: paredes e tampa como os outros, mas sem telhado, com frestas, portal, merlões e contrafortes. */
  function se(m: Mundo, b: Edificio, esc: Esboco) {
    m.paredes(b.anel, () => b.base - 0.8, b.topo, esc)
    m.tampa(b.anel, b.furos, b.topo, esc)
    for (const f of b.furos) m.paredes(f, () => b.base - 0.8, b.topo, esc)
    portalSe(m, b, esc)
    m.fachadas(b, esc, frestas(b))
    m.ameias(b, esc)
    contrafortes(m, b, esc)
  }

  /** Frestas altas e estreitas da catedral-fortaleza, em vez de janelas. */
  const frestas = (b: Edificio) => ({ L, chaoEm, rect, tracejar }: Face) => {
    const n = Math.floor(L / 6)
    for (let k = 0; k < n; k++) {
      const t = ((k + 0.5) * L) / n
      const z0 = Math.max(chaoEm(t) + 7, b.base + 9)
      if (z0 + 3 > b.topo - 1) continue
      rect(t - 0.25, t + 0.25, z0, z0 + 2.6)
      tracejar(t - 0.25, t + 0.25, z0, z0 + 2.6, 0.1)
    }
  }

  /**
   * O portal da Sé: no corpo saliente da fachada poente (o troço virado a
   * poente que mais avança para o Largo, juntando arestas alinhadas que o OSM
   * parte em bocados), com a escadaria a descer dele para o Largo.
   */
  function portalSe(m: Mundo, b: Edificio, esc: Esboco) {
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
    const chaoEm = (t: number) => m.chao(a[0] + ux * t + nx * 0.6, a[1] + uy * t + ny * 0.6)
    const tracejar = (t0: number, t1: number, z0: number, z1: number, espaco = 0.18) =>
      esc.tracejar(P(t0, z0), [ux * (t1 - t0), 0, -uy * (t1 - t0)], [0, z1 - z0, 0], espaco, 'sombra')
    portal(P, L, chaoEm, esc, tracejar)
    // Escadaria: degraus do portal para o Largo, sobre o chão medido.
    const t = L / 2, meia = Math.min(L / 2 - 0.3, 3.4)
    const pe = (tt: number, fora: number): P3 => {
      const x = a[0] + ux * tt + nx * fora, y = a[1] + uy * tt + ny * fora
      return p3(x, y, m.chao(x, y) + 0.04)
    }
    for (let f = 0.4; f <= 5.6; f += 0.42) esc.linha([pe(t - meia, f), pe(t + meia, f)], f < 0.5 ? 'aresta' : 'chao')
    for (const s of [-1, 1]) {
      const pts: P3[] = []
      for (let f = 0; f <= 5.6; f += 0.7) pts.push(pe(t + s * meia, f))
      esc.linha(pts, 'pormenor')
    }
    m.pontos.portalSe = v3(a[0] + ux * t + nx * 6, a[1] + uy * t + ny * 6, m.chao(a[0] + ux * t + nx * 6, a[1] + uy * t + ny * 6))
  }

  function portal(P: (t: number, z: number, f?: number) => P3, L: number, chaoEm: (t: number) => number, esc: Esboco,
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

  /**
   * Contrafortes da Sé: pilares de pedra encostados às paredes compridas, com o
   * topo em rampa. Nunca na fachada poente (portal e escadaria).
   */
  function contrafortes(m: Mundo, b: Edificio, esc: Esboco) {
    for (let i = 0; i < b.anel.length; i++) {
      const a = b.anel[i], c = b.anel[(i + 1) % b.anel.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      if (L < 9) continue
      const ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L, nx = uy, ny = -ux
      if (nx < -0.7) continue
      const n = Math.max(1, Math.round(L / 7) - 1)
      for (let k = 1; k <= n; k++) {
        const t = (L * k) / (n + 1)
        const x = a[0] + ux * t, y = a[1] + uy * t
        if (!m.livre(x + nx * 2, y + ny * 2, b)) continue
        const z0 = m.chao(x + nx * 0.6, y + ny * 0.6) - 0.5, z1 = b.topo - 3.5
        if (z1 - z0 < 3) continue
        const g = new THREE.BoxGeometry(1.3, z1 - z0, 1.1)
        g.rotateY(Math.atan2(uy, ux))
        g.translate(x + nx * 0.55, (z0 + z1) / 2, -(y + ny * 0.55))
        m.colisao.add(new THREE.Mesh(g.clone()))
        esc.solido(g, 'aresta')
        // Rampa do topo: do bordo do contraforte até à parede, 1,4 m acima.
        for (const s2 of [-0.65, 0.65]) {
          esc.face([p3(x + ux * s2 + nx * 1.1, y + uy * s2 + ny * 1.1, z1), p3(x + ux * s2, y + uy * s2, z1 + 1.4), p3(x + ux * s2, y + uy * s2, z1)], 'pormenor')
        }
        esc.face([p3(x - ux * 0.65 + nx * 1.1, y - uy * 0.65 + ny * 1.1, z1), p3(x + ux * 0.65 + nx * 1.1, y + uy * 0.65 + ny * 1.1, z1),
          p3(x + ux * 0.65, y + uy * 0.65, z1 + 1.4), p3(x - ux * 0.65, y - uy * 0.65, z1 + 1.4)], 'pormenor')
        esc.linha([p3(x - ux * 0.65 + nx * 1.12, y - uy * 0.65 + ny * 1.12, z0 + 0.5 + (z1 - z0) * 0.45), p3(x + ux * 0.65 + nx * 1.12, y + uy * 0.65 + ny * 1.12, z0 + 0.5 + (z1 - z0) * 0.45)], 'pormenor')
      }
    }
  }

  function pontoLargo(m: Mundo): [number, number] {
    const l = m.n.pracas.find((p) => p.osm === ID_LARGO)
    if (!l) return [30, 5]
    const xs = l.g.map((p) => p[0]), ys = l.g.map((p) => p[1])
    return [xs.reduce((a, b) => a + b) / xs.length, ys.reduce((a, b) => a + b) / ys.length]
  }

  /**
   * O claustro: galeria entre o anel exterior e o pátio, porta para o Largo e
   * arcaria para o pátio. Tudo inventado a partir da planta — é um jogo.
   */
  function claustro(m: Mundo, b: Edificio, esc: Esboco) {
    const exterior = b.anel
    const patio = b.furos[0]
    const zTopo = b.topo
    const fundo = b.base - 0.8
    // Porta na face exterior livre mais próxima do Largo da Sé Velha.
    const largo = pontoLargo(m)
    let melhor = -1, dist = Infinity
    for (let i = 0; i < exterior.length; i++) {
      const a = exterior[i], c = exterior[(i + 1) % exterior.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1])
      if (L < 6) continue
      const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2
      const nx = (c[1] - a[1]) / L, ny = -(c[0] - a[0]) / L
      if (!m.livre(mx + nx * 2, my + ny * 2, b)) continue
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
      m.pontos.portaClaustro = v3(mx + nx * 2.5, my + ny * 2.5, m.chao(mx + nx * 2.5, my + ny * 2.5))
      m.pontos.dentroClaustro = v3(mx - nx * 2.5, my - ny * 2.5, m.chao(mx - nx * 2.5, my - ny * 2.5))
    }
    m.paredesComAberturas(exterior, fundo, zTopo, aberturas, esc, 0.6, false)
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
      m.paredesComAberturas(pr, fundo, zTopo, arcos, esc, 0.6, true)
      const xs = patio.map((p) => p[0]), ys = patio.map((p) => p[1])
      const cx = xs.reduce((s, v) => s + v) / xs.length, cy = ys.reduce((s, v) => s + v) / ys.length
      m.pontos.patio = v3(cx, cy, m.chao(cx, cy))
    }
    // Telhado ao beirado e, por baixo, o tecto da galeria à altura de gente.
    m.tampa(exterior, patio ? [patio] : [], zTopo, esc)
    if (patio && pisoClaustro) {
      const zg = pisoClaustro + 4.5
      m.tampa(exterior, [patio], zg, esc)
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
    if (patio && pisoClaustro) detalhesClaustro(m, exterior, patio, zTopo, esc)
    // Um fontanário no meio do pátio.
    if (m.pontos.patio) {
      const p = m.pontos.patio
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
      m.colisao.add(new THREE.Mesh(col))
    }
  }

  /**
   * O que faz o claustro parecer claustro: lajes na galeria, arcossólios nas
   * paredes de fora, o piso de cima virado ao pátio e o jardim de buxo.
   */
  function detalhesClaustro(m: Mundo, exterior: Anel, patio: Anel, zTopo: number, esc: Esboco) {
    const piso = pisoClaustro, zg = piso + 4.5
    const r = aleatorio(semente('claustro'))
    const noPatio = (x: number, y: number) => dentro(x, y, patio)
    const naGaleria = (x: number, y: number) => dentro(x, y, exterior) && !noPatio(x, y)
    // Lajes: juntas paralelas ao pátio e juntas de través, só dentro da galeria.
    const pr = [...patio].reverse()
    for (let i = 0; i < pr.length; i++) {
      const a = pr[i], c = pr[(i + 1) % pr.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1]), ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L
      const nx = uy, ny = -ux // para fora do pátio (galeria)
      for (let f = 1.3; f < 9; f += 1.3) {
        const pts: [number, number][] = []
        for (let t = 0; t <= L; t += 0.5) { const x = a[0] + ux * t + nx * f, y = a[1] + uy * t + ny * f; if (naGaleria(x, y)) pts.push([x, y]) }
        for (let k = 1; k < pts.length; k++) {
          if (Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]) > 0.6) continue
          esc.linha([p3(...pts[k - 1], m.chao(...pts[k - 1]) + 0.03), p3(...pts[k], m.chao(...pts[k]) + 0.03)], 'chao')
        }
      }
      for (let t = 0.6; t < L; t += 1.1 + r() * 0.4) {
        for (let f = 0.7; f < 9; f += 1.3) {
          const x = a[0] + ux * t + nx * f, y = a[1] + uy * t + ny * f
          if (!naGaleria(x, y) || !naGaleria(x + nx * 1.3, y + ny * 1.3)) continue
          const d = (k: number) => p3(x + nx * k, y + ny * k, m.chao(x + nx * k, y + ny * k) + 0.03)
          esc.linha([d(0.05), d(1.25)], 'chao')
        }
      }
      // Piso de cima, virado ao pátio: cornija e janelas geminadas por cima de cada arco.
      const F = (t: number, z: number): P3 => p3(a[0] + ux * t - nx * 0.64, a[1] + uy * t - ny * 0.64, z)
      esc.linha([F(0, zg + 0.1), F(L, zg + 0.1)], 'aresta')
      esc.linha([F(0, zg + 0.35), F(L, zg + 0.35)], 'pormenor')
      const n = Math.floor(L / 3.4)
      for (let k = 0; k < n; k++) {
        const t = (L / n) * (k + 0.5)
        const z0 = zg + 1.3, z1 = Math.min(zTopo - 1, z0 + 1.8)
        if (z1 - z0 < 1) continue
        for (const dt of [-0.42, 0.42]) {
          const pts: P3[] = [F(t + dt - 0.3, z0)]
          for (let q = 0; q <= 8; q++) { const an = Math.PI * (1 - q / 8); pts.push(F(t + dt + Math.cos(an) * 0.3, z1 - 0.3 + Math.sin(an) * 0.3)) }
          pts.push(F(t + dt + 0.3, z0))
          esc.linha([...pts, pts[0]], 'pormenor')
        }
        esc.linha([F(t - 0.85, z0 - 0.08), F(t + 0.85, z0 - 0.08)], 'pormenor')
      }
    }
    // Arcossólios nas paredes de fora, virados para a galeria.
    for (let i = 0; i < exterior.length; i++) {
      const a = exterior[i], c = exterior[(i + 1) % exterior.length]
      const L = Math.hypot(c[0] - a[0], c[1] - a[1]), ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L
      const ix = -uy, iy = ux // para dentro do anel exterior
      const G = (t: number, z: number): P3 => p3(a[0] + ux * t + ix * 0.64, a[1] + uy * t + iy * 0.64, z)
      for (let t = 2.2; t < L - 2.2; t += 4.6) {
        const x = a[0] + ux * t + ix * 1.6, y = a[1] + uy * t + iy * 1.6
        if (!naGaleria(x, y) || r() < 0.25) continue
        const z0 = m.chao(x, y)
        // Nicho em arco quebrado, com o túmulo dentro e sombra no fundo.
        const R = 1.2, zn = z0 + 1.6
        const arco: P3[] = []
        for (let q = 0; q <= 10; q++) { const an = Math.PI * (1 - q / 10); arco.push(G(t + Math.cos(an) * R, zn + Math.sin(an) * R * 1.1)) }
        esc.linha([G(t - R, z0), ...arco, G(t + R, z0)], 'aresta')
        esc.linha([G(t - R - 0.2, z0), ...arco.map((p, q) => { const an = Math.PI * (1 - q / 10); return G(t + Math.cos(an) * (R + 0.2), zn + Math.sin(an) * (R + 0.2) * 1.1) }), G(t + R + 0.2, z0)], 'pormenor')
        esc.linha([G(t - R + 0.1, z0 + 0.75), G(t + R - 0.1, z0 + 0.75)], 'pormenor') // tampa do túmulo
        esc.linha([G(t - R + 0.1, z0 + 0.9), G(t + R - 0.1, z0 + 0.9)], 'pormenor')
        for (let q = -0.7; q <= 0.71; q += 0.7) esc.linha([G(t + q - 0.15, z0 + 0.2), G(t + q + 0.15, z0 + 0.2), G(t + q + 0.15, z0 + 0.6), G(t + q - 0.15, z0 + 0.6)], 'sombra', true)
        const o = G(t - R + 0.1, z0 + 1), f = G(t + R - 0.1, z0 + 1)
        esc.tracejar(o, [f[0] - o[0], 0, f[2] - o[2]], [0, zn - z0 - 0.2, 0], 0.12, 'sombra')
      }
    }
    // Jardim de buxo no pátio: quatro canteiros em cruz à volta do fontanário.
    const xs = patio.map((p) => p[0]), ys = patio.map((p) => p[1])
    const cx = xs.reduce((s, v) => s + v) / xs.length + 3, cy = ys.reduce((s, v) => s + v) / ys.length - 2
    for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const x0 = cx + sx * 2.8, x1 = cx + sx * 7.5, y0 = cy + sy * 2.8, y1 = cy + sy * 7.5
      const canto: [number, number][] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
      if (!canto.every(([x, y]) => noPatio(x, y))) continue
      const Q = (x: number, y: number, dz = 0.04): P3 => p3(x, y, m.chao(x, y) + dz)
      esc.linha(canto.map(([x, y]) => Q(x, y)), 'pormenor', true)
      esc.linha([[x0 + sx * 0.3, y0 + sy * 0.3], [x1 - sx * 0.3, y0 + sy * 0.3], [x1 - sx * 0.3, y1 - sy * 0.3], [x0 + sx * 0.3, y1 - sy * 0.3]].map(([x, y]) => Q(x, y)), 'chao', true)
      // Buxo: tufos baixos em riscos curtos.
      for (let k = 0; k < 26; k++) {
        const x = x0 + (x1 - x0) * r(), y = y0 + (y1 - y0) * r()
        esc.linha([Q(x - 0.15, y), Q(x - 0.05, y + 0.08, 0.15), Q(x + 0.05, y - 0.02, 0.1), Q(x + 0.15, y + 0.06)], 'sombra')
      }
    }
  }

  return {
    portas: {
      'way/246397825': 'way/121298535', // Torre de Almedina
      'way/1165517467': 'way/1165517464', // Porta da Barbacã
    },
    especiais: { [ID_SE]: se, [ID_CLAUSTRO]: claustro },
    ajustar: nivelarClaustro,
    // Ferreira Borges, Barbacã, Arco, a dobra para o Quebra-Costas, as escadas, o Largo e o claustro.
    percurso: {
      vias: ['way/1165517465', 'way/1165517464', 'way/41222814', 'way/121298535',
        'way/121298533', 'way/121298534', 'way/1128379641', 'way/116224908'],
      extra: [[24, 18], [32, 6], [38, -1], [41, -9]],
      ate: ['portaClaustro', 'dentroClaustro', 'patio'],
    },
    pontos: (m) => ({
      inicio: m.noChao(...m.rotaBase[0]),
      olharInicio: m.noChao(...m.perto([-99, 19])),
      arco: m.noChao(-82, 12.5),
      largoArco: m.noChao(...m.perto([-70, -1])),
      escadasBase: m.noChao(...m.perto([-45, 7])),
      escadasMeio: m.noChao(...m.perto([-16, 17])),
      escadasTopo: m.noChao(...m.perto([16, 13])),
      largo: m.noChao(32, 6),
    }),
    placas: [
      ['Rua Ferreira Borges', [-106, 15]],
      ['Arco de Almedina', [-72, -1]],
      ['Rua de Quebra-Costas', [-56, 6]],
      ['Largo da Sé Velha', [20, 19]],
    ],
    // Varandas com atiradores ao longo da subida ("olha para as janelas").
    varandas: (m) => {
      const P = m.pontos
      const S = (a: THREE.Vector3, b: THREE.Vector3, t: number) => m.sDe(a) + (m.sDe(b) - m.sDe(a)) * t
      return [
        [S(P.arco, P.largoArco, 0.9), 3, 1],
        [S(P.largoArco, P.escadasBase, 0.5), -3, 1],
        [S(P.escadasBase, P.escadasMeio, 0.35), 3, 1],
        [S(P.escadasBase, P.escadasMeio, 0.8), -3, 2],
        [S(P.escadasMeio, P.escadasTopo, 0.55), 3, 1],
        [S(P.escadasTopo, P.largo, 0.4), -4, 1],
      ]
    },
    semParedes: [ID_SE, ID_CLAUSTRO],
  }
}
