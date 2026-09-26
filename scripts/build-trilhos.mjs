#!/usr/bin/env node
/**
 * Gerador dos trilhos — `node scripts/build-trilhos.mjs`
 *
 * Escreve três ficheiros, todos versionados:
 *
 *   lib/trilhos-dados.ts               o que se diz de cada percurso (nome,
 *                                      código, concelhos, medidas, perfil)
 *   public/data/trilhos.geojson        o traçado, pedido pelo mapa
 *   public/data/trilhos-regiao.geojson a região: contorno, máscara, limites
 *                                      entre concelhos e onde pôr os nomes
 *
 * ── De onde vem o traçado ───────────────────────────────────────────────
 *
 * Não há um cadastro aberto dos percursos pedestres da região. A FCMP, que
 * os regista e homologa, não publica a lista; o guia da CIM é um PDF com
 * mapas desenhados, sem coordenadas. O que há em aberto, por ordem de
 * preferência quando dois dizem o mesmo:
 *
 *   1. As câmaras — o GPX, KML ou KMZ que cada município publica na página
 *      dos seus percursos (Arganil, Cantanhede, Figueira da Foz, Góis,
 *      Lousã, Mealhada, Mira, Mortágua, Tábua). É a entidade promotora a
 *      publicar o traçado oficial, e ganha a qualquer outro.
 *   2. ICNF — a camada "Percursos na natureza" do WFS da Base de Dados
 *      Geográfica, com os percursos das áreas protegidas.
 *   3. OpenStreetMap — relações `route=hiking|foot`, desenhadas por quem as
 *      percorreu. É a maior parte, e é ODbL.
 *
 * O que fica de fora, e porquê:
 *
 *   · Caminhos de peregrinação (Santiago, Fátima, Rota Carmelita). São
 *     rotas de muitos dias, quase todas por estrada, e não é disso que a
 *     página trata. Se um dia entrarem, entram com família própria.
 *   · Relações sem nome — não há como as chamar nem conferir.
 *   · Tudo o que fique fora dos 19 concelhos da CIM. As grandes rotas que
 *     entram e saem da região são recortadas pelo contorno, e a ficha diz
 *     que se trata do troço na região.
 *
 * ── O que se mede, e com quê ────────────────────────────────────────────
 *
 * A distância mede-se no traçado, pela geodésica de cada segmento. A
 * altitude lê-se no Copernicus DEM GLO-30 (30 m, ESA), amostrada a cada
 * AMOSTRA_M metros ao longo do traçado. O GLO-30 é um modelo de SUPERFÍCIE:
 * num pinhal cerrado mede copas, e isso soma subidas que não existem. Por
 * isso o perfil é suavizado antes de se somar o desnível, e o gerador
 * compara no fim, para cada percurso com ficha no guia, o que mediu com o
 * que a CIM declara — um desvio grande é sinal de traçado errado ou de
 * terreno mal lido, e aparece na consola para alguém ver.
 *
 * Duração e dificuldade NÃO se calculam. Uma fórmula (Naismith, Tobler)
 * daria um número com ar de oficial que ninguém declarou. Quem as publica é
 * o guia da CIM (`lib/trilhos-guia.ts`); onde o guia não chega, a ficha diz
 * que não há.
 *
 * ── Cache ───────────────────────────────────────────────────────────────
 *
 * As respostas em bruto e as janelas do DEM ficam em
 * `scripts/data/trilhos/cache/` (fora do git). `--refrescar` volta a pedir
 * tudo; sem ele, o que está em cache é reutilizado — o Overpass não é
 * sítio para se pedir a mesma coisa dez vezes seguidas.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { fromUrl } from 'geotiff'
import { topology } from 'topojson-server'
import { merge, mesh, feature } from 'topojson-client'
import { presimplify, simplify, quantile } from 'topojson-simplify'

import { polylabel } from './lib/geo.mjs'
import { lerTracado } from './lib/tracos.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CACHE = join(ROOT, 'scripts', 'data', 'trilhos', 'cache')
const OUT_TS = join(ROOT, 'lib', 'trilhos-dados.ts')
const OUT_TRILHOS = join(ROOT, 'public', 'data', 'trilhos.geojson')
const OUT_REGIAO = join(ROOT, 'public', 'data', 'trilhos-regiao.geojson')

const REFRESCAR = process.argv.includes('--refrescar')

const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador de trilhos)'

/** Os 19 municípios da CIM Região de Coimbra, como a CAOP os escreve. */
const CONCELHOS = [
  'Arganil', 'Cantanhede', 'Coimbra', 'Condeixa-a-Nova', 'Figueira da Foz', 'Góis', 'Lousã',
  'Mealhada', 'Mira', 'Miranda do Corvo', 'Montemor-o-Velho', 'Mortágua', 'Oliveira do Hospital',
  'Pampilhosa da Serra', 'Penacova', 'Penela', 'Soure', 'Tábua', 'Vila Nova de Poiares',
]

/** Caixa larga da região (S, W, N, E), para os pedidos por área. */
const CAIXA = [39.86, -8.97, 40.62, -7.6]

const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const ICNF_WFS =
  'https://si.icnf.pt/wfs/bdg?service=wfs&version=2.0.0&request=GetFeature&typeNames=BDG:percursos_pedestres' +
  `&outputFormat=application/json&srsName=EPSG:4326&bbox=${CAIXA.join(',')},urn:ogc:def:crs:EPSG::4326`

/**
 * Traçados publicados pelas câmaras.
 *
 * `pecas` escolhe, pelo nome, que partes do ficheiro são o percurso: os KML
 * trazem muitas vezes variantes, troços interditos ou condicionados e
 * pontos de interesse. Sem `pecas`, conta tudo o que for linha.
 *
 * Ficaram de fora, com a razão:
 *   · Pampilhosa da Serra, Penela — remetem para plataformas proprietárias
 *     (MyXistoTrails, Outdooractive), sem ficheiro próprio;
 *   · Penacova, Oliveira do Hospital, Miranda do Corvo, Coimbra — não
 *     publicam ficheiro nas páginas dos percursos;
 *   · Tábua PR1 — a ligação do GPX dá 404;
 *   · Arganil PI da Margaraça — 0,5 km, metade do percurso; fica o do ICNF;
 *   · Arganil GR22 — é a etapa Linhares–Piódão, quase toda fora da região;
 *     fica a do OSM, que traz a rota inteira para recortar;
 *   · o "percurso urbano" de Mortágua — um desenho CAD em 176 bocados.
 */
const AGN = 'https://www.visitarganil.pt/wp-content/uploads'
const GOI = 'https://www.cm-gois.pt/cmgois/uploads/writer_file/document'
const MRT = 'https://www.cm-mortagua.pt/cmmortagua/uploads/writer_file/document'
const TBU = 'https://tabuaoencantodasbeiras.pt/wp-content/uploads'
const CNT = 'https://dados.gov.pt/s/resources'
const LSA = 'https://www.google.com/maps/d/kml?mid=1xRkm38ItnU93FFIWYjOza1LsS0w&forcekml=1'
const MIR = (mid) => `https://www.google.com/maps/d/kml?mid=${mid}&forcekml=1`
/** A Lousã publica a rede toda num só mapa; cada PR é a peça "PRn - …", sem variantes nem troço interdito. */
const lsa = (n, nome) => ({
  concelho: 'Lousã',
  codigo: `PR${n} LSA`,
  nome,
  url: LSA,
  pecas: new RegExp(`^PR${n}(?![.0-9])(?!.*(Interdito|Variante))`),
})

