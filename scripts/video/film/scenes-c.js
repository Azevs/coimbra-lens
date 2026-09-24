// Cenas 4, 5 e 6: a universidade, os estudantes, o fim.

Object.assign(PAL, {
  golden: {
    sky0: '#3B4F86', sky1: '#E59A6A', sky2: '#F7D39A', far2: '#B88A8A', far1: '#9A7482',
    hill0: '#B79A6A', hill1: '#7E6A4E', water0: '#D69A78', water1: '#3A3A5E', glint: '#FFE3B8', cloud: '#F6B98E',
    cypress: '#3C4A3A', olive: '#6B7148', tint: '#FFE6C8', rim: '#FFE0B0',
  },
  dusk: {
    sky0: '#141C3E', sky1: '#4B3D6E', sky2: '#D9826A', far2: '#4A3F66', far1: '#3A3356',
    hill0: '#6E6272', hill1: '#3E3848', water0: '#5A4870', water1: '#0E1024', glint: '#FFC690', cloud: '#7A5A7E',
    cypress: '#232A2E', olive: '#343A38', tint: '#9C8FB0', rim: '#E7A98A',
  },
  sunrise: {
    sky0: '#2D3E78', sky1: '#C9849A', sky2: '#FFD4A0', far2: '#9E8AA8', far1: '#86789A',
    hill0: '#A89484', hill1: '#6E6068', water0: '#E0A89A', water1: '#2E3056', glint: '#FFE8C8', cloud: '#F8C6B4',
    cypress: '#34403E', olive: '#58604E', tint: '#F4DCD6', rim: '#FFE6C4',
  },
})

// ---------- 4 · a universidade ----------
function sUni(t) {
  const [tx, ty] = SITES.tower
  const cam = camPath(t, [
    [92.4, { x: 960, y: 548, z: 1.0 }],
    [102.2, { x: 960, y: 548, z: 1.0 }],
    [106.8, { x: 1080, y: 470, z: 1.35 }],
    [109.6, { x: tx, y: ty - 170, z: 3.1 }],
    [115.2, { x: tx + 10, y: ty - 160, z: 3.2 }],
    [116.6, { x: SITES.joanina[0], y: SITES.joanina[1] - 40, z: 5.5 }],
    [127.4, { x: 960, y: 560, z: 1.12 }],
    [137.5, { x: 960, y: 540, z: 1.0 }],
  ])
  const dusk = smooth(prog(126.8, 131.5, t))
  const pal = mixPal(PAL.golden, PAL.dusk, dusk)
  const bell = TL.events.sino
  const swing = bell.reduce((s, b) => s + (t > b - 0.3 ? Math.sin((t - b + 0.3) * 5) * Math.exp(-(t - b) * 1.2) * 0.5 : 0), 0)
  const S = {
    pal, cam, clouds: 0.9, trees: 1, light: 1, lights: dusk,
    houses: [0, 1, E.out(prog(102.4, 106.6, t))],
    sun: { x: 1650, y: lerp(560, 700, dusk), r: 42, a: 1 - dusk * 0.8, color: '#FFB070' },
    back: [
      { name: 'paco', line: E.sine(prog(101.6, 104.4, t)), fill: E.out(prog(103.6, 105.2, t)), color: '#5A2E10' },
      { name: 'joanina', line: E.sine(prog(102.4, 105.0, t)), fill: E.out(prog(104.4, 105.8, t)), color: '#5A2E10' },
      { name: 'tower', line: E.sine(prog(103.2, 106.6, t)), fill: E.out(prog(106.0, 107.4, t)), color: '#5A2E10' },
    ],
    front: [{ name: 'se', line: 1, fill: 1 }, { name: 'santaCruz', line: 1, fill: 1 }],
    world: () => {
      // o sino a balançar dentro do arco
      const bx = tx, by = ty - 150 - 22
      X.save(); X.globalAlpha = E.out(prog(106.0, 107.4, t)); X.translate(bx, by - 12); X.rotate(swing)
      X.fillStyle = tcss('#8C6A2E'); X.beginPath()
      X.moveTo(-7, 0); X.quadraticCurveTo(-8, 14, -11, 20); X.lineTo(11, 20); X.quadraticCurveTo(8, 14, 7, 0); X.closePath(); X.fill()
      X.restore()
      // ondas de som
      for (const b of bell) {
        const p = (t - b) / 2.6
        if (p <= 0 || p >= 1) continue
        for (let k = 0; k < 3; k++) {
          const q = p - k * 0.12
          if (q <= 0) continue
          X.strokeStyle = css('#FFE2A6', (1 - q) * 0.7); X.lineWidth = 2 / cam.z * 2
          X.beginPath(); X.arc(bx, by, 20 + q * 220, 0, TAU); X.stroke()
        }
      }
      // pombos a levantar voo
      for (const b of bell) {
        const r = rng(Math.floor(b * 10))
        for (let i = 0; i < 9; i++) {
          const p = (t - b - r() * 0.3) / 3
          if (p <= 0 || p >= 1) continue
          const ang = -PI / 2 + (r() - 0.5) * 2.4
          const d = E.out(p) * (160 + r() * 140)
          const x = bx + Math.cos(ang) * d, y = by - 30 + Math.sin(ang) * d * 0.7 - p * 40
          bird(x, y, 6, t * 14 + i, css('#2A2230', 1 - p))
        }
      }
    },
  }
  stage(t, S)
  const ink = '#2A1C22'
  chapter(t, 93.8, 'IV', 'THE UNIVERSITY', { color: ink, dur: 12.5 })
  wander(t)
  // a Cabra
  const [gx, gy] = w2s(cam, tx + 34, ty - 175)
  const ga = win(t, 109.8, 115.6, 0.6)
  if (ga > 0) {
    X.save(); X.globalAlpha = ga
    X.strokeStyle = css(ink); X.lineWidth = 1.5
    const gp = E.out(prog(109.8, 110.6, t))
    X.beginPath(); X.moveTo(gx, gy); X.lineTo(gx + 190 * gp, gy - 40 * gp); X.stroke()
    goat(gx + 250, gy - 70, 1.5, ink, E.sine(prog(110.2, 111.6, t)))
    text('“a Cabra”', gx + 330, gy - 58, { italic: true, weight: 400, size: 44, color: ink, align: 'left', alpha: smooth(prog(110.4, 111.2, t)) })
    text('THE GOAT', gx + 334, gy - 22, { family: 'mono', size: 14, color: ink, align: 'left', spacing: 5, alpha: smooth(prog(110.8, 111.6, t)) })
    X.restore()
  }
  joanina(t, 116.2, 127.6)
  // Património Mundial
  heritage(t, cam)
}

