import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../commons/LanguageSwitcher'
import { LogoCalma } from '../ui/LogoCalma'
import { Icon } from '../commons/Icons'
import classNames from 'classnames'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { CSSTransition } from 'react-transition-group'
import { HoverSoundWrapper } from '../commons/HoverSoundFx'


const NavbarCTA = ({ onClick, className }) => {
  const { t } = useLang()

  const classes = classNames(className)

  return (
    <Button
      onClick={onClick}
      variant="primary"
      classes={classes}
      size="medium"
      icon="bell-concierge"
      label={t('header.headerButton.book')}
    />
  )
}

const MenuControlBtn = ({ isMenuOpen, handleCloseMenu, handleOpenMenu }) => {

  return (

    <Button
      variant="primary"
      classes='navbar-toggle-btn'
      icon={isMenuOpen ? 'xmark' : 'bars'}
      size="large"
      aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isMenuOpen}
      aria-controls="mobile-menu"
      onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
    />
  )
}

export const Navbar = () => {
  const { t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const prevPath = useRef(location.pathname);
  const [CTAClicked, setCTAClicked] = useState(false);

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
    document.body.classList.toggle('navbar-open', isMenuOpen)
    return () => document.body.classList.remove('navbar-open')
  }, [isMenuOpen])


  // cerrar el menú al cambiar de ruta
  useEffect(() => {
    if (isMenuOpen && location.pathname !== prevPath.current) {
      handleCloseMenu();
    }
    prevPath.current = location.pathname;
  }, [location.pathname, isMenuOpen]);


  const handleLinkClick = path => {
    navigate(path)
    if (!isDesktop) handleCloseMenu()
  }

  const handleCTAClick = () => {
    setTimeout(() => {
      navigate('/booking')
    }, 300);
    if (isMenuOpen) {
      handleCloseMenu()
    }
    setCTAClicked(true)
    setTimeout(() => setCTAClicked(false), 500); // quitamos la clase luego de la animación
  }

  const handleOpenMenu = () => setIsMenuOpen(true)

  const handleCloseMenu = () => setIsMenuOpen(false)

  const handleLogoClick = () => {
    if (isMenuOpen) {
      handleCloseMenu()
    }
    navigate('/')
  }

  const isDesktop = useMediaQuery('xl')

  return (

    <nav className='navbar'>

      {/* Menú Desktop */}
      {isDesktop && (
        <div className='navbar-desktop d-none d-xl-flex'>
          <div className="container d-flex">
            {/* Logotipo de Calma */}
            <div className="navbar-brand">
              <Tooltip content={t('header.links.logoTooltip')} placement="bottom">
                <Button
                  variant=''
                  size='medium'
                  classes="p-0 m-0 rounded-circle navbar-brand-btn"
                  onClick={handleLogoClick}
                >
                  <LogoCalma className="navbar-brand-logo" />
                </Button>
              </Tooltip>
            </div>

            {/* Links desktop - izquierda */}
            <div className="navbar-section navbar-section-left">
              <ul className='navbar-links'>
                {
                  leftLinks.map(link => {
                    const isActive = link.path === location.pathname
                    const activeClass = classNames({ 'active': isActive })
                    return (
                      <li key={link.path} className={activeClass}>
                        <NavLink
                          className='navbar-link'
                          to={link.path}
                          onClick={() => handleLinkClick(link.path)}>
                          {link.icon && (
                            <Icon
                              name={link.icon}
                              className="me-2"
                              duotone="regular"
                              variant={isActive ? 'duotones' : 'regular'}
                            />
                          )}
                          <span className="navbar-link-label">
                            {link.label}
                          </span>
                        </NavLink>
                      </li>
                    )

                  })
                }
                < li >
                  <LanguageSwitcher />
                </li>
              </ul>
            </div>

            {/* Links desktop - derecha */}
            <div className="navbar-section navbar-section-right">
              <ul className='navbar-links'>
                {
                  rightLinks.map(link => {
                    const isActive = link.path === location.pathname
                    const activeClass = classNames({ 'active': isActive })
                    return (
                      <li key={link.path} className={activeClass}>
                        <NavLink
                          className='navbar-link'
                          to={link.path}
                          onClick={() => handleLinkClick(link.path)}>
                          {link.icon && (
                            <Icon
                              name={link.icon}
                              className="me-2"
                              duotone="regular"
                              variant={isActive ? 'duotones' : 'regular'}
                            />
                          )}
                          <span className='navbar-link-label'>
                            {link.label}
                          </span>
                        </NavLink>
                      </li>
                    )

                  })

                }
                < li >
                  <HoverSoundWrapper route={'/booking'}>
                    <NavbarCTA onClick={handleCTAClick} className={classNames({ 'bounce-animation': CTAClicked }, 'navbar-desktop-cta-button')} />
                  </HoverSoundWrapper>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Menú móvil */}
      {!isDesktop && (
        <div className='navbar-mobile d-flex d-xl-none justify-content-center'>
          <div className="container d-flex">
            {/* Logotipo de Calma */}
            <div className="navbar-brand">
              <Tooltip content={t('header.links.logoTooltip')} placement="bottom">
                <Button
                  variant=''
                  size='medium'
                  classes="p-0 m-0 rounded-circle navbar-brand-btn"
                  onClick={handleLogoClick}
                >
                  <LogoCalma className="navbar-brand-logo" />
                </Button>
              </Tooltip>
            </div>
            <div className="navbar-mobile-ghost"></div> {/* Se utiliza para completar el área del lado izquierdo del menú, para que el logo quede en el centro */}


            {/* Controles móviles */}
            <div className="navbar-mobile-controls">
              <MenuControlBtn isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} />
            </div>

            {/* Overlay */}



            <CSSTransition in={isMenuOpen} timeout={300} classNames='navbar-mobile-overlay' unmountOnExit nodeRef={overlayRef}>
              <div ref={overlayRef} className="navbar-mobile-overlay" onClick={handleCloseMenu} />
            </CSSTransition>

            <CSSTransition in={isMenuOpen} timeout={300} classNames='navbar-mobile-content' unmountOnExit nodeRef={contentRef}>

              <div ref={contentRef} className="navbar-mobile-content" >
                <div className="container px-5">
                  <div className="navbar-mobile-content-controls container px-0 border-bottom py-3 mb-3">

                    <LanguageSwitcher />

                    <MenuControlBtn isMenuOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} handleOpenMenu={handleOpenMenu} />
                  </div>

                  <div className="navbar-mobile-content-links border-top border-bottom pb-3">
                    <ul className='navbar-links'>
                      {
                        navLinks.map(link => {
                          const isActive = link.path === location.pathname
                          const activeClass = classNames({ 'active': isActive })
                          return (
                            <li key={link.path} className={activeClass}>
                              <NavLink
                                className='navbar-link'
                                to={link.path}
                                onClick={() => handleLinkClick(link.path)}>
                                {link.icon && (
                                  <Icon
                                    name={link.icon}
                                    className="me-2"
                                    duotone="regular"
                                    variant={isActive ? 'duotones' : 'regular'}
                                  />
                                )}
                                <span className='navbar-link-label'>
                                  {link.label}
                                </span>
                              </NavLink>
                            </li>
                          )

                        })

                      }
                    </ul>
                  </div>

                  <div className="navbar-mobile-content-cta">
                    <HoverSoundWrapper route={'/booking'}>


                      <NavbarCTA onClick={handleCTAClick} className={classNames({ 'bounce-animation': CTAClicked }, 'w-100', 'navbar-mobile-content-cta-button')} />
                    </HoverSoundWrapper>
                  </div>
                </div>

              </div>

            </CSSTransition>



          </div>

        </div >
      )}
    </nav >
  )
}
