/**
 * CSS-only stand-in for the 3D sphere.
 *
 * Shown when WebGL is unavailable or has been blocked by the browser. Built
 * from layered radial and conic gradients so it still reads as the same
 * pearlescent object rather than as a generic purple blob.
 *
 * Purely decorative and hidden from assistive technology.
 */

import './sphereFallback.css'

export default function SphereFallback() {
  return (
    <div className="sphere-fallback">
      <span className="sphere-fallback__body" />
      <span className="sphere-fallback__rim" />
      <span className="sphere-fallback__shade" />
    </div>
  )
}
