'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { PordataPayload } from '@/app/api/pordata/route'

export type { PordataPayload, PordataValue } from '@/app/api/pordata/route'

export function usePordata() {
  return useQuery<PordataPayload>({
    queryKey: ['pordata'],
    queryFn: () => internalApi.get('/pordata').then((r) => r.data),
    staleTime: 1000 * 60 * 60 * 24,
  })
}
