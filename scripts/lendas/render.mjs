// Desenha uma lenda imagem a imagem num Chromium sem janela.
//
//   node scripts/lendas/render.mjs pedro-ines stills 2 6.5 18.3   → <lenda>/.cache/stills/*.png
//   node scripts/lendas/render.mjs pedro-ines folha 0.5            → <lenda>/.cache/folha.jpg (uma imagem a cada 0,5 s)
//   node scripts/lendas/render.mjs pedro-ines video 8              → <lenda>/.cache/imagem.mp4 (sem som, 8 processos)

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const [LENDA, modo, ...args] = process.argv.slice(2)
const PASTA = join(AQUI, LENDA), CACHE = join(PASTA, '.cache')
const { TL } = await import(pathToFileURL(join(PASTA, 'tempo.mjs')).href)
const tl = TL()
tl.pelicula = JSON.parse(process.env.PELICULA || '{}')
const W = 1920, H = 1080
const SHELL = join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium_headless_shell-1208', 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
const FFMPEG = spawnSync('python', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).stdout.toString().trim()

async function abrir(porta) {
  const dir = join(CACHE, 'chrome', String(porta))
  mkdirSync(dir, { recursive: true })
  const proc = spawn(SHELL, [`--remote-debugging-port=${porta}`, `--user-data-dir=${dir}`, '--no-first-run', '--hide-scrollbars',
    '--force-device-scale-factor=1', `--window-size=${W},${H}`, '--allow-file-access-from-files', '--disable-gpu', '--font-render-hinting=none', 'about:blank'], { stdio: 'ignore' })
  let alvo
  for (let i = 0; i < 100 && !alvo; i++) {
    await new Promise((r) => setTimeout(r, 100))
    try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json()).find((t) => t.type === 'page') } catch {}
  }
  const ws = new WebSocket(alvo.webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const espera = new Map(), eventos = []
  ws.onmessage = (m) => {
    const j = JSON.parse(m.data)
    if (j.id && espera.has(j.id)) { const [ok, ko] = espera.get(j.id); espera.delete(j.id); j.error ? ko(new Error(JSON.stringify(j.error))) : ok(j.result) }
    else if (j.method) eventos.push(j)
  }
  const cdp = (method, params = {}) => new Promise((ok, ko) => { espera.set(++id, [ok, ko]); ws.send(JSON.stringify({ id, method, params })) })
  const avaliar = async (expr) => {
    const r = await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text)
    return r.result.value
  }
  await cdp('Page.enable'); await cdp('Runtime.enable')
  await cdp('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
  const url = pathToFileURL(join(AQUI, 'anos30', 'index.html')).href + `?lenda=${LENDA}`
  await cdp('Page.navigate', { url })
  for (let i = 0; i < 200 && !eventos.some((e) => e.method === 'Page.loadEventFired'); i++) await new Promise((r) => setTimeout(r, 50))
  const erros = eventos.filter((e) => e.method === 'Runtime.exceptionThrown')
  if (erros.length) throw new Error(JSON.stringify(erros[0].params.exceptionDetails, null, 1))
  await avaliar(`boot(${JSON.stringify(tl)})`)
  return { avaliar, fechar: () => { ws.close(); proc.kill() } }
}
const b64 = (s) => Buffer.from(s.slice(s.indexOf(',') + 1), 'base64')

async function stills(ts) {
  const pg = await abrir(9601)
  mkdirSync(join(CACHE, 'stills'), { recursive: true })
  for (const t of ts) {
    const f = join(CACHE, 'stills', `t${t.toFixed(2).padStart(6, '0')}.png`)
    writeFileSync(f, b64(await pg.avaliar(`frame(${t}), shot('image/png')`)))
    console.log(f)
  }
  pg.fechar()
}
async function folha(passo) {
  const pg = await abrir(9602), dir = join(CACHE, 'folha')
  if (existsSync(dir)) rmSync(dir, { recursive: true })
  mkdirSync(dir, { recursive: true })
  let n = 0
  for (let t = 0; t < tl.duration; t += passo) writeFileSync(join(dir, `f${String(n++).padStart(3, '0')}.jpg`), b64(await pg.avaliar(`frame(${t}), shot('image/jpeg', .8)`)))
  pg.fechar()
  const cols = 6, rows = Math.ceil(n / cols)
  spawnSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', join(dir, 'f%03d.jpg'), '-vf', `scale=320:180,tile=${cols}x${rows}:padding=4`, '-frames:v', '1', join(CACHE, 'folha.jpg')], { stdio: 'inherit' })
  console.log(join(CACHE, 'folha.jpg'))
}
async function troco(porta, f0, f1, saida) {
  const pg = await abrir(porta)
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(tl.fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-pix_fmt', 'yuv420p', '-r', String(tl.fps), saida], { stdio: ['pipe', 'inherit', 'inherit'] })
  for (let f = f0; f < f1; f++) {
    const jpg = await pg.avaliar(`frame(${f / tl.fps}), shot('image/jpeg', 0.95)`)
    if (!ff.stdin.write(b64(jpg))) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  pg.fechar()
}
async function video(n) {
  const total = Math.ceil(tl.duration * tl.fps), dir = join(CACHE, 'segs')
  if (existsSync(dir)) rmSync(dir, { recursive: true })
  mkdirSync(dir, { recursive: true })
  const passo = Math.ceil(total / n), segs = [], t0 = Date.now()
  await Promise.all(Array.from({ length: n }, (_, i) => {
    const f0 = i * passo, f1 = Math.min(total, f0 + passo), s = join(dir, `s${String(i).padStart(2, '0')}.mp4`)
    segs.push(s)
    return troco(9700 + i, f0, f1, s)
  }))
  writeFileSync(join(dir, 'lista.txt'), segs.map((s) => `file '${s.replace(/\\/g, '/')}'`).join('\n'))
  spawnSync(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(dir, 'lista.txt'), '-c', 'copy', join(CACHE, 'imagem.mp4')], { stdio: 'inherit' })
  console.log(`imagem pronta em ${((Date.now() - t0) / 1000).toFixed(0)} s`)
}

if (modo === 'stills') await stills(args.map(Number))
else if (modo === 'folha') await folha(+(args[0] || 0.5))
else if (modo === 'video') await video(+(args[0] || 8))
else console.log('modos: stills | folha | video')
process.exit(0)
