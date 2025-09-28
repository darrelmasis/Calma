import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../commons/LanguageSwitcher'
import { LogoCalma } from '../ui/LogoCalma'
import { Icon } from '../commons/Icons'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { useDevice } from '../../hooks/useBreakpoint'
import { BagDropdown } from '../ui/BagDropdown'
import { usePWAInstall } from '../../hooks/usePWAInstall'

export const Navbar = () => {
  const { t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const prevPath = useRef(location.pathname)
  const { isInstallable, promptInstall } = usePWAInstall()

  const { type } = useDevice()

  const isMobile = type === 'mobile'
  const isTablet = type === 'tablet'
  const isDesktop = type === 'desktop'

  const navLinks = [
    {
      path: '/',
      label: t('header.links.home'),
      position: 'left',
      icon: 'house'
    },
    {
      path: '/story',
      label: t('header.links.history'),
      position: 'left',
      icon: 'book-sparkles'
    },
    {
      path: '/services',
      label: t('header.links.services'),
      position: 'right',
      icon: 'hand-holding-heart'
    },
    {
      path: '/packages',
      label: t('header.links.packages'),
      position: 'right',
      icon: 'hand-holding-box'
    }
  ]

  const leftLinks = navLinks.filter((link) => link.position === 'left')
  const rightLinks = navLinks.filter((link) => link.position === 'right')

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.classList.toggle('navbar-open', isMenuOpen)
    return () => document.body.classList.remove('navbar-open')
  }, [isMenuOpen])

  // cerrar el menú al cambiar de ruta
  useEffect(() => {
    if (isMenuOpen && location.pathname !== prevPath.current) {
      handleCloseMenu()
    }
    prevPath.current = location.pathname
  }, [location.pathname, isMenuOpen])

  const handleLinkClick = (path) => {
    navigate(path)
    if (!isDesktop) handleCloseMenu()
  }

  const handleOpenMenu = () => setIsMenuOpen(true)

  const handleCloseMenu = () => setIsMenuOpen(false)

  const handleLogoClick = () => {
    if (isMenuOpen) {
      handleCloseMenu()
    }
    navigate('/')
  }

  // En Navbar
  const handleInstall = async () => {
    const result = await promptInstall()

    if (result.success) {
      // ✅ Opción 1: Mostrar un TOAST (recomendado)
      // showToast({
      //   title: '¡App instalada!',
      //   message: 'Ya puedes usarla desde tu dispositivo.',
      //   type: 'success'
      // })

      new Notification('App instalada', { body: '...' })

      // ✅ Opción 3: Guardar para notificar en la próxima sesión
      localStorage.setItem('pwa-install-success', 'true')

      setTimeout(() => {
        new Notification('Gracias por instalar nuestra app!', {
          body: 'Te avisaremos de las novedades.'
        })
        console.log('Notificación enviada')
      }, 3000)
    }
  }

  const renderNavLinks = (links) => {
    return links.map((link) => {
      const isActive = link.path === location.pathname
      const activeClass = classNames({ active: isActive })
      return (
        <li key={link.path} className={activeClass}>
          <NavLink
            className='navbar-link'
            to={link.path}
            onClick={() => handleLinkClick(link.path)}
          >
            {link.icon && (
              <Icon
                name={link.icon}
                className='me-2'
                duotone='regular'
                variant={isActive ? 'duotones' : 'regular'}
              />
            )}
            <span className='navbar-link-label white-space-nowrap'>
              {link.label}
            </span>
          </NavLink>
        </li>
      )
    })
  }

  const MenuControlBtn = ({ isMenuOpen, handleCloseMenu, handleOpenMenu }) => {
    return (
      <AnimatePresence mode='wait'>
        <motion.div
          key={isMenuOpen ? 'close' : 'open'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className='navbar-mobile-controls'
        >
          <Button
            variant='primary'
            ghost
            className='navbar-toggle-btn border-0 p-0'
            icon={isMenuOpen ? 'xmark' : 'bars'}
            size='large'
            ariaLabel={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-menu'
            onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  const PWAInstallButton = () => {
    // if (!isInstallable) return null
    return (
      <div className='d-flex align-items-center justify-content-center w-100'>
        <Button
          variant='success'
          className='p-2'
          fullWidth
          onClick={handleInstall}
          ariaLabel='Instalar aplicación'
          size='medium'
          label={t('header.mobileNavbar.installButtonText')}
          icon='download'
        />
      </div>
    )
  }

  return (
    <nav className='navbar'>
      {/* DESKTOP LAYOUT */}
      {isDesktop && (
        <div className='navbar-desktop d-none d-lg-flex'>
          <div className='container d-flex align-items-center justify-content-center'>
            {/* Left Section: Left Links + Language Switcher */}
            <div className='navbar-section d-flex align-items-center gap-4'>
              <LanguageSwitcher />
              <ul className='navbar-links d-flex align-items-center m-0 justify-content-flex-end'>
                {renderNavLinks(leftLinks)}
              </ul>
            </div>

            {/* Center: Logotipo de Calma */}
            <div className='navbar-brand'>
              <Tooltip
                content={t('header.links.logoTooltip')}
                placement='bottom'
              >
                <Button
                  variant='initial'
                  size='medium'
                  className='p-0 m-0 rounded-circle navbar-brand-btn border-0'
                  ariaLabel='Logo de calma | Inicio'
                  onClick={handleLogoClick}
                >
                  <LogoCalma className='navbar-brand-logo' />
                </Button>
              </Tooltip>
            </div>

            {/* Right Section: Right Links + Bag */}
            <div className='navbar-section d-flex align-items-center'>
              <ul className='navbar-links d-flex align-items-center m-0'>
                {renderNavLinks(rightLinks)}
              </ul>
              <div className='d-flex'>
                <BagDropdown />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TABLET LAYOUT */}
      {isTablet && (
        <div className='navbar-tablet d-flex'>
          <div className='container d-flex align-items-center'>
            {/* Right: Bag + Hamburger */}
            <div className='navbar-section flex-1 d-flex justify-content-flex-start'>
              <MenuControlBtn
                isMenuOpen={isMenuOpen}
                handleCloseMenu={handleCloseMenu}
                handleOpenMenu={handleOpenMenu}
              />
            </div>

            {/* Center: Logo */}
            <div className='navbar-brand flex-1 d-flex justify-content-center m-0'>
              <Tooltip
                content={t('header.links.logoTooltip')}
                placement='bottom'
              >
                <Button
                  variant='initial'
                  size='medium'
                  className='p-0 m-0 rounded-circle navbar-brand-btn border-0'
                  ariaLabel='Logo de calma | Inicio'
                  onClick={handleLogoClick}
                >
                  <LogoCalma className='navbar-brand-logo' />
                </Button>
              </Tooltip>
            </div>

            <div className='flex-1 d-flex justify-content-flex-end'>
              <BagDropdown />
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className='navbar-tablet-overlay'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleCloseMenu}
              />
            )}
          </AnimatePresence>

          {/* Tablet Menu Content */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className='navbar-tablet-content p-3 border-top h-100'
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.3 }}
              >
                <p className='text-center fs-h4 border-bottom m-0 pb-3 text-muted'>
                  {t('header.mobileNavbar.title')}
                </p>
                <div className='d-flex my-5 flex-direction-column justify-content-space-between align-items-center flex-1'>
                  <ul className='navbar-links d-flex flex-direction-column'>
                    {renderNavLinks(navLinks)}
                  </ul>
                  <div className='d-flex flex-direction-column align-items-center gap-1 border-top w-100 pt-5'>
                    <div className='w-100 d-flex flex-direction-column justify-content-center '>
                      <LanguageSwitcher />
                    </div>
                    <PWAInstallButton />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {/* MOBILE LAYOUT */}
      {isMobile && (
        <div className='navbar-mobile d-flex'>
          <div className='container d-flex align-items-center'>
            {/* Center: Logo */}

            {/* Right: Bag + Hamburger */}
            <div className='navbar-section flex-1 d-flex justify-content-flex-start'>
              <MenuControlBtn
                isMenuOpen={isMenuOpen}
                handleCloseMenu={handleCloseMenu}
                handleOpenMenu={handleOpenMenu}
              />
            </div>
            <div className='navbar-brand flex-1 d-flex justify-content-center m-0'>
              <Tooltip
                content={t('header.links.logoTooltip')}
                placement='bottom'
              >
                <Button
                  variant='initial'
                  size='medium'
                  className='p-0 m-0 rounded-circle navbar-brand-btn border-0'
                  ariaLabel='Logo de calma | Inicio'
                  onClick={handleLogoClick}
                >
                  <LogoCalma className='navbar-brand-logo' />
                </Button>
              </Tooltip>
            </div>

            {/* <div className='flex-1 d-flex justify-content-flex-center'> */}
            <BagDropdown />
            {/* </div> */}
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className='navbar-overlay'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                onClick={handleCloseMenu}
              />
            )}
          </AnimatePresence>

          {/* Mobile Menu Content */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className='navbar-mobile-content p-3 border-top h-100'
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.3 }}
              >
                <p className='text-center fs-h4 border-bottom m-0 pb-3 text-muted'>
                  {t('header.mobileNavbar.title')}
                </p>
                <div className='d-flex my-5 flex-direction-column justify-content-space-between align-items-center flex-1'>
                  <ul className='navbar-links d-flex flex-direction-column'>
                    {renderNavLinks(navLinks)}
                  </ul>
                  <div className='d-flex flex-direction-column align-items-center gap-1 border-top w-100 pt-5'>
                    <div className='w-100 d-flex flex-direction-column justify-content-center '>
                      <LanguageSwitcher />
                    </div>
                    <PWAInstallButton />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  )
}
