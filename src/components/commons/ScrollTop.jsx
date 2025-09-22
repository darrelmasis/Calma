import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ triggerRef }) => {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Se ejecuta al cambiar de ruta
  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  // Si recibimos una referencia a un botón, le inyectamos el evento
  useEffect(() => {
    if (!triggerRef?.current) return;
    const btn = triggerRef.current;
    btn.addEventListener('click', scrollToTop);

    return () => btn.removeEventListener('click', scrollToTop);
  }, [triggerRef]);

  return null;
};

export default ScrollToTop;
