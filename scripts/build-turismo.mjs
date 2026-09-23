/**
 * Gerador dos dados da página de Turismo.
 *
 *   node scripts/build-turismo.mjs --max 5    # pede ao INE no máximo 5 indicadores em falta
 *   node scripts/build-turismo.mjs --offline  # não pede nada, só reconstrói
 *
 * Duas fases, separadas de propósito:
 *
 *   1. PEDIR — um pedido por indicador e por período, filtrado a Coimbra
 *      (`Dim1` + `Dim2`). Sem `Dim1` o INE devolve só o último período, não
 *      a série. Cada resposta fica em `scripts/data/ine/{varcd}/{período}.json`,
 *      no repositório, e nunca volta a ser pedida: o histórico não muda.
 *
 *      Os pedidos vão em série, com 2 minutos entre eles, e a primeira falha
 *      pára tudo — sem novas tentativas. O INE fecha a porta a quem insiste
 *      (em Setembro de 2026 recusou o segundo pedido de uma série a 15 s), e
 *      um bloqueio aqui deixa o site inteiro sem demografia. Retoma-se onde
 *      parou; `--max` limita o que uma corrida pode pedir.
 *
 *   2. CONSTRUIR — lê só esses ficheiros e escreve `lib/turismo-coimbra.ts`.
 *      Não toca na rede; pode correr-se as vezes que for preciso.
 *
 * O site nunca pergunta nada ao INE sobre turismo: lê o ficheiro gerado.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIR_RAW = join(ROOT, 'scripts', 'data', 'ine')
const OUT_TS = join(ROOT, 'lib', 'turismo-coimbra.ts')

const INE_DATA = 'https://www.ine.pt/ine/json_indicador/pindica.jsp'
/** Município de Coimbra, NUTS 2024 — o mesmo código dos estrangeiros na demografia. */
const GEO = '1920603'
const PAUSA_MS = 120_000
const USER_AGENT = 'CoimbraLens/1.0 (gerador da página de Turismo; pedidos espaçados)'

/**
 * Os indicadores da página. Todos NUTS 2024, todos do IPHH. Os códigos
 * vieram do catálogo do dados.gov.pt, não de varrimentos à API do INE.
 * As chaves acabadas em `Mes` são mensais; as outras, anuais.
 *
 * A ordem é a de prioridade: se o INE fechar a porta a meio, o que chegou
 * primeiro é o que a página mais precisa.
 */
const INDICADORES = {
  dormidas: '0013214',
  hospedes: '0013213',
  proveitos: '0013285',
  hospedesOrigem: '0013212',
  estadaMedia: '0013287',
  ocupacaoCama: '0013288',
  camas: '0013366',
  estabelecimentos: '0013284',
  revpar: '0013207',
  proveitosAposento: '0013286',
  dormidasPor100Hab: '0013210',
  dormidasVerao: '0013313',
}

/** Primeiro ano pedido nas séries anuais; as mensais cobrem os últimos 36 meses. */
const ANO_INICIAL = 2015
const MESES_HISTORICO = 36

const argv = process.argv.slice(2)
const OFFLINE = argv.includes('--offline')
const MAX = argv.includes('--max') ? Number(argv[argv.indexOf('--max') + 1]) || 0 : 0
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const mensal = (chave) => chave.endsWith('Mes')
const dirSerie = (varcd) => join(DIR_RAW, varcd)
const rawPath = (varcd, dim1) => join(dirSerie(varcd), `${dim1}.json`)

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

/** "2024" → {ano: 2024, mes: null}; "Julho de 2026" → {ano: 2026, mes: 7}. */
function periodo(p) {
  const s = String(p).trim().toLowerCase()
  if (/^\d{4}$/.test(s)) return { ano: Number(s), mes: null }
  const m = s.match(/^(\S+) de (\d{4})$/)
  if (m && MESES.includes(m[1])) return { ano: Number(m[2]), mes: MESES.indexOf(m[1]) + 1 }
  return null
}

