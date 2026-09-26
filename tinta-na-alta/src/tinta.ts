/**
 * Traço a esferográfica sobre papel branco.
 *
 * A técnica (faces brancas com polygonOffset + traços LineSegments2 com um
 * desvio transversal em píxeis e espessura que afina com a distância) segue a
 * do Operation Ink, de Ehsan Sarshar (MIT, github.com/byteab/operation-ink).
 */
import * as THREE from 'three'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js'
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

export type P3 = [number, number, number]
export type Traco = 'aresta' | 'pormenor' | 'sombra' | 'chao'

export const PAPEL = 0xffffff
export const TINTA = 0x111111

export function semente(texto: string | number) {
  const t = String(texto)
  let h = 2166136261
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619)
  return h >>> 0
}

export function aleatorio(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let v = Math.imul(s ^ (s >>> 15), 1 | s)
    v ^= v + Math.imul(v ^ (v >>> 7), 61 | v)
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296
  }
}

const distanciaGLSL = (perto: number, queda: number, minimo: number) => `
  float tintaEscala(float z) {
    float r = max(z - ${perto.toFixed(1)}, 0.0) / ${queda.toFixed(1)};
    return ${minimo.toFixed(2)} + ${(1 - minimo).toFixed(2)} / (1.0 + r * r);
  }`

export type Perfil = 'mundo' | 'arma' | 'longe' | 'horizonte'

function materialTraco(perfil: Perfil) {
  const [perto, queda, minimo] = perfil === 'arma' ? [0.5, 3, 0.4] : perfil === 'longe' ? [40, 120, 0.5] : perfil === 'horizonte' ? [80, 320, 0.8] : [6, 40, 0.22]
  const m = new LineMaterial({ color: 0xffffff, vertexColors: true, linewidth: perfil === 'arma' ? 1.35 : 1, worldUnits: false,
    alphaToCoverage: true, toneMapped: false })
  m.depthWrite = false
  m.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('uniform float linewidth;', `uniform float linewidth;
        ${distanciaGLSL(perto, queda, minimo)}
        attribute float instanceLargura;
        attribute vec2 instanceDesvio;
        varying float vLonge;`)
      .replace('// ndc space', `
        float eA = tintaEscala(-start.z);
        float eB = tintaEscala(-end.z);
        float eL = (position.y < 0.5) ? eA : eB;
        vLonge = (position.y < 0.5) ? -start.z : -end.z;
        vec2 tDir = (clipEnd.xy / clipEnd.w - clipStart.xy / clipStart.w) * resolution;
        tDir /= max(length(tDir), 0.0001);
        vec2 tNrm = vec2(-tDir.y, tDir.x);
        clipStart.xy += tNrm * instanceDesvio.x * eA * 2.0 / resolution * clipStart.w;
        clipEnd.xy += tNrm * instanceDesvio.y * eB * 2.0 / resolution * clipEnd.w;
        ${perfil === 'arma' ? `// Na arma, o traço vem uns milímetros à frente da face: não pisca.
        clipStart.z -= 0.0012 * clipStart.w;
        clipEnd.z -= 0.0012 * clipEnd.w;` : ''}
        // ndc space`)
      .replace('offset *= linewidth;', 'offset *= linewidth * instanceLargura * eL;')
    shader.fragmentShader = shader.fragmentShader
      .replace('uniform float linewidth;', `uniform float linewidth;
        varying float vLonge;`)
      .replace('gl_FragColor = vec4( diffuseColor.rgb, alpha );',
        `float nevoa = smoothstep(${perfil === 'arma' ? '50.0, 60.0' : perfil === 'longe' ? '220.0, 420.0' : perfil === 'horizonte' ? '400.0, 1500.0' : '70.0, 190.0'}, vLonge);
         gl_FragColor = vec4( mix(diffuseColor.rgb, vec3(1.0), nevoa * ${perfil === 'horizonte' ? '0.6' : '0.85'}), alpha );`)
  }
  m.customProgramCacheKey = () => 'tinta-' + perfil
  return m
}

export const materiais = {
  mundo: materialTraco('mundo'),
  arma: materialTraco('arma'),
  /** Marcos ao longe (a Torre da Universidade): o nevoeiro só começa aos 220 m. */
  longe: materialTraco('longe'),
  /** A cidade à volta do nível, a centenas de metros: traço que não some. */
  horizonte: materialTraco('horizonte'),
}

export const papel = new THREE.MeshBasicMaterial({
  color: PAPEL, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1,
})
export const papelArma = new THREE.MeshBasicMaterial({ color: PAPEL, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 2 })
export const tintaSolida = new THREE.MeshBasicMaterial({ color: TINTA })

