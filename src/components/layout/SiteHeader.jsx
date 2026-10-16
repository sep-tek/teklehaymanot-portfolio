import { focus, navLinks, profile } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import './siteHeader.css'

const SECTION_IDS = ['main', ...navLinks.map((link) => link.id)]

/**
 * Fixed overlay header.
 *
 * Five zones on one grid: wordmark, availability + email, summary, nav,
 * theme control. The nav reflects the section currently in view via
 * IntersectionObserver rather than on click, so it stays honest when the
 * user scrolls or uses the back button.
 */
export default function SiteHeader() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <a className="site-header__wordmark" href="#main" aria-label={`${profile.name} — back to top`}>
        {profile.nameLines.map((line) => (
          <span key={line} className="site-header__wordmark-line">
            {line}
          </span>
        ))}
      </a>

      <p className="site-header__availability">
        <span className="site-header__availability-label">{profile.availabilityLabel}</span>
        <a className="site-header__email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>

      <div className="site-header__summary">
        {focus.strong.map((line) => (
          <p key={line} className="site-header__summary-line site-header__summary-line--strong">
            {line}
          </p>
        ))}
        {focus.plain.map((line) => (
          <p key={line} className="site-header__summary-line">
            {line}
          </p>
        ))}
      </div>

      <nav className="site-nav" aria-label="Primary">
        <ul className="site-nav__list">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  className={`site-nav__link ${isActive ? 'is-active' : ''}`}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <ThemeSwitcher />
    </header>
  )
}
