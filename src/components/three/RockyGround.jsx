/**
 * The hero floor: wet, craggy rock with a soft mirrored reflection.
 *
 * Geometry is CPU-displaced in `proceduralGeometry.js` (deterministic, no
 * displacement-map support needed). The material is drei's
 * `MeshReflectorMaterial`, which renders the scene to an off-screen target
 * and mixes it back in — that is where the wet basin under the sphere comes
 * from. On low-power devices the reflection is dropped and a plain standard
 * material is used instead.
 *
 * Colour and metalness come from the active theme; the falloff to black is
 * softened in the vertex data so that in a light theme the terrain melts
 * into the page via fog rather than ending on a dark halo.
 */

import { useEffect, useMemo } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'
import { createRockyGroundGeometry } from './proceduralGeometry'
import { createGroundAlbedoMap } from './proceduralTextures'

const GROUND_Y = -1.46

const DEFAULT_LOOK = {
  color: '#5a6875',
  metalness: 0.42,
  roughness: 0.74,
  envMapIntensity: 0.4,
}

export default function RockyGround({
  segments = 150,
  size = 60,
  textureSize = 256,
  reflections = true,
  reflectorResolution = 512,
  look = DEFAULT_LOOK,
}) {
  const appearance = { ...DEFAULT_LOOK, ...look }

  const geometry = useMemo(
    () => createRockyGroundGeometry({ size, segments }),
    [size, segments],
  )

  const albedo = useMemo(() => createGroundAlbedoMap(textureSize), [textureSize])

  useEffect(() => {
    return () => {
      geometry.dispose()
      albedo.dispose()
    }
  }, [geometry, albedo])

  return (
    <mesh geometry={geometry} position={[0, GROUND_Y, 0]} receiveShadow>
      {reflections ? (
        <MeshReflectorMaterial
          resolution={reflectorResolution}
          map={albedo}
          color={appearance.color}
          vertexColors
          metalness={appearance.metalness}
          roughness={appearance.roughness}
          envMapIntensity={appearance.envMapIntensity}
          // Wet-stone reflection: broad blur, restrained strength.
          blur={[420, 130]}
          mixBlur={2.4}
          mixStrength={1.5}
          mirror={0.32}
          depthScale={0.85}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.35}
          depthToBlurRatioBias={0.28}
          distortion={0}
          reflectorOffset={0.015}
        />
      ) : (
        <meshStandardMaterial
          map={albedo}
          color={appearance.color}
          vertexColors
          metalness={appearance.metalness}
          roughness={appearance.roughness}
          envMapIntensity={appearance.envMapIntensity}
        />
      )}
    </mesh>
  )
}
