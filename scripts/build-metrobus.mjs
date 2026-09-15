#!/usr/bin/env node
/**
 * Gerador do traçado do Metrobus — `npm run build:metrobus`
 *
 * Escreve `lib/metrobus.ts`: a via dedicada do Sistema de Mobilidade do
 * Mondego, em troços, cada um com o seu estado. O ficheiro gerado entra no
 * repositório, pelas razões de `build-green-spaces.mjs`: o Overpass falha
 * com frequência, e o traçado de uma via não muda de semana para semana.
 *
 * Decisões de recolha, todas visíveis no ficheiro gerado:
 *
 *   O que se desenha é a VIA, não o serviço. As relações de rota do OSM
 *   (`network=SMM`) estavam em Setembro de 2026 muito incompletas: a
 *   "Coimbra-B → Serpins" tinha 1,8 km de 40, e nenhuma chegava à Praça da
 *   República. A via dedicada, pelo contrário, está mapeada de ponta a ponta
 *   como `highway=busway` com o nome do sistema — e é infra-estrutura que
 *   existe no chão, não uma interpretação dos horários.
 *
 *   Onde o Metrobus partilha a rua com o resto do trânsito não há via
 *   dedicada, e o traço interrompe-se. Não se cose com geometria inventada:
 *   o salto no desenho é o que a cidade tem.
 *
 *   Estações não entram. O OSM tinha 15 das 42 marcadas; um mapa com um
 *   terço das estações lê-se como a rede inteira, e não é.
 *
 *   O estado de cada troço (em serviço / em obra) NÃO vem do OSM: vem da
 *   Metro Mondego, através da imprensa de 10 de Setembro de 2026 — o
 *   Metrobus passou a chegar a Coimbra-B e à Praça da República, e a linha
 *   dos hospitais só fica completa em 2027. O corte está em
 *   `SERVICE_LIMIT`, com a data; quando a linha dos hospitais abrir, é aí
 *   que se muda. Está no manifesto de frescura (`metrobus-em-servico`).
 *
 *   Os quilómetros contam a via uma vez. Onde está desenhada como duas
 *   faixas de sentido único lado a lado, cada uma conta metade.
 */

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'lib', 'metrobus.ts')

/**
 * Espelhos do Overpass. O `overpass.osm.ch` dos outros geradores fica de
 * fora: só tem a Suíça, e responde a Coimbra com zero elementos.
 */
const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador do metrobus)'

/** Caixa do corredor: de Coimbra-B a Serpins. */
const BBOX = '40.08,-8.47,40.24,-8.20'

const QUERY = `
[out:json][timeout:240];
way["highway"="busway"](${BBOX});
out geom tags;`

/**
 * Entra toda a `highway=busway` do corredor, com nome ou sem ele. Na
 * extracção de 2026-09-14, 19 das 114 não tinham nome nem operador — e eram
 * precisamente o troço junto ao Pediátrico, a entrada da Via Central e
 * pedaços do próprio corredor. Na caixa não há outra via reservada: as
 * faixas BUS dos SMTUC estão etiquetadas `busway=lane` na rua, não como via
 * própria.
 */

/**
 * A norte do Largo da Portagem, o que não é o corredor principal é o ramal
 * urbano (Via Central, Praça da República, hospitais). A sul, uma peça solta
 * é acesso a parque de material ou volta de inversão: fica fora do desenho e
 * da conta, e o ficheiro gerado diz quantas e quantos km.
 */
const URBAN_LAT = 40.205

/**
 * Até onde vai o serviço, fora do corredor principal.
 *
 * Desde 10 de Setembro de 2026 o ramal da Via Central tem serviço até à
 * Praça da República; daí para nascente, rumo aos hospitais, é via em obra.
 * O ponto é o centro da praça no OSM (way 110695628).
 */
const SERVICE_LIMIT = { lon: -8.41969, lat: 40.20953, asOf: '2026-09-10' }

/**
 * Piso de sanidade. A extracção de 2026-09-14 deu 40 km no corredor
 * principal; abaixo de 35 é a fonte que falhou, não a via que encolheu.
 */
const MIN_MAIN_KM = 35

/** Pontas a menos disto são o mesmo nó desenhado duas vezes, km. */
const JOIN_KM = 0.025

/** Uma faixa de sentido único é "par" de outra se correr a menos disto, km. */
const PAIR_KM = 0.04

/** Tolerância do Douglas-Peucker, em graus (~2 m). */
const SIMPLIFY_EPS = 0.00002

