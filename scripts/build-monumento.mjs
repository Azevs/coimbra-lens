#!/usr/bin/env node
/**
 * Gerador das maquetas de monumentos — `node scripts/build-monumento.mjs`
 *
 * Irmão do `build-urban-model.mjs`, com outro recorte e outro grau de
 * pormenor. Uma zona urbana é um corredor de centenas de prédios, e um
 * prisma por prédio chega. Um monumento vê-se de perto, e de perto o que o
 * torna reconhecível é o perfil: a torre acima dos telhados, as alas em
 * volta do pátio, as coberturas de quatro águas.
 *
 * Escreve `scripts/blender/<id>.scene.json`, que o `monumento.py` lê, e
 * `lib/monumentos.ts`, que a página lê. Os dois entram no repositório.
 *
 * O RECORTE É UM DISCO
 *
 * Um monumento não tem eixo, tem centro. O recorte é o círculo de `raio`
 * metros em torno dele, e o Blender corta tudo por esse cilindro — terreno e
 * edifícios —, como uma maqueta de museu serrada à volta do assunto. Ao
 * contrário do rectângulo, o disco roda sem cantos a aparecer e a
 * desaparecer.
 *
 * AS COBERTURAS, QUE SÃO A PARTE NOVA
 *
 * Com o LiDAR sabe-se, dentro de cada contorno, a cota do beirado e a da
 * cumeeira: são o fundo e o topo da distribuição do MDS. A forma entre as
 * duas não se mede a 2 m — desenha-se: é o telhado de águas que o esqueleto
 * recto do contorno dá (a construção clássica de "todas as águas com a mesma
 * inclinação"), escalado para ir do beirado à cumeeira medidos. Numa ala
 * comprida sai uma cumeeira ao longo da ala; num corpo quadrado, uma
 * pirâmide. Onde o laser não vê desnível, a cobertura é plana.
 *
 * O que continua igual às zonas: um edifício sem altura medida nem
 * publicada não ganha volume — fica a implantação no chão.
 *
 * FONTES
 *
 *   Edifícios e pontos com nome — OpenStreetMap via Overpass, ODbL.
 *   Terreno, alturas e coberturas — LiDAR 2 m da DGT (MDT e MDS, 2024).
 *   Árvores — ortofoto DGT 2025 (NDVI) + LiDAR; ver `scripts/lib/dgt.mjs`.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import proj4 from 'proj4'
import sharp from 'sharp'
import { folhasNaCaixa, pixelDGT, dentroDoPoligono, ortoDGT, arvoresDGT } from './lib/dgt.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_TS = join(ROOT, 'lib', 'monumentos.ts')
const OUT_DIR = join(ROOT, 'scripts', 'blender')
const DIR_DEM = join(OUT_DIR, 'dem')

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')
// O esqueleto recto vem do CGAL compilado para WebAssembly, e o pacote só foi
// compilado para o browser: recusa arrancar sem `window` nem `self`. O módulo
// não toca em mais nada do DOM, e o WebAssembly vem embutido no ficheiro.
globalThis.self ??= globalThis
globalThis.window ??= globalThis
const { SkeletonBuilder } = (await import('straight-skeleton')).default

/**
 * Os monumentos a gerar.
 *
 * `conjunto` são os edifícios que SÃO o monumento — a maqueta pinta-os de
 * outra cor e o resto é contexto. `pontos` são os lugares que a visita
 * aponta; cada um vem de um elemento do OSM, nunca de uma coordenada à mão.
 * `alvo: 'topo'` pousa o ponto no alto do que o laser mediu ali (a torre);
 * `'chao'`, no terreno.
 */
const MONUMENTOS = [
  {
    id: 'paco-das-escolas',
    nome: 'Paço das Escolas',
    // Centro do Pátio das Escolas, um pouco a norte para apanhar a ala da
    // Via Latina inteira e deixar a varanda sobre o rio a sul.
    centro: { lat: 40.20752, lon: -8.42608 },
    raio: 150,
    conjunto: [
      'relation/2708767', // Faculdade de Direito — a ala norte, o antigo Paço Real
      'way/201989127', // Reitoria (Colégio de São Pedro) — a ala nascente
      'way/1315902875', // Capela de São Miguel
      'way/51293313', // Biblioteca Joanina
      'way/115574903', // Torre da Universidade
    ],
    pontos: [
      { id: 'porta-ferrea', osm: 'node/3496226629', alvo: 'chao' },
      { id: 'd-joao-iii', osm: 'node/1306837151', alvo: 'chao' },
      { id: 'via-latina', osm: 'way/115744958', alvo: 'chao' },
      { id: 'sala-dos-capelos', osm: 'node/4838813723', alvo: 'topo' },
      { id: 'torre', osm: 'way/115574903', alvo: 'topo' },
      { id: 'capela', osm: 'way/1315902875', alvo: 'topo' },
      { id: 'joanina', osm: 'way/51293313', alvo: 'topo' },
    ],
  },
]

