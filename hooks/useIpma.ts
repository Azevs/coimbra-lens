'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { IpmaPayload } from '@/app/api/ipma/route'

export type { IpmaPayload, Warning, WarningLevel, FireRisk } from '@/app/api/ipma/route'

export function useIpma() {
  return useQuery<IpmaPayload>({
    queryKey: ['ipma', 'coimbra'],
    queryFn: () => internalApi.get('/ipma').then((r) => r.data),
    refetchInterval: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  })
}
