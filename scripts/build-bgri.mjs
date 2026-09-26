#!/usr/bin/env node
/**
 * Gerador do "onde vive quem cá vive" do Território.
 *
 *   node scripts/build-bgri.mjs --pedir   # descarrega do INE o que faltar
 *   node scripts/build-bgri.mjs           # só reconstrói, sem tocar no INE
 *
 * Duas fases, separadas de propósito, como no gerador do Turismo:
 *
 *   1. PEDIR — os geopackages da BGRI (Base Geográfica de Referenciação de
 *      Informação) de Coimbra, de 2021 e de 2011: as contagens dos Censos
 *      por subsecção estatística, o quarteirão do INE. Vêm do servidor de
 *      descargas de cartografia (mapas.ine.pt), um ficheiro por ano, e não
 *      da API de indicadores — esta só daria as freguesias pedindo o país
 *      inteiro, que é o padrão a que o INE fecha a porta.
 *
 *      Um pedido de cada vez, dois minutos entre eles, e a primeira falha
 *      pára tudo, sem novas tentativas. Cada ficheiro fica em
 *      `scripts/data/bgri/` e nunca volta a ser pedido: um Censo não muda.
 *
 *   2. CONSTRUIR — lê só esses ficheiros e escreve `lib/parish-census.ts`.
 *      Não toca no INE; pode correr-se as vezes que for preciso.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { geoPath, geoTransverseMercator } from 'd3-geo'
import { topology } from 'topojson-server'
import { presimplify, simplify, quantile } from 'topojson-simplify'
import { feature } from 'topojson-client'
import proj4 from 'proj4'

import { rewind } from './lib/geo.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(ROOT, 'scripts', 'data', 'bgri')

/** Município de Coimbra, código DICO. */
const DICO = '0603'
const FICHEIROS = {
  2021: `https://mapas.ine.pt/download/filesGPG/2021/municipios/BGRI2021_${DICO}.zip`,
  2011: `https://mapas.ine.pt/download/filesGPG/2011/municipios/BGRI2011_${DICO}.zip`,
}
const PAUSA_MS = 120_000
const USER_AGENT = 'CoimbraLens/1.0 (gerador do Território; um pedido por Censo)'

const argv = process.argv.slice(2)
const PEDIR = argv.includes('--pedir')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const zipPath = (ano) => join(DIR, `BGRI${ano}_${DICO}.zip`)

/** O geopackage extraído de um ano, se já existir. */
export function gpkgPath(ano) {
  if (!existsSync(DIR)) return null
  const f = readdirSync(DIR).find((n) => n.toLowerCase().endsWith('.gpkg') && n.includes(String(ano)))
  return f ? join(DIR, f) : null
}

/**
 * Extrai o zip. O `tar` do Git Bash é o GNU, que não lê zip e toma o "C:"
 * de um caminho por um anfitrião remoto; usa-se o `unzip`, e o PowerShell
 * quando não houver.
 */
function extrair(ano) {
  let r = spawnSync('unzip', ['-o', '-q', zipPath(ano), '-d', DIR], { encoding: 'utf8' })
  if (r.error || r.status !== 0) {
    r = spawnSync(
      'powershell',
      ['-NoProfile', '-Command', `Expand-Archive -Force -LiteralPath '${zipPath(ano)}' -DestinationPath '${DIR}'`],
      { encoding: 'utf8' },
    )
  }
  if (r.error || r.status !== 0 || !gpkgPath(ano)) {
    throw Object.assign(new Error(`não consegui extrair ${zipPath(ano)}: ${r.stderr || r.error}`), { local: true })
  }
}

// ─── 1. PEDIR ────────────────────────────────────────────────────────────

async function pedir() {
  mkdirSync(DIR, { recursive: true })
  let feitos = 0
  for (const [ano, url] of Object.entries(FICHEIROS)) {
    if (existsSync(zipPath(ano))) {
      if (!gpkgPath(ano)) extrair(ano)
      continue
    }
    if (feitos > 0) {
      console.log(`À espera ${PAUSA_MS / 1000} s antes do próximo pedido…`)
      await sleep(PAUSA_MS)
    }
    feitos++
    console.log(`A pedir ${url}`)
    try {
      const r = await fetch(url, {
        signal: AbortSignal.timeout(180_000),
        headers: { 'User-Agent': USER_AGENT },
      })
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      const buf = Buffer.from(await r.arrayBuffer())
      // Um zip começa por "PK". Uma página de erro servida com 200 não.
      if (buf.subarray(0, 2).toString() !== 'PK') throw new Error('a resposta não é um zip')
      writeFileSync(zipPath(ano), buf)
      console.log(`✓ ${ano}: ${(buf.length / 1e6).toFixed(1)} MB`)
      extrair(ano)
    } catch (e) {
      console.error(`✗ ${ano}: ${e.message}`)
      console.error('Parado — sem novas tentativas. O que já chegou fica guardado.')
      process.exitCode = 1
      break
    }
  }
  console.log(`${feitos} pedido(s) ao INE nesta corrida.`)
}

