import { useEffect } from 'react'

/**
 * Measures the site header and publishes its height as `--site-header-h`.
 *
 * The hero needs a spacer tall enough to clear the header, but the header's
 * height is entirely content-driven — the availability line and email wrap
 * differently at every width. A hard-coded spacer height is therefore wrong
 * at some breakpoint, which is what previously let the header overlap the
 * hero name on small screens.
 *
 * Measuring removes the guesswork: a ResizeObserver keeps the spacer in sync
 * through resizes, orientation changes and theme changes, and `document.fonts`
 * catches the reflow when the webfonts land after first paint.
 */
export function useHeaderHeight() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const root = document.documentElement
    if (!header) return

    const apply = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      root.style.setProperty('--site-header-h', `${height}px`)
    }

    apply()

    const observer = new ResizeObserver(apply)
    observer.observe(header)

    if (document.fonts?.ready) {
      document.fonts.ready.then(apply).catch(() => {})
    }

    return () => {
      observer.disconnect()
      root.style.removeProperty('--site-header-h')
    }
  }, [])
}
