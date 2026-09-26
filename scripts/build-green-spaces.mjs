#!/usr/bin/env node
/**
 * Gerador das zonas verdes — `node scripts/build-green-spaces.mjs`
 *
 * Escreve `lib/green-spaces.ts`: os espaços verdes públicos de Coimbra com
 * nome, cada um com o seu contorno já projectado para o mesmo viewBox do
 * mapa das freguesias. O ficheiro gerado entra no repositório.
 *
 * Porquê congelar num ficheiro, e não consultar o Overpass a cada visita:
 *
 *   · o Overpass é um serviço de investigação, sem garantia de serviço —
 *     falhou por timeout duas vezes durante o desenvolvimento disto, e uma
 *     página que dependa dele fica em branco quando ele está ocupado;
 *   · o contorno de uma mata não muda de semana para semana, e portanto
 *     não há frescura a ganhar em pedi-lo outra vez;
 *   · renderiza no servidor, sem JavaScript e sem pedidos a terceiros.
 *
 * O preço é que a leitura é datada, e o selo di-lo: a data da extracção vai
 * no ficheiro e aparece ao leitor. Não é uma medição em directo e não se
 * apresenta como tal.
 *
 * Decisões de recolha, todas visíveis no ficheiro gerado:
 *
 *   Fonte. OpenStreetMap, via Overpass. É a única carta aberta que tem os
 *   jardins de Coimbra desenhados. A Câmara não publica o cadastro dos
 *   espaços verdes em formato aberto — se um dia publicar, esta é a fonte
 *   a trocar.
 *
 *   O que entra. `leisure=park|garden|nature_reserve`, `landuse=forest` e
 *   `natural=wood`, dentro do município, COM NOME e sem acesso privado.
 *   Um jardim de bilhete (`access=customers` com `fee=yes`) entra, marcado
 *   como pago: os Jardins da Quinta das Lágrimas abrem a quem entra, e
 *   tirá-los da lista por terem porteiro dizia que não existem.
 *
 *   Um lugar partido em dois na carta — "Parque Verde do Mondego" e
 *   "Parque Verde do Mondego - Entrada Poente" — é um lugar só para quem
 *   lá vai. Um nome que seja outro nome da lista seguido de " - qualquer
 *   coisa" junta-se a ele: as áreas somam-se e a forma fica com as partes.
 *
 *   O que fica de fora, e porquê. Sem nome: as 90 manchas de `wood` e as
 *   74 de `forest` anónimas são pinhal e eucaliptal de produção nas serras
 *   do concelho — 14 000 dos 15 200 hectares de polígono verde do
 *   município. Somá-las diria que Coimbra tem 1078 m² de verde por
 *   habitante, o que é aritmeticamente verdade e completamente falso: não
 *   é sítio onde alguém passeie. Os 249 `leisure=pitch`: um relvado de
 *   futebol não é espaço de estar. Os jardins abaixo de MIN_AREA_HA: dos
 *   227 `garden` do concelho, 196 são menores que 2000 m² e sem nome —
 *   quintais de moradia, mapeados por quem passou.
 */

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { geoPath, geoTransverseMercator, geoArea, geoCentroid, geoContains } from 'd3-geo'
import { fromUrl } from 'geotiff'
import sharp from 'sharp'

import { roundingContext, polylabel, rewind, projectedRings } from './lib/geo.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'lib', 'green-spaces.ts')

/**
 * A última resposta do Overpass fica guardada. Com `--offline` o gerador
 * refaz tudo a partir dela — o desenho do relevo e das estradas afina-se
 * sem voltar a pedir o concelho inteiro a um serviço que falha por carga.
 */
const CACHE = join(ROOT, 'scripts', 'data', 'green')
const OVERPASS_CACHE = join(CACHE, 'overpass.json')
const OFFLINE = process.argv.includes('--offline')

/** O relevo sai em imagem, ao lado dos dados que o site serve. */
const RELIEF_DIR = join(ROOT, 'public', 'data')

/**
 * O mesmo Copernicus DEM GLO-30 que mede o desnível dos trilhos, e da
 * mesma cache: se o gerador dos trilhos já o descarregou, não se descarrega
 * outra vez. Coimbra cabe inteira no mosaico N40 W009.
 */
const DEM_CACHE = join(ROOT, 'scripts', 'data', 'trilhos', 'cache')
const DEM_TILE = 'Copernicus_DSM_COG_10_N40_00_W009_00_DEM'
const DEM_URL = `https://copernicus-dem-30m.s3.amazonaws.com/${DEM_TILE}/${DEM_TILE}.tif`

const PARISHES_URL = 'https://json.geoapi.pt/municipio/coimbra/freguesias'

/**
 * Espelhos do Overpass, por ordem de preferência. O principal responde
 * `runtime error: ... too busy` com relativa frequência; o gerador passa
 * ao seguinte em vez de desistir.
 */
const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
]

const QUERY = `
[out:json][timeout:300];
area["boundary"="administrative"]["admin_level"="7"]["name"="Coimbra"]->.a;
(
  way["leisure"~"^(park|garden|nature_reserve)$"](area.a);
  relation["leisure"~"^(park|garden|nature_reserve)$"](area.a);
  way["landuse"="forest"](area.a);
  relation["landuse"="forest"](area.a);
  way["natural"="wood"](area.a);
  relation["natural"="wood"](area.a);

  // A água vem no mesmo pedido, e não num segundo: o Overpass falha com
  // frequência, e dois pedidos é o dobro das ocasiões de falhar.
  way["natural"="water"]["water"="river"](area.a);
  relation["natural"="water"]["water"="river"](area.a);
  way["waterway"="riverbank"](area.a);
  way["waterway"="river"](area.a);

  // As estradas, pela mesma razão de um só pedido. Não são dados: são o
  // que permite reconhecer a cidade por baixo das manchas. As principais
  // no concelho inteiro; as terciárias só perto do centro, onde o mapa
  // aproxima e sem elas a malha fica vazia.
  way["highway"~"^(motorway|trunk|primary|secondary)$"](area.a);
  way["highway"="tertiary"](around:4500,40.2089,-8.4295);
);
out geom;`

