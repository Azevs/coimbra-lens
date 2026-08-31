'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--bg-primary)',
      }}
    >
      <h1 className="font-display" style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>
        O painel não carregou
      </h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '38ch', lineHeight: 1.6 }}>
        Alguma coisa falhou ao montar a página. Os dados em si continuam disponíveis nas fontes
        originais.
      </p>
      <button
        onClick={reset}
        className="btn-primary"
        style={{
          marginTop: '0.5rem',
          background: 'var(--accent)',
          color: 'var(--bg-primary)',
          border: 'none',
          borderRadius: '3px',
          padding: '0.625rem 1.5rem',
          fontFamily: 'var(--font-ibm-plex)',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Tentar de novo
      </button>
    </div>
  )
}
