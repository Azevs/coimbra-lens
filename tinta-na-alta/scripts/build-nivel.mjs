/**
 * O nível de uma missão: a caixa e os nomes vêm de `scripts/missoes/<id>.mjs`.
 *
 * Edifícios, ruas e escadas vêm do OSM; o chão e as alturas do LiDAR da DGT
 * (as folhas MDT/MDS de 2 m que o CoimbraLens já tem em scripts/blender/dem).
 * Sai `public/niveis/<id>.json`, em metros locais: x para nascente, y para
 * norte, z a cota absoluta.
 *
 *   node scripts/build-nivel.mjs <id> [--refazer]
 *   node scripts/build-nivel.mjs <id> --longe
 *
 * Um nível que já existe não se regenera sem `--refazer`: o OSM muda e a
 * missão foi afinada em cima do que lá está. `--longe` só acrescenta (ou
 * refaz) o que se vê ao longe, sem tocar no resto.
 *
 * Com `RECORTES = { largura, excepto }`, onde uma via pedonal com nome atravessa
 * a pegada de um edifício, a pegada perde uma faixa com a largura da via; numa
 * passagem coberta o andar de cima sai em `pontes`. Com `AGUA`, o rio dentro da
 * caixa sai em `agua`.
 *
 * Ao longe (se a missão tiver `LONGE = { raio }`): relevo grosso do MDT,
 * edifícios do OSM à volta do nível (contorno simplificado, altura do MDS) e a
 * água do Mondego. Só se desenha: não tem colisão.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const ID = process.argv.slice(2).find((a) => !a.startsWith('--'))
if (!ID) throw new Error('Falta o id da missão: node scripts/build-nivel.mjs <id>')
const SAIDA = join(ROOT, 'public', 'niveis', `${ID}.json`)
const SO_LONGE = process.argv.includes('--longe')
if (existsSync(SAIDA) && !process.argv.includes('--refazer') && !SO_LONGE) {
  console.error(`${SAIDA} já existe. Para o gerar de novo: --refazer`)
  process.exit(1)
}
const MISSAO = await import(pathToFileURL(join(ROOT, 'scripts', 'missoes', `${ID}.mjs`)).href)
const LENS = join(ROOT, '..') // o CoimbraLens, onde o jogo vive
const DIR_DEM = join(LENS, 'scripts', 'blender', 'dem')
const require = createRequire(join(LENS, 'package.json'))
const proj4 = require('proj4')
// O .cjs do martinez não se dá com o tinyqueue: vai o módulo ES.
const martinez = await import(pathToFileURL(join(LENS, 'node_modules', 'martinez-polygon-clipping', 'dist', 'martinez.js')).href)
const { folhasNaCaixa, pixelDGT, dentroDoPoligono } = await import(
  'file:///' + join(LENS, 'scripts', 'lib', 'dgt.mjs').replace(/\\/g, '/')
)

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')

const { CENTRO, NOMES, EXTRA = [] } = MISSAO
const [MEIO_X, MEIO_Y] = MISSAO.MEIO
const PE_DIREITO = 3.2
const ALTURA_OMISSAO = 9 // só para quem o laser e o OSM deixam sem nada

const USER_AGENT = 'TintaNaAlta/0.1 (jogo; gerador de nível a partir do OSM)'
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function overpass(query) {
  let ultimo
  for (const url of OVERPASS) {
    for (let t = 0; t < 2; t++) {
      try {
        const r = await fetch(url, {
          method: 'POST',
          signal: AbortSignal.timeout(180000),
          headers: { 'User-Agent': USER_AGENT },
          body: new URLSearchParams({ data: query }),
        })
        const txt = await r.text()
        if (txt.trim().startsWith('{')) {
          const j = JSON.parse(txt)
          if (j.elements?.length) return j
          ultimo = j.remark ?? 'sem elementos'
        } else ultimo = `HTTP ${r.status}`
      } catch (e) {
        ultimo = e.message
      }
      await sleep(4000)
    }
    console.warn(`  ${url}: ${ultimo}`)
  }
  throw new Error('Overpass indisponível: ' + ultimo)
}

function aneis(membros) {
  const trocos = membros.map((m) => m.slice())
  const fechados = []
  const igual = (a, b) => Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7
  while (trocos.length) {
    let anel = trocos.shift()
    for (let seguiu = true; seguiu && !igual(anel[0], anel.at(-1)); ) {
      seguiu = false
      for (let i = 0; i < trocos.length; i++) {
        const t = trocos[i]
        if (igual(anel.at(-1), t[0])) anel = anel.concat(t.slice(1))
        else if (igual(anel.at(-1), t.at(-1))) anel = anel.concat(t.slice(0, -1).reverse())
        else continue
        trocos.splice(i, 1)
        seguiu = true
        break
      }
    }
    if (igual(anel[0], anel.at(-1)) && anel.length >= 4) fechados.push(anel)
  }
  return fechados
}

function area(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
  }
  return a / 2
}

function limpar(anel) {
  const out = []
  for (const p of anel) {
    if (out.length && Math.hypot(p[0] - out.at(-1)[0], p[1] - out.at(-1)[1]) < 0.3) continue
    out.push(p)
  }
  if (out.length > 1 && Math.hypot(out[0][0] - out.at(-1)[0], out[0][1] - out.at(-1)[1]) < 0.3) out.pop()
  return out
}

function distSeg(p, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1]
  const L = vx * vx + vy * vy
  const t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / L)) : 0
  return Math.hypot(p[0] - a[0] - t * vx, p[1] - a[1] - t * vy)
}

function segmentosCruzam(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]))
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b)
}

const percentil = (v, p) => {
  const s = [...v].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))]
}

// ------------------------------------------------------------------------

const [CXf, CYf] = paraTM06.forward([CENTRO.lon, CENTRO.lat])
const CX = Math.round(CXf), CY = Math.round(CYf)
const caixa = [CX - MEIO_X - 6, CY - MEIO_Y - 6, CX + MEIO_X + 6, CY + MEIO_Y + 6]
const local = ([X, Y]) => [+(X - CX).toFixed(2), +(Y - CY).toFixed(2)]
const deLL = (g) => g.map((p) => local(paraTM06.forward([p.lon, p.lat])))

// ------------------------------------------------------------ ao longe --

/** Douglas-Peucker num anel fechado: parte-se no ponto mais longe do primeiro. */
function simplificarAnel(pts, tol) {
  const dp = (p) => {
    if (p.length < 3) return p
    let iMax = 0, dMax = 0
    for (let i = 1; i < p.length - 1; i++) { const d = distSeg(p[i], p[0], p.at(-1)); if (d > dMax) { dMax = d; iMax = i } }
    return dMax <= tol ? [p[0], p.at(-1)] : [...dp(p.slice(0, iMax + 1)).slice(0, -1), ...dp(p.slice(iMax))]
  }
  let k = 0, dk = -1
  pts.forEach((p, i) => { const d = Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1]); if (d > dk) { dk = d; k = i } })
  return [...dp([...pts.slice(0, k + 1)]).slice(0, -1), ...dp([...pts.slice(k), pts[0]]).slice(0, -1)]
}

