import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import PackageCard from '../../components/commons/PackageCard'
import { Accordion } from '../../components/commons/Accordion' // <-- importamos el nuevo componente
import { AccordionGroup } from '../../components/commons/AccordionGroup'
import FloatingButton from '../../components/commons/FloatingButton'

const Packages = () => {
  const { t } = useLang()
  const packages = t('packages.section_1.paquetes', { returnObjects: true });
  const faqs = t('packages.section_2.faq.items', { returnObjects: true });

  usePageTitle(t('packages.pageTitle'))

  return (
    <div>
      <FloatingButton phoneNumber="83275144" message="¡Hola! Me gustaría más información." />

      <Header />

      <section className="py-4 body-bg">
        <div className="container">
          <div className="grid">
            <div className="grid-row mb-6">
              <div className="grid-col-12 d-flex flex-direction-column align-items-center justify-content-center">
                <Fade><h1 className="fs-4 text-primary text-center">{t('packages.section_1.title')}</h1></Fade>
                <Fade>
                  <p className='text-center text-muted mw-500'>
                    {t('packages.section_1.description')}
                  </p>
                </Fade>
              </div>
            </div>
            <div className="package-card-group grid-row gap-lg-3">
              {packages.map((pkg, index) => (
                <div className="grid-col-12 grid-col-md-4" key={index}>
                  <Fade>
                    <PackageCard
                      icono={pkg.icono}
                      nombre={pkg.nombre_original}
                      precio={pkg.precio}
                      descripcion={pkg.descripcion_corta}
                      servicios={pkg.servicios_incluidos}
                    />
                  </Fade>
                </div>
              ))}
            </div>
          </div>
          <p className='text-muted text-center'>{t('packages.section_1.group_optionaly_text')}</p>
        </div>
      </section>

      <section className='py-6 bg-container'>
        <div className="container">
          <div className="grid">
            <div className="grid-row">
              <div className="grid-col-12">
                <Fade>
                  <h2 className="text-center text-primary fs-4 mb-6">
                    {t('packages.section_2.faq.title')}
                  </h2>
                </Fade>
              </div>
            </div>

            <div className="grid-row">
              <div className="grid-col-12">
                <AccordionGroup>
                  {faqs.map((faq, i) => (
                    <Fade key={i}>
                      <Accordion title={faq.question}>
                        <p className="text-muted text-base">
                          {faq.answer}
                        </p>
                      </Accordion>
                    </Fade>
                  ))}
                </AccordionGroup>


              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Packages
