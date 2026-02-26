'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'

export interface BusData {
  line: string
  destination: string
  arrival: number
  status: string
  updatedAt: string
}

export interface TransportResponse {
  buses: BusData[]
  fallback?: boolean
  source?: string
}

export function useTransport() {
  return useQuery<TransportResponse>({
    queryKey: ['transport', 'coimbra'],
    queryFn: () => internalApi.get('/transport').then((r) => r.data),
    refetchInterval: 30 * 1000,
    staleTime: 15 * 1000,
  })
}