async function aoLonge() {
  const R = MISSAO.LONGE.raio, PASSO = 12
  const cx = [CX - R, CY - R, CX + R, CY + R]
  const mdtL = await folhasNaCaixa(DIR_DEM, 'MDT', cx)
  const mdsL = await folhasNaCaixa(DIR_DEM, 'MDS', cx)
  const nCol = Math.floor((2 * R) / PASSO) + 1, nRow = nCol
  const elev = []
  for (let r = 0; r < nRow; r++) for (let c = 0; c < nCol; c++) {
    const v = pixelDGT(mdtL, CX - R + c * PASSO, CY - R + r * PASSO)
    elev.push(v == null ? null : +v.toFixed(1))
  }
  const swL = proj4('EPSG:3763', 'EPSG:4326', [cx[0], cx[1]]), neL = proj4('EPSG:3763', 'EPSG:4326', [cx[2], cx[3]])
  const bbL = `${swL[1]},${swL[0]},${neL[1]},${neL[0]}`
  const jL = await overpass(`[out:json][timeout:180];
(
  way["building"](${bbL});
  nwr["natural"="water"](${bbL});
  nwr["waterway"="riverbank"](${bbL});
);
out geom;`)
  const localL = (g) => g.map((p) => { const [X, Y] = paraTM06.forward([p.lon, p.lat]); return [+(X - CX).toFixed(1), +(Y - CY).toFixed(1)] })
  const edificiosL = []
  for (const e of jL.elements) {
    if (e.type !== 'way' || !e.geometry || !e.tags?.building) continue
    let anel = limpar(localL(e.geometry))
    if (anel.length < 3 || Math.abs(area(anel)) < 60) continue
    const xs = anel.map((p) => p[0]), ys = anel.map((p) => p[1])
    // O que está dentro do nível já lá está, desenhado a sério.
    if (Math.max(...xs) > -MEIO_X + 2 && Math.min(...xs) < MEIO_X - 2 && Math.max(...ys) > -MEIO_Y + 2 && Math.min(...ys) < MEIO_Y - 2) continue
    if (Math.hypot((Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2) > R) continue
    anel = simplificarAnel(anel, 1.2)
    if (anel.length < 3) continue
    if (area(anel) < 0) anel.reverse()
    const cotas = anel.map(([x, y]) => pixelDGT(mdtL, x + CX, y + CY)).filter((v) => v != null)
    if (!cotas.length) continue
    // Altura: mediana do MDS em pontos de dentro (grelha de 3 m, no máximo 25).
    const am = []
    const dx = Math.max(3, (Math.max(...xs) - Math.min(...xs)) / 5), dy = Math.max(3, (Math.max(...ys) - Math.min(...ys)) / 5)
    for (let x = Math.min(...xs) + dx / 2; x < Math.max(...xs); x += dx) for (let y = Math.min(...ys) + dy / 2; y < Math.max(...ys); y += dy) {
      if (!dentroDoPoligono(x, y, anel)) continue
      const v = pixelDGT(mdsL, x + CX, y + CY)
      if (v != null) am.push(v)
    }
    const base = Math.min(...cotas)
    let topo = am.length ? percentil(am, 0.5) : Math.max(...cotas) + ALTURA_OMISSAO
    topo = Math.max(topo, Math.max(...cotas) + 3)
    edificiosL.push({ g: anel, base: +base.toFixed(1), topo: +topo.toFixed(1) })
  }
  const agua = []
  for (const e of jL.elements) {
    const t = e.tags ?? {}
    if (!(t.natural === 'water' || t.waterway === 'riverbank')) continue
    if (!(/river|reservoir/.test(t.water ?? '') || t.waterway === 'riverbank')) continue
    const partes = e.type === 'way' && e.geometry ? [e.geometry.map((p) => [p.lon, p.lat])]
      : aneis((e.members ?? []).filter((m) => m.type === 'way' && m.role === 'outer' && m.geometry).map((m) => m.geometry.map((p) => [p.lon, p.lat])))
    for (const p of partes) {
      const anel = simplificarAnel(limpar(localL(p.map(([lon, lat]) => ({ lon, lat })))), 2)
      if (anel.length >= 3 && Math.abs(area(anel)) > 5000) agua.push(anel)
    }
  }
  console.log(`ao longe: relevo ${nCol}×${nRow} de ${PASSO} m, ${edificiosL.length} edifícios, ${agua.length} manchas de água`)
  return { passo: PASSO, x0: -R, y0: -R, nCol, nRow, elev, edificios: edificiosL, agua }
}

if (SO_LONGE) {
  const nivel = JSON.parse(readFileSync(SAIDA, 'utf8'))
  if (!MISSAO.LONGE) throw new Error(`scripts/missoes/${ID}.mjs não tem LONGE`)
  nivel.longe = await aoLonge()
  writeFileSync(SAIDA, JSON.stringify(nivel))
  console.log(`→ public/niveis/${ID}.json (com o que se vê ao longe)`)
  process.exit(0)
}

const mdt = await folhasNaCaixa(DIR_DEM, 'MDT', caixa)
const mds = await folhasNaCaixa(DIR_DEM, 'MDS', caixa)
console.log(`LiDAR: ${mdt.map((f) => f.f).join(', ')}`)

const gx0 = Math.floor((caixa[0] - 1) / 2) * 2 + 1
const gy0 = Math.floor((caixa[1] - 1) / 2) * 2 + 1
const nCol = Math.floor((caixa[2] - gx0) / 2) + 1
const nRow = Math.floor((caixa[3] - gy0) / 2) + 1
const elev = []
let falhas = 0
for (let r = 0; r < nRow; r++) {
  for (let c = 0; c < nCol; c++) {
    const v = pixelDGT(mdt, gx0 + c * 2, gy0 + r * 2)
    if (v == null) falhas++
    elev.push(v == null ? null : +v.toFixed(2))
  }
}
if (falhas) throw new Error(`${falhas} nós sem MDT — falta uma folha?`)
const dem = { x0: gx0 - CX, y0: gy0 - CY, passo: 2, nCol, nRow, elev }
const chao = (x, y) => pixelDGT(mdt, x + CX, y + CY)

const sw = proj4('EPSG:3763', 'EPSG:4326', [caixa[0], caixa[1]])
const ne = proj4('EPSG:3763', 'EPSG:4326', [caixa[2], caixa[3]])
const bb = `${sw[1]},${sw[0]},${ne[1]},${ne[0]}`

const j = await overpass(`[out:json][timeout:120];
(
  way["building"](${bb});
  relation["building"](${bb});
  way["highway"](${bb});
  way["area:highway"](${bb});
  nwr["place"="square"](${bb});
  way["barrier"~"wall|retaining_wall|city_wall"](${bb});
  nwr["name"~"${NOMES}",i](${bb});
  nwr["historic"](${bb});
${EXTRA.map((l) => '  ' + l.replaceAll('{bb}', bb) + '\n').join('')});
out geom;`)
console.log(`OSM: ${j.elements.length} elementos`)

// ---- vias primeiro: as passagens por baixo de edifícios decidem arcos ----
const vias = []
const nomes = {}
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (t.name && new RegExp(NOMES, 'i').test(t.name)) {
    const g = e.type === 'node' ? [[e.lat, e.lon]] : null
    nomes[`${e.type}/${e.id}`] = { name: t.name, tags: t, g: e.type === 'node' ? deLL([{ lat: e.lat, lon: e.lon }])[0] : e.geometry ? deLL(e.geometry) : null }
    void g
  }
  if (e.type !== 'way' || !e.geometry) continue
  if (t.highway) {
    vias.push({
      osm: `way/${e.id}`,
      tipo: t.highway,
      nome: t.name ?? null,
      passagem: t.tunnel === 'building_passage' || t.covered === 'yes' || t.tunnel === 'yes',
      area: t.area === 'yes',
      largura: parseFloat(t.width) || null,
      ...(t.access ? { acesso: t.access } : {}),
      g: deLL(e.geometry),
    })
  }
}
const pracas = []
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (e.type === 'way' && e.geometry && (t['area:highway'] || t.place === 'square' || t.man_made === 'courtyard' || (t.highway && t.area === 'yes'))) {
    pracas.push({ osm: `way/${e.id}`, nome: t.name ?? null, g: limpar(deLL(e.geometry)) })
  }
}
const muros = []
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (e.type === 'way' && e.geometry && t.barrier) {
    muros.push({ osm: `way/${e.id}`, tipo: t.barrier, altura: parseFloat(t.height) || null, g: deLL(e.geometry) })
  }
}
// Nós soltos com etiquetas (portões, estátuas, portas da cerca): as missões decidem o que fazer com eles.
const nos = []
for (const e of j.elements) {
  if (e.type !== 'node' || !e.tags) continue
  const [x, y] = deLL([{ lat: e.lat, lon: e.lon }])[0]
  if (Math.abs(x) > MEIO_X || Math.abs(y) > MEIO_Y) continue
  nos.push({ osm: `node/${e.id}`, nome: e.tags.name ?? null, tags: e.tags, p: [x, y] })
}

