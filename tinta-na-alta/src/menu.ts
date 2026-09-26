/**
 * A entrada da página. Com `?m=<id>` mostra o ecrã de início dessa missão e
 * carrega o motor (`main.ts`: three.js, o nível, as vozes); sem `m` mostra a
 * página de missões, que não descarrega nada disso.
 */
import { MISSOES, fichaDe, cumpridas, type Ficha } from './missoes/registo'

const BASE = import.meta.env.BASE_URL
const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T
// O site serve a página em /tinta-na-alta e /tinta-na-alta/: "./" não serve de volta.
document.querySelectorAll<HTMLAnchorElement>('a.voltar, a.voltar-menu').forEach((a) => { a.href = BASE })

const ficha = fichaDe(new URLSearchParams(location.search).get('m'))
if (ficha) {
  document.title = ficha.nome
  $('#missao-nome').textContent = ficha.nome
  $('#missao-sub').textContent = ficha.subtitulo
  $('#missao-briefing').innerHTML = ficha.briefingHtml
  $('#inicio').style.display = 'flex'
  import('./main').catch((e) => {
    console.error(e)
    $('#carregar').textContent = 'Não foi possível carregar a missão. Tenta outra vez daqui a pouco.'
  })
} else {
  paginaDeMissoes()
}

function paginaDeMissoes() {
  document.documentElement.classList.add('menu')
  $('#menu').hidden = false
  if (matchMedia('(hover: none) and (pointer: coarse)').matches) $('#aviso-tactil').hidden = false

  const lista = $('#missoes')
  lista.innerHTML = MISSOES.map((m) => `
    <li class="cartao" id="missao-${m.id}">
      <p class="carimbo" hidden>cumprida</p>
      <h2>${m.nome}</h2>
      <p class="lugar">${m.lugar}</p>
      <p class="resumo">${m.resumo}</p>
      <a class="botao" href="?m=${m.id}">Jogar</a>
    </li>`).join('')
  carimbar()
  // Ao voltar com o botão "atrás", o browser pode mostrar a página que guardou: carimbar outra vez.
  addEventListener('pageshow', (e) => { if (e.persisted) carimbar() })

  void mapa()
  void trailer()
}

function carimbar() {
  const feitas = cumpridas()
  for (const m of MISSOES) {
    const c = document.querySelector<HTMLElement>(`#missao-${m.id} .carimbo`)
    if (c) c.hidden = !feitas.has(m.id)
  }
}

/** O mapa desenhado (public/mapa.svg), com as zonas das missões registadas e uma marca por missão. */
async function mapa() {
  const caixa = $('#mapa')
  try {
    const r = await fetch(BASE + 'mapa.svg')
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    caixa.innerHTML = await r.text()
  } catch {
    caixa.closest('figure')!.hidden = true
    return
  }
  const svg = caixa.querySelector('svg')!
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', 'Mapa de Coimbra com as missões')
  const ids = new Set(MISSOES.map((m) => m.id))
  svg.querySelectorAll<SVGGElement>('.zona').forEach((z) => { if (!ids.has(z.dataset.missao ?? '')) z.remove() })
  // A mesma projecção do scripts/build-mapa.mjs: metros a partir do canto noroeste.
  const d = svg.dataset, vb = svg.viewBox.baseVal
  const onde = (m: Ficha) => [
    (((m.marca.lon - +d.oeste!) * +d.kx!) / vb.width) * 100,
    (((+d.norte! - m.marca.lat) * +d.ky!) / vb.height) * 100,
  ]
  for (const m of MISSOES) {
    const [x, y] = onde(m)
    const a = document.createElement('a')
    a.className = 'marca'
    a.href = `#missao-${m.id}`
    a.style.left = `${x}%`
    a.style.top = `${y}%`
    a.innerHTML = `<svg viewBox="0 0 30 30" width="26" height="26" aria-hidden="true">
      <path d="M6 7 L24 23 M23 6 L7 24" /><path d="M15 2.5 C 23 2, 28 8, 27.5 15 C 27 23, 21 28, 14 27.5 C 7 27, 2.5 21, 3 14 C 3.5 8, 8 3.5, 16 4" /></svg>
      <span>${m.nome}</span>`
    // A marca leva ao cartão e dá-lhe um toque, para se ver qual é.
    a.addEventListener('click', () => {
      const c = document.getElementById(`missao-${m.id}`)
      c?.classList.remove('lembrar')
      void c?.offsetWidth
      c?.classList.add('lembrar')
    })
    caixa.appendChild(a)
  }
  // O nome vai para o lado esquerdo da marca quando não cabe à direita (telemóvel).
  const encostar = () => caixa.querySelectorAll<HTMLElement>('.marca').forEach((a) => {
    a.classList.remove('esquerda')
    if (a.offsetLeft + a.offsetWidth - 13 > caixa.clientWidth) a.classList.add('esquerda')
  })
  encostar()
  addEventListener('resize', encostar)
  void document.fonts.ready.then(encostar)
}

/** O trailer só aparece quando houver public/trailer.mp4. */
async function trailer() {
  try {
    const r = await fetch(BASE + 'trailer.mp4', { method: 'HEAD' })
    if (!r.ok || !(r.headers.get('content-type') ?? '').startsWith('video/')) return
    const v = $('#trailer').querySelector('video')!
    v.src = BASE + 'trailer.mp4'
    $('#trailer').hidden = false
  } catch { /* sem trailer */ }
}