/**
 * Silhueta a caneta: casca virada do avesso, alargada em píxeis ao longo da
 * normal. Contorna as peças redondas (braços, mãos, cano) que as arestas não apanham.
 */
export function silhueta(geo: THREE.BufferGeometry, largura = 2.2) {
  const mat = new THREE.ShaderMaterial({
    uniforms: { resolucao: materiais.arma.uniforms.resolution, largura: { value: largura } },
    vertexShader: `
      uniform vec2 resolucao;
      uniform float largura;
      void main() {
        vec4 vista = modelViewMatrix * vec4(position, 1.0);
        vec4 clip = projectionMatrix * vista;
        vec3 n = normalize(normalMatrix * normal);
        vec4 ponta = projectionMatrix * vec4(vista.xyz + n * 0.01, 1.0);
        vec2 d = (ponta.xy / ponta.w - clip.xy / clip.w) * resolucao;
        d /= max(length(d), 0.0001);
        float pressao = 0.85 + 0.15 * sin(position.x * 90.0 + position.z * 60.0);
        clip.xy += d * largura * pressao * 2.0 / resolucao * clip.w;
        gl_Position = clip;
      }`,
    fragmentShader: `void main() { gl_FragColor = vec4(vec3(0.07), 1.0); }`,
    side: THREE.BackSide,
    // Atrás do papel à mesma profundidade: por dentro de um tubo cortado vê-se papel, não tinta.
    polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 6,
  })
  const m = new THREE.Mesh(geo, mat)
  m.frustumCulled = false
  return m
}

export function redimensionar(w: number, h: number) {
  materiais.mundo.resolution.set(w, h)
  materiais.arma.resolution.set(w, h)
  materiais.longe.resolution.set(w, h)
}

type Marcas = { pos: number[]; cor: number[]; larg: number[]; desv: number[] }
const LARGURA: Record<Traco, number> = { aresta: 2.9, pormenor: 1.8, sombra: 1.1, chao: 1.4 }
const CLARO: Record<Traco, number> = { aresta: 0.02, pormenor: 0.08, sombra: 0.42, chao: 0.3 }

/** Parte cada segmento em pedaços com pressão e desvio próprios, e às vezes repassa-o. */
function esbocar(seg: ArrayLike<number>, seed: number, traco: Traco, m: Marcas, escalaDesvio = 1, passo = 0.8) {
  const r = aleatorio(seed)
  const a = new THREE.Vector3(), b = new THREE.Vector3()
  const junta = (t0: number, t1: number, repasse: boolean) => {
    const L = a.distanceTo(b)
    const n = Math.max(1, Math.min(6, Math.ceil((L * (t1 - t0)) / passo)))
    const fase = r() * 6.283
    const amp = (traco === 'aresta' ? 0.7 : traco === 'sombra' ? 0.2 : 0.45) * escalaDesvio
    const vies = repasse ? (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.7) * escalaDesvio : 0
    const off = (t: number) => vies + Math.sin(t * Math.PI) * Math.sin(t * 5.2 + fase) * amp
    for (let i = 0; i < n; i++) {
      const u0 = t0 + ((t1 - t0) * i) / n, u1 = t0 + ((t1 - t0) * (i + 1)) / n
      m.pos.push(a.x + (b.x - a.x) * u0, a.y + (b.y - a.y) * u0, a.z + (b.z - a.z) * u0,
        a.x + (b.x - a.x) * u1, a.y + (b.y - a.y) * u1, a.z + (b.z - a.z) * u1)
      m.desv.push(off(u0), off(u1))
      const pressao = 0.5 + 0.5 * Math.sin(fase + i * 0.73)
      m.larg.push(LARGURA[traco] * (repasse ? 0.65 : 0.85 + pressao * 0.3))
      for (const u of [u0, u1]) {
        const c = CLARO[traco] + (repasse ? 0.3 : 0) + (0.5 + 0.5 * Math.sin(fase + u * 7.1)) * 0.08
        const v = 0.067 + (1 - 0.067) * Math.min(1, c)
        m.cor.push(v, v, v)
      }
    }
  }
  for (let i = 0; i < seg.length; i += 6) {
    a.set(seg[i], seg[i + 1], seg[i + 2])
    b.set(seg[i + 3], seg[i + 4], seg[i + 5])
    if (a.distanceToSquared(b) < 1e-8) continue
    junta(0, 1, false)
    const chance = traco === 'aresta' ? 0.35 : traco === 'pormenor' ? 0.12 : 0
    if (r() < chance) {
      const s = r() * 0.35
      junta(s, Math.min(1, s + 0.3 + r() * 0.45), true)
    }
  }
}