const CAMARAS = [
  { concelho: 'Arganil', codigo: 'PR1 AGN', nome: 'Caminho do Xisto de Benfeita', url: `${AGN}/2016/04/PR1_AGN_04-04-2016.gpx` },
  { concelho: 'Arganil', codigo: 'PR2 AGN', nome: 'Os Povos das Ribeiras de Piodam', url: `${AGN}/2016/04/PR2-AGN.gpx`, pecas: /^PR2$/ },
  { concelho: 'Arganil', codigo: 'PR2.1 AGN', nome: 'Os Povos das Ribeiras de Piodam — variante', url: `${AGN}/2016/04/PR2-AGN.gpx`, pecas: /^PR2\.1$/ },
  { concelho: 'Arganil', codigo: 'PR3 AGN', nome: 'Açor', url: `${AGN}/2016/04/PR3_AGN_24-02_2015.gpx` },
  { concelho: 'Arganil', codigo: 'PR4 AGN', nome: 'Caminho do Xisto de Vila Cova de Alva', url: `${AGN}/2016/04/PR4_AGN_v11-07-2023.gpx` },
  { concelho: 'Arganil', codigo: 'PR5 AGN', nome: 'Entre o Alva e a Ribeira da Mata', url: `${AGN}/2020/12/PR5_AGN.gpx`, pecas: /^PR5 AGN$/ },
  { concelho: 'Arganil', codigo: 'PR5.1 AGN', nome: 'Entre o Alva e a Ribeira da Mata — variante do Pisão', url: `${AGN}/2020/12/PR5_AGN.gpx`, pecas: /^PR5\.1/ },
  { concelho: 'Arganil', codigo: 'PR5.2 AGN', nome: 'Entre o Alva e a Ribeira da Mata — variante do Urtigal', url: `${AGN}/2020/12/PR5_AGN.gpx`, pecas: /^PR5\.2/ },
  { concelho: 'Arganil', codigo: 'GR21.1', nome: 'Grande Rota das Aldeias do Xisto', url: `${AGN}/2021/03/GR21.1_AXAGN_17-07-2023.gpx` },
  { concelho: 'Arganil', codigo: 'GR51', nome: 'Grande Rota do Alva', url: `${AGN}/2023/06/gr51-grande-rota-do-alva-1.gpx` },
  { concelho: 'Cantanhede', codigo: 'PR2 CNT', nome: 'Rota da Vinha', url: `${CNT}/pr3-cnt-rota-do-calcario-cantanhede/20251009-144831/pr2cnt-rotadavinha.gpx` },
  { concelho: 'Cantanhede', codigo: 'PR3 CNT', nome: 'Rota do Calcário', url: `${CNT}/pr3-cnt-rota-do-calcario/20251009-103906/pr3cnt-rotadocalcario.gpx` },
  { concelho: 'Cantanhede', codigo: 'PR4 CNT', nome: 'Rota das Areias Douradas', url: `${CNT}/pr3-cnt-rota-do-calcario-cantanhede/20251009-144905/pr4cnt-rotadasareiasdouradas.gpx` },
  // O ficheiro chama-se "Rota de Maiorca PR1 FIG", mas o traçado (13,2 km,
  // circular, a partir de Maiorca) é o da Rota dos Arrozais, a PR1 FIG.
  { concelho: 'Figueira da Foz', codigo: 'PR1 FIG', nome: 'Rota dos Arrozais', url: 'https://www.cm-figfoz.pt/cmfigueiradafoz/uploads/document/file/3080/rota_de_maiorca_pr1_fig_vnet.kmz' },
  { concelho: 'Góis', codigo: 'PR1 GOI', nome: 'Aldeias do Xisto de Góis', url: `${GOI}/1754/pr1goi.kmz` },
  { concelho: 'Góis', codigo: 'PR2 GOI', nome: 'Trilhos dos Pisões', url: `${GOI}/1747/pr2goi.kmz` },
  { concelho: 'Góis', codigo: 'PR3 GOI', nome: 'Trilho do Vale do Ceira I', url: `${GOI}/1748/pr3goi.kmz` },
  { concelho: 'Góis', codigo: 'PR4 GOI', nome: 'Trilho da Serra do Açor', url: `${GOI}/1749/pr4goi.kmz` },
  { concelho: 'Góis', codigo: 'PR6 GOI', nome: 'Trilho do Vale Encantado', url: `${GOI}/1751/pr6goi.kmz` },
  { concelho: 'Góis', codigo: 'PR7 GOI', nome: 'Trilho do Vale do Ceira II', url: `${GOI}/1752/pr7goi.kmz` },
  { concelho: 'Góis', codigo: 'PR9 GOI', nome: 'Aldeias de Góis — Trilho do Baile', url: `${GOI}/1755/pr9goi.kmz` },
  { concelho: 'Góis', codigo: 'PR11 GOI', nome: 'Trilho da Central', url: `${GOI}/5142/pr11goi.kmz` },
  lsa(1, 'Rota dos Moinhos'),
  lsa(2, 'Rota das Aldeias do Xisto'),
  lsa(3, 'Rota da Levada'),
  lsa(4, 'Rota do Trevim'),
  lsa(5, 'Bosques do Catarredor'),
  lsa(6, 'Trilho dos Moleiros'),
  lsa(7, 'À Descoberta da Floresta'),
  lsa(8, 'Rota do Marigo'),
  lsa(9, 'Mata do Sobral'),
  lsa(10, 'Da Senhora da Graça à Epigenia do Ceira'),
  { concelho: 'Mealhada', codigo: 'PR1 MLD', nome: 'Luso-Bussaco 360', url: 'https://www.google.com/maps/d/kml?mid=126xS8Z0ES01G5CSs166IM_LYZMQ&forcekml=1' },
  { concelho: 'Mira', codigo: 'PR1 MIR', nome: 'Rota dos Museus', url: MIR('zq-TLzlBYqdM.kxKovq19rwoE'), pecas: /^PR1 MIR/ },
  { concelho: 'Mira', codigo: 'PR2 MIR', nome: 'Rota dos Moinhos', url: MIR('zq-TLzlBYqdM.k-5gPW6m-GoE'), pecas: /^PR2 MIR/ },
  { concelho: 'Mira', codigo: 'PR4 MIR', nome: 'Rota do Conglomerado', url: MIR('zq-TLzlBYqdM.kHcWPTb5z-BE'), pecas: /^PR4 MIR/ },
  { concelho: 'Mira', codigo: 'PR5 MIR', nome: 'Rota das Dunas de Mira', url: MIR('1OIqKOqN52HU8dvN3G2QtZheetS8'), pecas: /^PR5 - / },
  { concelho: 'Mortágua', codigo: 'PR1 MRT', nome: 'Quedas de Água das Paredes', url: `${MRT}/443/pr1.kml`, pecas: /^PR 1/ },
  { concelho: 'Mortágua', codigo: 'PR2 MRT', nome: 'Trilho da Ribeira da Fraga', url: `${MRT}/444/pr2.kmz` },
  { concelho: 'Mortágua', codigo: 'CNE', nome: 'Caminho Natural da Espiritualidade', url: `${MRT}/446/caminhos_espritualidade.kml`, pecas: /^C_Nat_Espiritualidade/ },
  { concelho: 'Tábua', codigo: 'PR2 TBU', nome: 'Caminho do Xisto de Sevilha', url: `${TBU}/2023/11/PR2-tbu-caminho-do-xisto-SEVILHA.gpx` },
  { concelho: 'Tábua', codigo: 'PR3 TBU', nome: 'Rota das Pontes', url: `${TBU}/2025/03/PR3_Tabua_Rota_das_Pontes-1.gpx` },
  { concelho: 'Tábua', codigo: 'PR4 TBU', nome: 'Trilho dos Gaios', url: `${TBU}/2025/03/Track-PR4-TBU-Trilho-dos-Gaios-um-Percurso-com-Historia.gpx` },
]