// O vaivém da universidade entre Lisboa e Coimbra, desenhado no céu.
function wander(t) {
  const a = win(t, 94.8, 103.4, 0.7)
  if (a <= 0) return
  const L = [170, 470], C = [SITES.paco[0] + 20, SITES.paco[1] - 120]
  const hops = [[95.4, 'L', '1290'], [96.9, 'C', '1308'], [97.8, 'L', '1338'], [98.7, 'C', '1354'], [99.6, 'L', '1377'], [101.2, 'C', '1537']]
  X.save()
  X.globalAlpha = a
  const ink = '#2A1C22'
  // pontos das duas cidades
  for (const [p, name, al] of [[L, 'LISBOA', 'left'], [C, 'COIMBRA', 'center']]) {
    X.fillStyle = css(ink); X.beginPath(); X.arc(p[0], p[1], 6, 0, TAU); X.fill()
    text(name, p[0] + (al === 'left' ? -8 : 0), p[1] + 34, { family: 'mono', size: 15, color: ink, align: al, spacing: 5, weight: 500 })
  }
  let pos = L
  for (let i = 1; i < hops.length; i++) {
    const [t0] = hops[i - 1], [t1, to, yr] = hops[i]
    const from = hops[i - 1][1] === 'L' ? L : C, dest = to === 'L' ? L : C
    const d = hops[i][2] === '1537' ? 0.9 : 0.65
    const p = E.io(prog(t1 - d, t1, t))
    if (p <= 0) continue
    const h = 170 + i * 26
    const arc = []
    for (let k = 0; k <= 40; k++) { const u = k / 40; arc.push([lerp(from[0], dest[0], u), lerp(from[1], dest[1], u) - Math.sin(u * PI) * h]) }
    X.globalAlpha = a * (yr === '1537' ? 1 : 0.55)
    drawLines([arc], p, { color: yr === '1537' ? ACCENT : ink, width: yr === '1537' ? 3 : 1.6, glow: 0.2, tip: false })
    if (p < 1) pos = arc[Math.round(p * 40)]
    else pos = dest
  }
  X.globalAlpha = a
  // os anos, empilhados em cada cidade
  let nl = 0, nc = 0
  hops.forEach(([th, w, yr]) => {
    const pa = E.out(prog(th, th + 0.4, t))
    if (pa <= 0) return
    const big = yr === '1537'
    const p = w === 'L' ? L : C
    const k = w === 'L' ? nl++ : nc++
    const y = big ? p[1] - 190 : p[1] - 40 - k * 44
    text(yr, p[0] + (w === 'L' ? 0 : 0), y + (1 - pa) * 14, { italic: true, weight: big ? 300 : 400, size: big ? 150 : 38, color: big ? ACCENT : ink, alpha: pa * (big ? 1 : 0.8), align: w === 'L' ? 'left' : 'center' })
  })
  // o livro que salta
  spark(pos[0], pos[1], 7, '#FFE2A6', 1)
  X.restore()
}

function bird(x, y, s, ph, c) {
  const f = Math.sin(ph) * s * 0.8
  X.strokeStyle = c; X.lineWidth = Math.max(1, s * 0.3)
  X.beginPath(); X.moveTo(x - s, y - f); X.quadraticCurveTo(x - s * 0.4, y - f * 0.2 - s * 0.2, x, y); X.quadraticCurveTo(x + s * 0.4, y - f * 0.2 - s * 0.2, x + s, y - f); X.stroke()
}

// Cabeça de cabra em traço: chifres, orelha, barbicha.
function goat(x, y, s, c, p) {
  const P = [
    [[0, 0], [10, -6], [22, -4], [34, 6], [38, 18], [30, 24], [18, 20], [10, 26], [4, 40], [-2, 26], [-6, 14], [0, 0]],
    [[6, -2], [2, -18], [-8, -30], [-20, -34]],
    [[14, -4], [12, -20], [4, -32], [-6, -38]],
    [[0, 4], [-14, 8], [-6, 14]],
    [[4, 40], [2, 50], [6, 46]],
  ].map((q) => q.map(([a, b]) => [x + a * s, y + b * s]))
  drawLines(P, p, { color: c, width: 2, glow: 0, tip: false })
  if (p > 0.6) { X.fillStyle = c; X.beginPath(); X.arc(x + 20 * s, y + 6 * s, 2 * s, 0, TAU); X.fill() }
}

