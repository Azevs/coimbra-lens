/**
 * Lugares para visitar.
 *
 * Conteúdo editorial, não série de dados: o que aqui está são factos
 * estáveis (o que o lugar é, de quando é), não medições. Por isso não tem
 * `Sourced` nem entra no manifesto de frescura.
 *
 * O que deliberadamente NÃO está aqui: horários e preços. Mudam com a época
 * e não há fonte aberta que os publique de forma fiável — cada ficha manda
 * para o sítio oficial, que os tem sempre certos. Escrevê-los aqui seria
 * garantir que um dia estariam errados.
 *
 * As posições vêm do OpenStreetMap (`osm` diz de que elemento): é por elas
 * que o mapa do roteiro se desenha. `plate` escolhe o desenho da ficha
 * enquanto não houver fotografia; `em3d` liga a ficha à maqueta do lugar,
 * quando existe (`lib/monumentos.ts`).
 */

import { GREEN_SPACES } from '@/lib/green-spaces'

/**
 * A área do Botânico é a que a página das Zonas verdes mede no polígono.
 * Esteve aqui escrito "vinte hectares", que não batia com a medição nem
 * com os treze que a Universidade indica; lida do mesmo sítio, as duas
 * páginas não voltam a contradizer-se.
 */
const BOTANICO_HA = GREEN_SPACES.find((s) => s.id === 'jardim-botanico-da-universidade-de-coimbra')?.areaHa

export type PlateKind =
  | 'biblioteca'
  | 'torre'
  | 'catedral'
  | 'estufa'
  | 'ruina'
  | 'arco'
  | 'fonte'
  | 'miniatura'
  | 'mosteiro'
  | 'museu'

/**
 * As três partes da cidade que um visitante atravessa. Não são freguesias
 * nem têm fronteira oficial — são o nome que a cidade usa, e é só para
 * arrumar as fichas.
 */
export type Area = 'baixa' | 'alta' | 'margem'

export const AREAS: Record<Area, { nome: string; frase: string }> = {
  baixa: { nome: 'A Baixa', frase: 'Entre o rio e a colina, onde a cidade faz a vida de todos os dias.' },
  alta: { nome: 'A Alta', frase: 'A colina da universidade, com a Sé a meio da subida e o jardim na encosta.' },
  margem: { nome: 'A margem esquerda', frase: 'Do outro lado da ponte, onde se vê a Alta inteira.' },
}

