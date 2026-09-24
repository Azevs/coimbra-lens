// Cenas 0 e 1: o rio e Aeminium.

const PAL = {
  night: {
    sky0: '#070A14', sky1: '#10162B', sky2: '#1C2440', far2: '#1A2038', far1: '#20263F',
    hill0: '#3A4152', hill1: '#262B3A', water0: '#1B2440', water1: '#070A14', glint: '#9FB3D9', cloud: '#1E2540',
    cypress: '#1E2A2A', olive: '#2B3530', tint: '#FFFFFF',
  },
  dawn: {
    sky0: '#141A36', sky1: '#5A4E78', sky2: '#E9A07A', far2: '#6D5F86', far1: '#56507A',
    hill0: '#8C8672', hill1: '#5A5A56', water0: '#8B7CA0', water1: '#1E2340', glint: '#FFD2A8', cloud: '#B98AA0',
    cypress: '#2F3B3A', olive: '#4A5446', tint: '#D8C6D0',
  },
  roman: {
    sky0: '#E3B27A', sky1: '#F0D2A0', sky2: '#F8E9C8', far2: '#E2C39A', far1: '#D2AD7E',
    hill0: '#CFA36A', hill1: '#A87A4A', water0: '#B8B39A', water1: '#5F6E68', glint: '#FFF6DE', cloud: '#FFF1D6',
    cypress: '#5E6B45', olive: '#8D8A55', tint: '#FFF1DC',
  },
}

// ---------- mapa ----------
let MAP = null
function prepMap() {
  const rio = GEO.rio.slice().reverse() // nascente → poente: o traço segue a água
  const lon0 = -8.335, lat0 = 40.242, k = 6300, cl = Math.cos((40.2 * PI) / 180)
  const P = ([lo, la]) => [960 + (lo - lon0) * cl * k, 540 - (la - lat0) * k]
  const pts = rio.map(P)
  const L = lens(pts), tot = L.at(-1)
  MAP = { P, pts, u: L.map((l) => l / tot), coimbra: P(GEO.coimbra) }
  // curvas de nível (estáticas), por marching squares sobre ruído 2D
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H
  const c = cv.getContext('2d')
  const n2 = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), fx = smooth(x - xi), fy = smooth(y - yi)
    const h = (a, b) => hash(a * 57.3 + b * 131.1)
    return lerp(lerp(h(xi, yi), h(xi + 1, yi), fx), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), fx), fy)
  }
  const field = (x, y) => {
    let s = 0, a = 0.55, f = 1 / 260
    for (let o = 0; o < 4; o++) { s += a * n2(x * f + o * 3.1, y * f + o * 7.7); a *= 0.5; f *= 2 }
    // o vale do rio é mais baixo
    let dmin = 1e9
    for (let i = 0; i < pts.length; i += 2) dmin = Math.min(dmin, Math.hypot(x - pts[i][0], y - pts[i][1]))
    return s + 0.35 * Math.min(1, dmin / 260)
  }
  const G = 12, nx = Math.ceil(W / G) + 1, ny = Math.ceil(H / G) + 1
  const F = new Float32Array(nx * ny)
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) F[j * nx + i] = field(i * G, j * G)
  c.lineWidth = 1
  for (let lv = 0.3; lv < 1.1; lv += 0.045) {
    c.strokeStyle = `rgba(205,190,160,${0.1 + ((lv * 100) % 9 < 1 ? 0.08 : 0)})`
    c.beginPath()
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const a = F[j * nx + i], b = F[j * nx + i + 1], d = F[(j + 1) * nx + i], e = F[(j + 1) * nx + i + 1]
      const cs = []
      const ed = (v0, v1, x0, y0, x1, y1) => { if ((v0 < lv) !== (v1 < lv)) { const f = (lv - v0) / (v1 - v0); cs.push([lerp(x0, x1, f), lerp(y0, y1, f)]) } }
      const x = i * G, y = j * G
      ed(a, b, x, y, x + G, y); ed(b, e, x + G, y, x + G, y + G); ed(e, d, x + G, y + G, x, y + G); ed(d, a, x, y + G, x, y)
      if (cs.length >= 2) { c.moveTo(cs[0][0], cs[0][1]); c.lineTo(cs[1][0], cs[1][1]) }
      if (cs.length === 4) { c.moveTo(cs[2][0], cs[2][1]); c.lineTo(cs[3][0], cs[3][1]) }
    }
    c.stroke()
  }
  MAP.contours = cv
}

