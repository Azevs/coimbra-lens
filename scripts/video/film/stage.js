// O palco: a colina da Alta vista da margem esquerda, com o Mondego à frente.
// Cada época acrescenta a sua camada — fórum romano, muralha e Sé, paço e
// torre, casario — e cada cena liga ou desliga as camadas que lhe tocam.

const RIVER_Y = 872
let RISE = 1 // a colina a nascer do rio, na abertura
let TINT = [255, 255, 255]
// Cor base multiplicada pela luz da cena (como um filtro de "multiply").
const tc = (c, fogAmt = 0, fog = null) => {
  let [r, g, b] = rgb(c)
  if (fog && fogAmt) { const F = rgb(fog); r = lerp(r, F[0], fogAmt); g = lerp(g, F[1], fogAmt); b = lerp(b, F[2], fogAmt) }
  return [(r * TINT[0]) / 255, (g * TINT[1]) / 255, (b * TINT[2]) / 255]
}
const tcss = (c, a = 1) => css(tc(c), a)

function hillY(x) {
  // a Alta: encosta íngreme sobre o rio, um ombro a meio (onde fica a Sé),
  // planalto no topo (o paço) e, a nascente, outra colina mais baixa
  const g = (c, w, e) => Math.exp(-Math.pow(Math.abs((x - c) / w), e))
  const h = 470 * g(1160, 470, 3.2) + 70 * g(840, 170, 2) + 300 * g(2050, 420, 2.2) + 10 * fbm(x * 0.005 + 3, 3)
  return 874 - h * RISE
}

// ---------- casario ----------
const WALLS = ['#F1EADB', '#F4EFE6', '#EBD9A8', '#E9C98E', '#E6BBA6', '#D7DCD8', '#EFE2C6', '#F2E6D0']
const ROOFS = ['#B5523A', '#C4643F', '#A4452F', '#B8603F', '#9C4A34']
let HOUSES = []
function makeHouses() {
  const r = rng(1131)
  const H0 = []
  // zonas reservadas aos monumentos: [x0, x1, yTopo, yBase]
  const livres = reserved()
  for (let x = 170; x < 1900; x += 18 + r() * 16) {
    const top = hillY(x)
    for (let y = top + 18 + r() * 10; y < RIVER_Y - 6; y += 22 + r() * 12) {
      const w = 22 + r() * 26, h = 20 + r() * 22 + (y > 780 ? 8 : 0)
      if (livres.some(([a, b, t0, t1]) => x + w / 2 > a && x - w / 2 < b && y > t0 && y - h < t1)) continue
      if (r() < 0.12) continue
      const dist = Math.abs(x - 1150) / 800 + (y - top) / 600
      const era = x > 700 && x < 1500 && y < 700 && r() < 0.55 ? 1 : r() < 0.25 ? 1 : 2
      H0.push({
        x, y, w, h,
        roof: 7 + r() * 9,
        gable: r() < 0.35,
        wall: WALLS[(r() * WALLS.length) | 0],
        roofc: ROOFS[(r() * ROOFS.length) | 0],
        win: 1 + ((r() * 3) | 0),
        floors: h > 34 ? 2 : 1,
        lit: r(),
        era,
        order: r() * 0.25 + dist * 0.75,
        tree: r() < 0.06,
      })
    }
  }
  const mo = Math.max(...H0.map((h) => h.order))
  H0.forEach((h) => (h.order /= mo))
  HOUSES = H0.sort((a, b) => a.y - b.y)
}

