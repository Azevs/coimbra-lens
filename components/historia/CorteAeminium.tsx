'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { CORTE } from '@/lib/historia-aeminium'
import { FACHADA_POENTE_M, PASSOS, type PassoId } from '@/lib/historia-aeminium-textos'
import Selo from '@/components/historia/Selo'

/**
 * O CORTE — a peça central do capítulo.
 *
 * Um perfil poente → nascente pela colina da Alta, à escala verdadeira (um
 * metro na horizontal é um metro na vertical): nada de exagero vertical, que
 * faria as abóbadas do criptopórtico parecerem outra coisa. Em vez disso,
 * a câmara aproxima-se.
 *
 * O desenho vive num painel pegajoso; os passos do texto passam por cima e
 * cada um que entra muda o estado. O estado é discreto, não um scrub: quem
 * pede movimento reduzido vê as mesmas imagens, sem transição.
 *
 * Três camadas de verdade, cada uma com a sua tinta:
 *   · terreno e telhados — medidos pelo LiDAR (tinta e cinza);
 *   · criptopórtico e pórtico — esquema, sobre a altura publicada (terracota);
 *   · troço sem folha LiDAR — em branco, dito "sem medição".
 */

/** `ev`: exagero vertical. Só nas vistas largas, e a barra de escala di-lo. */
type Janela = { d0: number; d1: number; z0: number; z1: number; ev?: number }

const ORDEM: PassoId[] = PASSOS.map((p) => p.id)
const depoisDe = (a: PassoId, b: PassoId) => ORDEM.indexOf(a) >= ORDEM.indexOf(b)

/* ── Geometria do terreno (uma vez) ────────────────────────────────────── */

const perfil = CORTE.perfil
/**
 * Até onde o chão desce no desenho. Não é medida — é o fundo da estampa, e
 * fica bem abaixo do que qualquer vista mostra, para a hachura chegar sempre
 * à moldura.
 */
const BASE = -400

/** Troços contíguos com valor, como polígonos fechados até à base. */
function massas(valor: (i: number) => number | null): string {
  let d = ''
  let run: [number, number][] = []
  const fecha = () => {
    if (run.length > 1) {
      d += `M${run[0][0]} ${-BASE}` + run.map(([x, z]) => `L${x} ${-z}`).join('') + `L${run.at(-1)![0]} ${-BASE}Z`
    }
    run = []
  }
  perfil.forEach((p, i) => {
    const z = valor(i)
    if (z === null) fecha()
    else run.push([p.d, z])
  })
  fecha()
  return d
}

/** A mesma linha, só o traço de cima. */
function linhas(valor: (i: number) => number | null): string {
  let d = ''
  let novo = true
  perfil.forEach((p, i) => {
    const z = valor(i)
    if (z === null) {
      novo = true
      return
    }
    d += `${novo ? 'M' : 'L'}${p.d} ${-z}`
    novo = false
  })
  return d
}

/** Os edifícios acima do chão: superfície mais de 2,5 m acima do terreno. */
const supCidade = (i: number) => {
  const p = perfil[i]
  return p.sup !== null && !p.agua ? p.sup : null
}
const chao = (i: number) => perfil[i].chao

/** Onde está o rio no corte, e à cota de quê. */
const aguaIdx = perfil.map((p, i) => (p.agua ? i : -1)).filter((i) => i >= 0)
const RIO = aguaIdx.length
  ? {
      d0: perfil[aguaIdx[0]].d,
      d1: perfil[aguaIdx.at(-1)!].d,
      z: CORTE.cotas.rio ?? perfil[aguaIdx[0]].chao ?? 17,
    }
  : null

/** Troço sem chão medido. */
const semChaoIdx = perfil.map((p, i) => (p.chao === null ? i : -1)).filter((i) => i >= 0)
const BURACO = semChaoIdx.length ? { d0: perfil[semChaoIdx[0]].d, d1: perfil[semChaoIdx.at(-1)!].d } : null

/**
 * A cota da plataforma do fórum: o pátio do museu, medido pelo LiDAR de
 * superfície (chão a céu aberto). Quem escavou escreve que o pátio
 * corresponde, grosso modo, à antiga praça. Se a leitura faltar, os
 * esquemas romanos não se desenham — não há cota onde os pousar.
 */