export function malhaDeTraco(m: Marcas, perfil: Perfil = 'mundo', recortar = false) {
  const g = new LineSegmentsGeometry().setPositions(m.pos).setColors(m.cor)
  g.setAttribute('instanceLargura', new THREE.InstancedBufferAttribute(new Float32Array(m.larg), 1))
  g.setAttribute('instanceDesvio', new THREE.InstancedBufferAttribute(new Float32Array(m.desv), 2))
  const l = new LineSegments2(g, materiais[perfil])
  l.renderOrder = 2
  l.frustumCulled = recortar
  l.userData.semColisao = true
  return l
}

/** Um desenho: faces de papel juntas numa malha, traços juntos noutra. */
export class Esboco {
  private faces: THREE.BufferGeometry[] = []
  private linhas = new Map<Traco, number[]>()
  private n = 0
  constructor(public nome: string, private desvio = 1, private passo = 0.8) {}

  linha(pts: P3[], traco: Traco = 'aresta', fechar = false) {
    const d = this.linhas.get(traco) ?? []
    this.linhas.set(traco, d)
    for (let i = 1; i < pts.length; i++) d.push(...pts[i - 1], ...pts[i])
    if (fechar && pts.length > 2) d.push(...pts[pts.length - 1], ...pts[0])
  }

  segmentos(seg: number[], traco: Traco = 'aresta') {
    const d = this.linhas.get(traco) ?? []
    this.linhas.set(traco, d)
    for (const v of seg) d.push(v)
  }

  /** Tracejado diagonal num rectângulo (origem, u, v = vectores dos lados). */
  tracejar(o: P3, u: P3, v: P3, espaco = 0.25, traco: Traco = 'sombra', inclin = 0.8) {
    const r = aleatorio(semente(this.nome + ':' + this.n++))
    const w = Math.hypot(...u), h = Math.hypot(...v)
    if (w < 0.05 || h < 0.05) return
    const P = (x: number, y: number): P3 => [
      o[0] + (u[0] * x) / w + (v[0] * y) / h, o[1] + (u[1] * x) / w + (v[1] * y) / h, o[2] + (u[2] * x) / w + (v[2] * y) / h]
    const alcance = inclin * h
    for (let c = -alcance; c <= w; c += espaco * (0.8 + r() * 0.4)) {
      if (r() < 0.1) continue
      // x = c + inclin*y, dentro de [0,w]×[0,h]
      let y0 = Math.max(0, -c / inclin), y1 = Math.min(h, (w - c) / inclin)
      if (y1 <= y0) continue
      const L = y1 - y0
      y0 += L * r() * 0.08
      y1 -= L * r() * 0.14
      this.linha([P(c + inclin * y0, y0), P(c + inclin * y1, y1)], traco)
    }
  }

  solido(g: THREE.BufferGeometry, arestas: Traco | false = 'aresta', angulo = 25) {
    if (arestas) {
      const e = new THREE.EdgesGeometry(g, angulo)
      this.segmentos(Array.from(e.getAttribute('position').array as Float32Array), arestas)
      e.dispose()
    }
    const f = g.index ? g.toNonIndexed() : g
    f.deleteAttribute('uv')
    f.deleteAttribute('normal')
    this.faces.push(f)
  }

  caixa(w: number, h: number, d: number, x: number, y: number, z: number, rotY = 0, arestas: Traco | false = 'aresta') {
    const g = new THREE.BoxGeometry(w, h, d)
    g.rotateY(rotY)
    g.translate(x, y, z)
    this.solido(g, arestas)
  }

  face(pts: P3[], arestas: Traco | false = 'aresta') {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts.flat(), 3))
    const idx: number[] = []
    for (let i = 1; i < pts.length - 1; i++) idx.push(0, i, i + 1)
    g.setIndex(idx)
    this.solido(g, false)
    if (arestas) this.linha(pts, arestas, true)
  }

  acabar(perfil: Perfil = 'mundo', material: THREE.Material = papel, recortar = false) {
    const grupo = new THREE.Group()
    grupo.name = this.nome
    if (this.faces.length) {
      const g = mergeGeometries(this.faces)
      if (g) {
        const malha = new THREE.Mesh(g, material)
        malha.name = this.nome + ':papel'
        grupo.add(malha)
      }
      this.faces.forEach((f) => f.dispose())
    }
    const m: Marcas = { pos: [], cor: [], larg: [], desv: [] }
    for (const t of ['sombra', 'chao', 'pormenor', 'aresta'] as Traco[]) {
      const seg = this.linhas.get(t)
      if (seg?.length) esbocar(seg, semente(this.nome + t), t, m, this.desvio, this.passo)
    }
    if (m.pos.length) grupo.add(malhaDeTraco(m, perfil, recortar))
    this.faces = []
    this.linhas.clear()
    return grupo
  }
}
