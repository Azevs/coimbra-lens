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

function Facto({ rotulo, valor, origem }: { rotulo: string; valor: string; origem?: 'ficha' | 'medido' }) {
  return (
    <div className="trilho-facto">
      <dt>
        {rotulo}
        {origem && <span className={`trilho-origem trilho-origem-${origem}`}>{origem}</span>}
      </dt>
      <dd className="font-data">{valor}</dd>
    </div>
  )
}

/**
 * A ficha de um trilho.
 *
 * Duas colunas de verdade diferente, e cada número diz de qual é: o que a
 * ficha publicada declara (duração, dificuldade, época — do guia da CIM ou
 * do Turismo Centro) e o que se mede no traçado (distância, subida,
 * perfil). O que a ficha não traz é medido quando se pode medir; duração e
 * dificuldade nunca — não se calculam.
 */
export default function FichaTrilho({ trilho: t }: { trilho: Trilho }) {
  const posicao = useTrilhos((s) => s.posicao)
  const aPercorrer = useTrilhos((s) => s.aPercorrer)
  const { escolher, posicionar, percorrer } = useTrilhos.getState()
  const [animar, setAnimar] = useState(false)
  useEffect(() => setAnimar(canAnimate()), [])

  const d = t.declarada
  const mide = d?.mide ?? null
  const fonte = ligacaoFonte(t)
  const cor = FAMILIAS[t.familia].linha
  const subidaMedida = `↑ ${fmt(t.subida)} m`
  const altitudeMedida = `${fmt(t.cotaMin)}–${fmt(t.cotaMax)} m`

  return (
    <article className="trilho-ficha" aria-labelledby="trilho-ficha-titulo">
      <header className="trilho-ficha-topo">
        <Marca familia={t.familia} codigo={t.codigo} grande />
        {d && <span className="trilho-selo">Ficha oficial</span>}
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
        {d ? (
          <>
            <Facto rotulo="Extensão" valor={km(d.extensaoKm)} origem="ficha" />
            <Facto rotulo="Duração" valor={d.duracaoMin != null ? duracao(d.duracaoMin) : '—'} origem={d.duracaoMin != null ? 'ficha' : undefined} />
            {d.desnivel ? (
              <Facto rotulo="Desnível" valor={d.desnivel} origem="ficha" />
            ) : (
              <Facto rotulo="Sobe" valor={subidaMedida} origem="medido" />
            )}
            {d.altitude ? (
              <Facto rotulo="Altitude" valor={`${fmt(d.altitude.min)}–${fmt(d.altitude.max)} m`} origem="ficha" />
            ) : (
              <Facto rotulo="Altitude" valor={altitudeMedida} origem="medido" />
            )}
            <Facto rotulo="Percurso" valor={forma(t)} origem={d.tipo ? 'ficha' : 'medido'} />
            {d.epoca ? (
              <Facto rotulo="Época" valor={d.epoca} origem="ficha" />
            ) : (
              <Facto rotulo="Dificuldade" valor={d.dificuldade ?? '—'} origem={d.dificuldade ? 'ficha' : undefined} />
            )}
          </>
        ) : (
          <>
            <Facto rotulo="Extensão" valor={km(t.distanciaKm)} origem="medido" />
            <Facto rotulo="Percurso" valor={forma(t)} origem="medido" />
            <Facto rotulo="Sobe" valor={`${fmt(t.subida)} m`} origem="medido" />
            <Facto rotulo="Desce" valor={`${fmt(t.descida)} m`} origem="medido" />
            <Facto rotulo="Altitude" valor={altitudeMedida} origem="medido" />
            <Facto rotulo="Duração" valor="Sem ficha" />
          </>
        )}
      </dl>

      {t.divergencia && (
        <p className="trilho-aviso">
          O traçado no mapa mede {km(t.divergencia.medidoKm)}; a ficha declara {km(t.divergencia.guiaKm)}. Descrevem
          versões diferentes do percurso.
        </p>
      )}

      {mide && (
        <div className="trilho-dificuldade" aria-label="Dificuldade, de 1 a 5">
          {ESCALAS.map((e) => (
            <div key={e.chave} className="trilho-escala">
              <span className="trilho-escala-nome">{e.nome}</span>
              <span className="trilho-escala-pontos" aria-label={`${mide[e.chave]} em 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={n <= mide[e.chave] ? 'is-cheio' : undefined} />
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
        {(fonte || (t.website && t.fonte !== 'camara') || d?.pagina) && (
          <div className="trilho-ligacoes">
            {fonte && (
              <a href={fonte.href} target="_blank" rel="noopener noreferrer">
                {fonte.texto} ↗
              </a>
            )}
            {t.website && t.fonte !== 'camara' && (
              <a href={t.website} target="_blank" rel="noopener noreferrer">
                Página do percurso ↗
              </a>
            )}
            {d?.pagina && (
              <a href={GUIA_URL} target="_blank" rel="noopener noreferrer">
                Guia da CIM, p. {d.pagina} ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
