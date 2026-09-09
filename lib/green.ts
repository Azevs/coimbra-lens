/**
 * As zonas verdes, prontas para desenhar.
 *
 * `green-spaces.ts` é gerado e só sabe de geometria. É aqui que se decide
 * o que a página diz sobre ela: como se chama cada família, que cor leva,
 * o que é perto e o que é longe, e como se escreve uma área.
 */

import { estimate, published, type Sourced } from '@/lib/provenance'
import {
  CITY_RADIUS_KM,
  GREEN_FETCHED_AT,
  GREEN_SPACES,
  type GreenKind,
  type GreenSpace,
} from '@/lib/green-spaces'
import { COIMBRA_PARISHES } from '@/lib/parishes'
import { fmt } from '@/lib/format'

export type { GreenKind, GreenSpace }

/**
 * As quatro famílias.
 *
 * A ordem não é alfabética nem por contagem: é da mancha ao canteiro, que é
 * como elas se distinguem no terreno.
 *
 * As cores saem da paleta do site e são escolhidas por matiz, não por
 * simpatia: verde-azulado, verde, azul e violeta. A tentação era pintar as
 * quatro de verde, e o resultado eram quatro manchas indistintas num mapa
 * cujo objectivo é justamente distingui-las. Nenhuma é o acento da marca —
 * esse fica reservado ao que o leitor escolheu.
 */
export const KINDS: Record<GreenKind, { label: string; plural: string; color: string; note: string }> = {
  reserva: {
    label: 'Reserva',
    plural: 'Reservas naturais',
    color: 'var(--tone-teal)',
    note: 'Área classificada, com acesso e circulação condicionados pelo seu regulamento.',
  },
  mata: {
    label: 'Mata',
    plural: 'Matas e pinhais',
    color: 'var(--tone-moss)',
    note: 'Mancha arborizada de percorrer a pé, com caminhos e sem desenho de jardim.',
  },
  parque: {
    label: 'Parque',
    plural: 'Parques',
    color: 'var(--tone-blue)',
    note: 'Espaço urbano de estar, quase sempre com relvado, água ou equipamento.',
  },
  jardim: {
    label: 'Jardim',
    plural: 'Jardins',
    color: 'var(--tone-violet)',
    note: 'Jardim desenhado, de escala de bairro ou de praça.',
  },
}

export const KIND_ORDER: GreenKind[] = ['reserva', 'mata', 'parque', 'jardim']

/**
 * O nome curto, para caber dentro da forma no mapa.
 *
 * "Jardim Botânico da Universidade de Coimbra" tem 42 caracteres e o
 * polígono tem 14 hectares: escrito por inteiro, o nome sai a 1,4 px. A
 * saída não é encolher a letra até deixar de se ler — é escrever no mapa o
 * que se diz em voz alta, e guardar o nome completo para a ficha e a lista,
 * onde há linha inteira para ele.
 *
 * Só entram aqui os que precisam. Quem não estiver nesta tabela usa o nome
 * corrente, que já é curto.
 */
const MAP_NAMES: Record<string, string> = {
  'reserva-natural-do-paul-de-arzila': 'Paul de Arzila',
  'mata-nacional-do-choupal': 'Choupal',
  'mata-nacional-de-vale-de-canas': 'Vale de Canas',
  'jardim-botanico-da-universidade-de-coimbra': 'Botânico',
  'mata-do-camalhao': 'Camalhão',
  'parque-do-choupalinho': 'Choupalinho',
  'mata-da-quinta-da-sapinha': 'Quinta da Sapinha',
  'parque-verde-do-mondego': 'Parque Verde',
  'parque-verde-do-mondego-entrada-poente': 'Entrada Poente',
  'parque-de-santa-cruz': 'Sereia',
  'jardim-da-quinta-de-sao-jeronimo': 'S. Jerónimo',
  'parque-doutor-manuel-braga': 'Manuel Braga',
  'parque-da-quinta-da-maia': 'Quinta da Maia',
  'parque-verde-do-alto-dos-barreiros': 'Alto dos Barreiros',
  'parque-urbano-de-sao-martinho-do-bispo': 'S. Martinho',
  'jardim-da-sa-da-bandeira': 'Sá da Bandeira',
  'jardim-de-santo-antonio-dos-olivais': 'Sto. António',
  'praca-herois-do-ultramar': 'Heróis do Ultramar',
  'praceta-bartolomeu-de-gusmao': 'Bartolomeu de Gusmão',
}

