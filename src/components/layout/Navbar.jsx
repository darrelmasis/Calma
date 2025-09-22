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
import { useOfflineStatus } from '../../hooks/useOfflineStatus'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { Dropdown, DropdownTrigger, DropdownContent } from '../ui/Dropdown'
import { USD } from '../../utils/utils'


const NavbarCTA = ({ onClick, className }) => {
  const { t } = useLang()
  const { totalServices } = useSelectedServices()

  const classes = classNames(className)

  return (
    <Button
      onClick={onClick}
      variant="primary"
      className={classes}
      icon={[{ name: "calendar-check", position: "left", variant: "regular" }]}
      ariaLabel="Reservar cita"
      label={
        <>
          {t('header.headerButton.book')}
          <span className='ms-2'>{`(${totalServices})`}</span>
        </>
      }
    />
  )
}

const MenuControlBtn = ({ isMenuOpen, handleCloseMenu, handleOpenMenu }) => {

  return (

    <Button
      variant="primary"
      className='navbar-toggle-btn border-0'
      icon={
        {
          name: isMenuOpen ? 'xmark' : 'bars',
          variant: 'regular',
        }
      }
      size="large"
      ariaLabel={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
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
  const isOffline = useOfflineStatus()
  const { totalServices, servicesWithInfo, clearServices, removeService, totalPrice } = useSelectedServices()


  const navLinks = [
    { path: '/', label: t('header.links.home'), position: 'left', icon: 'house' },
    { path: '/story', label: t('header.links.history'), position: 'left', icon: 'book-sparkles' },
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

  const navigateToServices = () => {
    navigate('/services')
  }

  const navigateToBooking = () => {
    navigate('/booking')
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
                  variant='initial'
                  size='medium'
                  className="p-0 m-0 rounded-circle navbar-brand-btn border-0"
                  ariaLabel="Logo de calma | Inicio"
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
                < li className='d-flex align-items-center gap-3' >
                  <LanguageSwitcher />
                  {
                    isOffline && (
                      <Icon
                        name="wifi-exclamation"
                        variant='duotones'
                        duotone='solid'
                        size="lg"
                        className="text-warning icon-offline"
                      />
                    )
                  }
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
                <li>
                  <Dropdown>
                    <DropdownTrigger>
                      <div className='navbar-dropdown-info'>
                        <Button variant='basic' className="position-relative rounded-pill-md" icon={[
                          { name: "bag-shopping", variant: "regular", position: "left" },
                          { name: "chevron-down", variant: "regular", position: "right" }
                        ]}>
                          <div className='possition-relative'>
                            <span className='me-4s'>{t('header.dropdown.text')}</span>
                            {totalServices > 0 && (
                              <span className='fs-small text-white navbar-dropdown-badge border-white border-2 bg-danger-400 position-absolute fw-bold'>
                                <span>{totalServices}</span>
                              </span>
                            )}
                          </div>
                        </Button>
                      </div>

                    </DropdownTrigger>
                    <DropdownContent>
                      <div className="navbar-dropdown-wrapper rounded-all-mdoverflow-hidden">
                        {totalServices === 0 ? (
                          <div className="d-flex flex-direction-column align-items-center justify-content-center gap-1 p-3">
                            <Icon name="inbox" size="lg" className="text-muted" />
                            <p className="fs-medium text-center text-muted m-0">
                              {t('header.dropdown.empty')}
                            </p>
                            <Button variant="primary" icon="compass" ghost onClick={navigateToServices}>
                              {t('header.dropdown.exploreServices')}
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="p-3">
                              <p className="text-center border-bottom pb-3 d-flex align-items-center justify-content-center gap-1 mt-1">
                                <Icon name="list-check" size="sm" className="text-muted" />
                                <span>{t('header.dropdown.title')}</span>
                                <Tooltip content={t('header.dropdown.clearTooltip')} placement="bottom">
                                  <Button size="medium" icon="broom-wide" variant="basic" onClick={clearServices} />
                                </Tooltip>
                              </p>

                              <div className="navbar-dropdown-services-added scrollbar-thin">
                                {Object.entries(servicesWithInfo).map(([categoryId, items]) => (
                                  <div key={categoryId}>
                                    <div className="mb-3 fs-h6">
                                      {t(`services.section_1.category.${categoryId}.name`)}
                                    </div>
                                    <ul className="navbar-dropdown-service-list mb-3 gap-0-5">
                                      {items.map((service) => (
                                        <li
                                          className="navbar-dropdown-service-item rounded-all-sm d-flex align-items-center fs-medium"
                                          key={`${categoryId}-${service.subCategoryId}-${service.id}`}
                                        >
                                          <div className="me-2 d-flex flex-direction-column flex-1">
                                            <span className="mb-1">
                                              {service.subCategoryName}
                                            </span>
                                            <span className='fs-small text-muted'>{service.serviceName}</span>
                                          </div>
                                          <span className="me-2">
                                            <USD
                                              className="fs-medium fw-regular"
                                              amount={service.servicePrice}
                                              currencySymbol="$"
                                            />
                                          </span>
                                          <Button
                                            icon="trash-can"
                                            size="small"
                                            ghost
                                            variant="danger"
                                            onClick={() =>
                                              removeService(categoryId, service.subCategoryId, service.id)
                                            }
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Total estimado */}
                            <div className="bg-light-100 px-3 pt-2 pb-3 d-flex flex-direction-column gap-1">
                              <div className="total-price text-end my-2 fs-medium d-flex align-items-flex-satrt justify-content-space-between">
                                <div className='fs-h5 d-flex flex-direction-column align-items-flex-start'>
                                  <span className='fw-bold'>{t('header.dropdown.total')}</span>
                                  <span className='text-muted fs-small'>
                                    {`${totalServices} ${totalServices === 1
                                      ? t('header.dropdown.totalSubtitle')
                                      : t('header.dropdown.totalSubtitle') + "s"}`}
                                  </span>

                                </div>
                                <USD amount={totalPrice} currencySymbol="$" size="large" prefix="~" />
                              </div>

                              <div className="navbar-dropdown-actions d-flex justify-content-space-between gap-1">
                                <Button size="medium" icon="calendar-check" fullWidth variant="info" onClick={navigateToBooking}>
                                  {t('header.dropdown.book')}
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </DropdownContent>

                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
      }

      {/* Menú móvil */}
      {
        !isDesktop && (
          <div className='navbar-mobile d-flex d-xl-none justify-content-center'>
            <div className="container d-flex">
              {/* Logotipo de Calma */}
              <div className="navbar-brand">
                <Tooltip content={t('header.links.logoTooltip')} placement="bottom">
                  <Button
                    variant='initial'
                    size='medium'
                    className="p-0 m-0 rounded-circle navbar-brand-btn border-0"
                    ariaLabel="Logo de calma | Inicio"
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


                      <NavbarCTA onClick={handleCTAClick} className={classNames({ 'bounce-animation': CTAClicked }, 'w-100', 'navbar-mobile-content-cta-button')} />

                    </div>
                  </div>

                </div>

              </CSSTransition>



            </div>

          </div >
        )
      }
    </nav >
  )
}
