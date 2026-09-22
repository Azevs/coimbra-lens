/**
 * O texto do capítulo I da História — Aeminium. Escrito à mão.
 *
 * Regra da casa: cada afirmação leva um selo de `Evidencia` e a referência
 * de onde vem. As cotas do terreno nunca se escrevem aqui — entram por
 * interpolação a partir de `lib/historia-aeminium.ts`, que é gerado.
 * Os números que aqui estão (29 m, sete celas, 750 m², as datas) são os
 * publicados por quem escavou o fórum, e dizem-no pelo selo.
 */
import type { Evidencia } from '@/lib/evidencia'

export interface Referencia {
  id: string
  /** Como aparece na lista, já formatado. */
  texto: string
  href?: string
}

/** Por ordem de citação: o número de cada uma é a posição na lista. */
export const REFERENCIAS: Referencia[] = [
  {
    id: 'zephyrus',
    texto:
      'J. de Alarcão, P. C. Carvalho e R. C. da Silva (2017), “The forums of Conimbriga and Aeminium: comparison and summary of the state of the art”, Zephyrus LXXX, pp. 131–146.',
    href: 'https://doi.org/10.14201/zephyrus201780131146',
  },
  {
    id: 'lidar',
    texto: 'Direção-Geral do Território, modelos digitais de terreno e de superfície LiDAR 2 m (2024).',
    href: 'https://cdd.dgterritorio.gov.pt/',
  },
  {
    id: 'osm',
    texto: 'Contornos de edifícios e da água: OpenStreetMap, contribuidores (ODbL).',
    href: 'https://www.openstreetmap.org/copyright',
  },
  {
    id: 'observador',
    texto: '“Aeminium, a antiga cidade romana de Coimbra, de que hoje só restam vestígios”, Observador, 8 de Fevereiro de 2016.',
    href: 'https://observador.pt/2016/02/08/aeminium-antiga-cidade-romana-coimbra-hoje-so-restam-vestigios/',
  },
]

export const refNumero = (id: string) => REFERENCIAS.findIndex((r) => r.id === id) + 1

/** Altura da fachada poente do criptopórtico, a mais alta: “cerca de 29 m”. */
export const FACHADA_POENTE_M = 29

/** Os passos do corte, pela ordem do scroll. `id` é o estado do desenho. */
export type PassoId = 'hoje' | 'chao' | 'problema' | 'criptoportico' | 'forum' | 'depois'

export interface Passo {
  id: PassoId
  /** A época que o desenho mostra neste passo — o carimbo grande da estampa. */
  epoca: string
  titulo: string
  /** Parágrafos. `{subida}` e `{distancia}` vêm do terreno medido. */
  texto: string[]
  selos: { evidencia: Evidencia; ref?: string }[]
}

export const PASSOS: Passo[] = [
  {
    id: 'hoje',
    epoca: 'Hoje',
    titulo: 'Uma linha pela colina',
    texto: [
      'Corte-se a cidade ao meio, numa linha recta de poente para nascente: da margem esquerda do Mondego, pela Baixa, até ao alto da Alta.',
      'A linha passa pelo Museu Nacional Machado de Castro. Por cima do chão, os telhados de hoje.',
    ],
    selos: [{ evidencia: 'medido', ref: 'lidar' }],
  },
  {
    id: 'chao',
    epoca: 'Hoje, sem a cidade',
    titulo: 'Tire-se a cidade',
    texto: [
      'Sem os edifícios fica o chão. A Baixa é plana, quase à cota do rio. Depois, a colina.',
      '{subida}',
    ],
    selos: [{ evidencia: 'medido', ref: 'lidar' }],
  },
  {
    id: 'problema',
    epoca: 'Tempo de Augusto',
    titulo: 'Uma praça não cabe numa encosta',
    texto: [
      'No tempo de Augusto, os romanos puseram o centro de Aeminium no alto desta colina. O centro de uma cidade romana é o fórum: uma praça plana, com pórticos, a basílica e os templos à volta.',
      'O terreno ali era muito inclinado. Para haver praça, era preciso fazer o chão.',
    ],
    selos: [{ evidencia: 'escavado', ref: 'zephyrus' }],
  },
  {
    id: 'criptoportico',
    epoca: '41 – 68 d.C.',
    titulo: 'Então construiu-se o chão',
    texto: [
      'Contra a encosta ergueu-se um criptopórtico: dois pisos de galerias abobadadas, fechadas, que seguram uma plataforma horizontal. Por fora, um pódio alto e liso, só com frestas para entrar ar e luz.',
      'Do lado poente, o mais alto, a fachada tinha cerca de 29 metros.',
    ],
    selos: [
      { evidencia: 'escavado', ref: 'zephyrus' },
      { evidencia: 'esquema' },
    ],
  },
  {
    id: 'forum',
    epoca: 'Séc. I',
    titulo: 'Por cima, a praça',
    texto: [
      'Sobre a plataforma assentou o fórum, com um pórtico de dois pisos. Na fachada poente o pórtico abria-se em arcadas, como o Tabulário de Roma.',
      'Dali via-se por cima dos telhados da cidade e, mais longe, o Mondego e a encosta da outra margem.',
    ],
    selos: [
      { evidencia: 'escavado', ref: 'zephyrus' },
      { evidencia: 'esquema' },
    ],
  },
  {
    id: 'depois',
    epoca: 'Séc. XI → hoje',
    titulo: 'O fórum foi-se. O chão ficou',
    texto: [
      'No fim do século XI já não restava nada do fórum; em cima do criptopórtico estava o paço do bispo. O paço foi sendo refeito durante séculos e, no início do século XX, passou a museu.',
      'O criptopórtico ficou inteiro, menos a fachada poente. O pátio do museu corresponde, grosso modo, à antiga praça.',
    ],
    selos: [{ evidencia: 'escavado', ref: 'zephyrus' }],
  },
]

