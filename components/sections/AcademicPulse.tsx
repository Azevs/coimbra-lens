'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import UCNewsPanel from './UCNewsPanel'

/**
 * Esta secção mostrava um donut de nacional/internacional, barras de
 * estudantes por faculdade, cinco bandeiras com contagens por país e um
 * quadro "em números". Nenhum desses valores tinha fonte: 23 847 alunos,
 * 3 421 internacionais, 8 faculdades, 1 200 investigadores, 68 países,
 * e uma repartição por faculdade toda em números redondos.
 *
 * A UC publica "A UC em Números" mas carrega os valores por JavaScript —
 * não há nada legível no HTML e não existe API. Até haver, a secção não
 * inventa: mostra as notícias, que são reais quando o feed responde, e
 * remete para a fonte.
 */
export default function AcademicPulse() {
  return (
    <SectionReveal id="academico">
      <SectionTitle
        label="PULSO ACADÉMICO"
        title="Universidade de Coimbra"
        subtitle="A mais antiga universidade de Portugal, fundada em 1290 e Património Mundial da UNESCO desde 2013."
      />

      <div className="grid-split">
        <UCNewsPanel />

        <GlassCard>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '0.875rem',
            }}
          >
            A UC em números
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1.75rem 1rem',
              background: 'var(--bg-sunken)',
              border: '1px dashed var(--border-panel)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-jetbrains)',
                fontSize: '1.75rem',
                color: 'var(--text-tertiary)',
                lineHeight: 1,
              }}
            >
              —
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', maxWidth: '36ch', lineHeight: 1.55 }}>
              A UC publica estes números mas só através de JavaScript, sem API nem HTML legível.
              Sem fonte que se possa ler, não há números a mostrar.
            </span>
          </div>

          <a
            href="https://www.uc.pt/dados"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: 'var(--accent-text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ibm-plex)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '0.875rem',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--text-tertiary)' }}>→</span>
            A UC em Números, no uc.pt
          </a>
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
