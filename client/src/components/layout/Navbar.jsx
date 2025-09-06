import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { NavbarNav } from './NavbarNav'
import { Tooltip } from '../ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../commons/LanguageSwitcher'

const NavbarCTA = ({ visibleOn }) => {
  const { t } = useLang()
  const navigate = useNavigate()

  const classes =
    visibleOn === 'desktop'
      ? 'd-none d-lg-flex w-100'
      : visibleOn === 'mobile'
      ? 'd-lg-none'
      : ''

  return (
    <Button
      onClick={() => navigate('/booking')}
      variant="primary"
      classes={classes}
      size=""
      icon="calendar-check"
      label={t('header.headerButton.book')}
    />
  )
}

export const Navbar = () => {
  const { t } = useLang()
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const navLinks = [
    { path: '/', label: t('header.links.home'), position: 'left', icon: 'house' },
    { path: '/history', label: t('header.links.history'), position: 'left', icon: 'book-sparkles' },
    { path: '/services', label: t('header.links.services'), position: 'right', icon: 'hand-holding-heart' },
    { path: '/packages', label: t('header.links.packages'), position: 'right', icon: 'hand-holding-box' },
  ]

  const leftLinks = navLinks.filter(link => link.position === 'left')
  const rightLinks = navLinks.filter(link => link.position === 'right')

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [isMenuOpen])

  const handleLinkClick = (path) => {
    if (isMenuOpen) {
      handleCloseMenu()
      setTimeout(() => navigate(path), 300) // navegar cuando termina animación
    } else {
      navigate(path)
    }
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true) // montar
    setTimeout(() => setIsAnimatingOpen(true), 10) // disparar animación
  }

  const handleCloseMenu = () => {
    setIsClosing(true)
    setIsAnimatingOpen(false) // desactivar animación de entrada
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsClosing(false)
    }, 300)
  }

  return (
    <nav className="navbar d-flex container align-items-center justify-content-center position-relative">
      {/* Idioma */}
      <div className="position-absolute left-0 d-lg-block">
        <LanguageSwitcher />
      </div>

      {/* Links izquierda */}
      <NavbarNav
        links={leftLinks}
        className="d-none w-100 d-lg-flex flex-direction-lg-row justify-content-flex-end"
      />

      {/* Logo */}
      <NavLink
        className="w-auto d-flex justify-content-center align-items-center"
        to="/"
        aria-label={t('header.links.logoTooltip')}
      >
        <Tooltip content={t('header.links.logoTooltip')} placement="bottom">
          <img src="/logo-calma.svg" alt="Logo Calma" className="navbar-logo mx-4" />
        </Tooltip>
      </NavLink>

      {/* Links derecha */}
      <NavbarNav
        links={rightLinks}
        className="d-none w-100 d-lg-flex flex-direction-lg-row justify-content-flex-start"
      />

      {/* Menú móvil */}
      {isMenuOpen && (
        <div
          className={`navbar-mobile-menu
            ${isAnimatingOpen ? 'open' : ''}
            ${isClosing ? 'closing' : ''}`}
          id="mobile-menu"
          aria-hidden={!isMenuOpen}
        >
          <NavbarNav links={navLinks} onLinkClick={handleLinkClick} />
          <NavbarCTA visibleOn="mobile" />
        </div>
      )}

      {/* CTA desktop + toggle móvil */}
      <div className="position-absolute right-0 d-flex flex-direction-column">
        <NavbarCTA visibleOn="desktop" />

        <Button
          variant="primary"
          classes="d-lg-none me-3"
          icon={isMenuOpen ? 'xmark' : 'bars'}
          size="large"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            if (isMenuOpen) {
              handleCloseMenu()
            } else {
              handleOpenMenu()
            }
          }}
        />
      </div>
    </nav>
  )
}
