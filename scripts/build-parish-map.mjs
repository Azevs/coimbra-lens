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

import { roundingContext, polylabel, rewind, projectedRings } from './lib/geo.mjs'

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
