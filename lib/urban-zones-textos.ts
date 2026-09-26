/**
 * O texto de cada zona urbana — título, abertura, legendas das vistas.
 *
 * Vive fora de `urban-zones.ts` porque esse é gerado e reescrito a cada
 * corrida do gerador; este é escrito à mão. Os números entram sempre por
 * interpolação a partir da zona, nunca escritos no texto, para que uma
 * regeneração os actualize em todo o lado.
 *
 * A ordem de `ZONAS_URBANAS` é a ordem do índice e do selector.
 */

import { byId, type UrbanZone } from '@/lib/urban-zones'

export interface Ficha {
  termo: string
  valor: string
  nota: string
}

/**
 * Um ponto da maqueta: o número que se toca e o texto que abre. A posição e
 * as medidas vêm do gerador (`zona.pontos`, pelo `id`); a câmara diz de onde
 * se olha quando se escolhe o ponto (graus, como nas estampas, e metros).
 */
export interface PontoTexto {
  id: string
  titulo: string
  texto: string
  camara: { azimute: number; elevacao: number; distancia: number }
  /** Para onde o ponto continua no site (a maqueta de um monumento, no /visitar). */
  ligacao?: { href: string; rotulo: string }
}

export interface ZonaTexto {
  zona: UrbanZone
  titulo: [string, string]
  abertura: string
  /** Uma linha para o índice e para a descrição da página. */
  resumo: string
  /** A fonte do terreno muda de zona para zona; o selo diz qual. */
  fonte: string
  ficha: Ficha[]
  conjunto: { legenda: string; azimute: number; elevacao: number }
  /** A vista para ecrãs estreitos, ao alto (`<zona>-vertical.webp`, como no `monumento.py`). */
  vertical?: { legenda: string; azimute: number; elevacao: number }
  /** As vistas de perto, em imagem, das zonas que ainda não têm pontos. */
  trocos?: { subtitulo: string; vistas: { vista: string; legenda: string }[] }
  /** Os pontos numerados sobre a maqueta, de uma ponta à outra do eixo. */
  pontos?: PontoTexto[]
}

/** Metros por piso usados no modelo — o mesmo valor do gerador. */
const PE_DIREITO = 3

export const numero = (n: number) => n.toLocaleString('pt-PT')
const cota1 = (m: number) => m.toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
export const km = (m: number) =>
  `${(m / 1000).toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`

const edificiosFicha = (z: UrbanZone): Ficha => ({
  termo: 'Edifícios',
  valor: numero(z.edificios),
  nota: `a menos de ${z.raio} m do eixo`,
})

/**
 * Onde a altura vem dos pisos do OSM, converter de volta em pisos é exacto.
 * Onde vem do laser, não: os prédios antigos da Baixa têm pés-direitos de
 * 3,5 m, e 25 m a 3 m por piso dariam 8 pisos a um edifício que tem 7.
 */
const maisAltoFicha = (z: UrbanZone): Ficha => ({
  termo: 'Mais alto',
  valor: `${z.maisAlto.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} m`,
  nota: z.alturaLidar ? 'até ao telhado, no edifício mais alto' : `cerca de ${Math.round(z.maisAlto / PE_DIREITO)} pisos`,
})

const brasil = byId('rua-do-brasil')!
const baixa = byId('baixa')!

/** O ponto medido pelo gerador; falha na compilação da página se faltar. */
function medido(z: UrbanZone, id: string) {
  const p = z.pontos?.find((q) => q.id === id)
  if (!p) throw new Error(`ponto ${id} em falta em ${z.id} — correr o gerador`)
  return p
}
const ferreiraBorges = medido(baixa, 'ferreira-borges')
const sofia = medido(baixa, 'sofia')

