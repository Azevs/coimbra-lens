// A linguagem visual das lendas: desenho animado dos anos 30.
//
// Contorno preto grosso, braços de mangueira, olhos de fatia de tarte, luvas
// brancas, tudo em sépia e a saltitar ao compasso. O desenho é feito num
// espaço de 1280×720 e ampliado para 1920×1080; cada imagem é uma função pura
// do tempo (sem estado entre imagens), para se poder desenhar em paralelo.

const W = 1280, H = 720, ESC = 1.5
const K = '#16120e', PAPEL = '#e9dfc7', PELE = '#f3ead6', BRANCO = '#fbf7ec', CLARO = '#d9ceb2', MEIO = '#b3a78c', TORRADO = '#8b7d66', SOMBRA = '#6f6656', ESCURO = '#221c16', CORACAO = '#3a322a'
let ctx, TL, BEAT = 0.5
const TAU = Math.PI * 2

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, t) => a + (b - a) * t
const prog = (t, a, b) => clamp((t - a) / (b - a))
const suave = (x) => x * x * (3 - 2 * x)
const saiDe = (x) => 1 - (1 - x) ** 3
const volta = (x, s = 1.7) => { const c = s + 1; return 1 + c * (x - 1) ** 3 + s * (x - 1) ** 2 }
// mola: vai de 0 a 1 e passa do ponto, a oscilar até assentar
const mola = (x, f = 2.2, d = 6) => (x <= 0 ? 0 : 1 - Math.exp(-d * x) * Math.cos(f * TAU * x))
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
// pulsos que decaem: devolve o maior de exp(-(t-ti)*d) para os ti já passados
const pulsos = (t, tis, d = 8) => tis.reduce((m, ti) => (t >= ti ? Math.max(m, Math.exp(-(t - ti) * d)) : m), 0)

// ---------- o compasso ----------
// Cada boneco salta uma vez por tempo: sobe a meio, espalma ao aterrar.
function salto(t, off = 0, a = 1) {
  const ph = (((t / BEAT + off) % 1) + 1) % 1
  const h = Math.sin(Math.PI * ph)
  const imp = (1 - h) ** 4
  return { y: -h * a, sy: 1 - 0.07 * imp * a + 0.035 * h * a, sx: 1 + 0.07 * imp * a - 0.025 * h * a }
}
// Parado, um boneco não salta: respira. Um ciclo lento de 3 a 4 s, quase nada.
function respira(t, seed = 0, a = 1) {
  const s = Math.sin((TAU * t) / (3.1 + hash(seed) * 0.9) + seed * 2.1)
  return { y: 0, sx: 1 - 0.008 * s * a, sy: 1 + 0.014 * s * a }
}
// Os olhos mudam de sítio de vez em quando, depressa, e ficam lá (como os nossos).
function espreitar(t, seed = 0, a = 1) {
  const per = 1.4 + hash(seed + 3) * 1.4, tt = t + hash(seed) * 5, k = Math.floor(tt / per), u = tt - k * per
  const alvo = (j) => [(hash(j * 1.3 + seed) - 0.5) * a, (hash(j * 2.1 + seed + 7) - 0.5) * a]
  const p = alvo(k - 1), q = alvo(k), m = suave(Math.min(1, u / 0.09))
  return [lerp(p[0], q[0], m), lerp(p[1], q[1], m)]
}
// piscar os olhos de vez em quando, cada boneco no seu tempo
function piscar(t, seed) {
  const per = 2.4 + hash(seed) * 1.8
  const ph = (t + hash(seed + 1) * 3) % per
  return ph < 0.16 ? Math.sin((Math.PI * ph) / 0.16) : 0
}

