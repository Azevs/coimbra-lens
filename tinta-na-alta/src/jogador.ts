import * as THREE from 'three'
import { Octree } from 'three/addons/math/Octree.js'
import { Capsule } from 'three/addons/math/Capsule.js'

export const GRAVIDADE = 24
const ALTURA_OLHOS = 1.62
const RAIO = 0.32

/** Corpo em cápsula que escorrega pelas paredes da octree (como no exemplo games_fps do three.js). */
export class Corpo {
  capsula: Capsule
  vel = new THREE.Vector3()
  noChao = false
  constructor(pos: THREE.Vector3, altura = 1.75, public raio = RAIO) {
    this.capsula = new Capsule(pos.clone().add(new THREE.Vector3(0, raio, 0)),
      pos.clone().add(new THREE.Vector3(0, altura - raio, 0)), raio)
  }
  get pes() { return this.capsula.start.clone().sub(new THREE.Vector3(0, this.capsula.radius, 0)) }
  colocar(p: THREE.Vector3) {
    const h = this.capsula.end.y - this.capsula.start.y
    this.capsula.start.set(p.x, p.y + this.capsula.radius, p.z)
    this.capsula.end.set(p.x, p.y + this.capsula.radius + h, p.z)
    this.vel.set(0, 0, 0)
  }
  /**
   * Altura do chão em coordenadas three (x, z). O terreno não entra na octree da
   * física: a cápsula a roçar as arestas dos triângulos de 2 m do LiDAR recebia
   * normais horizontais e ficava travada em rampas suaves.
   */
  static chao: ((x: number, z: number) => number) | null = null
  /** Declive máximo que se sobe a andar (tan 50°): acima disto é muro de suporte. */
  static DECLIVE = 1.2

  passo(dt: number, octree: Octree) {
    if (!this.noChao) this.vel.y -= GRAVIDADE * dt
    else this.vel.y = Math.max(this.vel.y - GRAVIDADE * dt, -2)
    const d = this.vel.clone().multiplyScalar(dt)
    const chao = Corpo.chao
    const x0 = this.capsula.start.x, z0 = this.capsula.start.z
    const pes0 = this.capsula.start.y - this.capsula.radius
    this.capsula.translate(d)
    if (chao) {
      // Não subir por um muro de suporte: o declive do chão à frente é demasiado.
      const g0 = chao(x0, z0), g1 = chao(this.capsula.start.x, this.capsula.start.z)
      const h = Math.hypot(d.x, d.z)
      if (h > 1e-5 && g1 - g0 > Corpo.DECLIVE * h + 0.02 && g1 > pes0 + 0.35) {
        this.capsula.translate(new THREE.Vector3(x0 - this.capsula.start.x, 0, z0 - this.capsula.start.z))
        this.vel.x = 0; this.vel.z = 0
      }
    }
    this.noChao = false
    for (let k = 0; k < 3; k++) {
      const r = octree.capsuleIntersect(this.capsula)
      if (!r) break
      if (r.normal.y > 0.45) {
        this.noChao = true
        // Encosta: não escorregar para baixo.
        this.capsula.translate(new THREE.Vector3(0, r.depth / Math.max(r.normal.y, 0.5), 0))
        if (this.vel.y < 0) this.vel.y = 0
      } else {
        this.vel.addScaledVector(r.normal, -r.normal.dot(this.vel))
        this.capsula.translate(r.normal.multiplyScalar(r.depth))
      }
    }
    if (chao) {
      const g = chao(this.capsula.start.x, this.capsula.start.z)
      const pes = this.capsula.start.y - this.capsula.radius
      if (pes < g) {
        this.capsula.translate(new THREE.Vector3(0, g - pes, 0))
        if (this.vel.y < 0) this.vel.y = 0
        this.noChao = true
      } else if (pes < g + 0.04 && this.vel.y <= 0) this.noChao = true
    }
  }
}

export class Jogador {
  corpo: Corpo
  yaw = 0
  pitch = 0
  teclas = new Set<string>()
  vida = 100
  morto = false
  aCorrer = false
  distanciaPasso = 0
  balanco = 0
  onPasso: (forca: number) => void = () => {}
  onAterrar: (v: number) => void = () => {}
  private vyAntes = 0
  private noAr = 0
  private yOlhos: number | null = null
  /** Balanço de andar, já suavizado (0–1): a arma e a câmara usam este. */
  andar = 0
  /** No chão com tolerância: numa encosta a física larga o chão uma imagem sim, outra não. */
  get assente() { return this.noAr < 0.15 }

