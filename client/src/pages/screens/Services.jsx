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
import classNames from 'classnames'
import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Icon } from '../../components/commons/Icons'

const Services = () => {
  const { t } = useLang()
  usePageTitle(t('services.pageTitle'))
  const categories = t('services.section_1.category', { returnObjects: true })
  const currencySymbol = '$'
  const [isExpanded, setIsExpanded] = useState(null);


  const handleExpandedButtonClick = (subcategoryId) => {
    setIsExpanded(prev => prev === subcategoryId ? null : subcategoryId);
  }

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

              const menuCardBodyClasses = classNames({
                'menu-card-body': true,
                'menu-card-body-expanded': isExpanded === subcategoryId

              }, 'px-3')

              const menuCardClasses = classNames('grid-col-12 grid-col-lg-6 menu-card')



              // Estructura normal para otras subcategorías
              return (
                <Fade key={subcategoryId} className={menuCardClasses}>
                  <div className=' bg-white border rounded grid'>
                    <div className="menu-card-header image-overlay pt-3 ps-3 pe-3">
                      <ResponsiveImage name="logo-calma" type='svg' basePath='' alt="Logo de Calma Spa & Salón" className="logo-calma" />
                      <ResponsiveImage name={serviceData.image} className="service-img" />
                    </div>

                    <div className={menuCardBodyClasses}>
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

                                    <h4 className="m-0 text-dark fs-1 d-flex align-items-baseline">
                                      {
                                        isFrom && (
                                          <>
                                            {isFrom && <span className="badge small me-3">{t('services.fromBadge')}</span>}
                                            <USD amount={serviceItemPrice.from} currencySymbol={currencySymbol} />
                                          </>
                                        )

                                      }

                                      {
                                        !isFrom && (
                                          <>
                                            <USD amount={serviceItemPrice} currencySymbol={currencySymbol} />
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
                    <div className="menu-card-footer px-3 pb-3 pt-2 d-flex justify-content-center">
                      <Button
                        classes='show-more-button'
                        variant="primary"
                        size=""
                        label={isExpanded === subcategoryId ? t('services.showLess') : t('services.showMore')}
                        onClick={() => handleExpandedButtonClick(subcategoryId)} />
                      <Icon name={isExpanded === subcategoryId ? 'chevron-up' : 'chevron-down'} className="ms-2 show-more-icon" />
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

      <div className="container">
        <Tabs tabs={tabs} />
      </div>
      <Footer />
    </div>
  )
}

export default Services
