// Captura headless por CDP: node scripts/captura.mjs "<url>" saida.png [espera_ms] [js a correr antes]
import { spawn } from 'node:child_process'
const [url, saida = 'captura.png', espera = '6000', js = ''] = process.argv.slice(2)
const [W, H] = (process.env.TAMANHO ?? '1280x720').split('x').map(Number)
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const porta = 9333 + Math.floor(Math.random() * 500)
const p = spawn(chrome, ['--headless=new', `--remote-debugging-port=${porta}`, ...(process.env.GPU ? ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist'] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']),
  '--autoplay-policy=no-user-gesture-required', `--user-data-dir=${process.env.TEMP}/cdp-${porta}`, `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let alvo
for (let i = 0; i < 40 && !alvo; i++) {
  await sleep(250)
  try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find((t) => t.type === 'page') } catch {}
}
const ws = new WebSocket(alvo.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pend = new Map()
const logs = []
ws.onmessage = (m) => {
  const d = JSON.parse(m.data)
  if (d.id && pend.has(d.id)) { pend.get(d.id)(d); pend.delete(d.id) }
  if (d.method === 'Runtime.consoleAPICalled') logs.push(d.params.type + ': ' + d.params.args.map((a) => a.value ?? a.description).join(' '))
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXC: ' + JSON.stringify(d.params.exceptionDetails).slice(0, 600))
}
const cmd = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
await cmd('Runtime.enable')
await cmd('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
await cmd('Page.navigate', { url })
await sleep(+espera)
if (js) {
  const r = await cmd('Runtime.evaluate', { expression: js, awaitPromise: true, returnByValue: true })
  logs.push('JS: ' + JSON.stringify(r.result?.result?.value ?? r.result?.exceptionDetails ?? r).slice(0, 1500))
  await sleep(1500)
}
const s = await cmd('Page.captureScreenshot', { format: 'png' })
const { writeFileSync } = await import('node:fs')
writeFileSync(saida, Buffer.from(s.result.data, 'base64'))
console.log(logs.join('\n'))
ws.close(); p.kill()
process.exit(0)
