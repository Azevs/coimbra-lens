/**
 * O Estafeta: um Borrão sem arma, com a pasta das fitas às costas, a fugir
 * pelas ruas até ao barco. Não se mata: os tiros nas pernas atrasam-no e, com
 * dano que chegue, cai (e aí recuperam-se as fitas).
 *
 * Nas junções escolhe entre os dois ou três caminhos mais curtos até ao rio,
 * de preferência um que o tire da tua vista; se lhe cortas o caminho, volta
 * para trás e dá a volta por outro beco.
 */
import * as THREE from 'three'
import type { Octree } from 'three/addons/math/Octree.js'
import { Boneco, type Parte } from '../bonecos'
import { Inimigo, type Alvo } from '../inimigos'
import { Esboco } from '../tinta'
import type { Som } from '../audio'
import type { Efeitos } from '../efeitos'
import { distLinha, type Aresta, type Grafo, type XY } from './becos-grafo'

/** A correr quando o vês (abaixo da tua corrida, 7,2), a trote quando não. */
export const VELOCIDADE = { corrida: 6.2, cansado: 5.3, trote: 4.4 }
/** Nenhum tiro lhe tira mais do que isto: nem um na cabeça o deita de uma vez. */
const DANO_MAX = 34

type Fala = (id: string, forcar?: boolean) => void

export class Estafeta extends Inimigo {
  /** Caído: já não foge (o motor vê-o como `morto`, mas não conta como abatido). */
  caido = false
  /** A pasta das fitas às costas (some quando as recuperas). */
  pasta: THREE.Group
  private fitas: THREE.Object3D[] = []
  /** Onde vai: o nó a que se dirige, o de onde veio, e o traçado até lá. */
  private alvoNo = -1
  private anteNo = -1
  private trajecto: XY[] = []
  private k = 0
  /** Segundos desde que o jogador o viu (e o sítio). */
  naoVistoHa = 99
  visto = false
  private folego = 1
  private lento = 0
  private espreitar = 0
  private encalhado = 0
  private proximaRevisao = 0
  private proximaProvocacao = 0
  private tempoE = 0
  /** Está à espera no rio (chegou ao fim do grafo e foi até ao barco). */
  noRio = false
  /** Já partiu para a fuga (antes disso fica a olhar para ti na praça). */
  emFuga = false
  /** Para testes: quantas vezes encalhou de vez e saltou para o ponto seguinte. */
  encalhos = 0
  /** Para testes: onde encalhou. */
  ondeEncalhou: XY[] = []
  /** Para testes: quantas vezes deu meia volta. */
  voltas = 0
  /** As vias por onde passou, pela ordem (para o rádio e para os testes). */
  vias: string[] = []
  onVia: (nome: string | null, via: string) => void = () => {}
  onNo: (no: number) => void = () => {}
  onCair: () => void = () => {}

  constructor(pos: THREE.Vector3, yaw: number, private grafo: Grafo, private chegada: number[], private rio: THREE.Vector3,
    private chao: (x: number, y: number) => number, private fala: Fala) {
    super(pos, yaw, false)
    // Sem espingarda: um Borrão de pasta às costas.
    this.boneco = new Boneco('tinta', false)
    this.boneco.raiz.position.copy(pos)
    for (const a of this.boneco.alvos) a.userData.inimigo = this
    this.pasta = pastaComFitas(this.fitas)
    this.boneco.peito.add(this.pasta)
    this.vida = 100
  }

  // Não ouve tiros nem gritos: está sempre a fugir.
  ouvir() {}