/**
 * Abaixo disto é canteiro de bairro, não é sítio de passear. São os mesmos
 * 2000 m² que separam um jardim público de um quintal de moradia na
 * triagem dos `garden` anónimos — um só limiar, aplicado da mesma maneira.
 */
const MIN_AREA_HA = 0.2

/** Onde o centro da cidade se mede. Largo da Portagem. */
const CENTRE = [-8.4295, 40.2089]

/** Raio de Coimbra a pé. Acima disto a ficha diz "fora da cidade". */
const CITY_RADIUS_KM = 3

/**
 * Os pontos por onde o leitor se orienta no mapa da cidade.
 *
 * A Portagem é a origem de todas as distâncias da página — sem ela
 * marcada, "a 700 m" não se mede contra nada. A Universidade é o que toda a
 * gente sabe onde fica. As coordenadas são as mesmas do Visitar
 * (`lib/attractions.ts`), para as duas páginas porem a Alta no mesmo sítio.
 */
const LANDMARKS = [
  { id: 'portagem', name: 'Portagem', lonlat: CENTRE },
  { id: 'universidade', name: 'Universidade', lonlat: [-8.426, 40.20739] },
]

/**
 * Onde escrever "Mondego". O ponto é aproximado; o gerador prende-o ao
 * eixo do rio e roda o nome pela direcção da corrente ali.
 */
const RIVER_LABEL = { name: 'Mondego', osmName: 'Rio Mondego', lonlat: [-8.4255, 40.1985] }

/**
 * Largura das imagens do relevo, em píxeis. O DEM tem 30 m por célula: o
 * concelho, a 900 px, fica perto disso; a cidade é interpolada.
 */
const RELIEF_PX = { concelho: 900, cidade: 1100 }

/** Raio autálico da Terra (IUGG), em metros. */
const EARTH_RADIUS = 6371007.2

/* O viewBox e a projecção são os do mapa das freguesias — de propósito.
   Os contornos verdes assentam sobre os limites administrativos sem
   nenhuma transformação no browser, e as duas cartas podem sobrepor-se. */
const WIDTH = 1000
const PAD = 6
const DIGITS = 1
const PT_TM06 = { lon: -8.133108333, lat: 39.668258333 }

/**
 * Piso de sanidade da extracção. A de 2026-09-09 deu 30 zonas; abaixo de
 * 25 é a fonte que falhou, não a cidade que mudou.
 */
const MIN_EXPECTED = 25

/** Tolerância do Douglas-Peucker, em unidades do viewBox (~17 m cada). */
const SIMPLIFY_EPS = 0.12

/**
 * Quem está a pedir. O Overpass responde 406 a um `User-Agent` anónimo — o
 * do Node é um deles — e a etiqueta do OSM pede na mesma que uma aplicação
 * se identifique e deixe como falar com quem a fez.
 */
const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador de zonas verdes)'

async function fetchJson(url, init) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(300000),
    ...init,
    headers: { 'User-Agent': USER_AGENT, ...init?.headers },
  })
  if (!res.ok) throw new Error(`${url} respondeu ${res.status}`)
  const text = await res.text()
  // O Overpass devolve HTML com 200 quando rejeita por carga.
  if (!text.trimStart().startsWith('{')) {
    throw new Error(text.includes('too busy') ? 'servidor ocupado' : 'resposta não é JSON')
  }
  return JSON.parse(text)
}

async function fetchOverpass() {
  if (OFFLINE) {
    if (!existsSync(OVERPASS_CACHE)) throw new Error(`--offline sem ${OVERPASS_CACHE}`)
    process.stdout.write(`A ler ${OVERPASS_CACHE}\n`)
    return JSON.parse(readFileSync(OVERPASS_CACHE, 'utf8'))
  }
  const osm = await fetchOverpassLive()
  mkdirSync(CACHE, { recursive: true })
  writeFileSync(OVERPASS_CACHE, JSON.stringify(osm))
  return osm
}

async function fetchOverpassLive() {
  const failures = []
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      process.stdout.write(`A obter ${mirror}\n`)
      const body = new URLSearchParams({ data: QUERY })
      const osm = await fetchJson(mirror, { method: 'POST', body })
      if (!Array.isArray(osm.elements) || !osm.elements.length) {
        throw new Error('respondeu sem elementos')
      }
      return osm
    } catch (err) {
      process.stdout.write(`  falhou: ${err.message}\n`)
      failures.push(`${mirror}: ${err.message}`)
    }
  }
  throw new Error(`Nenhum espelho do Overpass respondeu.\n  ${failures.join('\n  ')}`)
}

/* ── Do Overpass para GeoJSON ─────────────────────────────────────────────
   Um `way` fechado é um anel. Uma `relation` é um multipolígono partido em
   troços: cada membro traz um pedaço de linha, e os pedaços do mesmo anel
   têm de ser cosidos pelas pontas — o Overpass não garante nem a ordem nem
   o sentido de cada troço. */

const key = (lon, lat) => `${lon},${lat}`
const pointKey = (p) => key(p.lon, p.lat)
const coordKey = (c) => key(c[0], c[1])

