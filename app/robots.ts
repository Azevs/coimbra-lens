import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // As rotas de API servem o próprio painel; não têm valor em pesquisa.
      disallow: '/api/',
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  }
}
