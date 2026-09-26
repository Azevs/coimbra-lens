/**
 * O que é da Cabra no desenho do mundo: a Porta Férrea (a ponta norte da
 * Reitoria, com a fachada esboçada), a Torre da Universidade por dentro e por
 * fora, a galeria da Via Latina, a estátua do pátio, o parapeito do terraço e
 * o portão trancado. As posições vêm do OSM; o pormenor (interior da torre,
 * figuras, galeria) é inventado.
 */
import * as THREE from 'three'
import { v3, p3, type Mundo, type Edificio } from '../mundo'
import { Esboco, papel, TINTA, type P3 } from '../tinta'
import type { DefMundo } from './tipos'

type XY = [number, number]

export const ID_TORRE = 'way/115574903'
const ID_REITORIA = 'way/201989127'
const ID_PORTA = 'way/201989127:porta' // a ponta norte da Reitoria, cortada em ajustar()
const VIA_PORTA = 'way/342657026' // a passagem da Porta Férrea
const VIAS_LATINA = ['way/115744958', 'way/779645929', 'way/1409615576', 'way/1409615579']
const ESTATUA: XY = [-135.88, -42.52] // node/1306837151
const PORTAO: XY = [-163.6, -67.3] // node/2116724008, no muro a sudoeste do pátio
/** O muro de suporte do terraço sul (way/201990651), prolongado até dentro da Reitoria. */
const TERRACO: XY[] = [[-161.8, -76.2], [-93.0, -62.1]]

/** Dimensões da torre por dentro (metros). */
// Lanços de 1,2 m: com 1 m o corpo (0,64 m) roçava o corrimão e a rampa ao mesmo tempo e travava.
export const TORRE = { parede: 0.55, lanco: 1.2, subida: 1.5, voltas: 4 }

/** Metade de um polígono de um lado da recta y = c (Sutherland–Hodgman). */
function cortar(anel: XY[], c: number, acima: boolean): XY[] {
  const dentro = (p: XY) => (acima ? p[1] >= c : p[1] <= c)
  const out: XY[] = []
  for (let i = 0; i < anel.length; i++) {
    const a = anel[i], b = anel[(i + 1) % anel.length]
    if (dentro(a)) out.push(a)
    if (dentro(a) !== dentro(b)) {
      const t = (c - a[1]) / (b[1] - a[1])
      out.push([a[0] + (b[0] - a[0]) * t, c])
    }
  }
  return out
}

/** Caixa com colisão, desenhada ou não. */
function caixa(m: Mundo, esc: Esboco, w: number, h: number, d: number, x: number, y: number, z: number, ang: number, traco: 'aresta' | 'pormenor' | false = 'aresta', colide = true, soTiros = false) {
  const g = new THREE.BoxGeometry(w, h, d)
  g.rotateY(ang)
  g.translate(x, z, -y)
  if (colide) {
    const c = new THREE.Mesh(g.clone())
    c.userData.soTiros = soTiros
    m.colisao.add(c)
  }
  esc.solido(g, traco)
}

/**
 * Superfície que só colide (rampas de escada, corrimãos): dois triângulos. A
 * octree empurra a cápsula sempre para o lado da normal, por isso o plano vira-se
 * para `frente`, o lado de onde se espera quem lhe toca.
 */
function planoColisao(m: Mundo, a: P3, b: P3, c: P3, d: P3, frente: P3, soFisica = false, soTiros = false) {
  const A = new THREE.Vector3(...a), n = new THREE.Vector3(...b).sub(A).cross(new THREE.Vector3(...c).sub(A))
  const pos = n.dot(new THREE.Vector3(...frente).sub(A)) >= 0 ? [...a, ...b, ...c, ...a, ...c, ...d] : [...a, ...c, ...b, ...a, ...d, ...c]
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  const malha = new THREE.Mesh(g)
  // Corrimãos e guardas não param balas (`main.ts` deixa-os fora da octree dos tiros).
  malha.userData.soFisica = soFisica
  // As rampas das escadas só param balas: para andar são `Mundo.rampa`.
  malha.userData.soTiros = soTiros
  m.colisao.add(malha)
}
const acima = (p: P3): P3 => [p[0], p[1] + 1, p[2]]

const tintaDosDoisLados = new THREE.MeshBasicMaterial({ color: TINTA, side: THREE.DoubleSide })

/** Silhueta de uma figura de pé, a tinta, num plano vertical (para nichos). */
function silhueta(cx: number, cy: number, z: number, h: number, ux: number, uy: number, nx: number, ny: number, sentada = false) {
  const s = h / 2.2
  // Contorno em (lateral, altura), de baixo para cima e de volta.
  const perfil: [number, number][] = sentada
    ? [[-0.45, 0], [0.45, 0], [0.42, 0.7], [0.3, 0.75], [0.32, 1.25], [0.2, 1.5], [0.12, 1.55], [0.14, 1.8], [0, 1.9], [-0.14, 1.8], [-0.12, 1.55], [-0.2, 1.5], [-0.32, 1.25], [-0.3, 0.75], [-0.42, 0.7]]
    : [[-0.28, 0], [0.28, 0], [0.24, 0.9], [0.3, 1.4], [0.22, 1.6], [0.12, 1.65], [0.14, 1.95], [0, 2.08], [-0.14, 1.95], [-0.12, 1.65], [-0.22, 1.6], [-0.36, 1.3], [-0.5, 1.45], [-0.54, 1.38], [-0.3, 1.05], [-0.24, 0.9]]
  const forma = new THREE.Shape(perfil.map(([l, a]) => new THREE.Vector2(l * s, a * s)))
  const g = new THREE.ShapeGeometry(forma)
  // (lateral, altura) → mundo: lateral ao longo da fachada, altura em z, um pouco à frente.
  const pos = g.getAttribute('position') as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const l = pos.getX(i), a = pos.getY(i)
    pos.setXYZ(i, cx + ux * l + nx * 0.02, z + a, -(cy + uy * l + ny * 0.02))
  }
  const malha = new THREE.Mesh(g, tintaDosDoisLados)
  malha.userData.semColisao = true
  return malha
}

