/**
 * O que a reconstituição precisa do lado do gerador, partilhado pelos
 * monumentos (`build-monumento.mjs`) e pelas zonas urbanas
 * (`build-urban-model.mjs`): anéis limpos para o esqueleto recto, a
 * fotografia recortada (cor dos telhados e verde do chão) e o chão do OSM
 * que o `scripts/blender/chao.py` pinta.
 *
 * Extraído do gerador dos monumentos quando a Baixa passou a ser vestida da
 * mesma maneira; duas cópias divergiriam.
 *
 * Tudo em ETRS89 / PT-TM06 (EPSG:3763), menos o centro da maqueta.
 */

import { join } from 'node:path'
import proj4 from 'proj4'
import sharp from 'sharp'
import { ortoDGT } from './dgt.mjs'

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
export const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')

export function areaAssinada(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
  }
  return a / 2
}

export function distSegmento(p, a, b) {
  const vx = b[0] - a[0], vy = b[1] - a[1]
  const wx = p[0] - a[0], wy = p[1] - a[1]
  const L = vx * vx + vy * vy
  const t = L ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / L)) : 0
  return Math.hypot(wx - t * vx, wy - t * vy)
}

/**
 * Tira vértices repetidos e quase colineares. O esqueleto recto é exacto:
 * um vértice a 10 cm do seguinte, desenhado à mão no OSM, vira uma água
 * minúscula e torta no telhado.
 */
export function limparAnel(pts) {
  let p = pts.slice()
  if (p.length > 1 && Math.hypot(p[0][0] - p.at(-1)[0], p[0][1] - p.at(-1)[1]) < 0.01) p.pop()
  for (let mudou = true; mudou && p.length > 3; ) {
    mudou = false
    for (let i = 0; i < p.length && p.length > 3; i++) {
      const a = p[(i - 1 + p.length) % p.length], b = p[i], c = p[(i + 1) % p.length]
      const curto = Math.hypot(b[0] - a[0], b[1] - a[1]) < 0.35
      const ab = Math.atan2(b[1] - a[1], b[0] - a[0])
      const bc = Math.atan2(c[1] - b[1], c[0] - b[0])
      let d = Math.abs(ab - bc)
      if (d > Math.PI) d = 2 * Math.PI - d
      if (curto || d < (3 * Math.PI) / 180) {
        p.splice(i, 1)
        mudou = true
        i--
      }
    }
  }
  return p
}

/** Junta os troços de um multipolígono do OSM em anéis fechados. */
export function aneis(membros) {
  const trocos = membros.map((m) => m.slice())
  const fechados = []
  while (trocos.length) {
    let anel = trocos.shift()
    const igual = (a, b) => Math.abs(a[0] - b[0]) < 1e-3 && Math.abs(a[1] - b[1]) < 1e-3
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

export function percentil(v, p) {
  const s = [...v].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))]
}

/**
 * A ORTOFOTO, RECORTADA À CAIXA
 *
 * A imagem cobre a caixa do terreno (PT-TM06, norte em cima). PT-TM06 é o
 * próprio referencial da maqueta (menos o centro), portanto não há
 * reprojecção. `passo` é a resolução, em metros: 25 cm (a da fonte) num
 * monumento; numa zona inteira basta meio metro — a fotografia só decide a
 * cor de cada telhado e onde é verde, e a 25 cm seriam vários megabytes.
 */
