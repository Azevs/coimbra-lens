import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export interface HourlyPoint { hour: number; temp: number; precipProb: number }
export interface DailyPoint { date: string; maxTemp: number; minTemp: number; weatherCode: number; precip: number }
export interface ForecastData { hourly: HourlyPoint[]; daily: DailyPoint[]; fallback?: boolean }

export function useForecast() {
  return useQuery<ForecastData>({
    queryKey: ['forecast'],
    queryFn: () => axios.get('/api/forecast').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  })
}
