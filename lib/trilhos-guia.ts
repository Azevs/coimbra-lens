/**
 * O Guia de Percursos Pedestres da CIM Região de Coimbra, transcrito.
 *
 * O guia ("Caminhos da Região de Coimbra", CIM, 2021) é a única fonte
 * oficial que junta, para a região inteira, a ficha de cada percurso:
 * extensão, duração, desnível, altitudes, tipo, época e dificuldade. Não
 * existe em formato aberto — é um PDF de 84 páginas — e por isso as fichas
 * foram lidas à mão, página a página, e escritas aqui tal como estão
 * impressas. `pagina` é o número impresso no índice do guia.
 *
 * O que NÃO se fez:
 *
 *   · Corrigir o guia. Há fichas estranhas — o Ribeirinho declara "+ 3,7 m"
 *     de desnível entre os 23 e os 78 m de altitude, e os Arrozais e a Rota
 *     das Aves têm exactamente as mesmas altitudes (90 / 0,6 m). Ficam como
 *     estão, porque a alternativa era substituir um número publicado por um
 *     palpite nosso. O desnível vai em texto, tal como impresso, pela mesma
 *     razão: "- 261 m" num linear que só desce diz outra coisa que "261 m".
 *
 *   · Resumir a dificuldade numa nota. O guia usa quatro escalas de 1 a 5
 *     (tipo de piso, esforço físico, adversidade do meio, orientação), à
 *     maneira do MIDE, e não publica nota global. Uma média nossa seria uma
 *     classificação que ninguém fez. A leitura das quatro foi confirmada
 *     contra a página desenhada: o número fica por cima do seu rótulo.
 *
 * O guia descreve em ficha só os percursos do projecto de valorização da
 * CIM; o resto da rede aparece no índice, sem dados — é o `GUIA_REDE`.
 *
 * Códigos: o guia escreve o de Condeixa como CND no índice e CDN no mapa, e
 * o de Vila Nova de Poiares como PRS no índice e VNP no mapa. Usa-se o do
 * mapa, que é o que está sinalizado no terreno e no OpenStreetMap.
 */

export const GUIA_URL = 'https://visitregiaodecoimbra.pt/turismo-de-natureza/guia-de-percursos-pedestres/'
export const GUIA_FONTE = 'CIM Região de Coimbra · Guia de Percursos Pedestres'
/** Lançamento do guia (Maio de 2021). */
export const GUIA_DATA = '2021-05'

/** As quatro escalas do guia, de 1 (mais fácil) a 5. */
export interface Dificuldade {
  piso: number
  esforco: number
  adversidade: number
  orientacao: number
}

export interface FichaGuia {
  id: string
  /** Código tal como sinalizado (PR3 FIG), ou null nos interpretativos. */
  codigo: string | null
  nome: string
  concelho: string
  pagina: number
  /** Extensão declarada, km. */
  extensaoKm: number
  /** Duração declarada, minutos. */
  duracaoMin: number
  /** Desnível acumulado, como impresso. Null quando a ficha o deixa em branco. */
  desnivel: string | null
  /** Altitude máxima e mínima, m. Null quando a ficha as deixa em branco. */
  altitude: { max: number; min: number } | null
  tipo: 'Circular' | 'Linear'
  epoca: string
  dificuldade: Dificuldade
}

const d = (piso: number, esforco: number, adversidade: number, orientacao: number): Dificuldade => ({
  piso,
  esforco,
  adversidade,
  orientacao,
})

