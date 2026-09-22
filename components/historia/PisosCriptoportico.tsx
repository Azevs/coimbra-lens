import { PISOS } from '@/lib/historia-aeminium-textos'
import Selo from '@/components/historia/Selo'

/**
 * Os dois pisos, contados. Não é planta nem corte: é a descrição publicada
 * posta em figura — sete celas em cima, sete em baixo mais altas, e a
 * galeria longa para onde as de baixo dão. Quantidades e proporções
 * relativas; nada aqui está à escala.
 *
 * Vive na secção escura da página: o criptopórtico é fechado, e a luz que
 * nele entra vem das frestas. As réstias de luz são atmosfera, não dado — o
 * artigo diz que há frestas, não por onde nem quantas.
 */
export default function PisosCriptoportico() {
  const n = 7
  const W = 700
  const passo = W / n
  const celaSup = { h: 70, larg: passo - 16 }
  const celaInf = { h: 112, larg: passo - 12 }
  const ySup = 34
  const yInf = ySup + celaSup.h + 24
  const yGal = yInf + celaInf.h + 18

  const abobada = (x: number, y: number, w: number, h: number) => {
    const r = w / 2
    return `M${x} ${y + h}L${x} ${y + r}A${r} ${r} 0 0 1 ${x + w} ${y + r}L${x + w} ${y + h}Z`
  }

  return (
    <figure className="pisos">
      <svg viewBox={`-150 0 ${W + 160} ${yGal + 60}`} role="img" aria-label="Esquema: sete celas no piso de cima, sete celas mais altas no piso de baixo, e uma galeria longa">
        <defs>
          <pattern id="pisos-pedra" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="var(--text-primary)" strokeWidth="0.6" strokeOpacity="0.07" />
          </pattern>
          <radialGradient id="pisos-luz-cima" cx="0.5" cy="0.15" r="0.9">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="var(--accent)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pisos-luz-baixo" cx="0.5" cy="0.2" r="0.95">
            <stop offset="0" stopColor="var(--tone-amber)" stopOpacity="0.6" />
            <stop offset="0.55" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pisos-restia" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--tone-amber)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--tone-amber)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pisos-galeria" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="var(--tone-amber)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* A massa de pedra onde as celas estão abertas */}
        <rect x={-8} y={ySup - 14} width={W + 16} height={yGal + 38 - ySup} fill="var(--bg-raised)" />
        <rect x={-8} y={ySup - 14} width={W + 16} height={yGal + 38 - ySup} fill="url(#pisos-pedra)" />

        {Array.from({ length: n }, (_, i) => (
          <g key={`s${i}`} className="pisos-cela" style={{ animationDelay: `${i * 0.35}s` }}>
            <path d={abobada(i * passo + 8, ySup, celaSup.larg, celaSup.h)} fill="var(--bg-sunken)" />
            <path d={abobada(i * passo + 8, ySup, celaSup.larg, celaSup.h)} fill="url(#pisos-luz-cima)" />
            <path d={abobada(i * passo + 8, ySup, celaSup.larg, celaSup.h)} fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1.2" />
          </g>
        ))}
        {Array.from({ length: n }, (_, i) => (
          <g key={`i${i}`} className="pisos-cela" style={{ animationDelay: `${0.2 + i * 0.35}s` }}>
            <path d={abobada(i * passo + 6, yInf, celaInf.larg, celaInf.h)} fill="var(--bg-sunken)" />
            <path d={abobada(i * passo + 6, yInf, celaInf.larg, celaInf.h)} fill="url(#pisos-luz-baixo)" />
            <path d={abobada(i * passo + 6, yInf, celaInf.larg, celaInf.h)} fill="none" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.4" />
          </g>
        ))}

        {/* Réstias de luz: entram de poente, pela fachada das frestas */}
        <g className="pisos-restias">
          <polygon points={`-8,${ySup - 4} -8,${ySup + 10} ${W * 0.62},${yGal + 20} ${W * 0.8},${yGal + 20}`} fill="url(#pisos-restia)" />
          <polygon points={`-8,${yInf - 6} -8,${yInf + 6} ${W * 0.45},${yGal + 20} ${W * 0.58},${yGal + 20}`} fill="url(#pisos-restia)" />
        </g>

        <rect x={0} y={yGal} width={W} height={16} fill="var(--bg-sunken)" />
        <rect x={0} y={yGal} width={W} height={16} fill="url(#pisos-galeria)" />

        <g className="pisos-rotulos">
          <text x={-16} y={ySup + celaSup.h / 2 + 5} textAnchor="end">piso de cima</text>
          <text x={-16} y={yInf + celaInf.h / 2 + 5} textAnchor="end">piso de baixo</text>
          <text x={-16} y={yGal + 13} textAnchor="end">galeria</text>
        </g>
        <text x={W} y={yGal + 48} textAnchor="end" className="pisos-nota">
          esquema · não está à escala
        </text>
      </svg>
      <div className="pisos-texto">
        <p><strong>Em cima.</strong> {PISOS.superior}</p>
        <p><strong>Em baixo.</strong> {PISOS.inferior}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Selo evidencia="escavado" refId="zephyrus" />
          <Selo evidencia="esquema" />
        </div>
      </div>
    </figure>
  )
}
