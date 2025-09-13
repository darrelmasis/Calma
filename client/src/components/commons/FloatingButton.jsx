import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Icon } from './Icons';
import classNames from 'classnames';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext'
import { SoundWrapper, useSound } from './SoundManager';


const FloatingButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [switchIcon, setSwitchIcon] = useState(false)
  const navigate = useNavigate()
  const calmaPhoneNumber = import.meta.env.VITE_CALMA_PHONE_NUMBER
  const { t } = useLang()
  const containerRef = useRef(null); // <-- referencia al contenedor principal
  const iconRef = useRef(null)
  const sound = useSound('closePops', 0.5)
  const showOptionsRef = useRef(showOptions);

  const mainButtonSound = switchIcon ? 'closePops' : 'openPops'

  const optionButtonClasses = classNames({
    'option-button': true,
    'show': showOptions,
    'hide': !showOptions
  });

  const mainButtonIconName = classNames({
    'question': !switchIcon,
    'xmark': switchIcon
  })

  const formatPhoneNumber = (num, countryCode = "505") => {
    let cleanNum = num.replace(/\D/g, '');
    if (!cleanNum.startsWith(countryCode)) {
      cleanNum = countryCode + cleanNum;
    }
    return cleanNum;
  }

  const handleMainButtonClick = () => {
    if (!showOptions) {
      setTimeout(() => setShowOptions(true), 100);
    } else {
      setTimeout(() => setShowOptions(false), 100)
    }
    switchIcon ? setSwitchIcon(false) : setSwitchIcon(true)

    isVisible ? setTimeout(() => setIsVisible(false), 500) : setTimeout(() => setIsVisible(true), 100)
  }

  const handleBookingButton = () => {
    navigate('/booking')
  }

  const handleWhatsappButton = () => {
    const whatsappLink = `https://wa.me/${formatPhoneNumber(calmaPhoneNumber)}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  // 🔹 Mantener el ref actualizado
  useEffect(() => {
    showOptionsRef.current = showOptions;
  }, [showOptions]);

  // 🔹 Cerrar opciones al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (showOptionsRef.current) { // ✅ ahora sí tiene el valor actual
          sound.play();
          setTimeout(() => setShowOptions(false), 100);
          setSwitchIcon(false);
          setTimeout(() => setIsVisible(false), 500);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [sound]);

  return (
    <div className="floating-button z-index-10" ref={containerRef}>
      <div className="floating-button-container">
        {isVisible && (
          <div className="floating-button-options">
            <div className={optionButtonClasses}>
              <Button onClick={handleWhatsappButton} variant='success' className='option-button-wrapper whatsapp-button p-0'>
                <div className="grid-row grid-col-auto-1fr justify-content-center gap-0">
                  <div className="d-flex option-button-label align-items-center justify-content-center h-100 ms-3">
                    <p className='m-0 fs-medium white-space-nowrap'>{t('floatingButton.whatsappButtonText')}</p>
                  </div>
                  <div className="d-flex option-button-icon align-items-center justify-content-center">
                    <Icon name="whatsapp" variant="brands" size='lg' />
                  </div>
                </div>
              </Button>
            </div>
            <div className={optionButtonClasses}>
              <Button onClick={handleBookingButton} variant='primary' className='option-button-wrapper booking-button p-0'>
                <div className="grid-row grid-col-auto-1fr justify-content-center gap-0">
                  <div className="d-flex option-button-label align-items-center justify-content-center h-100 ms-3">
                    <p className='m-0 fs-medium white-space-nowrap'>{t('floatingButton.bookingButtontext')}</p>
                  </div>
                  <div className="d-flex option-button-icon align-items-center justify-content-center">
                    <Icon name="calendar-check" variant="regular" />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}

        <SoundWrapper sound={mainButtonSound} trigger='click' volume="0.5">
          <Button
            className="floating-button-toggle rounded-all-full main-button"
            variant='info'
            onClick={handleMainButtonClick}
            ariaLabel="Abrir burbujas de opciones"
            tabIndex={0}
            size="large"
          >
            <SwitchTransition mode='out-in'>
              <CSSTransition
                key={mainButtonIconName}
                timeout={100}
                nodeRef={iconRef}
                classNames="fade"
              >
                <Icon ref={iconRef} name={mainButtonIconName} variant="solid" size="lg" />
              </CSSTransition>
            </SwitchTransition>
          </Button>
        </SoundWrapper>
      </div>
    </div>
  );
};

export default FloatingButton;
