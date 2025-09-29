import { usePageTitle } from '@utils/utils'
import { useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useEffect } from 'react'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useLang } from '../../i18n/LanguageContext'
import { ConfettiExplosion } from '../../components/commons/Confetti'
import { useState } from 'react'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useSound } from '../../components/commons/SoundManager'

const Success = () => {
  const { t } = useLang()
  usePageTitle(t('booking.success.title'))
  const location = useLocation()
  const { clearServices, isLoaded } = useSelectedServices()
  const [showExplosion, setShowExplosion] = useState(false)
  const playSuccessSound = useSound('bell', 0.5)

  useEffect(() => {
    if (isLoaded) {
      setShowExplosion(true)
      clearServices() // Limpiar servicios seleccionados al cargar la página de éxito
      playSuccessSound.play()
    }
  }, [])

  return (
    <div>
      {showExplosion && (
        <ConfettiExplosion
          origin={{ x: '50%', y: 160 }}
          onComplete={() => setShowExplosion(false)}
        />
      )}
      {location.state?.success && (
        <>
          <Fade className='d-flex flex-direction-column  align-items-center text-center py-5'>
            <span className='fs-display-2 mb-3'>🎉</span>
            <h3 className='fs-h3 mb-2'>{t('booking.success.subtitle')}</h3>
            <p className='text-muted mb-4 max-wx-500'>
              {t('booking.success.message')}
            </p>

            {/* CTA principal */}
            <Button
              as='link'
              to='/'
              variant='success'
              className='my-3'
              size='large'
              icon='left-to-bracket'
              label={t('booking.success.buttonText')}
            />
          </Fade>
          <div className='d-flex justify-content-center mt-4'>
            <div className='w-100 d-block border-bottom max-wx-1000'></div>
          </div>
        </>
      )}
    </div>
  )
}

export default Success
