'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-config'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  id?: string
}

let sectionIndex = 0

export default function SectionReveal({ children, className = '', id }: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const idx = sectionIndex++
    const xFrom = idx % 2 === 0 ? -30 : 30

    gsap.fromTo(
      el,
      { opacity: 0, y: 40, x: xFrom },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          end: 'top 55%',
          scrub: 0.6,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{ padding: '5rem 4rem' }}
    >
      <div style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}>
        {children}
      </div>
    </section>
  )
}
