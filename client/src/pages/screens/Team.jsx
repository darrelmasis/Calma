import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { Icon } from '../../components/commons/Icons'
import { Hero } from '../../components/commons/Hero'
import { Button } from '../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import Footer from '../../components/layout/Footer'
import { useLang } from '../../i18n/LanguageContext'
import { ResponsiveImage } from '../../components/ui/ResponsiveImage'

const Team = () => {
  const { t } = useLang()
  usePageTitle(t('home.pageTitle'))

  const experts = t('team.section_2.profiles', { returnObjects: true })


  const StringToList = ({ text, className, liClassName }) => {
    // "text" podría ser algo como: "React,Vue,Angular,Svelte"
    const items = text.split(",").map(item => item.trim());

    return (
      <ul className={className}>
        {items.map((item, index) => (
          <li key={index} className={liClassName}><span className='text-primary me-1'>•</span>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />

      <section className="py-5 bg-white">
        <div className="container">
          <Fade className='d-flex flex-direction-column align-items-center justify-content-center text-center'>
            <h1>{t('team.section_1.title')}</h1>
            <p className='fs-lead'>{t('team.section_1.description')}</p>
            <span className='border-bottom d-block w-75 mt-5'></span>
          </Fade>
        </div>
      </section>

      <section className="py-5 bg-white text-center">
        <div className="container">
          <Fade className="card-deck grid-row">
            {
              Object.entries(experts)
                .sort(([, a], [, b]) => a.order - b.order)
                .map(([key, expert], index) => {

                  return (
                    <div key={index} className="profile-card-wrapper justify-content-center grid-col-12 grid-col-md-4 grid-col-lg-2">
                      <div className="profile-card rounded-all-lg bg-neutral-0 ">
                        <div className="rounded-bottom-lg profile-card-header w-100 d-flex align-items-center justify-content-center">
                          <div
                            className="profile-card-image"
                            style={{ '--mask-url': `url(/images/png/${expert.photo}-400.png)` }}
                          >
                            <div className="profile-card-image-wrapper">
                              <ResponsiveImage
                                name={expert.photo}
                                type='png'
                                alt={expert.imageAlt}
                                className="profile-card-image-picture"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="profile-card-content rounded-all-lg p-3">
                          <h2 className='mb-1 text-primary-400 fw-light fs-h5 fw-semibold mt-0'>{expert.name}</h2>
                          {/* <p className='fs-medium m-0'>{expert.role}</p> */}
                          {/* <p className='fs-small text-muted m-0'>{expert.description}</p> */}
                          <StringToList text={expert.role} className="text-center p-0 list-style-none d-flex flex-direction-column gap-1" liClassName="m-0 fs-small text-muted " />
                        </div>
                      </div>
                    </div>
                  )

                }
                )
            }
          </Fade>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default Team
