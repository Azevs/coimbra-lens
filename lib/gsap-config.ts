'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)

  // Quem pede movimento reduzido recebe o painel completo, sem animação:
  // as tweens saltam para o estado final em vez de serem descartadas, para
  // que nada fique preso a opacity 0.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const apply = () => {
    if (reduced.matches) {
      gsap.globalTimeline.timeScale(200)
      ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' })
    } else {
      gsap.globalTimeline.timeScale(1)
    }
  }
  apply()
  reduced.addEventListener('change', apply)
}

export { gsap, ScrollTrigger, TextPlugin }
