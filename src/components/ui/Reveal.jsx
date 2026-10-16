import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Scroll-triggered entrance wrapper.
 *
 * When the visitor prefers reduced motion the element is rendered as a plain
 * tag with no transform — content is never hidden behind an animation that
 * will not run.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  distance = 28,
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

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
