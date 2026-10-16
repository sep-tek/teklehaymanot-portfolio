/** Tiny numeric helpers shared by the procedural scene generators. */

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export const lerp = (a, b, t) => a + (b - a) * t

/** Frame-rate independent easing toward a target. */
export const damp = (current, target, lambda, delta) =>
  lerp(current, target, 1 - Math.exp(-lambda * delta))

/** Hermite smoothstep between two edges. */
export function smoothstep(edge0, edge1, value) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export const TAU = Math.PI * 2
