import axios from 'axios'

export const internalApi = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export const openMeteoApi = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
})

export const openAqApi = axios.create({
  baseURL: 'https://api.openaq.org/v2',
  timeout: 10000,
})
