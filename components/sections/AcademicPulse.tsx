'use client'

import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { unavailable } from '@/lib/provenance'
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
 * remete para a fonte numa linha.
 */
const UC_NUMBERS_META = unavailable(
  'Universidade de Coimbra',
  'A UC publica estes números mas só através de JavaScript, sem API nem HTML legível. Sem fonte que se possa ler, não há números a mostrar.',
)

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
          <Label>A UC em números</Label>
          <DataUnavailable meta={UC_NUMBERS_META} />
          <a
            href="https://www.uc.pt/dados"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              color: 'var(--accent-text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-ibm-plex)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '0.875rem',
              minHeight: '24px',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--text-tertiary)' }}>→</span>
            A UC em Números, no uc.pt
          </a>
          <DataSource meta={UC_NUMBERS_META} showNote={false} />
        </GlassCard>
      </div>
    </SectionReveal>
  )
}