  ferir(dano: number, parte: Parte, de: THREE.Vector3, som: Som, efeitos: Efeitos, ponto: THREE.Vector3) {
    if (this.caido) return false
    this.vida -= Math.min(dano, DANO_MAX)
    const dir = ponto.clone().sub(de).normalize()
    efeitos.sangue(ponto, dir.clone().negate().add(dir.clone().multiplyScalar(2)).normalize(), false)
    som.acerto(ponto, parte === 'cabeca')
    this.naoVistoHa = 0
    // Nas pernas: coxeia uns segundos.
    const perna = parte === 'membro' && ponto.y - this.corpo.pes.y < 0.95
    if (perna) this.lento = 3.5
    if (this.vida <= 0) {
      this.caido = true
      this.estado = 'morto'
      const frente = new THREE.Vector3(-Math.sin(this.boneco.raiz.rotation.y), 0, -Math.cos(this.boneco.raiz.rotation.y))
      this.boneco.morrer(frente.dot(dir) < 0 ? 1 : -1)
      som.queda(this.corpo.pes)
      this.corpo.vel.set(0, 0, 0)
      setTimeout(() => this.fala('becos_estafeta_caiu', true), 500)
      this.onCair()
      return false
    }
    if (perna) this.fala('becos_estafeta_perna', true)
    else if (parte === 'virilha') { this.boneco.dobrado = 0.8; this.fala('inimigo_tomates_1', true) }
    else if (Math.random() < 0.5) this.fala('inimigo_ferido_' + (1 + Math.floor(Math.random() * 3)), false)
    return false
  }

  /** Posição em coordenadas do nível. */
  private get xy(): XY { const p = this.corpo.pes; return [p.x, -p.z] }

  /** Começa a fugir a partir do nó mais perto. */
  partir() {
    this.emFuga = true
    const [x, y] = this.xy
    const n = this.grafo.noPerto(x, y)
    this.anteNo = -1
    this.alvoNo = n.i
    this.trajecto = [[x, y], [n.x, n.y]]
    this.k = 1
  }

  /**
   * Custo de cada aresta com o jogador onde está: perto dele custa muito mais,
   * e à vista dele um pouco mais.
   */
  private peso(jog: THREE.Vector3) {
    const jx = jog.x, jy = -jog.z
    return (a: Aresta) => {
      const d = distLinha(jx, jy, a.pts)
      return a.custo * (d < 10 ? 6 : d < 18 ? 2 : 1)
    }
  }

  /** O jogador vê este ponto da rua (a 1,5 m do chão)? */
  private aVista(p: XY, olhos: THREE.Vector3, octree: Octree) {
    const alvo = new THREE.Vector3(p[0], this.chao(p[0], p[1]) + 1.5, -p[1])
    const d = alvo.clone().sub(olhos)
    const L = d.length()
    if (L > 90) return false
    const r = octree.rayIntersect(new THREE.Ray(olhos, d.normalize()))
    return !r || r.distance > L - 0.5
  }

  /** Para testes: já no cais, à espera do barco. */
  noCais() {
    this.emFuga = true
    this.alvoNo = -2
    this.corpo.colocar(this.rio.clone())
    this.noRio = true
  }

