'use client'

import Image from 'next/image'
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
}

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
}: Props) {
  const caixa = useRef<HTMLDivElement>(null)
  const montagem = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<Estado>('cartaz')
  const [mexeu, setMexeu] = useState(false)
  const [erro, setErro] = useState(false)

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
        renderizador.shadowMap.type = THREE.PCFSoftShadowMap
        renderizador.toneMapping = THREE.AgXToneMapping
        renderizador.toneMappingExposure = 1.0
        alvoEl.appendChild(renderizador.domElement)
        renderizador.domElement.style.display = 'block'
        renderizador.domElement.style.width = '100%'
        renderizador.domElement.style.height = '100%'
        renderizador.domElement.style.outline = 'none'

        const modelo = gltf.scene
        cena.add(modelo)

        // Contorno nos volumes, como o Freestyle das estampas: dois prédios
        // brancos encostados fundem-se num bloco só sem uma aresta a separá-los.
        // O terreno fica de fora — as suas arestas são ruído de malha, não
        // desenho.
        const corTinta = new THREE.Color('#14171C')
        modelo.traverse((o) => {
          const m = o as import('three').Mesh
          if (!m.isMesh) return
          m.castShadow = true
          m.receiveShadow = true
          if (m.name.startsWith('Edif_') || m.name === 'Base') {
            const arestas = new THREE.LineSegments(
              new THREE.EdgesGeometry(m.geometry, 28),
              new THREE.LineBasicMaterial({ color: corTinta, transparent: true, opacity: 0.55 })
            )
            m.add(arestas)
          }
        })

        // --- luz: o mesmo sol das estampas ---
        cena.add(new THREE.HemisphereLight(0xf2eee6, 0xbfb6a2, 1.15))
        const sol = new THREE.DirectionalLight(0xfff4e2, 2.6)
        const caixaM = new THREE.Box3().setFromObject(modelo)
        const centro = caixaM.getCenter(new THREE.Vector3())
        const tamanho = caixaM.getSize(new THREE.Vector3())
        const raio = Math.max(tamanho.x, tamanho.z) / 2
        sol.position.set(centro.x - raio * 0.7, centro.y + raio * 1.1, centro.z + raio * 0.6)
        sol.target.position.copy(centro)
        sol.castShadow = true
        sol.shadow.mapSize.set(2048, 2048)
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
        const azimute = (azimuteGraus * Math.PI) / 180
        const elevacao = (elevacaoGraus * Math.PI) / 180

        function enquadrar() {
          const l = alvoEl.clientWidth
          const a = alvoEl.clientHeight
          if (!l || !a) return
          renderizador.setSize(l, a, false)
          camara.aspect = l / a
          camara.updateProjectionMatrix()
          // Distância que faz caber a esfera envolvente no menor dos dois campos.
          const esfera = caixaM.getBoundingSphere(new THREE.Sphere())
          const fovV = (camara.fov * Math.PI) / 180
          const fovH = 2 * Math.atan(Math.tan(fovV / 2) * camara.aspect)
          const d = (esfera.radius * 1.05) / Math.sin(Math.min(fovV, fovH) / 2)
          controlos.minDistance = d * 0.18
          controlos.maxDistance = d * 1.35
          return d
        }

        const controlos = new OrbitControls(camara, renderizador.domElement)
        controlos.target.copy(centro)
        controlos.enableDamping = true
        controlos.dampingFactor = 0.08
        controlos.enablePan = false // a maqueta é o assunto; deslocá-la só a perde
        controlos.minPolarAngle = 0.12
        controlos.maxPolarAngle = Math.PI / 2 - 0.04 // nunca por baixo da placa

        const d = enquadrar() ?? raio * 3
        camara.position.set(
          centro.x + Math.cos(azimute) * Math.cos(elevacao) * d,
          centro.y + Math.sin(elevacao) * d,
          centro.z - Math.sin(azimute) * Math.cos(elevacao) * d
        )
        controlos.update()

        const aoMexer = () => setMexeu(true)
        controlos.addEventListener('start', aoMexer)

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

        const desenhar = () => {
          controlos.update()
          renderizador.render(cena, camara)
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
  }, [perto, zona.id, azimuteGraus, elevacaoGraus])

  const interactivo = estado === 'vivo'

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={caixa}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: `${largura} / ${altura}`,
          touchAction: interactivo ? 'none' : undefined,
        }}
      >
        {/* Cartaz: visível até o modelo estar pronto, e para sempre se não houver WebGL. */}
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

        {interactivo && !mexeu && (
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
              pointerEvents: 'none',
            }}
          >
            Arraste para rodar
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
        {legenda}
        {erro && ' A versão que se roda não abriu neste dispositivo.'}
      </figcaption>
    </figure>
  )
}