export function mundoCabra(): DefMundo {
  /**
   * A Reitoria tem 90 m de comprido e a Porta Férrea é só a ponta norte: parte-se
   * em duas, para o arco e o túnel ficarem na ponta e o resto ser um prédio como os outros.
   */
  function ajustar(m: Mundo) {
    const i = m.n.edificios.findIndex((b) => b.osm === ID_REITORIA)
    if (i < 0) return
    const r = m.n.edificios[i]
    const CORTE = 14
    const ponta: Edificio = { ...r, osm: ID_PORTA, nome: 'Porta Férrea', anel: cortar(r.anel as XY[], CORTE, true), furos: [], passagem: true }
    const resto: Edificio = { ...r, anel: cortar(r.anel as XY[], CORTE, false), furos: [], passagem: false }
    m.n.edificios.splice(i, 1, resto, ponta)
  }

  // ------------------------------------------------------------ Porta Férrea --

  /** O arco e o túnel vêm do motor; por fora, a fachada: pilastras, nichos com figuras, remate. */
  function portaFerrea(m: Mundo, b: Edificio, esc: Esboco) {
    m.portaDaCidade(b, VIA_PORTA, esc, { ameias: false, pedra: false })
    const via = m.n.vias.find((v) => v.osm === VIA_PORTA)?.g
    if (!via) return
    // Face nascente (a de fora): do vértice (-106.01, 18.04) ao (-108.14, 25.87), com o arco a meio.
    const f0: XY = [-106.01, 18.04], f1: XY = [-108.14, 25.87]
    fachada(m, esc, f0, f1, via[0] as XY, b.topo, true)
    // Face poente, para o pátio: mais simples.
    const g0: XY = [-118.67, 23.24], g1: XY = [-117.74, 19.01]
    fachada(m, esc, g0, g1, via[via.length - 1] as XY, b.topo, false)
  }

  function fachada(m: Mundo, esc: Esboco, a: XY, c: XY, centro: XY, topo: number, rica: boolean) {
    const L = Math.hypot(c[0] - a[0], c[1] - a[1])
    const ux = (c[0] - a[0]) / L, uy = (c[1] - a[1]) / L, nx = uy, ny = -ux // normal para fora
    const tc = (centro[0] - a[0]) * ux + (centro[1] - a[1]) * uy
    const zc = m.chao(centro[0] + nx * 1.5, centro[1] + ny * 1.5)
    const F = (t: number, z: number, fora = 0.06): P3 => p3(a[0] + ux * (tc + t) + nx * fora, a[1] + uy * (tc + t) + ny * fora, zc + z)
    const rect = (t0: number, t1: number, z0: number, z1: number, fora = 0.06, traco: 'aresta' | 'pormenor' = 'pormenor') =>
      esc.linha([F(t0, z0, fora), F(t1, z0, fora), F(t1, z1, fora), F(t0, z1, fora)], traco, true)
    // Pilastras: duas de cada lado do arco, com base e capitel.
    const pil = rica ? [2.15, 3.55] : [2.3]
    for (const s of [-1, 1]) for (const t of pil) {
      const t0 = s * t - 0.22, t1 = s * t + 0.22
      rect(t0, t1, 0, 6.3, 0.14, 'aresta')
      esc.linha([F(t0 - 0.1, 0.5, 0.18), F(t1 + 0.1, 0.5, 0.18)], 'pormenor')
      esc.linha([F(t0 - 0.12, 5.9, 0.18), F(t1 + 0.12, 5.9, 0.18)], 'pormenor')
      for (let z = 0.9; z < 5.8; z += 0.55) esc.linha([F(t0 + 0.06, z, 0.15), F(t0 + 0.06, z + 0.3, 0.15)], 'sombra')
    }
    // Entablamento por cima de tudo.
    const larg = rica ? 4.1 : 2.9
    for (const [z, fora] of [[6.3, 0.2], [6.75, 0.24], [7.2, 0.28]] as const) esc.linha([F(-larg, z, fora), F(larg, z, fora)], z === 7.2 ? 'aresta' : 'pormenor')
    if (!rica) return
    // Nichos entre as pilastras, cada um com a sua figura em silhueta.
    for (const s of [-1, 1]) {
      const t = s * 2.85, w = 0.34, z0 = 1.5, z1 = 4.3
      const arco: P3[] = []
      for (let q = 0; q <= 10; q++) { const an = Math.PI * (q / 10); arco.push(F(t + Math.cos(an) * w, z1 + Math.sin(an) * w, 0.04)) }
      esc.linha([F(t + w, z0, 0.04), ...arco, F(t - w, z0, 0.04), F(t + w, z0, 0.04)], 'aresta')
      esc.linha([F(t - w - 0.1, z0 - 0.08, 0.1), F(t + w + 0.1, z0 - 0.08, 0.1)], 'pormenor')
      const [cx, , cz] = F(t, 0, 0.1)
      m.cena.add(silhueta(cx, -cz, zc + z0, 2.3, ux, uy, nx, ny))
    }
    // Remate: painel com nicho e figura sentada, volutas, e o frontão por cima do telhado.
    const zt = topo - zc
    rect(-2.0, 2.0, 7.2, zt, 0.16, 'aresta')
    const arco: P3[] = []
    for (let q = 0; q <= 12; q++) { const an = Math.PI * (q / 12); arco.push(F(Math.cos(an) * 0.6, 9.9 + Math.sin(an) * 0.6, 0.12)) }
    esc.linha([F(0.6, 7.7, 0.12), ...arco, F(-0.6, 7.7, 0.12), F(0.6, 7.7, 0.12)], 'aresta')
    const [cx, , cz] = F(0, 0, 0.16)
    m.cena.add(silhueta(cx, -cz, zc + 7.75, 2.0, ux, uy, nx, ny, true))
    for (const s of [-1, 1]) {
      const vol: P3[] = []
      for (let q = 0; q <= 16; q++) { const an = (q / 16) * Math.PI * 1.6, r = 0.9 - q * 0.04; vol.push(F(s * (2.0 + r * Math.cos(an) * 0.8) , 7.4 + 0.9 + r * Math.sin(an), 0.14)) }
      esc.linha(vol, 'pormenor')
    }
    // Frontão curvo que sobe acima do beirado: face de papel para tapar o céu, e o contorno.
    const fr: P3[] = []
    for (let q = 0; q <= 16; q++) { const an = Math.PI * (q / 16); fr.push(F(Math.cos(an) * 2.3, zt + Math.sin(an) * 1.5, 0.18)) }
    esc.face([F(2.3, zt, 0.18), ...fr.slice(1, -1), F(-2.3, zt, 0.18)], 'aresta')
    esc.linha(fr.map((p, q) => { const an = Math.PI * (q / 16); return F(Math.cos(an) * 1.9, zt + Math.sin(an) * 1.15, 0.2) }), 'pormenor')
  }

  // ---------------------------------------------------------------- a Torre --

  /**
   * A Torre por dentro (inventado): paredes grossas, porta para o pátio, lanços
   * rectos à volta de um poço quadrado, um patamar por volta com frestas, e a
   * sala dos sinos com as quatro sineiras. A escada sobe no sentido contrário
   * ao dos ponteiros: os dois últimos lanços de cada volta correm junto ao Paço
   * (norte e poente), e o chão da sala dos sinos fica inteiro do lado do pátio. Por fora: cunhais, cornijas, relógio,
   * sineiras em arco, cúpula e lanterna. Os lanços são rampas invisíveis
   * desenhadas como degraus.
   */
  function torre(m: Mundo, b: Edificio) {
    const esc = new Esboco('torre-cabra', 0.8, 1)
    // Os quatro cantos do OSM (o quinto vértice está a meio da face sul).
    const A: XY = [-183.32, 18.55], B: XY = [-177.62, 19.58], D: XY = [-184.37, 24.28]
    const S = Math.min(Math.hypot(B[0] - A[0], B[1] - A[1]), Math.hypot(D[0] - A[0], D[1] - A[1]))
    const ux = (B[0] - A[0]) / Math.hypot(B[0] - A[0], B[1] - A[1]), uy = (B[1] - A[1]) / Math.hypot(B[0] - A[0], B[1] - A[1])
    const vx = -uy, vy = ux // perpendicular, para norte
    const ang = Math.atan2(uy, ux)
    /** Ponto local (a para nascente, c para norte, z cota) → nível. */
    const L = (a: number, c: number): XY => [A[0] + ux * a + vx * c, A[1] + uy * a + vy * c]
    const Q = (a: number, c: number, z: number): P3 => p3(...L(a, c), z)
    const e = TORRE.parede, w = TORRE.lanco, r = TORRE.subida
    const lo = e, hi = S - e
    const porta = L(lo + w / 2, -1.5)
    const z0 = m.chao(...L(lo + w / 2, 0.4))
    const zS = z0 + r * 4 * TORRE.voltas // chão da sala dos sinos
    const topo = b.topo
    const caixaL = (a0: number, a1: number, c0: number, c1: number, z1: number, z2: number, traco: 'aresta' | 'pormenor' | false = false, colide = true, soTiros = false) => {
      const [x, y] = L((a0 + a1) / 2, (c0 + c1) / 2)
      caixa(m, esc, a1 - a0, z2 - z1, c1 - c0, x, y, (z1 + z2) / 2, ang, traco, colide, soTiros)
    }
    /** Patim da escada: chão plano para quem anda (como as rampas), caixa só para as balas. */
    const patim = (a0: number, a1: number, c0: number, c1: number, z: number, traco: 'aresta' | 'pormenor') => {
      caixaL(a0, a1, c0, c1, z - 0.25, z, traco, true, true)
      m.rampa(L(a0, (c0 + c1) / 2), L(a1, (c0 + c1) / 2), c1 - c0, z, z)
    }

    // Paredes, com os vãos (porta, frestas, sineiras) como buracos rectangulares.
    // Cada parede: de onde a onde (local), e os vãos [t0, t1, z0, z1] ao longo dela.
    type Vao = [number, number, number, number]
    const paredes: { de: [number, number]; para: [number, number]; vaos: Vao[]; dentro: [number, number] }[] = [
      { de: [0, 0], para: [S, 0], dentro: [0, 1], vaos: [] }, // sul (pátio)
      { de: [S, 0], para: [S, S], dentro: [-1, 0], vaos: [] }, // nascente
      { de: [S, S], para: [0, S], dentro: [0, -1], vaos: [] }, // norte (Paço)
      { de: [0, S], para: [0, 0], dentro: [1, 0], vaos: [] }, // poente (Paço)
    ]
    paredes[0].vaos.push([lo + 0.05, lo + w - 0.05, z0 - 1, z0 + 2.4]) // porta, a dar para o patim da escada
    const patamares = [1, 2, 3].map((k) => z0 + r * 4 * k)
    for (const [k, zp] of patamares.entries()) {
      // Frestas: sul e nascente sempre; poente e norte só acima do telhado do Paço.
      for (const [i, p] of paredes.entries()) {
        if (i >= 2 && zp + 1 < 118) continue
        const t = S / 2 + (k % 2 ? 0.8 : -0.8)
        p.vaos.push([t - 0.2, t + 0.2, zp + 0.95, zp + 2.35])
      }
    }
    for (const p of paredes) p.vaos.push([S / 2 - 1.3, S / 2 + 1.3, zS + 1.0, zS + 5.3]) // sineiras, peitoril a 1 m
    const baixo = b.base - 0.8
    for (const [i, p] of paredes.entries()) {
      const [a0, c0] = p.de, [a1, c1] = p.para
      const Lp = Math.hypot(a1 - a0, c1 - c0), da = (a1 - a0) / Lp, dc = (c1 - c0) / Lp
      const [ia, ic] = p.dentro
      const W = (t: number, o: number, z: number): P3 => Q(a0 + da * t + ia * o, c0 + dc * t + ic * o, z)
      // Colunas de parede entre os bordos dos vãos; em cada uma, o que é cheio.
      const cortes = [...new Set([0, Lp, ...p.vaos.flatMap(([t0, t1]) => [t0, t1])])].sort((x, y) => x - y)
      for (let k = 1; k < cortes.length; k++) {
        const t0 = cortes[k - 1], t1 = cortes[k]
        if (t1 - t0 < 0.01) continue
        const tm = (t0 + t1) / 2
        const buracos = p.vaos.filter(([v0, v1]) => v0 <= tm && v1 >= tm).map(([, , z1, z2]) => [z1, z2]).sort((x, y) => x[0] - y[0])
        // Bloco de parede nesta coluna, da face de fora (o = 0) até `o1` para dentro.
        const bloco = (z1: number, z2: number, o0 = 0, o1 = e) => {
          const [ax, ay] = [a0 + da * tm + ia * (o0 + o1) / 2, c0 + dc * tm + ic * (o0 + o1) / 2]
          // A parede fica para dentro do contorno; nas esquinas as paredes cruzam-se, sem mal.
          const la = Math.abs(da) > 0.5 ? t1 - t0 : o1 - o0, lc = Math.abs(da) > 0.5 ? o1 - o0 : t1 - t0
          caixaL(ax - la / 2, ax + la / 2, ay - lc / 2, ay + lc / 2, z1, z2)
        }
        const sineira = p.vaos.some(([v0, v1]) => v1 - v0 > 2 && v0 <= tm && v1 >= tm)
        let z = baixo
        for (const [z1, z2] of [...buracos, [topo, topo]]) {
          if (z1 > z + 0.01) {
            if (sineira && Math.abs(z1 - (zS + 1.0)) < 0.01) {
              // Debaixo da sineira: parede inteira até ao chão da sala, depois só uma guarda
              // fina do lado de fora, e o chão da sala avança por cima do resto da parede.
              bloco(z, zS)
              bloco(zS, z1, 0, 0.22)
              bloco(zS - 0.25, zS, 0.22, e)
            } else bloco(z, z1)
          }
          z = Math.max(z, z2)
        }
      }
      // Sineiras: guarda invisível na face de fora, do peitoril até acima da cabeça.
      for (const [t0, t1, z1] of p.vaos.filter(([t0, t1]) => t1 - t0 > 2)) {
        planoColisao(m, W(t0, 0, z1), W(t1, 0, z1), W(t1, 0, z1 + 3), W(t0, 0, z1 + 3), W((t0 + t1) / 2, e + 1, z1 + 0.8), true)
      }
      // Contornos dos vãos, por fora e por dentro.
      for (const [t0, t1, z1, z2] of p.vaos) {
        const zb = Math.max(z1, z0)
        for (const o of [-0.03, e + 0.03]) esc.linha([W(t0, o, zb), W(t1, o, zb), W(t1, o, z2), W(t0, o, z2)], 'aresta', true)
        if (t1 - t0 > 2) {
          // Sineira: arco de volta perfeita desenhado por cima do vão, e as aduelas.
          const R = (t1 - t0) / 2, tm = (t0 + t1) / 2
          for (const o of [-0.04, e + 0.04]) {
            esc.linha(Array.from({ length: 13 }, (_, q) => { const an = Math.PI * (1 - q / 12); return W(tm + Math.cos(an) * (R + 0.25), z2 - 0.9 + Math.sin(an) * 1.15, o) }), 'pormenor')
          }
        }
      }
      // Por fora: cunhais na esquina, cornijas por patamar, e o relógio por baixo das sineiras.
      const P = (t: number, z: number): P3 => W(t, -0.05, z)
      let alt = 0
      for (let z = z0 + 0.1; z + 0.5 < topo - 0.6; z += 0.55, alt ^= 1) esc.linha([P(0, z + 0.5), P(alt ? 0.8 : 0.45, z + 0.5), P(alt ? 0.8 : 0.45, z)], 'pormenor')
      for (const zp of [...patamares, zS]) esc.linha([P(0, zp - 0.25), P(Lp, zp - 0.25)], 'pormenor')
      esc.linha([P(0, zS + 6.2), P(Lp, zS + 6.2)], 'aresta')
      if (i < 2 || zS - 3.5 > 118) {
        const zr = zS - 2.2, tm = Lp / 2
        esc.linha(Array.from({ length: 25 }, (_, q) => { const an = (q / 24) * Math.PI * 2; return P(tm + Math.cos(an) * 1.05, zr + Math.sin(an) * 1.05) }), 'aresta')
        for (let h = 0; h < 12; h++) { const an = (h / 12) * Math.PI * 2; esc.linha([P(tm + Math.cos(an) * 0.85, zr + Math.sin(an) * 0.85), P(tm + Math.cos(an) * 1.0, zr + Math.sin(an) * 1.0)], 'pormenor') }
        esc.linha([P(tm, zr), P(tm, zr + 0.7)], 'aresta')
        esc.linha([P(tm, zr), P(tm + 0.45, zr - 0.2)], 'aresta')
      }
      // Esquina vertical e beirado.
      esc.linha([P(0, m.chao(...L(a0, c0))), P(0, topo)], 'aresta')
      esc.linha([P(0, topo), P(Lp, topo)], 'aresta')
    }
    // Soalho do rés-do-chão à cota da porta: o LiDAR cá dentro não é chão de ninguém.
    caixaL(lo, hi, lo, hi, z0 - 0.4, z0, 'pormenor')
    // Cobertura: laje ao beirado, tecto da sala dos sinos, cúpula baixa e lanterna.
    caixaL(0, S, 0, S, topo - 0.3, topo, 'aresta')
    caixaL(lo, hi, lo, hi, zS + 6.3, zS + 6.55)
    const [cx, cy] = L(S / 2, S / 2)
    const cup = new THREE.SphereGeometry(2.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
    cup.scale(1, 0.8, 1)
    cup.translate(cx, topo, -cy)
    esc.solido(cup, 'pormenor', 35)
    const lant = new THREE.CylinderGeometry(0.45, 0.55, 1.5, 8)
    lant.translate(cx, topo + 1.8 + 0.75, -cy)
    esc.solido(lant, 'aresta', 30)

    // Escada: 4 voltas de 4 lanços à roda das paredes (sul, nascente, norte, poente).
    const pontosSubida: THREE.Vector3[] = []
    const cantos = { SO: [lo + w / 2, lo + w / 2], NO: [lo + w / 2, hi - w / 2], NE: [hi - w / 2, hi - w / 2], SE: [hi - w / 2, lo + w / 2] } as const
    const lanco = (a0: number, c0: number, a1: number, c1: number, zA: number, zB: number, poco: 1 | -1, base = zA) => {
      // (a0,c0)→(a1,c1) é a linha do meio do lanço; o poço fica do lado \`poco\` (esquerda = 1).
      const dA = a1 - a0, dC = c1 - c0, Lr = Math.hypot(dA, dC), ta = dA / Lr, tcc = dC / Lr
      const la = -tcc * poco, lc = ta * poco // para o lado do poço
      const M = (t: number, o: number, z: number): P3 => Q(a0 + ta * t + la * o, c0 + tcc * t + lc * o, z)
      const h = w / 2
      // Rampa: chão para quem anda, plano só para as balas. Corrimão do lado do poço, desde `base`
      // (nos lanços por cima de um soalho, para ninguém se meter por baixo deles).
      m.rampa(L(a0, c0), L(a1, c1), w, zA, zB)
      planoColisao(m, M(0, -h, zA), M(Lr, -h, zB), M(Lr, h, zB), M(0, h, zA), acima(M(Lr / 2, 0, (zA + zB) / 2)), false, true)
      planoColisao(m, M(0, h, base), M(Lr, h, base), M(Lr, h, zB + 1.1), M(0, h, zA + 1.1), M(Lr / 2, 0, (zA + zB) / 2 + 0.5), true)
      // Degraus: cobertor e espelho de cada um, em papel, e o perfil em serra do lado do poço.
      const n = 9, perfil: P3[] = [M(0, h, zA)]
      for (let k = 0; k < n; k++) {
        const t0 = (Lr * k) / n, t1 = (Lr * (k + 1)) / n, z1 = zA + ((zB - zA) * (k + 1)) / n, zp = zA + ((zB - zA) * k) / n
        esc.face([M(t0, -h, zp), M(t0, h, zp), M(t0, h, z1), M(t0, -h, z1)], false)
        esc.face([M(t0, -h, z1), M(t1, -h, z1), M(t1, h, z1), M(t0, h, z1)], false)
        esc.linha([M(t0, -h, z1), M(t0, h, z1)], 'aresta')
        perfil.push(M(t0, h, z1), M(t1, h, z1))
      }
      esc.linha(perfil, 'aresta')
      esc.linha([M(0, h, zA - 0.25), M(Lr, h, zB - 0.25)], 'pormenor') // o de baixo
      esc.face([M(0, h, zA - 0.25), M(Lr, h, zB - 0.25), ...perfil.slice(1).reverse(), M(0, h, zA)], false)
      // Corrimão: barra de cima e balaústres.
      esc.linha([M(0, h, zA + 1.05), M(Lr, h, zB + 1.05)], 'aresta')
      for (let t = 0.25; t < Lr; t += 0.32) esc.linha([M(t, h, zA + ((zB - zA) * t) / Lr + ((zB - zA) / n)), M(t, h, zA + ((zB - zA) * t) / Lr + 1.05)], 'sombra')
    }
    const patamar = (z: number) => {
      // Tudo menos a abertura por onde chegam os dois últimos lanços (norte e poente).
      caixaL(lo + w, hi, lo, hi - w, z - 0.25, z, 'aresta')
      patim(lo, lo + w, lo, lo + w, z, 'aresta')
      patim(hi - w, hi, hi - w, hi, z, 'aresta')
      // Guarda à beira da abertura: só desenhada. Com colisão ficava por cima dos lanços que chegam
      // e empurrava quem subia contra o corrimão; da laje para a abertura cai-se no máximo 1,5 m.
      esc.linha([Q(lo + w, lo + w, z + 1.05), Q(lo + w, hi - w, z + 1.05), Q(hi - w, hi - w, z + 1.05)], 'aresta')
      for (let t = 0.3; t < hi - lo - 2 * w; t += 0.32) {
        esc.linha([Q(lo + w + t, hi - w, z), Q(lo + w + t, hi - w, z + 1.05)], 'sombra')
        esc.linha([Q(lo + w, lo + w + t, z), Q(lo + w, lo + w + t, z + 1.05)], 'sombra')
      }
    }
    const canto = (nome: keyof typeof cantos, z: number) => {
      const [a, c] = cantos[nome]
      patim(a - w / 2, a + w / 2, c - w / 2, c + w / 2, z, 'pormenor')
      pontosSubida.push(v3(...L(a, c), z))
    }
    pontosSubida.push(v3(...L(...cantos.SO), z0))
    for (let k = 0; k < TORRE.voltas; k++) {
      const h = z0 + r * 4 * k
      const [a1, c1] = cantos.SO, [a2, c2] = cantos.SE, [a3, c3] = cantos.NE, [a4, c4] = cantos.NO
      lanco(a1 + w / 2, c1, a2 - w / 2, c2, h, h + r, 1, h)
      canto('SE', h + r)
      lanco(a2, c2 + w / 2, a3, c3 - w / 2, h + r, h + 2 * r, 1, h)
      canto('NE', h + 2 * r)
      lanco(a3 - w / 2, c3, a4 + w / 2, c4, h + 2 * r, h + 3 * r, 1)
      canto('NO', h + 3 * r)
      lanco(a4, c4 - w / 2, a1, c1 + w / 2, h + 3 * r, h + 4 * r, 1)
      patamar(h + 4 * r)
      pontosSubida.push(v3(...L(...cantos.SO), h + 4 * r))
    }

    // A Cabra: sino grande pendurado de uma trave, amarrado, a meio da sala.
    const sa = (lo + w + hi) / 2 + 0.2, sc = (lo + hi - w) / 2 + 0.3
    const [bx, by] = L(sa, sc)
    const perfil = [[0.02, 1.35], [0.3, 1.33], [0.42, 1.2], [0.46, 0.9], [0.52, 0.5], [0.66, 0.15], [0.72, 0]]
    const sino = new THREE.LatheGeometry(perfil.map(([x, y]) => new THREE.Vector2(x, y)), 16)
    sino.translate(bx, zS + 0.75, -by)
    esc.solido(sino, 'aresta', 20)
    caixaL(sa - 0.55, sa + 0.55, sc - 0.55, sc + 0.55, zS + 0.75, zS + 2.1, false) // colisão do sino
    caixaL(lo, hi, sc - 0.12, sc + 0.12, zS + 2.8, zS + 3.05, 'aresta', false) // trave
    esc.linha([Q(sa, sc, zS + 2.8), Q(sa, sc, zS + 2.1)], 'aresta')
    // Cordas à volta do sino e do badalo: a missão tira-as quando se solta o badalo.
    const cordas = new Esboco('cordas-cabra', 0.4, 0.4)
    for (let k = 0; k < 5; k++) {
      const z = zS + 0.95 + k * 0.17, rr = 0.55 - k * 0.04
      cordas.linha(Array.from({ length: 13 }, (_, q) => { const an = (q / 12) * Math.PI * 2 + k; return Q(sa + Math.cos(an) * rr, sc + Math.sin(an) * rr, z + Math.sin(an * 2) * 0.03) }), 'pormenor')
    }
    cordas.linha([Q(sa + 0.4, sc, zS + 1.1), Q(sa + 0.9, sc + 1.2, zS + 0.02), Q(hi - 0.15, hi - w - 0.2, zS + 0.02)], 'pormenor')
    cordas.linha([Q(sa - 0.4, sc, zS + 1.0), Q(lo + w + 0.2, sc - 0.9, zS + 0.02), Q(lo + w + 0.1, lo + 0.2, zS + 0.02)], 'pormenor')
    const gCordas = cordas.acabar()
    gCordas.name = 'cordas-cabra'
    m.cena.add(gCordas)

    m.cena.add(esc.acabar('mundo', papel, false))
    m.pontos.torrePorta = v3(...porta, m.chao(...porta))
    m.pontos.torreDentro = v3(...L(...cantos.SO), z0)
    for (const [k, zp] of patamares.entries()) m.pontos['patamar' + (k + 1)] = v3(...L(3.3, 2.8), zp)
    m.pontos.salaSinos = v3(...L(S / 2 - 0.6, lo + 0.55), zS)
    m.pontos.sino = v3(bx, by, zS)
    m.pontos.sineiraSul = v3(...L(S / 2, 0.22 + 0.34), zS)
    m.pontos.sineiraNascente = v3(...L(S - 0.22 - 0.34, S / 2 - 0.6), zS)
    cabraMundo.subida = pontosSubida
  }

  // ------------------------------------------------------------ Via Latina --

  /**
   * A galeria da Via Latina, à frente da ala norte do Paço: pilares em baixo,
   * galeria com colunas e balaustrada em cima, e a escadaria que sobe do pátio
   * (onde o OSM a põe). O desenho é esboçado.
   */
  function viaLatina(m: Mundo) {
    const esc = new Esboco('via-latina', 1, 1.2)
    const F0: XY = [-175.45, 25.79], F1: XY = [-121.41, 34.13] // fachada sul da ala norte
    const Lf = Math.hypot(F1[0] - F0[0], F1[1] - F0[1])
    const ux = (F1[0] - F0[0]) / Lf, uy = (F1[1] - F0[1]) / Lf, nx = uy, ny = -ux // n para o pátio
    const ang = Math.atan2(uy, ux)
    const G = (s: number, d: number): XY => [F0[0] + ux * s + nx * d, F0[1] + uy * s + ny * d]
    const Pz = (s: number, d: number, z: number): P3 => p3(...G(s, d), z)
    const s0 = 3, s1 = 50, fundo = 3.4
    const zB = m.chao(...G((s0 + s1) / 2, fundo)), zG = zB + 4.4
    const sE = 28.6, meiaE = 1.5 // escadaria, a meio
    // Laje da galeria e o tecto.
    const laje = (z1: number, z2: number, traco: 'aresta' | 'pormenor') => {
      const [x, y] = G((s0 + s1) / 2, fundo / 2)
      caixa(m, esc, s1 - s0, z2 - z1, fundo, x, y, (z1 + z2) / 2, ang, traco)
    }
    laje(zG - 0.35, zG, 'aresta')
    laje(zG + 3.7, zG + 4.0, 'aresta')
    // Pilares em baixo e colunas em cima, na frente; balaustrada entre elas, menos no topo da escada.
    for (let s = s0 + 0.4; s <= s1 - 0.3; s += 3.3) {
      const [x, y] = G(s, fundo - 0.35)
      const zc = m.chao(x, y)
      caixa(m, esc, 0.7, zG - 0.35 - (zc - 0.3), 0.7, x, y, (zG - 0.35 + zc - 0.3) / 2, ang)
      const col = new THREE.CylinderGeometry(0.2, 0.24, 3.7, 10)
      col.translate(x, zG + 1.85, -y)
      m.colisao.add(new THREE.Mesh(col.clone()))
      esc.solido(col, 'aresta', 30)
      esc.caixa(0.55, 0.18, 0.55, x, zG + 3.6, -y, ang) // capitel
    }
    const guarda = (sa: number, sb: number) => {
      if (sb - sa < 0.2) return
      const [x, y] = G((sa + sb) / 2, fundo - 0.1)
      caixa(m, esc, sb - sa, 1.25, 0.2, x, y, zG + 0.62, ang, false)
      esc.linha([Pz(sa, fundo, zG + 1.05), Pz(sb, fundo, zG + 1.05)], 'aresta')
      esc.linha([Pz(sa, fundo, zG + 0.12), Pz(sb, fundo, zG + 0.12)], 'pormenor')
      for (let s = sa + 0.18; s < sb; s += 0.3) esc.linha([Pz(s, fundo, zG + 0.12), Pz(s, fundo, zG + 1.05)], 'sombra')
    }
    guarda(s0, sE - meiaE)
    guarda(sE + meiaE, s1)
    // Pontas da galeria fechadas (não se salta para o telhado de ninguém).
    for (const s of [s0, s1]) {
      const [x, y] = G(s, fundo / 2)
      caixa(m, esc, 0.2, 1.25, fundo, x, y, zG + 0.62, ang, 'pormenor')
    }
    // Escadaria: do pátio até à galeria, com guardas dos dois lados.
    const dPe = 10.9
    const zPe = m.chao(...G(sE, dPe))
    const E = (s: number, d: number) => { const t = (dPe - d) / (dPe - fundo); return Pz(s, d, zPe + (zG - zPe) * t) }
    // Para quem anda, a rampa chega à cota da galeria meio metro antes da aresta da laje (senão
    // bate-se na aresta com os pés ainda abaixo dela) e continua plana por cima da laje.
    m.rampa(G(sE, dPe), G(sE, fundo + 0.5), meiaE * 2, zPe, zG)
    m.rampa(G(sE, fundo + 0.5), G(sE, fundo - 0.6), meiaE * 2, zG, zG)
    planoColisao(m, E(sE - meiaE, dPe), E(sE + meiaE, dPe), E(sE + meiaE, fundo), E(sE - meiaE, fundo), acima(E(sE, (dPe + fundo) / 2)), false, true)
    for (const s of [sE - meiaE, sE + meiaE]) {
      const a = E(s, dPe), b = E(s, fundo)
      planoColisao(m, a, b, [b[0], b[1] + 1.2, b[2]], [a[0], a[1] + 1.2, a[2]], acima(E(sE, (dPe + fundo) / 2)))
      esc.linha([[a[0], a[1] + 1.05, a[2]], [b[0], b[1] + 1.05, b[2]]], 'aresta')
      esc.face([a, b, [b[0], zPe - 0.2, b[2]], [a[0], zPe - 0.2, a[2]]], 'pormenor')
    }
    const n = 22
    for (let k = 0; k < n; k++) {
      const d0 = dPe - ((dPe - fundo) * k) / n, d1 = dPe - ((dPe - fundo) * (k + 1)) / n
      const z0 = zPe + ((zG - zPe) * k) / n, z1 = zPe + ((zG - zPe) * (k + 1)) / n
      esc.face([Pz(sE - meiaE, d0, z0), Pz(sE + meiaE, d0, z0), Pz(sE + meiaE, d0, z1), Pz(sE - meiaE, d0, z1)], false)
      esc.face([Pz(sE - meiaE, d0, z1), Pz(sE + meiaE, d0, z1), Pz(sE + meiaE, d1, z1), Pz(sE - meiaE, d1, z1)], false)
      esc.linha([Pz(sE - meiaE, d0, z1), Pz(sE + meiaE, d0, z1)], 'aresta')
    }
    m.cena.add(esc.acabar('mundo', papel, true))
    m.pontos.viaLatinaPe = v3(...G(sE, dPe + 1), zPe)
    m.pontos.viaLatinaTopo = v3(...G(sE, fundo - 1.2), zG)
    cabraMundo.galeria = [0.2, 0.45, 0.8].map((f) => { const s = s0 + (s1 - s0) * f; return v3(...G(s, fundo - 1.3), zG) })
  }

  // ------------------------------------------------------- estátua, terraço --

  function extras(m: Mundo) {
    viaLatina(m)
    const esc = new Esboco('paco-extras', 1, 1)
    // A estátua do pátio: pedestal e uma figura de pé, esboçada.
    const [ex, ey] = ESTATUA
    const ze = m.chao(ex, ey)
    caixa(m, esc, 3.0, 0.5, 3.0, ex, ey, ze + 0.25, 0.18)
    caixa(m, esc, 2.1, 2.4, 2.1, ex, ey, ze + 1.7, 0.18)
    caixa(m, esc, 2.4, 0.25, 2.4, ex, ey, ze + 3.0, 0.18, 'pormenor')
    const manto = new THREE.CylinderGeometry(0.35, 0.62, 2.2, 10)
    manto.translate(ex, ze + 4.2, -ey)
    esc.solido(manto, 'aresta', 30)
    const cab = new THREE.SphereGeometry(0.24, 10, 8)
    cab.translate(ex, ze + 5.55, -ey)
    esc.solido(cab, 'pormenor', 40)
    const ceptro = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 5)
    ceptro.translate(ex + 0.55, ze + 4.3, -ey)
    esc.solido(ceptro, 'pormenor', 40)
    const col = new THREE.CylinderGeometry(0.62, 0.62, 2.4, 10)
    col.translate(ex, ze + 4.3, -ey)
    m.colisao.add(new THREE.Mesh(col))

    // Parapeito sobre o muro de suporte do terraço: vê-se o vale, não se salta.
    const [a, b] = TERRACO
    const Lt = Math.hypot(b[0] - a[0], b[1] - a[1]), tx = (b[0] - a[0]) / Lt, ty = (b[1] - a[1]) / Lt
    const angT = Math.atan2(ty, tx)
    for (let s = 0; s < Lt; s += 4) {
      const s2 = Math.min(Lt, s + 4)
      const x = a[0] + tx * (s + s2) / 2 + ty * 0.25, y = a[1] + ty * (s + s2) / 2 - tx * 0.25
      const z = m.chao(x - ty * 1.5, y + tx * 1.5)
      caixa(m, esc, s2 - s, 1.3, 0.45, x, y, z + 0.65, angT, 'aresta')
      // Por cima, uma guarda invisível: não se salta o parapeito, mas as balas passam.
      const P0: P3 = p3(a[0] + tx * s + ty * 0.2, a[1] + ty * s - tx * 0.2, z + 1.3), P1: P3 = p3(a[0] + tx * s2 + ty * 0.2, a[1] + ty * s2 - tx * 0.2, z + 1.3)
      planoColisao(m, P0, P1, [P1[0], P1[1] + 1.6, P1[2]], [P0[0], P0[1] + 1.6, P0[2]], p3(x - ty * 2, y + tx * 2, z + 2), true)
    }
    // O portão a sudoeste, trancado: grades, travessas, cadeado e corrente.
    const [gx, gy] = PORTAO
    const wx = -0.198, wy = 0.98 // ao longo do muro
    const angP = Math.atan2(wy, wx)
    const zp = m.chao(gx, gy)
    caixa(m, esc, 3.9, 2.6, 0.12, gx, gy, zp + 1.3, angP, false)
    const Gp = (t: number, z: number): P3 => p3(gx + wx * t, gy + wy * t, zp + z)
    esc.linha([Gp(-1.95, 0.15), Gp(1.95, 0.15)], 'aresta')
    esc.linha([Gp(-1.95, 2.3), Gp(1.95, 2.3)], 'aresta')
    esc.linha([Gp(-1.95, 1.2), Gp(1.95, 1.2)], 'pormenor')
    for (let t = -1.9; t <= 1.91; t += 0.14) esc.linha([Gp(t, 0.05), Gp(t, 2.55)], 'pormenor')
    esc.caixa(0.16, 0.2, 0.2, gx, zp + 1.15, -gy, angP)
    esc.linha([Gp(-0.35, 1.35), Gp(-0.1, 1.05), Gp(0.1, 1.3), Gp(0.35, 1.02)], 'aresta')
    m.cena.add(esc.acabar('mundo', papel, true))
  }

  return {
    ajustar,
    construir: extras,
    torreUniversidade: false,
    especiais: {
      [ID_PORTA]: portaFerrea,
      [ID_TORRE]: (m, b) => torre(m, b),
    },
    semDegraus: VIAS_LATINA,
    percurso: {
      antes: [[170, 55.5]],
      // Largo D. Dinis, Rua Larga, a Praça da Porta Férrea e a passagem.
      vias: ['way/120040018', 'way/1515356510', 'way/14382058', 'way/1558735678', VIA_PORTA],
      extra: [],
      ate: ['portaDentro', 'patio', 'torrePorta'],
    },
    pontos: (m) => ({
      inicio: m.noChao(...m.rotaBase[0]),
      olharInicio: m.noChao(...m.perto([120, 61])),
      largo: m.noChao(...m.perto([95, 60])),
      ruaLarga: m.noChao(...m.perto([40, 39])),
      praca: m.noChao(-70, 29),
      portaFora: m.noChao(-102.5, 23.2),
      portaDentro: m.noChao(-123, 17),
      patio: m.noChao(-150, 0),
    }),
    placas: [
      ['Largo Dom Dinis', [122, 66]],
      ['Rua Larga', [32, 30]],
      ['Porta Férrea', [-104.6, 15.6]],
    ],
    // Atiradores nas janelas altas da Rua Larga.
    varandas: (m) => {
      const s = (x: number, y: number) => m.sDe(m.noChao(x, y))
      return [
        [s(60, 41), 7, 3], [s(45, 40), -7, 2], [s(25, 37), 7, 2], [s(10, 36), -7, 3], [s(-15, 33), 7, 2], [s(-30, 31), -7, 2],
      ]
    },
    semParedes: [ID_TORRE],
  }
}

/** O que o desenho deixa à missão: os pontos da escada da torre (da porta à sala dos sinos) e da galeria. */
export const cabraMundo = { subida: [] as THREE.Vector3[], galeria: [] as THREE.Vector3[] }
