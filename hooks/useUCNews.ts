'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { UCNewsPayload } from '@/app/api/uc-news/route'

export type { UCNewsPayload, UCNewsItem } from '@/app/api/uc-news/route'

export function useUCNews() {
  return useQuery<UCNewsPayload>({
    queryKey: ['uc-news'],
    queryFn: () => internalApi.get('/uc-news').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
  })
}
