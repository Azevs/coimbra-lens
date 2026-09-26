/**
 * Dados estruturados schema.org, para os motores de pesquisa. O `<` é
 * escapado para que nenhum texto dos dados feche o `<script>` antes do tempo.
 */
export default function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }}
    />
  )
}
