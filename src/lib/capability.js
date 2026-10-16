/** Detects whether this browser/device can meaningfully run the 3D scene. */

let webglCache

export function detectWebGL() {
  if (webglCache !== undefined) return webglCache

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    webglCache = false
    return webglCache
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) {
      webglCache = false
      return webglCache
    }
    // Free the probe context immediately so we never hold a second GL context.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    webglCache = true
  } catch {
    webglCache = false
  }

  return webglCache
}

/**
 * Coarse performance tier used to size the render target, the procedural
 * textures and the ground reflection. Deliberately cheap and synchronous.
 */
export function detectQualityTier() {
  if (typeof window === 'undefined') return 'medium'

  const cores = navigator.hardwareConcurrency ?? 4
  const memory = navigator.deviceMemory ?? 4
  const isCoarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const smallestSide = Math.min(window.innerWidth, window.innerHeight)

  if (isCoarsePointer && (cores <= 6 || memory <= 4)) return 'low'
  if (smallestSide < 620 || cores <= 3 || memory <= 2) return 'low'
  if (cores <= 6 || memory <= 4) return 'medium'
  return 'high'
}

export const QUALITY = {
  low: {
    sphereSegments: [64, 48],
    terrainSegments: 72,
    terrainSize: 46,
    textureSize: 256,
    groundTextureSize: 192,
    reflectorResolution: 256,
    reflections: false,
    maxDpr: 1.25,
    shadowMapSize: 512,
  },
  medium: {
    sphereSegments: [96, 64],
    terrainSegments: 108,
    terrainSize: 54,
    textureSize: 384,
    groundTextureSize: 256,
    reflectorResolution: 512,
    reflections: true,
    maxDpr: 1.5,
    shadowMapSize: 1024,
  },
  high: {
    sphereSegments: [128, 96],
    terrainSegments: 150,
    terrainSize: 60,
    textureSize: 512,
    groundTextureSize: 256,
    reflectorResolution: 512,
    reflections: true,
    maxDpr: 1.75,
    shadowMapSize: 2048,
  },
}
