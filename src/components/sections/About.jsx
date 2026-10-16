import { about, skills } from '../../data/content'
import Reveal from '../ui/Reveal'
import './sections.css'

/**
 * Shared shell for the scrolling sections: the eyebrow, the oversized
 * two-line heading, and a constrained body column.
 */
export function SectionShell({ id, eyebrow, heading, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-heading`}>
      <Reveal className="section__eyebrow" as="p">
        {eyebrow}
      </Reveal>

      <Reveal as="h2" className="section__heading" id={`${id}-heading`} delay={0.05}>
        {heading.map((line) => (
          <span key={line} className="section__heading-line">
            {line}
          </span>
        ))}
      </Reveal>

      <div className="section__body">{children}</div>
    </section>
  )
}

export default function About() {
  return (
    <SectionShell id="about" eyebrow={about.eyebrow} heading={about.heading} className="section--about">
      <div className="section__prose">
        {about.body.map((paragraph, index) => (
          <Reveal key={paragraph} as="p" delay={0.05 * index}>
            {paragraph}
          </Reveal>
        ))}
      </div>

      <div className="skills">
        <Reveal className="skills__heading">
          <h3 className="skills__title">Skills</h3>
        </Reveal>

        <dl className="skills__grid">
          {skills.map((group, index) => (
            <Reveal
              key={group.label}
              className="skills__group"
              delay={0.05 * index}
            >
              <dt className="skills__group-label">{group.label}</dt>
              <dd className="skills__group-items">
                {group.items.map((item) => (
                  <span key={item} className="skills__item">
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </SectionShell>
  )
}
