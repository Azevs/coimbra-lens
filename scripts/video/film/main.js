// O maestro: escolhe a cena de cada instante, faz as passagens entre cenas
// e aplica o acabamento (papel, vinheta, fade de entrada e de saída).

let GEO, TL, MAIN, BUF_A, BUF_B, BUF_T
const SCENE_FN = {}

function boot(geo, tl) {
  GEO = geo
  TL = tl
  MAIN = document.getElementById('c').getContext('2d')
  BUF_A = buffer(); BUF_B = buffer(); BUF_T = buffer()
  Object.assign(SCENE_FN, {
    rio: sRio, aeminium: sAeminium,
    reino: typeof sReino !== 'undefined' ? sReino : null,
    ines: typeof sInes !== 'undefined' ? sInes : null,
    universidade: typeof sUni !== 'undefined' ? sUni : null,
    estudantes: typeof sEstudantes !== 'undefined' ? sEstudantes : null,
    fim: typeof sFim !== 'undefined' ? sFim : null,
  })
  makeTextures(); makeDrawings(); makeHouses(); makeTrees(); makeStars(); prepMap()
  if (typeof prepB === 'function') prepB()
  if (typeof prepC === 'function') prepC()
  return Promise.all([
    document.fonts.load('300 100px Fraunces'), document.fonts.load('italic 300 100px Fraunces'),
    document.fonts.load('400 100px Fraunces'), document.fonts.load('500 20px "JetBrains Mono"'),
  ]).then(() => document.fonts.ready).then(() => 'ok')
}

// Passagens: [cena que sai, cena que entra, duração, tipo]
function transitions() {
  const s = TL.scenes
  return [
    { at: s[1].start, dur: 1.4, type: 'fade' },
    { at: s[2].start, dur: 1.6, type: 'wipe' },
    { at: s[3].start, dur: 1.8, type: 'fade' },
    { at: s[4].start, dur: 1.9, type: 'tiles' },
    { at: s[5].start, dur: 1.6, type: 'ribbons' },
    { at: s[6].start, dur: 1.8, type: 'fade' },
  ]
}

function drawScene(id, t, target) {
  X = target
  X.save()
  const fn = SCENE_FN[id]
  if (fn) fn(t)
  else { X.fillStyle = '#222'; X.fillRect(0, 0, W, H); text(id, 960, 540, { size: 60 }) }
  X.restore()
}

function frame(t) {
  const sc = TL.scenes
  let i = sc.findIndex((s) => t < s.end)
  if (i < 0) i = sc.length - 1
  const tr = transitions().find((q) => Math.abs(t - q.at) < q.dur / 2)
  if (tr) {
    const k = sc.findIndex((s) => Math.abs(s.start - tr.at) < 1e-6)
    const p = (t - (tr.at - tr.dur / 2)) / tr.dur
    drawScene(sc[k - 1].id, t, BUF_A.getContext('2d'))
    drawScene(sc[k].id, t, BUF_B.getContext('2d'))
    X = MAIN
    compose(tr.type, p, t)
  } else {
    drawScene(sc[i].id, t, MAIN)
  }
  X = MAIN
  finish(0.2, 1)
  // entrada e saída a negro
  const fade = Math.max(1 - smooth(prog(0, 1.2, t)), smooth(prog(TL.duration - 2.2, TL.duration - 0.1, t)))
  if (fade > 0) { X.fillStyle = `rgba(5,6,10,${fade})`; X.fillRect(0, 0, W, H) }
}

function compose(type, p, t) {
  const A = BUF_A, B = BUF_B
  X.globalAlpha = 1
  if (type === 'fade') {
    X.drawImage(A, 0, 0)
    X.globalAlpha = E.sine(p)
    X.drawImage(B, 0, 0)
    X.globalAlpha = 1
    return
  }
  if (type === 'wipe') {
    // um fio dourado varre da esquerda para a direita; atrás dele, a nova época
    const e = E.io(p)
    const x = lerp(-80, W + 80, e)
    X.drawImage(A, 0, 0)
    X.save()
    X.beginPath()
    X.moveTo(0, 0); X.lineTo(x + 60, 0); X.lineTo(x - 60, H); X.lineTo(0, H); X.closePath()
    X.clip()
    X.drawImage(B, 0, 0)
    X.restore()
    X.strokeStyle = css(GOLD, 0.95); X.lineWidth = 3
    X.beginPath(); X.moveTo(x + 60, 0); X.lineTo(x - 60, H); X.stroke()
    X.strokeStyle = css(GOLD, 0.25); X.lineWidth = 14
    X.beginPath(); X.moveTo(x + 60, 0); X.lineTo(x - 60, H); X.stroke()
    return
  }
  if (type === 'tiles') return tiles(A, B, p)
  if (type === 'ribbons') return ribbons(A, B, p, t)
  X.drawImage(B, 0, 0)
}