// ─── 2. CONSTRUIR ────────────────────────────────────────────────────────

/**
 * Lê a geometria de um geopackage: um cabeçalho "GP" com o envelope,
 * seguido de WKB. Só há polígonos e multipolígonos na BGRI. Devolve os
 * polígonos como listas de anéis, em metros do PT-TM06.
 */
function lerGeometria(blob) {
  const buf = Buffer.from(blob)
  if (buf.toString('latin1', 0, 2) !== 'GP') throw new Error('geometria sem cabeçalho GP')
  const flags = buf[3]
  const envelope = [0, 32, 48, 48, 64][(flags >> 1) & 7]
  let o = 8 + envelope
  const polys = []
  const lerPoligono = (le) => {
    const u32 = () => { const v = le ? buf.readUInt32LE(o) : buf.readUInt32BE(o); o += 4; return v }
    const f64 = () => { const v = le ? buf.readDoubleLE(o) : buf.readDoubleBE(o); o += 8; return v }
    const rings = []
    for (let r = 0, nr = u32(); r < nr; r++) {
      const ring = []
      for (let p = 0, np = u32(); p < np; p++) ring.push([f64(), f64()])
      rings.push(ring)
    }
    return rings
  }
  const lerUm = () => {
    const le = buf[o] === 1
    o += 1
    const tipo = le ? buf.readUInt32LE(o) : buf.readUInt32BE(o)
    o += 4
    if (tipo % 1000 === 3) polys.push(lerPoligono(le))
    else if (tipo % 1000 === 6) {
      const n = le ? buf.readUInt32LE(o) : buf.readUInt32BE(o)
      o += 4
      for (let i = 0; i < n; i++) lerUm()
    } else throw new Error(`tipo WKB ${tipo} inesperado`)
  }
  lerUm()
  return polys
}

/** Área (m²) e centróide de área de um multipolígono plano. */
function areaECentro(polys) {
  let a = 0
  let cx = 0
  let cy = 0
  for (const rings of polys) {
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const f = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]
        a += f
        cx += (ring[j][0] + ring[i][0]) * f
        cy += (ring[j][1] + ring[i][1]) * f
      }
    }
  }
  // Os buracos vêm no sentido contrário e descontam sozinhos.
  return { area: Math.abs(a / 2), x: cx / (3 * a), y: cy / (3 * a) }
}

function dentro(x, y, polys) {
  let inside = false
  for (const rings of polys) {
    for (const ring of rings) {
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]
        const [xj, yj] = ring[j]
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
    }
  }
  return inside
}

function caixa(polys) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const rings of polys) for (const [x, y] of rings[0]) {
    if (x < x0) x0 = x
    if (y < y0) y0 = y
    if (x > x1) x1 = x
    if (y > y1) y1 = y
  }
  return [x0, y0, x1, y1]
}

/**
 * A projecção do mapa das freguesias, refeita passo a passo como em
 * `build-parish-map.mjs`: a mesma carta, a mesma topologia simplificada, e
 * o mesmo encaixe na largura. Só assim um ponto daqui cai no sítio certo
 * de `lib/parish-map.ts`. A carta fica guardada ao lado da BGRI, para a
 * projecção não mudar se a geoapi.pt mudar.
 */
