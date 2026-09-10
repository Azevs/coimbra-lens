/**
 * Dados de referência — tudo o que não vem de uma API em directo.
 *
 * Este ficheiro existe porque números fixos espalhados por componentes
 * envelhecem em silêncio. Aqui cada valor traz consigo:
 *
 *   asOf         o período a que se refere (não a data em que foi escrito)
 *   source       quem o publica
 *   sourceUrl    onde ir confirmar
 *   refreshEvery de quantos em quantos meses a fonte publica de novo
 *   ineVarcd     quando existe, o indicador do INE — permite ao
 *                `npm run check:data` perguntar à fonte se já há período
 *                mais recente, em vez de depender de alguém se lembrar
 *
 * Regra: nenhum número fixo entra num componente sem passar por aqui.
 *
 * ── Nota sobre os valores abaixo ────────────────────────────────────────
 * Este ficheiro só contém valores confirmados contra a fonte. Tudo o que
 * era plausível mas não confirmado — rendimento por freguesia, estudantes
 * por faculdade, nacionalidades da UC, taxa de desemprego, parâmetros da
 * água, preços por zona — foi retirado do site, não reetiquetado.
 *
 * População, densidade, residentes estrangeiros, nacionalidades e ganho
 * médio mensal saíram daqui: passam a ser obtidos em directo do INE em
 * /api/demografia, e actualizam-se sozinhos quando o INE publica.
 *
 * Os que ficaram mantêm o valor e o período que já tinham — não foram
 * substituídos por estimativas inventadas. O `npm run check:data` assinala
 * os que estão fora de prazo.
 */

export interface ReferenceValue {
  id: string
  label: string
  value: string
  unit: string
  /** Período a que o valor se refere: 'YYYY' ou 'YYYY-MM'. */
  asOf: string
  source: string
  sourceUrl: string
  /** Cadência de publicação da fonte, em meses. */
  refreshEvery: number
  /** Indicador INE, quando a verificação automática é possível. */
  ineVarcd?: string
  tone: string
}

export const CITY_STATS: ReferenceValue[] = [
  {
    id: 'freguesias',
    label: 'Freguesias',
    value: '18',
    unit: 'freguesias',
    asOf: '2013',
    source: 'DGT · CAOP',
    sourceUrl: 'https://www.dgterritorio.gov.pt',
    // Estável desde a reorganização administrativa de 2013.
    refreshEvery: 240,
    tone: 'var(--tone-teal)',
  },
]

/**
 * Factos estáveis sobre a cidade. Não são estatísticas, mas também mudam.
 * `reviewAfter` marca os que têm prazo de validade conhecido.
 */
export interface CityFact {
  icon: string
  text: string
  reviewAfter?: number
}

export const CITY_FACTS: CityFact[] = [
  { icon: '🏫', text: '3 hospitais públicos (HUC, Pediátrico, Psiquiátrico)' },
  { icon: '🚌', text: 'Rede SMTUC: 28 linhas urbanas de autocarro' },
  { icon: '🚂', text: 'Coimbra-B: hub ferroviário com ligações a Lisboa e Porto' },
  { icon: '🌊', text: 'Rio Mondego atravessa 18 km do município' },
  { icon: '🎓', text: 'Universidade fundada em 1290 — Património UNESCO' },
  // Corrigido: o site afirmava "Capital Europeia da Cultura candidata 2027",
  // como se a candidatura estivesse a decorrer. Coimbra concorreu, não passou
  // à lista de finalistas, e o título foi atribuído a Évora em Dezembro de 2022.
  {
    icon: '🏛️',
    text: 'Concorreu a Capital Europeia da Cultura 2027 — o título ficou para Évora',
  },
]

/** Entrada do manifesto de frescura. */
export interface TrackedDatum {
  id: string
  label: string
  /** Período a que o valor se refere. */
  asOf: string
  source: string
  /** Cadência de publicação da fonte, em meses. */
  refreshEvery: number
  /** Indicador do INE, quando a fonte permite verificação automática. */
  ineVarcd?: string
  /** Onde o valor é usado, para quem for actualizá-lo. */
  usedIn: string
}

/**
 * Manifesto único do que o `npm run check:data` vigia. Inclui os valores
 * das listas acima e também os que vivem noutros ficheiros.
 */