/**
 * Traçados em ficheiro local, na pasta `GPX/` (fora do git). Reunidos à mão
 * pelo utilizador para os percursos que nenhuma câmara publica — quase todos
 * gravações de caminhantes no Wikiloc.
 *
 * `idaEVolta`: a gravação foi e voltou pelo mesmo caminho num percurso que a
 * ficha declara linear. Fica só a ida, cortada no ponto mais afastado do
 * início. Só se marca quando as duas coisas batem (linear na ficha, traçado
 * fechado); Ribeira de Poiares e Pedra da Ferida voltam ao início mas
 * cortá-los dava metade do declarado, e ficam inteiros.
 *
 * O PR1 PCV vem do KML (6,0 km, como a ficha), não do GPX de 7,8.
 */
const PASTA_LOCAL = join(ROOT, 'GPX')
const LOCAIS = [
  { ficheiro: 'capela-de-ferraria-de-sao-joao.gpx', concelho: 'Penela', codigo: 'PR1 PNL', nome: 'Trilho do Rebanho' },
  { ficheiro: 'pr2-pnl-da-pedra-ferida-a-loucainha.gpx', concelho: 'Penela', codigo: 'PR2 PNL', nome: 'Da Pedra da Ferida à Louçainha' },
  { ficheiro: 'penacova-pr3-rota-do-alva.gpx', concelho: 'Penacova', codigo: 'PR3 PCV', nome: 'Rota do Alva' },
  { ficheiro: 'PR1 Penacova e o Rio Mondego kml.kml', concelho: 'Penacova', codigo: 'PR1 PCV', nome: 'Penacova e o Rio Mondego' },
  { ficheiro: 'pr4-pcv-ribeira-de-arcos.gpx', concelho: 'Penacova', codigo: 'PR4 PCV', nome: 'Ribeira de Arcos' },
  { ficheiro: 'pr5-pcv-livraria-do-mondego-penacova.gpx', concelho: 'Penacova', codigo: 'PR5 PCV', nome: 'Livraria do Mondego' },
  { ficheiro: 'percurso-pedestre-viver-o-alva-inserido-na-gr-alva.gpx', concelho: 'Vila Nova de Poiares', codigo: 'PR3 VNP', nome: 'Viver o Alva' },
  { ficheiro: 'pr1-prs-serra-do-carvalho.gpx', concelho: 'Vila Nova de Poiares', codigo: 'PR1 VNP', nome: 'Serra do Carvalho', idaEVolta: true },
  { ficheiro: 'ribeira-de-poiares-1-pr2-vnp.gpx', concelho: 'Vila Nova de Poiares', codigo: 'PR2 VNP', nome: 'Ribeira de Poiares' },
  { ficheiro: 'pr1-cbr-percurso-interpretativo-mata-nacional-de-vale-de-can.gpx', concelho: 'Coimbra', codigo: 'PR1 CBR', nome: 'Mata Nacional de Vale de Canas' },
  { ficheiro: 'pr3-cbr-percurso-pedestre-ribeirinho.gpx', concelho: 'Coimbra', codigo: 'PR3 CBR', nome: 'Ribeirinho', idaEVolta: true },
  { ficheiro: 'pr4-cbr-rota-da-tecelagem.gpx', concelho: 'Coimbra', codigo: 'PR4 CBR', nome: 'Rota da Tecelagem' },
  { ficheiro: 'pr5-cbr-rota-da-bio-reserva-da-senhora-da-alegria.gpx', concelho: 'Coimbra', codigo: 'PR5 CBR', nome: 'Rota Bio-Reserva Sr.ª da Alegria' },
  { ficheiro: 'pr6-cbr-rota-da-torre-de-bera-almalagues.gpx', concelho: 'Coimbra', codigo: 'PR6 CBR', nome: 'Rota da Torre de Bera', idaEVolta: true },
  { ficheiro: 'pr1-cdn-rota-de-conimbriga.gpx', concelho: 'Condeixa-a-Nova', codigo: 'PR1 CDN', nome: 'Rota de Conímbriga' },
  { ficheiro: 'pr1-mcv.gpx', concelho: 'Miranda do Corvo', codigo: 'PR1 MCV', nome: 'Caminho do Xisto Acessível de Gondramaz', idaEVolta: true },
  { ficheiro: 'pr2-mcv-caminho-do-xisto-de-gondramaz-nos-passos-do-moleiro.gpx', concelho: 'Miranda do Corvo', codigo: 'PR2 MCV', nome: 'Caminho do Xisto de Gondramaz — Nos passos do moleiro' },
  { ficheiro: 'pr4-mcv-miranda-do-corvo-ida-e-volta-lousa.gpx', concelho: 'Miranda do Corvo', codigo: 'PR4 MCV', nome: 'Caminhando ao longo do rio', idaEVolta: true },
  { ficheiro: 'pr1-mmv-rota-monumental-das-aves-de-montemor-o-velho.gpx', concelho: 'Montemor-o-Velho', codigo: 'PR1 MMV', nome: 'Rota Monumental das Aves de Montemor-o-Velho' },
  { ficheiro: 'pr6-fig-rota-das-salinas-figueira-da-foz.gpx', concelho: 'Figueira da Foz', codigo: 'PR6 FIG', nome: 'Rota das Salinas' },
  { ficheiro: 'pr8-goi-trilho-do-papel.gpx', concelho: 'Góis', codigo: 'PR8 GOI', nome: 'Trilho do Papel' },
  { ficheiro: 'pr3-mir-mira-rota-da-vala-real.gpx', concelho: 'Mira', codigo: 'PR3 MIR', nome: 'Rota da Vala Real' },
  { ficheiro: 'pr6-ohp-rota-do-narciso.gpx', concelho: 'Oliveira do Hospital', codigo: 'PR6 OHP', nome: 'Rota do Narciso' },
  { ficheiro: 'pr7-ohp-rota-das-palheiras-fiais-da-beira.gpx', concelho: 'Oliveira do Hospital', codigo: 'PR7 OHP', nome: 'Rota das Palheiras' },
  { ficheiro: 'pr1-pps-caminho-do-xisto-de-fajao-pampilhosa-da-serra.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR1 PPS', nome: 'Caminho do Xisto de Fajão — Subida aos Penedos' },
  { ficheiro: 'voltinha-ao-ceira-pr2-pps-fajao-pampilhosa-da-serra.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR2 PPS', nome: 'Caminho do Xisto de Fajão — Voltinhas do Ceira' },
  { ficheiro: 'pr4-pps-janeiro-de-baixo.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR4 PPS', nome: 'Caminho do Xisto de Janeiro de Baixo' },
  { ficheiro: 'pps-pr5-caminho-do-xisto-de-pessegueiro.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR5 PPS', nome: 'Caminho do Xisto de Pessegueiro' },
  { ficheiro: 'pr7-pps-caminho-do-xisto-de-pampilhosa-da-serra-villa-pampil.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR7 PPS', nome: 'Caminho do Xisto de Pampilhosa da Serra' },
  { ficheiro: 'pr8-ppsgpx.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR8 PPS', nome: 'Rota do Rio Unhais' },
  { ficheiro: 'pr9-pps-rota-velho-de-unhais.gpx', concelho: 'Pampilhosa da Serra', codigo: 'PR9 PPS', nome: 'Rota do Velho Unhais' },
  { ficheiro: 'pr8-sre-rota-das-dolinas-e-lagoas-do-planalto-de-sico.gpx', concelho: 'Soure', codigo: 'PR8 SRE', nome: 'Rota das Dolinas e Lagoas do Planalto de Sicó' },
  { ficheiro: 'pr1-tbu-caminho-do-xisto-de-midoes-na-peugada-de-joao-branda.gpx', concelho: 'Tábua', codigo: 'PR1 TBU', nome: 'Caminho do Xisto de Midões' },
]

