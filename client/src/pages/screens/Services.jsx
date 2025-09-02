import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import { Accordion } from '../../components/commons/Accordion'
import { AccordionGroup } from '../../components/commons/AccordionGroup'
import { Tabs } from '../../components/commons/Tabs';
import { h3 } from 'framer-motion/client'
import FloatingButton from '../../components/commons/FloatingButton'



const Services = () => {
  const { t } = useLang()
  usePageTitle(t('services.pageTitle'))
  const categories = t('services.section_1.categorias', { returnObjects: true })

  const tabs = categories.map(category => ({
    id: category.id,
    label: category.name,
    content: (
      <div className="grid-row">
        {category.subcategorias.map((subcat) => {

          if (subcat.name.includes('Niños') || subcat.name.includes('Kids')) {
            return (
              <div key={subcat.id} className="grid-col-12">
                <h2 className="text-primary fs-3 mb-4">{subcat.name}</h2>

                <div className="grid-row gap-4">
                  {subcat.subcategorias.map((subsubcat) => (
                    <div key={subsubcat.id} className="grid-col-12 grid-col-md-6 menu-card bg-white border rounded p-3 h-100">
                      <div className="menu-card-header" style={{ backgroundImage: `url(${subcat.image || 'https://placehold.co/300x200'})` }}></div>
                      <h4 className="text-primary fs-4 mb-3">{subsubcat.name}</h4>
                      {subsubcat.servicios.map((servicio, index) => (
                        <div key={index} className="mb-3">
                          <h5 className="m-0 text-primary">
                            {servicio.nombre} - <span className="text-secondary">${servicio.precio}</span>
                          </h5>
                          <p className="text-muted small">{servicio.descripcion || '-'}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // Estructura normal para otras subcategorías
          return (
            <div key={subcat.id} className="grid-col-12 grid-col-lg-6 menu-card bg-white border rounded p-3 grid h-100">
              <div className="menu-card-header" style={{ backgroundImage: `url(${subcat.image || 'https://placehold.co/300x200'})` }}></div>

              <div className="menu-card-body">
                <div className="menu-card-title mt-4">
                  <h3 className='mt-0 mb-3 text-primary fs-3'>{subcat.name}</h3>
                </div>

                <div className="menu-card-tags">
                  <div className="d-flex flex-direction-column">
                    {(subcat.subcategorias ?? subcat.servicios).map((item, index) => (
                      <div key={index}>
                        <h4 className='m-0 text-primary'>
                          {item.nombre} - <span className='text-secondary'>$ {item.precio}</span>
                        </h4>
                        {item.descripcion
                          ? <p className="text-muted small">{item.descripcion}</p>
                          : <div className="text-muted mb-2">-</div>
                        }

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    ),
  }));




  return (
    <div>
            <FloatingButton phoneNumber="83275144" message="¡Hola! Me gustaría más información." />

      <Header />
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
