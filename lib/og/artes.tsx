/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text -- o satori desenha <img>; não há next/image num cartão. */
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { MAP_VIEW, MUNICIPALITY_OUTLINE, PARISH_SHAPES } from '@/lib/parish-map'
import { GREEN_SPACES, LANDMARKS, RELIEF, ROADS, WATER } from '@/lib/green-spaces'
import { SHAPED_PARISH_ROWS } from '@/lib/parish-metrics'
import { PLANTA } from '@/lib/historia-aeminium-planta'
import { EVENTS } from '@/lib/festas'
import { FAMILIAS, type Familia } from '@/lib/trilhos'
import { ALTURA, ARTE_LARGURA, COR, imagemPublica, svgUrl } from '@/lib/og/cartao'

/**
 * As ilustrações dos cartões sociais, uma por página. Cada uma sai dos
 * mesmos dados que a página mostra — as formas das freguesias, as zonas
 * verdes, o traçado dos trilhos, as maquetas — para que a pré-visualização
 * seja já um pedaço do que se vai encontrar.
 *
 * Texto dentro de SVG não se desenha (o renderizador não tem fontes de
 * sistema), por isso todas as legendas são caixas do satori.
 */

const PAPEL_ESCURO = 'rgba(20,23,28,0.35)'

// ---------------------------------------------------------- o concelho

/** O concelho inteiro, freguesia a freguesia, com o Mondego a atravessá-lo. */
function svgConcelho(preencher: (code: string) => string, traco: string): string {
  const freguesias = PARISH_SHAPES.map(
    (p) => `<path d="${p.d}" fill="${preencher(p.code)}" stroke="${traco}" stroke-width="1.6" stroke-linejoin="round"/>`,
  ).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}">
    ${freguesias}
    <path d="${WATER.lines}" fill="none" stroke="${COR.agua}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${WATER.areas}" fill="${COR.agua}"/>
    <path d="${MUNICIPALITY_OUTLINE}" fill="none" stroke="${COR.tinta}" stroke-width="3.5" stroke-linejoin="round"/>
  </svg>`
}

/** Altura do mapa do concelho no cartão; a largura segue a proporção da carta. */
const MAPA_ALTURA = 590
const MAPA_LARGURA = Math.round((MAPA_ALTURA * MAP_VIEW.width) / MAP_VIEW.height)

function noMapa(x: number, y: number) {
  return { left: (x / MAP_VIEW.width) * MAPA_LARGURA, top: (y / MAP_VIEW.height) * MAPA_ALTURA }
}

/** Primeira página: as dezoito freguesias e um ponto na Portagem. */
export function arteInicio() {
  const portagem = LANDMARKS.find((l) => l.id === 'portagem')!
  const p = noMapa(portagem.x, portagem.y)
  const esquerda = (ARTE_LARGURA - MAPA_LARGURA) / 2
  const topo = (ALTURA - MAPA_ALTURA) / 2
  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={svgUrl(svgConcelho(() => COR.painel, PAPEL_ESCURO))}
        width={MAPA_LARGURA}
        height={MAPA_ALTURA}
        style={{ position: 'absolute', left: esquerda, top: topo }}
      />
      <div
        style={{
          position: 'absolute',
          left: esquerda + p.left - 22,
          top: topo + p.top - 22,
          width: 44,
          height: 44,
          borderRadius: 22,
          border: `3px solid ${COR.acento}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 7, background: COR.acento }} />
      </div>
    </div>
  )
}

/** Cinco classes de densidade, do areal à terracota. */
const RAMPA = ['#EFE2D0', '#E2BF9C', '#CF946A', '#B3602F', '#7E2A07']

