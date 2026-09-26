'use client'

import { useState } from 'react'

import SectionTitle from '@/components/ui/SectionTitle'
import DataSource from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'
import { FAMILIAS, TRILHOS, TRILHOS_META, duracao, forma, km, passa, type Trilho } from '@/lib/trilhos'
import { useTrilhos } from '@/lib/trilhos-estado'
import Marca from './Marca'
import Perfil from './Perfil'

type Ordem = 'concelho' | 'curtos' | 'subida'

const ORDENS: Record<Ordem, { nome: string; comparar: (a: Trilho, b: Trilho) => number }> = {
  concelho: {
    nome: 'Por concelho',
    comparar: (a, b) => (a.concelhos[0] ?? '').localeCompare(b.concelhos[0] ?? '', 'pt') || a.titulo.localeCompare(b.titulo, 'pt'),
  },
  curtos: { nome: 'Mais curtos primeiro', comparar: (a, b) => a.distanciaKm - b.distanciaKm },
  subida: { nome: 'Mais a subir primeiro', comparar: (a, b) => b.subida - a.subida },
}

/**
 * Os percursos em lista, para quem prefere escolher lendo.
 *
 * Obedece aos mesmos filtros da carta — a lista e o mapa mostram sempre o
 * mesmo conjunto. Cada ficha leva a silhueta do seu perfil, à escala dela:
 * serve para ver a forma do esforço (sobe e desce, sobe de uma vez, plano),
 * não para comparar alturas entre fichas.
 */
export default function ListaTrilhos() {
  const [ordem, setOrdem] = useState<Ordem>('concelho')
  const filtros = useTrilhos((s) => s.filtros)
  const escolher = useTrilhos((s) => s.escolher)
  const lista = TRILHOS.filter((t) => passa(t, filtros)).sort(ORDENS[ordem].comparar)

  const abrir = (id: string) => {
    escolher(id)
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="percursos" className="page-section">
      <div className="section-container">
        <SectionTitle
          label="OS PERCURSOS"
          title="Escolher pelo caminho"
          subtitle="Os mesmos percursos da carta, com os mesmos filtros. A silhueta é o perfil de cada um, do início ao fim."
        />

        <div className="trilhos-ordem" role="group" aria-label="Ordenar">
          {(Object.keys(ORDENS) as Ordem[]).map((o) => (
            <button key={o} type="button" className={`trilhos-chip trilhos-chip-texto${ordem === o ? ' is-on' : ''}`} aria-pressed={ordem === o} onClick={() => setOrdem(o)}>
              {ORDENS[o].nome}
            </button>
          ))}
          <span className="ui-mono trilhos-ordem-n">{lista.length} percursos</span>
        </div>

        <ul className="trilhos-grelha">
          {lista.map((t) => (
            <li key={t.id}>
              <button type="button" className="trilho-cartao" onClick={() => abrir(t.id)} style={{ '--cor-trilho': FAMILIAS[t.familia].linha } as React.CSSProperties}>
                <span className="trilho-cartao-topo">
                  <Marca familia={t.familia} codigo={t.codigo} />
                  {t.declarada && <span className="trilho-selo trilho-selo-pequeno">Ficha oficial</span>}
                </span>
                <span className="trilho-cartao-nome">{t.titulo}</span>
                <span className="trilho-cartao-onde">
                  {t.concelhos.join(' · ')}
                  {t.troco && ' — troço'}
                </span>
                <Perfil cotas={t.perfil} distanciaKm={t.distanciaKm} mini cor={FAMILIAS[t.familia].linha} />
                <span className="trilho-cartao-numeros font-data">
                  <span>{km(t.declarada && !t.divergencia ? t.declarada.extensaoKm : t.distanciaKm)}</span>
                  <span>↑ {fmt(t.subida)} m</span>
                  <span>{forma(t)}</span>
                  {t.declarada?.duracaoMin != null && <span>{duracao(t.declarada.duracaoMin)}</span>}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {!lista.length && <p className="ui-note">Nenhum percurso passa estes filtros.</p>}
        <DataSource meta={TRILHOS_META} />
      </div>
    </section>
  )
}
