import * as THREE from 'three'

const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T

export class Hud {
  private mira = $('#mira')
  private acertoEl = $('#acerto')
  private vidaEl = $('#vida-n')
  private coracao = $('#coracao')
  private penteEl = $('#pente')
  private reservaEl = $('#reserva')
  private objEl = $('#objectivo')
  private marcador = $('#marcador')
  private marcadorDist = $('#marcador-dist')
  private legendas = $('#legendas')
  private accao = $('#accao')
  private accaoTexto = $('#accao-texto')
  private barra = $('#accao-barra')
  private dano = $('#dano')
  private vinheta = $('#vinheta')
  private protegidoEl = $('#protegido-vida')
  private relogioEl = $('#relogio')
  private tempoAcerto = 0
  private legendaAte = 0

  objectivo(texto: string) {
    const antigo = this.objEl.querySelector('.actual')
    if (antigo) {
      antigo.classList.remove('actual')
      antigo.classList.add('feito')
      setTimeout(() => antigo.remove(), 2200)
    }
    const d = document.createElement('div')
    d.className = 'actual novo'
    d.textContent = texto
    this.objEl.appendChild(d)
    setTimeout(() => d.classList.remove('novo'), 50)
  }

  legenda(quem: string, texto: string) {
    this.legendas.innerHTML = `<b>${quem}:</b> ${texto}`
    this.legendas.style.opacity = '1'
    this.legendaAte = performance.now() + 1200 + texto.length * 65
  }

  acerto(morto: boolean) {
    this.acertoEl.classList.remove('mostra', 'morto')
    void this.acertoEl.offsetWidth
    this.acertoEl.classList.add('mostra')
    if (morto) this.acertoEl.classList.add('morto')
    this.tempoAcerto = performance.now()
  }

  ferido(angulo: number) {
    const a = document.createElement('div')
    a.className = 'seta-dano'
    a.style.transform = `translate(-50%, -50%) rotate(${angulo}rad)`
    this.dano.appendChild(a)
    setTimeout(() => a.remove(), 900)
  }

  actualizar(vida: number, pente: number, reserva: number, espalhamento: number, aMirar: boolean, recarregar: boolean,
    protegido: number | null) {
    this.vidaEl.textContent = String(Math.max(0, Math.ceil(vida)))
    this.coracao.classList.toggle('fraco', vida < 35)
    this.penteEl.textContent = recarregar ? '··' : String(pente)
    this.penteEl.classList.toggle('pouco', pente <= 8)
    this.reservaEl.textContent = `${Math.ceil(reserva / 30)} ×`
    const px = 6 + espalhamento * 900
    this.mira.style.setProperty('--abre', `${Math.min(px, 60)}px`)
    this.mira.style.opacity = aMirar ? '0' : '1'
    this.vinheta.style.opacity = String(Math.max(0, (60 - vida) / 60))
    if (performance.now() > this.legendaAte) this.legendas.style.opacity = '0'
    if (protegido === null) this.protegidoEl.style.display = 'none'
    else {
      this.protegidoEl.style.display = 'block'
      ;(this.protegidoEl.querySelector('i') as HTMLElement).style.width = `${Math.max(0, protegido)}%`
    }
  }

  /** Um relógio discreto no canto (null esconde-o); `pouco` fá-lo piscar. */
  relogio(texto: string | null, pouco = false) {
    this.relogioEl.style.display = texto ? 'block' : 'none'
    if (texto && this.relogioEl.textContent !== texto) this.relogioEl.textContent = texto
    this.relogioEl.classList.toggle('pouco', pouco)
  }

  /** O nome por cima da barra de vida de quem se protege. */
  rotuloProtegido(texto: string) { this.protegidoEl.querySelector('span')!.textContent = texto }

  /** Marcador do objectivo: símbolo a piscar, projectado no ecrã, com a distância. */
  marcar(ponto: THREE.Vector3 | null, camera: THREE.Camera, deOnde: THREE.Vector3) {
    if (!ponto) { this.marcador.style.display = 'none'; return }
    const p = ponto.clone().add(new THREE.Vector3(0, 2.2, 0)).project(camera)
    const atras = p.z > 1
    let x = (p.x * 0.5 + 0.5) * innerWidth, y = (-p.y * 0.5 + 0.5) * innerHeight
    if (atras) { x = innerWidth - x; y = innerHeight - 130 }
    x = THREE.MathUtils.clamp(x, 60, innerWidth - 60)
    y = THREE.MathUtils.clamp(y, 70, innerHeight - 130)
    this.marcador.style.display = 'block'
    this.marcador.style.transform = `translate(${x}px, ${y}px)`
    this.marcadorDist.textContent = `${Math.round(ponto.distanceTo(deOnde))} m`
  }

  accaoMostrar(texto: string | null, progresso = 0) {
    this.accao.style.display = texto ? 'flex' : 'none'
    if (texto) this.accaoTexto.textContent = texto
    this.barra.style.width = `${progresso * 100}%`
  }

  ecra(id: 'inicio' | 'pausa' | 'fim' | null, html?: string) {
    for (const e of ['inicio', 'pausa', 'fim']) $('#' + e).style.display = e === id ? 'flex' : 'none'
    if (id === 'fim' && html) $('#fim .folha').innerHTML = html
    document.body.classList.toggle('em-jogo', id === null)
  }
}
