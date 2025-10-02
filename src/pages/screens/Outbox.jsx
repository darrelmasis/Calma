import { usePageTitle } from '@utils/utils'
import { useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useEffect } from 'react'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { useLang } from '../../i18n/LanguageContext'
import { useState } from 'react'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useSound } from '../../components/commons/SoundManager'
import { Icon } from '../../components/commons/Icons'
import { limitedToast as toast } from '../../utils/toast'
import { SEO } from '../../components/SEO/SEO'

const Outbox = () => {
  const { t } = useLang()
  const outbox = t('senders.outbox.title', { returnObjects: true })
  const location = useLocation()
  const { clearServices, isLoaded } = useSelectedServices()
  const playSuccessSound = useSound('operationComplete')
  const isAllowed = location.state?.waiting
  const fromForm = location.state?.from

  useEffect(() => {
    if (isLoaded) {
      if (isAllowed && fromForm === 'booking') {
        // playSuccessSound.play()
        clearServices()
      } else if (isAllowed && fromForm === 'contact') {
        // playSuccessSound.play()
        toast.success(t('senders.outbox.toastMessage'), { duration: 5000 })
      } else {
        // redirigir si no es permitido
        window.location.href = '/'
      }
    }
  }, [isAllowed, isLoaded])

  return (
    <>
      <SEO title={outbox.pageTitle} description={outbox.metaDescription} noIndex />
      <div className=''>
      <Fade className='d-flex flex-direction-column  align-items-center text-center py-5'>
        <span className='fs-display-2 mb-3'>
          <Icon name='wifi-exclamation' variant='duotones' duotone='solid' className='text-warning-600' />
        </span>
        <h3 className='fs-h3 mb-2'>
          <Icon name='inbox-out' className='me-3' />
          <span>{t('senders.outbox.screenTitle')}</span>
        </h3>
        <p className='text-muted mb-4 max-wx-500'>{t('senders.outbox.screenMessage')}</p>

        {/* CTA principal */}
        <Button
          as='link'
          to='/'
          variant='info'
          className='my-3'
          size='large'
          icon='left-to-bracket'
          label={t('booking.success.buttonText')}
        />
      </Fade>
      <div className='d-flex justify-content-center mt-4'>
        <div className='w-100 d-block border-bottom max-wx-1000'></div>
      </div>
    </div>
    </>
  )
}

export default Outbox
