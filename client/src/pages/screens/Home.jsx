import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { Icon } from '../../components/commons/Icons'
import { Hero } from '../../components/commons/Hero'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import Footer from '../../components/layout/Footer'
import { useLang } from '../../i18n/LanguageContext'
import FloatingButton from '../../components/commons/FloatingButton'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import OfflineIndicator from '../../components/layout/OfflineIndicator'


const Home = () => {
  const { t } = useLang()
  usePageTitle(t('home.pageTitle'))

  const navigate = useNavigate()
  const goToServices = () => {
    navigate('/services')
  }

  return (
    <>
      <OfflineIndicator />
      <FloatingButton />
      <Header />
      <Hero />
      <section id="why" className="py-5 bg-body d-flex align-items-center">
        <div className="container d-flex flex-direction-column align-items-center justify-content-center">
          <Fade>
            <h2 className="text-primary mb-1 text-center">{t('home.section_2.title')}</h2>
          </Fade>
          <Fade>
            <p className="fs-lead text-muted mt-1 text-center">{t('home.section_2.description')}</p>
          </Fade>
          <div className="grid mt-lg-6 mt-4 text-center">
            <div className="grid-row">

              <div className="grid-col-12 grid-col-lg-4 my-lg-0 mb-3 py-3 py-lg-0">
                <div className="card">
                  <Fade>
                    <span className="card-icon p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                      <Icon name="heart" className="text-primary" />
                    </span>
                  </Fade>
                  <Fade>
                    <h4>{t('home.section_2.points.p1.title')}</h4>
                  </Fade>
                  <Fade>
                    <p className="text-muted">{t('home.section_2.points.p1.description')}</p>
                  </Fade>
                  <Fade>
                    <ResponsiveImage name="image-01" alt="Masaje terapéutico en la espalda con una piedra calentada de forma ergonómica" className="rounded" />
                  </Fade>
                </div>
              </div>

              <div className="grid-col-12 grid-col-lg-4 my-lg-0 mb-3 py-3 py-lg-0">
                <div className="card">
                  <Fade>
                    <span className="card-icon p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                      <Icon name="shield" className="text-primary" />
                    </span>
                  </Fade>
                  <Fade>
                    <h4>{t('home.section_2.points.p2.title')}</h4>
                  </Fade>
                  <Fade>
                    <p className="text-muted">{t('home.section_2.points.p2.description')}</p>
                  </Fade>
                  <Fade>
                    <ResponsiveImage name="image-02" alt="Aplicación de cera depilatoria en el área del labio superior con un palito de madera" className="rounded" />
                  </Fade>
                </div>
              </div>

              <div className="grid-col-12 grid-col-lg-4 my-lg-0 mb-3 py-3 py-lg-0">
                <div className="card">
                  <Fade>
                    <span className="card-icon p-3 rounded-circle d-inline-flex align-items-center justify-content-center">
                      <Icon name="gem" className="text-primary" />
                    </span>
                  </Fade>
                  <Fade>
                    <h4>{t('home.section_2.points.p3.title')}</h4>
                  </Fade>
                  <Fade>
                    <p className="text-muted">{t('home.section_2.points.p3.description')}</p>
                  </Fade>
                  <Fade>
                    <ResponsiveImage name="image-03" alt="Aplicación de cera depilatoria en el área del labio superior con un palito de madera" className="rounded" />
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      { /* Special Section */}
      <section id="how" className="py-5 bg-container d-flex align-items-center ">
        <div className="container text-center">


          <Fade>
            <div className="fs-6">
              <Icon name="spa" className="text-secondary mb-3" size="large" />
            </div>
          </Fade>
          <Fade>
            <h2 className="fs-4 mb-3 text-secondary">{t('home.section_3.title')}</h2>
          </Fade>
          <Fade>
            <p className="fs-1 mb-6 text-muted">{t('home.section_3.description')}</p>
          </Fade>
          <Fade>
            <Button
              onClick={goToServices}
              variant="secondary"
              label={t('home.section_3.button')}
              size="large"
              icon={
                {
                  name: "spa",
                }
              }
            />
          </Fade>

        </div>
      </section>
      <Footer />
    </>
  )
}
export default Home
