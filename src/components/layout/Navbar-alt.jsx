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

export const NavbarAlt = () => {
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

  const handleLogoClick = () => {
    if (isMenuOpen) {
      handleCloseMenu()
    }
    navigate('/')
  }

  return (
    <div className='navbar py-1'>
      {/* DESKTOP LAYOUT */}

      <div className='navbar-desktop d-flex'>
        <div className='container d-flex align-items-center justify-content-center'>
          {/* Left Section: Left Links + Language Switcher */}
          <div className='navbar-section d-flex align-items-center gap-4'>
            <LanguageSwitcher />
          </div>

          {/* Center: Logotipo de Calma */}
          <div className='navbar-brand'>
            <Tooltip content={t('header.links.logoTooltip')} placement='bottom'>
              <Button
                variant='initial'
                size='medium'
                className='p-0 m-0 rounded-circle-md navbar-brand-btn border-0'
                ariaLabel='Logo de calma | Inicio'
                onClick={handleLogoClick}
              >
                <LogoCalma className='wx-50' />
              </Button>
            </Tooltip>
          </div>

          <BagDropdown />
        </div>
      </div>
    </div>
  )
}
