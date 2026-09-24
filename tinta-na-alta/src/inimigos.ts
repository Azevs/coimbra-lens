import * as THREE from 'three'
import type { Octree } from 'three/addons/math/Octree.js'
import { Boneco, type Parte } from './bonecos'
import { Corpo } from './jogador'
import type { Som } from './audio'
import type { Efeitos } from './efeitos'

type Estado = 'guarda' | 'alerta' | 'combate' | 'procura' | 'morto'
const escolher = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]

export interface Alvo {
  olhos(): THREE.Vector3
  pes(): THREE.Vector3
  velocidade(): number
  ferir(dano: number, de: THREE.Vector3): void
  vivo(): boolean
}

let proximoId = 1

export class Inimigo {
  id = proximoId++
  boneco = new Boneco('tinta')
  corpo: Corpo
  vida = 100
  estado: Estado = 'guarda'
  private yaw: number
  private yawGuarda: number
  private tempo = Math.random() * 10
  private reaccao = 0
  private rajada = 0
  private proximoTiro = 0
  private pente = 25
  private recarga = 0
  private strafe = 0
  private strafeAte = 0
  private ultimaVista = new THREE.Vector3()
  private vistoHa = 99
  private alvoMov: THREE.Vector3 | null = null
  private mira = 0
  private morreuHa = 0
  private falouViu = false
  patrulha: THREE.Vector3[] = []
  private idxPatrulha = 0
  aDescansar = 0
  vel = 0

  constructor(pos: THREE.Vector3, yaw: number, public telhado = false) {
    this.corpo = new Corpo(pos, 1.75, 0.3)
    this.yaw = this.yawGuarda = yaw
    this.boneco.raiz.position.copy(pos)
    for (const a of this.boneco.alvos) a.userData.inimigo = this
  }

  get cabeca() { return this.corpo.pes.add(new THREE.Vector3(0, 1.6, 0)) }
  get vivo() { return this.estado !== 'morto' }

  /** Alguém ouviu um tiro, ou viu um companheiro cair. */
  ouvir(onde: THREE.Vector3, som: Som) {
    if (!this.vivo || this.estado === 'combate') return
    this.ultimaVista.copy(onde)
    if (this.estado === 'guarda') {
      this.estado = 'alerta'
      this.reaccao = 0.4 + Math.random() * 0.5
      if (Math.random() < 0.5) som.falar(escolher(['inimigo_alerta_1', 'inimigo_alerta_2', 'inimigo_alerta_3']), { inimigo: this.id }, this.cabeca)
    }
    this.alvoMov = onde.clone()
  }

  ferir(dano: number, parte: Parte, de: THREE.Vector3, som: Som, efeitos: Efeitos, ponto: THREE.Vector3) {
    if (!this.vivo) return false
    this.vida -= dano
    const dir = ponto.clone().sub(de).normalize()
    efeitos.sangue(ponto, dir.clone().negate().add(dir.clone().multiplyScalar(2)).normalize(), parte === 'cabeca')
    som.acerto(ponto, parte === 'cabeca')
    this.ultimaVista.copy(de)
    this.vistoHa = 0
    if (this.estado !== 'combate') { this.estado = 'combate'; this.reaccao = 0.35 }
    if (this.vida <= 0) {
      this.estado = 'morto'
      const frente = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
      this.boneco.morrer(frente.dot(dir) < 0 ? 1 : -1)
      som.queda(this.corpo.pes)
      return true
    }
    if (Math.random() < 0.5) som.falar(escolher(['inimigo_ferido_1', 'inimigo_ferido_2']), { inimigo: this.id }, this.cabeca)
    this.strafeAte = 0
    return false
  }

