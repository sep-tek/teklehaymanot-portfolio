/**
 * Procedural terrain for the hero floor.
 *
 * A displaced plane with three characteristics from the reference:
 *   1. large slow undulation, so the horizon is not a ruled line;
 *   2. ridged fractal crags that catch the cyan rim light;
 *   3. a shallow flattened basin directly beneath the sphere, which is what
 *      lets the wet reflection read clearly.
 *
 * Displacement and shading are baked into vertex colours so the horizon can
 * dissolve into pure black without touching scene fog (which would also dim
 * the sphere).
 */

import { BufferAttribute, PlaneGeometry } from 'three'
import { smoothstep } from '../../lib/math'
import { createNoise3D, fbm, ridged } from '../../lib/noise'

export function createRockyGroundGeometry({
  size = 60,
  segments = 150,
  seed = 4211,
} = {}) {
  const noise = createNoise3D(seed)
  const geometry = new PlaneGeometry(size, size, segments, segments)
  geometry.rotateX(-Math.PI / 2)

  const position = geometry.attributes.position
  const colors = new Float32Array(position.count * 3)

  const rimInner = size * 0.26
  const rimOuter = size * 0.5
  const basinInner = 3.4
  const basinOuter = 12.5

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i)
    const z = position.getZ(i)
    const distance = Math.hypot(x, z)

    const macro = fbm(noise, x * 0.034, 0.7, z * 0.034, 4) * 2.0
    const crag = ridged(noise, x * 0.125 + 3.1, 1.4, z * 0.125 + 8.7, 5) * 0.95
    const grit = fbm(noise, x * 0.44, 5.3, z * 0.44, 3) * 0.15

    let height = macro + crag + grit

    // Flatten the basin so the sphere gets a clean mirror.
    const basin = 1 - smoothstep(basinInner, basinOuter, distance)
    height *= 1 - 0.9 * basin

    // Collapse the rim to zero and fade it to black: the horizon dissolves.
    const rim = 1 - smoothstep(rimInner, rimOuter, distance)
    height *= rim

    position.setY(i, height)

    // The rim fade is deliberately gentle: themed fog does the dissolving,
    // so baking it all the way to black here would leave a dark halo on
    // light-background themes.
    const shade = (0.34 + 0.66 * rim) * (1 - 0.42 * basin)
    // Cool bounce light collecting in the crevices.
    const crevice = smoothstep(0.9, -0.6, height)

    colors[i * 3] = shade * (1 - 0.16 * crevice)
    colors[i * 3 + 1] = shade * (1 - 0.04 * crevice)
    colors[i * 3 + 2] = shade * (1 + 0.34 * crevice)
  }

  geometry.setAttribute('color', new BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  geometry.computeBoundingSphere()

  return geometry
}
