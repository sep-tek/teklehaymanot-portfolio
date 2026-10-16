import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { REVEAL_EASE, revealItemVariants } from './revealVariants'

/**
 * Scroll-triggered entrance wrapper.
 *
 * Two modes:
 *   - standalone — animates itself when it enters the viewport;
 *   - orchestrated — waits for an ancestor `RevealGroup` to trigger, which is
 *     how sibling lists get a stagger without every item carrying its own
 *     delay arithmetic.
 *
 * `viewport.once` means an element never replays, so scrolling back up and down
 * does not cause a distracting loop of re-animations.
 *
 * When the visitor prefers reduced motion the element is rendered as a plain
 * tag with no transform — content is never hidden behind an animation that
 * will not run.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  distance = 18,
  duration = 0.85,
  orchestrated = false,
  className,
  ...rest
}) {
  const reduced = usePrefersReducedMotion()
  const Tag = as

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const MotionTag = motion[as] ?? motion.div

  if (orchestrated) {
    return (
      <MotionTag className={className} variants={revealItemVariants(distance)} {...rest}>
        {children}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration, delay, ease: REVEAL_EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
