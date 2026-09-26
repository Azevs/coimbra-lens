import { MAP_VIEW, PARISH_SHAPES } from './parish-map'
import { WATER } from './green-spaces'

/**
 * Medidas tiradas dos próprios desenhos das freguesias, para o mapa do
 * Território não depender de números escritos à mão: a escala, a caixa de
 * cada forma, o sítio do nome do rio e a vista proporcional.
 */

type Point = [number, number]

/** Os anéis de um caminho `M…L…Z`, como o gerador os escreve. */
export function pathRings(d: string): Point[][] {
  return d
    .split('M')
    .filter(Boolean)
    .map((ring) =>
      ring
        .replace(/Z/g, '')
        .split('L')
        .map((p) => p.split(',').map(Number) as Point),
    )
}

function ringArea(ring: Point[]): number {
  let a = 0
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i]
    const [x2, y2] = ring[(i + 1) % ring.length]
    a += x1 * y2 - x2 * y1
  }
  return a / 2
}

/** Área do desenho, em unidades do viewBox ao quadrado. */
export function pathArea(d: string): number {
  return Math.abs(pathRings(d).reduce((sum, ring) => sum + ringArea(ring), 0))
}

/** Caixa do desenho: x0, y0, x1, y1. */
export function pathBox(d: string): [number, number, number, number] {
  let x0 = Infinity
  let y0 = Infinity
  let x1 = -Infinity
  let y1 = -Infinity
  for (const ring of pathRings(d)) {
    for (const [x, y] of ring) {
      if (x < x0) x0 = x
      if (y < y0) y0 = y
      if (x > x1) x1 = x
      if (y > y1) y1 = y
    }
  }
  return [x0, y0, x1, y1]
}

/**
 * Quantas unidades do desenho mede um quilómetro.
 *
 * Sai da comparação entre a área de cada forma no desenho e a área oficial
 * que a carta lhe dá. As dezoito concordam entre si a menos de 1,5%, que é
 * o que a simplificação do traçado come.
 */
export const PARISH_DRAWN_AREA: Record<string, number> = Object.fromEntries(
  PARISH_SHAPES.map((s) => [s.code, pathArea(s.d)]),
)

export const UNITS_PER_KM = Math.sqrt(
  Object.values(PARISH_DRAWN_AREA).reduce((sum, a) => sum + a, 0) /
    PARISH_SHAPES.reduce((sum, s) => sum + s.areaKm2, 0),
)

/** A caixa de cada freguesia, para as miniaturas. */
export const PARISH_BOXES: Record<string, [number, number, number, number]> = Object.fromEntries(
  PARISH_SHAPES.map((s) => [s.code, pathBox(s.d)]),
)

/** O centro da caixa do município — o ponto de onde as peças se afastam. */
export const MUNICIPALITY_CENTER: Point = (() => {
  const boxes = Object.values(PARISH_BOXES)
  const x0 = Math.min(...boxes.map((b) => b[0]))
  const y0 = Math.min(...boxes.map((b) => b[1]))
  const x1 = Math.max(...boxes.map((b) => b[2]))
  const y1 = Math.max(...boxes.map((b) => b[3]))
  return [(x0 + x1) / 2, (y0 + y1) / 2]
})()

/**
 * Onde escrever "Mondego".
 *
 * Na cidade o rio passa colado ao nome da união do centro, e ali o nome
 * cairia em cima dele. Escreve-se no Baixo Mondego, a jusante: o ponto do
 * eixo mais afastado dos nomes das freguesias, entre os troços que correm
 * quase na horizontal. O eixo mais longo que sai para poente é o Mondego —
 * o Ceira e o Dueça entram pelo nascente.
 */
export const MONDEGO_LABEL: { x: number; y: number; angle: number } | null = (() => {
  const lines = pathRings(WATER.lines)
  const west = lines
    .filter((line) => Math.min(...line.map((p) => p[0])) < 0)
    .sort((a, b) => b.length - a.length)[0]
  if (!west) return null

  let best: { x: number; y: number; angle: number; score: number } | null = null
  for (let i = 3; i < west.length - 3; i++) {
    const [x, y] = west[i]
    if (x < 60 || x > MAP_VIEW.width * 0.5) continue
    const [ax, ay] = west[i - 3]
    const [bx, by] = west[i + 3]
    let angle = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI
    if (angle > 90) angle -= 180
    if (angle < -90) angle += 180
    if (Math.abs(angle) > 35) continue
    const score = Math.min(
      ...PARISH_SHAPES.map((s) => Math.hypot((s.label.x - x) * 0.7, s.label.y - y)),
    )
    if (!best || score > best.score) best = { x, y, angle, score }
  }
  return best && { x: best.x, y: best.y, angle: best.angle }
})()

