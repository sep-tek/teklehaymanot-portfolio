/* ============================================================================
 * Single source of truth for every word on the site.
 *
 * Everything here is supplied information — no employment history, clients,
 * awards, metrics or proficiency ratings have been invented. Fields marked
 * `TODO` are genuine gaps (e.g. no CV is published yet) and are left out of
 * the UI rather than rendered as dead links.
 * ========================================================================== */

export const profile = {
  name: 'Teklehaymanot',
  /** Rendered as two stacked lines in the header wordmark. */
  nameLines: ['Tekle', 'haymanot'],

  role: 'Software Engineering Student & Developer',
  university: 'Addis Ababa Science and Technology University',
  universityShort: 'AASTU',
  year: '3rd-year student',
  location: 'Addis Ababa, Ethiopia',
  focusArea: 'Full-stack web development',

  availabilityLabel: 'Open to internships, remote roles & freelance',
  email: 'teklehaymanotgashaw@gmail.com',
  phone: '+251904919905',
  phoneDisplay: '+251 904 919 905',
  telegram: 'https://t.me/sep_tek',
  github: 'https://github.com/sep-tek',
  linkedin: 'https://linkedin.com/in/teklehaymanot-gashaw-677b87358',

  /**
   * Portrait used in the About section.
   *
   * Source is 478x521 (aspect 0.9175). At the ~180px it is displayed at that
   * is comfortably sharp even on a 2x screen, so no derivative sizes or
   * `srcset` are needed — the original file is the only one shipped.
   */
  portrait: {
    src: '/images/teklehaymanot-profile.jpg',
    alt: 'Portrait of Teklehaymanot',
    width: 478,
    height: 521,
  },

  /** Résumé PDF, served from `public/files`. Rendered as link-only actions. */
  resume: '/files/teklehaymanot-gashaw-cv.pdf',

  /**
   * The clock in the hero footer is pinned to this zone rather than the
   * visitor's, so it reliably reads as the portfolio owner's local time.
   * `iana` is the identifier `Intl.DateTimeFormat` expects; the rest is
   * display copy.
   */
  timezone: {
    city: 'Addis Ababa',
    country: 'Ethiopia',
    iana: 'Africa/Addis_Ababa',
    abbreviation: 'EAT',
    offset: 'UTC+03:00',
  },
}

/** Exact supplied copy. Keep verbatim. */
export const intro =
  "I'm a Software Engineering student at AASTU who enjoys building useful web applications and thoughtful digital experiences."

/**
 * Header summary block, upper right.
 * `strong` lines carry the heavier weight used for emphasis.
 */
export const focus = {
  strong: ['Full-Stack Web Development', 'Node.js · PostgreSQL · React'],
  plain: [profile.location, `${profile.universityShort} · ${profile.year}`],
}

export const skills = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { label: 'Backend', items: ['Node.js', 'Express'] },
  { label: 'Databases', items: ['PostgreSQL', 'SQL'] },
  { label: 'Programming', items: ['C++', 'Python'] },
  { label: 'Tools', items: ['Git', 'GitHub'] },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Contact destinations. `external` controls target=_blank + rel;
 * mailto:, tel: and #anchors stay in the current tab.
 * Rendered in the hero footer and again in the Contact section.
 */
export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@sep-tek',
    href: profile.github,
    external: true,
    group: 'social',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/teklehaymanot-gashaw',
    href: profile.linkedin,
    external: true,
    group: 'social',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@sep_tek',
    href: profile.telegram,
    external: true,
    group: 'social',
  },
  {
    id: 'email',
    label: 'Email',
    handle: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    group: 'direct',
  },
  {
    id: 'phone',
    label: 'Phone',
    handle: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
    external: false,
    group: 'direct',
  },
]

export const about = {
  eyebrow: 'About',
  heading: ['Who you', 'would work with.'],
  body: [
    intro,
    `My main focus is ${profile.focusArea} — building things end to end rather than specialising early, so I understand how the parts fit together.`,
  ],
}

/**
 * Featured projects.
 *
 * Both entries below were verified against the live repositories under the
 * `sep-tek` GitHub account. Descriptions and technologies are taken from the
 * repositories themselves and from supplied copy — nothing is inferred.
 *
 * TODO: there is no verified live/demo URL for either project, so no "Live
 * demo" link is rendered. Add `links` entries once a deployment exists.
 */
export const work = {
  eyebrow: 'Work',
  heading: ['Selected', 'projects.'],
  items: [
    {
      index: '01',
      title: 'SmartClinic Pro',
      category: 'Personal project',
      summary:
        'A healthcare web application with patient, doctor, and administrator workflows, appointment booking, and dashboards.',
      // Verified from the repository's package.json and README stack table.
      tech: ['React', 'React Router', 'Express', 'PostgreSQL', 'Three.js'],
      links: [
        { label: 'Source', href: 'https://github.com/sep-tek/smartclinic-pro' },
      ],
    },
    {
      index: '02',
      title: 'Academic Profile Tracker',
      category: 'Personal project',
      summary:
        'A menu-driven console application for registering student records, tracking programming, mathematics and discrete mathematics marks, and reporting class statistics.',
      // Verified from the repository's README and PROJECT_1.cpp source.
      tech: ['C++'],
      links: [
        { label: 'Source', href: 'https://github.com/sep-tek/academic-profile-tracker' },
      ],
    },
  ],
  aside: {
    label: 'Elsewhere',
    copy: 'Coursework, exercises and smaller experiments live in my repositories.',
    href: profile.github,
    cta: 'Browse repositories',
  },
}

export const contact = {
  eyebrow: 'Contact',
  heading: ['Get in', 'touch.'],
  body: 'Whether you have an internship, a remote role, or a freelance project in mind, I would be glad to hear about it.',
  note: `Based in ${profile.location}. Happy to work remotely.`,
}

export const colophon = {
  year: new Date().getFullYear(),
  wordmark: 'Teklehaymanot.',
}
