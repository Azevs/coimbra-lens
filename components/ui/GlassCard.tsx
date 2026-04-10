'use client'

import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  accent?: boolean
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', hover = false, accent = false, style }: GlassCardProps) {
  return (
    <div
      className={`${accent ? 'panel-accent' : 'glass-card'} ${hover ? 'btn-primary cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
