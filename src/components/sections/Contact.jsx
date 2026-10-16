import { contact, profile, socialLinks } from '../../data/content'
import ArrowLink from '../ui/ArrowLink'
import { CONTACT_ICONS } from '../ui/contactIcons'
import Reveal from '../ui/Reveal'
import { SectionShell } from './About'
import './sections.css'

/** Two logical groups rather than one undifferentiated list. */
const GROUPS = [
  { key: 'direct', label: 'Direct' },
  { key: 'social', label: 'Elsewhere' },
]

export default function Contact() {
  return (
    <SectionShell
      id="contact"
      eyebrow={contact.eyebrow}
      heading={contact.heading}
      className="section--contact"
    >
      <div className="section__prose">
        <Reveal as="p">{contact.body}</Reveal>
        <Reveal as="p" className="contact__note">
          {contact.note}
        </Reveal>
      </div>

      {GROUPS.map((group) => {
        const links = socialLinks.filter((link) => link.group === group.key)
        if (!links.length) return null

        return (
          <div key={group.key} className="contact-group">
            <Reveal className="contact-group__label">
              <h3 className="contact-group__title">{group.label}</h3>
            </Reveal>

            <ul className="contact-list">
              {links.map((link, index) => {
                const Icon = CONTACT_ICONS[link.id]
                return (
                  <Reveal
                    key={link.id}
                    as="li"
                    className="contact-list__item"
                    delay={0.04 * index}
                  >
                    <span className="contact-list__label">
                      <Icon size={13} strokeWidth={1.6} aria-hidden="true" />
                      <span>{link.label}</span>
                    </span>
                    <ArrowLink href={link.href} external={link.external}>
                      {link.handle}
                    </ArrowLink>
                  </Reveal>
                )
              })}
            </ul>
          </div>
        )
      })}

      <Reveal className="contact__signature" delay={0.12}>
        <span>{profile.role}</span>
        <span>{profile.name}</span>
      </Reveal>
    </SectionShell>
  )
}
