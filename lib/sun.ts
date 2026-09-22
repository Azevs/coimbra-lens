/**
 * A altura do sol sobre Coimbra, para a luz da primeira página.
 *
 * É astronomia, não uma leitura: a posição do sol calcula-se a partir da
 * hora e das coordenadas, sem pedir nada a ninguém. A aproximação é a do
 * Almanaque Náutico (erro abaixo de um grau), mais do que chega para
 * decidir se a cidade está de dia, ao amanhecer, ao entardecer ou de noite.
 */

export const COIMBRA = { lat: 40.2033, lon: -8.4103 }

export type Luz = 'dawn' | 'day' | 'dusk' | 'night'

const RAD = Math.PI / 180

/** Elevação do sol em graus, e se é de manhã (antes da passagem meridiana). */
export function solar(date: Date, lat = COIMBRA.lat, lon = COIMBRA.lon): { elevation: number; morning: boolean } {
  // Dias desde J2000.0
  const d = date.getTime() / 86400000 - 10957.5
  const g = (357.529 + 0.98560028 * d) * RAD
  const q = 280.459 + 0.98564736 * d
  const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD
  const e = (23.439 - 0.00000036 * d) * RAD

  const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)) / RAD
  const decl = Math.asin(Math.sin(e) * Math.sin(L))
  const gmst = (18.697374558 + 24.06570982441908 * d) % 24

  // Ângulo horário em (-180, 180]: negativo antes do meio-dia solar.
  let h = (gmst * 15 + lon - ra) % 360
  if (h > 180) h -= 360
  if (h <= -180) h += 360

  const phi = lat * RAD
  const sinAlt = Math.sin(phi) * Math.sin(decl) + Math.cos(phi) * Math.cos(decl) * Math.cos(h * RAD)
  return { elevation: Math.asin(sinAlt) / RAD, morning: h < 0 }
}

/**
 * A luz do momento. Abaixo do crepúsculo civil (−6°) é noite; até o sol
 * subir 8° acima do horizonte é amanhecer ou entardecer, conforme o lado
 * do meio-dia; acima disso é dia.
 */
export function luzAgora(date = new Date()): Luz {
  const { elevation, morning } = solar(date)
  if (elevation < -6) return 'night'
  if (elevation < 8) return morning ? 'dawn' : 'dusk'
  return 'day'
}

/** Com pouca luz, o texto sobre a cidade passa a tinta clara. */
export const LUZ_ESCURA: Record<Luz, boolean> = { dawn: false, day: false, dusk: true, night: true }
