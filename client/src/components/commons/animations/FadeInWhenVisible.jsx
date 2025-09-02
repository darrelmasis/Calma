import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export const FadeInWhenVisible = ({ children, delay = 0, className = '', ...props }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 1 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
