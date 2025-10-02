import { useLang } from '../../i18n/LanguageContext'
import { SEO } from '../../components/SEO/SEO'
import { useNavigate } from 'react-router-dom'
import { Countdown } from '../../components/commons/Countdown'
import { COUNTDOWN_TARGET } from '../../utils/Countdown'

const Waiting = () => {
  const navigate = useNavigate()
  const { t } = useLang()
  const waiting = t('waiting', { returnObjects: true })

  const handleFinish = () => {
    navigate('/') // redirige a la home
  }

  return (
    <>
      <SEO
        title={waiting.pageTitle}
        description={waiting.metaDescription}
        noIndex
      />
      <Countdown targetDate={COUNTDOWN_TARGET} onFinish={handleFinish} />
    </>
  )
}

export default Waiting
