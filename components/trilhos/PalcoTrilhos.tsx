'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

import DataSource from '@/components/ui/DataSource'
import {
  EXTENSOES,
  FAMILIAS,
  FAMILIA_ORDEM,
  TRILHOS,
  TRILHOS_META,
  TRILHO_POR_ID,
  TOTAL_KM,
  COM_FICHA,
  passa,
  type Extensao,
  type Familia,
} from '@/lib/trilhos'
import { useTrilhos } from '@/lib/trilhos-estado'
import { fmt } from '@/lib/format'
import FichaTrilho from './FichaTrilho'
import Marca from './Marca'

// O Mapbox não corre no servidor, e não vale a pena pesar no primeiro HTML.
const MapaTrilhos = dynamic(() => import('./MapaTrilhos'), { ssr: false })

function Filtros() {
  const filtros = useTrilhos((s) => s.filtros)
  const filtrar = useTrilhos((s) => s.filtrar)
  const visiveis = TRILHOS.filter((t) => passa(t, filtros)).length

  const alternarFamilia = (f: Familia) => {
    const tem = filtros.familias.includes(f)
    // Esconder as três famílias deixava a carta vazia sem explicação.
    if (tem && filtros.familias.length === 1) return
    filtrar({ familias: tem ? filtros.familias.filter((x) => x !== f) : [...filtros.familias, f] })
  }

  return (
    <div className="trilhos-filtros">
      <div className="trilhos-filtros-linha" role="group" aria-label="Famílias de percurso">
        {FAMILIA_ORDEM.map((f) => {
          const on = filtros.familias.includes(f)
          const n = TRILHOS.filter((t) => t.familia === f).length
          return (
            <button key={f} type="button" className={`trilhos-chip trilhos-chip-familia${on ? ' is-on' : ''}`} aria-pressed={on} title={FAMILIAS[f].nota} onClick={() => alternarFamilia(f)}>
              <Marca familia={f} codigo={FAMILIAS[f].plural} />
              <span className="trilhos-chip-n">{n}</span>
            </button>
          )
        })}
      </div>
      <div className="trilhos-filtros-linha" role="group" aria-label="Extensão">
        {(Object.keys(EXTENSOES) as Extensao[]).map((e) => {
          const on = filtros.extensao === e
          return (
            <button key={e} type="button" className={`trilhos-chip trilhos-chip-texto${on ? ' is-on' : ''}`} aria-pressed={on} onClick={() => filtrar({ extensao: on ? null : e })}>
              {EXTENSOES[e].nome}
            </button>
          )
        })}
      </div>
      <div className="trilhos-filtros-linha" role="group" aria-label="Outros filtros">
        <button type="button" className={`trilhos-chip trilhos-chip-texto${filtros.circular ? ' is-on' : ''}`} aria-pressed={filtros.circular} onClick={() => filtrar({ circular: !filtros.circular })}>
          ↻ Circulares
        </button>
        <button type="button" className={`trilhos-chip trilhos-chip-texto${filtros.soFicha ? ' is-on' : ''}`} aria-pressed={filtros.soFicha} onClick={() => filtrar({ soFicha: !filtros.soFicha })}>
          Com ficha oficial <span className="trilhos-chip-n">{COM_FICHA.length}</span>
        </button>
      </div>
      <p className="trilhos-contagem ui-mono" aria-live="polite">
        {visiveis === TRILHOS.length ? `${visiveis} percursos` : `${visiveis} de ${TRILHOS.length} percursos`}
        <span className="trilhos-contagem-dica"> · toque num traço para abrir a ficha</span>
      </p>
    </div>
  )
}

/**
 * A carta dos trilhos, de fora a fora, com o painel por cima à esquerda.
 *
 * O painel é a abertura da página enquanto nada está escolhido (título,
 * filtros) e passa a ser a ficha do trilho quando se escolhe um. No
 * telemóvel o painel vem por baixo da carta, no fluxo da página: uma folha
 * deslizante por cima do mapa lutava com o gesto de o mexer.
 */
export default function PalcoTrilhos() {
  const selecionado = useTrilhos((s) => s.selecionado)
  const trilho = selecionado ? TRILHO_POR_ID.get(selecionado) : null
  const painel = useRef<HTMLDivElement>(null)

  // Ao escolher, o painel volta ao topo: a ficha anterior podia estar a meio.
  useEffect(() => {
    painel.current?.scrollTo({ top: 0 })
  }, [selecionado])

  // Esc fecha a ficha.
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && useTrilhos.getState().selecionado) useTrilhos.getState().escolher(null)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [])

  const concelhos = new Set(TRILHOS.flatMap((t) => t.concelhos)).size

  return (
    <section id="mapa" className="trilhos-palco" aria-label="Carta dos trilhos">
      <MapaTrilhos />

      <div ref={painel} className={`trilhos-painel${trilho ? ' tem-ficha' : ''}`}>
        {trilho ? (
          <>
            {/* A página não perde o título quando a ficha ocupa o painel. */}
            <h1 className="sr-only">Trilhos da Região de Coimbra</h1>
            <FichaTrilho key={trilho.id} trilho={trilho} />
          </>
        ) : (
          <div className="trilhos-abertura">
            <div className="trilhos-kicker">
              <span>Trilhos</span>
              <span>Região de Coimbra</span>
            </div>
            <div className="trilhos-regua" />
            <h1 className="trilhos-titulo">
              Da serra <em>ao mar</em>
            </h1>
            <p className="trilhos-lede">
              {TRILHOS.length} percursos a pé na Região de Coimbra, em {concelhos} dos 19 concelhos: {fmt(TOTAL_KM)} quilómetros de caminho — das
              aldeias de xisto do Açor à Serra da Boa Viagem, sobre o mar.
            </p>
            <Filtros />
          </div>
        )}
      </div>

      <div className="trilhos-palco-selo">
        <DataSource meta={TRILHOS_META} showNote={false} />
      </div>
    </section>
  )
}
