import classNames from 'classnames'
import { useState, useEffect } from 'react'

const usePageTitle = pageTitle => {
  const appName = import.meta.env.VITE_APP_NAME || 'Calma'

  useEffect(() => {
    const fullTitle = pageTitle ? `${pageTitle} | ${appName}` : appName
    document.title = fullTitle

    return () => {
      document.title = appName
    }
  }, [pageTitle, appName])
}

const formatPhone = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, '')
  const match = cleaned.match(/^(\+\d{3})(\d{4})(\d{4})$/)
  if (!match) return phone
  return `${match[1]} ${match[2]} ${match[3]}`
}

const USD = ({ amount, currencySymbol = '$', size = 'regular', className, prefix }) => {
  const [isValidNumber, setIsValidNumber] = useState(true)

  useEffect(() => {
    setIsValidNumber(!isNaN(amount))
  }, [amount])

  const num = isValidNumber ? Number(amount) : 0
  const fixed = num.toFixed(2)
  const [entero, decimal] = fixed.split('.')

  // Map de tamaños a clases de fuente
  const sizeClasses = {
    'xsmall': 'fs-xsmall',
    'small': 'fs-small',
    'regular': 'fs-regular',
    'large': 'fs-h5 fw-bold',
  }

  const containerClasses = classNames('d-inline-flex align-items-baseline', sizeClasses[size], className)

  return (
    <span className={containerClasses}>
      {!isValidNumber
        ? '-'
        : <>
          {prefix && <span className='me-1'>{prefix}</span>}
          <span>{currencySymbol}</span>
          <span>{entero}</span>
          <span>.{decimal}</span>
        </>
      }
    </span>
  )
}


export { usePageTitle, formatPhone, USD }