// --- limiares, os mesmos das zonas urbanas onde fazem o mesmo papel ---
const RECUO_M = 1.0 // afastamento das paredes ao amostrar o telhado
const PIXEIS_MIN = 3
const ALTURA_MIN_LIDAR = 2.0
const AREA_MIN_M2 = 12
const PE_DIREITO = 3.0
const REMATE = 0.8
/**
 * Percentis do MDS que fazem de beirado e cumeeira. Não o mínimo e o
 * máximo: o mínimo apanha o píxel que ainda cai no pátio, o máximo uma
 * chaminé, uma cruz ou uma copa por cima do telhado.
 */
const P_BEIRADO = 0.2
const P_CUMEEIRA = 0.92
/** Abaixo deste desnível entre beirado e cumeeira, a cobertura é plana. */
const DESNIVEL_MIN = 1.0
/** Inclinação máxima das águas (tan ≈ 52°); acima disto é uma torre, não um telhado. */
const INCLINACAO_MAX = 1.3

const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador de maquetas de monumentos)'
const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function overpass(query) {
  let ultimo
  for (const url of OVERPASS) {
    for (let tentativa = 0; tentativa < 2; tentativa++) {
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
          ultimo = j.remark ?? 'resposta sem elementos'
        } else {
          ultimo = `HTTP ${r.status}`
        }
      } catch (e) {
        ultimo = e.message
      }
      await sleep(5000)
    }
    console.warn(`  ${url}: ${ultimo} — a passar ao espelho seguinte`)
  }
  throw new Error('Overpass indisponível: ' + ultimo)
}

// ------------------------------------------------------------ geometria ----

function areaAssinada(pts) {
  let a = 0
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length
    a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
  }
  return a / 2
}

function distSegmento(p, a, b) {
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
function limparAnel(pts) {
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
function aneis(membros) {
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

function percentil(v, p) {
  const s = [...v].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))]
}

/**
 * A ORTOFOTO, RECORTADA AO DISCO
 *
 * Nas zonas urbanas a ortofoto ficou fora dos telhados, porque a imagem não
 * é verdadeira: um prédio alto aparece inclinado e o telhado sai do
 * contorno. No Paço isso mediu-se antes de decidir — com os contornos do
 * OSM por cima da fotografia, os telhados batem certo com as paredes a
 * menos de um metro (a Alta está perto do nadir da passagem do avião).
 * Por isso aqui a mesma imagem veste o chão e os telhados: o pátio com a
 * calçada em diagonal, a telha onde há telha e o zinco onde há zinco.
 *
 * Um novo monumento tem de passar pela mesma verificação: onde o
 * deslocamento se vir, a fotografia fica só no chão.
 *
 * A imagem cobre a caixa do terreno (PT-TM06, norte em cima) à resolução da
 * fonte, 25 cm. PT-TM06 é o próprio referencial da maqueta (menos o centro),
 * portanto não há reprojecção.
 */
const FOTO_M = 0.25

