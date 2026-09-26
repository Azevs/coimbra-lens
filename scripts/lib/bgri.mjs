/**
 * Leitura da BGRI do INE (geopackages de `scripts/data/bgri/`), partilhada
 * pelo gerador do Território (`build-bgri.mjs`) e pelo das zonas urbanas
 * (`build-zona-censos.mjs`). Tudo em metros do PT-TM06.
 */

import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'bgri')

/** O geopackage extraído de um ano, se já existir. */
export function gpkgPath(ano) {
  if (!existsSync(DIR)) return null
  const f = readdirSync(DIR).find((n) => n.toLowerCase().endsWith('.gpkg') && n.includes(String(ano)))
  return f ? join(DIR, f) : null
}

/**
 * Lê a geometria de um geopackage: um cabeçalho "GP" com o envelope,
 * seguido de WKB. Só há polígonos e multipolígonos na BGRI. Devolve os
 * polígonos como listas de anéis, em metros do PT-TM06.
 */
export function lerGeometria(blob) {
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
export function areaECentro(polys) {
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

export function dentro(x, y, polys) {
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

