// Cenas 2 e 3: o reino e Inês.

Object.assign(PAL, {
  medieval: {
    sky0: '#5E93BD', sky1: '#A4C6D8', sky2: '#F1E2C0', far2: '#A5B8BC', far1: '#8FA59B',
    hill0: '#A3A56E', hill1: '#72784C', water0: '#6E9CB0', water1: '#2A4E63', glint: '#FFFFFF', cloud: '#FBF6EA',
    cypress: '#3E5A45', olive: '#6F8456', tint: '#FFFFFF',
  },
  moon: {
    sky0: '#060A1A', sky1: '#16224A', sky2: '#3A4E86', far2: '#141C38', far1: '#10172E',
    hill0: '#1B2238', hill1: '#0E1322', water0: '#18234A', water1: '#04060E', glint: '#B9C9F0', cloud: '#1A2240',
    cypress: '#0C1219', olive: '#111A20', tint: '#FFFFFF',
  },
})

// ---------- Portugal ----------
let PT = null
function prepB() {
  const k = 150, cl = Math.cos((39.6 * PI) / 180)
  const lon0 = -8.0, lat0 = 39.6, cx = 1250, cy = 540
  const P = ([lo, la]) => [cx + (lo - lon0) * cl * k, cy - (la - lat0) * k]
  PT = { ring: GEO.portugal.map(P), coimbra: P(GEO.coimbra), P }
  PT.ring.push(PT.ring[0])
}

function portugalMap(t, t0, t1) {
  const a = win(t, t0, t1, 0.7)
  if (a <= 0) return
  X.save()
  X.globalAlpha = a
  // papel escuro por baixo
  X.fillStyle = 'rgba(16,20,30,0.82)'
  X.fillRect(0, 0, W, H)
  const ring = PT.ring
  const ys = ring.map((p) => p[1]), top = Math.min(...ys), bot = Math.max(...ys)
  // enche de norte para sul: primeiro o condado, até ao Mondego; depois o reino
  const f1 = E.io(prog(t0 + 1.4, t0 + 2.6, t)), f2 = E.io(prog(t0 + 2.8, t0 + 4.6, t))
  const yCut = lerp(top, PT.coimbra[1] + 8, f1) + (bot - PT.coimbra[1] - 8) * f2
  X.save()
  path(ring, true)
  X.clip()
  const g = X.createLinearGradient(0, top, 0, bot)
  g.addColorStop(0, css('#C9892F', 0.9)); g.addColorStop(1, css('#B03A0B', 0.9))
  X.fillStyle = g
  X.fillRect(0, top - 10, W, yCut - top + 10)
  // bordo do avanço
  X.strokeStyle = css('#FFE2A6', 0.9 * (1 - f2 * (f2 > 0.98 ? 1 : 0)))
  X.lineWidth = 2
  X.beginPath(); X.moveTo(900, yCut); X.lineTo(1600, yCut); X.stroke()
  X.restore()
  drawLines([ring], E.sine(prog(t0, t0 + 1.8, t)), { color: '#F3D08A', width: 2, glow: 0.4 })
  // Coimbra
  const [cx, cy] = PT.coimbra
  const pa = E.back(prog(t0 + 1.0, t0 + 1.6, t))
  X.fillStyle = css('#FFF6E0'); X.beginPath(); X.arc(cx, cy, 7 * pa, 0, TAU); X.fill()
  X.strokeStyle = css('#FFF6E0', 0.8); X.lineWidth = 1.5; X.beginPath(); X.arc(cx, cy, 14 * pa, 0, TAU); X.stroke()
  text('COIMBRA', cx - 26, cy + 5, { family: 'mono', size: 15, color: '#FFF6E0', align: 'right', spacing: 3, weight: 500, alpha: pa })
  const la = smooth(prog(t0 + 1.6, t0 + 2.4, t)) * (1 - smooth(prog(t0 + 3.0, t0 + 3.5, t)))
  text('COUNTY', 1420, top + 120, { family: 'mono', size: 16, color: '#FFE2A6', align: 'left', spacing: 6, alpha: la })
  const lb = smooth(prog(t0 + 3.6, t0 + 4.4, t))
  text('KINGDOM', 1420, top + 120, { family: 'mono', size: 16, color: '#FFE2A6', align: 'left', spacing: 6, alpha: lb })
  // capital: 1131–1255
  const ca = smooth(prog(t0 + 5.0, t0 + 5.8, t))
  if (ca > 0) {
    text('CAPITAL', cx - 26, cy + 34, { family: 'mono', size: 13, color: '#F3D08A', align: 'right', spacing: 4, alpha: ca })
    text('1131 – 1255', cx - 26, cy + 64, { italic: true, weight: 300, size: 30, color: '#FFF6E0', align: 'right', alpha: ca })
  }
  X.restore()
}

