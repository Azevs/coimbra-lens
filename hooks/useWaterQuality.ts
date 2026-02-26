import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface WaterQualityData {
  ph: number
  chlorine: number
  turbidity: number
  nitrates: number
  conductivity: number
  status: string
  source: string
  lastAnalysis: string
  reference?: boolean
}

export function useWaterQuality() {
  return useQuery<WaterQualityData>({
    queryKey: ['water-quality'],
    queryFn: () => axios.get('/api/water-quality').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
