/**
 * O mapa desenhado da página de missões: o Mondego, a cerca da Alta, as ruas
 * principais e a zona de cada missão, tudo do OSM, simplificado e a traço de
 * caneta. Sai `public/mapa.svg`.
 *
 *   node scripts/build-mapa.mjs [--refazer]
 *
 * A resposta do Overpass fica guardada em `scripts/.cache/mapa-osm.json`; só se
 * pede outra vez com `--refazer`. As zonas vêm de `scripts/missoes/*.mjs`.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const LENS = join(ROOT, '..')
const require = createRequire(join(LENS, 'package.json'))
const proj4 = require('proj4')
proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)

// Da margem esquerda do Mondego às Escadas Monumentais, da Portagem à Praça 8 de Maio.
const CAIXA = { sul: 40.2044, oeste: -8.4372, norte: 40.2131, este: -8.4188 }
const R = 6371008.8
const KY = (Math.PI / 180) * R
const KX = KY * Math.cos((((CAIXA.sul + CAIXA.norte) / 2) * Math.PI) / 180)
/** lat/lon → metros no mapa (x para nascente, y para baixo). */
const xy = (lat, lon) => [(lon - CAIXA.oeste) * KX, (CAIXA.norte - lat) * KY]
const W = xy(CAIXA.sul, CAIXA.este)[0], H = xy(CAIXA.sul, CAIXA.este)[1]

const USER_AGENT = 'TintaNaAlta/0.1 (jogo; mapa da página de missões a partir do OSM)'
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

const CACHE = join(ROOT, 'scripts', '.cache', 'mapa-osm.json')
let osm
if (existsSync(CACHE) && !process.argv.includes('--refazer')) osm = JSON.parse(readFileSync(CACHE, 'utf8'))
else {
  const bb = `${CAIXA.sul},${CAIXA.oeste},${CAIXA.norte},${CAIXA.este}`
  osm = await overpass(`[out:json][timeout:120];
(
  nwr["natural"="water"](${bb});
  nwr["waterway"="riverbank"](${bb});
  way["barrier"="city_wall"](${bb});
  way["historic"="citywalls"](${bb});
  way["highway"~"^(primary|secondary|tertiary|unclassified|residential|living_street|pedestrian|steps)$"](${bb});
);
out geom;`)
  mkdirSync(dirname(CACHE), { recursive: true })
  writeFileSync(CACHE, JSON.stringify(osm))
}
console.log(`OSM: ${osm.elements.length} elementos`)

// ------------------------------------------------------------------ geometria --

/** Douglas-Peucker: tira os vértices que não mudam o desenho a esta escala. */
function simplificar(pts, tol) {
  if (pts.length < 3) return pts
  const [a, b] = [pts[0], pts.at(-1)]
  let iMax = 0, dMax = 0
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i], vx = b[0] - a[0], vy = b[1] - a[1], L = Math.hypot(vx, vy) || 1
    const d = Math.abs((p[0] - a[0]) * vy - (p[1] - a[1]) * vx) / L
    if (d > dMax) { dMax = d; iMax = i }
  }
  if (dMax <= tol) return [a, b]
  return [...simplificar(pts.slice(0, iMax + 1), tol).slice(0, -1), ...simplificar(pts.slice(iMax), tol)]
}

/** Num anel fechado o primeiro ponto é o último: parte-se no ponto mais longe dele e simplifica-se cada metade. */
function simplificarAnel(pts, tol) {
  let k = 0, dk = -1
  pts.forEach((p, i) => { const d = Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1]); if (d > dk) { dk = d; k = i } })
  return [...simplificar(pts.slice(0, k + 1), tol).slice(0, -1), ...simplificar(pts.slice(k), tol)]
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

/** Pseudo-aleatório com semente, para o traço tremer sempre da mesma maneira. */
function aleatorio(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let v = Math.imul(s ^ (s >>> 15), 1 | s)
    v ^= v + Math.imul(v ^ (v >>> 7), 61 | v)
    return ((v ^ (v >>> 14)) >>> 0) / 4294967296
  }
}
const r = aleatorio(1964)

