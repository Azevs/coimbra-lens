'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { Monumento } from '@/lib/monumentos'
import type { TextoMonumento } from '@/lib/monumentos-textos'

/**
 * Visita a um monumento, na maqueta que se roda.
 *
 * O mesmo esqueleto do `MaquetaViva` das zonas urbanas — cartaz por baixo,
 * three.js pedido só quando o bloco se aproxima, laço de desenho só com a
 * maqueta à vista —, e por cima dele a visita: pontos numerados pousados na
 * maqueta, uma lista com o texto de cada um, e a câmara que vai até lá
 * quando se escolhe um. O edifício de que se fala acende.
 *
 * A lista é a visita; a maqueta ilustra-a. Sem WebGL a lista continua a
 * funcionar e o cartaz fica — não se perde texto nenhum.
 *
 * A câmara não roda sozinha (ver `MaquetaViva`). Só se move quando alguém
 * escolhe um ponto, e com movimento reduzido salta em vez de voar.
 */

interface Props {
  monumento: Monumento
  textos: TextoMonumento
  largura: number
  altura: number
}

type Estado = 'cartaz' | 'a-carregar' | 'vivo' | 'sem-webgl'

/**
 * Três vestidos do mesmo disco: a fotografia aérea (o que se mede de cima),
 * a reconstituição (fachadas, cantarias, torre e Via Latina desenhadas a
 * partir de fotografias — ver `scripts/blender/reconstituicao.py`) e o cartão
 * das zonas urbanas.
 */
type Modo = 'foto' | 'rico' | 'cartao'

interface Api {
  irPara: (id: string | null) => void
  vestir: (modo: Modo) => Promise<void>
}

function temWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

const rad = (g: number) => (g * Math.PI) / 180

