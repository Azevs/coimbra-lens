/**
 * Ler traçados de GPX, KML e KMZ — os três formatos em que as câmaras
 * publicam os percursos.
 *
 * Devolve uma lista de peças `{ nome, linhas }`, uma por trilho (`<trk>`
 * no GPX, `<Placemark>` com linhas no KML). Quem chama escolhe a peça pelo
 * nome: um KML de câmara traz muitas vezes o percurso, as variantes, os
 * troços interditos e os pontos de interesse no mesmo ficheiro.
 *
 * Sem dependências: o KMZ é um zip, e o zip lê-se com o `zlib` do Node
 * pelo directório central.
 */

import { inflateRawSync } from 'node:zlib'

/** O primeiro `.kml` de dentro de um KMZ. */
export function kmlDoKmz(buf) {
  // Fim do directório central: assinatura 0x06054b50, nos últimos 64 KB.
  let eocd = -1
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i
      break
    }
  }
  if (eocd < 0) throw new Error('KMZ sem directório central')
  const n = buf.readUInt16LE(eocd + 10)
  let p = buf.readUInt32LE(eocd + 16)
  for (let k = 0; k < n; k++) {
    const metodo = buf.readUInt16LE(p + 10)
    const tamanho = buf.readUInt32LE(p + 20)
    const lnome = buf.readUInt16LE(p + 28)
    const lextra = buf.readUInt16LE(p + 30)
    const lcoment = buf.readUInt16LE(p + 32)
    const local = buf.readUInt32LE(p + 42)
    const nome = buf.toString('utf8', p + 46, p + 46 + lnome)
    if (/\.kml$/i.test(nome)) {
      const inicio = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28)
      const dados = buf.subarray(inicio, inicio + tamanho)
      return (metodo === 0 ? dados : inflateRawSync(dados)).toString('utf8')
    }
    p += 46 + lnome + lextra + lcoment
  }
  throw new Error('KMZ sem .kml')
}

const texto = (s) =>
  s
    ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .trim() ?? ''

function lerGpx(xml) {
  const pecas = []
  for (const [, trk] of xml.matchAll(/<trk>([\s\S]*?)<\/trk>/g)) {
    const nome = texto(/<name>([\s\S]*?)<\/name>/.exec(trk)?.[1])
    const linhas = [...trk.matchAll(/<trkseg>([\s\S]*?)<\/trkseg>/g)].map(([, seg]) => pontosGpx(seg, 'trkpt'))
    pecas.push({ nome, linhas: linhas.filter((l) => l.length > 1) })
  }
  for (const [, rte] of xml.matchAll(/<rte>([\s\S]*?)<\/rte>/g)) {
    const nome = texto(/<name>([\s\S]*?)<\/name>/.exec(rte)?.[1])
    pecas.push({ nome, linhas: [pontosGpx(rte, 'rtept')].filter((l) => l.length > 1) })
  }
  return pecas.filter((p) => p.linhas.length)
}

function pontosGpx(bloco, tag) {
  return [...bloco.matchAll(new RegExp(`<${tag}\\s+([^>]*?)\\/?>`, 'g'))].map(([, a]) => [
    Number(/lon="([^"]+)"/.exec(a)[1]),
    Number(/lat="([^"]+)"/.exec(a)[1]),
  ])
}

function lerKml(xml) {
  const pecas = []
  for (const [, pm] of xml.matchAll(/<Placemark[^>]*>([\s\S]*?)<\/Placemark>/g)) {
    const nome = texto(/<name>([\s\S]*?)<\/name>/.exec(pm)?.[1])
    const linhas = [...pm.matchAll(/<LineString[^>]*>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/g)].map(([, c]) =>
      c
        .trim()
        .split(/\s+/)
        .map((t) => t.split(',').slice(0, 2).map(Number))
        .filter((p) => p.length === 2 && p.every(Number.isFinite)),
    )
    // gx:Track (KML do Google Earth): <gx:coord>lon lat alt</gx:coord>
    const track = [...pm.matchAll(/<gx:coord>([^<]+)<\/gx:coord>/g)].map(([, c]) => c.trim().split(/\s+/).slice(0, 2).map(Number))
    if (track.length > 1) linhas.push(track)
    if (linhas.some((l) => l.length > 1)) pecas.push({ nome, linhas: linhas.filter((l) => l.length > 1) })
  }
  return pecas
}

/** Peças de um ficheiro, pelo conteúdo (não pela extensão, que às vezes mente). */
export function lerTracado(buf) {
  const zip = buf[0] === 0x50 && buf[1] === 0x4b
  const xml = zip ? kmlDoKmz(buf) : buf.toString('utf8')
  if (/<gpx[\s>]/.test(xml)) return lerGpx(xml)
  if (/<kml[\s>]/.test(xml)) return lerKml(xml)
  throw new Error('nem GPX nem KML')
}
