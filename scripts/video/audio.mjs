// A banda sonora: música original sintetizada, ambientes, efeitos e narração,
// tudo misturado num só ficheiro (.cache/mix.wav, 48 kHz, estéreo, float).
//
//   node scripts/video/audio.mjs
//
// A música é um fado de Coimbra imaginado: guitarra portuguesa (cordas
// duplas, trémulo), viola e baixo por Karplus–Strong; pads, órgão, celesta,
// sino e percussão por síntese aditiva e subtractiva. A 72 bpm, cada
// compasso cai no início de uma cena (ver timeline.mjs).

import { writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SCENES, EVENTS, DURATION, BAR, BEAT, bar, vozes, lerWav } from './timeline.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const SR = 48000
const N = Math.ceil((DURATION + 1) * SR)
const PI = Math.PI, TAU = 2 * PI

let seed = 290
const R = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)
const T = (b, beat = 0) => bar(b) + beat * BEAT
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))

const bus = () => [new Float32Array(N), new Float32Array(N)]
const B = { gtr: bus(), vla: bus(), bass: bus(), pad: bus(), key: bus(), perc: bus(), sfx: bus(), vox: bus() }
const SEND = { gtr: 0.3, vla: 0.22, bass: 0.08, pad: 0.4, key: 0.5, perc: 0.25, sfx: 0.12, vox: 0.05 }

function add(b, t, mono, g = 1, pan = 0) {
  const i0 = Math.round(t * SR)
  const gl = g * Math.cos(((pan + 1) * PI) / 4), gr = g * Math.sin(((pan + 1) * PI) / 4)
  const [L, Rr] = b
  for (let i = 0; i < mono.length; i++) {
    const k = i0 + i
    if (k < 0) continue
    if (k >= N) break
    L[k] += mono[i] * gl
    Rr[k] += mono[i] * gr
  }
}

// ---------- filtros ----------
function biquad(x, type, f, Q = 0.707, db = 0) {
  const A = Math.pow(10, db / 40), w = (TAU * f) / SR, cs = Math.cos(w), sn = Math.sin(w), al = sn / (2 * Q)
  let b0, b1, b2, a0, a1, a2
  if (type === 'lp') { b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al }
  else if (type === 'hp') { b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al }
  else if (type === 'bp') { b0 = al; b1 = 0; b2 = -al; a0 = 1 + al; a1 = -2 * cs; a2 = 1 - al }
  else { b0 = 1 + al * A; b1 = -2 * cs; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * cs; a2 = 1 - al / A }
  b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0
  for (let i = 0; i < x.length; i++) {
    const y = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
    x2 = x1; x1 = x[i]; y2 = y1; y1 = y
    x[i] = y
  }
  return x
}
const eq = (b, ...fs) => { for (const ch of b) for (const f of fs) biquad(ch, ...f) }

// ---------- Karplus–Strong ----------
// t60: tempo até cair 60 dB; bright: brilho do ataque e do filtro do laço.
function string(freq, dur, { t60 = 2.5, bright = 0.6, pick = 0.18, amp = 1 } = {}) {
  const n = Math.floor(dur * SR)
  const out = new Float32Array(n)
  const S = 0.5 - 0.35 * bright // peso da amostra anterior no filtro do laço
  const P = SR / freq
  const L = Math.max(2, Math.floor(P - S - 0.2))
  const d = P - L - S, C = (1 - d) / (1 + d)
  const g = Math.pow(0.001, 1 / (freq * t60))
  const buf = new Float32Array(L)
  let lp = 0
  for (let i = 0; i < L; i++) { lp += (R() * 2 - 1 - lp) * (0.2 + 0.8 * bright); buf[i] = lp }
  const pk = Math.max(1, Math.round(pick * L)), tmp = Float32Array.from(buf)
  let mean = 0
  for (let i = 0; i < L; i++) { buf[i] = tmp[i] - 0.85 * tmp[(i - pk + L) % L]; mean += buf[i] }
  mean /= L
  for (let i = 0; i < L; i++) buf[i] -= mean
  let idx = 0, prev = 0, apx = 0, apy = 0
  for (let i = 0; i < n; i++) {
    const x = buf[idx]
    const f = g * ((1 - S) * x + S * prev)
    prev = x
    const y = C * f + apx - C * apy
    apx = f; apy = y
    buf[idx] = y
    out[i] = x * amp
    idx = idx + 1 === L ? 0 : idx + 1
  }
  const fo = Math.min(n, Math.round(0.03 * SR))
  for (let i = 0; i < fo; i++) out[n - 1 - i] *= i / fo
  const fi = Math.min(n, 24)
  for (let i = 0; i < fi; i++) out[i] *= i / fi
  return out
}

