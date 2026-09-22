/**
 * Gerador do capítulo I da História — Aeminium.
 *
 *   node scripts/build-historia.mjs
 *
 * Escreve `lib/historia-aeminium.ts` (o corte) e
 * `lib/historia-aeminium-planta.ts` (a planta), duas peças medidas:
 *
 *   CORTE  — um perfil poente → nascente pela colina da Alta, na linha da
 *            grelha PT-TM06 que passa pelo centro do Museu Nacional Machado
 *            de Castro. Chão pelo MDT 2 m e superfície (telhados, copas) pelo
 *            MDS 2 m do LiDAR da DGT (2024), lidos das folhas em
 *            `scripts/blender/dem/`. É o terreno onde o fórum romano foi
 *            assente, medido hoje.
 *
 *   PLANTA — os contornos dos edifícios e da água à volta da linha do corte,
 *            do OpenStreetMap, para o leitor saber por onde passa a linha.
 *
 * O que NÃO sai daqui: a forma do criptopórtico. Não há planta
 * georreferenciada publicada; a página desenha-o como esquema e diz que o é.
 *
 * Uma amostra sem folha LiDAR fica `null`. O desenho deixa esse troço sem
 * chão e diz "sem medição" — não se interpola por cima de um buraco.
 */
import { readdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { fromFile } from 'geotiff'
import proj4 from 'proj4'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_TS = join(ROOT, 'lib', 'historia-aeminium.ts')
const OUT_PLANTA = join(ROOT, 'lib', 'historia-aeminium-planta.ts')
const DIR_DEM = join(ROOT, 'scripts', 'blender', 'dem')

proj4.defs(
  'EPSG:3763',
  '+proj=tmerc +lat_0=39.66825833333333 +lon_0=-8.133108333333334 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs'
)
const paraTM06 = proj4('EPSG:4326', 'EPSG:3763')
const paraWGS = (x, y) => proj4('EPSG:3763', 'EPSG:4326', [x, y])

/** O museu no OSM — relação multipolígono com o edifício inteiro. */
const MUSEU_REL = 2334829

/**
 * Extensão do corte, em metros PT-TM06 a partir da fachada poente do museu.
 * A poente chega à margem esquerda do Mondego; a nascente, ao alto da
 * colina. É a distância que um romano via do pórtico do fórum.
 */
const CORTE_POENTE = -900
const CORTE_NASCENTE = 340
const PASSO = 2

/** Meia largura da planta, a norte e a sul da linha do corte. */
const PLANTA_MEIA = 200
/** Abaixo disto não é edifício, é anexo — não se desenha na planta. */
const AREA_MIN_M2 = 12

/** O `maps.mail.ru` à frente: em Setembro de 2026 era o único que respondia a tempo. */
const OVERPASS_MIRRORS = [
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
]
const USER_AGENT = 'CoimbraLens/1.0 (+https://github.com/coimbralens; gerador da página de História)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function overpass(query) {
  let ultimo
  for (const url of OVERPASS_MIRRORS) {
    for (let tentativa = 0; tentativa < 3; tentativa++) {
      try {
        const r = await fetch(url, {
          method: 'POST',
          signal: AbortSignal.timeout(90000),
          headers: { 'User-Agent': USER_AGENT },
          body: new URLSearchParams({ data: query }),
        })
        const txt = await r.text()
        if (!txt.trim().startsWith('{')) {
          ultimo = `HTTP ${r.status}: ${txt.slice(0, 120).replace(/\s+/g, ' ')}`
        } else {
          const j = JSON.parse(txt)
          if (j.elements?.length) return j
          ultimo = j.remark ?? 'resposta sem elementos'
        }
      } catch (e) {
        ultimo = e.message
      }
      await sleep(5000)
    }
    console.warn(`  ${url}: ${ultimo} — a passar ao espelho seguinte`)
  }
  throw new Error('Overpass indisponível em todos os espelhos: ' + ultimo)
}

/* ── LiDAR ─────────────────────────────────────────────────────────────── */

async function folhas(tipo) {
  const out = []
  for (const f of readdirSync(DIR_DEM).filter((f) => new RegExp(`^${tipo}-.*\\.tiff?$`).test(f))) {
    const im = await (await fromFile(join(DIR_DEM, f))).getImage()
    const [w, s, e, n] = im.getBoundingBox()
    const [rx, ry] = im.getResolution()
    out.push({
      f, w, s, e, n, rx, ry: -ry,
      W: im.getWidth(),
      nodata: im.getGDALNoData(),
      r: (await im.readRasters())[0],
    })
  }
  return out
}

