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

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fromFile } from 'geotiff'
import proj4 from 'proj4'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pixelDGT, dentroDoPoligono, ortoDGT, arvoresDGT, folhasNaCaixa } from './lib/dgt.mjs'
import { limparAnel, aneis, percentil, fotografia, chaoOSM } from './lib/reconstituicao.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_TS = join(ROOT, 'lib', 'urban-zones.ts')
const OUT_DIR = join(ROOT, 'scripts', 'blender')

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
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
   *
   * `rico`: desde 26/09/2026 a Baixa é vestida como os monumentos do
   * /visitar (telhados de águas, fachadas, chão desenhado) e serrada ao
   * corredor. Ver `gerarZonaRica`.
   */
  {
    id: 'baixa',
    nome: 'Baixa',
    tipo: 'eixo',
    freguesia: 'Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)',
    raio: 120,
    terreno: 'dgt',
    rico: true,
    /**
     * Os pontos que a página aponta, de sul para norte. Cada um vem de um
     * elemento do OSM (`osm`, com `alvo` 'chao' ou 'topo', como nos
     * monumentos) ou de uma das ruas do eixo (`rua`), e nesse caso leva
     * também o comprimento e as cotas medidas dessa rua.
     */
    pontos: [
      { id: 'portagem', osm: 'way/829380017', alvo: 'chao' }, // Largo da Portagem (place=square)
      { id: 'ferreira-borges', rua: 'Rua Ferreira Borges' },
      { id: 'almedina', osm: 'way/246397825', alvo: 'topo' }, // Torre de Almedina, por cima do arco
      { id: 'santa-cruz', osm: 'way/204192080', alvo: 'topo' }, // Igreja de Santa Cruz
      { id: 'sofia', rua: 'Rua da Sofia' },
    ],
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
  // OVERPASS_CACHE=<pasta>: guarda as respostas para repetir o gerador sem
  // voltar a pedir (só em desenvolvimento; nunca dentro do repositório).
  const cache = process.env.OVERPASS_CACHE
    ? join(process.env.OVERPASS_CACHE, createHash('sha1').update(query).digest('hex') + '.json')
    : null
  if (cache && existsSync(cache)) return JSON.parse(readFileSync(cache, 'utf8'))
  const j = await overpassRede(query)
  if (cache) writeFileSync(cache, JSON.stringify(j))
  return j
}

