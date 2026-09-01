import { estimate, unavailable, type Sourced } from '@/lib/provenance'

// PORDATA — Retrato do Município (Fundação Francisco Manuel dos Santos).
//
// Compila do INE e publica mais cedo: a população residente está aqui com
// ano de referência 2025, enquanto a API do INE ainda só serve 2023. Traz
// também habitação, emprego e educação, que o INE não expõe em JSON por
// município.
//
// Não há API — é HTML. Isso é frágil por natureza, e a rota assume-o:
// cada campo é opcional, há uma verificação de coerência interna, e uma
// falha de leitura devolve `unavailable` em vez de um número errado.
const PAGE = (tema: string) => `https://retratos.pordata.pt/${tema}/coimbra`

const SOURCE = 'PORDATA · Retrato do Município'
const METHOD =
  'Lido do Retrato do Município da PORDATA, que compila do INE. Cada valor mostra o seu ano de referência.'

export interface PordataValue {
  value: number | null
  year: string | null
}

export interface PordataPayload {
  population: PordataValue
  density: PordataValue
  /** Homens e mulheres, usados para validar a leitura da população. */
  men: number | null
  women: number | null
  migrationBalance: number | null
  /** Ganho médio mensal dos trabalhadores por conta de outrem. */
  income: PordataValue
  /** Alunos matriculados, do pré-escolar ao pós-secundário não superior. */
  students: PordataValue
  /** Valor mediano de avaliação bancária, €/m². */
  bankValuation: PordataValue
  /** Preço mediano de venda, €/m². */
  saleNew: PordataValue
  saleExisting: PordataValue
  meta: Sourced
}

const NONE: PordataValue = { value: null, year: null }

/**
 * A PORDATA mistura separadores: "1.554" são milhares, "1418.6" é decimal,
 * "28,4" usa vírgula. Decidir pelo contexto em vez de assumir um formato.
 */
function toNumber(raw: string | null | undefined): number | null {
  if (!raw) return null
  const s = raw.trim()
  if (s.includes(',')) {
    const n = Number(s.replace(/\./g, '').replace(',', '.'))
    return Number.isFinite(n) ? n : null
  }
  const lastDot = s.lastIndexOf('.')
  if (lastDot === -1) {
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }
  // Três dígitos depois do último ponto: separador de milhares.
  const decimals = s.length - lastDot - 1
  const n = Number(decimals === 3 ? s.replace(/\./g, '') : s)
  return Number.isFinite(n) ? n : null
}

/** Reduz o HTML a texto com quebras de linha, preservando a ordem visual. */
function toText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+/g, ' ')
}

const first = (t: string, re: RegExp): string | null => t.match(re)?.[1] ?? null

/** Alguns valores nacionais aparecem antes do municipal; interessa o último. */
function last(t: string, re: RegExp): string | null {
  const all = [...t.matchAll(new RegExp(re.source, 'g'))]
  return all.length ? all[all.length - 1][1] : null
}

async function fetchTheme(tema: string): Promise<string | null> {
  try {
    const res = await fetch(PAGE(tema), {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(15_000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'pt-PT,pt;q=0.9',
      },
    })
    if (!res.ok) return null
    return toText(await res.text())
  } catch {
    return null
  }
}

function noData(note: string): PordataPayload {
  return {
    population: NONE,
    density: NONE,
    men: null,
    women: null,
    migrationBalance: null,
    income: NONE,
    students: NONE,
    bankValuation: NONE,
    saleNew: NONE,
    saleExisting: NONE,
    meta: unavailable(SOURCE, note),
  }
}

export async function GET() {
  const [pop, hab, emp, edu] = await Promise.all([
    fetchTheme('populacao'),
    fetchTheme('habitacao'),
    fetchTheme('emprego-e-empresas'),
    fetchTheme('educacao'),
  ])

  if (!pop && !hab && !emp && !edu) {
    return Response.json(noData('A PORDATA não respondeu.'))
  }

  const popYear = pop ? first(pop, /Ano de refer[^:]*:\s*(\d{4})/) : null
  const population = pop ? toNumber(first(pop, /ascendia a\s*([\d.,]+)\s*pessoas/)) : null
  const men = pop ? toNumber(first(pop, /([\d.,]+)\s*\n\s*Homens/)) : null
  const women = pop ? toNumber(first(pop, /([\d.,]+)\s*\n\s*Mulheres/)) : null

  // Coerência interna: homens + mulheres tem de dar a população. Se a
  // página mudar de forma e o parser passar a apanhar outro número, isto
  // apanha-o — é a diferença entre falhar e publicar um valor errado.
  if (population !== null && men !== null && women !== null && men + women !== population) {
    return Response.json(
      noData('A leitura da PORDATA não é coerente (homens + mulheres ≠ população). Página alterada?'),
    )
  }

  const payload: PordataPayload = {
    population: { value: population, year: popYear },
    density: {
      // O valor nacional é mencionado antes do municipal na mesma frase.
      value: pop ? toNumber(last(pop, /\n\s*([\d.,]+)\s*\n+\s*habitantes por km/)) : null,
      year: popYear,
    },
    men,
    women,
    migrationBalance: pop
      ? toNumber(first(pop, /saldo migrat[^\n]*?igual a \+([\d.,]+)/))
      : null,
    income: {
      value: emp ? toNumber(first(emp, /ganhavam por m[êe]s,\s*\n?\s*([\d.,]+)€/)) : null,
      year: emp ? first(emp, /Ano de refer[^:]*:\s*(\d{4})/) : null,
    },
    students: {
      value: edu ? toNumber(first(edu, /estavam matriculados\s*\n?\s*([\d.,]+)\s*\n?\s*alunos/)) : null,
      year: edu ? first(edu, /Ano de refer[^:]*:\s*(\d{4}\/\d{2})/) : null,
    },
    bankValuation: {
      value: hab ? toNumber(first(hab, /atingiu\s*\n?\s*([\d.,]+)€/)) : null,
      year: hab ? first(hab, /Em (\d{4}), o valor mediano da avalia/) : null,
    },
    saleNew: {
      value: hab ? toNumber(first(hab, /foi, em \d{4}, de\s*\n?\s*([\d.,]+)€/)) : null,
      year: hab ? first(hab, /foi, em (\d{4}), de/) : null,
    },
    saleExisting: {
      value: hab
        ? toNumber(first(hab, /\(([\d.,]+)€ por m[²2] para as casas existentes\)/))
        : null,
      year: hab ? first(hab, /foi, em (\d{4}), de/) : null,
    },
    meta: estimate(SOURCE, METHOD, popYear ? `${popYear}-12-31T12:00:00` : null),
  }

  if (population === null) {
    return Response.json(noData('Não foi possível ler a população na PORDATA.'))
  }

  return Response.json(payload)
}