function drawHouse(hs, v, night, roman = false) {
  if (v <= 0.001) return
  const s = E.back(clamp(v))
  const { x, y } = hs
  const w = roman ? hs.w * 1.35 : hs.w
  const h = (roman ? 13 + hs.h * 0.25 : hs.h) * s, roof = (roman ? 7 : hs.roof) * s
  X.fillStyle = tcss(hs.wall)
  X.fillRect(x - w / 2, y - h, w, h + 30)
  // sombra lateral: dá volume ao casario
  X.fillStyle = css(tc('#6B5A4A'), 0.18)
  X.fillRect(x + w / 2 - w * 0.22, y - h, w * 0.22, h + 30)
  X.fillStyle = tcss(hs.roofc)
  X.beginPath()
  if (hs.gable) { X.moveTo(x - w / 2 - 2, y - h); X.lineTo(x, y - h - roof); X.lineTo(x + w / 2 + 2, y - h) }
  else { X.moveTo(x - w / 2 - 2, y - h); X.lineTo(x - w / 2 + 3, y - h - roof * 0.7); X.lineTo(x + w / 2 - 3, y - h - roof * 0.7); X.lineTo(x + w / 2 + 2, y - h) }
  X.fill()
  // janelas
  const nw = roman ? 1 : hs.win, fl = roman ? 1 : hs.floors
  for (let f = 0; f < fl; f++) {
    for (let i = 0; i < nw; i++) {
      const wx = x - w / 2 + ((i + 0.5) * w) / nw - 2.5
      const wy = y - h + 6 + f * 16
      if (wy + 7 > y) continue
      const aceso = night > 0 && hs.lit + ((i * 7 + f * 3) % 5) * 0.05 < night * 0.9
      X.fillStyle = aceso ? css('#FFC96B', 0.95) : tcss('#3D3A40', 0.75)
      X.fillRect(wx, wy, 5, 7)
      if (aceso) glow(wx + 2.5, wy + 3.5, 14, '#FFB347', 0.18)
    }
  }
}

// ---------- desenhos de monumentos ----------
// Cada monumento é uma lista de peças {pts, fill}. Desenha-se primeiro o
// traço (a "planta" dourada) e depois o enchimento de cor.
function part(pts, fill, a = 1) { return { pts, fill, a } }