const TEM_COTA = CORTE.cotas.plataforma !== null
const PLATAFORMA = CORTE.cotas.plataforma ?? 90
const PE = PLATAFORMA - FACHADA_POENTE_M
const LARGURA = CORTE.museu.nascente

/**
 * Para onde a câmara olha em cada passo. Em metros: d ao longo do corte, z
 * de cota. As vistas do museu medem-se a partir da plataforma, para o
 * criptopórtico ficar sempre enquadrado.
 */
const P = PLATAFORMA
const JANELAS: Record<PassoId, { largo: Janela; estreito: Janela }> = {
  hoje: { largo: { d0: -900, d1: 340, z0: 5, z1: 135, ev: 3 }, estreito: { d0: -520, d1: 250, z0: 5, z1: 135, ev: 3 } },
  chao: { largo: { d0: -900, d1: 340, z0: 5, z1: 135, ev: 3 }, estreito: { d0: -520, d1: 250, z0: 5, z1: 135, ev: 3 } },
  problema: { largo: { d0: -150, d1: 130, z0: P - 60, z1: P + 25 }, estreito: { d0: -110, d1: 110, z0: P - 70, z1: P + 25 } },
  criptoportico: { largo: { d0: -45, d1: 95, z0: P - 36, z1: P + 8 }, estreito: { d0: -62, d1: 78, z0: P - 36, z1: P + 8 } },
  forum: { largo: { d0: -170, d1: 95, z0: P - 45, z1: P + 30 }, estreito: { d0: -160, d1: 80, z0: P - 70, z1: P + 30 } },
  depois: { largo: { d0: -80, d1: 125, z0: P - 40, z1: P + 30 }, estreito: { d0: -60, d1: 110, z0: P - 45, z1: P + 40 } },
}

/* ── Componente ────────────────────────────────────────────────────────── */

/**
 * `planta` chega já desenhada do servidor: os contornos do OSM pesam mais do
 * que o corte todo e não precisam de JavaScript.
 */
