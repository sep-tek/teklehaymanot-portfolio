/**
 * Shared hero framing maths.
 *
 * The sphere is a fixed world-space object with a fixed camera, so its
 * apparent size is governed entirely by the viewport aspect. Measured on a
 * 320x605 phone it filled ~79% of the viewport width, which is what made it
 * read as an awkward circle rather than a composed element.
 *
 * This hook derives every value that depends on viewport shape, so the camera
 * rig and the sphere material cannot disagree about the composition.
 *
 * `dim` exists for short screens specifically: at 320x568 the header, identity,
 * biography and footer consume the whole viewport, so there is no negative
 * space left to give the sphere. Rather than let it compete with the copy, it
 * is scaled back and dimmed into atmosphere on those viewports only.
 */

import { useThree } from '@react-three/fiber'

/** Camera distance that produced the original desktop composition. */
export const BASE_DISTANCE = 9.4
/** Aspect ratio the desktop composition was tuned at. */
export const REFERENCE_ASPECT = 16 / 9
/** Upper bound on how far the camera may retreat. */
const PULLBACK_MAX = 2

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function useHeroFraming() {
  const { width, height } = useThree((state) => state.size)

  const aspect = height > 0 ? width / height : REFERENCE_ASPECT

  // 0 on a short screen, 1 on a tall one.
  const heightFactor = clamp01((height - 560) / (760 - 560))
  // 1 on a desktop-width viewport, ~0 on a tall phone.
  const portrait = clamp01((REFERENCE_ASPECT - aspect) / (REFERENCE_ASPECT - 0.45))

  // Short screens retreat further so the sphere stays a modest accent.
  const pullback = Math.min(
    PULLBACK_MAX * (1 + 0.5 * (1 - heightFactor)),
    REFERENCE_ASPECT / Math.max(aspect, 0.01),
  )

  // How far to pull the sphere's surface back toward the page background.
  const dim = (1 - heightFactor) * 0.55

  return { aspect, heightFactor, portrait, pullback, dim }
}