export const GUIA_FICHAS: FichaGuia[] = [
  { id: 'pi-margaraca', codigo: null, nome: 'Mata da Margaraça', concelho: 'Arganil', pagina: 21, extensaoKm: 0.9, duracaoMin: 30, desnivel: '+ 48 m', altitude: { max: 554, min: 506 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 1, 1, 1) },
  { id: 'pr2-cnt', codigo: 'PR2 CNT', nome: 'Rota da Vinha', concelho: 'Cantanhede', pagina: 23, extensaoKm: 14, duracaoMin: 180, desnivel: '+ 107,5 m', altitude: { max: 173, min: 74 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 2, 2, 2) },
  { id: 'pr3-cnt', codigo: 'PR3 CNT', nome: 'Rota do Calcário', concelho: 'Cantanhede', pagina: 25, extensaoKm: 9.7, duracaoMin: 150, desnivel: '+ 110 m', altitude: { max: 106, min: 31 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 1, 1, 1) },
  { id: 'pi-arzila', codigo: null, nome: 'Reserva Natural do Paul de Arzila', concelho: 'Coimbra', pagina: 27, extensaoKm: 1.9, duracaoMin: 45, desnivel: '+ 29 m', altitude: { max: 33, min: 8 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 1, 1, 1) },
  { id: 'pr1-cbr', codigo: 'PR1 CBR', nome: 'Mata Nacional de Vale de Canas', concelho: 'Coimbra', pagina: 29, extensaoKm: 1.1, duracaoMin: 45, desnivel: '- 29 m', altitude: { max: 280, min: 251 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 1, 1, 2) },
  { id: 'pr2-cbr', codigo: 'PR2 CBR', nome: 'Mata Nacional de Vale de Canas — Praia Fluvial de Palheiros-Zorro', concelho: 'Coimbra', pagina: 31, extensaoKm: 3.2, duracaoMin: 75, desnivel: '- 261 m', altitude: { max: 276, min: 23 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(3, 2, 3, 2) },
  { id: 'pr3-cbr', codigo: 'PR3 CBR', nome: 'Ribeirinho', concelho: 'Coimbra', pagina: 33, extensaoKm: 3.75, duracaoMin: 150, desnivel: '+ 3,7 m', altitude: { max: 78, min: 23 }, tipo: 'Linear', epoca: 'Primavera e outono', dificuldade: d(3, 2, 3, 3) },
  { id: 'pr2-cdn', codigo: 'PR2 CDN', nome: 'Rota do Sicó', concelho: 'Condeixa-a-Nova', pagina: 35, extensaoKm: 23.5, duracaoMin: 405, desnivel: '+ 950 m', altitude: { max: 403, min: 100 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(3, 4, 2, 2) },
  { id: 'pr1-fig', codigo: 'PR1 FIG', nome: 'Rota dos Arrozais', concelho: 'Figueira da Foz', pagina: 37, extensaoKm: 13.2, duracaoMin: 240, desnivel: '+ 113 m', altitude: { max: 90, min: 0.6 }, tipo: 'Circular', epoca: 'Primavera e verão', dificuldade: d(2, 2, 1, 2) },
  { id: 'pr3-fig', codigo: 'PR3 FIG', nome: 'Rota da Boa Viagem', concelho: 'Figueira da Foz', pagina: 39, extensaoKm: 12.6, duracaoMin: 240, desnivel: '+ 467 m', altitude: { max: 259, min: 24 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(3, 3, 1, 2) },
  { id: 'pr6-fig', codigo: 'PR6 FIG', nome: 'Rota das Salinas', concelho: 'Figueira da Foz', pagina: 41, extensaoKm: 4.6, duracaoMin: 55, desnivel: '+ 0,8 m', altitude: { max: 6, min: -1 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 1, 1, 2) },
  { id: 'pr8-goi', codigo: 'PR8 GOI', nome: 'Trilho do Papel', concelho: 'Góis', pagina: 43, extensaoKm: 10, duracaoMin: 240, desnivel: '+ 506 m', altitude: { max: 540, min: 208 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(2, 2, 2, 2) },
  { id: 'pr9-goi', codigo: 'PR9 GOI', nome: 'Aldeias de Góis — Trilho do Baile', concelho: 'Góis', pagina: 45, extensaoKm: 12.7, duracaoMin: 300, desnivel: '885 m', altitude: { max: 873, min: 589 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 1, 2, 3) },
  { id: 'pi-vale-do-ceira', codigo: null, nome: 'Vale do Ceira', concelho: 'Lousã', pagina: 47, extensaoKm: 14.9, duracaoMin: 180, desnivel: '+ 168 m', altitude: { max: 156, min: 67 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(3, 3, 2, 2) },
  { id: 'tan-bussaco', codigo: null, nome: 'Trilho das Árvores Notáveis', concelho: 'Mealhada', pagina: 49, extensaoKm: 6.7, duracaoMin: 145, desnivel: '+ 375 m', altitude: { max: 555, min: 268 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 2, 2, 2) },
  { id: 'pr1-mir', codigo: 'PR1 MIR', nome: 'Rota dos Museus', concelho: 'Mira', pagina: 51, extensaoKm: 19.1, duracaoMin: 240, desnivel: null, altitude: null, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(1, 3, 2, 1) },
  { id: 'pr4-mir', codigo: 'PR4 MIR', nome: 'Conglomerado de Mira', concelho: 'Mira', pagina: 53, extensaoKm: 5, duracaoMin: 75, desnivel: '+ 70 m', altitude: { max: 33, min: 9 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 2, 1, 1) },
  { id: 'pr4-mcv', codigo: 'PR4 MCV', nome: 'Caminhando ao longo do rio', concelho: 'Miranda do Corvo', pagina: 55, extensaoKm: 4.1, duracaoMin: 50, desnivel: '+ 20 m', altitude: { max: 120, min: 40 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(1, 1, 2, 2) },
  { id: 'pr1-mmv', codigo: 'PR1 MMV', nome: 'Rota Monumental das Aves de Montemor-o-Velho', concelho: 'Montemor-o-Velho', pagina: 57, extensaoKm: 9.1, duracaoMin: 125, desnivel: '+ 136 m', altitude: { max: 90, min: 0.6 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 2, 2, 2) },
  { id: 'pr1-mrt', codigo: 'PR1 MRT', nome: 'Quedas de Água das Paredes', concelho: 'Mortágua', pagina: 59, extensaoKm: 3.55, duracaoMin: 90, desnivel: '+ 108 m', altitude: { max: 358, min: 214 }, tipo: 'Linear', epoca: 'Primavera, verão e outono', dificuldade: d(2, 2, 2, 2) },
  { id: 'pr6-ohp', codigo: 'PR6 OHP', nome: 'Rota do Narciso', concelho: 'Oliveira do Hospital', pagina: 61, extensaoKm: 16.4, duracaoMin: 270, desnivel: '+ 384 m', altitude: { max: 403, min: 272 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 3, 1, 1) },
  { id: 'pr7-ohp', codigo: 'PR7 OHP', nome: 'Rota das Palheiras', concelho: 'Oliveira do Hospital', pagina: 63, extensaoKm: 13.2, duracaoMin: 275, desnivel: '+ 580 m', altitude: { max: 356, min: 147 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 2, 2, 3) },
  { id: 'pr8-pps', codigo: 'PR8 PPS', nome: 'Rota do Rio Unhais', concelho: 'Pampilhosa da Serra', pagina: 65, extensaoKm: 18.2, duracaoMin: 300, desnivel: '1047 m', altitude: { max: 709, min: 383 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(1, 3, 2, 2) },
  { id: 'pi-livraria', codigo: null, nome: 'Livraria do Mondego', concelho: 'Penacova', pagina: 67, extensaoKm: 0.8, duracaoMin: 30, desnivel: '+ 12 m', altitude: { max: 53, min: 39 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(1, 1, 1, 1) },
  { id: 'pr1-pnl', codigo: 'PR1 PNL', nome: 'Trilho do Rebanho', concelho: 'Penela', pagina: 69, extensaoKm: 4.9, duracaoMin: 150, desnivel: '240 m', altitude: { max: 678, min: 536 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(2, 2, 4, 2) },
  { id: 'pr1-sre', codigo: 'PR1 SRE', nome: 'Rota do Arroz', concelho: 'Soure', pagina: 71, extensaoKm: 4.5, duracaoMin: 50, desnivel: '+ 60 m', altitude: { max: 45, min: 4 }, tipo: 'Linear', epoca: 'Todo o ano', dificuldade: d(1, 1, 1, 1) },
  { id: 'pr8-sre', codigo: 'PR8 SRE', nome: 'Rota das Dolinas e Lagoas do Planalto de Sicó', concelho: 'Soure', pagina: 73, extensaoKm: 23.5, duracaoMin: 420, desnivel: '+ 609 m', altitude: { max: 370, min: 151 }, tipo: 'Circular', epoca: 'Todo o ano', dificuldade: d(1, 4, 1, 1) },
  { id: 'pr3-tbu', codigo: 'PR3 TBU', nome: 'Caminho de Midões e Candosa — Rota das Pontes', concelho: 'Tábua', pagina: 75, extensaoKm: 14, duracaoMin: 260, desnivel: '+ 436 m', altitude: { max: 352, min: 176 }, tipo: 'Circular', epoca: 'Primavera e verão', dificuldade: d(1, 3, 1, 2) },
  { id: 'pr1-vnp', codigo: 'PR1 VNP', nome: 'Serra do Carvalho', concelho: 'Vila Nova de Poiares', pagina: 77, extensaoKm: 9.5, duracaoMin: 155, desnivel: '+ 494 m', altitude: { max: 431, min: 33 }, tipo: 'Linear', epoca: 'Primavera e outono', dificuldade: d(2, 2, 1, 2) },
  { id: 'pr2-vnp', codigo: 'PR2 VNP', nome: 'Ribeira de Poiares', concelho: 'Vila Nova de Poiares', pagina: 79, extensaoKm: 7.6, duracaoMin: 125, desnivel: '+ 245 m', altitude: { max: 132, min: 35 }, tipo: 'Linear', epoca: 'Primavera', dificuldade: d(1, 2, 1, 2) },
]

/**
 * O índice do guia: a rede inteira de pequenas rotas e percursos
 * interpretativos, por concelho, tal como listada ("Listagem geral dos
 * principais percursos pedestres da Região"). Só nome e código — o guia não
 * traz mais nada destes. `ficha` aponta para `GUIA_FICHAS` quando existe.
 *
 * Penacova escreve "PR3" e "PR4" sem código de concelho; o Turismo Centro
 * escreve PR3 PCV e PR4 PCV, que é como estão sinalizados.
 */
export interface EntradaRede {
  codigo: string | null
  nome: string
  concelho: string
  ficha?: string
}

const r = (concelho: string, codigo: string | null, nome: string, ficha?: string): EntradaRede => ({
  codigo,
  nome,
  concelho,
  ficha,
})

export const GUIA_REDE: EntradaRede[] = [
  r('Arganil', 'PR1 AGN', 'Caminho do Xisto de Benfeita'),
  r('Arganil', 'PR2 AGN', 'Os Povos das Ribeiras de Piodam'),
  r('Arganil', 'PR3 AGN', 'Percurso Pedestre Açor'),
  r('Arganil', 'PR4 AGN', 'Caminho do Xisto de Vila Cova de Alva'),
  r('Arganil', null, 'Mata da Margaraça', 'pi-margaraca'),
  r('Cantanhede', 'PR2 CNT', 'Rota da Vinha', 'pr2-cnt'),
  r('Cantanhede', 'PR3 CNT', 'Rota do Calcário', 'pr3-cnt'),
  r('Cantanhede', 'PR4 CNT', 'Rota das Areias Douradas'),
  r('Coimbra', null, 'Reserva Natural do Paul de Arzila', 'pi-arzila'),
  r('Coimbra', 'PR1 CBR', 'Mata de Vale de Canas', 'pr1-cbr'),
  r('Coimbra', 'PR2 CBR', 'Praia Fluvial', 'pr2-cbr'),
  r('Coimbra', 'PR3 CBR', 'Ribeirinho', 'pr3-cbr'),
  r('Condeixa-a-Nova', 'PR1 CDN', 'Rota de Conímbriga'),
  r('Condeixa-a-Nova', 'PR2 CDN', 'Rota do Sicó', 'pr2-cdn'),
  r('Figueira da Foz', 'PR1 FIG', 'Rota dos Arrozais', 'pr1-fig'),
  r('Figueira da Foz', 'PR3 FIG', 'Rota da Boa Viagem', 'pr3-fig'),
  r('Figueira da Foz', 'PR6 FIG', 'Rota das Salinas', 'pr6-fig'),
  r('Góis', 'PR1 GOI', 'Aldeias do Xisto de Góis'),
  r('Góis', 'PR2 GOI', 'Trilhos dos Pisões'),
  r('Góis', 'PR3 GOI', 'Trilho do Vale do Ceira I'),
  r('Góis', 'PR4 GOI', 'Trilho da Serra do Açor'),
  r('Góis', 'PR5 GOI', 'Trilho das Minas'),
  r('Góis', 'PR6 GOI', 'Trilho do Vale Encantado'),
  r('Góis', 'PR7 GOI', 'Trilho do Vale do Ceira II'),
  r('Góis', 'PR8 GOI', 'Trilho do Papel', 'pr8-goi'),
  r('Góis', 'PR9 GOI', 'Aldeias de Góis — Trilho do Baile', 'pr9-goi'),
  r('Lousã', 'PR1 LSA', 'Rota dos Moinhos'),
  r('Lousã', 'PR2 LSA', 'Rota das Aldeias do Xisto'),
  r('Lousã', 'PR3 LSA', 'Rota da Levada'),
  r('Lousã', 'PR4 LSA', 'Rota das 4 Aldeias'),
  r('Lousã', 'PR5 LSA', 'Rota dos Serranos'),
  r('Lousã', 'PR6 LSA', 'Rota dos Baldios'),
  r('Lousã', 'PR7 LSA', 'À Descoberta da Floresta'),
  r('Lousã', null, 'Vale do Ceira', 'pi-vale-do-ceira'),
  r('Mealhada', null, 'Trilho das Árvores Notáveis', 'tan-bussaco'),
  r('Mira', 'PR1 MIR', 'Rota dos Museus', 'pr1-mir'),
  r('Mira', 'PR2 MIR', 'Lagoa de Mira'),
  r('Mira', 'PR3 MIR', 'Rota da Vala Real'),
  r('Mira', 'PR4 MIR', 'Conglomerado de Mira', 'pr4-mir'),
  r('Mira', 'PR5 MIR', 'Rota das Dunas de Mira'),
  r('Mira', 'PR6 MIR', 'Rota do Pinhal de Mira'),
  r('Miranda do Corvo', 'PR1 MCV', 'Caminho do Xisto Acessível de Gondramaz'),
  r('Miranda do Corvo', 'PR2 MCV', 'Caminho do Xisto de Gondramaz — Nos passos do moleiro'),
  r('Miranda do Corvo', 'PR3 MCV', 'Caminho do Xisto — Ribeira do Conde'),
  r('Miranda do Corvo', 'PR4 MCV', 'Caminhando ao longo do rio', 'pr4-mcv'),
  r('Miranda do Corvo', 'PR5 MCV', 'A Caminho do Santuário (Senhor da Serra)'),
  r('Montemor-o-Velho', 'PR1 MMV', 'Rota Monumental das Aves de Montemor-o-Velho', 'pr1-mmv'),
  r('Mortágua', 'PR1 MRT', 'Quedas de Água das Paredes', 'pr1-mrt'),
  r('Mortágua', 'PR2 MRT', 'Trilho da Ribeira da Fraga'),
  r('Oliveira do Hospital', 'PR1 OHP', 'Caminho do Xisto de Aldeia das Dez — Pelas várzeas do Alvoco'),
  r('Oliveira do Hospital', 'PR2 OHP', 'Caminho do Xisto de Aldeia das Dez — Rota imperial'),
  r('Oliveira do Hospital', 'PR3 OHP', 'Caminho do Xisto de Aldeia das Dez — Nos passos do ermitão'),
  r('Oliveira do Hospital', 'PR4 OHP', 'Caminho do Xisto de Avô — À volta do Alva'),
  r('Oliveira do Hospital', 'PR5 OHP', 'Caminho do Xisto de Oliveira do Hospital — A marcha dos veteranos'),
  r('Oliveira do Hospital', 'PR6 OHP', 'Rota do Narciso', 'pr6-ohp'),
  r('Oliveira do Hospital', 'PR7 OHP', 'Rota das Palheiras', 'pr7-ohp'),
  r('Pampilhosa da Serra', 'PR1 PPS', 'Caminho do Xisto de Fajão — Subida aos Penedos'),
  r('Pampilhosa da Serra', 'PR2 PPS', 'Caminho do Xisto — Voltinhas do Ceira'),
  r('Pampilhosa da Serra', 'PR3 PPS', 'Caminho do Xisto da Barragem de Santa Luzia'),
  r('Pampilhosa da Serra', 'PR4 PPS', 'Caminho do Xisto de Janeiro de Baixo'),
  r('Pampilhosa da Serra', 'PR5 PPS', 'Caminho do Xisto de Pessegueiro'),
  r('Pampilhosa da Serra', 'PR6 PPS', 'Caminho do Xisto de Porto de Vacas'),
  r('Pampilhosa da Serra', 'PR7 PPS', 'Caminho do Xisto de Pampilhosa da Serra'),
  r('Pampilhosa da Serra', 'PR8 PPS', 'Rota do Rio Unhais', 'pr8-pps'),
  r('Pampilhosa da Serra', 'PR9 PPS', 'Rota Velho de Unhais'),
  r('Penacova', 'PR1 PCV', 'Penacova, o Mondego e a Lampreia'),
  r('Penacova', 'PR2 PCV', 'Na Rota dos Moinhos do Buçaco'),
  r('Penacova', 'PR3 PCV', 'Rota do Alva'),
  r('Penacova', 'PR4 PCV', 'Ribeira de Arcos'),
  r('Penacova', null, 'Livraria do Mondego', 'pi-livraria'),
  r('Penela', 'PR1 PNL', 'Trilho do Rebanho', 'pr1-pnl'),
  r('Penela', 'PR2 PNL', 'Percurso Pedestre da Pedra da Ferida à Louçainha'),
  r('Soure', 'PR1 SRE', 'Rota do Arroz', 'pr1-sre'),
  r('Soure', 'PR8 SRE', 'Rota das Dolinas e Lagoas do Planalto de Sicó', 'pr8-sre'),
  r('Tábua', 'PR1 TBU', 'Caminho do Xisto de Midões'),
  r('Tábua', 'PR2 TBU', 'Caminho do Xisto de Sevilha'),
  r('Tábua', 'PR3 TBU', 'Caminho de Midões e Candosa — Rota das Pontes', 'pr3-tbu'),
  r('Vila Nova de Poiares', 'PR1 VNP', 'Serra do Carvalho', 'pr1-vnp'),
  r('Vila Nova de Poiares', 'PR2 VNP', 'Ribeira de Poiares', 'pr2-vnp'),
  r('Vila Nova de Poiares', 'PR3 VNP', 'Viver o Alva'),
]
