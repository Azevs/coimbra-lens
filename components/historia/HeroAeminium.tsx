import { CORTE } from '@/lib/historia-aeminium'

/**
 * A abertura: o nome da cidade romana, enterrado na cidade de hoje.
 *
 * A linha do horizonte é a medida — a superfície do LiDAR (telhados e
 * copas) ao longo do mesmo corte que a página vai contar. Por cima dela as
 * letras são tinta; por baixo, terracota — a cor do que é romano em toda a
 * página. A leitura é a do capítulo: Aeminium está por baixo.
 */

type Vista = { d0: number; d1: number; z0: number; z1: number; base: number; corpo: number }

const LARGA: Vista = { d0: -420, d1: 300, z0: 0, z1: 150, base: 24, corpo: 104 }
const ESTREITA: Vista = { d0: -200, d1: 130, z0: 0, z1: 150, base: 34, corpo: 74 }

function horizonte(v: Vista) {
  const pts = CORTE.perfil
    .filter((p) => p.d >= v.d0 - 4 && p.d <= v.d1 + 4)
    .map((p) => [p.d, p.sup ?? p.chao] as const)
    .filter((p): p is readonly [number, number] => p[1] !== null)
  const topo = pts.map(([d, z], i) => `${i ? 'L' : 'M'}${d} ${-z}`).join('')
  const massa = `${topo}L${pts.at(-1)![0]} ${-v.z0 + 10}L${pts[0][0]} ${-v.z0 + 10}Z`
  return { topo, massa }
}

function Estampa({ v, id, className }: { v: Vista; id: string; className: string }) {
  const { topo, massa } = horizonte(v)
  const margem = (v.d1 - v.d0) * 0.02
  const texto = (props: React.SVGProps<SVGTextElement>) => (
    <text
      x={v.d0 + margem}
      y={-v.base}
      textLength={v.d1 - v.d0 - margem * 2}
      lengthAdjust="spacingAndGlyphs"
      fontSize={v.corpo}
      style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 900, letterSpacing: '-0.02em' }}
      {...props}
    >
      AEMINIUM
    </text>
  )
  return (
    <svg
      className={className}
      viewBox={`${v.d0} ${-v.z1} ${v.d1 - v.d0} ${v.z1 - v.z0}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`${id}-h`} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="2.4" stroke="var(--text-primary)" strokeWidth="0.32" strokeOpacity="0.5" />
        </pattern>
        <clipPath id={`${id}-sob`}>
          <path d={massa} />
        </clipPath>
      </defs>

      {texto({ fill: 'var(--text-primary)' })}

      <path d={massa} fill="var(--bg-primary)" />
      <path d={massa} fill={`url(#${id}-h)`} />

      <g clipPath={`url(#${id}-sob)`}>
        {/* Preenchimento e não contorno: a Fraunces variável tem contornos
            sobrepostos dentro das letras, e um traço mostrava-os. */}
        {texto({ fill: 'var(--accent)', fillOpacity: 0.9 })}
      </g>

      <path d={topo} fill="none" stroke="var(--text-primary)" strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  )
}

export default function HeroAeminium() {
  return (
    <div className="hero-aeminium">
      <Estampa v={LARGA} id="hl" className="hero-aeminium-larga" />
      <Estampa v={ESTREITA} id="he" className="hero-aeminium-estreita" />
      <div className="hero-aeminium-legenda ui-mono">
        <span>Baixa</span>
        <span>← poente · a colina da Alta em corte · nascente →</span>
        <span>Alta</span>
      </div>
    </div>
  )
}