/** Mosaicos de 1° × 1° do Copernicus DEM GLO-30 que cobrem a região. */
const DEM_MOSAICOS = ['N39_00_W009', 'N39_00_W008', 'N40_00_W009', 'N40_00_W008'].map(
  (t) => `https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_${t}_00_DEM/Copernicus_DSM_COG_10_${t}_00_DEM.tif`,
)

/** Espaçamento das amostras de altitude ao longo do traçado, m. */
const AMOSTRA_M = 20
/**
 * Janela da média móvel do perfil, em amostras (7 × 20 m = 140 m). Mais
 * curta e o desnível soma o ruído do radar e as copas; mais longa e come
 * subidas verdadeiras de encosta curta. Escolhida contra as fichas do guia
 * — ver a tabela que o gerador imprime.
 */
const SUAVIZAR = 7
/** Pontos do perfil guardado para desenhar. */
const PERFIL_PONTOS = 160
/** Tolerância do Douglas-Peucker no traçado publicado, m. */
const SIMPLIFICAR_M = 6
/** Troços recortados mais curtos do que isto não contam. */
const TROCO_MIN_M = 300
/** Pontas a menos disto contam como percurso que volta ao início. */
const CIRCULAR_M = 250

/**
 * Códigos de concelho escritos de mais de uma maneira. O ICNF escreve a
 * Figueira como FF; o índice do guia escreve Condeixa como CND e Poiares
 * como PRS. Normaliza-se para o que está sinalizado no terreno.
 */
const ALIAS_CONCELHO = { FF: 'FIG', CND: 'CDN', PRS: 'VNP' }

/** Os códigos de concelho da CIM, como sinalizados nos PR. */
const CODIGOS_CIM = new Set(['AGN', 'CNT', 'CBR', 'CDN', 'FIG', 'GOI', 'LSA', 'MLD', 'MIR', 'MCV', 'MMV', 'MRT', 'OHP', 'PPS', 'PCV', 'PNL', 'SRE', 'TBU', 'VNP'])

/**
 * Correspondências que o código não resolve, porque os percursos
 * interpretativos não têm código. Conferidas à mão contra a ficha do guia
 * (extensão, local e nome).
 */
const FICHA_POR_FONTE = {
  'icnf:percursos_pedestres.50': 'pi-margaraca',
}

/**
 * Elementos que ficam de fora por decisão, com a razão. A Mata da Margaraça
 * tem três traçados com o mesmo nome — dois no OSM e o do ICNF, que gere a
 * mata. Os do OSM não batem certo com a própria etiqueta de distância (0,4
 * km medidos para 0,9 declarados; 2,4 para 1,5); fica o do ICNF.
 */
const EXCLUIR = {
  'osm:relation/5399708': 'Margaraça: duplicado do traçado do ICNF',
  'osm:relation/13457347': 'Margaraça: duplicado do traçado do ICNF, incompleto',
}

// ── Pedidos ────────────────────────────────────────────────────────────

mkdirSync(CACHE, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function pedir(url, init = {}, tipo = 'text') {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(300000),
    ...init,
    headers: { 'User-Agent': USER_AGENT, ...init.headers },
  })
  if (!res.ok) throw new Error(`${url.slice(0, 90)} respondeu ${res.status}`)
  return tipo === 'json' ? res.json() : res.text()
}

/** Lê da cache ou pede e guarda. */
async function comCache(nome, obter) {
  const ficheiro = join(CACHE, nome)
  if (!REFRESCAR && existsSync(ficheiro)) return readFileSync(ficheiro, 'utf8')
  const texto = await obter()
  writeFileSync(ficheiro, texto)
  return texto
}

