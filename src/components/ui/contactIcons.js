import { Mail, Phone, Send } from 'lucide-react'
import { GithubMark, LinkedinMark } from './BrandIcons'

/**
 * Contact icons, in one place so the hero footer and the Contact section
 * never drift apart.
 *
 * lucide-react covers every glyph we need, including `Mail` for email; the two
 * brand marks come from `BrandIcons` because lucide dropped brand icons in v1.
 *
 * Every icon is decorative — the visible text label carries the accessible
 * name, so a screen reader announces "Email, link", not the glyph.
 */
export const CONTACT_ICONS = {
  github: GithubMark,
  linkedin: LinkedinMark,
  telegram: Send,
  email: Mail,
  phone: Phone,
}