/** Códigos de período do INE: S7A2024 (ano), S3A202607 (mês). */
const dimAno = (ano) => `S7A${ano}`
const dimMes = (ano, mes) => `S3A${ano}${String(mes).padStart(2, '0')}`

// ─── 1. PEDIR ────────────────────────────────────────────────────────────

/** Os períodos que uma série deve ter, até ao último que o INE declara. */
function periodosDesejados(chave, ultimo) {
  const u = periodo(ultimo)
  if (!u) return []
  const out = []
  if (!mensal(chave)) {
    for (let a = u.ano; a >= ANO_INICIAL; a--) out.push(dimAno(a))
    return out
  }
  let a = u.ano
  let m = u.mes
  for (let i = 0; i < MESES_HISTORICO; i++) {
    out.push(dimMes(a, m))
    if (--m === 0) {
      m = 12
      a--
    }
  }
  return out
}

function respostasGuardadas(varcd) {
  if (!existsSync(dirSerie(varcd))) return []
  return readdirSync(dirSerie(varcd))
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(dirSerie(varcd), f), 'utf8'))[0])
}

/** O último período publicado, pelo `UltimoPref` de uma resposta já guardada. */
function ultimoConhecido(varcd) {
  return respostasGuardadas(varcd).find((r) => r?.UltimoPref)?.UltimoPref ?? null
}

/** Um pedido. Devolve a resposta ou lança — quem chama pára tudo. */
async function pedirUm(varcd, dim1) {
  const url = `${INE_DATA}?op=2&varcd=${varcd}${dim1 ? `&Dim1=${dim1}` : ''}&Dim2=${GEO}&lang=PT`
  const r = await fetch(url, { signal: AbortSignal.timeout(60_000), headers: { 'User-Agent': USER_AGENT } })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const json = await r.json()
  if (!Array.isArray(json) || !json[0]?.Dados) {
    // O INE respondeu, mas recusou o pedido: não é bloqueio, é este pedido.
    const msg = json?.[0]?.Sucesso?.Falso?.[0]?.Msg
    if (msg) throw Object.assign(new Error(msg), { recusa: true })
    throw new Error('resposta sem "Dados"')
  }
  return json
}

/** Guarda uma resposta pelo período que ela própria traz. */
function guardar(varcd, json) {
  const p = Object.keys(json[0].Dados)[0]
  const per = p && periodo(p)
  if (!per) throw new Error(`período por interpretar "${p}"`)
  const dim1 = per.mes ? dimMes(per.ano, per.mes) : dimAno(per.ano)
  mkdirSync(dirSerie(varcd), { recursive: true })
  writeFileSync(rawPath(varcd, dim1), JSON.stringify(json))
  return dim1
}

/**
 * A fila de pedidos: um por indicador, com `Dim1=T`, que devolve todos os
 * períodos de Coimbra de uma vez (testado a 23-09-2026; uma lista de
 * períodos separados por vírgulas é recusada). Fica em `{varcd}/T.json`.
 */
async function pedir() {
  let feitos = 0
  for (const [chave, varcd] of Object.entries(INDICADORES)) {
    if (existsSync(rawPath(varcd, 'T'))) continue
    if (MAX && feitos >= MAX) break
    try {
      if (feitos > 0) await sleep(PAUSA_MS)
      feitos++
      const json = await pedirUm(varcd, 'T')
      mkdirSync(dirSerie(varcd), { recursive: true })
      writeFileSync(rawPath(varcd, 'T'), JSON.stringify(json))
      console.log(`✓ ${chave} (${varcd}) — ${Object.keys(json[0].Dados).join(', ')}`)
    } catch (e) {
      if (e.recusa) {
        console.warn(`– ${chave} (${varcd}): o INE recusou — ${e.message}`)
        continue
      }
      console.error(`
✗ ${chave} (${varcd}): ${e.message}`)
      console.error('Parado — sem novas tentativas. O que já chegou fica guardado; retoma-se onde parou.')
      process.exitCode = 1
      break
    }
  }
  console.log(`${feitos} pedido(s) ao INE nesta corrida.`)
}