// ---------- 0 · o rio ----------
function sRio(t) {
  const morph = E.io(prog(7.4, 10.4, t)) // o mapa endireita-se e vira horizonte
  const rise = E.io(prog(9.6, 13.2, t))
  const dawn = smooth(prog(8.5, 15.5, t))
  const mapA = 1 - smooth(prog(7.2, 9.6, t))

  // céu: da noite do mapa à madrugada
  const pal = mixPal(PAL.night, PAL.dawn, dawn)
  RISE = Math.max(0.0001, rise)
  const S = {
    pal, stars: 1 - dawn * 0.7, cam: { x: 960, y: 540 + (1 - rise) * 10, z: 1 + t * 0.004 },
    sun: { x: 1640, y: lerp(820, 470, smooth(prog(10, 16.6, t))), r: 34, a: smooth(prog(10.5, 13, t)), color: '#FFB27A' },
    clouds: 0.6 * dawn, trees: smooth(prog(12, 14.5, t)), houses: [0, 0, 0], light: 1, terraces: 0.5,
  }
  if (rise > 0.001) stage(t, S)
  else {
    X.fillStyle = css(PAL.night.sky1); X.fillRect(0, 0, W, H)
    const g = X.createRadialGradient(960, 520, 0, 960, 520, 1100)
    g.addColorStop(0, 'rgba(40,52,90,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0)')
    X.fillStyle = g; X.fillRect(0, 0, W, H)
    for (const s of STARS) { X.fillStyle = css('#FFF6E0', 0.25 * (0.6 + 0.4 * Math.sin(t * s.sp + s.ph))); X.fillRect(s.x, s.y, s.s, s.s) }
  }
  RISE = 1

  // mapa: curvas de nível, quadrícula, etiquetas
  if (mapA > 0) {
    X.save()
    X.globalAlpha = mapA * smooth(prog(0.3, 3, t))
    const zc = 1 + t * 0.006
    X.translate(MAP.coimbra[0], MAP.coimbra[1]); X.scale(zc, zc); X.translate(-MAP.coimbra[0], -MAP.coimbra[1])
    X.drawImage(MAP.contours, 0, 0)
    X.strokeStyle = 'rgba(220,205,170,0.10)'
    X.lineWidth = 1
    for (let i = 0; i < 9; i++) { const x = 120 + i * 210; X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H); X.stroke() }
    for (let j = 0; j < 5; j++) { const y = 120 + j * 210; X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke() }
    text('40°15′N', 128, 112, { family: 'mono', size: 13, color: '#CFC2A2', align: 'left', alpha: 0.6, spacing: 2 })
    text('8°20′W', 1808, 1040, { family: 'mono', size: 13, color: '#CFC2A2', align: 'right', alpha: 0.6, spacing: 2 })
    X.restore()
  }

  // o traço do rio: desenha-se, depois endireita
  const draw = E.sine(prog(0.6, 6.4, t))
  const pts = MAP.pts.map((p, i) => {
    const u = MAP.u[i]
    const m = E.io(clamp((morph * 1.35 - (1 - u) * 0.35)))
    return [lerp(p[0], lerp(1990, -70, u), m), lerp(p[1], RIVER_Y, m)]
  })
  _len.delete(pts)
  const lineA = 1 - smooth(prog(12.2, 14.5, t))
  if (draw > 0 && lineA > 0) {
    X.save()
    X.globalAlpha = lineA
    const zc = (1 + t * 0.006) * (1 - morph) + morph
    X.translate(MAP.coimbra[0] * (1 - morph) + 960 * morph, MAP.coimbra[1] * (1 - morph) + 540 * morph)
    X.scale(zc, zc)
    X.translate(-(MAP.coimbra[0] * (1 - morph) + 960 * morph), -(MAP.coimbra[1] * (1 - morph) + 540 * morph))
    drawLines([pts], draw, { color: '#F3D08A', width: 3.2, glow: 0.55 })
    X.restore()
  }
  // etiquetas do mapa
  if (mapA > 0) {
    X.save()
    X.globalAlpha = mapA
    const [cx, cy] = MAP.coimbra
    const pa = E.out(prog(4.6, 5.6, t))
    if (pa > 0) {
      for (let k = 0; k < 3; k++) {
        const ph = ((t - 4.6 + k * 0.8) % 2.4) / 2.4
        X.strokeStyle = css('#F3D08A', (1 - ph) * 0.6 * pa)
        X.lineWidth = 1.5
        X.beginPath(); X.arc(cx, cy, 6 + ph * 46, 0, TAU); X.stroke()
      }
      X.fillStyle = css('#FFF1CF', pa); X.beginPath(); X.arc(cx, cy, 6 * pa, 0, TAU); X.fill()
    }
    tag(t, 5.0, 9.2, 'COIMBRA', cx, cy - 12, { color: '#F6E7C4', len: 64, size: 16 })
    const ra = win(t, 2.2, 9.0, 0.8)
    text('Mondego', 1390, 470, { italic: true, weight: 300, size: 44, color: '#F3D08A', alpha: ra * 0.9 })
    text('← ATLANTIC', 96, 560, { family: 'mono', size: 14, color: '#CFC2A2', align: 'left', alpha: ra * 0.7, spacing: 3 })
    text('SERRA DA ESTRELA →', 1824, 250, { family: 'mono', size: 14, color: '#CFC2A2', align: 'right', alpha: ra * 0.7, spacing: 3 })
    X.restore()
  }

  // título
  const ta = win(t, 12.0, 16.5, 1.0)
  if (ta > 0) {
    const word = 'COIMBRA'
    const o = { size: 196, weight: 300, spacing: 34 }
    const xs = letterPos(word, 960, 0, o)
    X.save()
    ;[...word].forEach((ch, i) => {
      const p = E.out5(prog(12.1 + i * 0.12, 13.6 + i * 0.12, t))
      X.globalAlpha = ta * p
      X.shadowColor = 'rgba(20,16,40,0.35)'; X.shadowBlur = 30
      text(ch, xs[i], 292 + (1 - p) * 40, { ...o, spacing: 0, color: '#FFF4E2' })
    })
    X.shadowBlur = 0
    X.globalAlpha = ta * smooth(prog(13.6, 14.8, t))
    text('PORTUGAL', 960, 352, { family: 'mono', size: 16, color: '#FFF4E2', spacing: 12, weight: 500 })
    X.restore()
  }
}

