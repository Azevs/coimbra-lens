import { create } from 'zustand'

export type LayerType = 'economia' | 'demografia' | 'mobilidade'

interface MapLayersState {
  activeLayer: LayerType
  selectedParish: string | null
  setLayer: (layer: LayerType) => void
  setParish: (parish: string | null) => void
}

export const useMapLayers = create<MapLayersState>((set) => ({
  activeLayer: 'economia',
  selectedParish: null,
  setLayer: (layer) => set({ activeLayer: layer }),
  setParish: (parish) => set({ selectedParish: parish }),
}))