// A Biblioteca Joanina: três salas em fuga, ouro, e depois a noite dos morcegos.
function joanina(t, t0, t1) {
  const open = E.io(prog(t0, t0 + 1.0, t))
  if (open <= 0) return
  const out = smooth(prog(t1 - 1.0, t1, t))
  X.save()
  X.globalAlpha = 1 - out
  const r = lerp(30, 1500, open)
  X.beginPath(); X.moveTo(960 - r, H + 20); X.lineTo(960 - r, 600); X.arc(960, 600, r, PI, TAU); X.lineTo(960 + r, H + 20); X.closePath(); X.clip()
  const zoom = 1 + (t - t0) * 0.012
  X.translate(960, 560); X.scale(zoom, zoom); X.translate(-960, -560)
  const VP = [960, 560]
  const night = smooth(prog(121.4, 123.2, t))
  // salas: [x0, y0, x1, y1, cor da laca]
  const rooms = [[-40, -40, 1960, 1120, '#1F4A3A'], [520, 150, 1400, 960, '#6E1C1C'], [730, 300, 1190, 830, '#1F4A3A'], [838, 382, 1082, 742, '#4A2A16']]
  for (let k = 0; k < rooms.length - 1; k++) {
    const [ax0, ay0, ax1, ay1, col] = rooms[k], [bx0, by0, bx1, by1] = rooms[k + 1]
    // tecto
    X.fillStyle = css(mixc('#3A2A1E', col, 0.3)); X.beginPath(); X.moveTo(ax0, ay0); X.lineTo(ax1, ay0); X.lineTo(bx1, by0); X.lineTo(bx0, by0); X.fill()
    // chão em xadrez
    X.fillStyle = '#CDBB98'; X.beginPath(); X.moveTo(ax0, ay1); X.lineTo(ax1, ay1); X.lineTo(bx1, by1); X.lineTo(bx0, by1); X.fill()
    X.strokeStyle = 'rgba(70,50,30,0.35)'; X.lineWidth = 1.5
    for (let i = 0; i <= 10; i++) { const u = i / 10; X.beginPath(); X.moveTo(lerp(ax0, ax1, u), ay1); X.lineTo(lerp(bx0, bx1, u), by1); X.stroke() }
    for (let j = 1; j < 4; j++) { const v = j / 4; X.beginPath(); X.moveTo(lerp(ax0, bx0, v), lerp(ay1, by1, v)); X.lineTo(lerp(ax1, bx1, v), lerp(ay1, by1, v)); X.stroke() }
    // paredes com estantes
    for (const side of [0, 1]) {
      const ox = side ? ax1 : ax0, ix = side ? bx1 : bx0
      X.fillStyle = css(col)
      X.beginPath(); X.moveTo(ox, ay0); X.lineTo(ix, by0); X.lineTo(ix, by1); X.lineTo(ox, ay1); X.fill()
      const rows = 9
      const rr = rng(k * 7 + side)
      for (let j = 0; j < rows; j++) {
        const v0 = 0.08 + (j / rows) * 0.8, v1 = v0 + 0.8 / rows - 0.012
        const cols = 26
        for (let i = 0; i < cols; i++) {
          const u0 = i / cols, u1 = (i + 0.86) / cols
          const P = (u, v) => [lerp(ox, ix, u), lerp(lerp(ay0, ay1, v), lerp(by0, by1, v), u)]
          const c = ['#7A2E1E', '#5A3A22', '#8C5A2A', '#6B2A2A', '#A0703A', '#3E2E22', '#7A5030'][Math.floor(rr() * 7)]
          X.fillStyle = c
          const a = P(u0, v0), b = P(u1, v0), cc = P(u1, v1), d = P(u0, v1)
          X.beginPath(); X.moveTo(...a); X.lineTo(...b); X.lineTo(...cc); X.lineTo(...d); X.fill()
        }
        // prateleira dourada
        const s0 = [lerp(ox, ix, 0), lerp(ay0, ay1, v1 + 0.006)], s1 = [ix, lerp(by0, by1, v1 + 0.006)]
        X.strokeStyle = '#D9A93E'; X.lineWidth = 3 * (1 - k * 0.25)
        X.beginPath(); X.moveTo(...s0); X.lineTo(...s1); X.stroke()
      }
      // pilastras douradas
      for (let i = 0; i <= 6; i++) {
        const u = i / 6
        const x = lerp(ox, ix, u)
        X.strokeStyle = '#E3B04B'; X.lineWidth = 7 * (1 - u * 0.7) * (1 - k * 0.3)
        X.beginPath(); X.moveTo(x, lerp(ay0, by0, u) + 10); X.lineTo(x, lerp(ay1, by1, u) - 10); X.stroke()
      }
      // varanda a meia altura
      X.strokeStyle = '#F0C860'; X.lineWidth = 5 * (1 - k * 0.3)
      X.beginPath(); X.moveTo(ox, lerp(ay0, ay1, 0.44)); X.lineTo(ix, lerp(by0, by1, 0.44)); X.stroke()
    }
    // arco dourado na passagem para a sala seguinte
    const w = bx1 - bx0
    X.fillStyle = css(col)
    X.beginPath(); X.moveTo(bx0 - 30, by0 - 30); X.lineTo(bx1 + 30, by0 - 30); X.lineTo(bx1 + 30, by0 + w * 0.22); X.quadraticCurveTo(bx1, by0 - 10, (bx0 + bx1) / 2, by0 - 14); X.quadraticCurveTo(bx0, by0 - 10, bx0 - 30, by0 + w * 0.22); X.fill()
    X.strokeStyle = '#E3B04B'; X.lineWidth = 6 * (1 - k * 0.3)
    X.strokeRect(bx0 - 4, by0 - 4, bx1 - bx0 + 8, by1 - by0 + 8)
    // brasão no topo do arco
    glow((bx0 + bx1) / 2, by0 - 24, 50 * (1 - k * 0.3), '#FFD27A', 0.6)
    X.fillStyle = '#E3B04B'; X.beginPath(); X.arc((bx0 + bx1) / 2, by0 - 24, 14 * (1 - k * 0.3), 0, TAU); X.fill()
  }
  // parede do fundo: o retrato de D. João V
  const [ex0, ey0, ex1, ey1] = rooms[3]
  X.fillStyle = '#4A2A16'; X.fillRect(ex0, ey0, ex1 - ex0, ey1 - ey0)
  X.fillStyle = '#E3B04B'; X.fillRect(918, 430, 84, 120)
  X.fillStyle = '#5A2A20'; X.fillRect(926, 438, 68, 104)
  X.fillStyle = '#C08A5A'; X.beginPath(); X.arc(960, 468, 11, 0, TAU); X.fill()
  X.fillStyle = '#8C1E1E'; X.beginPath(); X.moveTo(938, 540); X.lineTo(946, 484); X.lineTo(974, 484); X.lineTo(984, 540); X.fill()
  // luz de ouro e pó no ar
  glow(960, 520, 900, '#FFC870', 0.28 * (1 - night))
  const rp = rng(11)
  for (let i = 0; i < 90; i++) {
    const x = rp() * W, y = rp() * H
    const fx = x + Math.sin(t * 0.3 + i) * 30, fy = y + Math.sin(t * 0.21 + i * 1.7) * 20 - (t - t0) * 6
    X.fillStyle = css('#FFE6B0', (0.25 + 0.35 * rp()) * (1 - night))
    X.beginPath(); X.arc(fx, ((fy % H) + H) % H, 1 + rp() * 1.6, 0, TAU); X.fill()
  }
  // a noite
  if (night > 0) {
    X.fillStyle = `rgba(8,14,38,${0.72 * night})`; X.fillRect(-100, -100, W + 200, H + 200)
    glow(960, 480, 500, '#6C84C8', 0.18 * night)
    // insectos e morcegos
    const ri = rng(55)
    const bats = []
    for (let b = 0; b < 9; b++) {
      const ph = ri() * TAU, sp = 0.35 + ri() * 0.35, ax = 520 + ri() * 380, ay = 160 + ri() * 180
      const u = (t - 121.6) * sp + ph
      bats.push([960 + Math.sin(u) * ax, 520 + Math.sin(u * 2.1 + ph) * ay, Math.cos(u) > 0 ? 1 : -1, 16 + ri() * 14, u * 9])
    }
    for (let i = 0; i < 60; i++) {
      const x = 200 + ri() * 1520, y = 150 + ri() * 760
      const eaten = bats.some(([bx, by]) => Math.hypot(bx - x, by - y) < 40) || (t > 121.6 + 2 + ri() * 6 && ri() < 0.6)
      if (eaten) continue
      X.fillStyle = css('#E8F0A0', 0.7 * night)
      X.beginPath(); X.arc(x + Math.sin(t * 7 + i) * 4, y + Math.cos(t * 6 + i) * 4, 1.6, 0, TAU); X.fill()
    }
    for (const [x, y, dir, s, ph] of bats) bat(x, y, s, ph, dir, css('#05060C', night))
  }
  X.restore()
  const la = win(t, t0 + 1.2, t1 - 0.6, 0.6)
  if (la > 0) {
    text('BIBLIOTECA JOANINA', 96, 104, { family: 'mono', size: 15, color: '#FFE6B0', align: 'left', spacing: 5, weight: 500, alpha: la })
    X.strokeStyle = css('#FFE6B0', la * 0.8); X.lineWidth = 1.5; X.beginPath(); X.moveTo(96, 122); X.lineTo(376, 122); X.stroke()
  }
}

