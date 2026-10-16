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
 * Pointer input nudges the group rather than spinning it, so the object keeps
 * its weight and never feels like a toy.
 */

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from '../../lib/math'
import { createSphereMaterialMaps } from './proceduralTextures'

const BASE_Y = 0.34

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
  look = DEFAULT_LOOK,
}) {
  const group = useRef(null)
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
    if (!node) return

    if (interactive) {
      // Idle drift — slow enough to read as floating rather than spinning.
      node.rotation.y += delta * 0.042
      node.rotation.x = damp(node.rotation.x, -state.pointer.y * 0.1, 3, delta)
      node.rotation.z = damp(node.rotation.z, state.pointer.x * 0.06, 3, delta)

      const drift = Math.sin(state.clock.elapsedTime * 0.55) * 0.022
      node.position.x = damp(node.position.x, state.pointer.x * 0.15, 2.6, delta)
      node.position.y = damp(node.position.y, BASE_Y + state.pointer.y * 0.1 + drift, 2.6, delta)
    } else {
      node.rotation.y += delta * 0.01
    }
  })

  return (
    <group ref={group} position={[0, BASE_Y, 0]}>
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
  )
}
