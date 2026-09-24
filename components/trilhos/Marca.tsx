import { FAMILIAS, type Familia } from '@/lib/trilhos'

/**
 * A marca do percurso, como se vê pintada numa pedra ou num poste: duas
 * barras — amarela e vermelha nas pequenas rotas, branca e vermelha nas
 * grandes — e o código ao lado. Os percursos sem código não têm marca
 * nacional; levam um traço, que é como aparecem no mapa.
 */
export default function Marca({ familia, codigo, grande = false }: { familia: Familia; codigo: string | null; grande?: boolean }) {
  const m = FAMILIAS[familia].marca
  return (
    <span className={`trilho-marca${grande ? ' trilho-marca-grande' : ''}`}>
      {m ? (
        <span className="trilho-marca-barras" aria-hidden="true">
          <span style={{ background: m[0] }} />
          <span style={{ background: m[1] }} />
        </span>
      ) : (
        <span className="trilho-marca-traco" aria-hidden="true" />
      )}
      <span className="trilho-marca-codigo">{codigo ?? FAMILIAS[familia].nome}</span>
    </span>
  )
}
