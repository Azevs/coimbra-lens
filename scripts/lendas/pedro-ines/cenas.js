// Pedro e Inês: as dezassete cenas. cena(t) é chamada por frame(t) em estilo.js.

function cena(t) {
  const c = TL.scenes.find((s) => t < s.t1) || TL.scenes[TL.scenes.length - 1]
  ;({ titulo, chegada, ines: cenaInes, rei: cenaRei, mapa: cenaMapa, luto: cenaLuto, regresso: cenaRegresso, coimbra: cenaCoimbra, fonte: cenaFonte,
    medo: cenaMedo, morte: cenaMorte, revolta: cenaRevolta, coroacao: cenaCoroacao, vinganca: cenaVinganca, alcobaca: cenaAlcobaca, lendas: cenaLendas, fim: cenaFim })[c.id](t)
}

// ---------- 1. título ----------
function titulo(t) {
  const T = TL.ev
  raios(W / 2, H / 2 + 20, t)
  const b = salto(t, 0, 0.8), k = mola(prog(t, 0.05, 1.05), 1.6, 5)
  ctx.save(); ctx.translate(W / 2, H / 2 + 6); ctx.scale(k * b.sx, k * b.sy)
  ink(E(8, 10, 338, 206), K, 0)
  ink(E(0, 0, 338, 206), BRANCO, 7); ink(E(0, 0, 316, 186), null, 3)
  const letras = (txt, y, px, fase) => {
    ctx.font = `${px}px Chango`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
    const ws = [...txt].map((ch) => ctx.measureText(ch).width), tot = ws.reduce((a, w) => a + w, 0)
    let xx = -tot / 2
    ;[...txt].forEach((ch, i) => {
      const dy = -Math.abs(Math.sin(((t / BEAT) - i * 0.18 + fase) * Math.PI)) * 12
      ctx.fillStyle = MEIO; ctx.fillText(ch, xx + 6, y + dy + 7)
      ctx.lineWidth = 6; ctx.strokeStyle = K; ctx.lineJoin = 'round'; ctx.strokeText(ch, xx, y + dy)
      ctx.fillStyle = ESCURO; ctx.fillText(ch, xx, y + dy)
      xx += ws[i]
    })
  }
  letras('Pedro', -58, 116, 0)
  letras('e Inês', 70, 96, 0.5)
  ctx.restore()
  // fita com o subtítulo
  const fy = H / 2 + 225 + b.y * 4
  ink(() => { ctx.moveTo(W / 2 - 250, fy - 26); ctx.lineTo(W / 2 + 250, fy - 26); ctx.lineTo(W / 2 + 225, fy); ctx.lineTo(W / 2 + 250, fy + 26); ctx.lineTo(W / 2 - 250, fy + 26); ctx.lineTo(W / 2 - 225, fy); ctx.closePath() }, CLARO, 5)
  ctx.fillStyle = K; ctx.font = 'italic 30px Georgia'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('uma lenda de Coimbra', W / 2, fy + 1)
  for (const s of [-1, 1]) estrela(W / 2 + s * 430, H / 2 + 10 + salto(t, 0.5).y * 14, 34, t * 2.2 * s)
  if (t > T.irisTitulo) iris(W / 2, H / 2, lerp(900, 0, suave(prog(t, T.irisTitulo, 4.0))))
}

