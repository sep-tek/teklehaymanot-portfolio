/**
 * Shared motion constants for the reveal system.
 *
 * Kept out of `Reveal.jsx` so that module exports only a component, which is
 * what React Fast Refresh needs to hot-reload cleanly.
 */

/**
 * Soft ease-out quint. Starts quickly then settles for a long, calm tail —
 * the single biggest contributor to a reveal feeling "elegant" rather than
 * "snappy". No overshoot, so nothing bounces.
 */
export const REVEAL_EASE = [0.22, 1, 0.36, 1]

/** Per-item duration for orchestrated children, in seconds. */
export const REVEAL_ITEM_DURATION = 0.82

/**
 * Variant used when a `RevealGroup` orchestrates its children. The group owns
 * the timing, so the child contributes no transition of its own.
 */
export function revealItemVariants(distance = 18) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: REVEAL_ITEM_DURATION, ease: REVEAL_EASE },
    },
  }
}