const TODAS: ZonaTexto[] = [
  {
    zona: brasil,
    titulo: ['Dois quilómetros', 'a subir'],
    abertura:
      // A subida vem das cotas: escrita à mão, dizia 26 m, que era o que o
      // EU-DEM media com os telhados; o LiDAR mede 23.
      `A Rua do Brasil começa quase ao nível do Mondego e acaba ${Math.round(brasil.cotaMax - brasil.cotaMin)} metros acima, ` +
      `onde era a Ladeira do Baptista. Pelo caminho passa ${numero(brasil.edificios)} edifícios ` +
      `e duas rotundas.`,
    resumo: `${km(brasil.comprimento)} e ${numero(brasil.edificios)} edifícios a subir do Mondego a Santo António dos Olivais.`,
    fonte: 'OpenStreetMap · LiDAR DGT (MDT e MDS 2 m)',
    ficha: [
      { termo: 'Percurso', valor: km(brasil.comprimento), nota: 'de uma ponta à outra' },
      {
        termo: 'Subida',
        valor: `${Math.round(brasil.cotaMax - brasil.cotaMin)} m`,
        // Uma casa decimal nas pontas: arredondadas a inteiros, 21,4 e 44,6
        // davam "dos 21 aos 45" ao lado de uma subida de 23.
        nota: `de ${cota1(brasil.cotaMin)} a ${cota1(brasil.cotaMax)} m de altitude`,
      },
      edificiosFicha(brasil),
      maisAltoFicha(brasil),
    ],
    conjunto: {
      legenda:
        'A rua inteira, de poente para nascente. A oeste desce para a ponte; a leste estabiliza no planalto de Santo António dos Olivais.',
      azimute: -104,
      elevacao: 34,
    },
    trocos: {
      subtitulo: 'A frente construída muda de carácter três vezes pelo caminho.',
      vistas: [
        {
          vista: 'poente',
          legenda:
            'Poente: a descida para a Portagem. A frente afasta-se do eixo e o edificado rareia — é o troço onde a rua é sobretudo declive.',
        },
        {
          vista: 'centro',
          legenda:
            'Centro: a frente contínua de prédios que dá o carácter à avenida, cerrada dos dois lados do eixo.',
        },
        {
          vista: 'nascente',
          legenda:
            'Nascente: já no alto, depois da rotunda, o tecido abre-se em quarteirões mais soltos e blocos isolados de maior altura.',
        },
      ],
    },
  },
  {
    zona: baixa,
    titulo: ['Novecentos metros', 'de malha'],
    abertura:
      `Da Portagem a Santa Cruz pela Ferreira Borges e pela Visconde da Luz, e daí pela Rua da Sofia. ` +
      `Em menos de um quilómetro de percurso cabem ${numero(baixa.edificios)} edifícios.`,
    resumo: `${numero(baixa.edificios)} edifícios em menos de um quilómetro, da Portagem à Rua da Sofia.`,
    fonte: 'OpenStreetMap · LiDAR DGT (MDT e MDS 2 m) · ortofoto DGT 2025',
    ficha: [
      { termo: 'Percurso', valor: km(baixa.comprimento), nota: 'da Portagem ao fim da Sofia' },
      {
        termo: 'Altitude',
        valor: `${Math.round(baixa.cotaMin)}–${Math.round(baixa.cotaMax)} m`,
        nota: 'da Praça 8 de Maio ao cimo da Ferreira Borges',
      },
      edificiosFicha(baixa),
      maisAltoFicha(baixa),
    ],
    conjunto: {
      legenda:
        'A Baixa vista do lado do rio. O eixo corre de sul para norte, da Portagem à Rua da Sofia; por trás, o terreno começa a subir para a Alta.',
      azimute: 196,
      elevacao: 34,
    },
    vertical: {
      legenda:
        'A Baixa vista de sul, ao longo do eixo: a Portagem à frente, a Rua da Sofia ao fundo, a virar para noroeste ao pé da encosta.',
      azimute: -90,
      elevacao: 52,
    },
    // Factos: a Universidade de Coimbra (UniverCidade, «Sofia») para a Rua
    // da Sofia; o SIPA, citado pela Wikipédia, para a Porta de Almedina e a
    // classificação da cerca; para a Portagem, o nome e a estátua. As
    // medidas das ruas vêm da maqueta, nunca escritas à mão.
    pontos: [
      {
        id: 'portagem',
        titulo: 'Largo da Portagem',
        texto:
          'Onde a Baixa começa, junto à Ponte de Santa Clara. O nome vem dos impostos que ali se cobravam sobre ' +
          'as mercadorias que chegavam à cidade. Ao centro, a estátua de Joaquim António de Aguiar, de Costa Mota (tio).',
        camara: { azimute: 215, elevacao: 38, distancia: 190 },
      },
      {
        id: 'ferreira-borges',
        titulo: 'Rua Ferreira Borges',
        texto:
          `A rua principal da Baixa, só para peões: ${numero(ferreiraBorges.comprimento!)} m entre a Portagem e a ` +
          `Visconde da Luz, com ${cota1(ferreiraBorges.cotaMax! - ferreiraBorges.cotaMin!)} m de desnível. ` +
          'De um lado e do outro, a frente contínua de prédios altos e estreitos.',
        camara: { azimute: 200, elevacao: 34, distancia: 230 },
      },
      {
        id: 'almedina',
        titulo: 'Arco de Almedina',
        texto:
          'Era a porta principal da cidade muralhada: da Baixa entrava-se aqui para subir à Alta. A construção ' +
          'poderá remontar ao tempo do conde Sesnando, que conquistou Coimbra em 1064; a torre foi levantada ' +
          'por cima do arco. A cerca da cidade é Monumento Nacional desde 1910.',
        camara: { azimute: 195, elevacao: 22, distancia: 120 },
        ligacao: { href: '/visitar#se-velha', rotulo: 'Subir à Sé Velha' },
      },
      {
        id: 'santa-cruz',
        titulo: 'Santa Cruz',
        texto:
          'Na Praça 8 de Maio, o ponto mais baixo do percurso, o mosteiro onde estão sepultados os dois ' +
          'primeiros reis de Portugal, D. Afonso Henriques e D. Sancho I.',
        camara: { azimute: 200, elevacao: 30, distancia: 170 },
        ligacao: { href: '/visitar#santa-cruz', rotulo: 'O mosteiro em maqueta' },
      },
      {
        id: 'sofia',
        titulo: 'Rua da Sofia',
        texto:
          'Aberta em 1535–1536 por ordem de frei Brás de Braga, para ser a rua dos colégios universitários. ' +
          `São ${numero(sofia.comprimento!)} m quase planos ao pé da encosta; ao longo deles ficaram, entre outros, ` +
          'os colégios da Graça, do Carmo, de São Pedro dos Terceiros e de São Tomás. Com a Alta, é Património ' +
          'Mundial desde 2013.',
        camara: { azimute: 215, elevacao: 34, distancia: 300 },
      },
    ],
  },
]

/**
 * Zonas escondidas: o texto e o modelo ficam, mas saem do índice, do
 * selector, do sitemap e da primeira página, e o endereço dá 404. A Rua do
 * Brasil saiu a 26/09/2026 enquanto a Baixa passa ao estilo das maquetas do
 * /visitar.
 */
const ESCONDIDAS = new Set(['rua-do-brasil'])

export const ZONAS_URBANAS: ZonaTexto[] = TODAS.filter((z) => !ESCONDIDAS.has(z.zona.id))

export const textoDe = (id: string): ZonaTexto | undefined => ZONAS_URBANAS.find((z) => z.zona.id === id)
