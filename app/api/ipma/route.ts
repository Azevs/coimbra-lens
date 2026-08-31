import { live, unavailable, type Sourced } from '@/lib/provenance'

// IPMA — Instituto Português do Mar e da Atmosfera. API aberta, sem chave.
//
// Dois produtos num só módulo, porque respondem à mesma pergunta prática
// ("tenho de ter cuidado com alguma coisa hoje?"):
//   · avisos meteorológicos por área — Coimbra é a área CBR
//   · risco de incêndio rural por concelho — Coimbra é o DICO 0603
//
// Na região Centro o risco de incêndio não é decorativo, e é dos poucos
// indicadores públicos que muda todos os dias.
const WARNINGS_URL = 'https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json'
const FIRE_URL = 'https://api.ipma.pt/open-data/forecast/meteorology/rcm/rcm-d0.json'

/** Área de aviso de Coimbra. */
const AREA = 'CBR'
/** Código DICO do concelho de Coimbra. */
const DICO = '0603'

const SOURCE = 'IPMA'

export type WarningLevel = 'green' | 'yellow' | 'orange' | 'red'

export interface Warning {
  type: string
  level: WarningLevel
  startTime: string
  endTime: string
  text: string
}

export interface FireRisk {
  /** 1–5 na escala RCM do IPMA. */
  level: number
  label: string
  /** Dia a que a previsão se refere. */
  date: string
}

export interface IpmaPayload {
  /** Só os avisos activos acima de verde. Verde significa "sem aviso". */
  warnings: Warning[]
  /** Nível mais grave em vigor, ou 'green' se não houver nenhum. */
  maxLevel: WarningLevel
  fire: FireRisk | null
  meta: Sourced
}

const LEVEL_ORDER: Record<WarningLevel, number> = { green: 0, yellow: 1, orange: 2, red: 3 }

/** Escala do Risco de Incêndio Rural do IPMA. */
const FIRE_LABELS: Record<number, string> = {
  1: 'Reduzido',
  2: 'Moderado',
  3: 'Elevado',
  4: 'Muito elevado',
  5: 'Máximo',
}

interface RawWarning {
  awarenessTypeName?: string
  awarenessLevelID?: string
  idAreaAviso?: string
  startTime?: string
  endTime?: string
  text?: string
}

function isLevel(v: unknown): v is WarningLevel {
  return v === 'green' || v === 'yellow' || v === 'orange' || v === 'red'
}

async function fetchWarnings(): Promise<{ warnings: Warning[]; maxLevel: WarningLevel } | null> {
  const res = await fetch(WARNINGS_URL, { next: { revalidate: 900 } })
  if (!res.ok) return null

  const raw: unknown = await res.json()
  if (!Array.isArray(raw)) return null

  const mine = (raw as RawWarning[]).filter((w) => w.idAreaAviso === AREA)
  if (mine.length === 0) return null

  const warnings: Warning[] = mine
    .filter((w) => isLevel(w.awarenessLevelID) && w.awarenessLevelID !== 'green')
    .map((w) => ({
      type: w.awarenessTypeName?.trim() || 'Aviso',
      level: w.awarenessLevelID as WarningLevel,
      startTime: w.startTime ?? '',
      endTime: w.endTime ?? '',
      text: w.text?.trim() ?? '',
    }))
    .sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level])

  const maxLevel = warnings.reduce<WarningLevel>(
    (acc, w) => (LEVEL_ORDER[w.level] > LEVEL_ORDER[acc] ? w.level : acc),
    'green',
  )

  return { warnings, maxLevel }
}

async function fetchFireRisk(): Promise<FireRisk | null> {
  const res = await fetch(FIRE_URL, { next: { revalidate: 3600 } })
  if (!res.ok) return null

  const data = await res.json()
  const entry = data?.local?.[DICO]
  const level = entry?.data?.rcm

  if (typeof level !== 'number' || !FIRE_LABELS[level]) return null

  return { level, label: FIRE_LABELS[level], date: data?.dataPrev ?? '' }
}

export async function GET() {
  try {
    // Uma falha isolada não deve derrubar a outra metade do módulo.
    const [w, fire] = await Promise.all([
      fetchWarnings().catch(() => null),
      fetchFireRisk().catch(() => null),
    ])

    if (!w && !fire) {
      return Response.json({
        warnings: [],
        maxLevel: 'green',
        fire: null,
        meta: unavailable(SOURCE, 'O IPMA não respondeu.'),
      } satisfies IpmaPayload)
    }

    return Response.json({
      warnings: w?.warnings ?? [],
      maxLevel: w?.maxLevel ?? 'green',
      fire,
      meta: live(SOURCE),
    } satisfies IpmaPayload)
  } catch {
    return Response.json({
      warnings: [],
      maxLevel: 'green',
      fire: null,
      meta: unavailable(SOURCE, 'Não foi possível contactar o IPMA.'),
    } satisfies IpmaPayload)
  }
}
