/**
 * Camera rig — keeps the hero composition correct at any viewport shape.
 *
 * Owns camera distance, aim and fog exclusively. `SceneLayer` deliberately does
 * not call `camera.lookAt`, because a second owner silently overrode this one.
 *
 * Three things scale with the viewport, all driven by `useHeroFraming`:
 *
 *   1. Distance  — pull back as the viewport narrows so the sphere keeps a
 *      deliberate share of the screen instead of ballooning.
 *   2. Fog range — the fog is authored for the desktop distance. Retreating
 *      without moving it pushed the sphere *into* the fog and washed it out to
 *      a grey smudge.
 *   3. Aim       — on a tall screen the sphere is lifted into the empty band
 *      above the identity block. The lift fades out on short screens, where
 *      there is no band and the sphere is dimmed instead of repositioned.
 *
 * Desktop is untouched: at or above the reference aspect every multiplier is 1,
 * so the framing is exactly what it was.
 */

import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { BASE_DISTANCE, useHeroFraming } from './useHeroFraming'

/** Desktop aim point, unchanged from the original scene. */
const LOOK_Y_DESKTOP = -0.18
/** Extra downward aim on a tall portrait screen. Tuned so the sphere settles in
 *  the empty band between the header and the identity block rather than sitting
 *  on top of the display type. */
const LOOK_Y_PORTRAIT = -2.9

/** Fog authored for the desktop distance, matching SceneContent. */
const FOG_NEAR = 12
const FOG_FAR = 32

export default function CameraRig() {
  const camera = useThree((state) => state.camera)
  const scene = useThree((state) => state.scene)
  const { pullback, portrait, heightFactor } = useHeroFraming()

  useLayoutEffect(() => {
    // eslint-disable-next-line react/immutability -- PerspectiveCamera is imperative by design; framing has no declarative equivalent in R3F.
    camera.position.z = BASE_DISTANCE * pullback
    // eslint-disable-next-line react/immutability -- same: direct camera placement on resize.
    camera.position.y = 1.05 * pullback

    const lookY = LOOK_Y_DESKTOP + LOOK_Y_PORTRAIT * portrait * heightFactor
    camera.lookAt(0, lookY, 0)
    camera.updateProjectionMatrix()

    // Keep the sphere clear of the fog no matter how far the camera retreats.
    if (scene.fog) {
      // eslint-disable-next-line react/immutability -- THREE.Fog is imperative; near/far are plain fields.
      scene.fog.near = FOG_NEAR * pullback
      // eslint-disable-next-line react/immutability -- same: fog range follows the camera.
      scene.fog.far = FOG_FAR * pullback
    }
  }, [camera, scene, pullback, portrait, heightFactor])

  return null
}
