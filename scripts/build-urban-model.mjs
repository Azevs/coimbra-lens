#!/usr/bin/env node
/**
 * Gerador das maquetas urbanas — `node scripts/build-urban-model.mjs`
 *
 * Recolhe o que é preciso para modelar uma zona urbana em três dimensões e
 * escreve dois ficheiros: `scripts/blender/<zona>.scene.json`, que o Blender
 * lê, e `lib/urban-zones.ts`, que a página lê. Ambos entram no repositório,
 * pela mesma razão que as zonas verdes entram: o Overpass é um serviço de
 * investigação sem garantia de disponibilidade, e o traçado de uma rua não
 * muda de semana para semana.
 *
 * O QUE DEFINE UMA ZONA, E PORQUE É QUE ISSO IMPORTA
 *
 * Uma freguesia tem fronteira oficial; um bairro não tem. Celas, Solum ou a
 * Norton de Matos são nomes de uso, sem carta, sem código do INE e sem
 * população publicada. Desenhar-lhes um contorno seria inventar o dado de
 * que todos os outros dependeriam — quantos serviços, quanta área, quanta
 * gente.
 *
 * Por isso a primeira zona é uma RUA. A Rua do Brasil existe no OSM com
 * geometria própria, e a zona define-se como o corredor de `raio` metros em
 * torno desse eixo. O recorte continua a ser uma escolha — mas é uma escolha
 * declarada, com um número, aplicada a uma linha que não fui eu que desenhei.
 *
 * A ALTURA DOS EDIFÍCIOS, QUE É O DADO DIFÍCIL
 *
 * O OSM tem a implantação de quase tudo e a altura de quase nada: no corredor
 * da Rua do Brasil, 3 edifícios em 670 declaram `height`. O que existe é
 * `building:levels`, e só em metade deles. Um modelo que preenchesse o resto
 * com uma altura plausível ficaria bonito e seria indistinguível de um
 * inventado — que é exactamente o que este site não faz.
 *
 * Então há três classes, e o modelo mostra-as:
 *
 *   `medida`       — `height`, ou `building:levels` × PE_DIREITO. Ganha volume.
 *   `tipo`         — garagem, telheiro, arrecadação: um piso. Não é palpite,
 *                    é o significado do próprio tag. Ganha volume baixo.
 *   `desconhecida` — tudo o resto sem pisos. NÃO ganha volume: fica a
 *                    implantação desenhada no chão. Sabe-se onde assenta,
 *                    não se sabe quanto sobe, e o modelo diz as duas coisas.
 *
 * FONTES
 *
 *   Edifícios e traçado — OpenStreetMap via Overpass, ODbL.
 *   Altimetria — EU-DEM v1.1 (Copernicus), 25 m, via opentopodata.org.
 *     É o modelo digital de terreno aberto com melhor resolução para
 *     Portugal continental. A Rua do Brasil vence 26 m entre pontas; sem
 *     altimetria a maqueta seria plana e falsa.
 *   Altimetria da Baixa — MDT 2 m do levantamento LiDAR da DGT (2024),
 *     dados abertos, em `scripts/blender/dem/`. Ver `altimetriaDGT`.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { fromFile } from 'geotiff'
import proj4 from 'proj4'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_TS = join(ROOT, 'lib', 'urban-zones.ts')
const OUT_DIR = join(ROOT, 'scripts', 'blender')

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
]
const DEM_URL = 'https://api.opentopodata.org/v1/eudem25m'

/** Metros por piso. Pé-direito corrente do edificado urbano português. */
const PE_DIREITO = 3.0
/** Platibanda/cobertura acima do último piso. */
const REMATE = 0.8
/** Edifícios cujo tag já diz que são de um piso só. */
const UM_PISO = new Set(['garage', 'garages', 'shed', 'carport', 'service', 'hut', 'roof', 'greenhouse'])
/** Abaixo disto é anexo de quintal, não edifício. */
const AREA_MIN_M2 = 12

/**
 * As zonas a gerar.
 *
 * `filtro` existe porque há duas Ruas do Brasil no concelho: a avenida, e uma
 * rua residencial em Ceira a 13 km. Distinguem-se pela etiqueta de etimologia
 * — a avenida tem `name:etymology:wikidata=Q155` (Brasil), a outra não tem
 * etimologia nenhuma. Filtrar por proximidade seria frágil; por etiqueta é
 * exacto.
 */
const ZONAS = [
  {
    id: 'rua-do-brasil',
    nome: 'Rua do Brasil',
    tipo: 'eixo',
    freguesia: 'Santo António dos Olivais / São Martinho do Bispo e Ribeira de Frades',
    raio: 90,
    // Desde Setembro de 2026 com LiDAR (6 folhas, 175–177 × 359–360): o
    // EU-DEM media telhados e copas, como na Baixa.
    terreno: 'dgt',
    via: { nomes: ['Rua do Brasil'], filtro: (t) => t['name:etymology:wikidata'] === 'Q155' },
  },
  /**
   * A Baixa não tem fronteira; tem uma espinha. Da Portagem à Praça 8 de
   * Maio pela Ferreira Borges e pela Visconde da Luz, e daí para norte pela
   * Rua da Sofia — o percurso que qualquer descrição da Baixa segue, e que
   * existe no OSM como vias com nome.
   *
   * Nenhum dos quatro nomes se repete no concelho (verificado em Setembro de
   * 2026), por isso o filtro só tira o polígono de área da Praça 8 de Maio:
   * o contorno de uma praça não é um troço de percurso, e somá-lo daria
   * voltas ao largo em vez de o atravessar.
   *
   * O raio é maior que o da Rua do Brasil porque a Baixa é malha e não
   * frente de rua: a 120 m apanha as travessas até à Rua Direita a poente e
   * o sopé da Alta a nascente, sem subir à Sé Velha.
   */
  {
    id: 'baixa',
    nome: 'Baixa',
    tipo: 'eixo',
    freguesia: 'Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)',
    raio: 120,
    terreno: 'dgt',
    via: {
      nomes: ['Rua Ferreira Borges', 'Rua Visconde da Luz', 'Praça 8 de Maio', 'Rua da Sofia'],
      filtro: (t) => t.area !== 'yes',
    },
  },
]

/**
 * Pontas soltas a menos disto soldam-se no grafo do percurso.
 *
 * Um eixo feito de várias ruas atravessa praças, e o OSM desenha a praça
 * como chão aberto: a Visconde da Luz acaba de um lado da Praça 8 de Maio e
 * a Rua da Sofia começa do outro, a 19 m, sem via com nome entre as duas.
 * Quem lá anda atravessa em linha recta, e é isso que a solda mede. Acima
 * deste valor o eixo continua a ser dado como descontínuo.
 */
const SOLDA_M = 25

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Consulta ao Overpass, com espelhos.
 *
 * Uma resposta vazia conta como falha e passa ao espelho seguinte: os
 * espelhos não estão todos igualmente actualizados, e um `{elements:[]}`
 * silencioso geraria uma maqueta sem edifícios em vez de um erro.
 */