// Guitarra portuguesa: dois fios por ordem, ligeiramente desafinados.
function gtrNote(t, m, dur, vel = 1, pan = 0.05) {
  const f = mtof(m)
  const ring = Math.min(dur + 0.5, 3.2)
  for (const c of [-2.2, 2.2]) add(B.gtr, t + (c > 0 ? 0.004 : 0), string(f * Math.pow(2, c / 1200), ring, { t60: 3.4, bright: 0.88, pick: 0.13, amp: 0.23 * vel }), 1, pan + c * 0.02)
}
// Trémulo: a mão direita repete a nota muito depressa.
function gtrTrem(t, m, dur, vel = 1, pan = 0.05) {
  const f = mtof(m), rate = 1 / 13.5
  let k = 0
  for (let tt = t; tt < t + dur - 0.04; tt += rate, k++) {
    const left = t + dur - tt
    const v = vel * (k % 2 ? 0.62 : 0.8) * (0.9 + R() * 0.2) * (left < 0.4 ? left / 0.4 + 0.3 : 1)
    const ring = Math.min(rate * 2.2, left + 0.25)
    for (const c of [-2.2, 2.2]) add(B.gtr, tt + (R() - 0.5) * 0.004, string(f * Math.pow(2, c / 1200), Math.max(ring, 0.12), { t60: 1.4, bright: 0.84, pick: 0.13, amp: 0.2 * v }), 1, pan + c * 0.02)
  }
  // a última nota fica a soar
  gtrNote(t + dur - 0.02, m, 1.2, vel * 0.45, pan)
}
function violaNote(t, m, dur, vel = 1, pan = -0.25) {
  add(B.vla, t, string(mtof(m), Math.min(dur + 0.8, 3), { t60: 2.2, bright: 0.42, pick: 0.22, amp: 0.2 * vel }), 1, pan)
}
function bassNote(t, m, dur, vel = 1) {
  add(B.bass, t, string(mtof(m), Math.min(dur + 0.4, 3), { t60: 2.0, bright: 0.3, pick: 0.25, amp: 0.34 * vel }), 1, 0)
}

// ---------- sintetizadores ----------
function padChord(t, notes, dur, { amp = 0.05, attack = 1.4, release = 1.8, cutoff = 1500 } = {}) {
  const n = Math.floor((dur + release) * SR)
  for (const m of notes) {
    for (const [dt, pan] of [[-7, -0.5], [0, 0], [7, 0.5]]) {
      const f = mtof(m) * Math.pow(2, dt / 1200)
      const o = new Float32Array(n)
      let ph = R()
      for (let i = 0; i < n; i++) {
        ph += f / SR; if (ph >= 1) ph -= 1
        const tt = i / SR
        const env = Math.min(1, tt / attack) * (tt > dur ? Math.max(0, 1 - (tt - dur) / release) : 1)
        o[i] = (2 * ph - 1) * env * amp
      }
      biquad(o, 'lp', cutoff, 0.6); biquad(o, 'lp', cutoff * 1.3, 0.6)
      add(B.pad, t, o, 1, pan)
    }
  }
}
function organ(t, notes, dur, amp = 0.05) {
  const n = Math.floor((dur + 1.5) * SR)
  for (const m of notes) {
    const f = mtof(m), o = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const tt = i / SR, env = Math.min(1, tt / 1.2) * (tt > dur ? Math.max(0, 1 - (tt - dur) / 1.5) : 1)
      o[i] = env * amp * (Math.sin(TAU * f * tt) + 0.5 * Math.sin(TAU * 2 * f * tt) + 0.3 * Math.sin(TAU * 3 * f * tt) + 0.15 * Math.sin(TAU * 4 * f * tt) + 0.08 * Math.sin(TAU * 6 * f * tt))
    }
    add(B.key, t, o, 1, (R() - 0.5) * 0.6)
  }
}
function celesta(t, m, vel = 1, pan = 0) {
  const f = mtof(m), n = Math.floor(2.4 * SR), o = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const tt = i / SR
    o[i] = vel * 0.09 * (Math.sin(TAU * f * tt) * Math.exp(-tt * 1.8) + 0.35 * Math.sin(TAU * 4 * f * tt) * Math.exp(-tt * 6) + 0.12 * Math.sin(TAU * 2 * f * tt) * Math.exp(-tt * 3)) * Math.min(1, i / 60)
  }
  add(B.key, t, o, 1, pan)
}
function bell(t, prime = 196, amp = 0.32) {
  const parts = [[0.5, 0.55, 6.5], [1, 0.7, 4.8], [1.19, 0.55, 3.6], [1.5, 0.28, 2.6], [2.0, 0.75, 3.0], [2.51, 0.3, 1.8], [3.0, 0.25, 1.4], [4.07, 0.18, 1.0], [5.1, 0.1, 0.7]]
  const n = Math.floor(7 * SR), o = new Float32Array(n)
  for (const [r, a, d] of parts) {
    const f = prime * r * (1 + (R() - 0.5) * 0.002)
    for (let i = 0; i < n; i++) { const tt = i / SR; o[i] += a * Math.sin(TAU * f * tt + r) * Math.exp(-tt / d * 1.1) * (1 + 0.08 * Math.sin(TAU * 1.3 * tt)) }
  }
  const hit = new Float32Array(Math.floor(0.05 * SR))
  for (let i = 0; i < hit.length; i++) hit[i] = (R() * 2 - 1) * Math.exp(-i / 200)
  biquad(hit, 'bp', 2400, 1.2)
  for (let i = 0; i < hit.length; i++) o[i] += hit[i] * 0.8
  for (let i = 0; i < n; i++) o[i] *= amp * Math.min(1, i / 40)
  add(B.key, t, o, 1, 0.15)
}
function timp(t, m = 45, amp = 0.5, dec = 1.6) {
  const f = mtof(m), n = Math.floor(3 * SR), o = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const tt = i / SR, ff = f * (1 + 0.04 * Math.exp(-tt * 20))
    ph += ff / SR
    o[i] = amp * Math.exp(-tt / dec) * (Math.sin(TAU * ph) + 0.35 * Math.sin(TAU * ph * 1.59) * Math.exp(-tt * 2) + 0.2 * Math.sin(TAU * ph * 2.14) * Math.exp(-tt * 3))
  }
  for (let i = 0; i < 400; i++) o[i] += (R() * 2 - 1) * 0.3 * amp * Math.exp(-i / 80)
  add(B.perc, t, o, 1, 0)
}
function roll(t0, t1, m = 45, amp = 0.2) {
  for (let t = t0; t < t1; t += 0.07) timp(t, m, amp * (0.3 + 0.7 * (t - t0) / (t1 - t0)) * (0.8 + R() * 0.2), 0.5)
}
function frameDrum(t, amp = 0.35) {
  const n = Math.floor(0.7 * SR), o = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) { const tt = i / SR; ph += (70 + 60 * Math.exp(-tt * 30)) / SR; o[i] = amp * Math.sin(TAU * ph) * Math.exp(-tt * 6) }
  const s = new Float32Array(1200)
  for (let i = 0; i < s.length; i++) s[i] = (R() * 2 - 1) * Math.exp(-i / 150) * amp * 0.5
  biquad(s, 'bp', 900, 0.8)
  for (let i = 0; i < s.length; i++) o[i] += s[i]
  add(B.perc, t, o, 1, -0.1)
}
function tamb(t, amp = 0.12, pan = 0.3) {
  const n = Math.floor(0.22 * SR), o = new Float32Array(n)
  for (let i = 0; i < n; i++) o[i] = (R() * 2 - 1) * Math.exp(-i / (0.045 * SR))
  biquad(o, 'hp', 6000, 0.7)
  for (let i = 0; i < n; i++) { const tt = i / SR; o[i] = amp * (o[i] + 0.25 * Math.exp(-tt * 30) * (Math.sin(TAU * 7300 * tt) + Math.sin(TAU * 8900 * tt))) }
  add(B.perc, t, o, 1, pan)
}
function noise(dur, color = 'white') {
  const n = Math.floor(dur * SR), o = new Float32Array(n)
  let b = 0, p0 = 0, p1 = 0, p2 = 0
  for (let i = 0; i < n; i++) {
    const w = R() * 2 - 1
    if (color === 'brown') { b = (b + 0.02 * w) / 1.02; o[i] = b * 3.5 }
    else if (color === 'pink') { p0 = 0.99765 * p0 + w * 0.099; p1 = 0.963 * p1 + w * 0.2965; p2 = 0.57 * p2 + w * 1.0527; o[i] = (p0 + p1 + p2 + w * 0.1848) * 0.2 }
    else o[i] = w
  }
  return o
}
function envelope(o, fn) { for (let i = 0; i < o.length; i++) o[i] *= fn(i / SR, i / o.length) }
function whoosh(t, dur = 1.6, amp = 0.16, pan = 0) {
  const o = noise(dur, 'pink')
  // filtro que varre de grave para agudo
  let lo = 0, bp = 0
  for (let i = 0; i < o.length; i++) {
    const u = i / o.length, f = 250 + 3500 * Math.sin(u * PI) ** 2
    const k = 2 * Math.sin((PI * f) / SR)
    lo += k * bp; const hi = o[i] - lo - 0.6 * bp; bp += k * hi
    o[i] = bp * amp * Math.sin(u * PI) ** 1.5
  }
  add(B.sfx, t, o, 1, pan)
}
function swell(t, dur, amp = 0.08) {
  const o = noise(dur, 'white')
  biquad(o, 'hp', 5000, 0.7)
  envelope(o, (tt, u) => amp * u ** 2.5 * (u > 0.97 ? (1 - u) / 0.03 : 1))
  add(B.sfx, t, o, 1, 0)
}
function tick(t, amp = 0.08, pan = 0) {
  const n = 500, o = new Float32Array(n)
  const f = 2200 + R() * 1800
  for (let i = 0; i < n; i++) { const tt = i / SR; o[i] = amp * Math.exp(-tt * 900) * (Math.sin(TAU * f * tt) + (R() * 2 - 1) * 0.6) }
  add(B.sfx, t, o, 1, pan)
}

