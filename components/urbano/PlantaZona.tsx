import type { UrbanZone } from '@/lib/urban-zones'

/**
 * A planta de uma zona, para a abertura da página: o corredor que a maqueta
 * serra, o eixo que o define e os pontos numerados, com o norte para cima e
 * a escala. A mesma geometria da maqueta (vem do gerador), vista de cima.
 *
 * A figura tem altura fixa (`ALTURA` px); as coordenadas são metros, e os
 * números, traços e letras convertem-se para píxeis por essa altura, para
 * lerem igual qualquer que seja o tamanho da zona.
 */

const ALTURA = 400

export default function PlantaZona({ zona, titulos }: { zona: UrbanZone; titulos: Record<string, string> }) {
  const pl = zona.planta
  if (!pl) return null
  const xs = pl.recorte.map((p) => p[0])
  const ys = pl.recorte.map((p) => p[1])
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
  // Metros por píxel, e as margens (em metros) para caber a escala por baixo.
  const MARGEM_PX = 10
  const ESCALA_PX = 30
  const mpx = (y1 - y0) / (ALTURA - 2 * MARGEM_PX - ESCALA_PX)
  const px = (v: number) => v * mpx
  const M = px(MARGEM_PX)
  const W = x1 - x0 + 2 * M + px(28) // folga à direita para o norte
  const H = y1 - y0 + 2 * M + px(ESCALA_PX)
  // SVG com o y para baixo: o norte fica em cima.
  const X = (x: number) => x - x0 + M
  const Y = (y: number) => y1 - y + M
  const caminho = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${X(x)} ${Y(y)}`).join('')
  const pontos = zona.pontos ?? []
  const R = px(11)

  // Números que se tocariam: o seguinte afasta-se para nascente, com uma
  // linha de chamada até à posição verdadeira.
  const sitios: { x: number; y: number; ox: number; oy: number }[] = []
  for (const p of pontos) {
    const x = X(p.p[0]), y = Y(p.p[1])
    let ox = x
    while (sitios.some((s) => Math.hypot(s.ox - ox, s.oy - y) < 2.2 * R)) ox += 2.4 * R
    sitios.push({ x, y, ox, oy: y })
  }

  const passoEscala = 100
  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Planta da ${zona.nome}: o corredor de ${zona.raio} m à volta do eixo, com ${pontos.length} pontos numerados`}
        style={{ display: 'block', height: `${ALTURA}px`, width: 'auto', maxWidth: '100%' }}
      >
        <path d={caminho(pl.recorte) + 'Z'} fill="var(--bg-secondary)" stroke="var(--border-strong)" strokeWidth={px(1.25)} />
        {pl.eixo.map((w, i) => (
          <path
            key={i}
            d={caminho(w)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={px(2.5)}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {pontos.map((p, i) => {
          const s = sitios[i]
          return (
            <g key={p.id}>
              <title>{`${i + 1}. ${titulos[p.id] ?? p.id}`}</title>
              {s.ox !== s.x && (
                <>
                  <line x1={s.x} y1={s.y} x2={s.ox} y2={s.oy} stroke="var(--accent)" strokeWidth={px(1)} />
                  <circle cx={s.x} cy={s.y} r={px(2.5)} fill="var(--accent)" />
                </>
              )}
              <circle cx={s.ox} cy={s.oy} r={R} fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth={px(1.5)} />
              <text
                x={s.ox}
                y={s.oy}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ font: `600 ${px(11)}px var(--font-jetbrains)`, fill: 'var(--accent-text)' }}
              >
                {i + 1}
              </text>
            </g>
          )
        })}
        {/* Norte */}
        <g transform={`translate(${W - px(12)} ${M + px(12)})`}>
          <path d={`M0 ${-px(9)} L${px(5)} ${px(5)} L0 ${px(2)} L${-px(5)} ${px(5)} Z`} fill="var(--text-primary)" />
          <text y={px(18)} textAnchor="middle" style={{ font: `600 ${px(10)}px var(--font-jetbrains)`, fill: 'var(--text-secondary)' }}>
            N
          </text>
        </g>
        {/* Escala */}
        <g transform={`translate(${M} ${H - px(10)})`}>
          <path d={`M0 ${-px(5)} V0 H${passoEscala} V${-px(5)}`} fill="none" stroke="var(--text-secondary)" strokeWidth={px(1.25)} />
          <text x={passoEscala + px(6)} y={0} style={{ font: `${px(11)}px var(--font-jetbrains)`, fill: 'var(--text-secondary)' }}>
            {passoEscala} m
          </text>
        </g>
      </svg>
      <figcaption style={{ marginTop: '0.5rem', fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
        A {zona.nome} em planta: o eixo e tudo o que fica a menos de {zona.raio} m dele.
      </figcaption>
    </figure>
  )
}