/**
 * Quem está a pedir. Igual ao gerador das zonas verdes, e pela mesma razão:
 * o Overpass responde 406 a um `User-Agent` anónimo, e o do Node é um deles.
 */
const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador de maquetas urbanas)'

async function overpass(query) {
  let ultimo
  for (const url of OVERPASS_MIRRORS) {
    for (let tentativa = 0; tentativa < 3; tentativa++) {
      try {
        const r = await fetch(url, {
          method: 'POST',
          signal: AbortSignal.timeout(300000),
          headers: { 'User-Agent': USER_AGENT },
          body: new URLSearchParams({ data: query }),
        })
        const txt = await r.text()
        if (!txt.trim().startsWith('{')) {
          ultimo = `HTTP ${r.status}: ${txt.slice(0, 120).replace(/\s+/g, ' ')}`
        } else {
          const j = JSON.parse(txt)
          if (j.elements?.length) return j
          ultimo = j.remark ?? 'resposta sem elementos'
        }
      } catch (e) {
        ultimo = e.message
      }
      await sleep(6000)
    }
    console.warn(`  ${url}: ${ultimo} — a passar ao espelho seguinte`)
  }
  throw new Error('Overpass indisponível em todos os espelhos: ' + ultimo)
}

/** Caixa que contém o concelho de Coimbra, para consultas sem `area`. */
const CX_COIMBRA = '40.05,-8.68,40.36,-8.25'

/** Projecção métrica local, plana. A 2 km de extensão a curvatura não conta. */
function projector(lat0, lon0) {
  const rad = (lat0 * Math.PI) / 180
  const mLat = 111132.92 - 559.82 * Math.cos(2 * rad)
  const mLon = 111412.84 * Math.cos(rad) - 93.5 * Math.cos(3 * rad)
  const P = (p) => [(p.lon - lon0) * mLon, (p.lat - lat0) * mLat]
  return { P, mLat, mLon }
}

/** Distância de um ponto a um segmento, no plano projectado. */
function distSegmento(p, a, b) {
  const vx = b[0] - a[0]
  const vy = b[1] - a[1]
  const wx = p[0] - a[0]
  const wy = p[1] - a[1]
  const L = vx * vx + vy * vy
  const t = L ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0
  return Math.hypot(wx - t * vx, wy - t * vy)
}

/** Área com sinal (shoelace). O sinal diz o sentido do polígono. */
function areaAssinada(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
  }
  return a / 2
}

/** Grelha de altimetria sobre a caixa, em blocos de 100 pontos (limite da API). */
async function altimetria(bb, passoM) {
  const { mLat, mLon } = projector((bb.s + bb.n) / 2, 0)
  const nRow = Math.ceil(((bb.n - bb.s) * mLat) / passoM) + 1
  const nCol = Math.ceil(((bb.e - bb.w) * mLon) / passoM) + 1
  const pontos = []
  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      pontos.push([bb.s + ((bb.n - bb.s) * r) / (nRow - 1), bb.w + ((bb.e - bb.w) * c) / (nCol - 1)])
    }
  }
  console.log(`  altimetria: grelha ${nRow}×${nCol} = ${pontos.length} pontos, a ${passoM} m`)
  const elev = []
  for (let i = 0; i < pontos.length; i += 100) {
    const locations = pontos
      .slice(i, i + 100)
      .map((p) => p[0].toFixed(6) + ',' + p[1].toFixed(6))
      .join('|')
    let ok = false
    for (let tentativa = 0; tentativa < 5 && !ok; tentativa++) {
      const r = await fetch(DEM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locations }),
      })
      const j = await r.json()
      if (j.status === 'OK') {
        elev.push(...j.results.map((x) => x.elevation))
        ok = true
      } else {
        await sleep(3000)
      }
    }
    if (!ok) throw new Error('EU-DEM falhou no bloco ' + i)
    process.stdout.write(`\r    ${elev.length}/${pontos.length}`)
    await sleep(1100) // a API pública admite 1 pedido/segundo
  }
  process.stdout.write('\n')
  const buracos = elev.filter((x) => x == null).length
  if (buracos) throw new Error(`altimetria com ${buracos} pontos sem valor`)
  return { nRow, nCol, elev }
}

/**
 * Terreno nu, do LiDAR da DGT.
 *
 * O EU-DEM, o SRTM e o ASTER são modelos de SUPERFÍCIE: medem telhados e
 * copas. Numa rua larga e arejada o erro dilui-se; na malha densa da Baixa
 * não — o EU-DEM punha a Praça 8 de Maio a 31 m e o LiDAR mede 19,7. Os
 * prédios assentavam em cima dos quarteirões vizinhos.
 *
 * O MDT 2 m da DGT é o chão com os edifícios e a vegetação retirados, do
 * levantamento LiDAR nacional. Não tem API aberta — descarrega-se do CDD com
 * registo —, por isso as folhas vivem em `scripts/blender/dem/` e o gerador
 * lê-as de lá. Folhas de 1 × 1 km, em ETRS89 / PT-TM06.
 */
const DIR_DEM = join(ROOT, 'scripts', 'blender', 'dem')
proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')

/**
 * As folhas de um tipo (`MDT` terreno, `MDS` superfície) que tocam a caixa
 * da zona. Folhas a mais na pasta — de outra zona, ou de uma área pedida
 * maior do que o necessário — são ignoradas, não um erro.
 */
async function folhasDGT(tipo, bb) {
  const [ax, ay] = paraTM06.forward([bb.w, bb.s])
  const [bx, by] = paraTM06.forward([bb.e, bb.n])
  const folhas = []
  for (const f of readdirSync(DIR_DEM).filter((f) => new RegExp(`^${tipo}-.*\\.tiff?$`).test(f))) {
    const im = await (await fromFile(join(DIR_DEM, f))).getImage()
    const [w, s, e, n] = im.getBoundingBox()
    if (e < Math.min(ax, bx) || w > Math.max(ax, bx) || n < Math.min(ay, by) || s > Math.max(ay, by)) continue
    const [rx, ry] = im.getResolution()
    folhas.push({
      f, w, s, e, n, rx, ry: -ry,
      W: im.getWidth(), H: im.getHeight(),
      nodata: im.getGDALNoData(),
      r: await im.readRasters({ interleave: true }),
    })
  }
  return folhas
}

/** Valor do píxel de 2 m que contém o ponto (sem interpolar), ou null. */
function pixelDGT(folhas, x, y) {
  for (const t of folhas) {
    if (x < t.w || x >= t.e || y <= t.s || y > t.n) continue
    const v = t.r[Math.floor((t.n - y) / t.ry) * t.W + Math.floor((x - t.w) / t.rx)]
    return v === t.nodata || v <= -999 ? null : v
  }
  return null
}

