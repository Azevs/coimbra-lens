// Os bonecos de Pedro e Inês. Cada um desenha-se com a origem entre os pés;
// as posições das mãos (bF: braço da frente, bT: braço de trás) são relativas
// a essa origem, com y negativo para cima.
//
// Emoções: `sobrolho` de -1 (triste: as pontas de dentro sobem) a 1 (zangado:
// descem); `boca` de -1 (triste) a 1 (sorriso).

function sobrancelhas(pts, sob, lw = 5, cor = K) {
  if (Math.abs(sob) < 0.05) return
  ctx.lineWidth = lw; ctx.strokeStyle = cor; ctx.lineCap = 'round'
  for (const [x, y, dentro] of pts) { ctx.beginPath(); ctx.moveTo(x - dentro * 11, y - sob * 5); ctx.lineTo(x + dentro * 11, y + sob * 6); ctx.stroke() }
}

function Pedro(o) {
  const { x, fy, s = 1, sx = 1, sy = 1, olhar = -1, fecho = 0, pop = 0, queixo = 0, peito = 0, coroa = 0, coroaRot = 0,
    bF = [-128, -192], bT = [70, -100], pe = [0, 0, 0, 0], inclina = 0, flor = false, arregala = 0, dir = 1, mira = [0, 0],
    sobrolho = 0, boca = 1, espada = null, manto = 0, rei = false, semCoroa = false, lenco = false, t = 0 } = o
  ctx.save(); ctx.translate(x, fy); ctx.rotate(inclina); ctx.scale(s * sx * dir, s * sy)
  if (manto) {
    const w = Math.sin(t * 2.2) * 8 * manto
    ink(() => { ctx.moveTo(-40, -178); ctx.lineTo(48, -178); ctx.quadraticCurveTo(90, -90, 96 + w, -14); ctx.quadraticCurveTo(20, 0, -54 + w * 0.5, -18); ctx.quadraticCurveTo(-62, -100, -40, -178) }, rei ? MEIO : SOMBRA, 5)
    if (rei) for (let i = 0; i < 6; i++) dot(-40 + i * 26 + w * 0.3, -18 + Math.sin(i) * 3, 4, K)
  }
  const aL = [-32 + pe[0], -18 + pe[1]], aR = [38 + pe[2], -18 + pe[3]]
  mangueira([-15, -92], [-10, -48], aL); mangueira([15, -92], [22, -48], aR)
  for (const [ax, ay] of [[aL[0] - 6, aL[1] + 8], [aR[0] + 4, aR[1] + 8]]) { ink(E(ax, ay, 34, 14), K, 3); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(ax - 10, ay - 5, 9, 4, 0, 0, TAU); ctx.fill() }
  membro([48, -162], bT, -22); luva(bT[0], bT[1] + 2, 0.8)
  ink(E(0, -130, 60, 56), ESCURO)
  dot(-6, -152, 7, '#fff'); dot(-6, -117, 7, '#fff')
  if (rei) { ink(E(0, -178, 50, 14), BRANCO, 4); for (let i = -2; i <= 2; i++) dot(i * 18, -178, 3, K) }
  // cabeça
  ink(E(-5, -232, 58, 56), PELE)
  const q = queixo * 34
  ink(() => { ctx.moveTo(-58, -220); ctx.quadraticCurveTo(-50, -152 + q, -5, -152 + q); ctx.quadraticCurveTo(45, -152 + q, 52, -220); ctx.quadraticCurveTo(0, -190 + q * 0.6, -58, -220) }, K, 3)
  if (queixo > 0.02) { ink(E(-12, -196 + q * 0.3, 22, 5 + q * 0.5), K, 3); ink(E(-12, -190 + q * 0.62, 11, 3 + q * 0.18), '#8b7d66', 0) }
  const ga = 1 + arregala * 0.28
  for (const [ex, ey] of [[-32, -248], [-5, -248]]) {
    const px = ex + olhar * pop * 118, py = ey - pop * 26, g = ga + pop * 0.55
    if (pop > 0.02) { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.quadraticCurveTo(ex + olhar * pop * 50, ey - pop * 48, px, py); ctx.lineWidth = 5; ctx.strokeStyle = K; ctx.stroke() }
    olho(px, py, 11 * g, 17 * g, olhar * 0.75 + mira[0] * 0.25, mira[1] * 0.6, pop > 0.02 || arregala > 0.1 ? 0 : fecho)
  }
  sobrancelhas([[-32, -272, 1], [-5, -272, -1]], sobrolho)
  ink(E(-30, -220, 13, 9), K, 2); dot(-34, -223, 3, '#fff')
  if (queixo < 0.05) {
    if (boca > 0.3) ink(() => ctx.arc(-12, -212, 18, 0.5, 2.4), null, 4)
    else if (boca < -0.3) ink(() => ctx.arc(-12, -190, 13, Math.PI + 0.7, TAU - 0.7), null, 4)
    else ink(() => { ctx.moveTo(-24, -200); ctx.lineTo(-2, -200) }, null, 4)
  }
  // coroa (a de infante, pequena; a de rei, grande e com pérolas)
  if (!semCoroa) {
    ctx.save(); ctx.translate(-2, -300 - coroa); ctx.rotate(coroaRot)
    if (rei) {
      ink(() => poly([[-40, 24], [-46, -28], [-24, -2], [-10, -40], [0, -6], [12, -40], [26, -2], [46, -28], [40, 24]]), '#c7b894', 4)
      for (const [bx, by] of [[-46, -30], [-10, -42], [12, -42], [46, -30]]) ink(E(bx, by, 6, 6), BRANCO, 3)
      ink(() => ctx.rect(-40, 10, 80, 12), CLARO, 3)
    } else ink(() => poly([[-28, 20], [-34, -16], [-14, 4], [0, -24], [12, 4], [32, -14], [28, 22]]), '#c7b894', 4)
    ctx.restore()
  }
  if (peito > 0.01) {
    const k = peito
    ctx.save(); ctx.translate(-8, -118); ctx.scale(1 + k * 0.25, 1 - k * 0.1)
    coracao(0, 0, 22 + 30 * k, BRANCO, 5)
    ctx.restore()
  }
  // braço da frente (e o que a mão segura)
  membro([-48, -162], bF, 26)
  if (flor) florZinha(bF[0] - 4, bF[1] - 2)
  if (espada != null) {
    ctx.save(); ctx.translate(bF[0], bF[1]); ctx.rotate(espada)
    ink(() => poly([[-7, -18], [7, -18], [5, -150], [0, -168], [-5, -150]]), BRANCO, 4)
    ink(() => ctx.roundRect(-26, -22, 52, 10, 4), TORRADO, 4)
    ink(() => ctx.rect(-5, -12, 10, 26), ESCURO, 3)
    ctx.restore()
  }
  if (lenco) { const w = Math.sin(t * 12) * 10; ink(() => { ctx.moveTo(bF[0] - 6, bF[1] - 10); ctx.quadraticCurveTo(bF[0] - 30, bF[1] - 40 + w, bF[0] - 20, bF[1] - 70 + w); ctx.quadraticCurveTo(bF[0] + 6, bF[1] - 50, bF[0] + 8, bF[1] - 12); ctx.closePath() }, BRANCO, 3) }
  luva(bF[0] - 2, bF[1], 2.6)
  ctx.restore()
}
function florZinha(x, y) {
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y - 58); ctx.lineWidth = 4; ctx.strokeStyle = K; ctx.stroke()
  for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU; ink(E(x - 8 + Math.cos(a) * 12, y - 66 + Math.sin(a) * 12, 8, 5, a), '#fff', 2.5) }
  ink(E(x - 8, y - 66, 7, 7), CORACAO, 2.5)
}

