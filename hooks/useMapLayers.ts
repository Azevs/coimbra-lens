import { create } from 'zustand'

/**
 * O mapa tinha três camadas: economia, demografia e mobilidade. Só a
 * demografia assentava em dados reais — o rendimento por freguesia não é
 * publicado e a "mobilidade" era população × 0.12. Restou uma variável,
 * por isso restou só a selecção de freguesia.
 *
 * A freguesia sob o rato vive aqui também: as peças do topo, o mapa e a
 * tabela realçam-na os três ao mesmo tempo.
 */
interface MapState {
  selectedParish: string | null
  setParish: (parish: string | null) => void
  activeParish: string | null
  setActiveParish: (parish: string | null) => void
}

export const useMapLayers = create<MapState>((set) => ({
  selectedParish: null,
  setParish: (parish) => set({ selectedParish: parish }),
  activeParish: null,
  setActiveParish: (parish) => set({ activeParish: parish }),
}))
