import { motion } from 'motion/react'
import { Children } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Parent that triggers a staggered reveal of its `Reveal orchestrated`
 * children when it first enters the viewport.
 *
 * `stagger` is the *requested* per-item step. The actual step is capped so the
 * whole group never takes longer than `maxSpan` seconds from first item to
 * last — without this, a long list (skills, contact methods) leaves the final
 * row feeling late and the section reads as sluggish.
 */
export default function RevealGroup({
  children,
  as = 'div',
  className,
  stagger = 0.15,
  delay = 0,
  maxSpan = 0.62,
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

  const count = Children.count(children)
  const effectiveStagger =
    count > 1 ? Math.min(stagger, maxSpan / (count - 1)) : stagger

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: effectiveStagger,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