async function overpassRede(query) {
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
function medirComprimento(vias, segs, P) {
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
}

/** As vias com nome que fazem o eixo da zona, com geometria. */
async function lerVias(z) {
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
  return vias
}

async function gerarZona(z) {
  console.log(`\n${z.nome}`)
  const vias = await lerVias(z)

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

  const comprimento = medirComprimento(vias, segs, P)

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
    const { folhas: orto, completa } = await ortoDGT(DIR_DEM, caixa)
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
 * A ZONA RECONSTITUÍDA
 *
 * A mesma linguagem das maquetas do /visitar, aplicada a uma zona inteira
 * (ver `build-monumento.mjs` e `scripts/blender/reconstituicao.py`): as
 * coberturas são o esqueleto recto de cada contorno, do beirado à cumeeira
 * que o LiDAR mede; as fachadas, o chão e as texturas são desenho, pousado
 * sobre essa geometria medida.
 *
 * Três diferenças para `gerarZona`, e porquê:
 *
 *   - Coordenadas em PT-TM06 (menos o centro), como nos monumentos. O LiDAR,
 *     a ortofoto e a maqueta ficam no mesmo referencial; a projecção plana
 *     local das outras zonas está rodada 0,2° em relação a ele, e no
 *     comprimento da Baixa isso desalinhava o chão pintado dos prédios quase
 *     dois metros.
 *   - A placa é serrada ao corredor, como o disco de um monumento: o
 *     rectângulo deixava hectares de terreno com ruas desenhadas e sem
 *     prédios. Entram todos os edifícios que tocam o corredor, e o Blender
 *     corta-os pela borda.
 *   - Os números da página continuam a ser os do corredor: contam os
 *     edifícios com o centro a menos de `raio` m do eixo, a mesma regra de
 *     sempre. Os cortados pela borda estão na maqueta e não na conta.
 */
const PASSO_TERRENO = 4
/** Margem da caixa para lá do corredor, em metros. */
const MARGEM_CAIXA = 8
/** Resolução da fotografia recortada: só decide a cor dos telhados e o verde. */
const FOTO_ZONA_M = 0.5
// Os mesmos limiares das coberturas dos monumentos.
const P_BEIRADO = 0.2
const P_CUMEEIRA = 0.92
const DESNIVEL_MIN = 1.0
const INCLINACAO_MAX = 1.3

let construtorEsqueleto = null
async function esqueleto() {
  if (!construtorEsqueleto) {
    // Compilado só para o browser (ver `build-monumento.mjs`).
    globalThis.self ??= globalThis
    globalThis.window ??= globalThis
    construtorEsqueleto = (await import('straight-skeleton')).default.SkeletonBuilder
    await construtorEsqueleto.init()
  }
  return construtorEsqueleto
}

/**
 * O contorno do corredor: a linha a exactamente `raio` m do eixo.
 *
 * Mede-se a distância ao eixo numa grelha de 1 m e segue-se a curva de nível
 * `raio` (marching squares, com interpolação linear entre nós), depois
 * simplificada a 10 cm. Devolve o anel exterior, no sentido directo.
 */
function corredor(segs, raio) {
  const PASSO = 1
  const xs = segs.flatMap((s) => [s[0][0], s[1][0]]), ys = segs.flatMap((s) => [s[0][1], s[1][1]])
  const x0 = Math.floor(Math.min(...xs) - raio - 3), y0 = Math.floor(Math.min(...ys) - raio - 3)
  const W = Math.ceil((Math.max(...xs) + raio + 3 - x0) / PASSO) + 1
  const H = Math.ceil((Math.max(...ys) + raio + 3 - y0) / PASSO) + 1
  // f > 0 dentro do corredor. Troços longe do nó não contam: a caixa de
  // cada troço, alargada do raio, filtra quase todos.
  const f = new Float64Array(W * H)
  const caixas = segs.map(([a, b]) => [Math.min(a[0], b[0]) - raio - 2, Math.max(a[0], b[0]) + raio + 2, Math.min(a[1], b[1]) - raio - 2, Math.max(a[1], b[1]) + raio + 2])
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const p = [x0 + i * PASSO, y0 + j * PASSO]
      let d = Infinity
      for (let k = 0; k < segs.length; k++) {
        const c = caixas[k]
        if (p[0] < c[0] || p[0] > c[1] || p[1] < c[2] || p[1] > c[3]) continue
        d = Math.min(d, distSegmento(p, segs[k][0], segs[k][1]))
      }
      f[j * W + i] = raio - d
    }
  }
  // Marching squares. Cada ponto de corte vive numa aresta da grelha, com
  // chave própria; cada célula liga dois (ou quatro) desses pontos.
  const v = (i, j) => f[j * W + i]
  const ponto = new Map()
  const corte = (chave, i0, j0, i1, j1) => {
    if (!ponto.has(chave)) {
      const a = v(i0, j0), b = v(i1, j1), t = a / (a - b)
      ponto.set(chave, [x0 + (i0 + (i1 - i0) * t) * PASSO, y0 + (j0 + (j1 - j0) * t) * PASSO])
    }
    return chave
  }
  const liga = new Map()
  const juntar = (a, b) => {
    for (const [p, q] of [[a, b], [b, a]]) {
      if (!liga.has(p)) liga.set(p, [])
      liga.get(p).push(q)
    }
  }
  for (let j = 0; j < H - 1; j++) {
    for (let i = 0; i < W - 1; i++) {
      const c = [v(i, j) > 0, v(i + 1, j) > 0, v(i + 1, j + 1) > 0, v(i, j + 1) > 0]
      const n = c.filter(Boolean).length
      if (n === 0 || n === 4) continue
      const S = () => corte(`h${i},${j}`, i, j, i + 1, j)
      const E = () => corte(`v${i + 1},${j}`, i + 1, j, i + 1, j + 1)
      const N = () => corte(`h${i},${j + 1}`, i, j + 1, i + 1, j + 1)
      const O = () => corte(`v${i},${j}`, i, j, i, j + 1)
      const cod = (c[0] ? 1 : 0) | (c[1] ? 2 : 0) | (c[2] ? 4 : 0) | (c[3] ? 8 : 0)
      const centro = (v(i, j) + v(i + 1, j) + v(i + 1, j + 1) + v(i, j + 1)) / 4 > 0
      switch (cod) {
        case 1: case 14: juntar(O(), S()); break
        case 2: case 13: juntar(S(), E()); break
        case 3: case 12: juntar(O(), E()); break
        case 4: case 11: juntar(E(), N()); break
        case 6: case 9: juntar(S(), N()); break
        case 7: case 8: juntar(O(), N()); break
        case 5: if (centro) { juntar(O(), N()); juntar(S(), E()) } else { juntar(O(), S()); juntar(E(), N()) } break
        case 10: if (centro) { juntar(O(), S()); juntar(E(), N()) } else { juntar(O(), N()); juntar(S(), E()) } break
      }
    }
  }
  // Encadear em anéis e ficar com o maior.
  const usados = new Set()
  const aneisC = []
  for (const inicio of liga.keys()) {
    if (usados.has(inicio)) continue
    const anel = [inicio]
    usados.add(inicio)
    for (let atual = inicio, antes = null; ; ) {
      const prox = liga.get(atual).find((q) => q !== antes && !usados.has(q))
      if (!prox) break
      anel.push(prox)
      usados.add(prox)
      antes = atual
      atual = prox
    }
    aneisC.push(anel.map((k) => ponto.get(k)))
  }
  aneisC.sort((a, b) => Math.abs(areaAssinada(b)) - Math.abs(areaAssinada(a)))
  if (aneisC.length > 1) console.log(`  corredor: ${aneisC.length - 1} anéis menores ignorados`)
  // Douglas–Peucker a 10 cm.
  const simplificar = (pts, tol) => {
    if (pts.length < 3) return pts
    let iMax = 0, dMax = 0
    for (let i = 1; i < pts.length - 1; i++) {
      const d = distSegmento(pts[i], pts[0], pts.at(-1))
      if (d > dMax) { dMax = d; iMax = i }
    }
    if (dMax <= tol) return [pts[0], pts.at(-1)]
    return [...simplificar(pts.slice(0, iMax + 1), tol).slice(0, -1), ...simplificar(pts.slice(iMax), tol)]
  }
  const a = aneisC[0]
  const meio = Math.floor(a.length / 2)
  let anel = [...simplificar(a.slice(0, meio + 1), 0.1).slice(0, -1), ...simplificar([...a.slice(meio), a[0]], 0.1).slice(0, -1)]
  anel = anel.map(([x, y]) => [+x.toFixed(2), +y.toFixed(2)])
  if (areaAssinada(anel) < 0) anel = anel.reverse()
  return anel
}