// Bandeira de D. Afonso Henriques: cruz azul em campo branco, a ondular.
function banner(x, y, t, s = 1, a = 1) {
  X.save()
  X.translate(x, y)
  X.scale(s, s)
  X.globalAlpha = a
  X.strokeStyle = tcss('#3A3036'); X.lineWidth = 2
  X.beginPath(); X.moveTo(0, 0); X.lineTo(0, -64); X.stroke()
  const w = 44, h = 30
  const wave = (u, v) => [u * w, -64 + v * h + Math.sin(u * 5 - t * 5) * 4 * u]
  const quad = (u0, v0, u1, v1, c) => {
    X.fillStyle = c
    X.beginPath()
    const p = [wave(u0, v0), wave(u1, v0), wave(u1, v1), wave(u0, v1)]
    // arestas curvas: amostrar em u
    X.moveTo(...p[0])
    for (let i = 1; i <= 6; i++) X.lineTo(...wave(lerp(u0, u1, i / 6), v0))
    X.lineTo(...p[2])
    for (let i = 5; i >= 0; i--) X.lineTo(...wave(lerp(u0, u1, i / 6), v1))
    X.closePath()
    X.fill()
  }
  quad(0, 0, 1, 1, tcss('#F5F2EA'))
  quad(0.38, 0, 0.56, 1, tcss('#2A4E9B'))
  quad(0, 0.38, 1, 0.62, tcss('#2A4E9B'))
  X.restore()
}

// ---------- 2 · o reino ----------
function sReino(t) {
  const cam = camPath(t, [
    [39.2, { x: 960, y: 548, z: 1.02 }],
    [46.0, { x: 1000, y: 520, z: 1.08 }],
    [53.0, { x: 990, y: 540, z: 1.05 }],
    [55.6, { x: 520, y: 740, z: 2.1 }],
    [63.5, { x: 480, y: 760, z: 2.3 }],
  ])
  const S = {
    pal: PAL.medieval, cam, clouds: 1, trees: 1, light: -1,
    houses: [0, E.out(prog(40.0, 45.0, t)), 0.25 * E.out(prog(43, 47, t))],
    sun: { x: 300, y: 180, r: 38, a: 0.9, color: '#FFF0C8' },
    back: [
      { name: 'castle', line: E.sine(prog(40.6, 43.6, t)), fill: E.out(prog(42.8, 44.4, t)), color: '#7A4E1C' },
    ],
    front: [
      { name: 'walls', line: E.sine(prog(40.2, 44.0, t)), fill: E.out(prog(43.2, 45.0, t)), color: '#7A4E1C' },
      { name: 'se', line: E.sine(prog(43.0, 46.0, t)), fill: E.out(prog(45.4, 47.0, t)), color: '#7A4E1C' },
      { name: 'santaCruz', line: E.sine(prog(53.6, 56.2, t)), fill: E.out(prog(55.6, 57.0, t)), color: '#7A4E1C' },
    ],
    world: () => {
      const [cx, cy] = SITES.castle
      banner(cx + 6, cy - 128, t, 1.1, smooth(prog(43.6, 44.6, t)))
      banner(cx - 78, cy - 76, t + 1.3, 0.8, smooth(prog(43.9, 44.9, t)))
    },
  }
  stage(t, S)
  const ink = '#1E2A33'
  chapter(t, 40.6, 'II', 'THE KINGDOM', { color: ink, dur: 9 })
  bigYear(t, 41.4, 46.6, '1131', 96, 300, { color: ink, size: 170 })
  const na = win(t, 42.2, 46.6, 0.7)
  if (na > 0) text('Afonso Henriques', 102, 360, { italic: true, weight: 400, size: 40, color: ink, align: 'left', alpha: na })
  portugalMap(t, 46.6, 54.2)
  // etiquetas do lugar
  const [sx, sy] = w2s(cam, SITES.se[0], SITES.se[1] - 120)
  tag(t, 46.0, 46.7, 'SÉ VELHA', sx, sy, { color: ink, len: 50 })
  const [qx, qy] = w2s(cam, SITES.santaCruz[0], SITES.santaCruz[1] - 150)
  tag(t, 56.0, 58.2, 'SANTA CRUZ', qx, qy, { color: ink, len: 40 })
  const [dx, dy] = w2s(cam, SITES.santaCruz[0], SITES.santaCruz[1] - 27)
  tombs(t, 57.4, 63.8, dx, dy)
}

