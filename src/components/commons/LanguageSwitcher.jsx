import { useLang } from '../../i18n/LanguageContext'
import { Select } from '../forms/Select'
import classNames from 'classnames'

const opciones = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
]

export const LanguageSwitcher = ({ className = '' }) => {
  const { lang, changeLanguage } = useLang()
  const classes = classNames('language-switcher', className)

  return (
    <Select
      label=''
      options={opciones}
      value={lang}
      onChange={changeLanguage}
      className={classes}
      placeholder='Elige un idioma'
    />
  )
}
