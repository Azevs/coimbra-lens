import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

/** As áreas do site, com a cadência a que cada uma muda mesmo. */
const AREAS: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'hourly', priority: 1 },
  { path: 'agenda', changeFrequency: 'daily', priority: 0.9 },
  { path: 'visitar', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'territorio', changeFrequency: 'yearly', priority: 0.7 },
  { path: 'sobre', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, '')
  return AREAS.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