// ---------- tinta ----------
function ink(path, fill, lw = 5) {
  ctx.beginPath(); path()
  if (fill) { ctx.fillStyle = fill; ctx.fill() }
  if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = K; ctx.lineJoin = ctx.lineCap = 'round'; ctx.stroke() }
}
const E = (x, y, rx, ry, rot = 0) => () => ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, TAU)
function dot(x, y, r, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill() }
function poly(pts) { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath() }
function mangueira(a, c, b, lw = 11, cor = K) {
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(c[0], c[1], b[0], b[1])
  ctx.lineWidth = lw; ctx.strokeStyle = cor; ctx.lineCap = 'round'; ctx.stroke()
}
// braço ou perna: curva com barriga para um dos lados
function membro(a, b, barriga = 24, lw = 11) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1
  mangueira(a, [mx - (dy / d) * barriga, my + (dx / d) * barriga], b, lw)
}
function olho(x, y, rx, ry, lx = 0, ly = 0, fecho = 0) {
  if (fecho > 0.82) { ctx.beginPath(); ctx.moveTo(x - rx, y + 2); ctx.quadraticCurveTo(x, y + ry * 0.35, x + rx, y + 2); ctx.lineWidth = 3.5; ctx.strokeStyle = K; ctx.stroke(); return }
  const f = 1 - fecho
  ink(E(x, y, rx, ry * f), '#fff', 3.5)
  const px = x + lx * rx * 0.35, py = y + ry * 0.2 * f + ly * ry * 0.25 * f
  ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, rx, ry * f, 0, 0, TAU); ctx.clip()
  ctx.fillStyle = K; ctx.beginPath(); ctx.ellipse(px, py, rx * 0.55, ry * 0.62 * f, 0, 0, TAU); ctx.fill()
  const s = lx >= 0 ? 1 : -1
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(px + s * rx * 0.1, py - ry * 0.1 * f); ctx.lineTo(px + s * rx * 0.7, py - ry * 0.75 * f); ctx.lineTo(px + s * rx * 0.05, py - ry * 0.75 * f); ctx.closePath(); ctx.fill()
  ctx.restore()
}
function luva(x, y, a = 0, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s)
  ink(E(0, 0, 17, 15), '#fff', 4)
  ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(2, 6); ctx.moveTo(2, -8); ctx.lineTo(9, 2); ctx.lineWidth = 2.5; ctx.strokeStyle = K; ctx.stroke()
  ctx.restore()
}
function coracao(x, y, s, fill = CORACAO, lw = 4) {
  ink(() => { ctx.moveTo(x, y + s * 0.9); ctx.bezierCurveTo(x - s * 1.3, y, x - s * 0.6, y - s, x, y - s * 0.3); ctx.bezierCurveTo(x + s * 0.6, y - s, x + s * 1.3, y, x, y + s * 0.9) }, fill, lw)
  dot(x - s * 0.45, y - s * 0.35, s * 0.14, 'rgba(255,255,255,.55)')
}
const estrelaPts = (x, y, r, rot = 0, n = 5) => Array.from({ length: n * 2 }, (_, i) => { const a = (i / (n * 2)) * TAU - Math.PI / 2 + rot, k = i % 2 ? r * 0.45 : r; return [x + Math.cos(a) * k, y + Math.sin(a) * k] })
function estrela(x, y, r, rot = 0, fill = '#f7f0dc') { ink(() => poly(estrelaPts(x, y, r, rot)), fill, 3) }
// várias formas redondas com um só contorno por fora (copas, nuvens)
function tufos(circ, fill, lw = 10) {
  for (const [cx, cy, r] of circ) { ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.9, 0, 0, TAU); ctx.lineWidth = lw; ctx.strokeStyle = K; ctx.stroke() }
  for (const [cx, cy, r] of circ) { ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.9, 0, 0, TAU); ctx.fillStyle = fill; ctx.fill() }
}

