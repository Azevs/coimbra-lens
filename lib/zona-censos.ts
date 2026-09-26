/**
 * GERADO por `node scripts/build-zona-censos.mjs` — não editar à mão.
 *
 * Os Censos de 2021 (e os residentes de 2011) nas subsecções estatísticas
 * da BGRI do INE cujo centro cai dentro do corredor de cada zona urbana, e
 * no concelho inteiro pela mesma soma. Contagens, não estimativas: nenhuma
 * subsecção é repartida.
 */

export interface CensosZona {
  /** Subsecções da BGRI 2021 com o centro dentro do corredor. */
  subseccoes: number
  residentes: number
  idade: { ate14: number; de15a24: number; de25a64: number; mais65: number }
  /** Edifícios clássicos, e por época de construção. */
  edificios: number
  epoca: { ate1945: number; de1946a1980: number; de1981a2000: number; de2001a2010: number; de2011a2021: number }
  /** Edifícios com necessidades de reparação. */
  reparacao: number
  /** Alojamentos familiares clássicos: de residência habitual + vagos ou de residência secundária. */
  alojamentos: number
  residenciaHabitual: number
  vagosOuSecundarios: number
  /** Dos de residência habitual, os arrendados. */
  arrendados: number
  /** A BGRI 2011, pelas subsecções de 2011 com o centro no corredor. */
  em2011: { subseccoes: number; residentes: number; mais65: number }
}

export const CENSOS_ZONAS: Record<string, CensosZona> = {
  "baixa": {
    "subseccoes": 29,
    "residentes": 1295,
    "idade": {
      "ate14": 120,
      "de15a24": 114,
      "de25a64": 683,
      "mais65": 378
    },
    "edificios": 701,
    "epoca": {
      "ate1945": 407,
      "de1946a1980": 190,
      "de1981a2000": 49,
      "de2001a2010": 34,
      "de2011a2021": 21
    },
    "reparacao": 497,
    "alojamentos": 1697,
    "residenciaHabitual": 618,
    "vagosOuSecundarios": 1079,
    "arrendados": 467,
    "em2011": {
      "subseccoes": 48,
      "residentes": 1334,
      "mais65": 519
    }
  }
}

export const CENSOS_CONCELHO: CensosZona = {
  "subseccoes": 1848,
  "residentes": 140816,
  "idade": {
    "ate14": 16520,
    "de15a24": 13885,
    "de25a64": 74877,
    "mais65": 35534
  },
  "edificios": 40701,
  "epoca": {
    "ate1945": 4431,
    "de1946a1980": 17278,
    "de1981a2000": 11837,
    "de2001a2010": 6091,
    "de2011a2021": 1064
  },
  "reparacao": 18475,
  "alojamentos": 81872,
  "residenciaHabitual": 59940,
  "vagosOuSecundarios": 21932,
  "arrendados": 15385,
  "em2011": {
    "subseccoes": 2514,
    "residentes": 143396,
    "mais65": 28786
  }
}