async function projeccaoDoMapa() {
  const cache = join(DIR, 'geoapi-freguesias.json')
  if (!existsSync(cache)) {
    if (!PEDIR) throw new Error('Falta a carta das freguesias. Correr com --pedir (vai à geoapi.pt, não ao INE).')
    const r = await fetch('https://json.geoapi.pt/municipio/coimbra/freguesias', { signal: AbortSignal.timeout(60000) })
    if (!r.ok) throw new Error(`geoapi.pt respondeu ${r.status}`)
    writeFileSync(cache, await r.text())
  }
  const data = JSON.parse(readFileSync(cache, 'utf8'))
  const objects = { municipio: rewind(data.geojsons.municipio.geometry) }
  for (const f of data.geojsons.freguesias) objects[f.properties.dtmnfr] = rewind(f.geometry)
  let topo = presimplify(topology(objects))
  topo = simplify(topo, quantile(topo, 0.2))
  const municipality = feature(topo, topo.objects.municipio)
  const WIDTH = 1000
  const PAD = 6
  const projection = geoTransverseMercator()
    .rotate([-PT_TM06.lon, 0])
    .center([0, PT_TM06.lat])
    .fitWidth(WIDTH - 2 * PAD, municipality)
  const [[x0, y0]] = geoPath(projection).bounds(municipality)
  const [tx, ty] = projection.translate()
  projection.translate([tx - x0 + PAD, ty - y0 + PAD])
  return projection
}

const PT_TM06 = { lon: -8.133108333, lat: 39.668258333 }
const EPSG_3763 =
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'

