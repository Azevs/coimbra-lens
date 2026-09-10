#!/usr/bin/env node
/**
 * Ortofoto recortada à placa de uma maqueta — `node scripts/build-orto.mjs baixa`
 *
 * ENSAIO. Escreve `scripts/blender/<zona>.orto.jpg`, que o `maqueta.py --orto`
 * assenta sobre o terreno para uma estampa de comparação. Não entra no site.
 *
 * A imagem cobre a placa exactamente, no referencial local da maqueta (x
 * para nascente, y para norte, a partir do centro da zona), com o norte em
 * cima. Não basta recortar a ortofoto: ela está em PT-TM06, cuja grelha
 * está rodada ~0,2° em relação ao norte geográfico — em mil metros de placa
 * são 4 m de desvio nos cantos. Cada píxel de saída é reprojectado.
 *
 * Fonte: ortofotomapas DGT 2025, 25 cm, RGBI. Os ficheiros originais (~450
 * MB cada) ficam em `scripts/blender/dem/` e não vão para o repositório.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { fromFile } from 'geotiff'
import proj4 from 'proj4'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(ROOT, 'scripts', 'blender')
const ZONA = process.argv[2] ?? 'baixa'
/** Metros por píxel da imagem de saída. */
const PASSO = +(process.argv[3] ?? 0.5)

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')

const cena = JSON.parse(readFileSync(join(DIR, `${ZONA}.scene.json`), 'utf8'))
const zonas = JSON.parse(readFileSync(join(ROOT, 'lib', 'urban-zones.ts'), 'utf8').match(/URBAN_ZONES: UrbanZone\[\] = (\[[\s\S]*?\n\])/)[1])
const [lat0, lon0] = zonas.find((z) => z.id === ZONA).centro
const r = (lat0 * Math.PI) / 180
const mLat = 111132.92 - 559.82 * Math.cos(2 * r)
const mLon = 111412.84 * Math.cos(r) - 93.5 * Math.cos(3 * r)
const { x0, x1, y0, y1 } = cena.placa
const local = (x, y) => paraTM06.forward([lon0 + x / mLon, lat0 + y / mLat])

// Janela em PT-TM06 que contém a placa, com 2 m de folga.
const cantos = [local(x0, y0), local(x1, y0), local(x0, y1), local(x1, y1)]
const cx0 = Math.min(...cantos.map((c) => c[0])) - 2, cx1 = Math.max(...cantos.map((c) => c[0])) + 2
const cy0 = Math.min(...cantos.map((c) => c[1])) - 2, cy1 = Math.max(...cantos.map((c) => c[1])) + 2
const JW = Math.round((cx1 - cx0) / PASSO), JH = Math.round((cy1 - cy0) / PASSO)
const janela = [0, 1, 2].map(() => new Uint8Array(JW * JH))

for (const f of readdirSync(join(DIR, 'dem')).filter((f) => /^ortos.*\.tiff?$/.test(f))) {
  const t = await fromFile(join(DIR, 'dem', f))
  const [w, s, e, n] = (await t.getImage(0)).getBoundingBox()
  const ix0 = Math.max(cx0, w), ix1 = Math.min(cx1, e), iy0 = Math.max(cy0, s), iy1 = Math.min(cy1, n)
  if (ix1 <= ix0 || iy1 <= iy0) continue
  const w2 = Math.round((ix1 - ix0) / PASSO), h2 = Math.round((iy1 - iy0) / PASSO)
  const rr = await t.readRasters({ bbox: [ix0, iy0, ix1, iy1], width: w2, height: h2 })
  const c0 = Math.round((ix0 - cx0) / PASSO), r0 = Math.round((cy1 - iy1) / PASSO)
  for (let j = 0; j < h2; j++) for (let i = 0; i < w2; i++) {
    const k = (r0 + j) * JW + (c0 + i), s2 = j * w2 + i
    for (let b = 0; b < 3; b++) janela[b][k] = rr[b][s2]
  }
  console.log(`  ${f}: ${w2}×${h2} píxeis`)
}

/**
 * A FOTOGRAFIA SÓ DENTRO DA ZONA
 *
 * Fora da zona, a ortofoto mostrava os telhados dos prédios que a maqueta
 * não modela, espalmados no chão — uma cidade fantasma à volta da maqueta.
 * A fotografia fica só onde a zona é: a menos de `raio` metros do eixo, e
 * fora do contorno de qualquer prédio omitido que atravesse a borda (senão
 * a borda cortava-lhe o telhado a meio e ficava meio telhado no chão).
 * Fora disso, o chão é o cartão liso do terreno, e uma linha fina marca o
 * recorte — que é uma escolha, e deve ler-se como tal.
 *
 * Dentro da zona os telhados da fotografia ficam debaixo dos blocos, que
 * assentam exactamente sobre os contornos.
 */
