// Ferramentas comuns: matemática, cor, traço, texto, câmara.
// Tudo é função do tempo; nada guarda estado entre frames.

const W = 1920, H = 1080
let X // o contexto onde se está a pintar agora

const PI = Math.PI, TAU = Math.PI * 2
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, t) => a + (b - a) * t
const prog = (a, b, x) => clamp((x - a) / (b - a)) // 0→1 entre a e b
const smooth = (t) => t * t * (3 - 2 * t)
const E = {
  io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  out5: (t) => 1 - Math.pow(1 - t, 5),
  in: (t) => t * t * t,
  sine: (t) => -(Math.cos(PI * t) - 1) / 2,
  back: (t) => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) },
  expo: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
}
// Entrada e saída suaves dentro de uma janela [a, b] com rampas de r segundos.
const win = (t, a, b, r = 0.6) => smooth(prog(a, a + r, t)) * (1 - smooth(prog(b - r, b, t)))

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
function noise(x) {
  const i = Math.floor(x), f = x - i
  return lerp(hash(i), hash(i + 1), smooth(f)) * 2 - 1
}
const fbm = (x, o = 4) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * noise(x * f + i * 17.3); f *= 2; a *= 0.5 } return s }

// ---------- cor ----------
const _hex = {}
function rgb(c) {
  if (Array.isArray(c)) return c
  if (_hex[c]) return _hex[c]
  const h = c.replace('#', '')
  return (_hex[c] = [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)])
}
const mixc = (a, b, t) => { const A = rgb(a), B = rgb(b); return [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)] }
const css = (c, a = 1) => { const [r, g, b] = rgb(c); return `rgba(${r | 0},${g | 0},${b | 0},${a})` }
// Paleta interpolada: {chave: cor} → {chave: cor}
const mixPal = (p, q, t) => { const o = {}; for (const k in p) o[k] = q[k] !== undefined ? mixc(p[k], q[k], t) : p[k]; return o }

const INK = '#14171C', PAPER = '#F2EEE6', ACCENT = '#B03A0B', GOLD = '#E3B04B', CREAM = '#F4E9D2'

// ---------- traço ----------
function path(pts, close = false) {
  X.beginPath()
  X.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) X.lineTo(pts[i][0], pts[i][1])
  if (close) X.closePath()
}
const _len = new WeakMap()
function lens(pts) {
  let L = _len.get(pts)
  if (L) return L
  L = [0]
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  _len.set(pts, L)
  return L
}
// Parte inicial de uma polilinha, até à fracção p do comprimento. Devolve a ponta.
function partial(pts, p) {
  const L = lens(pts), alvo = L.at(-1) * clamp(p)
  X.beginPath()
  X.moveTo(pts[0][0], pts[0][1])
  let tip = pts[0]
  for (let i = 1; i < pts.length; i++) {
    if (L[i] <= alvo) { X.lineTo(pts[i][0], pts[i][1]); tip = pts[i]; continue }
    const f = (alvo - L[i - 1]) / (L[i] - L[i - 1] || 1)
    tip = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]
    X.lineTo(tip[0], tip[1])
    break
  }
  return tip
}
// Desenha um conjunto de polilinhas como se fosse um só traço contínuo a avançar.
function drawLines(polys, p, { color = GOLD, width = 2.2, glow = 0.35, tip = true, stagger = 0 } = {}) {
  if (p <= 0) return
  const tot = polys.reduce((s, q) => s + lens(q).at(-1), 0)
  let acc = 0, ponta = null
  X.lineCap = 'round'
  X.lineJoin = 'round'
  for (const q of polys) {
    const l = lens(q).at(-1)
    const ini = (acc / tot) * (1 - stagger), fim = ini + (l / tot) * (1 - stagger) + stagger
    acc += l
    const lp = prog(ini, fim, p)
    if (lp <= 0) continue
    if (glow > 0) {
      X.strokeStyle = css(color, glow * 0.35)
      X.lineWidth = width * 4
      partial(q, lp)
      X.stroke()
    }
    X.strokeStyle = css(color, 1)
    X.lineWidth = width
    const t = partial(q, lp)
    X.stroke()
    if (lp < 1) ponta = t
  }
  if (tip && ponta && p < 1) spark(ponta[0], ponta[1], width * 5, color)
}
function spark(x, y, r, color = GOLD, a = 1) {
  const g = X.createRadialGradient(x, y, 0, x, y, r * 3)
  g.addColorStop(0, css('#FFF8E6', a))
  g.addColorStop(0.25, css(color, 0.7 * a))
  g.addColorStop(1, css(color, 0))
  X.fillStyle = g
  X.fillRect(x - r * 3, y - r * 3, r * 6, r * 6)
}
function glow(x, y, r, color, a = 1) {
  if (a <= 0) return
  const g = X.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, css(color, a))
  g.addColorStop(0.4, css(color, a * 0.35))
  g.addColorStop(1, css(color, 0))
  X.fillStyle = g
  X.fillRect(x - r, y - r, r * 2, r * 2)
}
function arcPts(cx, cy, rx, ry, a0, a1, n = 24) {
  const o = []
  for (let i = 0; i <= n; i++) { const a = lerp(a0, a1, i / n); o.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]) }
  return o
}
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]
// Arco de volta perfeita: da base esquerda, sobe, curva, desce.
const archPts = (x, y, w, h) => [[x, y], ...arcPts(x + w / 2, y - h + w / 2, w / 2, w / 2, PI, TAU, 16).slice(0), [x + w, y]]

