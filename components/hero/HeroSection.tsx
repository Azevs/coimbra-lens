'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'
import DataTicker from './DataTicker'
import CityScore from './CityScore'

/** Versão HD em vez da UHD 2560×1440 — a diferença é invisível a 22 %. */
const HERO_VIDEO = 'https://videos.pexels.com/video-files/6962693/6962693-hd_1920_1080_30fps.mp4'

/** Ecrãs largos, sem preferência por movimento reduzido, e só após montar. */
function useHeroVideo(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () =>
      window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches,
    () => false,
  )
}

export default function HeroSection() {
  const showVideo = useHeroVideo()
  const heroRef = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLDivElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const line3 = useRef<HTMLSpanElement>(null)
  const line4 = useRef<HTMLParagraphElement>(null)
  const scrollIndicator = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sem animação, o herói fica no estado de repouso — visível. Animar a
    // partir de opacity 0 sem esta guarda deixa o título invisível sempre
    // que o requestAnimationFrame não corre (separador em segundo plano).
    if (!canAnimate()) return

    // Capturar os nós agora: na limpeza, os refs já podem estar a null.
    const nodes = [line1.current, line2.current, line3.current, line4.current, scrollIndicator.current]

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(line1.current,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo(line2.current,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo(line3.current,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .fromTo(line4.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo(scrollIndicator.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.2')

    const parallax = gsap.to('.hero-bg', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    return () => {
      tl.kill()
      parallax.scrollTrigger?.kill()
      parallax.kill()
      // Nunca deixar o herói invisível ao desmontar.
      gsap.set(nodes, { clearProps: 'opacity,transform' })
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      <DataTicker />
      <div ref={heroRef} className="relative h-screen overflow-hidden" style={{ display: 'flex', alignItems: 'flex-end' }}>
        {/* Video Background */}
        <div className="hero-bg absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'var(--bg-primary)' }} />
          {/* O vídeo é decoração a 22 % de opacidade: não vale megabytes numa
              rede móvel, nem contraria quem pede movimento reduzido. */}
          {showVideo && (
            <video
              autoPlay muted loop playsInline
              preload="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.22 }}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Vignette — darker at edges, lighter at center */}
        <div className="absolute inset-0 z-10" style={{
          background: 'radial-gradient(ellipse 80% 70% at 30% 60%, transparent 0%, rgba(10,13,18,0.7) 60%, rgba(10,13,18,0.97) 100%)',
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />

        {/* Content — left-aligned, bottom-anchored */}
        <div className="relative z-20 hero-content">

          {/* Eyebrow */}
          <div
            ref={line1}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'var(--accent-text)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            CLIMA E AR EM DIRECTO · COIMBRA · {year}
          </div>

          {/* Um único h1 — "Coimbra" e "Lens" são a mesma manchete. */}
          <h1 style={{ marginBottom: '2rem' }}>
            <span
              ref={line2}
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontWeight: 700,
                fontSize: 'clamp(4rem, 11vw, 8.5rem)',
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                lineHeight: 0.9,
                display: 'block',
              }}
            >
              Coimbra
            </span>
            <span
              ref={line3}
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(4rem, 11vw, 8.5rem)',
                letterSpacing: '-0.04em',
                // Texto grande: 3:1 basta, por isso mantém-se o acento da marca.
                color: 'var(--accent)',
                lineHeight: 0.9,
                display: 'block',
              }}
            >
              Lens
            </span>
          </h1>

          {/* Descriptor line */}
          <p
            ref={line4}
            style={{
              fontFamily: 'var(--font-ibm-plex)',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              maxWidth: '26rem',
              lineHeight: 1.6,
            }}
          >
            A cidade em dados —<br />viva, precisa, agora.
          </p>
        </div>

        {/* City Score — top-right */}
        <CityScore />

        {/* Scroll indicator */}
        <div
          ref={scrollIndicator}
          className="absolute z-20 hero-scroll"
          style={{ bottom: '2.5rem', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <span style={{
            fontFamily: 'var(--font-ibm-plex)',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}>
            Explorar
          </span>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} className="animate-bounce-down" />
        </div>
      </div>
    </>
  )
}