function Ines(o) {
  const { x, fy, s = 1, sx = 1, sy = 1, olhar = 1, fecho = 0, bF = [102, -190], bT = [-50, -106], pe = [0, 0, 0, 0],
    pescoco = 0, cabelo = 0, saia = 0, venia = 0, pestanas = 0, inclina = 0, susto = 0, dir = 1, mira = [0, 0],
    boca = 1, coroa = null, flor = false } = o
  ctx.save(); ctx.translate(x, fy); ctx.rotate(inclina); ctx.scale(s * sx * dir * (1 + venia * 0.05), s * sy * (1 - venia * 0.13))
  ink(E(-22 + pe[0], -8 + pe[1], 22, 11), K, 3); ink(E(24 + pe[2], -8 + pe[3], 22, 11), K, 3)
  membro([-20, -148], bT, -24); luva(bT[0], bT[1] + 2, 0.5)
  const sw = saia * 10
  ink(() => { ctx.moveTo(-24, -148); ctx.quadraticCurveTo(-40, -68, -82 + sw, -18); ctx.quadraticCurveTo(-55 + sw, -4, -28 + sw * 0.6, -16); ctx.quadraticCurveTo(0 + sw * 0.5, -2, 28 + sw * 0.6, -16); ctx.quadraticCurveTo(55 + sw, -4, 82 + sw, -18); ctx.quadraticCurveTo(40, -68, 24, -148); ctx.closePath() }, '#fbf7ec')
  for (const [px, py] of [[-30, -88], [10, -108], [40, -58], [-50, -33], [5, -48], [60, -23]]) dot(px + sw * (-py / 150), py, 7, K)
  ink(E(0, -163, 28, 28), '#fbf7ec')
  const hx = 16 + pescoco * 16, hy = -298 + Math.abs(pescoco) * 4
  ctx.beginPath(); ctx.moveTo(0, -183); ctx.bezierCurveTo(-30, -218, 30 + pescoco * 8, -243, hx - 4, hy + 28); ctx.lineWidth = 20; ctx.strokeStyle = K; ctx.stroke(); ctx.lineWidth = 11; ctx.strokeStyle = PELE; ctx.stroke()
  const c = cabelo * 12
  ink(() => { ctx.moveTo(hx - 36, hy - 28); ctx.bezierCurveTo(hx - 86, hy, hx - 76 - c, hy + 70, hx - 46 - c, hy + 100); ctx.bezierCurveTo(hx - 71 - c, hy + 105, hx - 76 - c, hy + 80, hx - 61 - c, hy + 75); ctx.bezierCurveTo(hx - 36, hy + 40, hx - 6, hy + 10, hx - 36, hy - 28) }, K, 3)
  ink(E(hx, hy, 42, 46), PELE)
  ink(() => { ctx.moveTo(hx - 42, hy - 8); ctx.quadraticCurveTo(hx - 36, hy - 52, hx + 14, hy - 46); ctx.quadraticCurveTo(hx + 46, hy - 38, hx + 42, hy - 10); ctx.quadraticCurveTo(hx + 14, hy - 28, hx + 2, hy - 18); ctx.quadraticCurveTo(hx - 16, hy - 32, hx - 42, hy - 8) }, K, 3)
  const g = 1 + susto * 0.3
  for (const ex of [hx, hx + 26]) {
    olho(ex, hy, 10 * g, 15 * g, olhar * 0.75 + mira[0] * 0.25, mira[1] * 0.6, fecho)
    ctx.lineWidth = 3; ctx.strokeStyle = K
    const L = 9 + pestanas * 7
    for (const k of [-1, 0, 1]) { ctx.beginPath(); ctx.moveTo(ex + k * 5, hy - 14 * g * (1 - fecho * 0.8)); ctx.lineTo(ex + k * (5 + L * 0.35), hy - 14 * g - L + fecho * 12); ctx.stroke() }
  }
  if (boca > -0.3) ink(() => { ctx.moveTo(hx + 14, hy + 28); ctx.quadraticCurveTo(hx + 8, hy + 20, hx + 14, hy + 22); ctx.quadraticCurveTo(hx + 20, hy + 20, hx + 14, hy + 28) }, K, 4)
  else ink(() => ctx.arc(hx + 14, hy + 34, 8, Math.PI + 0.7, TAU - 0.7), null, 3.5)
  if (coroa != null) {
    ctx.save(); ctx.translate(hx, hy - 50 - coroa)
    ink(() => poly([[-30, 16], [-34, -18], [-16, 2], [0, -26], [16, 2], [34, -18], [30, 16]]), '#c7b894', 4)
    for (const [bx, by] of [[-34, -20], [0, -28], [34, -20]]) ink(E(bx, by, 5, 5), BRANCO, 3)
    ctx.restore()
  }
  membro([22, -168], bF, 24)
  if (flor) florZinha(bF[0] + 6, bF[1] - 2)
  luva(bF[0], bF[1], -0.3)
  ctx.restore()
}

