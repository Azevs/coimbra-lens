import type { StyleSpecification } from 'mapbox-gl'

/**
 * A carta dos trilhos: um estilo feito de raiz, não o Standard do Mapbox.
 *
 * O Standard é uma fotografia da estrada — rotundas, lojas, números de
 * porta. Para quem vai a pé pela serra o que conta é o relevo, a água e o
 * traçado, e é só isso que aqui se desenha: papel, sombreado, curvas de
 * nível, rios, povoações e picos. A região da CIM fica em papel pardo; o
 * resto do mundo é lavado pela cor da página, e a região levanta-se dela.
 *
 * As cores vêm da paleta do site (papel, tinta, terracota), escuras o
 * bastante para a linha dos trilhos, que é o que se lê primeiro, ganhar a
 * tudo o resto.
 */

export const PAPEL = '#F2EEE6'
const PARDO = '#E8DFCB'
const TINTA = '#2A241C'
const SEPIA = '#5E4B37'
const AGUA = '#A7C0C6'
const AGUA_LINHA = '#5F8796'

const ITALICO = ['DIN Pro Italic', 'Arial Unicode MS Regular']
const MEDIO = ['DIN Pro Medium', 'Arial Unicode MS Regular']

export function estiloCarta(): StyleSpecification {
  return {
    version: 8,
    name: 'CoimbraLens · Trilhos',
    glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    sources: {
      dem: { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512, maxzoom: 14 },
      // O sombreado tem a sua cópia do DEM: partilhada com o terreno 3D, o
      // Mapbox baixa-lhe a resolução.
      'dem-sombra': { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512, maxzoom: 14 },
      relevo: { type: 'vector', url: 'mapbox://mapbox.mapbox-terrain-v2' },
      ruas: { type: 'vector', url: 'mapbox://mapbox.mapbox-streets-v8' },
      regiao: { type: 'geojson', data: '/data/trilhos-regiao.geojson' },
      trilhos: { type: 'geojson', data: '/data/trilhos.geojson', lineMetrics: true, promoteId: 'id' },
      cabecas: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } },
    },
    layers: [
      { id: 'fundo', type: 'background', paint: { 'background-color': PARDO } },

      // Mancha de mata — aguarela, não inventário florestal.
      {
        id: 'mata',
        type: 'fill',
        source: 'relevo',
        'source-layer': 'landcover',
        filter: ['in', ['get', 'class'], ['literal', ['wood', 'scrub']]],
        paint: {
          'fill-color': ['match', ['get', 'class'], 'wood', '#AEB98C', '#C4C7A0'],
          'fill-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0.18, 12, 0.34],
          'fill-antialias': false,
        },
      },

      {
        id: 'sombreado',
        type: 'hillshade',
        source: 'dem-sombra',
        paint: {
          'hillshade-shadow-color': '#3E3024',
          'hillshade-highlight-color': '#FFF9EC',
          'hillshade-accent-color': SEPIA,
          'hillshade-exaggeration': 0,
          'hillshade-illumination-direction': 315,
        },
      },

      {
        id: 'agua',
        type: 'fill',
        source: 'ruas',
        'source-layer': 'water',
        paint: { 'fill-color': AGUA, 'fill-opacity': 0.95 },
      },
      {
        id: 'rios',
        type: 'line',
        source: 'ruas',
        'source-layer': 'waterway',
        filter: ['in', ['get', 'class'], ['literal', ['river', 'canal', 'stream']]],
        minzoom: 8,
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': AGUA_LINHA,
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, ['match', ['get', 'class'], 'river', 1.2, 0.3], 14, ['match', ['get', 'class'], 'river', 3, 1]],
          'line-opacity': ['match', ['get', 'class'], 'stream', 0.45, 0.85],
        },
      },

      // Curvas de nível: 10 m no mapa de perto, mestras a cada 50 m mais escuras.
      {
        id: 'curvas',
        type: 'line',
        source: 'relevo',
        'source-layer': 'contour',
        minzoom: 9,
        filter: ['!=', ['get', 'index'], -1],
        paint: {
          'line-color': SEPIA,
          'line-width': ['match', ['get', 'index'], [5, 10], 0.8, 0.4],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 9, ['match', ['get', 'index'], [5, 10], 0.22, 0], 11, ['match', ['get', 'index'], [5, 10], 0.3, 0.14]],
        },
      },
      {
        id: 'curvas-cotas',
        type: 'symbol',
        source: 'relevo',
        'source-layer': 'contour',
        minzoom: 12.5,
        filter: ['in', ['get', 'index'], ['literal', [5, 10]]],
        layout: {
          'symbol-placement': 'line',
          'text-field': ['concat', ['to-string', ['get', 'ele']], ''],
          'text-font': ITALICO,
          'text-size': 9.5,
          'text-max-angle': 25,
          'symbol-spacing': 420,
        },
        paint: { 'text-color': SEPIA, 'text-opacity': 0.75, 'text-halo-color': PARDO, 'text-halo-width': 1.4 },
      },

      // Estradas principais, muito ténues: servem para se saber onde se está.
      {
        id: 'estradas',
        type: 'line',
        source: 'ruas',
        'source-layer': 'road',
        filter: ['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary']]],
        minzoom: 8,
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': TINTA,
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 8, 0.08, 13, 0.18],
          'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.4, 14, 1.6],
        },
      },

      // O mundo fora da região, lavado pela cor da página.
      {
        id: 'mascara',
        type: 'fill',
        source: 'regiao',
        filter: ['==', ['get', 'tipo'], 'mascara'],
        paint: { 'fill-color': PAPEL, 'fill-opacity': 0.84 },
      },

      {
        id: 'limites',
        type: 'line',
        source: 'regiao',
        filter: ['==', ['get', 'tipo'], 'limites'],
        paint: { 'line-color': TINTA, 'line-width': 0.7, 'line-opacity': 0.28, 'line-dasharray': [3, 2.5] },
      },
      {
        id: 'regiao-halo',
        type: 'line',
        source: 'regiao',
        filter: ['==', ['get', 'tipo'], 'regiao'],
        paint: { 'line-color': '#B03A0B', 'line-width': 9, 'line-opacity': 0.1, 'line-blur': 4 },
      },
      {
        id: 'regiao-linha',
        type: 'line',
        source: 'regiao',
        filter: ['==', ['get', 'tipo'], 'regiao'],
        paint: { 'line-color': TINTA, 'line-width': 1.3, 'line-opacity': 0.7 },
      },

      // Picos com nome e cota, como nas cartas militares.
      {
        id: 'picos',
        type: 'symbol',
        source: 'ruas',
        'source-layer': 'natural_label',
        minzoom: 9.5,
        filter: ['all', ['==', ['get', 'maki'], 'mountain'], ['has', 'elevation_m']],
        layout: {
          'text-field': ['format', '▲ ', { 'font-scale': 0.7 }, ['get', 'name'], {}, '\n', {}, ['to-string', ['get', 'elevation_m']], { 'font-scale': 0.82 }],
          'text-font': ITALICO,
          'text-size': 11,
          'text-anchor': 'top',
          'text-line-height': 1.1,
        },
        paint: { 'text-color': SEPIA, 'text-halo-color': PARDO, 'text-halo-width': 1.5 },
      },
      {
        id: 'povoacoes',
        type: 'symbol',
        source: 'ruas',
        'source-layer': 'place_label',
        minzoom: 9.5,
        filter: ['all', ['==', ['get', 'class'], 'settlement'], ['<=', ['get', 'symbolrank'], ['step', ['zoom'], 11, 11, 14, 13, 18]]],
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ITALICO,
          'text-size': ['interpolate', ['linear'], ['zoom'], 9.5, 10.5, 14, 13],
          'text-padding': 4,
        },
        paint: { 'text-color': '#4A4036', 'text-halo-color': PARDO, 'text-halo-width': 1.4 },
      },
      {
        id: 'concelhos',
        type: 'symbol',
        source: 'regiao',
        filter: ['==', ['get', 'tipo'], 'concelho'],
        maxzoom: 10.6,
        layout: {
          'text-field': ['upcase', ['get', 'nome']],
          'text-font': MEDIO,
          'text-size': ['interpolate', ['linear'], ['zoom'], 8, 9.5, 10, 12],
          'text-letter-spacing': 0.28,
          'text-max-width': 8,
          'text-allow-overlap': false,
        },
        paint: { 'text-color': TINTA, 'text-opacity': 0.5, 'text-halo-color': PARDO, 'text-halo-width': 1.2 },
      },
    ],
  } as StyleSpecification
}