// Os túmulos dos dois primeiros reis, vistos pela porta de Santa Cruz.
function tombs(t, t0, t1, ox = 960, oy = 560) {
  const open = E.io(prog(t0, t0 + 1.4, t))
  if (open <= 0) return
  const a = 1 - smooth(prog(t1 - 0.8, t1, t))
  X.save()
  X.globalAlpha = a
  // a porta abre-se até encher o ecrã
  const r = lerp(28, 1500, open)
  const cx = lerp(ox, 960, open), cy = lerp(oy, 560, open)
  X.beginPath()
  X.moveTo(cx - r, H + 10 + r)
  X.lineTo(cx - r, cy)
  X.arc(cx, cy, r, PI, TAU)
  X.lineTo(cx + r, H + 10 + r)
  X.closePath()
  X.clip()
  const g = X.createRadialGradient(960, 620, 50, 960, 620, 1100)
  g.addColorStop(0, '#3A2A22'); g.addColorStop(1, '#0C0908')
  X.fillStyle = g
  X.fillRect(0, 0, W, H)
  const lp = E.sine(prog(t0 + 0.6, t0 + 3.2, t)), fp = E.out(prog(t0 + 2.2, t0 + 3.6, t))
  for (const [cx, name] of [[640, 'AFONSO I'], [1280, 'SANCHO I']]) {
    X.save()
    X.translate(cx, 0)
    // nicho em arco
    const niche = [[-230, 860], [-230, 420], ...arcPts(0, 420, 230, 180, PI, TAU, 30), [230, 860]]
    X.fillStyle = css('#241915', fp); path(niche, true); X.fill()
    // arca tumular
    const box = rect(-190, 720, 380, 140)
    X.fillStyle = css('#CDB890', fp); path(box, true); X.fill()
    for (let i = 0; i < 5; i++) { X.fillStyle = css('#B39C72', fp); X.fillRect(-170 + i * 72, 750, 50, 90) }
    // figura jacente com coroa
    const fig = [[-170, 720], [-170, 690], [-120, 676], [120, 672], [150, 684], [168, 700], [170, 720]]
    X.fillStyle = css('#E2D2AE', fp); path(fig, true); X.fill()
    X.fillStyle = css('#E2D2AE', fp); X.beginPath(); X.arc(-150, 676, 20, 0, TAU); X.fill()
    const crown = [[-172, 660], [-168, 640], [-160, 652], [-150, 634], [-140, 652], [-132, 640], [-128, 660]]
    X.fillStyle = css('#E3B04B', fp); path(crown, true); X.fill()
    drawLines([niche, box, fig, crown], lp, { color: '#F3C77A', width: 2, glow: 0.4, stagger: 0.3 })
    // velas
    for (const vx of [-205, 205]) {
      X.fillStyle = css('#EDE3CC', fp); X.fillRect(vx - 5, 800, 10, 60)
      const fl = 0.85 + 0.15 * noise(t * 11 + vx)
      glow(vx, 790, 90 * fl, '#FFB04A', 0.55 * fp)
      X.fillStyle = css('#FFE7A8', fp); X.beginPath(); X.ellipse(vx, 790, 4, 10 * fl, 0, 0, TAU); X.fill()
    }
    X.restore()
    text(name, cx, 930, { family: 'mono', size: 18, color: '#F3D08A', spacing: 8, weight: 500, alpha: smooth(prog(t0 + 2.6, t0 + 3.4, t)) })
  }
  X.restore()
}

// ---------- 3 · Inês ----------
let CEDARS = []
function cedar(x, y, s, c) {
  // cedro: camadas horizontais escalonadas
  X.fillStyle = c
  X.fillRect(x - 6 * s, y - 60 * s, 12 * s, 60 * s)
  const r = rng(Math.floor(x))
  for (let i = 0; i < 7; i++) {
    const yy = y - 60 * s - i * 42 * s
    const w = (190 - i * 22) * s * (0.85 + r() * 0.3)
    X.beginPath()
    X.ellipse(x + (r() - 0.5) * 30 * s, yy, w, 26 * s, 0, 0, TAU)
    X.fill()
  }
}

