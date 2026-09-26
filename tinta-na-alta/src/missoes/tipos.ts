/**
 * O que uma missão dá ao motor, e o que o motor lhe empresta.
 *
 * Uma missão é um módulo em `src/missoes/<id>.ts` com um `export default` do
 * tipo `Missao`, registado em `registo.ts`. O motor (`mundo.ts`, `main.ts`)
 * não sabe nada de nenhuma missão em particular.
 */
import type * as THREE from 'three'
import type { Mundo, Edificio, Nivel } from '../mundo'
import type { Esboco } from '../tinta'
import type { Jogador } from '../jogador'
import type { Som } from '../audio'
import type { Hud } from '../hud'
import type { Efeitos } from '../efeitos'
import type { Inimigo } from '../inimigos'
import type { Protegido } from '../protegido'
import type { Ficha } from './registo'

type XY = [number, number]

/** O que é da missão no desenho do mundo. Coordenadas do nível: x nascente, y norte. */
export interface DefMundo {
  /** Portas da cerca (id do edifício no OSM → id da via que passa por ela): arco e túnel. */
  portas?: Record<string, string>
  /** O que a missão desenha que não é um edifício do OSM (estátuas, portões, escadarias); corre depois dos muros. */
  construir?: (m: Mundo) => void
  /** Edifícios que a missão desenha à sua maneira (id do OSM → construtor). */
  especiais?: Record<string, (m: Mundo, b: Edificio, esc: Esboco) => void>
  /** Mexe no nível antes de se construir o mundo: chão nivelado, edifícios partidos ou tirados. */
  ajustar?: (m: Mundo) => void
  /** A Torre da Universidade ao longe (por omissão sim); `false` quando a missão a desenha ela própria. */
  torreUniversidade?: boolean
  /** Escadas do OSM cujos degraus a missão desenha ela própria (não se desenham no chão). */
  semDegraus?: string[]
  /**
   * O caminho da missão pelas ruas: pontos soltos antes (`antes`), vias do OSM
   * pela ordem, pontos soltos a seguir, e por fim pontos nomeados (`ate`).
   */
  percurso: { antes?: XY[]; vias: string[]; extra: XY[]; ate?: string[] }
  /** Pontos nomeados. `inicio` e `olharInicio` são obrigatórios: é onde o jogador nasce e para onde olha. */
  pontos: (m: Mundo) => Record<string, THREE.Vector3>
  /** Placas com o nome das ruas, na fachada mais perto de cada ponto. */
  placas?: [string, XY][]
  /** Varandas com atiradores: [distância ao longo do percurso, desvio lateral, andar]. */
  varandas?: (m: Mundo) => [number, number, number][]
  /** Fachadas com janelas, portas e montras só onde isto diz que sim (à frente da fachada); nas outras fica a cornija. */
  pormenor?: (x: number, y: number) => boolean
  /** Edifícios onde não se penduram candeeiros, placas nem varandas. */
  semParedes?: string[]
}

/** O que o motor empresta às missões. */
export interface Ctx {
  cena: THREE.Scene
  mundo: Mundo
  nivel: Nivel
  P: Record<string, THREE.Vector3>
  jog: Jogador
  som: Som
  hud: Hud
  efeitos: Efeitos
  inimigos: Inimigo[]
  criar(pos: THREE.Vector3, olhar: THREE.Vector3, opt?: { telhado?: boolean; patrulha?: THREE.Vector3[]; alerta?: THREE.Vector3 }): Inimigo
  /** Ponto entre dois marcos do percurso (t de 0 a 1), com desvio lateral, fora dos edifícios. */
  naRota(a: THREE.Vector3, b: THREE.Vector3, t: number, lateral: number): THREE.Vector3
  /** Um telhado baixo junto a um ponto, para um atirador; `ja` evita repetir o mesmo prédio. */
  telhadoPerto(p: THREE.Vector3, ja: Set<string>): THREE.Vector3 | null
  largarPente(pos: THREE.Vector3): void
  terminar(vitoria: boolean, motivo: string): void
  ferirJogador(dano: number, de: THREE.Vector3): void
  /** Segundos de jogo (pára na pausa). */
  tempo(): number
  acabou(): boolean
  olharPara(p: THREE.Vector3): void
}

/** Alguém que o jogador tem de levar consigo (a barra de vida no HUD, e alvo dos Borrões). */
export interface DefProtegido {
  quem: Protegido
  /** Rótulo da barra de vida. */
  rotulo: string
  /** Levou um tiro e ainda está de pé. */
  ferido?(ctx: Ctx): void
  /** Caiu: a missão diz o que acontece (normalmente `ctx.terminar(false, …)`). */
  caiu(ctx: Ctx): void
}

export interface Missao extends Ficha {
  mundo: DefMundo
  /** Títulos do ecrã de fim, e o motivo quando o jogador cai. */
  textos: { vitoria: string; derrota: string; morreste: string }
  /** Existe depois de `povoar`, se a missão tiver alguém para proteger. */
  protegido?: DefProtegido
  /** Inimigos, personagens e adereços; corre uma vez, com o mundo feito. */
  povoar(ctx: Ctx): void
  /** Primeiro objectivo (também usado pelo `dbg.comecar()`). */
  comecar(ctx: Ctx): void
  /** Falas e sons do arranque, depois do clique. */
  inicio(ctx: Ctx): void
  /** Cada fotograma de jogo, enquanto a missão não acabou. */
  actualizar(ctx: Ctx, dt: number): void
  /** Para onde aponta o marcador do HUD. */
  alvo(ctx: Ctx): THREE.Vector3 | null
  /** A fase actual, para o `dbg`. */
  fase?(ctx: Ctx): string
  /** Atalhos de teste que a missão junta ao `window.dbg`. */
  dbg?(ctx: Ctx): Record<string, unknown>
}
