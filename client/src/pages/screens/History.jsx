import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import FloatingButton from '../../components/commons/FloatingButton'
import { historyRight, mission, vission } from '../../assets/assets'

const History = () => {
  const { t } = useLang()
  usePageTitle(t('history.pageTitle'))
  return (
    <div>
      <FloatingButton />
      <Header />

      <section className="py-4 body-bg">
        <div className="container">
          <div className="grid">
            <div className="grid-row mb-6">
              <div className="grid-col-12">
                <Fade><h1 className="fs-4 text-primary text-center text-md-start">{t('history.section_1.title')}</h1></Fade>
              </div>
            </div>
            <div className="grid-row gap-lg-4">
              <div className="grid-col-12 grid-col-md-6 text-justify">
                <Fade>
                  <p className="fs-1 mt-0">
                    {t('history.section_1.history_p1')}
                  </p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.history_p2')}</p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.history_p3')}</p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.history_p4')}</p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.history_p5')}</p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.history_p6')}</p>
                </Fade>
                <Fade>
                  <p className="fs-1">{t('history.section_1.end_tag')}</p>
                </Fade>
                <Fade>
                  <span className="text-primary fs-1">{t('history.section_1.owners')}</span>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end">
                <Fade className='position-sticky top-1 mb-3'>
                  <img className='rounded w-100' src={historyRight} alt="" />
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='bg-container py-6' id='about'>
        <div className="container">
          <div className="grid-row mb-6">
            <div className="grid-col-12">
              <Fade>
                <h1 className="fs-4 text-primary text-center text-md-start">{t('history.section_2.title')}</h1>
              </Fade>
            </div>
          </div>
          <div className="grid">
            <div className="grid-row mb-6 gap-lg-4">
              <div className="grid-col-12 grid-col-md-6">
                <h2 className="fs-2 text-primary">{t('history.section_2.visionTitle')}</h2>
                <Fade>
                  <p className="mt-0  text-justify fs-1">
                    {t('history.section_2.visionDescription')}
                  </p>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end">
                <Fade>
                  <img className='rounded w-100 position-md-sticky top-md-1 mb-3' src={vission} alt="" />
                </Fade>
              </div>
            </div>
            <div className="grid-row mb-6 gap-lg-4">
              <div className="grid-col-12 grid-col-md-6 order-1 order-md-2">
                <h2 className="fs-2 text-primary">{t('history.section_2.missionTitle')}</h2>
                <Fade>
                  <p className="text-justify mt-0 fs-1">
                    {t('history.section_2.missionDescription')}
                  </p>
                </Fade>
              </div>
              <div className="grid-col-12 grid-col-md-6 text-end order-2 order-md-1">
                <Fade>
                  <img className='rounded w-100 position-md-sticky top-md-1 mb-3' src={mission} alt="" />
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
