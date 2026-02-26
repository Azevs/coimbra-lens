import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface CityEvent {
  id: string
  title: string
  date: string
  venue: string
  category: string
  url: string
  isFree: boolean
}

export interface EventsData {
  events: CityEvent[]
  fallback?: boolean
}

export function useEvents() {
  return useQuery<EventsData>({
    queryKey: ['events'],
    queryFn: () => axios.get('/api/events').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  })
}