function dentroDoPoligono(x, y, pol) {
  let dentro = false
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [xi, yi] = pol[i]
    const [xj, yj] = pol[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro
  }
  return dentro
}

/**
 * ALTURA MEDIDA PELO LASER
 *
 * O MDS é o topo de tudo o que o laser tocou; o MDT é o chão. Dentro do
 * contorno de um edifício, a diferença é a altura do edifício — medida, não
 * estimada, e para todos os edifícios de uma vez, com ou sem pisos no OSM.
 *
 * Três escolhas, e porquê:
 *   - MEDIANA dos píxeis, não o máximo: uma chaminé, uma antena ou uma torre
 *     sineira não fazem o prédio inteiro subir. É a altura da maior parte
 *     do telhado — a que um prisma de maqueta deve ter.
 *   - RECUO de 1 m das paredes: no bordo, o píxel de 2 m apanha meio telhado
 *     e meio passeio. Nos edifícios pequenos, se o recuo deixar menos de
 *     PIXEIS_MIN píxeis, mede-se sem ele.
 *   - Abaixo de ALTURA_MIN_LIDAR, o laser não viu volume: ou o edifício já
 *     não existe, ou o contorno do OSM está deslocado. Não se inventa um
 *     volume — fica o que o OSM disser, e o caso é contado.
 *
 * O que o MDS não sabe separar: uma árvore por cima de um telhado baixo.
 * Na Baixa isso é raro; numa zona arborizada seria de verificar.
 */
const RECUO_M = 1.0
const PIXEIS_MIN = 3
const ALTURA_MIN_LIDAR = 2.0

function alturaLidar(geom, mdt, mds) {
  const pol = geom.map((p) => paraTM06.forward([p.lon, p.lat]))
  const xs = pol.map((p) => p[0])
  const ys = pol.map((p) => p[1])
  const bordos = pol.map((p, i) => [p, pol[(i + 1) % pol.length]])
  const amostras = (recuo) => {
    const d = []
    // Centros dos píxeis: as folhas começam em milhares de metros, portanto
    // os centros caem nos ímpares.
    for (let x = Math.floor((Math.min(...xs) - 1) / 2) * 2 + 1; x <= Math.max(...xs); x += 2) {
      for (let y = Math.floor((Math.min(...ys) - 1) / 2) * 2 + 1; y <= Math.max(...ys); y += 2) {
        if (!dentroDoPoligono(x, y, pol)) continue
        if (recuo && Math.min(...bordos.map(([a, b]) => distSegmento([x, y], a, b))) < recuo) continue
        const s = pixelDGT(mds, x, y)
        const t = pixelDGT(mdt, x, y)
        if (s != null && t != null) d.push(s - t)
      }
    }
    return d
  }
  let d = amostras(RECUO_M)
  if (d.length < PIXEIS_MIN) d = amostras(0)
  if (d.length < PIXEIS_MIN) return null
  d.sort((a, b) => a - b)
  return d[Math.floor(d.length / 2)]
}

/**
 * ÁRVORES, MEDIDAS E NÃO SEMEADAS
 *
 * Uma árvore entra na maqueta quando duas fontes independentes concordam
 * num píxel de 2 m:
 *   - a ortofoto da DGT (2025, 25 cm, com infravermelho próximo) diz que ali
 *     há vegetação — NDVI acima de NDVI_MIN. Sozinha apanharia relva.
 *   - o LiDAR mede ali mais de COPA_MIN_M acima do chão. Sozinho apanharia
 *     muros e telheiros.
 * e o píxel não está dentro do contorno de nenhum edifício.
 *
 * A ortofoto não é verdadeira: uma copa aparece deslocada um ou dois metros
 * em relação à vertical. Por isso o NDVI conta na vizinhança 3 × 3 do píxel,
 * e é o LiDAR — que é vertical — que decide onde a copa está.
 *
 * Cada árvore é um máximo local da altura medida; a copa é o conjunto de
 * píxeis de vegetação mais próximos desse topo, e a área deles dá o raio.
 * Posição, altura e tamanho são todos medidos. O que não se sabe — a forma
 * exacta da copa, a espécie — a maqueta não finge: é uma bola de cartão.
 */
const NDVI_MIN = 0.2
const COPA_MIN_M = 2.5
const ALTURA_ARVORE_MIN = 3
const RAIO_TOPO_PX = 2 // janela de 5 × 5 píxeis (10 m) para um topo
const ALCANCE_COPA_M = 8
const PIXEIS_COPA_MIN = 3

/** Folhas de ortofoto que tocam a caixa, e se juntas a cobrem inteira. */
async function ortoDGT(caixa) {
  const folhas = []
  for (const f of readdirSync(DIR_DEM).filter((f) => /^ortos.*\.tiff?$/.test(f))) {
    const t = await fromFile(join(DIR_DEM, f))
    const [w, s, e, n] = (await t.getImage(0)).getBoundingBox()
    if (e <= caixa[0] || w >= caixa[2] || n <= caixa[1] || s >= caixa[3]) continue
    folhas.push({ f, t, w, s, e, n })
  }
  let completa = folhas.length > 0
  for (let x = caixa[0]; x <= caixa[2] && completa; x += 20) {
    for (let y = caixa[1]; y <= caixa[3]; y += 20) {
      if (!folhas.some((q) => x >= q.w && x <= q.e && y >= q.s && y <= q.n)) { completa = false; break }
    }
  }
  return { folhas, completa }
}

/** R, G, B e NIR numa grelha de `passo` m sobre a caixa (linha 0 = norte). */
async function lerOrto(folhas, caixa, passo) {
  const W = Math.round((caixa[2] - caixa[0]) / passo)
  const H = Math.round((caixa[3] - caixa[1]) / passo)
  const bandas = [0, 1, 2, 3].map(() => new Uint8Array(W * H))
  const valido = new Uint8Array(W * H)
  for (const q of folhas) {
    const ix0 = Math.max(caixa[0], q.w), ix1 = Math.min(caixa[2], q.e)
    const iy0 = Math.max(caixa[1], q.s), iy1 = Math.min(caixa[3], q.n)
    if (ix1 <= ix0 || iy1 <= iy0) continue
    const w = Math.round((ix1 - ix0) / passo), h = Math.round((iy1 - iy0) / passo)
    const r = await q.t.readRasters({ bbox: [ix0, iy0, ix1, iy1], width: w, height: h })
    const c0 = Math.round((ix0 - caixa[0]) / passo), r0 = Math.round((caixa[3] - iy1) / passo)
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const s = j * w + i
        if (r[4] && r[4][s] === 0) continue // máscara da DGT: sem fotografia
        const k = (r0 + j) * W + (c0 + i)
        for (let b = 0; b < 4; b++) bandas[b][k] = r[b][s]
        valido[k] = 1
      }
    }
  }
  return { W, H, bandas, valido }
}

