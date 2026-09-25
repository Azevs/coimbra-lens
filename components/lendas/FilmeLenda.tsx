'use client'

import { useRef, useState } from 'react'

// O leitor de um episódio das lendas: o mesmo palco do filme da página Sobre
// (cartaz, capítulos, narração para ler), com o vídeo e os tempos de cada lenda.

export interface Fala {
  inicio: number
  texto: string
}
export interface Capitulo {
  titulo: string
  inicio: number
}

function relogio(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export default function FilmeLenda({
  id,
  duracao,
  capitulos,
  falas,
}: {
  id: string
  duracao: number
  capitulos: Capitulo[]
  falas: Fala[]
}) {
  const video = useRef<HTMLVideoElement>(null)
  const [comecou, setComecou] = useState(false)
  const [agora, setAgora] = useState(0)

  const saltar = (t: number) => {
    const v = video.current
    if (!v) return
    v.currentTime = t
    setAgora(t)
    void v.play()
  }

  const actual = capitulos.filter((c) => agora >= c.inicio).length - 1

  return (
    <div className="filme">
      <div className="filme-ecra">
        <video
          ref={video}
          controls={comecou}
          playsInline
          // preload="none": o vídeo só desce quando alguém carrega no play
          preload="none"
          poster={`/video/lendas/${id}-cartaz.jpg`}
          width={1920}
          height={1080}
          onPlay={() => setComecou(true)}
          onTimeUpdate={(e) => setAgora(e.currentTarget.currentTime)}
        >
          <source src={`/video/lendas/${id}.mp4`} type="video/mp4" />
          <track kind="subtitles" src={`/video/lendas/${id}.pt.vtt`} srcLang="pt" label="Português" />
        </video>
        {!comecou && (
          <button type="button" className="filme-play" onClick={() => saltar(0)}>
            <span className="filme-play-disco" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="filme-play-texto">Ver o episódio · {relogio(duracao)}</span>
          </button>
        )}
      </div>

      <ol className="filme-capitulos filme-capitulos--lenda" aria-label="Capítulos">
        {capitulos.map((c, i) => (
          <li key={c.titulo}>
            <button type="button" onClick={() => saltar(c.inicio)} aria-current={comecou && i === actual ? 'true' : undefined}>
              <span className="filme-cap-tempo">{relogio(c.inicio)}</span>
              <span className="filme-cap-titulo">{c.titulo}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="filme-rodape">
        <span>Narrado em português · legendas disponíveis</span>
        <details className="filme-narracao">
          <summary>Ler a narração</summary>
          <ol>
            {falas.map((f) => (
              <li key={f.inicio}>
                <button type="button" onClick={() => saltar(f.inicio)}>
                  <span className="filme-cap-tempo">{relogio(f.inicio)}</span>
                  <span>{f.texto}</span>
                </button>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  )
}