async function gerarZonaRica(z) {
  console.log(`\n${z.nome} (reconstituição)`)
  const vias = await lerVias(z)

  // O centro da página continua a ser o meio da caixa do eixo.
  const todos = vias.flatMap((w) => w.geometry)
  const lats = todos.map((p) => p.lat)
  const lons = todos.map((p) => p.lon)
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2
  const lon0 = (Math.min(...lons) + Math.max(...lons)) / 2
  const [CXf, CYf] = paraTM06.forward([lon0, lat0])
  const CX = Math.round(CXf), CY = Math.round(CYf)
  const local = ([X, Y]) => [+(X - CX).toFixed(2), +(Y - CY).toFixed(2)]
  const P = (p) => {
    const [X, Y] = paraTM06.forward([p.lon, p.lat])
    return [X - CX, Y - CY]
  }

  const segs = []
  for (const w of vias) {
    const g = w.geometry.map(P)
    for (let i = 1; i < g.length; i++) segs.push([g[i - 1], g[i]])
  }
  const aoEixo = (p) => Math.min(...segs.map((s) => distSegmento(p, s[0], s[1])))
  const comprimento = medirComprimento(vias, segs, P)

  const recorte = corredor(segs, z.raio)
  console.log(`  corredor: ${recorte.length} vértices, ${Math.round(areaAssinada(recorte))} m²`)

  // --- terreno: grelha de 4 m, cada nó a média dos seus quatro píxeis ---
  const rxs = recorte.map((p) => p[0] + CX), rys = recorte.map((p) => p[1] + CY)
  const G = PASSO_TERRENO
  const gx0 = Math.floor((Math.min(...rxs) - MARGEM_CAIXA) / G) * G
  const gy0 = Math.floor((Math.min(...rys) - MARGEM_CAIXA) / G) * G
  const gx1 = Math.ceil((Math.max(...rxs) + MARGEM_CAIXA) / G) * G
  const gy1 = Math.ceil((Math.max(...rys) + MARGEM_CAIXA) / G) * G
  const caixa = [gx0 - 2, gy0 - 2, gx1 + 2, gy1 + 2]
  const mdt = await folhasNaCaixa(DIR_DEM, 'MDT', caixa)
  const mds = await folhasNaCaixa(DIR_DEM, 'MDS', caixa)
  if (!mdt.length || !mds.length) throw new Error(`faltam folhas MDT/MDS em ${DIR_DEM} para ${z.nome}`)
  console.log(`  LiDAR: ${mdt.length} folhas MDT, ${mds.length} MDS`)
  const chao = (X, Y) => pixelDGT(mdt, X, Y)

  const nCol = (gx1 - gx0) / G + 1
  const nRow = (gy1 - gy0) / G + 1
  const elev = new Array(nCol * nRow).fill(null)
  let faltam = 0
  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      const X = gx0 + c * G, Y = gy0 + r * G
      // Os quatro centros de píxel à volta do nó (as folhas começam em
      // quilómetros inteiros, os centros caem nos ímpares).
      const v = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([dx, dy]) => chao(X + dx, Y + dy))
      if (v.every((q) => q != null)) elev[r * nCol + c] = +((v[0] + v[1] + v[2] + v[3]) / 4).toFixed(2)
      else if (dentroDoPoligono(X - CX, Y - CY, recorte)) faltam++
    }
  }
  if (faltam) throw new Error(`o LiDAR não cobre ${faltam} nós dentro do corredor — falta uma folha MDT?`)
  // Fora do corredor o terreno é serrado; os nós sem valor copiam o vizinho,
  // só para a malha ser inteira até o Blender a cortar.
  for (let volta = 0; elev.some((v) => v == null); volta++) {
    if (volta > nCol + nRow) throw new Error('terreno sem nenhum valor')
    const antes = elev.slice()
    for (let i = 0; i < elev.length; i++) {
      if (antes[i] != null) continue
      const r = Math.floor(i / nCol), c = i % nCol
      const viz = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]
        .filter(([rr, cc]) => rr >= 0 && rr < nRow && cc >= 0 && cc < nCol)
        .map(([rr, cc]) => antes[rr * nCol + cc])
        .filter((v) => v != null)
      if (viz.length) elev[i] = +(viz.reduce((s, v) => s + v, 0) / viz.length).toFixed(2)
    }
  }
  const dem = { x0: gx0 - CX, y0: gy0 - CY, passo: G, nCol, nRow, elev }
  const cotaDem = (x, y) => {
    const fc = Math.max(0, Math.min(nCol - 1.001, (x - dem.x0) / G))
    const fr = Math.max(0, Math.min(nRow - 1.001, (y - dem.y0) / G))
    const c = Math.floor(fc), r = Math.floor(fr), tc = fc - c, tr = fr - r
    const e = (rr, cc) => elev[rr * nCol + cc]
    return e(r, c) * (1 - tc) * (1 - tr) + e(r, c + 1) * tc * (1 - tr) + e(r + 1, c) * (1 - tc) * tr + e(r + 1, c + 1) * tc * tr
  }
  console.log(`  terreno: ${nCol}×${nRow} nós a ${G} m`)

  // --- edificado ---
  const cantos = [[gx0, gy0], [gx1, gy0], [gx0, gy1], [gx1, gy1]].map((c) => proj4('EPSG:3763', 'EPSG:4326', c))
  const bb = `${Math.min(...cantos.map((c) => c[1]))},${Math.min(...cantos.map((c) => c[0]))},${Math.max(...cantos.map((c) => c[1]))},${Math.max(...cantos.map((c) => c[0]))}`
  const jb = await overpass(`[out:json][timeout:300];
(
  way["building"](${bb});
  relation["building"](${bb});
);
out geom;`)
  console.log(`  edificado: ${jb.elements.length} na caixa`)

  const SkeletonBuilder = await esqueleto()
  const edificios = []
  const pegadas = []
  // Só os do corredor (centro a menos de `raio` m do eixo) entram nas contas.
  const conta = { medida: 0, tipo: 0, desconhecida: 0, lidar: 0, cortados: 0, esqueletoFalhou: 0 }
  let areaImplantacao = 0
  let maisAlto = 0

  for (const e of jb.elements) {
    const t = e.tags ?? {}
    if (!t.building) continue
    if (e.type === 'relation' && t.type !== 'multipolygon') continue
    let rs
    if (e.type === 'way') {
      rs = [{ papel: 'outer', g: e.geometry ?? [] }]
    } else {
      const porPapel = (papel) =>
        aneis((e.members ?? []).filter((q) => q.type === 'way' && q.role === papel && q.geometry)
          .map((q) => q.geometry.map((p) => [p.lon, p.lat])))
          .map((a) => ({ papel, g: a.map(([lon, lat]) => ({ lon, lat })) }))
      rs = [...porPapel('outer'), ...porPapel('inner')]
    }
    const interiores = rs.filter((r) => r.papel === 'inner')
    for (const exterior of rs.filter((r) => r.papel === 'outer')) {
      const g = exterior.g.filter((p) => p && p.lat != null)
      if (g.length < 4) continue
      const X = g.map((p) => paraTM06.forward([p.lon, p.lat]))
      pegadas.push(X)
      const extL = limparAnel(X.map(local))
      if (extL.length < 3) continue
      if (!extL.some((p) => aoEixo(p) <= z.raio)) continue // não toca o corredor
      const area = Math.abs(areaAssinada(extL))
      if (area < AREA_MIN_M2) continue
      // O centro que decide se conta: a média dos vértices, como em `gerarZona`.
      const sem = Math.hypot(X[0][0] - X.at(-1)[0], X[0][1] - X.at(-1)[1]) < 0.01 ? X.slice(0, -1) : X
      const centro = [sem.reduce((s, p) => s + p[0], 0) / sem.length - CX, sem.reduce((s, p) => s + p[1], 0) / sem.length - CY]
      const naZona = aoEixo(centro) <= z.raio
      if (!naZona) conta.cortados++

      const furos = interiores
        .map((i) => limparAnel(i.g.map((p) => local(paraTM06.forward([p.lon, p.lat])))))
        .filter((f) => f.length >= 3 && dentroDoPoligono(f[0][0], f[0][1], extL))
      const ext = areaAssinada(extL) < 0 ? extL.reverse() : extL
      const buracos = furos.map((f) => (areaAssinada(f) > 0 ? f.reverse() : f))
      const osm = `${e.type}/${e.id}`

      // --- amostras do LiDAR dentro do contorno (como nos monumentos) ---
      const todosAneis = [ext, ...buracos]
      const bordos = todosAneis.flatMap((a) => a.map((p, i) => [p, a[(i + 1) % a.length]]))
      const xs = ext.map((p) => p[0]), ys = ext.map((p) => p[1])
      const amostrar = (recuo) => {
        const out = []
        for (let x = Math.floor((Math.min(...xs) + CX - 1) / 2) * 2 + 1 - CX; x <= Math.max(...xs); x += 2) {
          for (let y = Math.floor((Math.min(...ys) + CY - 1) / 2) * 2 + 1 - CY; y <= Math.max(...ys); y += 2) {
            if (!dentroDoPoligono(x, y, ext) || buracos.some((b) => dentroDoPoligono(x, y, b))) continue
            if (recuo && Math.min(...bordos.map(([a, b]) => distSegmento([x, y], a, b))) < recuo) continue
            const s = pixelDGT(mds, x + CX, y + CY), gg = chao(x + CX, y + CY)
            if (s != null && gg != null) out.push({ s, g: gg })
          }
        }
        return out
      }
      let am = amostrar(RECUO_M)
      if (am.length < PIXEIS_MIN) am = amostrar(0)
      const cotasChao = ext.map(([x, y]) => chao(x + CX, y + CY)).filter((v) => v != null).concat(am.map((a) => a.g))
      if (!cotasChao.length) continue
      const base = Math.min(...cotasChao)

      const hMediana = am.length >= PIXEIS_MIN ? percentil(am.map((a) => a.s - a.g), 0.5) : null
      const hTag = parseFloat(t.height)
      const pisos = parseFloat(t['building:levels'])
      const hOSM = Number.isFinite(hTag) && hTag > 1 ? hTag : Number.isFinite(pisos) && pisos >= 1 ? pisos * PE_DIREITO + REMATE : null
      let beirado, cumeeira, classe, h
      if (hMediana != null && hMediana >= ALTURA_MIN_LIDAR) {
        const topo = am.map((a) => a.s)
        beirado = percentil(topo, P_BEIRADO)
        cumeeira = percentil(topo, P_CUMEEIRA)
        classe = 'medida'
        h = hMediana
        if (naZona) conta.lidar++
      } else if (hOSM != null || UM_PISO.has(t.building)) {
        // O laser não viu volume: fica o que o OSM publicar, ou um piso
        // quando o próprio tag o diz (garagem, telheiro).
        h = hOSM ?? 2.6
        classe = hOSM != null ? 'medida' : 'tipo'
        beirado = cumeeira = percentil(cotasChao, 0.5) + h
      } else {
        // Sem altura nenhuma: só a implantação, pintada no chão.
        if (naZona) {
          conta.desconhecida++
          areaImplantacao += area
        }
        edificios.push({ osm, n: t.name ?? null, k: 'sem-altura', aneis: todosAneis, base: +base.toFixed(2) })
        continue
      }
      if (naZona) {
        conta[classe]++
        areaImplantacao += area
        maisAlto = Math.max(maisAlto, h)
      }

      // --- cobertura: esqueleto recto, do beirado à cumeeira ---
      const desnivel = cumeeira - beirado
      let telhado
      const fechar = (a) => [...a, a[0]]
      const sk = SkeletonBuilder.buildFromPolygon(todosAneis.map(fechar))
      if (sk) {
        const tMax = Math.max(...sk.vertices.map((v) => v[2]))
        const inclinacao = desnivel >= DESNIVEL_MIN && tMax > 0 ? Math.min(desnivel / tMax, INCLINACAO_MAX) : 0
        if (inclinacao > 0) cumeeira = beirado + inclinacao * tMax
        else beirado = cumeeira = percentil(am.length ? am.map((a) => a.s) : [beirado], 0.5)
        telhado = {
          v: sk.vertices.map(([x, y, tt]) => [+x.toFixed(2), +y.toFixed(2), +(beirado + inclinacao * tt).toFixed(2)]),
          f: sk.polygons,
        }
      } else {
        // Sem esqueleto (contorno que se auto-intersecta): cobertura plana,
        // à cota mediana do que o laser mediu.
        conta.esqueletoFalhou++
        beirado = cumeeira = am.length ? percentil(am.map((a) => a.s), 0.5) : beirado
        telhado = { v: ext.map(([x, y]) => [x, y, +beirado.toFixed(2)]), f: [ext.map((_, i) => i)] }
      }
      edificios.push({
        osm,
        n: t.name ?? null,
        k: 'contexto',
        aneis: todosAneis,
        base: +(base - 1.5).toFixed(2), // enterrada, para não flutuar no declive
        beirado: +beirado.toFixed(2),
        cumeeira: +cumeeira.toFixed(2),
        telhado,
      })
    }
  }
  const noCorredor = conta.medida + conta.tipo + conta.desconhecida
  console.log(
    `  no corredor de ${z.raio} m: ${noCorredor} — ${conta.medida} com altura (${conta.lidar} pelo LiDAR), ` +
      `${conta.tipo} de um piso por tipo, ${conta.desconhecida} sem altura; ` +
      `mais ${conta.cortados} cortados pela borda` +
      (conta.esqueletoFalhou ? `; ${conta.esqueletoFalhou} com cobertura plana (sem esqueleto)` : '')
  )

  // --- árvores: a mesma regra de sempre, dentro do corredor ---
  const { folhas: orto, completa } = await ortoDGT(DIR_DEM, caixa)
  let arvores = null
  if (!completa) {
    console.log('  árvores: a ortofoto não cobre a caixa inteira — fica sem vegetação')
  } else {
    const lista = await arvoresDGT({
      caixa: [gx0, gy0, gx1, gy1],
      mdt,
      mds,
      orto,
      pegadas,
      paraLocal: (x, y) => local([x, y]),
      naZona: (p) => aoEixo(p) <= z.raio - 2,
    })
    arvores = lista.map((a) => ({ ...a, z: +(chao(a.p[0] + CX, a.p[1] + CY) ?? cotaDem(a.p[0], a.p[1])).toFixed(2) }))
    console.log(`  árvores: ${arvores.length}`)
  }

  // --- a fotografia (cor dos telhados, verde) e o chão do OSM ---
  const foto = await fotografia(OUT_DIR, z.id, [gx0, gy0, gx1, gy1], CX, CY, FOTO_ZONA_M)
  const chaoDesenho = await chaoOSM(overpass, bb, local)

  // --- os pontos da página ---
  const pontos = []
  const porOsm = (z.pontos ?? []).filter((p) => p.osm)
  const jp = porOsm.length
    ? await overpass(`[out:json][timeout:60];
(
  ${['way', 'node', 'relation'].map((t) => {
      const ids = porOsm.filter((p) => p.osm.startsWith(t + '/')).map((p) => p.osm.split('/')[1])
      return ids.length ? `${t}(id:${ids.join(',')});` : ''
    }).join('\n  ')}
);
out geom;`)
    : { elements: [] }
  for (const p of z.pontos ?? []) {
    if (p.rua) {
      // Uma rua do eixo: o comprimento de ponta a ponta (o mesmo cálculo do
      // eixo inteiro), as cotas, e o ponto dela mais perto do seu centro.
      const vs = vias.filter((w) => w.tags?.name === p.rua)
      if (!vs.length) throw new Error(`ponto ${p.id}: nenhuma via "${p.rua}" no eixo`)
      const sg = []
      for (const w of vs) {
        const g = w.geometry.map(P)
        for (let i = 1; i < g.length; i++) sg.push([g[i - 1], g[i]])
      }
      const pts = vs.flatMap((w) => w.geometry.map(P))
      const cx = pts.reduce((a, q) => a + q[0], 0) / pts.length
      const cy = pts.reduce((a, q) => a + q[1], 0) / pts.length
      const perto = pts.reduce((m, q) => (Math.hypot(q[0] - cx, q[1] - cy) < Math.hypot(m[0] - cx, m[1] - cy) ? q : m))
      const cs = pts.map((q) => cotaDem(q[0], q[1]))
      pontos.push({
        id: p.id,
        rua: p.rua,
        p: [+perto[0].toFixed(2), +perto[1].toFixed(2), +cotaDem(perto[0], perto[1]).toFixed(2)],
        comprimento: Math.round(medirComprimento(vs, sg, P)),
        cotaMin: +Math.min(...cs).toFixed(1),
        cotaMax: +Math.max(...cs).toFixed(1),
      })
      continue
    }
    const [tipo, id] = p.osm.split('/')
    const e = jp.elements.find((q) => q.type === tipo && String(q.id) === id)
    if (!e) throw new Error(`ponto ${p.id}: ${p.osm} não veio do Overpass`)
    const XY = tipo === 'node' ? [paraTM06.forward([e.lon, e.lat])] : (e.geometry ?? []).map((q) => paraTM06.forward([q.lon, q.lat]))
    const L = XY.map(local)
    const [X, Y] = [L.reduce((a, q) => a + q[0], 0) / L.length, L.reduce((a, q) => a + q[1], 0) / L.length]
    let zp = cotaDem(X, Y)
    let altura
    if (p.alvo === 'topo' && L.length >= 3) {
      // O mais alto que o laser mediu no contorno, e a altura acima do chão.
      const xs = L.map((q) => q[0]), ys = L.map((q) => q[1])
      let topo = -Infinity
      for (let x = Math.floor((Math.min(...xs) + CX - 1) / 2) * 2 + 1 - CX; x <= Math.max(...xs); x += 2)
        for (let y = Math.floor((Math.min(...ys) + CY - 1) / 2) * 2 + 1 - CY; y <= Math.max(...ys); y += 2)
          if (dentroDoPoligono(x, y, L)) topo = Math.max(topo, pixelDGT(mds, x + CX, y + CY) ?? -Infinity)
      if (Number.isFinite(topo)) {
        const chaoPol = L.map(([x, y]) => chao(x + CX, y + CY)).filter((v) => v != null)
        altura = +(topo - percentil(chaoPol, 0.5)).toFixed(1)
        zp = topo
      }
    }
    pontos.push({ id: p.id, osm: p.osm, p: [+X.toFixed(2), +Y.toFixed(2), +zp.toFixed(2)], ...(altura != null ? { altura } : {}) })
  }
  if (pontos.length) console.log(`  pontos: ${pontos.map((p) => p.id).join(', ')}`)

  const eixo = vias.map((w) => ({
    lanes: w.tags?.lanes ?? null,
    largura: Number.isFinite(parseFloat(w.tags?.width)) ? parseFloat(w.tags.width) : null,
    pts: w.geometry.map((p) => {
      const q = P(p)
      return [+q[0].toFixed(2), +q[1].toFixed(2), +cotaDem(q[0], q[1]).toFixed(2)]
    }),
  }))
  const cotas = eixo.flatMap((w) => w.pts.map((p) => p[2]))

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(
    join(OUT_DIR, `${z.id}.scene.json`),
    JSON.stringify({ id: z.id, zona: true, raio: z.raio, origem: [CX, CY], recorte, dem, buildings: edificios, arvores: arvores ?? [], pontos, foto, chao: chaoDesenho, eixo })
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
    edificios: noCorredor,
    comAltura: conta.medida,
    umPisoPorTipo: conta.tipo,
    semAltura: conta.desconhecida,
    alturaLidar: conta.lidar,
    ...(arvores ? { arvores: arvores.length } : {}),
    maisAlto: +maisAlto.toFixed(1),
    areaImplantacao: Math.round(areaImplantacao),
    rico: true,
    ...(pontos.length ? { pontos } : {}),
    // A planta da abertura da página: o contorno do corredor e o eixo, ao metro.
    planta: {
      recorte: recorte.map(([x, y]) => [Math.round(x), Math.round(y)]),
      eixo: eixo.map((w) => w.pts.map(([x, y]) => [Math.round(x), Math.round(y)])),
    },
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
  zonas.push({ ...(await (z.rico ? gerarZonaRica(z) : gerarZona(z))), lidoEm: new Date().toISOString() })
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
  /** Vestida como as maquetas do /visitar: telhados de águas, fachadas, chão desenhado. */
  rico?: boolean
  /**
   * Os pontos que a página aponta. \`p\` é [x nascente, y norte, z cota] nas
   * coordenadas da maqueta. Os de uma rua do eixo trazem o comprimento e as
   * cotas medidas dela; os de um edifício visto do alto, a altura medida.
   */
  pontos?: { id: string; osm?: string; rua?: string; p: [number, number, number]; altura?: number; comprimento?: number; cotaMin?: number; cotaMax?: number }[]
  /** O contorno do corredor e o eixo em planta (metros, x nascente, y norte), para a figura da abertura. */
  planta?: { recorte: [number, number][]; eixo: [number, number][][] }
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
