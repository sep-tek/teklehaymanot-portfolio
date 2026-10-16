import { work } from '../../data/content'
import ArrowLink from '../ui/ArrowLink'
import Reveal from '../ui/Reveal'
import { SectionShell } from './About'
import './sections.css'

/**
 * Featured work. Deliberately a single editorial row rather than a card grid —
 * it has to read as part of the same document as the hero.
 */
export default function Work() {
  return (
    <SectionShell id="work" eyebrow={work.eyebrow} heading={work.heading} className="section--work">
      <ul className="work-list">
        {work.items.map((item, index) => (
          <Reveal key={item.title} as="li" className="work-item" delay={0.05 * index}>
            <span className="work-item__index">{item.index}</span>

            <div className="work-item__main">
              <h3 className="work-item__title">{item.title}</h3>
              <p className="work-item__summary">{item.summary}</p>
            </div>

            <div className="work-item__aside">
              <p className="work-item__category">{item.category}</p>
              <ArrowLink href={item.href}>{item.cta}</ArrowLink>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="work-aside" delay={0.1}>
        <p className="work-aside__label">{work.aside.label}</p>
        <p className="work-aside__copy">{work.aside.copy}</p>
        <ArrowLink href={work.aside.href}>{work.aside.cta}</ArrowLink>
      </Reveal>
    </SectionShell>
  )
}
