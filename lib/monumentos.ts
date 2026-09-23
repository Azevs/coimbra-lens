/**
 * GERADO por `node scripts/build-monumento.mjs` — não editar à mão.
 *
 * Os monumentos modelados em três dimensões. O modelo é um disco de `raio`
 * metros em torno de `centro`; o texto da visita está em
 * `lib/monumentos-textos.ts`, escrito à mão, e junta-se aqui pelo `id`
 * de cada ponto.
 */

export interface PontoMonumento {
  id: string
  /** Elemento do OSM de onde vem a posição. */
  osm: string
  /** [x nascente, y norte, z cota] em metros, nas coordenadas da maqueta. */
  p: [number, number, number]
  /** Altura medida pelo LiDAR (topo − chão), nos pontos que são um edifício. */
  altura?: number
}

export interface Monumento {
  id: string
  nome: string
  centro: [number, number]
  raio: number
  /**
   * As versões que existem do modelo. Sem o campo, as três: fotografia
   * (`<id>.glb`), reconstituição (`<id>-rico.glb`) e cartão. Só
   * `['rico']` quando os contornos não foram verificados contra a ortofoto.
   */
  vestidos?: ('foto' | 'rico' | 'cartao')[]
  /** Na reconstituição, o chão é desenhado a partir do OSM e não a ortofoto. */
  chaoDesenhado?: boolean
  edificios: number
  doMonumento: number
  semAltura: number
  arvores: number
  /** Cota mais baixa do terreno dentro do disco, em metros. */
  cotaMin: number
  /** Cota da cumeeira mais alta do monumento, em metros. */
  cotaMax: number
  pontos: PontoMonumento[]
  lidoEm: string
}

export const MONUMENTOS: Monumento[] = [
  {
    "id": "paco-das-escolas",
    "nome": "Paço das Escolas",
    "centro": [
      40.20752,
      -8.42608
    ],
    "raio": 150,
    "edificios": 110,
    "doMonumento": 5,
    "semAltura": 0,
    "arvores": 49,
    "cotaMin": 54.2,
    "cotaMax": 133.2,
    "pontos": [
      {
        "id": "porta-ferrea",
        "osm": "node/3496226629",
        "p": [
          35.07,
          29.61,
          99.5
        ]
      },
      {
        "id": "d-joao-iii",
        "osm": "node/1306837151",
        "p": [
          11.12,
          -33.52,
          98.05
        ]
      },
      {
        "id": "via-latina",
        "osm": "way/115744958",
        "p": [
          0.7,
          31.79,
          100.3
        ]
      },
      {
        "id": "sala-dos-capelos",
        "osm": "node/4838813723",
        "p": [
          -7.29,
          44.67,
          118.31
        ]
      },
      {
        "id": "torre",
        "osm": "way/115574903",
        "p": [
          -33.99,
          30.93,
          133.21
        ],
        "altura": 34.1
      },
      {
        "id": "capela",
        "osm": "way/1315902875",
        "p": [
          -32.18,
          -11.19,
          116.7
        ],
        "altura": 18.6
      },
      {
        "id": "joanina",
        "osm": "way/51293313",
        "p": [
          -37.99,
          -43.23,
          114.81
        ],
        "altura": 17.9
      }
    ],
    "lidoEm": "2026-09-22T20:38:54.804Z"
  },
  {
    "id": "santa-cruz",
    "nome": "Mosteiro de Santa Cruz",
    "centro": [
      40.21107,
      -8.42821
    ],
    "raio": 100,
    "vestidos": [
      "rico"
    ],
    "chaoDesenhado": true,
    "edificios": 108,
    "doMonumento": 3,
    "semAltura": 1,
    "arvores": 13,
    "cotaMin": 18.9,
    "cotaMax": 40.5,
    "pontos": [
      {
        "id": "fachada",
        "osm": "way/204192080",
        "p": [
          -64.05,
          -17.26,
          19.23
        ],
        "altura": 22.1
      },
      {
        "id": "nave",
        "osm": "way/204192080",
        "p": [
          -45.31,
          -14.28,
          41.34
        ],
        "altura": 20.7
      },
      {
        "id": "tumulos",
        "osm": "node/12593540265",
        "p": [
          -30.67,
          -10.61,
          39.14
        ]
      },
      {
        "id": "claustro",
        "osm": "way/1349800549",
        "p": [
          -14.36,
          15.77,
          20.23
        ]
      },
      {
        "id": "manga",
        "osm": "way/873267259",
        "p": [
          32.07,
          21.67,
          25.14
        ]
      }
    ],
    "lidoEm": "2026-09-23T11:33:05.275Z"
  }
]

export const monumentoPorId = (id: string): Monumento | undefined => MONUMENTOS.find((m) => m.id === id)
