import { GET as tempo } from '@/app/api/weather/route'
import { GET as ar } from '@/app/api/air-quality/route'
import { GET as rio } from '@/app/api/river/route'
import { GET as previsao } from '@/app/api/forecast/route'
import { GET as ipma } from '@/app/api/ipma/route'
import type { WeatherPayload } from '@/app/api/weather/route'
import type { AirQualityPayload } from '@/app/api/air-quality/route'
import type { RiverPayload } from '@/app/api/river/route'
import type { ForecastPayload } from '@/app/api/forecast/route'
import type { IpmaPayload } from '@/app/api/ipma/route'

/** As leituras com que o herói da primeira página abre, lidas no servidor. */
export interface LeiturasIniciais {
  weather?: WeatherPayload
  air?: AirQualityPayload
  river?: RiverPayload
  forecast?: ForecastPayload
  ipma?: IpmaPayload
}

/**
 * Chama as mesmas rotas que o browser chama, mas no servidor, para que o
 * HTML da primeira página já traga os números da cidade — é esse HTML que
 * os motores de pesquisa e os assistentes lêem, e a maioria não corre
 * JavaScript. Uma rota que falhe fica de fora; o browser tenta outra vez.
 */
export async function leiturasIniciais(): Promise<LeiturasIniciais> {
  const ler = async <T>(get: () => Promise<Response>): Promise<T | undefined> => {
    try {
      return (await (await get()).json()) as T
    } catch {
      return undefined
    }
  }
  const [weather, air, river, forecast, ipmaDados] = await Promise.all([
    ler<WeatherPayload>(tempo),
    ler<AirQualityPayload>(ar),
    ler<RiverPayload>(rio),
    ler<ForecastPayload>(previsao),
    ler<IpmaPayload>(ipma),
  ])
  return { weather, air, river, forecast, ipma: ipmaDados }
}
