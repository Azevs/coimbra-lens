import Image from 'next/image'

import type { UrbanZone } from '@/lib/urban-zones'

/**
 * Uma vista da maqueta, e a chave de três estados que a torna legível.
 *
 * A chave diz o estado de cada volume, não de onde vem o dado: sem ela as
 * manchas no chão parecem defeito de renderização. São três termos e mais
 * nada — a explicação do método não pertence à página.
 */

const LEGENDA = [
  { cor: '#F2EEE6', borda: 'var(--border-strong)', termo: 'altura conhecida' },
  { cor: '#CFC6B2', borda: 'var(--border-panel)', termo: 'um piso' },
  { cor: '#B4AB97', borda: 'var(--border-panel)', termo: 'altura por registar' },
] as const

export function LegendaMaqueta() {
  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem 2rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {LEGENDA.map((l) => (
        <li key={l.termo} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
          <span
            aria-hidden
            style={{
              width: '14px',
              height: '14px',
              marginTop: '2px',
              flexShrink: 0,
              background: l.cor,
              border: `1px solid ${l.borda}`,
            }}
          />
          <span style={{ fontSize: '0.8125rem', lineHeight: 1.45, color: 'var(--text-secondary)' }}>
            {l.termo}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Maqueta({
  zona,
  vista,
  largura,
  altura,
  legenda,
  prioridade = false,
}: {
  zona: UrbanZone
  /** Nome da estampa em `public/maquetas/<zona>-<vista>.webp`, como no `maqueta.py`. */
  vista: string
  largura: number
  altura: number
  /** A frase por baixo da imagem. É o que descreve a vista a quem não a vê. */
  legenda: string
  prioridade?: boolean
}) {
  return (
    <figure style={{ margin: 0 }}>
      {/* Sem caixa nem fundo: os renders saem com canal alfa, e a maqueta
          pousa directamente no papel da página como uma estampa. */}
      <div>
        <Image
          src={`/maquetas/${zona.id}-${vista}.webp`}
          width={largura}
          height={altura}
          alt={`Maqueta da ${zona.nome}: ${legenda}`}
          priority={prioridade}
          sizes="(min-width: 1200px) 1140px, 100vw"
          // O optimizador do Next reconverte a imagem e perde o canal alfa —
          // o céu transparente sairia como um rectângulo cinzento sobre o
          // papel. Estes ficheiros já vêm dimensionados e em WebP a ~50 KB
          // do `optimise-maquetas.mjs`, portanto não há nada a optimizar.
          unoptimized
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
      <figcaption
        style={{
          marginTop: '0.75rem',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          maxWidth: '42rem',
        }}
      >
        {legenda}
      </figcaption>
    </figure>
  )
}
