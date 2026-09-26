import { SITE_NAME, SITE_TAGLINE, siteUrl } from '@/lib/site'
import { MUNICIPALITY, SHAPED_PARISH_ROWS } from '@/lib/parish-metrics'
import { PARISH_CENSUS_YEAR } from '@/lib/parishes'
import { CITY_RADIUS_KM } from '@/lib/green-spaces'
import { IN_CITY, SPACES, TOTAL_HA, formatHa } from '@/lib/green'
import { TOTAL_KM, TRILHOS } from '@/lib/trilhos'
import { PORDATA_TURISMO } from '@/lib/turismo'
import { WALKING_ROUTE, attractionById } from '@/lib/attractions'
import { ZONAS_URBANAS } from '@/lib/urban-zones-textos'
import { EVENTS } from '@/lib/festas'
import { LIDO_EM } from '@/lib/frescura'
import { fmt } from '@/lib/format'

/**
 * /llms.txt — o site resumido para assistentes de IA, no formato proposto
 * em llmstxt.org: o que é, que páginas tem e que pergunta responde cada
 * uma, com os números principais. Gerado dos mesmos dados das páginas,
 * para não ficar a dizer outra coisa do que elas dizem.
 */
export const dynamic = 'force-static'

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

export function GET() {
  const url = (c = '') => `${siteUrl()}/${c}`.replace(/\/$/, '') || siteUrl()
  const lido = (c: string) => (LIDO_EM[c] ? ` Dados de ${LIDO_EM[c]}.` : '')

  const maisPovoada = [...SHAPED_PARISH_ROWS].sort((a, b) => b.population - a.population)[0]
  const paragens = WALKING_ROUTE.flatMap((t) => t.paragens.map((p) => attractionById(p.id)?.name)).filter(Boolean)
  const estada = PORDATA_TURISMO.estadaMedia2024
  const edificios = ZONAS_URBANAS.reduce((s, { zona }) => s + zona.edificios, 0)
  const festas = EVENTS.map((e) => `${e.name} (${MESES[e.month - 1]})`).join('; ')

  const texto = `# ${SITE_NAME}

> ${SITE_NAME} — ${SITE_TAGLINE}. Painel sobre a cidade de Coimbra, em Portugal: o tempo, o ar e o rio em directo, as freguesias, o turismo, os espaços verdes, os trilhos, a história romana e um dia a pé pela cidade. Cada número traz a fonte e diz se é medição ou estimativa.

Em português de Portugal. Os valores em directo (tempo, qualidade do ar, caudal do Mondego, risco de incêndio) mudam de hora a hora; os restantes têm a data dos dados indicada em cada página.

## Páginas

- [Coimbra, agora](${url()}): temperatura, qualidade do ar (índice europeu EAQI), caudal do rio Mondego e risco de incêndio em Coimbra, em directo, com a previsão das próximas horas e da semana.
- [Território](${url('territorio')}): as ${MUNICIPALITY.parishes} freguesias do concelho de Coimbra em mapa e em tabela. Em ${PARISH_CENSUS_YEAR} o concelho tinha ${fmt(MUNICIPALITY.population)} habitantes em ${fmt(MUNICIPALITY.areaKm2)} km² (${fmt(MUNICIPALITY.density)} hab./km²); a freguesia mais populosa é ${maisPovoada.name}, com ${fmt(maisPovoada.population)}. Também variação da população 2011–2021, envelhecimento e casas sem residentes.${lido('territorio')}
- [Turismo](${url('turismo')}): dormidas, hóspedes, estada média, camas e ocupação no alojamento turístico de Coimbra. Em 2024: ${fmt(PORDATA_TURISMO.dormidas[2024])} dormidas (${fmt(PORDATA_TURISMO.dormidas[2019])} em 2019); estada média de ${fmt(estada.coimbra, 1)} noites em Coimbra contra ${fmt(estada.portugal, 1)} em Portugal.${lido('turismo')}
- [Zonas verdes](${url('zonas-verdes')}): ${SPACES.length} espaços verdes públicos com nome em Coimbra — matas, parques, jardins e reservas —, ${formatHa(TOTAL_HA)} hectares no total, ${IN_CITY.length} deles a menos de ${CITY_RADIUS_KM} km do centro. Área, tipo e distância de cada um.${lido('zonas-verdes')}
- [Trilhos](${url('trilhos')}): ${TRILHOS.length} percursos pedestres na Região de Coimbra, ${fmt(TOTAL_KM)} km no total — pequenas e grandes rotas, com extensão, desnível, perfil de altitude e, quando existe, duração e dificuldade da ficha oficial.${lido('trilhos')}
- [Visitar](${url('visitar')}): um dia em Coimbra a pé, em ${paragens.length} paragens pela ordem do dia: ${paragens.join(', ')}. Com o Mosteiro de Santa Cruz, a Sé Velha e o Paço das Escolas em maqueta 3D.
- [História — Aeminium](${url('historia')}): a Coimbra romana. O criptopórtico do fórum de Aeminium, por baixo do Museu Nacional de Machado de Castro, em corte e em planta, com o grau de certeza de cada afirmação.
- [Zonas urbanas](${url('zonas-urbanas')}): ${ZONAS_URBANAS.map(({ zona }) => zona.nome).join(' e ')} em maqueta tridimensional, ${fmt(edificios)} edifícios.${lido('zonas-urbanas')}
${ZONAS_URBANAS.map(({ zona, resumo }) => `  - [${zona.nome}](${url(`zonas-urbanas/${zona.id}`)}): ${resumo}`).join('\n')}
- [Agenda](${url('agenda')}): o que está marcado em Coimbra este mês e as festas que voltam todos os anos: ${festas}.
- [Lendas](${url('lendas')}): lendas de Coimbra em desenho animado, com o que é história separado do que é lenda. Primeiro episódio: Pedro e Inês.
- [Sobre](${url('sobre')}): o que é o ${SITE_NAME} e as regras que segue, com um filme de três minutos sobre Coimbra.

## Opcional

- [Mapa do site](${url('sitemap.xml')})
`
  return new Response(texto, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