// ---------- ambientes ----------
function ambRiver(t0, t1, amp = 0.05) {
  const o = noise(t1 - t0, 'pink')
  biquad(o, 'lp', 1400, 0.7); biquad(o, 'hp', 150, 0.7)
  envelope(o, (tt, u) => amp * Math.min(1, tt / 1.5, (t1 - t0 - tt) / 1.5) * (0.75 + 0.25 * Math.sin(tt * 0.9) * Math.sin(tt * 0.37)))
  add(B.sfx, t0, o, 1, -0.2)
  const o2 = noise(t1 - t0, 'pink')
  biquad(o2, 'bp', 2400, 1.5)
  envelope(o2, (tt, u) => amp * 0.5 * Math.min(1, tt / 1.5, (t1 - t0 - tt) / 1.5) * Math.max(0, Math.sin(tt * 3.1) * Math.sin(tt * 1.7)))
  add(B.sfx, t0, o2, 1, 0.35)
  // gotas e borbulhas
  for (let t = t0 + 0.5; t < t1 - 0.5; t += 0.2 + R() * 0.6) {
    const n = Math.floor(0.04 * SR), b = new Float32Array(n), f0 = 500 + R() * 700
    let ph = 0
    for (let i = 0; i < n; i++) { const u = i / n; ph += f0 * (1 + u * 1.5) / SR; b[i] = Math.sin(TAU * ph) * Math.sin(u * PI) * amp * 0.5 }
    add(B.sfx, t, b, 1, R() - 0.5)
  }
}
function ambWind(t0, t1, amp = 0.05) {
  const o = noise(t1 - t0, 'pink')
  let lo = 0, bp = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, f = 350 + 250 * Math.sin(tt * 0.4) + 120 * Math.sin(tt * 1.3)
    const k = 2 * Math.sin((PI * f) / SR)
    lo += k * bp; const hi = o[i] - lo - 1.2 * bp; bp += k * hi
    o[i] = bp * amp * Math.min(1, tt / 2, (t1 - t0 - tt) / 2) * (0.6 + 0.4 * Math.sin(tt * 0.5))
  }
  add(B.sfx, t0, o, 1, 0.1)
}
function crickets(t0, t1, amp = 0.02) {
  for (const [f, pan, per] of [[4400, -0.6, 1.1], [4750, 0.5, 0.85], [4100, 0.1, 1.4]]) {
    for (let t = t0 + R(); t < t1; t += per * (0.85 + R() * 0.3)) {
      const pulses = 3 + Math.floor(R() * 2)
      for (let k = 0; k < pulses; k++) {
        const n = Math.floor(0.018 * SR), o = new Float32Array(n)
        for (let i = 0; i < n; i++) o[i] = Math.sin(TAU * f * i / SR) * Math.sin(PI * i / n) * amp * Math.min(1, (t - t0) / 1.5, (t1 - t) / 1.5)
        add(B.sfx, t + k * 0.034, o, 1, pan)
      }
    }
  }
}
function owl(t, amp = 0.05) {
  for (const [dt, d, f] of [[0, 0.32, 390], [0.55, 0.18, 380], [0.8, 0.5, 370]]) {
    const n = Math.floor(d * SR), o = new Float32Array(n)
    for (let i = 0; i < n; i++) { const u = i / n, tt = i / SR; o[i] = amp * Math.sin(TAU * f * (1 - 0.06 * u) * tt) * Math.sin(u * PI) ** 0.6 }
    add(B.sfx, t + dt, o, 1, 0.6)
  }
}
function birds(t0, t1, density = 0.6, amp = 0.025) {
  for (let t = t0 + R(); t < t1; t += (1.5 + R() * 3) / density) {
    const f0 = 2800 + R() * 2200, notes = 2 + Math.floor(R() * 4), pan = R() * 1.4 - 0.7
    for (let k = 0; k < notes; k++) {
      const n = Math.floor((0.05 + R() * 0.05) * SR), o = new Float32Array(n)
      let ph = 0
      const up = R() < 0.5
      for (let i = 0; i < n; i++) { const u = i / n; ph += f0 * (up ? 1 + 0.35 * u : 1.3 - 0.35 * u) / SR; o[i] = amp * Math.sin(TAU * ph) * Math.sin(u * PI) }
      add(B.sfx, t + k * 0.09, o, 1, pan)
    }
  }
}
function fire(t0, t1, amp = 0.06) {
  const o = noise(t1 - t0, 'brown')
  biquad(o, 'lp', 300, 0.7)
  envelope(o, (tt) => amp * 1.5 * Math.min(1, tt / 1, (t1 - t0 - tt) / 1.5))
  add(B.sfx, t0, o, 1, 0)
  for (let t = t0; t < t1; t += R() * 0.07) {
    const n = Math.floor((0.002 + R() * 0.006) * SR), c = new Float32Array(n)
    for (let i = 0; i < n; i++) c[i] = (R() * 2 - 1) * Math.exp(-i / (n / 3))
    biquad(c, 'bp', 1200 + R() * 3500, 1)
    const g = amp * (0.5 + R() * 2.5) * Math.min(1, (t - t0) / 1, (t1 - t) / 1.5)
    add(B.sfx, t, c, g * 3, (R() - 0.5) * 0.8)
  }
}
function crowd(t0, t1, amp = 0.03) {
  for (let v = 0; v < 10; v++) {
    const o = noise(t1 - t0, 'pink')
    const f = 400 + R() * 1200
    biquad(o, 'bp', f, 2.5)
    biquad(o, 'bp', f * 2.3, 1.5)
    const rate = 3 + R() * 3, ph = R() * 10
    envelope(o, (tt) => amp * 4 * Math.min(1, tt / 1.5, (t1 - t0 - tt) / 1.5) * Math.max(0, Math.sin(tt * rate + ph) * Math.sin(tt * rate * 0.37 + ph * 2)) ** 0.7)
    add(B.sfx, t0, o, 1, R() * 1.6 - 0.8)
  }
}
function flutter(t, dur = 0.6, amp = 0.05, pan = 0) {
  const o = noise(dur, 'pink')
  biquad(o, 'bp', 700, 1)
  envelope(o, (tt, u) => amp * Math.abs(Math.sin(tt * 2 * PI * 11)) * Math.sin(u * PI))
  add(B.sfx, t, o, 1, pan)
}