// ---------- 2. a chegada da comitiva ----------
function castelo(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s)
  const ameias = (x0, y0, w) => { ctx.lineTo(x0, y0); for (let i = 0; i < 5; i++) { const a = x0 + (i * w) / 5; ctx.lineTo(a, y0 - 8); ctx.lineTo(a + w / 10, y0 - 8); ctx.lineTo(a + w / 10, y0); ctx.lineTo(a + w / 5, y0) } }
  ink(() => { ctx.moveTo(-60, 0); ctx.lineTo(-60, -50); ameias(-60, -50, 120); ctx.lineTo(60, 0); ctx.closePath() }, MEIO, 4)
  ink(() => { ctx.moveTo(-20, 0); ctx.lineTo(-20, -90); ameias(-20, -90, 40); ctx.lineTo(20, 0); ctx.closePath() }, MEIO, 4)
  ink(() => ctx.roundRect(-8, -22, 16, 22, [8, 8, 0, 0]), ESCURO, 3)
  ctx.beginPath(); ctx.moveTo(0, -98); ctx.lineTo(0, -130); ctx.lineWidth = 3; ctx.strokeStyle = K; ctx.stroke()
  const w = Math.sin(TL.beat ? 0 : 0)
  ink(() => { ctx.moveTo(0, -130); ctx.quadraticCurveTo(14, -134 + w, 26, -126); ctx.lineTo(0, -116); ctx.closePath() }, BRANCO, 3)
  ctx.restore()
}
function chao(t, { colina = 430, relva = 520 } = {}) {
  ink(() => { ctx.moveTo(-20, colina); ctx.quadraticCurveTo(300, colina - 90, 620, colina - 10); ctx.quadraticCurveTo(900, colina + 40, W + 20, colina - 50); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#ddd2b6', 4)
  ink(() => { ctx.moveTo(-20, relva); ctx.quadraticCurveTo(640, relva - 30, W + 20, relva + 5); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#c9bc9b', 5)
}
function chegada(t) {
  const T = TL.ev
  sol(1090, 118, 48, t)
  nuvem(250 + (t - 4) * 7, 112, t, 0.9, 1); nuvem(720 + (t - 4) * 4, 76, t, 0.7, 2)
  chao(t)
  castelo(250, 360, 0.9)
  ink(() => { ctx.moveTo(-20, 588); ctx.quadraticCurveTo(640, 560, W + 20, 592); ctx.lineTo(W + 20, 652); ctx.quadraticCurveTo(640, 626, -20, 656); ctx.closePath() }, CLARO, 4)
  ctx.lineWidth = 4; ctx.strokeStyle = K
  for (let x = 30; x < W; x += 130) { ctx.beginPath(); ctx.moveTo(x, 622 - Math.sin(x / 400) * 4); ctx.lineTo(x + 40, 621 - Math.sin(x / 400) * 4); ctx.stroke() }
  arvore(120, 540, t, { s: 0.72, seed: 1 }); arvore(1200, 548, t, { s: 0.78, seed: 2 })
  placa(560, 556, t, 'Portugal')
  // o coche vem da esquerda e trava devagar junto de Pedro
  const u = saiDe(prog(t, 4.0, T.paragem)), xC = lerp(-800, 300, u)
  const anda = clamp((T.paragem - t) / 0.35), fase = xC / 24
  const osc = -Math.abs(Math.sin(fase)) * 3 * anda + 0
  const aceno = t > T.aceno ? clamp((t - T.aceno) / 0.2) * clamp((11.9 - t) / 0.3) : 0
  ctx.beginPath(); ctx.moveTo(xC + 120, 612 - 100); ctx.lineTo(xC + 250, 612 - 118 + osc); ctx.lineWidth = 6; ctx.strokeStyle = K; ctx.stroke()
  coche({ x: xC, base: 612, s: 0.85, roda: xC / 42, oscila: osc, janela: (jx, jy) => Constanca(jx, jy + 8, t, { olhar: 1, aceno, fecho: piscar(t, 5), mira: t < T.paragem ? espreitar(t, 5) : [0, 0] }) })
  cavalo({ x: xC + 300, base: 614, s: 0.85, fase, anda, t, fecho: piscar(t, 9) })
  // Pedro à espera, a bater o pé; quando o coche pára, faz uma vénia
  const b = respira(t, 1), tap = t < T.paragem ? Math.max(0, Math.sin(Math.PI * ((t / BEAT) % 1))) : 0
  const v = suave(prog(t, T.venia, T.venia + 0.3)) * (1 - suave(prog(t, T.venia + 0.9, T.venia + 1.25)))
  Pedro({ x: 1030, fy: 616, s: 0.82, sx: b.sx, sy: b.sy, olhar: -1, fecho: piscar(t, 3), mira: t < T.paragem - 1.5 ? espreitar(t, 3) : [0, 0],
    bF: [lerp(-72, -110, v), lerp(-120, -60, v)], bT: [70, -100], pe: [0, 0, 6 * tap, -14 * tap], inclina: -0.3 * v, coroa: v * 26, coroaRot: -v * 0.4 })
  if (t < 4.6) iris(640, 400, lerp(0, 900, saiDe(prog(t, 4.0, 4.6))))
}

// ---------- 3. Inês ----------
function cenaInes(t) {
  const T = TL.ev
  const pop = mola(prog(t, T.pop, T.pop + 1.0), 1.8, 4)
  sol(160, 110, 44, t)
  nuvem(520 + (t - 12) * 5, 96, t, 0.8, 3)
  chao(t, { colina: 400, relva: 505 })
  arvore(120, 540, t, { s: 0.88, seed: 4, susto: t > T.pop ? clamp((t - T.pop) / 0.1) : 0 })
  // o coche parado; o cavalo quase todo fora de quadro, à direita
  const osc = 0
  cavalo({ x: 1245, base: 566, s: 1.1, t, fecho: piscar(t, 9), susto: t > T.pop ? 1 : 0 })
  ctx.beginPath(); ctx.moveTo(860 + 150, 566 - 120); ctx.lineTo(1245 - 60, 566 - 150); ctx.lineWidth = 7; ctx.strokeStyle = K; ctx.stroke()
  const porta = suave(prog(t, T.porta, T.porta + 0.35))
  const espreita = saiDe(prog(t, T.espreita, T.espreita + 0.3))
  const cs = 1.2
  coche({ x: 860, base: 566, s: cs, oscila: osc, porta,
    janela: (jx, jy) => Constanca(jx, jy + 8, t, { olhar: -1, fecho: piscar(t, 5), mira: espreitar(t, 8, 0.8) }),
    portaDentro: (px, py) => { if (t < T.salto) Ines({ x: px + (1 - espreita) * 70, fy: py, s: 0.42, dir: -1, olhar: 1, fecho: piscar(t, 6), bF: [40, -150], bT: [-40, -150] }) } })
  // Inês salta da porta para a frente, e cresce porque vem para perto
  const bI = respira(t, 2)
  let ix, iy, is, isx = bI.sx, isy = bI.sy, bF = [40, -150], bT = [-42, -150], inc = 0
  if (t >= T.salto) {
    const u = prog(t, T.salto, T.aterra), x0 = 860 + 54 * cs, y0 = 566 - 96 * cs
    ix = lerp(x0, 600, suave(u)); iy = lerp(y0, 652, u) - Math.sin(Math.PI * u) * 105; is = lerp(0.42, 1.04, u)
    if (u < 1) { isx = 0.9; isy = 1.14; bF = [60, -300]; bT = [-60, -290]; inc = -0.25 * Math.sin(Math.PI * u) }
    else { const d = t - T.aterra, e = Math.exp(-d * 7) * Math.cos(d * 24); isx = bI.sx * (1 + 0.16 * e); isy = bI.sy * (1 - 0.22 * e) }
    const venia = Math.sin(Math.PI * prog(t, T.cortesia, T.cortesia + 0.9))
    const bat = pulsos(t, [T.pestanas, T.pestanas + 0.28], 12)
    if (t > T.cortesia) { bF = [lerp(40, 70, venia), lerp(-150, -60, venia)]; bT = [lerp(-42, -70, venia), lerp(-150, -60, venia)] }
    Ines({ x: ix, fy: iy, s: is, sx: isx, sy: isy, dir: -1, olhar: 1, fecho: t > T.pestanas && t < T.pestanas + 0.6 ? bat * 0.9 : piscar(t, 6),
      bF, bT, inclina: inc, venia, pestanas: bat, cabelo: Math.sin(t * 1.7) * 0.25, saia: Math.sin(t * 1.4) * 0.3, mira: t < T.cortesia ? espreitar(t, 6, 0.7) : [0, 0] })
  }
  // Pedro: olha para o coche; depois vê-a, e vê-a mesmo
  const b = respira(t, 1)
  const arreg = suave(prog(t, T.arregala, T.arregala + 0.25))
  const coroaU = prog(t, T.coroa, T.coroa + 0.55), coroaH = Math.sin(Math.PI * coroaU) * 120, coroaR = coroaU * TAU + (coroaU >= 1 ? 0.28 : 0)
  const peito = t > T.coracao[0] ? 0.25 + 0.75 * pulsos(t, T.coracao, 9) : 0
  const estica = t > T.pop ? Math.exp(-(t - T.pop) * 6) * Math.cos((t - T.pop) * 22) : 0
  const vira = suave(prog(t, T.vira, T.vira + 0.3))
  Pedro({ x: 300, fy: 662, s: 1.05, dir: -1, sx: t > T.pop ? 1 - estica * 0.1 : b.sx, sy: t > T.pop ? 1 + estica * 0.16 : b.sy,
    olhar: -1, fecho: piscar(t, 3), mira: t < T.vira ? espreitar(t, 4, 0.8) : [0, 0], pop, queixo: suave(prog(t, T.pop, T.pop + 0.12)), arregala: arreg, peito,
    coroa: coroaH, coroaRot: coroaR, inclina: 0.05 * vira, bF: [lerp(-72, -60, arreg), lerp(-120, -170, arreg)], bT: [70, -100] })
  // coraçõezinhos a subir
  if (t > T.coracao[0]) for (let i = 0; i < 4; i++) {
    const tb = T.coracao[i], d = t - tb
    if (d > 0 && d < 1.8) coracao(300 + Math.sin(d * 5 + i) * 18 + i * 8, 330 - d * 110, 12 * Math.min(1, d * 5) * (1 - Math.max(0, d - 1.4) / 0.4))
  }
  if (t > T.irisFecha) iris(308, 520, lerp(900, 0, suave(prog(t, T.irisFecha, 20.0))))
}

// ---------- 4. o rei não aprova ----------
function conselheirosSegredam(t, x0 = 870, fy = 650, forte = 0) {
  const cons = [[x0, 0, 21.2, 23.6], [x0 + 115, 1, 21.9, 24.4], [x0 + 230, 2, 22.6, 25.2]]
  cons.forEach(([cx, tipo, a, b], i) => {
    // cada um segreda ao do lado, em cadeia, e volta a segredar de vez em quando
    const ciclo = (t - a) % 5.5, ss = t > a ? suave(prog(ciclo, 0, 0.3)) * (1 - suave(prog(ciclo, b - a, b - a + 0.3))) : 0
    Conselheiro({ x: cx - forte * 50, fy, s: 0.95, tipo, olhar: -1, fecho: piscar(t, 30 + i), sussurra: Math.max(ss, forte), mira: espreitar(t, 30 + i, 0.6) })
  })
}
function cenaRei(t) {
  const T = TL.ev
  const treme = t > T.bate ? Math.exp(-(t - T.bate) * 12) * Math.sin((t - T.bate) * 70) * 5 : 0
  ctx.save(); ctx.translate(0, treme)
  salaTrono(t); trono(640, 600)
  const fr = suave(prog(t, T.franze, T.franze + 0.5))
  const ergue = t < T.bate ? suave(prog(t, T.bate - 0.55, T.bate - 0.15)) : 1 - saiDe(prog(t, T.bate, T.bate + 0.07))
  const b = respira(t, 21)
  Afonso({ x: 640, fy: 556, sx: b.sx, sy: b.sy, olhar: 1, fecho: piscar(t, 21), sobrolho: 0.25 + 0.75 * fr, mira: espreitar(t, 21, 0.5), cetro: [-74, -150 - ergue * 70] })
  conselheirosSegredam(t)
  ctx.restore()
  if (t < 20.6) iris(640, 330, lerp(0, 900, saiDe(prog(t, 20, 20.6))))
}

// ---------- 5. o mapa: Inês vai para Albuquerque ----------
const MAPA = { lon: -7.8, lat: 39.6, k: 190 }
const P = (lon, lat) => [640 + (lon - MAPA.lon) * 0.77 * MAPA.k, 360 - (lat - MAPA.lat) * MAPA.k]
const PORTUGAL = [[-8.87, 41.87], [-8.6, 42.05], [-8.2, 42.15], [-8.0, 41.95], [-7.4, 41.95], [-6.6, 41.95], [-6.2, 41.6], [-6.5, 41.3], [-6.85, 41.0], [-6.8, 40.3], [-6.9, 40.0], [-6.95, 39.67], [-7.53, 39.66], [-7.3, 39.45], [-7.25, 39.2], [-7.05, 38.88], [-7.2, 38.6], [-7.3, 38.4], [-6.95, 38.2], [-7.4, 37.95], [-7.5, 37.5], [-7.42, 37.18], [-8.0, 37.0], [-8.6, 37.1], [-8.95, 37.0], [-8.8, 37.4], [-8.8, 37.9], [-9.2, 38.4], [-9.5, 38.7], [-9.4, 39.1], [-9.4, 39.4], [-9.0, 39.9], [-8.9, 40.2], [-8.7, 40.8], [-8.7, 41.2], [-8.8, 41.6]]
function rosaVentos(x, y, r, t) {
  ink(E(x, y, r, r), BRANCO, 4); ink(E(x, y, r * 0.8, r * 0.8), null, 2)
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 1.3) * 0.05)
  for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ink(() => poly([[0, -r * 0.95], [r * 0.14, 0], [0, r * 0.14], [-r * 0.14, 0]]), i === 3 ? ESCURO : CLARO, 3) }
  ctx.restore()
  ctx.fillStyle = K; ctx.font = '22px Chango'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('N', x, y - r - 18)
}
function barquinho(x, y, t, s = 1) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 4); ctx.rotate(Math.sin(t * 1.6) * 0.06); ctx.scale(s, s)
  ink(() => { ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.lineTo(28, 18); ctx.lineTo(-28, 18); ctx.closePath() }, TORRADO, 4)
  ink(() => { ctx.moveTo(0, 0); ctx.lineTo(0, -70) }, null, 4)
  ink(() => { ctx.moveTo(4, -66); ctx.quadraticCurveTo(40, -40, 4, -10); ctx.closePath() }, BRANCO, 4)
  ctx.restore()
}
function cenaMapa(t) {
  const T = TL.ev
  ctx.fillStyle = '#e4d8b8'; ctx.fillRect(-20, -20, W + 40, H + 40)
  const g = ctx.createRadialGradient(640, 360, 300, 640, 360, 820); g.addColorStop(0, 'rgba(120,90,50,0)'); g.addColorStop(1, 'rgba(120,90,50,.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  // o mar, com ondinhas que andam devagar
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(22,18,14,.45)'
  for (let i = 0; i < 26; i++) { const wx = (hash(i) * 520 + t * 8) % 520 - 60, wy = 40 + hash(i + 50) * 640; ctx.beginPath(); ctx.arc(wx, wy, 9, Math.PI * 1.1, Math.PI * 1.9); ctx.arc(wx + 16, wy, 9, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke() }
  ink(() => poly(PORTUGAL.map(([lo, la]) => P(lo, la))), '#d8c9a4', 6)
  ctx.save(); ctx.setLineDash([3, 10]); ink(() => { const a = P(-6.95, 39.67), b = P(-7.25, 39.2); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]) }, null, 0); ctx.restore()
  ctx.fillStyle = K; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = '40px Chango'; ctx.fillText('Portugal', ...P(-8.25, 39.25))
  ctx.font = '40px Chango'; ctx.fillText('Castela', ...P(-6.0, 40.6))
  ctx.font = 'italic 28px Georgia'; ctx.fillText('Oceano', ...P(-10.05, 40.7))
  for (const [nome, lo, la, dx] of [['Lisboa', -9.14, 38.72, 58], ['Coimbra', -8.43, 40.21, -72]]) { const [cx, cy] = P(lo, la); ink(E(cx, cy, 7, 7), ESCURO, 3); ctx.font = 'italic 24px Georgia'; ctx.fillStyle = K; ctx.fillText(nome, cx + dx, cy) }
  barquinho(...P(-10.2, 39.5), t, 0.8)
  rosaVentos(1110, 580, 64, t)
  const A = P(-6.99, 39.22)
  castelo(A[0], A[1] + 6, 0.42)
  ctx.font = 'italic 26px Georgia'; ctx.fillStyle = K; ctx.fillText('Albuquerque', A[0] + 10, A[1] + 34)
  fita(170, 80, '1344')
  // o caminho, ponto a ponto, e o coche à frente
  const S = P(-8.15, 39.95), C = [(S[0] + A[0]) / 2 + 30, S[1] - 40]
  const pr = suave(prog(t, T.linha0, T.linha1)), n = 40
  const ponto = (u) => { const v = 1 - u; return [v * v * S[0] + 2 * v * u * C[0] + u * u * A[0], v * v * S[1] + 2 * v * u * C[1] + u * u * A[1]] }
  for (let i = 0; i <= n * pr; i++) { const [px, py] = ponto(i / n); dot(px, py, 3.5, K) }
  if (t > T.linha0) {
    const [cx, cy] = ponto(pr), osc = -Math.abs(Math.sin(t * 9)) * 2 * (pr < 1 ? 1 : 0)
    coche({ x: cx - 18, base: cy - 6 + osc, s: 0.16, roda: pr * 40 })
    cavalo({ x: cx + 30, base: cy - 6, s: 0.16, fase: pr * 60, anda: pr < 1 ? 1 : 0, t })
  }
  // Pedro, pequenino, fica a acenar com o lenço
  const acena = t > T.linha0 - 0.4 ? 1 : 0, w = Math.sin(t * 9) * 16 * acena
  Pedro({ x: S[0] - 18, fy: S[1] + 26, s: 0.26, dir: -1, olhar: -1, fecho: piscar(t, 3), sobrolho: -0.9, boca: -1, lenco: acena > 0, t, bF: acena ? [-50 + w, -300] : [-72, -120] })
  if (t > T.lagrima) { const d = t - T.lagrima; ink(() => { const tx = S[0] - 18 + 8.3, ty = S[1] + 26 - 62 + d * 40; ctx.moveTo(tx, ty - 6); ctx.quadraticCurveTo(tx + 5, ty + 2, tx, ty + 4); ctx.quadraticCurveTo(tx - 5, ty + 2, tx, ty - 6) }, BRANCO, 2) }
}