/** Cose os troços de uma relação em anéis fechados. */
function stitch(segments) {
  const rings = []
  const pool = segments.filter((s) => s && s.length > 1).map((s) => s.slice())
  while (pool.length) {
    let ring = pool.pop()
    let joined = true
    while (joined && pointKey(ring[0]) !== pointKey(ring[ring.length - 1])) {
      joined = false
      for (let i = 0; i < pool.length; i++) {
        const seg = pool[i]
        const tail = pointKey(ring[ring.length - 1])
        const head = pointKey(ring[0])
        if (pointKey(seg[0]) === tail) ring = ring.concat(seg.slice(1))
        else if (pointKey(seg[seg.length - 1]) === tail) ring = ring.concat(seg.slice().reverse().slice(1))
        else if (pointKey(seg[seg.length - 1]) === head) ring = seg.slice(0, -1).concat(ring)
        else if (pointKey(seg[0]) === head) ring = seg.slice().reverse().slice(0, -1).concat(ring)
        else continue
        pool.splice(i, 1)
        joined = true
        break
      }
    }
    // Um anel que não fecha é geometria incompleta na fonte; ignora-se.
    if (pointKey(ring[0]) === pointKey(ring[ring.length - 1]) && ring.length >= 4) rings.push(ring)
  }
  return rings
}

const toCoords = (ring) => ring.map((p) => [p.lon, p.lat])

/** Área plana com sinal de um anel em graus². Só serve para ordenar. */
function crudeArea(ring) {
  let s = 0
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    s += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]
  }
  return Math.abs(s / 2)
}

/**
 * Geometria de um elemento do Overpass.
 *
 * Nas relações, os anéis `inner` são buracos — o pátio dentro do jardim, o
 * lago dentro do parque. Cada buraco é atribuído ao anel exterior que o
 * contém, para que o GeoJSON saia bem formado e a área desconte o buraco
 * em vez de o somar.
 */
function toGeometry(el) {
  if (el.type === 'way') {
    const ring = toCoords(el.geometry ?? [])
    if (ring.length < 4) return null
    if (coordKey(ring[0]) !== coordKey(ring[ring.length - 1])) ring.push(ring[0])
    return { type: 'Polygon', coordinates: [ring] }
  }

  const isInner = (m) => m.role === 'inner'
  const members = (el.members ?? []).filter((m) => m.geometry)
  const outers = stitch(members.filter((m) => !isInner(m)).map((m) => m.geometry)).map(toCoords)
  const inners = stitch(members.filter(isInner).map((m) => m.geometry)).map(toCoords)
  if (!outers.length) return null

  outers.sort((a, b) => crudeArea(b) - crudeArea(a))
  const polygons = outers.map((o) => [o])
  for (const hole of inners) {
    const host = polygons.find((p) => geoContains({ type: 'Polygon', coordinates: [p[0]] }, hole[0]))
    if (host) host.push(hole)
  }
  return polygons.length === 1
    ? { type: 'Polygon', coordinates: polygons[0] }
    : { type: 'MultiPolygon', coordinates: polygons }
}

/* ── Classificação ────────────────────────────────────────────────────────
   A etiqueta do OSM diz o que a coisa é para um cartógrafo; o nome diz o
   que ela é para quem lá vai. A Mata Nacional do Choupal está etiquetada
   `leisure=park` e ninguém em Coimbra lhe chama parque. Quando os dois
   discordam, ganha o nome. */

function classify(tags) {
  const name = tags.name ?? ''
  if (/^(mata|pinhal|bambuzal)\b/i.test(name)) return 'mata'
  if (/^jardi(m|ns)\b/i.test(name)) return 'jardim'
  if (/^parque\b/i.test(name)) return 'parque'
  if (tags.leisure === 'nature_reserve') return 'reserva'
  if (tags.landuse === 'forest' || tags.natural === 'wood') return 'mata'
  if (tags.leisure === 'garden') return 'jardim'
  return 'parque'
}

/** Identificador estável, para o 3D do Visitar poder apontar para aqui. */
function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Douglas-Peucker sobre coordenadas já projectadas. */
function simplifyRing(ring, eps) {
  if (ring.length <= 4) return ring
  const keep = new Uint8Array(ring.length)
  keep[0] = 1
  keep[ring.length - 1] = 1
  const stack = [[0, ring.length - 1]]
  while (stack.length) {
    const [first, last] = stack.pop()
    let index = -1
    let maxSq = eps * eps
    const [ax, ay] = ring[first]
    const [bx, by] = ring[last]
    const dx = bx - ax
    const dy = by - ay
    const len = dx * dx + dy * dy
    for (let i = first + 1; i < last; i++) {
      const [px, py] = ring[i]
      let t = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0
      t = t < 0 ? 0 : t > 1 ? 1 : t
      const sq = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2
      if (sq > maxSq) {
        maxSq = sq
        index = i
      }
    }
    if (index > 0) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }
  const out = ring.filter((_, i) => keep[i])
  return out.length >= 4 ? out : ring
}

/**
 * Caminho SVG a partir de linhas já projectadas e simplificadas.
 *
 * `close` distingue as duas coisas que isto desenha: um anel de polígono
 * fecha-se e pinta-se por dentro; o eixo de um rio é uma linha aberta e
 * fechá-la ligaria a foz à nascente.
 */
function toPath(lines, digits, close = true) {
  const k = 10 ** digits
  const n = (v) => String(Math.round(v * k) / k)
  return lines
    .filter((line) => line.length > 1)
    .map((line) => `M${line.map(([x, y]) => `${n(x)},${n(y)}`).join('L')}${close ? 'Z' : ''}`)
    .join('')
}

/* ── Relevo ───────────────────────────────────────────────────────────────
   Sombreado de encosta a partir do Copernicus DEM, desenhado já na
   projecção do mapa: cada píxel da imagem é um ponto do viewBox, invertido
   para longitude e latitude e medido no DEM. A imagem assenta por baixo das
   manchas sem nenhuma conversão no browser.

   Sai em duas tintas numa só imagem: preto onde a encosta está virada
   para longe da luz, branco onde está virada para ela, transparente no
   plano. Sobre o papel escurece e aclara sem mudar a cor do fundo. */

