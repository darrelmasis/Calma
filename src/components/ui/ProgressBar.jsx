// components/SimpleProgressBar.jsx
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useLang } from '../../i18n/LanguageContext'

const SimpleProgressBar = () => {
  const { totalServices, BAG_LIMIT } = useSelectedServices()
  const percentage = Math.min((totalServices / BAG_LIMIT) * 100, 100)
  const { t } = useLang()
  // Lógica mejorada para colores y estados
  const getColorClass = () => {
    if (percentage === 100) return 'bg-warning-400'
    return 'bg-success-400'
  }

  const isBagFull = percentage === 100
  const remainingServices = BAG_LIMIT - totalServices

  return (
    <div className='simple-progress mt-1 pb-3 border-bottom position-relative'>
      {/* Barra de progreso */}
      <div className='simple-progress-bar bg-light-100 position-relative'>
        <div
          className={`simple-progress-fill ${getColorClass()} transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Mensaje cuando está llena - Mejor posicionamiento */}
      {isBagFull && (
        <div className='text-center mt-2'>
          <span className='badge bg-white text-dark fs-small fw-semibold'>
            {t('header.dropdown.fullBag')}
          </span>
        </div>
      )}

      {/* Mensaje de servicios restantes */}
      {!isBagFull && totalServices > 0 && (
        <div className='text-center mt-1'>
          <small className='text-muted'>
            {totalServices === 1
              ? `${totalServices} ${t('header.dropdown.addedService')}`
              : `${totalServices} ${t('header.dropdown.addedServices')}`}
          </small>
        </div>
      )}
    </div>
  )
}

export default SimpleProgressBar
