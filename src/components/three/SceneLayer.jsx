/**
 * Mounts the WebGL canvas for the hero, with graceful degradation.
 *
 * Three outcomes:
 *   - capability still unknown  -> nothing rendered (avoids a fallback flash)
 *   - WebGL unavailable        -> CSS-only iridescent sphere
 *   - WebGL available          -> live 3D scene
 *
 * Also handles the reduced-motion case by dropping device-pixel-ratio scaling
 * and freezing the sphere's idle drift.
 */

import { Suspense, useCallback, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import { useIsCompact, useSceneCapability } from '../../hooks/useSceneCapability'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTheme } from '../../theme/themeContext'
import SceneContent from './SceneContent'
import SphereFallback from './SphereFallback'

export default function SceneLayer({ compact = false } = {}) {
  const capability = useSceneCapability()
  const reducedMotion = usePrefersReducedMotion()
  const isCompact = useIsCompact()
  const { theme } = useTheme()
  const [degraded, setDegraded] = useState(false)

  const handleDecline = useCallback(() => {
    // React Three Fiber reports sustained frame drops here; drop to 1x pixels.
    setDegraded(true)
  }, [])

  // Reflections are the first thing to go when frames get expensive.
  const settings = useMemo(() => {
    if (!capability) return null
    return {
      ...capability.settings,
      reflections:
        capability.settings.reflections && !degraded && !(isCompact && reducedMotion),
    }
  }, [capability, degraded, isCompact, reducedMotion])

  if (!capability?.webgl || !settings) {
    return (
      <div className="hero__canvas" aria-hidden="true">
        {capability && !capability.webgl ? <SphereFallback /> : null}
      </div>
    )
  }

  const dpr = reducedMotion || degraded ? 1 : [1, capability.settings.maxDpr]

  return (
    <div className="hero__canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 1.05, 9.4], fov: 36, near: 0.1, far: 120 }}
        onCreated={({ gl, camera }) => {
          gl.toneMapping = ACESFilmicToneMapping
          // Seeded here, then kept in sync below whenever the theme changes.
          gl.toneMappingExposure = theme.scene.exposure
          camera.lookAt(0, -0.18, 0)
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            settings={settings}
            theme={theme}
            interactive={!reducedMotion && !compact}
            onDecline={handleDecline}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
