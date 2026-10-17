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

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import { useIsCompact, useSceneCapability } from '../../hooks/useSceneCapability'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTheme } from '../../theme/themeContext'
import SceneContent from './SceneContent'
import SphereFallback from './SphereFallback'

export default function SceneLayer() {
  const capability = useSceneCapability()
  const reducedMotion = usePrefersReducedMotion()
  const isCompact = useIsCompact()
  const { theme } = useTheme()
  const [degraded, setDegraded] = useState(false)

  // Touch and pen give a much coarser pointer signal than a mouse, so the
  // response is damped rather than disabled — drag-to-turn still works on a
  // phone instead of the sphere sitting inert.
  const [coarsePointer, setCoarsePointer] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(pointer: coarse)')
    const onChange = () => setCoarsePointer(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

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
        /* `percentage` maps to PCFShadowMap. Bare `shadows` requests
           PCFSoftShadowMap, which three 0.186 removed, so the renderer was
           downgrading it internally and logging a warning every load. */
        shadows="percentage"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 1.05, 9.4], fov: 36, near: 0.1, far: 120 }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping
          // Seeded here, then kept in sync below whenever the theme changes.
          gl.toneMappingExposure = theme.scene.exposure
          // Camera framing is owned exclusively by <CameraRig>, which adapts
          // distance, aim and fog to the viewport aspect. Setting the aim here
          // as well meant this ran after the rig and silently overrode it.
        }}
      >
        <Suspense fallback={null}>
          <SceneContent
            settings={settings}
            theme={theme}
            interactive={!reducedMotion}
            pointerGain={coarsePointer ? 0.5 : 1}
            onDecline={handleDecline}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
