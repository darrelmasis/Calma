import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Button } from '../ui/Button'
import classNames from 'classnames'
import { Dropdown, DropdownContent, DropdownTrigger } from '../ui/Dropdown'

export const LanguageSwitcher = ({ className = '' }) => {
  const options = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ]
  const { lang, changeLanguage } = useLang()

  const selectedOption = options.find((opt) => opt.value === lang)

  const classes = classNames(
    'language-switcher d-flex w-100 justify-content-center',
    className
  )

  return (
    <div className={classes}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            label={selectedOption.label}
            icon={[
              {
                name: 'language-alt',
                position: 'left',
                variant: 'duotones',
                duotone: 'regular',
                className: 'me-1'
              },
              {
                name: 'chevron-down',
                position: 'right',
                variant: 'regular',
                className: 'ms-1'
              }
            ]}
            variant='basic'
            className='language-switcher-trigger bg-transparent border-0'
          />
        </DropdownTrigger>
        <DropdownContent>
          <div className='d-flex'>
            <ul className='list-unstyled m-0 p-3 d-flex'>
              {options.map((opt) => {
                const flagIconName = opt.value === 'es' ? 'nicaragua' : 'eeuu'
                const isActive = opt.value === lang

                // Definimos los íconos dinámicamente
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
                        {
                          active: isActive
                        }
                      )}
                      onClick={() => changeLanguage(opt.value)}
                      variant='basic'
                      icon={icons}
                      ghost={true}
                      fullWidth={true}
                      label={opt.label}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
