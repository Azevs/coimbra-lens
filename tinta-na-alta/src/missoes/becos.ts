/**
 * Becos da Baixa: um Borrão, o Estafeta, roubou as pastas com as fitas dos
 * finalistas e foge da Praça 8 de Maio para o rio, onde tem um barco à
 * espera. Vai-se atrás dele pelos becos (há sempre outro caminho), deita-se
 * abaixo sem o matar, recuperam-se as fitas e leva-se tudo à Portagem.
 * O roubo é inventado; as fitas da Queima são a tradição.
 *
 * Uma página carrega uma missão só ("Outra vez" recarrega), por isso o
 * estado da missão vive neste módulo.
 */
import * as THREE from 'three'
import type { Octree } from 'three/addons/math/Octree.js'
import { gritos, type Alvo } from '../inimigos'
import type { Som } from '../audio'
import type { Efeitos } from '../efeitos'
import { fichaDe } from './registo'
import { mundoBecos, becosMundo } from './becos-mundo'
import { Estafeta, VELOCIDADE } from './estafeta'
import { comprimento, distLinha, type Grafo, type XY } from './becos-grafo'
import type { Ctx, Missao } from './tipos'

type Fase = 'praca' | 'perseguicao' | 'fitas' | 'saida' | 'barco'
let fase: Fase = 'praca'
let estafeta: Estafeta
let grafo: Grafo
/** Tempo de jogo em que o barco fica pronto a sair. */
let prazo = 0
let progresso = 0
let proximaDica = 0
let proximoPerdeste = 0
let falouRio = false
let partida = 0
const emboscadas = new Set<string>()

/** Folga do barco para lá do tempo que o Estafeta leva a trote até ao rio. */
const FOLGA = 35

const OBJ: Record<Exclude<Fase, 'barco'>, string> = {
  praca: 'Apanha o Estafeta antes do barco',
  perseguicao: 'Apanha o Estafeta antes do barco',
  fitas: 'Recupera as fitas',
  saida: 'Leva as fitas ao Largo da Portagem',
}

function avancar(ctx: Ctx, nova: Fase, fala?: string) {
  const antes = fase
  fase = nova
  if (nova !== 'barco' && OBJ[nova] !== OBJ[antes as Exclude<Fase, 'barco'>]) ctx.hud.objectivo(OBJ[nova])
  if (fala) setTimeout(() => ctx.som.falar(fala, 'radio'), 400)
}

/** O id da fala do rádio para uma rua ("Virou para o Beco do Forno."). */
export const falaDaVia = (nome: string) => 'becos_radio_via_' + nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

/** Quanto tempo leva o Estafeta a trote pelo caminho mais curto, da praça ao barco. */
const tempoDeFuga = () => comprimento(becosMundo.rota) / VELOCIDADE.trote

// ----------------------------------------------------------- inimigos --
function povoar(ctx: Ctx) {
  const { P, mundo, criar } = ctx
  grafo = becosMundo.grafo!
  gritos.viu.push('becos_inimigo_viu_1')
  gritos.combate.push('becos_inimigo_combate_1')
  const d = P.inicio.clone().sub(P.estafeta)
  estafeta = new Estafeta(P.estafeta.clone(), Math.atan2(-d.x, -d.z), grafo, becosMundo.chegada, P.rio,
    (x, y) => mundo.chao(x, y), (id, forcar = false) => ctx.som.falar(id, { inimigo: estafeta.id, nome: 'Estafeta' }, estafeta.cabeca, forcar))
  ctx.inimigos.push(estafeta)
  ctx.cena.add(estafeta.boneco.raiz)
  estafeta.onVia = (nome) => dica(ctx, nome)
  estafeta.onNo = (n) => emboscada(ctx, n)
  estafeta.onCair = () => caiu(ctx)

  // Poucos Borrões pelo caminho dele, nas esquinas, a olhar para a praça: a perseguição é o que conta.
  const L = mundo.comprimentos[mundo.rotaBase.length - 1]
  let k = 0
  for (let s = 75; s < L - 40; s += 60, k++) criar(mundo.noPercurso(s, k % 2 ? 2.5 : -2.5), mundo.noPercurso(Math.max(0, s - 20)))
  // Um em cada largo dos becos, fora do caminho mais curto também.
  for (const { nome, p } of becosMundo.pracas) {
    if (nome === 'Largo da Portagem') continue
    criar(mundo.noChao(p[0] + 1.5, p[1] - 1), P.inicio)
  }
  // Dois de guarda ao barco.
  const ao = (dx: number, dz: number) => { const q = P.rio.clone().add(new THREE.Vector3(dx, 0, dz)); return mundo.noChao(q.x, -q.z) }
  criar(ao(4, -3), P.portagem)
  criar(ao(-4, 3), P.portagem, { patrulha: [ao(-4, 3), ao(-12, 8)] })
  // Atiradores nas varandas por cima do caminho.
  for (const v of mundo.varandas) criar(v.pos, v.olhar, { telhado: true })
}

