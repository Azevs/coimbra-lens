#!/usr/bin/env node
/**
 * O autocarro em miniatura da vista aérea — `npm run build:bus`
 *
 * Escreve `public/models/metrobus.glb`: um autocarro articulado estilizado,
 * feito de caixas, na linguagem de maqueta do resto do site. Não imita a
 * pintura da Metro Mondego — é um brinquedo da Gazeta: papel, filete
 * terracota e janelas acesas ao entardecer.
 *
 * O ficheiro escreve-se à mão (cabeçalho GLB, JSON e binário) em vez de
 * passar pelo exportador do three.js, que no Node precisa de FileReader e
 * Blob do browser. São umas dezenas de caixas: não justificam a dependência.
 *
 * Unidades em metros, 18 m de ponta a ponta como um articulado. A frente
 * aponta para +X e o tejadilho para +Y (o glTF é Y-up); a origem fica no
 * fole, para o autocarro rodar sobre o meio.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'models')
const OUT = join(OUT_DIR, 'metrobus.glb')

/** Cor sRGB em hexadecimal para o linear que o glTF espera. */
function linear(hex) {
  return [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
}

/** As mesmas tintas do site: papel, tinta, terracota. */
const MATERIALS = {
  corpo: { color: '#F2EEE6', roughness: 0.75 },
  tejadilho: { color: '#E5DFD2', roughness: 0.8 },
  tinta: { color: '#14171C', roughness: 0.9 },
  filete: { color: '#B03A0B', roughness: 0.6 },
  janela: { color: '#FFD9A0', emissive: '#FFC47A' },
  farol: { color: '#FFF8EC', emissive: '#FFF4E0' },
  farolim: { color: '#C4221A', emissive: '#E0301E' },
}

/** Uma caixa: material e os limites em cada eixo, em metros. */
const box = (mat, [x0, x1], [y0, y1], [z0, z1]) => ({ mat, x: [x0, x1], y: [y0, y1], z: [z0, z1] })

const W = 1.27 // meia largura: 2,55 m de carroçaria
const mirror = (mat, x, y, [z0, z1]) => [box(mat, x, y, [z0, z1]), box(mat, x, y, [-z1, -z0])]

const PARTS = [
  // As duas caixas e o fole que as junta.
  box('corpo', [0.45, 9.2], [0.35, 3.05], [-W, W]),
  box('corpo', [-9.2, -0.45], [0.35, 3.05], [-W, W]),
  box('tinta', [-0.45, 0.45], [0.45, 2.95], [-1.15, 1.15]),

  // Faixa das janelas, a toda a volta de cada caixa, um palmo para fora
  // para se ver dos lados.
  box('janela', [0.9, 8.9], [1.35, 2.55], [-W - 0.015, W + 0.015]),
  box('janela', [-8.9, -0.9], [1.35, 2.55], [-W - 0.015, W + 0.015]),
  // Pára-brisas e óculo traseiro.
  box('janela', [9.2, 9.26], [1.1, 2.85], [-1.1, 1.1]),
  box('tinta', [-9.26, -9.2], [1.6, 2.6], [-1.0, 1.0]),

  // O filete terracota da Gazeta, a correr o autocarro de ponta a ponta.
  box('filete', [0.45, 9.22], [0.95, 1.15], [-W - 0.02, W + 0.02]),
  box('filete', [-9.22, -0.45], [0.95, 1.15], [-W - 0.02, W + 0.02]),

  // Caixas de baterias no tejadilho.
  box('tejadilho', [2.0, 7.0], [3.05, 3.4], [-0.9, 0.9]),
  box('tejadilho', [-7.0, -2.0], [3.05, 3.4], [-0.9, 0.9]),

  // Faróis e farolins.
  ...mirror('farol', [9.2, 9.3], [0.55, 0.8], [0.7, 1.1]),
  ...mirror('farolim', [-9.3, -9.2], [0.6, 1.0], [0.8, 1.15]),

  // Três eixos: dianteiro, do meio e traseiro.
  ...[6.8, 1.8, -6.5].flatMap((c) => mirror('tinta', [c - 0.55, c + 0.55], [0, 0.9], [1.0, W + 0.05])),
]

/**
 * As seis faces de uma caixa: normal e dois eixos (u, v) com u × v = n, para
 * os triângulos saírem no sentido anti-horário visto de fora.
 */
const FACES = [
  { n: [1, 0, 0], u: [0, 1, 0], v: [0, 0, 1] },
  { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
  { n: [0, 1, 0], u: [0, 0, 1], v: [1, 0, 0] },
  { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
  { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
  { n: [0, 0, -1], u: [0, 1, 0], v: [1, 0, 0] },
]

function geometry(boxes) {
  const positions = []
  const normals = []
  const indices = []
  for (const b of boxes) {
    const c = [(b.x[0] + b.x[1]) / 2, (b.y[0] + b.y[1]) / 2, (b.z[0] + b.z[1]) / 2]
    const h = [(b.x[1] - b.x[0]) / 2, (b.y[1] - b.y[0]) / 2, (b.z[1] - b.z[0]) / 2]
    for (const { n, u, v } of FACES) {
      const base = positions.length / 3
      for (const [su, sv] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        for (let a = 0; a < 3; a++) positions.push(c[a] + h[a] * (n[a] + su * u[a] + sv * v[a]))
        normals.push(...n)
      }
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
    }
  }
  return { positions: new Float32Array(positions), normals: new Float32Array(normals), indices: new Uint16Array(indices) }
}

function glb(parts) {
  const names = Object.keys(MATERIALS)
  const chunks = []
  const bufferViews = []
  const accessors = []
  let offset = 0

  const view = (typed, target) => {
    const bytes = Buffer.from(typed.buffer, typed.byteOffset, typed.byteLength)
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.length, target })
    chunks.push(bytes)
    offset += bytes.length
    const pad = (4 - (offset % 4)) % 4
    if (pad) {
      chunks.push(Buffer.alloc(pad))
      offset += pad
    }
    return bufferViews.length - 1
  }

  const primitives = []
  for (const [m, name] of names.entries()) {
    const boxes = parts.filter((p) => p.mat === name)
    if (!boxes.length) continue
    const g = geometry(boxes)
    const min = [0, 1, 2].map((a) => Math.min(...g.positions.filter((_, i) => i % 3 === a)))
    const max = [0, 1, 2].map((a) => Math.max(...g.positions.filter((_, i) => i % 3 === a)))
    accessors.push({ bufferView: view(g.positions, 34962), componentType: 5126, count: g.positions.length / 3, type: 'VEC3', min, max })
    const position = accessors.length - 1
    accessors.push({ bufferView: view(g.normals, 34962), componentType: 5126, count: g.normals.length / 3, type: 'VEC3' })
    const normal = accessors.length - 1
    accessors.push({ bufferView: view(g.indices, 34963), componentType: 5123, count: g.indices.length, type: 'SCALAR' })
    primitives.push({ attributes: { POSITION: position, NORMAL: normal }, indices: accessors.length - 1, material: m })
  }

  const materials = names.map((name) => {
    const m = MATERIALS[name]
    return {
      name,
      pbrMetallicRoughness: { baseColorFactor: [...linear(m.color), 1], metallicFactor: 0, roughnessFactor: m.roughness ?? 0.5 },
      ...(m.emissive ? { emissiveFactor: linear(m.emissive) } : {}),
    }
  })

  const bin = Buffer.concat(chunks)
  const json = {
    asset: { version: '2.0', generator: 'CoimbraLens · scripts/build-bus-model.mjs' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: 'metrobus' }],
    meshes: [{ name: 'metrobus', primitives }],
    materials,
    accessors,
    bufferViews,
    buffers: [{ byteLength: bin.length }],
  }

  let jsonBytes = Buffer.from(JSON.stringify(json), 'utf8')
  const jsonPad = (4 - (jsonBytes.length % 4)) % 4
  if (jsonPad) jsonBytes = Buffer.concat([jsonBytes, Buffer.alloc(jsonPad, 0x20)])

  const header = Buffer.alloc(12)
  const total = 12 + 8 + jsonBytes.length + 8 + bin.length
  header.writeUInt32LE(0x46546c67, 0) // 'glTF'
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(total, 8)
  const chunkHead = (len, type) => {
    const b = Buffer.alloc(8)
    b.writeUInt32LE(len, 0)
    b.writeUInt32LE(type, 4)
    return b
  }
  return Buffer.concat([header, chunkHead(jsonBytes.length, 0x4e4f534a), jsonBytes, chunkHead(bin.length, 0x004e4942), bin])
}

mkdirSync(OUT_DIR, { recursive: true })
const out = glb(PARTS)
writeFileSync(OUT, out)
process.stdout.write(`${PARTS.length} caixas · ${(out.length / 1024).toFixed(1)} KB · Escrito ${OUT}\n`)