/** Como `comCache`, para ficheiros binários (KMZ). */
async function comCacheBin(nome, url) {
  const ficheiro = join(CACHE, nome)
  if (!REFRESCAR && existsSync(ficheiro)) return readFileSync(ficheiro)
  const res = await fetch(url, { signal: AbortSignal.timeout(120000), headers: { 'User-Agent': 'Mozilla/5.0 ' + USER_AGENT } })
  if (!res.ok) throw new Error(`${url.slice(0, 90)} respondeu ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(ficheiro, buf)
  return buf
}

async function overpass(query) {
  const falhas = []
  for (const espelho of OVERPASS) {
    try {
      process.stdout.write(`  Overpass: ${espelho}\n`)
      const texto = await pedir(espelho, { method: 'POST', body: new URLSearchParams({ data: query }) })
      if (!texto.trimStart().startsWith('{')) throw new Error(texto.includes('too busy') ? 'ocupado' : 'não é JSON')
      return texto
    } catch (err) {
      falhas.push(`${espelho}: ${err.message}`)
    }
  }
  throw new Error(`Nenhum espelho do Overpass respondeu:\n  ${falhas.join('\n  ')}`)
}

// ── Geometria ──────────────────────────────────────────────────────────

const R_TERRA = 6371008.8
const RAD = Math.PI / 180

function haversine(a, b) {
  const dLat = (b[1] - a[1]) * RAD
  const dLon = (b[0] - a[0]) * RAD
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.sin(dLon / 2) ** 2
  return 2 * R_TERRA * Math.asin(Math.sqrt(s))
}

const comprimento = (linha) => {
  let s = 0
  for (let i = 1; i < linha.length; i++) s += haversine(linha[i - 1], linha[i])
  return s
}

/** Pontos a cada `passo` metros, incluindo os vértices originais. */
function densificar(linha, passo) {
  const out = [linha[0]]
  for (let i = 1; i < linha.length; i++) {
    const a = linha[i - 1]
    const b = linha[i]
    const d = haversine(a, b)
    const n = Math.max(1, Math.ceil(d / passo))
    for (let k = 1; k <= n; k++) out.push([a[0] + ((b[0] - a[0]) * k) / n, a[1] + ((b[1] - a[1]) * k) / n])
  }
  return out
}

/** Pontos exactamente a cada `passo` metros ao longo das partes, em sequência. */
function amostrar(partes, passo) {
  const pts = []
  let resto = 0
  for (const linha of partes) {
    for (let i = 1; i < linha.length; i++) {
      const a = linha[i - 1]
      const b = linha[i]
      const d = haversine(a, b)
      let t = resto
      while (t <= d) {
        const f = d === 0 ? 0 : t / d
        pts.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f])
        t += passo
      }
      resto = t - d
    }
  }
  const ultima = partes.at(-1).at(-1)
  if (pts.length && haversine(pts.at(-1), ultima) > 1) pts.push(ultima)
  return pts
}

/** Ponto dentro de um conjunto de anéis (par-ímpar), em lon/lat. */
function dentro(p, aneis) {
  let d = false
  for (const anel of aneis) {
    for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
      const a = anel[i]
      const b = anel[j]
      if (a[1] > p[1] !== b[1] > p[1] && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) d = !d
    }
  }
  return d
}

function caixaDe(aneis) {
  const c = [Infinity, Infinity, -Infinity, -Infinity]
  for (const anel of aneis)
    for (const [x, y] of anel) {
      if (x < c[0]) c[0] = x
      if (y < c[1]) c[1] = y
      if (x > c[2]) c[2] = x
      if (y > c[3]) c[3] = y
    }
  return c
}

const naCaixa = (p, c) => p[0] >= c[0] && p[0] <= c[2] && p[1] >= c[1] && p[1] <= c[3]

/** Recorta uma linha pelo polígono: devolve os troços que ficam dentro. */
function recortar(linha, aneis, caixa) {
  const pts = densificar(linha, 20)
  const trocos = []
  let actual = []
  for (const p of pts) {
    if (naCaixa(p, caixa) && dentro(p, aneis)) actual.push(p)
    else {
      if (actual.length > 1) trocos.push(actual)
      actual = []
    }
  }
  if (actual.length > 1) trocos.push(actual)
  return trocos.filter((t) => comprimento(t) >= TROCO_MIN_M)
}

/**
 * Cose os caminhos de uma relação em linhas contínuas.
 *
 * As relações do OSM nem sempre estão ordenadas, e um caminho pode estar ao
 * contrário. Liga-se ponta com ponta — as coordenadas de um nó partilhado
 * são idênticas nos dois caminhos — e o que não liga fica como parte à
 * parte, pela ordem em que aparece.
 */
function coser(caminhos) {
  const chave = (p) => `${p[0].toFixed(7)},${p[1].toFixed(7)}`
  const livres = caminhos.filter((c) => c.length > 1).map((c) => c.slice())
  const usados = new Set()
  const partes = []
  for (let i = 0; i < livres.length; i++) {
    if (usados.has(i)) continue
    usados.add(i)
    let linha = livres[i]
    let cresceu = true
    while (cresceu) {
      cresceu = false
      for (let j = 0; j < livres.length; j++) {
        if (usados.has(j)) continue
        const c = livres[j]
        const [ini, fim] = [chave(linha[0]), chave(linha.at(-1))]
        const [cIni, cFim] = [chave(c[0]), chave(c.at(-1))]
        if (fim === cIni) linha = linha.concat(c.slice(1))
        else if (fim === cFim) linha = linha.concat(c.slice(0, -1).reverse())
        else if (ini === cFim) linha = c.slice(0, -1).concat(linha)
        else if (ini === cIni) linha = c.slice(1).reverse().concat(linha)
        else continue
        usados.add(j)
        cresceu = true
      }
    }
    partes.push(linha)
  }
  return partes.sort((a, b) => comprimento(b) - comprimento(a))
}

/**
 * Ordena as partes para que a sequência faça sentido a pé: começa pela
 * maior e vai juntando a mais próxima de qualquer das pontas.
 */
function ordenar(partes) {
  if (partes.length < 2) return partes
  const restantes = partes.slice()
  const seq = [restantes.shift()]
  while (restantes.length) {
    const fim = seq.at(-1).at(-1)
    const ini = seq[0][0]
    let melhor = null
    for (const [i, p] of restantes.entries()) {
      for (const [d, lado, inv] of [
        [haversine(fim, p[0]), 'fim', false],
        [haversine(fim, p.at(-1)), 'fim', true],
        [haversine(ini, p.at(-1)), 'ini', false],
        [haversine(ini, p[0]), 'ini', true],
      ]) {
        if (!melhor || d < melhor.d) melhor = { d, i, lado, inv }
      }
    }
    let p = restantes.splice(melhor.i, 1)[0]
    if (melhor.inv) p = p.slice().reverse()
    if (melhor.lado === 'fim') seq.push(p)
    else seq.unshift(p)
  }
  return seq
}

/** Douglas-Peucker numa projecção local em metros. */
function simplificar(linha, tol) {
  if (linha.length < 3) return linha
  const lat0 = linha[0][1] * RAD
  const kx = Math.cos(lat0) * RAD * R_TERRA
  const ky = RAD * R_TERRA
  const xy = linha.map(([lon, lat]) => [lon * kx, lat * ky])
  const manter = new Uint8Array(linha.length)
  manter[0] = manter[linha.length - 1] = 1
  const pilha = [[0, linha.length - 1]]
  while (pilha.length) {
    const [a, b] = pilha.pop()
    let max = 0
    let idx = -1
    const [x1, y1] = xy[a]
    const [x2, y2] = xy[b]
    const dx = x2 - x1
    const dy = y2 - y1
    const l2 = dx * dx + dy * dy
    for (let i = a + 1; i < b; i++) {
      const [x, y] = xy[i]
      let t = l2 ? ((x - x1) * dx + (y - y1) * dy) / l2 : 0
      t = Math.max(0, Math.min(1, t))
      const d = Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
      if (d > max) {
        max = d
        idx = i
      }
    }
    if (max > tol) {
      manter[idx] = 1
      pilha.push([a, idx], [idx, b])
    }
  }
  return linha.filter((_, i) => manter[i])
}

const arred = (v, n = 5) => Math.round(v * 10 ** n) / 10 ** n

function slug(s) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** "PR3 Ohp", "PR2CDN", "PR3 FF - …", "GR33;GRZ" → { tipo, num, concelho, codigo }. */
function lerCodigo(texto) {
  if (!texto) return null
  const m = /\b(GR|PR|PI)\s*-?\s*(\d+(?:\.\d+)?)\s*([A-Za-z]{2,3})?\b/.exec(texto.split(';')[0])
  if (!m) return null
  const tipo = m[1].toUpperCase()
  let conc = m[3] ? m[3].toUpperCase() : null
  if (conc && ALIAS_CONCELHO[conc]) conc = ALIAS_CONCELHO[conc]
  return { tipo, codigo: conc ? `${tipo}${m[2]} ${conc}` : `${tipo}${m[2]}` }
}

/** Tira o código da frente do nome ("PR3 – Rotas das Pontes" → "Rotas das Pontes"). */
function limparNome(nome) {
  return nome
    .replace(/^\s*(GR|PR|PI)\s*-?\s*\d+(\.\d+)?\s*([A-Za-z]{2,3}\b)?\s*[-–—:]?\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── DEM ────────────────────────────────────────────────────────────────

/**
 * As janelas do GLO-30 que tocam a região, lidas por pedidos de intervalo
 * ao COG público e guardadas em cache como Float32 cru.
 */
async function carregarDEM() {
  const janelas = []
  for (const url of DEM_MOSAICOS) {
    const nome = url.split('/').at(-1).replace('.tif', '')
    const binFile = join(CACHE, `${nome}.f32`)
    const metaFile = join(CACHE, `${nome}.json`)
    if (!REFRESCAR && existsSync(binFile) && existsSync(metaFile)) {
      const meta = JSON.parse(readFileSync(metaFile, 'utf8'))
      const buf = readFileSync(binFile)
      janelas.push({ ...meta, dados: new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4) })
      continue
    }
    process.stdout.write(`  DEM: ${nome}\n`)
    const tiff = await fromUrl(url)
    const img = await tiff.getImage()
    const [ox, oy] = img.getOrigin()
    const [rx, ry] = img.getResolution()
    const W = img.getWidth()
    const H = img.getHeight()
    // Caixa da região em píxeis deste mosaico, com margem.
    const px = (lon) => Math.floor((lon - ox) / rx)
    const py = (lat) => Math.floor((lat - oy) / ry)
    const x0 = Math.max(0, px(CAIXA[1]) - 2)
    const x1 = Math.min(W, px(CAIXA[3]) + 2)
    const y0 = Math.max(0, py(CAIXA[2]) - 2)
    const y1 = Math.min(H, py(CAIXA[0]) + 2)
    if (x1 <= x0 || y1 <= y0) continue
    const [dados] = await img.readRasters({ window: [x0, y0, x1, y1], samples: [0] })
    const f32 = Float32Array.from(dados)
    const meta = { ox: ox + x0 * rx, oy: oy + y0 * ry, rx, ry, w: x1 - x0, h: y1 - y0 }
    writeFileSync(binFile, Buffer.from(f32.buffer))
    writeFileSync(metaFile, JSON.stringify(meta))
    janelas.push({ ...meta, dados: f32 })
  }
  if (!janelas.length) throw new Error('Nenhuma janela do DEM foi lida.')

  /** Altitude bilinear. As amostras são o centro do píxel (PixelIsPoint no GLO-30 = canto; usa-se a origem declarada). */
  return function cota(lon, lat) {
    for (const j of janelas) {
      // Nas costuras entre mosaicos o ponto cai no meio píxel da borda de
      // um e no do outro; aceita-se essa meia célula e prende-se à grelha.
      const fx = (lon - j.ox) / j.rx - 0.5
      const fy = (lat - j.oy) / j.ry - 0.5
      if (fx < -0.5 || fy < -0.5 || fx > j.w - 0.5 || fy > j.h - 0.5) continue
      const x = Math.min(Math.max(Math.floor(fx), 0), j.w - 2)
      const y = Math.min(Math.max(Math.floor(fy), 0), j.h - 2)
      const tx = Math.min(Math.max(fx - x, 0), 1)
      const ty = Math.min(Math.max(fy - y, 0), 1)
      const i = y * j.w + x
      const a = j.dados[i]
      const b = j.dados[i + 1]
      const c = j.dados[i + j.w]
      const d = j.dados[i + j.w + 1]
      return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty
    }
    return null
  }
}

/** Perfil medido: cotas suavizadas, desnível, extremos e o perfil para desenhar. */
function medirPerfil(partes, cota, janela = SUAVIZAR) {
  const pts = amostrar(partes, AMOSTRA_M)
  const cru = pts.map(([lon, lat]) => cota(lon, lat))
  if (cru.some((v) => v == null || !Number.isFinite(v))) return null
  const meia = Math.floor(janela / 2)
  const suave = cru.map((_, i) => {
    let s = 0
    let n = 0
    for (let k = Math.max(0, i - meia); k <= Math.min(cru.length - 1, i + meia); k++) {
      s += cru[k]
      n++
    }
    return s / n
  })
  let subida = 0
  let descida = 0
  for (let i = 1; i < suave.length; i++) {
    const dz = suave[i] - suave[i - 1]
    if (dz > 0) subida += dz
    else descida -= dz
  }
  const n = Math.min(PERFIL_PONTOS, suave.length)
  const perfil = Array.from({ length: n }, (_, k) => {
    const f = n === 1 ? 0 : (k * (suave.length - 1)) / (n - 1)
    const i = Math.floor(f)
    const t = f - i
    const v = i + 1 < suave.length ? suave[i] * (1 - t) + suave[i + 1] * t : suave[i]
    return Math.round(v)
  })
  return {
    subida: Math.round(subida),
    descida: Math.round(descida),
    min: Math.round(Math.min(...suave)),
    max: Math.round(Math.max(...suave)),
    perfil,
  }
}

// ── Recolha ────────────────────────────────────────────────────────────

async function lerConcelhos() {
  const features = []
  for (const nome of CONCELHOS) {
    const texto = await comCache(`caop-${slug(nome)}.json`, async () => {
      await sleep(400)
      return pedir(`https://json.geoapi.pt/municipio/${encodeURIComponent(nome)}`)
    })
    const d = JSON.parse(texto)
    const geo = d.geojson?.geometry
    if (!geo) throw new Error(`Sem contorno para ${nome}`)
    features.push({ type: 'Feature', properties: { nome }, geometry: geo })
  }
  return { type: 'FeatureCollection', features }
}