/** Quando o Estafeta passa num largo: às vezes larga dois Borrões atrás de si. */
function emboscada(ctx: Ctx, n: number) {
  if (fase !== 'perseguicao') return
  const no = grafo.nos[n]
  for (const { nome, p } of becosMundo.pracas) {
    if (emboscadas.has(nome) || Math.hypot(no.x - p[0], no.y - p[1]) > 16) continue
    emboscadas.add(nome)
    if (Math.random() > 0.7) continue
    const alvo = ctx.jog.corpo.pes
    for (const s of [-1, 1]) {
      const e = ctx.criar(ctx.mundo.noChao(p[0] + s * 2.2, p[1] + s * 1.2), alvo, { alerta: alvo })
      if (s === 1) setTimeout(() => ctx.som.falar('becos_inimigo_viu_1', { inimigo: e.id }, e.cabeca, true), 600)
    }
  }
}

/** A Central diz por onde ele foi, às vezes, quando não o vês. */
function dica(ctx: Ctx, nome: string | null) {
  if (fase !== 'perseguicao' || !nome || estafeta.naoVistoHa < 2.5 || ctx.tempo() < proximaDica) return
  const id = falaDaVia(nome)
  if (!ctx.som.textos[id] || Math.random() < 0.35) return
  ctx.som.falar(id, 'radio')
  proximaDica = ctx.tempo() + 12
}

function caiu(ctx: Ctx) {
  if (fase === 'barco') return
  avancar(ctx, 'fitas')
  ctx.hud.relogio(null)
}

/** Recuperadas as fitas: saem Borrões dos becos, uns para a Portagem, outros atrás de ti. */
function vaga(ctx: Ctx) {
  const { jog, criar, mundo, P } = ctx
  const [jx, jy] = [jog.corpo.pes.x, -jog.corpo.pes.z]
  const portagem = grafo.noPerto(P.portagem.x, -P.portagem.z).i
  const aoJogador = grafo.noPerto(jx, jy).i
  const nos = grafo.nos.filter((n) => {
    const d = Math.hypot(n.x - jx, n.y - jy)
    return n.arestas.length >= 2 && d > 35 && d < 75 && n.arestas.some((a) => /^(Beco|Travessa|Rua)/.test(a.via.nome ?? ''))
  })
  for (let k = 0; k < 6 && nos.length; k++) {
    const n = nos.splice(Math.floor(Math.random() * nos.length), 1)[0]
    const destino = k % 2 ? portagem : aoJogador
    const { seguinte } = grafo.distancias([destino])
    const pts = grafo.caminho(n.i, seguinte).pts
    const e = criar(mundo.noChao(n.x, n.y), jog.corpo.pes, { alerta: jog.corpo.pes })
    e.rota = pts.slice(1).map(([x, y]) => mundo.noChao(x, y))
    e.pressa = true
  }
}

// --------------------------------------------------------------- missão --
function actualizar(ctx: Ctx, dt: number) {
  const { P, jog, som, hud } = ctx
  const t = ctx.tempo()
  const pes = jog.corpo.pes
  if (fase === 'praca' && t > 1.6) {
    estafeta.partir()
    prazo = t + Math.ceil(tempoDeFuga() + FOLGA)
    avancar(ctx, 'perseguicao')
  }
  if (fase === 'perseguicao') {
    const r = Math.max(0, prazo - t)
    hud.relogio(r > 0 ? `o barco sai em ${Math.floor(r / 60)}:${String(Math.floor(r % 60)).padStart(2, '0')}` : 'o barco está pronto', r < 20)
    if (estafeta.naoVistoHa > 7 && t > proximoPerdeste) {
      som.falar('becos_radio_perdeste', 'radio')
      proximoPerdeste = t + 45
    }
    if (!falouRio && estafeta.corpo.pes.distanceTo(P.rio) < 45) {
      falouRio = true
      som.falar('becos_radio_rio', 'radio')
    }
    // No cais com o barco pronto: embarca e vai-se.
    if (estafeta.noRio && t >= prazo) {
      fase = 'barco'
      partida = t
      hud.relogio(null)
      som.falar('becos_radio_barco', 'radio')
    }
  }
  if (fase === 'barco') {
    const barco = ctx.cena.getObjectByName('barco')
    if (barco) {
      const { dx, dy, tx, ty } = barco.userData.rio as { dx: number; dy: number; tx: number; ty: number }
      const s = t - partida, v = Math.min(6, s * 2)
      // Afasta-se do cais e segue rio abaixo.
      barco.position.x += (dx * v - tx * Math.max(0, 1.5 - s)) * dt
      barco.position.z -= (dy * v - ty * Math.max(0, 1.5 - s)) * dt
      estafeta.aBordo(barco)
    }
    if (t - partida > 3.2) ctx.terminar(false, 'O barco levou as fitas rio abaixo.')
    return
  }
  if (fase === 'fitas') {
    const perto = pes.distanceTo(estafeta.corpo.pes) < 2.4
    if (!perto) { hud.accaoMostrar(null); progresso = Math.max(0, progresso - dt); return }
    const aFazer = jog.teclas.has('KeyF')
    progresso = aFazer ? progresso + dt / 1.8 : Math.max(0, progresso - dt)
    if (aFazer && Math.floor(progresso * 4) !== Math.floor((progresso - dt / 1.8) * 4)) som.corda()
    hud.accaoMostrar('Recuperar as fitas (manter)', progresso)
    if (progresso >= 1) recuperar(ctx)
    return
  }
  if (fase === 'saida' && pes.distanceTo(P.portagem) < 10) {
    setTimeout(() => som.falar('becos_radio_fim', 'radio'), 300)
    ctx.terminar(true, 'As pastas dos finalistas voltaram à Portagem, com as fitas todas.')
  }
}

