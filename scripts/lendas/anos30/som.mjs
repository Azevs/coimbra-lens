// O som das lendas: uma pequena banda de desenho animado dos anos 30 e os
// efeitos de estúdio da época, tudo sintetizado. Cada função devolve um
// Float32Array mono (48 kHz) que a partitura põe no sítio com add().

import { readFileSync, writeFileSync } from 'node:fs'

export const SR = 48000
const TAU = 2 * Math.PI
let semente = 1930
export const R = () => { semente = (semente * 1664525 + 1013904223) >>> 0; return semente / 4294967296 }
export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12)
const buf = (s) => new Float32Array(Math.max(1, Math.floor(s * SR)))

export function mesa(dur) { const N = Math.ceil(dur * SR); return { N, mus: new Float32Array(N), sfx: new Float32Array(N), vox: new Float32Array(N) } }
export function add(b, t, x, g = 1) { const i0 = Math.round(t * SR); for (let i = 0; i < x.length; i++) { const k = i0 + i; if (k < 0) continue; if (k >= b.length) break; b[k] += x[i] * g } }

// ---------- filtros ----------
export function biquad(x, type, f, Q = 0.707) {
  const w = (TAU * f) / SR, cs = Math.cos(w), sn = Math.sin(w), al = sn / (2 * Q)
  let b0, b1, b2, a0 = 1 + al, a1 = -2 * cs, a2 = 1 - al
  if (type === 'lp') { b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = b0 }
  else if (type === 'hp') { b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = b0 }
  else { b0 = al; b1 = 0; b2 = -al }
  b0 /= a0; b1 /= a0; b2 /= a0; a1 /= a0; a2 /= a0
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0
  for (let i = 0; i < x.length; i++) { const y = b0 * x[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2; x2 = x1; x1 = x[i]; y2 = y1; y1 = y; x[i] = y }
  return x
}
// sala pequena (Schroeder): quatro pentes e dois passa-tudo
export function sala(x, { tam = 1, fb = 0.76, amort = 0.35 } = {}) {
  const out = new Float32Array(x.length)
  for (const d0 of [1557, 1617, 1491, 1422]) {
    const d = Math.round(d0 * tam), l = new Float32Array(d); let p = 0, lp = 0
    for (let i = 0; i < x.length; i++) { const y = l[p]; lp = y * (1 - amort) + lp * amort; l[p] = x[i] + lp * fb; p = (p + 1) % d; out[i] += y * 0.25 }
  }
  for (const d0 of [225, 556]) {
    const d = Math.round(d0 * tam), l = new Float32Array(d); let p = 0
    for (let i = 0; i < out.length; i++) { const b = l[p], y = -out[i] + b; l[p] = out[i] + b * 0.5; p = (p + 1) % d; out[i] = y }
  }
  return out
}

// ---------- cordas dedilhadas (Karplus–Strong) ----------
export function corda(freq, dur, { t60 = 1, bright = 0.7, pick = 0.15, amp = 1 } = {}) {
  const n = Math.floor(dur * SR), out = new Float32Array(n)
  const S = 0.5 - 0.35 * bright, P = SR / freq, L = Math.max(2, Math.floor(P - S - 0.2))
  const d = P - L - S, C = (1 - d) / (1 + d), g = Math.pow(0.001, 1 / (freq * t60))
  const b = new Float32Array(L); let lp = 0
  for (let i = 0; i < L; i++) { lp += (R() * 2 - 1 - lp) * (0.2 + 0.8 * bright); b[i] = lp }
  const pk = Math.max(1, Math.round(pick * L)), tmp = Float32Array.from(b); let m = 0
  for (let i = 0; i < L; i++) { b[i] = tmp[i] - 0.85 * tmp[(i - pk + L) % L]; m += b[i] }
  m /= L; for (let i = 0; i < L; i++) b[i] -= m
  let idx = 0, prev = 0, apx = 0, apy = 0
  for (let i = 0; i < n; i++) {
    const x = b[idx], f = g * ((1 - S) * x + S * prev); prev = x
    const y = C * f + apx - C * apy; apx = f; apy = y; b[idx] = y
    out[i] = x * amp; idx = idx + 1 === L ? 0 : idx + 1
  }
  const fo = Math.min(n, 1200); for (let i = 0; i < fo; i++) out[n - 1 - i] *= i / fo
  return out
}

// ---------- a banda ----------
export function tuba(m, dur, vel = 1) {
  const f = mtof(m), o = buf(dur + 0.14), A = [1, 0.75, 0.5, 0.32, 0.2, 0.12, 0.07]; let ph = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR; ph += (f * (1 - 0.02 * Math.exp(-tt * 28))) / SR
    const env = Math.min(1, tt / 0.02) * (tt < dur ? 1 - 0.3 * (tt / dur) : Math.exp(-(tt - dur) * 30))
    const br = 0.45 + 0.55 * Math.min(1, tt / 0.04)
    let s = 0; for (let k = 0; k < A.length; k++) s += A[k] * Math.sin(TAU * (k + 1) * ph) * (k > 1 ? br : 1)
    o[i] = Math.tanh(s * 0.8) * env * 0.2 * vel
  }
  return biquad(o, 'lp', 950)
}
export function banjo(m, vel = 1) { return biquad(corda(mtof(m), 0.8, { t60: 0.45, bright: 0.96, pick: 0.09, amp: 0.13 * vel }), 'hp', 180) }
export function clarinete(m, dur, vel = 1) {
  const f = mtof(m), o = buf(dur + 0.12), H = [[1, 1], [2, 0.06], [3, 0.45], [4, 0.04], [5, 0.25], [6, 0.02], [7, 0.12], [9, 0.05]]; let ph = 0, ns = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, vib = 1 + 0.005 * Math.min(1, Math.max(0, (tt - 0.18) / 0.2)) * Math.sin(TAU * 5.3 * tt); ph += (f * vib) / SR
    const env = Math.min(1, tt / 0.035) * (tt < dur ? 1 : Math.max(0, 1 - (tt - dur) / 0.1))
    let s = 0; for (const [k, a] of H) s += a * Math.sin(TAU * k * ph)
    ns += (R() * 2 - 1 - ns) * 0.3
    o[i] = (s * 0.12 + ns * 0.01) * env * vel
  }
  return biquad(o, 'lp', 4200)
}
export function trompete(m, dur, vel = 1) {
  const f = mtof(m), o = buf(dur + 0.1); let ph = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, vib = 1 + 0.006 * Math.min(1, Math.max(0, (tt - 0.15) / 0.2)) * Math.sin(TAU * 5.8 * tt); ph += (f * vib * (1 - 0.01 * Math.exp(-tt * 40))) / SR
    const env = Math.min(1, tt / 0.025) * (tt < dur ? 1 - 0.15 * (tt / dur) : Math.max(0, 1 - (tt - dur) / 0.08))
    let s = 0; for (let k = 1; k <= 14; k++) s += Math.sin(TAU * k * ph) / k
    o[i] = s * env * 0.09 * vel
  }
  const wah = Float32Array.from(o); biquad(wah, 'bp', 1100, 1.4)
  for (let i = 0; i < o.length; i++) o[i] = o[i] * 0.35 + wah[i] * 1.4
  return biquad(o, 'lp', 5000)
}
export function xilofone(m, vel = 1) {
  const f = mtof(m), o = buf(0.9)
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR
    o[i] = (Math.sin(TAU * f * tt) * Math.exp(-tt / 0.45) + 0.35 * Math.sin(TAU * 3.93 * f * tt) * Math.exp(-tt / 0.1) + 0.12 * Math.sin(TAU * 9.2 * f * tt) * Math.exp(-tt / 0.035)) * 0.15 * vel
    if (i < 150) o[i] += (R() * 2 - 1) * 0.08 * vel * (1 - i / 150)
  }
  return o
}
export function celesta(m, vel = 1) {
  const f = mtof(m), o = buf(2.2)
  for (let i = 0; i < o.length; i++) { const tt = i / SR; o[i] = vel * 0.08 * (Math.sin(TAU * f * tt) * Math.exp(-tt * 1.8) + 0.35 * Math.sin(TAU * 4 * f * tt) * Math.exp(-tt * 6) + 0.12 * Math.sin(TAU * 2 * f * tt) * Math.exp(-tt * 3)) * Math.min(1, i / 60) }
  return o
}
export function cordas(notas, dur, amp = 0.022, ataque = 0.5) {
  const o = buf(dur + 0.8)
  for (const m of notas) for (const dt of [-6, 0, 6]) {
    const f = mtof(m) * Math.pow(2, dt / 1200); let ph = R()
    for (let i = 0; i < o.length; i++) {
      const tt = i / SR; ph += (f * (1 + 0.004 * Math.sin(TAU * 5.1 * tt + dt))) / SR; ph -= Math.floor(ph)
      const env = Math.min(1, tt / ataque) * (tt > dur ? Math.max(0, 1 - (tt - dur) / 0.8) : 1)
      o[i] += (2 * ph - 1) * env * amp
    }
  }
  biquad(o, 'lp', 2400); return biquad(o, 'lp', 3000)
}
export function harpa(m, vel = 1) { return corda(mtof(m), 1.6, { t60: 1.6, bright: 0.72, pick: 0.2, amp: 0.12 * vel }) }
export function bombo(vel = 1) {
  const o = buf(0.4); let ph = 0
  for (let i = 0; i < o.length; i++) { const tt = i / SR; ph += (55 + 50 * Math.exp(-tt * 35)) / SR; o[i] = Math.sin(TAU * ph) * Math.exp(-tt * 9) * 0.45 * vel }
  return o
}
const ruido = (s, env) => { const o = buf(s); for (let i = 0; i < o.length; i++) o[i] = (R() * 2 - 1) * env(i / SR); return o }
export function escova(vel = 1) { return biquad(ruido(0.16, (t) => Math.min(1, t / 0.015) * Math.exp(-t * 22) * 0.07 * vel), 'hp', 2600) }
export function bloco(alto = true, vel = 1) {
  const f = alto ? 1250 : 880, o = ruido(0.08, (t) => Math.exp(-t * 90) * 0.06 * vel); biquad(o, 'bp', f * 1.5, 3)
  for (let i = 0; i < o.length; i++) { const tt = i / SR; o[i] += Math.sin(TAU * f * tt) * Math.exp(-tt * 60) * 0.2 * vel }
  return o
}
export function prato(vel = 1, dec = 1.2) {
  const a = ruido(dec, (t) => Math.exp((-6.9 * t) / dec) * 0.1 * vel), b = Float32Array.from(a)
  biquad(a, 'hp', 5200); biquad(b, 'bp', 7600, 2)
  for (let i = 0; i < a.length; i++) a[i] = a[i] * 0.7 + b[i] * 1.2
  return a
}