async function lerOSM() {
  const [s, w, n, e] = CAIXA
  const query = `[out:json][timeout:240];
relation["route"~"^(hiking|foot)$"](${s},${w},${n},${e});
out geom;`
  const texto = await comCache('osm-rotas.json', () => overpass(query))
  const osm = JSON.parse(texto)
  const dataBase = osm.osm3s?.timestamp_osm_base?.slice(0, 10) ?? null
  const rotas = []
  for (const rel of osm.elements) {
    const t = rel.tags ?? {}
    const nome = t.name ?? t['name:pt'] ?? t.official_name
    if (!nome) continue
    if (t.pilgrimage === 'yes' || /santiago|f[áa]tima|carmelita|caminho portugu/i.test(`${nome} ${t.ref ?? ''}`)) continue
    const caminhos = (rel.members ?? [])
      .filter((m) => m.type === 'way' && Array.isArray(m.geometry) && !/platform|stop/.test(m.role ?? ''))
      .map((m) => m.geometry.map((g) => [g.lon, g.lat]))
    if (!caminhos.length) continue
    rotas.push({
      fonte: 'osm',
      fonteRef: `relation/${rel.id}`,
      nome,
      ref: t.ref ?? null,
      partes: ordenar(coser(caminhos)),
      website: t.website ?? t.url ?? null,
      operador: t.operator ?? null,
      roundtrip: t.roundtrip ?? null,
      declaradoKm: t.distance ? Number(String(t.distance).replace(',', '.')) : null,
    })
  }
  return { rotas, dataBase }
}

async function lerICNF() {
  const texto = await comCache('icnf-percursos.json', () => pedir(ICNF_WFS))
  const d = JSON.parse(texto)
  return d.features
    .filter((f) => f.properties?.tipo === 'Pedestres' && f.geometry)
    .map((f) => {
      const g = f.geometry
      const linhas = g.type === 'LineString' ? [g.coordinates] : g.coordinates
      return {
        fonte: 'icnf',
        fonteRef: String(f.id),
        nome: f.properties.nome,
        ref: f.properties.nome,
        partes: ordenar(coser(linhas.map((l) => l.map(([x, y]) => [x, y])))),
        website: null,
        operador: 'ICNF',
        roundtrip: null,
        declaradoKm: null,
      }
    })
}

async function lerCamaras() {
  const out = []
  for (const p of CAMARAS) {
    const nome = `camara-${slug(p.url).slice(-60)}`
    let pecas
    try {
      pecas = lerTracado(await comCacheBin(nome, p.url))
    } catch (err) {
      process.stdout.write(`  ${p.codigo}: ${err.message}\n`)
      continue
    }
    const escolhidas = p.pecas ? pecas.filter((x) => p.pecas.test(x.nome)) : pecas
    const linhas = escolhidas
      .flatMap((x) => x.linhas)
      // Há GPX com o mesmo segmento duas vezes (a Rota do Calcário);
      // cosido, dava um percurso com o dobro da extensão.
      .filter((l, i, todas) => todas.findIndex((o) => o.length === l.length && haversine(o[0], l[0]) < 5) === i)
    if (!linhas.length) {
      process.stdout.write(`  ${p.codigo}: nenhuma peça com o nome pedido\n`)
      continue
    }
    out.push({
      fonte: 'camara',
      fonteRef: p.url,
      nome: p.nome,
      ref: p.codigo,
      codigoFixo: p.codigo,
      partes: ordenar(coser(linhas)),
      website: null,
      operador: `Município de ${p.concelho}`,
      roundtrip: null,
      declaradoKm: null,
    })
  }
  return out
}

