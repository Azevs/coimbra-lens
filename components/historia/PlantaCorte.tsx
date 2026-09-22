import { PLANTA } from '@/lib/historia-aeminium-planta'

/**
 * Planta de localização — onde passa a linha do corte.
 *
 * Contornos do OpenStreetMap, em metros a partir da fachada poente do museu,
 * norte para cima. É o "você está aqui" do corte.
 */
export default function PlantaCorte() {
  const { caixa, edificios, museu, agua } = PLANTA
  const w = caixa.x1 - caixa.x0
  const h = caixa.y1 - caixa.y0
  return (
    <figure className="planta">
      <svg viewBox={`${caixa.x0} ${caixa.y0} ${w} ${h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Planta: a linha do corte atravessa a Baixa e o museu, de poente para nascente">
        <rect x={caixa.x0} y={caixa.y0} width={w} height={h} fill="var(--bg-raised)" />
        <path d={agua} fill="var(--tone-blue)" fillOpacity="0.22" />
        <path d={edificios} fill="var(--text-tertiary)" fillOpacity="0.38" />
        <path d={museu} fill="var(--accent)" />
        <line x1={caixa.x0} x2={caixa.x1} y1={0} y2={0} stroke="var(--accent)" strokeWidth="5" strokeDasharray="18 10" />
        {/* Norte */}
        <g transform={`translate(${caixa.x1 - 40} ${caixa.y0 + 60})`}>
          <path d="M0 -34 L12 8 L0 0 L-12 8 Z" fill="var(--text-primary)" />
        </g>
      </svg>
      <figcaption className="ui-mono">
        Planta · a linha do corte, de poente para nascente
      </figcaption>
    </figure>
  )
}