// ---------- cenário ----------
function arvore(x, base, t, { s = 1, seed = 0, susto = 0 } = {}) {
  const sw = Math.sin(t * 0.75 + seed * 1.9) * 5 + Math.sin(t * 1.9 + seed) * 1.2
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s)
  ink(() => { ctx.moveTo(-34, 0); ctx.bezierCurveTo(-4, -78, -54, -148, -20 + sw, -218); ctx.lineTo(25 + sw, -218); ctx.bezierCurveTo(-4, -148, 46, -78, 30, 0); ctx.closePath() }, TORRADO)
  const k = 1 + 0.008 * Math.sin(t * 1.1 + seed)
  tufos([[6, -298, 90], [-70, -258, 62], [80, -258, 64], [-40, -328, 55], [55, -333, 55]].map(([cx, cy, r]) => [cx * k + sw * 1.4, cy, r * k]), SOMBRA)
  const ex = sw * 0.35, f = piscar(t, seed + 7), g = 1 + susto * 0.5, [mx, my] = susto ? [-0.3, 0] : espreitar(t, seed + 11, 0.9)
  olho(-13 + ex, -128 - susto * 6, 10 * g, 15 * g, mx, my, susto ? 0 : f); olho(15 + ex, -128 - susto * 6, 10 * g, 15 * g, mx, my, susto ? 0 : f)
  if (susto > 0.2) ink(E(1 + ex, -100, 7, 9 * susto), K, 2); else ink(() => ctx.arc(1 + ex, -110, 14, 0.3, 2.8), null, 4)
  ctx.restore()
}
function nuvem(x, y, t, s = 1, seed = 0) {
  const b = Math.sin(t * 0.6 + seed) * 4
  ctx.save(); ctx.translate(x, y + b); ctx.scale(s, s)
  tufos([[0, 0, 42], [-45, 12, 30], [45, 12, 32], [-20, -22, 30], [22, -20, 28]], BRANCO, 8)
  ctx.lineWidth = 3; ctx.strokeStyle = K
  for (const ex of [-14, 14]) { ctx.beginPath(); ctx.arc(ex, 4, 7, 0.2, Math.PI - 0.2); ctx.stroke() }
  ctx.restore()
}
function sol(x, y, r, t) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.35)
  for (let i = 0; i < 12; i++) { ctx.rotate(TAU / 12); ink(() => poly([[r + 8, -9], [r + 34 + (i % 2) * 12, 0], [r + 8, 9]]), '#f7f0dc', 3) }
  ctx.restore()
  ink(E(x, y, r, r), '#f7f0dc', 5)
  const f = piscar(t, 31), [mx, my] = espreitar(t, 31, 0.9); olho(x - 16, y - 10, 9, 13, mx, my, f); olho(x + 14, y - 10, 9, 13, mx, my, f)
  ink(() => ctx.arc(x, y + 6, 22, 0.35, 2.8), null, 4)
}
function lua(x, y, r, t) {
  ink(E(x, y, r, r), '#f7f0dc', 5)
  const f = piscar(t, 17), [mx, my] = espreitar(t, 17, 0.7); olho(x - 18, y - 12, 9, 13, 0.5 + mx, 0.2 + my, f); olho(x + 12, y - 12, 9, 13, 0.5 + mx, 0.2 + my, f)
  ink(() => ctx.arc(x, y + 6, 26, 0.35, 2.8), null, 4)
}
function fonte(x, base, t) {
  ctx.save(); ctx.translate(x, base)
  ink(() => { ctx.moveTo(-110, 0); ctx.quadraticCurveTo(0, 110, 110, 0); ctx.closePath() }, MEIO)
  ink(E(0, 0, 110, 18), TORRADO)
  ink(() => ctx.rect(-14, -70, 28, 70), MEIO)
  ink(E(0, -72, 55, 14), MEIO)
  const arco = (s, u) => { const a = [0, -95], c = [s * 50, -170], b = [s * 95, -8], v = 1 - u; return [v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], v * v * a[1] + 2 * v * u * c[1] + u * u * b[1]] }
  for (const s of [-1, 1]) {
    ctx.beginPath(); ctx.moveTo(0, -95); ctx.quadraticCurveTo(s * 50, -170, s * 95, -8); ctx.lineWidth = 15; ctx.strokeStyle = K; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = '#fff'; ctx.stroke()
    for (let k = 0; k < 4; k++) { const u = ((t * 0.9 + k / 4 + (s > 0 ? 0.12 : 0)) % 1), [px, py] = arco(s, u); ink(() => { ctx.moveTo(px, py - 9); ctx.quadraticCurveTo(px + 7, py + 3, px, py + 5); ctx.quadraticCurveTo(px - 7, py + 3, px, py - 9) }, '#fff', 2.5) }
  }
  const j = 1 + 0.15 * Math.sin(t * 20)
  ink(() => { ctx.moveTo(-8, -76); ctx.quadraticCurveTo(0, -100 - 12 * j, 8, -76) }, '#fff', 3)
  ctx.restore()
}
function placa(x, base, t, texto) {
  const w = Math.sin(t * 1.3) * 0.008
  ctx.save(); ctx.translate(x, base); ctx.rotate(w)
  ink(() => ctx.rect(-7, -120, 14, 120), TORRADO, 4)
  ctx.font = '22px Chango'; const tw = ctx.measureText(texto).width / 2 + 18
  ink(() => poly([[-tw, -150], [tw, -150], [tw + 26, -125], [tw, -100], [-tw, -100]]), CLARO, 5)
  ctx.fillStyle = K; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(texto, 0, -124)
  ctx.restore()
}

