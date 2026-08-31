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
 * A população e a densidade saíram daqui: passaram a ser obtidas em directo
 * do INE em /api/demografia. Os que ficaram mantêm o valor e o período que
 * já tinham — não foram substituídos por estimativas inventadas. Vários
 * estão fora de prazo de revisão, e é isso que o `npm run check:data`
 * assinala.
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
  {
    id: 'desemprego',
    label: 'Taxa de desemprego',
    value: '6.2',
    unit: '%',
    asOf: '2023',
    source: 'INE',
    sourceUrl: 'https://www.ine.pt',
    refreshEvery: 12,
    tone: 'var(--tone-crimson)',
  },
  {
    id: 'rendimento',
    label: 'Rendimento médio líquido',
    value: '1 142',
    unit: '€/mês',
    asOf: '2022',
    source: 'INE',
    sourceUrl: 'https://www.ine.pt',
    refreshEvery: 12,
    tone: 'var(--tone-blue)',
  },
  {
    id: 'estrangeiros',
    label: 'Residentes estrangeiros',
    value: '14 200+',
    unit: 'pessoas',
    asOf: '2024',
    source: 'AIMA',
    sourceUrl: 'https://aima.gov.pt',
    refreshEvery: 12,
    tone: 'var(--tone-violet)',
  },
  {
    id: 'estudantes',
    label: 'Estudantes universitários',
    value: '50 000+',
    unit: 'estudantes',
    asOf: '2024',
    source: 'UC / IPC',
    sourceUrl: 'https://www.uc.pt',
    refreshEvery: 12,
    tone: 'var(--tone-amber)',
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

/** Nacionalidades dos residentes estrangeiros, em percentagem. */
export const NATIONALITIES = {
  asOf: '2024',
  source: 'AIMA',
  sourceUrl: 'https://aima.gov.pt',
  refreshEvery: 12,
  rows: [
    { country: 'Brasil', pct: 34, color: 'var(--tone-moss)' },
    { country: 'Nepal', pct: 18, color: 'var(--tone-crimson)' },
    { country: 'Índia', pct: 12, color: 'var(--tone-amber)' },
    { country: 'China', pct: 9, color: 'var(--tone-clay)' },
    { country: 'Outros', pct: 27, color: 'var(--tone-muted)' },
  ],
}

/** Universidade de Coimbra, por ano lectivo. */
export const UNIVERSITY = {
  asOf: '2024',
  source: 'Universidade de Coimbra',
  sourceUrl: 'https://www.uc.pt',
  refreshEvery: 12,
  totalStudents: 23847,
  international: 3421,
  national: 20426,
  faculties: 8,
  researchers: 1200,
  countries: 68,
}

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
    id: 'nacionalidades',
    label: 'Nacionalidades dos estrangeiros',
    asOf: NATIONALITIES.asOf,
    source: NATIONALITIES.source,
    refreshEvery: NATIONALITIES.refreshEvery,
    usedIn: 'CityOverview',
  },
  {
    id: 'universidade',
    label: 'Números da Universidade',
    asOf: UNIVERSITY.asOf,
    source: UNIVERSITY.source,
    refreshEvery: UNIVERSITY.refreshEvery,
    usedIn: 'AcademicPulse',
  },
  {
    id: 'agua',
    label: 'Qualidade da água da torneira',
    asOf: '2023',
    source: 'ERSAR · RASARP',
    refreshEvery: 12,
    usedIn: 'app/api/water-quality',
  },
  {
    id: 'imobiliario',
    label: 'Preços por m² (modelo)',
    asOf: '2024',
    source: 'Modelo próprio · base INE',
    refreshEvery: 12,
    usedIn: 'RealEstate',
  },
  {
    id: 'mobilidade',
    label: 'Fluxos casa–trabalho (modelo)',
    asOf: '2021',
    source: 'Modelo próprio · base INE',
    refreshEvery: 60,
    usedIn: 'MobilityFlow',
  },
  {
    id: 'freguesias-dados',
    label: 'População e rendimento por freguesia',
    asOf: '2021',
    source: 'INE · Censos',
    refreshEvery: 120,
    usedIn: 'lib/mapbox-config',
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
  {
    // Vigiado mesmo sendo obtido em directo: assinala quando o INE publica
    // um ano novo, para se saber que o número no site mudou.
    id: 'populacao-ine',
    label: 'População residente (em directo)',
    asOf: '2023',
    source: 'INE · Estimativas anuais',
    refreshEvery: 12,
    ineVarcd: '0008273',
    usedIn: 'app/api/demografia',
  },
]