/** Uma camada da estratigrafia: de cima (hoje) para baixo (Augusto). */
export interface Camada {
  quando: string
  titulo: string
  texto: string
  evidencia: Evidencia
  ref: string
}

export const CAMADAS: Camada[] = [
  {
    quando: '1992 – 2008',
    titulo: 'Escava-se por baixo do museu',
    texto:
      'As obras de remodelação e ampliação do museu foram precedidas e acompanhadas de escavações em cerca de 750 m². É delas que vem quase tudo o que se sabe do fórum.',
    evidencia: 'escavado',
    ref: 'zephyrus',
  },
  {
    quando: 'Início do séc. XX',
    titulo: 'O paço passa a museu',
    texto: 'O paço episcopal é convertido no que é hoje o Museu Nacional Machado de Castro.',
    evidencia: 'documentado',
    ref: 'zephyrus',
  },
  {
    quando: 'Fim do séc. XVI',
    titulo: 'Uma loggia como a romana',
    texto: 'O paço ganha uma loggia que adopta uma solução parecida com a do pórtico romano, quinze séculos depois.',
    evidencia: 'documentado',
    ref: 'zephyrus',
  },
  {
    quando: 'Séc. XIV',
    titulo: 'Cai a fachada poente',
    texto: 'A única parte do criptopórtico que não chegou até hoje. Pode ter caído com tremores de terra.',
    evidencia: 'hipotese',
    ref: 'zephyrus',
  },
  {
    quando: 'Fim do séc. XI',
    titulo: 'Um paço sobre o criptopórtico',
    texto: 'Do fórum já não resta nada à superfície. Por cima das galerias romanas está o paço episcopal.',
    evidencia: 'escavado',
    ref: 'zephyrus',
  },
  {
    quando: 'Séc. VI',
    titulo: 'Aeminium passa a chamar-se Coimbra',
    texto:
      'Depois de os Suevos atacarem Conímbriga, entre 465 e 468, a cidade cresce com quem de lá foge — e acaba por herdar o nome da vizinha.',
    evidencia: 'documentado',
    ref: 'observador',
  },
  {
    quando: 'Séc. I',
    titulo: 'Plínio escreve o nome',
    texto:
      'Na História Natural, Plínio, o Velho, põe os Aeminienses na lista das cidades estipendiárias da Lusitânia — as que pagavam tributo a Roma.',
    evidencia: 'documentado',
    ref: 'zephyrus',
  },
  {
    quando: '41 – 68',
    titulo: 'O fórum é refeito de raiz',
    texto:
      'Começa com Cláudio e acaba com Nero. O criptopórtico de Augusto fica embutido num outro, muito maior. A data vem da cerâmica encontrada nas camadas da obra.',
    evidencia: 'escavado',
    ref: 'zephyrus',
  },
  {
    quando: '27 a.C. – 14 d.C.',
    titulo: 'O primeiro fórum',
    texto:
      'No tempo de Augusto, a cidade tem já um fórum e um criptopórtico mais pequeno: uma só nave abobadada, com cinco portas abertas para um terraço a poente.',
    evidencia: 'escavado',
    ref: 'zephyrus',
  },
]

/** Duas histórias à margem. */
export const MARGENS: { titulo: string; texto: string; evidencia: Evidencia; ref: string }[] = [
  {
    titulo: 'Quem o desenhou',
    texto:
      'Um Caio Sévio Lupo, “arquitecto de Aeminium”, deixou uma dedicatória a Marte junto do farol romano da Corunha, a Torre de Hércules. Pode ter sido ele o autor do fórum — há pormenores de construção parecidos nos dois.',
    evidencia: 'hipotese',
    ref: 'zephyrus',
  },
  {
    titulo: 'Um rosto trocado',
    texto:
      'Do fórum vêm retratos de Lívia, de Agripina Maior e de Nero. O de Nero foi mais tarde reesculpido com o rosto de Vespasiano; depois juntou-se um Trajano à galeria.',
    evidencia: 'escavado',
    ref: 'zephyrus',
  },
]

/** Os dois pisos do criptopórtico, como a planta publicada os descreve. */
export const PISOS = {
  superior:
    'Duas galerias em forma de P, uma a envolver a outra, com abóbada de berço. Entre os braços do P, sete celas ligadas por passagens estreitas.',
  inferior:
    'Por baixo das sete celas de cima, outras sete, mais compridas e mais altas, que dão para uma longa galeria.',
}