// ---------- efeitos de desenho animado ----------
export function casco(alto = true, vel = 1) {
  const f = alto ? 820 : 610, o = ruido(0.06, (t) => Math.exp(-t * 160) * 0.1 * vel); biquad(o, 'bp', 1900, 2)
  for (let i = 0; i < o.length; i++) { const tt = i / SR; o[i] += Math.sin(TAU * f * tt) * Math.exp(-tt * 55) * 0.26 * vel }
  return o
}
export function rangido(dur = 0.45, vel = 1) {
  const o = buf(dur); let ph = 0
  for (let i = 0; i < o.length; i++) { const u = i / o.length; ph += (28 + 70 * u * u) / SR; if (ph >= 1) { ph -= 1; o[i] = (0.6 + R() * 0.4) * vel } }
  const a = Float32Array.from(o), b = Float32Array.from(o)
  biquad(a, 'bp', 720, 9); biquad(b, 'bp', 1650, 7)
  for (let i = 0; i < o.length; i++) { const u = i / o.length; o[i] = (a[i] + b[i] * 0.7) * 0.5 * Math.min(1, u * 8) * Math.min(1, (1 - u) * 6) }
  return o
}
export function boing(f0 = 160, dur = 0.7, vel = 1) {
  const o = buf(dur); let ph = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR; ph += (f0 * (1 + 0.55 * Math.exp(-tt * 5) * Math.sin(TAU * 11 * tt)) * (1 + 0.3 * tt)) / SR
    o[i] = Math.tanh(3 * Math.sin(TAU * ph)) * Math.exp(-tt * 4.5) * Math.min(1, i / 100) * 0.18 * vel
  }
  return biquad(o, 'lp', 3200)
}
export function baque(vel = 1) {
  const o = ruido(0.35, (t) => Math.exp(-t * 60) * 0.25 * vel); biquad(o, 'lp', 350); let ph = 0
  for (let i = 0; i < o.length; i++) { const tt = i / SR; ph += (40 + 80 * Math.exp(-tt * 25)) / SR; o[i] += Math.sin(TAU * ph) * Math.exp(-tt * 10) * 0.55 * vel }
  return o
}
export function apito(f0, f1, dur, vel = 1) {
  const o = buf(dur + 0.05); let ph = 0, ns = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, u = Math.min(1, tt / dur), f = f0 * Math.pow(f1 / f0, Math.pow(u, 0.8)) * (1 + 0.008 * Math.sin(TAU * 6 * tt)); ph += f / SR
    const env = Math.min(1, tt / 0.02) * (tt < dur ? 1 : Math.max(0, 1 - (tt - dur) / 0.05))
    ns += (R() * 2 - 1 - ns) * 0.5
    o[i] = (Math.sin(TAU * ph) + 0.1 * Math.sin(TAU * 2 * ph) + ns * 0.08) * env * 0.14 * vel
  }
  return o
}
export function buzina(vel = 1) {
  const dur = 0.8, o = buf(dur); let ph = 0
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, u = tt / dur
    const f = u < 0.46 ? 130 + 95 * (u / 0.46) ** 0.7 : 225 - 25 * ((u - 0.46) / 0.54)
    ph += f / SR
    const env = Math.min(1, tt / 0.03) * (u > 0.44 && u < 0.52 ? 0.35 : 1) * (u > 0.9 ? (1 - u) / 0.1 : 1)
    let s = 0; for (let k = 1; k <= 18; k++) s += Math.sin(TAU * k * ph) / k
    o[i] = s * env * 0.2 * vel
  }
  const b = Float32Array.from(o); biquad(b, 'bp', 900, 1.3); biquad(o, 'lp', 3400)
  for (let i = 0; i < o.length; i++) o[i] = Math.tanh((o[i] * 0.4 + b[i] * 1.6) * 2) * 0.35 * vel
  return o
}
export function batida(vel = 1) {
  const o = buf(0.5)
  for (const [t0, a, f] of [[0, 1, 68], [0.14, 0.7, 58]]) {
    let ph = 0
    for (let i = Math.round(t0 * SR); i < o.length; i++) { const tt = i / SR - t0; ph += (f * (0.6 + 0.4 * Math.exp(-tt * 30))) / SR; o[i] += Math.sin(TAU * ph) * Math.exp(-tt * 14) * 0.6 * a * vel }
  }
  return biquad(o, 'lp', 400)
}
export function pop(vel = 1) {
  const o = buf(0.08); let ph = 0
  for (let i = 0; i < o.length; i++) { const tt = i / SR; ph += (220 + 900 * Math.exp(-tt * 70)) / SR; o[i] = Math.sin(TAU * ph) * Math.exp(-tt * 45) * 0.3 * vel }
  return o
}
export function bufo(vel = 1) {
  const o = ruido(0.55, (t) => Math.min(1, t / 0.05) * Math.exp(-t * 5) * 0.2 * vel)
  biquad(o, 'lp', 900)
  for (let i = 0; i < o.length; i++) o[i] *= 0.5 + 0.5 * Math.sin((TAU * 32 * i) / SR)
  return o
}

