/**
 * A espingarda na mão, desenhada a caneta e pintada numa cena à parte (por
 * cima do mundo, sem atravessar paredes).
 */
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { Esboco, papelArma, silhueta } from './tinta'

export class Arma {
  cena = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(52, 1, 0.04, 6)
  private raiz = new THREE.Group()
  private modelo = new THREE.Group()
  private carregador = new THREE.Group()
  private clarao: THREE.Sprite
  pente = 30
  reserva = 120
  readonly capacidade = 30
  cadencia = 0.095
  private espera = 0
  aRecarregar = 0
  mira = 0 // 0 anca, 1 miras
  recuo = 0
  calor = 0
  private balancoX = 0
  private balancoY = 0
  private tempo = 0
  corrida = 0

  constructor(texClarao: THREE.Texture) {
    this.cena.add(this.raiz)
    this.raiz.add(this.modelo)
    this.construir()
    this.clarao = new THREE.Sprite(new THREE.SpriteMaterial({ map: texClarao, transparent: true, depthWrite: false, depthTest: false }))
    this.clarao.scale.setScalar(0.3)
    this.clarao.position.set(0, 0.035, -0.98)
    this.clarao.visible = false
    this.modelo.add(this.clarao)
  }

  private construir() {
    const e = new Esboco('arma', 0.12, 0.05)
    // Peças redondas também levam silhueta (as arestas só apanham os topos).
    const cascas: THREE.BufferGeometry[] = []
    const casca = (g: THREE.BufferGeometry) => {
      const c = (g.index ? g.toNonIndexed() : g.clone())
      c.deleteAttribute('uv')
      if (!c.getAttribute('normal')) c.computeVertexNormals()
      cascas.push(c)
    }
    const c = (w: number, h: number, d: number, x: number, y: number, z: number, rx = 0) => {
      const g = new THREE.BoxGeometry(w, h, d)
      g.rotateX(rx)
      g.translate(x, y, z)
      e.solido(g, 'aresta', 20)
    }
    // Caixa da culatra, tampa, guarda-mão, cano, miras (tipo AK, como nas referências).
    c(0.06, 0.07, 0.34, 0, 0, -0.1)
    c(0.056, 0.025, 0.3, 0, 0.045, -0.1)
    c(0.07, 0.065, 0.2, 0, 0.005, -0.37)
    c(0.05, 0.03, 0.18, 0, 0.045, -0.36)
    const cano = new THREE.CylinderGeometry(0.011, 0.011, 0.36, 10)
    cano.rotateX(Math.PI / 2)
    cano.translate(0, 0.035, -0.62)
    casca(cano)
    e.solido(cano, 'aresta', 50)
    const tubo = new THREE.CylinderGeometry(0.016, 0.016, 0.22, 10)
    tubo.rotateX(Math.PI / 2)
    tubo.translate(0, 0.068, -0.4)
    casca(tubo)
    e.solido(tubo, 'aresta', 50)
    c(0.012, 0.05, 0.015, 0, 0.065, -0.78) // mira da frente
    c(0.04, 0.014, 0.012, 0, 0.05, -0.78)
    c(0.03, 0.03, 0.04, 0, 0.07, -0.2) // alça
    c(0.035, 0.055, 0.09, 0, -0.03, 0.14, -0.2) // coronha
    c(0.04, 0.11, 0.26, 0, -0.035, 0.28, -0.12)
    c(0.035, 0.1, 0.045, 0, -0.08, 0.02, 0.35) // punho
    c(0.01, 0.03, 0.06, 0, -0.045, -0.05) // gatilho, guarda
    // Carregador curvo.
    const s = new THREE.Shape()
    s.moveTo(-0.035, 0); s.lineTo(0.035, 0); s.quadraticCurveTo(0.06, -0.12, 0.1, -0.2); s.lineTo(0.03, -0.22)
    s.quadraticCurveTo(-0.01, -0.12, -0.035, 0)
    const mg = new THREE.ExtrudeGeometry(s, { depth: 0.04, bevelEnabled: false, curveSegments: 6 })
    mg.translate(0, 0, -0.02)
    mg.rotateY(Math.PI / 2)
    const ec = new Esboco('carregador', 0.12, 0.05)
    ec.solido(mg, 'aresta', 25)
    // Três riscos de textura no carregador.
    for (let k = 0; k < 3; k++) ec.linha([[0.021, -0.05 - k * 0.04, 0.02 + k * 0.012], [0.021, -0.06 - k * 0.04, -0.03 + k * 0.015]], 'sombra')
    this.carregador.add(ec.acabar('arma', papelArma))
    this.carregador.position.set(0, -0.03, -0.2)
    this.modelo.add(this.carregador)
    // Braços: tubos brancos a contorno, mãos em luva.
    const braco = (de: THREE.Vector3, ate: THREE.Vector3, r: number) => {
      const d = ate.clone().sub(de)
      const g = new THREE.CylinderGeometry(r * 0.85, r, d.length(), 12, 1, true)
      g.translate(0, d.length() / 2, 0)
      g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize()))
      g.translate(de.x, de.y, de.z)
      casca(g)
      e.solido(g, false)
      // Duas geratrizes de contorno, como quem desenha um tubo.
      const lado = new THREE.Vector3().crossVectors(d, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(r)
      e.linha([de.clone().add(lado).toArray(), ate.clone().add(lado.clone().multiplyScalar(0.85)).toArray()], 'aresta')
      e.linha([de.clone().sub(lado).toArray(), ate.clone().sub(lado.clone().multiplyScalar(0.85)).toArray()], 'aresta')
    }
    braco(new THREE.Vector3(0.28, -0.35, 0.55), new THREE.Vector3(0.02, -0.1, 0.05), 0.05)
    braco(new THREE.Vector3(-0.3, -0.4, 0.3), new THREE.Vector3(-0.02, -0.03, -0.36), 0.045)
    const mao = (x: number, y: number, z: number, sx: number, sy: number, sz: number) => {
      const g = new THREE.SphereGeometry(1, 10, 8)
      g.scale(sx, sy, sz)
      g.translate(x, y, z)
      casca(g)
      e.solido(g, false)
      const pts: [number, number, number][] = []
      for (let k = 0; k <= 16; k++) {
        const a = (k / 16) * Math.PI * 2
        pts.push([x + Math.cos(a) * sx * 1.02, y + Math.sin(a) * sy * 1.02, z])
      }
      e.linha(pts, 'aresta')
      for (let k = 0; k < 3; k++) e.linha([[x - sx * 0.6, y + sy * (0.4 - k * 0.35), z - sz * 0.9], [x + sx * 0.5, y + sy * (0.5 - k * 0.35), z - sz * 0.95]], 'pormenor')
    }
    mao(0.01, -0.075, 0.03, 0.045, 0.05, 0.05)
    mao(-0.01, -0.02, -0.37, 0.05, 0.04, 0.06)
    this.modelo.add(e.acabar('arma', papelArma))
    const juntas = mergeGeometries(cascas)
    if (juntas) this.modelo.add(silhueta(juntas, 1.6))
    this.modelo.traverse((o) => { o.frustumCulled = false; o.renderOrder += 10 })
  }

  redimensionar(aspect: number) {
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  podeDisparar() { return this.espera <= 0 && this.aRecarregar <= 0 && this.pente > 0 }

  disparar() {
    this.pente--
    this.espera = this.cadencia
    this.recuo = Math.min(1, this.recuo + 0.55)
    this.calor = Math.min(1, this.calor + 0.12)
    this.clarao.visible = true
    this.clarao.material.rotation = Math.random() * 6.28
    this.clarao.scale.setScalar(0.22 + Math.random() * 0.14)
  }

  recarregar() {
    if (this.aRecarregar > 0 || this.pente === this.capacidade || this.reserva <= 0) return false
    this.aRecarregar = 1.6
    return true
  }

  /** Dispersão (radianos) conforme o que o corpo está a fazer. */
  dispersao(movimento: number, noChao: boolean) {
    const base = THREE.MathUtils.lerp(0.02, 0.003, this.mira)
    return base + this.calor * THREE.MathUtils.lerp(0.035, 0.012, this.mira) + movimento * 0.006 * (1 - this.mira * 0.6) + (noChao ? 0 : 0.05)
  }

  actualizar(dt: number, dYaw: number, dPitch: number, andar: number, balanco: number, aCorrer: boolean, querMira: boolean) {
    this.tempo += dt
    this.espera -= dt
    this.recuo = Math.max(0, this.recuo - dt * 7)
    this.calor = Math.max(0, this.calor - dt * (this.espera > -0.15 ? 0.6 : 2.5))
    if (this.espera < this.cadencia - 0.04) this.clarao.visible = false
    if (this.aRecarregar > 0) {
      this.aRecarregar -= dt
      if (this.aRecarregar <= 0) {
        const falta = this.capacidade - this.pente
        const n = Math.min(falta, this.reserva)
        this.pente += n
        this.reserva -= n
      }
    }
    this.mira = THREE.MathUtils.damp(this.mira, querMira && this.aRecarregar <= 0 && !aCorrer ? 1 : 0, 14, dt)
    this.corrida = THREE.MathUtils.damp(this.corrida, aCorrer ? 1 : 0, 8, dt)
    this.balancoX = THREE.MathUtils.damp(this.balancoX, THREE.MathUtils.clamp(-dYaw * 3, -0.06, 0.06), 10, dt)
    this.balancoY = THREE.MathUtils.damp(this.balancoY, THREE.MathUtils.clamp(dPitch * 3, -0.06, 0.06), 10, dt)

    const m = this.mira
    const bob = andar * (1 - m * 0.8)
    const x = THREE.MathUtils.lerp(0.2, 0, m) + this.balancoX + Math.cos(balanco) * 0.012 * bob
    const y = THREE.MathUtils.lerp(-0.25, -0.108, m) + this.balancoY + Math.abs(Math.sin(balanco)) * 0.016 * bob - this.corrida * 0.06
    const z = THREE.MathUtils.lerp(-0.36, -0.3, m) + this.recuo * 0.05
    this.raiz.position.set(x, y + Math.sin(this.tempo * 1.4) * 0.002 * (1 - m), z)
    this.raiz.rotation.set(this.recuo * 0.08 + this.corrida * -0.35 + (1 - m) * 0.03, this.corrida * 0.7 + this.balancoX * 2 + (1 - m) * 0.05, this.corrida * 0.3)
    // Recarregar: arma inclinada, carregador cai e volta.
    const r = this.aRecarregar > 0 ? 1 - this.aRecarregar / 1.6 : 0
    const incl = r > 0 ? Math.sin(Math.min(1, r * 1.15) * Math.PI) : 0
    this.modelo.rotation.set(-incl * 0.25, 0, incl * 0.55)
    this.carregador.position.y = -0.03 - (r > 0.1 && r < 0.55 ? Math.sin(((r - 0.1) / 0.45) * Math.PI) * 0.25 : 0)
    this.camera.fov = THREE.MathUtils.lerp(52, 40, m)
    this.camera.updateProjectionMatrix()
  }
}