function mkTower() {
  const P = []
  const w = 46, h = 150
  P.push(part(rect(-w / 2, -h, w, h), '#EFE6D2'))
  P.push(part(rect(-w / 2 - 4, -h - 8, w + 8, 8), '#E2D5BC'))
  // andar dos sinos
  P.push(part(rect(-w / 2 + 2, -h - 48, w - 4, 40), '#EFE6D2'))
  P.push(part(archPts(-9, -h - 12, 18, 30), '#3A3440'))
  P.push(part(rect(-w / 2 - 5, -h - 54, w + 10, 6), '#E2D5BC'))
  // balaustrada e pináculos
  for (const px of [-w / 2 - 2, w / 2 - 4]) P.push(part([[px, -h - 54], [px + 6, -h - 54], [px + 5, -h - 66], [px + 3, -h - 72], [px + 1, -h - 66], [px, -h - 54]], '#E2D5BC'))
  P.push(part(rect(-w / 2, -h - 62, w, 8), '#EFE6D2'))
  // lanterna e cúpula
  P.push(part(rect(-11, -h - 88, 22, 26), '#EFE6D2'))
  P.push(part(arcPts(0, -h - 88, 12, 12, PI, TAU, 14), '#D9C9A8'))
  P.push(part([[0, -h - 100], [0, -h - 112]], null))
  // relógio
  P.push(part(arcPts(0, -h + 26, 11, 11, 0, TAU, 28), '#F7F1E4'))
  // janelas do fuste
  for (const yy of [-h + 58, -h + 98]) P.push(part(rect(-5, yy, 10, 16), '#3A3440'))
  // pilastras
  P.push(part([[-w / 2 + 5, 0], [-w / 2 + 5, -h]], null))
  P.push(part([[w / 2 - 5, 0], [w / 2 - 5, -h]], null))
  return P
}
function mkPaco() {
  const P = []
  // corpo longo do paço, dois pisos
  P.push(part(rect(-150, -58, 300, 58), '#EEE3CC'))
  P.push(part([[-156, -58], [-150, -70], [150, -70], [156, -58], [-156, -58]], '#B5523A'))
  for (let i = 0; i < 12; i++) for (const yy of [-48, -24]) P.push(part(rect(-138 + i * 24, yy, 9, 13), '#3D3A40'))
  // Porta Férrea: arco triunfal
  P.push(part(rect(-196, -96, 52, 96), '#E4D6B8'))
  P.push(part(archPts(-182, 0, 24, 48), '#3A3440'))
  P.push(part([[-200, -96], [-170, -118], [-140, -96], [-200, -96]], '#E4D6B8'))
  P.push(part(rect(-176, -88, 12, 20), '#CBB999'))
  return P
}
function mkJoanina() {
  const P = []
  P.push(part(rect(-40, -74, 80, 74), '#E9D7A8'))
  P.push(part(archPts(-13, 0, 26, 48), '#5A3A2A'))
  P.push(part(rect(-40, -80, 80, 6), '#DCC58E'))
  P.push(part([[-22, -80], [-22, -94], [0, -110], [22, -94], [22, -80]], '#E9D7A8'))
  P.push(part(arcPts(0, -94, 7, 7, 0, TAU, 16), '#C99A3A'))
  for (const xx of [-34, 26]) P.push(part(rect(xx, -66, 8, 66), '#DCC58E'))
  return P
}
function mkSeVelha() {
  const P = []
  const w = 132, h = 72
  P.push(part(rect(-w / 2, -h, w, h), '#E6D8BC'))
  for (let i = 0; i < 11; i++) P.push(part(rect(-w / 2 + 2 + i * 12, -h - 8, 7, 8), '#E6D8BC'))
  // torre-lanterna do cruzeiro
  P.push(part(rect(22, -h - 34, 30, 34), '#DDCDAE'))
  P.push(part(arcPts(37, -h - 34, 15, 13, PI, TAU, 14), '#CDBB98'))
  // corpo central saliente
  P.push(part(rect(-26, -h - 34, 52, h + 34), '#EADDC3'))
  for (let i = 0; i < 4; i++) P.push(part(rect(-24 + i * 13, -h - 42, 8, 8), '#EADDC3'))
  P.push(part(archPts(-12, 0, 24, 40), '#3A3036'))
  P.push(part(archPts(-10, -h + 4, 20, 34), '#3A3036'))
  // contrafortes
  for (const xx of [-w / 2 + 14, w / 2 - 22]) P.push(part(rect(xx, -h + 10, 8, h - 10), '#DDCDAE'))
  return P
}
function mkSantaCruz() {
  const P = []
  P.push(part(rect(-44, -96, 88, 96), '#F1E9DA'))
  P.push(part([[-44, -96], [0, -122], [44, -96], [-44, -96]], '#EDE3CF'))
  P.push(part(archPts(-14, 0, 28, 54), '#403640'))
  P.push(part(archPts(-24, -58, 48, 34), '#E3D6BD'))
  for (let i = 0; i < 5; i++) P.push(part(rect(-18 + i * 8, -84, 4, 12), '#D5C4A4'))
  // torreões com pináculo
  for (const xx of [-56, 44]) {
    P.push(part(rect(xx, -118, 12, 118), '#EAE0CC'))
    P.push(part([[xx - 1, -118], [xx + 6, -142], [xx + 13, -118], [xx - 1, -118]], '#DCCFB6'))
  }
  return P
}
function mkForum() {
  const P = []
  P.push(part(rect(-150, -26, 300, 26), '#D9C3A0'))
  // templo
  P.push(part(rect(-50, -44, 100, 18), '#E6D3B0'))
  for (let i = 0; i < 6; i++) P.push(part(rect(-44 + i * 17, -106, 8, 62), '#EFE2C8'))
  P.push(part(rect(-54, -116, 108, 10), '#E6D3B0'))
  P.push(part([[-58, -116], [0, -142], [58, -116], [-58, -116]], '#E3CBA2'))
  // pórticos
  for (const s of [-1, 1]) {
    const x0 = s < 0 ? -146 : 62
    for (let i = 0; i < 6; i++) P.push(part(rect(x0 + i * 14, -64, 5, 38), '#EFE2C8'))
    P.push(part([[x0 - 4, -64], [x0 + 84, -64], [x0 + 80, -74], [x0, -74], [x0 - 4, -64]], '#B8603F'))
  }
  return P
}
function mkCrypto() {
  // galerias abobadadas: dois pisos de arcos, em corte
  const P = []
  P.push(part(rect(-140, 0, 280, 124), '#2A2226'))
  for (let row = 0; row < 2; row++) for (let i = 0; i < 7; i++) {
    const x = -132 + i * 38, y = 58 + row * 62
    P.push(part(archPts(x, y, 32, 46), '#4E3A30'))
  }
  return P
}
function mkWalls() {
  const P = []
  // pano de muralha a meia encosta, com torres
  const xs = []
  for (let x = 520; x <= 1780; x += 20) xs.push([x, hillY(x) + 150 - 110 * Math.exp(-Math.pow((x - 1150) / 420, 2))])
  P.push(part(xs.concat([[1780, xs.at(-1)[1] + 26], ...xs.slice().reverse().map(([x, y]) => [x, y + 26])]), '#D7C7A6'))
  for (const tx of [560, 700, 1480, 1640]) {
    const ty = hillY(tx) + 150 - 110 * Math.exp(-Math.pow((tx - 1150) / 420, 2))
    P.push(part(rect(tx - 13, ty - 34, 26, 60), '#D2C09C'))
    for (let i = 0; i < 3; i++) P.push(part(rect(tx - 13 + i * 10, ty - 41, 6, 7), '#D2C09C'))
  }
  // Arco de Almedina
  const ax = 640, ay = hillY(ax) + 150 - 110 * Math.exp(-Math.pow((ax - 1150) / 420, 2))
  P.push(part(archPts(ax - 9, ay + 26, 18, 26), '#3A3036'))
  return P
}
function mkCastle() {
  const P = []
  P.push(part(rect(-90, -44, 180, 44), '#D7C7A6'))
  for (let i = 0; i < 15; i++) P.push(part(rect(-90 + i * 12.4, -51, 7, 7), '#D7C7A6'))
  P.push(part(rect(-28, -120, 56, 120), '#DCCBA8'))
  for (let i = 0; i < 5; i++) P.push(part(rect(-28 + i * 12, -128, 8, 8), '#DCCBA8'))
  P.push(part(rect(-6, -100, 12, 20), '#3A3036'))
  for (const xx of [-84, 64]) {
    P.push(part(rect(xx, -76, 22, 76), '#D2C09C'))
    for (let i = 0; i < 2; i++) P.push(part(rect(xx + i * 13, -83, 8, 7), '#D2C09C'))
  }
  return P
}