async function construir() {
  for (const ano of Object.keys(FICHEIROS)) {
    if (!gpkgPath(ano)) {
      console.error(`Falta a BGRI ${ano}. Correr com --pedir (faz pedidos ao INE).`)
      process.exitCode = 1
      return
    }
  }

  const { DatabaseSync } = await import('node:sqlite')
  const db21 = new DatabaseSync(gpkgPath(2021), { readOnly: true })
  const db11 = new DatabaseSync(gpkgPath(2011), { readOnly: true })

  // As duas BGRI vêm no PT-TM06. A de 2011 declara-o como sistema próprio
  // (CUSTOM, 300001), com os mesmos parâmetros — confirma-se, não se supõe.
  const srs11 = db11.prepare('select definition d from gpkg_spatial_ref_sys where srs_id = 300001').get()?.d ?? ''
  if (!/TM06/.test(srs11) || !/-8\.1331083/.test(srs11)) throw new Error('a BGRI 2011 não está no PT-TM06')

  const sub21 = db21
    .prepare(
      `select SUBSECCAO id, DTMNFR21 fr, geom, N_INDIVIDUOS p, N_INDIVIDUOS_0_14 a, N_INDIVIDUOS_15_24 b,
              N_INDIVIDUOS_25_64 c, N_INDIVIDUOS_65_OU_MAIS e, N_ALOJAMENTOS_FAM_CLASS_RHABITUAL rh,
              N_ALOJAMENTOS_FAM_CLASS_VAGOS_OU_RESID_SECUNDARIA vs, SHAPE_Area area
       from "BGRI2021_${DICO}"`,
    )
    .all()
    .map((r) => {
      const polys = lerGeometria(r.geom)
      return { ...r, polys, box: caixa(polys), ...areaECentro(polys), area: r.area }
    })

  const sub11 = db11
    .prepare(
      `select BGRI11 id, FR11 fr, Shape geom, N_INDIVIDUOS_RESIDENT p,
              N_INDIVIDUOS_RESIDENT_0A4 + N_INDIVIDUOS_RESIDENT_5A9 + N_INDIVIDUOS_RESIDENT_10A13
                + N_INDIVIDUOS_RESIDENT_14A19 - N_INDIVIDUOS_RESIDENT_15A19 a,
              N_INDIVIDUOS_RESIDENT_65 e
       from "BGRI2011_${DICO}"`,
    )
    .all()
    .map((r) => ({ ...r, ...areaECentro(lerGeometria(r.geom)) }))

  // ── 2011 → freguesias de hoje ─────────────────────────────────────────
  // Cada subsecção de 2011 vai para a freguesia de 2021 onde cai o seu
  // centro. Em 2013 as freguesias juntaram-se em uniões, não se partiram:
  // cada uma das 31 antigas deve cair inteira numa das 18 de hoje. As que
  // não caírem são acertos de limites da carta, e ficam contados abaixo.
  const onde = (x, y) =>
    sub21.find((s) => x >= s.box[0] && x <= s.box[2] && y >= s.box[1] && y <= s.box[3] && dentro(x, y, s.polys))?.fr ?? null
  const antigas = new Map()
  let foraDoConcelho = 0
  for (const s of sub11) {
    s.hoje = onde(s.x, s.y)
    if (!s.hoje) {
      // Centro fora de todas as subsecções de 2021 (uma margem de rio, uma
      // lasca na fronteira): vai para a mais próxima.
      foraDoConcelho++
      s.hoje = sub21.reduce((m, t) => (Math.hypot(t.x - s.x, t.y - s.y) < Math.hypot(m.x - s.x, m.y - s.y) ? t : m)).fr
    }
    const k = s.fr
    if (!antigas.has(k)) antigas.set(k, new Map())
    const m = antigas.get(k)
    m.set(s.hoje, (m.get(s.hoje) ?? 0) + s.p)
  }
  const destino = {}
  let desviados = 0
  for (const [antiga, m] of antigas) {
    const [principal, ...outras] = [...m.entries()].sort((a, b) => b[1] - a[1])
    destino[antiga] = principal[0]
    for (const [fr, p] of outras) {
      desviados += p
      console.log(`  2011 · freguesia antiga ${antiga}: ${p} residentes caem em ${fr} (o grosso em ${principal[0]})`)
    }
  }

  // ── Totais por freguesia ───────────────────────────────────────────────
  const soma = (lista, f) => lista.reduce((t, s) => t + f(s), 0)
  const codigos = [...new Set(sub21.map((s) => s.fr))].sort()
  const freguesias = {}
  for (const fr of codigos) {
    const s21 = sub21.filter((s) => s.fr === fr)
    const s11 = sub11.filter((s) => s.hoje === fr)
    freguesias[fr] = resumo(s21, s11)
  }
  const municipio = resumo(sub21, sub11)

  function resumo(s21, s11) {
    const pop = soma(s21, (s) => s.p)
    // Metade da população: as subsecções mais densas primeiro, até somarem
    // metade dos residentes; a área delas contra a área toda.
    const porDensidade = [...s21].filter((s) => s.area > 0).sort((a, b) => b.p / b.area - a.p / a.area)
    let acc = 0
    let areaMetade = 0
    for (const s of porDensidade) {
      if (acc >= pop / 2) break
      acc += s.p
      areaMetade += s.area
    }
    return {
      populacao: pop,
      populacao2011: soma(s11, (s) => s.p),
      idades: [soma(s21, (s) => s.a), soma(s21, (s) => s.b), soma(s21, (s) => s.c), soma(s21, (s) => s.e)],
      jovens2011: soma(s11, (s) => s.a),
      idosos2011: soma(s11, (s) => s.e),
      alojamentosHabituais: soma(s21, (s) => s.rh),
      alojamentosSemResidentes: soma(s21, (s) => s.vs),
      metadeArea: Number((areaMetade / soma(s21, (s) => s.area)).toFixed(4)),
    }
  }

  // ── Verificações ───────────────────────────────────────────────────────
  // A BGRI de 2021 tem de dar os números dos Censos que o site já mostra.
  const site = Object.fromEntries(
    [...readFileSync(join(ROOT, 'lib', 'parishes.ts'), 'utf8').matchAll(/code: '(\d+)'.*?population: (\d+)/g)].map((m) => [m[1], +m[2]]),
  )
  const erros = []
  for (const fr of codigos) {
    const f = freguesias[fr]
    if (site[fr] !== f.populacao) erros.push(`${fr}: BGRI ${f.populacao}, Censos no site ${site[fr]}`)
    if (f.idades.reduce((a, b) => a + b, 0) !== f.populacao) erros.push(`${fr}: grupos etários não somam o total`)
  }
  if (codigos.length !== 18) erros.push(`${codigos.length} freguesias em vez de 18`)
  if (antigas.size !== 31) erros.push(`${antigas.size} freguesias em 2011 em vez de 31`)
  if (soma(sub11, (s) => s.p) !== municipio.populacao2011) erros.push('2011 não fecha')
  if (erros.length) throw new Error(`A BGRI não bate certo:\n  ${erros.join('\n  ')}`)

  // ── Subsecções, no desenho ─────────────────────────────────────────────
  const projection = await projeccaoDoMapa()
  const toLonLat = proj4(EPSG_3763, 'EPSG:4326')
  const xy = (x, y) => projection(toLonLat.forward([x, y]))

  // Confirmação da projecção: a caixa de cada freguesia desenhada pela
  // BGRI tem de coincidir com a de `lib/parish-map.ts`, a menos da
  // simplificação do traçado.
  const caixasMapa = Object.fromEntries(
    [...readFileSync(join(ROOT, 'lib', 'parish-map.ts'), 'utf8').matchAll(/code: '(\d+)',[\s\S]*?d: '([^']+)'/g)].map((m) => {
      const pts = m[2].split(/[MLZ]/).filter(Boolean).map((p) => p.split(',').map(Number))
      return [m[1], [Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1]))]]
    }),
  )
  let desvioMax = 0
  for (const fr of codigos) {
    const pts = sub21.filter((s) => s.fr === fr).flatMap((s) => s.polys.flatMap((r) => r[0])).map(([x, y]) => xy(x, y))
    const b = [Math.min(...pts.map((p) => p[0])), Math.min(...pts.map((p) => p[1])), Math.max(...pts.map((p) => p[0])), Math.max(...pts.map((p) => p[1]))]
    desvioMax = Math.max(desvioMax, ...b.map((v, i) => Math.abs(v - caixasMapa[fr][i])))
  }
  if (desvioMax > 4) throw new Error(`a projecção não coincide com a do mapa: ${desvioMax.toFixed(1)} unidades`)

  const indice = Object.fromEntries(codigos.map((fr, i) => [fr, i]))
  const pontos = sub21
    .filter((s) => s.p > 0)
    .map((s) => {
      const [x, y] = xy(s.x, s.y)
      return [Math.round(x * 10) / 10, Math.round(y * 10) / 10, s.p, indice[s.fr]]
    })
    .sort((a, b) => a[1] - b[1])

  const out = join(ROOT, 'lib', 'parish-census.ts')
  writeFileSync(out, render({ freguesias, municipio, codigos, pontos, desvioMax, desviados, foraDoConcelho, vazias: sub21.length - pontos.length }), 'utf8')
  console.log(
    `${sub21.length} subsecções em 2021 (${pontos.length} com residentes), ${sub11.length} em 2011 · ` +
      `${desviados} residentes de 2011 fora da união da sua freguesia antiga · projecção a ${desvioMax.toFixed(1)} u do mapa\n` +
      `Escrito ${out}`,
  )
}