function fonte(t, cx, by, a = 1) {
  // parede de pedra com arco quebrado, bica e tanque
  X.save()
  X.globalAlpha = a
  const lg = X.createLinearGradient(cx + 200, by - 260, cx - 200, by)
  lg.addColorStop(0, '#3E4874'); lg.addColorStop(1, '#1C2240')
  X.fillStyle = lg
  X.fillRect(cx - 190, by - 250, 380, 250)
  X.fillStyle = '#323A62'
  X.beginPath()
  X.moveTo(cx - 90, by - 60); X.lineTo(cx - 90, by - 170)
  X.quadraticCurveTo(cx - 90, by - 230, cx, by - 262)
  X.quadraticCurveTo(cx + 90, by - 230, cx + 90, by - 170)
  X.lineTo(cx + 90, by - 60)
  X.fill()
  X.fillStyle = '#1C2138'
  X.fillRect(cx - 60, by - 190, 120, 70)
  // inscrição (linhas)
  X.fillStyle = 'rgba(200,210,240,0.35)'
  for (let i = 0; i < 4; i++) X.fillRect(cx - 48, by - 180 + i * 15, 96 - (i % 2) * 18, 3)
  // tanque
  X.fillStyle = '#2A3150'
  X.fillRect(cx - 230, by - 40, 460, 60)
  X.fillStyle = '#10183A'
  X.fillRect(cx - 214, by - 34, 428, 30)
  X.restore()
}