export default function CorteAeminium({ planta }: { planta: ReactNode }) {
  const [passo, setPasso] = useState<PassoId>('hoje')
  const palco = useRef<HTMLDivElement>(null)
  const [tam, setTam] = useState({ w: 1000, h: 640 })
  const passosRef = useRef<(HTMLElement | null)[]>([])

  // O tamanho do palco, para a câmara caber nele.
  useEffect(() => {
    const el = palco.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setTam({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // O passo activo: o que atravessa a linha a 55% do ecrã.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setPasso((e.target as HTMLElement).dataset.passo as PassoId)
        }
      },
      { rootMargin: '-50% 0px -45% 0px' }
    )
    passosRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const estreito = tam.w < 640
  const j = JANELAS[passo][estreito ? 'estreito' : 'largo']
  // A escala que faz caber a janela toda; na vertical multiplicada pelo
  // exagero, que só as vistas largas têm.
  const ev = j.ev ?? 1
  const s = Math.min(tam.w / (j.d1 - j.d0), tam.h / ((j.z1 - j.z0) * ev))
  const sz = s * ev
  const cx = (j.d0 + j.d1) / 2
  const cz = (j.z0 + j.z1) / 2
  const tx = tam.w / 2 - cx * s
  const ty = tam.h / 2 + cz * sz
  /** Do mundo (d, z) para o ecrã do palco. */
  const ecra = (d: number, z: number) => ({ left: tx + d * s, top: ty - z * sz })
  /** A linha de vista do pórtico ao rio: a cota dela em d. */
  const vista = (d: number) => {
    if (!RIO) return PLATAFORMA
    const x0 = -1, z0 = PLATAFORMA + 11, x1 = (RIO.d0 + RIO.d1) / 2, z1 = RIO.z
    return z0 + ((d - x0) * (z1 - z0)) / (x1 - x0)
  }
  /** Por cima do ponto mais alto (telhado ou chão) entre d0 e d1, com folga em píxeis. */
  const sobre = (d0: number, d1: number, folga = 12) => {
    const z = Math.max(...perfil.filter((p) => p.d >= d0 && p.d <= d1).map((p) => Math.max(p.sup ?? -99, p.chao ?? -99)))
    const e = ecra((d0 + d1) / 2, z)
    return { left: e.left, top: e.top - folga }
  }

  const g = useMemo(
    () => ({
      cidade: massas(supCidade),
      cidadeLinha: linhas(supCidade),
      chao: massas(chao),
      chaoLinha: linhas(chao),
    }),
    []
  )

  const verCidade = passo === 'hoje' || passo === 'depois'
  const verCripto = TEM_COTA && depoisDe(passo, 'criptoportico')
  const verForum = TEM_COTA && passo === 'forum'
  const verPlano = TEM_COTA && passo === 'problema'

  const subida =
    CORTE.cotas.plataforma !== null && CORTE.cotas.baixa !== null
      ? `Da Baixa ao pátio do museu sobem-se ${Math.round(CORTE.cotas.plataforma - CORTE.cotas.baixa)} metros, quase todos nos últimos ${distanciaDaSubida()} metros de caminho.`
      : 'A subida da Baixa ao alto faz-se quase toda de uma vez, numa encosta curta e empinada.'

  return (
    <div className="corte">
      <div className="corte-palco-wrap">
        <div ref={palco} className={`corte-palco is-${passo}`} aria-hidden="true">
          <Regua ecra={ecra} sz={sz} />
          <svg width={tam.w} height={tam.h} className="corte-svg">
            <defs>
              <pattern id="hachura" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="3" stroke="var(--text-primary)" strokeWidth="0.35" strokeOpacity="0.55" />
              </pattern>
              <pattern id="hachura-cripto" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                <line x1="0" y1="0" x2="0" y2="2.2" stroke="var(--accent)" strokeWidth="0.3" strokeOpacity="0.5" />
              </pattern>
              <filter id="brilho" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            <g
              className="corte-camara"
              style={{ transform: `translate(${tx}px, ${ty}px) scale(${s}, ${sz})` }}
            >
              {/* A cidade de hoje: telhados e copas, a cinzento */}
              <g className="corte-fase" style={{ opacity: verCidade ? 1 : 0 }}>
                <path d={g.cidade} fill="var(--bg-sunken)" />
                <path d={g.cidadeLinha} fill="none" stroke="var(--text-tertiary)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              </g>

              {/* O chão, hachurado como um corte de engenharia */}
              <path d={g.chao} fill="var(--bg-primary)" />
              <path d={g.chao} fill="url(#hachura)" />
              <path d={g.chaoLinha} fill="none" stroke="var(--text-primary)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />

              {/* Rio: a superfície medida e um véu de água por baixo */}
              {RIO && (
                <g className="corte-rio">
                  <rect x={RIO.d0} y={-RIO.z} width={RIO.d1 - RIO.d0} height={RIO.z + 5} fill="var(--tone-blue)" fillOpacity="0.14" />
                  <line x1={RIO.d0} x2={RIO.d1} y1={-RIO.z} y2={-RIO.z} stroke="var(--tone-blue)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
                </g>
              )}

              {/* Sem folha LiDAR: um branco tracejado, não um chão inventado */}
              {BURACO && (
                <rect
                  x={BURACO.d0}
                  y={-(PLATAFORMA + 6)}
                  width={BURACO.d1 - BURACO.d0}
                  height={PLATAFORMA + 6 - BASE}
                  fill="none"
                  stroke="var(--text-tertiary)"
                  strokeDasharray="3 4"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              )}

              {/* O problema: o plano que o fórum pedia, desenhado da encosta para dentro */}
              <g className={`corte-estado${verPlano ? ' is-visivel' : ''}`}>
                <rect
                  x={-60}
                  y={-PLATAFORMA}
                  width={LARGURA + 100}
                  height={FACHADA_POENTE_M}
                  fill="var(--accent)"
                  fillOpacity="0.07"
                  className="desenha-y"
                />
                <line
                  x1={-60}
                  x2={LARGURA + 40}
                  y1={-PLATAFORMA}
                  y2={-PLATAFORMA}
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="7 5"
                  vectorEffect="non-scaling-stroke"
                  className="desenha-x"
                />
              </g>

              {/* O criptopórtico: esquema sobre a altura publicada */}
              <g className={`corte-cripto${verCripto ? ' is-visivel' : ''}${passo === 'depois' ? ' is-depois' : ''}`}>
                <Criptoportico />
              </g>

              {/* O pórtico do fórum e o que dali se via */}
              <g className={`corte-estado${verForum ? ' is-visivel' : ''}`}>
                <Portico />
                {RIO && (
                  <line
                    x1={-1}
                    y1={-(PLATAFORMA + 11)}
                    x2={(RIO.d0 + RIO.d1) / 2}
                    y2={-RIO.z}
                    stroke="var(--accent)"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                    vectorEffect="non-scaling-stroke"
                    className="desenha-vista"
                  />
                )}
              </g>
            </g>
          </svg>

          {/* Legendas no espaço do ecrã: não crescem com o zoom */}
          <div className="corte-legendas">
            {RIO && (
              <Legenda at={sobre(RIO.d0, RIO.d1)} visivel={passo !== 'criptoportico'} centro>
                Mondego
              </Legenda>
            )}
            <Legenda at={sobre(-420, -300)} visivel={depoisDe('problema', passo)} centro>
              Baixa
            </Legenda>
            <Legenda at={sobre(0, LARGURA, 16)} visivel={passo === 'hoje' || passo === 'depois'} centro destaque>
              Museu Nacional
              <br />
              Machado de Castro
            </Legenda>
            <Legenda at={ecra(LARGURA + 40, PLATAFORMA + 2)} visivel={verPlano} direita>
              a praça pedia um chão plano
            </Legenda>
            <Legenda at={ecra(-4, PE + FACHADA_POENTE_M * 0.62)} visivel={passo === 'criptoportico'} direita>
              <span className="corte-cota">≈ {FACHADA_POENTE_M} m</span>
              <br />
              fachada poente
            </Legenda>
            <Legenda at={ecra(LARGURA * 0.35, PE)} visivel={passo === 'criptoportico'} centro abaixo>
              dois pisos de galerias
            </Legenda>
            <Legenda at={ecra(LARGURA * 0.62, PLATAFORMA + 3)} visivel={verForum} centro destaque>
              a praça do fórum
            </Legenda>
            {RIO && (
              <Legenda at={ecra(j.d0 + (j.d1 - j.d0) * 0.04, vista(j.d0 + (j.d1 - j.d0) * 0.04))} visivel={verForum}>
                ← para o Mondego
              </Legenda>
            )}
            <Legenda at={ecra(LARGURA * 0.35, PE)} visivel={passo === 'depois'} centro destaque abaixo>
              ainda lá está
            </Legenda>
            {BURACO && (
              <Legenda at={ecra((BURACO.d0 + BURACO.d1) / 2, (PLATAFORMA + 6 + BASE) / 2)} visivel={passo === 'chao'} centro>
                chão sem medição
              </Legenda>
            )}
          </div>

          <Regua ecra={ecra} sz={sz} numeros />

          {/* Cartela: o que é a estampa e a que época o desenho se refere */}
          <div className="corte-cartela">
            <span className="corte-cartela-titulo">Corte A–A′ · poente → nascente</span>
            <span className="corte-epocas">
              {PASSOS.map((p) => (
                <span key={p.id} className={`corte-epoca${p.id === passo ? ' is-activa' : ''}`}>
                  {p.epoca}
                </span>
              ))}
            </span>
          </div>
          <span className="corte-marca" style={{ transform: `translate(${ecra(perfil[0].d, 0).left}px, ${ecra(0, perfil[0].sup ?? 20).top}px) translateX(14px)` }}>
            A
          </span>
          <span className="corte-marca" style={{ transform: `translate(${ecra(perfil.at(-1)!.d, 0).left}px, ${ecra(0, perfil.at(-1)!.sup ?? 100).top}px) translateX(calc(-100% - 14px))` }}>
            A′
          </span>

          {/* A planta com a linha do corte, só enquanto a vista é larga */}
          <div className="corte-planta" style={{ opacity: passo === 'hoje' ? 1 : 0 }}>
            {planta}
          </div>

          <div className="corte-escala">
            <EscalaGrafica s={s} ev={ev} />
          </div>
        </div>
      </div>

      <ol className="corte-passos">
        {PASSOS.map((p, i) => (
          <li
            key={p.id}
            data-passo={p.id}
            ref={(el) => {
              passosRef.current[i] = el
            }}
            className={`corte-passo${p.id === passo ? ' is-activo' : ''}`}
          >
            <div className="corte-passo-cartao">
              <span className="corte-passo-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display corte-passo-titulo">{p.titulo}</h3>
              {p.texto.map((t, k) => (
                <p key={k}>{t === '{subida}' ? subida : t}</p>
              ))}
              <div className="corte-passo-selos">
                {p.selos.map((sl, k) => (
                  <Selo key={k} evidencia={sl.evidencia} refId={sl.ref} />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Metros horizontais entre o sopé da colina e a fachada poente. */
function distanciaDaSubida(): number {
  const baixa = CORTE.cotas.baixa ?? 20
  const sope = perfil.find((p) => p.d > -400 && p.chao !== null && p.chao > baixa + 3)
  return sope ? Math.round(-sope.d / 10) * 10 : 0
}

/* ── Esquemas (terracota) ──────────────────────────────────────────────── */

/**
 * O criptopórtico em corte, como esquema.
 *
 * O que é publicado: dois pisos de galerias abobadadas; as celas de baixo
 * mais altas que as de cima; a fachada poente com cerca de 29 m. O resto —
 * onde acaba cada piso para nascente, a espessura das paredes — é desenho,
 * e o selo diz "Esquema".
 */
function Criptoportico() {
  const H = FACHADA_POENTE_M
  const inf = H * 0.55 // piso de baixo: mais alto
  const sup = H * 0.45
  const W = LARGURA
  const wInf = W * 0.55 // o piso de baixo encosta mais cedo à colina
  const wSup = W * 0.85
  const parede = 1.6

  // Abóbadas: n vãos em cada piso, arcos de volta perfeita. Cada vão é um
  // caminho próprio, para se poder erguer um a um.
  const vaos = (x0: number, x1: number, zBase: number, alt: number, n: number) => {
    const w = (x1 - x0) / n
    return Array.from({ length: n }, (_, k) => {
      const a = x0 + k * w + parede / 2
      const b = a + w - parede
      const r = (b - a) / 2
      const zArr = zBase + parede + Math.max(0, alt - parede * 2 - r)
      return `M${a} ${-(zBase + parede)}L${a} ${-zArr}A${r} ${r} 0 0 1 ${b} ${-zArr}L${b} ${-(zBase + parede)}Z`
    })
  }

  const contorno =
    `M0 ${-PE}L${wInf} ${-PE}L${wInf} ${-(PE + inf)}L${wSup} ${-(PE + inf)}L${wSup} ${-PLATAFORMA}` +
    `L0 ${-PLATAFORMA}Z`
  const baixo = vaos(0, wInf, PE, inf, 3)
  const cima = vaos(0, wSup, PE + inf, sup, 5)

  // A ordem de obra: o piso de baixo, depois o de cima, por fim a plataforma.
  return (
    <g>
      {/* Brilho: só no último passo, quando o fórum já não está e isto fica */}
      <rect className="cr-brilho" x={-6} y={-(PLATAFORMA + 4)} width={wSup + 12} height={H + 10} fill="var(--accent)" filter="url(#brilho)" />
      <path className="cr-massa" d={contorno} fill="var(--bg-raised)" />
      <path className="cr-massa" d={contorno} fill="url(#hachura-cripto)" />
      {baixo.map((d, k) => (
        <path key={`b${k}`} className="cr-vao" d={d} fill="var(--accent)" fillOpacity="0.92" style={{ transitionDelay: `${0.25 + k * 0.12}s` }} />
      ))}
      {cima.map((d, k) => (
        <path key={`c${k}`} className="cr-vao" d={d} fill="var(--accent)" fillOpacity="0.7" style={{ transitionDelay: `${0.7 + k * 0.1}s` }} />
      ))}
      <path className="cr-massa" d={contorno} fill="none" stroke="var(--accent)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <line className="cr-plano" x1={-2} x2={W + 30} y1={-PLATAFORMA} y2={-PLATAFORMA} stroke="var(--accent)" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
      {/* Frestas na fachada poente */}
      {[0.2, 0.45, 0.72].map((f) => (
        <line key={f} className="cr-massa" x1={0} x2={0} y1={-(PE + H * f)} y2={-(PE + H * f + 1.6)} stroke="var(--bg-primary)" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

/** O pórtico de dois pisos, em arcadas para poente — esquema. */
function Portico() {
  const alt = 11
  const fundo = 7
  const arco = (x: number, z: number, h: number) =>
    `M${x} ${-z}L${x} ${-(z + h - fundo / 2)}A${fundo / 2 - 0.6} ${fundo / 2 - 0.6} 0 0 1 ${x + fundo - 1.2} ${-(z + h - fundo / 2)}L${x + fundo - 1.2} ${-z}Z`
  return (
    <g className="po-ergue">
      <rect x={0} y={-(PLATAFORMA + alt)} width={fundo} height={alt} fill="var(--bg-raised)" stroke="var(--accent)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <path d={arco(0.6, PLATAFORMA + 0.4, alt / 2)} fill="var(--accent)" fillOpacity="0.25" />
      <path d={arco(0.6, PLATAFORMA + alt / 2 + 0.2, alt / 2 - 0.4)} fill="var(--accent)" fillOpacity="0.25" />
      <line x1={0} x2={fundo} y1={-(PLATAFORMA + alt / 2)} y2={-(PLATAFORMA + alt / 2)} stroke="var(--accent)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* A praça: o plano, vazio, com gente à escala */}
      {[18, 30, 44].map((x) => (
        <g key={x} transform={`translate(${x} ${-PLATAFORMA})`}>
          <circle cx={0} cy={-1.55} r={0.28} fill="var(--text-primary)" />
          <line x1={0} x2={0} y1={-1.25} y2={0} stroke="var(--text-primary)" strokeWidth="0.35" />
        </g>
      ))}
    </g>
  )
}

/* ── Peças de ecrã ─────────────────────────────────────────────────────── */

function Legenda({
  at,
  visivel,
  children,
  centro,
  direita,
  destaque,
  abaixo,
}: {
  at: { left: number; top: number }
  visivel: boolean
  children: React.ReactNode
  centro?: boolean
  direita?: boolean
  destaque?: boolean
  /** Pendurada por baixo do ponto, em vez de pousada em cima. */
  abaixo?: boolean
}) {
  return (
    <span
      className={`corte-legenda${destaque ? ' is-destaque' : ''}`}
      style={{
        transform: `translate(${at.left}px, ${at.top}px) translate(${centro ? '-50%' : direita ? '-100%' : '0'}, ${abaixo ? '8px' : '-100%'})`,
        opacity: visivel ? 1 : 0,
        textAlign: centro ? 'center' : direita ? 'right' : 'left',
      }}
    >
      {children}
    </span>
  )
}

/**
 * Régua de cotas na margem direita, com guias ténues a atravessar a estampa.
 * As cotas são altitudes reais (metros acima do nível médio do mar, as do
 * LiDAR), e a régua anda com a câmara.
 */
function Regua({
  ecra,
  sz,
  numeros,
}: {
  ecra: (d: number, z: number) => { left: number; top: number }
  /** Píxeis por metro na vertical: decide o passo da régua. */
  sz: number
  /** As guias vão por trás do desenho; os números, por cima dele. */
  numeros?: boolean
}) {
  // O passo redondo mais pequeno que deixa ~48 px entre marcas.
  const passo = [5, 10, 20, 25, 50].find((p) => p * sz >= 48) ?? 50
  const cotas = Array.from({ length: Math.floor(200 / passo) + 1 }, (_, i) => i * passo)
  return (
    <div className={`corte-regua${numeros ? ' is-numeros' : ''}`}>
      {cotas.map((z) => (
        <span key={z} className="corte-regua-linha" style={{ transform: `translateY(${ecra(0, z).top}px)` }}>
          {/* Sem número na faixa de cima, que é da cartela */}
          {numeros && ecra(0, z).top > 96 && <span className="corte-regua-cota">{z} m</span>}
        </span>
      ))}
    </div>
  )
}

/** Barra de escala: o maior número redondo de metros que cabe em ~120 px. */
function EscalaGrafica({ s, ev }: { s: number; ev: number }) {
  const alvo = 120 / s
  const m = [10, 20, 25, 50, 100, 200, 250, 500].reduce((a, b) => (b <= alvo ? b : a), 10)
  return (
    <div className="corte-escala-barra">
      <span style={{ width: m * s }} />
      <span className="ui-mono">
        {m} m · {ev === 1 ? 'sem exagero vertical' : `altura exagerada ${ev}×`}
      </span>
    </div>
  )
}
