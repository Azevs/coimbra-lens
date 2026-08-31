'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { AirQualityPayload } from '@/app/api/air-quality/route'

export type { AirQualityPayload, Pollen, PollenLevel } from '@/app/api/air-quality/route'

export function useAirQuality() {
  return useQuery<AirQualityPayload>({
    queryKey: ['airQuality', 'coimbra'],
    queryFn: () => internalApi.get('/air-quality').then((r) => r.data),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  })
}