  /** Numa junção: por onde seguir. */
  private decidir(jog: Alvo, octree: Octree) {
    const n = this.alvoNo
    if (this.chegada.includes(n)) { this.noRio = false; this.trajecto = [this.xy, [this.rio.x, -this.rio.z]]; this.k = 1; this.alvoNo = -2; return }
    const peso = this.peso(jog.pes())
    const { dist } = this.grafo.distancias(this.chegada, peso)
    const no = this.grafo.nos[n]
    const opcoes = no.arestas
      .map((a) => ({ a, o: this.grafo.outro(a, n), total: peso(a) + dist[this.grafo.outro(a, n)] }))
      .filter((x) => Number.isFinite(x.total) && (x.o !== this.anteNo || no.arestas.length === 1))
      .sort((p, q) => p.total - q.total)
    if (!opcoes.length) {
      // Beco sem saída: volta por onde veio.
      const a = no.arestas[0]
      if (!a) return
      opcoes.push({ a, o: this.grafo.outro(a, n), total: 0 })
    }
    const melhor = opcoes[0].total
    const boas = opcoes.filter((x) => x.total <= melhor * 1.3 + 15).slice(0, 3)
    const olhos = jog.olhos()
    let escolha = boas[0], nota = Infinity
    for (const x of boas) {
      const pts = this.grafo.desde(x.a, n)
      const la = pts[Math.min(pts.length - 1, 1)]
      // Um ponto uns metros à frente nesse caminho: se o jogador o vê, é pior.
      const L = Math.hypot(la[0] - no.x, la[1] - no.y) || 1
      const p: XY = [no.x + ((la[0] - no.x) / L) * Math.min(6, L), no.y + ((la[1] - no.y) / L) * Math.min(6, L)]
      const v = this.aVista(p, olhos, octree) && this.visto ? 1.35 : 1
      const s = x.total * v * (0.9 + Math.random() * 0.2)
      if (s < nota) { nota = s; escolha = x }
    }
    this.anteNo = n
    this.alvoNo = escolha.o
    this.trajecto = this.grafo.desde(escolha.a, n)
    this.k = 1
    const via = escolha.a.via
    if (this.vias[this.vias.length - 1] !== via.osm) { this.vias.push(via.osm); this.onVia(via.nome, via.osm) }
    this.onNo(n)
    // Às vezes pára a espreitar para trás, quando não o vês.
    if (!this.visto && this.naoVistoHa > 3 && Math.random() < 0.18) this.espreitar = 0.9 + Math.random() * 0.8
  }

  /** O jogador está no caminho, à frente e à vista: meia volta. */
  private cortado(jog: Alvo) {
    if (this.alvoNo < 0 || this.anteNo < 0 || !this.visto) return false
    const pj = jog.pes(), jx = pj.x, jy = -pj.z
    const [x, y] = this.xy
    const dj = Math.hypot(jx - x, jy - y)
    if (dj > 16) return false
    const resto = [this.xy, ...this.trajecto.slice(this.k)]
    if (distLinha(jx, jy, resto) > 3.5) return false
    // À frente dele, não atrás.
    const [ax, ay] = this.trajecto[this.k]
    return (ax - x) * (jx - x) + (ay - y) * (jy - y) > 0
  }

