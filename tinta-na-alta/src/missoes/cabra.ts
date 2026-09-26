/**
 * A Cabra não toca: os Borrões tomaram a Torre da Universidade e amarraram a
 * Cabra (o sino a que os estudantes chamam assim). Sobe-se a Rua Larga,
 * entra-se pela Porta Férrea, atravessa-se o Pátio das Escolas, sobe-se a
 * torre, solta-se o badalo e toca-se três vezes, aguentando as vagas que o
 * sino chama. A premissa é inventada.
 *
 * Uma página carrega uma missão só ("Outra vez" recarrega), por isso o
 * estado da missão vive neste módulo.
 */
import * as THREE from 'three'
import { gritos } from '../inimigos'
import { fichaDe } from './registo'
import { mundoCabra, cabraMundo } from './cabra-mundo'
import type { Ctx, Missao } from './tipos'

type Fase = 'porta' | 'patio' | 'torre' | 'badalo' | 'tocar'
let fase: Fase = 'porta'
let falouPatio = false
let progresso = 0
let toques = 0
let proximoToque = 0

const TOQUES = 3
/** Segundos entre toques: a Cabra ainda balança, e os que o sino chamou vêm a subir. */
const ESPERA = 20

const OBJ: Record<Exclude<Fase, 'tocar'>, string> = {
  porta: 'Entra no Paço pela Porta Férrea',
  patio: 'Chega à Torre',
  torre: 'Sobe a Torre',
  badalo: 'Solta o badalo da Cabra',
}
const objTocar = () => `Toca a Cabra (${toques}/${TOQUES})`

function avancar(ctx: Ctx, nova: Fase, fala?: string) {
  fase = nova
  ctx.hud.objectivo(nova === 'tocar' ? objTocar() : OBJ[nova])
  if (fala) setTimeout(() => ctx.som.falar(fala, 'radio'), 400)
}

// ----------------------------------------------------------- inimigos --
function povoar(ctx: Ctx) {
  const { P, criar, naRota, mundo } = ctx
  const aqui = (x: number, y: number) => mundo.noChao(x, y)
  // Largo D. Dinis: à volta da estátua, e um a rondar.
  criar(naRota(P.olharInicio, P.largo, 0.7, 4), P.inicio)
  criar(naRota(P.olharInicio, P.largo, 0.95, -5), P.inicio)
  criar(naRota(P.largo, P.ruaLarga, 0.15, 3), P.olharInicio, { patrulha: [naRota(P.largo, P.ruaLarga, 0.15, 3), naRota(P.olharInicio, P.largo, 0.4, 2)] })
  // Rua Larga: uns a descer a rua ao teu encontro, outros de guarda.
  for (const [t, l] of [[0.25, -3], [0.4, 3], [0.55, 0]] as const) {
    criar(naRota(P.ruaLarga, P.praca, t, l), P.largo, { patrulha: [naRota(P.ruaLarga, P.praca, t, l), naRota(P.largo, P.ruaLarga, 0.5, l)] })
  }
  criar(naRota(P.largo, P.ruaLarga, 0.8, -6), P.largo)
  criar(naRota(P.ruaLarga, P.praca, 0.75, 6), P.ruaLarga)
  // Praça da Porta Férrea e o túnel.
  criar(naRota(P.praca, P.portaFora, 0.2, 5), P.ruaLarga)
  criar(naRota(P.praca, P.portaFora, 0.5, -6), P.ruaLarga)
  criar(naRota(P.praca, P.portaFora, 0.85, 3), P.praca, { patrulha: [naRota(P.praca, P.portaFora, 0.85, 3), naRota(P.praca, P.portaFora, 0.3, -2)] })
  criar(naRota(P.portaFora, P.portaDentro, 0.4, 0.7), P.portaFora)
  criar(naRota(P.portaFora, P.portaDentro, 0.75, -0.7), P.portaFora)
  // Pátio das Escolas: aberto, com fogo cruzado.
  criar(aqui(-132.5, -46), P.portaDentro)
  criar(aqui(-128, -64), P.portaDentro)
  criar(aqui(-140, 5), P.portaDentro, { patrulha: [aqui(-140, 5), aqui(-155, -30), aqui(-125, -35)] })
  criar(aqui(-160, -10), P.portaDentro, { patrulha: [aqui(-160, -10), aqui(-165, 12)] })
  criar(P.torrePorta.clone().add(new THREE.Vector3(2.5, 0, -1.5)), P.portaDentro)
  for (const g of cabraMundo.galeria) criar(g.clone(), P.patio, { telhado: true })
  // Dentro da torre: um ou dois por patamar, e um com o sino.
  const lado = new THREE.Vector3(0.9, 0, 0.7)
  criar(P.patamar1.clone(), P.torreDentro, { telhado: true })
  criar(P.patamar2.clone(), P.torreDentro, { telhado: true })
  criar(P.patamar2.clone().add(lado), P.torreDentro, { telhado: true })
  criar(P.patamar3.clone(), P.torreDentro, { telhado: true })
  criar(P.salaSinos.clone().add(new THREE.Vector3(1.6, 0, -0.2)), P.sino, { telhado: true })
}

