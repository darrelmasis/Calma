import { useState, useRef, useEffect } from 'react';
import whatsappLogo from '/whatsapp_logo.svg';
import { Button } from '../ui/Button';


const FloatingButton = () => {
  // Configuración local
  const phoneNumber = '83275144';
  const defaultMessage = '¡Hola Equipo de Calma! Me gustaría más información.';
  const countryCode = '505';

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const popupRef = useRef(null);

  const formatPhoneNumber = (num) => {
    let cleanNum = num.replace(/\D/g, '');
    if (!cleanNum.startsWith(countryCode)) {
      cleanNum = countryCode + cleanNum;
    }
    return cleanNum;
  };
  const whatsappLink = `https://wa.me/${formatPhoneNumber(phoneNumber)}?text=${encodeURIComponent(message)}`;

  // Cerrar el popup si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleSend = () => {
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
    setIsPopupOpen(false);
  };

  return (
    <div className="floating-button-container">

      <Button classes={"floating-button"} onClick={togglePopup} aria-label="Abrir chat de WhatsApp" tabIndex={0} variant="link" size="large">
        <img src={whatsappLogo} alt="WhatsApp" className="floating-button__icon" />
      </Button>

      {isPopupOpen && (
        <div className="floating-button__popup animated" ref={popupRef}>
          <span className="floating-button__title">¿En qué podemos ayudarte?</span>
          <textarea
            className="floating-button__textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            autoFocus
          />
          <button className="floating-button__send" onClick={handleSend}>
            <img src={whatsappLogo} alt="WhatsApp" style={{ width: 20, marginRight: 6, verticalAlign: 'middle' }} />
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
