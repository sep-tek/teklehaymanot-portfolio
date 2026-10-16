import { ArrowUp } from 'lucide-react'
import { colophon, profile } from '../../data/content'
import ArrowLink from '../ui/ArrowLink'
import './siteFooter.css'

/**
 * Page footer. Distinct from the hero's pinned chrome: this one is a normal
 * document footer that closes the page.
 */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <p className="site-footer__meta">
          <span className="site-footer__mark">
            &copy;{colophon.year} {colophon.wordmark}
          </span>
          <span className="site-footer__role">{profile.role}</span>
        </p>

        <nav className="site-footer__nav" aria-label="Footer">
          <ArrowLink href={`mailto:${profile.email}`} external={false}>
            {profile.email}
          </ArrowLink>
          <ArrowLink href={profile.github}>GitHub</ArrowLink>
        </nav>

        <a className="site-footer__top" href="#main">
          <ArrowUp size={13} strokeWidth={1.8} aria-hidden="true" />
          <span>Back to top</span>
        </a>
      </div>
    </footer>
  )
}
