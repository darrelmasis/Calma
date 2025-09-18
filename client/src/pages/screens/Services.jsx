import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import { Tabs } from '../../components/commons/Tabs';
import { ServicesData } from '../../data/services'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'
import { USD } from '../../utils/utils'
import classNames from 'classnames'
import React, { useState, Fragment, useRef, useEffect } from 'react'
import { Icon } from '../../components/commons/Icons'
import { CSSTransition } from 'react-transition-group'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover'
import { TruncateText } from '../../components/ui/ReadMore'
import { Button } from '../../components/ui/Button'
import AddService from '../../components/ui/AddService'

const Services = () => {
  const { t } = useLang()
  usePageTitle(t('services.pageTitle'))
  const categories = t('services.section_1.category', { returnObjects: true })
  const [isExpanded, setIsExpanded] = useState({});
  const refs = useRef({})
  const cardRef = useRef({})


  const handleToggle = (id) => {
    setIsExpanded(prev => (prev === id ? null : id))
  };

  const getRef = (id) => {
    if (!refs.current[id]) refs.current[id] = React.createRef()
    return refs.current[id]
  }

  const getCardRef = (id) => {
    if (!cardRef.current[id]) cardRef.current[id] = React.createRef()
    return cardRef.current[id]
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isExpanded) return
      const currentCardRef = cardRef.current[isExpanded]
      if (currentCardRef && currentCardRef.current && !currentCardRef.current.contains(event.target)) {
        setIsExpanded(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])



  const tabs = Object.entries(categories).map((category) => (

    {

      id: category[0],
      label: category[1].name,
      content: (

        // <div className="grid-row gap-2">
        <Fragment key={`category-${category[0]}`} >
          {

            Object.entries(category[1].subCategory).map((subcat) => {

              const serviceData = ServicesData[subcat[0]]
              const subcategory = subcat[1]
              const subcategoryId = subcat[0]

              const serviceItems = Object.entries(subcategory.services)
              const hasManyItems = serviceItems.length > 3

              const menuCardClasses = classNames('menu-card grid-col-12 grid-col-md-6 grid-col-lg-4')

              const isItemsExpanded = classNames('menu-card-items d-flex flex-direction-column gap-1')

              const menuCardContentClasses = classNames('menu-card-content pt-3 px-3', { "expanded": isExpanded === subcategoryId })

              // Estructura normal para otras subcategorías
              return (

                <Fade key={`subcat-${subcategoryId}`} className={menuCardClasses} delay={0.2}>
                  <div ref={getCardRef(subcategoryId)} className="menu-card-wrapper bg-neutral-50 rounded-all-sm d-flex flex-direction-column">

                    <div className="menu-card-header rounded-top-sm overflow-hidden position-relative">
                      <ResponsiveImage name={serviceData.image} />
                    </div>
                    <div className={menuCardContentClasses}>
                      <div className="menu-card-title mb-3" data-name={subcategory.name.toLowerCase().replace(" ", "-")}>
                        <h4 className='text-primary-700 mt-2 mb-4 fs-h5 fw-semibold d-flex align-items-center'>
                          <Icon name={serviceData.Icon} className="me-2" />
                          <span>{subcategory.name}</span>
                        </h4>
                      </div>
                      <CSSTransition
                        in={isExpanded === subcategoryId}
                        timeout={300}
                        classNames="menu-items"
                        nodeRef={getRef(subcategoryId)}
                        onEnter={() => {
                          const el = getRef(subcategoryId).current
                          if (el) el.style.maxHeight = el.scrollHeight + "px"
                        }}
                        onEntering={() => {
                          const el = getRef(subcategoryId).current
                          if (el) el.style.maxHeight = el.scrollHeight + "px"
                        }}
                        onExit={() => {
                          const el = getRef(subcategoryId).current
                          if (el) el.style.maxHeight = el.scrollHeight + "px"
                        }}
                        onExiting={() => {
                          const el = getRef(subcategoryId).current
                          if (el) el.style.maxHeight = "12.5rem"
                        }}
                      >
                        <div ref={getRef(subcategoryId)} className={isItemsExpanded}>
                          {
                            Object.entries(subcategory.services).map((item) => {
                              const serviceItem = item[1]
                              const serviceItemId = item[0]
                              const serviceItemPrice = serviceData.prices[serviceItemId]

                              // Detecta si el servicio es de tipo "from"
                              const isFrom = serviceItemPrice.hasOwnProperty('from')


                              return (
                                <Fragment key={`service-${serviceItemId}-${subcategoryId}`} >
                                  <div className='Service-wrapper'>
                                    <div className="service d-flex align-items-center justify-content-space-between">
                                      <span className='d-flex align-items-center flex-direction-row service-title fs-medium position-relative'>
                                        {serviceItem.name}
                                      </span>
                                      <span className='service-price'>
                                        {
                                          isFrom ? (
                                            <>
                                              <span className='badge bg-warning-500 text-white fs-xsmall me-1 fw-semibold'>{t('services.fromBadge')}</span>
                                              <USD className="fs-medium" amount={serviceItemPrice.from} currencySymbol='$' />
                                            </>
                                          ) : (
                                            <>
                                              <USD className="fs-medium" amount={serviceItemPrice} currencySymbol='$' />

                                            </>
                                          )
                                        }
                                      </span>
                                      <AddService category={subcategory.name} service={serviceItem.name} description={serviceItem.description} className="ms-2" />

                                    </div>
                                    <div className="service-description d-flex align-items-center">
                                      <TruncateText text={serviceItem.description} popover={{ title: serviceItem.name }} maxLength={25} className={"d-inline fs-small text-muted service-partial-description p-0 m-0"} />

                                    </div>
                                  </div>

                                </Fragment>

                              )
                            })
                          }
                        </div>
                      </CSSTransition>
                    </div>

                    {serviceItems.length > 3 && (
                      <div
                        className="menu-card-footer"
                        onClick={() => handleToggle(subcategoryId)}
                      >
                        <div className="menu-card-footer--expandable d-flex flex-direction-column">
                          <span className='fs-medium'>
                            {isExpanded === subcategoryId ? t('services.cardFooter.expandable.expanded') : t('services.cardFooter.expandable.collapsed')}
                          </span>
                          <Icon name={isExpanded === subcategoryId ? "chevron-up" : "chevron-down"} />
                        </div>
                      </div>
                    )}

                    {serviceItems.length === 3 && (
                      <div
                        className="menu-card-footer"
                      >
                        <div className="menu-card-footer--static">
                          <span className='fs-medium'>
                            {
                              t('services.cardFooter.static')
                            }
                          </span>
                          <Icon className="fs-h4" name="eyes" variant='duotones' duotone='regular' />
                        </div>
                      </div>
                    )}

                    {serviceItems.length < 3 && (
                      <div
                        className="menu-card-footer"
                      >
                        <div className="menu-card-footer--minimal">
                          <span className='fs-medium'>
                            {
                              t('services.cardFooter.minimal')
                            }
                          </span>
                          <Icon className="fs-h4" name="sparkles" variant='duotones' duotone='regular' />
                        </div>
                      </div>
                    )}



                  </div>
                </Fade>
              )
            })
          }
          {/* </div > */}
        </Fragment >
      )
    }
  ))

  return (
    <div>

      <Header />

      <section className="bg-neutral-0 pb-5">
        <div className="container">
          <div className="grid gap-lg-3">
            {/* Encabezado arriba */}
            <div className="grid-col-12 d-flex flex-direction-column align-items-center justify-content-center">
              <Fade>
                <h1 className="text-center">
                  {t('services.section_1.title')}
                </h1>
              </Fade>
              <Fade>
                <p className='text-center text-muted max-wx-750'>
                  {t('services.section_1.description')}
                </p>
              </Fade>
            </div>
          </div>
          <Tabs tabs={tabs} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Services