/** Ida e volta: fica a ida, até ao ponto mais afastado do início. */
function soIda(linha) {
  let longe = 0
  let i = 0
  for (const [k, p] of linha.entries()) {
    const d = haversine(linha[0], p)
    if (d > longe) {
      longe = d
      i = k
    }
  }
  return linha.slice(0, i + 1)
}

function lerLocais() {
  if (!existsSync(PASTA_LOCAL)) return []
  const out = []
  for (const p of LOCAIS) {
    const ficheiro = join(PASTA_LOCAL, p.ficheiro)
    if (!existsSync(ficheiro)) {
      process.stdout.write(`  ${p.codigo}: falta ${p.ficheiro}\n`)
      continue
    }
    let linhas = lerTracado(readFileSync(ficheiro)).flatMap((x) => x.linhas)
    if (p.idaEVolta) linhas = [soIda(linhas.flat())]
    out.push({
      fonte: 'ficheiro',
      fonteRef: p.ficheiro,
      nome: p.nome,
      ref: p.codigo,
      codigoFixo: p.codigo,
      partes: ordenar(coser(linhas)),
      website: null,
      operador: null,
      roundtrip: p.idaEVolta ? 'no' : null,
      declaradoKm: null,
    })
  }
  return out
}

// ── Principal ──────────────────────────────────────────────────────────

const PRIORIDADE = { camara: 0, icnf: 1, ficheiro: 2, osm: 3 }