const DW = {}
// Posições no mundo (base, ao centro), assentes na encosta.
const SITES = {}
function makeDrawings() {
  DW.tower = mkTower(); DW.paco = mkPaco(); DW.joanina = mkJoanina(); DW.se = mkSeVelha()
  DW.santaCruz = mkSantaCruz(); DW.forum = mkForum(); DW.crypto = mkCrypto(); DW.walls = mkWalls(); DW.castle = mkCastle()
  for (const k in DW) DW[k].lines = DW[k].map((p) => p.pts)
  const on = (x, dy) => [x, hillY(x) + dy]
  Object.assign(SITES, {
    forum: on(1120, 14), crypto: on(1120, 14), castle: on(1130, 12),
    paco: on(1100, 16), tower: on(1206, 10), joanina: on(1300, 16),
    se: on(868, 150), santaCruz: [432, 846], walls: [0, 0],
  })
}
// Zonas onde não nascem casas (para não taparem os monumentos).
function reserved() {
  const box = (name, pad = 6) => {
    const [bx, by] = SITES[name]
    let x0 = 1e9, x1 = -1e9, y0 = 1e9
    for (const p of DW[name]) for (const [x, y] of p.pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y) }
    return [bx + x0 - pad, bx + x1 + pad, by + y0, by + 24]
  }
  return ['paco', 'tower', 'joanina', 'se', 'santaCruz', 'forum'].map((n) => box(n))
}

