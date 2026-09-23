'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ATTRACTIONS, WALKING_ROUTE } from '@/lib/attractions'
import type { ParagemMapa } from './MapaRoteiro'

// O Mapbox acede a `window` ao arrancar: fora do servidor (ver LazyMaps).
const MapaRoteiro = dynamic(() => import('./MapaRoteiro'), {
  ssr: false,
  loading: () => <div className="roteiro-mapa" aria-hidden />,
})

const porId = new Map(ATTRACTIONS.map((a) => [a.id, a]))

/** As paragens numeradas de seguida, através dos três tempos do dia. */
const TEMPOS = (() => {
  let n = 0
  return WALKING_ROUTE.map((t) => ({
    ...t,
    paragens: t.paragens
      .map((p) => {
        const a = porId.get(p.id)
        return a ? { ...p, n: ++n, nome: a.name, pos: a.pos } : null
      })
      .filter((p): p is NonNullable<typeof p> => p !== null),
  }))
})()
const PARAGENS: ParagemMapa[] = TEMPOS.flatMap((t) => t.paragens.map(({ n, id, nome, pos }) => ({ n, id, nome, pos })))

/**
 * O dia a pé: a lista em três tempos e o mapa ao lado, ligados — passar
 * por uma paragem na lista acende-a no mapa, e um número no mapa leva à
 * ficha do lugar.
 */
export default function Roteiro() {
  const [activa, setActiva] = useState<string | null>(null)

  const irParaFicha = (id: string) => {
    setActiva(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="roteiro">
      <div className="roteiro-tempos">
        {TEMPOS.map((t) => (
          <section key={t.tempo} className="roteiro-tempo" aria-labelledby={`tempo-${t.tempo}`}>
            <header className="roteiro-tempo-cabeca">
              <span className="ui-label ui-label-accent">{t.tempo}</span>
              <h3 id={`tempo-${t.tempo}`} className="font-display">
                {t.titulo}
              </h3>
            </header>
            <ol className="roteiro-lista">
              {t.paragens.map((p) => (
                <li
                  key={p.id}
                  className={`roteiro-item${activa === p.id ? ' is-activa' : ''}`}
                  onMouseEnter={() => setActiva(p.id)}
                  onMouseLeave={() => setActiva((a) => (a === p.id ? null : a))}
                >
                  <span className="roteiro-numero">{p.n}</span>
                  <span>
                    <a
                      href={`#${p.id}`}
                      className="font-display roteiro-nome"
                      onFocus={() => setActiva(p.id)}
                      onBlur={() => setActiva((a) => (a === p.id ? null : a))}
                    >
                      {p.nome}
                    </a>
                    <span className="roteiro-nota">{p.note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <div className="roteiro-lado">
        <MapaRoteiro paragens={PARAGENS} activa={activa} onEscolher={irParaFicha} />
        <p className="ui-note roteiro-legenda">A linha liga as paragens pela ordem do dia, em recta — não é o caminho.</p>
      </div>
    </div>
  )
}
