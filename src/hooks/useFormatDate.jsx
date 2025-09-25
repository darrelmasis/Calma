import { useLang } from '../i18n/LanguageContext'

export const useFormatDate = () => {
  const { lang } = useLang()

  const localeMap = {
    es: 'es-ES',
    en: 'en-US',
  }

  const formatDate = (date, format = 'short') => {
    if (!date) return ''

    let d
    // Si el valor es string en formato YYYY-MM-DD
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const [year, month, day] = date.split('-').map(Number)
      d = new Date(year, month - 1, day)
    } else {
      d = new Date(date)
    }

    const optionsMap = {
      short: { day: '2-digit', month: '2-digit', year: 'numeric' },
      medium: { day: 'numeric', month: 'short', year: 'numeric' },
      long: {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
      full: {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: lang === 'en', // Inglés usa AM/PM, español 24h
      },
    }

    const options = optionsMap[format] || optionsMap.short
    const locale = localeMap[lang] || 'es-ES'

    return new Intl.DateTimeFormat(locale, options).format(d)
  }

  return { formatDate }
}