// ---------- 1 · Aeminium ----------
const w2s = (cam, x, y) => [(x - cam.x) * cam.z + W / 2, (y - cam.y) * cam.z + H / 2]

function sAeminium(t) {
  const T = TL.cues
  const cam = camPath(t, [
    [16.6, { x: 960, y: 540, z: 1.0 }],
    [20.5, { x: 1080, y: 500, z: 1.18 }],
    [24.6, { x: 1120, y: 440, z: 2.25 }],
    [28.6, { x: 1112, y: 452, z: 2.4 }],
    [31.4, { x: 960, y: 560, z: 0.97 }],
    [40.5, { x: 960, y: 548, z: 1.02 }],
  ])
  const ink = '#2B2118'
  const cut = E.io(prog(24.2, 25.6, t)) * (1 - E.io(prog(29.2, 30.6, t)))
  const S = {
    pal: PAL.roman, cam, clouds: 0.8, trees: 1, roman: true, light: -1,
    houses: [0, 0.34 * E.out(prog(20.2, 23.8, t)), 0],
    sun: { x: 330, y: 230, r: 44, a: 1, color: '#FFD68A' },
    back: [{ name: 'forum', line: E.sine(prog(19.8, 23.4, t)), fill: E.out(prog(22.6, 24.4, t)), color: '#8A5A22', width: 1.8 }],
    world: () => {
      // o corte no chão, com as galerias por baixo do fórum
      if (cut <= 0) return
      const [bx, by] = SITES.crypto
      X.save()
      X.beginPath()
      const hw = 150 * cut
      X.moveTo(bx - hw, by + 2)
      for (let i = 0; i <= 20; i++) X.lineTo(bx - hw + (hw * 2 * i) / 20, by + 132 + 5 * noise(i * 1.7))
      X.lineTo(bx + hw, by + 2)
      X.closePath()
      X.clip()
      X.fillStyle = tcss('#6D4E36'); X.fillRect(bx - 160, by, 320, 140)
      drawMonument('crypto', { line: E.sine(prog(25.0, 27.4, t)), fill: E.out(prog(26.6, 28.0, t)), color: '#F3C77A', width: 1.2 })
      // tochas
      const fl = 0.8 + 0.2 * noise(t * 9)
      for (const [dx, dy] of [[-102, 34], [-26, 34], [50, 34], [-64, 96], [12, 96], [88, 96]]) glow(bx + dx, by + dy, 34, '#FFB35C', 0.55 * fl * prog(26.8, 27.8, t))
      // gente a passar nas galerias
      for (let k = 0; k < 3; k++) {
        const px = bx - 130 + (((t - 26) * (7 + k * 3) + k * 90) % 260)
        figure(px, by + (k === 1 ? 118 : 56), 9, tcss('#1C1418', prog(27, 28, t)), t * 5 + k)
      }
      X.restore()
      X.strokeStyle = tcss('#4A3322', cut); X.lineWidth = 1.5
      X.beginPath(); X.moveTo(bx - hw, by + 2); X.lineTo(bx + hw, by + 2); X.stroke()
    },
  }
  // bispos a caminho, pela margem, vindos de poente
  S.over = () => {
    const a = win(t, 30.0, 39.5, 1)
    if (a <= 0) return
    for (let k = 0; k < 5; k++) {
      const x = -60 + (t - 29.6) * 42 - k * 22
      figure(x, RIVER_Y - 4, 13, css(ink, a * 0.85), t * 5 + k, k === 0)
    }
  }
  stage(t, S)

  chapter(t, 17.0, 'I', 'AEMINIUM', { color: ink, dur: 12 })
  // o nome romano, grande
  const na = win(t, 18.2, 24.0, 0.9)
  if (na > 0) {
    X.save()
    const p = E.out5(prog(18.2, 19.8, t))
    X.globalAlpha = na
    X.beginPath(); X.rect(0, 0, 110 + 820 * p, H); X.clip()
    text('Aeminium', 96, 300, { italic: true, weight: 300, size: 150, color: ink, align: 'left' })
    X.restore()
  }
  // etiquetas do corte (no ecrã, para não crescerem com o zoom)
  const [ax, ay] = w2s(cam, 1044, 440)
  tag(t, 26.2, 29.4, 'CRYPTOPORTICUS', ax, ay, { color: '#FFF1DA', len: 190, dir: 1 })
  const ma = win(t, 27.0, 29.4, 0.5)
  if (ma > 0) text('beneath the Machado de Castro Museum', ax, ay + 250, { italic: true, weight: 400, size: 26, color: '#FFF1DA', alpha: ma * 0.95 })
  const [mx, my] = w2s(cam, 1120, 300)
  tag(t, 22.8, 29.4, 'FORUM', mx, my, { color: ink, len: 60 })

  // CONIMBRIGA → COIMBRA
  const la = win(t, 30.6, 40.6, 0.6)
  if (la > 0) {
    const o = { size: 124, weight: 400, spacing: 16 }
    const from = letterPos('CONIMBRIGA', 960, 0, o)
    const to = letterPos('COIMBRA', 960, 0, o)
    const keep = { 0: 0, 1: 1, 3: 2, 4: 3, 5: 4, 6: 5, 9: 6 }
    const Y = 250
    X.save()
    ;[...'CONIMBRIGA'].forEach((ch, i) => {
      const pin = E.out5(prog(30.6 + i * 0.07, 32.2 + i * 0.07, t))
      const sx = lerp(-200 + i * 30, from[i], pin), sy = lerp(760 - i * 12, Y, pin)
      const rot = (1 - pin) * -0.8
      let x = sx, y = sy, a = pin, r = rot
      if (keep[i] === undefined) {
        const f = prog(33.9, 35.6, t)
        y += 420 * f * f; r += f * (i % 2 ? 0.9 : -0.7); a *= 1 - smooth(prog(34.4, 35.6, t))
      } else {
        const m = E.io(prog(34.4, 35.8, t))
        x = lerp(sx, to[keep[i]], m)
      }
      if (a <= 0) return
      X.save()
      X.translate(x, y); X.rotate(r)
      X.globalAlpha = la * a
      text(ch, 0, 0, { ...o, spacing: 0, color: ink })
      X.restore()
    })
    // fio por baixo quando assenta
    const up = E.out(prog(35.8, 37.0, t))
    if (up > 0) {
      X.globalAlpha = la
      X.strokeStyle = css(ACCENT, 0.9); X.lineWidth = 2
      X.beginPath(); X.moveTo(960 - 260 * up, Y + 34); X.lineTo(960 + 260 * up, Y + 34); X.stroke()
      text('AEMINIUM  ·  CONIMBRIGA  ·  COIMBRA', 960, Y + 76, { family: 'mono', size: 15, color: ink, spacing: 4, alpha: la * smooth(prog(36.2, 37.2, t)), weight: 500 })
    }
    X.restore()
  }
}

