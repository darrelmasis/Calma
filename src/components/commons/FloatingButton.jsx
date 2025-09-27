import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/Button'
import { Icon } from './Icons'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'
import { useSound } from './SoundManager'
import { useLocation } from 'react-router-dom'
import { useSelectedServices } from '../../hooks/useSelectedService'

const FloatingButton = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [switchIcon, setSwitchIcon] = useState(false)
  const calmaPhoneNumber = import.meta.env.VITE_CALMA_PHONE_NUMBER
  const { t } = useLang()
  const containerRef = useRef(null) // <-- referencia al contenedor principal
  const closeSound = useSound('closePops', 0.5)
  const openSound = useSound('openPops', 0.5)
  const showOptionsRef = useRef(showOptions)
  const { pathname } = useLocation()
  const isBookingPage = pathname === '/booking'
  const { totalServices } = useSelectedServices()
  const [hasServices, setHasServices] = useState(false)

  useEffect(() => {
    setHasServices(totalServices > 0)
  }, [totalServices])

  const optionButtonClasses = classNames(
    {
      'option-button': true,
      show: showOptions,
      hide: !showOptions
    },
    'position-relative'
  ) // para el punto rojo

  const mainButtonIconName = classNames({
    question: !switchIcon,
    xmark: switchIcon
  })

  const formatPhoneNumber = (num, countryCode = '505') => {
    let cleanNum = num.replace(/\D/g, '')
    if (!cleanNum.startsWith(countryCode)) {
      cleanNum = countryCode + cleanNum
    }
    return cleanNum
  }

  const handleMainButtonClick = () => {
    if (!showOptions) {
      openSound.play()
      setShowOptions(true)
      setSwitchIcon(true)
      setIsVisible(true)
    } else {
      closeSound.play()
      setShowOptions(false)
      setSwitchIcon(false)
      setTimeout(() => setIsVisible(false), 250) // da tiempo a la animación de salida
    }
  }

  const handleWhatsappButton = () => {
    const whatsappLink = `https://wa.me/${formatPhoneNumber(calmaPhoneNumber)}`
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  // 🔹 Mantener el ref actualizado
  useEffect(() => {
    showOptionsRef.current = showOptions
  }, [showOptions])

  // 🔹 Cerrar opciones al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (showOptionsRef.current) {
          closeSound.play()
          setShowOptions(false)
          setSwitchIcon(false)
          setTimeout(() => setIsVisible(false), 250) // da tiempo a la animación de salida
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [openSound])

  return (
    !isBookingPage && (
      <div className={`floating-button z-index-10`} ref={containerRef}>
        <div className='floating-button-container'>
          {isVisible && (
            <div className='floating-button-options'>
              <div className={optionButtonClasses}>
                <Button
                  onClick={handleWhatsappButton}
                  variant='success'
                  className='option-button-wrapper whatsapp-button p-0'
                >
                  <div className='grid-row grid-col-auto-1fr justify-content-center gap-0'>
                    <div className='d-flex option-button-label align-items-center justify-content-center h-100 ms-3'>
                      <p className='m-0 fs-medium white-space-nowrap'>
                        {t('floatingButton.whatsappButtonText')}
                      </p>
                    </div>
                    <div className='d-flex option-button-icon align-items-center justify-content-center'>
                      <Icon name='whatsapp' variant='brands' size='lg' />
                    </div>
                  </div>
                </Button>
              </div>
              <div className={optionButtonClasses}>
                <Button
                  as='link'
                  to={'/contact'}
                  variant='info'
                  className='option-button-wrapper booking-button p-0'
                >
                  <div className='grid-row grid-col-auto-1fr justify-content-center gap-0'>
                    <div className='d-flex option-button-label align-items-center justify-content-center h-100 ms-3'>
                      <p className='m-0 fs-medium white-space-nowrap'>
                        {t('floatingButton.emailButtonText')}
                      </p>
                    </div>
                    <div className='d-flex option-button-icon align-items-center justify-content-center'>
                      <Icon name='messages' variant='regular' />
                    </div>
                  </div>
                </Button>
              </div>
              <div className={optionButtonClasses}>
                <Button
                  as='link'
                  to={'/booking'}
                  variant='primary'
                  className='option-button-wrapper booking-button p-0'
                >
                  <div className='grid-row grid-col-auto-1fr justify-content-center gap-0'>
                    <div className='d-flex option-button-label align-items-center justify-content-center h-100 ms-3'>
                      <p className='m-0 fs-medium white-space-nowrap'>
                        {t('floatingButton.bookingButtonText')}
                      </p>
                    </div>
                    <div className='d-flex option-button-icon align-items-center justify-content-center'>
                      <Icon name='calendar-check' variant='regular' />
                    </div>
                  </div>
                </Button>
                {hasServices && (
                  <span className='position-absolute top-0 right-0 red-dot rounded-all-sm border-white border-2 bg-danger-400'></span>
                )}
              </div>
            </div>
          )}

          <div className='position-relative'>
            <Button
              className='floating-button-toggle rounded-all-full main-button'
              variant='info'
              onClick={handleMainButtonClick}
              ariaLabel='Abrir burbujas de opciones'
              tabIndex={0}
              size='large'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={mainButtonIconName}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.1 }}
                  className='d-flex align-items-center justify-content-center h-100'
                >
                  <Icon name={mainButtonIconName} variant='solid' size='lg' />
                </motion.div>
              </AnimatePresence>
            </Button>
            {hasServices && !isVisible && (
              <span className='position-absolute top-0 right-0 red-dot rounded-all-sm border-white border-2 bg-danger-400'></span>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default FloatingButton