// ---------- harmonia ----------
const CH = {
  Am: [45, [57, 60, 64, 69]], Dm: [38, [57, 62, 65, 69]], E: [40, [56, 59, 64, 68]], 'E/G#': [44, [56, 59, 64, 68]],
  F: [41, [57, 60, 65, 69]], G: [43, [55, 59, 62, 67]], 'G/B': [47, [55, 59, 62, 67]], C: [48, [55, 60, 64, 67]],
  'C/E': [40, [55, 60, 64, 67]], 'D/F#': [42, [57, 62, 66, 69]], 'Em/G': [43, [55, 59, 64, 67]], Dm7: [38, [57, 60, 62, 65]],
  A: [45, [57, 61, 64, 69]],
}
const PROG = [
  'Am', 'Am', 'F', 'E', 'Am', // 0–4 o rio
  'Dm', 'Am', 'Dm', 'E', 'F', 'Am', 'E', // 5–11 Aeminium
  'Am', 'F', 'C', 'G', 'F', 'Dm', 'E', // 12–18 o reino
  'Am', 'E/G#', 'G', 'D/F#', 'F', 'C/E', 'Dm', 'E', 'Am', // 19–27 Inês
  'C', 'G/B', 'Am', 'Em/G', 'F', 'C/E', 'Dm7', 'G', 'Am', 'F', 'C', 'G', 'E', // 28–40 universidade
  'Am', 'G', 'F', 'E', // 41–44 Queima
  'Am', 'F', 'E', null, null, // 45–49 serenata e silêncio
  'F', 'G', 'A', 'A', // 50–53 fim
]

