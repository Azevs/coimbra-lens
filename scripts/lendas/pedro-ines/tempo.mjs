// Pedro e Inês: os tempos de tudo. A 120 bpm um compasso são 2 s e cada cena
// começa num compasso. As falas e os gestos marcados aqui servem a imagem
// (cenas.js recebe-os pelo boot) e o som (musica.mjs).

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
export const BPM = 120, BEAT = 60 / BPM, BAR = 4 * BEAT, FPS = 24
export const DURATION = 185
// a imagem do cartaz (antes de carregar no play): a flor, junto à fonte
export const CARTAZ = 66.8
export const SCENES = [
  { id: 'titulo', t0: 0, t1: 4 },
  { id: 'chegada', t0: 4, t1: 12 },
  { id: 'ines', t0: 12, t1: 20 },
  { id: 'rei', t0: 20, t1: 30 },
  { id: 'mapa', t0: 30, t1: 38 },
  { id: 'luto', t0: 38, t1: 46 },
  { id: 'regresso', t0: 46, t1: 54 },
  { id: 'coimbra', t0: 54, t1: 60 },
  { id: 'fonte', t0: 60, t1: 76 },
  { id: 'medo', t0: 76, t1: 92 },
  { id: 'morte', t0: 92, t1: 106 },
  { id: 'revolta', t0: 106, t1: 116 },
  { id: 'coroacao', t0: 116, t1: 130 },
  { id: 'vinganca', t0: 130, t1: 144 },
  { id: 'alcobaca', t0: 144, t1: 162 },
  { id: 'lendas', t0: 162, t1: 178 },
  { id: 'fim', t0: 178, t1: DURATION },
]
export const FALAS = {
  v1: 4.6, v2: 12.45, v3: 16.55, v4: 21.0, v5: 30.7, v6: 39.2, v7: 47.4, v8: 54.8, v9: 61.2, v10: 68.4,
  v11: 77.0, v12: 87.8, v13: 93.6, v14: 102.6, v15: 107.0, v16: 116.9, v17: 122.6, v18: 130.8, v19: 139.4,
  v20: 144.8, v21: 153.6, v22: 162.8, v23: 170.6,
}
export const EV = {
  // título, chegada, Inês
  irisTitulo: 3.55, abreChegada: 4.0,
  paragem: 9.4, venia: 10.15, aceno: 10.3,
  porta: 12.25, espreita: 12.45, salto: 12.8, aterra: 13.35, cortesia: 14.1, pestanas: 15.35,
  vira: 16.6, arregala: 17.35, pop: 18.02, coroa: 18.08, buzina: 18.3, coracao: [18.6, 18.92, 19.24, 19.56],
  irisFecha: 19.4,
  // o rei
  sussurro: 21.2, franze: 26.0, bate: 27.7,
  // o mapa
  linha0: 31.4, linha1: 36.3, lagrima: 36.8,
  // o luto
  sino: [38.3, 42.3], apaga: 44.9,
  // o regresso
  cochePara: 48.6, inesSai: 48.9, inesAterra: 49.35, corre: 49.5, abraco: 50.45, cocheParte: 51.7,
  // a fonte
  entram: 60.2, param: 63.9, pestanas2: 64.5, flor: 65.4, maos: 66.1, filhos: [69.7, 70.2, 70.7, 71.2], irisFonte: 75.1,
  // o medo
  bolha1: 79.0, bolha2: 83.3, fechaBolha: 87.1, avancam: 87.9, escuroMedo: 90.8,
  // a morte
  sombras0: 96.2, sombras1: 100.6, portaFecha: 101.2, apagaJanela: 104.3,
  // a revolta
  relampagos: [106.5, 108.9, 110.8], afonsoEntra: 111.6, pazes: 112.9, maosPaz: 114.0,
  // a coroação e Cantanhede
  coroaDesce: 118.4, coroaPousa: 119.8, vassalos: 120.2, rolo: 122.9, selo: 127.1,
  // a vingança
  coracoes: 137.5, foge: 140.5,
  // Alcobaça
  igreja: 152.0,
  // as lendas
  coroaInes: 163.3, coroaInesPousa: 164.6, beijos: [165.2, 165.9, 166.6, 167.3], fonteLagrimas: 170.0, lagrimas: [170.9, 171.5, 172.0, 172.4, 172.8], nasce: 173.2,
  // fim
  fimIris: 183.0,
}

function segundosWav(f) {
  const b = readFileSync(f)
  let p = 12, taxa = 48000, bloco = 2
  while (p < b.length - 8) {
    const id = b.toString('ascii', p, p + 4), n = b.readUInt32LE(p + 4)
    if (id === 'fmt ') { taxa = b.readUInt32LE(p + 12); bloco = b.readUInt16LE(p + 20) }
    if (id === 'data') return n / bloco / taxa
    p += 8 + n + (n % 2)
  }
  return 0
}
export function vozes() {
  const cfg = JSON.parse(readFileSync(join(AQUI, 'narracao.json'), 'utf8'))
  return cfg.lines.map((l) => {
    const wav = join(AQUI, '.cache', 'vo', `${l.id}.wav`)
    const t0 = FALAS[l.id]
    return { id: l.id, pt: l.pt, wav, t0, t1: t0 + segundosWav(wav) }
  })
}
export const TL = () => ({ fps: FPS, beat: BEAT, bar: BAR, duration: DURATION, scenes: SCENES, ev: EV, falas: vozes().map(({ id, t0, t1 }) => ({ id, t0, t1 })) })

// verificação: nenhuma fala passa do fim da sua cena nem pisa a seguinte
if (process.argv[1] && process.argv[1].endsWith('tempo.mjs')) {
  const vs = vozes()
  for (const v of vs) {
    const c = SCENES.find((s) => v.t0 >= s.t0 && v.t0 < s.t1)
    console.log(v.id.padEnd(4), v.t0.toFixed(2), '→', v.t1.toFixed(2), c.id.padEnd(9), 'sobra', (c.t1 - v.t1).toFixed(2))
  }
}
