/**
 * Brand marks for the social links.
 *
 * lucide-react v1 ships no brand icons, so GitHub and LinkedIn are provided
 * here as plain inline SVG. Both are used in their conventional form purely to
 * link to the matching profile — the icons themselves are decorative and are
 * hidden from assistive technology; the visible text label carries the name.
 */

/** @type {React.FC<{ size?: number, className?: string }>} */
export function GithubMark({ size = 14, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.12.68-3.78-1.34-3.78-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.49-.29-5.11-1.28-5.11-5.69 0-1.26.44-2.28 1.17-3.09-.12-.29-.51-1.47.11-3.05 0 0 .95-.31 3.1 1.18a10.6 10.6 0 0 1 5.62 0c2.15-1.49 3.1-1.18 3.1-1.18.62 1.58.23 2.76.11 3.05.73.81 1.17 1.83 1.17 3.09 0 4.42-2.63 5.39-5.13 5.68.4.36.76 1.06.76 2.14v3.2c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  )
}

/** @type {React.FC<{ size?: number, className?: string }>} */
export function LinkedinMark({ size = 14, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