/** Quantas vezes cada nome aparece no conjunto, oficial ou corrente. */
const NAME_USES = GREEN_SPACES.reduce((count, space) => {
  for (const name of [space.name, space.altName]) {
    if (name) count.set(name, (count.get(name) ?? 0) + 1)
  }
  return count
}, new Map<string, number>())

/**
 * O nome por que o lugar é conhecido — mas só quando esse nome o distingue.
 *
 * O Parque de Santa Cruz é o Jardim da Sereia para toda a gente, e é assim
 * que a lista lhe chama. Já o Parque Linear do Vale das Flores tem por nome
 * corrente "Parque do Vale das Flores", que é o nome oficial de OUTRO
 * parque ali ao lado: usá-lo punha dois lugares diferentes com a mesma
 * etiqueta e a mesma freguesia, e a lista deixava de se poder ler. Quando o
 * nome corrente colide, vale o oficial, que é sempre único.
 */
export function displayName(space: GreenSpace): string {
  if (space.altName && (NAME_USES.get(space.altName) ?? 0) === 1) return space.altName
  return space.name
}

/** Como o lugar se escreve no mapa, onde há muito menos espaço. */
export function mapName(space: GreenSpace): string {
  return MAP_NAMES[space.id] ?? displayName(space)
}

/**
 * O nome curto da freguesia, o mesmo que o Território já usa.
 *
 * O gerador guarda o nome oficial, que é o que a carta tem: "União das
 * freguesias de Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)"
 * são 79 caracteres debaixo do nome de um jardim de meio hectare.
 */
export function parishName(space: GreenSpace): string {
  if (!space.parish) return 'Coimbra'
  return COIMBRA_PARISHES.find((p) => p.code === space.parish?.code)?.short ?? space.parish.name
}

/** Ordenadas da maior para a menor, como saem do gerador. */
export const SPACES = GREEN_SPACES

export const TOTAL_HA = SPACES.reduce((sum, s) => sum + s.areaHa, 0)

/** Dentro do raio a pé do Largo da Portagem. */
export const IN_CITY = SPACES.filter((s) => s.distanceKm <= CITY_RADIUS_KM)
export const OUT_OF_CITY = SPACES.filter((s) => s.distanceKm > CITY_RADIUS_KM)

/**
 * Hectares com a precisão que a grandeza aguenta.
 *
 * Escrever "0,25 ha" para um jardim de praça e "586,10 ha" para o Paul de
 * Arzila com as mesmas casas decimais é dar a ambos uma precisão que só um
 * deles tem. Acima de dez hectares a casa decimal não informa nada.
 */
export function formatHa(ha: number): string {
  if (ha >= 100) return fmt(ha, 0)
  if (ha >= 10) return fmt(ha, 1)
  return fmt(ha, 2)
}

/** A mesma área em campos de futebol, que é a unidade que toda a gente tem. */
export function inPitches(ha: number): number {
  // Campo de onze regulamentar: 105 × 68 m = 0,714 ha.
  return ha / 0.714
}

/** "a 700 m" ou "a 4,8 km" — metros enquanto forem legíveis a pé. */
export function formatDistance(km: number): string {
  if (km < 1) return `${fmt(Math.round(km * 1000) / 100 * 100, 0)} m`
  return `${fmt(km, 1)} km`
}

/**
 * O selo da página.
 *
 * Não é `live`: é uma extracção datada, e chamar-lhe directo seria anunciar
 * frescura que não tem. Também não é bem uma estimativa — os contornos são
 * medidos, não modelados.
 *
 * A nota diz o que o leitor precisa de saber para confiar no número: de
 * onde vem, de quando é, e que a área foi medida e não copiada de um
 * cadastro. Os critérios de recolha estão no gerador, que é onde servem
 * para alguma coisa; escrevê-los aqui era a página a explicar-se em vez de
 * mostrar Coimbra.
 *
 * O crédito aos colaboradores do OpenStreetMap não é cortesia: a ODbL, que
 * é a licença dos dados, obriga a ele.
 */
export const GREEN_META: Sourced = published(
  'OpenStreetMap',
  'Carta aberta',
  `© colaboradores do OpenStreetMap (ODbL), obtidos em ${new Date(GREEN_FETCHED_AT).toLocaleDateString(
    'pt-PT',
    { day: 'numeric', month: 'long', year: 'numeric' },
  )}. As áreas são medidas no polígono.`,
)

/** Sem geometria não há mapa — e um mapa vazio diz-se, não se disfarça. */
export const NO_GEOMETRY: Sourced = estimate(
  'OpenStreetMap',
  'A carta das zonas verdes não foi gerada. Correr `node scripts/build-green-spaces.mjs`.',
)