function drawMonument(name, { line = 1, fill = 1, color = GOLD, width = 1.6, s = 1, dx = 0, dy = 0 } = {}) {
  const D = DW[name]
  const [bx, by] = name === 'walls' ? [0, 0] : SITES[name]
  if (line <= 0 && fill <= 0) return
  X.save()
  X.translate(bx + dx, by + dy)
  X.scale(s, s)
  if (fill > 0) for (const p of D) if (p.fill) { path(p.pts, true); X.fillStyle = tcss(p.fill, fill * p.a); X.fill() }
  // o traço dourado apaga-se à medida que a cor entra
  const la = line >= 1 ? 1 - smooth(clamp((fill - 0.2) / 0.8)) : 1
  if (line > 0 && la > 0.01) { X.globalAlpha = la; drawLines(D.lines, line, { color, width: width / s, glow: 0.3, stagger: 0.35 }) }
  X.restore()
}

// ---------- árvores ----------
function cypress(x, y, h, c) {
  X.fillStyle = c
  X.beginPath()
  X.moveTo(x, y - h)
  X.bezierCurveTo(x + h * 0.16, y - h * 0.7, x + h * 0.14, y - h * 0.2, x + h * 0.07, y)
  X.lineTo(x - h * 0.07, y)
  X.bezierCurveTo(x - h * 0.14, y - h * 0.2, x - h * 0.16, y - h * 0.7, x, y - h)
  X.fill()
}
function roundTree(x, y, r, c, t = 0) {
  X.fillStyle = c
  X.beginPath()
  const sw = Math.sin(t * 0.9 + x) * 1.5
  X.arc(x + sw, y - r, r, 0, TAU)
  X.arc(x - r * 0.6 + sw, y - r * 0.6, r * 0.7, 0, TAU)
  X.arc(x + r * 0.6 + sw, y - r * 0.6, r * 0.7, 0, TAU)
  X.fill()
}
let TREES = []
function makeTrees() {
  const r = rng(290)
  TREES = []
  for (let i = 0; i < 70; i++) {
    const x = 120 + r() * 1800
    const y = hillY(x) + 4 + r() * 60
    if (y > RIVER_Y - 10) continue
    TREES.push({ x, y, h: 26 + r() * 30, type: r() < 0.45 ? 'c' : 'r', era: r() < 0.5 ? 0 : 1 })
  }
  TREES.sort((a, b) => a.y - b.y)
}

