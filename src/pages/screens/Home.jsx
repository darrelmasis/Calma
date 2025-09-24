import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { Icon } from '../../components/commons/Icons'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import Footer from '../../components/layout/Footer'
import { useLang } from '../../i18n/LanguageContext'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { Hero2 } from '../../components/commons/Hero-2'

const Home = () => {
  const { t } = useLang()
  usePageTitle(t('home.pageTitle'))

  const navigate = useNavigate()
  const goToServices = () => {
    navigate('/services')
  }

  return (
    <>
      <Header />
      <Hero2
        background="/images/webp/hero-bg-alt-1200.webp"
        overlayType="end-transparent"
        title={t('home.heroSection.title_1', { parse: true })}
        subtitle={t('home.heroSection.description')}
        cta={
          [
            {
              onClick: goToServices,
              variant: "primary",
              ariaLabel: t('home.heroSection.button_1'),
              label: t('home.heroSection.button_1'),
              size: "xlarge",
              icon: { name: "spa", size: "lg", variant: "duotones", duotone: "regular" }
            }
          ]
        }
        alignContent='start'
      />
      {/* <Hero /> */}
      <section id="why" className="py-5 bg-neutral-0 d-flex align-items-center border-top">
        <div className="container d-flex flex-direction-column align-items-center justify-content-center">

          <Fade className='mb-5'>
            <h2 className="text-primary mb-1 text-center">{t('home.section_2.title')}</h2>
          </Fade>

          {/* <div className="grid mt-lg-6 mt-4 text-center"> */}
          <div className="grid-row justify-content-space-between w-100">

            <div className="grid-col-12 grid-col-md-6 grid-col-lg-4 text-center my-lg-0 mb-3 py-3 py-lg-0">
              <div className="card d-flex flex-direction-column align-items-center">
                <Fade delay={0.4}>
                  <span className="border-primary card-icon p-3 rounded-all-full d-inline-flex align-items-center justify-content-center">
                    <Icon name="heart" variant='regular' size="lg" className="text-primary" />
                  </span>
                  <h3 className='card-title-hack fs-h4'>{t('home.section_2.points.p1.title')}</h3>
                  <p className="text-muted wx-lg-350">{t('home.section_2.points.p1.description')}</p>
                  <ResponsiveImage name="image-01" alt="Masaje terapéutico en la espalda con una piedra calentada de forma ergonómica" className="rounded wx-xl-350" />
                </Fade>
              </div>
            </div>

            <div className="grid-col-12 grid-col-md-6 grid-col-lg-4 text-center my-lg-0 mb-3 py-3 py-lg-0">
              <div className="card d-flex flex-direction-column align-items-center">
                <Fade delay={0.6}>
                  <span className="border-primary card-icon p-3 rounded-all-full d-inline-flex align-items-center justify-content-center">
                    <Icon name="shield" variant='regular' size="lg" className="text-primary" />
                  </span>
                  <h3 className='card-title-hack fs-h4'>{t('home.section_2.points.p2.title')}</h3>
                  <p className="text-muted wx-lg-350">{t('home.section_2.points.p2.description')}</p>
                  <ResponsiveImage name="image-02" alt="Aplicación de cera depilatoria en el área del labio superior con un palito de madera" className="rounded wx-xl-350" />
                </Fade>
              </div>
            </div>

            <div className="grid-col-12 grid-col-md-12 grid-col-lg-4 text-center my-lg-0 mb-3 py-3 py-lg-0">
              <div className="card d-flex flex-direction-column align-items-center">
                <Fade delay={0.8}>
                  <span className="border-primary card-icon p-3 rounded-all-full d-inline-flex align-items-center justify-content-center">
                    <Icon name="users" variant='regular' size="lg" className="text-primary" />
                  </span>
                  <h3 className='card-title-hack fs-h4'>{t('home.section_2.points.p3.title')}</h3>
                  <p className="text-muted wx-lg-350">{t('home.section_2.points.p3.description')}</p>
                  <ResponsiveImage name="image-03" alt="Aplicación de cera depilatoria en el área del labio superior con un palito de madera" className="rounded wx-xl-350" />
                </Fade>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>
      { /* Special Section */}
      <section id="how" className="bg-container d-flex align-items-center special-section">
        <div className="container text-center special-section-content">


          <Fade>
            <Icon name="spa" size="lg" variant="duotones" duotone='regular' className="text-secondary mb-3 fs-h1" />
          </Fade>
          <Fade delay={0.2}>
            <h2 className="mb-3 text-secondary">{t('home.section_3.title')}</h2>
          </Fade>
          <Fade delay={0.4}>
            <p className="mb-6 text-secondary">{t('home.section_3.description')}</p>
          </Fade>
          <Fade delay={0.6}>
            <Button
              as='link'
              to="/services"
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