/** Bilinear sobre os centros de píxel, dentro da folha que contém o ponto. */
function cota(fs, x, y) {
  for (const t of fs) {
    if (x < t.w || x >= t.e || y <= t.s || y > t.n) continue
    const fx = (x - t.w) / t.rx - 0.5
    const fy = (t.n - y) / t.ry - 0.5
    const H = Math.round((t.n - t.s) / t.ry)
    const i0 = Math.max(0, Math.min(t.W - 2, Math.floor(fx)))
    const j0 = Math.max(0, Math.min(H - 2, Math.floor(fy)))
    const u = Math.max(0, Math.min(1, fx - i0))
    const v = Math.max(0, Math.min(1, fy - j0))
    const g = (i, j) => {
      const z = t.r[j * t.W + i]
      return z === t.nodata || z <= -999 ? null : z
    }
    const a = g(i0, j0), b = g(i0 + 1, j0), c = g(i0, j0 + 1), d = g(i0 + 1, j0 + 1)
    if ([a, b, c, d].some((z) => z === null)) return null
    return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
  }
  return null
}

/* ── Geometria ─────────────────────────────────────────────────────────── */

function dentro(x, y, anel) {
  let d = false
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i]
    const [xj, yj] = anel[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) d = !d
  }
  return d
}

function area(anel) {
  let a = 0
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) a += (anel[j][0] + anel[i][0]) * (anel[j][1] - anel[i][1])
  return Math.abs(a / 2)
}

/** Os x em que a horizontal y corta o anel. */
function cortes(anel, y) {
  const xs = []
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i]
    const [xj, yj] = anel[j]
    if (yi > y !== yj > y) xs.push(xi + ((y - yi) * (xj - xi)) / (yj - yi))
  }
  return xs.sort((a, b) => a - b)
}

/** Junta os caminhos `outer` de uma relação em anéis fechados. */
function aneis(membros) {
  const troços = membros.map((m) => m.geometry.map((p) => paraTM06.forward([p.lon, p.lat])))
  const fechados = []
  while (troços.length) {
    let anel = troços.shift()
    let mudou = true
    while (mudou && !igual(anel[0], anel.at(-1))) {
      mudou = false
      for (let k = 0; k < troços.length; k++) {
        const t = troços[k]
        if (igual(anel.at(-1), t[0])) anel = anel.concat(t.slice(1))
        else if (igual(anel.at(-1), t.at(-1))) anel = anel.concat(t.slice(0, -1).reverse())
        else continue
        troços.splice(k, 1)
        mudou = true
        break
      }
    }
    fechados.push(anel)
  }
  return fechados
}
const igual = (a, b) => Math.abs(a[0] - b[0]) < 0.01 && Math.abs(a[1] - b[1]) < 0.01

const mediana = (v) => {
  const s = v.filter((z) => z !== null).sort((a, b) => a - b)
  return s.length ? s[Math.floor(s.length / 2)] : null
}
const r1 = (z) => (z === null ? null : Math.round(z * 10) / 10)

/**
 * O PÁTIO DO MUSEU — a cota da plataforma do fórum.
 *
 * Quem escavou escreve que o pátio do museu corresponde, grosso modo, à
 * praça do fórum. O pátio é chão a céu aberto, por isso o MDS (a superfície
 * que o laser tocou) mede-o directamente, sem interpolar por baixo de um
 * telhado como o MDT faz sob os edifícios.
 *
 * Como se encontra: dentro do contorno do museu, as células de 2 m planas
 * (vizinhas a menos de 0,3 m) juntam-se em regiões de cota igual; fica a
 * maior região que a linha do corte atravessa. Em Setembro de 2026 é uma
 * placa a 89,7 m com 304 m², confirmada à mão no MDS — os telhados à
 * volta estão entre 95 e 107 m.
 */
