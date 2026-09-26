/**
 * As missões que existem, pela ordem em que aparecem na página. Só texto e o
 * import de cada uma: a página de missões lê isto sem descarregar o three.js.
 */
import type { Missao } from './tipos'

export interface Ficha {
  id: string
  nome: string
  /** Por baixo do título, no ecrã de início da missão. */
  subtitulo: string
  /** Onde se passa, no cartão da página de missões. */
  lugar: string
  /** Duas linhas para o cartão. */
  resumo: string
  /** O briefing do ecrã de início (HTML). */
  briefingHtml: string
  /** O nível em `public/niveis/<nivel>.json`. */
  nivel: string
  /** A marca no mapa da página, no sítio real. */
  marca: { lat: number; lon: number }
  carregar: () => Promise<{ default: Missao }>
}

export const MISSOES: Ficha[] = [
  {
    id: 'serenata',
    nome: 'Operação Serenata',
    subtitulo: 'Coimbra, véspera da Serenata Monumental',
    lugar: 'Do Arco de Almedina à Sé Velha',
    resumo: 'Os Borrões fecharam o fadista no claustro da Sé Velha. Sobe o Quebra-Costas e trá-lo de volta antes da meia-noite.',
    briefingHtml: `<p>Os <b>Borrões</b> raptaram o fadista e fecharam-no no <b>claustro da Sé Velha</b>. À meia-noite ele tem de estar a cantar nas escadas da Sé.</p>
    <p>Entra pelo <b>Arco de Almedina</b>, sobe o <b>Quebra-Costas</b>, solta-o e trá-lo de volta.</p>`,
    nivel: 'serenata',
    marca: { lat: 40.208785, lon: -8.426948 }, // a Sé Velha
    carregar: () => import('./serenata'),
  },
  {
    id: 'cabra',
    nome: 'A Cabra não toca',
    subtitulo: 'Coimbra, antes do amanhecer',
    lugar: 'Paço das Escolas',
    resumo: 'Os Borrões tomaram a Torre da Universidade e amarraram a Cabra. Entra pela Porta Férrea, sobe a torre e fá-la tocar.',
    briefingHtml: `<p>Os <b>Borrões</b> tomaram a <b>Torre da Universidade</b> e amarraram a <b>Cabra</b>, o sino da torre. A Central quer ouvi-la.</p>
    <p>Sobe a <b>Rua Larga</b>, entra no Paço pela <b>Porta Férrea</b>, sobe a torre, solta o badalo e toca-a três vezes. Depois aguenta-te lá em cima.</p>`,
    nivel: 'cabra',
    marca: { lat: 40.2078, lon: -8.42648 }, // a Torre
    carregar: () => import('./cabra'),
  },
  {
    id: 'becos',
    nome: 'Becos da Baixa',
    subtitulo: 'Coimbra, fim de tarde na Baixa',
    lugar: 'Da Praça 8 de Maio ao rio',
    resumo: 'Um Borrão roubou as pastas com as fitas dos finalistas e foge pelos becos para um barco no rio. Apanha-o antes que embarque.',
    briefingHtml: `<p>Um Borrão, <b>o Estafeta</b>, roubou as pastas com as <b>fitas dos finalistas</b>. Foge da <b>Praça 8 de Maio</b> para o rio, onde tem um barco à espera.</p>
    <p>Vai atrás dele pelos <b>becos da Baixa</b>: há sempre outro caminho. <b>Não o mates</b>: atira-lhe às pernas até ele cair, recupera as fitas e leva-as ao <b>Largo da Portagem</b>.</p>`,
    nivel: 'becos',
    marca: { lat: 40.20912, lon: -8.43052 }, // o Terreiro do Mendonça, no meio dos becos
    carregar: () => import('./becos'),
  },
]

export const fichaDe = (id: string | null) => MISSOES.find((m) => m.id === id) ?? null

// ------------------------------------------------ missões cumpridas --
// Só neste browser. Sem localStorage (bloqueado, janela privada) a página funciona na mesma.
const CHAVE = 'tinta-na-alta:cumpridas'

export function cumpridas(): Set<string> {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) ?? '[]')
    return new Set(Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [])
  } catch {
    return new Set()
  }
}

export function marcarCumprida(id: string) {
  try {
    const c = cumpridas()
    c.add(id)
    localStorage.setItem(CHAVE, JSON.stringify([...c]))
  } catch { /* fica por marcar */ }
}
