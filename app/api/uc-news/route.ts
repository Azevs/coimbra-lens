import { live, unavailable, type Sourced } from '@/lib/provenance'

// O noticias.uc.pt deixou de ser WordPress: `?feed=rss2` devolve HTTP 200
// com a página HTML normal, e /feed, /rss e /index.xml devolvem 403. Não
// existe feed RSS publicado neste momento.
//
// Mantemos a tentativa — se a UC voltar a publicar um feed, o módulo passa
// a funcionar sem alteração de código. Enquanto não publicar, dizemos porquê.
//
// A lista fixa anterior incluía uma subida de 12 posições no ranking QS que
// não corresponde a nenhuma notícia real.
const RSS_URL = 'https://noticias.uc.pt/?feed=rss2'

const SOURCE = 'noticias.uc.pt'

export interface UCNewsItem {
  title: string
  link: string
  date: string
  category: string
}

export interface UCNewsPayload {
  items: UCNewsItem[]
  meta: Sourced
}

const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'application/rss+xml, application/xml;q=0.9, text/xml;q=0.8, */*;q=0.7',
  'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8',
  'Cache-Control': 'no-cache',
  Referer: 'https://noticias.uc.pt/',
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function pick(block: string, tag: string): string {
  const cdata = block.match(new RegExp(`<${tag}><!\[CDATA\[([\s\S]*?)\]\]></${tag}>`))
  if (cdata) return cdata[1]
  const plain = block.match(new RegExp(`<${tag}>([\s\S]*?)</${tag}>`))
  return plain ? plain[1] : ''
}

function parseRSS(xml: string): UCNewsItem[] {
  const items: UCNewsItem[] = []
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = match[1]
    const title = decodeEntities(pick(block, 'title')).trim()
    if (!title) continue

    const link = (pick(block, 'link') || pick(block, 'guid')).trim()
    const raw = pick(block, 'pubDate').trim()
    const parsed = raw ? new Date(raw) : null
    const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : ''

    items.push({
      title,
      link,
      date,
      category: decodeEntities(pick(block, 'category')).trim() || 'Notícia',
    })
    if (items.length >= 5) break
  }
  return items
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 3600 }, headers: BROWSER_HEADERS })
    if (!res.ok) {
      return Response.json({
        items: [],
        meta: unavailable(SOURCE, `O feed da UC recusou o pedido (HTTP ${res.status}).`),
      } satisfies UCNewsPayload)
    }

    const body = await res.text()

    // O endpoint responde 200 com HTML quando o feed não existe. Distinguir
    // isto de um feed vazio evita um diagnóstico enganador.
    if (!body.includes('<rss') && !body.includes('<feed')) {
      return Response.json({
        items: [],
        meta: unavailable(SOURCE, 'A UC não publica actualmente um feed RSS de notícias.'),
      } satisfies UCNewsPayload)
    }

    const items = parseRSS(body)
    if (items.length === 0) {
      return Response.json({
        items: [],
        meta: unavailable(SOURCE, 'O feed respondeu sem notícias legíveis.'),
      } satisfies UCNewsPayload)
    }

    return Response.json({ items, meta: live(SOURCE, `${items[0].date}T12:00:00`) } satisfies UCNewsPayload)
  } catch {
    return Response.json({
      items: [],
      meta: unavailable(SOURCE, 'Não foi possível contactar o feed da UC.'),
    } satisfies UCNewsPayload)
  }
}