/** Traço de caneta: pontos a cada ~8 m, com um tremor pequeno e suave. */
function tremer(pts, amp = 0.9) {
  const out = []
  let fase = r() * 10
  for (let i = 0; i < pts.length; i++) {
    const [x, y] = pts[i]
    out.push([x + Math.sin(fase) * amp, y + Math.cos(fase * 1.3) * amp])
    if (i === pts.length - 1) break
    const [x2, y2] = pts[i + 1], L = Math.hypot(x2 - x, y2 - y), n = Math.floor(L / 8)
    for (let k = 1; k < n; k++) {
      fase += 0.7 + r() * 0.6
      out.push([x + ((x2 - x) * k) / n + Math.sin(fase) * amp, y + ((y2 - y) * k) / n + Math.cos(fase * 1.3) * amp])
    }
  }
  return out
}

const f1 = (v) => +v.toFixed(1)
const caminho = (pts, fechar = false) => 'M' + pts.map(([x, y]) => `${f1(x)} ${f1(y)}`).join('L') + (fechar ? 'Z' : '')
const geo = (g) => g.map((p) => xy(p.lat, p.lon))
const dentroCaixa = ([x, y], m = 0) => x >= -m && x <= W + m && y >= -m && y <= H + m

// ------------------------------------------------------------------ o rio --
const areaDe = (a) => Math.abs(a.reduce((s, p, i) => s + p[0] * a[(i + 1) % a.length][1] - a[(i + 1) % a.length][0] * p[1], 0) / 2)
const agua = []
for (const e of osm.elements) {
  const t = e.tags ?? {}
  if (!(t.natural === 'water' || t.waterway === 'riverbank')) continue
  // Só o Mondego (em Coimbra é a albufeira do açude-ponte); lagos e tanques de jardim ficam de fora.
  if (!(/river|reservoir/.test(t.water ?? '') || t.waterway === 'riverbank' || /mondego/i.test(t.name ?? ''))) continue
  let partes = []
  if (e.type === 'way' && e.geometry) partes = [geo(e.geometry)]
  if (e.type === 'relation') {
    const papel = (q) => aneis((e.members ?? []).filter((m) => m.type === 'way' && m.role === q && m.geometry).map((m) => m.geometry.map((p) => [p.lat, p.lon])))
      .map((a) => a.map(([lat, lon]) => xy(lat, lon)))
    partes = [...papel('outer'), ...papel('inner')]
  }
  if (partes.length && areaDe(partes[0]) > 20000) agua.push(partes)
}
const aguaD = agua.map((aneis) => aneis.map((a) => caminho(simplificarAnel(a, 1.5), true)).join('')).join('')

// Onde pôr o nome do rio: a meio do canal, deitado ao longo dele. Em cada horizontal
// fica o troço de água mais largo; o nome vai no do meio, com o ângulo do primeiro ao último.
function nomeDoRio() {
  const todos = agua.flat()
  const meios = []
  for (let y = H * 0.1; y <= H * 0.9; y += H * 0.05) {
    const xs = []
    for (const a of todos)
      for (let i = 0; i < a.length; i++) {
        const [x1, y1] = a[i], [x2, y2] = a[(i + 1) % a.length]
        if ((y1 > y) !== (y2 > y)) xs.push(x1 + ((y - y1) * (x2 - x1)) / (y2 - y1))
      }
    xs.sort((p, q) => p - q)
    let melhor = null
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const a = Math.max(0, xs[i]), b = Math.min(W, xs[i + 1])
      if (b - a > 20 && b - a > (melhor?.w ?? 0)) melhor = { x: (a + b) / 2, y, w: b - a }
    }
    if (melhor) meios.push(melhor)
  }
  if (meios.length < 2) return null
  const m = meios[meios.length >> 1], a = meios[0], b = meios.at(-1)
  let ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
  if (ang > 90) ang -= 180
  if (ang < -90) ang += 180
  const largura = Math.min(...meios.map((q) => q.w)) * Math.abs(Math.sin((ang * Math.PI) / 180))
  return { x: m.x, y: m.y, ang, tamanho: Math.max(18, Math.min(40, largura * 0.45)) }
}
const rio = nomeDoRio()

