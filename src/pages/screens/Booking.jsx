import { useState, useEffect } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { useNavigate } from 'react-router-dom'
import { Stepper, StepsContent, Step } from '../../components/layout/Stepper'
import { useSelectedServices } from '../../hooks/useSelectedService'
import { Input, PhoneNumber } from '../../components/forms/Input'
import { USD, formatTime } from '../../utils/utils'
import axios from 'axios'
import { Icon } from '../../components/commons/Icons'
import { usePageTitle } from '@utils/utils'
import { useFormatDate } from '../../hooks/useFormatDate'
import { useOfflineStatus } from '../../hooks/useOfflineStatus'
import { limitedToast as toast } from '../../utils/toast'
import { useOutbox } from '../../context/OutboxContent'
import { SEO } from '../../components/SEO/SEO'

const Booking = () => {
  const { t } = useLang()
  const navigate = useNavigate()
  const booking = t('booking', { returnObjects: true })

  const { servicesWithInfo, totalServices, totalPrice, isLoaded } =
    useSelectedServices()
  const { formatDate } = useFormatDate()
  const isOffline = useOfflineStatus()
  const { addToQueue } = useOutbox()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    prefix: '+505',
    email: '',
    notes: '',
    date: '',
    time: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const environment = import.meta.env.VITE_ENV
  const apiUrl =
    environment === 'development'
      ? import.meta.env.VITE_API_DEV_URL
      : import.meta.env.VITE_API_PROD_URL

  const hasServices = totalServices > 0

  // Redirige si no hay servicios
  useEffect(() => {
    if (isLoaded && totalServices <= 0) {
      navigate('/empty')
    }
  }, [isLoaded, totalServices, navigate])

  // Prellenar mensaje con servicios seleccionados
  useEffect(() => {
    if (hasServices) {
      setFormData((prev) => ({ ...prev, message: servicesWithInfo }))
    }
  }, [servicesWithInfo])

  // Handle submit
  const handleSubmit = async () => {
    setIsLoading(true)
    const payload = { ...formData }

    try {
      if (isOffline) {
        await addToQueue(payload, 'booking')
        toast.info(
          '📨 Sin conexión. Tu reserva se guardó en la bandeja de salida y se enviará automáticamente cuando vuelva internet.'
        )
        navigate('/outbox', { state: { waiting: true, from: 'booking' } })
      } else {
        const res = await axios.post(`${apiUrl}/api/send-mail`, payload, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.data.ok) throw new Error(res.data.message || 'Error en API')
        toast.success('✅ Reserva enviada con éxito.')
        navigate('/success', { state: { success: true, from: 'booking' } })
      }

      // Limpiar formulario y redirigir
      setFormData({
        name: '',
        prefix: '+505',
        phone: '',
        email: '',
        date: '',
        time: '',
        notes: '',
        message: ''
      })
      setIsSuccess(true)
    } catch (err) {
      console.error(err)
      await addToQueue(payload, 'booking')
      toast.warning(
        '⚠️ No se pudo enviar la reserva. Se guardó en la bandeja de salida y se enviará automáticamente cuando haya conexión.'
      )
      navigate('/outbox', { state: { waiting: true } })
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasServices) return null

  return (
    <>
      <SEO
        title={booking.pageTitle}
        description={booking.metaDescription}
        noIndex
      />
      {usePageTitle(t('booking.pageTitle'))}
      <section className='bg-white py-5'>
        <div className='container d-flex justify-content-center booking-section'>
          <Stepper
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isLoading}
            isCompleted={isSuccess}>
            <StepsContent>
              {/* Paso 1: Bienvenida + Resumen */}
              <Step stepKey='welcome'>
                {() => (
                  <div className='d-flex flex-direction-column align-items-center justify-content-center'>
                    <div className='d-flex align-items-center flex-direction-column justify-content-center mb-5 text-center'>
                      <span className='fs-display-2'>🎉</span>
                      <p className='fs-h3 my-0'>
                        {t('booking.steps.welcome.title')}
                      </p>
                      <p className='fs-medium mt-0 text-muted'>
                        {t('booking.steps.welcome.subtitle')}
                      </p>
                    </div>
                    <div className='d-flex w-100 flex-wrap-wrap gap-2 justify-content-center'>
                      {Object.entries(servicesWithInfo).map(
                        ([cat, services]) => {
                          const categoryName =
                            services[0]?.categoryName || 'Categoría'
                          return (
                            <div
                              key={cat}
                              className='rounded border p-3 w-100 max-wx-md-300'>
                              <span className='d-block mb-2 fs-h5'>
                                {categoryName}
                              </span>
                              <ul className='list-unstyled d-flex flex-direction-column m-0'>
                                {services.map((s) => (
                                  <li
                                    key={s.id + s.subCategoryId}
                                    className='bg-light-50 rounded-all-sm px-3 py-3 bg-white m-0 d-flex justify-content-space-between'>
                                    <div className='d-flex flex-direction-column'>
                                      <span className='fw-semibold mb-1 fs-h6'>
                                        {s.subCategoryName}
                                      </span>
                                      <span className='text-muted fs-medium'>
                                        {s.serviceName}
                                      </span>
                                    </div>
                                    <span>
                                      <USD
                                        amount={s.servicePrice}
                                        className='fw-bold'
                                      />
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        }
                      )}
                    </div>
                    <div className='max-wx-lg-700 p-3 mt-5 text-center d-flex flex-direction-column gap-1'>
                      <div className='d-flex gap-1 align-items-center'>
                        <span className='fs-h4 fw-bold text-dark'>
                          {t('header.dropdown.total')}
                        </span>
                        <span className='fs-h4 text-dark fw-bold'>
                          ~<USD size='large' amount={totalPrice} />
                        </span>
                      </div>
                      <div className='text-muted fw-light'>
                        {`${totalServices} ${
                          totalServices === 1
                            ? t('header.dropdown.totalSubtitle')
                            : t('header.dropdown.totalSubtitle') + 's'
                        }`}
                      </div>
                    </div>
                  </div>
                )}
              </Step>

              {/* Paso 2: Datos personales */}
              <Step
                stepKey='personalData'
                className='d-flex flex-1 justify-content-center mt-3'>
                {({
                  formData,
                  setFormData,
                  getField,
                  validateField,
                  clearField
                }) => (
                  <div className='d-flex flex-direction-column justify-content-center gap-2 flex-1 max-wx-500'>
                    <div className='d-flex align-items-center flex-direction-column justify-content-center text-center'>
                      <p className='fs-h3 my-0'>
                        {t('booking.steps.personalData.title')}
                      </p>
                      <p className='fs-medium mt-0 text-muted'>
                        {t('booking.steps.personalData.subtitle')}
                      </p>
                    </div>
                    <Input
                      label={t('booking.steps.personalData.nameInput.label')}
                      placeholder={t(
                        'booking.steps.personalData.nameInput.placeholder'
                      )}
                      value={formData.name}
                      name='name'
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, name: val }))
                        setTimeout(() => validateField('name', val), 300)
                      }}
                      onBlur={() => validateField('name', formData.name)}
                      onFocus={() => clearField('name')}
                      error={getField('name').message}
                      success={getField('name').state === 'success'}
                      required
                      className='w-100'
                    />
                    <Input
                      label={t('booking.steps.personalData.emailInput.label')}
                      placeholder={t(
                        'booking.steps.personalData.emailInput.placeholder'
                      )}
                      value={formData.email}
                      name='email'
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, email: val }))
                        setTimeout(() => validateField('email', val), 500)
                      }}
                      onBlur={() => validateField('email', formData.email)}
                      onFocus={() => clearField('email')}
                      error={getField('email').message}
                      success={getField('email').state === 'success'}
                      required
                      className='w-100'
                    />
                    <PhoneNumber
                      label={t('booking.steps.personalData.phoneInput.label')}
                      value={formData.phone}
                      onChange={(valObj) => {
                        setFormData((prev) => ({
                          ...prev,
                          phone: valObj?.formatted || '',
                          prefix: valObj?.prefix || '+505'
                        }))
                        setTimeout(
                          () =>
                            validateField(
                              'phone',
                              valObj?.formatted || '',
                              formData
                            ),
                          500
                        )
                      }}
                      onBlur={() =>
                        validateField('phone', formData.phone, formData)
                      }
                      onFocus={() => clearField('phone')}
                      error={getField('phone').message}
                      success={getField('phone').state === 'success'}
                      required
                    />
                  </div>
                )}
              </Step>

              {/* Paso 3: Agenda */}
              <Step
                stepKey='schedule'
                className='d-flex flex-1 justify-content-center mt-3'>
                {({
                  formData,
                  setFormData,
                  getField,
                  validateField,
                  clearField
                }) => (
                  <div className='d-flex flex-direction-column flex-1 gap-2 max-wx-500'>
                    <div className='d-flex align-items-center flex-direction-column justify-content-center text-center'>
                      <p className='fs-h3 my-0'>
                        {t('booking.steps.schedule.title')}
                      </p>
                      <p className='fs-medium mt-0 text-muted'>
                        {t('booking.steps.schedule.subtitle')}
                      </p>
                    </div>
                    <div className='d-flex align-items-flex-start flex-direction-column flex-direction-md-row justify-content-space-between gap-1'>
                      <Input
                        className='w-100'
                        type='date'
                        label={t('booking.steps.schedule.dateInput.label')}
                        placeholder={t(
                          'booking.steps.schedule.dateInput.placeholder'
                        )}
                        value={formData.date}
                        onChange={(val) => {
                          setFormData((prev) => ({ ...prev, date: val }))
                          validateField('date', val)
                        }}
                        onBlur={() => validateField('date', formData.date)}
                        error={getField('date').message}
                        success={getField('date').state === 'success'}
                        required
                      />
                      <Input
                        className='w-100'
                        type='time'
                        label={t('booking.steps.schedule.timeInput.label')}
                        placeholder={t(
                          'booking.steps.schedule.timeInput.placeholder'
                        )}
                        value={formData.time}
                        onChange={(val) => {
                          setFormData((prev) => ({ ...prev, time: val }))
                          validateField('time', val)
                        }}
                        onBlur={() => validateField('time', formData.time)}
                        error={getField('time').message}
                        success={getField('time').state === 'success'}
                        required
                      />
                    </div>
                    <div className='border-top'></div>
                    <Input
                      type='textarea'
                      label={t('booking.steps.schedule.messageInput.label')}
                      value={formData.notes}
                      name='notes'
                      placeholder={t(
                        'booking.steps.schedule.messageInput.placeholder'
                      )}
                      onChange={(val) =>
                        setFormData((prev) => ({ ...prev, notes: val }))
                      }
                    />
                  </div>
                )}
              </Step>

              {/* Paso 4: Confirmación */}
              <Step
                stepKey='confirmation'
                className='d-flex flex-1 justify-content-center mt-3'>
                {({ formData }) => {
                  if (isLoading) {
                    return (
                      <div className='d-flex flex-direction-column justify-content-center align-items-center flex-1 text-center max-wx-500 p-3 rounded shadow-sm'>
                        <div className='d-flex flex-direction-column align-items-center justify-content-center'>
                          <span className='fs-display-1'>
                            <Icon name='spinner' animation='spin' />
                          </span>
                          <p className='fs-h3 mt-3'>
                            {t('booking.steps.confirmation.loadingText')}
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return (
                    <div className='d-flex flex-direction-column justify-content-center align-items-center flex-1 text-center max-wx-500 p-3'>
                      <div className='d-flex flex-direction-column align-items-center justify-content-center'>
                        <span className='fs-display-2'>🥳</span>
                        <p className='fs-h3 mt-3'>
                          {t('booking.steps.final.title')}
                        </p>
                      </div>
                      <div className='text-start'>
                        <p className='m-0 fs-lead text-center'>{`${t(
                          'booking.steps.final.confirmtext'
                        )} ${formatDate(formData.date, 'long')} ${t('booking.steps.final.confirmtext2')} ${formatTime(formData.time)}`}</p>
                        <p className='text-center text-muted'>
                          {t('booking.steps.final.details')}
                        </p>
                        <p className='text-center text-muted fs-small'>{`(${formData.prefix} ${formData.phone}) | (${formData.email})`}</p>
                      </div>
                    </div>
                  )
                }}
              </Step>
            </StepsContent>
          </Stepper>
        </div>
      </section>
    </>
  )
}

export default Booking
