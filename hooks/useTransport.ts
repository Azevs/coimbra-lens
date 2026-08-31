'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { TransportPayload } from '@/app/api/transport/route'

export type { TransportPayload, Departure } from '@/app/api/transport/route'

export function useTransport() {
  return useQuery<TransportPayload>({
    queryKey: ['transport', 'coimbra'],
    queryFn: () => internalApi.get('/transport').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
  })
}