async function loadDem() {
  const bin = join(DEM_CACHE, `${DEM_TILE}.f32`)
  const metaFile = join(DEM_CACHE, `${DEM_TILE}.json`)
  let meta
  let data
  if (existsSync(bin) && existsSync(metaFile)) {
    meta = JSON.parse(readFileSync(metaFile, 'utf8'))
    const buf = readFileSync(bin)
    data = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4)
  } else {
    process.stdout.write(`A obter ${DEM_URL}\n`)
    const img = await (await fromUrl(DEM_URL)).getImage()
    const [ox, oy] = img.getOrigin()
    const [rx, ry] = img.getResolution()
    const [raster] = await img.readRasters({ samples: [0] })
    meta = { ox, oy, rx, ry, w: img.getWidth(), h: img.getHeight() }
    data = Float32Array.from(raster)
  }
  const { ox, oy, rx, ry, w, h } = meta
  return (lon, lat) => {
    const fx = (lon - ox) / rx - 0.5
    const fy = (lat - oy) / ry - 0.5
    const x = Math.min(Math.max(Math.floor(fx), 0), w - 2)
    const y = Math.min(Math.max(Math.floor(fy), 0), h - 2)
    const tx = Math.min(Math.max(fx - x, 0), 1)
    const ty = Math.min(Math.max(fy - y, 0), 1)
    const i = y * w + x
    return (
      (data[i] * (1 - tx) + data[i + 1] * tx) * (1 - ty) +
      (data[i + w] * (1 - tx) + data[i + w + 1] * tx) * ty
    )
  }
}

/**
 * Desfoque gaussiano separável, no próprio sítio.
 *
 * O Copernicus é um modelo de SUPERFÍCIE: mede o topo das copas e dos
 * telhados. Sem desfoque, cada quarteirão e cada pinhal saem em grão — o
 * relevo que interessa (a colina da Alta, o vale do Mondego) fica debaixo
 * de ruído, e a imagem pesa o triplo porque o ruído não comprime.
 */
function gaussian(z, W, H, sigma) {
  if (!sigma) return
  const r = Math.ceil(sigma * 3)
  const k = Array.from({ length: 2 * r + 1 }, (_, i) => Math.exp(-((i - r) ** 2) / (2 * sigma * sigma)))
  const sum = k.reduce((a, b) => a + b, 0)
  const tmp = new Float32Array(z.length)
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let v = 0
      for (let t = -r; t <= r; t++) v += z[j * W + Math.min(Math.max(i + t, 0), W - 1)] * k[t + r]
      tmp[j * W + i] = v / sum
    }
  }
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let v = 0
      for (let t = -r; t <= r; t++) v += tmp[Math.min(Math.max(j + t, 0), H - 1) * W + i] * k[t + r]
      z[j * W + i] = v / sum
    }
  }
}

/**
 * Uma janela do viewBox em sombreado. `metresPerUnit` diz quanto mede uma
 * unidade do desenho no terreno — sem ele o declive sai em unidades
 * misturadas e o relevo fica achatado ou em penhasco consoante a escala.
 */
async function renderRelief({ box, widthPx, projection, height, metresPerUnit, exaggeration, blur, file }) {
  const W = widthPx
  const H = Math.round((widthPx * box.h) / box.w)
  const unitsPerPx = box.w / W
  const z = new Float32Array(W * H)
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const lonlat = projection.invert([box.x + (i + 0.5) * unitsPerPx, box.y + (j + 0.5) * unitsPerPx])
      z[j * W + i] = height(lonlat[0], lonlat[1]) * exaggeration
    }
  }
  gaussian(z, W, H, blur)

  // Horn (1981), a mesma derivada que o gdaldem usa. Luz de noroeste a 45°,
  // a convenção cartográfica: com luz de sul o relevo lê-se invertido.
  const cell = unitsPerPx * metresPerUnit
  // O ângulo da luz na convenção da ESRI: 315° de bússola passam a 135°
  // matemáticos, e o aspecto sai do atan2 no mesmo referencial.
  const azimuth = ((360 - 315 + 90) * Math.PI) / 180
  const zenith = (45 * Math.PI) / 180
  const flat = Math.cos(zenith)
  const at = (i, j) => z[Math.min(Math.max(j, 0), H - 1) * W + Math.min(Math.max(i, 0), W - 1)]
  const rgba = Buffer.alloc(W * H * 4)
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      const dzdx =
        (at(i + 1, j - 1) + 2 * at(i + 1, j) + at(i + 1, j + 1) -
          (at(i - 1, j - 1) + 2 * at(i - 1, j) + at(i - 1, j + 1))) / (8 * cell)
      const dzdy =
        (at(i - 1, j + 1) + 2 * at(i, j + 1) + at(i + 1, j + 1) -
          (at(i - 1, j - 1) + 2 * at(i, j - 1) + at(i + 1, j - 1))) / (8 * cell)
      const slope = Math.atan(Math.hypot(dzdx, dzdy))
      const aspect = Math.atan2(dzdy, -dzdx)
      const shade =
        Math.cos(zenith) * Math.cos(slope) +
        Math.sin(zenith) * Math.sin(slope) * Math.cos(azimuth - aspect)
      const delta = shade - flat
      const o = (j * W + i) * 4
      if (delta < 0) {
        rgba[o + 3] = Math.round(Math.min(1, -delta * 1.6) * 255)
      } else {
        rgba[o] = rgba[o + 1] = rgba[o + 2] = 255
        rgba[o + 3] = Math.round(Math.min(1, delta * 2.2) * 255)
      }
    }
  }
  mkdirSync(RELIEF_DIR, { recursive: true })
  await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 60, alphaQuality: 55, effort: 6 })
    .toFile(join(RELIEF_DIR, file))
  return { file, width: W, height: H }
}

