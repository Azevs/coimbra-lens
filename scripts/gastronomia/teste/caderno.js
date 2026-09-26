// Estilo B — caderno de receitas conventual. Tinta de ferro sobre papel
// velho; o desenho vai-se traçando, a massa cresce e deixa ficar, a tinta
// leve, cada contorno por onde passou. Anotações à mão, só com o nome das
// coisas. Movimento contínuo a 24 imagens por segundo.

const TINTA = '#3a2a1c', VERMELHO = '#8c2f1b', AGUADA = 'rgba(122, 84, 44, ', PAPEL_B = '#ecdfc1'
let ctx, FOLHA
const ESC = 0.8, OX = 1010, OY = 590 // o desenho ocupa o centro da página, com margem para as notas

function boot() {
  ctx = document.getElementById('c').getContext('2d')
  FOLHA = new OffscreenCanvas(W, H)
  const x = FOLHA.getContext('2d')
  x.fillStyle = PAPEL_B; x.fillRect(0, 0, W, H)
  let s = 7
  const r = () => hash(++s * 0.917)
  // nódoas e fibras do papel
  for (let i = 0; i < 28; i++) {
    const cx = r() * W, cy = r() * H, rr = 80 + r() * 320
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, rr)
    g.addColorStop(0, 'rgba(170, 130, 70, 0.10)'); g.addColorStop(0.7, 'rgba(170, 130, 70, 0.04)'); g.addColorStop(1, 'rgba(170, 130, 70, 0)')
    x.fillStyle = g; x.fillRect(0, 0, W, H)
  }
  x.strokeStyle = 'rgba(120, 90, 50, 0.07)'; x.lineWidth = 1
  for (let i = 0; i < 900; i++) { const a = r() * W, b = r() * H, ang = r() * TAU, l = 6 + r() * 24; x.beginPath(); x.moveTo(a, b); x.lineTo(a + Math.cos(ang) * l, b + Math.sin(ang) * l); x.stroke() }
  // bordas tostadas
  const v = x.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, W * 0.62)
  v.addColorStop(0, 'rgba(110, 70, 30, 0)'); v.addColorStop(1, 'rgba(110, 70, 30, 0.38)')
  x.fillStyle = v; x.fillRect(0, 0, W, H)
  // pauta e margem
  x.strokeStyle = 'rgba(130, 110, 80, 0.22)'
  for (let y = 132; y < H - 40; y += 46) { x.beginPath(); x.moveTo(40, y); x.lineTo(W - 40, y); x.stroke() }
  x.strokeStyle = 'rgba(150, 70, 45, 0.35)'
  for (const mx of [196, 203]) { x.beginPath(); x.moveTo(mx, 0); x.lineTo(mx, H); x.stroke() }
}

// Traço de pena: a mão treme devagar (ondulação larga, não ruído), a
// espessura muda com a pressão, e a tinta carrega mais onde a pena pousa.
function pena(pts0, frac, larg = 2.2, fechar = false, alfa = 1, semente = 0, cor = TINTA) {
  let pts = fechar ? [...pts0, pts0[0]] : pts0
  // subdivide para a ondulação ter onde se ver
  const fino = []
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]], n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 8))
    for (let j = 0; j < n; j++) fino.push([lerp(a[0], b[0], j / n), lerp(a[1], b[1], j / n)])
  }
  fino.push(pts[pts.length - 1])
  pts = fino.map(([x, y], i) => [x + fbm(i * 0.035 + semente) * 3.2, y + fbm(i * 0.035 + semente + 50) * 3.2])
  const ate = Math.floor((pts.length - 1) * clamp(frac))
  ctx.strokeStyle = cor; ctx.lineCap = 'round'
  for (let i = 1; i <= ate; i++) {
    const pressao = 0.65 + 0.55 * (ruido(i * 0.05 + semente * 3) * 0.5 + 0.5)
    ctx.globalAlpha = alfa * (0.72 + 0.25 * pressao)
    ctx.lineWidth = larg * pressao
    ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke()
  }
  ctx.globalAlpha = 1
}
// um risco recto à mão, que passa um pouco das esquinas
function risco(x0, y0, x1, y1, frac, larg, semente) {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy), ex = (dx / l) * 14, ey = (dy / l) * 14
  pena([[x0 - ex, y0 - ey], [x1 + ex, y1 + ey]], frac, larg, false, 1, semente)
}
const noDesenho = (pts) => pts.map(([x, y]) => [OX + (x - CX) * ESC, OY + (y - CY) * ESC])

function escrever(texto, x, y, t0, dur, tam = 50, ang = 0, cor = TINTA) {
  const k = prog(t0, t0 + dur, T)
  if (k <= 0) return
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang)
  ctx.font = `${tam}px Gabriola`
  const l = ctx.measureText(texto).width
  ctx.beginPath(); ctx.rect(-10, -tam, l * k + 10, tam * 1.6); ctx.clip()
  ctx.fillStyle = cor; ctx.globalAlpha = 0.9; ctx.fillText(texto, 0, 0)
  ctx.restore()
}
// linha de chamada a sair da nota até ao desenho
function chamada(x0, y0, x1, y1, t0) {
  const k = prog(t0, t0 + 0.5, T)
  if (k <= 0) return
  const pts = []
  for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([lerp(x0, x1, u) + Math.sin(u * Math.PI) * 30, lerp(y0, y1, u) - Math.sin(u * Math.PI) * 18]) }
  pena(pts, suave(k), 1.4)
  if (k >= 1) { ctx.fillStyle = TINTA; ctx.beginPath(); ctx.arc(x1, y1, 3.5, 0, TAU); ctx.fill() }
}