function patioDoMuseu(mds, museu, X0, Y0) {
  const xs = museu.flat().map((p) => p[0])
  const ys = museu.flat().map((p) => p[1])
  const x0 = Math.floor(Math.min(...xs) / 2) * 2 + 1
  const y0 = Math.floor(Math.min(...ys) / 2) * 2 + 1
  const nx = Math.ceil((Math.max(...xs) - x0) / 2)
  const ny = Math.ceil((Math.max(...ys) - y0) / 2)
  const z = []
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      const x = x0 + i * 2, y = y0 + j * 2
      z.push(museu.some((a) => dentro(x, y, a)) ? cota(mds, x, y) : null)
    }
  const at = (i, j) => (i < 0 || j < 0 || i >= nx || j >= ny ? null : z[j * nx + i])
  const plana = (i, j) => {
    const v = at(i, j)
    if (v === null) return false
    return [[1, 0], [-1, 0], [0, 1], [0, -1]].every(([a, b]) => {
      const w = at(i + a, j + b)
      return w !== null && Math.abs(w - v) < 0.3
    })
  }
  const visto = new Set()
  let melhor = null
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      if (visto.has(j * nx + i) || !plana(i, j)) continue
      const semente = at(i, j)
      const regiao = []
      const fila = [[i, j]]
      visto.add(j * nx + i)
      while (fila.length) {
        const [a, b] = fila.pop()
        regiao.push([a, b])
        for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const k = (b + db) * nx + (a + da)
          if (visto.has(k) || !plana(a + da, b + db) || Math.abs(at(a + da, b + db) - semente) > 0.4) continue
          visto.add(k)
          fila.push([a + da, b + db])
        }
      }
      const naLinha = regiao.filter(([, b]) => Math.abs(y0 + b * 2 - Y0) <= 2)
      if (!naLinha.length) continue
      if (!melhor || regiao.length > melhor.regiao.length) melhor = { regiao, naLinha }
    }
  if (!melhor || melhor.regiao.length < 12) return null
  const dd = melhor.naLinha.map(([a]) => x0 + a * 2 - X0)
  return {
    z: r1(mediana(melhor.regiao.map(([a, b]) => at(a, b)))),
    area: melhor.regiao.length * 4,
    d0: Math.min(...dd) - 1,
    d1: Math.max(...dd) + 1,
  }
}

/* ── Principal ─────────────────────────────────────────────────────────── */