// ------------------------------------------------------------ ruas e cerca --
const PRINCIPAIS = /^(primary|secondary|tertiary)$/
const ruas = [], ruelas = [], cerca = []
for (const e of osm.elements) {
  const t = e.tags ?? {}
  if (e.type !== 'way' || !e.geometry) continue
  const pts = geo(e.geometry)
  if (!pts.some((p) => dentroCaixa(p, 50))) continue
  if (t.barrier === 'city_wall' || t.historic === 'citywalls') cerca.push(simplificar(pts, 1))
  else if (t.highway && t.area !== 'yes') {
    // As ruas pedonais com nome da Baixa e da Alta contam como principais.
    const principal = PRINCIPAIS.test(t.highway) || (t.highway === 'pedestrian' && t.name)
    ;(principal ? ruas : ruelas).push(simplificar(pts, 1.5))
  }
}

// ------------------------------------------------------------------ zonas --
const zonas = []
for (const f of readdirSync(join(ROOT, 'scripts', 'missoes')).filter((f) => f.endsWith('.mjs'))) {
  const m = await import(pathToFileURL(join(ROOT, 'scripts', 'missoes', f)).href)
  const [cx, cy] = proj4('EPSG:4326', 'EPSG:3763', [m.CENTRO.lon, m.CENTRO.lat]).map(Math.round)
  const [mx, my] = m.MEIO
  const cantos = [[-mx, my], [mx, my], [mx, -my], [-mx, -my]].map(([dx, dy]) => {
    const [lon, lat] = proj4('EPSG:3763', 'EPSG:4326', [cx + dx, cy + dy])
    return xy(lat, lon)
  })
  zonas.push({ id: f.replace(/\.mjs$/, ''), cantos })
}

// ------------------------------------------------------------------- SVG --
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f1(W)} ${f1(H)}" class="mapa-desenho"
  data-oeste="${CAIXA.oeste}" data-norte="${CAIXA.norte}" data-kx="${KX.toFixed(3)}" data-ky="${KY.toFixed(3)}">
<style>
  path { fill: none; stroke: #111; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
  .agua path { fill: url(#riscas); stroke-width: 1.6; }
  .ruelas path { stroke-width: 0.6; opacity: 0.35; }
  .ruas path { stroke-width: 1.3; }
  .cerca path { stroke-width: 3; stroke-dasharray: 1 5; }
  .zona path { stroke-width: 1.4; stroke-dasharray: 7 5; fill: rgba(17, 17, 17, 0.04); }
  text { font-family: Caveat, 'Segoe Print', cursive; fill: #111; }
</style>
<defs>
  <pattern id="riscas" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
    <path d="M0 3 L9 3" style="stroke-width:0.7; opacity:0.5"/>
    <path d="M5 10 L14 10" style="stroke-width:0.7; opacity:0.5"/>
  </pattern>
  <clipPath id="folha"><rect width="${f1(W)}" height="${f1(H)}"/></clipPath>
</defs>
<g clip-path="url(#folha)">
  <g class="agua"><path d="${aguaD}" fill-rule="evenodd"/></g>
  <g class="ruelas">${ruelas.map((p) => `<path d="${caminho(p)}"/>`).join('')}</g>
  <g class="ruas">${ruas.map((p) => `<path d="${caminho(tremer(p))}"/>`).join('')}</g>
  <g class="cerca">${cerca.map((p) => `<path d="${caminho(p)}"/>`).join('')}</g>
  <g class="zonas">${zonas.map((z) => `<g class="zona" data-missao="${z.id}"><path d="${caminho(tremer([...z.cantos, z.cantos[0]], 1.5))}"/></g>`).join('')}</g>
  ${rio ? `<text x="${f1(rio.x)}" y="${f1(rio.y)}" font-size="${f1(rio.tamanho)}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${f1(rio.ang)} ${f1(rio.x)} ${f1(rio.y)})">Mondego</text>` : ''}
</g>
</svg>
`
writeFileSync(join(ROOT, 'public', 'mapa.svg'), svg)
console.log(`→ public/mapa.svg (${(svg.length / 1024).toFixed(0)} kB; água ${agua.length}, ruas ${ruas.length}, ruelas ${ruelas.length}, cerca ${cerca.length}, zonas ${zonas.length})`)
