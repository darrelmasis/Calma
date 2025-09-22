import { createContext, useContext, useState, useEffect } from 'react'
import { dictionary } from './dictionary'
import parse from 'html-react-parser'

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
    const { parse: shouldParse = false, returnObjects = false } = options
    const keys = key.split('.')
    const result = keys.reduce((acc, curr) => acc?.[curr], dictionary[lang])

    if (result === undefined) return key
    if (returnObjects) return result

    // Si es string y options.parse es true, parseamos HTML
    if (typeof result === 'string') {
      return shouldParse ? parse(result) : result
    }

    // Si es un elemento React, lo retornamos directamente
    if (typeof result === 'object' && result.$$typeof) {
      return result
    }

    // Fallback para otros tipos de objeto
    return JSON.stringify(result)
  }



  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
