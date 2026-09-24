/**
 * Bonecos de palitos. Os Borrões são tinta sólida; o fadista é desenhado a
 * contorno, de capa e guitarra — vê-se logo quem é quem.
 */
import * as THREE from 'three'
import { Esboco, tintaSolida } from './tinta'

export type Parte = 'cabeca' | 'tronco' | 'membro' | 'virilha'
type Estilo = 'tinta' | 'contorno'

const invisivel = new THREE.MeshBasicMaterial({ visible: false })

/** Volume de acerto invisível, mais largo que o palito que se vê. */
function caixaAcerto(parte: Parte, w: number, h: number, d: number, y: number, alvos: THREE.Object3D[]) {
  const g = parte === 'cabeca' ? new THREE.SphereGeometry(w, 8, 6) : new THREE.BoxGeometry(w, h, d)
  g.translate(0, y, 0)
  const m = new THREE.Mesh(g, invisivel)
  m.userData.parte = parte
  alvos.push(m)
  return m
}

function peca(g: THREE.BufferGeometry, estilo: Estilo, parte: Parte, alvos: THREE.Object3D[]) {
  if (estilo === 'tinta') return new THREE.Mesh(g, tintaSolida)
  void parte; void alvos
  const e = new Esboco('boneco', 0.25, 0.3)
  e.solido(g.clone(), 'aresta', 40)
  const grupo = e.acabar()
  // Contorno das peças redondas: o EdgesGeometry não apanha a silhueta.
  if (g.type === 'SphereGeometry' || g.type === 'CylinderGeometry' || g.type === 'CapsuleGeometry') {
    const casca = new THREE.Mesh(g.clone().scale(1.12, 1.06, 1.12), new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.BackSide }))
    grupo.add(casca)
  }
  return grupo
}

export class Boneco {
  raiz = new THREE.Group()
  corpo = new THREE.Group()
  alvos: THREE.Object3D[] = []
  anca = new THREE.Group()
  peito = new THREE.Group()
  cabeca = new THREE.Group()
  bracoE = new THREE.Group(); antebracoE = new THREE.Group()
  bracoD = new THREE.Group(); antebracoD = new THREE.Group()
  pernaE = new THREE.Group(); canelaE = new THREE.Group()
  pernaD = new THREE.Group(); canelaD = new THREE.Group()
  arma = new THREE.Group()
  capa?: THREE.Mesh
  fase = Math.random() * 10
  queda = 0
  quedaDir = 1
  /** Segundos que ainda passa dobrado (tiro no baixo ventre). */
  dobrado = 0

