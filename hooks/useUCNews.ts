import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface UCNewsItem {
  title: string
  link: string
  date: string
  category: string
}

export interface UCNewsData {
  items: UCNewsItem[]
  fallback?: boolean
}

export function useUCNews() {
  return useQuery<UCNewsData>({
    queryKey: ['uc-news'],
    queryFn: () => axios.get('/api/uc-news').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  })
}
