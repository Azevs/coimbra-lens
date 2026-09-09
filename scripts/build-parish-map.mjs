#!/usr/bin/env node
/**
 * Gerador da geometria das freguesias — `node scripts/build-parish-map.mjs`
 *
 * Escreve `lib/parish-map.ts`, que é o mapa do Território: 18 caminhos SVG
 * já projectados, mais o contorno do município e o ponto onde assenta cada
 * etiqueta. O ficheiro gerado entra no repositório; este script só volta a
 * correr quando a CAOP mudar.
 *
 * Porquê pré-calcular, em vez de projectar no browser:
 *
 *   · o mapa é fixo, e uma projecção fixa não precisa de ser recalculada a
 *     cada visita — o componente só desenha `d="..."`;
 *   · renderiza no servidor, e portanto existe sem JavaScript e não pisca;
 *   · dispensa o mapa de tiles: eram ~800 KB de mapbox-gl, um token e um
 *     pedido a um terceiro para mostrar 18 polígonos que nunca mudam.
 *
 * Três decisões que valem uma linha cada:
 *
 *   Fonte. A Carta Administrativa Oficial de Portugal (DGT), servida em
 *   GeoJSON pela geoapi.pt. Traz o DICOFRE e a área oficial de cada
 *   freguesia — a área é da carta, não medida por nós no polígono.
 *
 *   Simplificação. Feita em TopoJSON e não em cada polígono de per si. As
 *   fronteiras entre freguesias vizinhas são o mesmo arco partilhado, e
 *   simplificar o arco mantém-nas coincidentes. Polígono a polígono,
 *   abriam-se fendas brancas entre vizinhas.
 *
 *   Projecção. Transversa de Mercator sobre o meridiano central do
 *   PT-TM06 (-8,133108°), que é a projecção oficial do continente. À
 *   escala de um município a diferença para uma Mercator comum é
 *   invisível, mas não há razão para usar a errada.
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { geoPath, geoTransverseMercator } from 'd3-geo'
import { topology } from 'topojson-server'
import { presimplify, simplify, quantile } from 'topojson-simplify'
import { feature } from 'topojson-client'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'lib', 'parish-map.ts')

const SOURCE_URL = 'https://json.geoapi.pt/municipio/coimbra/freguesias'

/** Largura do viewBox. A altura sai do próprio território. */
const WIDTH = 1000
/** Margem, para o traço do contorno não ser cortado pela caixa. */
const PAD = 6
/**
 * Fracção de vértices retida. A 0,2 sobram ~3400 pontos para 17 km de
 * território: cada unidade do viewBox vale 17 metros, e a diferença para a
 * carta completa deixa de existir no ecrã muito antes disso.
 */
const KEEP = 0.2
/** Casas decimais dos caminhos. A 0,1 unidade o desvio é sub-pixel. */
const DIGITS = 1

/** Meridiano central e latitude de origem do PT-TM06 (EPSG:3763). */
const PT_TM06 = { lon: -8.133108333, lat: 39.668258333 }

/**
 * Contexto de desenho que arredonda enquanto escreve.
 *
 * O `geoPath` sem contexto emite coordenadas com toda a precisão do
 * double — dezassete dígitos por número, num ficheiro com milhares de
 * pontos. Arredondar depois, com uma expressão regular sobre o texto do
 * caminho, é frágil; arredondar aqui é exacto.
 */
function roundingContext(digits) {
  const k = 10 ** digits
  let out = ''
  const n = (v) => String(Math.round(v * k) / k)
  return {
    moveTo(x, y) { out += `M${n(x)},${n(y)}` },
    lineTo(x, y) { out += `L${n(x)},${n(y)}` },
    closePath() { out += 'Z' },
    arc() {},
    take() { const s = out; out = ''; return s },
  }
}

/* ── Pólo de inacessibilidade ─────────────────────────────────────────────
   Onde pousar o nome. O centróide não serve: numa freguesia em ferradura
   ou em L cai fora do próprio polígono, e o nome fica a flutuar sobre a
   vizinha. O que serve é o centro da maior circunferência que cabe lá
   dentro — o algoritmo do polylabel, por subdivisão do quadrado com poda.
   O raio dessa circunferência diz também de quanto espaço dispomos, e é
   por ele que a etiqueta decide o corpo de letra. */

function segmentDistanceSq(px, py, a, b) {
  let x = a[0]
  let y = a[1]
  const dx = b[0] - x
  const dy = b[1] - y
  if (dx !== 0 || dy !== 0) {
    const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy)
    if (t > 1) { x = b[0]; y = b[1] } else if (t > 0) { x += dx * t; y += dy * t }
  }
  return (px - x) ** 2 + (py - y) ** 2
}

