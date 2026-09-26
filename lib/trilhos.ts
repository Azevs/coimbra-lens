/**
 * Os trilhos, prontos para a página.
 *
 * `trilhos-dados.ts` é gerado e só sabe do que se mede no traçado;
 * `trilhos-guia.ts` é o que a CIM declara. É aqui que os dois se juntam,
 * e é aqui que se decide como se chama cada família e o que se mostra
 * quando uma ficha e um traçado não dizem o mesmo.
 */

import { published, type Sourced } from '@/lib/provenance'
import { fmt } from '@/lib/format'
import { GUIA_DATA, GUIA_FICHAS, GUIA_FONTE, type Dificuldade, type FichaGuia } from '@/lib/trilhos-guia'
import { FICHAS_TC, type FichaTC } from '@/lib/trilhos-fichas-tc'
import { TRILHOS_DADOS, TRILHOS_OBTIDOS_EM, type TrilhoDados } from '@/lib/trilhos-dados'

export type { FichaGuia, FichaTC, TrilhoDados }
export { FICHAS_TC } from '@/lib/trilhos-fichas-tc'
export { GUIA_REDE, GUIA_URL } from '@/lib/trilhos-guia'
export { REGIAO_CAIXA } from '@/lib/trilhos-dados'

/** Família do percurso, pelo código sinalizado. */
export type Familia = 'GR' | 'PR' | 'outro'

/**
 * As três famílias. As cores das marcas são as da sinalética da FCMP no
 * terreno — branco sobre vermelho nas grandes rotas, amarelo sobre
 * vermelho nas pequenas — porque é por elas que quem caminha se orienta.
 * No mapa a linha usa o tom da família, não a marca inteira.
 */
export const FAMILIAS: Record<Familia, { nome: string; plural: string; linha: string; marca: [string, string] | null; nota: string }> = {
  GR: {
    nome: 'Grande rota',
    plural: 'Grandes rotas',
    linha: '#8E2433',
    marca: ['#FFFFFF', '#C8281E'],
    nota: 'Percurso de mais de 30 km, de vários dias, com código GR do registo nacional.',
  },
  PR: {
    nome: 'Pequena rota',
    plural: 'Pequenas rotas',
    linha: '#B03A0B',
    marca: ['#F2C230', '#C8281E'],
    nota: 'Percurso de um dia, com código PR do registo nacional.',
  },
  outro: {
    nome: 'Outro percurso',
    plural: 'Outros percursos',
    linha: '#3A4F4A',
    marca: null,
    nota: 'Percurso interpretativo ou local, sem código do registo nacional.',
  },
}

export const FAMILIA_ORDEM: Familia[] = ['GR', 'PR', 'outro']

/**
 * A ficha que se mostra, venha do guia da CIM ou do Turismo Centro.
 * O guia traz mais (altitudes, época, as quatro escalas MIDE); o Turismo
 * Centro traz a dificuldade na escala de cada câmara, como texto.
 */
export interface Declarada {
  origem: 'guia' | 'tc'
  nome: string
  extensaoKm: number
  duracaoMin: number | null
  desnivel: string | null
  altitude: { max: number; min: number } | null
  tipo: 'Circular' | 'Linear' | null
  epoca: string | null
  mide: Dificuldade | null
  dificuldade: string | null
  pagina: number | null
}

const deGuia = (g: FichaGuia): Declarada => ({
  origem: 'guia',
  nome: g.nome,
  extensaoKm: g.extensaoKm,
  duracaoMin: g.duracaoMin,
  desnivel: g.desnivel,
  altitude: g.altitude,
  tipo: g.tipo,
  epoca: g.epoca,
  mide: g.dificuldade,
  dificuldade: null,
  pagina: g.pagina,
})

const deTC = (f: FichaTC): Declarada => ({
  origem: 'tc',
  nome: f.nome,
  extensaoKm: f.extensaoKm,
  duracaoMin: f.duracaoMin,
  desnivel: f.desnivel,
  altitude: null,
  tipo: f.tipo,
  epoca: null,
  mide: null,
  dificuldade: f.dificuldade,
  pagina: null,
})

export interface Trilho extends TrilhoDados {
  familia: Familia
  /** O nome a mostrar: o do guia quando há ficha, senão o da fonte. */
  titulo: string
  ficha: string | null
  guia: FichaGuia | null
  /** A ficha a mostrar: a do guia, ou, sem ela, a do Turismo Centro. */
  declarada: Declarada | null
  /**
   * Quando o traçado e a ficha discordam na extensão em mais de 20 %, a
   * ficha descreve outra versão do percurso. Não se esconde nenhum dos
   * dois: mostra-se a diferença.
   */
  divergencia: { medidoKm: number; guiaKm: number } | null
}

const fichas = new Map(GUIA_FICHAS.map((f) => [f.id, f]))
const fichasTC = new Map(FICHAS_TC.filter((f) => f.codigo).map((f) => [f.codigo!, f]))