async function main() {
  process.stdout.write('A ler os concelhos (CAOP via geoapi.pt)…\n')
  const concelhosFC = await lerConcelhos()

  // Dissolver os 19 num contorno só: o topojson reconhece as fronteiras
  // partilhadas e o `merge` deita-as fora.
  const topo = topology({ c: concelhosFC }, 1e6)
  const regiaoGeo = merge(topo, topo.objects.c.geometries)
  const regiaoAneis = regiaoGeo.coordinates.flat()
  const regiaoCaixa = caixaDe(regiaoAneis)
  const concelhosAneis = concelhosFC.features.map((f) => ({
    nome: f.properties.nome,
    aneis: f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates.flat(),
  }))
  for (const c of concelhosAneis) c.caixa = caixaDe(c.aneis)

  process.stdout.write('A ler os percursos…\n')
  const { rotas: osm, dataBase } = await lerOSM()
  const icnf = await lerICNF()
  const cam = await lerCamaras()
  const loc = lerLocais()
  process.stdout.write(`  OSM ${osm.length} · ICNF ${icnf.length} · câmaras ${cam.length} · ficheiros ${loc.length}\n`)

  process.stdout.write('A carregar o DEM (Copernicus GLO-30)…\n')
  const cota = await carregarDEM()

  // Recortar à região e medir.
  const candidatos = []
  for (const r of [...cam, ...icnf, ...loc, ...osm]) {
    if (EXCLUIR[`${r.fonte}:${r.fonteRef}`]) continue
    const antes = r.partes.reduce((s, p) => s + comprimento(p), 0)
    // O código de uma câmara vem declarado à mão; o CNE não é PR nem GR.
    const cod = lerCodigo(r.ref) ?? lerCodigo(r.nome) ?? (r.codigoFixo ? { tipo: null, codigo: r.codigoFixo } : null)
    const recortes = r.partes.flatMap((p) => recortar(p, regiaoAneis, regiaoCaixa))
    if (!recortes.length) continue
    // Uma pequena rota de um concelho da CIM mostra-se inteira, mesmo que
    // espreite para o vizinho (o Trilho do Rebanho anda metade em Figueiró
    // dos Vinhos). O recorte é para as grandes rotas que atravessam a região.
    const daRegiao = cod?.tipo === 'PR' && CODIGOS_CIM.has(cod.codigo.split(' ')[1])
    const partes = daRegiao ? r.partes : recortes
    const depois = partes.reduce((s, p) => s + comprimento(p), 0)
    candidatos.push({ ...r, partes: ordenar(partes), comprimento: depois, recortado: antes - depois > 500, cod })
  }

  // Duplicados: o mesmo código em duas fontes, ou traçados que se
  // sobrepõem em quase toda a extensão do mais curto.
  const proximo = (a, b) => {
    const pa = amostrar(a.partes, 50)
    const pb = amostrar(b.partes, 25)
    let perto = 0
    for (const p of pa) if (pb.some((q) => Math.abs(q[0] - p[0]) < 0.001 && haversine(p, q) < 40)) perto++
    return perto / pa.length
  }
  candidatos.sort((a, b) => PRIORIDADE[a.fonte] - PRIORIDADE[b.fonte] || b.comprimento - a.comprimento)
  const aceites = []
  for (const c of candidatos) {
    const dup = aceites.find((a) => {
      if (a.cod && c.cod && a.cod.codigo === c.cod.codigo) return true
      if (a.cod && c.cod) return false
      const [curto, longo] = a.comprimento < c.comprimento ? [a, c] : [c, a]
      return curto.comprimento / longo.comprimento > 0.6 && proximo(curto, longo) > 0.85
    })
    if (dup) {
      process.stdout.write(`  duplicado: ${c.fonte} "${c.nome}" = ${dup.fonte} "${dup.nome}"\n`)
      continue
    }
    aceites.push(c)
  }

  // Fichas do guia.
  const { GUIA_FICHAS } = await import('../lib/trilhos-guia.ts')
  const fichaPorCodigo = new Map(GUIA_FICHAS.filter((f) => f.codigo).map((f) => [f.codigo, f]))

  const trilhos = []
  const usados = new Set()
  const tabela = []
  for (const c of aceites) {
    const med = medirPerfil(c.partes, cota)
    if (!med) {
      process.stdout.write(`  sem altitude: ${c.nome}\n`)
      continue
    }
    // Concelhos atravessados, pela fracção do traçado em cada um.
    const pts = amostrar(c.partes, 100)
    const conta = new Map()
    for (const p of pts)
      for (const cc of concelhosAneis)
        if (naCaixa(p, cc.caixa) && dentro(p, cc.aneis)) {
          conta.set(cc.nome, (conta.get(cc.nome) ?? 0) + 1)
          break
        }
    const concelhos = [...conta.entries()]
      .filter(([, n]) => n / pts.length >= 0.08)
      .sort((a, b) => b[1] - a[1])
      .map(([nome]) => nome)

    const ini = c.partes[0][0]
    const fim = c.partes.at(-1).at(-1)
    const circular = c.roundtrip === 'yes' || (c.roundtrip !== 'no' && haversine(ini, fim) < CIRCULAR_M)

    const ficha =
      FICHA_POR_FONTE[`${c.fonte}:${c.fonteRef}`] ??
      (c.cod ? fichaPorCodigo.get(c.cod.codigo)?.id : undefined) ??
      null
    const nomeLimpo = limparNome(c.nome) || c.nome
    const codigo = c.cod?.codigo ?? null
    let id = slug(codigo ? `${codigo} ${nomeLimpo}` : nomeLimpo)
    while (usados.has(id)) id += '-b'
    usados.add(id)

    const todos = c.partes.flat()
    const caixa = caixaDe([todos]).map((v) => arred(v, 4))

    trilhos.push({
      id,
      nome: nomeLimpo,
      codigo,
      tipo: c.cod?.tipo ?? null,
      fonte: c.fonte,
      fonteRef: c.fonteRef,
      concelhos,
      distanciaKm: Math.round(c.comprimento / 100) / 10,
      troco: c.recortado,
      circular,
      subida: med.subida,
      descida: med.descida,
      cotaMin: med.min,
      cotaMax: med.max,
      perfil: med.perfil,
      caixa,
      inicio: [arred(ini[0]), arred(ini[1])],
      website: c.website,
      operador: c.operador,
      ficha,
      _partes: c.partes,
      _declaradoKm: c.declaradoKm,
    })

    if (ficha) {
      const f = GUIA_FICHAS.find((g) => g.id === ficha)
      const alt = (janela) => medirPerfil(c.partes, cota, janela)
      tabela.push({
        percurso: `${codigo ?? ''} ${nomeLimpo}`.trim().slice(0, 34),
        'km guia': f.extensaoKm,
        'km medido': Math.round(c.comprimento / 100) / 10,
        'desnível guia': f.desnivel,
        'sobe (3)': alt(3).subida,
        'sobe (7)': med.subida,
        'sobe (15)': alt(15).subida,
        'alt guia': f.altitude ? `${f.altitude.min}–${f.altitude.max}` : '—',
        'alt medida': `${med.min}–${med.max}`,
      })
    }
  }

  trilhos.sort((a, b) => a.concelhos[0]?.localeCompare(b.concelhos[0] ?? '', 'pt') || a.nome.localeCompare(b.nome, 'pt'))

  process.stdout.write(`\n${trilhos.length} percursos com traçado:\n`)
  for (const t of trilhos)
    process.stdout.write(
      `  ${(t.codigo ?? '').padEnd(10)} ${t.nome.slice(0, 44).padEnd(44)} ${String(t.distanciaKm).padStart(6)} km  ` +
        `${t.fonte.padEnd(10)} ${t.concelhos.join(', ')}${t.ficha ? '  [guia]' : ''}${t.troco ? '  [troço]' : ''}\n`,
    )
  if (tabela.length) {
    process.stdout.write('\nMedido contra o guia (desnível com janelas de suavização 3 / 7 / 15 amostras):\n')
    console.table(tabela)
  }

  // Sanidade: abaixo disto é a recolha que falhou, não a região que encolheu.
  if (trilhos.length < 25) throw new Error(`Só ${trilhos.length} percursos — a recolha falhou?`)

  // ── Escrever o traçado ──
  const trilhosGeo = {
    type: 'FeatureCollection',
    features: trilhos.map((t) => {
      const linhas = t._partes.map((p) => simplificar(p, SIMPLIFICAR_M).map(([x, y]) => [arred(x), arred(y)]))
      return {
        type: 'Feature',
        properties: { id: t.id, tipo: t.tipo ?? 'outro', ficha: t.ficha ? 1 : 0, codigo: t.codigo ?? '' },
        geometry: linhas.length === 1 ? { type: 'LineString', coordinates: linhas[0] } : { type: 'MultiLineString', coordinates: linhas },
      }
    }),
  }
  mkdirSync(dirname(OUT_TRILHOS), { recursive: true })
  writeFileSync(OUT_TRILHOS, JSON.stringify(trilhosGeo))

  // ── Escrever a região ──
  const simples = simplify(presimplify(topo), quantile(presimplify(topo), 0.12))
  const regiaoS = merge(simples, simples.objects.c.geometries)
  const limites = mesh(simples, simples.objects.c, (a, b) => a !== b)
  const concS = feature(simples, simples.objects.c)
  const r5 = (g) => JSON.parse(JSON.stringify(g, (k, v) => (typeof v === 'number' ? arred(v, 4) : v)))
  const exteriores = regiaoS.coordinates.map((poly) => poly[0])
  const mundo = [[-30, 25], [15, 25], [15, 55], [-30, 55], [-30, 25]]
  const etiquetas = concS.features.map((f) => {
    const aneis = f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates.sort((a, b) => b[0].length - a[0].length)[0]
    const lat0 = aneis[0][0][1] * RAD
    const kx = Math.cos(lat0) * RAD * R_TERRA
    const ky = RAD * R_TERRA
    const pl = polylabel(aneis.map((a) => a.map(([x, y]) => [x * kx, y * ky])), 100)
    return {
      type: 'Feature',
      properties: { tipo: 'concelho', nome: f.properties.nome },
      geometry: { type: 'Point', coordinates: [arred(pl.x / kx, 4), arred(pl.y / ky, 4)] },
    }
  })
  const regiao = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: { tipo: 'regiao' }, geometry: r5(regiaoS) },
      { type: 'Feature', properties: { tipo: 'mascara' }, geometry: r5({ type: 'Polygon', coordinates: [mundo, ...exteriores] }) },
      { type: 'Feature', properties: { tipo: 'limites' }, geometry: r5(limites) },
      ...etiquetas,
    ],
  }
  writeFileSync(OUT_REGIAO, JSON.stringify(regiao))

  // ── Escrever os dados ──
  const hoje = new Date().toISOString().slice(0, 10)
  const caixaRegiao = regiaoCaixa.map((v) => arred(v, 3))
  const registos = trilhos.map(({ _partes, _declaradoKm, ...t }) => t)
  const ts = `/**
 * GERADO POR scripts/build-trilhos.mjs — NÃO EDITAR À MÃO.
 *
 * Percursos pedestres com traçado aberto nos 19 concelhos da CIM Região de
 * Coimbra, obtidos em ${hoje}. Base do OpenStreetMap: ${dataBase ?? 'desconhecida'}.
 *
 * Distâncias medidas no traçado; altitudes e desnível medidos sobre o
 * Copernicus DEM GLO-30, amostrado a cada ${AMOSTRA_M} m e suavizado em
 * ${SUAVIZAR * AMOSTRA_M} m. Os critérios de recolha estão no cabeçalho do
 * gerador. O traçado em si está em public/data/trilhos.geojson.
 */

export type TipoTrilho = 'GR' | 'PR' | 'PI'
export type FonteTrilho = 'osm' | 'icnf' | 'camara' | 'ficheiro'

export interface TrilhoDados {
  id: string
  nome: string
  /** Código sinalizado (PR3 LSA), quando a fonte o traz. */
  codigo: string | null
  tipo: TipoTrilho | null
  fonte: FonteTrilho
  /** Elemento ou ficheiro na fonte, para conferir ou corrigir. */
  fonteRef: string
  /** Concelhos atravessados, do que leva mais traçado para o que leva menos. */
  concelhos: string[]
  /** Medida no traçado, km. */
  distanciaKm: number
  /** Grande rota recortada pela região: é o troço, não a rota inteira. */
  troco: boolean
  /** Acaba onde começa (etiqueta da fonte ou pontas a menos de ${CIRCULAR_M} m). */
  circular: boolean
  /** Desnível acumulado medido, m. */
  subida: number
  descida: number
  cotaMin: number
  cotaMax: number
  /** Cotas a intervalos iguais do início ao fim, m. */
  perfil: number[]
  /** [oeste, sul, leste, norte] */
  caixa: number[]
  inicio: [number, number]
  website: string | null
  operador: string | null
  /** Ficha no guia da CIM (\`lib/trilhos-guia.ts\`), quando existe. */
  ficha: string | null
}

export const TRILHOS_OBTIDOS_EM = '${hoje}'
export const TRILHOS_OSM_BASE = ${JSON.stringify(dataBase)}
export const REGIAO_CAIXA = ${JSON.stringify(caixaRegiao)} as const

export const TRILHOS_DADOS: TrilhoDados[] = ${JSON.stringify(registos, null, 1)}
`
  writeFileSync(OUT_TS, ts)

  const kb = (f) => `${Math.round(readFileSync(f).length / 1024)} KB`
  process.stdout.write(`\nEscrito: ${OUT_TS} (${kb(OUT_TS)}), ${OUT_TRILHOS} (${kb(OUT_TRILHOS)}), ${OUT_REGIAO} (${kb(OUT_REGIAO)})\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
