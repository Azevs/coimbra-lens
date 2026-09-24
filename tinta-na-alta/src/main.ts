import * as THREE from 'three'
import { Octree } from 'three/addons/math/Octree.js'
import { Mundo, type Nivel } from './mundo'
import { Jogador, Corpo } from './jogador'
import { redimensionar, Esboco } from './tinta'
import { Arma } from './arma'
import { Som } from './audio'
import { Efeitos } from './efeitos'
import { Inimigo, type Alvo } from './inimigos'
import { Fadista } from './fadista'
import { Hud } from './hud'
import type { Parte } from './bonecos'

// ------------------------------------------------------------------ base --
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.setClearColor(0xffffff)
renderer.autoClear = false
document.body.prepend(renderer.domElement)
const cena = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.05, 420)
redimensionar(innerWidth, innerHeight)

const hud = new Hud()
hud.ecra('inicio')
const botao = document.querySelector('#comecar') as HTMLButtonElement
const aCarregar = document.querySelector('#carregar') as HTMLElement
botao.disabled = true

const nivel: Nivel = await (await fetch(import.meta.env.BASE_URL + 'nivel.json')).json()
// As placas das ruas são desenhadas num canvas com a letra do HUD: esperar por ela.
await Promise.race([document.fonts.load('64px "Patrick Hand"'), new Promise((r) => setTimeout(r, 2500))]).catch(() => {})
const mundo = new Mundo(nivel)
mundo.construir()
cena.add(mundo.cena)
// Duas octrees: a dos tiros e da visão tem o chão; a da física não (o chão é a função de altura).
const octreeTiros = new Octree()
octreeTiros.fromGraphNode(mundo.colisao)
const semChao = new THREE.Group()
for (const m of [...mundo.colisao.children]) if (!m.userData.terreno) semChao.add(m)
const octreeFisica = new Octree()
octreeFisica.fromGraphNode(semChao)
const octree = {
  capsuleIntersect: (c: Parameters<Octree['capsuleIntersect']>[0]) => octreeFisica.capsuleIntersect(c),
  rayIntersect: (r: THREE.Ray) => octreeTiros.rayIntersect(r),
} as unknown as Octree
Corpo.chao = (x, z) => mundo.chao(x, -z)
const P = mundo.pontos

const efeitos = new Efeitos()
cena.add(efeitos.grupo)
const som = new Som()
som.legenda = (q, t) => hud.legenda(q, t)
// Oclusão: um raio da fonte ao ouvinte que bate numa parede antes de lá chegar.
som.ocluido = (de) => {
  const d = som.ouvinte.clone().sub(de)
  const L = d.length()
  const r = octree.rayIntersect(new THREE.Ray(de, d.normalize()))
  return !!r && r.distance < L - 0.5
}
const arma = new Arma(efeitos.claroes[0])
arma.redimensionar(innerWidth / innerHeight)
const jog = new Jogador(camera, P.inicio)
const olharPara = (p: THREE.Vector3) => { const d = p.clone().sub(jog.corpo.pes); jog.yaw = Math.atan2(-d.x, -d.z) }
olharPara(P.olharInicio)

// ------------------------------------------------------------- posições --
const nivelXY = (v: THREE.Vector3): [number, number] => [v.x, -v.z]

/** Ponto entre dois marcos do percurso, com desvio lateral; foge de dentro dos edifícios. */
function naRota(a: THREE.Vector3, b: THREE.Vector3, t: number, lateral: number) {
  const sa = mundo.sDe(a), sb = mundo.sDe(b)
  return mundo.noPercurso(sa + (sb - sa) * t, lateral)
}

