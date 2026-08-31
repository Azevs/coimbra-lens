export const MAP_CONFIG = {
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-8.4195, 40.2033] as [number, number],
  zoom: 13,
  pitch: 45,
  bearing: -20,
  antialias: true,
}

/**
 * Cores de extrusão dos edifícios. Como o Mapbox as avalia fora do CSS,
 * são literais — escolhidas para acompanhar --bg-secondary → --tone-slate.
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
      0, '#141920',
      50, '#25313D',
      100, '#3D4E5C',
    ],
    'fill-extrusion-height': ['get', 'height'],
    'fill-extrusion-base': ['get', 'min_height'],
    'fill-extrusion-opacity': 0.85,
  },
}

export const COIMBRA_PARISHES = [
  { name: 'Almedina', center: [-8.4270, 40.2090], population: 830, income: 1150 },
  { name: 'Santa Cruz', center: [-8.4310, 40.2100], population: 2450, income: 1280 },
  { name: 'Sé Nova', center: [-8.4230, 40.2060], population: 4120, income: 1420 },
  { name: 'São Bartolomeu', center: [-8.4290, 40.2070], population: 580, income: 980 },
  { name: 'Santo António dos Olivais', center: [-8.4050, 40.2150], population: 38200, income: 1350 },
  { name: 'Eiras', center: [-8.4350, 40.2400], population: 12500, income: 1180 },
  { name: 'São Paulo de Frades', center: [-8.3750, 40.2450], population: 5800, income: 1050 },
  { name: 'Brasfemes', center: [-8.3900, 40.2650], population: 3400, income: 1020 },
  { name: 'Ceira', center: [-8.3650, 40.2200], population: 4200, income: 1080 },
  { name: 'Torres do Mondego', center: [-8.3500, 40.2050], population: 2100, income: 980 },
  { name: 'Assafarge e Antanhol', center: [-8.4600, 40.1950], population: 5600, income: 1150 },
  { name: 'Taveiro', center: [-8.5000, 40.1900], population: 3800, income: 1020 },
  { name: 'São Martinho do Bispo', center: [-8.4650, 40.2050], population: 15200, income: 1200 },
  { name: 'Santa Clara e Castelo Viegas', center: [-8.4450, 40.2000], population: 8900, income: 1100 },
  { name: 'São Silvestre', center: [-8.4800, 40.2300], population: 3200, income: 980 },
  { name: 'Cernache', center: [-8.4900, 40.1700], population: 4600, income: 1050 },
  { name: 'Souselas e Botão', center: [-8.4100, 40.2800], population: 5100, income: 1000 },
  { name: 'Trouxemil e Torre de Vilela', center: [-8.4400, 40.2600], population: 4800, income: 1030 },
]