  constructor(public camera: THREE.PerspectiveCamera, pos: THREE.Vector3) {
    this.corpo = new Corpo(pos)
    document.addEventListener('keydown', (e) => this.teclas.add(e.code))
    document.addEventListener('keyup', (e) => this.teclas.delete(e.code))
    window.addEventListener('blur', () => this.teclas.clear())
    document.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement !== document.body || this.morto) return
      this.yaw -= e.movementX * 0.0022
      this.pitch = THREE.MathUtils.clamp(this.pitch - e.movementY * 0.0022, -1.5, 1.5)
    })
  }

  get posicao() { return this.corpo.pes }
  get olhos() { return this.camera.position }

  frente() { return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)) }

  actualizar(dt: number, octree: Octree, mira: boolean) {
    const f = this.frente()
    const lado = new THREE.Vector3(-f.z, 0, f.x)
    const dir = new THREE.Vector3()
    if (!this.morto) {
      if (this.teclas.has('KeyW') || this.teclas.has('ArrowUp')) dir.add(f)
      if (this.teclas.has('KeyS') || this.teclas.has('ArrowDown')) dir.sub(f)
      if (this.teclas.has('KeyD') || this.teclas.has('ArrowRight')) dir.add(lado)
      if (this.teclas.has('KeyA') || this.teclas.has('ArrowLeft')) dir.sub(lado)
    }
    this.aCorrer = (this.teclas.has('ShiftLeft') || this.teclas.has('ShiftRight')) && !mira && dir.lengthSq() > 0
    const vmax = mira ? 2.4 : this.aCorrer ? 7.2 : 4.4
    if (dir.lengthSq()) dir.normalize().multiplyScalar(vmax)
    const c = this.corpo
    const acel = c.noChao ? 14 : 3
    c.vel.x += (dir.x - c.vel.x) * Math.min(1, acel * dt)
    c.vel.z += (dir.z - c.vel.z) * Math.min(1, acel * dt)
    if (c.noChao && this.teclas.has('Space') && !this.morto) c.vel.y = 7.2
    const estavaNoChao = c.noChao
    this.vyAntes = c.vel.y
    // Sub-passos: as escadas e as esquinas agradecem.
    const n = Math.ceil(dt / 0.008)
    for (let i = 0; i < n; i++) c.passo(dt / n, octree)
    if (!estavaNoChao && c.noChao && this.vyAntes < -4) this.onAterrar(-this.vyAntes)

    this.noAr = c.noChao ? 0 : this.noAr + dt
    const hv = Math.hypot(c.vel.x, c.vel.z)
    this.andar = THREE.MathUtils.damp(this.andar, this.assente ? Math.min(hv / 5, 1) : 0, 8, dt)
    if (this.assente && hv > 0.5) {
      this.distanciaPasso += hv * dt
      this.balanco += hv * dt * 1.9
      const passada = this.aCorrer ? 2.1 : 1.55
      if (this.distanciaPasso > passada) {
        this.distanciaPasso = 0
        this.onPasso(this.aCorrer ? 1 : mira ? 0.35 : 0.65)
      }
    }
    const altura = this.morto ? 0.35 : ALTURA_OLHOS
    // Olhos amortecidos: os degraus e o terreno aos solavancos não chegam à câmara.
    const alvoY = c.pes.y + altura
    if (this.yOlhos === null || Math.abs(alvoY - this.yOlhos) > 1.2 || !this.assente) this.yOlhos = alvoY
    else this.yOlhos = THREE.MathUtils.damp(this.yOlhos, alvoY, 16, dt)
    this.camera.position.copy(c.pes)
    this.camera.position.y = this.yOlhos
    const bob = this.andar * 0.7
    this.camera.position.y += Math.sin(this.balanco * 2) * 0.04 * bob
    this.camera.position.addScaledVector(lado, Math.cos(this.balanco) * 0.025 * bob)
    this.camera.rotation.set(this.pitch, this.yaw, this.morto ? 0.5 : Math.cos(this.balanco) * 0.004 * bob, 'YXZ')
  }
}