function fillPoly(pts, color, a = 1) { path(pts, true); X.fillStyle = css(color, a); X.fill() }

// ---------- texto ----------
function font(size, { family = 'Fraunces', weight = 400, italic = false } = {}) {
  return `${italic ? 'italic ' : ''}${weight} ${size}px ${family === 'mono' ? '"JetBrains Mono"' : family}`
}
function text(s, x, y, o = {}) {
  const { size = 32, color = CREAM, alpha = 1, align = 'center', spacing = 0, baseline = 'alphabetic' } = o
  X.font = font(size, o)
  X.fillStyle = css(color, alpha)
  X.textBaseline = baseline
  if (!spacing) { X.textAlign = align; X.fillText(s, x, y); return }
  X.textAlign = 'left'
  const ws = [...s].map((ch) => X.measureText(ch).width + spacing)
  const tot = ws.reduce((a, b) => a + b, 0) - spacing
  let cx = align === 'center' ? x - tot / 2 : align === 'right' ? x - tot : x
  ;[...s].forEach((ch, i) => { X.fillText(ch, cx, y); cx += ws[i] })
}
// Posições (centro de cada letra) de uma palavra com espaçamento.
function letterPos(s, x, y, o = {}) {
  const { size = 32, spacing = 0 } = o
  X.font = font(size, o)
  const ws = [...s].map((ch) => X.measureText(ch).width)
  const tot = ws.reduce((a, b) => a + b, 0) + spacing * (ws.length - 1)
  let cx = x - tot / 2
  return ws.map((w) => { const p = cx + w / 2; cx += w + spacing; return p })
}

// Etiqueta de capítulo: numeral romano + nome, com um fio que se desenha.
function chapter(t, t0, numeral, name, { color = CREAM, dur = 5.5, x = 96, y = 104 } = {}) {
  const a = win(t, t0, t0 + dur, 0.8)
  if (a <= 0) return
  X.save()
  X.globalAlpha = a
  const p = E.out(prog(t0, t0 + 1.2, t))
  X.strokeStyle = css(color, 0.9)
  X.lineWidth = 1.5
  X.beginPath(); X.moveTo(x, y + 18); X.lineTo(x + 280 * p, y + 18); X.stroke()
  text(numeral, x, y, { family: 'mono', size: 15, color, align: 'left', spacing: 4, alpha: 0.85, weight: 500 })
  text(name, x + 54, y, { family: 'mono', size: 15, color, align: 'left', spacing: 5, alpha: 0.85, weight: 500 })
  X.restore()
}

// Data grande, em itálico, que sobe e assenta.
function bigYear(t, t0, t1, s, x, y, { color = CREAM, size = 190, align = 'left' } = {}) {
  const a = win(t, t0, t1, 0.9)
  if (a <= 0) return
  X.save()
  const chars = [...s]
  X.font = font(size, { italic: true, weight: 300 })
  let cx = x
  if (align === 'center') cx -= X.measureText(s).width / 2
  chars.forEach((ch, i) => {
    const p = E.out5(prog(t0 + i * 0.09, t0 + 0.9 + i * 0.09, t))
    X.globalAlpha = a * p
    X.fillStyle = css(color)
    X.textAlign = 'left'
    X.fillText(ch, cx, y + (1 - p) * 60)
    cx += X.measureText(ch).width
  })
  X.restore()
}

