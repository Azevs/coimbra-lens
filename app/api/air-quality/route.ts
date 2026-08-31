import { live, unavailable, type Sourced } from '@/lib/provenance'

// Open-Meteo Air Quality — modelo CAMS europeu, sem chave.
// Substitui a OpenAQ v2, desligada permanentemente (HTTP 410 Gone).
// Devolve o European AQI já calculado pela norma da AEA, e pólen real
// da mesma corrida do modelo — o que dispensa a tabela sazonal fixa.
const AIR_URL =
  'https://air-quality-api.open-meteo.com/v1/air-quality' +
  '?latitude=40.2033&longitude=-8.4195' +
  '&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide,' +
  'alder_pollen,birch_pollen,grass_pollen,olive_pollen' +
  '&timezone=Europe%2FLisbon'

const SOURCE = 'Open-Meteo · CAMS'

export interface Pollen {
  key: string
  label: string
  /** grãos/m³ */
  value: number
  level: PollenLevel
}

export type PollenLevel = 'baixo' | 'moderado' | 'alto' | 'muito-alto'

export interface AirQualityPayload {
  /** European AQI (escala 0–100+, ao contrário do AQI norte-americano). */
  aqi: number | null
  scale: 'EAQI'
  status: string | null
  pm25: number | null
  pm10: number | null
  no2: number | null
  o3: number | null
  pollen: Pollen[]
  meta: Sourced
}

/**
 * Bandas do European Air Quality Index (Agência Europeia do Ambiente).
 * Nada a ver com a escala 0–500 da EPA — o cálculo anterior (pm25 × 4.2)
 * não correspondia a nenhuma das duas.
 */
function getStatus(eaqi: number): string {
  if (eaqi <= 20) return 'Boa'
  if (eaqi <= 40) return 'Razoável'
  if (eaqi <= 60) return 'Média'
  if (eaqi <= 80) return 'Fraca'
  if (eaqi <= 100) return 'Muito fraca'
  return 'Extremamente fraca'
}

/**
 * Limiares por espécie, em grãos/m³. As espécies arbóreas têm limiares
 * mais baixos do que as gramíneas para o mesmo efeito clínico.
 */
const POLLEN_THRESHOLDS: Record<string, [number, number, number]> = {
  grass_pollen: [20, 50, 200],
  olive_pollen: [20, 100, 400],
  birch_pollen: [10, 50, 200],
  alder_pollen: [10, 50, 200],
}

const POLLEN_LABELS: Record<string, string> = {
  grass_pollen: 'Gramíneas',
  olive_pollen: 'Oliveira',
  birch_pollen: 'Bétula',
  alder_pollen: 'Amieiro',
}

function pollenLevel(key: string, value: number): PollenLevel {
  const [low, mid, high] = POLLEN_THRESHOLDS[key] ?? [20, 50, 200]
  if (value < low) return 'baixo'
  if (value < mid) return 'moderado'
  if (value < high) return 'alto'
  return 'muito-alto'
}

function round(v: unknown, decimals = 1): number | null {
  if (typeof v !== 'number' || Number.isNaN(v)) return null
  const f = 10 ** decimals
  return Math.round(v * f) / f
}

/** Resposta quando a fonte falha: sem números, com a razão. */
function noData(note: string): AirQualityPayload {
  return {
    aqi: null,
    scale: 'EAQI',
    status: null,
    pm25: null,
    pm10: null,
    no2: null,
    o3: null,
    pollen: [],
    meta: unavailable(SOURCE, note),
  }
}

export async function GET() {
  try {
    const res = await fetch(AIR_URL, { next: { revalidate: 900 } })
    if (!res.ok) return Response.json(noData(`A fonte respondeu ${res.status}.`))

    const data = await res.json()
    const c = data?.current
    if (!c || typeof c.european_aqi !== 'number') {
      return Response.json(noData('A fonte respondeu sem leitura actual.'))
    }

    const eaqi = Math.round(c.european_aqi)

    const pollen: Pollen[] = Object.keys(POLLEN_LABELS)
      .filter((key) => typeof c[key] === 'number')
      .map((key) => {
        const value = round(c[key], 1) as number
        return { key, label: POLLEN_LABELS[key], value, level: pollenLevel(key, value) }
      })

    const payload: AirQualityPayload = {
      aqi: eaqi,
      scale: 'EAQI',
      status: getStatus(eaqi),
      pm25: round(c.pm2_5),
      pm10: round(c.pm10),
      no2: round(c.nitrogen_dioxide),
      o3: round(c.ozone),
      pollen,
      // A API devolve hora local sem fuso; anexamos o offset de Lisboa.
      meta: live(SOURCE, c.time ? new Date(`${c.time}:00`).toISOString() : null),
    }

    return Response.json(payload)
  } catch {
    return Response.json(noData('Não foi possível contactar a fonte.'))
  }
}
