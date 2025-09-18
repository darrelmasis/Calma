import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { Icon } from '../../components/commons/Icons'

const History = () => {
  const { t } = useLang()
  usePageTitle(t('history.pageTitle'))
  return (
    <div>
      <Header />

      <section className="py-4 bg-neutral-0">
        <div className="container">
          <div className="grid">
            <div className="grid-row mb-6">
              <div className="grid-col-12 grid-col-md-6">
                <Fade className='border-bottom-primary border-3'>
                  <h1>{t('history.section_1.title')}</h1>
                </Fade>
              </div>
            </div>
            <div className="grid-row gap-lg-4">
              <div className="grid-col-12 grid-col-md-6 text-justify">
                <Fade delay={0.2}>
                  <p className='mt-0'>
                    {t('history.section_1.history_p1')}
                  </p>
                </Fade>
                <Fade delay={0.4}>
                  <p>{t('history.section_1.history_p2')}</p>
                </Fade>
                <Fade >
                  <p>{t('history.section_1.history_p3')}</p>
                </Fade>
                <Fade>
                  <p>{t('history.section_1.end_tag')}</p>
                </Fade>
                <Fade>
                  <span className="text-primary fs-lead">{t('history.section_1.owners')}</span>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end">
                <Fade delay={0} className='position-sticky top-1'>
                  <ResponsiveImage name="history-right" alt="Imagen de la historia" className="rounded" />
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='bg-primary-50 py-6' id='about'>
        <div className="container">
          <div className="grid-row mb-6">
            <div className="grid-col-12">
              <Fade className='text-center '>
                <h2 className="fs-4 text-primary text-center">{t('history.section_2.title', { parse: true })}</h2>
              </Fade>
            </div>
          </div>
          <div className="grid">
            <div className="grid-row mb-6 gap-lg-4 align-items-center">
              <div className="grid-col-12 grid-col-md-6">
                <Fade className='d-flex align-items-center justify-content-start gap-2 mb-3'>
                  <Icon name="lightbulb-on" variant='duotones' duotone='solid' size="lg" className="text-primary" />
                  <h3 className="fs-2 text-primary m-0">{t('history.section_2.visionTitle')}</h3>
                </Fade>
                <Fade>
                  <p className="text-start fs-h5">
                    {t('history.section_2.visionDescription')}
                  </p>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end justify-content-flex-end">
                <Fade>
                  <ResponsiveImage name="vission" alt="Imagen de la visión" className="rounded wx-lg-400 wx-xl-500" />
                </Fade>
              </div>
            </div>
            <div className="grid-row mb-6 gap-lg-4 align-items-center">
              <div className="grid-col-12 grid-col-md-6 order-1 order-md-2">
                <Fade className='d-flex align-items-center justify-content-start gap-2 mb-3'>
                  <Icon name="bullseye-arrow" variant='duotones' duotone='solid' size="lg" className="text-primary" />
                  <h3 className="fs-2 text-primary m-0">{t('history.section_2.missionTitle')}</h3>
                </Fade>
                <Fade>
                  <p className="text-justify fs-h5">
                    {t('history.section_2.missionDescription')}
                  </p>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end order-2 order-md-1">
                <Fade>
                  <ResponsiveImage name="mission" alt="Imagen de la misión" className="rounded wx-lg-400 wx-xl-500" />
                </Fade>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}
export default History