export interface Square {
  code: string
  /** Centro do quadrado, em unidades do desenho. */
  x: number
  y: number
  side: number
}

/**
 * A vista proporcional: cada freguesia um quadrado com área proporcional
 * aos habitantes, pousado perto de onde a freguesia fica.
 *
 * Os quadrados nascem pequenos no ponto do nome de cada freguesia e crescem
 * aos poucos, afastando-se uns dos outros enquanto crescem. Crescer de uma
 * vez fazia vizinhos de tamanho parecido trocarem de lado — o centro
 * histórico aparecia a poente de São Martinho do Bispo.
 *
 * A escala é a maior em que os dezoito cabem no desenho sem se tocarem.
 * Começa na área que cada freguesia teria à densidade média do concelho
 * e desce aos poucos: a essa escala, Santo António dos Olivais e os seus
 * vizinhos de linha já não cabem na largura. Corre no servidor, uma vez.
 */
export function proportionalLayout(rows: { code: string; population: number }[]): {
  squares: Square[]
  /** Unidades de desenho ao quadrado por habitante. */
  unitsPerPerson: number
} {
  const shapes = new Map(PARISH_SHAPES.map((s) => [s.code, s]))
  const drawn = rows.filter((r) => shapes.has(r.code))
  const totalArea = drawn.reduce((sum, r) => sum + PARISH_DRAWN_AREA[r.code], 0)
  const totalPop = drawn.reduce((sum, r) => sum + r.population, 0)
  const GAP = 8
  const MARGIN = 6
  const STEPS = 1500

  for (let f = 1; f > 0.3; f -= 0.05) {
    const unitsPerPerson = (f * totalArea) / totalPop
    const sq = drawn.map((r) => {
      const s = shapes.get(r.code)!
      return {
        code: r.code,
        ox: s.label.x,
        oy: s.label.y,
        x: s.label.x,
        y: s.label.y,
        side: Math.sqrt(unitsPerPerson * r.population),
      }
    })

    for (let it = 0; it < STEPS; it++) {
      const grow = Math.min(1, 0.15 + it / (STEPS * 0.6))
      for (let i = 0; i < sq.length; i++) {
        for (let j = i + 1; j < sq.length; j++) {
          const a = sq[i]
          const b = sq[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const need = (grow * (a.side + b.side)) / 2 + GAP
          const ox = need - Math.abs(dx)
          const oy = need - Math.abs(dy)
          if (ox <= 0 || oy <= 0) continue
          // O maior mexe-se menos: é ele que segura a geografia.
          const wa = b.side ** 2 / (a.side ** 2 + b.side ** 2)
          const wb = 1 - wa
          if (ox < oy) {
            const s = Math.sign(dx) || 1
            a.x -= s * ox * wa
            b.x += s * ox * wb
          } else {
            const s = Math.sign(dy) || 1
            a.y -= s * oy * wa
            b.y += s * oy * wb
          }
        }
      }
      const pull = it < STEPS * 0.8 ? 0.01 : 0
      for (const a of sq) {
        a.x += (a.ox - a.x) * pull
        a.y += (a.oy - a.y) * pull
        const h = (grow * a.side) / 2 + MARGIN
        a.x = Math.min(Math.max(a.x, h), MAP_VIEW.width - h)
        a.y = Math.min(Math.max(a.y, h), MAP_VIEW.height - h)
      }
    }

    const clear = sq.every((a, i) =>
      sq.every(
        (b, j) =>
          j <= i ||
          Math.abs(b.x - a.x) >= (a.side + b.side) / 2 + 1 ||
          Math.abs(b.y - a.y) >= (a.side + b.side) / 2 + 1,
      ),
    )
    if (clear) {
      return {
        squares: sq.map(({ code, x, y, side }) => ({
          code,
          x: Math.round(x * 10) / 10,
          y: Math.round(y * 10) / 10,
          side: Math.round(side * 10) / 10,
        })),
        unitsPerPerson,
      }
    }
  }
  return { squares: [], unitsPerPerson: 0 }
}
