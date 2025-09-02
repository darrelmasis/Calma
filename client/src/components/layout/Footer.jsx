import { Button } from '../../components/ui/Button'
import { Icon } from '../commons/Icons'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { Tooltip} from '../../components/ui/Tooltip'
import {useLang} from '../../i18n/LanguageContext'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const { t } = useLang()
  const navigate = useNavigate()


  return (
    <footer className="pt-6 border-top">
      <div className="container">
        {/* Bloque CTA */}
        <div className="grid">
          <div className="grid-row justify-content-center text-center mb-6">
            <div className="grid-col-12">
              <Fade>
                <img src="/logo-calma.svg" alt="Logo Calma" className="mb-3" width="100px" />
              </Fade>
              <Fade>
                <h2 className="text-dark">{ t('footer.cta.title') }</h2>
              </Fade>
              <Fade>
                <p className="text-muted">{ t('footer.cta.description') }</p>
              </Fade>
              <Fade>
                <Button onClick={() => navigate('/booking')} label={ t('footer.cta.button')} variant="primary" size="large" icon="arrow-right" iconPosition="right" classes="mt-3" />
              </Fade>
            </div>
          </div>
        </div>

        {/* Footer con columnas */}
        <Fade>
          <div className="grid mt-8">
            <div className="grid-row d-md-flex flex-direction-column flex-direction-md-row justify-content-space-around align-items-start mb-3 px-3">
              <div className="grid-col-12 grid-col-md-3 text-md-start">
                <h4 className="text-dark">{ t('footer.columns.contact.title') }</h4>
                <ul className="list-unstyled text-muted">
                  <li className="mb-1">
                    <Icon name="mobile" className="me-2" />
                   { t('footer.columns.contact.phone') }
                  </li>
                  <li className="mb-1">
                    <Icon name="location-dot" className="me-2" />
                    <Tooltip content={ t('footer.columns.contact.addressTooltip') }>
                      <a target='_blank' href="https://maps.app.goo.gl/j9ZjqwatmQGa8aA4A">
                      { t('footer.columns.contact.address') }
                    <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                    </a>
                    </Tooltip>
                  </li>
                  <li>
                    <Icon name='envelope' className='me-2' />{ t('footer.columns.contact.email') }
                  </li>
                </ul>
              </div>

              <div className="grid-col-12 grid-col-md-3">
                <h4 className="text-dark">{ t('footer.columns.nav.title') }</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="/cita" className="text-muted">
                      { t('footer.columns.nav.book') }
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="text-muted">
                      { t('footer.columns.nav.services') }
                    </a>
                  </li>
                  <li>
                    <a href="/history" className="text-muted">
                      { t('footer.columns.nav.history') }
                    </a>
                  </li>
                  <li>
                    <a href="/packages" className="text-muted">
                      { t('footer.columns.nav.packages') }
                    </a>
                  </li>
                </ul>
              </div>

              <div className="grid-col-12 grid-col-md-3">
                <h4 className="text-dark">{ t('footer.columns.about.title') }</h4>
                <ul className="list-unstyled">
                  <li>
                    <a href="/history#about" className="text-muted">
                      { t('footer.columns.about.who') }
                    </a>
                  </li>
                  <li>
                    <a href="/equipo" className="text-muted">
                      { t('footer.columns.about.team') }
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-muted">
                      { t('footer.columns.about.blog') }
                    </a>
                  </li>
                </ul>
              </div>

              <div className="grid-col-12 grid-col-md-3">
                <h4 className="text-dark">{ t('footer.columns.social.title') }</h4>
                <ul className="list-unstyled">
                  <li>
                    <Tooltip content={ t('footer.columns.social.facebookTooltip') }>
                       <a href="https://www.facebook.com/p/calma_nailsalonnic-100064921292457/" target="_blank" className="text-muted d-flex align-items-center">
                      <Icon name="square-facebook" className="me-2" />
                      { t('footer.columns.social.facebook') }
                      <Icon name="arrow-up-right-from-square" className="ms-1" size="xs" />
                    </a>
                   </Tooltip>
                  </li>
                  <li>
                    <Tooltip content={ t('footer.columns.social.instagramTooltip') }>
                      <a href="https://www.instagram.com/calma_nailsalonnic/" target="_blank" className="text-muted d-flex align-items-center">
                      <Icon name="square-instagram" className="me-2" />
                      { t('footer.columns.social.instagram') }
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
            <div className="grid-col-12 text-center text-md-start grid-col-md-6">© {new Date().getFullYear()} { t('footer.legal.copyright') }</div>
            <div className="grid-col-12 grid-col-md-6 text-center text-md-end">
              <Tooltip content={ t('footer.legal.privacyTooltip') }>
                  <a href="/privacy" className="me-3 text-muted">
                   { t('footer.legal.privacy') }
                  </a>

              </Tooltip>
              <Tooltip content={ t('footer.legal.termsTooltip') }>
                  <a href="/terminos" className="text-muted">
                { t('footer.legal.terms') }
              </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
