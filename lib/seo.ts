import type { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, siteUrl } from '@/lib/site'
import { LIDO_EM } from '@/lib/frescura'

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

const COIMBRA = { '@type': 'City', name: 'Coimbra', sameAs: 'https://www.wikidata.org/wiki/Q45412' }
const ORG = (name: string, url?: string) => ({ '@type': 'Organization', name, ...(url ? { url } : {}) })

/** Quem publica os dados de origem, para os `Dataset`. Só nomes que as páginas já creditam. */
export const PUBLICADORES = {
  ine: ORG('Instituto Nacional de Estatística', 'https://www.ine.pt'),
  dgt: ORG('Direção-Geral do Território', 'https://www.dgterritorio.gov.pt'),
  pordata: ORG('PORDATA', 'https://www.pordata.pt'),
  osm: ORG('Colaboradores do OpenStreetMap', 'https://www.openstreetmap.org'),
}

/**
 * Os números de uma página como conjunto de dados. É aqui que a
 * proveniência fica legível por máquinas — na página ela vive nos selos,
 * nunca na prosa.
 */
export function ldDataset(d: {
  caminho: string
  nome: string
  descricao: string
  publicadores: object[]
  variaveis: string[]
  /** ISO 8601: '2021', '2011/2021'. */
  periodo?: string
  /** Quando os dados foram lidos da fonte pela última vez (AAAA-MM-DD). */
  lidoEm?: string
  licenca?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: d.nome,
    description: d.descricao,
    url: absoluto(d.caminho),
    inLanguage: 'pt-PT',
    isAccessibleForFree: true,
    spatialCoverage: COIMBRA,
    ...(d.periodo ? { temporalCoverage: d.periodo } : {}),
    ...(d.lidoEm ? { dateModified: d.lidoEm } : {}),
    ...(d.licenca ? { license: d.licenca } : {}),
    creator: d.publicadores,
    variableMeasured: d.variaveis,
    isPartOf: { '@id': `${siteUrl()}/#site` },
  }
}

/** As zonas verdes, cada uma como parque com o sítio onde fica. */
export function ldParques(
  espacos: { name: string; altName: string | null; lat: number; lon: number; areaHa: number; paid: boolean; website: string | null }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Espaços verdes públicos de Coimbra',
    numberOfItems: espacos.length,
    itemListElement: espacos.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Park',
        name: e.name,
        ...(e.altName ? { alternateName: e.altName } : {}),
        geo: { '@type': 'GeoCoordinates', latitude: e.lat, longitude: e.lon },
        isAccessibleForFree: !e.paid,
        ...(e.website ? { url: e.website } : {}),
        additionalProperty: { '@type': 'PropertyValue', name: 'Área', value: e.areaHa, unitText: 'ha' },
        containedInPlace: COIMBRA,
      },
    })),
  }
}

/** Os trilhos como viagens a pé, com o que se mediu em cada um. */
export function ldTrilhos(
  trilhos: {
    titulo: string
    codigo: string | null
    distanciaKm: number
    circular: boolean
    subida: number
    concelhos: string[]
    inicio: [number, number]
    website: string | null
  }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Percursos pedestres da Região de Coimbra',
    numberOfItems: trilhos.length,
    itemListElement: trilhos.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: t.codigo ? `${t.titulo} (${t.codigo})` : t.titulo,
        touristType: 'Caminhada',
        ...(t.website ? { url: t.website } : {}),
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Extensão', value: Math.round(t.distanciaKm * 10) / 10, unitText: 'km' },
          { '@type': 'PropertyValue', name: 'Subida acumulada', value: Math.round(t.subida), unitText: 'm' },
          { '@type': 'PropertyValue', name: 'Forma', value: t.circular ? 'Circular' : 'Linear' },
        ],
        // O traçado guarda [longitude, latitude].
        itinerary: {
          '@type': 'Place',
          name: `Início — ${t.concelhos.join(', ')}`,
          geo: { '@type': 'GeoCoordinates', latitude: t.inicio[1], longitude: t.inicio[0] },
        },
      },
    })),
  }
}

/**
 * As festas que voltam todos os anos, na próxima vez que acontecem. A data
 * só leva o dia quando ele é certo; nas outras fica o mês, que é o que se
 * sabe — e é ISO 8601 válido.
 */
export function ldFestas(
  festas: { name: string; description: string; month: number; day: number; diaCerto?: boolean; mesFim?: number; url: string }[],
  hoje = new Date(),
) {
  const dois = (n: number) => String(n).padStart(2, '0')
  return festas.map((f) => {
    const ano = new Date(hoje.getFullYear(), f.month - 1, f.day) >= hoje ? hoje.getFullYear() : hoje.getFullYear() + 1
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: f.name,
      description: f.description,
      startDate: f.diaCerto ? `${ano}-${dois(f.month)}-${dois(f.day)}` : `${ano}-${dois(f.month)}`,
      ...(f.mesFim ? { endDate: `${ano}-${dois(f.mesFim)}` } : {}),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Coimbra',
        address: { '@type': 'PostalAddress', addressLocality: 'Coimbra', addressCountry: 'PT' },
      },
      url: f.url,
    }
  })
}

/**
 * A página em si, com as migalhas (Início › secção › subpágina) e, quando
 * os dados dela têm data, o `dateModified` — a frescura que os motores e
 * os assistentes usam para escolher a fonte mais recente.
 */
export function ldPagina(passos: { nome: string; caminho: string }[]) {
  const ultima = passos.at(-1)!
  const lidoEm = LIDO_EM[ultima.caminho]
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${absoluto(ultima.caminho)}#pagina`,
      url: absoluto(ultima.caminho),
      name: ultima.nome,
      inLanguage: 'pt-PT',
      isPartOf: { '@id': `${siteUrl()}/#site` },
      about: COIMBRA,
      ...(lidoEm ? { dateModified: lidoEm } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ nome: SITE_NAME, caminho: '' }, ...passos].map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.nome,
        item: absoluto(p.caminho),
      })),
    },
  ]
}