/**
 * Onde o nome do rio assenta e com que inclinação. O ponto pedido prende-se
 * ao vértice mais próximo do eixo, e o ângulo é o do troço à volta dele —
 * nunca de cabeça para baixo.
 */
function riverLabel(lines, xy) {
  let best = null
  for (const line of lines) {
    for (let i = 1; i < line.length - 1; i++) {
      const d = Math.hypot(line[i][0] - xy[0], line[i][1] - xy[1])
      if (!best || d < best.d) best = { d, line, i }
    }
  }
  if (!best) return null
  const { line, i } = best
  const a = line[Math.max(0, i - 3)]
  const b = line[Math.min(line.length - 1, i + 3)]
  let angle = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI
  if (angle > 90) angle -= 180
  if (angle < -90) angle += 180
  return { x: Number(line[i][0].toFixed(1)), y: Number(line[i][1].toFixed(1)), angle: Number(angle.toFixed(1)) }
}

/**
 * O OSM aceita "fundacaoinesdecastro.com/jardim" sem protocolo, e um
 * endereço assim num `href` é relativo: levava o leitor a uma página do
 * próprio site que não existe.
 */
function absoluteUrl(url) {
  if (!url) return null
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

/** Distância de grande círculo, em km. */
function distanceKm(a, b) {
  const rad = Math.PI / 180
  const [lon1, lat1] = a
  const [lon2, lat2] = b
  const dLat = (lat2 - lat1) * rad
  const dLon = (lon2 - lon1) * rad
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2
  return (EARTH_RADIUS / 1000) * 2 * Math.asin(Math.sqrt(h))
}

async function main() {
  const [osm, geo] = await Promise.all([
    fetchOverpass(),
    (async () => {
      process.stdout.write(`A obter ${PARISHES_URL}\n`)
      return fetchJson(PARISHES_URL)
    })(),
  ])

  const municipality = { type: 'Feature', geometry: rewind(geo.geojsons.municipio.geometry) }
  const parishes = geo.geojsons.freguesias.map((f) => ({
    code: f.properties.dtmnfr,
    name: f.properties.nome ?? f.properties.freguesia,
    feature: { type: 'Feature', geometry: rewind(f.geometry) },
  }))

  const seen = new Map()
  const rejected = { anonimo: 0, privado: 0, pequeno: 0, semGeometria: 0, duplicado: 0, fora: 0 }

  /**
   * A água separa-se antes de tudo o resto.
   *
   * Sem isto o "Rio Mondego" entrava na lista dos espaços verdes: tem nome,
   * é público, e o eixo do rio — que é uma linha aberta — fechava-se num
   * polígono de área plausível. Sairia um parque de 40 hectares com a forma
   * do rio.
   */
  const isWater = (tags) => tags.natural === 'water' || Boolean(tags.waterway)
  // As estradas também: têm nome, e sem esta separação a Avenida Fernão de
  // Magalhães entrava na lista como parque.
  const isRoad = (tags) => Boolean(tags.highway)
  const water = osm.elements.filter((el) => isWater(el.tags ?? {}))
  const roads = osm.elements.filter((el) => isRoad(el.tags ?? {}))
  const green = osm.elements.filter((el) => !isWater(el.tags ?? {}) && !isRoad(el.tags ?? {}))

  for (const el of green) {
    const tags = el.tags ?? {}
    if (!tags.name) {
      rejected.anonimo++
      continue
    }
    const paid = tags.access === 'customers' && tags.fee === 'yes'
    if (tags.access === 'private' || (tags.access === 'customers' && !paid)) {
      rejected.privado++
      continue
    }

    // Corrigir o sentido dos anéis ANTES de medir. O OSM não garante
    // sentido nenhum, e para o d3 um anel invertido não é o jardim: é o
    // planeta menos o jardim. Medida depois, a Mata do Choupal dava 5×10⁹
    // hectares e o seu centróide caía no antípoda, sem freguesia nenhuma.
    const raw = toGeometry(el)
    if (!raw) {
      rejected.semGeometria++
      continue
    }
    const geometry = rewind(raw)

    const areaHa = (geoArea(geometry) * EARTH_RADIUS ** 2) / 1e4
    if (areaHa < MIN_AREA_HA) {
      rejected.pequeno++
      continue
    }

    const id = slugify(tags.name)
    const previous = seen.get(id)
    // O mesmo lugar mapeado duas vezes (contorno e recinto): fica o maior.
    if (previous) {
      rejected.duplicado++
      if (previous.areaHa >= areaHa) continue
    }

    const centre = geoCentroid(geometry)

    /**
     * A fronteira do OSM e a da carta oficial não coincidem ao metro. Onde
     * discordam, manda a carta oficial — é ela que desenha o mapa, e um
     * lugar que caia fora dela não teria freguesia nem sítio onde ser
     * pintado. O caso conhecido é a Quinta da EVA, 70 m a sul do limite.
     */
    if (!geoContains(municipality, centre)) {
      rejected.fora++
      continue
    }

    const parish = parishes.find((p) => geoContains(p.feature, centre))

    seen.set(id, {
      id,
      name: tags.name,
      altName: (tags.alt_name ?? '').split(';')[0] || null,
      kind: classify(tags),
      areaHa,
      centre,
      parish: parish ? { code: parish.code, name: parish.name } : null,
      distanceKm: distanceKm(CENTRE, centre),
      website: absoluteUrl(tags.website ?? tags['contact:website'] ?? null),
      paid: paid || tags.fee === 'yes',
      osm: `${el.type}/${el.id}`,
      geometry,
    })
  }

  /* As partes de um lugar partido em dois na carta juntam-se ao todo. */
  let merged = 0
  for (const [id, part] of [...seen]) {
    const base = part.name.match(/^(.+?)\s+[-–—]\s+.+$/)?.[1]
    const host = base && seen.get(slugify(base))
    if (!host) continue
    const polygons = (g) => (g.type === 'MultiPolygon' ? g.coordinates : [g.coordinates])
    host.geometry = {
      type: 'MultiPolygon',
      coordinates: [...polygons(host.geometry), ...polygons(part.geometry)],
    }
    // A freguesia fica a da parte maior: um parque nas duas margens não
    // tem uma só, e a do centróide do conjunto podia cair no rio.
    if (part.areaHa > host.areaHa) host.parish = part.parish
    host.areaHa += part.areaHa
    host.centre = geoCentroid(host.geometry)
    host.distanceKm = distanceKm(CENTRE, host.centre)
    host.paid = host.paid || part.paid
    seen.delete(id)
    merged++
  }

  const projection = geoTransverseMercator()
    .rotate([-PT_TM06.lon, 0])
    .center([0, PT_TM06.lat])
    .fitWidth(WIDTH - 2 * PAD, municipality)
  const measure = geoPath(projection)
  const [[x0, y0], [, y1]] = measure.bounds(municipality)
  const [tx, ty] = projection.translate()
  projection.translate([tx - x0 + PAD, ty - y0 + PAD])
  const height = Math.ceil(y1 - y0 + 2 * PAD)

  const ctx = roundingContext(DIGITS)
  const outlinePath = geoPath(projection, ctx)
  outlinePath(municipality)
  const outline = ctx.take()

  /**
   * O centro da cidade e o raio dos 3 km, em unidades do desenho.
   *
   * À escala do concelho — 30 km de ponta a ponta — o Jardim da Sereia tem
   * meio milímetro e não se vê. O mapa precisa de saber onde aproximar, e
   * a escala sai do próprio desenho: um grau de latitude a norte do Largo
   * da Portagem mede-se depois de projectado.
   */
  const centreXY = projection(CENTRE)
  const kmXY = projection([CENTRE[0], CENTRE[1] + 1 / 111.32])
  const unitsPerKm = Math.hypot(kmXY[0] - centreXY[0], kmXY[1] - centreXY[1])
  const focus = {
    x: Number(centreXY[0].toFixed(1)),
    y: Number(centreXY[1].toFixed(1)),
    r: Number((unitsPerKm * CITY_RADIUS_KM).toFixed(1)),
  }

  /* ── A água ──────────────────────────────────────────────────────────────
     Duas camadas, porque o OSM tem o rio de duas maneiras e nenhuma delas
     chega sozinha. A margem (`natural=water`) dá ao Mondego a largura que
     ele tem de facto ao passar na cidade, que é o que se quer ver; mas só
     está desenhada onde alguém a desenhou, e a montante desaparece. O eixo
     (`waterway=river`) atravessa o concelho inteiro sem interrupção, e é
     ele que garante que o rio não acaba a meio do mapa.

     Dos eixos entram só os que têm nome: Mondego, Ceira, Dueça. Os outros
     são troços de dois e três pontos — braços, açudes, ligações — que a
     esta escala não são rio nenhum, são sujidade sobre o desenho. */

  const waterAreas = water
    .filter((el) => (el.tags.natural === 'water' || el.tags.waterway === 'riverbank'))
    .map((el) => {
      const raw = toGeometry(el)
      return raw ? projectedRings(rewind(raw), projection).flat() : []
    })
    .flat()
    .map((ring) => simplifyRing(ring, SIMPLIFY_EPS))

  const waterLines = water
    .filter((el) => el.tags.waterway === 'river' && el.tags.name && el.geometry)
    .map((el) => simplifyRing(el.geometry.map((p) => projection([p.lon, p.lat])), SIMPLIFY_EPS))

  const rivers = [...new Set(
    water.filter((el) => el.tags.waterway === 'river' && el.tags.name).map((el) => el.tags.name),
  )].sort()

  let before = 0
  let after = 0
  const spaces = [...seen.values()]
    .map((s) => {
      const rings = projectedRings(s.geometry, projection)
      const flat = rings.flat()
      before += flat.reduce((n, r) => n + r.length, 0)
      const simplified = flat.map((r) => simplifyRing(r, SIMPLIFY_EPS))
      after += simplified.reduce((n, r) => n + r.length, 0)
      const label = polylabel(rings[0])
      const xs = simplified.flat().map((p) => p[0])
      const ys = simplified.flat().map((p) => p[1])
      // A geometria em graus já cumpriu o seu papel; o que segue para o
      // ficheiro é o caminho projectado.
      const { geometry, centre, ...rest } = s
      void geometry
      return {
        ...rest,
        areaHa: Number(s.areaHa.toFixed(2)),
        distanceKm: Number(s.distanceKm.toFixed(1)),
        lat: Number(centre[1].toFixed(5)),
        lon: Number(centre[0].toFixed(5)),
        label: {
          x: Number(label.x.toFixed(1)),
          y: Number(label.y.toFixed(1)),
          r: Number(label.r.toFixed(1)),
        },
        box: [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)].map((v) =>
          Number(v.toFixed(1)),
        ),
        d: toPath(simplified, DIGITS),
      }
    })
    .sort((a, b) => b.areaHa - a.areaHa)

  /**
   * Uma extracção que devolve muito menos do que a última é uma falha da
   * fonte, não uma cidade que ficou sem jardins. Sem esta guarda, um
   * espelho do Overpass a responder mal reescrevia o ficheiro a zeros e a
   * página nascia vazia — o gerador prefere abortar e deixar ficar o
   * ficheiro que já lá está.
   */
  /**
   * As freguesias pavimentam o município, portanto uma zona dentro dele tem
   * sempre uma. Se alguma não tiver, é buraco na carta — e vale mais parar
   * do que publicar uma ficha com a origem em branco.
   */
  const semFreguesia = spaces.filter((s) => !s.parish)
  if (semFreguesia.length) {
    throw new Error(
      `Sem freguesia, dentro do município: ${semFreguesia.map((s) => s.name).join(', ')}. ` +
        `Há um buraco na carta administrativa; nada foi escrito.`,
    )
  }

  if (spaces.length < MIN_EXPECTED) {
    throw new Error(
      `Só ${spaces.length} zonas — esperavam-se pelo menos ${MIN_EXPECTED}. ` +
        `A fonte respondeu mal; o ficheiro anterior fica como está.`,
    )
  }

  const waterPaths = {
    areas: toPath(waterAreas, DIGITS),
    lines: toPath(waterLines, DIGITS, false),
    rivers,
    label: riverLabel(
      water
        .filter((el) => el.tags.waterway === 'river' && el.tags.name === RIVER_LABEL.osmName && el.geometry)
        .map((el) => el.geometry.map((p) => projection([p.lon, p.lat]))),
      projection(RIVER_LABEL.lonlat),
    ),
  }

  /* ── As estradas ─────────────────────────────────────────────────────────
     Três traços, do mais grosso ao mais fino. Simplificam-se com mais
     tolerância do que os jardins: uma estrada só tem de estar onde está,
     não de ter o contorno certo. */
  const ROAD_CLASS = {
    motorway: 'major', trunk: 'major', primary: 'major',
    secondary: 'secondary', tertiary: 'minor',
  }
  const roadLines = { major: [], secondary: [], minor: [] }
  for (const el of roads) {
    const cls = ROAD_CLASS[el.tags.highway]
    if (!cls || !el.geometry) continue
    roadLines[cls].push(simplifyRing(el.geometry.map((p) => projection([p.lon, p.lat])), cls === 'minor' ? 0.2 : 0.4))
  }
  const roadPaths = Object.fromEntries(
    Object.entries(roadLines).map(([k, lines]) => [k, toPath(lines, DIGITS, false)]),
  )

  const landmarks = LANDMARKS.map(({ id, name, lonlat }) => {
    const [x, y] = projection(lonlat)
    return { id, name, x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }
  })

  /* ── O relevo, nas duas janelas do mapa ─────────────────────────────── */
  const dem = await loadDem()
  const metresPerUnit = 1000 / unitsPerKm
  // A mesma caixa que o mapa calcula para a escala da cidade (BOXES em
  // GreenFigure), a partir dos mesmos números arredondados.
  const cityBox = {
    x: focus.x - focus.r * 1.15,
    y: focus.y - focus.r * 1.15,
    w: focus.r * 2.3,
    h: focus.r * 2.3,
  }
  const relief = {
    concelho: await renderRelief({
      box: { x: 0, y: 0, w: WIDTH, h: height },
      widthPx: RELIEF_PX.concelho,
      projection,
      height: dem,
      metresPerUnit,
      exaggeration: 2,
      blur: 1.4,
      file: 'relevo-concelho.webp',
    }),
    cidade: await renderRelief({
      box: cityBox,
      widthPx: RELIEF_PX.cidade,
      projection,
      height: dem,
      metresPerUnit,
      exaggeration: 1.5,
      blur: 3,
      file: 'relevo-cidade.webp',
    }),
  }
  relief.concelho.box = { x: 0, y: 0, w: WIDTH, h: height }
  relief.cidade.box = Object.fromEntries(Object.entries(cityBox).map(([k, v]) => [k, Number(v.toFixed(3))]))

  // Com --offline a data é a da cópia guardada, não a de hoje: a carta
  // não ficou mais fresca por se ter redesenhado.
  const fetchedAt = (OFFLINE ? statSync(OVERPASS_CACHE).mtime : new Date()).toISOString().slice(0, 10)
  const osmTimestamp = osm.osm3s?.timestamp_osm_base?.slice(0, 10) ?? fetchedAt

  writeFileSync(
    OUT,
    render({
      spaces, outline, height, focus, water: waterPaths, roads: roadPaths, landmarks, relief,
      fetchedAt, osmTimestamp, rejected, merged,
    }),
    'utf8',
  )

  const bytes = Buffer.byteLength(spaces.map((s) => s.d).join(''))
  const total = spaces.reduce((n, s) => n + s.areaHa, 0)
  process.stdout.write(
    `${spaces.length} zonas · ${total.toFixed(0)} ha · ${before} → ${after} vértices · ` +
      `${(bytes / 1024).toFixed(0)} KB de caminhos\n` +
      `Água: ${waterAreas.length} anéis de margem, ${waterLines.length} troços de eixo ` +
      `(${rivers.join(', ')})\n` +
      `Recusados: ${rejected.anonimo} sem nome, ${rejected.privado} privados, ` +
      `${rejected.pequeno} abaixo de ${MIN_AREA_HA} ha, ${rejected.fora} fora do município, ` +
      `${rejected.duplicado} repetidos; ${merged} partes juntas a outro lugar\n` +
      `Estradas: ${Object.entries(roadPaths).map(([k, d]) => `${k} ${(d.length / 1024).toFixed(0)} KB`).join(', ')}\n` +
      `Relevo: ${Object.values(relief).map((r) => `${r.file} ${r.width}×${r.height}`).join(', ')}\n` +
      `Escrito ${OUT}\n`,
  )
}