// ---------- o disco antigo ----------
export function chiado(N, dens = 16) {
  const o = new Float32Array(N); let h = 0
  for (let i = 0; i < N; i++) {
    h += (R() * 2 - 1 - h) * 0.9; o[i] += h * 0.0035
    if (R() < dens / SR) { const a = (R() < 0.08 ? 0.09 : 0.025) * (0.4 + R()), L = 3 + Math.floor(R() * 20); for (let k = 0; k < L && i + k < N; k++) o[i + k] += (R() * 2 - 1) * a * Math.exp(-k / 4) }
  }
  biquad(o, 'hp', 900)
  return o
}
// banda estreita e um pouco de saturação, como num filme sonoro de 1930
export function antigo(x, { hp = 110, lp = 5200, drive = 1.4 } = {}) {
  biquad(x, 'hp', hp); biquad(x, 'hp', hp); biquad(x, 'lp', lp); biquad(x, 'lp', lp * 1.2)
  const n = Math.tanh(drive); for (let i = 0; i < x.length; i++) x[i] = Math.tanh(x[i] * drive) / n
  return x
}

// ---------- ficheiros ----------
export function lerWav(f) {
  const b = readFileSync(f); let p = 12, ch = 1, bits = 16
  while (p < b.length - 8) {
    const id = b.toString('ascii', p, p + 4), n = b.readUInt32LE(p + 4)
    if (id === 'fmt ') { ch = b.readUInt16LE(p + 10); bits = b.readUInt16LE(p + 22) }
    if (id === 'data') {
      const fr = n / (ch * bits / 8), o = new Float32Array(fr)
      for (let i = 0; i < fr; i++) o[i] = bits === 16 ? b.readInt16LE(p + 8 + i * ch * 2) / 32768 : b.readFloatLE(p + 8 + i * ch * 4)
      return o
    }
    p += 8 + n + (n % 2)
  }
}
export function gravarWav(f, L, Rr = L) {
  const N = L.length, b = Buffer.alloc(44 + N * 8)
  b.write('RIFF', 0); b.writeUInt32LE(36 + N * 8, 4); b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16)
  b.writeUInt16LE(3, 20); b.writeUInt16LE(2, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 8, 28); b.writeUInt16LE(8, 32); b.writeUInt16LE(32, 34)
  b.write('data', 36); b.writeUInt32LE(N * 8, 40)
  for (let i = 0; i < N; i++) { b.writeFloatLE(L[i], 44 + i * 8); b.writeFloatLE(Rr[i], 48 + i * 8) }
  writeFileSync(f, b)
}

