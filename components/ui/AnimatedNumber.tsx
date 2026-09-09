'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap-config'
import { canAnimate } from '@/lib/motion'

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

/**
 * Um número que conta até ao seu valor quando entra em ecrã.
 *
 * A contagem corre uma vez, à entrada. Mas o valor pode mudar com o
 * componente já montado — é o que acontece no painel do mapa quando se
 * escolhe outra freguesia — e aí não há entrada nenhuma a assinalar: o
 * número salta do anterior para o novo, depressa.
 *
 * A versão anterior tinha uma trava (`animated`) que, uma vez levantada,
 * nunca mais deixava correr nada. Trocar de freguesia mudava o nome no
 * painel e deixava a população presa no valor da freguesia anterior; só
 * fechar o painel, que desmonta isto, é que repunha a trava. O que a trava
 * devia guardar não é "já animou alguma vez", é "já entrou em ecrã".
 */
export default function AnimatedNumber({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  /** Já entrou em ecrã — a partir daqui, mudar de valor é uma transição. */
  const revealed = useRef(false)
  /** O último valor escrito, de onde a próxima transição parte. */
  const shown = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const write = (v: number) => {
      shown.current = v
      el.textContent = `${prefix}${formatNum(v, decimals)}${suffix}`
    }

    const run = () => {
      // Sem animação possível, o número aparece — não fica em zero.
      if (!canAnimate()) {
        write(value)
        return null
      }
      const obj = { value: shown.current }
      return gsap.to(obj, {
        value,
        duration: revealed.current ? 0.45 : duration,
        ease: 'power2.out',
        onUpdate: () => write(obj.value),
        onComplete: () => write(value),
      })
    }

    if (revealed.current) {
      const tween = run()
      return () => {
        tween?.kill()
      }
    }

    let tween: gsap.core.Tween | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        revealed.current = true
        observer.disconnect()
        tween = run()
      },
      { threshold: 0.3 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      tween?.kill()
    }
  }, [value, duration, prefix, suffix, decimals])

  return (
    <span ref={ref} className={`font-data ${className}`}>
      {prefix}0{suffix}
    </span>
  )
}