// ---------- 6. o luto de 1345 ----------
function cenaLuto(t) {
  const T = TL.ev, u = t - 38
  ctx.fillStyle = '#b3a78c'; ctx.fillRect(-20, -20, W + 40, H + 40)
  ctx.strokeStyle = 'rgba(22,18,14,.2)'; ctx.lineWidth = 2; for (let x = 20; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 560); ctx.stroke() }
  // a janela, com a noite lá fora
  ctx.save(); ctx.beginPath(); ctx.roundRect(250, 110, 200, 250, [100, 100, 6, 6]); ctx.clip()
  ctx.fillStyle = '#4a4238'; ctx.fillRect(250, 110, 200, 250)
  for (let i = 0; i < 9; i++) dot(260 + hash(i + 3) * 180, 130 + hash(i + 9) * 200, 2 + hash(i) * 1.5, '#e9dfc7')
  dot(390, 170, 34, '#efe6cf')
  const nv = suave(prog(t, T.sino[1], T.sino[1] + 2.2))
  nuvemEscura(lerp(160, 380, nv), 190, 0.5, t, 2)
  ctx.restore()
  ink(() => ctx.roundRect(250, 110, 200, 250, [100, 100, 6, 6]), null, 7)
  ink(() => { ctx.moveTo(350, 110); ctx.lineTo(350, 360); ctx.moveTo(250, 235); ctx.lineTo(450, 235) }, null, 5)
  for (const s of [-1, 1]) ink(() => { const x0 = 350 + s * 125; ctx.moveTo(x0, 90); ctx.lineTo(x0 - s * 40, 90); ctx.quadraticCurveTo(x0 - s * 55, 250, x0 - s * 20, 390); ctx.lineTo(x0 + s * 10, 390); ctx.closePath() }, MEIO, 5)
  ink(() => ctx.rect(-20, 560, W + 40, 200), '#8b7d66', 5)
  ctx.strokeStyle = 'rgba(22,18,14,.4)'; ctx.lineWidth = 3; for (const y of [600, 650, 700]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
  // o berço que embala o pequeno D. Fernando
  const ang = Math.sin(u * 1.4) * 0.05
  ctx.save(); ctx.translate(640, 600); ctx.rotate(ang)
  ink(() => { ctx.moveTo(-130, -6); ctx.quadraticCurveTo(0, 30, 130, -6) }, null, 9)
  ink(() => { ctx.moveTo(-110, -20); ctx.lineTo(-120, -120); ctx.lineTo(120, -120); ctx.lineTo(110, -20); ctx.quadraticCurveTo(0, 0, -110, -20) }, CLARO, 6)
  ctx.lineWidth = 3; ctx.strokeStyle = K; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 30, -116); ctx.lineTo(i * 28, -22); ctx.stroke() }
  ink(() => ctx.roundRect(-126, -132, 252, 18, 9), TORRADO, 5)
  ink(E(-60, -146, 30, 26), PELE, 4)
  ink(() => { ctx.moveTo(-92, -140); ctx.quadraticCurveTo(-96, -190, -58, -186); ctx.quadraticCurveTo(-24, -182, -28, -140); ctx.quadraticCurveTo(-60, -166, -92, -140) }, BRANCO, 4)
  for (const ex of [-70, -50]) ink(() => ctx.arc(ex, -146, 6, 0.3, Math.PI - 0.3), null, 3)
  ink(() => { ctx.moveTo(-34, -138); ctx.quadraticCurveTo(40, -160, 110, -130); ctx.lineTo(110, -122); ctx.lineTo(-40, -122); ctx.closePath() }, BRANCO, 4)
  for (const [px, py] of [[10, -134], [50, -140], [85, -132]]) dot(px, py, 4, K)
  ctx.restore()
  // a mesa e a vela, que se apaga
  ink(() => ctx.rect(890, 470, 260, 18), TORRADO, 5); for (const lx of [910, 1130]) ink(() => ctx.rect(lx - 8, 488, 16, 90), TORRADO, 4)
  const esc = 0.3 + 0.55 * suave(prog(t, T.apaga, T.apaga + 0.8))
  escurecer(esc)
  const acesa = 1 - suave(prog(t, T.apaga, T.apaga + 0.3))
  vela(1020, 470, t, { s: 1.1, acesa, seed: 3 })
  if (t > T.apaga) { const d = t - T.apaga; ctx.strokeStyle = `rgba(233,223,199,${Math.max(0, 0.6 - d * 0.35)})`; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 12; k++) { const yy = 470 - 77 - k * 8 - d * 20; ctx.lineTo(1021 + Math.sin(k * 0.8 + d * 3) * (4 + k * 1.5), yy) } ctx.stroke() }
  fita(170, 80, '1345')
}