/** Território: as freguesias pintadas pela densidade, em quintis. */
export function arteTerritorio() {
  const ordenadas = [...SHAPED_PARISH_ROWS].sort((a, b) => a.density - b.density)
  const classe = new Map(
    ordenadas.map((r, i) => [r.code, RAMPA[Math.min(RAMPA.length - 1, Math.floor((i / ordenadas.length) * RAMPA.length))]]),
  )
  const esquerda = (ARTE_LARGURA - MAPA_LARGURA) / 2 - 50
  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={svgUrl(svgConcelho((code) => classe.get(code) ?? COR.painel, 'rgba(242,238,230,0.9)'))}
        width={MAPA_LARGURA}
        height={MAPA_ALTURA}
        style={{ position: 'absolute', left: esquerda, top: (ALTURA - MAPA_ALTURA) / 2 }}
      />
      <div
        style={{
          position: 'absolute',
          right: 24,
          top: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          fontFamily: 'Mono',
          fontSize: 15,
          letterSpacing: 2,
          color: COR.terciario,
        }}
      >
        <span>HAB./KM²</span>
        <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 4 }}>
          {RAMPA.map((c) => (
            <div key={c} style={{ width: 34, height: 22, background: c }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ------------------------------------------------------------ a cidade

const COR_VERDE: Record<string, { fill: string; edge: string }> = {
  reserva: { fill: '#1F6B5C', edge: '#1F6B5C' },
  mata: { fill: '#2F5530', edge: '#2F5530' },
  parque: { fill: '#558838', edge: '#558838' },
  jardim: { fill: '#A8BC66', edge: '#5B7F1F' },
}

/** Zonas verdes: a cidade num círculo, sobre o relevo, com cada mancha verde. */
export async function arteZonasVerdes() {
  const lado = 580
  const { x, y, w, h } = RELIEF.cidade
  const relevo = await imagemPublica(RELIEF.cidade.href, lado, lado, { fundo: COR.papel })
  const verdes = GREEN_SPACES.map(
    (s) => `<path d="${s.d}" fill="${COR_VERDE[s.kind].fill}" stroke="${COR_VERDE[s.kind].edge}" stroke-width="0.35"/>`,
  ).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}">
    <path d="${ROADS.minor}" fill="none" stroke="rgba(20,23,28,0.16)" stroke-width="0.35"/>
    <path d="${ROADS.secondary}" fill="none" stroke="rgba(20,23,28,0.3)" stroke-width="0.6"/>
    <path d="${ROADS.major}" fill="none" stroke="rgba(20,23,28,0.4)" stroke-width="0.9"/>
    <path d="${WATER.lines}" fill="none" stroke="${COR.agua}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="${WATER.areas}" fill="${COR.agua}"/>
    ${verdes}
  </svg>`
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: lado,
          height: lado,
          borderRadius: lado / 2,
          overflow: 'hidden',
          border: `3px solid ${COR.tinta}`,
        }}
      >
        <img src={relevo} width={lado} height={lado} style={{ position: 'absolute', left: 0, top: 0, opacity: 0.8 }} />
        <img src={svgUrl(svg)} width={lado} height={lado} style={{ position: 'absolute', left: 0, top: 0 }} />
      </div>
    </div>
  )
}

// ------------------------------------------------------------ a região

type Posicao = [number, number]
interface Geo {
  features: { properties: { tipo: string }; geometry: { type: string; coordinates: unknown } }[]
}

/** Trilhos: a Região de Coimbra com os concelhos e os percursos por cima. */
export async function arteTrilhos() {
  const ler = async (f: string) => JSON.parse(await readFile(join(process.cwd(), 'public/data', f), 'utf8')) as Geo
  const [regiao, trilhos] = await Promise.all([ler('trilhos-regiao.geojson'), ler('trilhos.geojson')])

  const contorno = regiao.features.find((f) => f.properties.tipo === 'regiao')!.geometry.coordinates as Posicao[][][]
  const limites = regiao.features.find((f) => f.properties.tipo === 'limites')?.geometry.coordinates as Posicao[][] | undefined

  // Equirectangular com o coseno da latitude média: a esta escala não se nota outra projecção.
  const pontos = contorno.flat(2)
  const [lon0, lon1] = [Math.min(...pontos.map((p) => p[0])), Math.max(...pontos.map((p) => p[0]))]
  const [lat0, lat1] = [Math.min(...pontos.map((p) => p[1])), Math.max(...pontos.map((p) => p[1]))]
  const k = Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180)
  const largura = 600
  const escala = largura / ((lon1 - lon0) * k)
  const altura = Math.round((lat1 - lat0) * escala)
  const px = ([lon, lat]: Posicao) => `${(((lon - lon0) * k) * escala).toFixed(1)},${((lat1 - lat) * escala).toFixed(1)}`
  const linha = (l: Posicao[]) => `M${l.map(px).join('L')}`

  const regiaoD = contorno.map((pol) => pol.map((anel) => `${linha(anel)}Z`).join('')).join('')
  const limitesD = (limites ?? []).map(linha).join('')
  const ordem: Familia[] = ['outro', 'PR', 'GR']
  const tracos = ordem
    .map((fam) => {
      const d = trilhos.features
        .filter((f) => f.properties.tipo === fam)
        .flatMap((f) => (f.geometry.type === 'LineString' ? [f.geometry.coordinates as Posicao[]] : (f.geometry.coordinates as Posicao[][])))
        .map(linha)
        .join('')
      return `<path d="${d}" fill="none" stroke="${FAMILIAS[fam].linha}" stroke-width="${fam === 'GR' ? 3.2 : 2.6}" stroke-linecap="round" stroke-linejoin="round"/>`
    })
    .join('')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 ${largura + 8} ${altura + 8}">
    <path d="${regiaoD}" fill="${COR.painel}" stroke="${COR.tinta}" stroke-width="2.4" stroke-linejoin="round" fill-rule="evenodd"/>
    <path d="${limitesD}" fill="none" stroke="rgba(20,23,28,0.22)" stroke-width="1"/>
    ${tracos}
  </svg>`
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingRight: 24 }}>
      <img src={svgUrl(svg)} width={largura + 8} height={altura + 8} />
    </div>
  )
}

