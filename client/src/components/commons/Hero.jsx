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
      <div className="container d-flex align-items-center justify-content-flex-start flex-column flex-md-row">
        <div className="hero__content">
          <Fade>
            <h1 className="hero__title mt-0">
              {t('home.heroSection.title_1')} <span className="text-primary">{t('home.heroSection.title_2')}</span> {t('home.heroSection.title_3')}
            </h1>
            <p className="text-muted fs-h5">
              {
                t('home.heroSection.description')
              }
            </p>
            <div className="grid">
              <div className="grid-row mt-6">
                <div className="grid-col-12 grid-col-md-5">
                  <Button
                    onClick={goToServices}
                    variant="primary"
                    ariaLabel={t('home.heroSection.button_1')}
                    label={t('home.heroSection.button_1')}
                    size="large"
                    icon={{ name: "spa", size: "lg", variant: "duotones", duotone: "regular" }} />
                </div>
              </div>

            </div>
          </Fade>
        </div>
      </div>
    </section>
  )
}
