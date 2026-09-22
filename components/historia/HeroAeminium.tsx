import { CORTE } from '@/lib/historia-aeminium'

/**
 * A abertura: o nome da cidade romana, enterrado na cidade de hoje.
 *
 * A linha do horizonte é a medida — a superfície do LiDAR (telhados e
 * copas) ao longo do mesmo corte que a página vai contar. Por cima dela as
 * letras são tinta; por baixo, terracota — a cor do que é romano em toda a
 * página. A leitura é a do capítulo: Aeminium está por baixo.
 */

/** `marca`: corpo do texto do marcador, em metros do desenho. */
type Vista = { d0: number; d1: number; z0: number; z1: number; base: number; corpo: number; marca: number }

const LARGA: Vista = { d0: -420, d1: 300, z0: 0, z1: 160, base: 24, corpo: 104, marca: 7 }
const ESTREITA: Vista = { d0: -200, d1: 130, z0: 0, z1: 170, base: 34, corpo: 74, marca: 10 }

/** O meio do museu no corte, e o ponto mais alto da superfície por cima dele. */
const MEIO = CORTE.museu.nascente / 2
const TOPO_MUSEU = Math.max(
  ...CORTE.perfil.filter((p) => p.d >= 0 && p.d <= CORTE.museu.nascente).map((p) => p.sup ?? p.chao ?? 0)
)

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

      <g className="hero-tinta">{texto({ fill: 'var(--text-primary)' })}</g>

      <g className="hero-terra">
        <path d={massa} fill="var(--bg-primary)" />
        <path d={massa} fill={`url(#${id}-h)`} />
      </g>

      <g clipPath={`url(#${id}-sob)`} className="hero-enterradas">
        {/* Preenchimento e não contorno: a Fraunces variável tem contornos
            sobrepostos dentro das letras, e um traço mostrava-os. */}
        {texto({ fill: 'var(--accent)', fillOpacity: 0.9 })}
      </g>

      <path className="hero-horizonte" d={topo} pathLength={1} fill="none" stroke="var(--text-primary)" strokeWidth="0.9" strokeLinejoin="round" />

      {/* Onde estava o fórum: por cima do museu, à cota da linha dos telhados */}
      <g className="hero-marca">
        <line x1={MEIO} x2={MEIO} y1={-(TOPO_MUSEU + 4)} y2={-(TOPO_MUSEU + v.marca * 2.6)} stroke="var(--accent)" strokeWidth={v.marca * 0.09} />
        <circle cx={MEIO} cy={-(TOPO_MUSEU + 2.5)} r={v.marca * 0.3} fill="var(--accent)" />
        <text
          x={MEIO}
          y={-(TOPO_MUSEU + v.marca * 3)}
          textAnchor="middle"
          fontSize={v.marca}
          fill="var(--accent)"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontStyle: 'italic' }}
        >
          aqui era o fórum
        </text>
      </g>
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
