import type { Metadata } from 'next'
import Navbar from '@/components/navigation/Navbar'
import SiteFooter from '@/components/navigation/SiteFooter'
import DataTicker from '@/components/hero/DataTicker'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { BarraRepartida, Barras, ColunasAno, ColunasEstrelas, COR } from '@/components/turismo/TurismoCharts'
import RankedBars from '@/components/charts/RankedBars'
import {
  PORDATA_META,
  PORDATA_TURISMO as P,
  TURISMO,
  estabelecimentos,
  ineMeta,
  origem,
  serie,
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
  const orig = origem()
  const dormidas = serie('dormidas')
  const hospedes = serie('hospedes')
  const estada = serie('estadaMedia')
  const camas = serie('camas')
  const [dAnt, dUlt] = dormidas.slice(-2)
  const ultimoAno = dUlt?.ano
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
              Perto de 700 mil dormidas por ano, quase tantas como antes da pandemia. Quem vem fica, em média, uma noite e meia — no resto do país são duas e meia.
            </p>
          </div>

          <div className="grid-stats" style={{ marginTop: '2.5rem', columnGap: '2rem', rowGap: '1.5rem' }}>
            {dUlt && (
              <Tile
                label="Dormidas"
                value={fmt(dUlt.valor)}
                note={dAnt ? `${dUlt.ano} · ${signed(((dUlt.valor - dAnt.valor) / dAnt.valor) * 100)}% face a ${dAnt.ano}` : dUlt.ano}
              />
            )}
            {hospedes.at(-1) && (
              <Tile
                label="Hóspedes"
                value={fmt(hospedes.at(-1)!.valor)}
                note={orig?.pctEstrangeiros != null ? `${orig.ano} · ${fmt(orig.pctEstrangeiros, 0)}% do estrangeiro` : hospedes.at(-1)!.ano}
              />
            )}
            {estada.at(-1) && <Tile label="Estada média" value={fmt(estada.at(-1)!.valor, 1)} unit="noites" note={estada.at(-1)!.ano} />}
            {camas.at(-1) && <Tile label="Camas" value={fmt(camas.at(-1)!.valor)} note={camas.at(-1)!.ano} />}
          </div>
          <DataSource meta={ineMeta(TURISMO.dormidas)} />
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

        {/* Ano a ano */}
        {dormidas.length >= 2 && (
          <SectionReveal id="evolucao" className="page-section">
            <div className="section-container">
              <SectionTitle
                label={`${dormidas[0].ano} → ${ultimoAno}`}
                title="As mesmas noites, mais receita"
                subtitle="Desde 2023 as dormidas andam perto das 700 mil por ano. Os proveitos e o rendimento por quarto subiram cerca de um terço desde 2022."
              />
              <div className="grid-turismo-3">
                <ColunasAno titulo="Dormidas" formato="numero" pontos={dormidas} />
                <ColunasAno titulo="Hóspedes" formato="numero" pontos={hospedes} />
                <ColunasAno titulo="Ocupação-cama" formato="pct" pontos={serie('ocupacaoCama')} nota="Taxa líquida, média do ano" />
                <ColunasAno titulo="Proveitos totais" formato="milhares-euros" pontos={serie('proveitos')} />
                <ColunasAno titulo="Rendimento por quarto disponível" formato="euros" pontos={serie('revpar')} nota="RevPAR" />
                <ColunasAno titulo="Estabelecimentos" formato="numero" pontos={serie('estabelecimentos')} />
              </div>
              <DataSource meta={ineMeta(TURISMO.dormidas)} />
            </div>
          </SectionReveal>
        )}

        {/* De onde vêm */}
        {orig && orig.paises.length > 0 && (
          <SectionReveal id="origem" className="page-section">
            <div className="section-container">
              <SectionTitle
                label="DE ONDE VÊM"
                title="Mais de metade de fora"
                subtitle="Espanha à frente; logo atrás, quase empatados, Estados Unidos, Brasil e Itália."
              />
              <div className="grid-split" style={{ alignItems: 'start', gap: '3rem' }}>
                <div>
                  {orig.portugal != null && orig.estrangeiros != null && (
                    <BarraRepartida
                      titulo={`Hóspedes, ${orig.ano}`}
                      unidade="hóspedes"
                      segmentos={[
                        { nome: 'Residentes em Portugal', valor: orig.portugal, cor: COR.hotelaria },
                        { nome: 'Do estrangeiro', valor: orig.estrangeiros, cor: COR.outros },
                      ]}
                    />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.75rem' }}>
                    Hóspedes do estrangeiro por país, {orig.ano}
                  </div>
                  <RankedBars
                    unit="hóspedes"
                    shareOf={orig.total ?? undefined}
                    data={orig.paises.slice(0, 10).map((p) => ({
                      name: p.nome.length > 22 ? p.nome.replace('Estados Unidos da América', 'EUA').replace(/Reino Unido.*/, 'Reino Unido') : p.nome,
                      full: p.nome,
                      value: p.valor,
                    }))}
                  />
                </div>
              </div>
              <DataSource meta={ineMeta(TURISMO.hospedesOrigem)} />
            </div>
          </SectionReveal>
        )}
      </main>

      <SiteFooter />
    </>
  )
}