// ---- edifícios ----
const edificios = []
const conta = { lidar: 0, osm: 0, omissao: 0 }
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (!t.building) continue
  if (e.type === 'relation' && t.type !== 'multipolygon') continue
  let exteriores, interiores
  if (e.type === 'way') {
    if (!e.geometry) continue
    exteriores = [e.geometry.map((p) => [p.lon, p.lat])]
    interiores = []
  } else {
    const papel = (r) => aneis((e.members ?? []).filter((q) => q.type === 'way' && q.role === r && q.geometry)
      .map((q) => q.geometry.map((p) => [p.lon, p.lat])))
    exteriores = papel('outer')
    interiores = papel('inner')
  }
  for (const ex of exteriores) {
    let anel = limpar(ex.map(([lon, lat]) => local(paraTM06.forward([lon, lat]))))
    if (anel.length < 3) continue
    if (!anel.some(([x, y]) => Math.abs(x) <= MEIO_X && Math.abs(y) <= MEIO_Y)) continue
    if (Math.abs(area(anel)) < 6) continue
    if (area(anel) < 0) anel.reverse()
    const furos = interiores
      .map((i) => limpar(i.map(([lon, lat]) => local(paraTM06.forward([lon, lat])))))
      .filter((f) => f.length >= 3 && dentroDoPoligono(f[0][0], f[0][1], anel))
      .map((f) => (area(f) > 0 ? f.reverse() : f))

    const xs = anel.map((p) => p[0]), ys = anel.map((p) => p[1])
    const bordos = [anel, ...furos].flatMap((a) => a.map((p, i) => [p, a[(i + 1) % a.length]]))
    const amostrar = (recuo) => {
      const out = []
      for (let x = Math.floor((Math.min(...xs) + CX - 1) / 2) * 2 + 1 - CX; x <= Math.max(...xs); x += 2) {
        for (let y = Math.floor((Math.min(...ys) + CY - 1) / 2) * 2 + 1 - CY; y <= Math.max(...ys); y += 2) {
          if (!dentroDoPoligono(x, y, anel) || furos.some((f) => dentroDoPoligono(x, y, f))) continue
          if (recuo && Math.min(...bordos.map(([a, b]) => distSeg([x, y], a, b))) < recuo) continue
          const s = pixelDGT(mds, x + CX, y + CY), g = chao(x, y)
          if (s != null && g != null) out.push({ s, g })
        }
      }
      return out
    }
    let am = amostrar(1)
    if (am.length < 3) am = amostrar(0)
    const cotas = anel.map(([x, y]) => chao(x, y)).filter((v) => v != null)
    if (!cotas.length) continue
    const base = Math.min(...cotas)
    const hMed = am.length >= 3 ? percentil(am.map((a) => a.s - a.g), 0.5) : null
    let topo, cumeeira, fonte
    if (hMed != null && hMed >= 2.5) {
      topo = percentil(am.map((a) => a.s), 0.2)
      cumeeira = percentil(am.map((a) => a.s), 0.92)
      fonte = 'lidar'
    } else {
      const h = parseFloat(t.height), pisos = parseFloat(t['building:levels'])
      const hOSM = Number.isFinite(h) && h > 1 ? h : Number.isFinite(pisos) ? pisos * PE_DIREITO + 1 : null
      topo = Math.max(...cotas) + (hOSM ?? ALTURA_OMISSAO)
      cumeeira = topo
      fonte = hOSM ? 'osm' : 'omissao'
    }
    conta[fonte]++
    // O beirado nunca abaixo do chão mais alto do contorno + 3 m: numa
    // encosta, o lado de cima tem de continuar a ser parede.
    topo = Math.max(topo, Math.max(...cotas) + 3)
    cumeeira = Math.max(cumeeira, topo)

    // Passagem: uma via marcada como passagem que atravessa o contorno.
    const passagem = vias.some((v) => v.passagem && v.g.some((p, i) => i > 0 && (
      dentroDoPoligono(p[0], p[1], anel) ||
      anel.some((q, k) => segmentosCruzam(v.g[i - 1], p, q, anel[(k + 1) % anel.length])))))

    edificios.push({
      osm: `${e.type}/${e.id}`,
      nome: t.name ?? null,
      tipo: t.building,
      religiao: t.religion ?? null,
      anel, furos,
      base: +base.toFixed(2),
      topo: +topo.toFixed(2),
      cumeeira: +cumeeira.toFixed(2),
      chaoMax: +Math.max(...cotas).toFixed(2),
      fonte,
      passagem,
    })
  }
}
console.log(`edifícios: ${edificios.length} (lidar ${conta.lidar}, osm ${conta.osm}, omissão ${conta.omissao}); passagens: ${edificios.filter((b) => b.passagem).map((b) => b.nome ?? b.osm).join(', ')}`)

