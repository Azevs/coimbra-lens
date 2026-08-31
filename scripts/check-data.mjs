#!/usr/bin/env node
/**
 * Verificador de frescura dos dados de referência.
 *
 *   npm run check:data
 *
 * Faz duas coisas por cada valor fixo declarado no manifesto TRACKED de
 * lib/reference-data.ts:
 *
 *   1. compara o período do valor com a cadência de publicação da fonte, e
 *      assinala o que já devia ter sido revisto;
 *   2. quando há um indicador do INE associado, pergunta ao INE qual é o
 *      último período publicado — se for mais recente do que o do site,
 *      isso é uma actualização concreta à espera de ser feita.
 *
 * Sai com código 1 se houver algo por actualizar, para poder correr em CI.
 *
 * O manifesto é importado directamente do TypeScript (o Node 22 remove os
 * tipos com --experimental-strip-types). Nada de ler o ficheiro com regex:
 * uma verificação de dados que se engana a ler-se a si própria não serve.
 */

import { TRACKED } from '../lib/reference-data.ts'

const INE_META = (varcd) =>
  `https://www.ine.pt/ine/json_indicador/pindicaMeta.jsp?varcd=${varcd}&lang=PT`

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const GREEN = '\x1b[32m'
const BOLD = '\x1b[1m'

/** Meses decorridos desde o fim do período indicado ('YYYY' ou 'YYYY-MM'). */
function monthsSince(asOf) {
  const [y, mo] = asOf.split('-')
  // Um valor anual só existe depois de o ano acabar.
  const end = new Date(Number(y), mo ? Number(mo) : 12, 0)
  const now = new Date()
  return (now.getFullYear() - end.getFullYear()) * 12 + (now.getMonth() - end.getMonth())
}

async function latestInePeriod(varcd) {
  try {
    const res = await fetch(INE_META(varcd), { signal: AbortSignal.timeout(30000) })
    if (!res.ok) return null
    const json = await res.json()
    return json?.[0]?.UltimoPeriodo ?? null
  } catch {
    return null
  }
}

async function main() {
  const today = new Date().toISOString().slice(0, 10)
  console.log(`\n${BOLD}Frescura dos dados de referência${RESET}`)
  console.log(`${DIM}${TRACKED.length} valores vigiados · hoje ${today}${RESET}\n`)

  // Perguntar primeiro à fonte: se o INE ainda não publicou período mais
  // recente, o valor do site está correcto e a cadência não interessa.
  // Avisar nesse caso seria dar alarme sobre algo que não tem correcção.
  const upstream = new Map()
  for (const d of TRACKED.filter((t) => t.ineVarcd)) {
    upstream.set(d.id, await latestInePeriod(d.ineVarcd))
  }

  const overdue = []
  const behind = []

  for (const d of TRACKED) {
    const age = monthsSince(d.asOf)
    const latest = upstream.get(d.id)
    const confirmed = latest != null && latest <= d.asOf
    const late = !confirmed && age > d.refreshEvery

    if (latest != null && latest > d.asOf) behind.push({ ...d, latest })
    if (late) overdue.push({ ...d, age })

    const bullet = late ? `${YELLOW}!${RESET}` : `${GREEN}·${RESET}`
    const status = confirmed
      ? `${GREEN}confirmado na fonte${RESET}`
      : late
        ? `${YELLOW}${age - d.refreshEvery} meses de atraso${RESET}`
        : `${GREEN}em dia${RESET}`

    console.log(
      `  ${bullet} ${d.label.padEnd(36)} ${DIM}${d.asOf.padEnd(5)}${RESET} ` +
        `${String(age).padStart(3)}m  ${status.padEnd(28)} ${DIM}${d.usedIn}${RESET}`,
    )
  }

  console.log()

  if (behind.length > 0) {
    console.log(`${RED}${BOLD}${behind.length} indicador(es) com período mais recente na fonte:${RESET}`)
    for (const d of behind) console.log(`   · ${d.label} → actualizar ${d.usedIn} para ${d.latest}`)
    console.log()
  }

  if (overdue.length > 0) {
    console.log(`${YELLOW}${BOLD}${overdue.length} valor(es) fora do prazo de revisão:${RESET}`)
    for (const d of overdue) console.log(`   · ${d.label} ${DIM}(${d.source}, ${d.asOf}) → ${d.usedIn}${RESET}`)
    console.log(
      `\n${DIM}Confirme na fonte e actualize lib/reference-data.ts. Se a cadência de\n` +
        `publicação mudou, ajuste refreshEvery em vez de silenciar o aviso.${RESET}\n`,
    )
  }

  if (overdue.length === 0 && behind.length === 0) {
    console.log(`${GREEN}Tudo dentro do prazo.${RESET}\n`)
  }

  process.exit(overdue.length > 0 || behind.length > 0 ? 1 : 0)
}

main()
