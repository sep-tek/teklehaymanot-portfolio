import { useEffect, useState } from 'react'
import { profile } from '../../data/content'
import './localTime.css'

const { iana, city, abbreviation, offset } = profile.timezone

/**
 * Pinned to the configured IANA zone. Previously this was `undefined`, which
 * silently made `Intl` use the *visitor's* system timezone — which is why the
 * city label changed to whatever machine happened to load the page.
 */
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: iana,
})

/**
 * Live clock for the portfolio owner's timezone.
 *
 * Starts empty and fills in after mount so the initial markup is never wrong,
 * and the block is hidden from assistive tech since it is decorative chrome.
 * The zone and offset stay in the tooltip for anyone who wants the detail.
 */
export default function LocalTime() {
  const [now, setNow] = useState('')

  useEffect(() => {
    const tick = () => setNow(timeFormatter.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="local-time" aria-hidden="true" title={`${city} — ${abbreviation} (${offset})`}>
      <span className="local-time__label">{city}</span>
      <span className="local-time__value">
        <span className="local-time__zone">{abbreviation}</span>
        <span className="local-time__clock">{now || '--:--'}</span>
      </span>
    </p>
  )
}
