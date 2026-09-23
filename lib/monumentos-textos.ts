/**
 * O texto das visitas em 3D, escrito à mão.
 *
 * A posição de cada ponto não está aqui: vem do OSM, pelo gerador, em
 * `lib/monumentos.ts`. Aqui fica o que se diz dele e de onde se olha.
 *
 * Os factos do Paço das Escolas são os do inventário do património
 * edificado da Universidade de Coimbra; o que só guias e blogues afirmam
 * (alcunhas, lendas, "o mais antigo de") ficou de fora.
 *
 * `camara` é de onde se olha quando o ponto é escolhido: azimute e
 * elevação em graus (azimute a partir de nascente, no sentido directo — a
 * mesma convenção das vistas do `monumento.py`) e distância ao ponto em
 * metros. `acende` são os edifícios do conjunto que se destacam.
 */

export interface TextoPonto {
  id: string
  titulo: string
  /** `{altura}` é substituído pela altura medida do ponto, quando a há. */
  texto: string
  camara: { azimute: number; elevacao: number; distancia: number }
  acende: string[]
}

export interface TextoMonumento {
  id: string
  /** De onde a maqueta abre — o mesmo ângulo da estampa `conjunto`. */
  inicio: { azimute: number; elevacao: number }
  pontos: TextoPonto[]
}

const ALA_NORTE = 'relation/2708767'

export const TEXTOS_MONUMENTOS: TextoMonumento[] = [
  {
    id: 'paco-das-escolas',
    inicio: { azimute: -112, elevacao: 30 },
    pontos: [
      {
        id: 'porta-ferrea',
        titulo: 'Porta Férrea',
        texto:
          'A entrada principal, com o nome da grade de ferro que a fecha. Foi erguida em 1634 no lugar da antiga porta do palácio real, e tem as figuras de D. Dinis, que fundou a universidade, e de D. João III, que a instalou de vez em Coimbra.',
        camara: { azimute: -20, elevacao: 26, distancia: 95 },
        acende: [],
      },
      {
        id: 'd-joao-iii',
        titulo: 'O pátio',
        texto:
          'Foi alcácer islâmico, palácio real a partir do século XII e casa da universidade desde 1544. A meio, a estátua de D. João III. O lado sul fica aberto: é a varanda sobre o vale do Mondego.',
        camara: { azimute: -105, elevacao: 46, distancia: 170 },
        // O assunto é o chão — a calçada em diagonal vê-se na fotografia.
        // Acender as cinco alas à volta só tingia a maqueta inteira.
        acende: [],
      },
      {
        id: 'via-latina',
        titulo: 'Via Latina',
        texto:
          'A colunata com escadaria na fachada do antigo palácio real, virada para o pátio. É de finais do século XVIII.',
        camara: { azimute: -92, elevacao: 20, distancia: 90 },
        acende: [ALA_NORTE],
      },
      {
        id: 'sala-dos-capelos',
        titulo: 'Sala dos Capelos',
        texto:
          'A antiga Sala do Trono do palácio. Hoje recebe os grandes actos da vida académica: a abertura do ano lectivo, a tomada de posse dos reitores, as provas de doutoramento.',
        camara: { azimute: -75, elevacao: 38, distancia: 110 },
        acende: [ALA_NORTE],
      },
      {
        id: 'torre',
        titulo: 'Torre da Universidade',
        texto:
          'Construída entre 1728 e 1733, com projecto do arquitecto italiano António Canevari. São {altura} m do chão ao topo — o ponto mais alto da colina.',
        camara: { azimute: -128, elevacao: 18, distancia: 170 },
        acende: ['way/115574903'],
      },
      {
        id: 'capela',
        titulo: 'Capela de São Miguel',
        texto:
          'A capela da universidade, reedificada por volta de 1520 e enriquecida nos séculos seguintes: o azulejo do século XVII, o órgão barroco do século XVIII.',
        camara: { azimute: -10, elevacao: 30, distancia: 100 },
        acende: ['way/1315902875'],
      },
      {
        id: 'joanina',
        titulo: 'Biblioteca Joanina',
        texto:
          'Construída entre 1717 e 1728, no reinado de D. João V, de quem tem o nome. Encosta-se à ladeira: do lado do vale, o edifício desce muito abaixo do chão do pátio.',
        camara: { azimute: -160, elevacao: 24, distancia: 110 },
        acende: ['way/51293313'],
      },
    ],
  },
]

export const textosPorId = (id: string) => TEXTOS_MONUMENTOS.find((t) => t.id === id)