export default function VisitaMonumento({ monumento, textos, largura, altura }: Props) {
  const caixa = useRef<HTMLDivElement>(null)
  const montagem = useRef<HTMLDivElement>(null)
  const pinos = useRef<(HTMLButtonElement | null)[]>([])
  const api = useRef<Api | null>(null)
  const [estado, setEstado] = useState<Estado>('cartaz')
  const [escolhido, setEscolhido] = useState<string | null>(null)
  const [mexeu, setMexeu] = useState(false)
  const [perto, setPerto] = useState(false)
  const [modo, setModo] = useState<Modo>('foto')
  const [aCarregarRico, setACarregarRico] = useState(false)
  // O modelo pode chegar depois de se ter carregado no botão: arranca já no
  // vestido escolhido.
  const modoInicial = useRef<Modo>('foto')

  // Os pontos com texto, pela ordem da visita, cada um com a sua posição.
  const pontos = textos.pontos
    .map((t) => {
      const p = monumento.pontos.find((q) => q.id === t.id)
      return p ? { ...t, pos: p.p, texto: t.texto.replace('{altura}', p.altura != null ? String(Math.round(p.altura)) : '—') } : null
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)

  useEffect(() => {
    const el = caixa.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setPerto(true)
      return
    }
    const obs = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setPerto(true)
          obs.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!perto) return
    if (!temWebGL()) {
      setEstado('sem-webgl')
      return
    }
    setEstado('a-carregar')
    let vivo = true
    let limpar: (() => void) | undefined

    ;(async () => {
      try {
        const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/loaders/DRACOLoader.js'),
          import('three/examples/jsm/controls/OrbitControls.js'),
        ])
        if (!vivo) return
        const draco = new DRACOLoader().setDecoderPath('/draco/')
        const gltf = await new GLTFLoader().setDRACOLoader(draco).loadAsync(`/maquetas/${monumento.id}.glb`)
        draco.dispose()
        if (!vivo || !montagem.current) return

        const alvoEl = montagem.current
        const cena = new THREE.Scene()
        const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderizador.shadowMap.enabled = true
        renderizador.shadowMap.type = THREE.PCFSoftShadowMap
        alvoEl.appendChild(renderizador.domElement)
        Object.assign(renderizador.domElement.style, { display: 'block', width: '100%', height: '100%', outline: 'none' })

        const modelo = gltf.scene
        cena.add(modelo)

        // --- os dois vestidos: fotografia (o do .glb) e cartão ---
        // O modelo chega com a ortofoto no chão e nos telhados. O cartão é a
        // linguagem das zonas urbanas, construída aqui a partir do nome de
        // cada material, para não haver dois modelos a descarregar.
        type Mat = import('three').MeshStandardMaterial
        const CARTAO: Record<string, string> = {
          'chao-foto': '#E6E0D2',
          muro: '#E6E0D2',
          corte: '#BDB39E',
          'monumento-parede': '#F7F3EC',
          'contexto-parede': '#CBC1AB',
          'telhado-foto': '#BCB199',
          copa: '#A7B08F',
          tronco: '#8C8272',
        }
        const TELHA_CARTAO = '#B8522C'
        const cacheCartao = new Map<string, Mat>()
        const deCartao = (orig: Mat, monumento: boolean) => {
          const chave = orig.name + (monumento ? ':m' : '')
          let m = cacheCartao.get(chave)
          if (!m) {
            const cor = monumento && orig.name === 'telhado-foto' ? TELHA_CARTAO : CARTAO[orig.name] ?? '#' + orig.color.getHexString()
            m = new THREE.MeshStandardMaterial({ name: orig.name, color: cor, roughness: 0.85, metalness: 0 })
            cacheCartao.set(chave, m)
          }
          return m
        }

        // O Blender dá a cada edifício do monumento o nome
        // `Edif_conjunto_<tipo>_<id>`; com duas cores (parede e telhado) o glTF
        // parte-o em duas malhas filhas.
        const doOSM = (o: import('three').Object3D) => {
          for (let n: import('three').Object3D | null = o; n; n = n.parent) {
            const m = n.name.match(/^Edif_conjunto_(way|relation)_(\d+)/)
            if (m) return `${m[1]}/${m[2]}`
          }
          return null
        }
        const corTinta = new THREE.Color('#14171C')
        const malhas: { m: import('three').Mesh; foto: Mat; cartao: Mat }[] = []
        const linhas: { l: import('three').LineBasicMaterial; osm: string | null }[] = []
        // Acender é emissão, não cor: funciona igual nos dois vestidos.
        const acesos = new Map<string, Mat[]>()

        modelo.traverse((o) => {
          const m = o as import('three').Mesh
          if (!m.isMesh) return
          m.castShadow = true
          m.receiveShadow = true
          const osm = doOSM(m)
          let foto = m.material as Mat
          // Os do monumento levam materiais próprios, para acender um só.
          if (osm) foto = foto.clone()
          const cartao = osm ? deCartao(foto, true).clone() : deCartao(foto, false)
          m.material = foto
          malhas.push({ m, foto, cartao })
          if (osm && foto.name.includes('parede')) acesos.set(osm, [...(acesos.get(osm) ?? []), foto, cartao])
          const eEdificio = osm != null || /^Edif_/.test(m.name) || /^Edif_/.test(m.parent?.name ?? '')
          if (!eEdificio) return
          const linha = new THREE.LineBasicMaterial({ color: corTinta, transparent: true, opacity: 0.5 })
          m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 30), linha))
          linhas.push({ l: linha, osm })
        })

        // --- luz ---
        const ceu = new THREE.HemisphereLight(0xf2eee6, 0xbfb6a2, 1.2)
        cena.add(ceu)
        const sol = new THREE.DirectionalLight(0xfff4e2, 2.5)
        const caixaM = new THREE.Box3().setFromObject(modelo)
        const centro = caixaM.getCenter(new THREE.Vector3())
        const tamanho = caixaM.getSize(new THREE.Vector3())
        const raio = Math.max(tamanho.x, tamanho.z) / 2
        // De poente, como nas estampas.
        sol.position.set(centro.x - raio * 0.8, centro.y + raio * 1.1, centro.z + raio * 0.45)
        sol.target.position.copy(centro)
        sol.castShadow = true
        sol.shadow.mapSize.set(2048, 2048)
        Object.assign(sol.shadow.camera, { near: 1, far: raio * 5, left: -raio * 1.2, right: raio * 1.2, top: raio * 1.2, bottom: -raio * 1.2 })
        sol.shadow.camera.updateProjectionMatrix()
        sol.shadow.bias = -0.0004
        cena.add(sol, sol.target)

        // --- câmara ---
        const camara = new THREE.PerspectiveCamera(32, 1, 1, raio * 14)
        const controlos = new OrbitControls(camara, renderizador.domElement)
        controlos.enableDamping = true
        controlos.dampingFactor = 0.08
        controlos.enablePan = false
        controlos.minPolarAngle = 0.12
        controlos.maxPolarAngle = Math.PI / 2 - 0.06
        controlos.target.copy(centro)

        // Enquadrar pela caixa e não pela esfera: a esfera envolve os cantos
        // de um cilindro achatado e deixava a maqueta a um terço do palco.
        // Recua-se na direcção de partida até os oito cantos caberem.
        const cantos = [0, 1, 2, 3, 4, 5, 6, 7].map(
          (i) =>
            new THREE.Vector3(
              i & 1 ? caixaM.max.x : caixaM.min.x,
              i & 2 ? caixaM.max.y : caixaM.min.y,
              i & 4 ? caixaM.max.z : caixaM.min.z
            )
        )
        // O disco não chega aos cantos da caixa em planta: 0,82 do lado
        // aproxima o círculo sem o cortar nas vistas oblíquas.
        cantos.forEach((c) => {
          c.x = centro.x + (c.x - centro.x) * 0.82
          c.z = centro.z + (c.z - centro.z) * 0.82
        })
        const tmp = new THREE.Vector3()
        let distInicial = raio * 3
        function distanciaQueCabe() {
          let lo = raio * 0.5
          let hi = raio * 12
          for (let k = 0; k < 30; k++) {
            const d = (lo + hi) / 2
            camara.position.copy(deOnde(centro, textos.inicio.azimute, textos.inicio.elevacao, d))
            camara.lookAt(centro)
            camara.updateMatrixWorld()
            const cabe = cantos.every((c) => {
              tmp.copy(c).project(camara)
              return Math.abs(tmp.x) <= 0.94 && Math.abs(tmp.y) <= 0.94
            })
            if (cabe) hi = d
            else lo = d
          }
          return hi
        }
        function enquadrar() {
          const l = alvoEl.clientWidth
          const a = alvoEl.clientHeight
          if (!l || !a) return
          renderizador.setSize(l, a, false)
          camara.aspect = l / a
          camara.updateProjectionMatrix()
          const pos = camara.position.clone()
          distInicial = distanciaQueCabe()
          camara.position.copy(pos)
          controlos.minDistance = 35
          controlos.maxDistance = distInicial * 1.4
        }

        // Coordenadas da maqueta (x nascente, y norte, z cota) → three (y para cima).
        const noModelo = ([x, y, z]: [number, number, number]) => new THREE.Vector3(x, z, -y)
        const deOnde = (alvo: import('three').Vector3, az: number, el: number, d: number) =>
          new THREE.Vector3(
            alvo.x + Math.cos(rad(az)) * Math.cos(rad(el)) * d,
            alvo.y + Math.sin(rad(el)) * d,
            alvo.z - Math.sin(rad(az)) * Math.cos(rad(el)) * d
          )

        enquadrar()
        camara.position.copy(deOnde(centro, textos.inicio.azimute, textos.inicio.elevacao, distInicial))
        controlos.update()

        // --- voo da câmara ---
        const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let voo: { alvo: import('three').Vector3; pos: import('three').Vector3 } | null = null
        const pararVoo = () => {
          voo = null
        }
        const aoMexer = () => {
          setMexeu(true)
          pararVoo()
        }
        controlos.addEventListener('start', aoMexer)

        // --- a reconstituição: outro .glb, só pedido quando alguém a escolhe ---
        // São 1,2 MB de texturas e pormenores; quem fica na fotografia não os paga.
        let rico: { modelo: import('three').Object3D; acesos: Map<string, Mat[]> } | null = null
        let pedidoRico: Promise<void> | null = null
        const carregarRico = () => {
          if (pedidoRico) return pedidoRico
          setACarregarRico(true)
          pedidoRico = (async () => {
            const d = new DRACOLoader().setDecoderPath('/draco/')
            const g = await new GLTFLoader().setDRACOLoader(d).loadAsync(`/maquetas/${monumento.id}-rico.glb`)
            d.dispose()
            const ac = new Map<string, Mat[]>()
            g.scene.traverse((o) => {
              const m = o as import('three').Mesh
              if (!m.isMesh) return
              m.castShadow = true
              m.receiveShadow = true
              const osm = doOSM(m)
              if (osm && (m.material as Mat).name.includes('parede')) {
                const mat = (m.material as Mat).clone()
                m.material = mat
                ac.set(osm, [...(ac.get(osm) ?? []), mat])
              }
            })
            g.scene.visible = false
            cena.add(g.scene)
            rico = { modelo: g.scene, acesos: ac }
          })()
          pedidoRico
            .catch(() => {
              pedidoRico = null
            })
            .finally(() => setACarregarRico(false))
          return pedidoRico
        }

        // --- acender e vestir ---
        const ACESA = new THREE.Color('#C8531F')
        let ligados: string[] = []
        let modoActual: Modo = 'foto'
        const pintarLinhas = () => {
          // Sobre a fotografia a tinta só se nota nos edifícios de que se fala.
          const base = modoActual === 'foto' ? 0.1 : 0.5
          for (const { l, osm } of linhas) l.opacity = osm && ligados.includes(osm) ? 0.9 : base
        }
        const acender = (ids: string[]) => {
          ligados = ids
          for (const mapa of rico ? [acesos, rico.acesos] : [acesos]) {
            for (const [osm, mats] of mapa) {
              const on = ids.includes(osm)
              mats.forEach((m) => {
                m.emissive.copy(on ? ACESA : new THREE.Color(0))
                m.emissiveIntensity = on ? 0.2 : 0
              })
            }
          }
          pintarLinhas()
        }
        const vestir = async (modo: Modo) => {
          modoActual = modo
          if (modo === 'rico') {
            await carregarRico()
            // Pode ter-se mudado de ideias enquanto o modelo chegava.
            if (modoActual !== 'rico' || !rico) return
            acender(ligados)
          }
          modelo.visible = modo !== 'rico'
          if (rico) rico.modelo.visible = modo === 'rico'
          for (const { m, foto, cartao } of malhas) m.material = modo === 'cartao' ? cartao : foto
          // A fotografia já traz as cores do dia: tom neutro e luz mais baixa,
          // senão a telha sai cor-de-rosa e o pátio estoura. O cartão fica
          // com o AgX das zonas urbanas.
          const cartao = modo === 'cartao'
          renderizador.toneMapping = cartao ? THREE.AgXToneMapping : THREE.NeutralToneMapping
          // Na reconstituição as texturas são de albedo, sem a luz do dia que a
          // fotografia já traz: sem a luz indirecta do Cycles, a telha escurecia.
          ceu.intensity = cartao ? 1.2 : modo === 'rico' ? 2.0 : 1.5
          sol.intensity = cartao ? 2.5 : modo === 'rico' ? 2.2 : 1.8
          malhas.forEach(({ m }) => ((m.material as Mat).needsUpdate = true))
          pintarLinhas()
        }
        void vestir(modoInicial.current)

        api.current = {
          vestir,
          irPara(id) {
            const t = pontos.find((p) => p.id === id)
            let alvo: import('three').Vector3, pos: import('three').Vector3
            if (t) {
              alvo = noModelo(t.pos)
              pos = deOnde(alvo, t.camara.azimute, t.camara.elevacao, t.camara.distancia)
              acender(t.acende)
            } else {
              alvo = centro.clone()
              pos = deOnde(centro, textos.inicio.azimute, textos.inicio.elevacao, distInicial)
              acender([])
            }
            if (reduzido) {
              controlos.target.copy(alvo)
              camara.position.copy(pos)
              voo = null
            } else {
              voo = { alvo, pos }
            }
          },
        }

        // --- pinos: posição no ecrã a cada fotograma ---
        const posPinos = pontos.map((p) => noModelo(p.pos).add(new THREE.Vector3(0, 2.5, 0)))
        const v = new THREE.Vector3()
        const moverPinos = () => {
          const l = alvoEl.clientWidth
          const a = alvoEl.clientHeight
          posPinos.forEach((p, i) => {
            const el = pinos.current[i]
            if (!el) return
            v.copy(p).project(camara)
            const fora = v.z > 1 || Math.abs(v.x) > 1.05 || Math.abs(v.y) > 1.05
            el.style.transform = `translate(${((v.x + 1) / 2) * l}px, ${((1 - v.y) / 2) * a}px) translate(-50%, -50%)`
            el.style.visibility = fora ? 'hidden' : 'visible'
          })
        }

        // Aproximação exponencial pelo tempo, não por fotograma: a 30 ou a
        // 120 Hz o voo demora o mesmo (~1 s).
        let antes = performance.now()
        const desenhar = () => {
          const agora = performance.now()
          const k = 1 - Math.exp(-Math.min(agora - antes, 100) / 220)
          antes = agora
          if (voo) {
            controlos.target.lerp(voo.alvo, k)
            camara.position.lerp(voo.pos, k)
            if (camara.position.distanceTo(voo.pos) < 0.3 && controlos.target.distanceTo(voo.alvo) < 0.2) voo = null
          }
          controlos.update()
          renderizador.render(cena, camara)
          moverPinos()
        }

        let pedido = 0
        let aCorrer = false
        const laco = () => {
          pedido = requestAnimationFrame(laco)
          desenhar()
        }
        const arrancar = () => {
          if (aCorrer) return
          aCorrer = true
          laco()
        }
        const parar = () => {
          aCorrer = false
          cancelAnimationFrame(pedido)
        }
        let aoAlcance = true
        const rever = () => (aoAlcance && !document.hidden ? arrancar() : parar())
        const aVista = new IntersectionObserver((es) => {
          aoAlcance = es.some((e) => e.isIntersecting)
          rever()
        })
        aVista.observe(alvoEl)
        document.addEventListener('visibilitychange', rever)
        const observador = new ResizeObserver(() => {
          enquadrar()
          desenhar()
        })
        observador.observe(alvoEl)
        rever()
        setEstado('vivo')

        limpar = () => {
          parar()
          api.current = null
          aVista.disconnect()
          observador.disconnect()
          document.removeEventListener('visibilitychange', rever)
          controlos.removeEventListener('start', aoMexer)
          controlos.dispose()
          renderizador.dispose()
          modelo.traverse((o) => {
            const m = o as import('three').Mesh
            if (m.isMesh || (o as import('three').LineSegments).isLineSegments) {
              m.geometry?.dispose()
              const mat = m.material
              if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
              else mat?.dispose()
            }
          })
          malhas.forEach(({ foto, cartao }) => {
            foto.dispose()
            cartao.dispose()
          })
          cacheCartao.forEach((m) => m.dispose())
          rico?.modelo.traverse((o) => {
            const m = o as import('three').Mesh
            if (!m.isMesh) return
            m.geometry.dispose()
            const mat = m.material as Mat
            mat.map?.dispose()
            mat.normalMap?.dispose()
            mat.dispose()
          })
          renderizador.domElement.remove()
        }
      } catch {
        if (vivo) setEstado('sem-webgl')
      }
    })()

    return () => {
      vivo = false
      limpar?.()
    }
    // `pontos` e `textos` são estáticos para um monumento; o modelo só se
    // recarrega quando muda o monumento.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perto, monumento.id])

  const escolher = (id: string | null, daLista = false) => {
    const novo = id === escolhido ? null : id
    setEscolhido(novo)
    api.current?.irPara(novo)
    // Em ecrã estreito a lista fica por baixo da maqueta: quem escolhe lá em
    // baixo não via a câmara mexer. Sobe-se até ao palco, e o texto do ponto
    // aparece logo por baixo dele.
    const el = caixa.current
    if (daLista && novo && el && window.matchMedia('(max-width: 1023px)').matches) {
      const topo = el.getBoundingClientRect().top
      if (topo < 56 || topo > window.innerHeight * 0.4) {
        const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: window.scrollY + topo - 72, behavior: reduzido ? 'auto' : 'smooth' })
      }
    }
  }

  const mudarModo = (m: Modo) => {
    setModo(m)
    modoInicial.current = m
    void api.current?.vestir(m)
  }

  const interactivo = estado === 'vivo'
  const indice = pontos.findIndex((p) => p.id === escolhido)

  return (
    <div className="visita3d">
      <div className="visita3d-coluna">
      <div
        ref={caixa}
        className="visita3d-palco"
        style={{ aspectRatio: `${largura} / ${altura}`, touchAction: interactivo ? 'none' : undefined }}
      >
        <Image
          src={`/maquetas/${monumento.id}-conjunto.webp`}
          width={largura}
          height={altura}
          alt={`Maqueta do ${monumento.nome} e da Alta à volta, vista de sudoeste: o pátio aberto para o vale, a torre no canto.`}
          // O optimizador reconverte e perde o canal alfa (ver `Maqueta`).
          unoptimized
          className="visita3d-cartaz"
          style={{ opacity: interactivo ? 0 : 1 }}
        />
        <div
          ref={montagem}
          className="visita3d-webgl"
          tabIndex={interactivo ? 0 : -1}
          role={interactivo ? 'application' : undefined}
          aria-label={interactivo ? `Maqueta do ${monumento.nome} em três dimensões. Arraste para rodar.` : undefined}
          style={{ opacity: interactivo ? 1 : 0, cursor: interactivo ? 'grab' : 'default' }}
        />

        {interactivo &&
          pontos.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                pinos.current[i] = el
              }}
              type="button"
              className={`visita3d-pino${escolhido === p.id ? ' is-escolhido' : ''}`}
              onClick={() => escolher(p.id)}
              aria-label={p.titulo}
              aria-pressed={escolhido === p.id}
            >
              <span aria-hidden>{i + 1}</span>
              <span className="visita3d-pino-nome" aria-hidden>
                {p.titulo}
              </span>
            </button>
          ))}

        {interactivo && !mexeu && !escolhido && (
          <span className="visita3d-pista" aria-hidden>
            Arraste para rodar · toque num número
          </span>
        )}
        {interactivo && (
          <div className="visita3d-modo" role="group" aria-label="Aspecto da maqueta">
            <button type="button" aria-pressed={modo === 'foto'} onClick={() => mudarModo('foto')}>
              Fotografia
            </button>
            <button type="button" aria-pressed={modo === 'rico'} onClick={() => mudarModo('rico')} aria-busy={aCarregarRico}>
              {aCarregarRico ? 'A carregar…' : 'Reconstituição'}
            </button>
            <button type="button" aria-pressed={modo === 'cartao'} onClick={() => mudarModo('cartao')}>
              Maqueta
            </button>
          </div>
        )}
        {interactivo && escolhido && (
          <button type="button" className="visita3d-tudo" onClick={() => escolher(null)}>
            Ver tudo
          </button>
        )}
      </div>

      {/* A chave muda com o vestido: em fotografia o que é preciso dizer é
          o que não é fotografia (as fachadas); em cartão, o que cada cor é. */}
      <ul className="visita3d-chave">
        {modo === 'rico' ? (
          <>
            <li>
              <span className="chave-cor" style={{ background: 'linear-gradient(90deg, #EFEAE0 50%, #D8C7A0 50%)' }} />
              fachadas, cantarias e torre: desenhadas a partir de fotografias
            </li>
            <li>
              <span className="chave-cor" style={{ background: 'linear-gradient(90deg, #A8573A 50%, #8D979C 50%)' }} />
              telha ou zinco, como na fotografia aérea
            </li>
            <li>
              <span className="chave-cor chave-redonda" style={{ background: '#5F6F44' }} />
              árvore
            </li>
          </>
        ) : modo === 'foto' ? (
          <>
            <li>
              <span className="chave-cor" style={{ background: 'linear-gradient(135deg, #C4643A, #D9CBB2 60%, #8E9A6A)' }} />
              chão e telhados: fotografia aérea
            </li>
            <li>
              <span className="chave-cor" style={{ background: '#EFE9DD' }} />
              fachadas lisas, sem desenho
            </li>
            <li>
              <span className="chave-cor chave-redonda" style={{ background: '#5F6F44' }} />
              árvore
            </li>
          </>
        ) : (
          <>
            <li>
              <span className="chave-cor" style={{ background: '#F7F3EC', borderBottom: '4px solid #B8522C' }} />
              {monumento.nome}
            </li>
            <li>
              <span className="chave-cor" style={{ background: '#CBC1AB' }} />a cidade à volta
            </li>
            <li>
              <span className="chave-cor chave-redonda" style={{ background: '#A7B08F' }} />
              árvore
            </li>
          </>
        )}
      </ul>
      </div>

      {indice >= 0 && (
        <div className="visita3d-legenda" aria-live="polite">
          <span className="visita3d-num">{indice + 1}</span>
          <div>
            <strong className="font-display">{pontos[indice].titulo}</strong>
            <p>{pontos[indice].texto}</p>
          </div>
        </div>
      )}

      <div className="visita3d-lado">
        <ol className="visita3d-lista">
          {pontos.map((p, i) => {
            const aberto = escolhido === p.id
            return (
              <li key={p.id} className={aberto ? 'is-aberto' : undefined}>
                <button type="button" onClick={() => escolher(p.id, true)} aria-expanded={aberto} className="visita3d-item">
                  <span className="visita3d-num">{i + 1}</span>
                  <span className="visita3d-titulo font-display">{p.titulo}</span>
                </button>
                <div className="visita3d-texto" hidden={!aberto}>
                  <p>{p.texto}</p>
                </div>
              </li>
            )
          })}
        </ol>
        {indice >= 0 && (
          <div className="visita3d-passos">
            <button type="button" onClick={() => escolher(pontos[(indice - 1 + pontos.length) % pontos.length].id)}>
              ← Anterior
            </button>
            <button type="button" onClick={() => escolher(pontos[(indice + 1) % pontos.length].id)}>
              Seguinte →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
