import { work } from '../../data/content'
import ArrowLink from '../ui/ArrowLink'
import Reveal from '../ui/Reveal'
import RevealGroup from '../ui/RevealGroup'
import { SectionShell } from './About'
import './sections.css'

/**
 * Selected projects.
 *
 * Laid out as editorial rows rather than a grid of cards — the section has to
 * read as a continuation of the same document as the hero, and rows also stay
 * legible at narrow widths where a card grid collapses badly.
 *
 * Each row is focusable as a whole via its links: the accent rule and colour
 * shift trigger on `:focus-within`, so keyboard users get the same response
 * as hover without the row itself becoming a redundant tab stop.
 */
export default function Work() {
  return (
    <SectionShell id="work" eyebrow={work.eyebrow} heading={work.heading} className="section--work">
      <RevealGroup as="ul" className="work-list" stagger={0.16}>
        {work.items.map((item) => (
          <Reveal key={item.title} as="li" className="work-item" orchestrated>
            <span className="work-item__index" aria-hidden="true">
              {item.index}
            </span>

            <div className="work-item__main">
              <h3 className="work-item__title">{item.title}</h3>
              <p className="work-item__summary">{item.summary}</p>
            </div>

            <div className="work-item__aside">
              <p className="work-item__category">{item.category}</p>

              {item.tech?.length > 0 && (
                <ul className="work-item__tech">
                  {item.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}

              {/* Only verified destinations are rendered — there is currently
                  no deployed URL for either project. */}
              <div className="work-item__links">
                {item.links?.map((link) => (
                  <ArrowLink key={link.href} href={link.href}>
                    {link.label}
                  </ArrowLink>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </RevealGroup>

      <Reveal className="work-aside" delay={0.12}>
        <p className="work-aside__label">{work.aside.label}</p>
        <p className="work-aside__copy">{work.aside.copy}</p>
        <ArrowLink href={work.aside.href}>{work.aside.cta}</ArrowLink>
      </Reveal>
    </SectionShell>
  )
}
