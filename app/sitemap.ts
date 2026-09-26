import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { ZONAS_URBANAS } from '@/lib/urban-zones-textos'
import { LIDO_EM } from '@/lib/frescura'

/**
 * As áreas do site, com a cadência a que cada uma muda mesmo. As que
 * mudam com as leituras em directo (a primeira página, a agenda) levam a
 * hora do pedido; as outras levam a data dos seus dados, ou nenhuma.
 */
const AREAS: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
  agora?: boolean
}[] = [
  { path: '', changeFrequency: 'hourly', priority: 1, agora: true },
  { path: 'agenda', changeFrequency: 'daily', priority: 0.9, agora: true },
  { path: 'visitar', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'turismo', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'territorio', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'zonas-verdes', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'trilhos', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'zonas-urbanas', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'historia', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'lendas', changeFrequency: 'monthly', priority: 0.7 },
  { path: 'sobre', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, '')
  const areas = AREAS.map(({ path, changeFrequency, priority, agora }) => {
    const lido = agora ? new Date() : LIDO_EM[path] ? new Date(LIDO_EM[path]!) : undefined
    return {
      url: path ? `${base}/${path}` : base,
      ...(lido ? { lastModified: lido } : {}),
      changeFrequency,
      priority,
    }
  })
  // Cada zona urbana tem página própria; muda quando o modelo é regenerado.
  const zonas = ZONAS_URBANAS.map(({ zona: z }) => ({
    url: `${base}/zonas-urbanas/${z.id}`,
    lastModified: new Date(z.lidoEm),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))
  return [...areas, ...zonas]
}
