import React, { useState, useEffect, useRef } from 'react'
import { Navbar } from './Navbar'
import classNames from 'classnames'
import { NavbarAlt } from './Navbar-alt'
import { useDevice } from '../../hooks/useBreakpoint'

const Header = () => {
  const [hideHeader, setHideHeader] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setHideHeader(true) // Scroll hacia abajo
      } else {
        setHideHeader(false) // Scroll hacia arriba
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hideClass = hideHeader ? 'hide' : ''
  const showClass = hideHeader ? 'show' : ''

  const isMobile = useDevice().type === 'mobile'
  const isTablet = useDevice().type === 'tablet'

  return (
    <>
      <header
        className={`header header-main bg-container border-bottom position-sticky ${hideClass}`}
      >
        <Navbar />
      </header>
      {!isMobile && !isTablet && (
        <header
          className={`header header-alt position-fixed border-bottom top-0 left-0 ${showClass}`}
        >
          <NavbarAlt />
        </header>
      )}
    </>
  )
}

export default Header
