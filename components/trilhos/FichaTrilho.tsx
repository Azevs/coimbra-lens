'use client'

import { useEffect, useState } from 'react'
import { canAnimate } from '@/lib/motion'
import { fmt } from '@/lib/format'
import { FAMILIAS, GUIA_URL, duracao, forma, km, ligacaoFonte, type Trilho } from '@/lib/trilhos'
import { useTrilhos } from '@/lib/trilhos-estado'
import type { Dificuldade } from '@/lib/trilhos-guia'
import Marca from './Marca'
import Perfil from './Perfil'

const ESCALAS: { chave: keyof Dificuldade; nome: string }[] = [
  { chave: 'piso', nome: 'Tipo de piso' },
  { chave: 'esforco', nome: 'Esforço físico' },
  { chave: 'adversidade', nome: 'Adversidade do meio' },
  { chave: 'orientacao', nome: 'Orientação' },
]

function Facto({ rotulo, valor, origem }: { rotulo: string; valor: string; origem?: 'guia' | 'medido' }) {
  return (
    <div className="trilho-facto">
      <dt>
        {rotulo}
        {origem && <span className={`trilho-origem trilho-origem-${origem}`}>{origem === 'guia' ? 'guia' : 'medido'}</span>}
      </dt>
      <dd className="font-data">{valor}</dd>
    </div>
  )
}

/**
 * A ficha de um trilho.
 *
 * Duas colunas de verdade diferente, e cada número diz de qual é: o que a
 * CIM declara no guia (duração, dificuldade, época) e o que se mede no
 * traçado (distância, subida, perfil). Um percurso sem ficha no guia fica
 * sem duração e sem dificuldade — não se calculam.
 */
export default function FichaTrilho({ trilho: t }: { trilho: Trilho }) {
  const posicao = useTrilhos((s) => s.posicao)
  const aPercorrer = useTrilhos((s) => s.aPercorrer)
  const { escolher, posicionar, percorrer } = useTrilhos.getState()
  const [animar, setAnimar] = useState(false)
  useEffect(() => setAnimar(canAnimate()), [])

  const g = t.guia
  const fonte = ligacaoFonte(t)
  const cor = FAMILIAS[t.familia].linha

  return (
    <article className="trilho-ficha" aria-labelledby="trilho-ficha-titulo">
      <header className="trilho-ficha-topo">
        <Marca familia={t.familia} codigo={t.codigo} grande />
        {g && <span className="trilho-selo">Ficha oficial</span>}
        <button type="button" className="trilho-fechar" onClick={() => escolher(null)} aria-label="Fechar a ficha e voltar à carta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <h2 id="trilho-ficha-titulo" className="trilho-ficha-titulo">
        {t.titulo}
      </h2>
      <p className="trilho-ficha-onde">
        {t.concelhos.join(' · ')}
        {t.troco && <span> — troço na região</span>}
      </p>

      <dl className="trilho-factos">
        {g ? (
          <>
            <Facto rotulo="Extensão" valor={km(g.extensaoKm)} origem="guia" />
            <Facto rotulo="Duração" valor={duracao(g.duracaoMin)} origem="guia" />
            <Facto rotulo="Desnível" valor={g.desnivel ?? '—'} origem="guia" />
            <Facto rotulo="Altitude" valor={g.altitude ? `${fmt(g.altitude.min)}–${fmt(g.altitude.max)} m` : '—'} origem="guia" />
            <Facto rotulo="Percurso" valor={g.tipo} origem="guia" />
            <Facto rotulo="Época" valor={g.epoca} origem="guia" />
          </>
        ) : (
          <>
            <Facto rotulo="Extensão" valor={km(t.distanciaKm)} origem="medido" />
            <Facto rotulo="Percurso" valor={forma(t)} origem="medido" />
            <Facto rotulo="Sobe" valor={`${fmt(t.subida)} m`} origem="medido" />
            <Facto rotulo="Desce" valor={`${fmt(t.descida)} m`} origem="medido" />
            <Facto rotulo="Altitude" valor={`${fmt(t.cotaMin)}–${fmt(t.cotaMax)} m`} origem="medido" />
            <Facto rotulo="Duração" valor="Sem ficha" />
          </>
        )}
      </dl>

      {t.divergencia && (
        <p className="trilho-aviso">
          O traçado no mapa mede {km(t.divergencia.medidoKm)}; o guia declara {km(t.divergencia.guiaKm)}. Descrevem
          versões diferentes do percurso.
        </p>
      )}

      {g && (
        <div className="trilho-dificuldade" aria-label="Dificuldade, de 1 a 5">
          {ESCALAS.map((e) => (
            <div key={e.chave} className="trilho-escala">
              <span className="trilho-escala-nome">{e.nome}</span>
              <span className="trilho-escala-pontos" aria-label={`${g.dificuldade[e.chave]} em 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={n <= g.dificuldade[e.chave] ? 'is-cheio' : undefined} />
                ))}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="trilho-ficha-perfil">
        <div className="trilho-ficha-perfil-topo">
          <span className="label-text">
            Perfil <span className="trilho-origem trilho-origem-medido">medido</span>
          </span>
          <span className="ui-mono">
            ↑ {fmt(t.subida)} m · ↓ {fmt(t.descida)} m
          </span>
        </div>
        <Perfil cotas={t.perfil} distanciaKm={t.distanciaKm} posicao={posicao} aoMover={aPercorrer ? undefined : posicionar} cor={cor} />
      </div>

      <div className="trilho-accoes">
        {animar && (
          <button type="button" className={`trilho-percorrer${aPercorrer ? ' is-activo' : ''}`} onClick={() => {
              // No telemóvel a ficha está por baixo da carta: o voo vê-se lá em cima.
              if (!aPercorrer && window.innerWidth < 1024) document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' })
              percorrer(!aPercorrer)
            }}>
            {aPercorrer ? (
              <>
                <span className="trilho-percorrer-icone" aria-hidden="true">■</span> Parar
              </>
            ) : (
              <>
                <span className="trilho-percorrer-icone" aria-hidden="true">▶</span> Percorrer em 3D
              </>
            )}
          </button>
        )}
        <div className="trilho-ligacoes">
          <a href={fonte.href} target="_blank" rel="noopener noreferrer">
            {fonte.texto} ↗
          </a>
          {t.website && t.fonte !== 'cantanhede' && (
            <a href={t.website} target="_blank" rel="noopener noreferrer">
              Página do percurso ↗
            </a>
          )}
          {g && (
            <a href={GUIA_URL} target="_blank" rel="noopener noreferrer">
              Guia da CIM, p. {g.pagina} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
