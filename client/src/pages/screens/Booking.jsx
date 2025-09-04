import { useState } from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FloatingButton from '../../components/commons/FloatingButton'
import { FadeInWhenVisible as Fade } from '../../components/commons/animations/FadeInWhenVisible'
import { useLang } from '../../i18n/LanguageContext'
import { Input } from '../../components/forms/Input'
import { Select } from '../../components/forms/Select'
import { Textarea } from '../../components/forms/Textarea'
import axios from 'axios'

const Booking = () => {
  const { t } = useLang()
  usePageTitle('Agendar Cita')

  // Categorías para el select
  const categories = t('services.section_1.category', { returnObjects: true })
  const options = [
    { value: '', label: 'Selecciona una categoría', disabled: true },
    ...Object.entries(categories).map(([key, category]) => ({
      value: key,
      label: category.name
    }))
  ]

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})

  // Manejar cambios
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Manejar envío
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name) newErrors.name = 'El nombre es obligatorio'
    if (!formData.phone) newErrors.phone = 'El teléfono es obligatorio'
    if (!formData.date) newErrors.date = 'Selecciona una fecha'
    if (!formData.time) newErrors.time = 'Selecciona una hora'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post('/api/booking/send-mail', formData)

        if (res.data.ok) {
          alert('Reserva enviada con éxito ✅')
          setFormData({
            name: '',
            phone: '',
            email: '',
            service: '',
            date: '',
            time: '',
            notes: ''
          })
        } else {
          alert('Error al enviar la reserva')
        }
      } catch (err) {
        console.error(err)
        alert('Error al enviar la reserva, inténtalo de nuevo')
      }
    }
  }


  return (
    <div>
      <FloatingButton />
      <Header />

      <section className="py-4 body-bg">
        <div className="container">
          <div className="grid">
            <div className="grid-row">
              <div className="grid-col-12 d-flex flex-direction-column align-items-center justify-content-center">
                <Fade>
                  <h1 className="fs-4 text-primary text-center">Agenda tu cita</h1>
                  <p className="text-center text-muted mw-500">Reserva con nosotros ahora</p>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="container d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="booking-form d-flex flex-direction-column gap-1">

            <div className="form-group">
              <Input
                type="text"
                label="Nombre Completo"
                value={formData.name}
                onChange={val => handleChange('name', val)}
                placeholder="Anaís Marenco Gonzáles"
                error={errors.name}
              />

              <Input
                type="tel"
                label="Número de teléfono"
                value={formData.phone}
                autoComplete='false'
                onChange={val => handleChange('phone', val)}
                placeholder="e.g. +505 8327 5144"
                error={errors.phone}
              />
            </div>

            <Input
              type="email"
              label='Correo Electrónico'
              value={formData.email}
              onChange={val => handleChange('email', val)}
              placeholder="Correo Electrónico"
              error={errors.email}
            />

            <Select
              options={options}
              label='Categoría'
              value={formData.service}
              onChange={val => handleChange('service', val)}
              className='w-100'
            />

            <div className="form-group">
              <Input
                type="date"
                label="Fecha"
                value={formData.date}
                onChange={val => handleChange('date', val)}
                placeholder="Fecha"
                error={errors.date}
              />

              <Input
                type="time"
                label="Hora"
                value={formData.time}
                onChange={val => handleChange('time', val)}
                placeholder="Hora"
                error={errors.time}
              />
            </div>

            <Textarea
              value={formData.notes}
              onChange={val => handleChange('notes', val)}
              placeholder="Escribe un mensaje"
            />

            <button type="submit" className="btn btn-primary mt-3">Enviar Reserva</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Booking