async function fotografia(id, caixa, CX, CY) {
  const [x0, y0, x1, y1] = caixa
  const W = Math.round((x1 - x0) / FOTO_M)
  const H = Math.round((y1 - y0) / FOTO_M)
  const img = Buffer.alloc(W * H * 3)
  let cobertos = 0
  const { folhas } = await ortoDGT(DIR_DEM, caixa)
  for (const q of folhas) {
    const ix0 = Math.max(x0, q.w), ix1 = Math.min(x1, q.e), iy0 = Math.max(y0, q.s), iy1 = Math.min(y1, q.n)
    if (ix1 <= ix0 || iy1 <= iy0) continue
    const w = Math.round((ix1 - ix0) / FOTO_M), h = Math.round((iy1 - iy0) / FOTO_M)
    const r = await q.t.readRasters({ bbox: [ix0, iy0, ix1, iy1], width: w, height: h })
    const c0 = Math.round((ix0 - x0) / FOTO_M), r0 = Math.round((y1 - iy1) / FOTO_M)
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < w; i++) {
        const k = ((r0 + j) * W + c0 + i) * 3, s = j * w + i
        img[k] = r[0][s]
        img[k + 1] = r[1][s]
        img[k + 2] = r[2][s]
      }
    }
    cobertos += w * h
  }
  if (cobertos < W * H * 0.999) throw new Error(`a ortofoto cobre só ${((100 * cobertos) / (W * H)).toFixed(1)}% do disco`)
  const ficheiro = `${id}.chao.jpg`
  // Um toque de contraste: a ortofoto vem com a névoa de 3 km de ar por
  // cima, e sobre a maqueta lia-se lavada. Não mexe em nenhuma cor relativa.
  await sharp(img, { raw: { width: W, height: H, channels: 3 } })
    .linear(1.12, -12)
    .modulate({ saturation: 1.08 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT_DIR, ficheiro))
  console.log(`  fotografia: ${W}×${H} a ${FOTO_M * 100} cm`)
  return { ficheiro, x0: x0 - CX, y0: y0 - CY, x1: x1 - CX, y1: y1 - CY }
}

// --------------------------------------------------------------- monumento --

