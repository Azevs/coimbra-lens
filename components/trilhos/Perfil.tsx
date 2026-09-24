'use client'

import { useId, useRef } from 'react'
import { fmt } from '@/lib/format'

/**
 * O perfil do percurso: cotas medidas a intervalos iguais, do início ao fim.
 *
 * Interactivo quando recebe `aoMover`: o dedo no perfil é uma posição no
 * trilho, e o mapa põe lá o caminhante. `posicao` é o cursor — vem do dedo
 * ou do voo.
 *
 * Em versão pequena (`mini`) é só a silhueta, para as fichas da lista; a
 * escala vertical é a da própria silhueta, e por isso não tem números.
 */
export default function Perfil({
  cotas,
  distanciaKm,
  posicao = null,
  aoMover,
  mini = false,
  cor = 'var(--accent)',
}: {
  cotas: number[]
  distanciaKm: number
  posicao?: number | null
  aoMover?: (f: number | null) => void
  mini?: boolean
  cor?: string
}) {
  const gid = useId().replace(/:/g, '')
  const ref = useRef<SVGSVGElement>(null)
  const W = mini ? 200 : 400
  const H = mini ? 44 : 132
  const topo = mini ? 3 : 16
  const base = mini ? H : H - 20
  const min = Math.min(...cotas)
  const max = Math.max(...cotas)
  // Um trilho plano não pode parecer uma serra: a escala vertical tem um
  // mínimo de 60 m, e um perfil de 5 m de variação fica rente ao chão.
  const amplitude = Math.max(max - min, mini ? 40 : 60)
  const y = (v: number) => base - ((v - min) / amplitude) * (base - topo)
  const x = (i: number) => (i / (cotas.length - 1)) * W

  const linha = cotas.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')
  const area = `${linha}L${W},${base}L0,${base}Z`
  const iMax = cotas.indexOf(max)
  const cursor = posicao == null ? null : Math.min(Math.max(posicao, 0), 1)
  const iCursor = cursor == null ? null : Math.round(cursor * (cotas.length - 1))

  const mover = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r || !aoMover) return
    aoMover(Math.min(Math.max((clientX - r.left) / r.width, 0), 1))
  }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={mini ? 'trilho-perfil trilho-perfil-mini' : 'trilho-perfil'}
      preserveAspectRatio="none"
      role={mini ? undefined : 'img'}
      aria-hidden={mini ? true : undefined}
      aria-label={mini ? undefined : `Perfil de altitude: de ${fmt(cotas[0])} m a ${fmt(cotas[cotas.length - 1])} m, máximo ${fmt(max)} m.`}
      onPointerMove={aoMover ? (e) => mover(e.clientX) : undefined}
      onPointerDown={aoMover ? (e) => mover(e.clientX) : undefined}
      onPointerLeave={aoMover ? () => aoMover(null) : undefined}
    >
      <defs>
        <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cor} stopOpacity={mini ? 0.42 : 0.34} />
          <stop offset="1" stopColor={cor} stopOpacity="0.04" />
        </linearGradient>
        {!mini && (
          <pattern id={`h${gid}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="5" stroke={cor} strokeWidth="0.6" opacity="0.28" />
          </pattern>
        )}
      </defs>

      {!mini &&
        [0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={W * f} x2={W * f} y1={topo - 6} y2={base} className="trilho-perfil-grelha" vectorEffect="non-scaling-stroke" />
        ))}

      <path d={area} fill={`url(#g${gid})`} />
      {!mini && <path d={area} fill={`url(#h${gid})`} />}
      <path d={linha} fill="none" stroke={cor} strokeWidth={mini ? 1.3 : 1.6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

      {!mini && (
        <>
          <line x1="0" x2={W} y1={base} y2={base} className="trilho-perfil-chao" vectorEffect="non-scaling-stroke" />
          <text x="2" y={H - 5} className="trilho-perfil-texto">
            0
          </text>
          <text x={W - 2} y={H - 5} textAnchor="end" className="trilho-perfil-texto">
            {fmt(distanciaKm, 1)} km
          </text>
          <text x={Math.min(Math.max(x(iMax), 24), W - 24)} y={y(max) - 5} textAnchor="middle" className="trilho-perfil-texto trilho-perfil-cota">
            {fmt(max)} m
          </text>
        </>
      )}

      {iCursor != null && !mini && (
        <g className="trilho-perfil-cursor">
          <line x1={x(iCursor)} x2={x(iCursor)} y1={topo - 8} y2={base} vectorEffect="non-scaling-stroke" />
          <circle cx={x(iCursor)} cy={y(cotas[iCursor])} r="3.4" vectorEffect="non-scaling-stroke" />
          <text
            x={Math.min(Math.max(x(iCursor), 30), W - 30)}
            y={Math.max(y(cotas[iCursor]) - 9, 10)}
            textAnchor="middle"
            className="trilho-perfil-texto trilho-perfil-leitura"
          >
            {fmt(cursor! * distanciaKm, 1)} km · {fmt(cotas[iCursor])} m
          </text>
        </g>
      )}
    </svg>
  )
}
