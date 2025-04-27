import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'

const Booking = () => {
  usePageTitle('Citas')
  return (
    <div>
      <Header />
      <h1>Agenda tu cita</h1>
      <p>Descubre la experiencia de belleza y relajación que mereces.</p>
      <button onClick={() => alert('Próximamente podrás reservar tus citas aquí!')}>Reserva tu cita</button>
    </div>
  )
}
export default Booking
