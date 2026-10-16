import { useEffect, useState } from 'react'
import { detectQualityTier, detectWebGL, QUALITY } from '../lib/capability'

/**
 * Decides whether the live 3D scene should mount, and at what fidelity.
 *
 * Computed during the initial render rather than in an effect: this is a
 * client-only app, and doing it here avoids a wasted render and stops the CSS
 * fallback from flashing at a machine that can actually run WebGL.
 */
export function useSceneCapability() {
  const [state] = useState(() => {
    const tier = detectQualityTier()
    return {
      webgl: detectWebGL(),
      tier,
      settings: QUALITY[tier],
    }
  })

  return state
}

/** Re-evaluates when the viewport crosses the compact breakpoint. */
export function useIsCompact() {
  const [compact, setCompact] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 900
  })

  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 900)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return compact
}
