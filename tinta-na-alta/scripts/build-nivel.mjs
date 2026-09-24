/**
 * O nível do jogo: do Arco de Almedina à Sé Velha e ao claustro.
 *
 * Edifícios, ruas e escadas vêm do OSM; o chão e as alturas do LiDAR da DGT
 * (as folhas MDT/MDS de 2 m que o CoimbraLens já tem em scripts/blender/dem).
 * Sai `public/nivel.json`, em metros locais: x para nascente, y para norte,
 * z a cota absoluta.
 *
 *   node scripts/build-nivel.mjs
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LENS = join(ROOT, '..') // o CoimbraLens, onde o jogo vive
const DIR_DEM = join(LENS, 'scripts', 'blender', 'dem')
const require = createRequire(join(LENS, 'package.json'))
const proj4 = require('proj4')
const { folhasNaCaixa, pixelDGT, dentroDoPoligono } = await import(
  'file:///' + join(LENS, 'scripts', 'lib', 'dgt.mjs').replace(/\\/g, '/')
)

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')

// Entre o Arco de Almedina e a cabeceira da Sé, com o claustro a sul.
const CENTRO = { lat: 40.20875, lon: -8.42775 }
const MEIO_X = 150, MEIO_Y = 115
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
  nwr["name"~"Almedina|Sé Velha|Quebra-Costas|Claustro",i](${bb});
  nwr["historic"](${bb});
);
out geom;`)
console.log(`OSM: ${j.elements.length} elementos`)

// ---- vias primeiro: as passagens por baixo de edifícios decidem arcos ----
const vias = []
const nomes = {}
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (t.name && /almedina|sé velha|quebra|claustro/i.test(t.name)) {
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
      g: deLL(e.geometry),
    })
  }
}
const pracas = []
for (const e of j.elements) {
  const t = e.tags ?? {}
  if (e.type === 'way' && e.geometry && (t['area:highway'] || t.place === 'square' || (t.highway && t.area === 'yes'))) {
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
console.log('nomes:', Object.entries(nomes).map(([k, v]) => `${k} ${v.name} ${JSON.stringify(v.tags).slice(0, 120)}`).join('\n  '))

writeFileSync(join(ROOT, 'public', 'nivel.json'), JSON.stringify({
  origem: { ...CENTRO, X: CX, Y: CY, epsg: 3763 },
  meio: [MEIO_X, MEIO_Y],
  dem, edificios, vias, pracas, muros,
  nomes,
}))
console.log('→ public/nivel.json')