export const TRACKED: TrackedDatum[] = [
  ...CITY_STATS.map((s) => ({
    id: s.id,
    label: s.label,
    asOf: s.asOf,
    source: s.source,
    refreshEvery: s.refreshEvery,
    ineVarcd: s.ineVarcd,
    usedIn: 'CityOverview',
  })),
  {
    id: 'freguesias-dados',
    label: 'População por freguesia',
    asOf: '2021',
    source: 'INE · Censos',
    // Os Censos são decenais; os próximos são em 2031.
    refreshEvery: 120,
    usedIn: 'lib/parishes',
  },
  {
    id: 'freguesias-limites',
    label: 'Limites e áreas das freguesias',
    // Mês em que a carta foi obtida — o mesmo BOUNDARIES_FETCHED_AT que o
    // gerador escreveu em lib/parish-map.ts. Fica repetido à mão de
    // propósito: importar o ficheiro gerado só por causa de uma data
    // arrastava 45 KB de geometria para todo o lado onde este manifesto é
    // lido.
    asOf: '2026-09',
    source: 'DGT · CAOP',
    // A DGT republica a carta administrativa uma vez por ano.
    refreshEvery: 12,
    usedIn: 'lib/parish-map (scripts/build-parish-map.mjs)',
  },
  {
    id: 'zonas-verdes',
    label: 'Contornos das zonas verdes',
    // O mesmo GREEN_FETCHED_AT que o gerador escreveu em lib/green-spaces.ts,
    // repetido à mão pela razão acima: o ficheiro gerado tem 78 KB.
    asOf: '2026-09',
    source: 'OpenStreetMap',
    // O OSM muda todos os dias, mas o contorno de uma mata não. Uma revisão
    // por semestre apanha jardins novos sem refazer a carta por nada.
    refreshEvery: 6,
    usedIn: 'lib/green-spaces (scripts/build-green-spaces.mjs)',
  },
  {
    id: 'maquetas-urbanas',
    label: 'Edificado e altimetria das maquetas urbanas',
    // O mesmo MODEL_FETCHED_AT que o gerador escreveu em lib/urban-zones.ts.
    asOf: '2026-09',
    source: 'OpenStreetMap · EU-DEM (Copernicus)',
    // O edificado de uma rua feita muda devagar, e o terreno não muda de
    // todo. O que envelhece é a cobertura de `building:levels`, que sobe à
    // medida que alguém a preenche — refazer por semestre levanta os
    // edifícios que entretanto ganharam altura publicada.
    refreshEvery: 6,
    usedIn: 'lib/urban-zones (scripts/build-urban-model.mjs)',
  },
  {
    id: 'agua-qualidade',
    label: 'Estado da qualidade da água da rede',
    asOf: '2025',
    source: 'ERSAR · Águas de Coimbra',
    // O selo do regulador é anual; os boletins da entidade gestora são
    // trimestrais. Rever uma vez por ano chega para o estado.
    refreshEvery: 12,
    usedIn: 'app/api/water-quality',
  },
  {
    id: 'agenda-cultural',
    label: 'Datas dos eventos anuais',
    asOf: '2025',
    source: 'Organizadores',
    // As datas mudam todos os anos; rever antes de cada época.
    refreshEvery: 12,
    usedIn: 'CultureSection',
  },
  // Vigiados mesmo sendo obtidos em directo: assinalam quando o INE publica
  // um período novo, para se saber que o número no site mudou sozinho.
  {
    id: 'pordata',
    label: 'Retrato do Município (directo)',
    asOf: '2025',
    source: 'PORDATA',
    refreshEvery: 12,
    usedIn: 'app/api/pordata',
  },
  {
    id: 'populacao-ine',
    label: 'População residente (directo)',
    asOf: '2023',
    source: 'INE · Estimativas anuais',
    refreshEvery: 12,
    ineVarcd: '0008273',
    usedIn: 'app/api/demografia',
  },
  {
    id: 'estrangeiros-ine',
    label: 'Estrangeiros e nacionalidades (directo)',
    asOf: '2023',
    source: 'INE',
    refreshEvery: 12,
    ineVarcd: '0013219',
    usedIn: 'app/api/demografia',
  },
  {
    id: 'ganho-ine',
    label: 'Ganho médio mensal (directo)',
    asOf: '2024',
    source: 'INE · MTSSS/GEP',
    refreshEvery: 12,
    ineVarcd: '0012656',
    usedIn: 'app/api/demografia',
  },
]
