/**
 * GERADO por `node scripts/build-urban-model.mjs` — não editar à mão.
 *
 * As zonas urbanas modeladas em três dimensões. Cada uma é um corredor em
 * torno de um eixo com geometria própria no OpenStreetMap; `raio` diz a
 * largura desse corredor, que é o único recorte escolhido a olho.
 *
 * As contagens de altura não são cosmética: dizem que fracção da maqueta é
 * volume medido e que fracção é implantação sem altura conhecida. A página
 * mostra-as, e o modelo desenha a diferença.
 */

export interface UrbanZone {
  id: string
  nome: string
  /** `eixo` — corredor em torno de uma via com traçado no OSM. */
  tipo: 'eixo'
  /** As freguesias que o corredor atravessa. Informativo: o corredor não as respeita. */
  freguesia: string
  /** Metros de cada lado do eixo. */
  raio: number
  /** [lat, lon] do centro do corredor. */
  centro: [number, number]
  /** Comprimento do eixo em metros, sem contar duas vezes os sentidos separados. */
  comprimento: number
  cotaMin: number
  cotaMax: number
  edificios: number
  /** Com `height` ou `building:levels` no OSM — os que ganham volume. */
  comAltura: number
  /** Garagens e anexos: um piso pelo significado do tag. */
  umPisoPorTipo: number
  /** Sem altura publicada — na maqueta ficam como implantação no chão. */
  semAltura: number
  /** Dos com altura, quantos medidos pelo LiDAR da DGT (superfície − terreno). */
  alturaLidar?: number
  /** Árvores no corredor, medidas por ortofoto (NDVI) e LiDAR. Ausente se não houver ortofoto da zona inteira. */
  arvores?: number
  /** Altura do edifício medido mais alto, em metros. */
  maisAlto: number
  /** Soma das áreas de implantação, em m². */
  areaImplantacao: number
  /** Quando o OSM e a altimetria desta zona foram lidos. */
  lidoEm: string
}

/** A leitura mais recente de todas as zonas. */
export const MODEL_FETCHED_AT = '2026-09-10T10:17:27.069Z'

export const URBAN_ZONES: UrbanZone[] = [
  {
    "id": "rua-do-brasil",
    "nome": "Rua do Brasil",
    "tipo": "eixo",
    "freguesia": "Santo António dos Olivais / São Martinho do Bispo e Ribeira de Frades",
    "raio": 90,
    "centro": [
      40.201945,
      -8.414505
    ],
    "comprimento": 2210,
    "cotaMin": 21.4,
    "cotaMax": 44.6,
    "edificios": 670,
    "comAltura": 632,
    "umPisoPorTipo": 10,
    "semAltura": 28,
    "alturaLidar": 626,
    "maisAlto": 33.9,
    "areaImplantacao": 97153,
    "lidoEm": "2026-09-10T09:48:33.496Z"
  },
  {
    "id": "baixa",
    "nome": "Baixa",
    "tipo": "eixo",
    "freguesia": "Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)",
    "raio": 120,
    "centro": [
      40.211286,
      -8.43068
    ],
    "comprimento": 886,
    "cotaMin": 19,
    "cotaMax": 29.6,
    "edificios": 986,
    "comAltura": 962,
    "umPisoPorTipo": 1,
    "semAltura": 23,
    "alturaLidar": 960,
    "arvores": 230,
    "maisAlto": 25.1,
    "areaImplantacao": 109818,
    "lidoEm": "2026-09-10T10:17:27.069Z"
  }
]

export const byId = (id: string): UrbanZone | undefined => URBAN_ZONES.find((z) => z.id === id)

/** Fracção do edificado com altura conhecida — o que a maqueta pode mesmo mostrar. */
export function coberturaAltura(z: UrbanZone): number {
  return (z.comAltura + z.umPisoPorTipo) / z.edificios
}
