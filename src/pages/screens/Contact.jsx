// src/pages/contact/Contact.jsx
import { useState, useRef, useEffect } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Input, PhoneNumber } from '../../components/forms/Input'
import axios from 'axios'
import { limitedToast as toast } from '../../utils/toast'
import { Icon } from '../../components/commons/Icons'
import { Button } from '../../components/ui/Button'
import { useContactValidation } from '../../hooks/useContactValidation'
import { useOfflineStatus } from '../../hooks/useOfflineStatus'
import { useOutbox } from '../../context/OutboxContent'
import { useNavigate } from 'react-router-dom'
import { SEO } from '../../components/SEO/SEO'

const ENABLE_DEBUG = import.meta.env.VITE_DEBUG_CONTACT === 'true'

const Contact = () => {
  const { t } = useLang()
  const contact = t('contact', { returnObjects: true })
  const { validateForm, validateField, getField, clearField } =
    useContactValidation()
  const isOffline = useOfflineStatus()
  const { addToQueue } = useOutbox()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    prefix: '+505',
    email: '',
    mensaje: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef(null)

  const environment = import.meta.env.VITE_ENV
  const apiUrl =
    environment === 'development'
      ? import.meta.env.VITE_API_DEV_URL
      : import.meta.env.VITE_API_PROD_URL

  useEffect(() => {
    return () => {
      // cleanup timers on unmount
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Actualiza el campo y pasa el estado "nuevo" a la validación para evitar usar state stale
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value }
      // validación inmediata con estado actualizado
      try {
        validateField(field, value, next)
      } catch (err) {
        if (ENABLE_DEBUG) console.warn('validateField error', err)
      }
      return next
    })
  }

  const handlePhoneChange = (valObj) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        telefono: valObj?.formatted || '',
        prefix: valObj?.prefix || '+505'
      }
      try {
        validateField('telefono', next.telefono, next)
      } catch (err) {
        if (ENABLE_DEBUG) console.warn('validateField telefono error', err)
      }
      return next
    })
  }

  const clearForm = () => {
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      prefix: '+505',
      email: '',
      mensaje: ''
    })
    // limpiar estados de validación por campo (si tu hook lo soporta)
    try {
      clearField('nombre')
      clearField('apellido')
      clearField('telefono')
      clearField('prefix')
      clearField('email')
      clearField('mensaje')
    } catch (err) {
      if (ENABLE_DEBUG) console.warn('clearField not fully supported', err)
    }
  }

  const goToOutbox = (delay = 3000) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      navigate('/outbox', { state: { waiting: true, from: 'contact' } })
    }, delay)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // evita doble submit instantáneo
    if (isLoading) {
      if (ENABLE_DEBUG) console.debug('submit ignored: already loading')
      return
    }

    // valida con estado actual
    if (!validateForm(formData)) {
      toast.error(t('contact.form.toast.validationFailed'))
      return
    }

    setIsLoading(true)
    const payload = { ...formData } // lo que envía tu API

    let handled = false

    try {
      if (ENABLE_DEBUG)
        console.debug('handleSubmit: start', { isOffline, payload })

      // Si estamos offline, guardamos directo en la cola
      if (isOffline) {
        await addToQueue(payload, 'contact')
        handled = true
        // toast.info(t('contact.form.toast.offline') || 'Guardado en bandeja de salida (sin conexión).')
        clearForm()
        goToOutbox()
        return
      }

      // Envío normal
      const res = await axios.post(`${apiUrl}/api/contact`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000 // por si quieres controlar timeouts
      })

      if (ENABLE_DEBUG) console.debug('handleSubmit: response', res?.data)

      if (res.data?.ok) {
        // éxito
        toast.success(
          t('contact.form.toast.success.title') || 'Mensaje enviado'
        )
        clearForm()
        handled = true
        navigate('/success', { state: { success: true, from: 'contact' } })
        return
      }

      // respuesta 200 pero ok === false -> guardamos UNA vez en outbox
      await addToQueue(payload, 'contact')
      handled = true
      toast.warning(
        t('contact.form.toast.queue') ||
          '⚠️ No se pudo enviar el mensaje. Se guardó en la bandeja de salida y se enviará automáticamente cuando haya conexión.',
        { delay: 5000 }
      )
      clearForm()
      goToOutbox(5000)
    } catch (err) {
      // solo si aún no fue manejado, guardamos en outbox
      console.error('Contact submit error:', err)
      if (!handled) {
        try {
          await addToQueue(payload, 'contact')
          toast.warning(
            t('contact.form.toast.queue') ||
              '⚠️ No se pudo enviar el mensaje. Se guardó en la bandeja de salida y se enviará automáticamente cuando haya conexión.',
            { delay: 5000 }
          )
          clearForm()
          goToOutbox(5000)
        } catch (qErr) {
          console.error('Error guardando en outbox:', qErr)
          toast.error(
            t('contact.form.toast.queueFail') ||
              'Error interno. Intenta nuevamente.'
          )
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEO
        title={contact.pageTitle}
        description={contact.metaDescription}
        keywords={contact.metaKeywords}
        ogDescription={contact.metaDescription}
        ogTitle={contact.pageTitle}
      />
      <div className='bg-white py-5'>
        <div className='container d-flex justify-content-center flex-direction-column align-items-center'>
          <div className='mb-4'>
            <p className='fs-h3 my-0 text-center'>{t('contact.title')}</p>
            <p className='fs-medium mt-0 text-muted text-center max-wx-400'>
              {t('contact.subtitle')}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='contact-form d-flex flex-direction-column align-items-center'
            noValidate>
            <div className='d-flex flex-direction-column gap-2 mb-5 max-wx-500'>
              <div className='d-flex flex-1 gap-2 flex-direction-column flex-direction-md-row'>
                <Input
                  label={t('contact.form.name.label')}
                  placeholder={t('contact.form.name.placeholder')}
                  value={formData.nombre}
                  onChange={(val) => handleChange('nombre', val)}
                  onBlur={() =>
                    validateField('nombre', formData.nombre, formData)
                  }
                  onFocus={() => clearField('nombre')}
                  error={getField('nombre').message}
                  success={getField('nombre').state === 'success'}
                  required
                  className='w-100'
                />
                <Input
                  label={t('contact.form.lastName.label')}
                  placeholder={t('contact.form.lastName.placeholder')}
                  value={formData.apellido}
                  onChange={(val) => handleChange('apellido', val)}
                  onBlur={() =>
                    validateField('apellido', formData.apellido, formData)
                  }
                  onFocus={() => clearField('apellido')}
                  error={getField('apellido').message}
                  success={getField('apellido').state === 'success'}
                  required
                  className='w-100'
                />
              </div>

              <Input
                label={t('contact.form.email.label')}
                placeholder={t('contact.form.email.placeholder')}
                value={formData.email}
                onChange={(val) => handleChange('email', val)}
                onBlur={() => validateField('email', formData.email, formData)}
                onFocus={() => clearField('email')}
                error={getField('email').message}
                success={getField('email').state === 'success'}
                type='email'
                required
                className='w-100'
              />

              <PhoneNumber
                label={t('contact.form.phone.label')}
                value={formData.telefono}
                onChange={handlePhoneChange}
                onBlur={() =>
                  validateField('telefono', formData.telefono, formData)
                }
                onFocus={() => clearField('telefono')}
                error={getField('telefono').message}
                success={getField('telefono').state === 'success'}
                className='w-100'
              />

              <Input
                type='textarea'
                label={t('contact.form.message.label')}
                placeholder={t('contact.form.message.placeholder')}
                value={formData.mensaje}
                onChange={(val) => handleChange('mensaje', val)}
                onBlur={() =>
                  validateField('mensaje', formData.mensaje, formData)
                }
                onFocus={() => clearField('mensaje')}
                error={getField('mensaje').message}
                success={getField('mensaje').state === 'success'}
                rows={5}
                required
                minHeight={120}
              />
            </div>

            <Button
              type='submit'
              variant='primary'
              size='large'
              fullWidth
              disabled={isLoading}
              className='submit-button mt-5'>
              {isLoading ? (
                <>
                  <Icon name='spinner' animation='spin' />
                  {t('contact.form.sendingButton')}
                </>
              ) : (
                t('contact.form.submitButton')
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contact