async function arvoresDGT({ caixa, mdt, mds, orto, pegadas, paraLocal, naZona }) {
  const P2 = 2
  const { W, H, bandas, valido } = await lerOrto(orto, caixa, P2)
  const [R, , , N] = bandas
  const cx = (i) => caixa[0] + (i + 0.5) * P2
  const cy = (j) => caixa[3] - (j + 0.5) * P2
  const ndsm = new Float32Array(W * H).fill(NaN)
  const ndvi = new Float32Array(W * H).fill(-1)
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const k = j * W + i
      const s = pixelDGT(mds, cx(i), cy(j))
      const t = pixelDGT(mdt, cx(i), cy(j))
      if (s != null && t != null) ndsm[k] = s - t
      if (valido[k]) ndvi[k] = (N[k] - R[k]) / (N[k] + R[k] + 1e-6)
    }
  }
  // Contornos de todos os edifícios da caixa, não só os do corredor: um
  // terraço ajardinado não é uma árvore.
  const edif = new Uint8Array(W * H)
  for (const pol of pegadas) {
    const xs = pol.map((p) => p[0]), ys = pol.map((p) => p[1])
    const i0 = Math.max(0, Math.floor((Math.min(...xs) - caixa[0]) / P2))
    const i1 = Math.min(W - 1, Math.ceil((Math.max(...xs) - caixa[0]) / P2))
    const j0 = Math.max(0, Math.floor((caixa[3] - Math.max(...ys)) / P2))
    const j1 = Math.min(H - 1, Math.ceil((caixa[3] - Math.min(...ys)) / P2))
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      if (dentroDoPoligono(cx(i), cy(j), pol)) edif[j * W + i] = 1
    }
  }
  const veg = new Uint8Array(W * H)
  for (let j = 1; j < H - 1; j++) {
    for (let i = 1; i < W - 1; i++) {
      const k = j * W + i
      if (edif[k] || !(ndsm[k] >= COPA_MIN_M)) continue
      let verde = false
      for (let dj = -1; dj <= 1 && !verde; dj++) for (let di = -1; di <= 1; di++) {
        if (ndvi[k + dj * W + di] > NDVI_MIN) { verde = true; break }
      }
      if (verde) veg[k] = 1
    }
  }
  // Topos: máximos locais da altura medida, com desempate pelo índice para
  // um patamar de valores iguais dar um topo e não vários.
  const topos = []
  const Rt = RAIO_TOPO_PX
  for (let j = Rt; j < H - Rt; j++) {
    for (let i = Rt; i < W - Rt; i++) {
      const k = j * W + i
      if (!veg[k] || ndsm[k] < ALTURA_ARVORE_MIN) continue
      let max = true
      for (let dj = -Rt; dj <= Rt && max; dj++) for (let di = -Rt; di <= Rt; di++) {
        const m = k + dj * W + di
        if (m === k || !veg[m]) continue
        if (ndsm[m] > ndsm[k] || (ndsm[m] === ndsm[k] && m < k)) { max = false; break }
      }
      if (max) topos.push({ i, j, h: ndsm[k], n: 0 })
    }
  }
  // Copa: cada píxel de vegetação conta para o topo mais próximo.
  const B = Math.ceil(ALCANCE_COPA_M / P2)
  const balde = new Map()
  topos.forEach((t, idx) => {
    const chave = `${Math.floor(t.i / B)},${Math.floor(t.j / B)}`
    if (!balde.has(chave)) balde.set(chave, [])
    balde.get(chave).push(idx)
  })
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      if (!veg[j * W + i]) continue
      const bi = Math.floor(i / B), bj = Math.floor(j / B)
      let melhor = -1, dMin = (ALCANCE_COPA_M / P2) ** 2
      for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
        for (const idx of balde.get(`${bi + a},${bj + b}`) ?? []) {
          const d = (topos[idx].i - i) ** 2 + (topos[idx].j - j) ** 2
          if (d <= dMin) { dMin = d; melhor = idx }
        }
      }
      if (melhor >= 0) topos[melhor].n++
    }
  }
  const arvores = []
  for (const t of topos) {
    if (t.n < PIXEIS_COPA_MIN) continue
    const p = paraLocal(cx(t.i), cy(t.j))
    if (!naZona(p)) continue
    arvores.push({
      p: [+p[0].toFixed(2), +p[1].toFixed(2)],
      h: +t.h.toFixed(2),
      r: +Math.sqrt((t.n * P2 * P2) / Math.PI).toFixed(2),
    })
  }
  return arvores
}

/**
 * O rectângulo de folhas completas que mais cobre a caixa da zona, e a caixa
 * em graus que ele cobre.
 *
 * As folhas que tocam a caixa nem sempre formam um rectângulo: a margem da
 * Rua do Brasil chega à coluna 174, onde há a folha 174360 da Baixa mas não
 * a 174359, e a união fica em L. Em vez de exigir um rectângulo, escolhe-se
 * o maior que existe — a placa recorta-se a ele, e o que ficar de fora é
 * contado no registo, como qualquer edifício fora do terreno medido.
 */
function coberturaDGT(todas, bb) {
  const [ax, ay] = paraTM06.forward([bb.w, bb.s])
  const [bx, by] = paraTM06.forward([bb.e, bb.n])
  const cx0 = Math.min(ax, bx), cx1 = Math.max(ax, bx), cy0 = Math.min(ay, by), cy1 = Math.max(ay, by)
  const L = todas[0].e - todas[0].w
  const chave = (c, r) => `${c},${r}`
  const porCelula = new Map(todas.map((t) => [chave(Math.round(t.w / L), Math.round(t.s / L)), t]))
  const cols = [...new Set(todas.map((t) => Math.round(t.w / L)))].sort((a, b) => a - b)
  const rows = [...new Set(todas.map((t) => Math.round(t.s / L)))].sort((a, b) => a - b)
  let melhor = null
  let melhorArea = 0
  for (const c0 of cols) for (const c1 of cols) for (const r0 of rows) for (const r1 of rows) {
    if (c1 < c0 || r1 < r0) continue
    let completo = true
    for (let c = c0; c <= c1 && completo; c++) for (let r = r0; r <= r1; r++) if (!porCelula.has(chave(c, r))) { completo = false; break }
    if (!completo) continue
    const iw = Math.max(0, Math.min(cx1, (c1 + 1) * L) - Math.max(cx0, c0 * L))
    const ih = Math.max(0, Math.min(cy1, (r1 + 1) * L) - Math.max(cy0, r0 * L))
    if (iw * ih > melhorArea) {
      melhorArea = iw * ih
      melhor = { c0, c1, r0, r1 }
    }
  }
  if (!melhor) throw new Error('nenhum rectângulo de folhas MDT cobre a zona')
  const folhas = todas.filter((t) => {
    const c = Math.round(t.w / L), r = Math.round(t.s / L)
    return c >= melhor.c0 && c <= melhor.c1 && r >= melhor.r0 && r <= melhor.r1
  })
  const w = melhor.c0 * L, e = (melhor.c1 + 1) * L, s = melhor.r0 * L, n = (melhor.r1 + 1) * L
  if (folhas.length < todas.length) {
    console.log(`  folhas MDT: ${folhas.length} em rectângulo; ignoradas ${todas.filter((t) => !folhas.includes(t)).map((t) => t.f).join(', ')}`)
  }
  // 4 m para dentro, e o canto mais interior de cada lado: a grelha PT-TM06
  // está rodada ~0,2° em relação ao norte geográfico.
  const g = (x, y) => proj4('EPSG:3763', 'EPSG:4326', [x, y])
  const [sw, se, nw, ne] = [g(w + 4, s + 4), g(e - 4, s + 4), g(w + 4, n - 4), g(e - 4, n - 4)]
  return {
    cob: {
      w: Math.max(sw[0], nw[0]),
      e: Math.min(se[0], ne[0]),
      s: Math.max(sw[1], se[1]),
      n: Math.min(nw[1], ne[1]),
    },
    folhas,
  }
}