// Melodias da guitarra: [tempo no compasso, nota, duração, trémulo?]
const MEL = {
  0: [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 0.5], [2.5, 71, 0.5], [3, 72, 1]],
  1: [[0, 69, 1], [1, 72, 0.5], [1.5, 76, 0.5], [2, 81, 2, 1]],
  2: [[0, 79, 0.5], [0.5, 77, 0.5], [1, 76, 0.5], [1.5, 74, 0.5], [2, 72, 1], [3, 69, 1]],
  3: [[0, 71, 1.5], [1.5, 72, 0.5], [2, 71, 0.5], [2.5, 68, 0.5], [3, 64, 1]],
  4: [[0, 69, 3.6, 1]],
  5: [[0, 69, 1], [1, 74, 1], [2, 72, 0.5], [2.5, 71, 0.5], [3, 69, 1]],
  6: [[0, 72, 2, 1], [2, 71, 1], [3, 69, 1]],
  7: [[0, 77, 1.5], [1.5, 76, 0.5], [2, 74, 2, 1]],
  8: [[0, 71, 1], [1, 68, 1], [2, 64, 2]],
  11: [[2, 71, 0.5], [2.5, 74, 0.5], [3, 76, 1]],
  12: [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 0.5], [2.5, 71, 0.5], [3, 72, 1]],
  13: [[0, 72, 1], [1, 77, 1], [2, 81, 2, 1]],
  14: [[0, 79, 1.5], [1.5, 77, 0.5], [2, 76, 1], [3, 72, 1]],
  15: [[0, 74, 2, 1], [2, 79, 1], [3, 74, 1]],
  16: [[0, 77, 1], [1, 76, 1], [2, 72, 2, 1]],
  19: [[0, 76, 2, 1], [2, 72, 1], [3, 74, 1]],
  20: [[0, 71, 3, 1], [3, 76, 1]],
  21: [[0, 74, 1.5], [1.5, 76, 0.5], [2, 74, 1], [3, 71, 1]],
  22: [[0, 69, 2, 1], [2, 74, 1], [3, 76, 1]],
  23: [[0, 77, 2, 1], [2, 76, 0.5], [2.5, 74, 0.5], [3, 72, 1]],
  24: [[0, 76, 1], [1, 79, 1], [2, 76, 1], [3, 72, 1]],
  25: [[0, 74, 1.5], [1.5, 77, 0.5], [2, 81, 2, 1]],
  26: [[0, 80, 1.5, 1], [1.5, 77, 0.5], [2, 76, 2, 1]],
  27: [[0, 69, 3.5, 1]],
  28: [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 0.5], [2.5, 74, 0.5], [3, 76, 1]],
  29: [[0, 74, 1], [1, 79, 1], [2, 74, 2, 1]],
  30: [[0, 72, 1.5], [1.5, 71, 0.5], [2, 69, 1], [3, 72, 1]],
  31: [[0, 71, 2, 1], [2, 67, 2]],
  32: [[0, 69, 1], [1, 72, 1], [2, 77, 2, 1]],
  33: [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 2, 1]],
  38: [[0, 79, 1], [1, 76, 1], [2, 84, 2, 1]],
  39: [[0, 83, 1], [1, 79, 1], [2, 74, 2, 1]],
  40: [[0, 80, 2, 1], [2, 76, 2]],
  41: [[0, 76, 0.5], [0.5, 74, 0.5], [1, 72, 0.5], [1.5, 71, 0.5], [2, 72, 0.5], [2.5, 76, 0.5], [3, 81, 1, 1]],
  42: [[0, 79, 0.5], [0.5, 77, 0.5], [1, 76, 0.5], [1.5, 74, 0.5], [2, 71, 0.5], [2.5, 74, 0.5], [3, 79, 1, 1]],
  43: [[0, 77, 0.5], [0.5, 76, 0.5], [1, 74, 0.5], [1.5, 72, 0.5], [2, 69, 0.5], [2.5, 72, 0.5], [3, 77, 1, 1]],
  44: [[0, 76, 2.5, 1]],
  45: [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 0.5], [2.5, 71, 0.5], [3, 72, 1]],
  46: [[0, 79, 0.5], [0.5, 77, 0.5], [1, 76, 0.5], [1.5, 74, 0.5], [2, 72, 1], [3, 69, 1]],
  47: [[0, 71, 1], [1, 68, 1], [2, 69, 1.4, 1]],
  50: [[0, 69, 1], [1, 72, 1], [2, 77, 1.5, 1], [3.5, 76, 0.5]],
  51: [[0, 74, 1], [1, 71, 1], [2, 74, 1], [3, 79, 1]],
  52: [[0, 76, 1], [1, 73, 1], [2, 69, 5, 1]],
}
// Dinâmica da guitarra por compasso (a narração tem prioridade; o duck trata do resto).
const GVEL = (b) => (b <= 4 ? 0.9 : b <= 11 ? 0.7 : b <= 18 ? 0.85 : b <= 27 ? 0.9 : b <= 40 ? 0.85 : b <= 44 ? 0.95 : b <= 47 ? 1 : 0.9)