const EARTH_RADIUS_KM = 6371.0072
const RAD = Math.PI / 180

const dist = (a, b) => {
  const dLat = (b[1] - a[1]) * RAD
  const dLon = (b[0] - a[0]) * RAD
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * RAD) * Math.cos(b[1] * RAD) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}
const lineKm = (l) => l.reduce((n, p, i) => (i ? n + dist(l[i - 1], p) : 0), 0)

/** Distância de um ponto a uma linha, km (aproximação plana local). */
function pointToLine(p, line) {
  let best = Infinity
  const k = Math.cos(p[1] * RAD)
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1]
    const [bx, by] = line[i]
    const dx = (bx - ax) * k
    const dy = by - ay
    const len = dx * dx + dy * dy
    let t = len ? (((p[0] - ax) * k) * dx + (p[1] - ay) * dy) / len : 0
    t = Math.max(0, Math.min(1, t))
    best = Math.min(best, dist(p, [ax + t * (bx - ax), ay + t * (by - ay)]))
  }
  return best
}

async function fetchOverpass() {
  const failures = []
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      process.stdout.write(`A obter ${mirror}\n`)
      const res = await fetch(mirror, {
        method: 'POST',
        signal: AbortSignal.timeout(300000),
        headers: { 'User-Agent': USER_AGENT },
        body: new URLSearchParams({ data: QUERY }),
      })
      const text = await res.text()
      // O Overpass devolve HTML com 200 quando rejeita por carga.
      if (!text.trimStart().startsWith('{')) throw new Error(text.includes('too busy') || text.includes('timeout') ? 'servidor ocupado' : `HTTP ${res.status}, resposta não é JSON`)
      const osm = JSON.parse(text)
      if (!osm.elements?.length) throw new Error('respondeu sem elementos')
      return osm
    } catch (err) {
      process.stdout.write(`  falhou: ${err.message}\n`)
      failures.push(`${mirror}: ${err.message}`)
    }
  }
  throw new Error(`Nenhum espelho do Overpass respondeu.\n  ${failures.join('\n  ')}`)
}

