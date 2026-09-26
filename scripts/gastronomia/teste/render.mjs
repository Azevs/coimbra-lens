// Desenha os dois testes de estilo num Chromium sem janela.
//
//   node scripts/gastronomia/teste/render.mjs stills 0.5 2.5 4.9   → .cache/<estilo>-t*.png
//   node scripts/gastronomia/teste/render.mjs video                 → .cache/lino.mp4, caderno.mp4, lado-a-lado.mp4

import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url)), CACHE = join(AQUI, '.cache')
const [modo, ...args] = process.argv.slice(2)
const W = 1920, H = 1080, FPS = 24, DUR = 5
const ESTILOS = ['lino', 'caderno']
const SHELL = join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium_headless_shell-1208', 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
const FFMPEG = spawnSync('python', ['-c', 'import imageio_ffmpeg as i;print(i.get_ffmpeg_exe())']).stdout.toString().trim()
mkdirSync(CACHE, { recursive: true })

async function abrir(estilo, porta) {
  const dir = join(CACHE, 'chrome', String(porta))
  mkdirSync(dir, { recursive: true })
  const proc = spawn(SHELL, [`--remote-debugging-port=${porta}`, `--user-data-dir=${dir}`, '--no-first-run', '--hide-scrollbars',
    '--force-device-scale-factor=1', `--window-size=${W},${H}`, '--allow-file-access-from-files', '--disable-gpu', 'about:blank'], { stdio: 'ignore' })
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
  await cdp('Page.navigate', { url: pathToFileURL(join(AQUI, 'index.html')).href + `?estilo=${estilo}` })
  for (let i = 0; i < 200 && !eventos.some((e) => e.method === 'Page.loadEventFired'); i++) await new Promise((r) => setTimeout(r, 50))
  const erros = eventos.filter((e) => e.method === 'Runtime.exceptionThrown')
  if (erros.length) throw new Error(JSON.stringify(erros[0].params.exceptionDetails, null, 1))
  await avaliar('document.fonts.ready.then(() => boot())')
  return { avaliar, fechar: () => { ws.close(); proc.kill() } }
}
const b64 = (s) => Buffer.from(s.slice(s.indexOf(',') + 1), 'base64')

async function stills(ts) {
  for (const [i, e] of ESTILOS.entries()) {
    const pg = await abrir(e, 9801 + i)
    for (const t of ts) {
      const f = join(CACHE, `${e}-t${t.toFixed(2)}.png`)
      writeFileSync(f, b64(await pg.avaliar(`frame(${t}), shot('image/png')`)))
      console.log(f)
    }
    pg.fechar()
  }
}

async function video1(e, porta) {
  const pg = await abrir(e, porta), saida = join(CACHE, `${e}.mp4`)
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', saida], { stdio: ['pipe', 'inherit', 'inherit'] })
  for (let f = 0; f < DUR * FPS; f++) {
    const jpg = await pg.avaliar(`frame(${f / FPS}), shot('image/jpeg', 0.95)`)
    if (!ff.stdin.write(b64(jpg))) await new Promise((r) => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await new Promise((r) => ff.on('close', r))
  pg.fechar()
  return saida
}
async function video() {
  const [a, b] = await Promise.all(ESTILOS.map((e, i) => video1(e, 9811 + i)))
  // lado a lado, cada um a meia largura, com uma faixa escura entre os dois
  spawnSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', a, '-i', b, '-filter_complex',
    '[0]scale=952:536,pad=960:540:4:2:0x111111[l];[1]scale=952:536,pad=960:540:4:2:0x111111[r];[l][r]hstack',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(CACHE, 'lado-a-lado.mp4')], { stdio: 'inherit' })
  console.log(a, b, join(CACHE, 'lado-a-lado.mp4'))
}

if (modo === 'stills') await stills(args.map(Number))
else if (modo === 'video') await video()
else console.log('modos: stills | video')
process.exit(0)
