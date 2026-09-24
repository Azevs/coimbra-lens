'use client'

import { useRef, useState } from 'react'

// Os capítulos são as cenas de scripts/video/timeline.mjs (72 bpm, um
// compasso = 10/3 s). Se o filme mudar, estes tempos mudam com ele.
const COMPASSO = 10 / 3
const CAPITULOS = [
  { titulo: 'O rio', inicio: 0 },
  { titulo: 'Aeminium', inicio: 5 * COMPASSO },
  { titulo: 'O reino', inicio: 12 * COMPASSO },
  { titulo: 'Inês e a ponte', inicio: 19 * COMPASSO },
  { titulo: 'A universidade', inicio: 28 * COMPASSO },
  { titulo: 'Os estudantes', inicio: 41 * COMPASSO },
]

export interface Fala {
  inicio: number
  texto: string
}

function relogio(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export default function FilmeCoimbra({ falas }: { falas: Fala[] }) {
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

  const actual = CAPITULOS.filter((c) => agora >= c.inicio).length - 1

  return (
    <div className="filme">
      <div className="filme-ecra">
        <video
          ref={video}
          controls={comecou}
          playsInline
          // preload="none": os 28 MB só descem quando alguém carrega no play
          preload="none"
          poster="/video/coimbra-poster.jpg"
          width={1920}
          height={1080}
          onPlay={() => setComecou(true)}
          onTimeUpdate={(e) => setAgora(e.currentTarget.currentTime)}
        >
          <source src="/video/coimbra.mp4" type="video/mp4" />
          <track kind="subtitles" src="/video/coimbra.pt.vtt" srcLang="pt" label="Português" default />
          <track kind="subtitles" src="/video/coimbra.en.vtt" srcLang="en" label="English" />
        </video>
        {!comecou && (
          <button type="button" className="filme-play" onClick={() => saltar(0)}>
            <span className="filme-play-disco" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="filme-play-texto">Ver o filme · 2:58</span>
          </button>
        )}
      </div>

      <ol className="filme-capitulos" aria-label="Capítulos">
        {CAPITULOS.map((c, i) => (
          <li key={c.titulo}>
            <button
              type="button"
              onClick={() => saltar(c.inicio)}
              aria-current={comecou && i === actual ? 'true' : undefined}
            >
              <span className="filme-cap-tempo">{relogio(c.inicio)}</span>
              <span className="filme-cap-titulo">{c.titulo}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="filme-rodape">
        <span>Narrado em inglês · legendas em português</span>
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
