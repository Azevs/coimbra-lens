'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { UrbanZone } from '@/lib/urban-zones'

/**
 * A maqueta que se roda.
 *
 * O mesmo modelo que gerou as estampas, agora em WebGL: arrasta-se para
 * rodar, roda do rato para aproximar. A estampa fica por baixo como cartaz —
 * é o que se vê enquanto carrega, e é o que fica se não houver WebGL.
 *
 * TRÊS DECISÕES DE PESO
 *
 * O three.js e o modelo só são pedidos quando o bloco se aproxima do ecrã.
 * São ~190 KB de biblioteca e ~190 KB de modelo e descodificador; quem
 * chega à página e não desce nunca chega a pagá-los.
 *
 * O `.glb` vem comprimido com Draco. Medido: 129 KB o modelo mais 57 KB o
 * descodificador, contra 343 KB sem compressão — e como o servidor não
 * comprime `model/gltf-binary`, sem Draco seriam 1,6 MB reais.
 *
 * A câmara não roda sozinha. Movimento automático numa página que já tem
 * animações de entrada é ruído, e quem pediu movimento reduzido não o quer
 * de todo. A pista de que se pode mexer é uma etiqueta que desaparece ao
 * primeiro toque.
 */

interface Props {
  zona: UrbanZone
  /** Vista usada como cartaz enquanto o modelo carrega. */
  cartaz: string
  largura: number
  altura: number
  legenda: string
  /**
   * Ângulo de partida da câmara, em graus — os mesmos azimute e elevação da
   * vista do cartaz no `maqueta.py`, para o modelo abrir onde a estampa estava.
   */
  azimute?: number
  elevacao?: number
  /**
   * A vista para ecrãs estreitos (até 699 px): palco ao alto, com o seu
   * cartaz, a sua legenda e o seu ângulo. Uma zona comprida vista de lado
   * ficava uma tira de 300 px num telemóvel; olhada ao longo do eixo, a placa
   * enche o ecrã sem obrigar a deitar o telemóvel.
   */
  vertical?: { cartaz: string; largura: number; altura: number; legenda: string; azimute: number; elevacao: number }
  /**
   * Pontos numerados sobre a maqueta. Tocar num leva a câmara até ele (a
   * posição vem do gerador; a câmara, do texto) e abre o texto por baixo.
   */
  pontos?: PontoViva[]
}

export interface PontoViva {
  id: string
  titulo: string
  texto: string
  /** [x nascente, y norte, z cota] nas coordenadas da maqueta. */
  pos: [number, number, number]
  camara: { azimute: number; elevacao: number; distancia: number }
  ligacao?: { href: string; rotulo: string }
}

/** O mesmo limiar do CSS (`.maqueta-palco` em `globals.css`). */
const ESTREITO = '(max-width: 699px)'

type Estado = 'cartaz' | 'a-carregar' | 'vivo' | 'sem-webgl'