function sInes(t) {
  const T0 = TL.scenes[3].start
  // ------ o jardim ao luar ------
  const garden = 1 - smooth(prog(82.6, 84.4, t))
  if (garden > 0) {
    const z = camPath(t, [[62.4, { x: 960, y: 640, z: 1.3 }], [76.6, { x: 960, y: 660, z: 1.4 }], [79.4, { x: 960, y: 770, z: 2.4 }], [84.4, { x: 960, y: 780, z: 2.6 }]])
    X.save()
    const S = { pal: PAL.moon, stars: 1, moon: { x: 1440, y: 190, a: 1, r: 58 } }
    sky(t, S)
    camera(z, () => {
      // colinas ao fundo
      X.fillStyle = '#0F1629'
      X.beginPath(); X.moveTo(0, 1100)
      for (let x = 0; x <= W; x += 20) X.lineTo(x, 640 - 60 * Math.exp(-Math.pow((x - 700) / 400, 2)) - 30 * fbm(x * 0.004))
      X.lineTo(W, 1100); X.fill()
      // névoa do rio ao fundo
      const mist = X.createLinearGradient(0, 560, 0, 900)
      mist.addColorStop(0, 'rgba(150,175,230,0)'); mist.addColorStop(0.7, 'rgba(150,175,230,0.22)'); mist.addColorStop(1, 'rgba(150,175,230,0.05)')
      X.fillStyle = mist; X.fillRect(0, 560, W, 340)
      // cedros
      cedar(330, 900, 1.45, '#070C1A')
      cedar(1640, 910, 1.3, '#080D1C')
      // chão com a relva ao luar
      X.fillStyle = '#0B1124'; X.fillRect(0, 880, W, 300)
      X.fillStyle = 'rgba(160,185,240,0.18)'; X.fillRect(0, 880, W, 3)
      fonte(t, 960, 900)
      // água a correr na bica e no tanque
      const tear = smooth(prog(77.4, 79.2, t))
      X.strokeStyle = css('#A9C1F0', 0.7); X.lineWidth = 3
      X.beginPath(); X.moveTo(960, 780); X.quadraticCurveTo(964, 820, 962, 868); X.stroke()
      for (let k = 0; k < 6; k++) {
        const ph = ((t * 0.9 + k / 6) % 1)
        X.fillStyle = css('#CFE0FF', 0.8 * (1 - ph))
        X.beginPath(); X.arc(962, 785 + ph * 80, 2.2, 0, TAU); X.fill()
      }
      // fios vermelhos na água: a lenda
      X.save()
      X.beginPath(); X.rect(746, 866, 428, 30); X.clip()
      for (let k = 0; k < 14; k++) {
        const yy = 870 + k * 2
        X.strokeStyle = css('#C8283A', (0.25 + 0.5 * hash(k)) * tear)
        X.lineWidth = 1.6
        X.beginPath()
        for (let x = 750; x <= 1170; x += 8) {
          const y = yy + Math.sin(x * 0.03 + t * 1.4 + k) * 3 + Math.sin(x * 0.011 - t * 0.6 + k * 2) * 4
          x === 750 ? X.moveTo(x, y) : X.lineTo(x, y)
        }
        X.stroke()
      }
      // reflexo da lua no tanque
      glow(1040, 880, 50, '#BFD3F2', 0.25)
      X.restore()
      // Pedro e Inês
      const pa = win(t, 64.8, 76.6, 1.0)
      const gone = smooth(prog(73.4, 75.6, t))
      if (pa > 0) {
        X.save()
        X.globalAlpha = pa
        person(660, 900, 1.5, '#04060D', 'man', t)
        X.globalAlpha = pa * (1 - gone)
        person(1260, 900, 1.45, '#04060D', 'woman', t)
        X.restore()
        // pétalas: ela desfaz-se em flores que caem na água
        if (gone > 0) {
          const r = rng(1355)
          for (let i = 0; i < 70; i++) {
            const sx = 1215 + r() * 70, sy = 640 + r() * 250
            const p = clamp((t - 73.4 - r() * 1.4) / 3.2)
            if (p <= 0 || p >= 1) continue
            const x = lerp(sx, 800 + r() * 360, E.out(p)) + Math.sin(p * 9 + i) * 18
            const y = lerp(sy, 876, E.in(p))
            X.fillStyle = css(r() < 0.5 ? '#E0506A' : '#F2A0B0', (1 - p) * 0.9)
            X.save(); X.translate(x, y); X.rotate(p * 6 + i)
            X.beginPath(); X.ellipse(0, 0, 5, 2.6, 0, 0, TAU); X.fill()
            X.restore()
          }
        }
      }
      // pirilampos
      const r2 = rng(9)
      for (let i = 0; i < 28; i++) {
        const x = r2() * W, y = 600 + r2() * 300
        const fx = x + Math.sin(t * 0.4 + i) * 40, fy = y + Math.cos(t * 0.33 + i * 2) * 26
        const b = 0.5 + 0.5 * Math.sin(t * 2 + i * 3)
        glow(fx, fy, 12, '#D8F28A', 0.5 * b)
      }
    })
    // a sombra da coroa: a ordem do rei
    const ka = win(t, 72.2, 76.4, 1.2)
    if (ka > 0) {
      X.save()
      X.globalAlpha = ka * 0.85
      X.fillStyle = '#000005'
      X.translate(1500, 520)
      X.scale(3.4, 3.4)
      const crown = [[-60, 40], [-66, -20], [-40, 6], [-20, -34], [0, 0], [20, -34], [40, 6], [66, -20], [60, 40]]
      path(crown, true); X.fill()
      X.restore()
      const dk = X.createRadialGradient(960, 540, 200, 960, 540, 1100)
      dk.addColorStop(0, 'rgba(0,0,0,0)'); dk.addColorStop(1, `rgba(0,0,8,${0.6 * ka})`)
      X.fillStyle = dk; X.fillRect(0, 0, W, H)
    }
    // título e data
    const ia = win(t, 65.0, 69.9, 0.7)
    if (ia > 0) {
      X.save()
      const p = E.out5(prog(65.0, 66.8, t))
      X.beginPath(); X.rect(0, 0, 90 + 900 * p, H); X.clip()
      text('Pedro & Inês', 96, 300, { italic: true, weight: 300, size: 132, color: '#EDE6FF', align: 'left', alpha: ia })
      X.restore()
    }
    bigYear(t, 70.3, 76.2, '1355', 96, 300, { color: '#EDE6FF', size: 170 })
    chapter(t, 64.4, 'III', 'INÊS DE CASTRO', { color: '#EDE6FF', dur: 11.5 })
    tag(t, 78.6, 82.6, 'FONTE DAS LÁGRIMAS', 960, 620, { color: '#EDE6FF', len: 0 })
    if (win(t, 78.6, 82.6) > 0) text('the spring of tears', 960, 666, { italic: true, weight: 300, size: 30, color: '#EDE6FF', alpha: win(t, 79.0, 82.6) })
    X.restore()
  }
  if (garden < 1) {
    X.save()
    X.globalAlpha = 1 - garden
    bridge(t)
    X.restore()
  }
}