/** Um telhado baixo junto a um ponto, e o sítio na beira de onde se vê a rua. */
function telhadoPerto(p: THREE.Vector3, ja: Set<string>) {
  const [px, py] = nivelXY(p)
  const chaoP = mundo.chao(px, py)
  let melhor: { pos: THREE.Vector3; d: number; osm: string } | null = null
  for (const b of nivel.edificios) {
    if (ja.has(b.osm) || b.passagem || b.furos.length) continue
    const alt = b.topo - chaoP
    if (alt < 4 || alt > 13 || b.cumeeira - b.topo > 1.5) continue
    const xs = b.anel.map((q) => q[0]), ys = b.anel.map((q) => q[1])
    const cx = xs.reduce((s, v) => s + v) / xs.length, cy = ys.reduce((s, v) => s + v) / ys.length
    // Ponto do contorno mais perto da rua.
    let q = b.anel[0], dq = Infinity
    for (let i = 0; i < b.anel.length; i++) {
      const a = b.anel[i], c = b.anel[(i + 1) % b.anel.length]
      const vx = c[0] - a[0], vy = c[1] - a[1], LL = vx * vx + vy * vy
      const t = LL ? Math.max(0, Math.min(1, ((px - a[0]) * vx + (py - a[1]) * vy) / LL)) : 0
      const x = a[0] + vx * t, y = a[1] + vy * t, d = Math.hypot(px - x, py - y)
      if (d < dq) { dq = d; q = [x, y] }
    }
    if (dq > 16 || dq < 3) continue
    const dc = Math.hypot(cx - q[0], cy - q[1])
    if (dc < 3) continue
    const x = q[0] + ((cx - q[0]) / dc) * 1.4, y = q[1] + ((cy - q[1]) / dc) * 1.4
    if (!melhor || dq < melhor.d) melhor = { pos: new THREE.Vector3(x, b.topo + 0.05, -y), d: dq, osm: b.osm }
  }
  if (melhor) ja.add(melhor.osm)
  return melhor?.pos ?? null
}

// ----------------------------------------------------------- inimigos --
const inimigos: Inimigo[] = []
function criar(pos: THREE.Vector3, olhar: THREE.Vector3, opt: { telhado?: boolean; patrulha?: THREE.Vector3[]; alerta?: THREE.Vector3 } = {}) {
  // Nunca dois no mesmo sítio: afasta-se em espiral até achar chão livre.
  if (!opt.telhado) {
    for (let k = 0; k < 12 && inimigos.some((e) => e.corpo.pes.distanceTo(pos) < 1.4); k++) {
      const a = k * 2.4, r = 1.5 + k * 0.25
      const x = pos.x + Math.cos(a) * r, yN = -pos.z + Math.sin(a) * r
      if (!mundo.edificioEm(x, yN)) pos = new THREE.Vector3(x, mundo.chao(x, yN), -yN)
    }
  }
  const d = olhar.clone().sub(pos)
  const e = new Inimigo(pos.clone().add(new THREE.Vector3(0, 0.1, 0)), Math.atan2(-d.x, -d.z), !!opt.telhado)
  if (opt.patrulha) e.patrulha = opt.patrulha
  cena.add(e.boneco.raiz)
  inimigos.push(e)
  if (opt.alerta) e.ouvir(opt.alerta, som)
  return e
}

const rota = [P.inicio, P.olharInicio, P.arco, P.largoArco, P.escadasBase, P.escadasMeio, P.escadasTopo, P.largo, P.portaClaustro, P.dentroClaustro, P.patio]
function povoar() {
  const tel = new Set<string>()
  const [, barba, arco, largoArco, eB, eM, eT, largo, porta, dentro, patio] = rota
  criar(naRota(arco, largoArco, 0.9, 2.5), arco)
  criar(naRota(largoArco, eB, 0.35, -2), arco, { patrulha: [naRota(largoArco, eB, 0.2, 0), naRota(largoArco, eB, 0.8, 0)] })
  criar(naRota(largoArco, eB, 0.95, 1.2), largoArco)
  criar(naRota(eB, eM, 0.55, 0.8), eB)
  criar(naRota(eB, eM, 0.85, -0.8), eB, { patrulha: [naRota(eB, eM, 0.7, 0), naRota(eM, eT, 0.2, 0)] })
  const t1 = telhadoPerto(naRota(eB, eM, 0.5, 0), tel); if (t1) criar(t1, eB, { telhado: true })
  criar(naRota(eM, eT, 0.6, 1), eM)
  const t2 = telhadoPerto(naRota(eM, eT, 0.7, 0), tel); if (t2) criar(t2, eM, { telhado: true })
  criar(naRota(eT, largo, 0.3, -2), eT)
  criar(naRota(eT, largo, 0.9, 3), eT, { patrulha: [naRota(eT, largo, 0.9, 3), naRota(largo, porta, 0.4, 0)] })
  criar(naRota(largo, porta, 0.6, -3), largo)
  const t3 = telhadoPerto(largo, tel); if (t3) criar(t3, eT, { telhado: true })
  criar(naRota(largo, porta, 0.95, 2), largo)
  criar(naRota(porta, dentro, 1, 0).add(new THREE.Vector3(0, 0, 0)), porta)
  // Galeria do claustro e pátio.
  criar(naRota(dentro, patio, 0.35, 5), dentro)
  criar(naRota(dentro, patio, 0.35, -5), dentro)
  criar(naRota(dentro, patio, 0.75, 4), dentro)
  criar(naRota(dentro, patio, 1.05, -3), dentro, { patrulha: [naRota(dentro, patio, 1.05, -3), naRota(dentro, patio, 1.05, 4)] })
  guardasDoFadista()
  // Atiradores nas varandas: parados, a vigiar a rua lá em baixo.
  for (const v of mundo.varandas) criar(v.pos, v.olhar, { telhado: true })
  void barba
}

