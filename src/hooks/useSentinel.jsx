import { useState, useEffect, useRef } from 'react'

export const useSentinel = ({ threshold = 0, offset = 0 } = {}) => {
  const ref = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting) // Si el sentinel deja de estar visible → sticky
      },
      {
        root: null, // viewport
        threshold,
        rootMargin: `0px 0px ${offset}px 0px` // offset en px desde el bottom
      }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold, offset])

  return [ref, isSticky]
}