function bat(x, y, s, ph, dir, c) {
  const f = Math.sin(ph)
  X.save()
  X.translate(x, y); X.scale(dir, 1)
  X.fillStyle = c
  X.beginPath()
  X.ellipse(0, 0, s * 0.28, s * 0.18, 0, 0, TAU)
  X.fill()
  for (const sd of [-1, 1]) {
    X.beginPath()
    X.moveTo(0, 0)
    X.quadraticCurveTo(sd * s * 0.6, -s * 0.5 * f - s * 0.2, sd * s * 1.2, -s * 0.4 * f)
    X.lineTo(sd * s * 0.9, -s * 0.1 * f + s * 0.12)
    X.lineTo(sd * s * 0.6, -s * 0.05 * f + s * 0.05)
    X.lineTo(sd * s * 0.35, s * 0.16)
    X.closePath(); X.fill()
  }
  X.beginPath(); X.moveTo(s * 0.22, -s * 0.08); X.lineTo(s * 0.3, -s * 0.28); X.lineTo(s * 0.36, -s * 0.06); X.fill()
  X.restore()
}

// 2013: a Alta e a Sofia contornadas a tracejado.
function heritage(t, cam) {
  const a = win(t, 128.2, 137.2, 0.8)
  if (a <= 0) return
  const p = E.sine(prog(128.4, 131.4, t))
  X.save()
  camera(cam, () => {
    X.globalAlpha = a
    const alta = []
    for (let x = 560; x <= 1560; x += 20) alta.push([x, hillY(x) - 60 - 40 * Math.exp(-Math.pow((x - 1150) / 300, 2))])
    for (let x = 1560; x >= 560; x -= 20) alta.push([x, Math.min(RIVER_Y - 30, hillY(x) + 210 + 60 * Math.exp(-Math.pow((x - 900) / 300, 2)))])
    alta.push(alta[0])
    const sofia = [[250, 860], [255, 800], [480, 770], [520, 830], [480, 862], [250, 860]]
    X.setLineDash([10, 9])
    drawLines([alta, sofia], p, { color: '#FFE6B0', width: 2.6, glow: 0.35, tip: true })
    X.setLineDash([])
  })
  X.globalAlpha = a
  const [ax, ay] = w2s(cam, 1560, 470), [sx, sy] = w2s(cam, 360, 760)
  const la = smooth(prog(130.6, 131.6, t))
  text('ALTA', ax + 20, ay, { family: 'mono', size: 18, color: '#FFE6B0', align: 'left', spacing: 8, alpha: la, weight: 500 })
  text('SOFIA', sx, sy - 10, { family: 'mono', size: 18, color: '#FFE6B0', spacing: 8, alpha: la, weight: 500 })
  bigYear(t, 129.0, 137.2, '2013', 96, 300, { color: '#FFF1DC', size: 170 })
  const wa = win(t, 130.0, 137.2, 0.7)
  if (wa > 0) text('UNESCO WORLD HERITAGE', 102, 350, { family: 'mono', size: 18, color: '#FFF1DC', align: 'left', spacing: 6, alpha: wa, weight: 500 })
  X.restore()
}