  constructor(public estilo: Estilo, comArma = true) {
    const L = 0.035 // espessura dos palitos
    const cil = (h: number, r = L) => { const g = new THREE.CylinderGeometry(r, r, h, 8); g.translate(0, -h / 2, 0); return g }
    this.raiz.add(this.corpo)
    this.corpo.add(this.anca)
    this.anca.position.y = 0.92
    this.anca.add(this.peito)
    const tronco = cil(0.52, estilo === 'tinta' ? 0.05 : 0.045)
    tronco.translate(0, 0.52, 0)
    this.peito.add(peca(tronco, estilo, 'tronco', this.alvos))
    this.peito.add(caixaAcerto('tronco', 0.34, 0.6, 0.24, 0.28, this.alvos))
    this.anca.add(caixaAcerto('virilha', 0.24, 0.22, 0.24, -0.1, this.alvos))
    this.peito.add(this.cabeca)
    this.cabeca.position.y = 0.68
    this.cabeca.add(peca(new THREE.SphereGeometry(0.14, 16, 12), estilo, 'cabeca', this.alvos))
    this.cabeca.add(caixaAcerto('cabeca', 0.19, 0, 0, 0, this.alvos))
    const ombro = 0.48
    for (const [braco, antebraco, lado] of [[this.bracoE, this.antebracoE, -1], [this.bracoD, this.antebracoD, 1]] as const) {
      this.peito.add(braco)
      braco.position.set(lado * 0.02, ombro, 0)
      braco.add(peca(cil(0.3), estilo, 'membro', this.alvos))
      braco.add(antebraco)
      antebraco.position.y = -0.3
      antebraco.add(peca(cil(0.3), estilo, 'membro', this.alvos))
      braco.add(caixaAcerto('membro', 0.13, 0.3, 0.13, -0.15, this.alvos))
      antebraco.add(caixaAcerto('membro', 0.13, 0.3, 0.13, -0.15, this.alvos))
    }
    for (const [perna, canela, lado] of [[this.pernaE, this.canelaE, -1], [this.pernaD, this.canelaD, 1]] as const) {
      this.anca.add(perna)
      perna.position.set(lado * 0.07, 0, 0)
      perna.add(peca(cil(0.46, 0.04), estilo, 'membro', this.alvos))
      perna.add(canela)
      canela.position.y = -0.46
      canela.add(peca(cil(0.46, 0.038), estilo, 'membro', this.alvos))
      perna.add(caixaAcerto('membro', 0.17, 0.46, 0.17, -0.23, this.alvos))
      canela.add(caixaAcerto('membro', 0.15, 0.46, 0.15, -0.23, this.alvos))
    }
    if (comArma) {
      // Espingarda em silhueta, presa à mão direita.
      const g = new THREE.Group()
      const box = (w: number, h: number, d: number, x: number, y: number, z: number) => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), tintaSolida)
        b.position.set(x, y, z)
        g.add(b)
      }
      box(0.05, 0.08, 0.62, 0, 0, -0.18) // caixa e cano
      box(0.02, 0.02, 0.3, 0, 0.02, -0.62)
      box(0.04, 0.16, 0.05, 0, -0.1, -0.12) // carregador
      box(0.04, 0.1, 0.18, 0, -0.03, 0.2) // coronha
      this.arma.add(g)
      this.peito.add(this.arma)
      this.arma.position.set(0.12, 0.34, -0.25)
    }
    if (estilo === 'contorno') {
      // Capa de estudante: um pano preto que cai dos ombros.
      const s = new THREE.Shape()
      s.moveTo(-0.2, 0); s.lineTo(0.2, 0); s.lineTo(0.3, -0.95); s.quadraticCurveTo(0, -1.02, -0.3, -0.95); s.lineTo(-0.2, 0)
      const cg = new THREE.ShapeGeometry(s, 6)
      this.capa = new THREE.Mesh(cg, new THREE.MeshBasicMaterial({ color: 0x151515, side: THREE.DoubleSide }))
      this.capa.position.set(0, 0.55, 0.08)
      this.capa.rotation.x = 0.12
      this.peito.add(this.capa)
      // Guitarra de Coimbra às costas: bojo em lágrima, braço, voluta.
      const gs = new THREE.Shape()
      gs.moveTo(0, 0.12)
      gs.bezierCurveTo(0.16, 0.12, 0.2, -0.12, 0.13, -0.25)
      gs.bezierCurveTo(0.06, -0.34, -0.06, -0.34, -0.13, -0.25)
      gs.bezierCurveTo(-0.2, -0.12, -0.16, 0.12, 0, 0.12)
      const e = new Esboco('guitarra', 0.2, 0.2)
      const corpo = new THREE.ExtrudeGeometry(gs, { depth: 0.08, bevelEnabled: false, curveSegments: 10 })
      e.solido(corpo, 'aresta', 40)
      e.caixa(0.04, 0.42, 0.03, 0, 0.32, 0.04, 0, 'aresta')
      const voluta = new THREE.SphereGeometry(0.035, 8, 6)
      voluta.translate(0, 0.56, 0.04)
      e.solido(voluta, 'aresta', 40)
      const cordas: [number, number, number][] = []
      for (let k = -2; k <= 2; k++) cordas.push([k * 0.008, -0.2, 0.085], [k * 0.008, 0.52, 0.06])
      for (let k = 0; k < cordas.length; k += 2) e.linha([cordas[k], cordas[k + 1]], 'sombra')
      const guit = e.acabar()
      guit.position.set(0.05, 0.3, 0.14)
      guit.rotation.set(0.1, Math.PI, 0.35)
      this.peito.add(guit)
    }
    this.raiz.traverse((o) => { o.frustumCulled = false })
  }

  /** Pose: velocidade (m/s), mira (0–1), dt. */
  animar(dt: number, vel: number, mira: number, sentado = false) {
    if (this.queda > 0) return this.cair(dt)
    this.fase += dt * (vel > 0.2 ? 2.2 + vel * 1.2 : 1)
    const f = this.fase
    const passo = Math.min(vel / 4, 1)
    if (sentado) {
      this.anca.position.y = 0.5
      this.pernaE.rotation.x = this.pernaD.rotation.x = -1.4
      this.canelaE.rotation.x = this.canelaD.rotation.x = 1.4
      this.peito.rotation.x = 0.05 + Math.sin(f) * 0.03
      // Mãos atadas atrás das costas, a mexer-se.
      this.bracoE.rotation.set(0.5, 0, -0.25 + Math.sin(f * 3) * 0.08)
      this.bracoD.rotation.set(0.5, 0, 0.25 - Math.sin(f * 3) * 0.08)
      this.antebracoE.rotation.x = this.antebracoD.rotation.x = -1.2
      this.cabeca.rotation.y = Math.sin(f * 0.7) * 0.5
      return
    }
    if (this.dobrado > 0) {
      // Dobrado sobre si, mãos lá em baixo, joelhos para dentro.
      this.dobrado -= dt
      const k = Math.min(1, this.dobrado * 3, 1)
      this.anca.position.y = 0.92 - 0.12 * k
      this.peito.rotation.x = 0.9 * k
      this.pernaE.rotation.set(-0.2 * k, 0, 0.15 * k); this.pernaD.rotation.set(-0.2 * k, 0, -0.15 * k)
      this.canelaE.rotation.x = this.canelaD.rotation.x = 0.4 * k
      this.bracoE.rotation.set(-0.3 * k, 0, 0.3 * k); this.bracoD.rotation.set(-0.3 * k, 0, -0.3 * k)
      this.antebracoE.rotation.x = this.antebracoD.rotation.x = -0.6 * k
      this.cabeca.rotation.y = Math.sin(this.fase * 9) * 0.15 * k
      this.fase += dt
      return
    }
    this.pernaE.rotation.z = this.pernaD.rotation.z = 0
    this.anca.position.y = 0.92 + Math.abs(Math.sin(f)) * 0.05 * passo - mira * 0.06
    this.pernaE.rotation.x = Math.sin(f) * 0.7 * passo - mira * 0.15
    this.pernaD.rotation.x = -Math.sin(f) * 0.7 * passo - mira * 0.15
    this.canelaE.rotation.x = Math.max(0, -Math.sin(f + 1.2)) * 1.1 * passo + mira * 0.25
    this.canelaD.rotation.x = Math.max(0, Math.sin(f + 1.2)) * 1.1 * passo + mira * 0.25
    this.peito.rotation.x = 0.08 * passo + mira * 0.1 + Math.sin(f * 0.5) * 0.015
    this.cabeca.rotation.y = 0
    // Braços: a balançar, ou a segurar a arma apontada.
    const balE = -Math.sin(f) * 0.5 * passo, balD = Math.sin(f) * 0.5 * passo
    this.bracoE.rotation.set(THREE.MathUtils.lerp(balE, -1.25, mira), THREE.MathUtils.lerp(0, 0.5, mira), -0.1)
    this.antebracoE.rotation.x = THREE.MathUtils.lerp(-0.3, -0.4, mira)
    this.bracoD.rotation.set(THREE.MathUtils.lerp(balD - 0.3, -1.1, mira), THREE.MathUtils.lerp(0, -0.2, mira), 0.1)
    this.antebracoD.rotation.x = THREE.MathUtils.lerp(-0.5, -0.9, mira)
    this.arma.rotation.x = THREE.MathUtils.lerp(0.9, 0, mira)
    this.arma.position.set(0.12, THREE.MathUtils.lerp(0.18, 0.36, mira), THREE.MathUtils.lerp(-0.1, -0.28, mira))
    if (this.capa) this.capa.rotation.x = 0.12 + passo * 0.4 + Math.sin(f * 2) * 0.05 * passo
  }

  morrer(direccao: number) {
    if (this.queda > 0) return
    this.queda = 0.001
    this.quedaDir = direccao
  }

  private cair(dt: number) {
    this.queda = Math.min(1, this.queda + dt * 2.2)
    const t = this.queda
    const e = t < 1 ? 1 - Math.pow(1 - t, 3) : 1
    // Joelhos cedem, depois o tronco vai para trás.
    this.anca.position.y = THREE.MathUtils.lerp(0.92, 0.12, e)
    this.corpo.rotation.x = -this.quedaDir * e * 1.45
    this.pernaE.rotation.x = -0.6 * e
    this.canelaE.rotation.x = 1.2 * e
    this.pernaD.rotation.x = 0.2 * e
    this.canelaD.rotation.x = 0.4 * e
    this.bracoE.rotation.set(-2.2 * e, 0, -0.8 * e)
    this.bracoD.rotation.set(-1.4 * e, 0, 1.0 * e)
    this.cabeca.rotation.x = -0.5 * e
    this.arma.visible = t < 0.5
  }
}
