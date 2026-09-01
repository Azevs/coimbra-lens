export const MAP_CONFIG = {
  // Gazeta: carta clara. O estilo escuro deixou de fazer par com o papel.
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-8.4195, 40.2033] as [number, number],
  zoom: 13,
  pitch: 45,
  bearing: -20,
  antialias: true,
}

/**
 * Cores de extrusão dos edifícios. Como o Mapbox as avalia fora do CSS,
 * são literais — em papel vão do tom recuado ao cinza-tinta, para os
 * volumes se lerem sobre a carta clara sem a escurecerem.
 */
export const BUILDING_LAYER = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion' as const,
  minzoom: 12,
  paint: {
    'fill-extrusion-color': [
      'interpolate', ['linear'], ['get', 'height'],
      0, '#D8D1C2',
      50, '#B9B2A4',
      100, '#8E887C',
    ],
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'min_height'],
    'fill-extrusion-opacity': 0.85,
  },
}

/**
 * As 18 freguesias de Coimbra, com a população dos Censos 2021 do INE.
 *
 * A lista anterior estava errada de duas maneiras. Listava Almedina, Santa
 * Cruz, Sé Nova e São Bartolomeu como freguesias separadas, quando desde a
 * reorganização de 2013 são uma única união. E os números eram inventados:
 * somavam 125 380 habitantes num município de 140 816, e os 18 rendimentos
 * eram todos múltiplos de 10, com apenas 13 valores distintos.
 *
 * O rendimento por freguesia não é publicado — por isso deixou de existir
 * aqui. As coordenadas são centros aproximados para colocar o marcador,
 * não fronteiras: as que faltavam vieram do OpenStreetMap.
 */
export interface Parish {
  /** Código DICOFRE do INE. */
  code: string
  name: string
  /** Nome curto, para etiquetas e listas estreitas. */
  short: string
  center: [number, number]
  population: number
}

/** Ano dos Censos a que a população se refere. */
export const PARISH_CENSUS_YEAR = '2021'

/**
 * Os Censos são decenais. Dizer isto ao leitor distingue "o site está
 * desactualizado" de "é este o detalhe que existe publicado em Portugal".
 */
export const NEXT_CENSUS = '2031'

export const COIMBRA_PARISHES: Parish[] = [
  { code: '060318', name: 'Santo António dos Olivais', short: 'Santo António dos Olivais', center: [-8.4050, 40.2150], population: 41150 },
  { code: '060335', name: 'União das freguesias de Eiras e São Paulo de Frades', short: 'Eiras e S. Paulo de Frades', center: [-8.4350, 40.2400], population: 17574 },
  { code: '060338', name: 'União das freguesias de São Martinho do Bispo e Ribeira de Frades', short: 'S. Martinho do Bispo', center: [-8.4650, 40.2050], population: 15315 },
  { code: '060334', name: 'União das freguesias de Coimbra (Sé Nova, Santa Cruz, Almedina e São Bartolomeu)', short: 'Coimbra (centro histórico)', center: [-8.4270, 40.2090], population: 13880 },
  { code: '060336', name: 'União das freguesias de Santa Clara e Castelo Viegas', short: 'Santa Clara e Castelo Viegas', center: [-8.4450, 40.2000], population: 11858 },
  { code: '060333', name: 'União das freguesias de Assafarge e Antanhol', short: 'Assafarge e Antanhol', center: [-8.4600, 40.1950], population: 4993 },
  { code: '060339', name: 'União das freguesias de Souselas e Botão', short: 'Souselas e Botão', center: [-8.4100, 40.2800], population: 4188 },
  { code: '060340', name: 'União das freguesias de Taveiro, Ameal e Arzila', short: 'Taveiro, Ameal e Arzila', center: [-8.5000, 40.1900], population: 3997 },
  { code: '060312', name: 'Cernache', short: 'Cernache', center: [-8.4900, 40.1700], population: 3962 },
  { code: '060341', name: 'União das freguesias de Trouxemil e Torre de Vilela', short: 'Trouxemil e Torre de Vilela', center: [-8.4400, 40.2600], population: 3659 },
  { code: '060311', name: 'Ceira', short: 'Ceira', center: [-8.3650, 40.2200], population: 3244 },
  { code: '060301', name: 'Almalaguês', short: 'Almalaguês', center: [-8.3916, 40.1357], population: 2853 },
  { code: '060332', name: 'União das freguesias de Antuzede e Vil de Matos', short: 'Antuzede e Vil de Matos', center: [-8.4766, 40.2533], population: 2842 },
  { code: '060324', name: 'São Silvestre', short: 'São Silvestre', center: [-8.4800, 40.2300], population: 2794 },
  { code: '060337', name: 'União das freguesias de São Martinho de Árvore e Lamarosa', short: 'S. Martinho de Árvore', center: [-8.5533, 40.2196], population: 2716 },
  { code: '060329', name: 'Torres do Mondego', short: 'Torres do Mondego', center: [-8.3500, 40.2050], population: 2034 },
  { code: '060309', name: 'Brasfemes', short: 'Brasfemes', center: [-8.3900, 40.2650], population: 1932 },
  { code: '060320', name: 'São João do Campo', short: 'São João do Campo', center: [-8.5118, 40.2370], population: 1825 },
]
