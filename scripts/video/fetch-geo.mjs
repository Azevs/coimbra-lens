// Geometria para o vídeo: o curso do Mondego à volta de Coimbra (OSM) e o
// contorno de Portugal continental (Natural Earth, via world-atlas).
// Corre uma vez; o resultado fica em data/geo.json.
//
//   node scripts/video/fetch-geo.mjs

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))

const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]

async function overpass(q) {
  let erro
  for (const url of OVERPASS) {
    try {
      const r = await fetch(url, { method: 'POST', body: 'data=' + encodeURIComponent(q) })
      if (r.ok) return await r.json()
      erro = url + ' ' + r.status
    } catch (e) {
      erro = url + ' ' + e.message
    }
  }
  throw new Error(erro)
}

// Junta troços de linha pelas pontas até sobrar a cadeia mais comprida.
function coser(tracos) {
  const k = (p) => p[0].toFixed(6) + ',' + p[1].toFixed(6)
  const livres = tracos.map((t) => t.slice())
  let melhor = []
  while (livres.length) {
    let cadeia = livres.shift()
    let mudou = true
    while (mudou) {
      mudou = false
      for (let i = 0; i < livres.length; i++) {
        const t = livres[i]
        if (k(t[0]) === k(cadeia.at(-1))) cadeia = cadeia.concat(t.slice(1))
        else if (k(t.at(-1)) === k(cadeia.at(-1))) cadeia = cadeia.concat(t.slice(0, -1).reverse())
        else if (k(t.at(-1)) === k(cadeia[0])) cadeia = t.concat(cadeia.slice(1))
        else if (k(t[0]) === k(cadeia[0])) cadeia = t.slice(1).reverse().concat(cadeia)
        else continue
        livres.splice(i, 1)
        mudou = true
        break
      }
    }
    if (cadeia.length > melhor.length) melhor = cadeia
  }
  return melhor
}

// Douglas–Peucker simples, em graus (chega para desenho).
function simplificar(pts, tol) {
  if (pts.length < 3) return pts
  let dmax = 0, idx = 0
  const [a, b] = [pts[0], pts.at(-1)]
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const l2 = dx * dx + dy * dy || 1e-12
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2))
    const d = Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
    if (d > dmax) (dmax = d), (idx = i)
  }
  if (dmax <= tol) return [a, b]
  return simplificar(pts.slice(0, idx + 1), tol).slice(0, -1).concat(simplificar(pts.slice(idx), tol))
}

const r = (n) => Math.round(n * 1e5) / 1e5

const osm = await overpass(`[out:json][timeout:90];
  way["waterway"="river"]["name"~"Mondego"](40.10,-8.75,40.30,-8.25);
  out geom;`)
const tracos = osm.elements.filter((e) => e.geometry).map((e) => e.geometry.map((g) => [g.lon, g.lat]))
let rio = coser(tracos)
if (rio[0][0] > rio.at(-1)[0]) rio.reverse() // de poente para nascente
rio = simplificar(rio, 0.0004).map(([x, y]) => [r(x), r(y)])
console.error('Mondego:', tracos.length, 'troços →', rio.length, 'pontos')

// Contorno de Portugal continental (Natural Earth 1:50m).
const topo = await (await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')).json()
const { feature } = await import('topojson-client')
const pt = feature(topo, topo.objects.countries).features.find((f) => f.id === '620')
const aneis = (pt.geometry.type === 'Polygon' ? [pt.geometry.coordinates] : pt.geometry.coordinates)
  .map((p) => p[0])
  .filter((anel) => anel.every(([x]) => x > -10)) // só o continente
const portugal = simplificar(aneis.sort((a, b) => b.length - a.length)[0], 0.02).map(([x, y]) => [r(x), r(y)])
console.error('Portugal:', portugal.length, 'pontos')

mkdirSync(join(AQUI, 'data'), { recursive: true })
writeFileSync(join(AQUI, 'data', 'geo.json'), JSON.stringify({ rio, portugal, coimbra: [-8.4292, 40.2089] }))
