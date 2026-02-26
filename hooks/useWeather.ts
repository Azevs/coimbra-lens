'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'

export interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  precipitation: number
  fallback?: boolean
}

export function useWeather() {
  return useQuery<WeatherData>({
    queryKey: ['weather', 'coimbra'],
    queryFn: () => internalApi.get('/weather').then((r) => r.data),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
  })
}
