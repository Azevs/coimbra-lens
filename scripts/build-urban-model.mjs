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

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { fromFile } from 'geotiff'
import proj4 from 'proj4'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_TS = join(ROOT, 'lib', 'urban-zones.ts')
const OUT_DIR = join(ROOT, 'scripts', 'blender')

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
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
   */
  {
    id: 'baixa',
    nome: 'Baixa',
    tipo: 'eixo',
    freguesia: 'Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)',
    raio: 120,
    terreno: 'dgt',
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

async function folhasDGT() {
  const folhas = []
  for (const f of readdirSync(DIR_DEM).filter((f) => /^MDT-.*\.tiff?$/.test(f))) {
    const im = await (await fromFile(join(DIR_DEM, f))).getImage()
    const [w, s, e, n] = im.getBoundingBox()
    const [rx, ry] = im.getResolution()
    folhas.push({
      f, w, s, e, n, rx, ry: -ry,
      W: im.getWidth(), H: im.getHeight(),
      nodata: im.getGDALNoData(),
      r: await im.readRasters({ interleave: true }),
    })
  }
  if (!folhas.length) throw new Error(`nenhuma folha MDT em ${DIR_DEM}`)
  return folhas
}

/** Caixa em graus inteiramente coberta pelas folhas (a união tem de ser um rectângulo). */
function coberturaDGT(folhas) {
  const w = Math.min(...folhas.map((t) => t.w))
  const e = Math.max(...folhas.map((t) => t.e))
  const s = Math.min(...folhas.map((t) => t.s))
  const n = Math.max(...folhas.map((t) => t.n))
  const area = folhas.reduce((a, t) => a + (t.e - t.w) * (t.n - t.s), 0)
  if (Math.abs(area - (e - w) * (n - s)) > 1) throw new Error('as folhas MDT não formam um rectângulo')
  // 4 m para dentro, e o canto mais interior de cada lado: a grelha PT-TM06
  // está rodada ~0,2° em relação ao norte geográfico.
  const g = (x, y) => proj4('EPSG:3763', 'EPSG:4326', [x, y])
  const [sw, se, nw, ne] = [g(w + 4, s + 4), g(e - 4, s + 4), g(w + 4, n - 4), g(e - 4, n - 4)]
  return {
    w: Math.max(sw[0], nw[0]),
    e: Math.min(se[0], ne[0]),
    s: Math.max(sw[1], se[1]),
    n: Math.min(nw[1], ne[1]),
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

async function gerarZona(z) {
  console.log(`\n${z.nome}`)

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
  const comprimento = (() => {
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
  })()

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
  if (z.terreno === 'dgt') {
    // A placa encolhe ao que as folhas cobrem, nunca o contrário: terreno
    // que não se mediu não se desenha.
    folhas = await folhasDGT()
    const cob = coberturaDGT(folhas)
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
    if (aoEixo([cx, cy]) > z.raio) continue
    if (pts.some(([x, y]) => x < x0 || x > x1 || y < y0 || y > y1)) {
      foraDoTerreno++
      continue
    }

    const area = Math.abs(areaAssinada(pts))
    if (area < AREA_MIN_M2) continue

    const t = e.tags ?? {}
    const pisos = parseFloat(t['building:levels'])
    const altura = parseFloat(t.height)
    let h, classe
    if (Number.isFinite(altura) && altura > 1) {
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
    JSON.stringify({ id: z.id, placa, buildings: edificios, eixo, dem: demFinal })
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
    maisAlto: +maisAlto.toFixed(1),
    areaImplantacao: Math.round(areaImplantacao),
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
  zonas.push({ ...(await gerarZona(z)), lidoEm: new Date().toISOString() })
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
  /** Altura do edifício medido mais alto, em metros. */
  maisAlto: number
  /** Soma das áreas de implantação, em m². */
  areaImplantacao: number
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
