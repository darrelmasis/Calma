// src/components/LanguageSwitcher.jsx

import { useLang } from '../../i18n/LanguageContext'
import { Button } from '../ui/Button'
import classNames from 'classnames'
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  useDropdown
} from '../ui/Dropdown'
import { useDevice } from '../../hooks/useBreakpoint'
import { limitedToast as toast } from '../../utils/toast'

// ✅ Componente TRIGGER definido fuera
const LanguageTrigger = ({ selectedLabel, isDesktop }) => {
  const { open } = useDropdown()

  return (
    <Button
      label={selectedLabel}
      size={!isDesktop ? 'xlarge' : 'medium'}
      fullWidth={true}
      icon={[
        {
          name: 'language-alt',
          position: 'left',
          variant: open ? 'duotones' : 'regular', // ✅ Ahora sí se actualiza
          duotone: 'regular',
          className: open ? 'text-primary me-1' : 'me-1'
        },
        {
          name: 'chevron-down',
          position: 'right',
          variant: 'regular',
          className: 'arrow-icon ms-1'
        }
      ]}
      variant='basic2'
      className='language-switcher-trigger bg-transparent w-100 border-0'
    />
  )
}

export const LanguageSwitcher = ({ className = '' }) => {
  const options = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ]
  const { lang, changeLanguage } = useLang()
  const { type } = useDevice()
  const isMobile = type === 'mobile'
  const isTablet = type === 'tablet'
  const isDesktop = type === 'desktop'

  const selectedOption = options.find((opt) => opt.value === lang)
  const classes = classNames('language-switcher d-flex w-100', className)

  const handleChangeLanguage = (newLang) => {
    if (newLang === lang) {
      toast.info(
        newLang === 'es'
          ? 'Ya estás en este idioma'
          : 'You are already in this language'
      )
      return
    }
    changeLanguage(newLang)
    toast.success(
      newLang === 'es'
        ? 'Idioma cambiado a Español'
        : 'Language changed to English'
    )
  }

  return (
    <div className={classes}>
      <Dropdown
        position={isMobile ? 'bottom-start' : 'bottom-start'}
        offsetX={0}
      >
        <DropdownTrigger className='w-100 w-lg-auto'>
          {/* ✅ Pasamos props necesarias */}
          <LanguageTrigger
            selectedLabel={selectedOption.label}
            isDesktop={isDesktop}
          />
        </DropdownTrigger>
        <DropdownContent
          className={
            isMobile ? 'fit-to-navbar' : isTablet ? 'fit-to-tablet-panel' : ''
          }
        >
          <ul className='list-unstyled m-0 p-3 d-flex flex-column'>
            {options.map((opt) => {
              const flagIconName = opt.value === 'es' ? 'nicaragua' : 'eeuu'
              const isActive = opt.value === lang

              const icons = [
                {
                  name: flagIconName,
                  variant: 'flags',
                  position: 'left'
                }
              ]

              if (isActive) {
                icons.push({
                  name: 'check',
                  position: 'right',
                  className: 'text-success'
                })
              }

              return (
                <li key={opt.value} className='mb-0'>
                  <Button
                    className={classNames(
                      'language-switcher-option border-0 justify-content-flex-start',
                      { active: isActive }
                    )}
                    onClick={() => handleChangeLanguage(opt.value)}
                    variant='basic'
                    icon={icons}
                    size={isMobile ? 'xlarge' : 'medium'}
                    ghost={true}
                    fullWidth={true}
                    label={opt.label}
                  />
                </li>
              )
            })}
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