  actualizar(dt: number, octree: Octree, jogador: Alvo, _prot: Alvo | null, som: Som, _ef: Efeitos,
    _disparar: (de: THREE.Vector3, alvo: Alvo, acerto: boolean, perto: THREE.Vector3) => void) {
    this.tempoE += dt
    const c = this.corpo
    if (this.caido || this.barco) {
      if (this.barco && !this.caido) this.aBordo(this.barco)
      this.boneco.animar(dt, 0, 0)
      this.animarFitas(dt, 0)
      return
    }
    // Vê-o o jogador?
    const peito = c.pes.add(new THREE.Vector3(0, 1.3, 0))
    const olhos = jogador.olhos()
    const d = peito.clone().sub(olhos)
    const L = d.length()
    const r = L < 90 ? octree.rayIntersect(new THREE.Ray(olhos, d.clone().normalize())) : null
    const eraVisto = this.visto
    this.visto = L < 90 && (!r || r.distance > L - 0.4)
    this.naoVistoHa = this.visto ? 0 : this.naoVistoHa + dt
    if (this.visto && !eraVisto && this.emFuga && this.tempoE > this.proximaProvocacao && Math.random() < 0.3) {
      this.fala('becos_estafeta_naoapanhas', false)
      this.proximaProvocacao = this.tempoE + 14
    }
    this.lento = Math.max(0, this.lento - dt)
    const aCorrer = this.naoVistoHa < 2.5
    this.folego = THREE.MathUtils.clamp(this.folego + (aCorrer ? -0.045 : 0.12) * dt, 0, 1)

    let quer: XY | null = null
    let olhar: THREE.Vector3 | null = null
    if (!this.emFuga) {
      olhar = olhos
    } else if (this.espreitar > 0) {
      this.espreitar -= dt
      olhar = jogador.pes()
      if (this.espreitar <= 0 && !this.visto) som.ofegar(this.cabeca, 2)
      if (this.visto) this.espreitar = 0
    } else if (this.alvoNo === -2) {
      // A caminho do barco, ou já lá.
      const [rx, ry] = [this.rio.x, -this.rio.z]
      const [x, y] = this.xy
      if (Math.hypot(rx - x, ry - y) > 0.6) quer = [rx, ry]
      else { this.noRio = true; olhar = jogador.pes() }
    } else {
      if (this.tempoE > this.proximaRevisao) {
        this.proximaRevisao = this.tempoE + 0.4
        if (this.cortado(jogador)) {
          // Volta ao nó de onde veio, pelo mesmo traçado, e decide lá outra vez.
          this.trajecto = [this.xy, ...this.trajecto.slice(0, this.k).reverse()]
          ;[this.alvoNo, this.anteNo] = [this.anteNo, this.alvoNo]
          this.k = 1
          this.voltas++
          if (Math.random() < 0.5) this.fala('becos_estafeta_naoapanhas', false)
        }
      }
      const [x, y] = this.xy
      // Avança os pontos já passados (e os que ficam para trás numa curva apertada).
      while (this.k < this.trajecto.length) {
        const p = this.trajecto[this.k]
        const perto = Math.hypot(p[0] - x, p[1] - y) < 0.9
        const passou = this.k + 1 < this.trajecto.length && Math.hypot(this.trajecto[this.k + 1][0] - x, this.trajecto[this.k + 1][1] - y) < Math.hypot(this.trajecto[this.k + 1][0] - p[0], this.trajecto[this.k + 1][1] - p[1])
        if (!perto && !passou) break
        this.k++
      }
      if (this.k >= this.trajecto.length) {
        this.decidir(jogador, octree)
      }
      if (this.k < this.trajecto.length) quer = this.trajecto[this.k]
    }

    // Movimento com física, como os outros.
    const alvoVel = new THREE.Vector3()
    if (quer) {
      const dir = new THREE.Vector3(quer[0] - c.pes.x, 0, -quer[1] - c.pes.z)
      if (dir.length() > 0.05) {
        let v = aCorrer ? (this.folego < 0.25 ? VELOCIDADE.cansado : VELOCIDADE.corrida) : VELOCIDADE.trote
        if (this.lento > 0) v *= 0.55
        if (!this.emFuga) v = 0
        alvoVel.copy(dir.normalize().multiplyScalar(v))
      }
      if (!olhar) olhar = new THREE.Vector3(quer[0], c.pes.y, -quer[1])
    }
    if (this.boneco.dobrado > 0) alvoVel.set(0, 0, 0)
    c.vel.x += (alvoVel.x - c.vel.x) * Math.min(1, 12 * dt)
    c.vel.z += (alvoVel.z - c.vel.z) * Math.min(1, 12 * dt)
    const antes = c.pes
    for (let i = 0; i < 3; i++) c.passo(dt / 3, octree)
    const depois = c.pes
    this.vel = Math.hypot(depois.x - antes.x, depois.z - antes.z) / Math.max(dt, 1e-4)
    // Preso numa esquina: salta; preso de vez e fora da tua vista: aparece no ponto seguinte.
    if (alvoVel.lengthSq() > 1 && this.vel < 0.6) {
      this.encalhado += dt
      if (this.encalhado > 0.7 && c.noChao) c.vel.y = 5.5
      if (this.encalhado > 2.2 && !this.visto && quer) {
        c.colocar(new THREE.Vector3(quer[0], c.pes.y + 0.3, -quer[1]))
        this.encalhado = 0
        this.encalhos++
        this.ondeEncalhou.push([+c.pes.x.toFixed(1), +(-c.pes.z).toFixed(1)])
      }
    } else this.encalhado = 0
    if (olhar) {
      const dd = olhar.clone().sub(c.pes)
      const alvoYaw = Math.atan2(-dd.x, -dd.z)
      let dy = alvoYaw - this.boneco.raiz.rotation.y
      dy = Math.atan2(Math.sin(dy), Math.cos(dy))
      this.boneco.raiz.rotation.y += dy * Math.min(1, dt * 8)
    }
    this.boneco.raiz.position.copy(c.pes)
    this.boneco.animar(dt, this.vel, 0)
    this.animarFitas(dt, this.vel)
    // Passos a correr, que se ouvem ao dobrar a esquina (e com oclusão: o beco por onde foi).
    const cad = this.vel > 4.5 ? 3 : 2.2
    if (this.vel > 1 && Math.floor(this.tempoE * cad) !== Math.floor((this.tempoE - dt) * cad)) som.passo(c.pes, this.vel > 4.5 ? 1.1 : 0.8)
    if (this.emFuga && !aCorrer && this.folego < 0.6 && Math.floor(this.tempoE / 2.4) !== Math.floor((this.tempoE - dt) / 2.4)) som.ofegar(this.cabeca, 2)
  }

