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
import { folhasNaCaixa, pixelDGT, dentroDoPoligono, ortoDGT, arvoresDGT } from './lib/dgt.mjs'
import { areaAssinada, distSegmento, limparAnel, aneis, percentil, fotografia, chaoOSM } from './lib/reconstituicao.mjs'

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
 * `'chao'`, no terreno; `'face-poente'` (ou `-norte`, `-sul`, `-nascente`), ao
 * meio da face do contorno virada para esse lado (a fachada de uma igreja),
 * com a altura medida por trás dela; `'pico'`, no píxel mais alto que o laser
 * mediu no contorno; `'abside'`, ao meio do arco que o contorno desenha (a
 * maior sequência de arestas curtas a virar sempre para o mesmo lado);
 * `'saliencia-norte'`, ao meio da saliência mais a poente da face norte (um
 * corpo que avança da parede, com as duas ilhargas perpendiculares a ela).
 */
const MONUMENTOS = [
  {
    id: 'paco-das-escolas',
    nome: 'Paço das Escolas',
    // Centro do Pátio das Escolas, um pouco a norte para apanhar a ala da
    // Via Latina inteira e deixar a varanda sobre o rio a sul.
    centro: { lat: 40.20752, lon: -8.42608 },
    raio: 150,
    // Só a reconstituição, com o chão desenhado (pedido de 23/09/2026). As
    // versões fotografia e cartão saíram da página.
    vestidos: ['rico'],
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
  {
    id: 'santa-cruz',
    nome: 'Mosteiro de Santa Cruz',
    // Entre a fachada da igreja e o Jardim da Manga: a poente apanha a Praça
    // 8 de Maio, a nascente a fonte da Manga inteira.
    centro: { lat: 40.21107, lon: -8.42821 },
    raio: 100,
    // Só a reconstituição (a fotografia nunca foi verificada aqui contra os
    // contornos, ver `fotografia`).
    vestidos: ['rico'],
    conjunto: [
      'way/204192080', // Igreja de Santa Cruz
      'relation/2962560', // o mosteiro, com o Claustro do Silêncio por dentro
      'way/223328749', // Café Santa Cruz — a antiga igreja de São João de Santa Cruz
    ],
    pontos: [
      // A fachada não tem nó no OSM: o ponto é o meio da face poente do
      // contorno da igreja.
      { id: 'fachada', osm: 'way/204192080', alvo: 'face-poente' },
      { id: 'nave', osm: 'way/204192080', alvo: 'topo' },
      { id: 'tumulos', osm: 'node/12593540265', alvo: 'topo' },
      { id: 'claustro', osm: 'way/1349800549', alvo: 'chao' },
      { id: 'manga', osm: 'way/873267259', alvo: 'chao' },
    ],
  },
  {
    id: 'se-velha',
    nome: 'Sé Velha',
    artigo: 'a',
    // Entre a igreja e o claustro, que lhe fica a sul: a poente apanha o
    // Largo da Sé Velha e o alto do Quebra-Costas, a norte a Rua do Cabido.
    centro: { lat: 40.20862, lon: -8.42696 },
    raio: 95,
    vestidos: ['rico'],
    conjunto: [
      'way/41222810', // a catedral
      'relation/3475986', // o claustro, com o pátio por dentro
    ],
    pontos: [
      { id: 'fachada', osm: 'way/41222810', alvo: 'face-poente' },
      // A Porta Especiosa é a saliência de 6 m que o contorno desenha na
      // fachada norte, a poente do braço do transepto.
      { id: 'porta-especiosa', osm: 'way/41222810', alvo: 'saliencia-norte' },
      // A torre-lanterna sobre o cruzeiro não tem elemento no OSM: é o píxel
      // mais alto que o laser mediu dentro do contorno.
      { id: 'lanterna', osm: 'way/41222810', alvo: 'pico' },
      // A cabeceira: a ábside, que o contorno desenha em arco.
      { id: 'cabeceira', osm: 'way/41222810', alvo: 'abside' },
      // O fontanário ao meio do pátio do claustro.
      { id: 'claustro', osm: 'node/10773754449', alvo: 'chao' },
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
      // Nos do monumento vai também o MDS em bruto, em grelha de 2 m sobre a
      // caixa do contorno: a reconstituição tira dele as cotas das partes que
      // o esqueleto recto não sabe fazer (a lanterna da Sé, a ábside).
      let lidar
      if (dentro) {
        const gx = Math.floor((Math.min(...xs) + CX - 3) / 2) * 2 + 1, gy = Math.floor((Math.min(...ys) + CY - 3) / 2) * 2 + 1
        const n = Math.ceil((Math.max(...xs) + CX + 2 - gx) / 2) + 1, mm = Math.ceil((Math.max(...ys) + CY + 2 - gy) / 2) + 1
        const v = []
        for (let r = 0; r < mm; r++) for (let c = 0; c < n; c++) v.push(+(pixelDGT(mds, gx + c * 2, gy + r * 2) ?? 0).toFixed(2))
        lidar = { x0: gx - CX, y0: gy - CY, passo: 2, nCol: n, nRow: mm, mds: v }
      }
      edificios.push({
        ...(lidar ? { lidar } : {}),
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
    let altura = null
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
    if (p.alvo === 'saliencia-norte') {
      // As arestas viradas a norte cujas vizinhas são as ilhargas de um corpo
      // saliente (perpendiculares à face, a sair dela); fica a mais a poente.
      const A = limparAnel(XY)
      const ccw = areaAssinada(A) > 0
      const nrm = (a, b) => {
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]), s = ccw ? 1 : -1
        return [(s * (b[1] - a[1])) / L, (-s * (b[0] - a[0])) / L, L]
      }
      let melhor = null
      for (let i = 0; i < A.length; i++) {
        const a = A[i], b = A[(i + 1) % A.length], ant = A[(i - 1 + A.length) % A.length], seg = A[(i + 2) % A.length]
        const [, ny, L] = nrm(a, b)
        if (ny < 0.8 || L < 2) continue
        // ilhargas: a de trás desce para sul até à face, a da frente volta a subir
        const sobe = (a[1] - ant[1]) / Math.hypot(a[0] - ant[0], a[1] - ant[1])
        const desce = (seg[1] - b[1]) / Math.hypot(seg[0] - b[0], seg[1] - b[1])
        if (sobe < 0.8 || desce > -0.8) continue
        const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
        if (!melhor || m[0] < melhor.m[0]) melhor = { m, L, fundo: Math.min(a[1] - ant[1], b[1] - seg[1]) }
      }
      if (!melhor) throw new Error(`ponto ${p.id}: ${p.osm} não tem saliência a norte`)
      ;[X, Y] = melhor.m
      altura = null
    }
    if (p.alvo.startsWith('face-')) {
      // O meio da aresta mais comprida virada para o lado pedido (normal
      // exterior a menos de 37° dele): a poente, numa igreja orientada, a
      // fachada; a norte, na Sé Velha, o transepto com a Porta Especiosa.
      const lado = { poente: [-1, 0], nascente: [1, 0], norte: [0, 1], sul: [0, -1] }[p.alvo.slice(5)]
      if (!lado) throw new Error(`ponto ${p.id}: alvo ${p.alvo} desconhecido`)
      // Sem vértices quase colineares: uma face desenhada em dois troços
      // conta como uma.
      const A = limparAnel(XY)
      A.push(A[0])
      const ccw = areaAssinada(A) > 0
      let melhor = null
      for (let i = 0; i < A.length - 1; i++) {
        const [a, b] = [A[i], A[i + 1]]
        const L = Math.hypot(b[0] - a[0], b[1] - a[1])
        if (L < 1) continue
        const s = ccw ? 1 : -1
        const nx = (s * (b[1] - a[1])) / L, ny = (-s * (b[0] - a[0])) / L
        if (nx * lado[0] + ny * lado[1] > 0.8 && (!melhor || L > melhor.L)) melhor = { L, a, b, m: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] }
      }
      if (!melhor) throw new Error(`ponto ${p.id}: ${p.osm} não tem face a ${p.alvo.slice(5)}`)
      ;[X, Y] = melhor.m
      // A altura da fachada: o mais alto que o laser mediu na faixa de 5 m
      // por trás dela (as torres), acima do chão à porta.
      const xs = XY.map((q) => q[0]), ys = XY.map((q) => q[1])
      let topo = -Infinity
      for (let x = Math.floor((Math.min(...xs) - 1) / 2) * 2 + 1; x <= Math.max(...xs); x += 2)
        for (let y = Math.floor((Math.min(...ys) - 1) / 2) * 2 + 1; y <= Math.max(...ys); y += 2)
          if (dentroDoPoligono(x, y, XY) && distSegmento([x, y], melhor.a, melhor.b) < 5)
            topo = Math.max(topo, pixelDGT(mds, x, y) ?? -Infinity)
      altura = +(topo - chao(X, Y)).toFixed(1)
    }
    if (p.alvo === 'pico' || p.alvo === 'abside') {
      // 'pico': o píxel mais alto que o laser mediu dentro do contorno (uma
      // torre que o OSM não desenha à parte). 'abside': o vértice do meio da
      // maior sequência de arestas curtas (< 3 m) que viram todas para o lado
      // de fora — o arco de uma ábside —, à altura do telhado ali.
      const xs = XY.map((q) => q[0]), ys = XY.map((q) => q[1])
      let v = null
      if (p.alvo === 'abside') {
        const A = limparAnel(XY), N = A.length, ccw = areaAssinada(A) > 0
        const curta = (i) => Math.hypot(A[(i + 1) % N][0] - A[i][0], A[(i + 1) % N][1] - A[i][1]) < 3
        const convexo = (i) => {
          const a = A[(i - 1 + N) % N], b = A[i], c = A[(i + 1) % N]
          const cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])
          return ccw ? cr > 0 : cr < 0
        }
        let melhor = []
        for (let i0 = 0; i0 < N; i0++) {
          const run = []
          for (let k = 0; k < N && curta((i0 + k) % N) && convexo((i0 + k + 1) % N); k++) run.push((i0 + k + 1) % N)
          if (run.length > melhor.length) melhor = run
        }
        if (melhor.length < 3) throw new Error(`ponto ${p.id}: ${p.osm} não desenha ábside`)
        v = A[melhor[Math.floor((melhor.length - 1) / 2)]]
      }
      let topo = -Infinity
      for (let x = Math.floor((Math.min(...xs) - 1) / 2) * 2 + 1; x <= Math.max(...xs); x += 2)
        for (let y = Math.floor((Math.min(...ys) - 1) / 2) * 2 + 1; y <= Math.max(...ys); y += 2) {
          if (!dentroDoPoligono(x, y, XY) || (v && Math.hypot(x - v[0], y - v[1]) > 6)) continue
          const s = pixelDGT(mds, x, y) ?? -Infinity
          if (s > topo) {
            topo = s
            if (!v) [X, Y] = [x, y]
          }
        }
      if (v) [X, Y] = v
      const chaoPol = XY.map(([x, y]) => chao(x, y)).filter((c) => c != null)
      if (p.alvo === 'pico') altura = +(topo - percentil(chaoPol, 0.5)).toFixed(1)
      pontos.push({ id: p.id, osm: p.osm, p: [...local([X, Y]), +topo.toFixed(2)], ...(altura != null ? { altura } : {}) })
      continue
    }
    if (X == null) {
      X = XY.reduce((s, q) => s + q[0], 0) / XY.length
      Y = XY.reduce((s, q) => s + q[1], 0) / XY.length
    }
    const g0 = chao(X, Y)
    let z = g0

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
  const foto = await fotografia(OUT_DIR, m.id, caixa, CX, CY)
  const chaoDesenho = await chaoOSM(overpass, bb, local)

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(
    join(OUT_DIR, `${m.id}.scene.json`),
    JSON.stringify({ id: m.id, raio: R, dem, buildings: edificios, arvores, pontos, foto, chao: chaoDesenho })
  )

  const conj = edificios.filter((b) => b.k === 'conjunto')
  return {
    id: m.id,
    nome: m.nome,
    ...(m.artigo ? { artigo: m.artigo } : {}),
    centro: [m.centro.lat, m.centro.lon],
    raio: R,
    ...(m.vestidos ? { vestidos: m.vestidos } : {}),
    // A reconstituição pinta o chão a partir destes elementos (ver `chao.py`).
    chaoDesenhado: chaoDesenho.length > 0,
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
  /** O artigo do nome, para "a maqueta da Sé" — sem o campo, "o". */
  artigo?: 'o' | 'a'
  centro: [number, number]
  raio: number
  /**
   * As versões que existem do modelo. Sem o campo, as três: fotografia
   * (\`<id>.glb\`), reconstituição (\`<id>-rico.glb\`) e cartão. Só
   * \`['rico']\` quando os contornos não foram verificados contra a ortofoto.
   */
  vestidos?: ('foto' | 'rico' | 'cartao')[]
  /** Na reconstituição, o chão é desenhado a partir do OSM e não a ortofoto. */
  chaoDesenhado?: boolean
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
