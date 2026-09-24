/**
 * Todo o som é sintetizado aqui (Web Audio), menos as falas, que são a voz
 * pt-PT do Windows gravada por `npm run build:vozes` e depois disfarçada por
 * personagem: mais grave e rouca nos Borrões, filtrada como rádio na Central.
 *
 * O eco das ruelas é uma convolução com uma resposta gerada: reflexões
 * precoces das fachadas próximas e uma cauda de pedra.
 */
import * as THREE from 'three'

export type Personagem = 'radio' | 'fadista' | { inimigo: number }

export class Som {
  ctx!: AudioContext
  private mestre!: GainNode
  private eco!: ConvolverNode
  private ecoEnvio!: GainNode
  private ruido!: AudioBuffer
  private ruidoRosa!: AudioBuffer
  private vozes = new Map<string, AudioBuffer>()
  private falaActual: { fonte: AudioBufferSourceNode; prioridade: number; ate: number } | null = null
  private ultimaFalaInimigo = 0
  ouvinte = new THREE.Vector3()
  frenteOuvinte = new THREE.Vector3(0, 0, -1)
  pronto = false
  legenda: (quem: string, texto: string) => void = () => {}
  textos: Record<string, string> = {}

  async iniciar() {
    if (this.pronto) return
    this.ctx = new AudioContext()
    this.mestre = this.ctx.createGain()
    this.mestre.gain.value = 0.9
    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -14
    comp.ratio.value = 6
    comp.attack.value = 0.002
    comp.release.value = 0.2
    this.mestre.connect(comp).connect(this.ctx.destination)
    this.eco = this.ctx.createConvolver()
    this.eco.buffer = this.respostaRuela(1.2)
    this.ecoEnvio = this.ctx.createGain()
    this.ecoEnvio.gain.value = 0.4
    this.ecoEnvio.connect(this.eco).connect(this.mestre)
    this.ruido = this.bufferRuido(2, 'branco')
    this.ruidoRosa = this.bufferRuido(4, 'castanho')
    this.pronto = true
    this.ambiente()
    const falas = await (await fetch(import.meta.env.BASE_URL + 'falas.json')).json()
    for (const [id, f] of Object.entries(falas)) this.textos[id] = (f as { texto: string }).texto
    await Promise.all(Object.keys(falas).map(async (id) => {
      try {
        const b = await (await fetch(`${import.meta.env.BASE_URL}vozes/${id}.wav`)).arrayBuffer()
        this.vozes.set(id, await this.ctx.decodeAudioData(b))
      } catch { /* sem voz: fica só a legenda */ }
    }))
  }

