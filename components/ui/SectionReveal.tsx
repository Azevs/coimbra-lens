'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionReveal({ children, className = '', id }: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // O estado de repouso é visível. A animação só arranca quando é seguro
    // executá-la: caso contrário o conteúdo ficaria preso em opacity 0 —
    // é o que acontece num separador em segundo plano, onde o
    // requestAnimationFrame do GSAP não corre e o `from` nunca avança.
    if (!canAnimate()) return

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      // Devolver o elemento ao estado de repouso, para que desmontar a
      // animação nunca deixe a secção invisível.
      gsap.set(el, { clearProps: 'opacity,transform' })
    }
  }, [])

  return (
    <section ref={ref} id={id} className={`page-section ${className}`}>
      <div className="section-container">{children}</div>
    </section>
  )
}
