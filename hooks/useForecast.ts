'use client'

import { useQuery } from '@tanstack/react-query'
import { internalApi } from '@/lib/api-clients'
import type { ForecastPayload } from '@/app/api/forecast/route'

export type { ForecastPayload, ForecastDay, ForecastHour } from '@/app/api/forecast/route'

export function useForecast() {
  return useQuery<ForecastPayload>({
    queryKey: ['forecast'],
    queryFn: () => internalApi.get('/forecast').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
  })
}
