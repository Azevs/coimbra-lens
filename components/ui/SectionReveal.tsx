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

    sectionIndex++

    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'top 60%',
          scrub: false,
          once: true,
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
      style={{ padding: '6rem 4rem' }}
    >
      <div style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}>
        {children}
      </div>
    </section>
  )
}
