/**
 * Leitura do LiDAR e da ortofoto da DGT, partilhada pelos geradores 3D.
 *
 * Extraído de `build-urban-model.mjs` quando as maquetas de monumentos
 * (`build-monumento.mjs`) passaram a precisar do mesmo: as árvores medem-se
 * pela mesma regra nas zonas e nos monumentos, e duas cópias divergiriam.
 *
 * Tudo aqui trabalha em ETRS89 / PT-TM06 (EPSG:3763), o sistema das folhas.
 */

import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fromFile } from 'geotiff'

/**
 * Folhas de um tipo (`MDT` terreno, `MDS` superfície) que tocam a caixa
 * [x0, y0, x1, y1] em PT-TM06, já lidas para memória.
 */
export async function folhasNaCaixa(dir, tipo, [x0, y0, x1, y1]) {
  const folhas = []
  for (const f of readdirSync(dir).filter((f) => new RegExp(`^${tipo}-.*\\.tiff?$`).test(f))) {
    const im = await (await fromFile(join(dir, f))).getImage()
    const [w, s, e, n] = im.getBoundingBox()
    if (e <= x0 || w >= x1 || n <= y0 || s >= y1) continue
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
export function pixelDGT(folhas, x, y) {
  for (const t of folhas) {
    if (x < t.w || x >= t.e || y <= t.s || y > t.n) continue
    const v = t.r[Math.floor((t.n - y) / t.ry) * t.W + Math.floor((x - t.w) / t.rx)]
    return v === t.nodata || v <= -999 ? null : v
  }
  return null
}

export function dentroDoPoligono(x, y, pol) {
  let dentro = false
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [xi, yi] = pol[i]
    const [xj, yj] = pol[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dentro = !dentro
  }
  return dentro
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
export async function ortoDGT(dir, caixa) {
  const folhas = []
  for (const f of readdirSync(dir).filter((f) => /^ortos.*\.tiff?$/.test(f))) {
    const t = await fromFile(join(dir, f))
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

export async function arvoresDGT({ caixa, mdt, mds, orto, pegadas, paraLocal, naZona }) {
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
