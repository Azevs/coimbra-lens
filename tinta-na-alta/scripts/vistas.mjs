// Várias capturas numa só sessão (Chrome headless com GPU).
//   node scripts/vistas.mjs <pasta> '<json>' [url]   json: [{ "nome", "de": [x, y], "para": [x, y], "pitch"?, "limpar"? }]
// Coordenadas do nível: x para nascente, y para norte.
import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [pasta, json, url = 'http://localhost:5190/tinta-na-alta/?m=serenata&auto'] = process.argv.slice(2)
const vistas = JSON.parse(json)
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const porta = 9333 + Math.floor(Math.random() * 500)
const p = spawn(chrome, ['--headless=new', `--remote-debugging-port=${porta}`, '--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist',
  `--user-data-dir=${process.env.TEMP}/cdp-${porta}`, '--window-size=1280,720', 'about:blank'], { stdio: 'ignore' })
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
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXC: ' + JSON.stringify(d.params.exceptionDetails).slice(0, 400))
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') logs.push('ERR: ' + d.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 300))
}
const cmd = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
const js = async (e) => (await cmd('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.result?.value
await cmd('Runtime.enable')
await cmd('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false })
await cmd('Page.navigate', { url })
await sleep(7000)
await js(`dbg.comecar(); dbg.jog.vida = 1e9; 1`)
for (const v of vistas) {
  await js(`(async () => {
    const d = dbg, V = d.P.inicio.constructor
    const ps = ${v.s ?? -1}
    const pa = ps >= 0 ? d.mundo.noPercurso(ps) : null, pb = ps >= 0 ? d.mundo.noPercurso(ps + 10) : null
    const [x, y] = pa ? [pa.x, -pa.z] : ${JSON.stringify(v.de ?? [0, 0])}, [tx, ty] = pb ? [pb.x, -pb.z] : ${JSON.stringify(v.para ?? [0, 0])}
    const o = new V(x, d.mundo.chao(x, y), -y)
    d.jog.corpo.colocar(o)
    if (${!!v.limpar}) d.inimigos.forEach((e) => { if (e.vivo && e.corpo.pes.distanceTo(o) < 40) { e.vida = 1; e.ferir(5, 'tronco', o, d.som, { sangue() {}, poca() {} }, e.corpo.pes) } })
    await new Promise((r) => setTimeout(r, 400))
    d.jog.yaw = Math.atan2(-(tx - x), -(-ty + y)); d.jog.pitch = ${v.pitch ?? 0.05}
    await new Promise((r) => setTimeout(r, 900))
    return 1 })()`)
  const s = await cmd('Page.captureScreenshot', { format: 'png' })
  writeFileSync(join(pasta, v.nome + '.png'), Buffer.from(s.result.data, 'base64'))
}
console.log(logs.join('\n') || 'ok')
ws.close(); p.kill()
process.exit(0)