// ---------- 7. o regresso ----------
function cenaRegresso(t) {
  const T = TL.ev
  sol(1090, 118, 48, t)
  nuvem(250 + (t - 46) * 7, 112, t, 0.9, 1); nuvem(720 + (t - 46) * 4, 76, t, 0.7, 2)
  chao(t)
  ink(() => { ctx.moveTo(-20, 588); ctx.quadraticCurveTo(640, 560, W + 20, 592); ctx.lineTo(W + 20, 652); ctx.quadraticCurveTo(640, 626, -20, 656); ctx.closePath() }, CLARO, 4)
  ctx.lineWidth = 4; ctx.strokeStyle = K
  for (let x = 30; x < W; x += 130) { ctx.beginPath(); ctx.moveTo(x, 622 - Math.sin(x / 400) * 4); ctx.lineTo(x + 40, 621 - Math.sin(x / 400) * 4); ctx.stroke() }
  arvore(120, 540, t, { s: 0.72, seed: 1 }); arvore(1200, 548, t, { s: 0.78, seed: 2 })
  placa(1060, 556, t, 'Castela')
  // o coche vem de Castela (da direita), pára, e depois segue caminho
  let xC
  if (t < T.cocheParte) xC = lerp(1750, 900, saiDe(prog(t, 46, T.cochePara)))
  else xC = lerp(900, -900, prog(t, T.cocheParte, 54.6) ** 1.8)
  const anda = t < T.cochePara ? clamp((T.cochePara - t) / 0.35) : t > T.cocheParte ? clamp((t - T.cocheParte) / 0.3) : 0
  const fase = -xC / 24, osc = -Math.abs(Math.sin(fase)) * 3 * anda
  const porta = suave(prog(t, T.cochePara + 0.05, T.cochePara + 0.3)) * (1 - suave(prog(t, T.cocheParte - 0.4, T.cocheParte - 0.1)))
  ctx.save(); ctx.translate(xC, 0); ctx.scale(-1, 1)
  ctx.beginPath(); ctx.moveTo(120, 612 - 100); ctx.lineTo(250, 612 - 118 + osc); ctx.lineWidth = 6; ctx.strokeStyle = K; ctx.stroke()
  coche({ x: 0, base: 612, s: 0.85, roda: fase * 0.6, oscila: osc, porta,
    janela: (jx, jy) => { if (t < T.inesSai) Ines({ x: jx + 6, fy: jy + 100, s: 0.34, olhar: 1, fecho: piscar(t, 6), bF: [40, -150], bT: [-40, -150] }) } })
  cavalo({ x: 300, base: 614, s: 0.85, fase, anda, t, fecho: piscar(t, 9) })
  ctx.restore()
  // Pedro espera; ela salta; correm um para o outro
  const abr = t > T.abraco ? mola(prog(t, T.abraco, T.abraco + 1.2), 1.4, 5) : 0
  let px = 250, pp = passada(0, 0), pb = respira(t, 1)
  if (t > T.corre) { const u = suave(prog(t, T.corre, T.abraco)); px = lerp(250, 490, u); pp = passada(px / 22, u < 1 ? 1.3 : 0) }
  const tap = t < T.cochePara ? Math.max(0, Math.sin(Math.PI * ((t / BEAT) % 1))) : 0
  const pe = t > T.corre ? pp.pe : [0, 0, 6 * tap, -14 * tap]
  Pedro({ x: px, fy: 630 + (t > T.corre ? pp.bob : 0), s: 0.82, dir: -1, sx: pb.sx, sy: pb.sy, olhar: -1, fecho: piscar(t, 3),
    mira: t < T.cochePara ? espreitar(t, 3) : [0, 0], pe, inclina: 0.1 * abr + (t > T.corre && t < T.abraco ? 0.08 : 0),
    bF: t > T.abraco ? [-110, -200] : [-72 - pp.braco * 16, -120], bT: [70 + pp.braco * 16, -100], boca: 1 })
  if (t > T.inesSai) {
    let ix, iy, is = 0.82, isx = 1, isy = 1, bF = [40, -150], bT = [-42, -150], inc = 0, pe2 = [0, 0, 0, 0]
    const u = prog(t, T.inesSai, T.inesAterra), x0 = xC - 46, y0 = 612 - 96 * 0.85
    ix = lerp(x0, 690, suave(u)); iy = lerp(y0, 634, u) - Math.sin(Math.PI * u) * 90; is = lerp(0.3, 0.82, u)
    if (u < 1) { isx = 0.9; isy = 1.14; bF = [60, -300]; bT = [-60, -290] }
    else {
      const d = t - T.inesAterra, e = Math.exp(-d * 7) * Math.cos(d * 24); isx = 1 + 0.16 * e; isy = 1 - 0.22 * e
      if (t > T.corre) { const v = suave(prog(t, T.corre, T.abraco)); ix = lerp(690, 620, v); pe2 = passada(ix / 20, v < 1 ? 1 : 0).pe }
      if (t > T.abraco) { bF = [118, -210]; bT = [-44, -150]; inc = -0.1 * abr }
    }
    Ines({ x: ix, fy: iy, s: is, sx: isx, sy: isy, dir: -1, olhar: 1, fecho: piscar(t, 6), bF, bT, inclina: inc, pe: pe2, cabelo: Math.sin(t * 1.7) * 0.3, saia: Math.sin(t * 1.4) * 0.3 })
  }
  if (t > T.abraco) for (let i = 0; i < 7; i++) {
    const d = t - T.abraco, a = -Math.PI / 2 + (i - 3) * 0.42, r = 40 + saiDe(Math.min(1, d / 1.4)) * 170
    const k = Math.min(1, d * 6) * (1 - clamp((d - 1.6) / 0.5))
    if (k > 0) coracao(555 + Math.cos(a) * r, 330 + Math.sin(a) * r * 0.8, 15 * k)
  }
}

