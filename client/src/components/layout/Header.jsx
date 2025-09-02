import React, { useState, useEffect, useRef } from 'react'
import { Navbar } from './Navbar'

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (window.innerWidth <= 768) return // Solo aplica en móviles
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHideHeader(true) // Scroll hacia abajo
      } else {
        setHideHeader(false) // Scroll hacia arriba
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header bg-container border-bottom position-sticky ${hideHeader ? 'hide' : ''}`}>
      <Navbar />
    </header>
  )
}

export default Header