// ---------- céu ----------
let STARS = []
function makeStars() {
  const r = rng(40)
  STARS = Array.from({ length: 420 }, () => ({ x: r() * W, y: r() * H * 0.75, s: 0.4 + r() * r() * 2.2, ph: r() * TAU, sp: 0.5 + r() * 2 }))
}
function sky(t, S) {
  const p = S.pal
  const g = X.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, css(p.sky0)); g.addColorStop(0.55, css(p.sky1)); g.addColorStop(0.9, css(p.sky2))
  X.fillStyle = g
  X.fillRect(0, 0, W, H)
  if (S.stars > 0) {
    for (const s of STARS) {
      const tw = 0.6 + 0.4 * Math.sin(t * s.sp + s.ph)
      X.fillStyle = css('#FFF6E0', S.stars * tw * (1 - s.y / (H * 0.8)))
      X.fillRect(s.x, s.y, s.s, s.s)
    }
  }
  if (S.sun && S.sun.a > 0) {
    const { x, y, r, a, color } = S.sun
    glow(x, y, r * 9, color, 0.35 * a)
    glow(x, y, r * 3.2, color, 0.5 * a)
    glow(x, y, r * 1.6, '#FFF1C8', 0.8 * a)
    X.fillStyle = css('#FFF3D0', a); X.beginPath(); X.arc(x, y, r, 0, TAU); X.fill()
  }
  if (S.moon && S.moon.a > 0) {
    const { x, y, r = 46, a } = S.moon
    glow(x, y, r * 6, '#BFD3F2', 0.22 * a)
    X.fillStyle = css('#F4F1E6', a); X.beginPath(); X.arc(x, y, r, 0, TAU); X.fill()
    X.fillStyle = css('#D9D6CC', a * 0.5)
    for (const [dx, dy, rr] of [[-12, -10, 9], [14, 8, 7], [-4, 18, 5], [18, -14, 4]]) { X.beginPath(); X.arc(x + dx, y + dy, rr, 0, TAU); X.fill() }
  }
}
function clouds(t, S, cam) {
  if (!S.clouds) return
  const r = rng(77)
  for (let i = 0; i < 7; i++) {
    const w = 160 + r() * 260, y = 90 + r() * 280, sp = 4 + r() * 8
    const x = ((r() * (W + 800) + t * sp) % (W + 800)) - 400
    const px = x - (cam.x - W / 2) * 0.15, py = y - (cam.y - H / 2) * 0.1
    X.fillStyle = css(S.pal.cloud, S.clouds * (0.55 + r() * 0.35))
    X.beginPath()
    X.ellipse(px, py, w / 2, w * 0.09, 0, 0, TAU)
    X.ellipse(px - w * 0.14, py - w * 0.07, w * 0.2, w * 0.1, 0, 0, TAU)
    X.ellipse(px + w * 0.1, py - w * 0.1, w * 0.18, w * 0.12, 0, 0, TAU)
    X.fill()
  }
}

// ---------- serras ao fundo ----------
function ridges(S, cam) {
  const p = S.pal
  for (const [k, base, amp, fq, col, par] of [[1, 640, 70, 0.0021, p.far2, 0.35], [2, 720, 60, 0.0034, p.far1, 0.6]]) {
    const cx = W / 2 + (cam.x - W / 2) * par, cy = H / 2 + (cam.y - H / 2) * par, z = 1 + (cam.z - 1) * par
    camera({ x: cx, y: cy, z }, () => {
      X.fillStyle = css(col)
      X.beginPath()
      X.moveTo(-800, 1400)
      for (let x = -800; x <= 2800; x += 16) X.lineTo(x, base - amp * (0.6 + fbm(x * fq + k * 9, 4)))
      X.lineTo(2800, 1400)
      X.fill()
    })
  }
}

// ---------- a colina ----------
function hill(S) {
  const p = S.pal
  const g = X.createLinearGradient(0, 360, 0, RIVER_Y)
  g.addColorStop(0, css(tc(p.hill0))); g.addColorStop(1, css(tc(p.hill1)))
  X.fillStyle = g
  X.beginPath()
  X.moveTo(-800, 1300)
  for (let x = -800; x <= 2800; x += 8) X.lineTo(x, hillY(x))
  X.lineTo(2800, 1300)
  X.fill()
  X.save()
  X.clip()
  // luz lateral: o lado do sol mais claro, o outro mais fundo
  const L = S.light ?? -1
  const lg = X.createLinearGradient(L < 0 ? 300 : 1900, 0, L < 0 ? 1900 : 300, 0)
  lg.addColorStop(0, 'rgba(255,238,205,0.16)'); lg.addColorStop(0.55, 'rgba(0,0,0,0)'); lg.addColorStop(1, 'rgba(30,18,30,0.22)')
  X.fillStyle = lg
  X.fillRect(-800, 0, 3600, 1300)
  // socalcos: fiadas de oliveiras ao longo das curvas de nível
  const r = rng(5)
  X.fillStyle = css(tc(p.olive || '#6F8456'), 0.28 * (S.terraces ?? 1))
  for (let k = 1; k < 13; k++) {
    for (let x = -200; x <= 2200; x += 15 + r() * 10) {
      if (r() < 0.35) continue
      const y = hillY(x) + k * 34 + 5 * noise(x * 0.01 + k)
      X.beginPath(); X.arc(x, y, 2.4 + r() * 2, 0, TAU); X.fill()
    }
  }
  X.restore()
  // luz de contorno na crista
  X.strokeStyle = css(tc(p.rim || '#FFF3DA'), 0.35)
  X.lineWidth = 2.5
  X.beginPath()
  for (let x = -800; x <= 2800; x += 8) x === -800 ? X.moveTo(x, hillY(x)) : X.lineTo(x, hillY(x))
  X.stroke()
}

