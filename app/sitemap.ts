import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'
import { URBAN_ZONES } from '@/lib/urban-zones'

/** As áreas do site, com a cadência a que cada uma muda mesmo. */
const AREAS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'hourly', priority: 1 },
  { path: 'agenda', changeFrequency: 'daily', priority: 0.9 },
  { path: 'visitar', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'territorio', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'zonas-verdes', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'zonas-urbanas', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'sobre', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, '')
  const areas = AREAS.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
  // Cada zona urbana tem página própria; muda quando o modelo é regenerado.
  const zonas = URBAN_ZONES.map((z) => ({
    url: `${base}/zonas-urbanas/${z.id}`,
    lastModified: new Date(z.lidoEm),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))
  return [...areas, ...zonas]
}
