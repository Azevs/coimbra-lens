import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ReactNode } from 'react'
import { ImageResponse } from 'next/og'
import sharp from 'sharp'

/**
 * O cartão que aparece quando se partilha uma página — WhatsApp, Facebook,
 * LinkedIn, X, Slack. Todas as páginas usam este molde: à esquerda o
 * rótulo, o título e uma frase, com a tipografia do site; à direita uma
 * ilustração própria da página, desenhada a partir dos dados dela.
 *
 * Sai em JPEG e não em PNG: as maquetas e o relevo davam PNG de quase 1 MB,
 * e o WhatsApp deixa de mostrar a pré-visualização acima de uns 300 kB.
 */

export const LARGURA = 1200
export const ALTURA = 630
/** Onde começa a ilustração; o texto vive antes disto. */
export const ARTE_X = 560
export const ARTE_LARGURA = LARGURA - ARTE_X

export const COR = {
  papel: '#F2EEE6',
  painel: '#EDE8DE',
  recuado: '#E5DFD2',
  tinta: '#14171C',
  texto: '#3E444C',
  terciario: '#575D65',
  acento: '#B03A0B',
  acentoTexto: '#8A3008',
  acentoEscuro: '#7E2A07',
  agua: '#2F5A74',
  aguaClara: '#A9C3D3',
} as const

// ---------------------------------------------------------------- fontes

type Fonte = { name: string; data: ArrayBuffer; weight: 400 | 500 | 700; style: 'normal' | 'italic' }

const PEDIDOS: { name: string; familia: string; weight: Fonte['weight']; style: Fonte['style'] }[] = [
  { name: 'Fraunces', familia: 'Fraunces:ital,opsz,wght@0,144,700', weight: 700, style: 'normal' },
  { name: 'Fraunces', familia: 'Fraunces:ital,opsz,wght@1,144,400', weight: 400, style: 'italic' },
  { name: 'Plex', familia: 'IBM+Plex+Sans:wght@400', weight: 400, style: 'normal' },
  { name: 'Mono', familia: 'JetBrains+Mono:wght@500', weight: 500, style: 'normal' },
]

let fontes: Promise<Fonte[]> | null = null

/**
 * As fontes do site, pedidas ao Google Fonts uma vez por processo. Sem
 * agente de browser, a API devolve TrueType, que é o que o satori lê.
 * Se a rede falhar, o cartão sai na letra por omissão — pior, mas sai.
 */
function carregarFontes(): Promise<Fonte[]> {
  fontes ??= Promise.all(
    PEDIDOS.map(async ({ name, familia, weight, style }) => {
      try {
        const css = await fetch(`https://fonts.googleapis.com/css2?family=${familia}`).then((r) => r.text())
        const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1]
        if (!url) return null
        const data = await fetch(url).then((r) => r.arrayBuffer())
        return { name, data, weight, style }
      } catch {
        return null
      }
    }),
  ).then((lista) => lista.filter((f): f is Fonte => f !== null))
  return fontes
}

// --------------------------------------------------------------- imagens

/** SVG pronto a pôr num `<img>`. */
export function svgUrl(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Uma imagem de `public/`, reduzida ao tamanho em que vai aparecer. O
 * satori não lê WebP, por isso tudo passa a PNG aqui.
 */
export async function imagemPublica(
  caminho: string,
  largura: number,
  altura: number,
  opcoes: { ajuste?: 'cover' | 'contain' | 'inside'; posicao?: string; fundo?: string; aparar?: boolean } = {},
): Promise<string> {
  const origem = await readFile(join(process.cwd(), 'public', caminho))
  // Aparar tira a margem transparente à volta de uma maqueta, para ela ocupar o espaço todo.
  const base = opcoes.aparar ? await sharp(origem).trim().toBuffer() : origem
  let img = sharp(base).resize({
    width: largura,
    height: altura,
    fit: opcoes.ajuste ?? 'cover',
    position: opcoes.posicao ?? 'centre',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  if (opcoes.fundo) img = img.flatten({ background: opcoes.fundo })
  const png = await img.png().toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

// ----------------------------------------------------------------- molde

export interface Cartao {
  /** Rótulo em maiúsculas por cima do título — o nome da secção. */
  rotulo: string
  /** Título em Fraunces. */
  titulo: string
  /** Segunda linha do título, em itálico e na cor do acento, como nas aberturas do site. */
  italico?: string
  /** Uma frase. Mais de três linhas é demais para um cartão. */
  texto: string
  /** A ilustração, já posicionada dentro de uma caixa de ARTE_LARGURA × ALTURA. */
  arte: ReactNode
  /** Fundo escuro, para quando a ilustração é noite (o filme). */
  escuro?: boolean
}

export async function cartao({ rotulo, titulo, italico, texto, arte, escuro }: Cartao): Promise<Response> {
  const lista = await carregarFontes()
  const tinta = escuro ? '#F4EFE6' : COR.tinta
  const secundario = escuro ? '#D6CDBE' : COR.texto
  const acento = escuro ? '#EE8A5A' : COR.acento
  const tamanhoTitulo = titulo.length + (italico?.length ?? 0) > 26 ? 64 : 76

  const png = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: escuro ? '#1A1826' : COR.papel,
          fontFamily: 'Plex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: ARTE_X,
            top: 0,
            width: ARTE_LARGURA,
            height: ALTURA,
            display: 'flex',
          }}
        >
          {arte}
        </div>

        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: ARTE_X,
            height: ALTURA,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 36px 52px 64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Fraunces', fontSize: 30 }}>
            <span style={{ fontWeight: 700, color: tinta, letterSpacing: -0.5 }}>Coimbra</span>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: acento }}>Lens</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontFamily: 'Mono',
                fontSize: 17,
                fontWeight: 500,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: escuro ? '#EE8A5A' : COR.acentoTexto,
                marginBottom: 14,
              }}
            >
              {rotulo}
            </div>
            <div style={{ height: 3, background: tinta, marginBottom: 22 }} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Fraunces',
                fontSize: tamanhoTitulo,
                lineHeight: 1.02,
                letterSpacing: -0.5,
                color: tinta,
              }}
            >
              <span style={{ fontWeight: 700 }}>{titulo}</span>
              {italico && <span style={{ fontStyle: 'italic', fontWeight: 400, color: acento }}>{italico}</span>}
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 25,
                lineHeight: 1.38,
                color: secundario,
                marginTop: 24,
              }}
            >
              {texto}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: LARGURA, height: ALTURA, fonts: lista.length ? lista : undefined },
  )

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer()
  return new Response(new Uint8Array(jpeg), {
    headers: { 'Content-Type': 'image/jpeg' },
  })
}
