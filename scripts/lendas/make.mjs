// Junta imagem e som de uma lenda e publica-a no site: normaliza o som a
// −16 LUFS (duas passagens), grava <lenda>/.cache/<lenda>.mp4 e copia para
// public/video/lendas/ o vídeo, o cartaz e as legendas em português.
//
//   python scripts/lendas/tts.py <lenda>
//   node scripts/lendas/<lenda>/musica.mjs
//   node scripts/lendas/render.mjs <lenda> video 12
//   node scripts/lendas/make.mjs <lenda>

import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const LENDA = process.argv[2]
const CACHE = join(AQUI, LENDA, '.cache')
const PUB = join(AQUI, '..', '..', 'public', 'video', 'lendas')
const { vozes, CARTAZ } = await import(pathToFileURL(join(AQUI, LENDA, 'tempo.mjs')).href)
const FFMPEG = spawnSync('python', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).stdout.toString().trim()
const ff = (...a) => { const r = spawnSync(FFMPEG, ['-y', '-hide_banner', '-loglevel', 'error', ...a], { stdio: 'inherit' }); if (r.status) throw new Error('ffmpeg falhou') }

// ---------- vídeo ----------
const mix = join(CACHE, 'mistura.wav'), saida = join(CACHE, `${LENDA}.mp4`)
const p1 = spawnSync(FFMPEG, ['-hide_banner', '-i', mix, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json', '-f', 'null', '-']).stderr.toString()
const m = JSON.parse(p1.slice(p1.lastIndexOf('{'), p1.lastIndexOf('}') + 1))
const ln = `loudnorm=I=-16:TP=-1.5:LRA=11:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`
ff('-i', join(CACHE, 'imagem.mp4'), '-i', mix, '-map', '0:v', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-x264-params', 'aq-mode=3', '-pix_fmt', 'yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-af', ln + ',aresample=48000', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', '-shortest', saida)

// ---------- legendas: cada fala partida em frases, o tempo repartido pelos caracteres ----------
const ts = (s) => { const h = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), x = s % 60; return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${x.toFixed(3).padStart(6, '0')}` }
const cues = []
for (const v of vozes()) {
  const partes = v.pt.match(/[^.!?]+[.!?]+/g)?.map((p) => p.trim()) ?? [v.pt]
  const tot = partes.reduce((a, p) => a + p.length, 0)
  let t = v.t0
  for (const p of partes) { const d = ((v.t1 - v.t0) * p.length) / tot; cues.push({ a: t, b: t + d, p }); t += d }
}
const vtt = 'WEBVTT\n\n' + cues.map((c, i) => `${i + 1}\n${ts(c.a)} --> ${ts(Math.min(c.b + 0.4, cues[i + 1] ? cues[i + 1].a - 0.05 : c.b + 0.4))}\n${c.p}\n`).join('\n')

// ---------- publicar ----------
mkdirSync(PUB, { recursive: true })
copyFileSync(saida, join(PUB, `${LENDA}.mp4`))
writeFileSync(join(PUB, `${LENDA}.pt.vtt`), vtt)
ff('-ss', String(CARTAZ), '-i', saida, '-frames:v', '1', '-q:v', '3', join(PUB, `${LENDA}-cartaz.jpg`))
console.log(saida, (statSync(saida).size / 1e6).toFixed(1), 'MB', `(som medido: ${m.input_i} LUFS)`, '→ public/video/lendas/')
