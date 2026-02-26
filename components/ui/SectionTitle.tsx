'use client'

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
}

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12">
      <span className="label-text text-[var(--accent-gold)] mb-3 block">{label}</span>
      <h2 className="font-display text-3xl md:text-5xl text-[var(--text-primary)] mb-3">
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '42rem', lineHeight: 1.65 }}>{subtitle}</p>
      )}
    </div>
  )
}