function score() {
  for (let b = 0; b < PROG.length; b++) {
    const ch = PROG[b]
    if (!ch) continue
    const [root, tones] = CH[ch]
    const t0 = T(b)
    const hum = () => (R() - 0.5) * 0.012

    // guitarra
    for (const [bt, m, d, tr] of MEL[b] || []) {
      const t = T(b, bt) + hum()
      const v = GVEL(b) * (0.85 + R() * 0.15)
      tr ? gtrTrem(t, m, d * BEAT, v) : gtrNote(t, m, d * BEAT, v)
    }

    // viola: arpejo (ou rasgado na Queima)
    const queima = b >= 41 && b <= 43
    const noViola = b === 0 || b === 9 && false || (b >= 34 && b <= 37) || b >= 48
    if (queima) {
      for (let k = 0; k < 8; k++) {
        const acc = k % 2 === 0 ? 1 : 0.6
        tones.forEach((m, j) => violaNote(T(b, k * 0.5) + j * 0.012 + hum(), m, 0.45, acc * 0.7, -0.3))
      }
    } else if (!noViola) {
      const pat = [null, 0, 1, 2, 'b', 1, 2, 3]
      const soft = b >= 45 ? 0.75 : b <= 4 ? 0.55 : b >= 19 && b <= 27 ? 0.6 : 0.7
      pat.forEach((p, k) => {
        if (b === 47 && k >= 4) return
        const t = T(b, k * 0.5) + hum()
        if (p === null) return
        const m = p === 'b' ? root + 19 : tones[p]
        violaNote(t, m, BEAT, soft * (k === 4 ? 0.8 : 0.62))
      })
    }
    // baixo
    const noBass = b === 0 || (b >= 34 && b <= 37) || b >= 48
    if (!noBass) {
      bassNote(t0 + hum(), root, 2 * BEAT, b <= 4 ? 0.7 : 0.9)
      if (b !== 47 && b < 52) bassNote(T(b, 2) + hum(), queima ? root : root + 7, 2 * BEAT, 0.7)
    }
    // pads por secção
    const pd = b <= 4 ? [0.028, 1100] : b <= 11 ? [0.04, 1300] : b <= 16 ? [0.05, 1900] : b <= 18 ? null : b <= 27 ? [0.028, 1000] : b <= 40 ? [0.045, 1700] : b <= 44 ? [0.035, 1600] : b <= 47 ? null : [0.06, 1500]
    if (pd) padChord(t0, tones.map((m) => m - 12).concat([tones[1]]), BAR, { amp: pd[0], cutoff: pd[1], attack: b === 50 ? 2.2 : 1.1, release: b >= 52 ? 3.5 : 1.4 })
  }
  // fim da serenata: o último acorde, e depois silêncio
  for (const m of [45, 57, 60, 64, 69]) violaNote(T(47, 2) + (m - 45) * 0.004, m, 2.2, 0.75)
  // o acorde final fica até ao fim
  padChord(T(52), [45, 52, 57, 61, 64], DURATION - T(52) - 1.5, { amp: 0.05, cutoff: 1300, attack: 0.6, release: 3.5 })
  bassNote(T(52), 33, 4, 0.8)
  for (const m of [57, 61, 64, 69]) violaNote(T(52) + (m - 57) * 0.02, m, 4, 0.6)
  celesta(T(52, 6.5), 93, 0.5, 0.2)
  celesta(T(52, 6.5) + 0.01, 88, 0.35, -0.2)

  // bordão grave na abertura
  padChord(0.2, [33, 45], 15.5, { amp: 0.035, cutoff: 500, attack: 3, release: 2.5 })
  // percussão romana: tambor de moldura
  for (let b = 5; b <= 9; b++) for (const bt of [0, 1.5, 2]) frameDrum(T(b, bt), bt === 0 ? 0.3 : 0.18)
  // o reino entra com timbales
  roll(T(11, 1.5), T(12) - 0.05, 45, 0.16)
  timp(T(12), 45, 0.36, 2.2); timp(T(14), 48, 0.28, 1.8); timp(T(15, 2), 43, 0.25, 1.5)
  // órgão em Santa Cruz
  organ(T(17), [45, 57, 60, 64], BAR * 2 + 0.5, 0.03)
  // o vaivém da universidade: um toque por salto
  ;[[96.9, 81], [97.8, 76], [98.7, 84], [99.6, 79]].forEach(([t, m]) => celesta(t, m, 0.6, m % 2 ? 0.4 : -0.4))
  celesta(101.2, 88, 0.8, 0.3); celesta(101.21, 81, 0.6, -0.3); timp(101.2, 48, 0.3, 1.2)
  // o sino, a Cabra
  for (const t of EVENTS.sino) { bell(t, 220, 0.2); for (let k = 0; k < 3; k++) flutter(t + 0.25 + k * 0.18, 0.5, 0.035, (k - 1) * 0.6) }
  // a Joanina: celesta em arpejo; à noite, notas graves e soltas
  for (let b = 35; b <= 35; b++) [67, 71, 74, 79, 83, 86, 83, 79].forEach((m, k) => celesta(T(b, k * 0.5), m, 0.55, (k % 2 ? 0.3 : -0.3)))
  ;[[36, 0, 57], [36, 1.5, 60], [36, 3, 64], [37, 0, 65], [37, 2, 69]].forEach(([b, bt, m]) => violaNote(T(b, bt), m - 12, BEAT, 0.8, 0.3))
  for (const [b, bt, m] of [[37, 0.5, 81], [37, 1.5, 77], [37, 2.5, 72], [37, 3.5, 84]]) celesta(T(b, bt), m, 0.45)
  padChord(T(34), [50, 57, 60, 62], BAR * 4, { amp: 0.035, cutoff: 1200, attack: 2, release: 2 })
  for (let k = 0; k < 7; k++) flutter(121.8 + k * 0.9 + R() * 0.5, 0.35, 0.025, R() * 1.6 - 0.8)
  // Queima: pandeireta e tambor
  for (let b = 41; b <= 43; b++) for (let k = 0; k < 8; k++) {
    tamb(T(b, k * 0.5), k % 2 ? 0.06 : k === 2 || k === 6 ? 0.13 : 0.09, k % 2 ? 0.35 : -0.2)
    if (k === 0 || k === 4 || k === 5) frameDrum(T(b, k * 0.5), 0.26)
  }
  timp(T(44), 40, 0.35, 2)
}