// D. Constança, à janela do coche: só a cabeça, o véu e a mão que acena
function Constanca(x, y, t, { olhar = 1, aceno = 0, fecho = 0, mira = [0, 0] } = {}) {
  ink(() => { ctx.moveTo(x - 40, y + 60); ctx.quadraticCurveTo(x - 44, y - 30, x - 4, y - 44); ctx.quadraticCurveTo(x + 40, y - 40, x + 40, y + 60); ctx.closePath() }, '#fbf7ec', 4)
  ink(E(x, y, 27, 30), PELE, 4)
  ink(() => { ctx.moveTo(x - 27, y - 6); ctx.quadraticCurveTo(x - 20, y - 38, x + 6, y - 34); ctx.quadraticCurveTo(x + 30, y - 30, x + 27, y - 6); ctx.quadraticCurveTo(x, y - 20, x - 27, y - 6) }, K, 3)
  olho(x - 6, y + 2, 7, 11, olhar * 0.75 + mira[0] * 0.25, mira[1] * 0.6, fecho); olho(x + 12, y + 2, 7, 11, olhar * 0.75 + mira[0] * 0.25, mira[1] * 0.6, fecho)
  ink(() => ctx.arc(x + 4, y + 16, 7, 0.4, 2.7), null, 3)
  if (aceno > 0) { const a = Math.sin(t * 14) * 0.5; mangueira([x + 26, y + 60], [x + 40, y + 34], [x + 38 + a * 10, y + 12 - aceno * 10], 9); luva(x + 38 + a * 10, y + 8 - aceno * 10, a, 0.8) }
}

