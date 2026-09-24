'use client'

import { create } from 'zustand'
import { FILTROS_INICIAIS, type Filtros } from '@/lib/trilhos'

/**
 * O que o mapa, a ficha, o perfil e a lista partilham.
 *
 * `posicao` é a fracção do percurso (0 a 1) sob o dedo no perfil, ou a do
 * caminhante durante o voo — o mapa põe o ponto lá, o perfil põe o cursor.
 */
interface EstadoTrilhos {
  selecionado: string | null
  sobre: string | null
  posicao: number | null
  aPercorrer: boolean
  filtros: Filtros
  escolher: (id: string | null) => void
  pairar: (id: string | null) => void
  posicionar: (f: number | null) => void
  percorrer: (sim: boolean) => void
  filtrar: (f: Partial<Filtros>) => void
}

export const useTrilhos = create<EstadoTrilhos>((set) => ({
  selecionado: null,
  sobre: null,
  posicao: null,
  aPercorrer: false,
  filtros: FILTROS_INICIAIS,
  escolher: (id) => set({ selecionado: id, posicao: null, aPercorrer: false }),
  pairar: (id) => set({ sobre: id }),
  posicionar: (posicao) => set({ posicao }),
  percorrer: (aPercorrer) => set({ aPercorrer, posicao: aPercorrer ? 0 : null }),
  filtrar: (f) => set((s) => ({ filtros: { ...s.filtros, ...f } })),
}))
