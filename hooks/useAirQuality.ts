'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'

export interface AirQualityData {
  aqi: number
  pm25: number
  pm10: number
  no2: number
  status: string
  fallback?: boolean
}

export function useAirQuality() {
  return useQuery<AirQualityData>({
    queryKey: ['airQuality', 'coimbra'],
    queryFn: () => internalApi.get('/air-quality').then((r) => r.data),
    refetchInterval: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  })
}
