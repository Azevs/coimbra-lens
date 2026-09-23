import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { BarraRepartida, Barras, ColunasEstrelas, COR } from '@/components/turismo/TurismoCharts'
import {
  PORDATA_META,
  PORDATA_TURISMO as P,
  TURISMO,
  estabelecimentos,
  evolucaoDisponivel,
  ineMeta,
} from '@/lib/turismo'

export const metadata: Metadata = {
  title: 'Turismo',
  description:
    'Quantos turistas dormem em Coimbra, onde ficam e por quanto tempo: dormidas, camas, ocupação e alojamento, face a 2019 e ao resto do país.',
}

const fmt = (n: number, dec = 0) =>
  n.toLocaleString('pt-PT', { minimumFractionDigits: dec, maximumFractionDigits: dec })
const signed = (n: number, dec = 1) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${fmt(Math.abs(n), dec)}`

function Tile({ label, value, unit, note }: { label: string; value: string; unit?: string; note: string }) {
  return (
    <div className="stat-card">
      <span className="label-text" style={{ display: 'block', marginBottom: '0.625rem', color: 'var(--text-tertiary)' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span className="stat-value">{value}</span>
        {unit && <span className="stat-unit">{unit}</span>}
      </div>
      <span className="ui-mono" style={{ display: 'block', marginTop: '0.5rem' }}>
        {note}
      </span>
    </div>
  )
}

export default function TurismoPage() {
  const est = estabelecimentos()
  const evolucao = evolucaoDisponivel()
  const outrosDormidas = P.dormidas[2024] - P.dormidasHotelaria2024
  const camasMais = P.camas[2024] - P.camas[2019]

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Saltar para o conteúdo
      </a>
      <DataTicker />
      <Navbar />

      <main id="conteudo" className="page-top" style={{ background: 'var(--bg-primary)' }}>
        {/* Abertura */}
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
            Turismo
          </div>
          <div style={{ height: '3px', background: 'var(--text-primary)' }} />

          <h1 className="visitar-headline">
            Uma noite
            <br />
            <span className="font-display-italic" style={{ color: 'var(--accent)' }}>e meia</span>
          </h1>

          <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1.75rem' }}>
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.625rem)', fontWeight: 400, lineHeight: 1.3, maxWidth: '38rem', textWrap: 'pretty' }}
            >
              Perto de 709 mil dormidas por ano, tantas como antes da pandemia. Quem vem fica, em média, uma noite e meia — no resto do país são duas e meia.
            </p>
          </div>

          <div className="grid-stats" style={{ marginTop: '2.5rem', columnGap: '2rem', rowGap: '1.5rem' }}>
            <Tile label="Dormidas" value={fmt(P.dormidas[2024])} note={`2024 · ${signed(P.variacaoDormidas.coimbra)}% face a 2019`} />
            <Tile label="Turistas por noite" value={fmt(P.turistasPorDia)} unit="em média" note={`2024 · ${fmt(P.turistasPorDiaPct, 1)}% da população`} />
            <Tile label="Estada média" value={fmt(P.estadaMedia2024.coimbra, 1)} unit="noites" note={`2024 · Portugal: ${fmt(P.estadaMedia2024.portugal, 1)}`} />
            <Tile label="Camas" value={fmt(P.camas[2024])} note={`2024 · +${fmt(camasMais)} face a 2019`} />
          </div>
          <DataSource meta={PORDATA_META} />
        </div>

        {/* 2019 → 2024 */}
        <SectionReveal id="camas" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="2019 → 2024"
              title="Mais camas, as mesmas noites"
              subtitle={`Entre 2019 e 2024 abriram ${fmt(camasMais)} camas e as dormidas ficaram onde estavam. A mesma procura repartida por mais oferta: no verão, a ocupação desceu ${fmt(P.ocupacaoVerao.coimbra[2019] - P.ocupacaoVerao.coimbra[2024], 1)} pontos.`}
            />
            <div className="grid-turismo-3">
              <Barras
                titulo="Dormidas"
                formato="numero"
                termos={[
                  { nome: '2019', valor: P.dormidas[2019] },
                  { nome: '2024', valor: P.dormidas[2024], destaque: true },
                ]}
                rodape={`${signed(P.variacaoDormidas.coimbra)}%`}
              />
              <Barras
                titulo="Camas"
                formato="numero"
                termos={[
                  { nome: '2019', valor: P.camas[2019] },
                  { nome: '2024', valor: P.camas[2024], destaque: true },
                ]}
                rodape={`+${fmt(camasMais)} · ${signed(((P.camas[2024] - P.camas[2019]) / P.camas[2019]) * 100)}%`}
              />
              <Barras
                titulo="Ocupação, julho a setembro"
                formato="pct"
                termos={[
                  { nome: '2019', valor: P.ocupacaoVerao.coimbra[2019] },
                  { nome: '2024', valor: P.ocupacaoVerao.coimbra[2024], destaque: true },
                ]}
                rodape={`${signed(P.ocupacaoVerao.coimbra[2024] - P.ocupacaoVerao.coimbra[2019])} p.p.`}
              />
            </div>
            <DataSource meta={PORDATA_META} />
          </div>
        </SectionReveal>

        {/* Coimbra e o país */}
        <SectionReveal id="pais" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="COIMBRA E O PAÍS"
              title="Mais curta, menos sazonal"
              subtitle="Estadas mais curtas do que no resto do país e uma procura menos presa ao verão. Desde 2019, o turismo nacional cresceu; o de Coimbra ficou igual."
            />
            <div className="grid-turismo-2">
              <Barras
                titulo="Dormidas, variação 2019–2024"
                formato="variacao"
                termos={[
                  { nome: 'Portugal', valor: P.variacaoDormidas.portugal },
                  { nome: 'Coimbra', valor: P.variacaoDormidas.coimbra, destaque: true },
                ]}
              />
              <Barras
                titulo="Estada média, 2024"
                formato="noites"
                termos={[
                  { nome: 'Portugal', valor: P.estadaMedia2024.portugal },
                  { nome: 'Coimbra', valor: P.estadaMedia2024.coimbra, destaque: true },
                ]}
              />
              <Barras
                titulo="Dormidas de julho a setembro, 2024"
                formato="pct"
                termos={[
                  { nome: 'Portugal', valor: P.dormidasVerao.portugal[2024] },
                  { nome: 'Coimbra', valor: P.dormidasVerao.coimbra[2024], destaque: true },
                ]}
                rodape="Parte das dormidas do ano"
              />
              <Barras
                titulo="Ocupação de julho a setembro, 2024"
                formato="pct"
                termos={[
                  { nome: 'Portugal', valor: P.ocupacaoVerao.portugal[2024] },
                  { nome: 'Coimbra', valor: P.ocupacaoVerao.coimbra[2024], destaque: true },
                ]}
              />
            </div>
            <DataSource meta={PORDATA_META} />
          </div>
        </SectionReveal>

        {/* Onde se dorme */}
        <SectionReveal id="alojamento" className="page-section">
          <div className="section-container">
            <SectionTitle
              label="ONDE SE DORME"
              title="Muitas casas, poucos hotéis"
              subtitle={
                est?.total && est.alojamentoLocal
                  ? `Três em cada quatro estabelecimentos são alojamento local, mas quase três em cada quatro noites passam-se na hotelaria.`
                  : 'Quase três em cada quatro noites passam-se na hotelaria.'
              }
            />

            <div className="grid-split" style={{ alignItems: 'start', gap: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {est?.hotelaria != null && est.alojamentoLocal != null && est.turismoRural != null && (
                  <div>
                    <BarraRepartida
                      titulo={`Estabelecimentos, ${est.ano}`}
                      unidade="estabelecimentos"
                      segmentos={[
                        { nome: 'Hotelaria', valor: est.hotelaria, cor: COR.hotelaria },
                        { nome: 'Alojamento local e turismo rural', valor: est.alojamentoLocal + est.turismoRural, cor: COR.outros },
                      ]}
                    />
                    <p className="ui-note" style={{ marginTop: '0.625rem' }}>
                      {est.alojamentoLocal} de alojamento local e {est.turismoRural} de turismo no espaço rural e de habitação.
                    </p>
                    <DataSource meta={ineMeta(TURISMO.estabelecimentos)} />
                  </div>
                )}
                <div>
                  <BarraRepartida
                    titulo="Dormidas, 2024"
                    unidade="dormidas"
                    segmentos={[
                      { nome: 'Hotelaria', valor: P.dormidasHotelaria2024, cor: COR.hotelaria },
                      { nome: 'Alojamento local e turismo rural', valor: outrosDormidas, cor: COR.outros },
                    ]}
                  />
                  <p className="ui-note" style={{ marginTop: '0.625rem' }}>
                    As dormidas do alojamento local e do turismo rural não se publicam em separado em Coimbra: são dado confidencial.
                  </p>
                  <DataSource meta={PORDATA_META} />
                </div>
              </div>

              {est && est.estrelas.some((e) => e.total) && (
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Hotelaria por categoria, {est.ano}
                  </div>
                  <p className="ui-note" style={{ marginBottom: '1.25rem' }}>
                    {est.hoteis} hotéis e {est.hoteisApartamentos} hotéis-apartamentos.
                  </p>
                  <ColunasEstrelas dados={est.estrelas} />
                  <DataSource meta={ineMeta(TURISMO.estabelecimentos)} />
                </div>
              )}
            </div>
          </div>
        </SectionReveal>

        {/* Ano a ano — enche-se à medida que o gerador traz as séries do INE */}
        {!evolucao.pronta && (
          <SectionReveal id="evolucao" className="page-section">
            <div className="section-container">
              <SectionTitle
                label="ANO A ANO"
                title="A série inteira"
                subtitle="Hóspedes, dormidas, ocupação e proveitos desde 2015, e os últimos três anos mês a mês, para ler a sazonalidade."
              />
              <div style={{ borderTop: '1px solid var(--border-panel)', paddingTop: '1rem', maxWidth: '38rem' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-secondary)', fontWeight: 300, margin: 0 }}>
                  Estas séries ainda não estão carregadas. Até lá, estão no INE.
                </p>
                <a
                  href="https://www.ine.pt/xurl/indx/0013214/PT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-mono"
                  style={{ display: 'inline-block', marginTop: '0.75rem', color: 'var(--accent-text)', textDecoration: 'none' }}
                >
                  Dormidas por município no INE →
                </a>
              </div>
            </div>
          </SectionReveal>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
