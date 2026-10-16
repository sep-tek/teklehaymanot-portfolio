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

  // TODO: no CV is published yet. Add `resume` here and add an entry to
  // `socialLinks` once there is a real file to point at.
  resume: null,

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

export const work = {
  eyebrow: 'Work',
  heading: ['Selected', 'project.'],
  items: [
    {
      index: '01',
      title: 'SmartClinic Pro',
      category: 'Personal project',
      summary:
        'A healthcare web application with patient, doctor, and administrator workflows, appointment booking, and dashboards.',
      href: 'https://github.com/sep-tek/smartclinic-pro',
      cta: 'View repository',
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