const quote = (v) => (v === null ? 'null' : `'${String(v).replace(/'/g, "\\'")}'`)

function render({ spaces, outline, height, focus, water, roads, landmarks, relief, fetchedAt, osmTimestamp, rejected, merged }) {
  const rows = spaces
    .map(
      (s) =>
        `  {\n` +
        `    id: ${quote(s.id)},\n` +
        `    name: ${quote(s.name)},\n` +
        `    altName: ${quote(s.altName)},\n` +
        `    kind: ${quote(s.kind)},\n` +
        `    areaHa: ${s.areaHa},\n` +
        `    parish: ${s.parish ? `{ code: '${s.parish.code}', name: ${quote(s.parish.name)} }` : 'null'},\n` +
        `    distanceKm: ${s.distanceKm},\n` +
        `    lat: ${s.lat},\n` +
        `    lon: ${s.lon},\n` +
        `    website: ${quote(s.website)},\n` +
        `    paid: ${s.paid},\n` +
        `    osm: ${quote(s.osm)},\n` +
        `    label: { x: ${s.label.x}, y: ${s.label.y}, r: ${s.label.r} },\n` +
        `    box: [${s.box.join(', ')}],\n` +
        `    d: '${s.d}',\n` +
        `  },`,
    )
    .join('\n')

  return `/**
 * GERADO POR scripts/build-green-spaces.mjs — NÃO EDITAR À MÃO.
 *
 * Espaços verdes públicos com nome no município de Coimbra, do
 * OpenStreetMap, obtidos em ${fetchedAt}. A base de dados do OSM usada
 * nesta extracção estava em ${osmTimestamp}.
 *
 * Os caminhos estão na MESMA projecção e no MESMO viewBox do mapa das
 * freguesias (\`lib/parish-map.ts\`), o que permite sobrepor as duas cartas
 * sem transformação nenhuma.
 *
 * Esta extracção recusou ${rejected.anonimo} polígonos sem nome, ${rejected.privado} de acesso
 * privado e ${rejected.pequeno} abaixo de ${MIN_AREA_HA} ha, e juntou ${merged} parte(s) ao lugar de
 * que fazem parte. Os critérios e a razão de cada um estão no cabeçalho do
 * gerador — quem discordar deles vê ali o que mudar.
 */

/** O que a coisa é para quem lá vai, que nem sempre é o que o OSM diz. */
export type GreenKind = 'mata' | 'parque' | 'jardim' | 'reserva'

export interface GreenSpace {
  /** Identificador estável. É por aqui que uma visita em 3D aponta. */
  id: string
  /** Nome oficial, como está na carta. */
  name: string
  /** O nome pelo qual a cidade lhe chama, quando é outro. */
  altName: string | null
  kind: GreenKind
  /** Área medida no polígono, em hectares. */
  areaHa: number
  /** Freguesia onde cai o centróide. Um polígono pode transbordar dela. */
  parish: { code: string; name: string } | null
  /** Distância em linha recta ao Largo da Portagem, km. */
  distanceKm: number
  lat: number
  lon: number
  website: string | null
  /** Entrada paga. Aberto a quem entra, mas com bilhete. */
  paid: boolean
  /** Elemento na carta de origem, para quem quiser conferir ou corrigir. */
  osm: string
  /** Onde pousar o nome no mapa, e que espaço há para ele. */
  label: { x: number; y: number; r: number }
  /** Caixa da forma no desenho: x0, y0, x1, y1. */
  box: [number, number, number, number]
  /** Caminho SVG, em unidades do viewBox. */
  d: string
}

export const GREEN_VIEW = { width: ${WIDTH}, height: ${height} }

/** Contorno do município, para situar as zonas no seu território. */
export const MUNICIPALITY_OUTLINE =
  '${outline}'

/**
 * A água, em duas camadas.
 *
 * \`areas\` é a margem do rio onde ela está desenhada — dá ao Mondego a
 * largura que ele tem ao passar na cidade. \`lines\` é o eixo dos rios com
 * nome (${water.rivers.join(', ')}), que atravessa o concelho onde a margem
 * não está mapeada. As duas na mesma projecção de tudo o resto.
 */
export const WATER = {
  areas: '${water.areas}',
  lines: '${water.lines}',
  /** Os rios com nome que o eixo desenha. */
  rivers: ${JSON.stringify(water.rivers)},
  /** Onde escrever o nome do Mondego, já preso ao eixo e rodado com ele. */
  label: ${JSON.stringify(water.label)} as { x: number; y: number; angle: number } | null,
}

/**
 * As estradas, só para orientar: principais no concelho, secundárias, e as
 * terciárias perto do centro. Linhas abertas, na projecção do resto.
 */
export const ROADS = {
  major: '${roads.major}',
  secondary: '${roads.secondary}',
  minor: '${roads.minor}',
}

/** Os pontos por onde o leitor se orienta. A Portagem é a origem das distâncias. */
export const LANDMARKS: { id: string; name: string; x: number; y: number }[] = ${JSON.stringify(landmarks)}

/**
 * O relevo sombreado de cada escala, em \`public/data\`, e a janela do
 * desenho que cada imagem cobre. Copernicus DEM GLO-30.
 */
export const RELIEF = {
  concelho: { href: '/data/${relief.concelho.file}', ...${JSON.stringify(relief.concelho.box)} },
  cidade: { href: '/data/${relief.cidade.file}', ...${JSON.stringify(relief.cidade.box)} },
}

/**
 * Onde fica o centro da cidade no desenho, e que raio ocupam ali os
 * ${CITY_RADIUS_KM} km — o que permite ao mapa aproximar sem números escritos à mão.
 */
export const CITY_FOCUS = { x: ${focus.x}, y: ${focus.y}, r: ${focus.r} }

/** Data em que a geometria foi obtida da fonte. */
export const GREEN_FETCHED_AT = '${fetchedAt}'

/** Distância acima da qual uma zona deixa de ser alcançável a pé, km. */
export const CITY_RADIUS_KM = ${CITY_RADIUS_KM}

/** Área mínima para entrar nesta lista, hectares. */
export const MIN_AREA_HA = ${MIN_AREA_HA}

/** Ordenadas da maior para a menor. */
export const GREEN_SPACES: GreenSpace[] = [
${rows}
]
`
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`)
  process.exit(1)
})