const CARTAO = [0xd6, 0xcf, 0xbe] // o `terreno` do maqueta.py
const LINHA = [0x8c, 0x82, 0x72]
const LINHA_M = 0.6

const W = Math.round((x1 - x0) / PASSO), H = Math.round((y1 - y0) / PASSO)
const px = (i) => x0 + (i + 0.5) * ((x1 - x0) / W)
const py = (j) => y1 - (j + 0.5) * ((y1 - y0) / H)

const segs = cena.eixo.flatMap((w) => w.pts.slice(1).map((b, k) => [w.pts[k], b]))
function aoEixo(x, y) {
  let m = Infinity
  for (const [a, b] of segs) {
    const vx = b[0] - a[0], vy = b[1] - a[1], wx = x - a[0], wy = y - a[1]
    const L = vx * vx + vy * vy
    const t = L ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0
    m = Math.min(m, Math.hypot(wx - t * vx, wy - t * vy))
  }
  return m
}
function dentro(x, y, pol) {
  let d = false
  for (let a = 0, b = pol.length - 1; a < pol.length; b = a++) {
    const [xi, yi] = pol[a], [xj, yj] = pol[b]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d
  }
  return d
}
// Máscara dos prédios omitidos, rasterizada pela caixa de cada um.
const omitido = new Uint8Array(W * H)
for (const pol of cena.cortados ?? []) {
  const xs = pol.map((p) => p[0]), ys = pol.map((p) => p[1])
  const i0 = Math.max(0, Math.floor(((Math.min(...xs) - x0) / (x1 - x0)) * W))
  const i1 = Math.min(W - 1, Math.ceil(((Math.max(...xs) - x0) / (x1 - x0)) * W))
  const j0 = Math.max(0, Math.floor(((y1 - Math.max(...ys)) / (y1 - y0)) * H))
  const j1 = Math.min(H - 1, Math.ceil(((y1 - Math.min(...ys)) / (y1 - y0)) * H))
  for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (dentro(px(i), py(j), pol)) omitido[j * W + i] = 1
}
// Distância à borda da zona, com sinal: positiva dentro. A borda de um
// prédio omitido conta como borda da zona.
const raio = cena.raio
const naZona = new Float32Array(W * H)
for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) naZona[j * W + i] = omitido[j * W + i] ? -1 : raio - aoEixo(px(i), py(j))
const eBorda = (i, j) => {
  const k = j * W + i
  if (naZona[k] <= 0) return false
  if (naZona[k] < LINHA_M) return true
  // vizinho fora (borda com um prédio omitido)
  for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const a = i + di, b = j + dj
    if (a >= 0 && a < W && b >= 0 && b < H && naZona[b * W + a] <= 0) return true
  }
  return false
}

// Reprojecção: cada píxel de saída (referencial local) vai buscar o seu
// valor à janela em PT-TM06, com interpolação bilinear.
const out = Buffer.alloc(W * H * 3)
let fotografia = 0
for (let j = 0; j < H; j++) {
  for (let i = 0; i < W; i++) {
    const k = j * W + i
    if (naZona[k] <= 0 || eBorda(i, j)) {
      const cor = naZona[k] <= 0 ? CARTAO : LINHA
      for (let b = 0; b < 3; b++) out[k * 3 + b] = cor[b]
      continue
    }
    fotografia++
    const [X, Y] = local(px(i), py(j))
    const fc = (X - cx0) / PASSO - 0.5, fr = (cy1 - Y) / PASSO - 0.5
    const c = Math.max(0, Math.min(JW - 2, Math.floor(fc))), rw = Math.max(0, Math.min(JH - 2, Math.floor(fr)))
    const tc = Math.min(1, Math.max(0, fc - c)), tr = Math.min(1, Math.max(0, fr - rw))
    for (let b = 0; b < 3; b++) {
      const g = janela[b]
      out[(j * W + i) * 3 + b] =
        g[rw * JW + c] * (1 - tc) * (1 - tr) + g[rw * JW + c + 1] * tc * (1 - tr) +
        g[(rw + 1) * JW + c] * (1 - tc) * tr + g[(rw + 1) * JW + c + 1] * tc * tr
    }
  }
}
const destino = join(DIR, `${ZONA}.orto.jpg`)
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 85 }).toFile(destino)
console.log(`escrito ${destino} — ${W}×${H} a ${PASSO} m; fotografia em ${((fotografia / (W * H)) * 100).toFixed(0)}% da placa, ${(cena.cortados ?? []).length} prédios omitidos na borda`)