// D. Afonso IV: velho, barba branca comprida, coroa grande, sentado no trono.
// `cetro` é a posição da mão da frente; `bate` levanta e baixa o cetro.
function Afonso(o) {
  const { x, fy, s = 1, sx = 1, sy = 1, olhar = 1, fecho = 0, sobrolho = 0.6, mira = [0, 0], cetro = [-70, -150], acena = 0, inclina = 0, semCetro = false, pe = [0, 0, 0, 0] } = o
  ctx.save(); ctx.translate(x, fy); ctx.rotate(inclina); ctx.scale(s * sx, s * sy)
  const aL = [-26 + pe[0], -16 + pe[1]], aR = [26 + pe[2], -16 + pe[3]]
  mangueira([-18, -60], [-22, -36], aL); mangueira([18, -60], [22, -36], aR)
  ink(E(aL[0] - 4, aL[1] + 8, 26, 11), K, 3); ink(E(aR[0] + 4, aR[1] + 8, 26, 11), K, 3)
  ink(() => { ctx.moveTo(-72, -46); ctx.quadraticCurveTo(-84, -150, -44, -204); ctx.lineTo(44, -204); ctx.quadraticCurveTo(84, -150, 72, -46); ctx.quadraticCurveTo(0, -30, -72, -46) }, SOMBRA)
  ink(() => { ctx.moveTo(-6, -200); ctx.lineTo(-6, -44) }, null, 3)
  membro([56, -170], [66, -92], -18); luva(66, -90, 0.6)
  ink(E(0, -200, 64, 22), BRANCO, 4); for (let i = -3; i <= 3; i++) ink(() => poly([[i * 17 - 3, -200], [i * 17 + 3, -200], [i * 17, -190]]), K, 0)
  ink(E(0, -256, 54, 52), PELE)
  // barba branca, comprida, às ondas
  ink(() => { ctx.moveTo(-50, -252); ctx.quadraticCurveTo(-60, -190, -40, -150); for (let i = 0; i < 5; i++) { const a = -40 + i * 20; ctx.quadraticCurveTo(a + 10, -128 - (i % 2) * 8, a + 20, -150) } ctx.quadraticCurveTo(60, -190, 50, -252); ctx.quadraticCurveTo(0, -222, -50, -252) }, BRANCO, 4)
  for (const s2 of [-1, 1]) ink(() => { ctx.moveTo(-2, -232); ctx.quadraticCurveTo(-2 + s2 * 18, -238, -2 + s2 * 32, -222); ctx.quadraticCurveTo(-2 + s2 * 16, -226, -2, -226) }, BRANCO, 3)
  const lx = olhar * 0.7 + mira[0] * 0.3
  olho(-20, -270, 10, 14, lx, mira[1] * 0.6, fecho); olho(8, -270, 10, 14, lx, mira[1] * 0.6, fecho)
  sobrancelhas([[-20, -292, 1], [8, -292, -1]], sobrolho, 8, K)
  ctx.lineWidth = 5; ctx.strokeStyle = BRANCO; for (const [bx, d] of [[-20, 1], [8, -1]]) { ctx.beginPath(); ctx.moveTo(bx - d * 11, -292 - sobrolho * 5); ctx.lineTo(bx + d * 11, -292 + sobrolho * 6); ctx.stroke() }
  ink(E(-6, -246, 15, 12), '#e6d9bd', 4)
  ctx.save(); ctx.translate(0, -306)
  ink(() => ctx.rect(-46, 0, 92, 18), CLARO, 4)
  ink(() => poly([[-46, 2], [-50, -40], [-28, -10], [-14, -50], [0, -14], [14, -50], [28, -10], [50, -40], [46, 2]]), '#c7b894', 4)
  for (const [bx, by] of [[-50, -42], [-14, -52], [14, -52], [50, -42]]) ink(E(bx, by, 6, 6), BRANCO, 3)
  ctx.restore()
  // o cetro
  membro([-56, -170], cetro, 20)
  if (semCetro) { luva(cetro[0], cetro[1], -0.4); ctx.restore(); return }
  ink(() => ctx.rect(cetro[0] - 4, cetro[1] - 120, 8, 150), TORRADO, 3)
  ink(E(cetro[0], cetro[1] - 128, 14, 14), CLARO, 4)
  ink(() => poly([[cetro[0], cetro[1] - 164], [cetro[0] + 8, cetro[1] - 144], [cetro[0], cetro[1] - 140], [cetro[0] - 8, cetro[1] - 144]]), CLARO, 3)
  luva(cetro[0], cetro[1], -1.2)
  ctx.restore()
}