// Legenda discreta presa a um ponto: fio vertical + texto mono.
function tag(t, t0, t1, s, x, y, { color = CREAM, len = 70, dir = -1, align = 'center', size = 15 } = {}) {
  const a = win(t, t0, t1, 0.5)
  if (a <= 0) return
  const p = E.out(prog(t0, t0 + 0.7, t))
  X.save()
  X.globalAlpha = a
  X.strokeStyle = css(color, 0.8)
  X.lineWidth = 1.3
  X.beginPath(); X.moveTo(x, y); X.lineTo(x, y + dir * len * p); X.stroke()
  X.fillStyle = css(color); X.beginPath(); X.arc(x, y, 3.2, 0, TAU); X.fill()
  X.globalAlpha = a * prog(t0 + 0.4, t0 + 0.9, t)
  text(s, x, y + dir * (len + 12) + (dir > 0 ? 12 : 0), { family: 'mono', size, color, align, spacing: 3, weight: 500 })
  X.restore()
}

// ---------- câmara ----------
// cam = {x, y, z}: ponto do mundo que fica no centro do ecrã, e zoom.
function camera(cam, fn) {
  X.save()
  X.translate(W / 2, H / 2)
  X.scale(cam.z, cam.z)
  X.translate(-cam.x, -cam.y)
  fn()
  X.restore()
}
const camLerp = (a, b, t) => ({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: Math.exp(lerp(Math.log(a.z), Math.log(b.z), t)) })
// Percurso de câmara por chaves [tempo, cam], com easing entre chaves.
function camPath(t, keys, ease = E.io) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) return camLerp(keys[i - 1][1], keys[i][1], ease(prog(keys[i - 1][0], keys[i][0], t)))
  return keys.at(-1)[1]
}
const FULL = { x: W / 2, y: H / 2, z: 1 }

// ---------- camadas fixas: papel e vinheta ----------
let PAPER_TEX, VIGNETTE
function makeTextures() {
  PAPER_TEX = document.createElement('canvas')
  PAPER_TEX.width = W; PAPER_TEX.height = H
  const p = PAPER_TEX.getContext('2d')
  const img = p.createImageData(W, H)
  const r = rng(7)
  for (let i = 0; i < W * H; i++) {
    const v = 128 + (r() - 0.5) * 38
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v
    img.data[i * 4 + 3] = 255
  }
  p.putImageData(img, 0, 0)
  // fibras
  p.globalAlpha = 0.07
  for (let i = 0; i < 2600; i++) {
    const x = r() * W, y = r() * H, a = r() * TAU, l = 6 + r() * 26
    p.strokeStyle = r() < 0.5 ? '#000' : '#fff'
    p.lineWidth = 0.6 + r()
    p.beginPath(); p.moveTo(x, y); p.quadraticCurveTo(x + Math.cos(a + 0.6) * l * 0.5, y + Math.sin(a + 0.6) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); p.stroke()
  }
  // manchas largas e suaves
  p.globalAlpha = 1
  for (let i = 0; i < 40; i++) {
    const x = r() * W, y = r() * H, rr = 120 + r() * 380
    const g = p.createRadialGradient(x, y, 0, x, y, rr)
    const c = r() < 0.5 ? '0,0,0' : '255,255,255'
    g.addColorStop(0, `rgba(${c},0.05)`); g.addColorStop(1, `rgba(${c},0)`)
    p.fillStyle = g; p.fillRect(x - rr, y - rr, rr * 2, rr * 2)
  }
  VIGNETTE = document.createElement('canvas')
  VIGNETTE.width = W; VIGNETTE.height = H
  const v = VIGNETTE.getContext('2d')
  const g = v.createRadialGradient(W / 2, H * 0.52, H * 0.35, W / 2, H * 0.52, H * 1.05)
  g.addColorStop(0, 'rgba(8,10,18,0)')
  g.addColorStop(1, 'rgba(8,10,18,0.62)')
  v.fillStyle = g
  v.fillRect(0, 0, W, H)
}
function finish(grain = 0.22, vig = 1) {
  X.save()
  X.globalCompositeOperation = 'overlay'
  X.globalAlpha = grain
  X.drawImage(PAPER_TEX, 0, 0)
  X.globalCompositeOperation = 'source-over'
  X.globalAlpha = vig
  X.drawImage(VIGNETTE, 0, 0)
  X.restore()
}

// Buffers auxiliares, criados uma vez.
function buffer() { const c = document.createElement('canvas'); c.width = W; c.height = H; return c }
