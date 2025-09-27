import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useEffect } from 'react'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useLang } from '../../i18n/LanguageContext'
import { ConfettiExplosion } from '../../components/commons/Confetti'
import { useState } from 'react'

const Success = () => {
  const { t } = useLang()
  usePageTitle(t('booking.success.title'))
  const navigate = useNavigate()
  const location = useLocation()
  const { clearServices, isLoaded } = useSelectedServices()
  const [showExplosion, setShowExplosion] = useState(false)

  // Validar acceso
  useEffect(() => {
    setShowExplosion(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      clearServices('bell') // Limpiar servicios seleccionados al cargar la página de éxito
    }
  }, [])

  // Manejar botón regresar

  const goHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  useEffect(() => {
    // Disparar la explosión al montar el componente
    setShowExplosion(true)

    // Limpiar después de la duración (debe coincidir con `duration`)
    const timer = setTimeout(() => {
      setShowExplosion(false)
    }, 3000) // 3 segundos = duración de la explosión

    return () => clearTimeout(timer)
  }, []) // solo una vez al montar

  return (
    <div>
      {showExplosion && (
        <ConfettiExplosion
          origin={{ x: '50%', y: 160 }}
          onComplete={() => setShowExplosion(false)}
        />
      )}
      <Header />
      {location.state?.success && (
        <div className='d-flex flex-direction-column justify-content-center align-items-center text-center p-5'>
          <span className='fs-display-2 mb-3'>🎉</span>
          <h3 className='fs-h3 mb-2'>{t('booking.success.subtitle')}</h3>
          <p className='text-muted mb-4 max-wx-500'>
            {t('booking.success.message')}
          </p>

          {/* CTA principal */}
          <Button
            variant='success'
            className='my-3'
            size='large'
            icon='left-to-bracket'
            label={t('booking.success.buttonText')}
            onClick={goHome}
          />
        </div>
      )}
    </div>
  )
}

export default Success
