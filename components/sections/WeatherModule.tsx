'use client'

import type { ReactNode } from 'react'
import { useWeather } from '@/hooks/useWeather'
import GlassCard from '@/components/ui/GlassCard'
import Label from '@/components/ui/Label'
import Icon, { weatherIcon } from '@/components/ui/Icon'
import DataSource, { DataUnavailable } from '@/components/ui/DataSource'
import { fmt } from '@/lib/format'

function getWeatherLabel(code: number): string {
  if (code === 0) return 'Céu limpo'
  if (code <= 3) return 'Parcialmente nublado'
  if (code <= 48) return 'Nevoeiro'
  if (code <= 67) return 'Chuva'
  if (code <= 77) return 'Neve'
  if (code <= 82) return 'Aguaceiros'
  return 'Trovoada'
}

const RUMOS = ['norte', 'nordeste', 'leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste']
const rumo = (graus: number) => RUMOS[Math.round((((graus % 360) + 360) % 360) / 45) % 8]

/** Categorias do índice UV da OMS. */
const UV: { ate: number; label: string; cor: string }[] = [
  { ate: 2, label: 'Baixo', cor: 'var(--tone-moss)' },
  { ate: 5, label: 'Moderado', cor: 'var(--tone-amber)' },
  { ate: 7, label: 'Elevado', cor: 'var(--tone-clay)' },
  { ate: 10, label: 'Muito elevado', cor: 'var(--tone-crimson)' },
  { ate: Infinity, label: 'Extremo', cor: 'var(--tone-violet)' },
]

/**
 * A rosa-dos-ventos: a seta aponta para onde o vento vai, como nos mapas
 * do tempo; o texto diz de onde vem, como se diz em português.
 */
function Rosa({ direcao }: { direcao: number }) {
  const para = direcao + 180
  return (
    <svg width="84" height="84" viewBox="-50 -50 100 100" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle r="40" fill="none" stroke="var(--border-panel)" strokeWidth="1" />
      {Array.from({ length: 16 }, (_, i) => (
        <line
          key={i}
          x1="0" y1={-40}
          x2="0" y2={i % 4 === 0 ? -33 : -37}
          stroke="var(--text-tertiary)" strokeWidth={i % 4 === 0 ? 1.5 : 1}
          transform={`rotate(${i * 22.5})`}
        />
      ))}
      {(['N', 'E', 'S', 'O'] as const).map((l, i) => (
        <text
          key={l}
          x={[0, 29, 0, -29][i]} y={[-25, 3.5, 32, 3.5][i]}
          textAnchor="middle" fontSize="10" fill="var(--text-tertiary)"
          fontFamily="var(--font-jetbrains)"
        >
          {l}
        </text>
      ))}
      <g transform={`rotate(${para})`} className="rosa-seta">
        <line x1="0" y1="17" x2="0" y2="-12" stroke="var(--tone-teal)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M0,-21 L-6,-10 L6,-10 Z" fill="var(--tone-teal)" />
      </g>
      <circle r="3" fill="var(--bg-primary)" stroke="var(--tone-teal)" strokeWidth="1.5" />
    </svg>
  )
}

function Linha({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tempo-linha">
      <Label style={{ margin: 0 }}>{label}</Label>
      <span className="tempo-valor">{children}</span>
    </div>
  )
}

export default function WeatherModule() {
  const { data: weather, isLoading } = useWeather()

  if (isLoading || !weather) {
    return (
      <GlassCard>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-[var(--bg-sunken)] rounded w-24" />
          <div className="h-16 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
          <div className="h-4 bg-[var(--bg-sunken)] rounded" />
        </div>
      </GlassCard>
    )
  }

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
      <div>
        <Label style={{ marginBottom: '4px' }}>Agora, em detalhe</Label>
        {weather.weatherCode !== null && (
          <span className="ui-note">{getWeatherLabel(weather.weatherCode)}</span>
        )}
      </div>
      {weather.weatherCode !== null && (
        <Icon name={weatherIcon(weather.weatherCode)} size={32} style={{ color: 'var(--text-secondary)', strokeWidth: 1.25 }} />
      )}
    </div>
  )

  // Sem leitura, o cartão diz que não sabe em vez de mostrar valores fixos.
  if (weather.temperature === null) {
    return (
      <GlassCard>
        {header}
        <DataUnavailable meta={weather.meta} />
        <DataSource meta={weather.meta} showNote={false} />
      </GlassCard>
    )
  }

  const uv = weather.uvIndex !== null ? UV.find((c) => Math.round(weather.uvIndex!) <= c.ate)! : null

  return (
    <GlassCard>
      {header}

      {weather.windSpeed !== null && (
        <div className="tempo-vento">
          {weather.windDirection !== null && <Rosa direcao={weather.windDirection} />}
          <div>
            <span className="tempo-vento-titulo">
              {/* Abaixo de 1 km/h é calmaria (Beaufort 0). */}
              {weather.windSpeed < 1
                ? 'Calmaria'
                : weather.windDirection !== null
                  ? `Vento de ${rumo(weather.windDirection)}`
                  : 'Vento'}
            </span>
            <span className="tempo-vento-num">
              {fmt(weather.windSpeed, weather.windSpeed < 10 ? 1 : 0)}<small> km/h</small>
            </span>
            {weather.windGusts !== null && (
              <span className="ui-note" style={{ display: 'block' }}>rajadas até {fmt(weather.windGusts)} km/h</span>
            )}
          </div>
        </div>
      )}

      {weather.apparentTemperature !== null && (
        <Linha label="Sensação térmica">{fmt(weather.apparentTemperature, 1)}°</Linha>
      )}

      {uv && weather.uvIndex !== null && (
        <div className="tempo-linha tempo-uv">
          <Label style={{ margin: 0 }}>Índice UV</Label>
          <span className="tempo-valor" style={{ color: uv.cor }}>
            {fmt(weather.uvIndex)} · {uv.label}
          </span>
          <span className="tempo-uv-escala" aria-hidden="true">
            {UV.map((c) => (
              <i key={c.label} style={{ background: c === uv ? c.cor : undefined }} />
            ))}
          </span>
        </div>
      )}

      {weather.humidity !== null && (
        <div className="tempo-linha">
          <Label style={{ margin: 0 }}>Humidade</Label>
          <span className="tempo-valor">{fmt(weather.humidity)} %</span>
          <span className="tempo-barra" aria-hidden="true">
            <i style={{ width: `${weather.humidity}%` }} />
          </span>
        </div>
      )}

      {weather.precipitation !== null && (
        <Linha label="Precipitação">{fmt(weather.precipitation, 1)} mm</Linha>
      )}

      <DataSource meta={weather.meta} />
    </GlassCard>
  )
}