// Azulejos: a imagem vira-se ladrilho a ladrilho, com o verso azul e branco.
let TILE_BACK
function tileBack(s) {
  if (TILE_BACK) return TILE_BACK
  const c = document.createElement('canvas'); c.width = c.height = s
  const g = c.getContext('2d')
  g.fillStyle = '#F4F0E6'; g.fillRect(0, 0, s, s)
  g.strokeStyle = '#1F4E8C'; g.fillStyle = '#1F4E8C'
  const m = s / 2
  g.lineWidth = s * 0.035
  g.beginPath(); g.arc(m, m, s * 0.3, 0, TAU); g.stroke()
  for (let k = 0; k < 8; k++) {
    const a = (k * TAU) / 8
    g.beginPath()
    g.ellipse(m + Math.cos(a) * s * 0.18, m + Math.sin(a) * s * 0.18, s * 0.1, s * 0.035, a, 0, TAU)
    g.fill()
  }
  for (const [x, y] of [[0, 0], [s, 0], [0, s], [s, s]]) { g.beginPath(); g.arc(x, y, s * 0.2, 0, TAU); g.fill() }
  g.fillStyle = '#F4F0E6'
  for (const [x, y] of [[0, 0], [s, 0], [0, s], [s, s]]) { g.beginPath(); g.arc(x, y, s * 0.11, 0, TAU); g.fill() }
  g.fillStyle = '#1F4E8C'; g.beginPath(); g.arc(m, m, s * 0.06, 0, TAU); g.fill()
  g.strokeStyle = 'rgba(20,30,60,0.25)'; g.lineWidth = 2; g.strokeRect(0, 0, s, s)
  return (TILE_BACK = c)
}
function tiles(A, B, p) {
  const s = 120, nx = W / s, ny = H / s
  const back = tileBack(s)
  X.fillStyle = '#0B0E18'; X.fillRect(0, 0, W, H)
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const d = (i + j * 0.9) / (nx + ny * 0.9)
    const q = clamp((p * 1.6 - d * 0.6) / 1.0)
    // 0 → 0.5: vira A até ao verso; 0.5 → 1: do verso para B
    const f = E.io(q)
    let sx, img
    if (f < 0.33) { sx = Math.cos((f / 0.33) * (PI / 2)); img = A }
    else if (f < 0.67) { sx = Math.sin(((f - 0.33) / 0.34) * PI); img = back }
    else { sx = Math.sin(((f - 0.67) / 0.33) * (PI / 2)); img = B }
    const w = Math.max(0.5, s * Math.abs(sx))
    const x = i * s + (s - w) / 2
    if (img === back) X.drawImage(back, x, j * s, w, s)
    else X.drawImage(img, i * s, j * s, s, s, x, j * s, w, s)
  }
}
// Fitas das faculdades: bandas de cor atravessam o ecrã e deixam a cena nova.
const FITAS = ['#C8102E', '#F2C230', '#1B3F8B', '#6EC1E4', '#7B2D8E', '#E87722', '#2E7D32', '#8B5A2B', '#E4E4E4']
function ribbons(A, B, p, t) {
  X.drawImage(A, 0, 0)
  const n = FITAS.length
  const bw = H / n + 8
  // B aparece por trás das fitas quando elas já passaram
  X.save()
  X.beginPath()
  for (let k = 0; k < n; k++) {
    const q = E.io(clamp(p * 1.5 - k * 0.05))
    const y = k * (H / n)
    const x = lerp(-W * 1.2, W * 0.2, q)
    X.rect(-10, y - 2, x - 60 + W * 0.7, bw + 4)
  }
  X.clip()
  X.drawImage(B, 0, 0)
  X.restore()
  for (let k = 0; k < n; k++) {
    const q = E.io(clamp(p * 1.5 - k * 0.05))
    const y = k * (H / n)
    const x = lerp(-W * 1.2, W * 0.2, q) + W * 0.7
    const tail = 380 * (1 - q)
    X.fillStyle = css(FITAS[k])
    X.beginPath()
    X.moveTo(x - 60 - tail, y); X.lineTo(x + 40, y); X.lineTo(x, y + bw / 2); X.lineTo(x + 40, y + bw); X.lineTo(x - 60 - tail, y + bw)
    X.closePath()
    X.globalAlpha = 1 - smooth(prog(0.72, 1, p))
    X.fill()
  }
  X.globalAlpha = 1
}

function shot(type = 'image/png', q) { return MAIN.canvas.toDataURL(type, q) }
function thumb(w, h, t) {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const g = c.getContext('2d')
  g.drawImage(MAIN.canvas, 0, 0, w, h)
  g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(0, h - 18, 60, 18)
  g.fillStyle = '#fff'; g.font = '12px monospace'; g.fillText(t.toFixed(1) + 's', 4, h - 5)
  return c.toDataURL('image/jpeg', 0.85)
}
async function sheet(imgs, cols, w, h) {
  const rows = Math.ceil(imgs.length / cols)
  const c = document.createElement('canvas'); c.width = cols * w; c.height = rows * h
  const g = c.getContext('2d')
  for (let i = 0; i < imgs.length; i++) {
    const im = new Image(); im.src = imgs[i]; await im.decode()
    g.drawImage(im, (i % cols) * w, Math.floor(i / cols) * h)
  }
  return c.toDataURL('image/jpeg', 0.88)
}
