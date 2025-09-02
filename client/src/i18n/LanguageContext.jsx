import { createContext, useContext, useState, useEffect } from 'react'
import { dictionary } from './dictionary'

const LanguageContext = createContext()

const getInitialLang = () => {
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

  const t = (key) => {
    const keys = key.split('.')
    return keys.reduce((acc, curr) => acc?.[curr], dictionary[lang]) || key
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
