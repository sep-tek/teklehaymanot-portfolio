import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { colophon, focus, intro, profile } from '../../data/content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import LocalTime from '../ui/LocalTime'
import SocialLinks from '../ui/SocialLinks'
import './hero.css'

// three.js is the bulk of the bundle and paints nothing, so it is split out:
// the name, tagline and chrome paint immediately while the scene streams in.
const SceneLayer = lazy(() => import('../three/SceneLayer'))

const taglineScript = 'Creative'
const taglineBlock = 'DEVELOPER.'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Full-bleed hero.
 *
 * Three stacked layers:
 *   - the 3D scene, absolutely positioned and aria-hidden;
 *   - the editorial overlay: masthead (clears the header), the identity
 *     lockup, the biography, and the footer chrome;
 *   - the footer, anchored to the hero rather than the viewport so it scrolls
 *     away with the scene instead of covering later sections.
 */
export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()

  const rise = (delay, distance = 20) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        }

  return (
    <section className="hero" aria-labelledby="hero-name">
      <Suspense fallback={null}>
        <SceneLayer />
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
          {/*
            One identity lockup. The name sits directly above the tagline and
            every line shares a single scale, alignment and leading, so the
            three read as one deliberate mark rather than a headline with a
            caption stuck underneath.
          */}
          <div className="hero__identity">
            <h1 className="hero__name" id="hero-name">
              <motion.span {...rise(0.12, 18)}>{profile.name}</motion.span>
            </h1>

            <motion.p className="hero__tagline" {...rise(0.28)}>
              <span className="hero__tagline-script">{taglineScript}</span>
              <span className="hero__tagline-block">{taglineBlock}</span>
            </motion.p>
          </div>

          <motion.div className="hero__bio" {...rise(0.46)}>
            <p>{intro}</p>
            <p>
              Based in <strong>{profile.location}</strong>, currently a{' '}
              <strong>{profile.year}</strong> at {profile.universityShort}. My main focus is{' '}
              <strong>{profile.focusArea}</strong>.
            </p>
            <p className="hero__bio-focus">{focus.strong[1]}</p>
          </motion.div>
        </div>

        <motion.footer className="hero__footer" {...rise(0.7)}>
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