// Os três conselheiros: compridos, magros, de nariz em bico e olhos meio
// fechados. tipo 0: chapéu alto; 1: barrete com pena; 2: capuz.
function Conselheiro(o) {
  const { x, fy, s = 1, tipo = 0, olhar = -1, fecho = 0, sussurra = 0, mira = [0, 0], inclina = 0, pe = [0, 0, 0, 0], sombra = false } = o
  ctx.save(); ctx.translate(x, fy); ctx.rotate(inclina - sussurra * 0.16 * -olhar); ctx.scale(s, s)
  const tinta = sombra ? 'rgba(16,12,8,.78)' : null
  const I = (path, fill, lw = 5) => (sombra ? ink(path, tinta, 0) : ink(path, fill, lw))
  for (const [ax, ay] of [[-14 + pe[0], -6 + pe[1]], [16 + pe[2], -6 + pe[3]]]) I(() => { ctx.moveTo(ax - 22, ay); ctx.quadraticCurveTo(ax, ay - 16, ax + 20, ay - 4); ctx.quadraticCurveTo(ax + 36 * olhar * -1 * -1, ay - 18, ax + 30, ay - 16); ctx.quadraticCurveTo(ax + 24, ay + 6, ax - 22, ay) }, K, 3)
  I(() => { ctx.moveTo(-20, -236); ctx.lineTo(20, -236); ctx.lineTo(46, -14); ctx.quadraticCurveTo(0, 2, -46, -14); ctx.closePath() }, '#4a4238')
  I(() => { ctx.moveTo(-26, -236); ctx.lineTo(26, -236); ctx.lineTo(16, -214); ctx.lineTo(-16, -214); ctx.closePath() }, CLARO, 4)
  I(() => ctx.rect(-6, -266, 12, 32), PELE, 4)
  I(E(0, -294, 30, 38), PELE)
  I(() => poly([[olhar * 16, -300], [olhar * 66, -284], [olhar * 14, -276]]), PELE, 4)
  if (!sombra) {
    olho(olhar * 4, -304, 8, 10, olhar * 0.7 + mira[0] * 0.3, mira[1], Math.max(fecho, 0.45))
    olho(olhar * -14, -304, 8, 10, olhar * 0.7 + mira[0] * 0.3, mira[1], Math.max(fecho, 0.45))
    ctx.lineWidth = 4; ctx.strokeStyle = K; for (const bx of [olhar * 4, olhar * -14]) { ctx.beginPath(); ctx.moveTo(bx - olhar * 9, -322); ctx.lineTo(bx + olhar * 9, -316); ctx.stroke() }
    ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(olhar * 18, -270); ctx.quadraticCurveTo(olhar * 34, -266, olhar * 38, -278); ctx.stroke()
  }
  if (tipo === 0) I(() => { ctx.moveTo(-32, -318); ctx.lineTo(32, -318); ctx.lineTo(10, -410); ctx.lineTo(-4, -412); ctx.closePath() }, ESCURO)
  else if (tipo === 1) { I(() => ctx.roundRect(-36, -342, 72, 26, 10), ESCURO); I(() => { ctx.moveTo(-20, -340); ctx.quadraticCurveTo(-60, -400, -80, -380); ctx.quadraticCurveTo(-50, -370, -8, -336) }, BRANCO, 4) }
  else I(() => { ctx.moveTo(-40, -250); ctx.quadraticCurveTo(-44, -350, 0, -350); ctx.quadraticCurveTo(44, -350, 40, -250); ctx.quadraticCurveTo(28, -330, 0, -334); ctx.quadraticCurveTo(-28, -330, -40, -250) }, ESCURO)
  // mão: junto à boca quando segreda, senão juntas à frente
  const m = sussurra > 0.3 ? [olhar * 44, -262] : [olhar * 10, -150]
  if (!sombra) { membro([olhar * 16, -222], m, olhar * 18, 10); luva(m[0], m[1], 0, 0.85) }
  ctx.restore()
}

