/**
 * Operação Serenata: os Borrões fecharam o fadista no claustro da Sé Velha.
 * Entra-se pelo Arco de Almedina, sobe-se o Quebra-Costas, solta-se o
 * fadista no pátio do claustro e desce-se com ele até ao Arco.
 *
 * Uma página carrega uma missão só ("Outra vez" recarrega), por isso o
 * estado da missão vive neste módulo.
 */
import * as THREE from 'three'
import { dentro } from '../mundo'
import { Protegido } from '../protegido'
import { Esboco } from '../tinta'
import { gritos, type Inimigo } from '../inimigos'
import { fichaDe } from './registo'
import { mundoSerenata, ID_CLAUSTRO } from './serenata-mundo'
import type { Ctx, Missao } from './tipos'

type Fase = 'arco' | 'largo' | 'claustro' | 'soltar' | 'fuga'
let fase: Fase = 'arco'
let soltarProgresso = 0
let fadista: Protegido
let rota: THREE.Vector3[] = []
let guedes: { e: Inimigo; desde: number; gritou: boolean } | null = null

const FADISTA = { protegido: 'Fadista' }

const OBJ: Record<Fase, string> = {
  arco: 'Passa o Arco de Almedina',
  largo: 'Sobe o Quebra-Costas até ao Largo da Sé Velha',
  claustro: 'Entra no claustro da Sé Velha',
  soltar: 'Solta o fadista no pátio do claustro',
  fuga: 'Leva o fadista até ao Arco de Almedina',
}

const GUITARRA: [number, number, number][] = [
  [0, 57, 1.2], [0.05, 64, 0.4], [0.3, 69, 0.4], [0.6, 72, 0.4], [0.9, 71, 0.3], [1.2, 69, 0.7], [1.2, 53, 1.2],
  [1.8, 67, 0.3], [2.1, 65, 0.3], [2.4, 64, 1.2], [2.4, 52, 1.2], [3.2, 68, 0.3], [3.5, 71, 0.3], [3.8, 69, 1.4], [3.8, 57, 1.4],
]

/** O sino da Sé, lá de cima. */
const sinoDaSe = (ctx: Ctx, badaladas: number) => ctx.som.sino(ctx.P.largo.clone().add(new THREE.Vector3(40, 30, 0)), badaladas)

function avancar(ctx: Ctx, nova: Fase, fala?: string) {
  fase = nova
  ctx.hud.objectivo(OBJ[nova])
  if (fala) setTimeout(() => ctx.som.falar(fala, 'radio'), 400)
}

// ----------------------------------------------------------- inimigos --
function povoar(ctx: Ctx) {
  const { P, criar, naRota, telhadoPerto } = ctx
  // Gritos que só fazem sentido aqui, a caminho da Sé.
  gritos.viu.push('serenata_inimigo_viu_3')
  gritos.combate.push('serenata_inimigo_combate_3')
  // O fadista, sentado no banco onde o deixaram, e as cordas.
  const patioYaw = (() => { const d = P.dentroClaustro.clone().sub(P.patio); return Math.atan2(-d.x, -d.z) })()
  fadista = new Protegido(P.patio.clone(), patioYaw)
  const e = new Esboco('banco', 0.3, 0.3)
  e.caixa(0.5, 0.05, 0.45, 0, 0.47, 0.05)
  for (const [x, z] of [[-0.22, -0.17], [0.22, -0.17], [-0.22, 0.27], [0.22, 0.27]]) e.caixa(0.04, 0.47, 0.04, x, 0.235, z)
  e.caixa(0.5, 0.5, 0.04, 0, 0.75, 0.27)
  for (let k = 0; k < 4; k++) e.linha([[-0.26, 0.6 + k * 0.06, 0.3], [0.26, 0.62 + k * 0.06, 0.3], [0.2, 0.58 + k * 0.06, -0.05], [-0.2, 0.6 + k * 0.06, -0.05]], 'pormenor', true)
  const banco = e.acabar()
  banco.position.copy(P.patio)
  banco.rotation.y = patioYaw
  ctx.cena.add(fadista.boneco.raiz, banco)
  serenata.protegido = {
    quem: fadista,
    rotulo: 'fadista',
    ferido: (c) => { if (Math.random() < 0.5) c.som.falar(Math.random() < 0.5 ? 'serenata_fadista_medo_1' : 'serenata_fadista_medo_2', FADISTA, fadista.olhos()) },
    caiu: (c) => {
      c.som.falar('serenata_radio_fadista_caiu', 'radio')
      c.terminar(false, 'O fadista não chegou à Serenata.')
    },
  }

  rota = [P.inicio, P.olharInicio, P.arco, P.largoArco, P.escadasBase, P.escadasMeio, P.escadasTopo, P.largo, P.portaClaustro, P.dentroClaustro, P.patio]
  const tel = new Set<string>()
  const [, , arco, largoArco, eB, eM, eT, largo, porta, dentroC, patio] = rota
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
  criar(naRota(porta, dentroC, 1, 0), porta)
  // Galeria do claustro e pátio.
  criar(naRota(dentroC, patio, 0.35, 5), dentroC)
  criar(naRota(dentroC, patio, 0.35, -5), dentroC)
  criar(naRota(dentroC, patio, 0.75, 4), dentroC)
  criar(naRota(dentroC, patio, 1.05, -3), dentroC, { patrulha: [naRota(dentroC, patio, 1.05, -3), naRota(dentroC, patio, 1.05, 4)] })
  guardasDoFadista(ctx)
  // Atiradores nas varandas: parados, a vigiar a rua lá em baixo.
  for (const v of ctx.mundo.varandas) criar(v.pos, v.olhar, { telhado: true })
}

