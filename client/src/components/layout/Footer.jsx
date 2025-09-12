import { Button } from '../../components/ui/Button'
import { Icon } from '../commons/Icons'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { Tooltip } from '../../components/ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { formatPhone } from '../../utils/utils'
import { LogoCalma } from '../ui/LogoCalma'
import FloatingButton from '../../components/commons/FloatingButton'
import OfflineIndicator from '../../components/layout/OfflineIndicator'


const Footer = () => {
  const phoneNumber = import.meta.env.VITE_CALMA_PHONE_NUMBER
  const email = import.meta.env.VITE_CALMA_EMAIL
  const { t } = useLang()
  const navigate = useNavigate()

  const calmaFacebook = import.meta.env.VITE_CALMA_FACEBOOK
  const calmaInstagram = import.meta.env.VITE_CALMA_INSTAGRAM

  return (
    <>
      <OfflineIndicator />
      <FloatingButton />
      <footer className="mt-5">
        <div className="container border-top pt-6 ">
          {/* Bloque CTA */}
          <div className="grid">
            <div className="grid-row justify-content-center text-center mb-6">
              <div className="grid-col-12">
                <Fade>
                  <LogoCalma className="mb-3" alt="Logo de Calma" width="68px" />
                </Fade>
                <Fade>
                  <h2 className="text-dark">{t('footer.cta.title')}</h2>
                </Fade>
                <Fade>
                  <p className="text-muted">{t('footer.cta.description')}</p>
                </Fade>
                <Fade>
                  <Button
                    onClick={() => navigate('/booking')}
                    label={t('footer.cta.button')}
                    variant="primary"
                    ghost={true}
                    size="large"
                    icon={
                      {
                        name: "arrow-right",
                        position: "right",
                        variant: "regular",
                      }
                    }
                    className="mt-3" />
                </Fade>
              </div>
            </div>
          </div>

          {/* Footer con columnas */}
          <Fade>
            <div className="grid mt-8">
              <div className="grid-row d-md-flex flex-direction-column flex-direction-md-row justify-content-space-between align-items-start mb-3 px-3">
                <div className="grid-col-12 grid-col-md-3 text-md-start">
                  <h4 className="text-dark">{t('footer.columns.contact.title')}</h4>
                  <ul className="list-unstyled text-muted">
                    <li className="mb-1">
                      <Icon name="mobile" className="me-2" />
                      <a
                        target="_blank"
                        href={`https://wa.me/${phoneNumber}`}
                      >
                        {formatPhone(phoneNumber)}
                        <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                      </a>
                    </li>
                    <li className="mb-1">
                      <Icon name="location-dot" className="me-2" />
                      <Tooltip content={t('footer.columns.contact.addressTooltip')}>
                        <a target='_blank' href="https://maps.app.goo.gl/j9ZjqwatmQGa8aA4A">
                          {t('footer.columns.contact.address')}
                          <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                        </a>
                      </Tooltip>
                    </li>
                    <li>
                      <Icon name='envelope' className='me-2' />{email}
                    </li>
                  </ul>
                </div>

                <div className="grid-col-12 grid-col-md-3">
                  <h4 className="text-dark">{t('footer.columns.nav.title')}</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/cita" className="text-muted">
                        {t('footer.columns.nav.book')}
                      </a>
                    </li>
                    <li>
                      <a href="/services" className="text-muted">
                        {t('footer.columns.nav.services')}
                      </a>
                    </li>
                    <li>
                      <a href="/history" className="text-muted">
                        {t('footer.columns.nav.history')}
                      </a>
                    </li>
                    <li>
                      <a href="/packages" className="text-muted">
                        {t('footer.columns.nav.packages')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="grid-col-12 grid-col-md-3">
                  <h4 className="text-dark">{t('footer.columns.about.title')}</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="/history#about" className="text-muted">
                        {t('footer.columns.about.who')}
                      </a>
                    </li>
                    <li>
                      <a href="/equipo" className="text-muted">
                        {t('footer.columns.about.team')}
                      </a>
                    </li>
                    <li>
                      <a href="/blog" className="text-muted">
                        {t('footer.columns.about.blog')}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="grid-col-12 grid-col-md-3">
                  <h4 className="text-dark">{t('footer.columns.social.title')}</h4>
                  <ul className="list-unstyled">
                    <li>
                      <Tooltip content={t('footer.columns.social.facebookTooltip')}>
                        <a href={calmaFacebook} target="_blank" className="text-muted d-flex align-items-center">
                          <Icon name="square-facebook" variant='brands' className="me-2" />
                          {t('footer.columns.social.facebook')}
                          <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                        </a>
                      </Tooltip>
                    </li>
                    <li>
                      <Tooltip content={t('footer.columns.social.instagramTooltip')}>
                        <a href={calmaInstagram} target="_blank" className="text-muted d-flex align-items-center">
                          <Icon name="square-instagram" variant='brands' className="me-2" />
                          {t('footer.columns.social.instagram')}
                          <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                        </a>
                      </Tooltip>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fade>

          {/* Legal */}
          <div className="grid border-top py-6">
            <div className="grid-row justify-content-center align-items-center text-muted">
              <div className="grid-col-12 text-center text-md-start grid-col-md-6">© {new Date().getFullYear()} {t('footer.legal.copyright')}</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
