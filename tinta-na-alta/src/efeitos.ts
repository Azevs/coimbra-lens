import * as THREE from 'three'
import { aleatorio } from './tinta'

/** Mancha de tinta desenhada num canvas: um borrão central, pingos e riscos a fugir. */
function texturaMancha(cor: string, seed: number, raios = true) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const r = aleatorio(seed)
  g.fillStyle = cor
  g.beginPath()
  const n = 18
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2
    const R = 22 + r() * 16
    const x = 64 + Math.cos(a) * R, y = 64 + Math.sin(a) * R
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y)
  }
  g.fill()
  for (let i = 0; i < 12; i++) {
    const a = r() * Math.PI * 2, d = 30 + r() * 28, s = 2 + r() * 6
    g.beginPath(); g.arc(64 + Math.cos(a) * d, 64 + Math.sin(a) * d, s, 0, 7); g.fill()
  }
  if (raios) {
    g.strokeStyle = cor
    for (let i = 0; i < 7; i++) {
      const a = r() * Math.PI * 2
      g.lineWidth = 1.5 + r() * 2.5
      g.beginPath(); g.moveTo(64 + Math.cos(a) * 26, 64 + Math.sin(a) * 26)
      g.lineTo(64 + Math.cos(a) * (46 + r() * 16), 64 + Math.sin(a) * (46 + r() * 16)); g.stroke()
    }
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/** Clarão do tiro: estrela de riscos a caneta. */
function texturaClarao(seed: number) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const r = aleatorio(seed)
  g.strokeStyle = '#111'
  g.lineCap = 'round'
  for (let i = 0; i < 14; i++) {
    const a = r() * Math.PI * 2, d0 = 6 + r() * 10, d1 = 30 + r() * 30
    g.lineWidth = 1.5 + r() * 2.5
    g.beginPath(); g.moveTo(64 + Math.cos(a) * d0, 64 + Math.sin(a) * d0)
    g.lineTo(64 + Math.cos(a) * d1, 64 + Math.sin(a) * d1); g.stroke()
  }
  g.lineWidth = 2
  g.beginPath()
  for (let i = 0; i <= 10; i++) {
    const a = (i / 10) * Math.PI * 2, R = i % 2 ? 10 : 20 + r() * 8
    const x = 64 + Math.cos(a) * R, y = 64 + Math.sin(a) * R
    if (i === 0) g.moveTo(x, y); else g.lineTo(x, y)
  }
  g.stroke()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

type Vivo = { obj: THREE.Object3D; ate: number; nasceu: number; tipo: 'fade' | 'part'; vel?: THREE.Vector3[] }

export class Efeitos {
  grupo = new THREE.Group()
  private vivos: Vivo[] = []
  private decalques: THREE.Mesh[] = []
  private manchasTinta = [1, 2, 3, 4].map((s) => texturaMancha('#111', s * 31))
  private manchasVermelhas = [1, 2, 3, 4].map((s) => texturaMancha('#b3121b', s * 77))
  private buracos = [1, 2, 3].map((s) => texturaMancha('#222', s * 13, false))
  claroes = [1, 2, 3].map((s) => texturaClarao(s * 5))
  private t = 0

  actualizar(dt: number) {
    this.t += dt
    for (let i = this.vivos.length - 1; i >= 0; i--) {
      const v = this.vivos[i]
      const k = (this.t - v.nasceu) / (v.ate - v.nasceu)
      if (k >= 1) {
        this.grupo.remove(v.obj)
        v.obj.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose() })
        this.vivos.splice(i, 1)
        continue
      }
      if (v.tipo === 'fade') {
        v.obj.traverse((o) => {
          const m = (o as THREE.Mesh).material as THREE.Material | undefined
          if (m && 'opacity' in m) m.opacity = (1 - k) * (m.userData.op ?? 1)
        })
      } else if (v.vel) {
        const pts = v.obj as THREE.LineSegments
        const p = pts.geometry.getAttribute('position') as THREE.BufferAttribute
        for (let j = 0; j < v.vel.length; j++) {
          v.vel[j].y -= 9.8 * dt
          for (const e of [0, 1]) {
            const idx = j * 2 + e
            p.setXYZ(idx, p.getX(idx) + v.vel[j].x * dt * (e ? 1 : 0.8), p.getY(idx) + v.vel[j].y * dt * (e ? 1 : 0.8), p.getZ(idx) + v.vel[j].z * dt * (e ? 1 : 0.8))
          }
        }
        p.needsUpdate = true
        ;(pts.material as THREE.LineBasicMaterial).opacity = 1 - k
      }
    }
  }

  /** Rasto da bala: um risco a lápis que se apaga. */
  rasto(de: THREE.Vector3, ate: THREE.Vector3, inimigo = false) {
    const g = new THREE.BufferGeometry().setFromPoints([de, ate])
    const m = new THREE.LineBasicMaterial({ color: inimigo ? 0x444444 : 0x222222, transparent: true, opacity: 0.6 })
    m.userData.op = 0.6
    const l = new THREE.Line(g, m)
    l.renderOrder = 3
    this.grupo.add(l)
    this.vivos.push({ obj: l, nasceu: this.t, ate: this.t + (inimigo ? 0.12 : 0.07), tipo: 'fade' })
  }

  private decalque(tex: THREE.Texture, pos: THREE.Vector3, normal: THREE.Vector3, tam: number, max = 140) {
    const m = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 })
    const d = new THREE.Mesh(new THREE.PlaneGeometry(tam, tam), m)
    d.position.copy(pos).addScaledVector(normal, 0.02)
    d.lookAt(pos.clone().add(normal))
    d.rotateZ(Math.random() * 6.28)
    d.renderOrder = 1
    this.grupo.add(d)
    this.decalques.push(d)
    if (this.decalques.length > max) {
      const velho = this.decalques.shift()!
      this.grupo.remove(velho)
      velho.geometry.dispose()
    }
  }

  /** Estilhaços de riscos a saltar. */
  private riscos(pos: THREE.Vector3, normal: THREE.Vector3, n: number, cor: number, vel = 3, dur = 0.5) {
    const arr: number[] = []
    const vs: THREE.Vector3[] = []
    for (let i = 0; i < n; i++) {
      const v = normal.clone().multiplyScalar(0.6).add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.2, Math.random() - 0.5)).normalize().multiplyScalar(vel * (0.5 + Math.random()))
      vs.push(v)
      const a = pos.clone(), b = pos.clone().addScaledVector(v, 0.03)
      arr.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3))
    const l = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: cor, transparent: true }))
    l.frustumCulled = false
    this.grupo.add(l)
    this.vivos.push({ obj: l, nasceu: this.t, ate: this.t + dur, tipo: 'part', vel: vs })
  }

  impactoParede(pos: THREE.Vector3, normal: THREE.Vector3) {
    this.decalque(this.buracos[Math.floor(Math.random() * 3)], pos, normal, 0.12 + Math.random() * 0.06)
    this.riscos(pos, normal, 7, 0x333333, 2.5, 0.45)
    // Nuvem de pó: um anel de riscos curtos que se apaga.
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.claroes[1], transparent: true, opacity: 0.35, depthWrite: false }))
    s.material.userData.op = 0.35
    s.position.copy(pos).addScaledVector(normal, 0.1)
    s.scale.setScalar(0.35)
    this.grupo.add(s)
    this.vivos.push({ obj: s, nasceu: this.t, ate: this.t + 0.18, tipo: 'fade' })
  }

  sangue(pos: THREE.Vector3, dir: THREE.Vector3, forte: boolean) {
    this.riscos(pos, dir, forte ? 22 : 12, 0xb3121b, forte ? 4 : 2.5, 0.6)
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.manchasVermelhas[Math.floor(Math.random() * 4)], transparent: true, depthWrite: false }))
    s.position.copy(pos)
    s.scale.setScalar(forte ? 0.55 : 0.35)
    this.grupo.add(s)
    this.vivos.push({ obj: s, nasceu: this.t, ate: this.t + 0.25, tipo: 'fade' })
  }

  poca(pos: THREE.Vector3, vermelha = true) {
    const tex = vermelha ? this.manchasVermelhas : this.manchasTinta
    this.decalque(tex[Math.floor(Math.random() * 4)], pos, new THREE.Vector3(0, 1, 0), 0.9 + Math.random() * 0.6, 200)
  }

  manchaParede(pos: THREE.Vector3, normal: THREE.Vector3) {
    this.decalque(this.manchasVermelhas[Math.floor(Math.random() * 4)], pos, normal, 0.6 + Math.random() * 0.4)
  }

  clarao(pos: THREE.Vector3, tam = 0.9) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.claroes[Math.floor(Math.random() * 3)], transparent: true, depthWrite: false }))
    s.position.copy(pos)
    s.scale.setScalar(tam)
    s.material.rotation = Math.random() * 6.28
    this.grupo.add(s)
    this.vivos.push({ obj: s, nasceu: this.t, ate: this.t + 0.06, tipo: 'fade' })
  }
}