/** Os que o sino chama: entram pela Porta Férrea; uns sobem a torre, outros a Via Latina, outros ficam no pátio. */
function vaga(ctx: Ctx, n: number) {
  const { P, criar, jog } = ctx
  const alvo = jog.corpo.pes
  // Os que sobem a torre já vêm do túnel; os outros ainda estão na praça, do lado de fora.
  const fora = (k: number) => P.portaFora.clone().add(new THREE.Vector3(4 + (k % 3) * 1.6, 0, 1 + Math.floor(k / 3) * 1.6))
  const tunel = (k: number) => P.portaDentro.clone().lerp(P.portaFora, 0.35 + 0.12 * k)
  let k = 0, t = 0
  const vem = (rota: THREE.Vector3[], deDentro = false) => {
    const e = criar(deDentro ? tunel(t++) : fora(k++), P.portaDentro, { alerta: alvo })
    e.rota = rota.map((p) => p.clone())
    e.seguirRota = true
    e.pressa = true
  }
  // Primeiro ao eixo do túnel (portaFora), senão vão contra a parede ao lado do arco.
  const subir = [P.portaDentro, P.torrePorta, ...cabraMundo.subida]
  for (let i = 0; i < n + 1; i++) vem(subir, true)
  for (let i = 0; i < 2; i++) vem([P.portaFora, P.portaDentro, P.patio.clone().add(new THREE.Vector3(i ? 8 : -6, 0, i ? 10 : -4))])
  for (const g of cabraMundo.galeria.slice(0, 2)) vem([P.portaFora, P.portaDentro, P.viaLatinaPe, P.viaLatinaTopo, g])
}

// --------------------------------------------------------------- missão --
function actualizar(ctx: Ctx, dt: number) {
  const { P, jog, som, hud } = ctx
  const pes = jog.corpo.pes
  if (fase === 'porta' && pes.distanceTo(P.portaFora) < 8) avancar(ctx, 'patio', 'cabra_radio_porta')
  else if (fase === 'patio') {
    if (!falouPatio && pes.distanceTo(P.portaDentro) < 7) { falouPatio = true; setTimeout(() => som.falar('cabra_radio_patio', 'radio'), 300) }
    if (pes.distanceTo(P.torrePorta) < 3.5) avancar(ctx, 'torre', 'cabra_radio_torre')
  } else if (fase === 'torre' && pes.y > P.sino.y - 0.6 && Math.hypot(pes.x - P.sino.x, pes.z - P.sino.z) < 5) {
    avancar(ctx, 'badalo', 'cabra_radio_sino')
  }
  if (fase !== 'badalo' && fase !== 'tocar') return
  const perto = Math.hypot(pes.x - P.sino.x, pes.z - P.sino.z) < 2.4 && Math.abs(pes.y - P.sino.y) < 1.5
  if (!perto) { hud.accaoMostrar(null); progresso = Math.max(0, progresso - dt); return }
  if (fase === 'tocar' && ctx.tempo() < proximoToque) {
    hud.accaoMostrar('A Cabra ainda balança…', 1 - (proximoToque - ctx.tempo()) / ESPERA)
    return
  }
  const aFazer = jog.teclas.has('KeyF')
  const dura = fase === 'badalo' ? 1.6 : 2.4
  progresso = aFazer ? progresso + dt / dura : Math.max(0, progresso - dt)
  if (aFazer && fase === 'badalo' && Math.floor(progresso * 5) !== Math.floor((progresso - dt / dura) * 5)) som.corda()
  hud.accaoMostrar(fase === 'badalo' ? 'Soltar o badalo (manter)' : 'Tocar a Cabra (manter)', progresso)
  if (progresso < 1) return
  progresso = 0
  hud.accaoMostrar(null)
  if (fase === 'badalo') {
    const cordas = ctx.cena.getObjectByName('cordas-cabra')
    if (cordas) cordas.visible = false
    avancar(ctx, 'tocar')
    return
  }
  tocar(ctx)
}

function tocar(ctx: Ctx) {
  const { P, som, hud } = ctx
  toques++
  som.sinoGrave(P.sino.clone().add(new THREE.Vector3(0, 1.5, 0)))
  ctx.jog.pitch += 0.03 // o chão treme
  hud.objectivo(objTocar())
  proximoToque = ctx.tempo() + ESPERA
  if (toques === 1) {
    // Agora os Borrões já sabem onde estás, e dizem-no.
    gritos.viu.push('cabra_inimigo_viu_1')
    gritos.combate.push('cabra_inimigo_combate_1', 'cabra_inimigo_combate_2')
    setTimeout(() => som.falar('cabra_radio_vaga', 'radio'), 3500)
    vaga(ctx, 1)
  } else if (toques === 2) {
    setTimeout(() => som.falar('cabra_radio_aguenta', 'radio'), 3500)
    vaga(ctx, 2)
  } else if (toques >= TOQUES) {
    setTimeout(() => som.falar('cabra_radio_fim', 'radio'), 4000)
    ctx.terminar(true, 'Três badaladas por cima da Alta. Quem ainda dormia, acordou.')
  }
}

function alvo({ P }: Ctx) {
  return fase === 'porta' ? P.portaFora : fase === 'patio' ? P.torrePorta : P.sino
}

const cabra: Missao = {
  ...fichaDe('cabra')!,
  mundo: mundoCabra(),
  textos: {
    vitoria: 'A Cabra tocou',
    derrota: 'Missão falhada',
    morreste: 'Caíste no Paço das Escolas. A Cabra ficou calada.',
  },
  povoar,
  comecar: (ctx) => avancar(ctx, 'porta'),
  inicio: (ctx) => { setTimeout(() => ctx.som.falar('cabra_radio_inicio', 'radio'), 400) },
  actualizar,
  alvo,
  fase: (ctx) => (ctx.acabou() ? 'fim' : fase),
  dbg: (ctx) => ({
    /** Toca já, sem esperar nem manter F (para testes). */
    tocar: () => { if (fase !== 'tocar') avancar(ctx, 'tocar'); proximoToque = 0; tocar(ctx) },
    toques: () => toques,
    subida: cabraMundo.subida,
  }),
}
export default cabra
