/**
 * Fichas do Turismo Centro de Portugal, transcritas.
 *
 * O artigo "Percursos pedestres na Região de Coimbra" da entidade regional
 * de turismo junta, concelho a concelho, o que cada câmara declara dos seus
 * percursos: distância, desnível, duração e dificuldade. Cobre muitos que o
 * guia da CIM só nomeia (a rede da Lousã, os PR de Arganil, Pampilhosa,
 * Penacova, Tábua, Mira) e é por isso a segunda fonte de fichas. Quando um
 * percurso tem ficha no guia, vale a do guia.
 *
 * Transcrito à mão, tal como publicado — incluindo as escalas de
 * dificuldade, que cada câmara escreve à sua maneira ("3 – Médio", "IV
 * difícil", "1 e 3"). Não se convertem numa escala comum: seria inventar a
 * equivalência. O que o artigo deixa em branco fica null.
 *
 * Os códigos seguem a forma sinalizada (PR3 PCV), mesmo quando o artigo os
 * escreve colados ou sem concelho.
 */

export const TC_URL = 'https://turismodocentro.pt/artigo/percursos-pedestres-na-regiao-de-coimbra/'
/** Consultado a 26/09/2026. */
export const TC_DATA = '2026-09'

export interface FichaTC {
  id: string
  codigo: string | null
  nome: string
  concelho: string
  extensaoKm: number
  duracaoMin: number | null
  /** Como publicado. */
  desnivel: string | null
  tipo: 'Circular' | 'Linear' | null
  /** Como publicada — cada câmara usa a sua escala. */
  dificuldade: string | null
}

type Linha = [string | null, string, string, number, number | null, string | null, 'Circular' | 'Linear' | null, string | null]