// ---------- 5 · os estudantes ----------
function student(x, y, s, ph, fita, t, hat = true, rim = 0) {
  X.save()
  if (rim) { X.shadowColor = 'rgba(255,130,50,0.75)'; X.shadowBlur = 18; X.shadowOffsetX = rim * 5 }
  X.translate(x, y); X.scale(s, s)
  const sw = Math.sin(t * 1.6 + ph) * 0.04
  X.rotate(sw)
  X.fillStyle = '#07070B'
  // capa
  X.beginPath()
  X.moveTo(-22, -150); X.quadraticCurveTo(-60, -60, -70 - Math.sin(t * 2 + ph) * 8, 0)
  X.lineTo(70 + Math.sin(t * 2.3 + ph) * 8, 0); X.quadraticCurveTo(60, -60, 22, -150); X.closePath(); X.fill()
  // cabeça e cartola
  X.beginPath(); X.arc(0, -168, 17, 0, TAU); X.fill()
  if (hat) {
    X.fillRect(-24, -186, 48, 5)
    X.fillRect(-15, -222, 30, 38)
    X.fillStyle = css(fita); X.fillRect(-15, -194, 30, 6)
  }
  // bengala com fita
  X.strokeStyle = '#07070B'; X.lineWidth = 4
  X.beginPath(); X.moveTo(40, -110); X.lineTo(58, 0); X.stroke()
  X.strokeStyle = css(fita); X.lineWidth = 5; X.lineCap = 'round'
  X.beginPath(); X.moveTo(40, -112)
  for (let i = 1; i <= 10; i++) { const u = i / 10; X.lineTo(40 + u * 60, -112 + Math.sin(u * 5 - t * 6 + ph) * 10 * u + u * 20) }
  X.stroke()
  X.restore()
}

function flame(x, y, s, t, seed) {
  for (const [col, sc, a] of [['#B8321A', 1, 0.9], ['#F07A22', 0.72, 0.95], ['#FFD36B', 0.42, 1]]) {
    X.fillStyle = css(col, a)
    X.beginPath()
    X.moveTo(x - 60 * s * sc, y)
    for (let i = 0; i <= 12; i++) {
      const u = i / 12
      const px = x + lerp(-60, 60, u) * s * sc
      const h = (150 + 90 * noise(t * 3 + i * 0.7 + seed)) * Math.sin(u * PI) * s * sc
      X.lineTo(px + noise(t * 4 + i + seed) * 14 * s, y - h)
    }
    X.lineTo(x + 60 * s * sc, y)
    X.fill()
  }
}

