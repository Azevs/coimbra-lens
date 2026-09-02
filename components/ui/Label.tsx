import type { CSSProperties, ReactNode } from 'react'

/**
 * Rótulo de módulo — a linha de maiúsculas espaçadas que abre cada bloco.
 *
 * Estava copiado como estilo inline em dezenas de sítios, cada um com o
 * seu tamanho (9, 10, 11px) e o seu espaçamento. Um componente só garante
 * que o mínimo legível (11px) se aplica a todos de uma vez.
 */
export default function Label({
  children,
  tone = 'secondary',
  as: Tag = 'span',
  style,
  className = '',
}: {
  children: ReactNode
  tone?: 'secondary' | 'accent' | 'tertiary'
  as?: 'span' | 'h3' | 'p' | 'div'
  style?: CSSProperties
  className?: string
}) {
  return (
    <Tag className={`ui-label ui-label-${tone} ${className}`} style={style}>
      {children}
    </Tag>
  )
}
