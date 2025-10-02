import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ triggerRef }) => {
  const { pathname } = useLocation()
  const prevPageRef = useRef('') // guarda la ruta sin prefijo

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const getPagePath = (path) => {
    // elimina prefijo de idioma
    const segments = path.split('/').filter(Boolean)
    return segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'
  }

  // Ejecuta scroll solo si cambia la página, no el idioma
  useEffect(() => {
    const currentPage = getPagePath(pathname)
    if (prevPageRef.current !== currentPage) {
      scrollToTop()
    }
    prevPageRef.current = currentPage
  }, [pathname])

  // Si recibimos una referencia a un botón, le inyectamos el evento
  useEffect(() => {
    if (!triggerRef?.current) return
    const btn = triggerRef.current
    btn.addEventListener('click', scrollToTop)

    return () => btn.removeEventListener('click', scrollToTop)
  }, [triggerRef])

  return null
}

export default ScrollToTop
