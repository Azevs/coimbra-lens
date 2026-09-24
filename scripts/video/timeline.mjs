// O relógio comum ao som e à imagem.
//
// A música anda a 72 bpm em 4/4: um compasso são 3,333 s. As cenas começam
// sempre no início de um compasso, para que cada mudança de imagem caia
// num tempo forte. As falas têm hora marcada à mão dentro de cada cena.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))

export const BPM = 72
export const BEAT = 60 / BPM
export const BAR = BEAT * 4
export const bar = (n) => n * BAR

export const SCENES = [
  { id: 'rio', start: bar(0), end: bar(5) },
  { id: 'aeminium', start: bar(5), end: bar(12) },
  { id: 'reino', start: bar(12), end: bar(19) },
  { id: 'ines', start: bar(19), end: bar(28) },
  { id: 'universidade', start: bar(28), end: bar(41) },
  { id: 'estudantes', start: bar(41), end: bar(50) },
  { id: 'fim', start: bar(50), end: bar(50) + 11.2 },
]

export const DURATION = SCENES.at(-1).end

// Hora de início de cada fala (s). A duração vem do próprio áudio.
export const CUES = {
  rio: 4.4,
  aeminium: 18.0,
  nome: 29.9,
  reino: 41.2,
  capital: 50.9,
  ines: 64.6,
  lagrimas: 77.4,
  ponte: 84.0,
  universidade: 95.0,
  cabra: 108.6,
  joanina: 116.4,
  unesco: 128.4,
  queima: 138.0,
  serenata: 149.6,
  palmas: 158.9,
  tosse: 164.4,
  fim: 168.0,
}

// Sons com hora marcada que a imagem também precisa de conhecer.
export const EVENTS = {
  sino: [bar(34) + 0.0, bar(34) + BEAT * 2.5],
  pigarros: [162.3, 162.95, 163.55],
}

function lerWav(caminho) {
  const b = readFileSync(caminho)
  let p = 12, fmt, dados
  while (p < b.length) {
    const id = b.toString('ascii', p, p + 4), n = b.readUInt32LE(p + 4)
    if (id === 'fmt ') fmt = { canais: b.readUInt16LE(p + 10), taxa: b.readUInt32LE(p + 12), bits: b.readUInt16LE(p + 22) }
    if (id === 'data') dados = b.subarray(p + 8, p + 8 + n)
    p += 8 + n + (n & 1)
  }
  if (fmt.bits !== 16) throw new Error('só 16 bits: ' + caminho)
  const n = dados.length / 2 / fmt.canais
  const out = new Float32Array(n)
  for (let i = 0; i < n; i++) out[i] = dados.readInt16LE(i * 2 * fmt.canais) / 32768
  return { taxa: fmt.taxa, amostras: out }
}
export { lerWav }

// Onde começa e acaba a voz dentro de cada ficheiro (corta o silêncio das pontas).
export function vozes() {
  const cfg = JSON.parse(readFileSync(join(AQUI, 'narration.json'), 'utf8').replace(/^﻿/, ''))
  return cfg.lines.map((l) => {
    const { taxa, amostras } = lerWav(join(AQUI, '.cache', 'vo', l.id + '.wav'))
    const lim = 0.012
    let a = 0, z = amostras.length - 1
    while (a < z && Math.abs(amostras[a]) < lim) a++
    while (z > a && Math.abs(amostras[z]) < lim) z--
    const inicio = Math.max(0, a / taxa - 0.03)
    const fim = Math.min(amostras.length / taxa, z / taxa + 0.12)
    return { ...l, taxa, amostras, corte: [inicio, fim], dur: fim - inicio, t0: CUES[l.id], t1: CUES[l.id] + fim - inicio }
  })
}

// Verificação: nenhuma fala se sobrepõe à seguinte, nenhuma passa do fim.
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('timeline.mjs')) {
  const v = vozes()
  let ok = true
  v.forEach((l, i) => {
    const prox = v[i + 1]
    const cena = SCENES.find((s) => l.t0 >= s.start && l.t0 < s.end)
    const folga = prox ? prox.t0 - l.t1 : DURATION - l.t1
    if (folga < 0.35) ok = false
    console.log(
      `${l.id.padEnd(13)} ${l.t0.toFixed(2).padStart(7)} → ${l.t1.toFixed(2).padStart(7)}  (${l.dur.toFixed(2)}s)  folga ${folga.toFixed(2)}  [${cena?.id}→${cena?.end.toFixed(1)}]`,
    )
  })
  console.log('duração total', DURATION.toFixed(2), ok ? 'OK' : 'SOBREPOSIÇÕES')
}
