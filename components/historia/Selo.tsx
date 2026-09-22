import { colorMix } from '@/lib/color'
import { EVIDENCIA_COLOR, EVIDENCIA_LABEL, EVIDENCIA_SENTIDO, EVIDENCIA_TEXT, type Evidencia } from '@/lib/evidencia'
import { refNumero } from '@/lib/historia-aeminium-textos'

/**
 * Selo de evidência — o `DataSource` da História.
 *
 * Mesma forma que o selo dos dados (pastilha mono, ponto de cor), para que
 * o leitor que já aprendeu um leia o outro. A referência, quando há, é um
 * número que salta para a lista no fim da página.
 */
export default function Selo({ evidencia, refId }: { evidencia: Evidencia; refId?: string }) {
  const color = EVIDENCIA_COLOR[evidencia]
  const n = refId ? refNumero(refId) : 0
  return (
    <span className="selo" title={EVIDENCIA_SENTIDO[evidencia]}>
      <span
        className="selo-pastilha"
        style={{
          color: EVIDENCIA_TEXT[evidencia],
          background: colorMix(color, 9),
          borderColor: colorMix(color, 30),
        }}
      >
        <span aria-hidden="true" className="selo-ponto" style={{ background: color }} />
        {EVIDENCIA_LABEL[evidencia]}
      </span>
      {n > 0 && (
        <a href={`#ref-${n}`} className="selo-ref" aria-label={`Referência ${n}`}>
          [{n}]
        </a>
      )}
    </span>
  )
}