function sEstudantes(t) {
  const T0 = TL.scenes[5].start
  const toNight = smooth(prog(147.2, 149.6, t))
  if (toNight < 1) {
    X.save()
    // céu de festa ao anoitecer
    const g = X.createLinearGradient(0, 0, 0, H)
    g.addColorStop(0, '#1B1540'); g.addColorStop(0.6, '#6A2E5A'); g.addColorStop(1, '#E0784A')
    X.fillStyle = g; X.fillRect(0, 0, W, H)
    // silhueta da Alta ao fundo, com a torre
    X.fillStyle = '#2A1834'
    X.beginPath(); X.moveTo(0, H)
    for (let x = 0; x <= W; x += 10) X.lineTo(x, 620 - 0.55 * (874 - hillY(x * 0.9 + 100)))
    X.lineTo(W, H); X.fill()
    const [tx] = SITES.tower
    const txs = tx * 1 / 0.9 - 100 / 0.9
    X.fillRect(txs - 14, 620 - 0.55 * (874 - hillY(tx)) - 150, 28, 160)
    X.fillRect(txs - 6, 620 - 0.55 * (874 - hillY(tx)) - 176, 12, 30)
    // fios de luzes
    for (let k = 0; k < 3; k++) {
      const y0 = 150 + k * 90
      for (let i = 0; i <= 30; i++) {
        const u = i / 30, x = u * W, y = y0 + Math.sin(u * PI) * 60
        glow(x, y, 16, ['#FFD36B', '#FF8A6B', '#8AD2FF'][(i + k) % 3], 0.8)
      }
    }
    // o braseiro
    const bx = 960, by = 800
    flame(bx, by - 40, 1.8, t, 1)
    flame(bx - 60, by - 40, 1.1, t + 3, 7)
    flame(bx + 70, by - 40, 1.2, t + 5, 13)
    X.fillStyle = '#0A0A10'
    X.beginPath(); X.moveTo(bx - 200, by - 50); X.lineTo(bx + 200, by - 50); X.lineTo(bx + 140, by + 40); X.lineTo(bx - 140, by + 40); X.fill()
    X.fillRect(bx - 20, by + 30, 40, 120)
    glow(bx, by - 120, 520, '#FF8A3A', 0.35)
    // fitas atiradas ao lume
    const r = rng(2025)
    for (let i = 0; i < 26; i++) {
      const tt = 139.4 + r() * 5.2, c = FITAS[i % FITAS.length]
      const p = (t - tt) / 1.4
      if (p <= 0 || p >= 1) continue
      const sx = r() < 0.5 ? -60 : W + 60, sy = 700 + r() * 200
      const x = lerp(sx, bx + (r() - 0.5) * 120, p), y = lerp(sy, by - 60, p) - Math.sin(p * PI) * 320
      X.strokeStyle = css(p > 0.8 ? '#FF9A40' : c, 1 - smooth(prog(0.85, 1, p)))
      X.lineWidth = 7; X.lineCap = 'round'
      X.beginPath(); X.moveTo(x, y)
      for (let k = 1; k < 8; k++) X.lineTo(x - k * 12 * Math.sign(bx - sx), y + Math.sin(k + t * 9) * 8 + k * 3)
      X.stroke()
    }
    // faúlhas
    const re = rng(88)
    for (let i = 0; i < 120; i++) {
      const life = 2.5 + re() * 2, off = re() * life
      const p = ((t + off) % life) / life
      const x = bx + (re() - 0.5) * 200 + Math.sin(p * 6 + i) * 40 * p
      const y = by - 120 - p * (500 + re() * 300)
      X.fillStyle = css(re() < 0.5 ? '#FFD36B' : '#FF7A30', (1 - p) * 0.9)
      X.fillRect(x, y, 2.5, 2.5)
    }
    // multidão: ao fundo uma mancha de cabeças e cartolas, à frente poucos e grandes
    const rc = rng(61)
    X.fillStyle = '#0A0710'
    X.fillRect(0, 900, W, 200)
    for (let i = 0; i < 70; i++) {
      const x = rc() * W, y = 880 + rc() * 30 + Math.sin(t * 2 + i) * 2
      if (Math.abs(x - bx) < 190) continue
      X.beginPath(); X.arc(x, y, 11, 0, TAU); X.fill()
      if (rc() < 0.5) { X.fillRect(x - 8, y - 30, 16, 20); X.fillRect(x - 13, y - 12, 26, 3) }
    }
    const mid = [150, 380, 610, 1310, 1540, 1770]
    mid.forEach((x, i) => student(x + (rc() - 0.5) * 40, 1030, 1.0, i * 1.7, FITAS[(i * 2) % FITAS.length], t, i % 3 !== 1, x < bx ? 1 : -1))
    for (const [x, s, k] of [[-40, 2.4, 0], [560, 2.1, 3], [1400, 2.2, 5], [1980, 2.5, 1]]) student(x, 1330, s, k, FITAS[k], t, true, x < bx ? 1.6 : -1.6)
    // as capas varrem o ecrã e trazem a cor
    const sweep = prog(144.6, 146.4, t)
    if (sweep > 0 && sweep < 1) {
      X.fillStyle = '#050508'
      X.beginPath()
      const cx = lerp(-900, W + 900, E.io(sweep))
      X.moveTo(cx - 900, -50)
      X.quadraticCurveTo(cx + 200, 300 + Math.sin(t * 3) * 60, cx - 200, H + 50)
      X.lineTo(cx - 1400, H + 50); X.lineTo(cx - 1400, -50)
      X.fill()
    }
    const conf = smooth(prog(145.4, 146.2, t))
    if (conf > 0) {
      const rf = rng(7)
      for (let i = 0; i < 220; i++) {
        const x0 = rf() * W, sp = 80 + rf() * 160
        const y = -40 + ((t - 145.4) * sp + rf() * 200)
        const x = x0 + Math.sin(t * 2 + i) * 30
        X.save(); X.translate(x, y); X.rotate(t * 3 + i)
        X.fillStyle = css(FITAS[i % FITAS.length], conf * 0.95)
        X.fillRect(-5, -2.5, 10 + (i % 3) * 4, 5)
        X.restore()
      }
    }
    chapter(t, 137.8, 'V', 'QUEIMA DAS FITAS', { color: '#FFE6D0', dur: 9 })
    const ma = win(t, 138.4, 144.4, 0.8)
    if (ma > 0) {
      X.save()
      const p = E.out5(prog(138.4, 140.0, t))
      X.beginPath(); X.rect(0, 0, 90 + 700 * p, H); X.clip()
      text('May', 96, 300, { italic: true, weight: 300, size: 160, color: '#FFE6D0', align: 'left', alpha: ma })
      X.restore()
    }
    X.restore()
  }
  if (toNight > 0) {
    X.save()
    X.globalAlpha = toNight
    serenata(t)
    X.restore()
  }
}