// Silhuetas: homem de manto, mulher de vestido comprido.
function person(x, y, s, c, kind, t) {
  X.save()
  X.translate(x, y)
  X.scale(kind === 'man' ? s : -s, s)
  X.fillStyle = c
  const br = Math.sin(t * 1.3) * 1.5
  X.beginPath(); X.arc(10, -178 + br * 0.3, 15, 0, TAU); X.fill()
  X.beginPath()
  if (kind === 'man') {
    // manto que cai dos ombros e abre em baixo
    X.moveTo(-6, -160); X.quadraticCurveTo(-22, -156, -26, -134)
    X.quadraticCurveTo(-40, -60, -52, 0); X.lineTo(46, 0)
    X.quadraticCurveTo(40, -70, 34, -134); X.quadraticCurveTo(30, -156, 20, -160)
  } else {
    X.moveTo(-2, -160); X.quadraticCurveTo(-14, -150, -12, -128)
    X.quadraticCurveTo(-8, -110, -10, -96); X.quadraticCurveTo(-34, -40, -58, 0)
    X.lineTo(62, 0); X.quadraticCurveTo(40, -40, 32, -96)
    X.quadraticCurveTo(30, -112, 32, -128); X.quadraticCurveTo(34, -150, 24, -160)
    // cabelo comprido
    X.moveTo(-4, -176); X.quadraticCurveTo(-22, -140, -14, -104); X.lineTo(-2, -150)
  }
  X.closePath(); X.fill()
  // braço estendido para o outro
  X.strokeStyle = c; X.lineWidth = 9; X.lineCap = 'round'
  X.beginPath(); X.moveTo(24, -140); X.quadraticCurveTo(60, -120, 86 + br, -108); X.stroke()
  X.restore()
}