/** Agrupa as vias em peças ligadas: pontas a menos de JOIN_KM de outra via. */
function components(ways) {
  const parent = ways.map((_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  for (let i = 0; i < ways.length; i++) {
    for (let j = i + 1; j < ways.length; j++) {
      const a = ways[i].coords
      const b = ways[j].coords
      const touches =
        [b[0], b[b.length - 1]].some((e) => a.some((p) => dist(p, e) < JOIN_KM)) ||
        [a[0], a[a.length - 1]].some((e) => b.some((p) => dist(p, e) < JOIN_KM))
      if (touches) parent[find(i)] = find(j)
    }
  }
  const groups = new Map()
  ways.forEach((w, i) => {
    const r = find(i)
    if (!groups.has(r)) groups.set(r, [])
    groups.get(r).push(w)
  })
  return [...groups.values()]
}

/**
 * Cose vias em linhas contínuas pelas pontas coincidentes. Não muda a
 * geometria: só evita que o traço animado recomece a cada via.
 */
function chain(lines) {
  const pool = lines.map((l) => l.slice())
  const out = []
  const same = (a, b) => dist(a, b) < 0.001
  while (pool.length) {
    let line = pool.pop()
    let grew = true
    while (grew) {
      grew = false
      for (let i = 0; i < pool.length; i++) {
        const s = pool[i]
        const head = line[0]
        const tail = line[line.length - 1]
        if (same(s[0], tail)) line = line.concat(s.slice(1))
        else if (same(s[s.length - 1], tail)) line = line.concat(s.slice().reverse().slice(1))
        else if (same(s[s.length - 1], head)) line = s.slice(0, -1).concat(line)
        else if (same(s[0], head)) line = s.slice().reverse().slice(0, -1).concat(line)
        else continue
        pool.splice(i, 1)
        grew = true
        break
      }
    }
    out.push(line)
  }
  return out
}

/** Douglas-Peucker sobre uma linha aberta, em graus. */
function simplify(line, eps) {
  if (line.length <= 2) return line
  const keep = new Uint8Array(line.length)
  keep[0] = keep[line.length - 1] = 1
  const stack = [[0, line.length - 1]]
  while (stack.length) {
    const [first, last] = stack.pop()
    let index = -1
    let maxSq = eps * eps
    const [ax, ay] = line[first]
    const [bx, by] = line[last]
    const dx = bx - ax
    const dy = by - ay
    const len = dx * dx + dy * dy
    for (let i = first + 1; i < last; i++) {
      const [px, py] = line[i]
      let t = len ? ((px - ax) * dx + (py - ay) * dy) / len : 0
      t = Math.max(0, Math.min(1, t))
      const sq = (px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2
      if (sq > maxSq) {
        maxSq = sq
        index = i
      }
    }
    if (index > 0) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }
  return line.filter((_, i) => keep[i])
}

/**
 * Parte uma via no limite do serviço: o que fica a poente da praça está em
 * serviço, o que segue para nascente está em obra. O ramal corre de poente
 * para nascente, da Baixa para os hospitais, por isso a longitude basta.
 */
function splitAtLimit(coords) {
  const inService = []
  const beyond = []
  let current = null
  let side = null
  for (const p of coords) {
    const s = p[0] <= SERVICE_LIMIT.lon ? 'in' : 'out'
    if (s !== side) {
      if (current && current.length > 1) (side === 'in' ? inService : beyond).push(current)
      // O ponto de corte pertence aos dois lados, para não ficar buraco.
      current = current ? [current[current.length - 1], p] : [p]
      side = s
    } else current.push(p)
  }
  if (current && current.length > 1) (side === 'in' ? inService : beyond).push(current)
  return { inService, beyond }
}

/**
 * Um percurso contínuo, para os autocarros da ilustração andarem.
 *
 * A via é um grafo, não uma linha: tem faixas de sentido único lado a lado,
 * voltas de inversão e acessos. Para o desenho isso não importa; para um
 * autocarro andar, sim — precisa de um caminho só, de ponta a ponta. É o
 * mais curto pela via entre as duas pontas, sem olhar aos sentidos: os dois
 * sentidos andam sobre ele, cada um desviado para o seu lado.
 */
function routeThrough(lines, start, end) {
  const key = (p) => `${p[0].toFixed(7)},${p[1].toFixed(7)}`
  const point = new Map()
  const adj = new Map()
  const lineOf = new Map()
  const link = (a, b) => {
    const ka = key(a)
    const kb = key(b)
    if (ka === kb) return
    const d = dist(a, b)
    for (const [k, p] of [[ka, a], [kb, b]]) {
      point.set(k, p)
      if (!adj.has(k)) adj.set(k, [])
    }
    adj.get(ka).push([kb, d])
    adj.get(kb).push([ka, d])
  }
  lines.forEach((l, i) => {
    for (let j = 1; j < l.length; j++) link(l[j - 1], l[j])
    for (const p of l) {
      const k = key(p)
      if (!lineOf.has(k)) lineOf.set(k, new Set())
      lineOf.get(k).add(i)
    }
  })

  // Uma ponta que não partilha nó com outra via liga-se ao ponto mais perto
  // de OUTRA via, até JOIN_KM — é a mesma tolerância que junta as peças.
  const all = [...point.entries()]
  lines.forEach((l, i) => {
    for (const e of [l[0], l[l.length - 1]]) {
      if (lineOf.get(key(e)).size > 1) continue
      let best = null
      let bestD = JOIN_KM
      for (const [k, p] of all) {
        if (lineOf.get(k).has(i)) continue
        const d = dist(p, e)
        if (d < bestD) {
          bestD = d
          best = p
        }
      }
      if (best) link(e, best)
    }
  })

  const nearest = (target) => all.reduce((a, b) => (dist(b[1], target) < dist(a[1], target) ? b : a))[0]
  const from = nearest(start)
  const to = nearest(end)

  // Dijkstra com um monte binário: são milhares de nós, não milhões.
  const best = new Map([[from, 0]])
  const prev = new Map()
  const heap = [[0, from]]
  const push = (item) => {
    heap.push(item)
    let i = heap.length - 1
    while (i > 0) {
      const up = (i - 1) >> 1
      if (heap[up][0] <= heap[i][0]) break
      ;[heap[up], heap[i]] = [heap[i], heap[up]]
      i = up
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()
    if (heap.length) {
      heap[0] = last
      let i = 0
      for (;;) {
        const l = 2 * i + 1
        const r = l + 1
        let m = i
        if (l < heap.length && heap[l][0] < heap[m][0]) m = l
        if (r < heap.length && heap[r][0] < heap[m][0]) m = r
        if (m === i) break
        ;[heap[m], heap[i]] = [heap[i], heap[m]]
        i = m
      }
    }
    return top
  }
  while (heap.length) {
    const [d, k] = pop()
    if (k === to) break
    if (d > best.get(k)) continue
    for (const [n, w] of adj.get(k)) {
      const nd = d + w
      if (nd < (best.get(n) ?? Infinity)) {
        best.set(n, nd)
        prev.set(n, k)
        push([nd, n])
      }
    }
  }
  if (!best.has(to)) return null

  const path = [to]
  while (path[path.length - 1] !== from) path.push(prev.get(path[path.length - 1]))
  return path.reverse().map((k) => point.get(k))
}

async function main() {
  const osm = await fetchOverpass()

  const ways = osm.elements
    .filter((w) => w.type === 'way' && w.geometry?.length > 1)
    .map((w) => ({
      id: w.id,
      oneway: w.tags.oneway === 'yes',
      coords: w.geometry.map((g) => [g.lon, g.lat]),
    }))

  // Metade do comprimento para cada faixa de sentido único com par ao lado:
  // é a mesma via, desenhada uma vez por sentido.
  for (const w of ways) {
    w.weight = 1
    if (!w.oneway) continue
    const mid = w.coords[Math.floor(w.coords.length / 2)]
    const paired = ways.some((o) => o !== w && o.oneway && pointToLine(mid, o.coords) < PAIR_KM)
    if (paired) w.weight = 0.5
  }

  const pieces = components(ways)
    .map((ws) => ({ ws, km: ws.reduce((n, w) => n + lineKm(w.coords) * w.weight, 0) }))
    .sort((a, b) => b.km - a.km)

  const [main, ...rest] = pieces
  if (!main || main.km < MIN_MAIN_KM) {
    throw new Error(
      `O corredor principal tem ${main ? main.km.toFixed(1) : 0} km — esperavam-se pelo menos ${MIN_MAIN_KM}. ` +
        `A fonte respondeu mal; o ficheiro anterior fica como está.`,
    )
  }

  // Fora do corredor principal: a norte da Portagem é o ramal urbano, que se
  // divide no limite do serviço; a sul, peças soltas que ficam de fora.
  const urban = rest.filter(({ ws }) => ws.every((w) => w.coords.every(([, lat]) => lat > URBAN_LAT)))
  const loose = rest.filter((p) => !urban.includes(p))
  const dropped = { count: loose.length, km: loose.reduce((n, p) => n + p.km, 0) }

  let branchKm = 0
  let worksKm = 0
  const branchLines = []
  const worksLines = []
  for (const { ws } of urban) {
    for (const w of ws) {
      const { inService, beyond } = splitAtLimit(w.coords)
      for (const l of inService) {
        branchLines.push(l)
        branchKm += lineKm(l) * w.weight
      }
      for (const l of beyond) {
        worksLines.push(l)
        worksKm += lineKm(l) * w.weight
      }
    }
  }

  const round = (l) => simplify(l, SIMPLIFY_EPS).map(([x, y]) => [Number(x.toFixed(5)), Number(y.toFixed(5))])
  const sections = [
    {
      id: 'corredor',
      name: 'Coimbra-B – Serpins',
      note: 'Pela Portagem, Vale das Flores, Ceira, Miranda do Corvo e Lousã',
      status: 'servico',
      km: main.km,
      coords: chain(main.ws.map((w) => w.coords)).map(round),
    },
    {
      id: 'republica',
      name: 'Via Central – Praça da República',
      note: 'Em serviço desde 10 de Setembro de 2026',
      status: 'servico',
      km: branchKm,
      coords: chain(branchLines).map(round),
    },
    {
      id: 'hospitais',
      name: 'Rumo aos hospitais',
      note: 'Via construída, ainda sem serviço',
      status: 'obra',
      km: worksKm,
      coords: chain(worksLines).map(round),
    },
  ].filter((s) => s.coords.length && s.km > 0.05)

  // Os percursos da ilustração: só onde há serviço. Coimbra-B é a ponta
  // mais a norte do corredor, Serpins a mais a nascente; o ramal corre da
  // Via Central (poente) para a Praça da República (nascente).
  const mainPts = main.ws.flatMap((w) => w.coords)
  const corridorPath = routeThrough(
    main.ws.map((w) => w.coords),
    mainPts.reduce((a, p) => (p[1] > a[1] ? p : a)),
    mainPts.reduce((a, p) => (p[0] > a[0] ? p : a)),
  )
  if (!corridorPath || lineKm(corridorPath) < MIN_MAIN_KM) {
    throw new Error(
      `O percurso de Coimbra-B a Serpins tem ${corridorPath ? lineKm(corridorPath).toFixed(1) : 0} km pela via — ` +
        `esperavam-se pelo menos ${MIN_MAIN_KM}. Há um buraco no grafo; nada foi escrito.`,
    )
  }
  const pathRound = (l) => simplify(l, SIMPLIFY_EPS / 2).map(([x, y]) => [Number(x.toFixed(5)), Number(y.toFixed(5))])
  const paths = [{ id: 'corredor', coords: pathRound(corridorPath) }]
  const branchPts = branchLines.flat()
  if (branchPts.length) {
    const branchPath = routeThrough(
      branchLines,
      branchPts.reduce((a, p) => (p[0] < a[0] ? p : a)),
      branchPts.reduce((a, p) => (p[0] > a[0] ? p : a)),
    )
    if (branchPath) paths.push({ id: 'republica', coords: pathRound(branchPath) })
  }

  const fetchedAt = new Date().toISOString().slice(0, 10)
  const osmBase = osm.osm3s?.timestamp_osm_base?.slice(0, 10) ?? fetchedAt

  writeFileSync(OUT, render({ sections, paths, fetchedAt, osmBase, wayCount: ways.length, dropped }), 'utf8')
  process.stdout.write(paths.map((p) => `Percurso ${p.id}: ${lineKm(p.coords).toFixed(2)} km, ${p.coords.length} pontos\n`).join(''))

  const points = sections.reduce((n, s) => n + s.coords.reduce((m, l) => m + l.length, 0), 0)
  process.stdout.write(
    `${ways.length} vias do sistema em ${pieces.length} peças · ${points} pontos\n` +
      `Fora do desenho: ${dropped.count} peças soltas a sul da Portagem, ${dropped.km.toFixed(2)} km\n` +
      sections.map((s) => `  ${s.name} (${s.status}): ${s.km.toFixed(2)} km em ${s.coords.length} linhas`).join('\n') +
      `\nEscrito ${OUT}\n`,
  )
}

function render({ sections, paths, fetchedAt, osmBase, wayCount, dropped }) {
  const rows = sections
    .map(
      (s) =>
        `  {\n` +
        `    id: '${s.id}',\n` +
        `    name: '${s.name}',\n` +
        `    note: '${s.note}',\n` +
        `    status: '${s.status}',\n` +
        `    km: ${s.km.toFixed(2)},\n` +
        `    coords: ${JSON.stringify(s.coords)},\n` +
        `  },`,
    )
    .join('\n')

  return `/**
 * GERADO POR scripts/build-metrobus.mjs — NÃO EDITAR À MÃO.
 *
 * A via dedicada do Metrobus (Sistema de Mobilidade do Mondego): as
 * ${wayCount} vias \`highway=busway\` do corredor Coimbra-B – Serpins no
 * OpenStreetMap, obtidas em ${fetchedAt} (base do OSM de ${osmBase}).
 *
 * É a VIA, não o serviço: onde o Metrobus partilha a rua, não há traço. O
 * estado de cada troço vem da Metro Mondego (${SERVICE_LIMIT.asOf}), não do OSM —
 * ver o cabeçalho do gerador.
 *
 * Ficaram fora do desenho e da conta ${dropped.count} peças soltas a sul da Portagem
 * (${dropped.km.toFixed(2)} km), desligadas do corredor: acessos e voltas de inversão.
 */

export type MetrobusStatus = 'servico' | 'obra'

export interface MetrobusSection {
  id: string
  name: string
  /** Por onde passa, ou o que falta. */
  note: string
  status: MetrobusStatus
  /** Via contada uma vez: faixas de sentido único em par contam metade. */
  km: number
  /** Linhas [lon, lat], em graus. */
  coords: [number, number][][]
}

/** Data em que a geometria foi obtida da fonte. */
export const METROBUS_FETCHED_AT = '${fetchedAt}'

/** Data da base de dados do OSM usada na extracção. */
export const METROBUS_OSM_BASE = '${osmBase}'

/** Data do estado de serviço de cada troço. */
export const METROBUS_SERVICE_AS_OF = '${SERVICE_LIMIT.asOf}'

export const METROBUS_SECTIONS: MetrobusSection[] = [
${rows}
]

/**
 * Percursos contínuos por onde anda a ilustração: o caminho mais curto pela
 * via entre as pontas de cada troço em serviço. Não são linhas de serviço
 * nem horários — são o chão onde os autocarros desenhados assentam.
 */
export const METROBUS_PATHS: { id: string; coords: [number, number][] }[] = ${JSON.stringify(paths)}
`
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`)
  process.exit(1)
})
