const RSS_URL = 'https://noticias.uc.pt/?feed=rss2'

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

const FALLBACK_ITEMS = [
  { title: 'UC distinguida entre as melhores universidades do mundo', link: 'https://noticias.uc.pt', date: daysAgo(2), category: 'Destaque' },
  { title: 'Investigadores da UC desenvolvem nova abordagem contra cancro', link: 'https://noticias.uc.pt', date: daysAgo(5), category: 'Investigação' },
  { title: 'Receção a novos estudantes internacionais em Coimbra', link: 'https://noticias.uc.pt', date: daysAgo(9), category: 'Academia' },
  { title: 'Conferência Internacional de Direito no Palácio dos Grilos', link: 'https://noticias.uc.pt', date: daysAgo(14), category: 'Eventos' },
  { title: 'Ranking QS: Universidade de Coimbra sobe 12 posições', link: 'https://noticias.uc.pt', date: daysAgo(18), category: 'Destaque' },
]

function parseRSS(xml: string) {
  const items: { title: string; link: string; date: string; category: string }[] = []
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g)
  for (const match of itemMatches) {
    const block = match[1]
    const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ?? block.match(/<title>(.*?)<\/title>/)?.[1] ?? ''
    const link = block.match(/<link>(.*?)<\/link>/)?.[1] ?? block.match(/<guid>(.*?)<\/guid>/)?.[1] ?? ''
    const date = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ''
    const category = block.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/)?.[1] ?? block.match(/<category>(.*?)<\/category>/)?.[1] ?? 'Notícia'
    if (title) {
      const parsed = date ? new Date(date).toISOString().slice(0, 10) : ''
      items.push({ title: title.trim(), link: link.trim(), date: parsed, category: category.trim() })
    }
    if (items.length >= 5) break
  }
  return items
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'CoimbraLens/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    })
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)
    const xml = await res.text()
    const items = parseRSS(xml)
    if (items.length === 0) throw new Error('No items parsed')
    return Response.json({ items })
  } catch {
    return Response.json({ items: FALLBACK_ITEMS, fallback: true })
  }
}