export interface Attraction {
  id: string
  name: string
  area: Area
  /** Uma linha. O que é e porque vale a pena. */
  blurb: string
  /** Facto curto e estável — data, classificação, quem gere. */
  fact: string
  plate: PlateKind
  /** [lat, lon], do elemento `osm`. */
  pos: [number, number]
  osm: string
  /** Id da maqueta 3D em `lib/monumentos.ts`, se houver. */
  em3d?: string
  /** Outra página do site que conta mais deste lugar. */
  mais?: { href: string; label: string }
  /** Sítio oficial onde estão horários e bilhetes. */
  href: string
  hrefLabel: string
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'santa-cruz',
    name: 'Mosteiro de Santa Cruz',
    area: 'baixa',
    blurb:
      'Na Praça 8 de Maio, o mosteiro onde estão sepultados os dois primeiros reis de Portugal, D. Afonso Henriques e D. Sancho I. Por isso é Panteão Nacional.',
    fact: 'Fundado em 1131 · Panteão Nacional desde 2003',
    plate: 'mosteiro',
    pos: [40.21121, -8.42831],
    osm: 'relation/2962560',
    em3d: 'santa-cruz',
    mais: { href: '/zonas-urbanas/baixa', label: 'A Baixa em maqueta' },
    href: 'https://www.cm-coimbra.pt/areas/visitar/ver-e-fazer/monumentos/igreja-de-santa-cruz-panteao-nacional',
    hrefLabel: 'Câmara Municipal de Coimbra',
  },
  {
    id: 'se-velha',
    name: 'Sé Velha',
    area: 'alta',
    blurb:
      'Catedral românica a meio da subida para a Alta, construída quando Coimbra era capital do reino. Por fora parece uma fortaleza, com ameias a toda a volta.',
    fact: 'Primeira pedra em 1162 · Monumento Nacional',
    plate: 'catedral',
    pos: [40.20877, -8.42699],
    osm: 'way/41222810',
    em3d: 'se-velha',
    href: 'http://sevelha-coimbra.org/',
    hrefLabel: 'Sítio da Sé Velha',
  },
  {
    id: 'machado-castro',
    name: 'Museu Nacional de Machado de Castro',
    area: 'alta',
    blurb:
      'O antigo Paço Episcopal, assente sobre o criptopórtico romano que segurava o fórum de Aeminium. As galerias de pedra por baixo do museu visitam-se.',
    fact: 'Fundado em 1911 · sobre o fórum romano',
    plate: 'museu',
    pos: [40.20906, -8.42569],
    osm: 'relation/2334829',
    mais: { href: '/historia', label: 'A história de Aeminium' },
    href: 'https://www.museusemonumentos.pt/pt/museus-e-monumentos/museu-nacional-de-machado-de-castro',
    hrefLabel: 'Museus e Monumentos de Portugal',
  },
  {
    id: 'paco-escolas',
    name: 'Paço das Escolas',
    area: 'alta',
    blurb:
      'O pátio da universidade antiga, no lugar do palácio real: a Porta Férrea, a Via Latina, a Sala dos Capelos, a capela e a torre de onde se vê o vale do Mondego inteiro.',
    fact: 'Universidade de Coimbra · Património Mundial desde 2013',
    plate: 'torre',
    pos: [40.20739, -8.426],
    osm: 'way/201710790',
    em3d: 'paco-das-escolas',
    mais: { href: '/turismo', label: 'Quem visita Coimbra' },
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'joanina',
    name: 'Biblioteca Joanina',
    area: 'alta',
    blurb:
      'A biblioteca barroca do Paço das Escolas: três salas em enfiada, forradas de estantes douradas. Duas colónias de morcegos vivem lá dentro e comem os insectos que comeriam os livros.',
    fact: 'Construída entre 1717 e 1728, no reinado de D. João V',
    plate: 'biblioteca',
    pos: [40.20713, -8.42652],
    osm: 'way/51293313',
    em3d: 'paco-das-escolas',
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'aqueduto',
    name: 'Aqueduto de São Sebastião',
    area: 'alta',
    blurb:
      'Os arcos que ladeiam a entrada do Jardim Botânico, construídos sobre o traçado de um aqueduto romano anterior.',
    fact: 'Século XVI',
    plate: 'arco',
    pos: [40.20684, -8.42069],
    osm: 'way/112265805',
    href: 'https://www.cm-coimbra.pt/areas/visitar/ver-e-fazer/monumentos/aqueduto-de-sao-sebastiao',
    hrefLabel: 'Câmara Municipal de Coimbra',
  },
  {
    id: 'jardim-botanico',
    name: 'Jardim Botânico',
    area: 'alta',
    blurb:
      `Um jardim ${BOTANICO_HA ? `de ${Math.round(BOTANICO_HA)} hectares ` : ''}em socalcos a descer para o vale, ` +
      'com estufas, bambual e o arboreto. A entrada no jardim exterior é livre.',
    fact: 'Fundado em 1772 · gerido pela Universidade de Coimbra',
    plate: 'estufa',
    pos: [40.20353, -8.42352],
    osm: 'way/22965909',
    mais: { href: '/zonas-verdes', label: 'Zonas verdes da cidade' },
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'santa-clara-velha',
    name: 'Mosteiro de Santa Clara-a-Velha',
    area: 'margem',
    blurb:
      'O mosteiro gótico que o Mondego inundou durante séculos e que foi recuperado do lodo. Tem centro interpretativo com as peças que as escavações devolveram.',
    fact: 'Século XIV',
    plate: 'ruina',
    pos: [40.20253, -8.43324],
    osm: 'way/1221650693',
    href: 'https://www.patrimoniocultural.gov.pt/mosteiro-de-santa-clara-a-velha/',
    hrefLabel: 'Património Cultural',
  },
  {
    id: 'quinta-lagrimas',
    name: 'Quinta das Lágrimas',
    area: 'margem',
    blurb:
      'Os jardins históricos onde a lenda situa o encontro e a morte de Inês de Castro, com a Fonte dos Amores e a Fonte das Lágrimas.',
    fact: 'Jardins históricos · geridos pela Fundação Inês de Castro',
    plate: 'fonte',
    pos: [40.19761, -8.43537],
    osm: 'way/1065993729',
    href: 'https://fundacaoinesdecastro.com/jardim/',
    hrefLabel: 'Fundação Inês de Castro',
  },
  {
    id: 'pequenitos',
    name: 'Portugal dos Pequenitos',
    area: 'margem',
    blurb:
      'O país em miniatura, com as casas regionais e os monumentos à escala de uma criança. É o sítio da cidade que os miúdos escolhem.',
    fact: 'Junto a Santa Clara-a-Velha',
    plate: 'miniatura',
    pos: [40.20165, -8.43401],
    osm: 'way/57764537',
    href: 'https://www.portugaldospequenitos.pt',
    hrefLabel: 'Sítio oficial',
  },
]

export const attractionById = (id: string) => ATTRACTIONS.find((a) => a.id === id)

/**
 * Um dia a pé, em três tempos: subir da Baixa à Alta de manhã, descer pelo
 * jardim, atravessar o rio à tarde.
 *
 * É a ordem, não o horário: os minutos entre paragens dependem de quem
 * caminha e das escadas que apanha pelo caminho, e não estão medidos.
 */
export const WALKING_ROUTE: { tempo: string; titulo: string; paragens: { id: string; note: string }[] }[] = [
  {
    tempo: 'Manhã',
    titulo: 'Subir à Alta',
    paragens: [
      { id: 'santa-cruz', note: 'Começar cá em baixo, junto ao primeiro rei' },
      { id: 'se-velha', note: 'Pelo Arco de Almedina e as escadas, a subir' },
      { id: 'machado-castro', note: 'Logo acima da Sé; descer ao criptopórtico' },
      { id: 'paco-escolas', note: 'O alto da colina, pela Porta Férrea' },
      { id: 'joanina', note: 'No mesmo pátio, com bilhete das visitas da universidade' },
    ],
  },
  {
    tempo: 'Meio do dia',
    titulo: 'Descer pelo jardim',
    paragens: [
      { id: 'aqueduto', note: 'A nascente da Alta, à porta do jardim' },
      { id: 'jardim-botanico', note: 'Pausa longa, se o dia estiver bom' },
    ],
  },
  {
    tempo: 'Tarde',
    titulo: 'Atravessar o rio',
    paragens: [
      { id: 'santa-clara-velha', note: 'Pela Ponte de Santa Clara, já na outra margem' },
      { id: 'pequenitos', note: 'Ao lado do mosteiro, sobretudo com crianças' },
      { id: 'quinta-lagrimas', note: 'Para acabar o dia nos jardins' },
    ],
  },
]
