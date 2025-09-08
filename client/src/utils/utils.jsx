import { useState, useEffect } from 'react'

const usePageTitle = pageTitle => {
  const appName = import.meta.env.VITE_APP_NAME || 'Calma' // Valor por defecto si no está definido

  useEffect(() => {
    const fullTitle = pageTitle ? `${pageTitle} | ${appName}` : appName
    document.title = fullTitle

    return () => {
      document.title = appName // Restablece el título al desmontar el componente
    }
  }, [pageTitle, appName])
}

// formatea un número de teléfono a formato internacional +CCC XXXX XXXX
const formatPhone = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  const match = cleaned.match(/^(\+\d{3})(\d{4})(\d{4})$/);
  if (!match) return phone;
  return `${match[1]} ${match[2]} ${match[3]}`;
};

const USD = ({ amount, currencySymbol }) => {

  const [isvalidNumber, setIsvalidNumber] = useState(false);

  useEffect(() => {
    if (isNaN(amount)) {
      setIsvalidNumber(true);
    } else {
      setIsvalidNumber(false);
    }
  }, [amount]);

  // Aseguramos que sea número
  const num = !isvalidNumber ? Number(amount) : 0;
  // Siempre forzamos dos decimales
  const fixed = num.toFixed(2);

  // Dividimos en entero y decimal
  const [entero, decimal] = fixed.split('.');

  // console.log({ amount, num, fixed, entero, decimal }); // Depuración

  return (
    <span>
      {
        isvalidNumber
          ? '-'
          : <>
            <span className='me-1'>{currencySymbol}</span>
            {entero}
            <sup className='small text-dark'>.{decimal}</sup>
          </>
      }
    </span>
  );
}




export { usePageTitle, formatPhone, USD };
