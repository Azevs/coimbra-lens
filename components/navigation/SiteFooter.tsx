const SOURCES = [
  { label: 'Open-Meteo', href: 'https://www.open-meteo.com' },
  { label: 'CAMS', href: 'https://atmosphere.copernicus.eu' },
  { label: 'GloFAS', href: 'https://global-flood.emergency.copernicus.eu' },
  { label: 'Mapbox', href: 'https://www.mapbox.com/traffic-data' },
  { label: 'INE', href: 'https://www.ine.pt' },
  { label: 'ERSAR', href: 'https://www.ersar.pt' },
  { label: 'CAOP', href: 'https://www.dgterritorio.gov.pt' },
]

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-panel)',
        background: 'var(--bg-sunken)',
      }}
      className="page-section"
    >
      <div
        className="section-container"
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            Coimbra
            <span style={{ color: 'var(--accent-text)', fontStyle: 'italic', fontWeight: 300 }}>Lens</span>
          </p>
          <p style={{ fontFamily: 'var(--font-ibm-plex)', fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 300 }}>
            A cidade em dados
          </p>
        </div>

        <div style={{ maxWidth: '34rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: '0.625rem',
            }}
          >
            Fontes
          </span>
          <p style={{ fontFamily: 'var(--font-ibm-plex)', fontSize: '0.8125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {SOURCES.map((s, i) => (
              <span key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-text)', textDecoration: 'none' }}>
                  {s.label}
                </a>
                {i < SOURCES.length - 1 && <span style={{ color: 'var(--text-tertiary)' }}> · </span>}
              </span>
            ))}
          </p>
          <p style={{ fontFamily: 'var(--font-ibm-plex)', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.75rem', lineHeight: 1.6 }}>
            Cada módulo indica se o valor é uma medição em directo, uma estimativa ou se a fonte
            está indisponível.
          </p>
        </div>
      </div>
    </footer>
  )
}