// ------------------------------------------------------------ a história

/** História: a planta da cidade à volta do fórum, com o criptopórtico a cheio. */
export function arteHistoria() {
  // Recorte à volta do museu: a planta toda é uma faixa larga e baixa demais para o cartão.
  const vb = { x: -330, y: -200, w: 660, h: 400 }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}">
    <path d="${PLANTA.agua}" fill="${COR.aguaClara}"/>
    <path d="${PLANTA.edificios}" fill="${COR.recuado}" stroke="rgba(20,23,28,0.45)" stroke-width="0.8" stroke-linejoin="round"/>
    <path d="${PLANTA.museu}" fill="${COR.acento}" stroke="${COR.acentoEscuro}" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`
  // No mesmo círculo das zonas verdes: um recorte quadrado deixava arestas secas contra o papel.
  const lado = 580
  const largura = Math.round((lado * vb.w) / vb.h)
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: lado,
          height: lado,
          borderRadius: lado / 2,
          overflow: 'hidden',
          border: `3px solid ${COR.tinta}`,
          background: COR.papel,
        }}
      >
        <img src={svgUrl(svg)} width={largura} height={lado} style={{ position: 'absolute', left: (lado - largura) / 2, top: 0 }} />
      </div>
    </div>
  )
}

// ------------------------------------------------------------ fotografias

/** Uma imagem de `public/` a ocupar a caixa da ilustração inteira. */
export async function arteImagem(
  caminho: string,
  opcoes: { posicao?: string; recorte?: { left: number; top: number; width: number; height: number }; fundo?: string } = {},
) {
  const src = opcoes.recorte
    ? await recortar(caminho, opcoes.recorte)
    : await imagemPublica(caminho, ARTE_LARGURA, ALTURA, { posicao: opcoes.posicao, fundo: opcoes.fundo })
  return <img src={src} width={ARTE_LARGURA} height={ALTURA} />
}

async function recortar(caminho: string, r: { left: number; top: number; width: number; height: number }) {
  const sharp = (await import('sharp')).default
  const png = await sharp(await readFile(join(process.cwd(), 'public', caminho)))
    .extract(r)
    .resize(ARTE_LARGURA, ALTURA, { fit: 'cover' })
    .png()
    .toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

/** Uma maqueta, recortada sem fundo, a sair pela margem direita do cartão. */
export async function arteMaqueta(caminho: string, largura: number, altura: number, topo: number) {
  const src = await imagemPublica(caminho, largura, altura, { ajuste: 'inside' })
  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%' }}>
      <img src={src} width={largura} height={altura} style={{ position: 'absolute', left: -10, top: topo }} />
    </div>
  )
}

/**
 * Zonas urbanas: as maquetas de conjunto, aparadas e empilhadas. São
 * lajes largas e baixas; uma por cima da outra enchem a caixa sem se
 * cortar nenhuma.
 */
export async function arteMaquetas(caminhos: string[]) {
  const largura = ARTE_LARGURA - 40
  const altura = Math.floor((ALTURA - 60) / caminhos.length)
  const imagens = await Promise.all(
    caminhos.map((c) => imagemPublica(c, largura, altura, { ajuste: 'inside', aparar: true })),
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingRight: 20,
      }}
    >
      {imagens.map((src) => (
        <div key={src.slice(-40)} style={{ display: 'flex', width: largura, height: altura, alignItems: 'center', justifyContent: 'center' }}>
          <img src={src} style={{ maxWidth: largura, maxHeight: altura, objectFit: 'contain' }} width={largura} height={altura} />
        </div>
      ))}
    </div>
  )
}

// ------------------------------------------------------------ a agenda

const MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

/** Agenda: o ano em doze casas, com as festas que voltam todos os anos no seu mês. */
export function arteAgenda() {
  const porMes = new Map<number, string[]>()
  for (const e of EVENTS) porMes.set(e.month, [...(porMes.get(e.month) ?? []), e.name])
  const casa = 132
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: casa * 4 + 3 * 10, gap: 10 }}>
        {MESES.map((m, i) => {
          const festas = porMes.get(i + 1)
          return (
            <div
              key={m}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: casa,
                height: 158,
                padding: '12px 12px',
                background: festas ? COR.acento : COR.painel,
                border: festas ? 'none' : '1px solid rgba(20,23,28,0.14)',
                color: festas ? COR.papel : COR.terciario,
              }}
            >
              <span style={{ fontFamily: 'Mono', fontSize: 17, letterSpacing: 3 }}>{m}</span>
              {festas && (
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 10, gap: 6 }}>
                  {festas.map((f) => (
                    <span key={f} style={{ fontSize: 14, lineHeight: 1.15 }}>
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ------------------------------------------------------------ o turismo

/** Uma noite como um círculo; meia noite como meio círculo. */
function noites(n: number, cor: string) {
  const inteiras = Math.floor(n)
  const meia = n - inteiras >= 0.5
  const r = 34
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {Array.from({ length: inteiras }, (_, i) => (
        <div key={i} style={{ width: r * 2, height: r * 2, borderRadius: r, background: cor }} />
      ))}
      {meia && (
        <div style={{ display: 'flex', width: r * 2, height: r * 2, borderRadius: r, border: `3px solid ${cor}`, overflow: 'hidden' }}>
          <div style={{ width: r - 3, height: r * 2, background: cor }} />
        </div>
      )}
    </div>
  )
}

/** Turismo: a estada média em Coimbra ao lado da do país, noite a noite. */
export function arteTurismo(estada: { coimbra: number; portugal: number }, ano: number) {
  const fmt = (v: number) => v.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
  const linha = (nome: string, valor: number, cor: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontFamily: 'Fraunces', fontWeight: 700, fontSize: 34, color: COR.tinta }}>{nome}</span>
        <span style={{ fontFamily: 'Mono', fontSize: 20, color: cor }}>{fmt(valor)} noites</span>
      </div>
      {noites(valor, cor)}
    </div>
  )
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 44,
        width: '100%',
        height: '100%',
        paddingLeft: 60,
      }}
    >
      {linha('Coimbra', estada.coimbra, COR.acento)}
      {linha('Portugal', estada.portugal, COR.agua)}
      <span style={{ fontFamily: 'Mono', fontSize: 15, letterSpacing: 2, color: COR.terciario }}>
        ESTADA MÉDIA · {ano}
      </span>
    </div>
  )
}
