/**
 * The hero sphere: a thin-film iridescent pearl.
 *
 * Built on `MeshPhysicalMaterial` so it gets real PBR response — clearcoat,
 * roughness, environment reflections and view-dependent thin-film
 * interference are all solved by three.js rather than approximated. The
 * iridescence comes from a procedurally generated thickness map (see
 * `proceduralTextures.js`); changing `iridescenceThicknessRange` and
 * `iridescenceIOR` shifts the whole palette without touching geometry.
 *
 * Pointer response is split across two nested groups:
 *
 *   outer — position and tilt driven by the pointer;
 *   inner — continuous idle spin.
 *
 * They are deliberately separate. Damping `rotation.y` toward a pointer target
 * while also accumulating an idle spin on the same axis makes the two fight,
 * which reads as jitter. Splitting them lets the spin stay constant while the
 * tilt and drift layer smoothly on top.
 *
 * All motion runs inside `useFrame` with exponential damping — no React state,
 * so there are no re-renders per pointer move, and the easing is frame-rate
 * independent.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from '../../lib/math'
import { createSphereMaterialMaps } from './proceduralTextures'

const BASE_Y = 0.34

/**
 * Amplitudes at full gain; `gain` scales them down on coarse pointers.
 *
 * These are deliberately restrained. A sphere that swings far under the cursor
 * stops reading as a heavy physical object and starts reading as a toy being
 * dragged around, so the travel is kept small enough that the silhouette only
 * ever shifts by a few percent of its own diameter.
 */
const RESPONSE = {
  positionX: 0.2,
  positionY: 0.12,
  tiltX: 0.12,
  turnY: 0.09,
  rollZ: 0.065,
  spin: 0.042,
  bobRate: 0.55,
  bobAmount: 0.02,
}

/**
 * Exponential damping rates, in "units of catch-up per second".
 *
 * Higher means tighter/faster. Values around 3 settle most of the way within
 * a third of a second and finish asymptotically, which is what removes the
 * jitter that a raw linear lerp produces when pointer events arrive faster
 * than frames are drawn. Position is damped slower than rotation so the
 * object feels like it has mass.
 */
const DAMP = {
  rotation: 3,
  turn: 2.6,
  position: 2.4,
}

/** Per-theme appearance; the iridescence itself never changes. */
const DEFAULT_LOOK = {
  color: '#f6f7fb',
  envMapIntensity: 1.15,
  roughness: 0.22,
}

export default function IridescentSphere({
  radius = 1.16,
  segments = [128, 96],
  textureSize = 512,
  interactive = true,
  gain = 1,
  look = DEFAULT_LOOK,
}) {
  const group = useRef(null)
  const spin = useRef(null)
  const appearance = { ...DEFAULT_LOOK, ...look }

  const maps = useMemo(() => createSphereMaterialMaps(textureSize), [textureSize])

  useEffect(() => {
    return () => {
      maps.thicknessMap.dispose()
      maps.roughnessMap.dispose()
    }
  }, [maps])

  useFrame((state, delta) => {
    const node = group.current
    const spinNode = spin.current
    if (!node || !spinNode) return

    if (interactive) {
      const px = state.pointer.x
      const py = state.pointer.y

      // Idle spin is constant and lives on its own group.
      spinNode.rotation.y += delta * RESPONSE.spin

      // Slightly stiffer easing on rotation than on translation reads as a
      // heavier object: it turns readily but drifts with more inertia.
      node.rotation.x = damp(node.rotation.x, -py * RESPONSE.tiltX * gain, DAMP.rotation, delta)
      node.rotation.y = damp(node.rotation.y, px * RESPONSE.turnY * gain, DAMP.turn, delta)
      node.rotation.z = damp(node.rotation.z, px * RESPONSE.rollZ * gain, DAMP.rotation, delta)

      const bob = Math.sin(state.clock.elapsedTime * RESPONSE.bobRate) * RESPONSE.bobAmount
      node.position.x = damp(node.position.x, px * RESPONSE.positionX * gain, DAMP.position, delta)
      node.position.y = damp(node.position.y, BASE_Y + py * RESPONSE.positionY * gain + bob, DAMP.position, delta)
    } else {
      spinNode.rotation.y += delta * RESPONSE.spin * 0.25
    }
  })

  return (
    <group ref={group} position={[0, BASE_Y, 0]}>
      <group ref={spin}>
        <mesh castShadow>
          <sphereGeometry args={[radius, segments[0], segments[1]]} />
          <meshPhysicalMaterial
            color={appearance.color}
            roughness={appearance.roughness}
            roughnessMap={maps.roughnessMap}
            metalness={0}
            clearcoat={1}
            /* Crisper clearcoat than a matte finish: a tight specular is what
               reads as "polished pearl" rather than "plastic". */
            clearcoatRoughness={0.028}
            iridescence={1}
            iridescenceIOR={1.42}
            iridescenceThicknessRange={[120, 780]}
            iridescenceThicknessMap={maps.thicknessMap}
            sheen={0.4}
            sheenColor="#cdeeff"
            sheenRoughness={0.55}
            envMapIntensity={appearance.envMapIntensity}
          />
        </mesh>
      </group>
    </group>
  )
}