// A Sé Velha à noite, os cantores nas escadas, o público em silêncio.
function serenata(t) {
  const z = camPath(t, [[147.4, { x: 960, y: 500, z: 1.22 }], [157.0, { x: 960, y: 560, z: 1.0 }], [166.8, { x: 960, y: 580, z: 0.96 }]])
  const g = X.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, '#03040A'); g.addColorStop(1, '#141A34')
  X.fillStyle = g; X.fillRect(0, 0, W, H)
  for (const s of STARS) { X.fillStyle = css('#FFF6E0', 0.7 * (0.6 + 0.4 * Math.sin(t * s.sp + s.ph)) * (1 - s.y / 700)); X.fillRect(s.x, s.y * 0.6, s.s, s.s) }
  camera(z, () => {
    // fachada
    const stone = X.createLinearGradient(0, 260, 0, 780)
    stone.addColorStop(0, '#2B2A36'); stone.addColorStop(1, '#8C7456')
    X.fillStyle = stone
    X.fillRect(520, 330, 880, 450)
    for (let i = 0; i < 29; i++) X.fillRect(522 + i * 30.4, 306, 18, 26)
    X.fillRect(780, 250, 360, 530)
    for (let i = 0; i < 10; i++) X.fillRect(782 + i * 36, 226, 22, 26)
    // fiadas de pedra
    X.strokeStyle = 'rgba(0,0,0,0.18)'; X.lineWidth = 1
    for (let y = 340; y < 780; y += 22) { X.beginPath(); X.moveTo(520, y); X.lineTo(1400, y); X.stroke() }
    // contrafortes
    X.fillStyle = 'rgba(0,0,0,0.22)'
    for (const x of [600, 700, 1180, 1280]) X.fillRect(x, 360, 26, 420)
    // portal com arquivoltas
    for (let k = 4; k >= 0; k--) {
      X.fillStyle = k === 0 ? '#1A0E08' : css(mixc('#6E5A44', '#B8966A', k / 4))
      const w = 150 + k * 26, h = 250 + k * 18
      X.beginPath(); X.moveTo(960 - w / 2, 780); X.lineTo(960 - w / 2, 780 - h + w / 2); X.arc(960, 780 - h + w / 2, w / 2, PI, TAU); X.lineTo(960 + w / 2, 780); X.fill()
    }
    // luz de dentro do portal
    glow(960, 700, 220, '#FFB050', 0.5)
    // janelão
    for (let k = 3; k >= 0; k--) {
      X.fillStyle = k === 0 ? '#1A1420' : css(mixc('#5A4A3A', '#9A7C58', k / 3))
      const w = 110 + k * 22, h = 180 + k * 14
      X.beginPath(); X.moveTo(960 - w / 2, 480); X.lineTo(960 - w / 2, 480 - h + w / 2); X.arc(960, 480 - h + w / 2, w / 2, PI, TAU); X.lineTo(960 + w / 2, 480); X.fill()
    }
    // escadaria
    for (let i = 0; i < 7; i++) {
      const y = 780 + i * 22, w = 700 + i * 90
      X.fillStyle = css(mixc('#8C7456', '#3A3036', i / 7))
      X.fillRect(960 - w / 2, y, w, 22)
      X.fillStyle = 'rgba(0,0,0,0.25)'; X.fillRect(960 - w / 2, y + 18, w, 4)
    }
    // candeeiros de ferro
    for (const x of [640, 1280]) {
      X.fillStyle = '#0A0A10'; X.fillRect(x - 3, 640, 6, 140)
      glow(x, 630, 120, '#FFC070', 0.6)
      X.fillStyle = '#FFE0A0'; X.beginPath(); X.arc(x, 630, 8, 0, TAU); X.fill()
    }
    // os músicos
    const play = t < 158.6 ? 1 : 0
    const mus = [[800, 846, 'g'], [880, 846, 'g'], [1060, 846, 'v']]
    for (const [x, y, kind] of mus) musician(x, y, kind, t, play)
    student(960, 830, 0.95, 1, '#07070B', t * 0.3, false)
    // notas de luz a subir
    if (t < 158.8) {
      const rn = rng(4)
      for (let i = 0; i < 40; i++) {
        const life = 3 + rn() * 2, off = rn() * life
        const p = ((t + off) % life) / life
        const x0 = [800, 880, 960][i % 3]
        const x = x0 + Math.sin(p * 5 + i) * 40 + p * (rn() - 0.5) * 200
        const y = 760 - p * 520
        glow(x, y, 10, '#FFE0A0', (1 - p) * 0.7 * prog(149, 150.5, t) * (1 - prog(157.6, 158.8, t)))
      }
    }
  })
  // público em primeiro plano
  const rp = rng(19)
  for (let i = 0; i < 16; i++) {
    const x = 40 + i * 124 + (rp() - 0.5) * 40, y = 1000 + rp() * 50, s = 0.9 + rp() * 0.3
    X.fillStyle = '#020205'
    X.beginPath(); X.arc(x, y - 60 * s, 34 * s, 0, TAU); X.fill()
    X.beginPath(); X.ellipse(x, y + 60 * s, 90 * s, 90 * s, 0, PI, TAU); X.fill()
    X.fillRect(x - 90 * s, y + 60 * s, 180 * s, 200)
  }
  // os pigarros: sopros pequenos e um "ahem" discreto
  const heads = [[412, 920], [1156, 930], [780, 915]]
  TL.events.pigarros.forEach((te, k) => {
    const p = (t - te) / 1.3
    if (p <= 0 || p >= 1) return
    const [hx, hy] = heads[k]
    for (let j = 0; j < 3; j++) {
      X.fillStyle = css('#DDE4F4', (1 - p) * 0.35)
      X.beginPath(); X.arc(hx + 30 + j * 12 + p * 30, hy - 30 - p * 60 - j * 6, 6 + p * 12, 0, TAU); X.fill()
    }
    text('ahem', hx + 60, hy - 80 - p * 50, { italic: true, weight: 400, size: 30, color: '#DDE4F4', alpha: (1 - p) * 0.85, align: 'left' })
  })
  chapter(t, 149.2, 'VI', 'SERENATA', { color: '#FFE6D0', dur: 9.6 })
  tag(t, 150.4, 157.8, 'SÉ VELHA', 960, 212, { color: '#FFE6D0', len: 0 })
}

