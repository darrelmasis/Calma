// src/components/bag/BagDropdown.jsx
import { memo } from 'react'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useLang } from '../../i18n/LanguageContext'
import { useDevice } from '../../hooks/useBreakpoint'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  useDropdown // ✅ Usamos el hook seguro
} from '../ui/Dropdown'
import { Button } from '../ui/Button'
import { USD } from '../../utils/utils'
import { Icon } from '../commons/Icons'
import { Tooltip } from '../ui/Tooltip'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { size } from '@floating-ui/react'

// ✅ Trigger separado (sin memo para que reaccione a `open`)
const BagTrigger = ({
  totalServices,
  isMobile,
  isTablet,
  isDesktop,
  label
}) => {
  const { open } = useDropdown() // ✅ Acceso seguro al estado

  const icons = [
    {
      name: 'bag-shopping',
      variant: open ? 'duotones' : 'regular',
      duotone: 'regular',
      position: 'left',
      className: open ? 'text-primary' : '',
      size: isMobile ? 'lg' : 'md'
    }
  ]

  if (isTablet || isDesktop) {
    icons.push({
      name: 'chevron-down',
      variant: 'regular',
      position: 'right',
      className: 'arrow-icon'
    })
  }

  return (
    <div className='navbar-dropdown-info position-relative d-flex justify-content-flex-end'>
      <Button
        variant='basic'
        className='position-relative rounded-pill-md navbar-dropdown-trigger'
        size={isMobile ? 'xlarge' : 'medium'}
        icon={icons}
        label={!isMobile && label}
        badge={totalServices > 0 ? totalServices : null}
      />
    </div>
  )
}

export const BagDropdown = memo(() => {
  const { t } = useLang()
  const navigate = useNavigate()
  const { type } = useDevice()
  const isMobile = type === 'mobile'
  const isTablet = type === 'tablet'
  const isDesktop = type === 'desktop'

  const {
    totalServices,
    servicesWithInfo,
    clearServices,
    removeService,
    totalPrice
  } = useSelectedServices()

  const dropdownContentClasses = classNames(
    'navbar-dropdown-wrapper rounded-all-md overflow-hidden',
    {
      'navbar-desktop-dropdown-content-wrapper': isDesktop,
      'navbar-tablet-dropdown-content-wrapper': isTablet,
      'navbar-mobile-dropdown-content-wrapper': isMobile
    }
  )

  const navigateToBooking = () => navigate('/booking')
  const label = t('header.dropdown.text') // ✅ Movido aquí

  return (
    <div className='d-flex flex-1 justify-content-flex-end'>
      <Dropdown position='bottom-end' offsetX={isMobile ? 16 : 0}>
        <DropdownTrigger className='w-100 w-md-auto'>
          {/* ✅ Pasamos todas las props necesarias */}
          <BagTrigger
            totalServices={totalServices}
            isMobile={isMobile}
            isTablet={isTablet}
            isDesktop={isDesktop}
            label={label}
          />
        </DropdownTrigger>
        <DropdownContent>
          <div className={dropdownContentClasses}>
            {totalServices === 0 ? (
              <div className='d-flex flex-direction-column align-items-center justify-content-center gap-1 p-3'>
                <Icon name='inbox' size='lg' className='text-muted' />
                <p className='fs-medium text-center text-muted m-0'>
                  {t('header.dropdown.empty')}
                </p>
                <Button
                  as='link'
                  to='/services'
                  variant='primary'
                  icon='compass'
                  ghost
                >
                  {t('header.dropdown.exploreServices')}
                </Button>
              </div>
            ) : (
              <>
                <div className='p-3'>
                  <div className='text-center border-bottom pb-3 d-flex align-items-center justify-content-space-between mt-0'>
                    <p className='fs-h5 fs-md-regular d-flex align-items-center gap-0-5 m-0 text-muted'>
                      <Icon name='list-check' />
                      {t('header.dropdown.title')}
                    </p>
                    <Tooltip
                      content={t('header.dropdown.clearTooltip')}
                      placement='bottom'
                    >
                      <Button
                        size='medium'
                        icon='broom-wide'
                        variant='basic'
                        onClick={clearServices}
                      />
                    </Tooltip>
                  </div>

                  <div className='navbar-dropdown-services-added scrollbar-thin'>
                    {Object.entries(servicesWithInfo).map(
                      ([categoryId, items]) => (
                        <div key={categoryId}>
                          <div className='mb-3 fs-h6'>
                            {t(
                              `services.section_1.category.${categoryId}.name`
                            )}
                          </div>
                          <ul className='navbar-dropdown-service-list mb-3 gap-0-5'>
                            {items.map((service) => (
                              <li
                                className='navbar-dropdown-service-item rounded-all-sm d-flex align-items-center fs-medium'
                                key={`${categoryId}-${service.subCategoryId}-${service.id}`}
                              >
                                <div className='me-2 d-flex flex-direction-column flex-1'>
                                  <span className='mb-1'>
                                    {service.subCategoryName}
                                  </span>
                                  <span className='fs-small text-muted'>
                                    {service.serviceName}
                                  </span>
                                </div>
                                <span className='me-2'>
                                  <USD
                                    className='fs-medium fw-regular'
                                    amount={service.servicePrice}
                                    currencySymbol='$'
                                  />
                                </span>
                                <Button
                                  icon='trash-can'
                                  size='small'
                                  ghost
                                  variant='danger'
                                  onClick={() =>
                                    removeService(
                                      categoryId,
                                      service.subCategoryId,
                                      service.id
                                    )
                                  }
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className='bg-light-100 px-3 pt-2 pb-3 d-flex flex-direction-column gap-1'>
                  <div className='total-price text-end my-2 fs-medium d-flex align-items-flex-start justify-content-space-between'>
                    <div className='fs-h5 d-flex flex-direction-column align-items-flex-start'>
                      <span className='fw-bold'>
                        {t('header.dropdown.total')}
                      </span>
                      <span className='text-muted fs-small'>
                        {`${totalServices} ${
                          totalServices === 1
                            ? t('header.dropdown.totalSubtitle')
                            : t('header.dropdown.totalSubtitle') + 's'
                        }`}
                      </span>
                    </div>
                    <USD
                      amount={totalPrice}
                      currencySymbol='$'
                      size='large'
                      prefix='~'
                    />
                  </div>

                  <div className='navbar-dropdown-actions d-flex justify-content-space-between gap-1'>
                    <Button
                      size='medium'
                      icon='calendar-check'
                      fullWidth
                      variant='info'
                      onClick={navigateToBooking}
                    >
                      {t('header.dropdown.book')}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  )
})
