import { published, unavailable, type Sourced } from '@/lib/provenance'

// A Câmara mantém a página "Projetos e Intervenções em Curso", organizada por
// área e actualizada por ela própria. É mais directa do que o dataset CSV em
// dados.gov.pt, que não tem API de consulta nem cadência garantida.
//
// A rota anterior pedia esse CSV e lançava 'use-fallback' de propósito para
// servir uma lista escrita à mão — os títulos das obras eram inventados.
//
// A leitura é de HTML, portanto frágil por natureza: se a Câmara mudar o
// template, o padrão deixa de encontrar cartões e a rota devolve vazio. Isso
// é deliberado — melhor um módulo que diz que não sabe do que uma lista velha
// apresentada como actual.

const PAGE = 'https://www.cm-coimbra.pt/areas/viver/espaco-publico/projetos-e-intervencoes-em-curso'
const SOURCE = 'Câmara Municipal de Coimbra'
const LABEL = 'CM Coimbra · em curso'
const NOTE =
  'Lista publicada pelo município na página de projetos e intervenções em curso. Não traz datas de início nem freguesia.'

/** Cada cartão é uma ligação para a página do projecto com o título num h2. */
const CARD = /<a\s+href="(https:\/\/www\.cm-coimbra\.pt\/areas\/viver\/espaco-publico\/projetos-e-intervencoes-em-curso\/[^"#?]+)"[\s\S]{0,900}?<h2[^>]*>([\s\S]{3,200}?)<\/h2>/g

export interface Obra {
  id: string
  title: string
  url: string
}

export interface ObrasPayload {
  obras: Obra[]
  total: number | null
  meta: Sourced
}

function noData(note: string): ObrasPayload {
  return { obras: [], total: null, meta: unavailable(SOURCE, note) }
}

/** O título vem de HTML: entidades descodificadas, marcações fora. */
function limparTitulo(bruto: string): string {
  return bruto
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    // Os títulos vêm com entidades numéricas (travessões, aspas curvas).
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function GET() {
  try {
    const res = await fetch(PAGE, {
      next: { revalidate: 60 * 60 * 12 },
      // O portal devolve 403 a agentes que não se pareçam com um browser;
      // identificamo-nos na mesma, no formato convencional.
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CoimbraLens/1.0; +https://coimbralens.pt)',
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'pt-PT,pt;q=0.9',
      },
    })
    if (!res.ok) return Response.json(noData(`A página do município respondeu ${res.status}.`))

    const html = await res.text()
    const vistos = new Set<string>()
    const obras: Obra[] = []

    for (const m of html.matchAll(CARD)) {
      const url = m[1]
      const title = limparTitulo(m[2])
      const id = url.split('/').filter(Boolean).pop() ?? url
      if (!title || vistos.has(id)) continue
      vistos.add(id)
      obras.push({ id, title, url })
    }

    if (obras.length === 0) {
      return Response.json(
        noData('A página do município respondeu, mas o formato mudou e não foi possível ler a lista.'),
      )
    }

    return Response.json({
      obras,
      total: obras.length,
      // Não é uma medição instantânea: é a lista que o município mantém.
      meta: published(SOURCE, LABEL, NOTE, new Date().toISOString()),
    } satisfies ObrasPayload)
  } catch {
    return Response.json(noData('Não foi possível contactar a página do município.'))
  }
}
