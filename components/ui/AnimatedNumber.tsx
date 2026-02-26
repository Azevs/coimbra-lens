'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'

interface AnimatedNumberProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

function formatNum(val: number, decimals: number): string {
  return val.toLocaleString('pt-PT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export default function AnimatedNumber({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const obj = { value: 0 }
          gsap.to(obj, {
            value,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${prefix}${formatNum(obj.value, decimals)}${suffix}`
            },
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, prefix, suffix, decimals])

  return (
    <span ref={ref} className={`font-data ${className}`}>
      {prefix}0{suffix}
    </span>
  )
}
