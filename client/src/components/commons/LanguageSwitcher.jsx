import { useLang } from '../../i18n/LanguageContext'
import { Select } from '../forms/Select'
import classNames from 'classnames'

const opciones = [
  { value: 'es', label: '🇪🇸 Español' },
  { value: 'en', label: '🇺🇸 English' }
]

export const LanguageSwitcher = ({ className = '' }) => {
  const { lang, changeLanguage } = useLang()

  return (
    <Select
      label=""
      options={opciones}
      value={lang}
      onChange={changeLanguage}
      className={`language-switcher ${className}`}
      placeholder='Escoge un idioma'
    />
  )
}
