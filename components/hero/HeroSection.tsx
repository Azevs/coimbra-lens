'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import DataTicker from './DataTicker'
import CityScore from './CityScore'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLDivElement>(null)
  const line2 = useRef<HTMLDivElement>(null)
  const line3 = useRef<HTMLDivElement>(null)
  const line4 = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.from(line1.current, { y: 30, duration: 0.8, ease: 'power2.out' })
      .from(line2.current, { y: 40, duration: 0.9, ease: 'power2.out' }, '-=0.4')
      .from(line3.current, { y: 40, duration: 0.9, ease: 'power2.out' }, '-=0.5')
      .from(line4.current, { y: 20, duration: 0.7, ease: 'power2.out' }, '-=0.4')

    // Parallax
    gsap.to('.hero-bg', {
      yPercent: -30,
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
      <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div className="hero-bg absolute inset-0">
          {/* Dark fallback behind video */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, #0D1525 0%, #070B14 100%)' }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/6962693/6962693-uhd_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,11,20,0.6) 0%, rgba(7,11,20,0.85) 50%, rgba(7,11,20,0.98) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-20 text-center px-4">
          <div ref={line1} className="font-data text-sm tracking-widest mb-4">
            DADOS EM TEMPO REAL · COIMBRA · {year}
          </div>
          <h1>
            <span ref={line2} className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--text-primary)] block" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              Coimbra
            </span>
            <span ref={line3} className="font-display text-6xl md:text-8xl lg:text-9xl text-[var(--accent-gold)] block" style={{ textShadow: '0 4px 30px rgba(201,168,76,0.5)' }}>
              Lens
            </span>
          </h1>
          <p ref={line4} className="text-[var(--text-primary)] text-lg md:text-xl max-w-lg mx-auto" style={{ marginTop: '2.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            A cidade em dados. Viva, precisa, agora.
          </p>
        </div>

        {/* City Score arc */}
        <CityScore />

        {/* Scroll indicator */}
        <div ref={scrollRef} className="absolute bottom-8 z-20 flex flex-col items-center gap-2" style={{ opacity: 1 }}>
          <span className="label-text" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.9)', letterSpacing: '0.2em' }}>EXPLORAR</span>
          <svg
            className="animate-bounce-down"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2.5"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  )
}
