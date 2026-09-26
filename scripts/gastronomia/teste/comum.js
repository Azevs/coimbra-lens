// A cena comum aos dois testes: a massa de Tentúgal vista de cima, a ser
// puxada à mão sobre um pano até ficar fina. A geometria é a mesma nos dois
// estilos; só muda a maneira de a desenhar. Tudo é função do tempo.

const W = 1920, H = 1080, TAU = Math.PI * 2, DUR = 5
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const lerp = (a, b, t) => a + (b - a) * t
const prog = (a, b, x) => clamp((x - a) / (b - a))
const suave = (t) => t * t * (3 - 2 * t)
const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
function ruido(x) { const i = Math.floor(x), f = x - i; return lerp(hash(i), hash(i + 1), suave(f)) * 2 - 1 }
const fbm = (x) => ruido(x) * 0.5 + ruido(x * 2 + 17.3) * 0.25 + ruido(x * 4 + 41.1) * 0.125

// ---------- a massa ----------
const CX = 960, CY = 560, SX = 1.35 // a mesa é mais larga do que funda
const R0 = 95, DR = 43
// Cada puxão: um par de mãos num ponto da borda, a puxar para fora.
const PUXOES = [0.15, Math.PI + 0.1, 1.75, -1.4, 0.75, Math.PI + 0.85, -0.55, 2.45].map((a, i) => ({ a, t0: 0.3 + i * 0.6, d: 0.75 }))

const raioBase = (t) => R0 + PUXOES.reduce((s, p) => s + DR * suave(prog(p.t0, p.t0 + p.d, t)), 0)
// A borda nunca é um círculo: uma ondulação fixa, mais o lóbulo de cada puxão enquanto dura.
const FASES = [2, 3, 4, 5, 6].map((n) => [n, hash(n * 7.7) * TAU])
const ondula = (th) => FASES.reduce((s, [n, f]) => s + Math.sin(n * th + f) / n, 0) * 0.07
function difAng(a, b) { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return d }
function raio(th, t) {
  let lobo = 0
  for (const p of PUXOES) lobo += 0.16 * Math.exp(-((difAng(th, p.a) / 0.42) ** 2)) * Math.sin(Math.PI * prog(p.t0, p.t0 + p.d, t))
  return raioBase(t) * (1 + ondula(th) + lobo)
}
// 0 no início, 1 quando a massa já está quase transparente
const finura = (t) => clamp((raioBase(t) - R0) / (DR * PUXOES.length - 20))

function contorno(t, n = 220, jit = 0, semente = 0, esc = 1) {
  const pts = []
  for (let i = 0; i < n; i++) {
    const th = (i / n) * TAU, j = jit ? (hash(i * 3.1 + semente) - 0.5) * 2 * jit : 0
    const r = (raio(th, t) + j) * esc
    pts.push([CX + Math.cos(th) * r * SX, CY + Math.sin(th) * r])
  }
  return pts
}
function caminho(ctx, pts, fechar = true) {
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  if (fechar) ctx.closePath()
}
// Traça só a primeira fracção do comprimento de uma linha (para a ver a ser desenhada).
function tracar(ctx, pts, frac, fechar = false) {
  const p = fechar ? [...pts, pts[0]] : pts
  let tot = 0
  const seg = []
  for (let i = 1; i < p.length; i++) { const l = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); seg.push(l); tot += l }
  let falta = tot * clamp(frac)
  ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1])
  for (let i = 1; i < p.length && falta > 0; i++) {
    const k = Math.min(1, falta / seg[i - 1])
    ctx.lineTo(lerp(p[i - 1][0], p[i][0], k), lerp(p[i - 1][1], p[i][1], k))
    falta -= seg[i - 1]
  }
  ctx.stroke()
}

// ---------- as mãos ----------
// Devolve as mãos em cena no instante t: ponto na borda, direcção para fora,
// e quanto já entraram (as mãos chegam de fora do quadro e voltam a sair).
function maos(t) {
  const out = []
  for (const p of PUXOES) {
    if (t < p.t0 - 0.45 || t > p.t0 + p.d + 0.45) continue
    const fora = 900 * (1 - suave(prog(p.t0 - 0.45, p.t0, t))) + 900 * suave(prog(p.t0 + p.d, p.t0 + p.d + 0.45, t))
    for (const lado of [-1, 1]) {
      const th = p.a + lado * 0.2
      const r = raio(th, t)
      const ex = CX + Math.cos(th) * r * SX, ey = CY + Math.sin(th) * r
      let ux = ex - CX, uy = ey - CY
      const l = Math.hypot(ux, uy); ux /= l; uy /= l
      const ang = Math.atan2(uy, ux) + lado * 0.1
      out.push({ x: ex + Math.cos(ang) * fora, y: ey + Math.sin(ang) * fora, ang, lado, semente: p.t0 * 10 + lado })
    }
  }
  return out
}
// Forma da mão em coordenadas locais: x para fora da massa, as pontas dos
// dedos em x≈−30 (debaixo da borda), o antebraço a sair do quadro. Mão de
// costas para cima: quatro dedos um pouco abertos em leque, o do meio mais
// comprido, e o polegar do lado de dentro.
// [base q, ponta x, ponta q, largura na base]
const DEDOS = [[-30, -8, -40, 11], [-10, -30, -13, 12], [10, -26, 12, 12], [29, -4, 37, 10.5]]
const HS = 1.3 // escala da mão
function palmaBraco(ctx) {
  ctx.moveTo(40, -40)
  ctx.bezierCurveTo(30, -20, 30, 20, 40, 42)
  ctx.bezierCurveTo(80, 52, 125, 50, 150, 36)   // lado de fora da palma até ao pulso
  ctx.bezierCurveTo(250, 44, 600, 58, 1150, 62) // antebraço, a alargar
  ctx.lineTo(1150, -62)
  ctx.bezierCurveTo(600, -58, 250, -44, 150, -36)
  ctx.bezierCurveTo(125, -50, 80, -50, 40, -40)
  ctx.closePath()
}
function dedo(ctx, [qb, xt, qt, w], xb = 62) {
  // do nó até à ponta, a afinar, com a ponta redonda
  const ang = Math.atan2(qt - qb, xt - xb), nx = -Math.sin(ang), ny = Math.cos(ang), wt = w * 0.78
  ctx.moveTo(xb + nx * w, qb + ny * w)
  ctx.lineTo(xt + nx * wt, qt + ny * wt)
  ctx.arc(xt, qt, wt, ang + Math.PI / 2, ang - Math.PI / 2, true)
  ctx.lineTo(xb - nx * w, qb - ny * w)
  ctx.closePath()
}
// o polegar sai do lado da palma virado para o outro par de mãos
const polegar = (ctx, lado) => dedo(ctx, [-lado * 30, 34, -lado * 60, 13], 112)
function formaMao(ctx, m) {
  palmaBraco(ctx); DEDOS.forEach((d) => dedo(ctx, d)); polegar(ctx, m.lado)
}
function naMao(ctx, m, fn) {
  ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.ang); ctx.scale(HS, HS); fn(); ctx.restore()
}
// Um ponto do disco normalizado (u, v), |(u,v)| ≤ 1, levado para a massa esticada:
// o que está desenhado "na massa" estica com ela.
function naMassa(u, v, t) {
  const rho = Math.hypot(u, v), th = Math.atan2(v, u), r = raio(th, t) * rho
  return [CX + Math.cos(th) * r * SX, CY + Math.sin(th) * r]
}
