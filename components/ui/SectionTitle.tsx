'use client'

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      {/* Cartographic rule — signature detail */}
      <div className="cartographic-rule">
        <div className="cartographic-rule-diamond" />
      </div>

      <span
        className="label-text"
        style={{ color: 'var(--accent)', display: 'block', marginBottom: '0.875rem' }}
      >
        {label}
      </span>

      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          marginBottom: subtitle ? '1rem' : 0,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-ibm-plex)',
            color: 'var(--text-secondary)',
            fontSize: '0.9375rem',
            maxWidth: '38rem',
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
