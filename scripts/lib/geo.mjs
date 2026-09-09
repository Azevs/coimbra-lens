/**
 * Geometria partilhada pelos geradores de mapas.
 *
 * Extraído de `build-parish-map.mjs` quando o gerador das zonas verdes
 * passou a precisar do mesmo: os dois projectam para o mesmo viewBox e
 * pousam etiquetas pela mesma regra, e duas cópias divergiriam.
 */

/**
 * Contexto de desenho que arredonda enquanto escreve.
 *
 * O `geoPath` sem contexto emite coordenadas com toda a precisão do
 * double — dezassete dígitos por número, num ficheiro com milhares de
 * pontos. Arredondar depois, com uma expressão regular sobre o texto do
 * caminho, é frágil; arredondar aqui é exacto.
 */
export function roundingContext(digits) {
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

export function polylabel(rings, precision = 0.4) {
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
export function ringArea(ring) {
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
 * e essa escolha é o sentido da volta. As fontes seguem o RFC 7946, que
 * manda o contrário do d3. Com o sentido trocado o d3 lê "todo o planeta
 * excepto Coimbra": a área dá 12,57 esterradianos em vez de 7,9 × 10⁻⁶, e
 * o mapa inteiro colapsa num ponto a meio da caixa. Fica escrito para o
 * caso de alguém trocar a fonte e ver o mesmo ponto.
 */
export function rewind(geometry) {
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
export function projectedRings(geometry, projection) {
  const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates]
  return polygons
    .map((poly) => poly.map((ring) => ring.map((c) => projection(c)).filter(Boolean)))
    .sort((a, b) => Math.abs(ringArea(b[0])) - Math.abs(ringArea(a[0])))
}
