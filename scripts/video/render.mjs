// Desenha o filme frame a frame num Chromium sem janela e entrega-os ao ffmpeg.
//
//   node scripts/video/render.mjs stills 5 12.5 30        → .cache/stills/*.png
//   node scripts/video/render.mjs sheet 0 178 2            → .cache/sheet.jpg (uma imagem a cada 2 s)
//   node scripts/video/render.mjs video [workers]          → .cache/picture.mp4 (sem som)
//
// A imagem é uma função pura do tempo: film/*.js expõe frame(t), que pinta
// o canvas; aqui só se pede cada t e se recolhe o JPEG.

import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SCENES, CUES, EVENTS, DURATION, BAR, BEAT, vozes } from './timeline.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const CACHE = join(AQUI, '.cache')
const FPS = 30
const W = 1920, H = 1080
const SHELL = join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium_headless_shell-1208', 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
const FFMPEG = String(
  await new Promise((ok) => {
    const p = spawn('python', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())'])
    let s = ''
    p.stdout.on('data', (d) => (s += d))
    p.on('close', () => ok(s.trim()))
  }),
)

const TL = {
  scenes: SCENES, cues: CUES, events: EVENTS, duration: DURATION, bar: BAR, beat: BEAT,
  lines: vozes().map((v) => ({ id: v.id, t0: v.t0, t1: v.t1, en: v.en })),
}
const GEO = JSON.parse(readFileSync(join(AQUI, 'data', 'geo.json'), 'utf8'))

async function abrir(porta) {
  const dir = join(CACHE, 'chrome', String(porta))
  mkdirSync(dir, { recursive: true })
  const proc = spawn(SHELL, [
    `--remote-debugging-port=${porta}`, `--user-data-dir=${dir}`, '--no-first-run', '--hide-scrollbars',
    '--force-device-scale-factor=1', `--window-size=${W},${H}`, '--allow-file-access-from-files',
    '--disable-gpu', '--font-render-hinting=none', 'about:blank',
  ], { stdio: 'ignore' })
  let alvo
  for (let i = 0; i < 100 && !alvo; i++) {
    await new Promise((r) => setTimeout(r, 100))
    try {
      alvo = (await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json()).find((t) => t.type === 'page')
    } catch {}
  }
  const ws = new WebSocket(alvo.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const espera = new Map()
  ws.onmessage = (m) => {
    const j = JSON.parse(m.data)
    if (j.id && espera.has(j.id)) {
      const [ok, ko] = espera.get(j.id)
      espera.delete(j.id)
      j.error ? ko(new Error(JSON.stringify(j.error))) : ok(j.result)
    }
  }
  const cdp = (method, params = {}) =>
    new Promise((ok, ko) => {
      espera.set(++id, [ok, ko])
      ws.send(JSON.stringify({ id, method, params }))
    })
  const avaliar = async (expr) => {
    const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
  }
  await cdp('Page.enable')
  await cdp('Runtime.enable')
  await cdp('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
  const carregou = new Promise((r) => {
    const antes = ws.onmessage
    ws.onmessage = (m) => {
      antes(m)
      if (JSON.parse(m.data).method === 'Page.loadEventFired') r()
    }
  })
  await cdp('Page.navigate', { url: pathToFileURL(join(AQUI, 'film', 'index.html')).href })
  await carregou
  await avaliar(`boot(${JSON.stringify(GEO)}, ${JSON.stringify(TL)})`)
  return { avaliar, fechar: () => { ws.close(); proc.kill() } }
}

const b64 = (s) => Buffer.from(s.slice(s.indexOf(',') + 1), 'base64')

async function stills(ts) {
  const pg = await abrir(9401)
  mkdirSync(join(CACHE, 'stills'), { recursive: true })
  for (const t of ts) {
    const png = await pg.avaliar(`frame(${t}), shot('image/png')`)
    const f = join(CACHE, 'stills', `t${t.toFixed(2).padStart(7, '0')}.png`)
    writeFileSync(f, b64(png))
    console.log(f)
  }
  pg.fechar()
}

async function sheet(a, b, passo) {
  const ts = []
  for (let t = a; t <= b + 1e-6; t += passo) ts.push(+t.toFixed(3))
  const pg = await abrir(9402)
  const cols = 6, w = 320, h = 180
  const imgs = []
  for (const t of ts) imgs.push(await pg.avaliar(`frame(${t}), thumb(${w}, ${h}, ${t})`))
  const folha = await pg.avaliar(`sheet(${JSON.stringify(imgs)}, ${cols}, ${w}, ${h})`)
  const f = join(CACHE, `sheet-${a}-${b}.jpg`)
  writeFileSync(f, b64(folha))
  console.log(f)
  pg.fechar()
}

async function troco(porta, f0, f1, saida) {
  const pg = await abrir(porta)
  const ff = spawn(FFMPEG, [
    '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(FPS), saida,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  for (let f = f0; f < f1; f++) {
    const jpg = await pg.avaliar(`frame(${f / FPS}), shot('image/jpeg', 0.96)`)
    if (!ff.stdin.write(b64(jpg))) await new Promise((r) => ff.stdin.once('drain', r))
    if ((f - f0) % 60 === 0) process.stdout.write(`[${porta}] ${f}/${f1}\n`)
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  pg.fechar()
}

async function video(n) {
  const total = Math.ceil(DURATION * FPS)
  const dir = join(CACHE, 'segs')
  if (existsSync(dir)) rmSync(dir, { recursive: true })
  mkdirSync(dir, { recursive: true })
  const passo = Math.ceil(total / n)
  const segs = []
  const t0 = Date.now()
  await Promise.all(
    Array.from({ length: n }, (_, i) => {
      const f0 = i * passo, f1 = Math.min(total, f0 + passo)
      const s = join(dir, `s${String(i).padStart(2, '0')}.mp4`)
      segs.push(s)
      return troco(9500 + i, f0, f1, s)
    }),
  )
  writeFileSync(join(dir, 'lista.txt'), segs.map((s) => `file '${s.replace(/\\/g, '/')}'`).join('\n'))
  await new Promise((r) =>
    spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(dir, 'lista.txt'), '-c', 'copy', join(CACHE, 'picture.mp4')], { stdio: 'inherit' }).on('close', r),
  )
  console.log('imagem pronta em', ((Date.now() - t0) / 60000).toFixed(1), 'min')
}

const [modo, ...args] = process.argv.slice(2)
if (modo === 'stills') await stills(args.map(Number))
else if (modo === 'sheet') await sheet(+args[0], +args[1], +(args[2] || 2))
else if (modo === 'video') await video(+(args[0] || 12))
else console.log('modos: stills | sheet | video')
process.exit(0)