// Os filhos: pequenos, cabeça grande. tipo 0 rapaz, 1 rapariga.
function Crianca(o) {
  const { x, fy, s = 1, sx = 1, sy = 1, tipo = 0, olhar = 1, fecho = 0, mira = [0, 0], pe = [0, 0, 0, 0], braco = 0 } = o
  ctx.save(); ctx.translate(x, fy); ctx.scale(s * sx, s * sy)
  const aL = [-12 + pe[0], -8 + pe[1]], aR = [14 + pe[2], -8 + pe[3]]
  mangueira([-8, -44], [-8, -26], aL, 8); mangueira([8, -44], [10, -26], aR, 8)
  ink(E(aL[0] - 2, aL[1] + 3, 14, 7), K, 2); ink(E(aR[0] + 2, aR[1] + 3, 14, 7), K, 2)
  if (tipo) ink(() => { ctx.moveTo(-14, -90); ctx.quadraticCurveTo(-24, -50, -38, -32); ctx.quadraticCurveTo(0, -24, 38, -32); ctx.quadraticCurveTo(24, -50, 14, -90); ctx.closePath() }, BRANCO, 4)
  else ink(E(0, -64, 28, 30), ESCURO, 4)
  if (tipo) for (const [px, py] of [[-14, -46], [12, -56], [20, -38]]) dot(px, py, 4, K)
  membro([-16, -76], [-30 - braco * 10, -52 - braco * 30], -10, 7); luva(-30 - braco * 10, -50 - braco * 30, 0, 0.55)
  membro([16, -76], [30 + braco * 10, -52 - braco * 30], 10, 7); luva(30 + braco * 10, -50 - braco * 30, 0, 0.55)
  ink(E(0, -124, 36, 34), PELE, 4)
  if (tipo) { ink(() => { ctx.moveTo(-36, -118); ctx.quadraticCurveTo(-40, -164, 2, -160); ctx.quadraticCurveTo(40, -160, 36, -118); ctx.quadraticCurveTo(20, -144, 0, -140); ctx.quadraticCurveTo(-20, -144, -36, -118) }, K, 3); ink(() => { ctx.moveTo(22, -158); ctx.lineTo(44, -172); ctx.lineTo(44, -146); ctx.closePath(); ctx.moveTo(22, -158); ctx.lineTo(0, -174); ctx.lineTo(4, -148); ctx.closePath() }, BRANCO, 3) }
  else { ink(() => { ctx.moveTo(-30, -140); ctx.quadraticCurveTo(-10, -170, 20, -156); ctx.quadraticCurveTo(10, -176, 32, -170); ctx.quadraticCurveTo(40, -150, 30, -140); ctx.quadraticCurveTo(0, -150, -30, -140) }, K, 3) }
  const lx = olhar * 0.7 + mira[0] * 0.3
  olho(-10, -124, 7, 11, lx, mira[1] * 0.6, fecho); olho(10, -124, 7, 11, lx, mira[1] * 0.6, fecho)
  ink(() => ctx.arc(0, -108, 7, 0.4, 2.7), null, 3)
  ctx.restore()
}

