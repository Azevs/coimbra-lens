import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/ui/SectionTitle'
import { MAP_VIEW, PARISH_SHAPES } from '@/lib/parish-map'
import { CITY_FOCUS, GREEN_SPACES, WATER } from '@/lib/green-spaces'
import { ATTRACTIONS, WALKING_ROUTE } from '@/lib/attractions'
import { URBAN_ZONES } from '@/lib/urban-zones'
import { fmt } from '@/lib/format'

/**
 * As portas para o resto do site.
 *
 * A primeira página mostrava a cidade desta hora e parava aí; as maquetas,
 * o corte do Aeminium e os mapas viviam atrás de links de texto na barra.
 * Cada porta leva um bocado do que está do outro lado — a geometria e os
 * números saem dos mesmos dados das páginas, não são ilustração.
 *
 * Renderiza no servidor: os desenhos vão no HTML e não pesam no JavaScript.
 */

const GREEN_BOX = {
  x: CITY_FOCUS.x - CITY_FOCUS.r * 1.05,
  y: CITY_FOCUS.y - CITY_FOCUS.r * 1.05,
  w: CITY_FOCUS.r * 2.1,
  h: CITY_FOCUS.r * 2.1,
}
const verdesNaCidade = GREEN_SPACES.filter((s) => s.distanceKm <= 3)

const porId = new Map(ATTRACTIONS.map((a) => [a.id, a]))
const paragens = WALKING_ROUTE.map((p) => porId.get(p.id)?.name).filter((n): n is string => Boolean(n))

const edificios = URBAN_ZONES.reduce((n, z) => n + z.edificios, 0)

function Entrar() {
  return (
    <span className="porta-entrar">
      Entrar <span aria-hidden="true">→</span>
    </span>
  )
}

export default function Explorar() {
  return (
    <section id="explorar" className="page-section explorar">
      <div className="section-container">
        <SectionTitle
          label="EXPLORAR"
          title="A cidade para lá desta hora"
          subtitle="Maquetas das ruas, o fórum romano debaixo da Alta, as freguesias, os jardins e um roteiro a pé."
        />

        <div className="portas">
          {/* Zonas urbanas — o render da maqueta, tal como está na página */}
          <Link href="/zonas-urbanas" className="porta porta-maqueta">
            <Image
              src="/maquetas/baixa-conjunto.webp"
              alt="Maqueta tridimensional da Baixa de Coimbra, edifício a edifício"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              // Como na página das maquetas: o optimizador perdia o céu
              // transparente do render.
              unoptimized
              className="porta-imagem"
            />
            <span className="porta-texto">
              <span className="porta-area">Zonas urbanas</span>
              <span className="porta-titulo">A cidade em maqueta</span>
              <span className="porta-linha">
                {URBAN_ZONES.map((z) => z.nome).join(' e ')} em 3D · {fmt(edificios)} edifícios
              </span>
              <Entrar />
            </span>
          </Link>

          {/* História — o capítulo escuro */}
          <Link href="/historia" className="porta porta-historia historia-escuro">
            <span className="porta-texto">
              <span className="porta-area">História</span>
              <span className="porta-titulo porta-titulo-grande">
                <span className="font-display-italic">Aeminium</span>
              </span>
              <span className="porta-linha">
                Antes de ser Coimbra. O chão do fórum romano ainda está por baixo do Machado de Castro.
              </span>
              <Entrar />
            </span>
            <span className="porta-camadas" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
          </Link>

          {/* Território — as 18 freguesias, da carta oficial */}
          <Link href="/territorio" className="porta porta-desenho">
            <svg
              className="porta-figura"
              viewBox={`0 0 ${MAP_VIEW.width} ${MAP_VIEW.height}`}
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              {PARISH_SHAPES.map((p) => (
                <path key={p.code} d={p.d} />
              ))}
            </svg>
            <span className="porta-texto">
              <span className="porta-area">Território</span>
              <span className="porta-titulo">{PARISH_SHAPES.length} freguesias</span>
              <span className="porta-linha">Em mapa e em número: onde vive a população do município.</span>
              <Entrar />
            </span>
          </Link>

          {/* Zonas verdes — os espaços a 3 km do centro, e o rio */}
          <Link href="/zonas-verdes" className="porta porta-desenho porta-verde">
            <svg
              className="porta-figura"
              viewBox={`${GREEN_BOX.x} ${GREEN_BOX.y} ${GREEN_BOX.w} ${GREEN_BOX.h}`}
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
            >
              <path d={WATER.areas} className="porta-agua" />
              <path d={WATER.lines} className="porta-rio" />
              {verdesNaCidade.map((s) => (
                <path key={s.id} d={s.d} className="porta-mancha" />
              ))}
            </svg>
            <span className="porta-texto">
              <span className="porta-area">Zonas verdes</span>
              <span className="porta-titulo">{GREEN_SPACES.length} espaços verdes</span>
              <span className="porta-linha">Matas, parques e jardins com nome, a sua área e a distância ao centro.</span>
              <Entrar />
            </span>
          </Link>

          {/* Visitar — o roteiro, pela ordem em que se caminha */}
          <Link href="/visitar" className="porta porta-roteiro">
            <span className="porta-texto">
              <span className="porta-area">Visitar</span>
              <span className="porta-titulo">Uma manhã a pé</span>
            </span>
            <ol className="porta-paragens">
              {paragens.slice(0, 5).map((nome) => (
                <li key={nome}>{nome}</li>
              ))}
            </ol>
            <span className="porta-texto">
              <span className="porta-linha">
                {paragens.length} paragens, da Alta à margem esquerda.
              </span>
              <Entrar />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