/** Distância de um ponto ao contorno; negativa fora do polígono. */
function signedDistance(x, y, rings) {
  let inside = false
  let minSq = Infinity
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i]
      const b = ring[j]
      if ((a[1] > y) !== (b[1] > y) && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) {
        inside = !inside
      }
      minSq = Math.min(minSq, segmentDistanceSq(x, y, a, b))
    }
  }
  const d = Math.sqrt(minSq)
  return inside ? d : -d
}

function polylabel(rings, precision = 0.4) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of rings[0]) {
    if (p[0] < minX) minX = p[0]
    if (p[1] < minY) minY = p[1]
    if (p[0] > maxX) maxX = p[0]
    if (p[1] > maxY) maxY = p[1]
  }
  const w = maxX - minX
  const h = maxY - minY
  const cellSize = Math.min(w, h)
  if (cellSize === 0) return { x: minX, y: minY, r: 0 }

  // O melhor que uma célula pode dar é a distância no seu centro mais a
  // meia-diagonal. Se nem isso bate o melhor conhecido, não se abre.
  const cell = (x, y, half) => {
    const d = signedDistance(x, y, rings)
    return { x, y, half, d, max: d + half * Math.SQRT2 }
  }

  const queue = []
  let half = cellSize / 2
  for (let x = minX; x < maxX; x += cellSize) {
    for (let y = minY; y < maxY; y += cellSize) {
      queue.push(cell(x + half, y + half, half))
    }
  }

  let best = cell(minX + w / 2, minY + h / 2, 0)
  while (queue.length) {
    queue.sort((a, b) => a.max - b.max)
    const c = queue.pop()
    if (c.d > best.d) best = c
    if (c.max - best.d <= precision) continue
    half = c.half / 2
    queue.push(
      cell(c.x - half, c.y - half, half),
      cell(c.x + half, c.y - half, half),
      cell(c.x - half, c.y + half, half),
      cell(c.x + half, c.y + half, half),
    )
  }
  return { x: best.x, y: best.y, r: best.d }
}

/** Área com sinal, pela fórmula do sapateiro. Positiva no sentido directo. */
function ringArea(ring) {
  let s = 0
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    s += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1]
  }
  return s / 2
}

/**
 * Inverte os anéis para a convenção do d3-geo: exterior no sentido
 * retrógrado, buracos no directo.
 *
 * Não é pedantismo. O d3-geo trabalha em geometria esférica, onde um anel
 * fechado não delimita duas regiões mas escolhe qual delas é o interior —
 * e essa escolha é o sentido da volta. A fonte segue o RFC 7946, que manda
 * o contrário do d3. Com o sentido trocado o d3 lê "todo o planeta excepto
 * Coimbra": a área dá 12,57 esterradianos em vez de 7,9 × 10⁻⁶, e o mapa
 * inteiro colapsa num ponto a meio da caixa. Fica escrito para o caso de
 * alguém trocar a fonte e ver o mesmo ponto.
 */
function rewind(geometry) {
  const fix = (poly) =>
    poly.map((ring, i) => {
      const clockwise = ringArea(ring) < 0
      return (i === 0) === clockwise ? ring : ring.slice().reverse()
    })
  return geometry.type === 'MultiPolygon'
    ? { ...geometry, coordinates: geometry.coordinates.map(fix) }
    : { ...geometry, coordinates: fix(geometry.coordinates) }
}

/** Anéis de um polígono já projectado, do maior para o menor. */
function projectedRings(geometry, projection) {
  const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates]
  return polygons
    .map((poly) => poly.map((ring) => ring.map((c) => projection(c)).filter(Boolean)))
    .sort((a, b) => Math.abs(ringArea(b[0])) - Math.abs(ringArea(a[0])))
}

function countPoints(geometries) {
  let n = 0
  const walk = (a) => { if (Array.isArray(a[0])) a.forEach(walk); else n++ }
  for (const g of Object.values(geometries)) walk(g.coordinates)
  return n
}

