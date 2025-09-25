import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import PackageCard from '../../components/commons/PackageCard'
import { Accordion } from '../../components/commons/Accordion' // <-- importamos el nuevo componente
import { AccordionGroup } from '../../components/commons/AccordionGroup'

const Packages = () => {
  const { t } = useLang()
  const packages = t('packages.section_1.paquetes', { returnObjects: true })
  const faqs = t('packages.section_2.faq.items', { returnObjects: true })

  usePageTitle(t('packages.pageTitle'))

  return (
    <div>
      <Header />

      <section className='py-4 bg-neutral-0'>
        <div className='container'>
          <div className='grid'>
            <div className='grid-row mb-6'>
              <div className='grid-col-12 d-flex flex-direction-column align-items-center justify-content-center'>
                <Fade>
                  <h1 className='fs-4 text-center'>
                    {t('packages.section_1.title')}
                  </h1>
                </Fade>
                <Fade>
                  <p className='text-center text-muted max-wx-750'>
                    {t('packages.section_1.description')}
                  </p>
                </Fade>
              </div>
            </div>
            <Fade className='package-card-group grid-row gap-lg-3'>
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className='package-card-wrapper grid-col-12 grid-col-md-4 border rounded-all-sm bg-neutral-50'
                  data-featured={pkg.featured}
                >
                  <PackageCard
                    icono={pkg.icono}
                    nombre={pkg.nombre_original}
                    precio={pkg.precio}
                    descripcion={pkg.descripcion_corta}
                    servicios={pkg.servicios_incluidos}
                    isFeatured={pkg.featured}
                    featuredText={pkg.featured_text}
                  />
                </div>
              ))}
            </Fade>
          </div>
          <Fade>
            <p className='text-muted text-center fs-medium mt-5'>{`* ${t('packages.section_1.group_optionaly_text')}`}</p>
          </Fade>
        </div>
      </section>

      <section className='py-6 bg-container'>
        <div className='container d-flex flex-direction-column align-items-center'>
          <div className='d-flex justify-content-center'>
            <Fade>
              <h2 className='text-center text-primary fs-4 mb-6'>
                {t('packages.section_2.faq.title')}
              </h2>
            </Fade>
          </div>

          <AccordionGroup className='w-100 max-wx-750 justify-content-center d-flex flex-direction-column'>
            {faqs.map((faq, i) => (
              <Fade key={i}>
                <Accordion title={faq.question}>
                  <p className='mb-0 text-muted '>{faq.answer}</p>
                </Accordion>
              </Fade>
            ))}
          </AccordionGroup>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Packages
