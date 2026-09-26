import type { Metadata } from 'next'
import { ldFestas, ldPagina, pagina } from '@/lib/seo'
import { EVENTS } from '@/lib/festas'
import JsonLd from '@/components/seo/JsonLd'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import CultureSection from '@/components/sections/CultureSection'
import AgendaList from '@/components/agenda/AgendaList'

export const metadata: Metadata = pagina({
  caminho: 'agenda',
  titulo: 'Agenda de Coimbra: eventos e festas',
  tituloSocial: 'O que há para fazer em Coimbra',
  descricao: 'O que está marcado em Coimbra este mês, dia a dia, e as festas que se repetem todos os anos.',
})

/** Refeita uma vez por dia: a próxima edição de cada festa muda de ano quando ela passa. */
export const revalidate = 86400

export default function AgendaPage() {
  return (
    <>
      <JsonLd dados={ldPagina([{ nome: 'Agenda', caminho: 'agenda' }])} />
      <JsonLd dados={ldFestas(EVENTS)} />
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        <div className="section-container" style={{ padding: '0 1.25rem' }}>
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
            Agenda
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            O que há
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>para fazer</span>
          </h1>
        </div>

        <SectionReveal id="este-mes" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="ESTE MÊS"
              title="Dia a dia"
              subtitle="Cinema, música, teatro, exposições e serviço educativo, por ordem de início. Cada linha abre a página do evento."
            />
            <AgendaList />
          </div>
        </SectionReveal>

        <CultureSection />
      </main>

      <SiteFooter />
    </>
  )
}
