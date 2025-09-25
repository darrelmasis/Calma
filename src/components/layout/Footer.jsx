import { Button } from '../../components/ui/Button'
import { Icon } from '../commons/Icons'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { Tooltip } from '../../components/ui/Tooltip'
import { useLang } from '../../i18n/LanguageContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatPhone } from '../../utils/utils'
import { LogoCalma } from '../ui/LogoCalma'
import FloatingButton from '../../components/commons/FloatingButton'
import OfflineIndicator from '../../components/layout/OfflineIndicator'


const Footer = () => {
  const phoneNumber = import.meta.env.VITE_CALMA_PHONE_NUMBER
  const email = import.meta.env.VITE_CALMA_EMAIL
  const { t } = useLang()
  const location = useLocation()
  const isBooking = location.pathname === "/booking";

  const calmaFacebook = import.meta.env.VITE_CALMA_FACEBOOK
  const calmaInstagram = import.meta.env.VITE_CALMA_INSTAGRAM

  return (
    <>
      <OfflineIndicator />
      <FloatingButton />
      <footer className="footer py-3">
        <div className="container">
          {/* Bloque CTA */}
          {
            !isBooking ? (
              <div className="grid">
                <div className="grid-row justify-content-center text-center mb-6">
                  <div className="grid-col-12">
                    <Fade>
                      <h2 className="text-dark fw-light">{t('footer.cta.title')}</h2>
                    </Fade>
                    <Fade delay={0.2}>
                      <p className="text-muted fw-light">{t('footer.cta.description')}</p>
                    </Fade>
                    <Fade delay={0.4}>
                      <Button
                        as='link'
                        to={'/booking'}
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
            ) : (
              <div className="grid">
                <div className="grid-row justify-content-center text-center mb-6">
                  <div className="grid-col-12">
                    <Fade>
                      <h2 className="text-dark fw-light">{t('footer.help.title')}</h2>
                      </Fade>
                    <Fade delay={0.2}>
                        <div className="mt-5">
                          <span className='me-2'>{t('footer.help.contact')}</span>
                          <span className='me-2 text-muted'>
                            {formatPhone(import.meta.env.VITE_CALMA_PHONE_NUMBER )}
                          </span>|
                          <span className='ms-2 text-muted'>
                            {import.meta.env.VITE_CALMA_EMAIL }
                          </span>
                          <p className='mb-0 text-muted'>{t('footer.help.subtitle')}</p>
                        </div>
                      </Fade>
                  </div>
                </div>
              </div>
            )
          }

          {/* Footer con columnas */}
          <div className="d-flex flex-direction-column flex-direction-lg-row align-items-start mb-3 px-3 mt-3 justify-content-space-between">

            <Fade>
              <div>
                <h3 className="text-dark fs-lead text-muted mb-5">{t('footer.columns.contact.title')}</h3>
                <ul className="fs-medium list-unstyled list-bordered text-muted d-flex flex-direction-column gap-1 align-items-flex-start">
                  <li className="w-100">
                    <Icon name="mobile" className="me-2" />
                    <a
                      target="_blank"
                      href={`https://wa.me/${phoneNumber}`}
                      className='w-100'
                    >
                      {formatPhone(phoneNumber)}
                      <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                    </a>
                  </li>
                  <li className="w-100 ">
                    <Icon name="location-dot" className="me-2" />
                    <Tooltip content={t('footer.columns.contact.addressTooltip')}>
                      <a target='_blank' href="https://maps.app.goo.gl/j9ZjqwatmQGa8aA4A" className=''>
                        {t('footer.columns.contact.address')}
                        <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                      </a>
                    </Tooltip>
                  </li>
                  <li className='w-100 '>
                    <Icon name='envelope' className='me-2' />
                    {email}
                  </li>
                </ul>
              </div>
            </Fade>

            <Fade>
              <div>
                <h3 className="text-dark fs-lead text-muted mb-5">{t('footer.columns.nav.title')}</h3>
                <ul className="fs-medium list-unstyled list-bordered text-muted d-flex flex-direction-column gap-1 align-items-flex-start">
                  <li className='w-100'>
                    <a href="/booking" className="text-muted">
                      {t('footer.columns.nav.book')}
                    </a>
                  </li>
                  <li className='w-100'>
                    <a href="/services" className="text-muted">
                      {t('footer.columns.nav.services')}
                    </a>
                  </li>
                  <li className='w-100'>
                    <a href="/story" className="text-muted">
                      {t('footer.columns.nav.history')}
                    </a>
                  </li>
                  <li className='w-100'>
                    <a href="/packages" className="text-muted">
                      {t('footer.columns.nav.packages')}
                    </a>
                  </li>
                </ul>
              </div>
            </Fade>

            <Fade>
              <div>
                <h3 className="text-dark fs-lead text-muted mb-5">{t('footer.columns.about.title')}</h3>
                <ul className="list-unstyled fs-medium list-bordered text-muted d-flex flex-direction-column gap-1 align-items-flex-start">
                  <li className='w-100'>
                    <a href="/story#about" className="text-muted">
                      {t('footer.columns.about.who')}
                    </a>
                  </li>
                  <li className='w-100'>
                    <a href="/team" className="text-muted">
                      {t('footer.columns.about.team')}
                    </a>
                  </li>
                </ul>
              </div>
            </Fade>

            <Fade>
              <div>
                <h3 className="text-dark fs-lead text-muted mb-5">{t('footer.columns.social.title')}</h3>
                <ul className="list-unstyled fs-medium list-bordered text-muted d-flex flex-direction-column gap-1 align-items-flex-start">
                  <li className='w-100'>
                    <Tooltip content={t('footer.columns.social.facebookTooltip')}>
                      <a href={calmaFacebook} target="_blank" className="text-muted d-flex align-items-center">
                        <Icon name="square-facebook" variant='brands' className="me-2" />
                        {t('footer.columns.social.facebook')}
                        <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                      </a>
                    </Tooltip>
                  </li>
                  <li className='w-100'>
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
            </Fade>

          </div>

          {/* Legal */}
          <div className="border-top py-5 d-flex flex-direction-column flex-direction-lg-row text-center text-lg-start gap-lg-2 align-items-center">
            <Fade>
              <LogoCalma alt="Logo de Calma" className="wx-80 my-3 calma-logo-footer" />
            </Fade>
            <Fade>
              <div className="mb-lg-2">
                <p className="fs-medium fw-semibold mb-0">{t('footer.legal.copyright')}</p>
                <p className="fs-medium text-muted mb-0 mt-1">{t('footer.legal.subtitle')}</p>
              </div>
            </Fade>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
