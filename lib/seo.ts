import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from '@/lib/site'

/**
 * Os metadados de uma página. Existe porque o Next funde os metadados do
 * layout com os da página só à superfície: uma página que declare só
 * `title` e `description` herdava o `canonical: "/"` do layout — dizendo
 * ao Google que era um duplicado da primeira página — e partilhava-se com
 * o título e o endereço da primeira página. Aqui cada página diz o seu.
 *
 * A imagem social não vem daqui: cada rota tem o seu `opengraph-image.tsx`,
 * que o Next junta sozinho.
 */
export function pagina({
  caminho,
  titulo,
  tituloSocial,
  descricao,
}: {
  /** Sem barra inicial; '' é a primeira página. */
  caminho: string
  /** Para o separador e os resultados de pesquisa. Leva " · CoimbraLens" pelo modelo do layout. */
  titulo: string
  /** Para a partilha, onde o nome do site já aparece à parte. Por omissão, o título. */
  tituloSocial?: string
  descricao: string
}): Metadata {
  const url = `/${caminho}`
  const social = tituloSocial ?? titulo
  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'pt_PT',
      siteName: SITE_NAME,
      url,
      title: social,
      description: descricao,
    },
    twitter: {
      card: 'summary_large_image',
      title: social,
      description: descricao,
    },
  }
}

const absoluto = (caminho: string) => `${siteUrl()}/${caminho}`.replace(/\/$/, '')

/** O site em si, para o Google o reconhecer como entidade. Vai no layout. */
export function ldSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl()}/#site`,
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    inLanguage: 'pt-PT',
    about: {
      '@type': 'City',
      name: 'Coimbra',
      sameAs: 'https://www.wikidata.org/wiki/Q45412',
    },
  }
}

/** O percurso do /visitar: cada paragem como atracção turística, pela ordem do dia. */
export function ldPercurso(
  nome: string,
  lugares: { name: string; blurb: string; pos: [number, number]; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: nome,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: lugares.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristAttraction',
        name: l.name,
        description: l.blurb,
        url: l.href,
        geo: { '@type': 'GeoCoordinates', latitude: l.pos[0], longitude: l.pos[1] },
        containedInPlace: { '@type': 'City', name: 'Coimbra' },
      },
    })),
  }
}

/** Migalhas: Início › secção › (subpágina). */
export function ldMigalhas(passos: { nome: string; caminho: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ nome: SITE_NAME, caminho: '' }, ...passos].map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.nome,
      item: absoluto(p.caminho),
    })),
  }
}
