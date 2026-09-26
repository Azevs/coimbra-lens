'use client'

import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { FICHAS_TC, REDE_META, GUIA_REDE, GUIA_URL, TRILHOS } from '@/lib/trilhos'
import { useTrilhos } from '@/lib/trilhos-estado'

type Estado = 'carta' | 'ficha' | 'nome'

const ESTADOS: Record<Estado, string> = {
  carta: 'Na carta',
  ficha: 'Com ficha, sem traçado publicado',
  nome: 'Só o nome',
}

/**
 * A rede: o índice do guia da CIM, mais as pequenas rotas que o Turismo
 * Centro lista e o guia não (a rede nova da Lousã, os PR de Almalaguês, o
 * Luso-Bussaco 360…). As grandes rotas ficam de fora — estão na carta.
 */
const noGuia = new Set(GUIA_REDE.map((e) => e.codigo).filter(Boolean))
const EXTRA = FICHAS_TC.filter((f) => !/^(GR|CNE)/.test(f.codigo ?? '') && !(f.codigo && noGuia.has(f.codigo))).map((f) => ({
  codigo: f.codigo,
  nome: f.nome,
  concelho: f.concelho,
  ficha: f.id,
}))

/** Para cada entrada, o trilho da carta que lhe corresponde. */
const REDE = [...GUIA_REDE, ...EXTRA].map((e) => {
  const trilho = TRILHOS.find((t) => (e.ficha && t.ficha === e.ficha) || (e.codigo && t.codigo === e.codigo)) ?? null
  const temFicha = Boolean(e.ficha) || FICHAS_TC.some((f) => f.codigo && f.codigo === e.codigo)
  const estado: Estado = trilho ? 'carta' : temFicha ? 'ficha' : 'nome'
  // O guia é de 2021 e a Lousã refez a rede depois (a "Rota das 4 Aldeias"
  // é hoje a Rota do Trevim): vale o nome da carta ou da ficha mais recente.
  const tc = e.codigo ? FICHAS_TC.find((f) => f.codigo === e.codigo) : null
  const nome = trilho?.titulo ?? tc?.nome ?? e.nome
  return { ...e, nome, trilho, estado }
})

const ordemCodigo = (c: string | null) => Number(/\d+(\.\d+)?/.exec(c ?? '')?.[0] ?? 99)
const POR_CONCELHO = [...new Set(REDE.map((e) => e.concelho))]
  .sort((a, b) => a.localeCompare(b, 'pt'))
  .map((c) => ({
    concelho: c,
    entradas: REDE.filter((e) => e.concelho === c).sort((a, b) => ordemCodigo(a.codigo) - ordemCodigo(b.codigo)),
  }))

const CONTA = {
  carta: REDE.filter((e) => e.estado === 'carta').length,
  ficha: REDE.filter((e) => e.estado === 'ficha').length,
}

/**
 * A rede inteira, tal como o guia da CIM a lista, concelho a concelho — e
 * o que dela já está na carta.
 *
 * É a parte da página que diz o que falta. Um percurso do guia sem traçado
 * aberto não se desenha à mão a partir do mapa impresso: fica aqui, com o
 * nome e o código, até alguém o publicar.
 */
export default function RedeGuia() {
  const escolher = useTrilhos((s) => s.escolher)
  const abrir = (id: string) => {
    escolher(id)
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="rede" className="page-section trilhos-rede">
      <div className="section-container">
        <SectionTitle
          label="A REDE"
          title="Concelho a concelho"
          subtitle={`A rede de pequenas rotas e percursos interpretativos da Região de Coimbra soma ${REDE.length} caminhos. ${CONTA.carta} estão desenhados na carta; ${CONTA.ficha} têm ficha mas ainda não têm traçado publicado; os restantes são conhecidos só pelo nome.`}
        />

        <ul className="trilhos-rede-legenda" aria-label="Legenda">
          {(Object.keys(ESTADOS) as Estado[]).map((e) => (
            <li key={e}>
              <span className={`trilhos-rede-ponto is-${e}`} aria-hidden="true" />
              {ESTADOS[e]}
            </li>
          ))}
        </ul>

        <div className="trilhos-rede-grelha">
          {POR_CONCELHO.map(({ concelho, entradas }) => (
            <div key={concelho} className="trilhos-rede-concelho">
              <h3>{concelho}</h3>
              <ul>
                {entradas.map((e) => (
                  <li key={`${e.codigo}-${e.nome}`} className={`is-${e.estado}`}>
                    <span className={`trilhos-rede-ponto is-${e.estado}`} aria-label={ESTADOS[e.estado]} />
                    {e.trilho ? (
                      <button type="button" onClick={() => abrir(e.trilho!.id)}>
                        {e.codigo && <span className="ui-mono">{e.codigo}</span>} {e.nome}
                      </button>
                    ) : (
                      <span>
                        {e.codigo && <span className="ui-mono">{e.codigo}</span>} {e.nome}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="ui-note trilhos-rede-nota">
          <a href={GUIA_URL} target="_blank" rel="noopener noreferrer">
            O guia completo, com os mapas impressos de cada percurso ↗
          </a>
        </p>
        <DataSource meta={REDE_META} />
      </div>
    </section>
  )
}