// A ponte Pedro e Inês vista de cima: duas metades desencontradas.
function bridge(t) {
  const t0 = 82.8
  // margens e rio
  X.fillStyle = '#5E7A4C'; X.fillRect(0, 0, W, H)
  const bankA = (x) => 250 + 26 * Math.sin(x * 0.004) + 12 * noise(x * 0.01)
  const bankB = (x) => 830 + 22 * Math.sin(x * 0.003 + 2) + 12 * noise(x * 0.012 + 5)
  X.fillStyle = '#6C8A57'
  X.beginPath(); X.moveTo(0, 0); for (let x = 0; x <= W; x += 20) X.lineTo(x, bankA(x) - 30); X.lineTo(W, 0); X.fill()
  // água
  const g = X.createLinearGradient(0, 250, 0, 830)
  g.addColorStop(0, '#2F6C86'); g.addColorStop(0.5, '#3E86A0'); g.addColorStop(1, '#2A5F78')
  X.fillStyle = g
  X.beginPath()
  X.moveTo(0, bankA(0))
  for (let x = 0; x <= W; x += 20) X.lineTo(x, bankA(x))
  for (let x = W; x >= 0; x -= 20) X.lineTo(x, bankB(x))
  X.fill()
  // correnteza
  const r = rng(3)
  for (let i = 0; i < 140; i++) {
    const y = 280 + r() * 520, l = 30 + r() * 90
    const x = ((r() * (W + 200) - t * (40 + r() * 30)) % (W + 200) + W + 200) % (W + 200) - 100
    X.strokeStyle = `rgba(210,235,245,${0.12 + r() * 0.2})`
    X.lineWidth = 1.5
    X.beginPath(); X.moveTo(x, y); X.quadraticCurveTo(x + l / 2, y + 4 * Math.sin(i), x + l, y); X.stroke()
  }
  // caminhos e árvores nas margens
  X.fillStyle = '#D8CCAE'
  X.fillRect(0, 150, W, 22); X.fillRect(0, 900, W, 22)
  for (let i = 0; i < 26; i++) {
    const x = 40 + i * 76 + r() * 20
    for (const y of [95 + r() * 30, 980 + r() * 40]) {
      X.fillStyle = 'rgba(0,0,0,0.18)'; X.beginPath(); X.arc(x + 8, y + 8, 26, 0, TAU); X.fill()
      X.fillStyle = r() < 0.5 ? '#4E6E3E' : '#587A45'; X.beginPath(); X.arc(x, y, 26, 0, TAU); X.fill()
    }
  }
  // a ponte
  const d = 40 // o desencontro
  const lp = E.sine(prog(t0 + 1.4, t0 + 4.4, t)), fp = E.out(prog(t0 + 3.6, t0 + 5.0, t))
  const half1 = rect(960 - d - 34, 160, 68, 380 - 34)
  const half2 = rect(960 + d - 34, 540 + 34, 68, 912 - 540 - 34)
  const sq = rect(960 - 78, 540 - 60, 156, 120)
  X.fillStyle = `rgba(0,0,0,${0.25 * fp})`
  for (const q of [half1, half2, sq]) { X.save(); X.translate(14, 14); path(q, true); X.fill(); X.restore() }
  for (const q of [half1, half2, sq]) { X.fillStyle = css('#E9E4D8', fp); path(q, true); X.fill() }
  // guardas de vidro colorido
  const cols = ['#E8527A', '#F2C230', '#5BC0BE', '#8E6CCF', '#F28C38']
  for (const [x0, y0, y1] of [[960 - d - 34, 160, 506], [960 - d + 30, 160, 506], [960 + d - 34, 574, 912], [960 + d + 30, 574, 912]]) {
    for (let y = y0; y < y1; y += 18) { X.fillStyle = css(cols[Math.floor(y / 18) % cols.length], 0.85 * fp); X.fillRect(x0, y, 4, 16) }
  }
  drawLines([half1, sq, half2], lp, { color: '#FFFFFF', width: 2.4, glow: 0.4, stagger: 0.2 })
  // dois caminhantes, um de cada margem, encontram-se no quadrado
  const w = E.io(prog(t0 + 4.4, t0 + 9.0, t))
  if (w > 0) {
    const ya = lerp(170, 525, w), yb = lerp(905, 555, w)
    const xa = 960 - d, xb = 960 + d
    for (const [x, y, c] of [[xa, ya, '#2B2A40'], [xb, yb, '#6A2334']]) {
      X.fillStyle = 'rgba(0,0,0,0.25)'; X.beginPath(); X.arc(x + 5, y + 5, 9, 0, TAU); X.fill()
      X.fillStyle = c; X.beginPath(); X.arc(x, y, 9, 0, TAU); X.fill()
    }
    // quando se encontram, um coração pequeno de luz
    const m = smooth(prog(t0 + 8.6, t0 + 9.6, t))
    if (m > 0) glow(960, 540, 90, '#FFD9A8', 0.6 * m)
  }
  // sombra da colina ao fim da tarde
  const sh = X.createLinearGradient(0, 0, W, 0)
  sh.addColorStop(0, 'rgba(20,10,40,0.28)'); sh.addColorStop(1, 'rgba(255,180,120,0.12)')
  X.fillStyle = sh; X.fillRect(0, 0, W, H)
  const la = win(t, t0 + 4.0, 93.6, 0.8)
  if (la > 0) {
    text('PONTE PEDRO E INÊS', 96, 104, { family: 'mono', size: 15, color: '#FFFFFF', align: 'left', spacing: 5, weight: 500, alpha: la })
    X.strokeStyle = css('#FFFFFF', la * 0.8); X.lineWidth = 1.5; X.beginPath(); X.moveTo(96, 122); X.lineTo(376, 122); X.stroke()
    text('2006', 96, 250, { italic: true, weight: 300, size: 120, color: '#FFFFFF', align: 'left', alpha: la })
  }
  // cota do desencontro
  const ca = win(t, t0 + 5.6, 93.6, 0.8)
  if (ca > 0) {
    X.save()
    X.globalAlpha = ca
    X.strokeStyle = '#FFFFFF'; X.lineWidth = 1.3
    X.setLineDash([6, 6])
    X.beginPath(); X.moveTo(960 - d, 120); X.lineTo(960 - d, 440); X.moveTo(960 + d, 640); X.lineTo(960 + d, 960); X.stroke()
    X.setLineDash([])
    X.beginPath(); X.moveTo(960 - d, 700); X.lineTo(960 + d, 700); X.stroke()
    text('never quite in line', 1120, 708, { italic: true, weight: 400, size: 30, color: '#FFFFFF', align: 'left' })
    X.restore()
  }
}
