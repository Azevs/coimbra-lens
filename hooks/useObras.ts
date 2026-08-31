'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { ObrasPayload } from '@/app/api/obras/route'

export type { ObrasPayload, Obra } from '@/app/api/obras/route'

export function useObras() {
  return useQuery<ObrasPayload>({
    queryKey: ['obras'],
    queryFn: () => internalApi.get('/obras').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
