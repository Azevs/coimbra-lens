'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { DemografiaPayload } from '@/app/api/demografia/route'

export type { DemografiaPayload } from '@/app/api/demografia/route'

export function useDemografia() {
  return useQuery<DemografiaPayload>({
    queryKey: ['demografia'],
    queryFn: () => internalApi.get('/demografia').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