async function altimetriaDGT(folhas, bb, passoM) {
  const { mLat, mLon } = projector((bb.s + bb.n) / 2, 0)
  const nRow = Math.ceil(((bb.n - bb.s) * mLat) / passoM) + 1
  const nCol = Math.ceil(((bb.e - bb.w) * mLon) / passoM) + 1
  console.log(`  altimetria: LiDAR DGT, grelha ${nRow}×${nCol} a ${passoM} m, ${folhas.length} folhas`)
  // Bilinear sobre os centros de píxel, na folha que contém o ponto.
  const amostra = (x, y) => {
    for (const t of folhas) {
      if (x < t.w || x > t.e || y < t.s || y > t.n) continue
      const fc = Math.max(0, Math.min(t.W - 1.001, (x - t.w) / t.rx - 0.5))
      const fr = Math.max(0, Math.min(t.H - 1.001, (t.n - y) / t.ry - 0.5))
      const c = Math.floor(fc)
      const r = Math.floor(fr)
      const v = [t.r[r * t.W + c], t.r[r * t.W + c + 1], t.r[(r + 1) * t.W + c], t.r[(r + 1) * t.W + c + 1]]
      if (v.some((q) => q === t.nodata || q <= -999)) return null
      const tc = fc - c
      const tr = fr - r
      return v[0] * (1 - tc) * (1 - tr) + v[1] * tc * (1 - tr) + v[2] * (1 - tc) * tr + v[3] * tc * tr
    }
    return null
  }
  // Cada nó é a média da sua célula, não o valor de um ponto. Tirar uma
  // amostra de 4 em 4 m de um raster de 2 m, sem filtrar, transforma os
  // degraus finos do LiDAR — muros, taludes, lancis — em filas regulares de
  // dentes na encosta. Quatro amostras a ±passo/4 cobrem a célula inteira.
  const q = passoM / 4
  const TOQUES = [[-q, -q], [q, -q], [-q, q], [q, q]]
  const elev = []
  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      const lat = bb.s + ((bb.n - bb.s) * r) / (nRow - 1)
      const lon = bb.w + ((bb.e - bb.w) * c) / (nCol - 1)
      const [x, y] = paraTM06.forward([lon, lat])
      const v = TOQUES.map(([dx, dy]) => amostra(x + dx, y + dy))
      elev.push(v.some((a) => a == null) ? null : (v[0] + v[1] + v[2] + v[3]) / 4)
    }
  }
  const buracos = elev.filter((x) => x == null).length
  if (buracos) throw new Error(`LiDAR com ${buracos} pontos sem valor — falta uma folha?`)
  return { nRow, nCol, elev: elev.map((v) => +v.toFixed(2)) }
}

/** Interpolação bilinear na grelha, em coordenadas projectadas. */
function interpolador(dem, x0, x1, y0, y1) {
  const { nRow, nCol, elev } = dem
  return (x, y) => {
    const fc = ((x - x0) / (x1 - x0)) * (nCol - 1)
    const fr = ((y - y0) / (y1 - y0)) * (nRow - 1)
    const c = Math.max(0, Math.min(nCol - 2, Math.floor(fc)))
    const r = Math.max(0, Math.min(nRow - 2, Math.floor(fr)))
    const tc = Math.max(0, Math.min(1, fc - c))
    const tr = Math.max(0, Math.min(1, fr - r))
    const g = (rr, cc) => elev[rr * nCol + cc]
    return (
      g(r, c) * (1 - tc) * (1 - tr) +
      g(r, c + 1) * tc * (1 - tr) +
      g(r + 1, c) * (1 - tc) * tr +
      g(r + 1, c + 1) * tc * tr
    )
  }
}

