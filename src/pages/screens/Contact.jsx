import { useState } from 'react'
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

const Contact = () => {
  const { t } = useLang()
  const { validateForm, validateField, getField, clearField } = useContactValidation()
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

  const environment = import.meta.env.VITE_ENV
  const apiUrl = environment === 'development' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Validación en tiempo real
    setTimeout(() => validateField(field, value, formData), 300)
  }

  const handlePhoneChange = (valObj) => {
    setFormData((prev) => ({
      ...prev,
      telefono: valObj?.formatted || '',
      prefix: valObj?.prefix || '+505'
    }))
    setTimeout(() => validateField('telefono', valObj?.formatted || '', formData), 500)
  }

  const clearForm = () => {
    // Limpiar formulario
    setFormData({
      nombre: '',
      apellido: '',
      telefono: '',
      prefix: '+505',
      email: '',
      mensaje: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm(formData)) {
      toast.error(t('contact.form.toast.validationFailed'))
      return
    }

    setIsLoading(true)
    const payload = { ...formData }

    try {
      if (isOffline) {
        await addToQueue(payload, 'contact')
        // toast.warning('⚠️ Sin conexión. Tu mensaje se guardó en la bandeja de salida y se enviará automáticamente cuando haya conexión.')
        clearForm()
        setTimeout(() => {
          navigate('/outbox', { state: { waiting: true, from: 'contact' } })
        }, 3000)
      } else {
        const res = await axios.post(`${apiUrl}/api/contact`, payload, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (res.data.ok) {
          toast.success(t('contact.form.toast.success.title'))
          navigate('/success', { state: { success: true, from: 'contact' } })
        } else {
          throw new Error(res.data.message || 'Error al enviar mensaje')
        }
      }

      // Limpiar formulario
      clearForm()
    } catch (err) {
      console.error(err)
      await addToQueue(payload, 'contact')
      toast.warning(
        '⚠️ No se pudo enviar el mensaje. Se guardó en la bandeja de salida y se enviará automáticamente cuando haya conexión.',
        { delay: 5000 }
      )
      clearForm()
      setTimeout(() => {
        navigate('/outbox', { state: { waiting: true, from: 'contact' } })
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='bg-white py-5'>
      <div className='container d-flex justify-content-center flex-direction-column align-items-center'>
        <div className='mb-4'>
          <p className='fs-h3 my-0 text-center'>{t('contact.title')}</p>
          <p className='fs-medium mt-0 text-muted text-center max-wx-400'>{t('contact.subtitle')}</p>
        </div>
        <form onSubmit={handleSubmit} className='contact-form d-flex flex-direction-column align-items-center' noValidate>
          <div className='d-flex flex-direction-column gap-2 mb-5 max-wx-500'>
            <div className='d-flex flex-1 gap-2 flex-direction-column flex-direction-md-row'>
              <Input
                label={t('contact.form.name.label')}
                placeholder={t('contact.form.name.placeholder')}
                value={formData.nombre}
                onChange={(val) => handleChange('nombre', val)}
                onBlur={() => validateField('nombre', formData.nombre, formData)}
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
                onBlur={() => validateField('apellido', formData.apellido, formData)}
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
              onBlur={() => validateField('telefono', formData.telefono, formData)}
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
              onBlur={() => validateField('mensaje', formData.mensaje, formData)}
              onFocus={() => clearField('mensaje')}
              error={getField('mensaje').message}
              success={getField('mensaje').state === 'success'}
              rows={5}
              required
              minHeight={120}
            />
          </div>

          <Button type='submit' variant='primary' size='large' fullWidth disabled={isLoading} className='submit-button mt-5'>
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
  )
}

export default Contact
