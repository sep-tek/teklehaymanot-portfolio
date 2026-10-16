import { contact, profile, socialLinks } from '../../data/content'
import ArrowLink from '../ui/ArrowLink'
import { CONTACT_ICONS } from '../ui/contactIcons'
import Reveal from '../ui/Reveal'
import RevealGroup from '../ui/RevealGroup'
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
      <RevealGroup className="section__prose" stagger={0.16}>
        <Reveal as="p" orchestrated>
          {contact.body}
        </Reveal>
        <Reveal as="p" className="contact__note" orchestrated>
          {contact.note}
        </Reveal>
      </RevealGroup>

      {GROUPS.map((group) => {
        const links = socialLinks.filter((link) => link.group === group.key)
        if (!links.length) return null

        return (
          <div key={group.key} className="contact-group">
            <Reveal className="contact-group__label">
              <h3 className="contact-group__title">{group.label}</h3>
            </Reveal>

            <RevealGroup as="ul" className="contact-list" stagger={0.13}>
              {links.map((link) => {
                const Icon = CONTACT_ICONS[link.id]
                return (
                  <Reveal key={link.id} as="li" className="contact-list__item" orchestrated>
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
            </RevealGroup>
          </div>
        )
      })}

      <Reveal className="contact__signature" delay={0.14}>
        <span>{profile.role}</span>
        <span>{profile.name}</span>
      </Reveal>
    </SectionShell>
  )
}