/** Guardas em roda do banco do fadista, dentro do pátio e longe do fontanário. */
function guardasDoFadista() {
  const patio = nivel.edificios.find((b) => b.osm === 'relation/3475986')?.furos[0]
  if (!patio) return
  const cx = P.patio.x, cy = -P.patio.z
  const fonte: [number, number] = [cx + 3, cy - 2]
  const noPatio = (x: number, y: number) => {
    let d = false
    for (let i = 0, j = patio.length - 1; i < patio.length; j = i++) {
      const [xi, yi] = patio[i], [xj, yj] = patio[j]
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d
    }
    return d && Math.hypot(x - fonte[0], y - fonte[1]) > 2.4
  }
  const ponto = (ang: number, r0: number) => {
    for (let r = r0; r > 1.6; r -= 0.4) {
      const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r
      if (noPatio(x, y)) return new THREE.Vector3(x, mundo.chao(x, y), -y)
    }
    return null
  }
  // A entrada do pátio vem da galeria do lado da porta: um olha para lá, os outros cobrem as arcadas.
  const entrada = Math.atan2(-P.dentroClaustro.z - cy, P.dentroClaustro.x - cx)
  for (const da of [0, 2.1, -2.1]) {
    const p = ponto(entrada + da, 3.2)
    if (p) criar(p, p.clone().add(p.clone().sub(P.patio).setY(0).multiplyScalar(4)))
  }
  const ronda = [0, 1, 2, 3].map((k) => ponto(entrada + 0.8 + (k * Math.PI) / 2, 5.5)).filter((p): p is THREE.Vector3 => !!p)
  if (ronda.length >= 2) criar(ronda[0], P.patio, { patrulha: ronda })
  const arcada = ponto(entrada + Math.PI, 7)
  if (arcada) criar(arcada, P.dentroClaustro)
}

function reforcos() {
  const alvo = jog.corpo.pes
  const [, , arco, largoArco, eB, eM, eT, largo, porta] = rota
  criar(naRota(largo, porta, 0.2, 4), porta, { alerta: alvo })
  criar(naRota(eT, largo, 0.6, -2), porta, { alerta: alvo })
  criar(naRota(eM, eT, 0.3, 0.8), eT, { alerta: alvo })
  criar(naRota(eB, eM, 0.2, 1), eM, { alerta: alvo })
  criar(naRota(eB, eM, 0.3, -1), eM, { alerta: alvo })
  criar(naRota(largoArco, eB, 0.6, 1.5), eB)
  criar(naRota(arco, largoArco, 0.4, -1.5), eB)
}

// ------------------------------------------------------------- fadista --
const patioYaw = (() => { const d = P.dentroClaustro.clone().sub(P.patio); return Math.atan2(-d.x, -d.z) })()
const fadista = new Fadista(P.patio.clone(), patioYaw)
cena.add(fadista.boneco.raiz, fadista.cadeira)

