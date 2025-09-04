import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { NavbarNav } from './NavbarNav'
import { Tooltip } from '../ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../commons/LanguageSwitcher'
import { useNavigate } from 'react-router-dom'


export const Navbar = () => {

  const { t } = useLang()
  const navigate = useNavigate()

  const navLinks = [
    { path: '/', label: t('header.links.home'), position: 'left', icon: 'house' },
    { path: '/history', label: t('header.links.history'), position: 'left', icon: 'book-sparkles' },
    { path: '/services', label: t('header.links.services'), position: 'right', icon: 'hand-holding-heart' },
    { path: '/packages', label: t('header.links.packages'), position: 'right', icon: 'hand-holding-box' },
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const leftLinks = navLinks.filter(link => link.position === 'left')
  const rightLinks = navLinks.filter(link => link.position === 'right')

  const CTA = <Button onClick={() => navigate('/booking')} variant="primary" classes="me-lg-3" size="" icon="calendar-check" label={t('header.headerButton.book')} />


  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  return (
    <nav className="navbar d-flex container align-items-center justify-content-center position-relative">
      {/* Contenido de navegación centrado */}

      <div className="position-absolute left-0 d-none d-lg-block">
        <LanguageSwitcher />
      </div>

      <NavbarNav links={leftLinks} className="d-none w-100 d-lg-flex flex-direction-lg-row justify-content-flex-end" />

      {/* Logo centrado */}
      <NavLink className="w-auto d-flex justify-content-center align-items-center" to="/">
        <Tooltip content={t('header.links.logoTooltip')} placement="bottom">
          <img src="/logo-calma.svg" alt="Logo" className="navbar-logo mx-4" />
        </Tooltip>
      </NavLink>
      <NavbarNav links={rightLinks} className="d-none w-100 d-lg-flex flex-direction-lg-row justify-content-flex-start" />

      {/* Menu móvil */}
      <div
        className={`d-flex d-lg-none flex-direction-column flex-wrap-wrap gap-3 align-items-center navbar-mobile-menu position-fixed py-3 w-100 ${isMenuOpen ? 'open d-flex' : ''}`}
      >

        <NavbarNav links={navLinks} />
        {CTA}
        <LanguageSwitcher className='' />
      </div>

      {/* Botón de reserva y Menu a la derecha */}
      <div className="position-absolute right-0">
      </div>
      <div className="position-absolute right-0 d-flex flex-direction-column">
        <Button onClick={() => navigate('/booking')} variant="primary" classes="d-none d-lg-flex" size="" icon="calendar-check" label={t('header.headerButton.book')} />
        <Button variant="primary" classes="d-lg-none me-3" icon="bars" size="large" onClick={() => setIsMenuOpen(!isMenuOpen)}></Button>
      </div>
    </nav>
  )
}
