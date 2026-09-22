import { CAMADAS } from '@/lib/historia-aeminium-textos'
import Selo from '@/components/historia/Selo'

/**
 * A cronologia como estratigrafia: lê-se de cima para baixo como quem
 * escava — o mais recente à superfície, Augusto no fundo. Cada camada é um
 * pouco mais escura e mais quente do que a de cima, como a terra de um
 * corte arqueológico; a régua à esquerda marca a descida.
 */
export default function Estratigrafia() {
  const n = CAMADAS.length
  return (
    <ol className="estrato-lista">
      <li className="estrato-superficie" aria-hidden="true">
        <span className="ui-mono">superfície · hoje</span>
      </li>
      {CAMADAS.map((c, i) => {
        // De papel a terra: a mistura com o acento cresce com a profundidade.
        const fundo = `color-mix(in srgb, var(--tone-clay) ${4 + (i / (n - 1)) * 16}%, var(--bg-primary))`
        return (
          <li key={c.quando} className="estrato" style={{ background: fundo }}>
            <div className="estrato-quando">
              <span className="font-data">{c.quando}</span>
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
  )
}
