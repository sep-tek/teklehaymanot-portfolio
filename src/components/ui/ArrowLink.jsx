import { ArrowUpRight } from 'lucide-react'

/**
 * Editorial text link with an arrow that slides on hover.
 * Used in the Work and Contact sections.
 */
export default function ArrowLink({ href, children, external = true, className = '' }) {
  return (
    <a
      className={`arrow-link ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      <span className="arrow-link__label">{children}</span>
      <ArrowUpRight className="arrow-link__icon" size={14} strokeWidth={1.6} aria-hidden="true" />
    </a>
  )
}