async function gerar(m) {
  console.log(`\n${m.nome}`)
  const [CXf, CYf] = paraTM06.forward([m.centro.lon, m.centro.lat])
  const CX = Math.round(CXf), CY = Math.round(CYf)
  const R = m.raio
  const caixa = [CX - R - 8, CY - R - 8, CX + R + 8, CY + R + 8]
  const local = ([X, Y]) => [+(X - CX).toFixed(2), +(Y - CY).toFixed(2)]

  const mdt = await folhasNaCaixa(DIR_DEM, 'MDT', caixa)
  const mds = await folhasNaCaixa(DIR_DEM, 'MDS', caixa)
  if (!mdt.length || !mds.length) throw new Error(`faltam folhas MDT/MDS em ${DIR_DEM} para ${m.nome}`)
  console.log(`  LiDAR: ${mdt.length} folhas MDT, ${mds.length} MDS`)

  // --- terreno: os nós são os centros dos píxeis de 2 m, sem reamostrar ---
  // (reamostrar a outro passo desenha moiré na encosta — ver as zonas).
  const gx0 = Math.floor((caixa[0] - 1) / 2) * 2 + 1
  const gy0 = Math.floor((caixa[1] - 1) / 2) * 2 + 1
  const nCol = Math.floor((caixa[2] - gx0) / 2) + 1
  const nRow = Math.floor((caixa[3] - gy0) / 2) + 1
  const elev = []
  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      const v = pixelDGT(mdt, gx0 + c * 2, gy0 + r * 2)
      if (v == null) throw new Error('LiDAR sem valor no disco — falta uma folha MDT?')
      elev.push(+v.toFixed(2))
    }
  }
  const dem = { x0: gx0 - CX, y0: gy0 - CY, passo: 2, nCol, nRow, elev }
  console.log(`  terreno: ${nCol}×${nRow} nós a 2 m`)
  const chao = (X, Y) => pixelDGT(mdt, X, Y)

  // --- OSM ---
  const sw = proj4('EPSG:3763', 'EPSG:4326', [caixa[0], caixa[1]])
  const ne = proj4('EPSG:3763', 'EPSG:4326', [caixa[2], caixa[3]])
  const bb = `${sw[1]},${sw[0]},${ne[1]},${ne[0]}`
  const porTipo = (t) => m.pontos.filter((p) => p.osm.startsWith(t + '/')).map((p) => p.osm.split('/')[1])
  const j = await overpass(`[out:json][timeout:120];
(
  way["building"](${bb});
  relation["building"](${bb});
  ${porTipo('node').length ? `node(id:${porTipo('node').join(',')});` : ''}
  ${porTipo('way').length ? `way(id:${porTipo('way').join(',')});` : ''}
);
out geom;`) // "body": os membros das relações vêm com geometria

  const noConjunto = new Set(m.conjunto)
  const edificios = []
  const pegadas = []
  const conta = { conjunto: 0, contexto: 0, semAltura: 0, esqueletoFalhou: 0 }

  for (const e of j.elements) {
    const t = e.tags ?? {}
    if (!t.building) continue
    if (e.type === 'relation' && t.type !== 'multipolygon') continue
    let rs
    if (e.type === 'way') {
      rs = [{ papel: 'outer', g: e.geometry }]
    } else {
      const porPapel = (papel) =>
        aneis((e.members ?? []).filter((q) => q.type === 'way' && q.role === papel && q.geometry)
          .map((q) => q.geometry.map((p) => [p.lon, p.lat])))
          .map((a) => ({ papel, g: a.map(([lon, lat]) => ({ lon, lat })) }))
      rs = [...porPapel('outer'), ...porPapel('inner')]
    }
    const exteriores = rs.filter((r) => r.papel === 'outer')
    const interiores = rs.filter((r) => r.papel === 'inner')
    // Um multipolígono com vários exteriores sai como vários edifícios, cada
    // um com os interiores que lhe caem dentro.
    for (const exterior of exteriores) {
      const X = exterior.g.map((p) => paraTM06.forward([p.lon, p.lat]))
      pegadas.push(X)
      const extL = limparAnel(X.map(local))
      if (extL.length < 3) continue
      // Dentro do disco: basta um vértice. O Blender corta o resto.
      if (!extL.some(([x, y]) => Math.hypot(x, y) <= R)) continue
      const area = Math.abs(areaAssinada(extL))
      if (area < AREA_MIN_M2) continue
      const furos = interiores
        .map((i) => limparAnel(i.g.map((p) => local(paraTM06.forward([p.lon, p.lat])))))
        .filter((f) => f.length >= 3 && dentroDoPoligono(f[0][0], f[0][1], extL))
      const ext = areaAssinada(extL) < 0 ? extL.reverse() : extL // exterior anti-horário
      const buracos = furos.map((f) => (areaAssinada(f) > 0 ? f.reverse() : f)) // interiores horários
      const osm = `${e.type}/${e.id}`

      // --- amostras do LiDAR dentro do contorno ---
      const todos = [ext, ...buracos]
      const bordos = todos.flatMap((a) => a.map((p, i) => [p, a[(i + 1) % a.length]]))
      const xs = ext.map((p) => p[0]), ys = ext.map((p) => p[1])
      const amostrar = (recuo) => {
        const out = []
        for (let x = Math.floor((Math.min(...xs) + CX - 1) / 2) * 2 + 1 - CX; x <= Math.max(...xs); x += 2) {
          for (let y = Math.floor((Math.min(...ys) + CY - 1) / 2) * 2 + 1 - CY; y <= Math.max(...ys); y += 2) {
            if (!dentroDoPoligono(x, y, ext) || buracos.some((b) => dentroDoPoligono(x, y, b))) continue
            if (recuo && Math.min(...bordos.map(([a, b]) => distSegmento([x, y], a, b))) < recuo) continue
            const s = pixelDGT(mds, x + CX, y + CY), g = chao(x + CX, y + CY)
            if (s != null && g != null) out.push({ s, g })
          }
        }
        return out
      }
      let am = amostrar(RECUO_M)
      if (am.length < PIXEIS_MIN) am = amostrar(0)

      const cotasChao = ext.map(([x, y]) => chao(x + CX, y + CY)).filter((v) => v != null)
        .concat(am.map((a) => a.g))
      if (!cotasChao.length) continue
      const base = Math.min(...cotasChao)
      const dentro = noConjunto.has(osm)

      const hMediana = am.length >= PIXEIS_MIN ? percentil(am.map((a) => a.s - a.g), 0.5) : null
      let beirado, cumeeira
      if (hMediana != null && hMediana >= ALTURA_MIN_LIDAR) {
        const topo = am.map((a) => a.s)
        beirado = percentil(topo, P_BEIRADO)
        cumeeira = percentil(topo, P_CUMEEIRA)
      } else {
        // O laser não viu volume: fica o que o OSM publicar, e se não
        // publicar nada, só a implantação.
        const h = parseFloat(t.height)
        const pisos = parseFloat(t['building:levels'])
        const hOSM = Number.isFinite(h) && h > 1 ? h : Number.isFinite(pisos) && pisos >= 1 ? pisos * PE_DIREITO + REMATE : null
        if (hOSM == null) {
          conta.semAltura++
          edificios.push({ osm, n: t.name ?? null, k: 'sem-altura', aneis: todos, base: +base.toFixed(2) })
          continue
        }
        const zChao = percentil(cotasChao, 0.5)
        beirado = cumeeira = zChao + hOSM
      }

      // --- cobertura: esqueleto recto, do beirado à cumeeira ---
      const desnivel = cumeeira - beirado
      let telhado = null
      const anel = (a) => [...a, a[0]]
      const sk = SkeletonBuilder.buildFromPolygon(todos.map(anel))
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
        conta.esqueletoFalhou++
      }
      conta[dentro ? 'conjunto' : 'contexto']++
      edificios.push({
        osm,
        n: t.name ?? null,
        k: dentro ? 'conjunto' : 'contexto',
        aneis: todos,
        base: +(base - 1.5).toFixed(2), // enterrada, para não flutuar no declive
        beirado: +beirado.toFixed(2),
        cumeeira: +cumeeira.toFixed(2),
        telhado,
      })
    }
  }
  const faltam = m.conjunto.filter((id) => !edificios.some((b) => b.osm === id && b.k === 'conjunto'))
  if (faltam.length) throw new Error(`edifícios do conjunto sem volume ou fora do disco: ${faltam.join(', ')}`)
  console.log(
    `  edifícios: ${conta.conjunto} do monumento, ${conta.contexto} de contexto, ${conta.semAltura} sem altura` +
      (conta.esqueletoFalhou ? `; ${conta.esqueletoFalhou} sem esqueleto (cobertura plana)` : '')
  )

  // --- pontos da visita ---
  const pontos = []
  for (const p of m.pontos) {
    const [tipo, id] = p.osm.split('/')
    const e = j.elements.find((q) => q.type === tipo && String(q.id) === id)
    if (!e) throw new Error(`ponto ${p.id}: ${p.osm} não veio do Overpass`)
    const g = tipo === 'node' ? [{ lat: e.lat, lon: e.lon }] : e.geometry
    const XY = g.map((q) => paraTM06.forward([q.lon, q.lat]))
    let X, Y
    if (tipo === 'way' && XY.length >= 4) {
      // Centro de massa do contorno; numa linha (escadas), a média dos vértices.
      const a = areaAssinada(XY)
      if (Math.abs(a) > 1) {
        let cx = 0, cy = 0
        for (let i = 0; i < XY.length; i++) {
          const [x0, y0] = XY[i], [x1, y1] = XY[(i + 1) % XY.length]
          const f = x0 * y1 - x1 * y0
          cx += (x0 + x1) * f
          cy += (y0 + y1) * f
        }
        X = cx / (6 * a)
        Y = cy / (6 * a)
      }
    }
    if (X == null) {
      X = XY.reduce((s, q) => s + q[0], 0) / XY.length
      Y = XY.reduce((s, q) => s + q[1], 0) / XY.length
    }
    const g0 = chao(X, Y)
    let z = g0
    let altura = null
    if (p.alvo === 'topo') {
      // O ponto mais alto que o laser mediu no contorno (ou à volta do nó).
      let topo = -Infinity
      if (tipo === 'way') {
        const pol = XY
        const xs = pol.map((q) => q[0]), ys = pol.map((q) => q[1])
        for (let x = Math.floor((Math.min(...xs) - 1) / 2) * 2 + 1; x <= Math.max(...xs); x += 2)
          for (let y = Math.floor((Math.min(...ys) - 1) / 2) * 2 + 1; y <= Math.max(...ys); y += 2)
            if (dentroDoPoligono(x, y, pol)) topo = Math.max(topo, pixelDGT(mds, x, y) ?? -Infinity)
        const chaoPol = []
        for (const [x, y] of pol) { const v = chao(x, y); if (v != null) chaoPol.push(v) }
        altura = +(topo - percentil(chaoPol, 0.5)).toFixed(1)
      } else {
        for (let dx = -2; dx <= 2; dx += 2) for (let dy = -2; dy <= 2; dy += 2) topo = Math.max(topo, pixelDGT(mds, X + dx, Y + dy) ?? -Infinity)
      }
      z = topo
    }
    pontos.push({ id: p.id, osm: p.osm, p: [...local([X, Y]), +z.toFixed(2)], ...(altura != null ? { altura } : {}) })
  }

  // --- árvores: a mesma regra das zonas urbanas ---
  const { folhas: orto, completa } = await ortoDGT(DIR_DEM, caixa)
  let arvores = []
  if (!completa) {
    console.log(`  árvores: a ortofoto não cobre o disco inteiro — fica sem vegetação`)
  } else {
    const lista = await arvoresDGT({
      caixa: [Math.floor(caixa[0] / 2) * 2, Math.floor(caixa[1] / 2) * 2, Math.ceil(caixa[2] / 2) * 2, Math.ceil(caixa[3] / 2) * 2],
      mdt,
      mds,
      orto,
      pegadas,
      paraLocal: (x, y) => local([x, y]),
      naZona: ([x, y]) => Math.hypot(x, y) <= R - 2,
    })
    arvores = lista.map((a) => ({ ...a, z: +(chao(a.p[0] + CX, a.p[1] + CY) ?? 0).toFixed(2) }))
    console.log(`  árvores: ${arvores.length}`)
  }

  // --- a fotografia do chão e dos telhados ---
  const foto = await fotografia(m.id, caixa, CX, CY)

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(
    join(OUT_DIR, `${m.id}.scene.json`),
    JSON.stringify({ id: m.id, raio: R, dem, buildings: edificios, arvores, pontos, foto })
  )

  const conj = edificios.filter((b) => b.k === 'conjunto')
  return {
    id: m.id,
    nome: m.nome,
    centro: [m.centro.lat, m.centro.lon],
    raio: R,
    edificios: edificios.length,
    doMonumento: conj.length,
    semAltura: conta.semAltura,
    arvores: arvores.length,
    cotaMin: +Math.min(...elev.filter((_, i) => {
      const x = dem.x0 + (i % nCol) * 2, y = dem.y0 + Math.floor(i / nCol) * 2
      return Math.hypot(x, y) <= R
    })).toFixed(1),
    cotaMax: +Math.max(...conj.map((b) => b.cumeeira)).toFixed(1),
    // Posição em coordenadas da maqueta (metros, x nascente, y norte, z cota),
    // e altura medida nos pontos que são um edifício visto do alto.
    pontos,
    lidoEm: new Date().toISOString(),
  }
}