  /** As fitas a esvoaçar atrás da pasta quando corre. */
  private animarFitas(dt: number, vel: number) {
    const t = this.tempoE
    this.fitas.forEach((f, i) => {
      const alvo = Math.min(1.1, vel * 0.18) + Math.sin(t * (9 + i) + i) * 0.12 * Math.min(1, vel / 3 + 0.2)
      f.rotation.x += (alvo - f.rotation.x) * Math.min(1, dt * 8)
    })
  }

  private barco: THREE.Object3D | null = null
  /** Salta para o barco e vai com ele (sem física). */
  aBordo(barco: THREE.Object3D) {
    this.barco = barco
    const p = barco.localToWorld(new THREE.Vector3(1.3, 0.2, 0))
    this.corpo.colocar(p)
    this.boneco.raiz.position.copy(p)
  }

  /** Tira a pasta (recuperaste as fitas). */
  largarPasta() { this.pasta.visible = false }
}

/**
 * Uma pasta de estudante (a de couro, com as fitas presas à pega) às costas:
 * a pasta desenhada e quatro fitas de papel com contorno, penduradas.
 */
function pastaComFitas(fitas: THREE.Object3D[]) {
  const g = new THREE.Group()
  const e = new Esboco('pasta', 0.25, 0.3)
  e.caixa(0.42, 0.32, 0.08, 0, 0, 0, 0, 'aresta')
  e.linha([[-0.21, 0.1, 0.045], [0.21, 0.1, 0.045]], 'pormenor') // a aba
  e.linha([[-0.05, 0.1, 0.045], [-0.05, 0.02, 0.045], [0.05, 0.02, 0.045], [0.05, 0.1, 0.045]], 'pormenor') // fecho
  e.linha([[-0.1, 0.16, 0], [-0.06, 0.24, 0], [0.06, 0.24, 0], [0.1, 0.16, 0]], 'aresta') // pega
  // Correias por cima dos ombros.
  e.linha([[-0.15, 0.16, -0.04], [-0.12, 0.34, -0.12], [-0.1, 0.3, -0.26]], 'pormenor')
  e.linha([[0.15, 0.16, -0.04], [0.12, 0.34, -0.12], [0.1, 0.3, -0.26]], 'pormenor')
  g.add(e.acabar())
  for (let i = 0; i < 4; i++) {
    const f = new THREE.Group()
    f.position.set(-0.075 + i * 0.05, 0.2, 0.02)
    const ef = new Esboco('fita' + i, 0.15, 0.2)
    const L = 0.55 + (i % 2) * 0.12
    ef.face([[-0.018, 0, 0], [0.018, 0, 0], [0.022, -L, 0.01], [0, -L - 0.05, 0.01], [-0.022, -L, 0.01]], 'pormenor')
    f.add(ef.acabar())
    f.rotation.z = (i - 1.5) * 0.06
    g.add(f)
    fitas.push(f)
  }
  g.position.set(0, 0.3, 0.13)
  g.traverse((o) => { o.frustumCulled = false })
  return g
}