async function main() {
  console.log('Museu Nacional Machado de Castro (OSM)…')
  const rel = (await overpass(`[out:json][timeout:60];rel(${MUSEU_REL});out geom;`)).elements[0]
  const museu = aneis(rel.members.filter((m) => m.type === 'way' && m.role === 'outer'))
  // A linha do corte: a horizontal da grelha pelo centro do contorno maior.
  const principal = museu.reduce((a, b) => (area(a) > area(b) ? a : b))
  const ys = principal.map((p) => p[1])
  const Y0 = Math.round((Math.min(...ys) + Math.max(...ys)) / 2)
  const xsMuseu = museu.flatMap((a) => cortes(a, Y0))
  if (xsMuseu.length < 2) throw new Error('a linha do corte não atravessa o museu')
  const X0 = Math.round(Math.min(...xsMuseu))
  const museuNascente = Math.max(...xsMuseu) - X0
  console.log(`  linha do corte: y = ${Y0} (PT-TM06); fachada poente em x = ${X0}; museu com ${museuNascente.toFixed(0)} m no corte`)

  console.log('LiDAR DGT…')
  const mdt = await folhas('MDT')
  const mds = await folhas('MDS')

  const [lonW, latS] = paraWGS(X0 + CORTE_POENTE - 20, Y0 - PLANTA_MEIA - 20)
  const [lonE, latN] = paraWGS(X0 + CORTE_NASCENTE + 20, Y0 + PLANTA_MEIA + 20)
  const bbox = `${latS},${lonW},${latN},${lonE}`

  console.log('Planta (OSM)…')
  const osm = await overpass(`[out:json][timeout:120];(
    way["building"](${bbox});
    rel["building"](${bbox});
    way["natural"="water"](${bbox});
    rel["natural"="water"](${bbox});
    way["waterway"="riverbank"](${bbox});
  );out geom;`)

  const edificios = []
  const agua = []
  for (const e of osm.elements) {
    const t = e.tags ?? {}
    const lista =
      e.type === 'way'
        ? [e.geometry.map((p) => paraTM06.forward([p.lon, p.lat]))]
        : aneis((e.members ?? []).filter((m) => m.type === 'way' && m.role === 'outer' && m.geometry))
    for (const anel of lista) {
      if (anel.length < 4) continue
      if (t.natural === 'water' || t.waterway === 'riverbank') agua.push(anel)
      else if (area(anel) >= AREA_MIN_M2 && !(e.type === 'relation' && e.id === MUSEU_REL)) edificios.push(anel)
    }
  }
  console.log(`  ${edificios.length} edifícios, ${agua.length} polígonos de água`)

  // Perfil.
  const perfil = []
  let semChao = 0
  for (let d = CORTE_POENTE; d <= CORTE_NASCENTE; d += PASSO) {
    const x = X0 + d
    const chao = cota(mdt, x, Y0)
    const sup = cota(mds, x, Y0)
    if (chao === null) semChao++
    const naAgua = agua.some((a) => dentro(x, Y0, a))
    perfil.push({ d, chao: r1(chao), sup: r1(sup), agua: naAgua })
  }
  if (semChao) {
    const buraco = perfil.filter((p) => p.chao === null)
    console.warn(
      `  AVISO: ${semChao} de ${perfil.length} amostras sem MDT (de ${buraco[0].d} a ${buraco.at(-1).d} m).` +
        ` Falta a folha que cobre x ≈ ${X0 + buraco[0].d}, y = ${Y0}.` +
        ' O corte fica sem chão nesse troço até a folha estar em scripts/blender/dem/.'
    )
  }

  // As três cotas que o texto cita — todas lidas, nenhuma escrita à mão.
  const rio = mediana(perfil.filter((p) => p.agua).map((p) => p.chao))
  const naBaixa = perfil.filter((p) => !p.agua && p.d > CORTE_POENTE + 100 && p.d < -300)
  const baixa = mediana(naBaixa.map((p) => p.chao))
  const patio = patioDoMuseu(mds, museu, X0, Y0)
  if (patio) console.log(`  pátio: ${patio.z} m, ${patio.area} m², de ${patio.d0} a ${patio.d1} m no corte`)
  else console.warn('  AVISO: não encontrei o pátio do museu no MDS — o esquema do criptopórtico fica sem cota.')
  const plataforma = patio?.z ?? null

  // Planta em metros locais (ao metro: é uma vinheta), origem na fachada
  // poente, norte para cima (y SVG invertido).
  const loc = ([x, y]) => [Math.round(x - X0), Math.round(Y0 - y)]
  const caixa = { x0: CORTE_POENTE, x1: CORTE_NASCENTE, y0: -PLANTA_MEIA, y1: PLANTA_MEIA }
  const naCaixa = (anel) =>
    anel.some(([x, y]) => {
      const [a, b] = loc([x, y])
      return a >= caixa.x0 - 40 && a <= caixa.x1 + 40 && b >= caixa.y0 - 40 && b <= caixa.y1 + 40
    })
  const caminho = (lista) =>
    lista
      .filter(naCaixa)
      .map((anel) => {
        const pts = anel.map(loc).filter((p, i, v) => i === 0 || p[0] !== v[i - 1][0] || p[1] !== v[i - 1][1])
        return pts.length < 3 ? '' : 'M' + pts.map(([a, b]) => `${a} ${b}`).join('L') + 'Z'
      })
      .join('')

  const [lonC, latC] = paraWGS(X0, Y0)
  const out = {
    lidoEm: new Date().toISOString().slice(0, 10),
    linha: { y: Y0, x0: X0, lat: +latC.toFixed(6), lon: +lonC.toFixed(6) },
    museu: { poente: 0, nascente: Math.round(museuNascente) },
    cotas: { rio: r1(rio), baixa: r1(baixa), plataforma: r1(plataforma) },
    patio: patio ? { d0: patio.d0, d1: patio.d1, area: patio.area } : null,
    semChao,
    perfil,
  }
  const planta = { caixa, edificios: caminho(edificios), museu: caminho(museu), agua: caminho(agua) }

  // A planta vai para ficheiro à parte: só a lê um componente de servidor,
  // e assim os contornos não entram no JavaScript do corte animado.
  writeFileSync(
    OUT_PLANTA,
    `/**
 * GERADO por \`node scripts/build-historia.mjs\` — não editar à mão.
 *
 * A planta de localização do corte de Aeminium: contornos do OpenStreetMap,
 * em metros a partir da fachada poente do museu, norte para cima.
 */

export const PLANTA = ${JSON.stringify(planta)}
`
  )

  const ts = `/**
 * GERADO por \`node scripts/build-historia.mjs\` — não editar à mão.
 *
 * O terreno do capítulo I da História (Aeminium): um corte poente → nascente
 * pela colina da Alta, na linha PT-TM06 y = ${Y0}, que passa pelo centro do
 * Museu Nacional Machado de Castro. \`d\` é a distância em metros à fachada
 * poente do museu; \`chao\` é o MDT e \`sup\` o MDS do LiDAR da DGT (2024).
 * \`null\` quer dizer sem medição — o desenho deixa esse troço vazio.
 */

export interface PontoCorte {
  d: number
  chao: number | null
  sup: number | null
  agua: boolean
}

export interface CorteAeminium {
  lidoEm: string
  linha: { y: number; x0: number; lat: number; lon: number }
  museu: { poente: number; nascente: number }
  /**
   * Cotas lidas do LiDAR: rio e Baixa pelo MDT; a plataforma é o pátio do
   * museu pelo MDS (chão a céu aberto). \`null\` se não houver leitura.
   */
  cotas: { rio: number | null; baixa: number | null; plataforma: number | null }
  /** Onde a linha do corte toca o pátio, e a área dele em m². */
  patio: { d0: number; d1: number; area: number } | null
  semChao: number
  perfil: PontoCorte[]
}

export const CORTE: CorteAeminium = ${JSON.stringify(out)}
`
  writeFileSync(OUT_TS, ts)
  console.log(`Escrito ${OUT_TS} (${(ts.length / 1024).toFixed(0)} KB)`)
  console.log(`  cotas: rio ${out.cotas.rio} · Baixa ${out.cotas.baixa} · museu ${out.cotas.plataforma}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
