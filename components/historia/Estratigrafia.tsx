import { CAMADAS } from '@/lib/historia-aeminium-textos'
import { CORTE } from '@/lib/historia-aeminium'
import Selo from '@/components/historia/Selo'

/**
 * A cronologia como estratigrafia: lê-se de cima para baixo como quem
 * escava — o mais recente à superfície, Augusto no fundo.
 *
 * À superfície, a linha dos telhados de hoje, medida (a mesma do corte).
 * Por baixo, camadas de terra: cada uma um pouco mais escura e mais quente
 * do que a de cima, com a fronteira irregular de um corte arqueológico e
 * mais cascalho quanto mais funda. A forma das fronteiras é desenho; a
 * ordem das camadas é a das datas.
 */

/** Rampa de cor: de papel a terra. Até 17 % de argila o texto passa AA. */
const cor = (i: number, n: number) => `color-mix(in srgb, var(--tone-clay) ${3 + (i / (n - 1)) * 14}%, var(--bg-primary))`

/** Fronteira ondulada, determinística por camada. viewBox 1000 × 24. */
function fronteira(semente: number) {
  const pts: string[] = []
  for (let x = 0; x <= 1000; x += 20) {
    const y =
      12 +
      4.5 * Math.sin((x / 1000) * Math.PI * (2.2 + (semente % 3)) + semente * 1.7) +
      2.5 * Math.sin((x / 1000) * Math.PI * (7 + (semente % 4)) + semente * 0.9) +
      1.2 * Math.sin((x / 1000) * Math.PI * 19 + semente * 2.3)
    pts.push(`${x} ${y.toFixed(1)}`)
  }
  return { area: `M0 24L${pts.join('L')}L1000 24Z`, linha: `M${pts.join('L')}` }
}

/** Os telhados de hoje ao longo do corte, como silhueta de superfície. */
function superficie() {
  const pts = CORTE.perfil.filter((p) => p.sup !== null && p.d >= -520 && p.d <= 340)
  const d0 = pts[0].d
  const d1 = pts.at(-1)!.d
  const zMin = Math.min(...pts.map((p) => p.sup!))
  const zMax = Math.max(...pts.map((p) => p.sup!))
  const x = (d: number) => ((d - d0) / (d1 - d0)) * 1000
  const y = (z: number) => 60 - ((z - zMin) / (zMax - zMin)) * 54
  const topo = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.d).toFixed(1)} ${y(p.sup!).toFixed(1)}`).join('')
  return { topo, massa: `${topo}L1000 64L0 64Z` }
}

export default function Estratigrafia() {
  const n = CAMADAS.length
  const sup = superficie()
  return (
    <div className="estratos">
      <div className="estrato-superficie">
        <svg viewBox="0 0 1000 64" preserveAspectRatio="none" aria-hidden="true">
          <path d={sup.massa} fill="var(--bg-sunken)" />
          <path d={sup.topo} fill="none" stroke="var(--text-primary)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="ui-mono">superfície · a cidade de hoje</span>
      </div>

      <ol className="estrato-lista">
        {CAMADAS.map((c, i) => {
          const fundo = cor(i, n)
          const f = fronteira(i + 3)
          return (
            <li
              key={c.quando}
              className="estrato"
              style={{ backgroundColor: fundo, ['--seixo' as string]: `${26 - i * 1.6}px` }}
            >
              <svg className="estrato-fronteira" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
                <path d={f.area} fill={fundo} />
                <path d={f.linha} fill="none" stroke="var(--text-primary)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="estrato-quando">
                <span className="estrato-data">{c.quando}</span>
              </div>
              <div className="estrato-corpo">
                <h3 className="font-display estrato-titulo">{c.titulo}</h3>
                <p>{c.texto}</p>
                <Selo evidencia={c.evidencia} refId={c.ref} />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
