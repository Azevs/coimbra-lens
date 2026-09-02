import type { CSSProperties } from 'react'

/**
 * Ícones de linha, a uma cor, desenhados para o papel da Gazeta.
 *
 * Substituem os emojis que estavam no tempo, nos factos rápidos, na agenda
 * anual e nos botões do mapa. Um emoji muda de desenho consoante o sistema
 * operativo e destoava das chapas desenhadas de Visitar; estes herdam a
 * cor do texto e são iguais em todo o lado.
 */
export type IconName =
  | 'sun'
  | 'cloud'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'drop'
  | 'wind'
  | 'hospital'
  | 'bus'
  | 'train'
  | 'river'
  | 'graduation'
  | 'landmark'
  | 'bike'
  | 'music'
  | 'theatre'
  | 'book'
  | 'leaf'
  | 'star'
  | 'car'
  | 'alert'

const PATHS: Record<IconName, string> = {
  sun: 'M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  cloud: 'M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 9a4.5 4.5 0 0 1 0 9z',
  fog: 'M4 10h13M6 14h12M4 18h10M17 10a4 4 0 0 0-7.7-1.5A3.5 3.5 0 0 0 6.5 10',
  rain: 'M7 14a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 5a4.5 4.5 0 0 1 0 9M9 17l-1 3M13 17l-1 3M17 17l-1 3',
  snow: 'M7 14a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 5a4.5 4.5 0 0 1 0 9M9 18h.01M13 20h.01M17 18h.01',
  storm: 'M7 14a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 5a4.5 4.5 0 0 1 0 9M13 12l-2.5 5H14l-2.5 5',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  wind: 'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8a2 2 0 1 1-2 2',
  hospital: 'M4 21V7l8-4 8 4v14M4 21h16M12 10v6M9 13h6',
  bus: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM3 11h18M7 18v2M17 18v2M7 14h.01M17 14h.01',
  train: 'M6 3h12a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zM4 10h16M8 21l1-3M16 21l-1-3M8 14h.01M16 14h.01',
  river: 'M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
  graduation: 'M2 9l10-4 10 4-10 4-10-4zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6',
  landmark: 'M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M2 10l10-6 10 6H2z',
  bike: 'M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 14l4-8h4M12 6l3 8M9 6l3 8h7',
  music: 'M9 18V5l11-2v13M9 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM20 16a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z',
  theatre: 'M4 4h16v8a8 8 0 0 1-16 0V4zM8 9h.01M16 9h.01M8 14c1 1.5 2.5 2 4 2s3-.5 4-2',
  book: 'M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7V4z',
  leaf: 'M5 19C5 9 11 5 20 4c-1 9-5 15-15 15zM5 19c3-4 6-7 10-9',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z',
  car: 'M5 15l1.5-5h11L19 15M3 15h18v4H3zM7 19v1M17 19v1M7 16h.01M17 16h.01',
  alert: 'M12 3l10 18H2L12 3zM12 10v4M12 17h.01',
}

export default function Icon({
  name,
  size = 16,
  style,
  className,
}: {
  name: IconName
  size?: number
  style?: CSSProperties
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      <path d={PATHS[name]} />
    </svg>
  )
}

/** Código WMO do Open-Meteo → ícone. Partilhado pelo clima e pela previsão. */
export function weatherIcon(code: number): IconName {
  if (code === 0) return 'sun'
  if (code <= 3) return 'cloud'
  if (code <= 48) return 'fog'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  if (code <= 82) return 'rain'
  if (code <= 86) return 'snow'
  return 'storm'
}
