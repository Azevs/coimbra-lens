'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import DataTicker from './DataTicker'
import CityScore from './CityScore'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLDivElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const line3 = useRef<HTMLSpanElement>(null)
  const line4 = useRef<HTMLParagraphElement>(null)
  const scrollIndicator = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(line1.current,   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .fromTo(line2.current,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .fromTo(line3.current,   { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .fromTo(line4.current,   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .fromTo(scrollIndicator.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' }, '-=0.2')

    gsap.to('.hero-bg', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  const year = new Date().getFullYear()

  return (
    <>
      <DataTicker />
      <div ref={heroRef} className="relative h-screen overflow-hidden" style={{ display: 'flex', alignItems: 'flex-end' }}>
        {/* Video Background */}
        <div className="hero-bg absolute inset-0">
          <div className="absolute inset-0" style={{ background: '#0A0D12' }} />
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.22 }}
          >
            <source src="https://videos.pexels.com/video-files/6962693/6962693-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Vignette — darker at edges, lighter at center */}
        <div className="absolute inset-0 z-10" style={{
          background: 'radial-gradient(ellipse 80% 70% at 30% 60%, transparent 0%, rgba(10,13,18,0.7) 60%, rgba(10,13,18,0.97) 100%)',
        }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '40%', background: 'linear-gradient(to bottom, transparent, var(--bg-primary))' }} />

        {/* Content — left-aligned, bottom-anchored */}
        <div className="relative z-20" style={{ padding: '0 4rem 6rem', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>

          {/* Eyebrow */}
          <div
            ref={line1}
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
            DADOS EM TEMPO REAL · COIMBRA · {year}
          </div>

          {/* Main title */}
          <h1 style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
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
          </h1>
          <h1 style={{ overflow: 'hidden', marginBottom: '2rem' }}>
            <span
              ref={line3}
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(4rem, 11vw, 8.5rem)',
                letterSpacing: '-0.04em',
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
          className="absolute z-20"
          style={{ bottom: '2.5rem', left: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
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
