// Estilo A — linogravura. Duas cores só: uma tinta e o papel. O que é claro
// é papel que a goiva tirou; a massa vai ficando mais clara porque há cada
// vez mais sulcos. Anima a 12 imagens por segundo, e o grão da impressão
// muda a cada imagem, como numa série de estampas.

const PAPEL = '#efe4cc', TINTA = '#9e4a1c'
const PASSO = 12
let ctx, GRAOS = []

function boot() {
  ctx = document.getElementById('c').getContext('2d')
  // grão de impressão: pintas de papel onde há tinta, e uma ou outra de tinta no papel
  for (let g = 0; g < 4; g++) {
    const c = new OffscreenCanvas(W, H), x = c.getContext('2d')
    let s = g * 1000
    const r = () => hash(++s * 0.731)
    x.fillStyle = PAPEL
    for (let i = 0; i < 26000; i++) { x.beginPath(); x.arc(r() * W, r() * H, 0.5 + r() * 1.6, 0, TAU); x.fill() }
    x.fillStyle = TINTA
    for (let i = 0; i < 1200; i++) { x.beginPath(); x.arc(r() * W, r() * H, 0.4 + r() * 1.1, 0, TAU); x.fill() }
    // a tinta nunca pega por igual: manchas largas de papel, muito leves
    x.globalAlpha = 0.05; x.fillStyle = PAPEL
    for (let i = 0; i < 40; i++) { x.beginPath(); x.ellipse(r() * W, r() * H, 60 + r() * 220, 20 + r() * 60, r() * TAU, 0, TAU); x.fill() }
    GRAOS.push(c)
  }
}

// Linha com a borda um pouco trémula (muda a cada imagem, como a tinta)
const treme = (pts, k, amp) => pts.map(([x, y], i) => [x + (hash(i * 1.7 + k * 31.3) - 0.5) * amp, y + (hash(i * 2.3 + k * 17.9) - 0.5) * amp])

function madeira(k) {
  ctx.fillStyle = TINTA; ctx.fillRect(-200, -200, W + 400, H + 400)
  ctx.strokeStyle = PAPEL; ctx.lineCap = 'round'
  for (let y = -150, n = 0; y < H + 150; y += 11, n++) {
    for (let x = -200; x < W + 200; x += 14) {
      const v = fbm(x * 0.006 + n * 3.1)
      if (v < -0.05) continue
      const yy = y + 7 * fbm(x * 0.003 + n * 0.37) + 4 * Math.sin(x * 0.002 + n)
      ctx.lineWidth = 0.8 + 2.4 * v
      ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + 14, y + 7 * fbm((x + 14) * 0.003 + n * 0.37) + 4 * Math.sin((x + 14) * 0.002 + n)); ctx.stroke()
    }
  }
}

const PANO = { x0: 150, y0: 80, x1: 1770, y1: 1040 }
function riscas(ctx, larg) {
  ctx.beginPath()
  for (let x = PANO.x0 + 120; x < PANO.x1 - 60; x += 170) for (const d of [0, 11]) { ctx.moveTo(x + d, PANO.y0 + 30); ctx.lineTo(x + d, PANO.y1 - 30) }
  for (let y = PANO.y0 + 110; y < PANO.y1 - 60; y += 170) for (const d of [0, 11]) { ctx.moveTo(PANO.x0 + 30, y + d); ctx.lineTo(PANO.x1 - 30, y + d) }
  ctx.lineWidth = larg; ctx.stroke()
}
function pano(k) {
  const pts = treme([[PANO.x0, PANO.y0], [PANO.x1, PANO.y0], [PANO.x1, PANO.y1], [PANO.x0, PANO.y1]], k, 3)
  ctx.fillStyle = PAPEL; ctx.beginPath(); caminho(ctx, pts); ctx.fill()
  ctx.strokeStyle = TINTA
  riscas(ctx, 3)
  // bainha
  ctx.lineWidth = 2; ctx.setLineDash([14, 9]); ctx.strokeRect(PANO.x0 + 22, PANO.y0 + 22, PANO.x1 - PANO.x0 - 44, PANO.y1 - PANO.y0 - 44); ctx.setLineDash([])
}