function recuperar(ctx: Ctx) {
  ctx.hud.accaoMostrar(null)
  estafeta.largarPasta()
  avancar(ctx, 'saida', 'becos_radio_fitas')
  vaga(ctx)
}

function alvo({ P }: Ctx) {
  if (fase === 'praca' || fase === 'perseguicao') return estafeta.naoVistoHa < 2 ? estafeta.corpo.pes : null
  if (fase === 'fitas') return estafeta.corpo.pes
  if (fase === 'saida') return P.portagem
  return null
}

// ---------------------------------------------------------------- testes --
/**
 * Uma fuga inteira sem desenhar, com o jogador parado num sítio: um Estafeta
 * novo, a correr a passo fixo até ao barco. Devolve quanto tempo levou, por
 * onde foi, e quantas vezes encalhou ou deu meia volta.
 */
function fuga(ctx: Ctx, opt: { jogador?: XY; max?: number } = {}) {
  const octree = (window as unknown as { dbg: { octree: Octree } }).dbg.octree
  const { P, mundo } = ctx
  const [jx, jy] = opt.jogador ?? [P.inicio.x, -P.inicio.z]
  const jp = mundo.noChao(jx, jy)
  const olhos = jp.clone().add(new THREE.Vector3(0, 1.62, 0))
  const alvoJog: Alvo = { olhos: () => olhos.clone(), pes: () => jp.clone(), velocidade: () => 0, ferir: () => {}, vivo: () => true }
  const mudo = { passo() {}, ofegar() {}, acerto() {}, queda() {} } as unknown as Som
  const e = new Estafeta(P.estafeta.clone(), 0, grafo, becosMundo.chegada, P.rio, (x, y) => mundo.chao(x, y), () => {})
  e.partir()
  const dt = 1 / 30
  let t = 0, minJog = Infinity
  while (t < (opt.max ?? 400) && !e.noRio) {
    e.actualizar(dt, octree, alvoJog, null, mudo, {} as Efeitos, () => {})
    t += dt
    if (t > 3) minJog = Math.min(minJog, e.corpo.pes.distanceTo(jp))
  }
  const vias = e.vias.map((id) => mundo.n.vias.find((v) => v.osm === id)?.nome ?? id)
  return { chegou: e.noRio, tempo: +t.toFixed(1), encalhos: e.encalhos, onde: e.ondeEncalhou, voltas: e.voltas, perto: +minJog.toFixed(1), vias }
}

const becos: Missao = {
  ...fichaDe('becos')!,
  mundo: mundoBecos(),
  textos: {
    vitoria: 'As fitas estão salvas',
    derrota: 'Missão falhada',
    morreste: 'Caíste nos becos da Baixa. O Estafeta levou as fitas para o rio.',
  },
  povoar,
  comecar: (ctx) => { fase = 'praca'; ctx.hud.objectivo(OBJ.praca) },
  inicio: (ctx) => {
    setTimeout(() => ctx.som.falar('becos_estafeta_apanha', { inimigo: estafeta.id, nome: 'Estafeta' }, estafeta.cabeca, true), 300)
    setTimeout(() => ctx.som.falar('becos_radio_inicio', 'radio'), 2600)
  },
  actualizar,
  alvo,
  fase: (ctx) => (ctx.acabou() ? 'fim' : fase),
  dbg: (ctx) => ({
    estafeta: () => estafeta,
    grafo: () => grafo,
    rota: becosMundo.rota,
    chegada: becosMundo.chegada,
    prazo: () => prazo,
    /** Deita o Estafeta abaixo (como se levasse os tiros que faltam). */
    derrubar: () => { estafeta.vida = 1; estafeta.ferir(50, 'tronco', ctx.jog.olhos.clone(), ctx.som, ctx.efeitos, estafeta.cabeca) },
    recuperar: () => { if (fase === 'fitas') recuperar(ctx) },
    /** O Estafeta no cais e o barco pronto: a derrota. */
    embarcar: () => { if (fase === 'praca') actualizar(ctx, 0); estafeta.noCais(); prazo = 0 },
    fuga: (opt?: { jogador?: XY; max?: number }) => fuga(ctx, opt),
    /** Distância de um ponto ao caminho mais curto (para pôr o jogador no caminho). */
    naRota: (x: number, y: number) => distLinha(x, y, becosMundo.rota),
  }),
}
export default becos