/** O WebGL pode faltar por hardware, por definição ou por política. */
function temWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') ?? c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function MaquetaViva({
  zona,
  cartaz,
  largura,
  altura,
  legenda,
  azimute: azimuteGraus = -104,
  elevacao: elevacaoGraus = 34,
  vertical,
  pontos = [],
}: Props) {
  const caixa = useRef<HTMLDivElement>(null)
  const montagem = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<Estado>('cartaz')
  const [mexeu, setMexeu] = useState(false)
  const [erro, setErro] = useState(false)
  const rico = !!zona.rico
  // Os ângulos da vista vertical, soltos: o objecto `vertical` é novo a cada
  // render e recarregaria o modelo.
  const vAz = vertical?.azimute
  const vEl = vertical?.elevacao

  // Os pontos: o escolhido, os botões sobre a maqueta (movidos a cada
  // fotograma, fora do React) e a ordem para a câmara voar.
  const [escolhido, setEscolhido] = useState<string | null>(null)
  const pinos = useRef<(HTMLButtonElement | null)[]>([])
  const api = useRef<{ irPara: (id: string | null) => void } | null>(null)
  const pontosRef = useRef(pontos)

  // Só carrega quando chega perto do ecrã.
  const [perto, setPerto] = useState(false)
  useEffect(() => {
    const el = caixa.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setPerto(true)
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setPerto(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Depende de `perto`, nunca de `estado`: pôr o estado aqui fazia o efeito
  // correr de novo mal ele mudasse para 'a-carregar', e a limpeza cancelava
  // o carregamento antes de o modelo chegar a ser pedido.
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
        const gltf = await new GLTFLoader().setDRACOLoader(draco).loadAsync(`/maquetas/${zona.id}.glb`)
        draco.dispose()
        if (!vivo || !montagem.current) return

        const alvoEl = montagem.current
        const cena = new THREE.Scene()

        // Sem fundo: o papel da página aparece por trás, como nas estampas.
        const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderizador.shadowMap.enabled = true
        renderizador.shadowMap.type = THREE.PCFShadowMap
        // A reconstituição traz texturas com as cores certas: tom neutro, como
        // no /visitar (o AgX dessaturava a telha). O cartão fica com o AgX.
        renderizador.toneMapping = rico ? THREE.NeutralToneMapping : THREE.AgXToneMapping
        renderizador.toneMappingExposure = 1.0
        alvoEl.appendChild(renderizador.domElement)
        renderizador.domElement.style.display = 'block'
        renderizador.domElement.style.width = '100%'
        renderizador.domElement.style.height = '100%'
        renderizador.domElement.style.outline = 'none'

        const modelo = gltf.scene
        cena.add(modelo)

        // Contorno nos volumes, como o Freestyle das estampas de cartão: dois
        // prédios brancos encostados fundem-se num bloco só sem uma aresta a
        // separá-los. O terreno fica de fora — as suas arestas são ruído de
        // malha, não desenho. A reconstituição não tem traço: desenha-se com
        // materiais, e mil prédios com as arestas a tinta liam-se como um
        // borrão escuro.
        const corTinta = new THREE.Color('#14171C')
        modelo.traverse((o) => {
          const m = o as import('three').Mesh
          if (!m.isMesh) return
          m.castShadow = true
          m.receiveShadow = true
          if (!rico && (m.name.startsWith('Edif_') || m.name === 'Base')) {
            const arestas = new THREE.LineSegments(
              new THREE.EdgesGeometry(m.geometry, 28),
              new THREE.LineBasicMaterial({ color: corTinta, transparent: true, opacity: 0.55 })
            )
            m.add(arestas)
          }
        })

        // --- luz: o mesmo sol das estampas ---
        // Na reconstituição as texturas são de albedo, sem a luz indirecta do
        // Cycles: com a luz do cartão a telha escurecia (os valores são os do
        // /visitar).
        cena.add(new THREE.HemisphereLight(0xf2eee6, 0xbfb6a2, rico ? 2.0 : 1.15))
        const sol = new THREE.DirectionalLight(0xfff4e2, rico ? 2.2 : 2.6)
        const caixaM = new THREE.Box3().setFromObject(modelo)
        const centro = caixaM.getCenter(new THREE.Vector3())
        const tamanho = caixaM.getSize(new THREE.Vector3())
        const raio = Math.max(tamanho.x, tamanho.z) / 2
        sol.position.set(centro.x - raio * 0.7, centro.y + raio * 1.1, centro.z + raio * 0.6)
        sol.target.position.copy(centro)
        sol.castShadow = true
        // Uma zona tem quase um quilómetro: a 2048 cada texel de sombra teria
        // mais de meio metro, e as ruas estreitas ficavam sem sombra.
        sol.shadow.mapSize.set(4096, 4096)
        sol.shadow.bias = -0.0004
        const c = sol.shadow.camera
        c.near = 1
        c.far = raio * 5
        c.left = -raio * 1.2
        c.right = raio * 1.2
        c.top = raio * 1.2
        c.bottom = -raio * 1.2
        c.updateProjectionMatrix()
        cena.add(sol, sol.target)

        // --- câmara, a apanhar o mesmo ângulo da estampa ---
        const camara = new THREE.PerspectiveCamera(34, 1, 1, raio * 12)
        const estreito = window.matchMedia(ESTREITO)
        const direccao = new THREE.Vector3()
        function apontar() {
          const [az, el] = (vAz != null && vEl != null && estreito.matches ? [vAz, vEl] : [azimuteGraus, elevacaoGraus])
            .map((g) => (g * Math.PI) / 180)
          direccao.set(Math.cos(az) * Math.cos(el), Math.sin(el), -Math.sin(az) * Math.cos(el))
        }
        apontar()

        // Enquadrar pelos vértices e não pela esfera envolvente: a esfera de
        // uma placa comprida e baixa é quase toda ar, e a maqueta abria a um
        // terço do palco. Amostram-se os vértices (um em cada 40 chega) e
        // recua-se na direcção de partida até todos caberem.
        const amostra: import('three').Vector3[] = []
        modelo.updateMatrixWorld(true)
        modelo.traverse((o) => {
          const m = o as import('three').Mesh
          if (!m.isMesh) return
          const pos = m.geometry.getAttribute('position')
          for (let i = 0; i < pos.count; i += 40) {
            amostra.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld))
          }
        })
        const caixaV = new THREE.Box3().setFromPoints(amostra)
        const centroV = caixaV.getCenter(new THREE.Vector3())
        const alvo = centroV.clone()
        const tmp = new THREE.Vector3()
        function distanciaQueCabe() {
          let lo = raio * 0.2
          let hi = raio * 10
          for (let k = 0; k < 32; k++) {
            const d = (lo + hi) / 2
            camara.position.copy(alvo).addScaledVector(direccao, d)
            camara.lookAt(alvo)
            camara.updateMatrixWorld()
            const cabe = amostra.every((p) => {
              tmp.copy(p).project(camara)
              return Math.abs(tmp.x) <= 0.96 && Math.abs(tmp.y) <= 0.94
            })
            if (cabe) hi = d
            else lo = d
          }
          return hi
        }
        // Com perspectiva, o centro da caixa não cai no centro da imagem: a
        // ponta perto da câmara cresce e a de lá encolhe, e sobrava uma faixa
        // vazia. Desloca-se o alvo no plano da câmara até a projecção ficar
        // centrada (três voltas chegam), e só então se mede a distância.
        const direita = new THREE.Vector3()
        const cima = new THREE.Vector3()
        function centrarEDistancia() {
          alvo.copy(centroV)
          let d = distanciaQueCabe()
          for (let volta = 0; volta < 3; volta++) {
            let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity
            for (const p of amostra) {
              tmp.copy(p).project(camara)
              x0 = Math.min(x0, tmp.x); x1 = Math.max(x1, tmp.x)
              y0 = Math.min(y0, tmp.y); y1 = Math.max(y1, tmp.y)
            }
            const meiaV = Math.tan(((camara.fov / 2) * Math.PI) / 180) * d
            direita.setFromMatrixColumn(camara.matrixWorld, 0)
            cima.setFromMatrixColumn(camara.matrixWorld, 1)
            alvo.addScaledVector(direita, ((x0 + x1) / 2) * meiaV * camara.aspect)
            alvo.addScaledVector(cima, ((y0 + y1) / 2) * meiaV)
            d = distanciaQueCabe()
          }
          return d
        }

        const controlos = new OrbitControls(camara, renderizador.domElement)
        controlos.target.copy(alvo)
        controlos.enableDamping = true
        controlos.dampingFactor = 0.08
        // Uma zona é comprida: sem deslocar, só se aproximava o meio. Desloca-se
        // no plano do chão, e o alvo nunca sai de cima da placa.
        controlos.enablePan = true
        controlos.screenSpacePanning = false
        controlos.minPolarAngle = 0.12
        controlos.maxPolarAngle = Math.PI / 2 - 0.04 // nunca por baixo da placa
        // A cota do alvo fica a de partida: deslocar é andar no plano, não subir.
        // Durante um voo até um ponto, o voo é que manda.
        let yAlvo = alvo.y
        let voo: { alvo: import('three').Vector3; pos: import('three').Vector3 } | null = null
        controlos.addEventListener('change', () => {
          if (voo) return
          const t = controlos.target
          const antes = t.clone()
          t.x = Math.min(caixaV.max.x, Math.max(caixaV.min.x, t.x))
          t.z = Math.min(caixaV.max.z, Math.max(caixaV.min.z, t.z))
          t.y = yAlvo
          if (!antes.equals(t)) camara.position.add(tmp.copy(t).sub(antes))
        })

        let distInicial = raio * 3
        function enquadrar() {
          const l = alvoEl.clientWidth
          const a = alvoEl.clientHeight
          if (!l || !a) return
          renderizador.setSize(l, a, false)
          camara.aspect = l / a
          camara.updateProjectionMatrix()
          const pos = camara.position.clone()
          distInicial = centrarEDistancia()
          camara.position.copy(pos)
          // Até ~40 m do alvo: perto o bastante para ler uma rua.
          controlos.minDistance = 40
          controlos.maxDistance = distInicial * 1.4
        }

        const recomecar = () => {
          controlos.target.copy(alvo)
          yAlvo = alvo.y
          camara.position.copy(alvo).addScaledVector(direccao, distInicial)
          controlos.update()
        }
        enquadrar()
        recomecar()

        // Rodar o telemóvel, ou estreitar a janela, troca de vista: recomeça
        // do ângulo dessa vista.
        const aoMudarDeVista = () => {
          apontar()
          enquadrar()
          recomecar()
        }
        estreito.addEventListener('change', aoMudarDeVista)

        const aoMexer = () => {
          setMexeu(true)
          if (voo) {
            yAlvo = controlos.target.y
            voo = null
          }
        }
        controlos.addEventListener('start', aoMexer)

        // --- pontos: voar até eles, e os números a seguir a maqueta ---
        // Coordenadas da maqueta (x nascente, y norte, z cota) → three (y para cima).
        const noModelo = ([x, y, z]: [number, number, number]) => new THREE.Vector3(x, z, -y)
        const deOnde = (a: import('three').Vector3, azG: number, elG: number, d: number) => {
          const az = (azG * Math.PI) / 180
          const el = (elG * Math.PI) / 180
          return new THREE.Vector3(
            a.x + Math.cos(az) * Math.cos(el) * d,
            a.y + Math.sin(el) * d,
            a.z - Math.sin(az) * Math.cos(el) * d
          )
        }
        const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        api.current = {
          irPara(id) {
            const p = pontosRef.current.find((q) => q.id === id)
            const a = p ? noModelo(p.pos) : alvo.clone()
            const pos = p
              ? deOnde(a, p.camara.azimute, p.camara.elevacao, p.camara.distancia)
              : a.clone().addScaledVector(direccao, distInicial)
            if (reduzido) {
              controlos.target.copy(a)
              camara.position.copy(pos)
              yAlvo = a.y
              voo = null
            } else {
              voo = { alvo: a, pos }
            }
          },
        }
        const posPinos = pontosRef.current.map((p) => noModelo(p.pos).add(new THREE.Vector3(0, 3, 0)))
        const vp = new THREE.Vector3()
        const moverPinos = () => {
          const l = alvoEl.clientWidth
          const a = alvoEl.clientHeight
          posPinos.forEach((p, i) => {
            const el = pinos.current[i]
            if (!el) return
            vp.copy(p).project(camara)
            const fora = vp.z > 1 || Math.abs(vp.x) > 1.05 || Math.abs(vp.y) > 1.05
            el.style.transform = `translate(${((vp.x + 1) / 2) * l}px, ${((1 - vp.y) / 2) * a}px) translate(-50%, -50%)`
            el.style.visibility = fora ? 'hidden' : 'visible'
          })
        }

        const observador = new ResizeObserver(() => {
          enquadrar()
          desenhar()
        })
        observador.observe(alvoEl)

        // O laço corre enquanto a maqueta está à vista e o separador em
        // primeiro plano, e pára em qualquer outro caso. Desenhar só quando
        // os controlos mexem não chega: o WebGL não garante o conteúdo do
        // buffer depois de o apresentar, e a maqueta ficava em branco entre
        // interacções.
        let pedido = 0
        let aCorrer = false

        // Aproximação exponencial pelo tempo, não por fotograma: a 30 ou a
        // 120 Hz o voo demora o mesmo (~1 s), como no /visitar.
        let antes = performance.now()
        const desenhar = () => {
          const agora = performance.now()
          const k = 1 - Math.exp(-Math.min(agora - antes, 100) / 220)
          antes = agora
          if (voo) {
            controlos.target.lerp(voo.alvo, k)
            camara.position.lerp(voo.pos, k)
            if (camara.position.distanceTo(voo.pos) < 0.3 && controlos.target.distanceTo(voo.alvo) < 0.2) {
              yAlvo = voo.alvo.y
              voo = null
            }
          }
          controlos.update()
          renderizador.render(cena, camara)
          moverPinos()
        }
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
          pedido = 0
        }

        // As duas condições guardam-se em separado. Juntá-las na resposta de
        // cada observador fazia com que voltar ao separador arrancasse o laço
        // mesmo com a maqueta fora do ecrã.
        let aoAlcance = true
        const rever = () => (aoAlcance && !document.hidden ? arrancar() : parar())

        const aVista = new IntersectionObserver(
          (es) => {
            aoAlcance = es.some((e) => e.isIntersecting)
            rever()
          },
          { threshold: 0 }
        )
        aVista.observe(alvoEl)
        const aoTrocarSeparador = () => rever()
        document.addEventListener('visibilitychange', aoTrocarSeparador)

        rever()

        setEstado('vivo')

        limpar = () => {
          parar()
          api.current = null
          estreito.removeEventListener('change', aoMudarDeVista)
          aVista.disconnect()
          document.removeEventListener('visibilitychange', aoTrocarSeparador)
          observador.disconnect()
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
          renderizador.domElement.remove()
        }
      } catch {
        if (vivo) {
          setErro(true)
          setEstado('sem-webgl')
        }
      }
    })()

    return () => {
      vivo = false
      limpar?.()
    }
  }, [perto, zona.id, rico, azimuteGraus, elevacaoGraus, vAz, vEl])

  const interactivo = estado === 'vivo'
  const indice = pontos.findIndex((p) => p.id === escolhido)

  const escolher = (id: string | null, daLista = false) => {
    const novo = daLista && id === escolhido ? null : id
    setEscolhido(novo)
    api.current?.irPara(novo)
    // Quem escolhe na lista, por baixo, não via a câmara mexer: sobe-se até
    // à maqueta quando ela não está à vista.
    const el = caixa.current
    if (daLista && novo && el) {
      const r = el.getBoundingClientRect()
      if (r.top < 56 || r.bottom > window.innerHeight) {
        const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: window.scrollY + r.top - 72, behavior: reduzido ? 'auto' : 'smooth' })
      }
    }
  }

  return (
    <figure style={{ margin: 0 }} className={vertical ? 'tem-vertical' : undefined}>
      <div
        ref={caixa}
        className="maqueta-palco"
        style={
          {
            position: 'relative',
            width: '100%',
            // Os números de um ponto fora de vista não saem do palco.
            overflow: 'hidden',
            // O palco muda de proporção pelo CSS, sem esperar pelo JavaScript
            // (ver `.maqueta-palco` em globals.css).
            '--ar-largo': `${largura} / ${altura}`,
            '--ar-alto': vertical ? `${vertical.largura} / ${vertical.altura}` : undefined,
            touchAction: interactivo ? 'none' : undefined,
          } as React.CSSProperties
        }
      >
        {/* Cartaz: visível até o modelo estar pronto, e para sempre se não houver WebGL. */}
        <picture>
          {vertical && <source media={ESTREITO} srcSet={`/maquetas/${zona.id}-${vertical.cartaz}.webp`} />}
          <Image
            src={`/maquetas/${zona.id}-${cartaz}.webp`}
            width={largura}
            height={altura}
            alt={`Maqueta da ${zona.nome}: ${legenda}`}
            priority
            // Como no <Maqueta>: o optimizador reconverte e perde o canal alfa,
            // e o ficheiro já vem dimensionado e leve.
            unoptimized
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              opacity: interactivo ? 0 : 1,
              transition: 'opacity 420ms ease',
              pointerEvents: 'none',
            }}
          />
        </picture>

        <div
          ref={montagem}
          tabIndex={interactivo ? 0 : -1}
          role={interactivo ? 'application' : undefined}
          aria-label={
            interactivo ? `Maqueta da ${zona.nome} em três dimensões. Arraste para rodar.` : undefined
          }
          style={{
            position: 'absolute',
            inset: 0,
            opacity: interactivo ? 1 : 0,
            transition: 'opacity 420ms ease',
            cursor: interactivo ? 'grab' : 'default',
          }}
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
        {interactivo && escolhido && (
          <button type="button" className="visita3d-tudo" onClick={() => escolher(null)}>
            Ver tudo
          </button>
        )}

        {interactivo && !mexeu && !escolhido && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '4%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              background: 'var(--bg-primary)',
              padding: '0.4rem 0.7rem',
              border: '1px solid var(--border-subtle)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {pontos.length ? 'Arraste para rodar · toque num número' : 'Arraste para rodar'}
          </span>
        )}
      </div>

      <figcaption
        style={{
          marginTop: '0.75rem',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: '42rem',
        }}
      >
        {vertical ? (
          <>
            <span className="maqueta-so-largo">{legenda}</span>
            <span className="maqueta-so-alto">{vertical.legenda}</span>
          </>
        ) : (
          legenda
        )}
        {erro && ' A versão que se roda não abriu neste dispositivo.'}
      </figcaption>

      {pontos.length > 0 && (
        <>
          <ol className="zona-pontos">
            {pontos.map((p, i) => (
              <li key={p.id} className={escolhido === p.id ? 'is-aberto' : undefined}>
                <button
                  type="button"
                  className="visita3d-item"
                  onClick={() => escolher(p.id, true)}
                  aria-pressed={escolhido === p.id}
                >
                  <span className="visita3d-num">{i + 1}</span>
                  <span className="visita3d-titulo font-display">{p.titulo}</span>
                </button>
              </li>
            ))}
          </ol>
          {indice >= 0 && (
            <div className="zona-ponto" aria-live="polite">
              <span className="visita3d-num">{indice + 1}</span>
              <div>
                <strong className="font-display">{pontos[indice].titulo}</strong>
                <p>{pontos[indice].texto}</p>
                {pontos[indice].ligacao && (
                  <Link href={pontos[indice].ligacao!.href} className="lugar-mais">
                    {pontos[indice].ligacao!.rotulo} →
                  </Link>
                )}
                <div className="visita3d-passos">
                  <button type="button" onClick={() => escolher(pontos[(indice - 1 + pontos.length) % pontos.length].id)}>
                    ← Anterior
                  </button>
                  <button type="button" onClick={() => escolher(pontos[(indice + 1) % pontos.length].id)}>
                    Seguinte →
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </figure>
  )
}
