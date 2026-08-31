'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { WeatherPayload } from '@/app/api/weather/route'

export type { WeatherPayload } from '@/app/api/weather/route'

export function useWeather() {
  return useQuery<WeatherPayload>({
    queryKey: ['weather', 'coimbra'],
    queryFn: () => internalApi.get('/weather').then((r) => r.data),
    refetchInterval: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
  })
}