// ---------- rio ----------
function river(t, S, cam) {
  const p = S.pal
  // linha de água no ecrã
  const wy = (RIVER_Y - cam.y) * cam.z + H / 2
  if (wy > H) return
  // reflexo: o próprio ecrã acima da linha, virado e partido em faixas
  const src = X.canvas
  const strip = 6
  X.save()
  for (let y = wy; y < H; y += strip) {
    const d = y - wy
    const sy = wy - d * 1.08 - strip
    if (sy < 0) break
    const off = Math.sin(y * 0.09 + t * 1.6) * (2 + d * 0.035) + Math.sin(y * 0.021 - t * 0.7) * 3
    X.globalAlpha = 0.55
    X.drawImage(src, 0, sy, W, strip, off, y, W, strip)
  }
  X.restore()
  const g = X.createLinearGradient(0, wy, 0, H)
  g.addColorStop(0, css(p.water0, 0.38)); g.addColorStop(1, css(p.water1, 0.8))
  X.fillStyle = g
  X.fillRect(0, wy, W, H - wy)
  // brilhos a correr para poente
  const r = rng(12)
  for (let i = 0; i < 90; i++) {
    const yy = wy + 4 + Math.pow(r(), 1.4) * (H - wy)
    const len = 10 + r() * 60 * (0.4 + (yy - wy) / 200)
    const x = ((r() * W - t * (14 + r() * 18) * (1 + (yy - wy) / 150)) % W + W) % W
    X.strokeStyle = css(p.glint, (0.12 + r() * 0.3) * (S.glint ?? 1))
    X.lineWidth = 1 + r() * 1.5
    X.beginPath(); X.moveTo(x, yy); X.lineTo(x + len, yy); X.stroke()
  }
  // margem
  X.fillStyle = css(tc(p.bank || p.hill1), 0.9)
  X.fillRect(0, wy - 2, W, 3)
}

// ---------- o palco inteiro ----------
function stage(t, S) {
  const cam = S.cam || FULL
  TINT = rgb(S.pal.tint || '#FFFFFF')
  sky(t, S)
  clouds(t, S, cam)
  ridges(S, cam)
  camera(cam, () => {
    hill(S)
    const v = S.houses || [0, 0, 0]
    const night = S.lights || 0
    // árvores de trás
    for (const tr of TREES) {
      const a = tr.era === 0 ? (S.trees ?? 1) : v[1] > 0 || v[2] > 0 ? 1 : S.trees ?? 1
      if (a <= 0) continue
      const c = tcss(tr.type === 'c' ? S.pal.cypress || '#3E5A45' : S.pal.olive || '#6F8456', a)
      tr.type === 'c' ? cypress(tr.x, tr.y, tr.h, c) : roundTree(tr.x, tr.y, tr.h * 0.35, c, t)
    }
    if (S.before) S.before()
    // monumentos atrás do casario
    for (const m of S.back || []) drawMonument(m.name, m)
    for (const hs of HOUSES) {
      const eraV = v[hs.era] ?? 0
      if (eraV <= 0) continue
      const lv = clamp((eraV - hs.order * 0.8) / 0.2)
      drawHouse(hs, lv, night, S.roman)
    }
    for (const m of S.front || []) drawMonument(m.name, m)
    if (S.world) S.world()
  })
  river(t, S, cam)
  if (S.over) camera(cam, S.over)
}