/** Quantos pedidos faltam para ter tudo — sem tocar na rede. */
function emFalta() {
  return Object.values(INDICADORES).filter((v) => !existsSync(rawPath(v, 'T'))).length
}

// ─── 2. CONSTRUIR ────────────────────────────────────────────────────────

function numero(v) {
  if (v === undefined || v === null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

function construir() {
  const indicadores = {}
  const avisos = []

  for (const [chave, varcd] of Object.entries(INDICADORES)) {
    const respostas = respostasGuardadas(varcd)
    if (!respostas.length) {
      avisos.push(`${chave} (${varcd}): sem ficheiros — fica de fora`)
      continue
    }
    // Metadados da resposta mais recente.
    const raw = respostas.reduce((a, b) => ((b.DataExtracao ?? '') > (a.DataExtracao ?? '') ? b : a))
    const categorias = {}
    const pontos = []

    for (const r of respostas) {
      for (const [p, linhas] of Object.entries(r.Dados)) {
        const per = periodo(p)
        if (!per) {
          avisos.push(`${chave}: período por interpretar "${p}"`)
          continue
        }
        const v = {}
        // Confirmar a geografia: um filtro ignorado passaria outro território.
        for (const l of linhas.filter((l) => l.geocod === GEO)) {
          const cod = [l.dim_3, l.dim_4].filter(Boolean).join('|') || 'T'
          categorias[cod] = [l.dim_3_t, l.dim_4_t].filter(Boolean).join(' · ') || 'Total'
          // Sem valor (confidencial, nulo) fica null — nunca zero.
          v[cod] = numero(l.valor)
        }
        if (Object.keys(v).length && !pontos.some((x) => x.p === p)) pontos.push({ p, ...per, v })
      }
    }

    pontos.sort((a, b) => a.ano - b.ano || (a.mes ?? 0) - (b.mes ?? 0))
    indicadores[chave] = {
      varcd,
      nome: raw.IndicadorDsg ?? '',
      atualizado: raw.DataUltimoAtualizacao ?? null,
      ultimo: raw.UltimoPref ?? null,
      categorias,
      pontos,
    }
    console.log(
      `  ${chave.padEnd(18)} ${String(pontos.length).padStart(3)} período(s)  ${pontos[0]?.p} → ${pontos.at(-1)?.p}`,
    )
  }

  const chaves = Object.keys(INDICADORES).map((k) => `'${k}'`).join(' | ')
  const ts = `/**
 * GERADO por \`node scripts/build-turismo.mjs\` — não editar à mão.
 *
 * Séries do Inquérito à permanência de hóspedes na hotelaria e outros
 * alojamentos (INE), município de Coimbra (NUTS 2024: ${GEO}). Um valor
 * \`null\` é um valor que o INE não publica (confidencial ou nulo) —
 * nunca um zero.
 */

export interface PontoTurismo {
  /** Período tal como o INE o escreve. */
  p: string
  ano: number
  /** 1–12 nas séries mensais; null nas anuais. */
  mes: number | null
  /** Valor por código de categoria. */
  v: Record<string, number | null>
}

export interface SerieTurismo {
  varcd: string
  nome: string
  atualizado: string | null
  /** Último período que o INE declarava publicado quando se pediu. */
  ultimo: string | null
  categorias: Record<string, string>
  pontos: PontoTurismo[]
}

export type ChaveTurismo = ${chaves}

export const TURISMO: Partial<Record<ChaveTurismo, SerieTurismo>> = ${JSON.stringify(indicadores, null, 1)}
`
  writeFileSync(OUT_TS, ts)
  console.log(`\nEscrito ${OUT_TS} (${(ts.length / 1024).toFixed(0)} KB)`)
  for (const a of avisos) console.warn(`  aviso: ${a}`)
  console.log(`Faltam cerca de ${emFalta()} pedido(s) ao INE para as séries completas.`)
}

if (!OFFLINE) await pedir()
construir()
