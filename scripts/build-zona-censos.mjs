#!/usr/bin/env node
/**
 * Os Censos dentro de cada zona urbana — `node scripts/build-zona-censos.mjs`
 *
 * Lê só os geopackages da BGRI que o gerador do Território já descarregou
 * (`scripts/data/bgri/`, ver `build-bgri.mjs`): não faz pedidos ao INE. E lê
 * o contorno do corredor de cada zona reconstituída, da cena que o
 * `build-urban-model.mjs` escreveu. Escreve `lib/zona-censos.ts`.
 *
 * QUE SUBSECÇÕES CONTAM
 *
 * A subsecção estatística é o quarteirão do INE; o corredor não respeita
 * quarteirões. Conta uma subsecção quando o seu centro (de área) cai dentro
 * do corredor — a mesma regra dos edifícios da maqueta, que contam pelo
 * centro. É uma convenção declarada: as da orla entram ou saem inteiras, e
 * a página diz quantas são. Nunca se reparte uma subsecção por área: isso
 * seria supor que a gente se distribui por igual dentro do quarteirão.
 *
 * O concelho inteiro vai ao lado, pela mesma soma, para a comparação.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { gpkgPath, lerGeometria, areaECentro, dentro } from './lib/bgri.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'lib', 'zona-censos.ts')
const ZONAS = ['baixa']
const DICO = '0603'

const { DatabaseSync } = await import('node:sqlite')
for (const ano of [2021, 2011]) {
  if (!gpkgPath(ano)) throw new Error(`Falta a BGRI ${ano}: correr \`node scripts/build-bgri.mjs --pedir\` (faz pedidos ao INE).`)
}
const db21 = new DatabaseSync(gpkgPath(2021), { readOnly: true })
const db11 = new DatabaseSync(gpkgPath(2011), { readOnly: true })

const sub21 = db21
  .prepare(
    `select geom,
            N_INDIVIDUOS p, N_INDIVIDUOS_0_14 a, N_INDIVIDUOS_15_24 b, N_INDIVIDUOS_25_64 c, N_INDIVIDUOS_65_OU_MAIS e,
            N_EDIFICIOS_CLASSICOS ed, N_EDIFICIOS_CONSTR_ANTES_1945 e45, N_EDIFICIOS_CONSTR_1946_1980 e80,
            N_EDIFICIOS_CONSTR_1981_2000 e00, N_EDIFICIOS_CONSTR_2001_2010 e10, N_EDIFICIOS_CONSTR_2011_2021 e21,
            N_EDIFICIOS_COM_NECESSIDADES_REPARACAO rep,
            N_ALOJAMENTOS_FAM_CLASS_RHABITUAL rh, N_ALOJAMENTOS_FAM_CLASS_VAGOS_OU_RESID_SECUNDARIA vs,
            N_RHABITUAL_ARRENDADOS arr
     from "BGRI2021_${DICO}"`
  )
  .all()
  .map((r) => ({ ...r, ...areaECentro(lerGeometria(r.geom)) }))

const sub11 = db11
  .prepare(`select Shape geom, N_INDIVIDUOS_RESIDENT p, N_INDIVIDUOS_RESIDENT_65 e from "BGRI2011_${DICO}"`)
  .all()
  .map((r) => ({ ...r, ...areaECentro(lerGeometria(r.geom)) }))

const soma = (l, k) => l.reduce((t, s) => t + (s[k] ?? 0), 0)

/** Os totais de um conjunto de subsecções de 2021. */
function contas(l) {
  return {
    subseccoes: l.length,
    residentes: soma(l, 'p'),
    idade: { ate14: soma(l, 'a'), de15a24: soma(l, 'b'), de25a64: soma(l, 'c'), mais65: soma(l, 'e') },
    edificios: soma(l, 'ed'),
    epoca: { ate1945: soma(l, 'e45'), de1946a1980: soma(l, 'e80'), de1981a2000: soma(l, 'e00'), de2001a2010: soma(l, 'e10'), de2011a2021: soma(l, 'e21') },
    reparacao: soma(l, 'rep'),
    alojamentos: soma(l, 'rh') + soma(l, 'vs'),
    residenciaHabitual: soma(l, 'rh'),
    vagosOuSecundarios: soma(l, 'vs'),
    arrendados: soma(l, 'arr'),
  }
}

const zonas = {}
for (const id of ZONAS) {
  const cenaPath = join(ROOT, 'scripts', 'blender', `${id}.scene.json`)
  if (!existsSync(cenaPath)) throw new Error(`falta ${cenaPath}: correr o build-urban-model.mjs`)
  const cena = JSON.parse(readFileSync(cenaPath, 'utf8'))
  if (!cena.recorte || !cena.origem) throw new Error(`${id}: a cena não traz recorte e origem (zona reconstituída?)`)
  const [CX, CY] = cena.origem
  const corredor = [[cena.recorte.map(([x, y]) => [x + CX, y + CY])]]
  const noCorredor = (s) => dentro(s.x, s.y, corredor)
  const s21 = sub21.filter(noCorredor)
  const s11 = sub11.filter(noCorredor)
  zonas[id] = {
    ...contas(s21),
    em2011: { subseccoes: s11.length, residentes: soma(s11, 'p'), mais65: soma(s11, 'e') },
  }
  console.log(
    `${id}: ${s21.length} subsecções de 2021, ${zonas[id].residentes} residentes; ` +
      `${s11.length} de 2011, ${zonas[id].em2011.residentes} residentes`
  )
}
const concelho = { ...contas(sub21), em2011: { subseccoes: sub11.length, residentes: soma(sub11, 'p'), mais65: soma(sub11, 'e') } }

writeFileSync(
  OUT,
  `/**
 * GERADO por \`node scripts/build-zona-censos.mjs\` — não editar à mão.
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

export const CENSOS_ZONAS: Record<string, CensosZona> = ${JSON.stringify(zonas, null, 2)}

export const CENSOS_CONCELHO: CensosZona = ${JSON.stringify(concelho, null, 2)}
`
)
console.log(`Escrito ${OUT}`)