async function main() {
  process.stdout.write(`A obter ${SOURCE_URL}\n`)
  const res = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(60000) })
  if (!res.ok) throw new Error(`geoapi.pt respondeu ${res.status}`)
  const data = await res.json()

  const parishes = data.geojsons.freguesias
  if (!Array.isArray(parishes) || parishes.length !== 18) {
    throw new Error(`Esperavam-se 18 freguesias, vieram ${parishes?.length}`)
  }

  // Um objecto por freguesia, mais o município, na mesma topologia: é isso
  // que faz as fronteiras vizinhas serem o mesmo arco.
  const objects = { municipio: rewind(data.geojsons.municipio.geometry) }
  for (const f of parishes) objects[f.properties.dtmnfr] = rewind(f.geometry)

  const before = countPoints(objects)
  let topo = presimplify(topology(objects))
  topo = simplify(topo, quantile(topo, KEEP))
  const simplified = Object.fromEntries(
    Object.entries(topo.objects).map(([k, o]) => [k, feature(topo, o)]),
  )
  const after = countPoints(
    Object.fromEntries(Object.entries(simplified).map(([k, f]) => [k, f.geometry])),
  )

  const municipality = simplified.municipio
  const projection = geoTransverseMercator()
    .rotate([-PT_TM06.lon, 0])
    .center([0, PT_TM06.lat])
    .fitWidth(WIDTH - 2 * PAD, municipality)

  // Encostar o território ao canto; a altura sai do próprio território.
  const measure = geoPath(projection)
  const [[x0, y0], [, y1]] = measure.bounds(municipality)
  const [tx, ty] = projection.translate()
  projection.translate([tx - x0 + PAD, ty - y0 + PAD])
  const height = Math.ceil(y1 - y0 + 2 * PAD)

  const ctx = roundingContext(DIGITS)
  const path = geoPath(projection, ctx)
  const draw = (f) => { path(f); return ctx.take() }

  const byCode = new Map(parishes.map((f) => [f.properties.dtmnfr, f.properties]))
  const shapes = Object.entries(simplified)
    .filter(([code]) => code !== 'municipio')
    .map(([code, f]) => {
      const props = byCode.get(code)
      const rings = projectedRings(f.geometry, projection)
      const label = polylabel(rings[0])
      return {
        code,
        areaKm2: Number((props.area_ha / 100).toFixed(2)),
        d: draw(f),
        label: {
          x: Number(label.x.toFixed(1)),
          y: Number(label.y.toFixed(1)),
          r: Number(label.r.toFixed(1)),
        },
      }
    })
    .sort((a, b) => a.code.localeCompare(b.code))

  const outline = draw(municipality)
  const fetchedAt = new Date().toISOString().slice(0, 10)

  writeFileSync(OUT, render({ shapes, outline, height, fetchedAt }), 'utf8')

  const bytes = Buffer.byteLength(outline + shapes.map((s) => s.d).join(''))
  process.stdout.write(
    `${shapes.length} freguesias · ${before} → ${after} vértices · ` +
      `viewBox ${WIDTH}×${height} · ${(bytes / 1024).toFixed(0)} KB de caminhos\n` +
      `Escrito ${OUT}\n`,
  )
}

function render({ shapes, outline, height, fetchedAt }) {
  const rows = shapes
    .map(
      (s) =>
        `  {\n` +
        `    code: '${s.code}',\n` +
        `    areaKm2: ${s.areaKm2},\n` +
        `    label: { x: ${s.label.x}, y: ${s.label.y}, r: ${s.label.r} },\n` +
        `    d: '${s.d}',\n` +
        `  },`,
    )
    .join('\n')

  return `/**
 * GERADO POR scripts/build-parish-map.mjs — NÃO EDITAR À MÃO.
 *
 * Limites e áreas das 18 freguesias de Coimbra, da Carta Administrativa
 * Oficial de Portugal (DGT), obtidos em ${fetchedAt} através da geoapi.pt.
 *
 * Os caminhos já estão projectados (Transversa de Mercator, meridiano
 * central do PT-TM06) e escalados para o viewBox abaixo. Para os
 * actualizar, correr de novo o gerador.
 */

export interface ParishShape {
  /** Código DICOFRE, a chave que liga isto à população dos Censos. */
  code: string
  /** Área oficial da carta, km². Não é medida no polígono simplificado. */
  areaKm2: number
  /**
   * Onde pousar o nome: centro da maior circunferência inscrita, e o seu
   * raio — que diz quanto espaço a etiqueta tem para ocupar.
   */
  label: { x: number; y: number; r: number }
  /** Caminho SVG, em unidades do viewBox. */
  d: string
}

export const MAP_VIEW = { width: ${WIDTH}, height: ${height} }

/** Contorno do município, para o traço exterior. */
export const MUNICIPALITY_OUTLINE =
  '${outline}'

/** Data em que a geometria foi obtida da fonte. */
export const BOUNDARIES_FETCHED_AT = '${fetchedAt}'

export const PARISH_SHAPES: ParishShape[] = [
${rows}
]
`
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`)
  process.exit(1)
})