// ------------------------------------------------------ alvos e munições --
const alvoJogador: Alvo = {
  olhos: () => jog.olhos.clone(),
  pes: () => jog.corpo.pes,
  velocidade: () => Math.hypot(jog.corpo.vel.x, jog.corpo.vel.z),
  ferir: () => {},
  vivo: () => !jog.morto,
}
const alvoFadista: Alvo = {
  olhos: () => fadista.olhos(),
  pes: () => fadista.corpo.pes,
  velocidade: () => fadista.vel,
  ferir: () => {},
  vivo: () => fadista.estado === 'livre',
}

type Pente = { obj: THREE.Group; pos: THREE.Vector3 }
const pentes: Pente[] = []
function largarPente(pos: THREE.Vector3) {
  const e = new Esboco('pente', 0.3, 0.2)
  e.caixa(0.08, 0.04, 0.22, 0, 0.02, 0)
  e.caixa(0.05, 0.03, 0.2, 0.09, 0.015, 0.03, 0.4)
  const g = e.acabar()
  g.position.copy(pos).add(new THREE.Vector3(0.5, 0.02, 0.2))
  cena.add(g)
  pentes.push({ obj: g, pos: g.position.clone() })
}

// ------------------------------------------------- o que desce da Sé --
let guedes: { e: Inimigo; desde: number; gritou: boolean } | null = null
/** Um Borrão sai do portal da Sé e desce a correr pelas ruas até ao jogador. */
function desceDaSe() {
  const origem = P.portalSe ?? P.largo
  const sJog = mundo.sDe(jog.corpo.pes), sLargo = mundo.sDe(P.largo)
  const e = criar(origem, P.largo)
  e.rota = mundo.percurso.filter((_, k) => { const s = mundo.comprimentos[k]; return s >= sJog && s <= sLargo }).reverse()
  e.pressa = true
  e.ouvir(jog.corpo.pes, som)
  guedes = { e, desde: tempoJogo, gritou: false }
}

// --------------------------------------------------------------- missão --
type Fase = 'arco' | 'largo' | 'claustro' | 'soltar' | 'fuga' | 'fim'
let fase: Fase = 'arco'
let emJogo = false
let acabou = false
let tempoJogo = 0
let abatidos = 0
let disparos = 0
let acertos = 0
let soltarProgresso = 0
let ultimoDano = -99
let falouFerido = false
let proximoCoracao = 0

const OBJ: Record<Fase, string> = {
  arco: 'Passa o Arco de Almedina',
  largo: 'Sobe o Quebra-Costas até ao Largo da Sé Velha',
  claustro: 'Entra no claustro da Sé Velha',
  soltar: 'Solta o fadista no pátio do claustro',
  fuga: 'Leva o fadista até ao Arco de Almedina',
  fim: '',
}
const alvoFase = (): THREE.Vector3 | null =>
  fase === 'arco' ? P.arco : fase === 'largo' ? P.largo : fase === 'claustro' ? P.dentroClaustro
    : fase === 'soltar' ? P.patio : fase === 'fuga' ? P.olharInicio : null

function avancar(nova: Fase, fala?: string) {
  fase = nova
  if (OBJ[nova]) hud.objectivo(OBJ[nova])
  if (fala) setTimeout(() => som.falar(fala, 'radio'), 400)
}

const GUITARRA: [number, number, number][] = [
  [0, 57, 1.2], [0.05, 64, 0.4], [0.3, 69, 0.4], [0.6, 72, 0.4], [0.9, 71, 0.3], [1.2, 69, 0.7], [1.2, 53, 1.2],
  [1.8, 67, 0.3], [2.1, 65, 0.3], [2.4, 64, 1.2], [2.4, 52, 1.2], [3.2, 68, 0.3], [3.5, 71, 0.3], [3.8, 69, 1.4], [3.8, 57, 1.4],
]

