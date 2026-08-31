import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site'

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Cartão social. Desenhado com a paleta do painel — tinta quase preta,
 * acento terracota — porque é a primeira impressão do site em qualquer
 * partilha. Sem tipos externos: o satori não carrega Google Fonts sozinho,
 * e a pilha de sistema chega para três linhas de texto.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#0A0D12',
          padding: '72px',
          position: 'relative',
        }}
      >
        {/* Regra cartográfica — o mesmo detalhe que abre cada secção */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <div style={{ width: 56, height: 2, background: '#C1440E' }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              color: '#C1440E',
              fontWeight: 700,
            }}
          >
            COIMBRA · DADOS ABERTOS
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <div style={{ fontSize: 132, fontWeight: 800, color: '#E8EAF0', letterSpacing: -5, lineHeight: 1 }}>
            Coimbra
          </div>
          <div style={{ fontSize: 132, fontWeight: 300, color: '#C1440E', letterSpacing: -5, lineHeight: 1, fontStyle: 'italic' }}>
            Lens
          </div>
        </div>

        <div style={{ fontSize: 34, color: '#8C95A8', marginTop: 28, maxWidth: 820, lineHeight: 1.35 }}>
          Clima e ar em directo, caudal do Mondego, trânsito e as 18 freguesias.
        </div>

        {/* Barra de proveniência — o que distingue este painel */}
        <div style={{ display: 'flex', gap: 14, marginTop: 44 }}>
          {[
            { label: 'EM DIRECTO', color: '#2E7D6E' },
            { label: 'ESTIMATIVA', color: '#B07D3A' },
            { label: 'INDISPONÍVEL', color: '#8C95A8' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: `2px solid ${s.color}`,
                borderRadius: 4,
                padding: '8px 18px',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                color: s.color,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 5, background: s.color }} />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
