import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import EpocasBarras, { type Epocas } from '@/components/urbano/EpocasBarras'
import { published } from '@/lib/provenance'
import { CENSOS_CONCELHO, CENSOS_ZONAS, type CensosZona as Censos } from '@/lib/zona-censos'
import type { ZonaTexto } from '@/lib/urban-zones-textos'

/**
 * Quem vive numa zona, pelos Censos: as subsecções da BGRI com o centro no
 * corredor, contra o concelho pela mesma soma (ver `build-zona-censos.mjs`).
 *
 * Os prédios destes números são os edifícios clássicos do INE, não os da
 * maqueta (que são contornos do OSM): contam-se de outra maneira, e a página
 * nunca põe uns ao lado dos outros.
 */

const num = (n: number) => n.toLocaleString('pt-PT')
const pct = (a: number, b: number) => `${Math.round((100 * a) / b)} %`

const epocas = (c: Censos): Epocas => ({
  ate1945: c.epoca.ate1945,
  de1946a1980: c.epoca.de1946a1980,
  depois1980: c.epoca.de1981a2000 + c.epoca.de2001a2010 + c.epoca.de2011a2021,
})

export default function CensosZona({ z }: { z: ZonaTexto }) {
  const c = CENSOS_ZONAS[z.zona.id]
  if (!c) return null
  const m = CENSOS_CONCELHO
  const meta = published(
    'INE · BGRI 2021 e 2011',
    'Censos por subsecção',
    `Contagens dos Censos nas ${c.subseccoes} subsecções estatísticas com o centro a menos de ${z.zona.raio} m do eixo ` +
      `(${c.em2011.subseccoes} em 2011, que eram mais pequenas), e no concelho inteiro. As casas sem residente habitual ` +
      'são os alojamentos familiares clássicos vagos ou de residência secundária, que o INE publica juntos; os prédios ' +
      'são os edifícios clássicos do INE, contados de outra maneira que os da maqueta.',
    '2021-12-31T12:00:00'
  )

  const fichas = [
    { termo: 'Residentes', valor: num(c.residentes), nota: `em 2011 eram ${num(c.em2011.residentes)}` },
    {
      termo: 'Casas sem residente habitual',
      valor: pct(c.vagosOuSecundarios, c.alojamentos),
      nota: `vagas ou de residência secundária · no concelho, ${pct(m.vagosOuSecundarios, m.alojamentos)}`,
    },
    {
      termo: 'Prédios anteriores a 1945',
      valor: pct(c.epoca.ate1945, c.edificios),
      nota: `no concelho, ${pct(m.epoca.ate1945, m.edificios)}`,
    },
    {
      termo: 'Prédios a precisar de obras',
      valor: pct(c.reparacao, c.edificios),
      nota: `no concelho, ${pct(m.reparacao, m.edificios)}`,
    },
    {
      termo: '65 anos ou mais',
      valor: pct(c.idade.mais65, c.residentes),
      nota: `dos residentes · no concelho, ${pct(m.idade.mais65, m.residentes)}`,
    },
  ]

  return (
    <SectionReveal id="quem-vive">
      <div className="section-container" style={{ padding: '0 1.25rem 4.5rem' }}>
        <SectionTitle
          label="Quem lá vive"
          title="Muita casa, pouca gente"
          subtitle={
            `Na ${z.zona.nome} moram ${num(c.residentes)} pessoas, em ${num(c.residenciaHabitual)} casas. ` +
            `Outras ${num(c.vagosOuSecundarios)} estão vazias ou só se usam parte do ano.`
          }
        />

        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))',
            alignItems: 'start',
          }}
        >
          {fichas.map((f) => (
            <div key={f.termo}>
              <div className="label-text" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                {f.termo}
              </div>
              <div className="font-display" style={{ fontSize: '2rem', lineHeight: 1, color: 'var(--text-data)' }}>
                {f.valor}
              </div>
              <div style={{ marginTop: '0.375rem', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{f.nota}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', maxWidth: '44rem' }}>
          <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0 0 1rem' }}>
            Os prédios por época de construção
          </h3>
          <EpocasBarras
            linhas={[
              { nome: z.zona.nome, epocas: epocas(c) },
              { nome: 'Concelho', epocas: epocas(m) },
            ]}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <DataSource meta={meta} />
        </div>
      </div>
    </SectionReveal>
  )
}
