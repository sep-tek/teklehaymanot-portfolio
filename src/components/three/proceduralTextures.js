/**
 * Procedurally generated textures for the iridescent sphere.
 *
 * The reference sphere behaves like an oil film on a pearl: a near-white
 * base with soft, flowing pastel streaks that do not rotate with the viewer.
 * Three.js `MeshPhysicalMaterial` already models thin-film interference
 * properly, so instead of faking colour in a custom shader we feed it a
 * *thickness map* — the one input it is missing.
 *
 * The pattern is sampled on the sphere's direction vector rather than its UV
 * coordinates, which makes it seamless across the texture seam by
 * construction. The domain is stretched along Y and then warped by a second
 * noise field, which is what turns blobby noise into long, liquid streaks.
 */

import {
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  UnsignedByteType,
} from 'three'
import { TAU } from '../../lib/math'
import { createNoise3D, fbm } from '../../lib/noise'

const SEED = 20261015

function buildData(size) {
  const data = new Uint8Array(size * size * 4)
  return data
}

function toTexture(data, size, { colorSpace }) {
  const texture = new DataTexture(data, size, size, RGBAFormat, UnsignedByteType)
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  texture.magFilter = LinearFilter
  texture.minFilter = LinearMipmapLinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 8
  texture.colorSpace = colorSpace
  texture.needsUpdate = true
  return texture
}

/**
 * @param {number} size Texture resolution (power of two).
 * @returns {{ thicknessMap: import('three').Texture, roughnessMap: import('three').Texture }}
 */
export function createSphereMaterialMaps(size = 512) {
  const noise = createNoise3D(SEED)
  const thicknessData = buildData(size)
  const roughnessData = buildData(size)

  for (let y = 0; y < size; y += 1) {
    const theta = ((y + 0.5) / size) * Math.PI
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    for (let x = 0; x < size; x += 1) {
      const phi = ((x + 0.5) / size) * TAU

      // Direction on the unit sphere — seamless domain for the noise field.
      const dx = sinTheta * Math.cos(phi)
      const dy = cosTheta
      const dz = sinTheta * Math.sin(phi)

      // Stretch along Y so features elongate into flowing ribbons.
      const sx = dx * 1.15
      const sy = dy * 2.7
      const sz = dz * 1.15

      // Two-stage domain warp: the marbled, liquid quality of the reference.
      const warpX = fbm(noise, sx * 1.6 + 11.3, sy * 1.6 + 4.1, sz * 1.6 + 27.7, 4)
      const warpY = fbm(noise, sx * 1.6 + 41.9, sy * 1.6 + 55.2, sz * 1.6 + 9.4, 4)
      const warpZ = fbm(noise, sx * 1.6 + 73.1, sy * 1.6 + 88.6, sz * 1.6 + 62.8, 4)

      const field = fbm(noise, sx * 2.05 + warpX * 2.1, sy * 2.05 + warpY * 2.1, sz * 2.05 + warpZ * 2.1, 6)

      // Fold the field into repeating film bands.
      const bands = Math.sin(field * 13.5 + warpY * 3.1) * 0.5 + 0.5
      let thickness = Math.pow(bands, 1.45)
      // Keep a floor so the pearl base never fully disappears.
      thickness = 0.2 + thickness * 0.8

      const offset = (y * size + x) * 4

      // Green channel is the one three.js samples for thickness.
      thicknessData[offset] = 255
      thicknessData[offset + 1] = Math.round(thickness * 255)
      thicknessData[offset + 2] = 255
      thicknessData[offset + 3] = 255

      // Raised ribbons read glossier; recessed film is slightly rougher.
      const roughness = 0.2 + 0.52 * Math.pow(1 - thickness, 1.5)
      roughnessData[offset] = 255
      roughnessData[offset + 1] = Math.round(Math.min(1, roughness) * 255)
      roughnessData[offset + 2] = 255
      roughnessData[offset + 3] = 255
    }
  }

  return {
    thicknessMap: toTexture(thicknessData, size, { colorSpace: NoColorSpace }),
    roughnessMap: toTexture(roughnessData, size, { colorSpace: NoColorSpace }),
  }
}

/**
 * Dark wet-rock albedo for the terrain: cool grey stone with teal light
 * pooling in the crevices. Keeps the ground reading as rock rather than as a
 * flat reflective sheet.
 */
export function createGroundAlbedoMap(size = 256) {
  const noise = createNoise3D(SEED + 977)
  const data = new Uint8Array(size * size * 4)

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = (x + 0.5) / size
      const v = (y + 0.5) / size

      const blotch = fbm(noise, u * 7.5, 3.2, v * 7.5, 4) * 0.5 + 0.5
      const speckle = fbm(noise, u * 26, 11.7, v * 26, 3) * 0.5 + 0.5

      let tone = 0.16 + blotch * 0.5 + speckle * 0.14
      // Damp, faintly blue pooling in the low areas.
      const damp = Math.pow(1 - blotch, 2.2)
      tone *= 1 - damp * 0.45

      const r = Math.round(Math.min(1, tone * 0.82) * 255)
      const g = Math.round(Math.min(1, tone * 0.96) * 255)
      const b = Math.round(Math.min(1, tone * 1.18 + damp * 0.1) * 255)

      const offset = (y * size + x) * 4
      data[offset] = r
      data[offset + 1] = g
      data[offset + 2] = b
      data[offset + 3] = 255
    }
  }

  return toTexture(data, size, { colorSpace: SRGBColorSpace })
}
