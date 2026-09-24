// Montagem final: imagem + som → public/video/coimbra.mp4, com cartaz e
// legendas em inglês e em português.
//
//   python scripts/video/tts.py        (narração; só pede o que mudou)
//   node scripts/video/audio.mjs       (banda sonora → .cache/mix.wav)
//   node scripts/video/render.mjs video 16   (imagem → .cache/picture.mp4)
//   node scripts/video/make.mjs

import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { vozes } from './timeline.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const CACHE = join(AQUI, '.cache')
const OUT = join(AQUI, '..', '..', 'public', 'video')
mkdirSync(OUT, { recursive: true })
const FFMPEG = spawnSync('python', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).stdout.toString().trim()
const ff = (...a) => {
  const r = spawnSync(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...a], { stdio: 'inherit' })
  if (r.status) throw new Error('ffmpeg falhou')
}

// ---------- legendas ----------
const ts = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${x.toFixed(3).padStart(6, '0')}`
}
// Parte cada fala em frases (e as frases longas no travessão), com o tempo
// repartido pelo número de caracteres.
function cues(text, t0, t1) {
  let parts = text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [text]
  parts = parts.flatMap((p) => (p.length > 70 && p.includes(' — ') ? p.split(/(?<= —) /) : [p]))
  const tot = parts.reduce((s, p) => s + p.length, 0)
  let t = t0
  return parts.map((p) => {
    const d = ((t1 - t0) * p.length) / tot
    const c = { a: t, b: t + d, p }
    t += d
    return c
  })
}
const vs = vozes()
for (const lang of ['en', 'pt']) {
  let n = 0
  const all = vs.flatMap((v) => cues(v[lang], v.t0, v.t1))
  // a legenda fica um pouco depois da voz, sem nunca pisar a seguinte
  const body = all
    .map((c, i) => ({ ...c, b: Math.min(c.b + 0.3, all[i + 1] ? all[i + 1].a - 0.05 : Infinity) }))
    .map((c) => `${++n}\n${ts(c.a)} --> ${ts(c.b)}\n${c.p}\n`)
    .join('\n')
  writeFileSync(join(OUT, `coimbra.${lang}.vtt`), 'WEBVTT\n\n' + body)
}

// ---------- som: normalização em duas passagens ----------
const mix = join(CACHE, 'mix.wav')
const pass1 = spawnSync(FFMPEG, ['-hide_banner', '-i', mix, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']).stderr.toString()
const m = JSON.parse(pass1.slice(pass1.lastIndexOf('{'), pass1.lastIndexOf('}') + 1))
const ln = `loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`
console.log('loudness medida', m.input_i, 'LUFS →', '-16')

// ---------- vídeo ----------
const mp4 = join(OUT, 'coimbra.mp4')
ff('-i', join(CACHE, 'picture.mp4'), '-i', mix, '-af', ln + ',aresample=48000',
  // os frames vêm de JPEG (gama completa, BT.601); os browsers esperam gama de TV em BT.709
  '-vf', 'scale=in_range=pc:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p',
  '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-tune', 'animation', '-profile:v', 'high', '-level', '4.1',
  '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', mp4)
// cartaz: o título sobre a colina ao amanhecer
ff('-ss', '14.6', '-i', join(CACHE, 'picture.mp4'), '-frames:v', '1', '-q:v', '3', join(OUT, 'coimbra-poster.jpg'))
console.log('coimbra.mp4', (statSync(mp4).size / 1e6).toFixed(1), 'MB')