function mao(m, k) {
  naMao(ctx, m, () => {
    // contorno de papel a separar a mão do que está por baixo, depois a tinta cheia
    ctx.beginPath(); formaMao(ctx, m)
    ctx.strokeStyle = PAPEL; ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.stroke()
    ctx.fillStyle = TINTA; ctx.fill()
    // cada dedo recortado dos vizinhos por um fio de papel
    ctx.lineWidth = 2.5
    for (const d of DEDOS) { ctx.beginPath(); dedo(ctx, d); ctx.stroke() }
    ctx.beginPath(); polegar(ctx, m.lado); ctx.stroke()
    // nós dos dedos, pulso e o comprido do braço, à goiva
    ctx.lineCap = 'round'; ctx.lineWidth = 2.2
    for (const [qb] of DEDOS) { ctx.beginPath(); ctx.arc(66, qb, 7, -1.3, 1.3); ctx.stroke() }
    ctx.lineWidth = 3
    ctx.beginPath(); ctx.moveTo(158, -26); ctx.quadraticCurveTo(166, 0, 158, 26); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(190, m.lado * 26); ctx.bezierCurveTo(400, m.lado * 36, 700, m.lado * 44, 1100, m.lado * 48); ctx.stroke()
    ctx.lineWidth = 1.8
    for (let x = 210; x < 1100; x += 30) {
      const q = m.lado * (30 + (x / 1100) * 14)
      ctx.beginPath(); ctx.moveTo(x, q - m.lado * 14); ctx.quadraticCurveTo(x + 8, q - m.lado * 4, x + 4, q + m.lado * 6); ctx.stroke()
    }
  })
}

function massa(t, k) {
  const f = finura(t)
  const borda = treme(contorno(t, 220), k, 2.4)
  ctx.save()
  ctx.beginPath(); caminho(ctx, borda); ctx.clip()
  ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, W, H)
  // quando já está fina, vê-se através dela: as riscas do pano e as mãos por baixo
  if (f > 0.3) {
    const a = clamp((f - 0.3) / 0.45)
    ctx.strokeStyle = TINTA
    riscas(ctx, 3 * a)
    ctx.lineWidth = 2.4 * a
    for (const m of maos(t)) naMao(ctx, m, () => {
      ctx.save(); ctx.beginPath(); formaMao(ctx, m); ctx.clip()
      ctx.beginPath(); for (let x = -80; x < 260; x += 6) { ctx.moveTo(x, -80); ctx.lineTo(x + 60, 80) } ctx.stroke()
      ctx.restore()
    })
  }
  // A massa é um talhe de linhas presas a ela: esticam quando ela estica.
  // No início quase se tocam (é tinta cheia); no fim são fios e vê-se o pano.
  const N = 34, esp = (2 * raioBase(t)) / N
  ctx.strokeStyle = TINTA; ctx.lineCap = 'butt'; ctx.lineJoin = 'round'
  ctx.lineWidth = esp * lerp(1.05, 0.13, Math.sqrt(f))
  for (let i = 0; i <= N; i++) {
    const v = -1 + (2 * i) / N, larg = Math.sqrt(Math.max(0, 1 - v * v))
    const pts = []
    for (let j = 0; j <= 60; j++) pts.push(naMassa(-larg + (2 * larg * j) / 60, v * 0.999, t))
    ctx.beginPath(); caminho(ctx, treme(pts, k + i * 7, 1.8), false); ctx.stroke()
  }
  // uma ou outra ruga junto à borda, onde a massa cede
  ctx.lineWidth = 2.2
  for (let i = 0; i < 26; i++) {
    const th = hash(i * 5.3) * TAU, u = 0.8 + hash(i * 2.9) * 0.12
    const a = naMassa(Math.cos(th) * u, Math.sin(th) * u, t), b = naMassa(Math.cos(th + 0.05) * (u + 0.07), Math.sin(th + 0.05) * (u + 0.07), t)
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke()
  }
  ctx.restore()
  // a borda fica grossa: é a única parte que não estica
  ctx.strokeStyle = TINTA; ctx.lineWidth = lerp(10, 18, f); ctx.lineJoin = 'round'
  ctx.beginPath(); caminho(ctx, borda); ctx.stroke()
  ctx.strokeStyle = PAPEL; ctx.lineWidth = 2
  ctx.beginPath(); caminho(ctx, treme(borda, k + 5, 1.2)); ctx.stroke()
}

function frame(t) {
  const k = Math.floor(t * PASSO), tq = k / PASSO
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.fillStyle = PAPEL; ctx.fillRect(0, 0, W, H)
  // a câmara afasta-se à medida que a massa cresce
  const z = lerp(1.5, 1.0, suave(prog(0, DUR, tq)))
  ctx.setTransform(z, 0, 0, z, CX - CX * z, CY - CY * z)
  madeira(k)
  pano(k)
  for (const m of maos(tq)) mao(m, k)
  massa(tq, k)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.drawImage(GRAOS[k % GRAOS.length], 0, 0)
}
const shot = (tipo = 'image/png', q) => document.getElementById('c').toDataURL(tipo, q)
