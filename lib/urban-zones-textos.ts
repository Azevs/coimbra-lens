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
  trocos: { subtitulo: string; vistas: { vista: string; legenda: string }[] }
}

/** Metros por piso usados no modelo — o mesmo valor do gerador. */
const PE_DIREITO = 3

export const numero = (n: number) => n.toLocaleString('pt-PT')
export const km = (m: number) =>
  `${(m / 1000).toLocaleString('pt-PT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`

const edificiosFicha = (z: UrbanZone): Ficha => ({
  termo: 'Edifícios',
  valor: numero(z.edificios),
  nota: `a menos de ${z.raio} m do eixo`,
})

const maisAltoFicha = (z: UrbanZone): Ficha => ({
  termo: 'Mais alto',
  valor: `${z.maisAlto.toLocaleString('pt-PT', { maximumFractionDigits: 1 })} m`,
  nota: `cerca de ${Math.round(z.maisAlto / PE_DIREITO)} pisos`,
})

const brasil = byId('rua-do-brasil')!
const baixa = byId('baixa')!

export const ZONAS_URBANAS: ZonaTexto[] = [
  {
    zona: brasil,
    titulo: ['Dois quilómetros', 'a subir'],
    abertura:
      `A Rua do Brasil começa quase ao nível do Mondego e acaba vinte e seis metros acima, ` +
      `onde era a Ladeira do Baptista. Pelo caminho passa ${numero(brasil.edificios)} edifícios ` +
      `e duas rotundas.`,
    resumo: `${km(brasil.comprimento)} e ${numero(brasil.edificios)} edifícios a subir do Mondego a Santo António dos Olivais.`,
    fonte: 'OpenStreetMap · EU-DEM (Copernicus)',
    ficha: [
      { termo: 'Percurso', valor: km(brasil.comprimento), nota: 'de uma ponta à outra' },
      {
        termo: 'Subida',
        valor: `${Math.round(brasil.cotaMax - brasil.cotaMin)} m`,
        nota: `dos ${Math.round(brasil.cotaMin)} aos ${Math.round(brasil.cotaMax)} de altitude`,
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
            'Centro: a frente contínua de prédios de quatro e cinco pisos que dá o carácter à avenida, com a rotunda a marcar o meio.',
        },
        {
          vista: 'nascente',
          legenda:
            'Nascente: já no alto, o tecido abre-se em quarteirões mais soltos e blocos isolados de maior altura.',
        },
      ],
    },
  },
  {
    zona: baixa,
    titulo: ['Novecentos metros', 'de malha'],
    abertura:
      `Da Portagem a Santa Cruz pela Ferreira Borges e pela Visconde da Luz, e daí pela Rua da Sofia. ` +
      `Em menos de um quilómetro de percurso cabem ${numero(baixa.edificios)} edifícios — mais do que ` +
      `nos dois quilómetros da Rua do Brasil.`,
    resumo: `${numero(baixa.edificios)} edifícios em menos de um quilómetro, da Portagem à Rua da Sofia.`,
    fonte: 'OpenStreetMap · LiDAR DGT (MDT 2 m)',
    ficha: [
      { termo: 'Percurso', valor: km(baixa.comprimento), nota: 'da Portagem ao fim da Sofia' },
      {
        termo: 'Altitude',
        valor: `${Math.round(baixa.cotaMin)}–${Math.round(baixa.cotaMax)} m`,
        nota: 'da Praça 8 de Maio à entrada do Arco de Almedina',
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
    trocos: {
      subtitulo: 'Três partes de um percurso curto, cada uma com o seu tecido.',
      vistas: [
        {
          vista: 'sul',
          legenda:
            'Sul: a Portagem e a Ferreira Borges, que sobe devagar desde o largo até à passagem para o Arco de Almedina.',
        },
        {
          vista: 'centro',
          legenda:
            'Centro: a Visconde da Luz desce oito metros até à Praça 8 de Maio, o ponto mais baixo do percurso, com o quarteirão apertado da Baixa entre o eixo e o rio.',
        },
        {
          vista: 'norte',
          legenda:
            'Norte: a Rua da Sofia, larga, recta e quase plana ao pé da encosta. Do lado da encosta, os edifícios grandes ficam desenhados no chão: a altura está por registar.',
        },
      ],
    },
  },
]

export const textoDe = (id: string): ZonaTexto | undefined => ZONAS_URBANAS.find((z) => z.zona.id === id)