let T = 0
function frame(t) {
  T = t
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.drawImage(FOLHA, 0, 0)

  // a mesa, traçada primeiro: quatro riscos à mão, cada um no seu tempo
  const [a, b, c, d] = noDesenho([[150, 90], [1770, 90], [1770, 1030], [150, 1030]])
  const lados = [[a, b], [b, c], [c, d], [d, a]]
  lados.forEach(([p, q], i) => risco(p[0], p[1], q[0], q[1], suave(prog(i * 0.22, i * 0.22 + 0.45, t)), 2.3, i * 13))
  const [a2, b2, c2, d2] = noDesenho([[185, 125], [1735, 125], [1735, 995], [185, 995]])
  ;[[a2, b2], [b2, c2], [c2, d2], [d2, a2]].forEach(([p, q], i) => {
    ctx.save(); ctx.globalAlpha = 0.45; risco(p[0], p[1], q[0], q[1], suave(prog(0.5 + i * 0.15, 0.9 + i * 0.15, t)), 1.1, 70 + i * 13); ctx.restore()
  })

  // as mãos, em contorno, com uma aguada leve
  for (const m0 of maos(t)) {
    const m = { ...m0, x: OX + (m0.x - CX) * ESC, y: OY + (m0.y - CY) * ESC }
    ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.ang); ctx.scale(ESC * HS, ESC * HS)
    ctx.strokeStyle = TINTA; ctx.lineWidth = 1.7; ctx.lineJoin = 'round'
    // dedos e polegar primeiro; a palma tapa-lhes a raiz
    ctx.fillStyle = PAPEL_B
    for (const dd of DEDOS) { ctx.beginPath(); dedo(ctx, dd); ctx.fill(); ctx.stroke() }
    ctx.beginPath(); polegar(ctx, m.lado); ctx.fill(); ctx.stroke()
    ctx.beginPath(); palmaBraco(ctx); ctx.fillStyle = PAPEL_B; ctx.fill(); ctx.fillStyle = AGUADA + '0.10)'; ctx.fill(); ctx.stroke()
    // unhas e nós
    ctx.lineWidth = 0.9
    for (const [qb, xt, qt] of DEDOS) { ctx.beginPath(); ctx.arc(xt + 7, qt, 5, -1.2, 1.2); ctx.stroke(); ctx.beginPath(); ctx.arc(64, qb, 5, -1.4, 1.4); ctx.stroke() }
    // sombreado de gravura: riscos a atravessar o braço do lado da sombra,
    // a seguir a curva do volume, todos do mesmo tamanho
    ctx.globalAlpha = 0.38; ctx.lineWidth = 0.8; ctx.beginPath()
    for (let x = 180; x < 1120; x += 9) {
      const meia = 36 + ((x - 150) / 1000) * 26
      ctx.moveTo(x, m.lado * meia); ctx.quadraticCurveTo(x - 5, m.lado * meia * 0.55, x - 2, m.lado * meia * 0.15)
    }
    ctx.stroke()
    ctx.restore()
  }

  if (t > 0.5) {
    // os contornos por onde a massa já passou ficam, a tinta leve
    for (let ts = 1.0; ts < t - 0.05; ts += 0.6) {
      ctx.save(); ctx.setLineDash([2, 7]); ctx.strokeStyle = TINTA; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.1
      ctx.beginPath(); caminho(ctx, noDesenho(contorno(ts, 160))); ctx.stroke(); ctx.restore()
    }
    const f = finura(t)
    const borda = noDesenho(contorno(t, 220))
    // aguada: cada vez mais leve, porque a massa é cada vez mais fina
    ctx.fillStyle = AGUADA + lerp(0.42, 0.07, f).toFixed(3) + ')'
    ctx.beginPath(); caminho(ctx, borda); ctx.fill()
    // tracejado cruzado junto à borda, onde fica grossa
    ctx.save(); ctx.beginPath(); caminho(ctx, borda); ctx.clip()
    ctx.lineWidth = 1.2; ctx.strokeStyle = TINTA; ctx.globalAlpha = 0.5
    const dentro = noDesenho(contorno(t, 220, 0, 0, 0.94))
    ctx.beginPath(); caminho(ctx, dentro); ctx.rect(W, 0, -W, H); ctx.clip('evenodd')
    ctx.beginPath(); for (let x = -H; x < W; x += 9) { ctx.moveTo(x, 0); ctx.lineTo(x + H, H) } ctx.stroke()
    ctx.restore()
    pena(borda, suave(prog(0.5, 1.0, t)), 2.4, true, 1, 200)
  }

  // notas: o título a vermelho, como nas rubricas dos livros de mão
  escrever('Pastel de Tentúgal', 250, 118, 0.2, 1.2, 68, 0, VERMELHO)
  const flo = []
  for (let i = 0; i <= 80; i++) { const u = i / 80; flo.push([255 + u * 420, 142 + Math.sin(u * TAU * 1.5) * 7 * (1 - u) + u * 4]) }
  pena(flo, suave(prog(1.2, 1.9, t)), 1.6, false, 0.8, 9, VERMELHO)
  escrever('a massa', 1540, 330, 1.6, 0.7, 50, -0.05)
  const p = noDesenho([[CX + Math.cos(-0.6) * raio(-0.6, t) * SX * 0.7, CY + Math.sin(-0.6) * raio(-0.6, t) * 0.7]])[0]
  chamada(1530, 318, p[0], p[1], 2.1)
  escrever('puxada à mão', 1470, 1010, 3.0, 0.9, 50, -0.03)
}
const shot = (tipo = 'image/png', q) => document.getElementById('c').toDataURL(tipo, q)