// Soldadinhos em silhueta, de lança ao ombro, para ao longe.
function Soldado(x, fy, s, fase, dir = 1) {
  ctx.save(); ctx.translate(x, fy); ctx.scale(s * dir, s)
  const p = passada(fase, 1)
  ctx.fillStyle = ctx.strokeStyle = '#2c2620'; ctx.lineCap = 'round'
  ctx.lineWidth = 7; for (const [hx, i] of [[-8, 0], [8, 2]]) { ctx.beginPath(); ctx.moveTo(hx, -40); ctx.lineTo(hx + p.pe[i] * 0.6, -4 + p.pe[i + 1] * 0.6); ctx.stroke() }
  ctx.translate(0, p.bob * 0.6)
  ctx.beginPath(); ctx.ellipse(0, -62, 22, 26, 0, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.arc(0, -100, 17, 0, TAU); ctx.fill()
  ctx.beginPath(); ctx.moveTo(-18, -104); ctx.quadraticCurveTo(0, -132, 18, -104); ctx.closePath(); ctx.fill()
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(14, -30); ctx.lineTo(26, -170); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(26, -186); ctx.lineTo(32, -166); ctx.lineTo(20, -166); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.ellipse(-16, -64, 18, 22, 0, 0, TAU); ctx.fill()
  ctx.restore()
}

// Um nobre da corte: capa, barrete, e pode ajoelhar-se (`joelho` de 0 a 1).
function Nobre(o) {
  const { x, fy, s = 1, joelho = 0, beija = 0, tipo = 0, olhar = -1, fecho = 0, pe = [0, 0, 0, 0] } = o
  ctx.save(); ctx.translate(x, fy); ctx.scale(s * -olhar, s)
  const baixa = joelho * 46
  if (joelho < 0.5) { mangueira([6, -70 + baixa], [6, -40], [6 + pe[0], -8 + pe[1]], 10); mangueira([22, -70 + baixa], [24, -40], [24 + pe[2], -8 + pe[3]], 10) }
  else { mangueira([6, -70 + baixa], [-30, -30], [-26, -6], 10); mangueira([22, -70 + baixa], [30, -14], [52, -8], 10) }
  ink(E(joelho < 0.5 ? 2 + pe[0] : -30, -4, 18, 8), K, 2); ink(E(joelho < 0.5 ? 26 + pe[2] : 58, -4, 18, 8), K, 2)
  ctx.translate(0, baixa); ctx.rotate(-beija * 0.35)
  ink(() => { ctx.moveTo(-30, -150); ctx.lineTo(34, -150); ctx.lineTo(44, -64); ctx.quadraticCurveTo(0, -54, -40, -64); ctx.closePath() }, tipo % 2 ? MEIO : '#5f574a', 5)
  ink(E(0, -186, 30, 30), PELE, 4)
  ink(() => ctx.roundRect(-30, -224, 60, 20, 8), tipo % 2 ? ESCURO : CLARO, 4)
  olho(-12, -190, 7, 10, -0.8, 0.2, Math.max(fecho, beija * 0.9)); olho(6, -190, 7, 10, -0.8, 0.2, Math.max(fecho, beija * 0.9))
  ink(() => ctx.arc(-6, -172, 6, 0.4, 2.7), null, 3)
  ctx.restore()
}
