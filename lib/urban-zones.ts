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
  /** Vestida como as maquetas do /visitar: telhados de águas, fachadas, chão desenhado. */
  rico?: boolean
  /**
   * Os pontos que a página aponta. `p` é [x nascente, y norte, z cota] nas
   * coordenadas da maqueta. Os de uma rua do eixo trazem o comprimento e as
   * cotas medidas dela; os de um edifício visto do alto, a altura medida.
   */
  pontos?: { id: string; osm?: string; rua?: string; p: [number, number, number]; altura?: number; comprimento?: number; cotaMin?: number; cotaMax?: number }[]
  /** O contorno do corredor e o eixo em planta (metros, x nascente, y norte), para a figura da abertura. */
  planta?: { recorte: [number, number][]; eixo: [number, number][][] }
  /** Quando o OSM e a altimetria desta zona foram lidos. */
  lidoEm: string
}

/** A leitura mais recente de todas as zonas. */
export const MODEL_FETCHED_AT = '2026-09-26T12:48:38.606Z'

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
    "cotaMin": 18.9,
    "cotaMax": 29.5,
    "edificios": 996,
    "comAltura": 972,
    "umPisoPorTipo": 1,
    "semAltura": 23,
    "alturaLidar": 970,
    "arvores": 193,
    "maisAlto": 25.1,
    "areaImplantacao": 135849,
    "rico": true,
    "pontos": [
      {
        "id": "portagem",
        "osm": "way/829380017",
        "p": [
          97.56,
          -434.97,
          25.08
        ]
      },
      {
        "id": "ferreira-borges",
        "rua": "Rua Ferreira Borges",
        "p": [
          136.68,
          -264.34,
          26.76
        ],
        "comprimento": 207,
        "cotaMin": 25.8,
        "cotaMax": 29.5
      },
      {
        "id": "almedina",
        "osm": "way/246397825",
        "p": [
          164.08,
          -270.98,
          56.51
        ],
        "altura": 25.2
      },
      {
        "id": "santa-cruz",
        "osm": "way/204192080",
        "p": [
          162.01,
          -38.66,
          41.34
        ],
        "altura": 20.7
      },
      {
        "id": "sofia",
        "rua": "Rua da Sofia",
        "p": [
          14.7,
          169.29,
          20.85
        ],
        "comprimento": 461,
        "cotaMin": 20.8,
        "cotaMax": 24.1
      }
    ],
    "planta": {
      "recorte": [
        [
          113,
          -518
        ],
        [
          119,
          -519
        ],
        [
          125,
          -519
        ],
        [
          130,
          -518
        ],
        [
          136,
          -518
        ],
        [
          141,
          -517
        ],
        [
          146,
          -516
        ],
        [
          151,
          -515
        ],
        [
          156,
          -514
        ],
        [
          161,
          -512
        ],
        [
          166,
          -510
        ],
        [
          171,
          -508
        ],
        [
          176,
          -505
        ],
        [
          181,
          -503
        ],
        [
          186,
          -500
        ],
        [
          190,
          -497
        ],
        [
          194,
          -494
        ],
        [
          199,
          -490
        ],
        [
          203,
          -487
        ],
        [
          207,
          -483
        ],
        [
          210,
          -479
        ],
        [
          214,
          -475
        ],
        [
          217,
          -471
        ],
        [
          221,
          -466
        ],
        [
          223,
          -462
        ],
        [
          226,
          -457
        ],
        [
          229,
          -452
        ],
        [
          231,
          -447
        ],
        [
          233,
          -442
        ],
        [
          235,
          -437
        ],
        [
          237,
          -432
        ],
        [
          238,
          -427
        ],
        [
          239,
          -421
        ],
        [
          240,
          -414
        ],
        [
          256,
          -290
        ],
        [
          256,
          -281
        ],
        [
          257,
          -250
        ],
        [
          259,
          -245
        ],
        [
          260,
          -240
        ],
        [
          261,
          -235
        ],
        [
          263,
          -229
        ],
        [
          265,
          -209
        ],
        [
          266,
          -203
        ],
        [
          266,
          -197
        ],
        [
          266,
          -190
        ],
        [
          266,
          -184
        ],
        [
          265,
          -178
        ],
        [
          264,
          -172
        ],
        [
          263,
          -166
        ],
        [
          261,
          -160
        ],
        [
          259,
          -153
        ],
        [
          256,
          -147
        ],
        [
          256,
          -146
        ],
        [
          253,
          -54
        ],
        [
          252,
          -32
        ],
        [
          251,
          -10
        ],
        [
          251,
          -5
        ],
        [
          250,
          0
        ],
        [
          246,
          31
        ],
        [
          244,
          39
        ],
        [
          243,
          45
        ],
        [
          241,
          50
        ],
        [
          239,
          55
        ],
        [
          237,
          60
        ],
        [
          235,
          65
        ],
        [
          232,
          70
        ],
        [
          230,
          75
        ],
        [
          226,
          80
        ],
        [
          222,
          86
        ],
        [
          217,
          92
        ],
        [
          210,
          99
        ],
        [
          206,
          104
        ],
        [
          201,
          109
        ],
        [
          153,
          179
        ],
        [
          32,
          357
        ],
        [
          -7,
          412
        ],
        [
          -37,
          456
        ],
        [
          -41,
          461
        ],
        [
          -45,
          466
        ],
        [
          -49,
          471
        ],
        [
          -64,
          486
        ],
        [
          -68,
          489
        ],
        [
          -72,
          493
        ],
        [
          -77,
          496
        ],
        [
          -81,
          499
        ],
        [
          -86,
          502
        ],
        [
          -92,
          505
        ],
        [
          -98,
          508
        ],
        [
          -103,
          510
        ],
        [
          -108,
          512
        ],
        [
          -114,
          514
        ],
        [
          -120,
          515
        ],
        [
          -126,
          517
        ],
        [
          -133,
          518
        ],
        [
          -140,
          518
        ],
        [
          -148,
          518
        ],
        [
          -155,
          518
        ],
        [
          -163,
          517
        ],
        [
          -170,
          516
        ],
        [
          -177,
          514
        ],
        [
          -184,
          512
        ],
        [
          -191,
          510
        ],
        [
          -197,
          507
        ],
        [
          -204,
          503
        ],
        [
          -210,
          500
        ],
        [
          -216,
          496
        ],
        [
          -222,
          491
        ],
        [
          -228,
          486
        ],
        [
          -233,
          481
        ],
        [
          -238,
          475
        ],
        [
          -243,
          469
        ],
        [
          -247,
          463
        ],
        [
          -251,
          457
        ],
        [
          -254,
          451
        ],
        [
          -257,
          444
        ],
        [
          -260,
          437
        ],
        [
          -262,
          430
        ],
        [
          -264,
          423
        ],
        [
          -265,
          416
        ],
        [
          -266,
          409
        ],
        [
          -266,
          401
        ],
        [
          -266,
          393
        ],
        [
          -266,
          386
        ],
        [
          -265,
          379
        ],
        [
          -263,
          372
        ],
        [
          -262,
          366
        ],
        [
          -260,
          361
        ],
        [
          -258,
          356
        ],
        [
          -256,
          351
        ],
        [
          -254,
          346
        ],
        [
          -252,
          341
        ],
        [
          -249,
          336
        ],
        [
          -246,
          332
        ],
        [
          -242,
          326
        ],
        [
          -238,
          321
        ],
        [
          -234,
          317
        ],
        [
          -229,
          311
        ],
        [
          -228,
          310
        ],
        [
          -205,
          276
        ],
        [
          -165,
          220
        ],
        [
          -45,
          44
        ],
        [
          -1,
          -21
        ],
        [
          12,
          -40
        ],
        [
          12,
          -41
        ],
        [
          13,
          -61
        ],
        [
          14,
          -80
        ],
        [
          18,
          -208
        ],
        [
          18,
          -216
        ],
        [
          17,
          -269
        ],
        [
          2,
          -384
        ],
        [
          2,
          -390
        ],
        [
          1,
          -398
        ],
        [
          1,
          -406
        ],
        [
          2,
          -414
        ],
        [
          4,
          -422
        ],
        [
          6,
          -431
        ],
        [
          9,
          -440
        ],
        [
          12,
          -449
        ],
        [
          16,
          -457
        ],
        [
          21,
          -465
        ],
        [
          24,
          -469
        ],
        [
          27,
          -473
        ],
        [
          33,
          -480
        ],
        [
          37,
          -484
        ],
        [
          40,
          -487
        ],
        [
          47,
          -493
        ],
        [
          51,
          -496
        ],
        [
          55,
          -499
        ],
        [
          63,
          -504
        ],
        [
          72,
          -508
        ],
        [
          80,
          -511
        ],
        [
          89,
          -514
        ],
        [
          98,
          -516
        ],
        [
          103,
          -517
        ],
        [
          108,
          -518
        ]
      ],
      "eixo": [
        [
          [
            -84,
            313
          ],
          [
            -67,
            289
          ],
          [
            -54,
            270
          ],
          [
            -20,
            220
          ]
        ],
        [
          [
            138,
            -206
          ],
          [
            133,
            -75
          ]
        ],
        [
          [
            -84,
            313
          ],
          [
            -106,
            345
          ],
          [
            -136,
            388
          ],
          [
            -146,
            398
          ]
        ],
        [
          [
            121,
            -399
          ],
          [
            136,
            -277
          ],
          [
            137,
            -269
          ],
          [
            137,
            -264
          ],
          [
            138,
            -217
          ],
          [
            138,
            -206
          ]
        ],
        [
          [
            132,
            -18
          ],
          [
            128,
            7
          ],
          [
            127,
            13
          ]
        ],
        [
          [
            118,
            22
          ],
          [
            113,
            25
          ],
          [
            108,
            32
          ],
          [
            106,
            35
          ],
          [
            103,
            39
          ],
          [
            98,
            47
          ],
          [
            54,
            111
          ],
          [
            50,
            117
          ],
          [
            37,
            137
          ],
          [
            24,
            156
          ],
          [
            15,
            169
          ]
        ],
        [
          [
            133,
            -55
          ],
          [
            132,
            -36
          ],
          [
            132,
            -18
          ]
        ],
        [
          [
            138,
            -217
          ],
          [
            144,
            -209
          ],
          [
            146,
            -195
          ]
        ],
        [
          [
            133,
            -57
          ],
          [
            133,
            -55
          ]
        ],
        [
          [
            15,
            169
          ],
          [
            -8,
            203
          ],
          [
            -20,
            220
          ]
        ],
        [
          [
            133,
            -75
          ],
          [
            133,
            -57
          ]
        ]
      ]
    },
    "lidoEm": "2026-09-26T12:48:38.606Z"
  }
]

export const byId = (id: string): UrbanZone | undefined => URBAN_ZONES.find((z) => z.id === id)

/** Fracção do edificado com altura conhecida — o que a maqueta pode mesmo mostrar. */
export function coberturaAltura(z: UrbanZone): number {
  return (z.comAltura + z.umPisoPorTipo) / z.edificios
}