// Figura humana mínima: cabeça, corpo, pernas a andar.
function figure(x, y, h, color, ph = 0, crozier = false) {
  X.fillStyle = color
  X.strokeStyle = color
  const sw = Math.sin(ph) * h * 0.12
  X.beginPath(); X.arc(x, y - h * 0.9, h * 0.12, 0, TAU); X.fill()
  X.beginPath()
  X.moveTo(x - h * 0.16, y - h * 0.3); X.lineTo(x - h * 0.1, y - h * 0.75); X.lineTo(x + h * 0.1, y - h * 0.75); X.lineTo(x + h * 0.18, y - h * 0.3)
  X.fill()
  X.lineWidth = Math.max(1, h * 0.08)
  X.beginPath(); X.moveTo(x - h * 0.05, y - h * 0.32); X.lineTo(x - h * 0.05 - sw, y); X.moveTo(x + h * 0.05, y - h * 0.32); X.lineTo(x + h * 0.05 + sw, y); X.stroke()
  if (crozier) {
    X.lineWidth = Math.max(1, h * 0.06)
    X.beginPath(); X.moveTo(x + h * 0.25, y); X.lineTo(x + h * 0.25, y - h * 1.2); X.arc(x + h * 0.33, y - h * 1.2, h * 0.08, PI, TAU * 0.9); X.stroke()
  }
}