function render({ freguesias, municipio, codigos, pontos, desvioMax, desviados, foraDoConcelho, vazias }) {
  const linha = (f) => JSON.stringify(f)
  return `/**
 * GERADO POR scripts/build-bgri.mjs — NÃO EDITAR À MÃO.
 *
 * Os Censos por subsecção estatística (BGRI 2021 e 2011 do INE), somados
 * por freguesia e pousados no desenho do mapa das freguesias.
 *
 * Verificado ao gerar:
 *   · a população de 2021 de cada freguesia é a dos Censos definitivos
 *     em \`parishes.ts\`, e os quatro grupos etários somam-na;
 *   · 2011 soma ${municipio.populacao2011.toLocaleString('pt-PT')} residentes, e as 31 freguesias de então
 *     caem nas 18 de hoje — ${desviados} residentes de 2011 ficaram noutra união
 *     que não a da sua freguesia antiga, por acertos de limites, e
 *     ${foraDoConcelho} subsecções de 2011 foram para a subsecção de 2021 mais próxima;
 *   · os pontos caem a menos de ${Math.ceil(desvioMax)} unidades da caixa de cada freguesia
 *     do mapa (a diferença é a simplificação do traçado).
 *
 * ${vazias} subsecções sem residentes ficam de fora dos pontos.
 */

export interface ParishCensus {
  populacao: number
  /** Residentes de 2011 na área da freguesia de hoje. */
  populacao2011: number
  /** 0–14, 15–24, 25–64 e 65 ou mais, em 2021. */
  idades: [number, number, number, number]
  /** 0–14 e 65 ou mais em 2011, para o índice de envelhecimento de então. */
  jovens2011: number
  idosos2011: number
  /** Alojamentos familiares clássicos de residência habitual. */
  alojamentosHabituais: number
  /** Os outros: vagos ou de residência secundária — o INE publica-os juntos. */
  alojamentosSemResidentes: number
  /** Fracção da área onde vive metade dos residentes, das subsecções mais densas para as menos. */
  metadeArea: number
}

export const CENSUS_PARISHES: Record<string, ParishCensus> = {
${codigos.map((fr) => `  '${fr}': ${linha(freguesias[fr])},`).join('\n')}
}

export const CENSUS_MUNICIPALITY: ParishCensus = ${linha(municipio)}

/** Código de freguesia de cada índice usado em \`CENSUS_POINTS\`. */
export const CENSUS_POINT_PARISHES = ${JSON.stringify(codigos)}

/**
 * Uma subsecção por linha: x e y do seu centro no desenho, residentes, e o
 * índice da freguesia em \`CENSUS_POINT_PARISHES\`. De trás para a frente
 * (y crescente), que é a ordem por que se desenham as espigas.
 */
export const CENSUS_POINTS: [number, number, number, number][] = ${JSON.stringify(pontos)}
`
}

if (PEDIR) await pedir()
if (!process.exitCode) await construir()