  private bufferRuido(seg: number, cor: 'branco' | 'castanho') {
    const n = this.ctx.sampleRate * seg
    const b = this.ctx.createBuffer(1, n, this.ctx.sampleRate)
    const d = b.getChannelData(0)
    let ult = 0
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1
      if (cor === 'branco') d[i] = w
      else { ult = (ult + 0.02 * w) / 1.02; d[i] = ult * 3.5 }
    }
    return b
  }

  /**
   * Rua estreita, não igreja: ecos precoces fortes das fachadas (o estalo que
   * volta), cauda curta de pedra que morre em pouco mais de um segundo.
   */
  private respostaRuela(seg: number) {
    const sr = this.ctx.sampleRate, n = Math.floor(sr * seg)
    const b = this.ctx.createBuffer(2, n, sr)
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c)
      for (let i = 0; i < n; i++) {
        const t = i / sr
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t / seg, 5) * 0.22 * Math.min(1, t * 60)
      }
      for (const [ms, g] of [[7, 0.9], [13, 0.7], [21, 0.55], [29, 0.5], [44, 0.35], [63, 0.25], [95, 0.12]]) {
        const i = Math.floor((ms + (c ? 3 : 0) + Math.random() * 4) * sr / 1000)
        for (let k = 0; k < 40; k++) d[i + k] += (Math.random() * 2 - 1) * g * (1 - k / 40)
      }
    }
    return b
  }

  /** Há parede entre o som e o ouvinte? (o jogo liga isto à octree) */
  ocluido: (de: THREE.Vector3) => boolean = () => false

  /**
   * Posição → ganho, filtro de distância, oclusão e panorâmica. As vozes seguem
   * a lei da distância a sério (quem grita a 30 m ouve-se, mas longe), perdem
   * graves e agudos ao longe, e trazem o ressalto da fachada da frente.
   */
  private espacial(pos: THREE.Vector3 | null, alcance = 60, eco = 1, voz = false) {
    const entrada = this.ctx.createGain()
    if (!pos) {
      entrada.connect(this.mestre)
      return { entrada, dist: 0 }
    }
    const rel = pos.clone().sub(this.ouvinte)
    const dist = rel.length()
    const tapado = dist > 2 && this.ocluido(pos)
    const g = this.ctx.createGain()
    g.gain.value = (voz ? Math.pow(Math.min(1, 3.5 / Math.max(dist, 0.1)), 1.15) : 1 / (1 + Math.pow(dist / (alcance * 0.18), 1.4))) * (tapado ? 0.55 : 1)
    const lp = this.ctx.createBiquadFilter()
    lp.type = 'lowpass'
    const corte = voz ? Math.max(1100, 9000 / (1 + dist / 10)) : Math.max(700, 18000 / (1 + dist / 18))
    lp.frequency.value = tapado ? Math.max(350, corte * 0.3) : corte
    let cadeia: AudioNode = entrada
    if (voz) {
      // Ao longe a voz fica fina: o chão e o ar comem os graves.
      const hp = this.ctx.createBiquadFilter()
      hp.type = 'highpass'
      hp.frequency.value = Math.min(450, 90 + dist * 8)
      cadeia = cadeia.connect(hp)
    }
    const pan = this.ctx.createStereoPanner()
    const f = this.frenteOuvinte
    const dir = new THREE.Vector3(-f.z, 0, f.x)
    pan.pan.value = dist > 0.5 ? THREE.MathUtils.clamp(rel.clone().normalize().dot(dir), -1, 1) * (tapado ? 0.5 : 0.8) : 0
    cadeia.connect(lp).connect(g).connect(pan).connect(this.mestre)
    if (voz && dist > 5) {
      // Ressalto na fachada do outro lado da rua: um eco só, curto.
      const atraso = this.ctx.createDelay(0.3)
      atraso.delayTime.value = Math.min(0.12, 0.025 + dist * 0.0018)
      const ag = this.ctx.createGain()
      ag.gain.value = Math.min(0.35, 0.1 + dist / 120)
      g.connect(atraso).connect(ag).connect(pan)
    }
    // Quanto mais longe (ou mais escondido), mais o que chega é ruela.
    const envio = this.ctx.createGain()
    envio.gain.value = (voz ? 0.05 + Math.min(0.35, dist / 55) : Math.min(0.75, 0.15 + dist / 90) * eco) * (tapado ? 1.8 : 1)
    pan.connect(envio).connect(this.ecoEnvio)
    return { entrada, dist }
  }

  private ruidoEm(destino: AudioNode, t: number, dur: number, filtro: BiquadFilterType, freq: number, q: number,
    ganho: number, ataque = 0.001, fim?: number, buf = this.ruido) {
    const s = this.ctx.createBufferSource()
    s.buffer = buf
    s.playbackRate.value = 0.9 + Math.random() * 0.2
    const f = this.ctx.createBiquadFilter()
    f.type = filtro
    f.frequency.setValueAtTime(freq, t)
    if (fim) f.frequency.exponentialRampToValueAtTime(fim, t + dur)
    f.Q.value = q
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(ganho, t + ataque)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    s.connect(f).connect(g).connect(destino)
    s.start(t, Math.random() * 1.5)
    s.stop(t + dur + 0.05)
  }

  private tom(destino: AudioNode, t: number, dur: number, f0: number, f1: number, ganho: number, forma: OscillatorType = 'sine') {
    const o = this.ctx.createOscillator()
    o.type = forma
    o.frequency.setValueAtTime(f0, t)
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(ganho, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(destino)
    o.start(t)
    o.stop(t + dur + 0.02)
  }

  // ------------------------------------------------------------- efeitos --

  /** Tiro: estalo supersónico, corpo de pólvora, soco grave e a ruela a responder. */
  tiro(pos: THREE.Vector3 | null, inimigo = false) {
    if (!this.pronto) return
    const { entrada, dist } = this.espacial(pos, 160)
    const t = this.ctx.currentTime + dist / 343
    const k = inimigo ? 0.8 : 1
    this.ruidoEm(entrada, t, 0.03, 'highpass', 2500, 0.7, 1.4 * k)
    this.ruidoEm(entrada, t, 0.16, 'lowpass', 4200, 0.8, 1.1 * k, 0.001, 300)
    this.ruidoEm(entrada, t + 0.004, 0.32, 'bandpass', 900, 1.2, 0.5 * k, 0.003, 200)
    this.tom(entrada, t, 0.18, 130, 38, 1.3 * k)
    this.tom(entrada, t, 0.05, 2400, 900, 0.12 * k, 'square')
    if (!pos) {
      // Mecânica da arma, perto do ouvido.
      this.ruidoEm(entrada, t + 0.045, 0.03, 'bandpass', 3800, 6, 0.25)
      this.tom(entrada, t + 0.05, 0.04, 5200, 4700, 0.04, 'triangle')
    }
  }

  vazio() {
    if (!this.pronto) return
    const t = this.ctx.currentTime
    const { entrada } = this.espacial(null)
    this.ruidoEm(entrada, t, 0.025, 'bandpass', 3200, 8, 0.5)
    this.tom(entrada, t, 0.03, 2600, 2200, 0.08, 'triangle')
  }

  recarregar() {
    if (!this.pronto) return
    const t = this.ctx.currentTime
    const { entrada } = this.espacial(null)
    const clique = (dt: number, f: number, g: number) => {
      this.ruidoEm(entrada, t + dt, 0.05, 'bandpass', f, 5, g)
      this.tom(entrada, t + dt, 0.06, f * 1.3, f * 1.1, g * 0.15, 'triangle')
    }
    clique(0.05, 1800, 0.5) // carregador fora
    this.ruidoEm(entrada, t + 0.12, 0.25, 'bandpass', 1200, 1, 0.12, 0.05) // deslizar
    clique(0.75, 1500, 0.8) // carregador dentro
    clique(0.8, 2600, 0.4)
    clique(1.25, 2200, 0.6) // culatra atrás
    clique(1.38, 3000, 0.7) // culatra à frente
  }

  /** Passo em calçada: um toque seco de sola e o grão da pedra. */
  passo(pos: THREE.Vector3 | null, forca: number, degraus = false) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 30)
    const t = this.ctx.currentTime
    const f = 1 + (Math.random() - 0.5) * 0.25
    this.ruidoEm(entrada, t, 0.05, 'bandpass', 1900 * f, 1.3, 0.35 * forca)
    this.ruidoEm(entrada, t + 0.008, 0.09, 'lowpass', 500 * f, 0.9, 0.5 * forca)
    this.tom(entrada, t, 0.06, degraus ? 150 : 110, 60, 0.35 * forca)
    if (Math.random() < 0.4) this.ruidoEm(entrada, t + 0.03, 0.05, 'highpass', 5000, 0.5, 0.06 * forca) // areia
  }

  aterrar(v: number) {
    if (!this.pronto) return
    const { entrada } = this.espacial(null)
    const t = this.ctx.currentTime
    const g = Math.min(1, v / 12)
    this.tom(entrada, t, 0.15, 90, 40, 0.8 * g)
    this.ruidoEm(entrada, t, 0.12, 'lowpass', 900, 1, 0.6 * g)
  }

  /** Bala a passar perto: sopro que sobe e desce, com um estalo. */
  zumbido(lado: number) {
    if (!this.pronto) return
    const t = this.ctx.currentTime
    const pan = this.ctx.createStereoPanner()
    pan.pan.value = lado
    pan.connect(this.mestre)
    this.ruidoEm(pan, t, 0.18, 'bandpass', 3000, 5, 0.45, 0.04, 1200)
    this.ruidoEm(pan, t, 0.015, 'highpass', 4000, 0.7, 0.5)
  }

  impacto(pos: THREE.Vector3, ricochete: boolean) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 40)
    const t = this.ctx.currentTime
    this.ruidoEm(entrada, t, 0.08, 'bandpass', 2400 + Math.random() * 1500, 2, 0.45)
    this.ruidoEm(entrada, t, 0.2, 'lowpass', 1200, 0.7, 0.15, 0.002) // pó a cair
    if (ricochete) this.tom(entrada, t + 0.01, 0.35 + Math.random() * 0.2, 2800 + Math.random() * 1200, 900, 0.08, 'sine')
  }

  acerto(pos: THREE.Vector3, cabeca: boolean) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 50)
    const t = this.ctx.currentTime
    this.ruidoEm(entrada, t, 0.1, 'lowpass', 700, 1.5, 0.9)
    this.tom(entrada, t, 0.1, cabeca ? 220 : 140, 70, 0.6)
    // Confirmação para o jogador: um tique seco.
    const g = this.ctx.createGain()
    g.connect(this.mestre)
    this.tom(g, t, 0.05, cabeca ? 1800 : 1300, cabeca ? 1600 : 1100, 0.12, 'triangle')
  }

  queda(pos: THREE.Vector3) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 40)
    const t = this.ctx.currentTime + 0.35
    this.tom(entrada, t, 0.25, 80, 35, 0.9)
    this.ruidoEm(entrada, t, 0.3, 'lowpass', 600, 0.8, 0.6)
    this.ruidoEm(entrada, t + 0.18, 0.12, 'bandpass', 2600, 3, 0.2) // a arma a bater na pedra
    this.tom(entrada, t + 0.18, 0.2, 3100, 2900, 0.05, 'triangle')
  }

  dor() {
    if (!this.pronto) return
    const { entrada } = this.espacial(null)
    const t = this.ctx.currentTime
    this.tom(entrada, t, 0.2, 90, 50, 0.9)
    this.ruidoEm(entrada, t, 0.25, 'lowpass', 400, 1, 0.7)
    // Zumbido de ouvido.
    this.tom(entrada, t, 1.2, 3900, 3800, 0.03, 'sine')
  }

  bater() {
    if (!this.pronto) return
    const { entrada } = this.espacial(null)
    const t = this.ctx.currentTime
    for (const [dt, g] of [[0, 0.5], [0.33, 0.4]]) {
      this.tom(entrada, t + dt, 0.12, 70, 45, g)
      this.tom(entrada, t + dt + 0.12, 0.1, 60, 40, g * 0.6)
    }
  }

  /** Corda solta: nós a desatar. */
  corda() {
    if (!this.pronto) return
    const { entrada } = this.espacial(null)
    const t = this.ctx.currentTime
    for (let i = 0; i < 5; i++) this.ruidoEm(entrada, t + i * 0.12 + Math.random() * 0.05, 0.1, 'bandpass', 1500 + Math.random() * 800, 2, 0.2, 0.02)
  }

  // ------------------------------------------------------------- música --

  /** Guitarra de Coimbra por Karplus-Strong: doze cordas, duas a duas. */
  guitarra(pos: THREE.Vector3 | null, notas: [number, number, number][]) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 50)
    const sr = this.ctx.sampleRate
    const t0 = this.ctx.currentTime + 0.05
    for (const [tempo, midi, dur] of notas) {
      for (const desafino of [0, 0.06]) {
        const f = 440 * Math.pow(2, (midi - 69) / 12) * (1 + desafino / 100)
        const n = Math.floor(sr * (dur + 0.6))
        const b = this.ctx.createBuffer(1, n, sr)
        const d = b.getChannelData(0)
        const P = Math.max(2, Math.round(sr / f))
        for (let i = 0; i < P; i++) d[i] = Math.random() * 2 - 1
        for (let i = P; i < n; i++) d[i] = 0.4985 * (d[i - P] + d[i - P + 1])
        const s = this.ctx.createBufferSource()
        s.buffer = b
        const g = this.ctx.createGain()
        g.gain.value = 0.22
        const brilho = this.ctx.createBiquadFilter()
        brilho.type = 'peaking'
        brilho.frequency.value = 2800
        brilho.gain.value = 5
        s.connect(brilho).connect(g).connect(entrada)
        s.start(t0 + tempo + desafino * 0.2)
      }
    }
  }

  /** Sino da Sé: parciais inarmónicos de um sino de bronze. */
  sino(pos: THREE.Vector3, badaladas = 1) {
    if (!this.pronto) return
    const { entrada } = this.espacial(pos, 400)
    const base = 196
    for (let b = 0; b < badaladas; b++) {
      const t = this.ctx.currentTime + b * 2.6
      for (const [r, g, d] of [[0.5, 0.3, 6], [1, 0.4, 4.5], [1.19, 0.25, 3.5], [1.5, 0.15, 3], [2, 0.12, 2.5], [2.52, 0.08, 1.8], [3.01, 0.05, 1.3]]) {
        this.tom(entrada, t, d, base * r, base * r * 0.999, g * 0.5)
      }
      this.ruidoEm(entrada, t, 0.04, 'bandpass', 1500, 2, 0.2)
    }
  }

  private ambiente() {
    // Vento na Alta: ruído castanho a respirar devagar.
    const s = this.ctx.createBufferSource()
    s.buffer = this.ruidoRosa
    s.loop = true
    const f = this.ctx.createBiquadFilter()
    f.type = 'bandpass'
    f.frequency.value = 400
    f.Q.value = 0.6
    const g = this.ctx.createGain()
    g.gain.value = 0.05
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lg = this.ctx.createGain()
    lg.gain.value = 0.035
    lfo.connect(lg).connect(g.gain)
    const lfo2 = this.ctx.createOscillator()
    lfo2.frequency.value = 0.043
    const lg2 = this.ctx.createGain()
    lg2.gain.value = 180
    lfo2.connect(lg2).connect(f.frequency)
    s.connect(f).connect(g).connect(this.mestre)
    s.start(); lfo.start(); lfo2.start()
    // A cidade lá em baixo: um zumbido grave e longe.
    const c = this.ctx.createBufferSource()
    c.buffer = this.ruidoRosa
    c.loop = true
    const cf = this.ctx.createBiquadFilter()
    cf.type = 'lowpass'
    cf.frequency.value = 160
    const cg = this.ctx.createGain()
    cg.gain.value = 0.06
    c.connect(cf).connect(cg).connect(this.mestre)
    c.start(0, 1.3)
    // Pombos e andorinhas, de vez em quando.
    const aves = () => {
      if (!this.pronto) return
      const t = this.ctx.currentTime
      const pos = this.ouvinte.clone().add(new THREE.Vector3((Math.random() - 0.5) * 60, 15, (Math.random() - 0.5) * 60))
      const { entrada } = this.espacial(pos, 80)
      if (Math.random() < 0.5) {
        for (let i = 0; i < 3; i++) this.tom(entrada, t + i * 0.28, 0.22, 420, 330, 0.06) // arrulho
      } else {
        for (let i = 0; i < 4; i++) this.tom(entrada, t + i * 0.09, 0.07, 5200 + Math.random() * 800, 6500, 0.03, 'triangle') // andorinha
      }
      setTimeout(aves, 5000 + Math.random() * 12000)
    }
    setTimeout(aves, 4000)
  }

  /** Batida de coração com a vida baixa. */
  coracao(ritmo: number) {
    if (!this.pronto) return
    const t = this.ctx.currentTime
    const { entrada } = this.espacial(null)
    this.tom(entrada, t, 0.12, 60, 40, 0.5 * ritmo)
    this.tom(entrada, t + 0.18, 0.1, 55, 38, 0.35 * ritmo)
  }

  // ---------------------------------------------------------------- falas --

  /**
   * Diz uma fala. Prioridade: rádio 3, fadista 2, inimigos 1 (e os inimigos
   * não falam uns por cima dos outros).
   */
  falar(id: string, quem: Personagem, pos: THREE.Vector3 | null = null) {
    if (!this.pronto) return 0
    const buf = this.vozes.get(id)
    const agora = this.ctx.currentTime
    const prioridade = quem === 'radio' ? 3 : quem === 'fadista' ? 2 : 1
    if (typeof quem === 'object') {
      if (agora - this.ultimaFalaInimigo < 1.6) return 0
      this.ultimaFalaInimigo = agora
    }
    if (this.falaActual && this.falaActual.ate > agora) {
      if (this.falaActual.prioridade > prioridade && prioridade !== 1) return 0
      if (prioridade >= this.falaActual.prioridade && this.falaActual.prioridade < 3 && prioridade > 1) {
        try { this.falaActual.fonte.stop() } catch { /* já parou */ }
      }
    }
    const nome = quem === 'radio' ? 'Central' : quem === 'fadista' ? 'Fadista' : 'Borrão'
    this.legenda(nome, this.textos[id] ?? '')
    if (!buf) return 2.5
    const s = this.ctx.createBufferSource()
    s.buffer = buf
    let saida: AudioNode
    if (quem === 'radio') {
      // Rádio: banda estreita, saturação, estalos a abrir e a fechar.
      s.playbackRate.value = 1.0
      const hp = this.ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 450
      const lp = this.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3000
      const sat = this.ctx.createWaveShaper(); sat.curve = curvaSaturacao(3)
      const g = this.ctx.createGain(); g.gain.value = 1.1
      s.connect(hp).connect(sat).connect(lp).connect(g).connect(this.mestre)
      this.ruidoEm(this.mestre, agora, 0.06, 'bandpass', 2000, 1, 0.15)
      this.ruidoEm(this.mestre, agora + buf.duration, 0.1, 'bandpass', 2000, 1, 0.15)
      saida = g
    } else if (quem === 'fadista') {
      s.playbackRate.value = 0.86 // um pouco mais grave que a voz original
      const { entrada } = this.espacial(pos, 40, 1, true)
      const g = this.ctx.createGain(); g.gain.value = 1.6
      s.connect(g).connect(entrada)
      saida = g
    } else {
      // Borrões: cada um com o seu grave, e a garganta de quem fuma.
      const semente = quem.inimigo
      s.playbackRate.value = 0.7 + (semente % 5) * 0.035
      const { entrada } = this.espacial(pos, 70, 1, true)
      const sat = this.ctx.createWaveShaper(); sat.curve = curvaSaturacao(2)
      const peito = this.ctx.createBiquadFilter(); peito.type = 'peaking'; peito.frequency.value = 220; peito.gain.value = 6
      // Voz de quem grita na rua: presença nos médios-agudos.
      const grito = this.ctx.createBiquadFilter(); grito.type = 'peaking'; grito.frequency.value = 1700; grito.Q.value = 0.8; grito.gain.value = 5
      const g = this.ctx.createGain(); g.gain.value = 2.2
      s.connect(sat).connect(peito).connect(grito).connect(g).connect(entrada)
      saida = g
    }
    void saida
    s.start()
    const dur = buf.duration / s.playbackRate.value
    this.falaActual = { fonte: s, prioridade, ate: agora + dur }
    return dur
  }

  get aFalar() { return !!this.falaActual && this.falaActual.ate > (this.ctx?.currentTime ?? 0) }
}

function curvaSaturacao(k: number) {
  const n = 1024, c = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1
    c[i] = Math.tanh(x * k) / Math.tanh(k)
  }
  return c
}