  private vejo(alvo: Alvo, octree: Octree, alcance: number, cone: boolean) {
    const de = this.cabeca
    const para = alvo.olhos()
    const d = para.clone().sub(de)
    const dist = d.length()
    if (dist > alcance) return false
    if (cone) {
      const frente = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw))
      const plano = new THREE.Vector3(d.x, 0, d.z).normalize()
      if (frente.dot(plano) < Math.cos(THREE.MathUtils.degToRad(62)) && dist > 4) return false
    }
    const r = octree.rayIntersect(new THREE.Ray(de, d.clone().normalize()))
    return !r || r.distance > dist - 0.4
  }

  actualizar(dt: number, octree: Octree, jogador: Alvo, fadista: Alvo | null, som: Som, efeitos: Efeitos,
    aoDisparar: (de: THREE.Vector3, alvo: Alvo, acerto: boolean, perto: THREE.Vector3) => void) {
    this.tempo += dt
    if (!this.vivo) {
      this.morreuHa += dt
      if (this.morreuHa > 0.45 && this.morreuHa - dt <= 0.45) efeitos.poca(this.corpo.pes.add(new THREE.Vector3(0, 0.03, 0)))
      this.boneco.animar(dt, 0, 0)
      return
    }
    const alcance = this.estado === 'guarda' ? 45 : 75
    const vejoJog = jogador.vivo() && this.vejo(jogador, octree, alcance, this.estado === 'guarda' || this.estado === 'alerta')
    const vejoFad = fadista && fadista.vivo() && this.vejo(fadista, octree, 50, this.estado !== 'combate')
    const alvo: Alvo | null = vejoJog ? (vejoFad && Math.random() < 0.004 ? fadista : jogador) : vejoFad ? fadista : null
    if (alvo) {
      if (this.estado !== 'combate') {
        this.estado = 'combate'
        this.reaccao = (this.telhado ? 1.1 : 0.75) + Math.random() * 0.6
        if (!this.falouViu || Math.random() < 0.3) {
          som.falar(escolher(['inimigo_viu_1', 'inimigo_viu_2', 'inimigo_viu_3', 'inimigo_viu_4']), { inimigo: this.id }, this.cabeca)
          this.falouViu = true
        }
      }
      this.ultimaVista.copy(alvo.pes())
      this.vistoHa = 0
    } else {
      this.vistoHa += dt
    }

    let querMover: THREE.Vector3 | null = null
    let olhar: THREE.Vector3 | null = null
    let correr = false

    switch (this.estado) {
      case 'guarda': {
        if (this.patrulha.length) {
          const p = this.patrulha[this.idxPatrulha]
          if (this.aDescansar > 0) this.aDescansar -= dt
          else if (p.distanceTo(this.corpo.pes) < 0.8) { this.idxPatrulha = (this.idxPatrulha + 1) % this.patrulha.length; this.aDescansar = 2 + Math.random() * 3 }
          else querMover = p
        }
        if (!querMover) this.yaw = this.yawGuarda + Math.sin(this.tempo * 0.35) * 0.7
        break
      }
      case 'alerta': {
        this.reaccao -= dt
        if (this.alvoMov && this.reaccao < 0) {
          if (this.alvoMov.distanceTo(this.corpo.pes) > 3 && !this.telhado) querMover = this.alvoMov
          else { this.estado = 'procura'; this.vistoHa = 0 }
        }
        olhar = this.alvoMov ?? null
        break
      }
      case 'combate': {
        this.reaccao -= dt
        olhar = alvo ? alvo.olhos() : this.ultimaVista
        if (this.vistoHa > 2.5) {
          this.estado = 'procura'
          this.alvoMov = this.ultimaVista.clone()
          if (Math.random() < 0.6) som.falar(escolher(['inimigo_perdeu_1', 'inimigo_perdeu_2', 'inimigo_alerta_3']), { inimigo: this.id }, this.cabeca)
          break
        }
        // Mexer-se de lado entre rajadas: não ficar parado a levar tiros.
        if (!this.telhado) {
          if (this.tempo > this.strafeAte) {
            this.strafe = Math.random() < 0.35 ? 0 : Math.random() < 0.5 ? -1 : 1
            this.strafeAte = this.tempo + 0.8 + Math.random() * 1.6
            if (Math.random() < 0.15) som.falar(escolher(['inimigo_combate_1', 'inimigo_combate_2', 'inimigo_combate_3', 'inimigo_combate_4', 'inimigo_combate_5']), { inimigo: this.id }, this.cabeca)
          }
          if (this.strafe && olhar) {
            const d = olhar.clone().sub(this.corpo.pes).setY(0).normalize()
            const lado = new THREE.Vector3(-d.z, 0, d.x).multiplyScalar(this.strafe)
            const dist = olhar.distanceTo(this.corpo.pes)
            if (dist > 30) lado.add(d.multiplyScalar(0.8)) // aproximar
            querMover = this.corpo.pes.add(lado.multiplyScalar(3))
          }
        }
        // Disparar.
        if (this.recarga > 0) {
          this.recarga -= dt
          if (this.recarga <= 0) this.pente = 25
        } else if (alvo && this.reaccao <= 0 && this.mira > 0.8) {
          this.proximoTiro -= dt
          if (this.proximoTiro <= 0) {
            if (this.rajada <= 0) this.rajada = 3 + Math.floor(Math.random() * 4)
            this.rajada--
            this.pente--
            this.proximoTiro = this.rajada > 0 ? 0.11 + Math.random() * 0.04 : 0.9 + Math.random() * 1.1
            const dist = alvo.olhos().distanceTo(this.cabeca)
            // Precisão: pior ao longe, pior se o alvo corre, pior no início do contacto.
            let p = 0.24 * Math.exp(-dist / 40) + 0.04
            p *= alvo.velocidade() > 5 ? 0.5 : alvo.velocidade() > 1 ? 0.75 : 1
            if (this.vistoHa < 0.1 && this.reaccao > -1) p *= 0.6
            if (alvo === fadista) p *= 0.3
            const acerto = Math.random() < p
            const boca = this.boneco.arma.localToWorld(new THREE.Vector3(0, 0.02, -0.85))
            som.tiro(boca, true)
            efeitos.clarao(boca, 0.6)
            const perto = alvo.olhos().add(new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.3) * 1.2, (Math.random() - 0.5) * 1.6))
            aoDisparar(boca, alvo, acerto, acerto ? alvo.olhos().add(new THREE.Vector3(0, -0.3, 0)) : perto)
            if (this.pente <= 0) {
              this.recarga = 2.2
              this.rajada = 0
              if (Math.random() < 0.6) som.falar(escolher(['inimigo_recarregar_1', 'inimigo_recarregar_2']), { inimigo: this.id }, this.cabeca)
            }
          }
        }
        break
      }
      case 'procura': {
        olhar = this.ultimaVista
        if (!this.telhado && this.ultimaVista.distanceTo(this.corpo.pes) > 2.5) { querMover = this.ultimaVista; correr = true }
        else this.yaw += dt * 0.8
        if (this.vistoHa > 16) { this.estado = 'guarda'; this.yawGuarda = this.yaw }
        break
      }
    }

    // Movimento com física.
    const c = this.corpo
    const alvoVel = new THREE.Vector3()
    if (querMover) {
      const d = querMover.clone().sub(c.pes).setY(0)
      if (d.length() > 0.4) alvoVel.copy(d.normalize().multiplyScalar(this.estado === 'combate' ? 2.2 : correr || this.estado === 'alerta' ? 3.8 : 1.4))
      if (!olhar) olhar = querMover
    }
    c.vel.x += (alvoVel.x - c.vel.x) * Math.min(1, 10 * dt)
    c.vel.z += (alvoVel.z - c.vel.z) * Math.min(1, 10 * dt)
    const antes = c.pes
    for (let i = 0; i < 2; i++) c.passo(dt / 2, octree)
    const depois = c.pes
    this.vel = Math.hypot(depois.x - antes.x, depois.z - antes.z) / Math.max(dt, 1e-4)
    // Preso contra uma parede a andar de lado: muda de lado.
    if (this.estado === 'combate' && this.strafe && this.vel < 0.3) this.strafeAte = 0
    if (olhar) {
      const d = olhar.clone().sub(c.pes)
      const alvoYaw = Math.atan2(-d.x, -d.z)
      let dy = alvoYaw - this.yaw
      dy = Math.atan2(Math.sin(dy), Math.cos(dy))
      this.yaw += dy * Math.min(1, dt * (this.estado === 'combate' ? 7 : 3))
    }
    this.mira = THREE.MathUtils.damp(this.mira, this.estado === 'combate' && this.recarga <= 0 ? 1 : 0, 6, dt)
    this.boneco.raiz.position.copy(c.pes)
    this.boneco.raiz.rotation.y = this.yaw
    this.boneco.animar(dt, this.vel, this.mira)
    // Passos dos outros, que se ouvem ao dobrar a esquina.
    if (this.vel > 1 && Math.floor(this.tempo * (this.vel > 3 ? 2.6 : 1.8)) !== Math.floor((this.tempo - dt) * (this.vel > 3 ? 2.6 : 1.8))) {
      som.passo(c.pes, this.vel > 3 ? 0.8 : 0.5)
    }
  }
}