export const TRILHOS: Trilho[] = TRILHOS_DADOS.map((t) => {
  const guia = t.ficha ? (fichas.get(t.ficha) ?? null) : null
  const familia: Familia = t.tipo === 'GR' ? 'GR' : t.tipo === 'PR' ? 'PR' : 'outro'
  const tc = !guia && t.codigo ? (fichasTC.get(t.codigo) ?? null) : null
  const declarada = guia ? deGuia(guia) : tc ? deTC(tc) : null
  const diverge = declarada && !t.troco && Math.abs(t.distanciaKm / declarada.extensaoKm - 1) > 0.2
  return {
    ...t,
    familia,
    titulo: guia?.nome ?? t.nome,
    guia,
    declarada,
    divergencia: diverge ? { medidoKm: t.distanciaKm, guiaKm: declarada.extensaoKm } : null,
  }
})

export const TRILHO_POR_ID = new Map(TRILHOS.map((t) => [t.id, t]))

/** Quilómetros de traçado no mapa. */
export const TOTAL_KM = TRILHOS.reduce((s, t) => s + t.distanciaKm, 0)
export const COM_FICHA = TRILHOS.filter((t) => t.declarada)

// ── Filtros ────────────────────────────────────────────────────────────

export type Extensao = 'curto' | 'medio' | 'longo'

export const EXTENSOES: Record<Extensao, { nome: string; teste: (km: number) => boolean }> = {
  curto: { nome: 'Até 6 km', teste: (km) => km <= 6 },
  medio: { nome: '6 a 15 km', teste: (km) => km > 6 && km <= 15 },
  longo: { nome: 'Mais de 15 km', teste: (km) => km > 15 },
}

export interface Filtros {
  familias: Familia[]
  extensao: Extensao | null
  circular: boolean
  soFicha: boolean
}

export const FILTROS_INICIAIS: Filtros = { familias: ['GR', 'PR', 'outro'], extensao: null, circular: false, soFicha: false }

export function passa(t: Trilho, f: Filtros): boolean {
  if (!f.familias.includes(t.familia)) return false
  if (f.extensao && !EXTENSOES[f.extensao].teste(t.distanciaKm)) return false
  if (f.circular && forma(t) !== 'Circular') return false
  if (f.soFicha && !t.declarada) return false
  return true
}

// ── Escrita ────────────────────────────────────────────────────────────

export const km = (v: number) => `${fmt(v, v < 10 ? 1 : v < 100 ? 1 : 0)} km`

/** 405 → "6 h 45"; 30 → "30 min". */
export function duracao(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`
}

/** Circular ou linear: a ficha manda; sem ela, a geometria. */
export function forma(t: Trilho): 'Circular' | 'Linear' {
  return t.declarada?.tipo ?? (t.circular ? 'Circular' : 'Linear')
}

/** Onde conferir o traçado na fonte. */
export function ligacaoFonte(t: Trilho): { href: string; texto: string } | null {
  if (t.fonte === 'osm') return { href: `https://www.openstreetmap.org/${t.fonteRef}`, texto: 'Traçado no OpenStreetMap' }
  // Os traçados das câmaras não levam ligação: a página é informativa.
  if (t.fonte === 'camara' || t.fonte === 'ficheiro') return null
  return { href: 'https://geocatalogo.icnf.pt/', texto: 'Traçado do ICNF' }
}

// ── Proveniência ───────────────────────────────────────────────────────

export const TRILHOS_META: Sourced = published(
  'Câmaras municipais · OpenStreetMap · ICNF · Copernicus DEM · CIM Região de Coimbra · Turismo Centro de Portugal',
  `Traçados de ${TRILHOS_OBTIDOS_EM.slice(0, 7).split('-').reverse().join('/')}`,
  'Distância medida no traçado; altitudes e desnível medidos sobre o modelo Copernicus de 30 m, que é de superfície e ' +
    'pode somar copas em mata cerrada. Duração, dificuldade e época vêm só das fichas publicadas (guia da CIM, Turismo Centro); não se calculam. ' +
    'Os códigos PR e GR são os do registo nacional da FCMP, que não publica quais estão homologados.',
  // Sem instante: é uma extracção datada, e o selo diria "há 14 h" como se
  // fosse uma medição de hoje. A data vai no rótulo.
  null,
)

export const REDE_META: Sourced = published(
  `${GUIA_FONTE} · Turismo Centro de Portugal`,
  `Guia de ${GUIA_DATA.slice(0, 4)} · Turismo Centro, 09/2026`,
  'Fichas transcritas tal como publicadas.',
)

export const GUIA_META: Sourced = published(GUIA_FONTE, `Guia de ${GUIA_DATA.slice(0, 4)}`, 'Fichas transcritas do guia, tal como impressas.')