// ---------- mais efeitos e ambientes ----------
export function sino(prime = 196, amp = 0.3) {
  const parts = [[0.5, 0.55, 6.5], [1, 0.7, 4.8], [1.19, 0.55, 3.6], [1.5, 0.28, 2.6], [2.0, 0.75, 3.0], [2.51, 0.3, 1.8], [3.0, 0.25, 1.4], [4.07, 0.18, 1.0]]
  const o = buf(6)
  for (const [r, a, d] of parts) { const f = prime * r * (1 + (R() - 0.5) * 0.002); for (let i = 0; i < o.length; i++) { const tt = i / SR; o[i] += a * Math.sin(TAU * f * tt + r) * Math.exp((-tt / d) * 1.1) } }
  for (let i = 0; i < o.length; i++) o[i] *= amp * Math.min(1, i / 40)
  return o
}
export function timbale(m = 38, amp = 0.5, dec = 1.2) {
  const f = mtof(m), o = buf(2.5); let ph = 0
  for (let i = 0; i < o.length; i++) { const tt = i / SR, ff = f * (1 + 0.04 * Math.exp(-tt * 20)); ph += ff / SR; o[i] = amp * Math.exp(-tt / dec) * (Math.sin(TAU * ph) + 0.35 * Math.sin(TAU * ph * 1.59) * Math.exp(-tt * 2) + 0.2 * Math.sin(TAU * ph * 2.14) * Math.exp(-tt * 3)) }
  for (let i = 0; i < 400; i++) o[i] += (R() * 2 - 1) * 0.3 * amp * Math.exp(-i / 80)
  return o
}
export function vento(dur, amp = 0.5) {
  const o = ruido(dur, () => 1), a = Float32Array.from(o), b = Float32Array.from(o)
  biquad(a, 'bp', 420, 1.2); biquad(b, 'bp', 900, 2)
  for (let i = 0; i < o.length; i++) {
    const tt = i / SR, raj = 0.45 + 0.35 * Math.sin(tt * 0.7) + 0.2 * Math.sin(tt * 1.9 + 1), sil = 0.5 + 0.5 * Math.sin(tt * 0.33 + 2)
    o[i] = (a[i] * raj + b[i] * sil * 0.5) * amp * Math.min(1, tt / 1.5) * Math.min(1, (dur - tt) / 1.5)
  }
  return o
}
export function passo(vel = 1, seco = 800) {
  const o = ruido(0.12, (t) => Math.exp(-t * 45) * 0.25 * vel); biquad(o, 'lp', seco)
  for (let i = 0; i < o.length; i++) { const tt = i / SR; o[i] += Math.sin(TAU * 85 * tt) * Math.exp(-tt * 40) * 0.25 * vel }
  return o
}
export function crepitar(dur, amp = 1) {
  const o = new Float32Array(Math.floor(dur * SR))
  for (let i = 0; i < o.length; i++) if (R() < 22 / SR) { const a = (0.02 + R() * 0.06) * amp, L = 20 + Math.floor(R() * 60); for (let k = 0; k < L && i + k < o.length; k++) o[i + k] += (R() * 2 - 1) * a * Math.exp(-k / 12) }
  biquad(o, 'bp', 2600, 0.8)
  const rum = ruido(dur, () => 0.02 * amp); biquad(rum, 'lp', 220)
  for (let i = 0; i < o.length; i++) o[i] += rum[i]
  return o
}
export function trovao(amp = 1) {
  const o = ruido(3, (t) => Math.min(1, t / 0.03) * Math.exp(-t * 1.3) * (0.7 + 0.3 * Math.sin(t * 9)) * 0.9 * amp); biquad(o, 'lp', 160); biquad(o, 'lp', 220)
  const c = ruido(0.25, (t) => Math.exp(-t * 18) * 0.4 * amp); biquad(c, 'hp', 1500)
  for (let i = 0; i < c.length; i++) o[i] += c[i]
  return o
}
export function bolha(vel = 1) {
  const o = buf(0.12); let ph = 0
  for (let i = 0; i < o.length; i++) { const tt = i / SR; ph += (300 + 900 * (tt / 0.12)) / SR; o[i] = Math.sin(TAU * ph) * Math.sin(Math.PI * tt / 0.12) * 0.22 * vel }
  return o
}
export function agua(dur, amp = 1) {
  const o = ruido(dur, (t) => 0.035 * amp * Math.min(1, t / 0.8)); biquad(o, 'bp', 1400, 0.7)
  for (let i = 0; i < o.length; i++) if (R() < 30 / SR) { const f = 600 + R() * 1400; for (let k = 0; k < 900 && i + k < o.length; k++) { const tt = k / SR; o[i + k] += Math.sin(TAU * f * (1 + tt * 6) * tt) * Math.exp(-tt * 70) * 0.05 * amp } }
  return o
}
export function chilreio(vel = 1) {
  const o = buf(0.5); let ph = 0
  for (let n = 0; n < 3; n++) { const t0 = n * 0.12 + R() * 0.03; for (let i = Math.round(t0 * SR); i < Math.round((t0 + 0.07) * SR) && i < o.length; i++) { const u = (i / SR - t0) / 0.07; ph += (2600 + 1500 * Math.sin(Math.PI * u)) / SR; o[i] += Math.sin(TAU * ph) * Math.sin(Math.PI * u) * 0.08 * vel } }
  return o
}
export function sopro(vel = 1) { const o = ruido(0.35, (t) => Math.min(1, t / 0.03) * Math.exp(-t * 12) * 0.12 * vel); return biquad(o, 'lp', 700) }
export function pizz(m, vel = 1) { return corda(mtof(m), 0.7, { t60: 0.35, bright: 0.35, pick: 0.3, amp: 0.2 * vel }) }
export function papel(dur = 0.6, vel = 1) { const o = ruido(dur, (t) => Math.sin(Math.PI * t / dur) * 0.08 * vel * (0.6 + 0.4 * Math.sin(t * 90))); return biquad(o, 'hp', 1800) }
