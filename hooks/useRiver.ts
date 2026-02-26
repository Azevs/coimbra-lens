import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface RiverData {
  level: number
  flow: number | null
  trend: 'rising' | 'falling' | 'stable'
  history: number[]
  fallback?: boolean
}

export function useRiver() {
  return useQuery<RiverData>({
    queryKey: ['river'],
    queryFn: () => axios.get('/api/river').then((r) => r.data),
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  })
}
