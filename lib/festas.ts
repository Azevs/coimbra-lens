import type { IconName } from '@/components/ui/Icon'

export interface CulturalEvent {
  name: string
  description: string
  month: number
  day: number
  /** O dia é o da festa, e não só uma ordem dentro do mês. */
  diaCerto?: boolean
  /** Mês em que acaba, quando atravessa mais de um. */
  mesFim?: number
  color: string
  icon: IconName
  category: string
  url: string
}

/**
 * As festas que se repetem todos os anos. Vive fora do componente para que
 * a agenda e o cartão social da agenda leiam a mesma lista.
 *
 * Só entra o que se confirmou no organizador ou na Câmara (Setembro de 2026).
 * `day` serve apenas para ordenar dentro do mês; o que se mostra é o mês.
 *
 * Saíram da versão anterior, por não se confirmarem: "Semana Académica" em
 * março, "Magusto de Coimbra", "BTT Mondego" e "Mercado de Natal" na Praça
 * 8 de Maio. A "Festa da Cidade" estava a 4 de junho; é a 4 de julho, dia da
 * Rainha Santa. O Jazz ao Centro estava em junho; é no início do outono.
 */
export const EVENTS: CulturalEvent[] = [
  {
    name: 'Queima das Fitas',
    description: 'A festa dos finalistas da universidade. Abre com a Serenata Monumental, à meia-noite, no largo da Sé Velha; segue-se mais de uma semana de cortejo e concertos.',
    month: 5, day: 21,
    color: 'var(--tone-amber-text)', icon: 'graduation', category: 'Academia',
    url: 'https://www.cm-coimbra.pt/areas/viver/cultura/eventos-regulares/queima-das-fitas',
  },
  {
    name: 'Festas da Cidade e da Rainha Santa',
    description: 'A partir de 4 de julho, feriado municipal e dia da padroeira: dez dias de concertos e animação, e as procissões da Rainha Santa entre Santa Clara-a-Nova e Santa Cruz.',
    month: 7, day: 4, diaCerto: true,
    color: 'var(--tone-teal-text)', icon: 'landmark', category: 'Cidade',
    url: 'https://www.cm-coimbra.pt/areas/viver/cultura/eventos-regulares/festas-da-cidade-de-coimbra',
  },
  {
    name: 'Festival das Artes QuebraJazz',
    description: 'Música clássica e jazz ao ar livre, no anfiteatro da Colina de Camões, nos jardins da Quinta das Lágrimas. Estende-se por julho e agosto.',
    month: 7, day: 12, mesFim: 8,
    color: 'var(--tone-crimson-text)', icon: 'theatre', category: 'Música',
    url: 'https://www.festivaldasartes.com/',
  },
  {
    name: 'Festa das Latas',
    description: 'A Latada recebe os novos estudantes: serenata no Largo da Sé Nova, cortejo pela cidade e concertos na Praça da Canção.',
    month: 10, day: 1,
    color: 'var(--tone-violet-text)', icon: 'graduation', category: 'Academia',
    url: 'https://www.festadaslatas.pt/pt',
  },
  {
    name: 'Jazz ao Centro',
    description: 'Os encontros internacionais de jazz do Jazz ao Centro Clube, em várias salas da cidade; as noites acabam no Salão Brazil.',
    month: 10, day: 2,
    color: 'var(--tone-blue-text)', icon: 'music', category: 'Música',
    url: 'https://www.jazzaocentroclube.pt/',
  },
]
