import { about, profile, skills } from '../../data/content'
import CvLinks from '../ui/CvLinks'
import Reveal from '../ui/Reveal'
import RevealGroup from '../ui/RevealGroup'
import './sections.css'

/**
 * Shared shell for the scrolling sections: the eyebrow, the oversized
 * two-line heading (revealed line by line), and a constrained body column.
 */
export function SectionShell({ id, eyebrow, heading, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-heading`}>
      <Reveal className="section__eyebrow" as="p">
        {eyebrow}
      </Reveal>

      <h2 className="section__heading" id={`${id}-heading`}>
        <RevealGroup
          as="span"
          className="section__heading-inner"
          stagger={0.16}
        >
          {heading.map((line) => (
            <Reveal key={line} as="span" className="section__heading-line" orchestrated>
              {line}
            </Reveal>
          ))}
        </RevealGroup>
      </h2>

      <div className="section__body">{children}</div>
    </section>
  )
}

export default function About() {
  return (
    <SectionShell id="about" eyebrow={about.eyebrow} heading={about.heading} className="section--about">
      {/*
        Portrait sits beside the introduction on wide screens and above it on
        narrow ones. `loading="lazy"` is correct here — the About section is
        below the fold, so the browser should not pay for the image until the
        visitor actually scrolls to it. Width/height are set to the real
        intrinsic size so the box is reserved before the bytes arrive, which
        is what keeps this from causing a layout shift.
      */}
      <div className="about-intro">
        <div className="about-intro__text">
          <RevealGroup className="section__prose" stagger={0.16}>
            {about.body.map((paragraph) => (
              <Reveal key={paragraph} as="p" orchestrated>
                {paragraph}
              </Reveal>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <CvLinks />
          </Reveal>
        </div>

        <Reveal className="about-intro__figure" delay={0.12}>
          <img
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            width={profile.portrait.width}
            height={profile.portrait.height}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>

      <div className="skills">
        <Reveal className="skills__heading">
          <h3 className="skills__title">Skills</h3>
        </Reveal>

        <RevealGroup as="dl" className="skills__grid" stagger={0.14}>
          {skills.map((group) => (
            <Reveal key={group.label} className="skills__group" orchestrated>
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
        </RevealGroup>
      </div>
    </SectionShell>
  )
}
