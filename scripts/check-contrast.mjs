#!/usr/bin/env node
/**
 * Verificador de contraste dos tokens de cor.
 *
 *   npm run check:contrast
 *
 * Lê as variáveis de app/globals.css, calcula o rácio WCAG 2.1 de cada
 * token de texto e de gráfico contra os três fundos do painel, e falha se
 * algum ficar abaixo do mínimo.
 *
 * Existe porque um dos tokens (--text-tertiary, a 2.97:1) andou a servir
 * de cor a texto de 9px no ticker. Um olho treinado não distingue 2.9 de
 * 4.5 num ecrã escuro; uma conta distingue.
 *
 * Mínimos aplicados:
 *   texto normal      4.5:1   (WCAG AA, 1.4.3)
 *   elemento gráfico  3.0:1   (WCAG AA, 1.4.11)
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const BOLD = '\x1b[1m'

const AA_TEXT = 4.5
const AA_GRAPHIC = 3.0

/** Tokens que servem de cor a texto, incluindo texto pequeno. */
const TEXT_TOKENS = [
  'text-primary',
  'text-secondary',
  'text-tertiary',
  'text-data',
  'tone-blue-text',
  'tone-teal-text',
  'tone-amber-text',
  'tone-violet-text',
  'tone-clay-text',
  'tone-slate-text',
  'tone-moss-text',
  'tone-crimson-text',
  'tone-rose-text',
  'accent-text',
]

/** Tokens usados como preenchimento, contorno ou marcador. */
const GRAPHIC_TOKENS = [
  'accent',
  'tone-blue',
  'tone-teal',
  'tone-amber',
  'tone-muted',
  'tone-violet',
  'tone-clay',
  'tone-slate',
  'tone-moss',
  'tone-crimson',
  'tone-rose',
]

/** Os fundos sobre os quais tudo isto assenta. */
const BACKGROUNDS = ['bg-primary', 'bg-secondary', 'bg-sunken', 'bg-raised']

function parseTokens() {
  const css = readFileSync(join(ROOT, 'app', 'globals.css'), 'utf8')
  const tokens = {}
  for (const m of css.matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})\s*;/g)) {
    tokens[m[1]] = m[2]
  }
  return tokens
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

function main() {
  const tokens = parseTokens()
  const backgrounds = BACKGROUNDS.filter((b) => tokens[b])
  const failures = []

  console.log(`\n${BOLD}Contraste dos tokens de cor${RESET}`)
  console.log(`${DIM}WCAG 2.1 · texto ≥ ${AA_TEXT}:1 · gráfico ≥ ${AA_GRAPHIC}:1${RESET}\n`)

  const check = (names, minimum, heading) => {
    console.log(`${BOLD}${heading}${RESET}`)
    for (const name of names) {
      const colour = tokens[name]
      if (!colour) {
        console.log(`  ${DIM}?  --${name} não encontrado${RESET}`)
        continue
      }

      // O pior fundo é o que decide: o token tem de funcionar em todos.
      let worstBg = backgrounds[0]
      let worst = Infinity
      for (const bg of backgrounds) {
        const r = contrast(colour, tokens[bg])
        if (r < worst) {
          worst = r
          worstBg = bg
        }
      }

      const ok = worst >= minimum
      if (!ok) failures.push({ name, colour, worst, worstBg, minimum })

      console.log(
        `  ${ok ? GREEN + '·' + RESET : RED + '!' + RESET} --${name.padEnd(20)} ${DIM}${colour}${RESET} ` +
          `${worst.toFixed(2).padStart(6)}:1  ${DIM}pior sobre --${worstBg}${RESET}`,
      )
    }
    console.log()
  }

  check(TEXT_TOKENS, AA_TEXT, 'Texto')
  check(GRAPHIC_TOKENS, AA_GRAPHIC, 'Gráficos')

  if (failures.length > 0) {
    console.log(`${RED}${BOLD}${failures.length} token(s) abaixo do mínimo:${RESET}`)
    for (const f of failures) {
      console.log(
        `   · --${f.name} (${f.colour}) dá ${f.worst.toFixed(2)}:1 sobre --${f.worstBg}, ` +
          `precisa de ${f.minimum}:1`,
      )
    }
    console.log(`\n${DIM}Clareie o token em app/globals.css, ou passe o uso para a rampa -text.${RESET}\n`)
    process.exit(1)
  }

  console.log(`${GREEN}Todos os tokens passam.${RESET}\n`)
}

main()
