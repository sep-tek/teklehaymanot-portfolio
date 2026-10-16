import { Download, FileText } from 'lucide-react'
import { profile } from '../../data/content'
import './cvLinks.css'

/**
 * Résumé actions.
 *
 * Both are plain links to the same public PDF and nothing else:
 *
 *   - "View CV"  opens it in a new tab. No `download` attribute.
 *   - "Download" forces a save via the HTML `download` attribute, which works
 *     because the PDF is same-origin (`/files/...`).
 *
 * Nothing here fetches, embeds, or preloads the PDF. There is no `<iframe>`,
 * no `<object>`, and no import — the browser only touches the file after a
 * click, so visitors never download several hundred KB they did not ask for.
 */
export default function CvLinks() {
  if (!profile.resume) return null

  const label = 'Curriculum Vitae'

  return (
    <div className="cv-links">
      <a
        className="cv-links__action cv-links__action--primary"
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText className="cv-links__icon" size={14} strokeWidth={1.6} aria-hidden="true" />
        <span>View CV</span>
        <span className="sr-only">({label}, opens in a new tab)</span>
      </a>

      <a className="cv-links__action" href={profile.resume} download>
        <Download className="cv-links__icon" size={14} strokeWidth={1.6} aria-hidden="true" />
        <span>Download CV</span>
        <span className="sr-only">({label}, downloads as a PDF)</span>
      </a>
    </div>
  )
}