function terminar(vitoria: boolean, motivo: string) {
  if (acabou) return
  acabou = true
  fase = 'fim'
  const precisao = disparos ? Math.round((acertos / disparos) * 100) : 0
  const m = Math.floor(tempoJogo / 60), s = Math.floor(tempoJogo % 60)
  setTimeout(() => {
    document.exitPointerLock()
    hud.ecra('fim', `
      <p class="carimbo">${vitoria ? 'cumprida' : 'falhada'}</p>
      <h2>${vitoria ? 'A Serenata está salva' : 'Missão falhada'}</h2>
      <p>${motivo}</p>
      <table>
        <tr><td>tempo</td><td>${m}:${String(s).padStart(2, '0')}</td></tr>
        <tr><td>Borrões abatidos</td><td>${abatidos}</td></tr>
        <tr><td>pontaria</td><td>${precisao}%</td></tr>
      </table>
      <button onclick="location.reload()">Outra vez</button>`)
  }, vitoria ? 6500 : 3500)
}

// --------------------------------------------------------------- input --
let aDisparar = false
let aMirar = false
document.addEventListener('mousedown', (e) => {
  if (!emJogo || document.pointerLockElement !== document.body) return
  if (e.button === 0) aDisparar = true
  if (e.button === 2) aMirar = true
})
document.addEventListener('mouseup', (e) => {
  if (e.button === 0) aDisparar = false
  if (e.button === 2) aMirar = false
})
document.addEventListener('contextmenu', (e) => e.preventDefault())
document.addEventListener('keydown', (e) => {
  if (!emJogo || jog.morto) return
  if (e.code === 'KeyR' && arma.recarregar()) som.recarregar()
})
botao.addEventListener('click', () => {
  // O bloqueio do rato tem de ser pedido já, dentro do clique; o som carrega a seguir.
  document.body.requestPointerLock()
  void som.iniciar()
  if (!emJogo) {
    emJogo = true
    hud.ecra(null)
    avancar('arco', 'radio_inicio')
    setTimeout(() => som.sino(P.largo.clone().add(new THREE.Vector3(40, 30, 0)), 3), 9000)
  }
})
document.addEventListener('pointerlockchange', () => {
  if (!emJogo || acabou) return
  const bloqueado = document.pointerLockElement === document.body
  hud.ecra(bloqueado ? null : 'pausa')
  if (!bloqueado) { aDisparar = false; aMirar = false; jog.teclas.clear() }
  if (som.pronto) void (bloqueado ? som.ctx.resume() : som.ctx.suspend())
})
document.querySelector('#pausa')!.addEventListener('click', () => document.body.requestPointerLock())
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight)
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  arma.redimensionar(camera.aspect)
  redimensionar(innerWidth, innerHeight)
})

jog.onPasso = (f) => som.passo(null, f)
jog.onAterrar = (v) => {
  som.aterrar(v)
  if (v > 13) ferirJogador((v - 13) * 8, jog.corpo.pes.clone().add(new THREE.Vector3(0, -1, 0)))
}

// -------------------------------------------------------------- disparos --
const raycaster = new THREE.Raycaster()
const DANO: Record<Parte, number> = { cabeca: 100, tronco: 38, membro: 24, virilha: 55 }

