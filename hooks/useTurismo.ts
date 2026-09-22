'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { TurismoPayload } from '@/app/api/turismo/route'

export type { TurismoPayload } from '@/app/api/turismo/route'

export function useTurismo() {
  return useQuery<TurismoPayload>({
    queryKey: ['turismo'],
    queryFn: () => internalApi.get('/turismo').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