// ---------- cavalo e coche (servem a várias lendas) ----------
function cavalo(o) {
  const { x, base, s = 1, fase = 0, anda = 0, t = 0, susto = 0, fecho = 0 } = o
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s)
  const bob = -Math.abs(Math.sin(fase)) * 5 * anda + Math.sin(t * 1.8) * 1.5 * (1 - anda)
  const pernas = [[-62, 0], [-44, Math.PI], [52, Math.PI], [70, 0]]
  for (const [hx, off] of pernas) {
    const px = hx + Math.sin(fase + off) * 22 * anda, py = -Math.max(0, Math.cos(fase + off)) * 18 * anda
    mangueira([hx, -105 + bob], [hx + (px - hx) * 0.5 + 10, -55], [px, py - 12], 13)
    ink(E(px + 2, py - 6, 15, 9), K, 3)
  }
  ctx.translate(0, bob)
  const cauda = Math.sin(t * 5.5) * 12
  mangueira([-88, -138], [-122, -150], [-128, -86 + cauda], 10)
  ink(E(-128, -80 + cauda, 9, 16, 0.2), K, 3)
  ink(E(0, -132, 95, 45), MEIO)
  ink(() => { ctx.moveTo(-12, -176); ctx.lineTo(-4, -88) }, null, 6)
  ink(() => { ctx.moveTo(52, -160); ctx.quadraticCurveTo(95, -214, 122, -240); ctx.lineTo(156, -220); ctx.quadraticCurveTo(110, -184, 86, -118); ctx.closePath() }, MEIO)
  ctx.fillStyle = K; ctx.beginPath(); ctx.moveTo(56, -166)
  for (let i = 0; i <= 6; i++) { const u = i / 6; ctx.lineTo(56 + u * 64 - 12 * (i % 2), -166 - u * 76 - 6 * (i % 2)) }
  ctx.lineTo(126, -236); ctx.lineTo(62, -158); ctx.closePath(); ctx.fill()
  const aceno = Math.sin(t * 4.2) * 0.05 * (1 - anda)
  ctx.save(); ctx.translate(140, -228); ctx.rotate(aceno)
  ink(() => poly([[-14, -18 - susto * 10], [-20, -52 - susto * 22], [2, -24]]), MEIO, 4)
  ink(E(10, 0, 42, 28, 0.35), MEIO)
  ink(E(42, 20, 24, 19, 0.35), BRANCO)
  dot(52, 18, 3.5, K)
  ink(() => ctx.arc(36, 30, 10, 0.4, 2.2), null, 3)
  const g = 1 + susto * 0.55
  olho(8, -12 - susto * 6, 9 * g, 13 * g, 1, 0, susto ? 0 : fecho)
  ctx.restore()
  ctx.restore()
}
// o coche: `dentro(janela)` desenha quem vai à janela; porta de 0 (fechada) a 1 (aberta)
function coche(o) {
  const { x, base, s = 1, roda = 0, oscila = 0, porta = 0, janela, portaDentro } = o
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s)
  ctx.save(); ctx.translate(0, oscila)
  ink(() => { ctx.moveTo(-150, -100); ctx.lineTo(-150, -220); ctx.quadraticCurveTo(-150, -266, -100, -268); ctx.lineTo(100, -268); ctx.quadraticCurveTo(150, -266, 150, -220); ctx.lineTo(150, -100); ctx.quadraticCurveTo(0, -80, -150, -100) }, CLARO)
  ink(() => ctx.roundRect(-164, -290, 328, 24, 10), TORRADO)
  for (const bx of [-120, 0, 120]) ink(E(bx, -300, 10, 10), CLARO, 4)
  ctx.lineWidth = 3; ctx.strokeStyle = K
  ctx.beginPath(); ctx.moveTo(-140, -118); ctx.quadraticCurveTo(-70, -108, -30, -120); ctx.stroke()
  // janela
  ink(() => ctx.roundRect(-122, -242, 84, 78, [30, 30, 6, 6]), ESCURO)
  if (janela) { ctx.save(); ctx.beginPath(); ctx.roundRect(-122, -242, 84, 78, [30, 30, 6, 6]); ctx.clip(); janela(-80, -196); ctx.restore(); ink(() => ctx.roundRect(-122, -242, 84, 78, [30, 30, 6, 6]), null, 5) }
  // porta: roda na dobradiça do lado direito e mostra o escuro de dentro
  ink(() => ctx.rect(4, -238, 100, 142), ESCURO)
  if (portaDentro) { ctx.save(); ctx.beginPath(); ctx.rect(4, -238, 100, 142); ctx.clip(); portaDentro(54, -96); ctx.restore(); ink(() => ctx.rect(4, -238, 100, 142), null, 5) }
  const kx = Math.cos((porta * Math.PI) / 2 * 0.92)
  ctx.save(); ctx.translate(104, 0); ctx.scale(-kx, 1)
  ink(() => ctx.rect(0, -238, 100, 142), CLARO)
  ink(() => ctx.roundRect(22, -222, 56, 50, [20, 20, 4, 4]), ESCURO, 4)
  ink(() => { ctx.moveTo(22, -200); ctx.quadraticCurveTo(50, -180, 78, -200) }, null, 3)
  ink(E(84, -160, 5, 5), K, 2)
  ctx.restore()
  ctx.restore()
  for (const wx of [-92, 92]) {
    ctx.save(); ctx.translate(wx, -52); ctx.rotate(roda)
    ctx.lineWidth = 4; ctx.strokeStyle = K
    for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 44, Math.sin(a) * 44); ctx.stroke() }
    ink(E(0, 0, 50, 50), null, 9); ink(E(0, 0, 42, 42), null, 3); ink(E(0, 0, 11, 11), TORRADO, 4)
    ctx.restore()
  }
  ctx.restore()
}