function dispararJogador() {
  arma.disparar()
  disparos++
  som.tiro(null)
  const spread = arma.dispersao(Math.hypot(jog.corpo.vel.x, jog.corpo.vel.z) / 4, jog.corpo.noChao)
  const dir = new THREE.Vector3(0, 0, -1)
    .applyEuler(new THREE.Euler((Math.random() - 0.5) * spread * 2, (Math.random() - 0.5) * spread * 2, 0))
    .applyQuaternion(camera.quaternion)
  const origem = camera.position.clone()
  // Recuo na câmara.
  jog.pitch = Math.min(1.5, jog.pitch + 0.009 + Math.random() * 0.006 * (1 - arma.mira * 0.5))
  jog.yaw += (Math.random() - 0.5) * 0.006
  raycaster.set(origem, dir)
  raycaster.far = 250
  const alvos = inimigos.filter((e) => e.vivo && e.corpo.pes.distanceTo(origem) < 250).flatMap((e) => e.boneco.alvos)
  const hitE = raycaster.intersectObjects(alvos, false)[0]
  const hitM = octree.rayIntersect(new THREE.Ray(origem, dir))
  const boca = new THREE.Vector3(0.12, -0.08, -0.9).applyQuaternion(camera.quaternion).add(origem)
  if (hitE && (!hitM || hitE.distance < hitM.distance)) {
    const e = hitE.object.userData.inimigo as Inimigo
    const parte = hitE.object.userData.parte as Parte
    acertos++
    const morreu = e.ferir(DANO[parte] * (0.9 + Math.random() * 0.2), parte, origem, som, efeitos, hitE.point)
    hud.acerto(morreu)
    efeitos.rasto(boca, hitE.point)
    // Salpico na parede de trás.
    const atras = octree.rayIntersect(new THREE.Ray(hitE.point, dir))
    if (atras && atras.distance < 2.5) efeitos.manchaParede(atras.position, atras.triangle.getNormal(new THREE.Vector3()))
    if (morreu) {
      abatidos++
      largarPente(e.corpo.pes)
      const vizinho = inimigos.find((o) => o.vivo && o !== e && o.corpo.pes.distanceTo(e.corpo.pes) < 25)
      if (vizinho) setTimeout(() => som.falar(Math.random() < 0.5 ? 'inimigo_baixa_1' : 'inimigo_baixa_2', { inimigo: vizinho.id }, vizinho.cabeca), 700)
      for (const o of inimigos) if (o.vivo && o.corpo.pes.distanceTo(e.corpo.pes) < 22) o.ouvir(jog.corpo.pes, som)
    }
  } else if (hitM) {
    const n = hitM.triangle.getNormal(new THREE.Vector3())
    if (n.dot(dir) > 0) n.negate()
    efeitos.impactoParede(hitM.position, n)
    efeitos.rasto(boca, hitM.position)
    som.impacto(hitM.position, Math.random() < 0.25)
  } else {
    efeitos.rasto(boca, origem.clone().addScaledVector(dir, 120))
  }
  // Toda a gente ouve um tiro, ao seu alcance.
  for (const e of inimigos) if (e.vivo && e.corpo.pes.distanceTo(origem) < 65) e.ouvir(jog.corpo.pes, som)
}

function ferirJogador(dano: number, de: THREE.Vector3) {
  if (jog.morto || acabou) return
  jog.vida -= dano
  ultimoDano = tempoJogo
  som.dor()
  const d = de.clone().sub(jog.corpo.pes)
  const ang = Math.atan2(d.x, -d.z) + jog.yaw
  hud.ferido(-ang)
  jog.pitch += 0.02
  if (jog.vida < 35 && !falouFerido) { falouFerido = true; som.falar('radio_ferido', 'radio') }
  if (jog.vida <= 0) {
    jog.morto = true
    aDisparar = false
    som.falar('radio_morreste', 'radio')
    terminar(false, 'Caíste nas ruelas da Alta. Os Borrões ficaram com o fadista.')
  }
}

function tiroInimigo(boca: THREE.Vector3, alvo: Alvo, acerto: boolean, ponto: THREE.Vector3) {
  const dir = ponto.clone().sub(boca).normalize()
  const hitM = octree.rayIntersect(new THREE.Ray(boca, dir))
  const distPonto = ponto.distanceTo(boca)
  const bloqueado = hitM && hitM.distance < distPonto - 0.3
  if (acerto && !bloqueado) {
    efeitos.rasto(boca, ponto, true)
    if (alvo === alvoJogador) ferirJogador(7 + Math.random() * 4, boca)
    else if (fadista.estado === 'livre') {
      fadista.vida -= 6
      efeitos.sangue(ponto, dir, false)
      if (Math.random() < 0.5) som.falar(Math.random() < 0.5 ? 'fadista_medo_1' : 'fadista_medo_2', 'fadista', fadista.olhos())
      if (fadista.vida <= 0) {
        fadista.estado = 'morto'
        fadista.boneco.morrer(1)
        som.queda(fadista.corpo.pes)
        som.falar('radio_fadista_caiu', 'radio')
        terminar(false, 'O fadista não chegou à Serenata.')
      }
    }
    return
  }
  // Falhou: a bala passa e bate em alguma coisa.
  const fim = bloqueado ? hitM!.position : hitM && hitM.distance < 200 ? hitM.position : boca.clone().addScaledVector(dir, 150)
  efeitos.rasto(boca, fim, true)
  if (hitM && hitM.distance < 200) {
    const n = hitM.triangle.getNormal(new THREE.Vector3())
    if (n.dot(dir) > 0) n.negate()
    efeitos.impactoParede(hitM.position, n)
    if (hitM.position.distanceTo(jog.olhos) < 12) som.impacto(hitM.position, Math.random() < 0.35)
  }
  // Zumbido se passou perto da cabeça.
  const olhos = jog.olhos
  const t = THREE.MathUtils.clamp(olhos.clone().sub(boca).dot(dir), 0, boca.distanceTo(fim))
  const maisPerto = boca.clone().addScaledVector(dir, t)
  if (maisPerto.distanceTo(olhos) < 2.2) {
    const lado = maisPerto.clone().sub(olhos).dot(new THREE.Vector3(Math.cos(jog.yaw), 0, -Math.sin(jog.yaw)))
    som.zumbido(THREE.MathUtils.clamp(lado, -1, 1))
  }
}

