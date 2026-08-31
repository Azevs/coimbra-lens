import Link from 'next/link'

export default function NotFound() {
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
      <span className="label-text" style={{ color: 'var(--accent)' }}>
        Erro 404
      </span>
      <h1 className="font-display" style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>
        Página não encontrada
      </h1>
      <Link
        href="/"
        style={{ color: 'var(--accent)', textDecoration: 'none', fontFamily: 'var(--font-ibm-plex)' }}
      >
        Voltar ao painel →
      </Link>
    </div>
  )
}
