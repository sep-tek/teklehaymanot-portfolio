import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { colophon, focus, intro, profile } from '../../data/content'
import { useIsCompact } from '../../hooks/useSceneCapability'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import LocalTime from '../ui/LocalTime'
import SocialLinks from '../ui/SocialLinks'
import './hero.css'

// three.js is the bulk of the bundle and paints nothing, so it is split out:
// the headline, bio and chrome paint immediately while the scene streams in.
const SceneLayer = lazy(() => import('../three/SceneLayer'))

const headlineScript = 'Creative'
const headlineBlock = 'DEVELOPER.'

/**
 * Full-bleed hero.
 *
 * Three stacked layers:
 *   - the 3D scene, absolutely positioned and aria-hidden;
 *   - the editorial overlay (headline left, bio right);
 *   - the pinned footer chrome, anchored to the hero rather than the viewport
 *     so it scrolls away with the scene instead of covering later sections.
 */
export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const compact = useIsCompact()

  const rise = (delay) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <section className="hero" aria-labelledby="hero-headline">
      <Suspense fallback={null}>
        <SceneLayer compact={compact} />
      </Suspense>

      <motion.div
        className="hero__scene"
        aria-hidden="true"
        {...(reducedMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1.6, ease: 'easeOut' },
            })}
      />

      <div className="hero__overlay">
        <div className="hero__masthead" aria-hidden="true" />

        <div className="hero__grid">
          <motion.h1 className="hero__headline" id="hero-headline" {...rise(0.15)}>
            <span className="hero__headline-script">{headlineScript}</span>
            <span className="hero__headline-block">{headlineBlock}</span>
          </motion.h1>

          <motion.div
            className="hero__bio"
            {...rise(0.55)}
          >
            <p>{intro}</p>
            <p>
              Based in <strong>{profile.location}</strong>, currently a{' '}
              <strong>{profile.year}</strong> at {profile.universityShort}. My main focus is{' '}
              <strong>{profile.focusArea}</strong>.
            </p>
            <p className="hero__bio-focus">{focus.strong[1]}</p>
          </motion.div>
        </div>

        <motion.footer className="hero__footer" {...rise(0.85)}>
          <LocalTime />
          <SocialLinks />
          <p className="hero__colophon">
            <span>&copy;{colophon.year}</span>
            <span className="hero__colophon-mark">{colophon.wordmark}</span>
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