// ---- becos: recortes das pegadas ao longo das vias pedonais ----
// Na Baixa o contorno dos prédios pisa ou aperta muitas vezes a linha do beco.
// Onde a faixa de um beco com nome (a largura da via, ou 1,8 m) entra numa
// pegada, ou uma via com nome a atravessa, tira-se essa faixa à pegada. Numa passagem coberta a faixa fica como `ponte`: o andar de
// cima por cima do vão, que a missão desenha.
const pontes = []
if (MISSAO.RECORTES) {
  const TIPOS = new Set(['pedestrian', 'footway', 'steps', 'living_street', 'residential', 'path', 'service', 'busway'])
  const fechar = (a) => [...a, a[0]]
  const abrir = (a) => (a.length > 1 && a[0][0] === a.at(-1)[0] && a[0][1] === a.at(-1)[1] ? a.slice(0, -1) : a)
  /** Faixa à volta do segmento pq, com meia largura de cada lado e as pontas prolongadas. */
  const faixa = (p, q, w) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1
    const ux = (q[0] - p[0]) / L, uy = (q[1] - p[1]) / L, nx = -uy * (w / 2), ny = ux * (w / 2)
    const a = [p[0] - ux * w / 2, p[1] - uy * w / 2], b = [q[0] + ux * w / 2, q[1] + uy * w / 2]
    return [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]]
  }
  /** O segmento pq passa por dentro da pegada (e não só a roçar a parede)? */
  const atravessa = (p, q, b) => {
    const L = Math.hypot(q[0] - p[0], q[1] - p[1]), n = Math.max(1, Math.ceil(L / 0.4))
    const bordos = [b.anel, ...b.furos].flatMap((a) => a.map((r, i) => [r, a[(i + 1) % a.length]]))
    for (let k = 0; k <= n; k++) {
      const x = p[0] + ((q[0] - p[0]) * k) / n, y = p[1] + ((q[1] - p[1]) * k) / n
      if (!dentroDoPoligono(x, y, b.anel) || b.furos.some((f) => dentroDoPoligono(x, y, f))) continue
      if (Math.min(...bordos.map(([r, s]) => distSeg([x, y], r, s))) > 0.25) return true
    }
    return false
  }
  const caixas = edificios.map((b) => {
    const xs = b.anel.map((p) => p[0]), ys = b.anel.map((p) => p[1])
    return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
  })
  const cortes = new Map() // índice do edifício → [{ faixa, via, passagem }]
  for (const v of vias) {
    if (v.area || !TIPOS.has(v.tipo) || v.acesso === 'private' || v.acesso === 'no') continue
    if (!v.nome && !v.passagem) continue
    const w = v.largura ?? (v.passagem ? 2.4 : MISSAO.RECORTES.largura)
    const estreita = !v.passagem && ['pedestrian', 'footway', 'steps', 'path', 'living_street'].includes(v.tipo) && w <= 3
    for (let i = 1; i < v.g.length; i++) {
      const p = v.g[i - 1], q = v.g[i]
      const x0 = Math.min(p[0], q[0]) - w, x1 = Math.max(p[0], q[0]) + w, y0 = Math.min(p[1], q[1]) - w, y1 = Math.max(p[1], q[1]) + w
      const f = faixa(p, q, w)
      edificios.forEach((b, k) => {
        const c = caixas[k]
        if (MISSAO.RECORTES.excepto?.includes(b.osm)) return
        if (c[2] < x0 || c[0] > x1 || c[3] < y0 || c[1] > y1) return
        // Um beco (estreito) corta onde a pegada entra na faixa; uma rua larga, só onde a atravessa.
        const toca = estreita && (martinez.intersection([[fechar(b.anel)]], [[fechar(f)]]) ?? []).some((pp) => Math.abs(area(abrir(pp[0]))) > 0.05)
        if (!toca && !atravessa(p, q, b)) return
        if (!cortes.has(k)) cortes.set(k, [])
        cortes.get(k).push({ faixa: f, via: v, passagem: v.passagem })
      })
    }
  }
  const novos = []
  const registo = []
  edificios.forEach((b, k) => {
    const cs = cortes.get(k)
    if (!cs) { novos.push(b); return }
    let poli = [[fechar(b.anel), ...b.furos.map(fechar)]]
    for (const c of cs) {
      const f = [fechar(c.faixa)]
      if (c.passagem) {
        for (const pedaco of martinez.intersection(poli, [f]) ?? []) {
          const anel = abrir(pedaco[0])
          if (Math.abs(area(anel)) > 1) pontes.push({ osm: `${b.osm}:ponte:${pontes.length}`, via: c.via.osm, anel: area(anel) < 0 ? anel.reverse() : anel, topo: b.topo })
        }
      }
      poli = martinez.diff(poli, [f]) ?? []
    }
    const vs = [...new Set(cs.map((c) => c.via.nome ?? c.via.osm))]
    registo.push(`${b.osm} × ${vs.join(', ')}${cs.some((c) => c.passagem) ? ' (passagem)' : ''}`)
    poli.forEach((pedaco, i) => {
      const anel = abrir(pedaco[0])
      if (Math.abs(area(anel)) < 4) return
      if (area(anel) < 0) anel.reverse()
      const furos = pedaco.slice(1).map(abrir).map((f) => (area(f) > 0 ? f.reverse() : f))
      const cotas = anel.map(([x, y]) => chao(x, y)).filter((v) => v != null)
      novos.push({ ...b, osm: i ? `${b.osm}:${i + 1}` : b.osm, anel, furos,
        base: +Math.min(...cotas).toFixed(2), chaoMax: +Math.max(...cotas).toFixed(2) })
    })
  })
  edificios.splice(0, edificios.length, ...novos)
  console.log(`recortes: ${registo.length} edifícios, ${pontes.length} pontes\n  ${registo.join('\n  ')}`)
}

