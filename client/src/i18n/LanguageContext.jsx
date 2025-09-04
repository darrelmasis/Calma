import { createContext, useContext, useState, useEffect } from 'react'
import { dictionary } from './dictionary'

const LanguageContext = createContext()

const getInitialLang = () => {
  if (typeof window === 'undefined') return 'es' // Seguridad SSR
  const stored = localStorage.getItem('lang')
  if (stored) return stored

  const browserLang = navigator.language.slice(0, 2)
  return ['es', 'en'].includes(browserLang) ? browserLang : 'es'
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(getInitialLang())

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const changeLanguage = (newLang) => setLang(newLang)

  const t = (key, options = {}) => {
    const keys = key.split('.')
    const result = keys.reduce((acc, curr) => acc?.[curr], dictionary[lang])
    if (result === undefined) return key
    if (options.returnObjects) return result
    if (typeof result === 'string') return result
    return JSON.stringify(result) // fallback si es objeto
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
