import * as THREE from 'three'
import type { Octree } from 'three/addons/math/Octree.js'
import { Boneco } from './bonecos'
import { Corpo } from './jogador'
import { Esboco } from './tinta'

export class Fadista {
  boneco = new Boneco('contorno', false)
  corpo: Corpo
  estado: 'preso' | 'livre' | 'salvo' | 'morto' = 'preso'
  vida = 100
  private rasto: THREE.Vector3[] = []
  private yaw = 0
  private presoHa = 0
  private ultimaPos = new THREE.Vector3()
  vel = 0
  cadeira: THREE.Group

  constructor(pos: THREE.Vector3, yaw: number) {
    this.corpo = new Corpo(pos, 1.75, 0.3)
    this.yaw = yaw
    this.boneco.raiz.position.copy(pos)
    this.boneco.raiz.rotation.y = yaw
    // O banco onde o deixaram, e as cordas.
    const e = new Esboco('banco', 0.3, 0.3)
    e.caixa(0.5, 0.05, 0.45, 0, 0.47, 0.05)
    for (const [x, z] of [[-0.22, -0.17], [0.22, -0.17], [-0.22, 0.27], [0.22, 0.27]]) e.caixa(0.04, 0.47, 0.04, x, 0.235, z)
    e.caixa(0.5, 0.5, 0.04, 0, 0.75, 0.27)
    for (let k = 0; k < 4; k++) e.linha([[-0.26, 0.6 + k * 0.06, 0.3], [0.26, 0.62 + k * 0.06, 0.3], [0.2, 0.58 + k * 0.06, -0.05], [-0.2, 0.6 + k * 0.06, -0.05]], 'pormenor', true)
    this.cadeira = e.acabar()
    this.cadeira.position.copy(pos)
    this.cadeira.rotation.y = yaw
  }

  olhos() { return this.corpo.pes.add(new THREE.Vector3(0, this.estado === 'preso' ? 1.1 : 1.55, 0)) }

  soltar() {
    this.estado = 'livre'
    this.cadeira.children.forEach((c) => { c.visible = true })
    this.corpo.colocar(this.corpo.pes.add(new THREE.Vector3(0, 0.05, 0)))
  }

  /** Vai atrás do jogador pelo caminho que ele fez (migalhas), sem se meter nas paredes. */
  actualizar(dt: number, octree: Octree, jogador: THREE.Vector3, aCorrer: boolean) {
    if (this.estado === 'morto') {
      this.boneco.animar(dt, 0, 0)
      return
    }
    if (this.estado === 'preso') {
      this.boneco.animar(dt, 0, 0, true)
      return
    }
    const ultima = this.rasto[this.rasto.length - 1]
    if (!ultima || ultima.distanceTo(jogador) > 0.8) this.rasto.push(jogador.clone())
    if (this.rasto.length > 400) this.rasto.shift()
    const c = this.corpo
    const dJog = c.pes.distanceTo(jogador)
    // Salta migalhas já ultrapassadas se o jogador estiver à vista e perto.
    while (this.rasto.length > 1 && this.rasto[0].distanceTo(c.pes) < 0.7) this.rasto.shift()
    const alvo = this.rasto[0]
    const alvoVel = new THREE.Vector3()
    if (dJog > 2.6 && alvo) {
      const d = alvo.clone().sub(c.pes).setY(0)
      if (d.length() > 0.2) alvoVel.copy(d.normalize().multiplyScalar(dJog > 8 || aCorrer ? 6.8 : 4.4))
    }
    c.vel.x += (alvoVel.x - c.vel.x) * Math.min(1, 10 * dt)
    c.vel.z += (alvoVel.z - c.vel.z) * Math.min(1, 10 * dt)
    // Degrau ou beirado: salta.
    for (let i = 0; i < 2; i++) c.passo(dt / 2, octree)
    const agora = c.pes
    this.vel = Math.hypot(agora.x - this.ultimaPos.x, agora.z - this.ultimaPos.z) / Math.max(dt, 1e-4)
    this.ultimaPos.copy(agora)
    if (alvoVel.lengthSq() > 1 && this.vel < 0.4) {
      this.presoHa += dt
      if (this.presoHa > 0.6 && c.noChao) c.vel.y = 6
      // Encalhado de vez: aparece na migalha seguinte, fora da vista.
      if (this.presoHa > 2.5 && this.rasto.length > 2) {
        c.colocar(this.rasto[1].clone().add(new THREE.Vector3(0, 0.2, 0)))
        this.rasto.shift()
        this.presoHa = 0
      }
    } else this.presoHa = 0
    // Ficou muito para trás (queda, parede): volta ao rasto perto do jogador.
    if (dJog > 25 && this.rasto.length > 4) {
      c.colocar(this.rasto[this.rasto.length - 4].clone())
      this.rasto = this.rasto.slice(-4)
    }
    const olhar = alvoVel.lengthSq() > 0.5 ? alvoVel : jogador.clone().sub(c.pes)
    const alvoYaw = Math.atan2(-olhar.x, -olhar.z)
    let dy = alvoYaw - this.yaw
    dy = Math.atan2(Math.sin(dy), Math.cos(dy))
    this.yaw += dy * Math.min(1, dt * 8)
    this.boneco.raiz.position.copy(c.pes)
    this.boneco.raiz.rotation.y = this.yaw
    this.boneco.animar(dt, this.vel, 0)
  }
}