// ---------- efeitos com hora marcada ----------
function sfx() {
  ambWind(0.3, 11, 0.045)
  ambRiver(6, 18, 0.05)
  swell(10.8, 2.4, 0.05) // a colina a nascer
  // passagens entre cenas
  for (const s of SCENES.slice(1)) whoosh(s.start - 0.8, 1.7, 0.14, 0)
  // CONIMBRIGA: letras a chegar, três a cair, COIMBRA a assentar
  const pent = [69, 72, 74, 76, 79, 81, 84, 86, 88, 91]
  pent.forEach((m, i) => celesta(30.6 + i * 0.07 + 1.0, m, 0.35, (i - 4.5) / 6))
  ;[[34.05, 76], [34.2, 72], [34.35, 67]].forEach(([t, m]) => celesta(t, m, 0.4, 0))
  ;[69, 72, 76, 81].forEach((m, i) => celesta(35.8 + i * 0.03, m, 0.5, (i - 1.5) / 3))
  // o reino: cidade de dia
  birds(40, 56, 0.7)
  ambRiver(40, 57, 0.025)
  swell(47.8, 3, 0.04) // o mapa a encher-se
  // Inês: noite, grilos, coruja, água
  crickets(63.5, 83.5, 0.018)
  owl(67.2, 0.04)
  ambRiver(76.5, 83, 0.03)
  ambRiver(83, 93.5, 0.045)
  celesta(91.5, 81, 0.5, -0.2); celesta(91.52, 88, 0.4, 0.2) // o encontro na ponte
  // azulejos a virar
  const tr = SCENES[4].start, dur = 1.9
  for (let j = 0; j < 9; j++) for (let i = 0; i < 16; i++) {
    const d = (i + j * 0.9) / (16 + 9 * 0.9)
    const p = (0.5 + 0.6 * d) / 1.6
    if (p < 1) tick(tr - dur / 2 + p * dur + (R() - 0.5) * 0.01, 0.05, (i - 7.5) / 9)
  }
  birds(93, 110, 0.5)
  // Queima: fogo, multidão, confetes
  fire(137, 148.5, 0.05)
  crowd(137, 148, 0.022)
  swell(144.4, 1.4, 0.07)
  whoosh(144.6, 1.8, 0.2, 0)
  // serenata: a noite em silêncio
  crickets(149, 167, 0.008)
  // o nascer do dia
  birds(168, 177, 0.4, 0.018)
  ambRiver(166.5, 177.8, 0.03)
}

// ---------- vozes ----------
function voices() {
  const rms = (a) => Math.sqrt(a.reduce((s, x) => s + x * x, 0) / a.length)
  for (const v of vozes()) {
    const a = Math.floor(v.corte[0] * v.taxa), z = Math.floor(v.corte[1] * v.taxa)
    const seg = v.amostras.slice(a, z)
    biquad(seg, 'hp', 70, 0.7)
    biquad(seg, 'pk', 3200, 1, 1.5)
    const g = 0.15 / rms(seg)
    add(B.vox, v.t0, seg, g, 0)
  }
  // o público, baixinho, espalhado pela praça
  EVENTS.pigarros.forEach((t, i) => {
    const { amostras } = lerWav(join(AQUI, '.cache', 'vo', `ahem${i + 1}.wav`))
    let a = 0, z = amostras.length - 1
    while (a < z && Math.abs(amostras[a]) < 0.01) a++
    while (z > a && Math.abs(amostras[z]) < 0.01) z--
    const seg = amostras.slice(Math.max(0, a - 200), z + 2000)
    biquad(seg, 'lp', 3200, 0.7)
    biquad(seg, 'hp', 150, 0.7)
    add(B.sfx, t, seg, 0.028 / rms(seg), [-0.55, 0.5, -0.1][i])
  })
}

