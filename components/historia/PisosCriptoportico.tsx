import { PISOS } from '@/lib/historia-aeminium-textos'
import Selo from '@/components/historia/Selo'

/**
 * Os dois pisos, contados. Não é planta nem corte: é a descrição publicada
 * posta em figura — sete celas em cima, sete em baixo mais altas, e a
 * galeria longa para onde as de baixo dão. Quantidades e proporções
 * relativas; nada aqui está à escala.
 */
export default function PisosCriptoportico() {
  const n = 7
  const W = 700
  const passo = W / n
  const celaSup = { h: 70, larg: passo - 14 }
  const celaInf = { h: 108, larg: passo - 10 }
  const ySup = 30
  const yInf = ySup + celaSup.h + 22
  const yGal = yInf + celaInf.h + 16

  const abobada = (x: number, y: number, w: number, h: number) => {
    const r = w / 2
    return `M${x} ${y + h}L${x} ${y + r}A${r} ${r} 0 0 1 ${x + w} ${y + r}L${x + w} ${y + h}Z`
  }

  return (
    <figure className="pisos">
      <svg viewBox={`-150 0 ${W + 160} ${yGal + 58}`} role="img" aria-label="Esquema: sete celas no piso de cima, sete celas mais altas no piso de baixo, e uma galeria longa">
        <defs>
          <pattern id="pisos-h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.45" />
          </pattern>
        </defs>
        <rect x={-6} y={ySup - 12} width={W + 12} height={yGal + 34 - ySup} fill="url(#pisos-h)" />

        {Array.from({ length: n }, (_, i) => (
          <path key={`s${i}`} d={abobada(i * passo + 7, ySup, celaSup.larg, celaSup.h)} fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="1.5" />
        ))}
        {Array.from({ length: n }, (_, i) => (
          <path key={`i${i}`} d={abobada(i * passo + 5, yInf, celaInf.larg, celaInf.h)} fill="var(--accent)" fillOpacity="0.16" stroke="var(--accent)" strokeWidth="1.5" />
        ))}
        <rect x={0} y={yGal} width={W} height={18} fill="var(--accent)" fillOpacity="0.85" />

        <g className="pisos-rotulos">
          <text x={-14} y={ySup + celaSup.h / 2 + 4} textAnchor="end">piso de cima</text>
          <text x={-14} y={yInf + celaInf.h / 2 + 4} textAnchor="end">piso de baixo</text>
          <text x={-14} y={yGal + 13} textAnchor="end">galeria</text>
        </g>
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
