import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import { Tabs } from '../../components/commons/Tabs';
import FloatingButton from '../../components/commons/FloatingButton'
import { ServicesData } from '../../data/services'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { USD } from '../../utils/utils'

const Services = () => {
  const { t } = useLang()
  usePageTitle(t('services.pageTitle'))
  const categories = t('services.section_1.category', { returnObjects: true })
  const currencySymbol = <span className='text-dark'>$</span>;
  const tabs = Object.entries(categories).map((category) => (

    {


      id: category[0],
      label: category[1].name,
      content: (

        <div className="grid-row">
          {
            Object.entries(category[1].subCategory).map((subcat) => {

              const serviceData = ServicesData[subcat[0]]
              const subcategory = subcat[1]
              const subcategoryId = subcat[0]



              // Estructura normal para otras subcategorías
              return (
                <Fade key={subcategoryId} className="grid-col-12 grid-col-lg-6 menu-card">
                  <div className=' bg-white border rounded p-3 grid'>
                    <div className="menu-card-header image-overlay">
                      <ResponsiveImage name="logo-calma" type='svg' basePath='' alt="Logo de Calma Spa & Salón" className="logo-calma" />
                      <ResponsiveImage name={serviceData.image} className="service-img" />
                    </div>

                    <div className="menu-card-body">
                      <div className="menu-card-title mt-4">
                        <Fade><h3 className='mt-0 mb-3 text-primary fs-4'>{subcategory.name}</h3></Fade>
                      </div>

                      <div className="menu-card-tags">
                        <div className="d-flex flex-direction-column">
                          {Object.entries(subcategory.services).map((item) => {

                            const serviceItem = item[1]
                            const serviceItemId = item[0]
                            const serviceItemPrice = serviceData.prices[serviceItemId]



                            // Detecta si el servicio es de tipo "from"
                            const isFrom = serviceItemPrice.hasOwnProperty('from')

                            return (
                              <Fade key={serviceItemId}>
                                <div>
                                  <div className="d-flex align-items-center justify-content-space-between">
                                    <h4 className="m-0 text-primary fs-1">
                                      {serviceItem.name}
                                    </h4>

                                    <div className="border-dotted"></div>

                                    <h4 className="m-0 text-dark fs-1 d-flex align-items-baseline gap-1">
                                      {
                                        isFrom && (
                                          <>
                                            {isFrom && <span className="badge small">{t('services.fromBadge')}</span>}
                                            {currencySymbol} <USD amount={serviceItemPrice.from} />
                                          </>
                                        )

                                      }

                                      {
                                        !isFrom && (
                                          <>
                                            {currencySymbol} <USD amount={serviceItemPrice} />
                                          </>
                                        )
                                      }
                                    </h4>
                                  </div>

                                  <p className="text-muted fw-semibold">{serviceItem.description}</p>
                                </div>
                              </Fade>
                            )
                          })}
                        </div>
                      </div>


                    </div>
                  </div>
                </Fade>
              )
            })
          }
        </div >
      )
    }
  ))

  return (
    <div>
      <FloatingButton />

      <Header />
      <Fade>
        <section className='py-4 body-bg'>
          <div className="container">
            <div className="grid">
              <div className="grid-row">
                <div className="grid-col-12 d-flex flex-direction-column align-items-center justify-content-center">
                  <Fade><h1 className="fs-4 text-primary text-center">{t('services.section_1.title')}</h1></Fade>
                  <Fade> <p className='text-center text-muted mw-500'>
                    {t('services.section_1.description')}
                  </p></Fade>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fade>

      <section className='mb-6'>
        <div className="container">
          <Tabs tabs={tabs} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Services
