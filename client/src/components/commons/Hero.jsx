import React from 'react'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { FadeInWhenVisible as Fade } from './animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'

export const Hero = () => {
  const navigate = useNavigate()
  const goToServices = () => {
    navigate('/services')
  }
  const { t } = useLang()

  return (
    <section className="hero bg-container">
      <div className="container d-flex align-items-lg-center align-items-flex-start">
        <div className="hero__content">
          <Fade className='d-inline-flex flex-direction-column gap-1 d-md-block align-items-center align-items-md-flex-start text-center text-md-start'>
            <h1 className="hero__title mt-0">
              {t('home.heroSection.title_1')} <span className="text-primary">{t('home.heroSection.title_2')}</span> {t('home.heroSection.title_3')}
            </h1>
            <p className="hero__content--description fs-h5 fs-lg-lead text-muted">
              {
                t('home.heroSection.description')
              }
            </p>

            <Button
              onClick={goToServices}
              variant="primary"
              ariaLabel={t('home.heroSection.button_1')}
              label={t('home.heroSection.button_1')}
              size="large"
              icon={{ name: "spa", size: "lg", variant: "duotones", duotone: "regular" }} />

          </Fade>
        </div>
      </div>
    </section>
  )
}