async function gerarZona(z) {
  console.log(`\n${z.nome}`)

  // --- eixo ---
  // Por caixa, e não por `area[...]["name"="Coimbra"]`: a resolução da área
  // administrativa não está disponível em todos os espelhos, e falhava em
  // silêncio com uma lista vazia. O filtro por etiqueta faz a triagem fina.
  const nomes = z.via.nomes.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const jr = await overpass(`[out:json][timeout:180];
way["highway"]["name"~"^(${nomes})$"](${CX_COIMBRA});
out tags geom;`)
  const vias = jr.elements.filter((e) => z.via.filtro(e.tags ?? {}))
  if (!vias.length) throw new Error(`nenhuma via passou o filtro em ${z.nome}`)
  console.log(`  eixo: ${vias.length} troços (de ${jr.elements.length} com o nome)`)

  const todos = vias.flatMap((w) => w.geometry)
  const lats = todos.map((p) => p.lat)
  const lons = todos.map((p) => p.lon)
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2
  const lon0 = (Math.min(...lons) + Math.max(...lons)) / 2
  const { P, mLat, mLon } = projector(lat0, lon0)

  const segs = []
  for (const w of vias) {
    const g = w.geometry.map(P)
    for (let i = 1; i < g.length; i++) segs.push([g[i - 1], g[i]])
  }
  const aoEixo = (p) => Math.min(...segs.map((s) => distSegmento(p, s[0], s[1])))

  /**
   * Comprimento da rua: o percurso de uma ponta à outra.
   *
   * Somar os troços daria 2290 m numa rua de 1,8 km — conta duas vezes cada
   * faixa dos troços de sentido separado, e ainda soma as duas rotundas. E
   * desduplicar por proximidade é frágil, porque as faixas afastam-se e
   * aproximam-se ao longo da avenida.
   *
   * O que uma pessoa quer dizer com "comprimento" é quanto se anda de ponta a
   * ponta. Isso mede-se com o caminho mais curto sobre o grafo dos troços,
   * entre os dois extremos mais afastados — e aí cada faixa conta uma vez
   * porque só se percorre uma.
   */
  const comprimento = (() => {
    const chave = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`
    const vizinhos = new Map()
    const pos = new Map()
    for (const [a, b] of segs) {
      const ka = chave(a)
      const kb = chave(b)
      pos.set(ka, a)
      pos.set(kb, b)
      const d = Math.hypot(b[0] - a[0], b[1] - a[1])
      if (!vizinhos.has(ka)) vizinhos.set(ka, [])
      if (!vizinhos.has(kb)) vizinhos.set(kb, [])
      vizinhos.get(ka).push([kb, d])
      vizinhos.get(kb).push([ka, d]) // não-dirigido: mede-se a rua, não o sentido
    }
    // Solda: ligar cada ponta solta ao nó mais próximo de outro troço, se
    // estiver a menos de SOLDA_M. Ver a nota junto da constante.
    const nos = [...pos.keys()]
    const troco = new Map()
    vias.forEach((w, i) => w.geometry.forEach((p) => troco.set(chave(P(p)), i)))
    for (const k of nos) {
      if (vizinhos.get(k).length !== 1) continue
      const p = pos.get(k)
      let melhor = null
      let dMin = SOLDA_M
      for (const q of nos) {
        if (troco.get(q) === troco.get(k)) continue
        const r = pos.get(q)
        const d = Math.hypot(p[0] - r[0], p[1] - r[1])
        if (d > 0.5 && d < dMin) {
          dMin = d
          melhor = q
        }
      }
      if (melhor) {
        vizinhos.get(k).push([melhor, dMin])
        vizinhos.get(melhor).push([k, dMin])
        console.log(`  solda de ${dMin.toFixed(1)} m entre troços`)
      }
    }
    // Os dois extremos: o par de nós mais afastado em linha recta.
    let melhor = [nos[0], nos[0]]
    let maior = -1
    for (let i = 0; i < nos.length; i++) {
      for (let j = i + 1; j < nos.length; j++) {
        const p = pos.get(nos[i])
        const q = pos.get(nos[j])
        const d = Math.hypot(p[0] - q[0], p[1] - q[1])
        if (d > maior) {
          maior = d
          melhor = [nos[i], nos[j]]
        }
      }
    }
    // Dijkstra do primeiro extremo ao segundo.
    const [origem, destino] = melhor
    const dist = new Map([[origem, 0]])
    const porVisitar = new Set(nos)
    while (porVisitar.size) {
      let u = null
      for (const n of porVisitar) if (dist.has(n) && (u === null || dist.get(n) < dist.get(u))) u = n
      if (u === null) break
      porVisitar.delete(u)
      if (u === destino) break
      for (const [v, d] of vizinhos.get(u) ?? []) {
        const alt = dist.get(u) + d
        if (!dist.has(v) || alt < dist.get(v)) dist.set(v, alt)
      }
    }
    if (!dist.has(destino)) throw new Error('o eixo não é contínuo: extremos sem caminho entre si')
    return dist.get(destino)
  })()

  // --- caixa de recolha ---
  // Vem do eixo mais o raio, nunca do tamanho da placa: a rua sobe na
  // diagonal, e uma caixa dimensionada para a composição corta edifícios
  // que estão dentro do corredor nas pontas.
  const eixoXs = segs.flatMap((s) => [s[0][0], s[1][0]])
  const eixoYs = segs.flatMap((s) => [s[0][1], s[1][1]])
  const MARGEM = 60
  const alcanceX = Math.max(...eixoXs.map(Math.abs)) + z.raio + MARGEM
  const alcanceY = Math.max(...eixoYs.map(Math.abs)) + z.raio + MARGEM
  const bb = {
    s: lat0 - alcanceY / mLat,
    n: lat0 + alcanceY / mLat,
    w: lon0 - alcanceX / mLon,
    e: lon0 + alcanceX / mLon,
  }
  // O edificado recolhe-se na caixa inteira, antes de qualquer recorte, para
  // que o que fica fora do terreno medido seja contado e dito, não omitido.
  const bbRecolha = { ...bb }
  let dem
  let folhas = null
  let folhasMDS = []
  if (z.terreno === 'dgt') {
    // A placa encolhe ao que as folhas cobrem, nunca o contrário: terreno
    // que não se mediu não se desenha.
    folhas = await folhasDGT('MDT', bb)
    if (!folhas.length) throw new Error(`nenhuma folha MDT em ${DIR_DEM} cobre ${z.nome}`)
    folhasMDS = await folhasDGT('MDS', bb)
    console.log(
      folhasMDS.length
        ? `  alturas: LiDAR DGT, ${folhasMDS.length} folhas MDS`
        : '  alturas: sem folhas MDS — só as do OSM'
    )
    const { cob, folhas: noRectangulo } = coberturaDGT(folhas, bb)
    folhas = noRectangulo
    const antes = { ...bb }
    bb.w = Math.max(bb.w, cob.w)
    bb.e = Math.min(bb.e, cob.e)
    bb.s = Math.max(bb.s, cob.s)
    bb.n = Math.min(bb.n, cob.n)
    const cortes = ['w', 'e', 's', 'n'].filter((k) => bb[k] !== antes[k])
    if (cortes.length) console.log(`  caixa recortada à cobertura do LiDAR em: ${cortes.join(', ')}`)
    dem = await altimetriaDGT(folhas, bb, 4)
  } else {
    dem = await altimetria(bb, 40)
  }
  const x0 = (bb.w - lon0) * mLon
  const x1 = (bb.e - lon0) * mLon
  const y0 = (bb.s - lat0) * mLat
  const y1 = (bb.n - lat0) * mLat
  const alt = interpolador(dem, x0, x1, y0, y1)

  // --- edificado ---
  const jb = await overpass(`[out:json][timeout:300];
(
  way["building"](${bbRecolha.s},${bbRecolha.w},${bbRecolha.n},${bbRecolha.e});
  relation["building"](${bbRecolha.s},${bbRecolha.w},${bbRecolha.n},${bbRecolha.e});
);
out tags geom;`)
  console.log(`  edificado: ${jb.elements.length} na caixa`)

  const edificios = []
  const conta = { medida: 0, tipo: 0, desconhecida: 0 }
  let areaImplantacao = 0
  let foraDoTerreno = 0
  /** Edifícios medidos pelo LiDAR, e a diferença OSM − LiDAR onde há as duas. */
  const lidar = { n: 0, semVolume: 0, dif: [] }
  /** Contornos de edifícios omitidos (centro fora do raio) que atravessam a borda da zona. */
  const cortados = []
  for (const e of jb.elements) {
    const g = (e.geometry ?? []).filter((p) => p && p.lat != null)
    if (g.length < 4) continue
    const pts = g.map(P)
    const [px, py] = pts[0]
    const [qx, qy] = pts[pts.length - 1]
    if (Math.hypot(px - qx, py - qy) < 0.01) pts.pop() // fecho repetido
    if (pts.length < 3) continue

    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length
    if (aoEixo([cx, cy]) > z.raio) {
      // Fora da zona mas a tocar-lhe: guarda-se o contorno para o chão
      // fotográfico não o mostrar espalmado na borda (ver build-orto.mjs).
      if (pts.some((p) => aoEixo(p) <= z.raio)) cortados.push(pts.map((p) => [+p[0].toFixed(2), +p[1].toFixed(2)]))
      continue
    }
    if (pts.some(([x, y]) => x < x0 || x > x1 || y < y0 || y > y1)) {
      foraDoTerreno++
      continue
    }

    const area = Math.abs(areaAssinada(pts))
    if (area < AREA_MIN_M2) continue

    const t = e.tags ?? {}
    const pisos = parseFloat(t['building:levels'])
    const altura = parseFloat(t.height)
    const hOSM = Number.isFinite(altura) && altura > 1 ? altura
      : Number.isFinite(pisos) && pisos >= 1 ? pisos * PE_DIREITO + REMATE : null
    const hL = folhasMDS.length ? alturaLidar(g, folhas, folhasMDS) : null
    let h, classe
    if (hL != null && hL >= ALTURA_MIN_LIDAR) {
      // Medida pelo laser: vence qualquer outra fonte.
      h = hL
      classe = 'medida'
      lidar.n++
      if (hOSM != null) lidar.dif.push(hOSM - hL)
    } else if (folhasMDS.length && hOSM != null && hL != null) {
      // O OSM diz que há prédio e o laser não o vê. Fica o do OSM, contado.
      lidar.semVolume++
      h = hOSM
      classe = 'medida'
    } else if (Number.isFinite(altura) && altura > 1) {
      h = altura
      classe = 'medida'
    } else if (Number.isFinite(pisos) && pisos >= 1) {
      h = pisos * PE_DIREITO + REMATE
      classe = 'medida'
    } else if (UM_PISO.has(t.building)) {
      h = 2.6
      classe = 'tipo'
    } else {
      h = 0
      classe = 'desconhecida'
    }
    conta[classe]++
    areaImplantacao += area

    edificios.push({
      p: pts.map((p) => [+p[0].toFixed(2), +p[1].toFixed(2)]),
      h: +h.toFixed(2),
      // Cota do terreno sob a implantação: o mínimo, para o volume assentar
      // no ponto baixo em vez de flutuar sobre o declive.
      z: +Math.min(...pts.map((p) => alt(p[0], p[1]))).toFixed(2),
      c: classe,
      t: t.building,
      lv: Number.isFinite(pisos) ? pisos : null,
      n: t.name ?? null,
    })
  }
  console.log(
    `  no corredor de ${z.raio} m: ${edificios.length} — ` +
      `${conta.medida} com altura, ${conta.tipo} de um piso por tipo, ${conta.desconhecida} sem altura`
  )
  if (foraDoTerreno) console.log(`  ${foraDoTerreno} edifícios do corredor ficam fora do terreno medido e saem do modelo`)
  if (folhasMDS.length) {
    const d = [...lidar.dif].sort((a, b) => a - b)
    const abs = d.map(Math.abs).sort((a, b) => a - b)
    const q = (v, f) => (v.length ? v[Math.floor(v.length * f)].toFixed(1) : '—')
    console.log(`  LiDAR: ${lidar.n} edifícios medidos; ${lidar.semVolume} com pisos no OSM mas sem volume no laser`)
    console.log(
      `  OSM − LiDAR em ${d.length} com as duas: mediana ${q(d, 0.5)} m, ` +
        `desvio absoluto mediano ${q(abs, 0.5)} m, p90 ${q(abs, 0.9)} m`
    )
  }

  // A placa da maqueta ajusta-se ao que existe: eixo e edificado, mais uma
  // bordadura, e nunca além do terreno medido. Fixá-la a olho — ou simétrica
  // em torno do centro — deixaria hectares de terreno vazio à volta de uma
  // rua que não é recta.
  const BORDA = 45
  const xs = edificios.flatMap((b) => b.p.map((p) => p[0])).concat(eixoXs)
  const ys = edificios.flatMap((b) => b.p.map((p) => p[1])).concat(eixoYs)
  const placa = {
    x0: Math.max(x0, Math.floor((Math.min(...xs) - BORDA) / 5) * 5),
    x1: Math.min(x1, Math.ceil((Math.max(...xs) + BORDA) / 5) * 5),
    y0: Math.max(y0, Math.floor((Math.min(...ys) - BORDA) / 5) * 5),
    y1: Math.min(y1, Math.ceil((Math.max(...ys) + BORDA) / 5) * 5),
    // Lado da quadrícula da malha do terreno no Blender: fina onde o
    // terreno é medido a 2 m, grossa onde a fonte é de 25 m.
    passo: z.terreno === 'dgt' ? 5 : 12,
  }
  console.log(`  placa: ${Math.round(placa.x1 - placa.x0)} × ${Math.round(placa.y1 - placa.y0)} m`)

  // Com o LiDAR, a grelha volta a amostrar-se exactamente sobre a placa, e
  // o Blender usa os nós dela como vértices do terreno. Uma malha de passo
  // diferente da grelha desfasa-se dela de tantos em tantos metros, e o
  // desfasamento desenha na encosta uma serrilha regular que não existe.
  let demFinal = { x0, x1, y0, y1, ...dem }
  if (folhas) {
    const bbPlaca = {
      w: lon0 + placa.x0 / mLon,
      e: lon0 + placa.x1 / mLon,
      s: lat0 + placa.y0 / mLat,
      n: lat0 + placa.y1 / mLat,
    }
    const passo = 4
    const g = await altimetriaDGT(folhas, bbPlaca, passo)
    demFinal = { x0: placa.x0, x1: placa.x1, y0: placa.y0, y1: placa.y1, ...g }
    placa.grelha = true
  }

  // --- árvores: ortofoto + LiDAR, na mesma regra de corredor dos edifícios ---
  let arvores = null
  if (folhasMDS.length) {
    const cantos = [[placa.x0, placa.y0], [placa.x1, placa.y0], [placa.x0, placa.y1], [placa.x1, placa.y1]]
      .map(([x, y]) => paraTM06.forward([lon0 + x / mLon, lat0 + y / mLat]))
    const caixa = [
      Math.floor(Math.min(...cantos.map((c) => c[0])) / 2) * 2,
      Math.floor(Math.min(...cantos.map((c) => c[1])) / 2) * 2,
      Math.ceil(Math.max(...cantos.map((c) => c[0])) / 2) * 2,
      Math.ceil(Math.max(...cantos.map((c) => c[1])) / 2) * 2,
    ]
    const { folhas: orto, completa } = await ortoDGT(caixa)
    if (!completa) {
      // Árvores em meia zona leriam como "a outra metade não tem árvores".
      console.log(`  árvores: a ortofoto não cobre a placa inteira (${orto.length} folhas) — fica sem vegetação`)
    } else {
      const pegadas = jb.elements
        .map((e) => (e.geometry ?? []).filter((p) => p && p.lat != null).map((p) => paraTM06.forward([p.lon, p.lat])))
        .filter((p) => p.length >= 3)
      const lista = await arvoresDGT({
        caixa,
        mdt: folhas,
        mds: folhasMDS,
        orto,
        pegadas,
        paraLocal: (x, y) => {
          const [lon, lat] = proj4('EPSG:3763', 'EPSG:4326', [x, y])
          return P({ lat, lon })
        },
        naZona: ([x, y]) => x > placa.x0 && x < placa.x1 && y > placa.y0 && y < placa.y1 && aoEixo([x, y]) <= z.raio,
      })
      arvores = lista.map((a) => ({ ...a, z: +alt(a.p[0], a.p[1]).toFixed(2) }))
      const copa = arvores.reduce((s, a) => s + Math.PI * a.r * a.r, 0)
      const hs = arvores.map((a) => a.h).sort((a, b) => a - b)
      console.log(
        `  árvores: ${arvores.length} no corredor, ${Math.round(copa)} m² de copa; ` +
          `altura mediana ${hs.length ? hs[Math.floor(hs.length / 2)].toFixed(1) : '—'} m, máx ${hs.length ? hs.at(-1).toFixed(1) : '—'} m`
      )
    }
  }

  const eixo = vias.map((w) => ({
    lanes: w.tags?.lanes ?? null,
    // Largura medida, quando o OSM a tem — a Visconde da Luz tem 9,5 m.
    largura: Number.isFinite(parseFloat(w.tags?.width)) ? parseFloat(w.tags.width) : null,
    pts: w.geometry.map((p) => {
      const q = P(p)
      return [+q[0].toFixed(2), +q[1].toFixed(2), +alt(q[0], q[1]).toFixed(2)]
    }),
  }))

  const cotas = eixo.flatMap((w) => w.pts.map((p) => p[2]))
  const maisAlto = Math.max(...edificios.filter((b) => b.c === 'medida').map((b) => b.h))

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(
    join(OUT_DIR, `${z.id}.scene.json`),
    JSON.stringify({ id: z.id, raio: z.raio, placa, buildings: edificios, eixo, dem: demFinal, arvores: arvores ?? [], cortados })
  )

  return {
    id: z.id,
    nome: z.nome,
    tipo: z.tipo,
    freguesia: z.freguesia,
    raio: z.raio,
    centro: [+lat0.toFixed(6), +lon0.toFixed(6)],
    comprimento: Math.round(comprimento),
    cotaMin: +Math.min(...cotas).toFixed(1),
    cotaMax: +Math.max(...cotas).toFixed(1),
    edificios: edificios.length,
    comAltura: conta.medida,
    umPisoPorTipo: conta.tipo,
    semAltura: conta.desconhecida,
    ...(folhasMDS.length ? { alturaLidar: lidar.n } : {}),
    ...(arvores ? { arvores: arvores.length } : {}),
    maisAlto: +maisAlto.toFixed(1),
    areaImplantacao: Math.round(areaImplantacao),
  }
}

/**
 * `node scripts/build-urban-model.mjs baixa` gera só essa zona e mantém as
 * outras como estavam. Regenerar uma zona sem regenerar o seu modelo no
 * Blender poria na página números que a maqueta já não desenha — por isso
 * cada zona guarda a sua própria data de leitura.
 */
const pedidas = process.argv.slice(2)
const anteriores = (() => {
  try {
    const src = readFileSync(OUT_TS, 'utf8')
    const m = src.match(/URBAN_ZONES: UrbanZone\[\] = (\[[\s\S]*?\n\])/)
    return m ? JSON.parse(m[1]) : []
  } catch {
    return []
  }
})()

const zonas = []
for (const z of ZONAS) {
  const antes = anteriores.find((a) => a.id === z.id)
  if (pedidas.length && !pedidas.includes(z.id) && antes) {
    zonas.push(antes)
    continue
  }
  zonas.push({ ...(await gerarZona(z)), lidoEm: new Date().toISOString() })
}

const asOf = zonas.map((z) => z.lidoEm).sort().at(-1)
writeFileSync(
  OUT_TS,
  `/**
 * GERADO por \`node scripts/build-urban-model.mjs\` — não editar à mão.
 *
 * As zonas urbanas modeladas em três dimensões. Cada uma é um corredor em
 * torno de um eixo com geometria própria no OpenStreetMap; \`raio\` diz a
 * largura desse corredor, que é o único recorte escolhido a olho.
 *
 * As contagens de altura não são cosmética: dizem que fracção da maqueta é
 * volume medido e que fracção é implantação sem altura conhecida. A página
 * mostra-as, e o modelo desenha a diferença.
 */

export interface UrbanZone {
  id: string
  nome: string
  /** \`eixo\` — corredor em torno de uma via com traçado no OSM. */
  tipo: 'eixo'
  /** As freguesias que o corredor atravessa. Informativo: o corredor não as respeita. */
  freguesia: string
  /** Metros de cada lado do eixo. */
  raio: number
  /** [lat, lon] do centro do corredor. */
  centro: [number, number]
  /** Comprimento do eixo em metros, sem contar duas vezes os sentidos separados. */
  comprimento: number
  cotaMin: number
  cotaMax: number
  edificios: number
  /** Com \`height\` ou \`building:levels\` no OSM — os que ganham volume. */
  comAltura: number
  /** Garagens e anexos: um piso pelo significado do tag. */
  umPisoPorTipo: number
  /** Sem altura publicada — na maqueta ficam como implantação no chão. */
  semAltura: number
  /** Dos com altura, quantos medidos pelo LiDAR da DGT (superfície − terreno). */
  alturaLidar?: number
  /** Árvores no corredor, medidas por ortofoto (NDVI) e LiDAR. Ausente se não houver ortofoto da zona inteira. */
  arvores?: number
  /** Altura do edifício medido mais alto, em metros. */
  maisAlto: number
  /** Soma das áreas de implantação, em m². */
  areaImplantacao: number
  /** Quando o OSM e a altimetria desta zona foram lidos. */
  lidoEm: string
}

/** A leitura mais recente de todas as zonas. */
export const MODEL_FETCHED_AT = '${asOf}'

export const URBAN_ZONES: UrbanZone[] = ${JSON.stringify(zonas, null, 2)}

export const byId = (id: string): UrbanZone | undefined => URBAN_ZONES.find((z) => z.id === id)

/** Fracção do edificado com altura conhecida — o que a maqueta pode mesmo mostrar. */
export function coberturaAltura(z: UrbanZone): number {
  return (z.comAltura + z.umPisoPorTipo) / z.edificios
}
`
)
console.log(`\nescrito ${OUT_TS}`)
console.log(`escrito ${OUT_DIR}/<zona>.scene.json`)