// ---------- 8. Coimbra ----------
function casinha(x, y, w, h, seed) {
  ink(() => ctx.rect(x - w / 2, y - h, w, h), hash(seed) > 0.5 ? BRANCO : '#efe6cf', 3.5)
  ink(() => poly([[x - w / 2 - 5, y - h], [x + w / 2 + 5, y - h], [x + w / 2 - 4, y - h - 16], [x - w / 2 + 4, y - h - 16]]), MEIO, 3.5)
  ink(() => ctx.roundRect(x - 5, y - h + 10, 10, 14, [5, 5, 0, 0]), ESCURO, 0)
}
function cenaCoimbra(t) {
  const u = t - 54
  sol(1150, 96, 42, t)
  nuvem(300 + u * 6, 110, t, 0.8, 1); nuvem(760 + u * 4, 70, t, 0.6, 2)
  // a colina da Alta, na margem direita
  ink(() => { ctx.moveTo(520, 480); ctx.quadraticCurveTo(680, 300, 860, 220); ctx.quadraticCurveTo(990, 160, 1120, 180); ctx.quadraticCurveTo(1260, 200, 1300, 250); ctx.lineTo(1300, 480); ctx.closePath() }, '#ddd2b6', 5)
  const casas = [[640, 440, 44, 34], [700, 450, 40, 30], [760, 400, 46, 36], [820, 440, 42, 30], [700, 380, 38, 30], [950, 430, 46, 34], [1010, 400, 40, 32], [1070, 440, 46, 30], [1130, 410, 42, 34], [1190, 440, 44, 30], [1240, 400, 40, 34], [780, 330, 40, 30], [1180, 330, 44, 32], [1100, 300, 40, 30], [950, 300, 38, 28], [1230, 270, 40, 30]]
  casas.forEach(([x, y, w, h], i) => casinha(x, y, w, h, i))
  // a Sé Velha, uma fortaleza com ameias
  ctx.save(); ctx.translate(880, 360)
  ink(() => ctx.rect(-70, -100, 140, 100), CLARO, 5)
  ink(() => { ctx.moveTo(-70, -100); for (let i = 0; i < 7; i++) { const a = -70 + i * 20; ctx.lineTo(a, -114); ctx.lineTo(a + 10, -114); ctx.lineTo(a + 10, -100); ctx.lineTo(a + 20, -100) } }, null, 4)
  ink(() => ctx.roundRect(-22, -60, 44, 60, [22, 22, 0, 0]), ESCURO, 4)
  ink(E(0, -80, 10, 10), null, 3)
  for (const bx of [-70, 70]) ink(() => ctx.rect(bx - 12, -110, 24, 110), CLARO, 4)
  ctx.restore()
  // o castelo, lá no alto
  ctx.save(); ctx.translate(1010, 190)
  ink(() => ctx.rect(-60, -50, 120, 50), MEIO, 4)
  for (const bx of [-60, 0, 60]) { ink(() => ctx.rect(bx - 16, -86, 32, 86), MEIO, 4); ink(() => { ctx.moveTo(bx - 16, -86); ctx.lineTo(bx - 16, -96); ctx.lineTo(bx - 6, -96); ctx.lineTo(bx - 6, -86); ctx.lineTo(bx + 6, -86); ctx.lineTo(bx + 6, -96); ctx.lineTo(bx + 16, -96); ctx.lineTo(bx + 16, -86) }, null, 4) }
  ctx.restore()
  // a muralha ao longo da encosta
  ink(() => { ctx.moveTo(560, 470); ctx.lineTo(1300, 460) }, null, 6)
  // o rio Mondego, a correr
  ink(() => ctx.rect(-20, 470, W + 40, 90), '#e8dfc9', 5)
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(22,18,14,.5)'
  for (let i = 0; i < 18; i++) { const wx = ((hash(i) * 1400 + u * 30) % 1400) - 60, wy = 490 + hash(i + 7) * 55; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.quadraticCurveTo(wx + 10, wy - 6, wx + 20, wy); ctx.quadraticCurveTo(wx + 30, wy + 6, wx + 40, wy); ctx.stroke() }
  // um barco serrano a descer o rio
  ctx.save(); ctx.translate(1000 - u * 12, 530 + Math.sin(t * 2) * 3)
  ink(() => { ctx.moveTo(-60, 0); ctx.quadraticCurveTo(0, 20, 60, 0); ctx.lineTo(50, -8); ctx.lineTo(-50, -8); ctx.closePath() }, TORRADO, 4)
  ink(() => { ctx.moveTo(0, -8); ctx.lineTo(0, -80) }, null, 4); ink(() => { ctx.moveTo(4, -76); ctx.lineTo(44, -20); ctx.lineTo(4, -16); ctx.closePath() }, BRANCO, 4)
  ctx.restore()
  // a ponte, com arcos
  ink(() => ctx.rect(300, 452, 480, 22), CLARO, 5)
  for (let i = 0; i < 6; i++) { const ax = 320 + i * 80; ink(() => { ctx.moveTo(ax, 474); ctx.lineTo(ax, 520); ctx.moveTo(ax + 60, 520); ctx.lineTo(ax + 60, 474) }, null, 5); ink(() => { ctx.moveTo(ax, 520); ctx.quadraticCurveTo(ax + 30, 470, ax + 60, 520) }, null, 5) }
  // Pedro e Inês, pequeninos, atravessam a ponte de mãos dadas
  const pu = prog(t, 54.6, 59.6), bx = lerp(330, 740, pu), f = bx / 9
  Ines({ x: bx, fy: 452, s: 0.2, olhar: 1, pe: passada(f, 1).pe, bF: [60, -150] })
  Pedro({ x: bx + 34, fy: 452, s: 0.2, dir: -1, olhar: -1, pe: passada(f + 1, 1).pe, bF: [-60, -140] })
  // a margem esquerda e Santa Clara
  ink(() => { ctx.moveTo(-20, 540); ctx.quadraticCurveTo(300, 520, 620, 560); ctx.lineTo(620, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#c9bc9b', 5)
  ink(() => { ctx.moveTo(620, 560); ctx.quadraticCurveTo(900, 560, W + 20, 580); ctx.lineTo(W + 20, H + 20); ctx.lineTo(620, H + 20); ctx.closePath() }, '#c9bc9b', 5)
  ctx.save(); ctx.translate(200, 560)
  ink(() => ctx.rect(20, -150, 200, 150), CLARO, 5)
  for (let i = 0; i < 4; i++) ink(() => poly([[40 + i * 50, 0], [52 + i * 50, 0], [48 + i * 50, -150], [44 + i * 50, -150]]), MEIO, 3)
  ink(() => { ctx.moveTo(-80, 0); ctx.lineTo(-80, -170); ctx.lineTo(0, -240); ctx.lineTo(80, -170); ctx.lineTo(80, 0); ctx.closePath() }, BRANCO, 6)
  ink(E(0, -160, 30, 30), CLARO, 5); for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; ink(() => { ctx.moveTo(0, -160); ctx.lineTo(Math.cos(a) * 30, -160 + Math.sin(a) * 30) }, null, 2) }
  ink(() => { ctx.moveTo(-26, 0); ctx.lineTo(-26, -70); ctx.quadraticCurveTo(0, -110, 26, -70); ctx.lineTo(26, 0); ctx.closePath() }, ESCURO, 5)
  ink(() => { ctx.moveTo(0, -240); ctx.lineTo(0, -280); ctx.moveTo(-14, -266); ctx.lineTo(14, -266) }, null, 5)
  ctx.restore()
  // gaivotas
  for (let i = 0; i < 4; i++) { const gx = ((u * 60 + i * 300) % 1500) - 100, gy = 180 + hash(i) * 90 + Math.sin(t * 2 + i) * 8, a = Math.sin(t * 8 + i) * 8; ctx.lineWidth = 3.5; ctx.strokeStyle = K; ctx.beginPath(); ctx.moveTo(gx - 16, gy - a); ctx.quadraticCurveTo(gx - 8, gy - 10, gx, gy); ctx.quadraticCurveTo(gx + 8, gy - 10, gx + 16, gy - a); ctx.stroke() }
  fita(640, 64, 'Coimbra', '36px Chango')
  fita(360, 250, 'Santa Clara', 'italic 22px Georgia')
}

// ---------- 9. a fonte: chegam cada um do seu lado ----------
function cenaFonte(t) {
  const T = TL.ev
  ctx.fillStyle = '#ddd2b8'; ctx.fillRect(-10, -10, W + 20, H + 20)
  ink(() => { ctx.moveTo(-10, 470); ctx.quadraticCurveTo(400, 390, 820, 470); ctx.quadraticCurveTo(1050, 510, W + 10, 440); ctx.lineTo(W + 10, H + 10); ctx.lineTo(-10, H + 10); ctx.closePath() }, '#cfc3a6', 4)
  ink(() => { ctx.moveTo(-10, 545); ctx.quadraticCurveTo(640, 505, W + 10, 548); ctx.lineTo(W + 10, H + 10); ctx.lineTo(-10, H + 10); ctx.closePath() }, '#bfb190', 5)
  lua(430, 140, 62, t)
  ;[[160, 90], [610, 70], [760, 180], [300, 230], [880, 60], [1180, 110], [1000, 200]].forEach(([sx, sy], i) => estrela(sx, sy, 13 * (1 + 0.18 * Math.sin(t * 5 + i * 1.7)), Math.sin(t * 2 + i) * 0.2))
  arvore(1062, 548, t, { seed: 3 })
  fonte(250, 500, t)
  for (let i = 0; i < 7; i++) {
    const fx = 150 + hash(i) * 1000 + Math.sin(t * 0.7 + i * 2) * 40, fy = 330 + hash(i + 9) * 200 + Math.cos(t * 0.9 + i) * 25
    const a = 0.35 + 0.65 * Math.max(0, Math.sin(t * 3 + i * 1.3))
    ctx.fillStyle = `rgba(255,251,232,${a * 0.35})`; ctx.beginPath(); ctx.arc(fx, fy, 9, 0, TAU); ctx.fill(); dot(fx, fy, 3, `rgba(255,251,232,${a})`)
  }
  // entram a andar: Inês pela esquerda, Pedro pela direita, e param frente a frente
  const u = saiDe(prog(t, T.entram, T.param)), anda = t < T.param - 0.15 ? 1 : clamp((T.param - t) / 0.15)
  const ixx = lerp(-130, 540, u), pxx = lerp(1420, 772, u)
  const pi = passada(ixx / 26, anda), pp = passada((1420 - pxx) / 26 + 1, anda)
  const olham = t > T.param - 0.6
  const oferece = suave(prog(t, T.flor, T.flor + 0.45)), recebe = suave(prog(t, T.maos, T.maos + 0.35))
  const sw = t > T.maos ? Math.sin((t - T.maos) * Math.PI / 2) * 0.03 : 0, br = respira(t, 7, 0.6)
  const bat = pulsos(t, [T.pestanas2, T.pestanas2 + 0.28], 12)
  Ines({ x: ixx, fy: 588 + pi.bob, sx: br.sx, sy: br.sy, olhar: 1, fecho: t > T.pestanas2 && t < T.pestanas2 + 0.6 ? bat * 0.9 : piscar(t, 6), pestanas: bat,
    pe: pi.pe, inclina: sw, mira: olham ? [0, 0] : espreitar(t, 6, 0.6), cabelo: pi.braco * 0.6 + Math.sin(t * Math.PI / 2) * 0.3, saia: pi.braco + Math.sin(t * 1.4) * 0.2,
    bF: [lerp(40 - pi.braco * 14, 102, recebe), lerp(-140, -190, recebe)], bT: [-50 + pi.braco * 14, -106] })
  Pedro({ x: pxx, fy: 592 + pp.bob, sx: br.sx, sy: br.sy, olhar: -1, fecho: piscar(t, 3), pe: pp.pe, inclina: sw, mira: olham ? [0, 0] : espreitar(t, 3, 0.6),
    flor: oferece > 0.4, bF: [lerp(-72 - pp.braco * 16, -128, oferece), lerp(-120, -192, oferece)], bT: oferece > 0 ? [70, -100] : [52 + pp.braco * 16, -110] })
  if (t > T.maos) for (let i = 0; i < 6; i++) {
    const tb = T.maos + 0.3 + i * 1.1, d = t - tb
    if (d > 0 && d < 2.6) coracao(656 + Math.sin(d * 3 + i) * 16, 280 - d * 70, (9 + (i % 3) * 3) * Math.min(1, d * 4) * (1 - Math.max(0, d - 2.2) / 0.4))
  }
  // e os quatro filhos, um a um
  const filhos = [[400, 0, 1], [320, 1, 1], [900, 0, -1], [980, 1, -1]]
  filhos.forEach(([fx, tipo, ol], i) => {
    const t0 = T.filhos[i]
    if (t < t0) return
    const d = t - t0, k = mola(Math.min(1, d / 0.9), 1.6, 5), salto = Math.max(0, Math.sin(Math.min(1, d / 0.35) * Math.PI)) * 40
    const b = respira(t, 40 + i, 0.8)
    Crianca({ x: fx, fy: 640 - salto, s: 0.62 * k, sx: b.sx, sy: b.sy, tipo, olhar: ol, fecho: piscar(t, 40 + i), mira: espreitar(t, 40 + i, 0.5), braco: Math.max(0, 1 - d * 1.5) })
  })
  if (t < 60.6) iris(656, 360, lerp(0, 900, saiDe(prog(t, 60, 60.6))))
  if (t > T.irisFonte) iris(656, 420, lerp(900, 0, suave(prog(t, T.irisFonte, 76))))
}

// ---------- 10. o medo na corte ----------
function cenaMedo(t) {
  const T = TL.ev
  salaTrono(t); trono(640, 600)
  const av = suave(prog(t, T.avancam, T.avancam + 1.2))
  // as sombras dos conselheiros crescem na parede
  if (av > 0) silhueta(() => { for (let i = 0; i < 3; i++) Conselheiro({ x: 700 + i * 150 - av * 60, fy: 560, s: 0.95 + av * 0.55, tipo: i, olhar: -1, sombra: true, sussurra: 1 }) }, `rgba(16,12,8,${0.45 * av})`)
  const b = respira(t, 21)
  const preoc = suave(prog(t, T.bolha1, T.bolha1 + 0.6))
  Afonso({ x: 640, fy: 556, sx: b.sx, sy: b.sy, olhar: 1, fecho: piscar(t, 21), sobrolho: lerp(0.6, -0.7, preoc) * (1 - av) + av * 0.9, mira: av > 0.5 ? [0, 0.8] : espreitar(t, 21, 0.4), cetro: [-74, -150] })
  conselheirosSegredam(t, 870, 650, av)
  // o que o rei pensa
  const fecha = 1 - suave(prog(t, T.fechaBolha, T.fechaBolha + 0.25))
  const abre1 = prog(t, T.bolha1, T.bolha1 + 0.5) * fecha, troca = t > T.bolha2
  balao(330, 230, 460, 300, 600, 300, abre1, () => {
    ctx.scale(1.3, 1.3); ctx.translate(0, -18)
    if (!troca) {
      castelo(0, 70, 0.55)
      Soldado(-110, 110, 0.9, 0, 1); Soldado(110, 110, 0.9, 0, -1)
      ctx.fillStyle = K; ctx.font = 'italic 24px Georgia'; ctx.textAlign = 'center'; ctx.fillText('irmãos Castro', 0, -95)
    } else {
      const k = saiDe(prog(t, T.bolha2, T.bolha2 + 0.4))
      ctx.save(); ctx.scale(k, k)
      trono(20, 120, 0.42)
      ;[[-40, 0], [70, 1], [-10, 0], [100, 1]].forEach(([cx, tp], i) => Crianca({ x: cx, fy: 120 - (i > 1 ? 40 : 0), s: 0.36, tipo: tp, olhar: i % 2 ? -1 : 1, fecho: piscar(t, 50 + i) }))
      Crianca({ x: -150, fy: 120, s: 0.42, tipo: 0, olhar: 1, fecho: 0, mira: [0.6, 0] })
      ink(() => poly([[-164, 38], [-168, 20], [-158, 30], [-150, 16], [-142, 30], [-132, 20], [-136, 38]]), '#c7b894', 3)
      ctx.fillStyle = K; ctx.font = 'italic 22px Georgia'; ctx.textAlign = 'center'; ctx.fillText('D. Fernando', -150, 146)
      ctx.restore()
    }
  })
  escurecer(av * 0.35 + suave(prog(t, T.escuroMedo, 92)))
}

// ---------- 11. a morte de Inês: sem música, sem caras ----------
function arvoreNua(x, base, t, s = 1) {
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s)
  const sw = Math.sin(t * 0.9) * 0.04
  const ramo = (len, ang, larg, n) => {
    ctx.save(); ctx.rotate(ang + sw * (4 - n)); ink(() => { ctx.moveTo(-larg / 2, 0); ctx.lineTo(-larg / 4, -len); ctx.lineTo(larg / 4, -len); ctx.lineTo(larg / 2, 0); ctx.closePath() }, SOMBRA, 4)
    if (n > 0) { ctx.translate(0, -len); ramo(len * 0.7, -0.5, larg * 0.6, n - 1); ramo(len * 0.65, 0.55, larg * 0.6, n - 1) }
    ctx.restore()
  }
  ramo(170, 0, 36, 3)
  ctx.restore()
}
function cenaMorte(t) {
  const T = TL.ev
  ctx.fillStyle = '#9a8f76'; ctx.fillRect(-20, -20, W + 40, H + 40)
  for (let i = 0; i < 16; i++) dot(hash(i + 70) * W, hash(i + 90) * 300, 1.5 + hash(i) * 1.5, '#e9dfc7')
  dot(200, 130, 40, '#e9dfc7')
  nuvemEscura(260 + (t - 92) * 5, 150, 0.9, t, 4)
  // o muro do paço, a janela acesa e a porta
  ink(() => ctx.rect(420, 150, 900, 450), '#b8ac90', 6)
  ctx.strokeStyle = 'rgba(22,18,14,.28)'; ctx.lineWidth = 2.5
  for (let y = 150, r = 0; y < 600; y += 50, r++) { ctx.beginPath(); ctx.moveTo(420, y); ctx.lineTo(W + 20, y); ctx.stroke(); for (let x = 420 + (r % 2) * 60; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 50); ctx.stroke() } }
  const luz = 1 - suave(prog(t, T.apagaJanela, T.apagaJanela + 0.25))
  if (luz > 0) brilho(1080, 300, 260 * luz, 0.35 * luz)
  ink(() => { ctx.moveTo(1020, 380); ctx.lineTo(1020, 270); ctx.quadraticCurveTo(1020, 220, 1080, 200); ctx.quadraticCurveTo(1140, 220, 1140, 270); ctx.lineTo(1140, 380); ctx.closePath() }, luz > 0.5 ? '#f3ead0' : '#4a4238', 6)
  ink(() => { ctx.moveTo(1080, 205); ctx.lineTo(1080, 380); ctx.moveTo(1020, 300); ctx.lineTo(1140, 300) }, null, 4)
  const aberta = suave(prog(t, T.sombras1 - 0.6, T.sombras1 - 0.2)) * (1 - suave(prog(t, T.portaFecha - 0.1, T.portaFecha)))
  ink(() => { ctx.moveTo(800, 600); ctx.lineTo(800, 470); ctx.quadraticCurveTo(840, 420, 880, 470); ctx.lineTo(880, 600); ctx.closePath() }, aberta > 0.1 ? '#221c16' : TORRADO, 6)
  if (aberta < 0.9) ink(() => { ctx.moveTo(800, 600); ctx.lineTo(800, 470); ctx.quadraticCurveTo(840 - aberta * 40, 420, 880 - aberta * 80, 470); ctx.lineTo(880 - aberta * 80, 600); ctx.closePath() }, TORRADO, 5)
  // três sombras compridas atravessam o muro até à porta
  if (t > T.sombras0 && t < T.portaFecha) {
    const u = prog(t, T.sombras0, T.sombras1)
    ctx.save(); ctx.beginPath(); ctx.rect(420, 150, 420, 450); ctx.clip()
    silhueta(() => { for (let i = 0; i < 3; i++) { const v = clamp(u * 1.45 - i * 0.22), sx = lerp(330, 900, v); if (v > 0 && v < 1) Conselheiro({ x: sx, fy: 600, s: 1.0, tipo: i, olhar: 1, sombra: true, pe: passada(sx / 26 + i, 1).pe, inclina: 0.06 }) } }, 'rgba(16,12,8,.72)')
    ctx.restore()
  }
  ink(() => ctx.rect(-20, 600, W + 40, 200), '#6f6656', 5)
  arvoreNua(230, 610, t, 1.1)
  // folhas levadas pelo vento
  for (let i = 0; i < 6; i++) { const fx = ((t - 92) * (90 + i * 20) + hash(i) * 1400) % 1500 - 100, fy = 300 + hash(i + 4) * 280 + Math.sin(t * 2 + i) * 30; ctx.save(); ctx.translate(fx, fy); ctx.rotate(t * 3 + i); ink(E(0, 0, 8, 4), MEIO, 2); ctx.restore() }
  escurecer(0.28 + 0.55 * suave(prog(t, 104.8, 106)))
}

