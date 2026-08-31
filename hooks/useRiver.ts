'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { RiverPayload } from '@/app/api/river/route'

export type { RiverPayload, RiverPoint, RiverTrend } from '@/app/api/river/route'

export function useRiver() {
  return useQuery<RiverPayload>({
    queryKey: ['river'],
    queryFn: () => internalApi.get('/river').then((r) => r.data),
    staleTime: 1000 * 60 * 30,
    refetchInterval: 1000 * 60 * 30,
  })
}