// ---------------------------------------------------------------- ciclo --
povoar()
aCarregar.textContent = ''
botao.disabled = false

const q = new URLSearchParams(location.search)
if (q.get('em') && P[q.get('em')!]) { jog.corpo.colocar(P[q.get('em')!]); olharPara(P[q.get('olhar') ?? 'largo'] ?? P.largo) }
;(window as any).dbg = { THREE, octree, mundo, jog, camera, inimigos, fadista, P, arma, som, hud, cena,
  comecar: () => { emJogo = true; hud.ecra(null); avancar('arco') },
  disparar: () => dispararJogador(), ferir: (d: number) => ferirJogador(d, jog.corpo.pes), soltar: () => { soltarProgresso = 1 }, fase: () => fase,
  vencer: () => terminar(true, 'Teste.') }

const relogio = new THREE.Timer()
let yawAntes = jog.yaw, pitchAntes = jog.pitch
renderer.setAnimationLoop(() => {
  relogio.update()
  const dt = Math.min(relogio.getDelta(), 0.05)
  const ativo = emJogo && (document.pointerLockElement === document.body || q.has('auto'))
  if (ativo) {
    tempoJogo += dt
    jog.actualizar(dt, octree, arma.mira > 0.5)
    const pes = jog.corpo.pes

    // Arma.
    if (aDisparar && !jog.morto && !jog.aCorrer) {
      if (arma.podeDisparar()) dispararJogador()
      else if (arma.pente === 0 && arma.aRecarregar <= 0) {
        if (arma.reserva > 0) { if (arma.recarregar()) som.recarregar() } else { som.vazio(); aDisparar = false }
      }
    }
    arma.actualizar(dt, jog.yaw - yawAntes, jog.pitch - pitchAntes, jog.andar, jog.balanco, jog.aCorrer, aMirar)
    yawAntes = jog.yaw; pitchAntes = jog.pitch
    camera.fov = THREE.MathUtils.lerp(72, 56, arma.mira)
    camera.updateProjectionMatrix()

    // Vida volta devagar quando não levas tiros.
    if (!jog.morto && tempoJogo - ultimoDano > 6) jog.vida = Math.min(100, jog.vida + dt * 5)
    if (jog.vida < 35 && !jog.morto && tempoJogo > proximoCoracao) { som.coracao(1 - jog.vida / 35); proximoCoracao = tempoJogo + 0.9 }

    // Pentes no chão.
    for (let i = pentes.length - 1; i >= 0; i--) {
      if (pentes[i].pos.distanceTo(pes) < 1.6 && arma.reserva < 240) {
        arma.reserva += 30
        som.recarregar()
        cena.remove(pentes[i].obj)
        pentes.splice(i, 1)
        hud.legenda('', '+1 carregador')
      }
    }

    // Inimigos e fadista.
    const fAlvo = fadista.estado === 'livre' ? alvoFadista : null
    for (const e of inimigos) {
      if (!e.vivo && e.corpo.pes.distanceTo(pes) > 200) continue
      e.actualizar(dt, octree, alvoJogador, fAlvo, som, efeitos, tiroInimigo)
    }
    fadista.actualizar(dt, octree, pes, jog.aCorrer)

    // Missão.
    if (!acabou) {
      if (!guedes && fase !== 'arco' && pes.distanceTo(P.escadasBase) < 8) desceDaSe()
      if (guedes && !guedes.gritou && guedes.e.vivo) {
        const g = guedes.e
        const passa = inimigos.some((o) => o !== g && o.vivo && o.corpo.pes.distanceTo(g.corpo.pes) < 3.5)
        if (passa || tempoJogo - guedes.desde > 8) {
          som.falar('inimigo_guedes', { inimigo: g.id }, g.cabeca, true)
          guedes.gritou = true
        }
      }
      if (fase === 'arco' && pes.distanceTo(P.arco) < 7) avancar('largo', 'radio_arco')
      else if (fase === 'largo' && pes.distanceTo(P.largo) < 14) avancar('claustro', 'radio_largo')
      else if (fase === 'claustro' && pes.distanceTo(P.dentroClaustro) < 6) avancar('soltar', 'radio_claustro')
      if (fase === 'soltar' || (fase !== 'fuga' && fadista.estado === 'preso' && pes.distanceTo(P.patio) < 2.4)) {
        const perto = pes.distanceTo(P.patio) < 2.4
        if (perto) {
          const aSoltar = jog.teclas.has('KeyF')
          soltarProgresso = aSoltar ? soltarProgresso + dt / 1.4 : Math.max(0, soltarProgresso - dt)
          if (aSoltar && Math.floor(soltarProgresso * 5) !== Math.floor((soltarProgresso - dt / 1.4) * 5)) som.corda()
          hud.accaoMostrar('Desatar o fadista (manter)', soltarProgresso)
          if (soltarProgresso >= 1) {
            hud.accaoMostrar(null)
            fadista.soltar()
            if (fase !== 'soltar') hud.objectivo(OBJ.soltar)
            const dur = som.falar('fadista_solto', 'fadista', fadista.olhos())
            som.guitarra(fadista.olhos(), GUITARRA.slice(0, 10))
            setTimeout(() => { avancar('fuga', 'radio_fuga'); reforcos() }, (dur + 0.6) * 1000)
            fase = 'fuga'
            hud.objectivo('…')
          }
        } else hud.accaoMostrar(null)
      }
      if (fase === 'fuga' && fadista.estado === 'livre') {
        if (pes.distanceTo(P.olharInicio) < 9 && fadista.corpo.pes.distanceTo(pes) < 14) {
          fadista.estado = 'salvo'
          const dur = som.falar('fadista_fim', 'fadista', fadista.olhos())
          som.guitarra(fadista.olhos(), GUITARRA)
          setTimeout(() => som.falar('radio_fim', 'radio'), (dur + 0.5) * 1000)
          som.sino(P.largo.clone().add(new THREE.Vector3(40, 30, 0)), 4)
          terminar(true, 'O fadista desceu o Quebra-Costas contigo. À meia-noite, nas escadas da Sé Velha, canta para ti.')
        } else if (fadista.corpo.pes.distanceTo(pes) > 18 && Math.random() < dt * 0.15) {
          som.falar('fadista_segue_2', 'fadista', fadista.olhos())
        } else if (Math.random() < dt * 0.02) {
          som.falar('fadista_segue_1', 'fadista', fadista.olhos())
        }
      }
    }
    efeitos.actualizar(dt)
    som.ouvinte.copy(camera.position)
    som.frenteOuvinte.copy(jog.frente())
  } else if (!emJogo) {
    // Menu: a câmara respira devagar à entrada do Arco.
    jog.yaw += Math.sin(performance.now() / 3000) * 0.0004
    jog.actualizar(dt, octree, false)
    for (const e of inimigos) e.boneco.animar(dt, 0, 0)
    fadista.boneco.animar(dt, 0, 0, true)
  }
  hud.actualizar(jog.vida, arma.pente, arma.reserva, arma.dispersao(Math.hypot(jog.corpo.vel.x, jog.corpo.vel.z) / 4, jog.corpo.noChao),
    arma.mira > 0.7, arma.aRecarregar > 0, fadista.estado === 'livre' ? fadista.vida : null)
  hud.marcar(emJogo && !acabou ? alvoFase() : null, camera, jog.corpo.pes)

  renderer.clear()
  renderer.render(cena, camera)
  if (!jog.morto) {
    renderer.clearDepth()
    renderer.render(arma.cena, arma.camera)
  }
})
