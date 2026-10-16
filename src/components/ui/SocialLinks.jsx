import { socialLinks } from '../../data/content'
import { CONTACT_ICONS } from './contactIcons'
import './socialLinks.css'

/**
 * Contact list for the hero footer. Shares its icon map with the Contact
 * section so the two can never drift apart. Every entry now has a real glyph —
 * there is no null-icon fallback path left.
 */
export default function SocialLinks() {
  return (
    <ul className="social-links">
      {socialLinks.map((link) => {
        const Icon = CONTACT_ICONS[link.id]

        return (
          <li key={link.id}>
            <a
              className="social-links__link"
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              <Icon className="social-links__icon" size={13} strokeWidth={1.6} aria-hidden="true" />
              <span>{link.label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
