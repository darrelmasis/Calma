import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'

const About = () => {
  usePageTitle('Nosotros')
  return (
    <div>
      <Header />
      <h1>Acerca de Calma</h1>
      <p>Descubre la experiencia de belleza y relajación que mereces.</p>
      <button onClick={() => alert('Próximamente podrás reservar tus citas aquí!')}>Reserva tu cita</button>
    </div>
  )
}
export default About