const LINHAS: Linha[] = [
  // Arganil
  ['PR1 AGN', 'Caminho do Xisto de Benfeita', 'Arganil', 10.4, 300, '576 m', 'Circular', null],
  ['PR2 AGN', 'Os Povos das Ribeiras de Piodam', 'Arganil', 10, 280, '751 m', 'Circular', null],
  ['PR3 AGN', 'Açor', 'Arganil', 8.7, 230, '649 m', 'Circular', null],
  ['PR4 AGN', 'Caminho do Xisto de Vila Cova de Alva', 'Arganil', 8.5, 120, '424 m', null, 'Moderada'],
  ['PR5 AGN', 'Entre o Alva e a Ribeira da Mata', 'Arganil', 11.6, 150, null, null, null],
  ['GR21.1', 'Grande Rota das Aldeias do Xisto', 'Arganil', 35.5, 540, null, 'Linear', null],
  ['GR51', 'Grande Rota do Alva', 'Arganil', 77, 1290, '+ 1042 / − 1293 m', 'Linear', null],
  // Cantanhede
  ['PR4 CNT', 'Rota das Areias Douradas', 'Cantanhede', 5.9, 140, '27 m', 'Circular', 'Tipo de piso 1'],
  // Coimbra
  ['PR4 CBR', 'Rota da Tecelagem', 'Coimbra', 8.6, 184, '+ 170 m', 'Circular', 'II'],
  ['PR5 CBR', 'Rota Bio-Reserva Sr.ª da Alegria', 'Coimbra', 5.4, 113, '+ 100 m', 'Circular', 'I'],
  ['PR6 CBR', 'Rota da Torre de Bera', 'Coimbra', 2.7, 111, '+ 93 m', 'Linear', 'I'],
  ['GR48', 'Grande Rota do Mondego', 'Coimbra', 150.9, null, null, 'Linear', null],
  ['CNE', 'Caminho Natural da Espiritualidade', 'Coimbra', 67, null, null, 'Linear', null],
  // Figueira da Foz
  [null, 'Rota das Fontes de Maiorca', 'Figueira da Foz', 8.8, 120, '207 m', null, '2'],
  // Lousã
  ['PR1 LSA', 'Rota dos Moinhos', 'Lousã', 5.3, 120, '342 m', 'Circular', '2 – Fácil'],
  ['PR2 LSA', 'Rota das Aldeias do Xisto', 'Lousã', 5.7, 210, '616 m', 'Circular', '3 – Médio'],
  ['PR3 LSA', 'Rota da Levada', 'Lousã', 10.8, 285, '997 m', 'Circular', '3 – Médio'],
  ['PR4 LSA', 'Rota do Trevim', 'Lousã', 14.5, 345, '982 m', 'Circular', '4 – Difícil'],
  ['PR5 LSA', 'Bosques do Catarredor', 'Lousã', 6.4, 210, '632 m', 'Circular', '4 – Difícil'],
  ['PR6 LSA', 'Trilho dos Moleiros', 'Lousã', 5.4, 195, '615 m', 'Linear', '4 – Difícil'],
  ['PR7 LSA', 'À Descoberta da Floresta', 'Lousã', 7, 150, '350 m', 'Circular', '1 – Muito fácil'],
  ['PR8 LSA', 'Rota do Marigo', 'Lousã', 1.8, 80, '189 m', 'Circular', '4 – Difícil'],
  ['PR9 LSA', 'Mata do Sobral', 'Lousã', 7.65, 165, '222 m', 'Circular', '2 – Fácil'],
  ['PR10 LSA', 'Da Senhora da Graça à Epigenia do Ceira', 'Lousã', 3.6, 75, '139 m', 'Linear', '1 – Muito fácil'],
  // Mealhada
  ['PR1 MLD', 'Luso-Bussaco 360', 'Mealhada', 12.18, 200, '483 m', 'Circular', null],
  // Mira
  ['PR2 MIR', 'Rota dos Moinhos', 'Mira', 8.5, 150, null, null, 'Fácil'],
  ['PR3 MIR', 'Rota da Vala Real', 'Mira', 4.4, 60, null, null, 'Fácil'],
  ['PR5 MIR', 'Rota das Dunas', 'Mira', 17.5, 270, null, null, 'Médio'],
  ['PR6 MIR', 'Rota do Pinhal', 'Mira', 3.65, 55, null, null, 'Fácil'],
  // Miranda do Corvo
  ['PR1 MCV', 'Caminho do Xisto Acessível de Gondramaz', 'Miranda do Corvo', 0.45, 15, null, 'Linear', 'Muito fácil'],
  ['PR2 MCV', 'Caminho do Xisto do Gondramaz', 'Miranda do Corvo', 5.6, 160, '85 m', null, 'Difícil'],
  // Pampilhosa da Serra
  ['PR1 PPS', 'Caminho do Xisto de Fajão — Subida aos Penedos', 'Pampilhosa da Serra', 4.1, 150, '318 m', 'Circular', '2 e 3'],
  ['PR2 PPS', 'Caminho do Xisto de Fajão — Voltinhas do Ceira', 'Pampilhosa da Serra', 6.5, 150, '335 m', 'Circular', '2'],
  ['PR3 PPS', 'Caminho do Xisto da Barragem de Santa Luzia', 'Pampilhosa da Serra', 9.7, 200, '381 m', 'Circular', '1 e 3'],
  ['PR4 PPS', 'Caminho do Xisto de Janeiro de Baixo', 'Pampilhosa da Serra', 9.7, 195, '422 m', 'Circular', '2 e 3'],
  ['PR5 PPS', 'Caminho do Xisto de Pessegueiro', 'Pampilhosa da Serra', 3.8, 75, '131 m', 'Circular', '1 e 2'],
  ['PR6 PPS', 'Caminho do Xisto de Porto de Vacas', 'Pampilhosa da Serra', 7, 120, '144 m', 'Circular', '1 e 2'],
  ['PR7 PPS', 'Caminho do Xisto de Pampilhosa da Serra', 'Pampilhosa da Serra', 7.2, 180, '363 m', 'Circular', '1, 2 e 3'],
  ['PR9 PPS', 'Rota do Velho Unhais', 'Pampilhosa da Serra', 17.8, 280, '477 m e 540 m', 'Linear', '1, 2 e 3'],
  // Penacova
  ['PR1 PCV', 'Penacova e o Rio Mondego', 'Penacova', 6, 150, '355 m', 'Circular', 'Média (nível III)'],
  ['PR2 PCV', 'Na Rota dos Moinhos do Buçaco', 'Penacova', 10.5, 210, '570 m', 'Circular', 'Difícil (nível IV)'],
  ['PR3 PCV', 'Rota do Alva', 'Penacova', 12.3, 300, '550 m', 'Circular', 'Difícil (nível IV)'],
  ['PR4 PCV', 'Ribeira de Arcos', 'Penacova', 13, 300, '875 m', 'Circular', 'Difícil (nível IV)'],
  ['PR5 PCV', 'Livraria do Mondego', 'Penacova', 11.7, 240, '444 m', 'Circular', 'Difícil (nível IV)'],
  // Soure
  [null, 'Eco-Trilho da EB de Soure', 'Soure', 5.35, 120, '51 m', 'Circular', 'Fácil'],
  // Tábua
  ['PR1 TBU', 'Caminho do Xisto de Midões', 'Tábua', 13, 230, '290 m', 'Circular', 'IV difícil'],
  ['PR2 TBU', 'Caminho do Xisto de Sevilha', 'Tábua', 11, 210, '270 m', 'Circular', 'IV difícil'],
  ['PR4 TBU', 'Trilho dos Gaios', 'Tábua', 17.3, 330, '+ 425 / − 245 m', 'Linear', 'IV difícil'],
]

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const FICHAS_TC: FichaTC[] = LINHAS.map(([codigo, nome, concelho, extensaoKm, duracaoMin, desnivel, tipo, dificuldade]) => ({
  id: `tc-${slug(codigo ?? nome)}`,
  codigo,
  nome,
  concelho,
  extensaoKm,
  duracaoMin,
  desnivel,
  tipo,
  dificuldade,
}))
