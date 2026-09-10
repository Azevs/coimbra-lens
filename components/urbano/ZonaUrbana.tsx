import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import Maqueta, { LegendaMaqueta } from '@/components/urbano/Maqueta'
import MaquetaViva from '@/components/urbano/MaquetaViva'
import { estimate } from '@/lib/provenance'
import type { ZonaTexto } from '@/lib/urban-zones-textos'

/**
 * Uma zona urbana inteira: abertura, maqueta que se roda, ficha, troços.
 * O título é o `h1` da página — cada zona tem a sua.
 */
export default function ZonaUrbana({ z }: { z: ZonaTexto }) {
  const { zona } = z
  return (
    <>
      {/* Abertura */}
      <div className="section-container" style={{ padding: '2rem 1.25rem 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-text)',
            marginBottom: '1rem',
          }}
        >
          {zona.nome}
        </div>
        <div style={{ height: '3px', background: 'var(--text-primary)' }} />

        <h1 className="visitar-headline">
          {z.titulo[0]}
          <br />
          <span className="font-display-italic" style={{ color: 'var(--accent)' }}>
            {z.titulo[1]}
          </span>
        </h1>

        <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.75rem' }}>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)',
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: '36rem',
              textWrap: 'pretty',
            }}
          >
            {z.abertura}
          </p>
        </div>
      </div>

      {/* A maqueta inteira */}
      <SectionReveal id="maqueta">
        <div className="section-container" style={{ padding: '3.5rem 1.25rem 0' }}>
          <MaquetaViva
            zona={zona}
            cartaz="conjunto"
            largura={1800}
            altura={810}
            legenda={z.conjunto.legenda}
            azimute={z.conjunto.azimute}
            elevacao={z.conjunto.elevacao}
          />

          <div
            style={{
              marginTop: '2.5rem',
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              alignItems: 'start',
            }}
          >
            {z.ficha.map((f) => (
              <div key={f.termo}>
                <div className="label-text" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                  {f.termo}
                </div>
                <div className="font-display" style={{ fontSize: '2rem', lineHeight: 1, color: 'var(--text-data)' }}>
                  {f.valor}
                </div>
                <div style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                  {f.nota}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <LegendaMaqueta arvores={!!zona.arvores} />
          </div>

          <DataSource meta={estimate(z.fonte, '', zona.lidoEm, 'Modelo')} showNote={false} />
        </div>
      </SectionReveal>

      {/* Três troços */}
      <SectionReveal id="trocos">
        <div className="section-container" style={{ padding: '4.5rem 1.25rem 4rem' }}>
          <SectionTitle label="Troços" title="De uma ponta à outra" subtitle={z.trocos.subtitulo} />

          <div style={{ display: 'grid', gap: '3rem' }}>
            {z.trocos.vistas.map((v) => (
              <Maqueta key={v.vista} zona={zona} vista={v.vista} largura={1600} altura={1000} legenda={v.legenda} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </>
  )
}