// ---------- 12. a revolta ----------
function cenaRevolta(t) {
  const T = TL.ev
  const paz = suave(prog(t, T.pazes, T.pazes + 1.5))
  ctx.fillStyle = paz > 0 ? `rgb(${lerp(150, 214, paz) | 0},${lerp(140, 205, paz) | 0},${lerp(118, 184, paz) | 0})` : '#968c74'; ctx.fillRect(-20, -20, W + 40, H + 40)
  for (let i = 0; i < 6; i++) nuvemEscura(((i * 260 + (t - 106) * (20 + i * 4)) % 1600) - 150 + paz * (i % 2 ? 400 : -400), 70 + (i % 3) * 60, 1 + (i % 2) * 0.3, t, i)
  // colinas, fumo, e dois exércitos a marchar
  ink(() => { ctx.moveTo(-20, 440); ctx.quadraticCurveTo(400, 360, 800, 430); ctx.quadraticCurveTo(1050, 470, W + 20, 410); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#b3a78c', 5)
  for (let i = 0; i < 3; i++) { const bx = 900 + i * 90; for (let k = 0; k < 5; k++) { const d = ((t - 106) * 0.6 + k * 0.25 + i * 0.3) % 1.2; ink(E(bx + Math.sin(d * 5 + i) * 14 + d * 30, 420 - d * 260, 18 + d * 40, 14 + d * 30), `rgba(111,102,86,${0.8 - d * 0.6})`, 0) } }
  const marcha = 1 - paz
  for (let i = 0; i < 9; i++) Soldado(((t - 106) * 40 * marcha + i * 70) % 700 - 80, 440 + (i % 2) * 6, 0.32, (t - 106) * 7 * marcha + i, 1)
  for (let i = 0; i < 9; i++) Soldado(1300 - (((t - 106) * 40 * marcha + i * 70) % 700), 470 + (i % 2) * 6, 0.36, (t - 106) * 7 * marcha + i + 2, -1)
  ink(() => { ctx.moveTo(-20, 560); ctx.quadraticCurveTo(640, 520, W + 20, 565); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#9f937a', 5)
  // Pedro, de espada erguida, zangado; depois baixa a espada
  const baixa = suave(prog(t, T.pazes, T.pazes + 0.8)), b = respira(t, 1)
  const ang = lerp(-0.25, 2.6, baixa), mao = [lerp(-70, -96, baixa), lerp(-320, -120, baixa)]
  const aperto = suave(prog(t, T.maosPaz - 0.4, T.maosPaz))
  Pedro({ x: 420, fy: 660, s: 1.08, dir: -1, sx: b.sx, sy: b.sy, olhar: -1, fecho: piscar(t, 3), sobrolho: lerp(1, -0.6, baixa), boca: lerp(-1, 0, baixa), manto: 1, t,
    espada: aperto > 0.5 ? null : ang, bF: aperto > 0 ? [lerp(mao[0], -190, aperto), lerp(mao[1], -170, aperto)] : mao, mira: [0, 0] })
  // D. Afonso chega para fazer as pazes
  if (t > T.afonsoEntra) {
    const u = saiDe(prog(t, T.afonsoEntra, T.pazes)), ax = lerp(1400, 740, u), p = passada(ax / 22, u < 1 ? 1 : 0)
    Afonso({ x: ax, fy: 660 + p.bob, s: 0.95, olhar: -1, fecho: piscar(t, 21), sobrolho: -0.6, pe: p.pe, semCetro: aperto > 0, cetro: aperto > 0 ? [lerp(-74, -130, aperto), lerp(-150, -170, aperto)] : [-74, -150] })
  }
  if (t > T.relampagos[0]) for (const r of T.relampagos) { const d = t - r; if (d > 0 && d < 0.22) { escurecer(0.001); ctx.fillStyle = `rgba(255,252,240,${0.55 * (1 - d / 0.22)})`; ctx.fillRect(-20, -20, W + 40, H + 40); if (d < 0.12) { ctx.lineWidth = 6; ctx.strokeStyle = BRANCO; ctx.beginPath(); let x = 300 + hash(r) * 700, y = 0; ctx.moveTo(x, y); for (let k = 0; k < 6; k++) { x += (hash(r + k) - 0.5) * 80; y += 60; ctx.lineTo(x, y) } ctx.stroke() } } }
  escurecer(0.3 * (1 - paz))
}

// ---------- 13. Pedro, rei; Cantanhede ----------
function cenaCoroacao(t) {
  const T = TL.ev
  const treme = t > T.selo ? Math.exp(-(t - T.selo) * 12) * Math.sin((t - T.selo) * 70) * 4 : 0
  ctx.save(); ctx.translate(0, treme)
  salaTrono(t); trono(640, 600)
  const pousa = t > T.coroaPousa, cai = suave(prog(t, T.coroaDesce, T.coroaPousa))
  const vas = suave(prog(t, T.vassalos, T.vassalos + 0.6))
  ;[[250, 1], [360, 0], [920, 1], [1030, 0]].forEach(([nx, tp], i) => Nobre({ x: nx, fy: 650, s: 0.95, tipo: tp, olhar: nx < 640 ? 1 : -1, joelho: suave(prog(t, T.vassalos + i * 0.12, T.vassalos + 0.5 + i * 0.12)), fecho: piscar(t, 60 + i) }))
  const b = respira(t, 1), d = t - T.coroaPousa, e = pousa ? Math.exp(-d * 7) * Math.cos(d * 22) : 0
  Pedro({ x: 640, fy: 560, s: 1.02, sx: b.sx * (1 + e * 0.08), sy: b.sy * (1 - e * 0.1), olhar: -1, fecho: piscar(t, 3), mira: pousa ? [0.3, 0.3] : [0, -0.8], sobrolho: -0.5, boca: 0, rei: pousa, semCoroa: !pousa, manto: pousa ? 1 : 0, t, bF: [-80, -110], bT: [70, -100] })
  if (!pousa) {
    const cy = lerp(-120, 560 - 300 * 1.02, cai)
    ctx.save(); ctx.translate(638, cy); ctx.rotate(Math.sin(t * 3) * 0.1 * (1 - cai)); ctx.scale(1.02, 1.02)
    ink(() => poly([[-40, 24], [-46, -28], [-24, -2], [-10, -40], [0, -6], [12, -40], [26, -2], [46, -28], [40, 24]]), '#c7b894', 4)
    ctx.restore()
    for (let i = 0; i < 5; i++) { const a = t * 3 + i * 1.26; estrela(638 + Math.cos(a) * 70, cy + Math.sin(a) * 30, 8, a) }
  }
  // Cantanhede, 1360: o juramento em pergaminho, e o selo
  const ab = prog(t, T.rolo, T.rolo + 0.7)
  if (ab > 0) {
    escurecer(0.25 * ab)
    pergaminho(640, 380, 560, 330, ab, () => {
      ctx.fillStyle = K; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.font = 'italic 38px Georgia'; ctx.fillText('Cantanhede, 1360', 640, 260)
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(22,18,14,.6)'
      for (let i = 0; i < 5; i++) { const y = 310 + i * 30, w = i === 4 ? 180 : 400, v = Math.min(1, Math.max(0, (t - T.rolo - 0.7 - i * 0.5) / 0.5)); ctx.beginPath(); for (let k = 0; k <= 40 * v; k++) { const x = 640 - w / 2 + (k / 40) * w; ctx.lineTo(x, y + Math.sin(k * 1.7 + i) * 3) } ctx.stroke() }
      coracao(760, 460, 14)
    })
    if (t > T.selo - 0.4) {
      const desce = t < T.selo ? suave(prog(t, T.selo - 0.4, T.selo)) : 1, sobe = suave(prog(t, T.selo + 0.25, T.selo + 0.6))
      if (t > T.selo) { ink(E(560, 470, 36, 36), '#6f6656', 5); ink(E(560, 470, 26, 26), null, 2); quinas(560, 470, 0.9) }
      const hy = lerp(300, 440, desce) - sobe * 200
      ink(() => ctx.rect(544, hy - 120, 32, 110), TORRADO, 4); ink(E(560, hy, 34, 12), '#6f6656', 4); luva(560, hy - 128, 0, 1.1)
    }
  }
  ctx.restore()
}

// ---------- 14. a vingança, em teatro de sombras ----------
function cenaVinganca(t) {
  const T = TL.ev
  ctx.fillStyle = '#d6c9a8'; ctx.fillRect(-20, -20, W + 40, H + 40)
  ctx.strokeStyle = 'rgba(22,18,14,.22)'; ctx.lineWidth = 2.5
  for (let y = 20, r = 0; y < 600; y += 54, r++) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); for (let x = (r % 2) * 65; x < W; x += 130) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 54); ctx.stroke() } }
  const g = ctx.createRadialGradient(640, 330, 100, 640, 330, 760); g.addColorStop(0, 'rgba(255,240,200,.25)'); g.addColorStop(1, 'rgba(30,20,8,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
  const tremo = 1 + Math.sin(t * 13) * 0.012 + Math.sin(t * 7.3) * 0.01
  const some = suave(prog(t, T.coracoes + 0.3, T.coracoes + 1.4))
  silhueta(() => {
    ctx.save(); ctx.translate(640, 600); ctx.scale(tremo, 1); ctx.translate(-640, -600)
    Pedro({ x: 930, fy: 600, s: 1.25, olhar: -1, rei: true, manto: 1, t, fecho: 0, bF: [-150, -200], bT: [70, -100] })
    if (some < 1) {
      ctx.save(); ctx.globalAlpha = 1 - some
      for (const [cx, tp] of [[440, 0], [600, 2]]) Conselheiro({ x: cx, fy: 600 + some * 30, s: 1.15, tipo: tp, olhar: 1, sombra: true, inclina: 0.22 + some * 0.4 })
      ctx.restore()
    }
    if (t > T.foge && t < T.foge + 1.6) { const u = prog(t, T.foge, T.foge + 1.3), fx = lerp(760, -200, u); Conselheiro({ x: fx, fy: 600, s: 1.2, tipo: 1, olhar: -1, sombra: true, pe: passada(fx / 18, 1.6).pe, inclina: -0.12 }) }
    ctx.restore()
  }, 'rgba(16,12,8,.78)')
  // os dois corações: um sai pelo peito, o outro pelas costas
  if (t > T.coracoes) for (const [cx, dx, atraso, alto] of [[492, 1, 0, 260], [548, -1, 0.35, 200]]) {
    const d = t - T.coracoes - atraso, k = Math.min(1, Math.max(0, d) * 4) * (1 - clamp((d - 1.8) / 0.5))
    if (d > 0 && k > 0) silhueta(() => coracao(cx + dx * saiDe(Math.min(1, d)) * 40, 430 - saiDe(Math.min(1, d / 1.4)) * alto, 22 * k), 'rgba(16,12,8,.82)')
  }
  tocha(110, 300, t, 1.2, 1); tocha(1170, 300, t, 1.2, 2)
  ink(() => ctx.rect(-20, 600, W + 40, 200), '#8b7d66', 5)
}

// ---------- 15. Alcobaça ----------
function tumulo(x, base, t, { olha = 1, rei = false } = {}) {
  ctx.save(); ctx.translate(x, base); ctx.scale(olha, 1)
  // quem o segura: leões (Pedro) ou figuras agachadas (Inês)
  for (const lx of [-150, -50, 50, 150]) { ink(E(lx, -26, 30, 26), MEIO, 4); if (rei) { ink(E(lx + 18, -38, 16, 14), MEIO, 3); dot(lx + 22, -40, 2.5, K) } else { ink(E(lx + 14, -46, 14, 14), PELE, 3); dot(lx + 18, -48, 2.5, K) } }
  ink(() => ctx.rect(-200, -170, 400, 118), CLARO, 5)
  for (let i = 0; i < 7; i++) { const ax = -180 + i * 56; ink(() => { ctx.moveTo(ax, -64); ctx.lineTo(ax, -130); ctx.quadraticCurveTo(ax + 22, -160, ax + 44, -130); ctx.lineTo(ax + 44, -64) }, null, 3); ink(E(ax + 22, -110, 8, 12), MEIO, 2) }
  ink(() => ctx.rect(-214, -186, 428, 20), CLARO, 5)
  // a figura deitada, de mãos postas, com anjos à cabeceira
  ink(() => { ctx.moveTo(-170, -190); ctx.quadraticCurveTo(-60, -236, 140, -212); ctx.quadraticCurveTo(176, -204, 170, -190); ctx.closePath() }, BRANCO, 4)
  ink(E(-168, -214, 28, 24), BRANCO, 4)
  ink(E(-150, -222, 34, 28), '#efe6cf', 4)
  if (rei) ink(() => ctx.moveTo(-176, -240), null, 0)
  ink(() => poly([[-170, -248], [-176, -270], [-160, -256], [-150, -276], [-140, -256], [-126, -268], [-130, -248]]), CLARO, 3)
  ink(() => { ctx.moveTo(-40, -226); ctx.lineTo(-30, -246); ctx.lineTo(-20, -226) }, BRANCO, 3)
  for (const [ax, ay, fl] of [[-196, -258, 1], [-110, -270, -1]]) {
    ink(() => { ctx.moveTo(ax, ay); ctx.quadraticCurveTo(ax - fl * 30, ay - 30 + Math.sin(t * 2 + ax) * 3, ax - fl * 6, ay - 6) }, BRANCO, 3)
    ink(E(ax, ay, 12, 14), BRANCO, 3); ink(E(ax, ay - 20, 9, 9), '#efe6cf', 3)
  }
  ctx.restore()
}
function cenaAlcobaca(t) {
  const T = TL.ev
  if (t < T.igreja) {
    // o cortejo de tochas, de noite, de Coimbra a Alcobaça
    ctx.fillStyle = '#a3977c'; ctx.fillRect(-20, -20, W + 40, H + 40)
    for (let i = 0; i < 20; i++) dot(hash(i + 11) * W, hash(i + 31) * 320, 1.5 + hash(i) * 1.5, '#efe6cf')
    dot(1060, 120, 38, '#efe6cf')
    ink(() => { ctx.moveTo(-20, 420); ctx.quadraticCurveTo(300, 330, 700, 400); ctx.quadraticCurveTo(1000, 450, W + 20, 380); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#8f846c', 5)
    ink(() => { ctx.moveTo(-20, 520); ctx.quadraticCurveTo(640, 470, W + 20, 525); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#7f7560', 5)
    const avanco = (t - 144) * 38
    for (let i = 0; i < 12; i++) {
      const x = -300 + i * 110 + avanco, y = 520 - Math.sin(x / 400) * 8, p = passada(x / 16 + i, 0.8)
      if (x < -100 || x > W + 100) continue
      const carrega = i >= 5 && i <= 6
      silhueta(() => Nobre({ x, fy: y, s: 0.62, tipo: i, olhar: -1, pe: p.pe }), 'rgba(30,24,16,.9)')
      if (!carrega && i % 2 === 0) { brilho(x - 10, y - 150, 90, 0.35); chama(x - 10, y - 140, t, 0.9, i) }
    }
    // o caixão coberto, levado aos ombros
    const cx = -300 + 5.5 * 110 + avanco, cy = 520 - Math.sin(cx / 400) * 8 - 142
    if (cx > -200 && cx < W + 200) { ink(() => ctx.roundRect(cx - 90, cy - 28, 180, 34, 8), BRANCO, 5); ink(() => { ctx.moveTo(cx, cy - 26); ctx.lineTo(cx, cy + 2); ctx.moveTo(cx - 14, cy - 14); ctx.lineTo(cx + 14, cy - 14) }, null, 4) }
    escurecer(0.2)
    if (t < 144.6) escurecer(1 - prog(t, 144, 144.6))
  } else {
    // a igreja, e os dois túmulos frente a frente
    const z = 1 + 0.07 * suave(prog(t, T.igreja, 162))
    ctx.save(); ctx.translate(640, 420); ctx.scale(z, z); ctx.translate(-640, -420)
    ctx.fillStyle = '#cfc3a6'; ctx.fillRect(-40, -40, W + 80, H + 80)
    for (const cx of [60, 420, 860, 1220]) { ink(() => ctx.rect(cx - 30, 0, 60, 600), CLARO, 5); ink(() => ctx.rect(cx - 40, 560, 80, 40), CLARO, 5) }
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(22,18,14,.5)'
    for (const [a, b] of [[60, 420], [420, 860], [860, 1220]]) { ctx.beginPath(); ctx.moveTo(a + 30, 200); ctx.quadraticCurveTo((a + b) / 2, -60, b - 30, 200); ctx.stroke() }
    janelaGotica(640, 70, 120, 150, t, 1); ink(E(640, 60, 44, 44), BRANCO, 5); for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU; ink(() => { ctx.moveTo(640, 60); ctx.lineTo(640 + Math.cos(a) * 44, 60 + Math.sin(a) * 44) }, null, 2) }
    raioLuz(640, 180, 90, 640, 640, 420, 0.14)
    ink(() => ctx.rect(-40, 600, W + 80, 200), '#b3a78c', 5)
    tumulo(330, 640, t, { olha: 1 })
    tumulo(950, 640, t, { olha: -1, rei: true })
    for (const vx of [570, 710]) { ink(() => ctx.rect(vx - 4, 470, 8, 170), TORRADO, 3); vela(vx, 470, t, { s: 0.7, seed: vx }) }
    ctx.restore()
    fita(640, 64, 'Alcobaça', '36px Chango')
    if (t < T.igreja + 0.5) escurecer(1 - prog(t, T.igreja, T.igreja + 0.5))
  }
}

// ---------- 16. as lendas ----------
function cenaLendas(t) {
  const T = TL.ev
  if (t < T.fonteLagrimas) {
    salaTrono(t); trono(700, 600)
    const pousa = suave(prog(t, T.coroaInes, T.coroaInesPousa))
    Pedro({ x: 960, fy: 640, s: 0.95, olhar: -1, rei: true, manto: 1, t, fecho: piscar(t, 3), sobrolho: -0.6, boca: -1, bF: [-80, -110] })
    Ines({ x: 700, fy: 560, s: 1, dir: -1, olhar: 1, fecho: 1, boca: 0, bF: [104, -170], bT: [-40, -140], coroa: lerp(260, 0, pousa) })
    ;[560, 450, 340, 230].forEach((nx, i) => {
      const tb = T.beijos[i], joelho = suave(prog(t, tb - 0.35, tb)), beija = i === 0 ? Math.sin(Math.PI * prog(t, tb, tb + 0.6)) : Math.sin(Math.PI * prog(t, tb, tb + 0.6)) * 0.6
      Nobre({ x: nx, fy: 650, s: 0.9, tipo: i, olhar: 1, joelho, beija, fecho: piscar(t, 70 + i) })
    })
  } else {
    // a Fonte das Lágrimas: as lágrimas caem, e a água nasce da pedra
    ctx.fillStyle = '#b8ad92'; ctx.fillRect(-20, -20, W + 40, H + 40)
    for (let i = 0; i < 16; i++) dot(hash(i + 5) * W, hash(i + 25) * 260, 1.5 + hash(i) * 1.5, '#efe6cf')
    ink(() => { ctx.moveTo(-20, 520); ctx.quadraticCurveTo(640, 480, W + 20, 520); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath() }, '#9f937a', 5)
    arvoreNua(160, 530, t, 0.9); arvoreNua(1130, 530, t, 1)
    // o muro de pedra, a bica e o tanque
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
      const w = 58 + hash(r * 7 + c) * 30, x = 440 + c * 70 + (r % 2) * 30 + (hash(r + c * 3) - 0.5) * 10, y = 300 + r * 46
      if (x + w / 2 > 860) continue
      ink(() => ctx.roundRect(x - w / 2, y, w, 42, 14), hash(r * 3 + c) > 0.5 ? MEIO : CLARO, 4)
    }
    ink(() => { ctx.moveTo(600, 530); ctx.lineTo(600, 470); ctx.quadraticCurveTo(640, 420, 680, 470); ctx.lineTo(680, 530); ctx.closePath() }, ESCURO, 5)
    ink(() => ctx.rect(612, 468, 56, 10), TORRADO, 3)
    const nasce = suave(prog(t, T.nasce, T.nasce + 1.2))
    ink(() => ctx.rect(420, 540, 440, 80), CLARO, 5)
    ink(() => ctx.rect(440, 552, 400, 20), nasce > 0 ? '#e8dfc9' : ESCURO, 3)
    if (nasce > 0) {
      ctx.lineWidth = 14 * nasce; ctx.strokeStyle = K; ctx.beginPath(); ctx.moveTo(668, 474); ctx.quadraticCurveTo(700, 490, 702, 560); ctx.stroke()
      ctx.lineWidth = 7 * nasce; ctx.strokeStyle = BRANCO; ctx.stroke()
      for (let k = 0; k < 3; k++) { const r = ((t * 0.8 + k / 3) % 1) * 150 * nasce; ctx.strokeStyle = `rgba(22,18,14,${0.5 * (1 - r / 150)})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(702, 562, r, r * 0.06, 0, 0, TAU); ctx.stroke() }
      for (let k = 0; k < 4; k++) { const d = (t * 2 + k / 4) % 1; dot(702 + (hash(k) - 0.5) * 40 * d, 556 - Math.sin(d * Math.PI) * 20, 3, BRANCO) }
    }
    T.lagrimas.forEach((tl, i) => {
      const d = t - tl; if (d < 0 || d > 1.2) return
      const x = 580 + i * 22, y = lerp(-40, 296, Math.min(1, d / 1.0))
      if (d < 1.0) ink(() => { ctx.moveTo(x, y - 34); ctx.quadraticCurveTo(x + 20, y + 6, x, y + 14); ctx.quadraticCurveTo(x - 20, y + 6, x, y - 34) }, BRANCO, 3)
      else { const k = (d - 1) / 0.2; ctx.strokeStyle = `rgba(22,18,14,${1 - k})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, 300, 12 + k * 30, 3 + k * 8, 0, 0, TAU); ctx.stroke() }
    })
    escurecer(0.12)
    if (t > T.nasce + 1.2) fita(640, 64, 'Fonte das Lágrimas', '32px Chango')
    if (t < T.fonteLagrimas + 0.5) escurecer(1 - prog(t, T.fonteLagrimas, T.fonteLagrimas + 0.5))
  }
  ctx.save(); ctx.translate(150, 90); ctx.rotate(-0.06); fita(0, 0, 'a lenda', 'italic 28px Georgia'); ctx.restore()
}

// ---------- 17. fim ----------
function cenaFim(t) {
  const T = TL.ev, u = t - 178
  raios(W / 2, H / 2 + 20, t)
  const k = mola(prog(u, 0.05, 1.05), 1.6, 5)
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(k, k)
  ink(E(8, 10, 300, 180), K, 0); ink(E(0, 0, 300, 180), BRANCO, 7); ink(E(0, 0, 280, 162), null, 3)
  ctx.font = '130px Chango'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillStyle = MEIO; ctx.fillText('Fim', 7, 7); ctx.lineWidth = 7; ctx.strokeStyle = K; ctx.strokeText('Fim', 0, 0); ctx.fillStyle = ESCURO; ctx.fillText('Fim', 0, 0)
  ctx.restore()
  for (const s of [-1, 1]) coracao(W / 2 + s * 390, H / 2 + Math.sin(t * 2 + s) * 8, 30)
  if (t > T.fimIris) iris(W / 2, H / 2, lerp(900, 0, suave(prog(t, T.fimIris, T.fimIris + 0.8))))
}