// ---------- andar ----------
// Um passo completo por volta de `fase` (2π). Devolve os pés, o sobe-e-desce
// do corpo e o balanço dos braços, para qualquer boneco de pernas de mangueira.
function passada(fase, amp = 1) {
  const s = Math.sin(fase), c = Math.cos(fase)
  return { pe: [s * 22 * amp, -Math.max(0, c) * 14 * amp, -s * 22 * amp, -Math.max(0, -c) * 14 * amp], bob: -Math.abs(c) * 5 * amp, braco: s * amp }
}

// ---------- luz ----------
function escurecer(a, cor = '10,8,5') { if (a <= 0) return; ctx.fillStyle = `rgba(${cor},${a})`; ctx.fillRect(-20, -20, W + 40, H + 40) }
function brilho(x, y, r, a = 0.35, cor = '255,244,214') {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${cor},${a})`); g.addColorStop(1, `rgba(${cor},0)`)
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2)
}
function chama(x, y, t, s = 1, seed = 0) {
  const f = 1 + 0.12 * Math.sin(t * 17 + seed) + 0.08 * Math.sin(t * 29 + seed * 2), w = Math.sin(t * 11 + seed) * 3
  ink(() => { ctx.moveTo(x - 9 * s, y); ctx.quadraticCurveTo(x - 11 * s, y - 16 * s * f, x + w * s, y - 34 * s * f); ctx.quadraticCurveTo(x + 11 * s, y - 16 * s * f, x + 9 * s, y); ctx.quadraticCurveTo(x, y + 6 * s, x - 9 * s, y) }, '#fbf3d8', 3 * s)
  ink(() => { ctx.moveTo(x - 4 * s, y - 2 * s); ctx.quadraticCurveTo(x - 4 * s, y - 10 * s * f, x + w * 0.5 * s, y - 18 * s * f); ctx.quadraticCurveTo(x + 4 * s, y - 10 * s * f, x + 4 * s, y - 2 * s); ctx.closePath() }, '#fff', 0)
}
function vela(x, y, t, { s = 1, acesa = 1, seed = 0 } = {}) {
  if (acesa > 0) brilho(x, y - 40 * s, 160 * s * acesa, 0.4 * acesa)
  ink(() => ctx.roundRect(x - 13 * s, y - 60 * s, 26 * s, 60 * s, 3), BRANCO, 4 * s)
  ink(() => { ctx.moveTo(x - 6 * s, y - 60 * s); ctx.quadraticCurveTo(x - 8 * s, y - 48 * s, x - 5 * s, y - 42 * s) }, null, 3 * s)
  ink(E(x, y, 34 * s, 9 * s), TORRADO, 4 * s)
  ctx.beginPath(); ctx.moveTo(x, y - 60 * s); ctx.lineTo(x + 1, y - 70 * s); ctx.lineWidth = 2.5 * s; ctx.strokeStyle = K; ctx.stroke()
  if (acesa > 0) { ctx.save(); ctx.translate(x, y - 66 * s); ctx.scale(acesa, acesa); chama(0, 0, t, s, seed); ctx.restore() }
}
function tocha(x, y, t, s = 1, seed = 0) {
  brilho(x, y - 50 * s, 220 * s, 0.32)
  ink(() => poly([[x - 6 * s, y - 30 * s], [x + 6 * s, y - 30 * s], [x + 3 * s, y + 70 * s], [x - 3 * s, y + 70 * s]]), TORRADO, 3.5 * s)
  ink(() => ctx.roundRect(x - 11 * s, y - 44 * s, 22 * s, 16 * s, 3), SOMBRA, 3.5 * s)
  chama(x, y - 42 * s, t, s * 1.5, seed)
}

// ---------- a sala do trono ----------
function quinas(x, y, s) {
  for (const [dx, dy] of [[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]]) ink(() => { const cx = x + dx * 13 * s, cy = y + dy * 15 * s; ctx.moveTo(cx - 5 * s, cy - 6 * s); ctx.lineTo(cx + 5 * s, cy - 6 * s); ctx.lineTo(cx + 5 * s, cy + 2 * s); ctx.quadraticCurveTo(cx, cy + 8 * s, cx - 5 * s, cy + 2 * s); ctx.closePath() }, ESCURO, 1.5)
}
function estandarte(x, y, t, s = 1, seed = 0) {
  const w = Math.sin(t * 1.3 + seed) * 4
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  ink(() => { ctx.moveTo(-60, 0); ctx.lineTo(60, 0) }, null, 6)
  ink(() => { ctx.moveTo(-48, 0); ctx.lineTo(48, 0); ctx.lineTo(48 + w, 190); ctx.lineTo(w, 160); ctx.lineTo(-48 + w, 190); ctx.closePath() }, CLARO, 5)
  ink(() => { ctx.moveTo(-34, 30); ctx.lineTo(34, 30); ctx.lineTo(34 + w * 0.5, 100); ctx.quadraticCurveTo(w * 0.5, 140, -34 + w * 0.5, 100); ctx.closePath() }, BRANCO, 4)
  quinas(w * 0.3, 72, 1)
  ctx.restore()
}
function janelaGotica(x, y, w, h, t, luz = 1) {
  ink(() => { ctx.moveTo(x - w / 2, y + h); ctx.lineTo(x - w / 2, y + w * 0.4); ctx.quadraticCurveTo(x - w / 2, y, x, y - w * 0.25); ctx.quadraticCurveTo(x + w / 2, y, x + w / 2, y + w * 0.4); ctx.lineTo(x + w / 2, y + h); ctx.closePath() }, luz > 0.5 ? BRANCO : '#5f574a', 6)
  ink(() => { ctx.moveTo(x, y - w * 0.2); ctx.lineTo(x, y + h); ctx.moveTo(x - w / 2, y + h * 0.55); ctx.lineTo(x + w / 2, y + h * 0.55) }, null, 4)
  ink(E(x, y + w * 0.18, w * 0.16, w * 0.16), null, 3)
}
function raioLuz(x0, y0, w0, x1, y1, w1, a = 0.16) {
  ctx.fillStyle = `rgba(255,248,226,${a})`; ctx.beginPath(); ctx.moveTo(x0 - w0 / 2, y0); ctx.lineTo(x0 + w0 / 2, y0); ctx.lineTo(x1 + w1 / 2, y1); ctx.lineTo(x1 - w1 / 2, y1); ctx.closePath(); ctx.fill()
}
function trono(x, base, s = 1) {
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s)
  ink(() => ctx.rect(-150, -30, 300, 30), CLARO, 5); ink(() => ctx.rect(-120, -58, 240, 28), CLARO, 5)
  ink(() => { ctx.moveTo(-85, -58); ctx.lineTo(-85, -330); ctx.lineTo(-50, -330); ctx.quadraticCurveTo(0, -420, 50, -330); ctx.lineTo(85, -330); ctx.lineTo(85, -58); ctx.closePath() }, TORRADO, 6)
  ink(() => { ctx.moveTo(-58, -150); ctx.lineTo(-58, -300); ctx.quadraticCurveTo(0, -380, 58, -300); ctx.lineTo(58, -150); ctx.closePath() }, SOMBRA, 4)
  for (const bx of [-85, 85]) ink(E(bx, -340, 12, 12), CLARO, 4)
  ink(E(0, -372, 14, 14), CLARO, 4)
  ink(() => ctx.roundRect(-100, -150, 200, 36, 12), MEIO, 5)
  for (const bx of [-110, 110]) { ink(() => ctx.roundRect(bx - 16, -190, 32, 132, 8), TORRADO, 5); ink(E(bx, -196, 20, 12), CLARO, 4) }
  ctx.restore()
}
function salaTrono(t, { trono: tx = 640, luz = 1 } = {}) {
  ctx.fillStyle = '#d2c6a8'; ctx.fillRect(-20, -20, W + 40, H + 40)
  ctx.strokeStyle = 'rgba(22,18,14,.28)'; ctx.lineWidth = 2.5
  for (let y = 40, r = 0; y < 560; y += 58, r++) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); for (let x = (r % 2) * 70; x < W; x += 140) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 58); ctx.stroke() } }
  for (const wx of [230, 1050]) { raioLuz(wx, 330, 120, wx + 140, 700, 260, 0.13 * luz); janelaGotica(wx, 110, 120, 220, t, luz) }
  estandarte(430, 30, t, 1, 1); estandarte(850, 30, t, 1, 2.2)
  ink(() => ctx.rect(-20, 556, W + 40, 200), '#c7ba98', 5)
  ctx.strokeStyle = 'rgba(22,18,14,.45)'; ctx.lineWidth = 3
  for (const y of [590, 632, 684]) { ctx.beginPath(); ctx.moveTo(-20, y); ctx.lineTo(W + 20, y); ctx.stroke() }
  for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(640 + i * 80, 556); ctx.lineTo(640 + i * 150, 740); ctx.stroke() }
  ctx.fillStyle = 'rgba(22,18,14,.1)'; ctx.beginPath(); ctx.moveTo(tx - 190, 556); ctx.lineTo(tx + 190, 556); ctx.lineTo(tx + 230, 740); ctx.lineTo(tx - 230, 740); ctx.closePath(); ctx.fill()
}

// ---------- balões, fitas, pergaminhos ----------
// Balão de pensamento: a nuvem em (x,y) e as bolinhas até à cabeça (hx,hy).
// `abre` de 0 a 1; `dentro()` desenha o que se pensa, com a origem no centro do balão.
function balao(x, y, w, h, hx, hy, abre, dentro) {
  if (abre <= 0) return
  const k = volta(Math.min(1, abre), 2.2)
  for (let i = 0; i < 3; i++) { const u = (i + 1) / 4; if (abre > u * 0.4) ink(E(lerp(hx, x, u), lerp(hy, y + h * 0.4, u), 6 + i * 5, 6 + i * 5), BRANCO, 4) }
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  const bolhas = []; for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; bolhas.push([Math.cos(a) * w * 0.4, Math.sin(a) * h * 0.36, Math.min(w, h) * 0.2]) }
  tufos(bolhas.concat([[0, 0, Math.min(w, h) * 0.42]]), BRANCO, 8)
  tufos([[0, 0, 1]], BRANCO, 0)
  ctx.fillStyle = BRANCO; ctx.beginPath(); ctx.ellipse(0, 0, w * 0.46, h * 0.42, 0, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.ellipse(0, 0, w * 0.46, h * 0.42, 0, 0, TAU); ctx.clip()
  if (dentro) dentro()
  ctx.restore()
}
function fita(x, y, texto, fonte = 'italic 30px Georgia') {
  ctx.font = fonte; const w = ctx.measureText(texto).width / 2 + 40
  ink(() => { ctx.moveTo(x - w, y - 24); ctx.lineTo(x + w, y - 24); ctx.lineTo(x + w - 22, y); ctx.lineTo(x + w, y + 24); ctx.lineTo(x - w, y + 24); ctx.lineTo(x - w + 22, y); ctx.closePath() }, CLARO, 5)
  ctx.fillStyle = K; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(texto, x, y + 1)
}
function pergaminho(x, y, w, h, abre, dentro) {
  const hh = h * suave(clamp(abre))
  ink(() => ctx.rect(x - w / 2, y - hh / 2, w, hh), '#efe6cf', 5)
  if (hh > 20 && dentro) { ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - hh / 2, w, hh); ctx.clip(); dentro(); ctx.restore() }
  for (const s of [-1, 1]) { ink(() => ctx.roundRect(x - w / 2 - 16, y + (s * hh) / 2 - 16, w + 32, 32, 16), CLARO, 5); for (const e of [-1, 1]) ink(E(x + e * (w / 2 + 16), y + (s * hh) / 2, 10, 16), TORRADO, 4) }
}
// uma nuvem de tempestade, escura e sem cara
function nuvemEscura(x, y, s, t, seed = 0) {
  ctx.save(); ctx.translate(x + Math.sin(t * 0.4 + seed) * 12, y); ctx.scale(s, s)
  tufos([[0, 0, 60], [-70, 16, 44], [70, 14, 48], [-30, -34, 44], [36, -30, 42], [120, 26, 30], [-118, 28, 30]], '#6f6656', 8)
  ctx.restore()
}

// ---------- sombras ----------
// Desenha qualquer coisa (um boneco inteiro) só como sombra numa parede:
// pinta-se numa camada à parte e troca-se a cor de tudo o que ficou pintado.
let CAMADA
function silhueta(fn, cor = 'rgba(16,12,8,.8)') {
  if (!CAMADA) { CAMADA = document.createElement('canvas'); CAMADA.width = TELA.width; CAMADA.height = TELA.height }
  const c2 = CAMADA.getContext('2d'), m = ctx.getTransform()
  c2.setTransform(1, 0, 0, 1, 0, 0); c2.clearRect(0, 0, CAMADA.width, CAMADA.height); c2.setTransform(m)
  const antes = ctx; ctx = c2; try { fn() } finally { ctx = antes }
  c2.setTransform(1, 0, 0, 1, 0, 0); c2.globalCompositeOperation = 'source-in'; c2.fillStyle = cor; c2.fillRect(0, 0, CAMADA.width, CAMADA.height); c2.globalCompositeOperation = 'source-over'
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(CAMADA, 0, 0); ctx.restore()
}

// ---------- transições e película ----------
function iris(cx, cy, r) {
  if (r > 1600) return
  ctx.fillStyle = K; ctx.beginPath(); ctx.rect(-50, -50, W + 100, H + 100); ctx.moveTo(cx + Math.max(0, r), cy); ctx.arc(cx, cy, Math.max(0, r), 0, TAU, true); ctx.fill()
}
function raios(cx, cy, t, n = 18) {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.25)
  for (let i = 0; i < n; i++) { ctx.fillStyle = i % 2 ? CLARO : PAPEL; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 1600, (i / n) * TAU, ((i + 1) / n) * TAU); ctx.closePath(); ctx.fill() }
  ctx.restore()
}
// passo: de quantas em quantas imagens muda o grão (2 = "em dois", como a animação da época)
const PEL = { passo: 2, alfa: 12, tremor: 1 }
let ruido = []
function preparaRuido() {
  ruido = Array.from({ length: 6 }, (_, k) => {
    const c = document.createElement('canvas'); c.width = c.height = 256
    const g = c.getContext('2d'), id = g.createImageData(256, 256)
    for (let i = 0; i < id.data.length; i += 4) { const v = hash(i * 0.37 + k * 91.3) * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = PEL.alfa }
    g.putImageData(id, 0, 0); return c
  })
}
// O tempo da película: grão, tremor de luz, riscos e pó mudam a cada imagem.
function pelicula(t, fps = 24) {
  const f = Math.floor(Math.floor(t * fps + 1e-6) / PEL.passo)
  ctx.save()
  const pat = ctx.createPattern(ruido[f % ruido.length], 'repeat')
  ctx.translate(-hash(f) * 256, -hash(f + 3) * 256); ctx.fillStyle = pat; ctx.fillRect(0, 0, W + 512, H + 512)
  ctx.restore()
  const fl = (hash(f * 1.7) - 0.5) * 0.07
  ctx.fillStyle = fl > 0 ? `rgba(255,248,230,${fl})` : `rgba(20,14,6,${-fl})`; ctx.fillRect(0, 0, W, H)
  const riscos = Math.floor(hash(f * 2.3) * 3.2)
  for (let i = 0; i < riscos; i++) { const sx = hash(f * 5.1 + i) * W; ctx.strokeStyle = hash(f + i * 9) > 0.5 ? 'rgba(25,18,8,.35)' : 'rgba(255,250,235,.4)'; ctx.lineWidth = 0.8 + hash(f + i) * 1.2; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx + (hash(f * 7 + i) - 0.5) * 16, H); ctx.stroke() }
  for (let i = 0; i < 14; i++) dot(hash(f * 3.3 + i * 1.1) * W, hash(f * 4.7 + i * 2.3) * H, hash(f + i * 5.5) * 2.2 + 0.4, 'rgba(20,14,8,.55)')
  if (hash(f * 9.1) > 0.8) { const hx = hash(f * 1.3) * W, hy = hash(f * 2.9) * H; ctx.strokeStyle = 'rgba(20,14,8,.5)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.bezierCurveTo(hx + 20, hy - 15, hx + 10, hy + 25, hx + 35, hy + 10); ctx.stroke() }
  const v = ctx.createRadialGradient(W / 2, H / 2, 260, W / 2, H / 2, 780); v.addColorStop(0, 'rgba(40,28,10,0)'); v.addColorStop(1, 'rgba(40,28,10,.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#0b0906'; ctx.beginPath(); ctx.rect(-50, -50, W + 100, H + 100); ctx.roundRect(12, 8, W - 24, H - 16, 56); ctx.fill('evenodd')
}

// ---------- ligação ao desenhador ----------
let TELA
async function boot(tl) {
  TL = tl; BEAT = tl.beat; Object.assign(PEL, tl.pelicula || {})
  TELA = document.getElementById('c'); ctx = TELA.getContext('2d')
  await document.fonts.load('60px Chango'); await document.fonts.ready
  preparaRuido()
  return true
}
function frame(t) {
  const f = Math.floor(Math.floor(t * TL.fps + 1e-6) / PEL.passo)
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#0b0906'; ctx.fillRect(0, 0, TELA.width, TELA.height)
  ctx.setTransform(ESC, 0, 0, ESC, (hash(f * 1.9) - 0.5) * 1.6 * PEL.tremor, (hash(f * 2.7) - 0.5) * 2.2 * PEL.tremor)
  ctx.fillStyle = PAPEL; ctx.fillRect(-10, -10, W + 20, H + 20)
  cena(t)
  pelicula(t, TL.fps)
}
function shot(tipo = 'image/jpeg', q = 0.95) { return TELA.toDataURL(tipo, q) }
