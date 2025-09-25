import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

const usePageTitle = (pageTitle) => {
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

const USD = ({
  amount,
  currencySymbol = '$',
  size = 'regular',
  className,
  prefix,
}) => {
  const [isValidNumber, setIsValidNumber] = useState(true)

  useEffect(() => {
    setIsValidNumber(!isNaN(amount))
  }, [amount])

  const num = isValidNumber ? Number(amount) : 0
  const fixed = num.toFixed(2)
  const [entero, decimal] = fixed.split('.')

  // Map de tamaños a clases de fuente
  const sizeClasses = {
    xsmall: 'fs-xsmall',
    small: 'fs-small',
    regular: 'fs-regular',
    large: 'fs-h5 fw-bold',
  }

  const containerClasses = classNames(
    'd-inline-flex align-items-baseline',
    sizeClasses[size],
    className
  )

  return (
    <span className={containerClasses}>
      {!isValidNumber ? (
        '-'
      ) : (
        <>
          {prefix && <span className='me-1'>{prefix}</span>}
          <span>{currencySymbol}</span>
          <span>{entero}</span>
          <span>.{decimal}</span>
        </>
      )}
    </span>
  )
}

const formatDate = (date, format = 'short', locale = 'es-ES') => {
  if (!date) return ''

  let d
  // Si el valor es string en formato YYYY-MM-DD (del input date)
  if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split('-').map(Number)
    d = new Date(year, month - 1, day) // LOCAL (sin desfase)
  } else {
    d = new Date(date) // fallback por si recibes un Date real o un ISO completo con hora
  }

  const optionsMap = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    medium: { day: 'numeric', month: 'short', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    full: {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
  }

  const options = optionsMap[format] || optionsMap.short

  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Convierte hora "HH:mm" a formato 12h con AM/PM
 * @param {string} timeStr - Hora en formato 24h, ej: "23:51"
 * @returns {string} - Hora en formato 12h, ej: "11:51 PM"
 */
const formatTime = (timeStr) => {
  if (!timeStr) return ''

  const [hourStr, minuteStr] = timeStr.split(':')
  let hours = parseInt(hourStr, 10)
  const minutes = parseInt(minuteStr, 10)

  if (isNaN(hours) || isNaN(minutes)) return ''

  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12

  return `${hours}:${String(minutes).padStart(2, '0')} ${ampm}`
}

export { usePageTitle, formatPhone, USD, formatDate, formatTime }