// ------------------------------------------------------------------ saída --

await SkeletonBuilder.init()
const pedidos = process.argv.slice(2)
const anteriores = (() => {
  try {
    const m = readFileSync(OUT_TS, 'utf8').match(/MONUMENTOS: Monumento\[\] = (\[[\s\S]*?\n\])/)
    return m ? JSON.parse(m[1]) : []
  } catch {
    return []
  }
})()
const lista = []
for (const m of MONUMENTOS) {
  const antes = anteriores.find((a) => a.id === m.id)
  if (pedidos.length && !pedidos.includes(m.id) && antes) lista.push(antes)
  else lista.push(await gerar(m))
}

writeFileSync(
  OUT_TS,
  `/**
 * GERADO por \`node scripts/build-monumento.mjs\` — não editar à mão.
 *
 * Os monumentos modelados em três dimensões. O modelo é um disco de \`raio\`
 * metros em torno de \`centro\`; o texto da visita está em
 * \`lib/monumentos-textos.ts\`, escrito à mão, e junta-se aqui pelo \`id\`
 * de cada ponto.
 */

export interface PontoMonumento {
  id: string
  /** Elemento do OSM de onde vem a posição. */
  osm: string
  /** [x nascente, y norte, z cota] em metros, nas coordenadas da maqueta. */
  p: [number, number, number]
  /** Altura medida pelo LiDAR (topo − chão), nos pontos que são um edifício. */
  altura?: number
}

export interface Monumento {
  id: string
  nome: string
  centro: [number, number]
  raio: number
  edificios: number
  doMonumento: number
  semAltura: number
  arvores: number
  /** Cota mais baixa do terreno dentro do disco, em metros. */
  cotaMin: number
  /** Cota da cumeeira mais alta do monumento, em metros. */
  cotaMax: number
  pontos: PontoMonumento[]
  lidoEm: string
}

export const MONUMENTOS: Monumento[] = ${JSON.stringify(lista, null, 2)}

export const monumentoPorId = (id: string): Monumento | undefined => MONUMENTOS.find((m) => m.id === id)
`
)
console.log(`\nescrito ${OUT_TS}`)
