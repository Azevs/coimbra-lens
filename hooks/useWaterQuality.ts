'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { WaterQualityPayload } from '@/app/api/water-quality/route'

export type { WaterQualityPayload } from '@/app/api/water-quality/route'

export function useWaterQuality() {
  return useQuery<WaterQualityPayload>({
    queryKey: ['water-quality'],
    queryFn: () => internalApi.get('/water-quality').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