// ---------- reverberação (Freeverb) ----------
function freeverb(inL, inR, { room = 0.86, damp = 0.35 } = {}) {
  const sc = SR / 44100
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((x) => Math.round(x * sc))
  const aps = [556, 441, 341, 225].map((x) => Math.round(x * sc))
  const outL = new Float32Array(N), outR = new Float32Array(N)
  for (const [inp, out, spread] of [[inL, outL, 0], [inR, outR, Math.round(23 * sc)]]) {
    const cb = combs.map((l) => ({ b: new Float32Array(l + spread), i: 0, s: 0 }))
    const ab = aps.map((l) => ({ b: new Float32Array(l + spread), i: 0 }))
    for (let n = 0; n < N; n++) {
      const x = (inp[n] + (inp === inL ? inR[n] : inL[n])) * 0.5 * 0.03
      let y = 0
      for (const c of cb) {
        const o = c.b[c.i]
        c.s = o * (1 - damp) + c.s * damp
        c.b[c.i] = x + c.s * room
        c.i = c.i + 1 === c.b.length ? 0 : c.i + 1
        y += o
      }
      for (const a of ab) {
        const o = a.b[a.i]
        a.b[a.i] = y + o * 0.5
        a.i = a.i + 1 === a.b.length ? 0 : a.i + 1
        y = o - y
      }
      out[n] = y
    }
  }
  return [outL, outR]
}

// ---------- mistura ----------
console.time('síntese')
score()
sfx()
voices()
console.timeEnd('síntese')

// timbre de cada instrumento
eq(B.gtr, ['hp', 140, 0.7], ['pk', 420, 1.2, 2], ['pk', 3000, 1, 3.5], ['lp', 9000, 0.7])
eq(B.vla, ['hp', 90, 0.7], ['pk', 220, 1, 2.5], ['lp', 4200, 0.7])
eq(B.bass, ['lp', 900, 0.7], ['pk', 90, 1, 2])
eq(B.pad, ['hp', 80, 0.7])

const sendL = new Float32Array(N), sendR = new Float32Array(N)
for (const k in B) {
  const s = SEND[k]
  for (let i = 0; i < N; i++) { sendL[i] += B[k][0][i] * s; sendR[i] += B[k][1][i] * s }
}
console.time('reverb')
const [rvL, rvR] = freeverb(sendL, sendR)
console.timeEnd('reverb')

// envolvente da voz para baixar a música debaixo dela
const env = new Float32Array(N)
{
  let e = 0
  const at = Math.exp(-1 / (0.03 * SR)), rl = Math.exp(-1 / (0.6 * SR))
  for (let i = 0; i < N; i++) {
    const x = Math.abs(B.vox[0][i]) + Math.abs(B.vox[1][i])
    e = x > e ? at * e + (1 - at) * x : rl * e + (1 - rl) * x
    env[i] = e
  }
  // segurar: entre frases próximas não voltar a subir
  let mx = 0
  for (let i = 0; i < N; i++) mx = Math.max(mx, env[i])
  for (let i = 0; i < N; i++) env[i] = clamp(env[i] / (mx * 0.18))
}
const L = new Float32Array(N), Rr = new Float32Array(N)
const music = ['gtr', 'vla', 'bass', 'pad', 'key', 'perc']
for (let i = 0; i < N; i++) {
  const dk = 1 - 0.74 * env[i] // ≈ −12 dB debaixo da voz
  const ds = 1 - 0.55 * env[i]
  let l = 0, r = 0
  for (const k of music) { l += B[k][0][i]; r += B[k][1][i] }
  l = l * dk + rvL[i] * 2.2 * dk + B.sfx[0][i] * ds + B.vox[0][i]
  r = r * dk + rvR[i] * 2.2 * dk + B.sfx[1][i] * ds + B.vox[1][i]
  L[i] = l; Rr[i] = r
}
// relatório: voz contra o resto, durante cada fala
{
  const db = (a) => (10 * Math.log10(a + 1e-12)).toFixed(1)
  for (const v of vozes()) {
    const a = Math.floor(v.t0 * SR), z = Math.floor(v.t1 * SR)
    let ev = 0, eb = 0
    for (let i = a; i < z; i++) { const vv = B.vox[0][i] + B.vox[1][i]; ev += vv * vv; const m = L[i] + Rr[i] - vv; eb += m * m }
    console.log(v.id.padEnd(13), 'voz/fundo', db(ev / eb), 'dB')
  }
}
// saída a negro no fim
const fadeN = Math.floor(2.4 * SR), endN = Math.floor(DURATION * SR)
for (let i = 0; i < N; i++) {
  const g = i > endN ? 0 : i > endN - fadeN ? (endN - i) / fadeN : 1
  L[i] *= g; Rr[i] *= g
}
// limitador suave
let peak = 0
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(Rr[i]))
const pre = 0.89 / peak
for (let i = 0; i < N; i++) { L[i] *= pre; Rr[i] *= pre }

// WAV float 32
const n = endN
const buf = Buffer.alloc(44 + n * 8)
buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 8, 4); buf.write('WAVE', 8)
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(3, 20); buf.writeUInt16LE(2, 22)
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 8, 28); buf.writeUInt16LE(8, 32); buf.writeUInt16LE(32, 34)
buf.write('data', 36); buf.writeUInt32LE(n * 8, 40)
for (let i = 0; i < n; i++) { buf.writeFloatLE(L[i], 44 + i * 8); buf.writeFloatLE(Rr[i], 48 + i * 8) }
writeFileSync(join(AQUI, '.cache', 'mix.wav'), buf)
console.log('mix.wav', (n / SR).toFixed(2), 's, pico antes de normalizar', peak.toFixed(3))
