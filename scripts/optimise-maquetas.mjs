#!/usr/bin/env node
/**
 * Converte os renders das maquetas para WebP — `node scripts/optimise-maquetas.mjs`
 *
 * O Blender escreve PNG a 1,8 MB. Uma maqueta é superfície lisa com poucas
 * cores e arestas finas: em WebP a 88 fica em 50–75 KB sem que o contorno
 * Freestyle se desmanche, que é o único sítio onde a compressão se veria.
 *
 * Os PNG são apagados a seguir. A fonte de verdade é o `.blend` e o
 * `.scene.json` que o geraram, não o ficheiro intermédio.
 *
 * Copia também o descodificador Draco do `three` para `public/draco/`. O
 * `.glb` sai do Blender comprimido com Draco — 140 KB em vez de 1,05 MB — e
 * o browser precisa do descodificador para o abrir. Servi-lo de casa em vez
 * de um CDN evita um pedido a terceiros e um ponto de falha que não
 * controlamos.
 */

import { readdirSync, statSync, unlinkSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'maquetas')
const LARGURA_MAX = 1800
const QUALIDADE = 88

const pngs = readdirSync(DIR).filter((f) => f.endsWith('.png'))
if (!pngs.length) console.log('  nenhum PNG novo a converter')

for (const f of pngs) {
  const src = join(DIR, f)
  const dst = src.replace(/\.png$/, '.webp')
  const { width, height } = await sharp(src).metadata()
  await sharp(src)
    .resize({ width: Math.min(width, LARGURA_MAX) })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toFile(dst)
  const antes = statSync(src).size
  const depois = statSync(dst).size
  unlinkSync(src)
  console.log(
    `  ${f.replace(/\.png$/, '').padEnd(30)} ${String(width) + '×' + height}`.padEnd(50) +
      `${(antes / 1048576).toFixed(2)} MB → ${(depois / 1024).toFixed(0)} KB`
  )
}

// --- descodificador Draco, para o .glb que o Blender comprimiu ---
const DRACO_ORIGEM = join(
  dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', 'three',
  'examples', 'jsm', 'libs', 'draco', 'gltf'
)
const DRACO_DESTINO = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'draco')
mkdirSync(DRACO_DESTINO, { recursive: true })
for (const f of readdirSync(DRACO_ORIGEM)) {
  copyFileSync(join(DRACO_ORIGEM, f), join(DRACO_DESTINO, f))
  console.log(`  draco/${f.padEnd(30)} ${(statSync(join(DRACO_DESTINO, f)).size / 1024).toFixed(0)} KB`)
}
