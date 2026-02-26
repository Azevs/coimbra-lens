import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface Obra {
  id: string
  title: string
  parish: string
  type: string
  status: string
  startDate: string
  color: string
}

export interface ObrasData {
  obras: Obra[]
  total: number
  emCurso: number
  previstas: number
  reference?: boolean
}

export function useObras() {
  return useQuery<ObrasData>({
    queryKey: ['obras'],
    queryFn: () => axios.get('/api/obras').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
