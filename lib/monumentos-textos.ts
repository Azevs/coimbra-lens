/**
 * O texto das visitas em 3D, escrito à mão.
 *
 * A posição de cada ponto não está aqui: vem do OSM, pelo gerador, em
 * `lib/monumentos.ts`. Aqui fica o que se diz dele e de onde se olha.
 *
 * Os factos do Paço das Escolas são os do inventário do património
 * edificado da Universidade de Coimbra; os de Santa Cruz, os do guia de
 * Pedro Dias (Coimbra, Guia para uma visita, 2002) no roteiro do património
 * da Presidência da República (2008). O que só guias e blogues afirmam
 * (alcunhas, lendas, "o mais antigo de") ficou de fora.
 *
 * `camara` é de onde se olha quando o ponto é escolhido: azimute e
 * elevação em graus (azimute a partir de nascente, no sentido directo — a
 * mesma convenção das vistas do `monumento.py`) e distância ao ponto em
 * metros; `subir` levanta o ponto para onde se olha (a meio de uma
 * fachada, em vez do chão à porta). `acende` são os edifícios do conjunto
 * que se destacam.
 */

export interface TextoPonto {
  id: string
  titulo: string
  /** `{altura}` é substituído pela altura medida do ponto, quando a há. */
  texto: string
  camara: { azimute: number; elevacao: number; distancia: number; subir?: number }
  acende: string[]
}

export interface TextoMonumento {
  id: string
  /** De onde a maqueta abre — o mesmo ângulo da estampa `conjunto`. */
  inicio: { azimute: number; elevacao: number }
  /** Texto alternativo da estampa, que é o que se vê antes do 3D. */
  alt: string
  pontos: TextoPonto[]
}

const ALA_NORTE = 'relation/2708767'
const IGREJA_SC = 'way/204192080'

export const TEXTOS_MONUMENTOS: TextoMonumento[] = [
  {
    id: 'paco-das-escolas',
    inicio: { azimute: -112, elevacao: 30 },
    alt: 'Maqueta do Paço das Escolas e da Alta à volta, vista de sudoeste: o pátio aberto para o vale, a torre no canto.',
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
        // O assunto é o chão — os caminhos em diagonal e os canteiros de
        // saibro, desenhados a partir do OSM.
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
  {
    id: 'santa-cruz',
    inicio: { azimute: -160, elevacao: 30 },
    alt: 'Reconstituição do Mosteiro de Santa Cruz vista da Praça 8 de Maio: a fachada da igreja entre as duas torres, o claustro por trás e a fonte da Manga ao fundo.',
    pontos: [
      {
        id: 'fachada',
        titulo: 'A fachada',
        texto:
          'É de 1507–1513, do tempo de D. Manuel I, e segue as linhas da frontaria medieval. O portal foi acrescentado entre 1522 e 1526, desenhado por Diogo de Castilho e esculpido por Nicolau Chanterene; as três figuras por cima da porta — a Virgem, um profeta e o rei David — são de João de Ruão. O arco à frente é do início do século XIX. São {altura} m do chão ao alto das torres, sem os coruchéus.',
        camara: { azimute: -172, elevacao: 28, distancia: 62, subir: 10 },
        acende: [IGREJA_SC],
      },
      {
        id: 'nave',
        titulo: 'A nave',
        texto:
          'Uma nave só, abobadada entre 1507 e 1513, quando Boytac era o mestre das obras. As paredes têm azulejo azul e branco do século XVIII, de fabrico lisboeta; do lado esquerdo fica o púlpito que Nicolau Chanterene fez em 1521. Sobre a entrada, o coro-alto guarda o cadeiral de 1512.',
        camara: { azimute: -140, elevacao: 34, distancia: 75 },
        acende: [IGREJA_SC],
      },
      {
        id: 'tumulos',
        titulo: 'Os túmulos dos reis',
        texto:
          'Na capela-mor estão D. Afonso Henriques e D. Sancho I. D. Manuel I não achou as arcas antigas dignas deles e mandou fazer estas; as estátuas jacentes são de Nicolau Chanterene, e os túmulos estão neste lugar desde 1535. É por eles que Santa Cruz é Panteão Nacional.',
        camara: { azimute: -115, elevacao: 40, distancia: 65 },
        acende: [IGREJA_SC],
      },
      {
        id: 'claustro',
        titulo: 'Claustro do Silêncio',
        texto:
          'Construído entre 1517 e 1522 sobre um claustro anterior, com a obra dirigida por Marcos Pires. Cinco tramos por lado e dois pisos, o de baixo abobadado; ao centro, o tanque com chafariz, de 1639.',
        camara: { azimute: -100, elevacao: 55, distancia: 60 },
        acende: ['relation/2962560'],
      },
      {
        id: 'manga',
        titulo: 'A fonte da Manga',
        texto:
          'Estava no centro de um dos três claustros do mosteiro. Depois da extinção das ordens religiosas, uma das alas foi destruída para regularizar a rua, e ficou a fonte: o templete ao centro e os quatro cubelos na água, traçados por João de Ruão, com a pedraria contratada em 1533. É uma das primeiras obras inteiramente renascentistas feitas em Portugal.',
        camara: { azimute: 90, elevacao: 38, distancia: 48 },
        acende: ['way/873267259'],
      },
    ],
  },
]

export const textosPorId = (id: string) => TEXTOS_MONUMENTOS.find((t) => t.id === id)