/** Guardas em roda do banco do fadista, dentro do pátio e longe do fontanário. */
function guardasDoFadista({ nivel, mundo, P, criar }: Ctx) {
  const patio = nivel.edificios.find((b) => b.osm === ID_CLAUSTRO)?.furos[0]
  if (!patio) return
  const cx = P.patio.x, cy = -P.patio.z
  const fonte: [number, number] = [cx + 3, cy - 2]
  const noPatio = (x: number, y: number) => dentro(x, y, patio) && Math.hypot(x - fonte[0], y - fonte[1]) > 2.4
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

/** Quando o fadista é solto: sobem Borrões pelo Quebra-Costas. */
function reforcos({ jog, criar, naRota }: Ctx) {
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

/** Um Borrão sai do portal da Sé e desce a correr pelas ruas até ao jogador. */
function desceDaSe({ P, mundo, jog, som, criar, tempo }: Ctx) {
  const origem = P.portalSe ?? P.largo
  const sJog = mundo.sDe(jog.corpo.pes), sLargo = mundo.sDe(P.largo)
  const e = criar(origem, P.largo)
  e.rota = mundo.percurso.filter((_, k) => { const s = mundo.comprimentos[k]; return s >= sJog && s <= sLargo }).reverse()
  e.pressa = true
  e.ouvir(jog.corpo.pes, som)
  guedes = { e, desde: tempo(), gritou: false }
}

// --------------------------------------------------------------- missão --
function actualizar(ctx: Ctx, dt: number) {
  const { P, jog, som, hud, inimigos } = ctx
  const pes = jog.corpo.pes
  if (!guedes && fase !== 'arco' && pes.distanceTo(P.escadasBase) < 8) desceDaSe(ctx)
  if (guedes && !guedes.gritou && guedes.e.vivo) {
    const g = guedes.e
    const passa = inimigos.some((o) => o !== g && o.vivo && o.corpo.pes.distanceTo(g.corpo.pes) < 3.5)
    if (passa || ctx.tempo() - guedes.desde > 8) {
      som.falar('serenata_inimigo_guedes', { inimigo: g.id }, g.cabeca, true)
      guedes.gritou = true
    }
  }
  if (fase === 'arco' && pes.distanceTo(P.arco) < 7) avancar(ctx, 'largo', 'serenata_radio_arco')
  else if (fase === 'largo' && pes.distanceTo(P.largo) < 14) avancar(ctx, 'claustro', 'serenata_radio_largo')
  else if (fase === 'claustro' && pes.distanceTo(P.dentroClaustro) < 6) avancar(ctx, 'soltar', 'serenata_radio_claustro')
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
        const dur = som.falar('serenata_fadista_solto', FADISTA, fadista.olhos())
        som.guitarra(fadista.olhos(), GUITARRA.slice(0, 10))
        setTimeout(() => { avancar(ctx, 'fuga', 'serenata_radio_fuga'); reforcos(ctx) }, (dur + 0.6) * 1000)
        fase = 'fuga'
        hud.objectivo('…')
      }
    } else hud.accaoMostrar(null)
  }
  if (fase === 'fuga' && fadista.estado === 'livre') {
    if (pes.distanceTo(P.olharInicio) < 9 && fadista.corpo.pes.distanceTo(pes) < 14) {
      fadista.estado = 'salvo'
      const dur = som.falar('serenata_fadista_fim', FADISTA, fadista.olhos())
      som.guitarra(fadista.olhos(), GUITARRA)
      setTimeout(() => som.falar('serenata_radio_fim', 'radio'), (dur + 0.5) * 1000)
      sinoDaSe(ctx, 4)
      ctx.terminar(true, 'O fadista desceu o Quebra-Costas contigo. À meia-noite, nas escadas da Sé Velha, canta para ti.')
    } else if (fadista.corpo.pes.distanceTo(pes) > 18 && Math.random() < dt * 0.15) {
      som.falar('serenata_fadista_segue_2', FADISTA, fadista.olhos())
    } else if (Math.random() < dt * 0.02) {
      som.falar('serenata_fadista_segue_1', FADISTA, fadista.olhos())
    }
  }
}

function alvo({ P }: Ctx) {
  return fase === 'arco' ? P.arco : fase === 'largo' ? P.largo : fase === 'claustro' ? P.dentroClaustro
    : fase === 'soltar' ? P.patio : fase === 'fuga' ? P.olharInicio : null
}

const serenata: Missao = {
  ...fichaDe('serenata')!,
  mundo: mundoSerenata(),
  textos: {
    vitoria: 'A Serenata está salva',
    derrota: 'Missão falhada',
    morreste: 'Caíste nas ruelas da Alta. Os Borrões ficaram com o fadista.',
  },
  povoar,
  comecar: (ctx) => avancar(ctx, 'arco'),
  inicio: (ctx) => {
    setTimeout(() => ctx.som.falar('serenata_radio_inicio', 'radio'), 400)
    setTimeout(() => sinoDaSe(ctx, 3), 9000)
  },
  actualizar,
  alvo,
  fase: (ctx) => (ctx.acabou() ? 'fim' : fase),
  dbg: () => ({ fadista, soltar: () => { soltarProgresso = 1 } }),
}
export default serenata
