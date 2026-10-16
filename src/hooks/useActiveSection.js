import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav can show a real
 * active state. Uses IntersectionObserver against a band across the upper
 * middle of the viewport rather than "first intersecting element", which
 * would otherwise flip unpredictably between short sections.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        })

        if (!visible.size) return
        // Highest ratio wins; ties break on document order.
        const [id] = [...visible.entries()].sort(
          (a, b) => b[1] - a[1] || ids.indexOf(a[0]) - ids.indexOf(b[0]),
        )
        setActive(id)
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0, 0.15, 0.4, 0.75, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
