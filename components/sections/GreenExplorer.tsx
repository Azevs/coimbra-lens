'use client'

import { useRef, useState, type ReactNode } from 'react'

import GreenMap from '@/components/map/GreenMap'
import { inBox, type Scale } from '@/components/map/GreenFigure'
import GreenHerbarium from '@/components/sections/GreenHerbarium'
import GreenList from '@/components/sections/GreenList'
import { SPACES, type GreenKind } from '@/lib/green'
import { canAnimate } from '@/lib/motion'

/**
 * O herbário, o mapa e a lista a escolher a mesma coisa.
 *
 * Os três mostram os mesmos lugares, e escolher um em qualquer
 * deles mostra-o no mapa: escolhido no herbário ou na lista, a página desce
 * até à carta, que é a única das três que diz onde ele fica.
 */
export default function GreenExplorer({ intro }: { intro: ReactNode }) {
  const [scale, setScale] = useState<Scale>('cidade')
  const [selected, setSelected] = useState<string | null>(null)
  const [hidden, setHidden] = useState<Set<GreenKind>>(new Set())
  const anchorRef = useRef<HTMLDivElement>(null)

  const select = (id: string | null, reveal = false) => {
    setSelected(id)
    const chosen = SPACES.find((s) => s.id === id)
    if (!chosen) return
    // Escolher uma zona que não esteja na janela actual muda de escala em
    // vez de a realçar onde não se vê.
    if (!inBox(chosen, scale)) setScale('concelho')
    // Nem numa família escondida: escolhê-la volta a mostrá-la.
    if (hidden.has(chosen.kind)) {
      setHidden((current) => {
        const next = new Set(current)
        next.delete(chosen.kind)
        return next
      })
    }
    if (reveal) {
      anchorRef.current?.scrollIntoView({
        behavior: canAnimate() ? 'smooth' : 'auto',
        block: 'start',
      })
    }
  }

  const toggle = (kind: GreenKind) => {
    setHidden((current) => {
      const next = new Set(current)
      if (next.has(kind)) next.delete(kind)
      else next.add(kind)
      return next
    })
    // Esconder a família da zona escolhida deixava um painel a descrever
    // uma forma que já não está no mapa.
    if (SPACES.find((s) => s.id === selected)?.kind === kind) setSelected(null)
  }

  return (
    <>
      <div className="section-container" style={{ padding: '0 1.25rem' }}>
        <div className="green-hero-foot">
          <div className="green-intro">{intro}</div>
          <GreenHerbarium selected={selected} onSelect={(id) => select(id, true)} />
        </div>
      </div>
      <GreenMap
        scale={scale}
        onScale={setScale}
        selected={selected}
        onSelect={(id) => select(id)}
        hidden={hidden}
        onToggle={toggle}
        anchorRef={anchorRef}
      />
      <GreenList selected={selected} onSelect={(id) => select(id, true)} />
    </>
  )
}