// ---- o rio dentro do nível ----
const agua = []
if (MISSAO.AGUA) {
  const caixaLocal = [[-MEIO_X, -MEIO_Y], [MEIO_X, -MEIO_Y], [MEIO_X, MEIO_Y], [-MEIO_X, MEIO_Y], [-MEIO_X, -MEIO_Y]]
  const doOSM = (g) => limpar(g.map(([lon, lat]) => local(paraTM06.forward([lon, lat]))))
  for (const e of j.elements) {
    const t = e.tags ?? {}
    if (!(t.natural === 'water' || t.waterway === 'riverbank')) continue
    const polis = e.type === 'way' && e.geometry ? [[e.geometry.map((p) => [p.lon, p.lat])]]
      : (() => {
        const papel = (r) => aneis((e.members ?? []).filter((q) => q.type === 'way' && q.role === r && q.geometry).map((q) => q.geometry.map((p) => [p.lon, p.lat])))
        const inner = papel('inner')
        return papel('outer').map((o) => [o, ...inner])
      })()
    for (const poli of polis) {
      const aneisL = poli.map(doOSM).filter((a) => a.length >= 3).map((a) => [...a, a[0]])
      for (const pedaco of martinez.intersection([aneisL], [caixaLocal]) ?? []) {
        const anel = pedaco[0].slice(0, -1)
        if (Math.abs(area(anel)) > 200) agua.push(area(anel) < 0 ? anel.reverse() : anel)
      }
    }
  }
  console.log(`rio: ${agua.length} manchas de água`)
}
console.log('nomes:', Object.entries(nomes).map(([k, v]) => `${k} ${v.name} ${JSON.stringify(v.tags).slice(0, 120)}`).join('\n  '))

mkdirSync(dirname(SAIDA), { recursive: true })
writeFileSync(SAIDA, JSON.stringify({
  origem: { ...CENTRO, X: CX, Y: CY, epsg: 3763 },
  meio: [MEIO_X, MEIO_Y],
  dem, edificios, vias, pracas, muros, nos,
  ...(MISSAO.RECORTES ? { pontes } : {}),
  ...(MISSAO.AGUA ? { agua } : {}),
  nomes,
  ...(MISSAO.LONGE ? { longe: await aoLonge() } : {}),
}))
console.log(`→ public/niveis/${ID}.json`)
