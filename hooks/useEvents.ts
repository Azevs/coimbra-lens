'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { EventsPayload } from '@/app/api/events/route'

export type { EventsPayload, CityEvent } from '@/app/api/events/route'

export function useEvents() {
  return useQuery<EventsPayload>({
    queryKey: ['events'],
    queryFn: () => internalApi.get('/events').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
  })
}
