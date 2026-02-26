'use client'

import { type ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  style?: React.CSSProperties
}

export default function GlassCard({ children, className = '', hover = false, style }: GlassCardProps) {
  return (
    <div
      className={`glass-card p-6 ${hover ? 'btn-primary cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
