import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export const FadeInWhenVisible = ({
  children,
  delay = 0,
  className = '',
  ...props
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
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