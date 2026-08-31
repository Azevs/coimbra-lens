/** URL público do site, com origem local por omissão em desenvolvimento. */
export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL
  if (configured) return configured.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return 'http://localhost:3000'
}

export const SITE_NAME = 'CoimbraLens'
export const SITE_TAGLINE = 'A cidade em dados'
export const SITE_DESCRIPTION =
  'Painel de dados sobre Coimbra: clima e qualidade do ar em directo, caudal do Mondego, trânsito, ' +
  'universidade e indicadores das 18 freguesias. Cada valor indica a sua fonte e se é medição ou estimativa.'