export async function fotografia(dir, id, caixa, CX, CY, passo = 0.25) {
  const [x0, y0, x1, y1] = caixa
  const W = Math.round((x1 - x0) / passo)
  const H = Math.round((y1 - y0) / passo)
  const img = Buffer.alloc(W * H * 3)
  // O verde, para o chão da reconstituição: NDVI (−1…1) guardado em 0…255.
  const ndvi = Buffer.alloc(W * H, 0)
  let cobertos = 0
  const { folhas } = await ortoDGT(join(dir, 'dem'), caixa)
  for (const q of folhas) {
    const ix0 = Math.max(x0, q.w), ix1 = Math.min(x1, q.e), iy0 = Math.max(y0, q.s), iy1 = Math.min(y1, q.n)
    if (ix1 <= ix0 || iy1 <= iy0) continue
    const w = Math.round((ix1 - ix0) / passo), h = Math.round((iy1 - iy0) / passo)
    const r = await q.t.readRasters({ bbox: [ix0, iy0, ix1, iy1], width: w, height: h })
    const c0 = Math.round((ix0 - x0) / passo), r0 = Math.round((y1 - iy1) / passo)
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const k = ((r0 + j) * W + c0 + i) * 3, s = j * w + i
        img[k] = r[0][s]
        img[k + 1] = r[1][s]
        img[k + 2] = r[2][s]
        const vi = r[0][s], iv = r[3]?.[s] ?? 0
        ndvi[(r0 + j) * W + c0 + i] = Math.round(128 + 127 * (vi + iv ? (iv - vi) / (iv + vi) : 0))
      }
    }
    cobertos += w * h
  }
  if (cobertos < W * H * 0.999) throw new Error(`a ortofoto cobre só ${((100 * cobertos) / (W * H)).toFixed(1)}% da caixa`)
  const ficheiro = `${id}.chao.jpg`
  // Um toque de contraste: a ortofoto vem com a névoa de 3 km de ar por
  // cima, e sobre a maqueta lia-se lavada. Não mexe em nenhuma cor relativa.
  await sharp(img, { raw: { width: W, height: H, channels: 3 } })
    .linear(1.12, -12)
    .modulate({ saturation: 1.08 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(dir, ficheiro))
  await sharp(ndvi, { raw: { width: W, height: H, channels: 1 } }).png().toFile(join(dir, `${id}.ndvi.png`))
  console.log(`  fotografia: ${W}×${H} a ${passo * 100} cm`)
  return { ficheiro, ndvi: `${id}.ndvi.png`, x0: x0 - CX, y0: y0 - CY, x1: x1 - CX, y1: y1 - CY }
}

/**
 * O CHÃO, PARA A RECONSTITUIÇÃO
 *
 * Em vez da ortofoto (carros, sombras de outra hora, borrões), a
 * reconstituição pinta o chão com texturas desenhadas — mas o que cada sítio
 * é vem daqui: ruas, praças, escadas, passadeiras, jardins, água, lugares de
 * estacionamento e muros do OSM, com o pavimento (`surface`) e a largura
 * quando o OSM os tem. O verde que o OSM não desenha vem do NDVI (acima).
 * Quem pinta é o `scripts/blender/chao.py`.
 *
 * `overpass` é o do gerador que chama (cada um tem os seus espelhos);
 * `local` passa de PT-TM06 às coordenadas da maqueta.
 */
const CHAVES_CHAO = ['highway', 'area:highway', 'area', 'surface', 'width', 'lanes', 'crossing', 'tunnel', 'layer',
  'leisure', 'landuse', 'natural', 'amenity', 'place', 'barrier', 'parking', 'man_made']

export async function chaoOSM(overpass, bb, local) {
  const j = await overpass(`[out:json][timeout:120];
(
  way["highway"](${bb});
  way["area:highway"](${bb});
  nwr["leisure"~"garden|park|playground|pitch"](${bb});
  nwr["landuse"~"grass|flowerbed|greenfield|village_green"](${bb});
  nwr["natural"~"water|heath|scrub|grassland"](${bb});
  nwr["amenity"~"parking|parking_space|fountain"](${bb});
  nwr["place"="square"](${bb});
  node["highway"="crossing"](${bb});
  way["barrier"~"wall|retaining_wall|city_wall|kerb"](${bb});
);
out geom;`)
  const paraLocal = (g) => g.map((p) => local(paraTM06.forward([p.lon, p.lat])))
  const out = []
  for (const e of j.elements) {
    const t = Object.fromEntries(CHAVES_CHAO.filter((k) => e.tags?.[k] != null).map((k) => [k, e.tags[k]]))
    if (e.type === 'node') out.push({ k: 'n', t, g: paraLocal([{ lat: e.lat, lon: e.lon }]) })
    else if (e.type === 'way' && e.geometry) out.push({ k: 'w', t, g: paraLocal(e.geometry) })
    else if (e.type === 'relation') {
      const exteriores = aneis((e.members ?? []).filter((q) => q.type === 'way' && q.role === 'outer' && q.geometry)
        .map((q) => q.geometry.map((p) => [p.lon, p.lat])))
      for (const a of exteriores) out.push({ k: 'w', t: { ...t, area: 'yes' }, g: paraLocal(a.map(([lon, lat]) => ({ lon, lat }))) })
    }
  }
  console.log(`  chão: ${out.length} elementos do OSM`)
  return out
}
