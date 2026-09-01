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
 * `plate` escolhe o desenho de marcação de imagem enquanto não houver
 * fotografia; quando houver, entra no lugar dele.
 */

export type PlateKind =
  | 'biblioteca'
  | 'torre'
  | 'catedral'
  | 'estufa'
  | 'ruina'
  | 'arco'
  | 'fonte'
  | 'miniatura'

export interface Attraction {
  id: string
  name: string
  /** Uma linha. O que é e porque vale a pena. */
  blurb: string
  /** Facto curto e estável — data, classificação, quem gere. */
  fact: string
  plate: PlateKind
  /** Sítio oficial onde estão horários e bilhetes. */
  href: string
  hrefLabel: string
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'joanina',
    name: 'Biblioteca Joanina',
    blurb:
      'A biblioteca barroca do Paço das Escolas, com as suas três salas em enfiada e o tecto pintado que dá profundidade a uma sala que não a tem.',
    fact: 'Concluída em 1728 · na área classificada pela UNESCO',
    plate: 'biblioteca',
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'paco-escolas',
    name: 'Paço das Escolas',
    blurb:
      'O pátio da universidade antiga, com a Via Latina, a Sala dos Capelos e a torre de onde se vê a cidade toda e o vale do Mondego.',
    fact: 'Universidade de Coimbra · Património Mundial desde 2013',
    plate: 'torre',
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'se-velha',
    name: 'Sé Velha',
    blurb:
      'Catedral românica da cidade alta, construída quando Coimbra era capital do reino. Por fora parece uma fortaleza — e era mesmo essa a ideia.',
    fact: 'Século XII · Monumento Nacional',
    plate: 'catedral',
    href: 'https://www.turismodecoimbra.pt',
    hrefLabel: 'Turismo de Coimbra',
  },
  {
    id: 'jardim-botanico',
    name: 'Jardim Botânico',
    blurb:
      'Vinte hectares em socalcos descendo para o vale, com estufas, bambual e o arboreto. A entrada no jardim exterior é livre.',
    fact: 'Fundado em 1772 · gerido pela Universidade de Coimbra',
    plate: 'estufa',
    href: 'https://visit.uc.pt',
    hrefLabel: 'Visitas da Universidade',
  },
  {
    id: 'santa-clara-velha',
    name: 'Mosteiro de Santa Clara-a-Velha',
    blurb:
      'O mosteiro gótico que o Mondego inundou durante séculos e que foi recuperado do lodo. Tem centro interpretativo com as peças que as escavações devolveram.',
    fact: 'Século XIV · na margem esquerda',
    plate: 'ruina',
    href: 'https://www.turismodecoimbra.pt',
    hrefLabel: 'Turismo de Coimbra',
  },
  {
    id: 'aqueduto',
    name: 'Aqueduto de São Sebastião',
    blurb:
      'Os vinte e um arcos que ladeiam a entrada do Jardim Botânico, construídos sobre o traçado de um aqueduto romano anterior.',
    fact: 'Século XVI',
    plate: 'arco',
    href: 'https://www.turismodecoimbra.pt',
    hrefLabel: 'Turismo de Coimbra',
  },
  {
    id: 'quinta-lagrimas',
    name: 'Quinta das Lágrimas',
    blurb:
      'Os jardins históricos onde a lenda situa o encontro e a morte de Inês de Castro, com a Fonte dos Amores e o jardim medieval.',
    fact: 'Margem esquerda · jardins históricos',
    plate: 'fonte',
    href: 'https://www.turismodecoimbra.pt',
    hrefLabel: 'Turismo de Coimbra',
  },
  {
    id: 'pequenitos',
    name: 'Portugal dos Pequenitos',
    blurb:
      'O país em miniatura, com as casas regionais e os monumentos à escala de uma criança. É o sítio da cidade que os miúdos escolhem.',
    fact: 'Margem esquerda, junto à Quinta das Lágrimas',
    plate: 'miniatura',
    href: 'https://www.portugaldospequenitos.pt',
    hrefLabel: 'Sítio oficial',
  },
]

/**
 * Ordem de um dia a pé pela cidade alta e pela margem esquerda.
 *
 * É a ordem, não o horário: os minutos entre paragens dependem de quem
 * caminha e das escadas que apanha pelo caminho, e não estão medidos.
 */
export const WALKING_ROUTE: { id: string; note: string }[] = [
  { id: 'se-velha', note: 'Começar pela cidade alta, a subir da Baixa' },
  { id: 'paco-escolas', note: 'Subida até ao pátio da universidade' },
  { id: 'joanina', note: 'Dentro do Paço das Escolas' },
  { id: 'aqueduto', note: 'Descida pela Alta, a caminho do jardim' },
  { id: 'jardim-botanico', note: 'Pausa longa, se o dia estiver bom' },
  { id: 'santa-clara-velha', note: 'Atravessar o Mondego para a margem esquerda' },
  { id: 'quinta-lagrimas', note: 'A poucos minutos do mosteiro' },
  { id: 'pequenitos', note: 'Fim da tarde, sobretudo com crianças' },
]
