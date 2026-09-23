'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { canAnimate } from '@/lib/motion'
import type { Luz } from '@/lib/sun'

/**
 * A cidade por trás da manchete.
 *
 * É fundo, não informação: não tem camadas de dados, não responde ao rato
 * e está fora da árvore de acessibilidade. A única coisa que traz da
 * realidade é a luz — o `lightPreset` do estilo Standard segue a altura
 * do sol que o herói calcula.
 *
 * Sem chave ou sem resposta do Mapbox fica o degradê do herói por baixo,
 * que já é um fundo completo.
 */

/** Sobre o Mondego, a olhar a Alta de frente. */
const CAMERA = { center: [-8.4262, 40.2072] as [number, number], zoom: 15.4, pitch: 66, bearing: 68 }

/**
 * De noite o tema esbatido deixa a cidade em tons que a tinta clara
 * aguenta por cima. De dia esbatia demais: fica o de origem, aquecido
 * para o papel no CSS (`.hero-map canvas`).
 */
const THEME: Record<Luz, 'default' | 'faded'> = { dawn: 'default', day: 'default', dusk: 'faded', night: 'faded' }

/** Uma volta em doze minutos: dá-se por ela, não distrai da leitura. */
const ORBIT_DEG_PER_S = 0.5

/** Com o texto à esquerda, a Alta encosta-se à direita do ecrã. */
function padding(): mapboxgl.PaddingOptions {
  const w = window.innerWidth
  return w >= 1024
    ? { left: Math.round(w * 0.42), right: 0, top: 0, bottom: 0 }
    : { left: 0, right: 0, top: 0, bottom: 0 }
}

export default function HeroMap({ luz }: { luz: Luz }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [shown, setShown] = useState(false)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

  useEffect(() => {
    if (!containerRef.current || !token) return
    mapboxgl.accessToken = token
    const animate = canAnimate()

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      config: {
        basemap: {
          lightPreset: luz,
          theme: THEME[luz],
          showPointOfInterestLabels: false,
          showTransitLabels: false,
          showRoadLabels: false,
          showPlaceLabels: false,
        },
      },
      ...CAMERA,
      interactive: false,
      attributionControl: false,
      antialias: true,
      fadeDuration: 0,
    })
    // `padding` não faz parte do tipo MapOptions do mapbox-gl 3.19: aplica-se
    // logo a seguir, antes do primeiro desenho.
    map.setPadding(padding())
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')
    map.on('error', (e) => console.warn('[HeroMap]', e.error?.message ?? e))

    map.on('style.load', () => {
      // Sem terreno a Alta e o rio ficam ao mesmo nível — e a colina é
      // metade do retrato da cidade.
      map.addSource('mapbox-dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512 })
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.35 })
    })
    let frame = 0
    let visible = true
    let last = 0
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      if (visible && document.visibilityState === 'visible') {
        map.setBearing(map.getBearing() + ORBIT_DEG_PER_S * dt)
      }
      frame = requestAnimationFrame(tick)
    }

    // Só aparece com a primeira imagem completa (`load`): a cidade não se
    // monta aos bocados por trás da manchete. A órbita começa nesse
    // momento. Com terreno e edifícios em 3D, numa máquina lenta, o `load`
    // pode tardar — ao fim de 6 s mostra-se o que houver.
    let started = false
    const start = () => {
      if (started) return
      started = true
      setShown(true)
      if (animate) frame = requestAnimationFrame(tick)
    }
    map.once('load', start)
    const fallback = setTimeout(start, 6000)

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0 })
    io.observe(containerRef.current)

    const onResize = () => map.setPadding(padding())
    window.addEventListener('resize', onResize)

    mapRef.current = map
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(fallback)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      map.remove()
      mapRef.current = null
    }
    // A luz inicial entra na criação; as mudanças seguintes vão pelo efeito
    // de baixo, sem recriar o mapa.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return
    map.setConfigProperty('basemap', 'lightPreset', luz)
    map.setConfigProperty('basemap', 'theme', THEME[luz])
  }, [luz])

  return <div ref={containerRef} className={`hero-map ${shown ? 'is-shown' : ''}`} aria-hidden="true" />
}
