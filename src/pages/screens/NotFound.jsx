import { usePageTitle } from '@utils/utils'
import { Button } from '../../components/ui/Button'
import { useLang } from '../../i18n/LanguageContext'
import { SEO } from '../../components/SEO/SEO'
const NotFound = () => {
  const { t } = useLang()
  const notFound = t('notFound', { returnObjects: true })
  return (
    <>
      <SEO
        title={notFound.pageTitle}
        description={notFound.metaDescription}
        noIndex
      />
      <section className='position-relative bg-dark not-found-page d-flex flex-direction-column justify-content-center align-items-center text-center p-4 border-bottom text-white'>
        <h1 className='not-found-title text-glow fs-display-1 fw-bold'>
          {t('notFound.title')}
        </h1>
        <p className='fs-lead text-glow'>{t('notFound.subtitle')}</p>
        <Button
          as='link'
          to='/'
          icon='house'
          variant='dark'
          size='lg'
          label={t('notFound.buttonText')}
          className='mt-3 text-glow'
        />
        <div className='animate-image'>
          <img
            className='astronaut'
            src='/images/404/not-found-astronaut.svg'
            alt='Not Found'
          />
          <img
            className='rope'
            src='/images/404/not-found-rope.svg'
            alt='Not Found'
          />
          <img
            className='moon'
            src='/images/404/not-found-moon.svg'
            alt='Not Found'
          />
        </div>
      </section>
    </>
  )
}
export default NotFound