// Guitarra portuguesa (corpo redondo, cabeça em leque) ou viola.
function musician(x, y, kind, t, play) {
  X.save()
  X.translate(x, y)
  X.fillStyle = '#07070B'
  // sentado: corpo e capa
  X.beginPath(); X.arc(0, -120, 15, 0, TAU); X.fill()
  X.beginPath(); X.moveTo(-18, -104); X.quadraticCurveTo(-46, -50, -52, 0); X.lineTo(44, 0); X.quadraticCurveTo(36, -50, 18, -104); X.fill()
  // instrumento
  X.save()
  X.translate(10, -58); X.rotate(-0.5)
  const body = kind === 'g' ? '#C98A3E' : '#A8743A'
  X.fillStyle = body
  if (kind === 'g') { X.beginPath(); X.arc(0, 0, 24, 0, TAU); X.fill() }
  else { X.beginPath(); X.ellipse(0, 6, 20, 26, 0, 0, TAU); X.ellipse(0, -18, 15, 17, 0, 0, TAU); X.fill() }
  X.fillStyle = '#1A0E08'; X.beginPath(); X.arc(0, kind === 'g' ? -4 : -4, 6, 0, TAU); X.fill()
  X.fillStyle = '#3A2414'; X.fillRect(-3, -86, 6, 64)
  if (kind === 'g') {
    X.fillStyle = '#E3B04B'
    X.beginPath(); X.moveTo(0, -86); for (let i = 0; i <= 8; i++) { const a = -PI / 2 - 0.9 + (i / 8) * 1.8; X.lineTo(Math.cos(a) * 20, -86 + Math.sin(a) * 20) } X.closePath(); X.fill()
  } else { X.fillStyle = '#3A2414'; X.fillRect(-5, -104, 10, 18) }
  X.restore()
  // a mão a tanger
  const m = play * Math.sin(t * (kind === 'g' ? 22 : 9)) * 3
  X.fillStyle = '#07070B'; X.beginPath(); X.arc(18 + m, -52, 6, 0, TAU); X.fill()
  X.restore()
}

// ---------- 6 · o fim ----------
function sFim(t) {
  const cam = camPath(t, [[165.6, { x: 960, y: 520, z: 1.25 }], [177.9, { x: 960, y: 540, z: 1.0 }]], E.out)
  const day = smooth(prog(165.6, 172, t))
  const pal = mixPal(PAL.dusk, PAL.sunrise, day)
  const S = {
    pal, cam, clouds: 0.8, trees: 1, light: 1, lights: 1 - smooth(prog(169, 174, t)),
    stars: 1 - day, houses: [0, 1, 1],
    sun: { x: 1660, y: lerp(760, 520, day), r: 40, a: day, color: '#FFB080' },
    back: [{ name: 'paco', line: 1, fill: 1 }, { name: 'joanina', line: 1, fill: 1 }, { name: 'tower', line: 1, fill: 1 }],
    front: [{ name: 'se', line: 1, fill: 1 }, { name: 'santaCruz', line: 1, fill: 1 }],
    world: () => {
      // palimpsesto: as épocas todas no mesmo sítio, em traço
      const ga = win(t, 168.2, 173.6, 1.0) * 0.8
      if (ga > 0) {
        X.save(); X.globalAlpha = ga
        drawMonument('forum', { line: E.sine(prog(168.2, 170.4, t)), fill: 0, color: '#FFF1DC', width: 1.6, dx: -160, dy: -8 })
        drawMonument('castle', { line: E.sine(prog(168.8, 171.0, t)), fill: 0, color: '#FFE0B0', width: 1.6, dx: 150, dy: 60 })
        X.restore()
      }
      // alguém começa a subida
      const w = prog(170.2, 177.8, t)
      if (w > 0) {
        const path0 = [[520, 866], [560, 830], [600, 800], [660, 770], [700, 740], [760, 712]]
        const L = lens(path0), d = L.at(-1) * E.sine(w) * 0.8
        let i = 1; while (i < path0.length - 1 && L[i] < d) i++
        const f = (d - L[i - 1]) / (L[i] - L[i - 1])
        const px = lerp(path0[i - 1][0], path0[i][0], f), py = lerp(path0[i - 1][1], path0[i][1], f)
        glow(px, py - 12, 40, '#FFD9A8', 0.6)
        figure(px, py, 18, css('#1A1420'), t * 6)
        X.fillStyle = css('#6A2334'); X.fillRect(px + 5, py - 8, 8, 6)
      }
    },
  }
  stage(t, S)
  const ta = win(t, 172.4, 180, 1.2)
  if (ta > 0) {
    const word = 'COIMBRA'
    const o = { size: 178, weight: 300, spacing: 30 }
    const xs = letterPos(word, 960, 0, o)
    X.save()
    ;[...word].forEach((ch, i) => {
      const p = E.out5(prog(172.4 + i * 0.1, 173.8 + i * 0.1, t))
      X.globalAlpha = ta * p
      X.shadowColor = 'rgba(40,20,40,0.35)'; X.shadowBlur = 30
      text(ch, xs[i], 250 + (1 - p) * 30, { ...o, spacing: 0, color: '#FFF6EA' })
    })
    X.shadowBlur = 0
    X.globalAlpha = ta * smooth(prog(174.2, 175.2, t))
    text('COIMBRALENS', 960, 306, { family: 'mono', size: 15, color: '#FFF6EA', spacing: 10, weight: 500 })
    X.restore()
  }
}
