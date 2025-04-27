import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'

const Home = () => {
  usePageTitle('Inicio')
  return (
    <div>
      <Header />
      <div className="container text-center">
        <h1>Bienvenido a Calma</h1>
        <p>Descubre la experiencia de belleza y relajación que mereces.</p>
        <button onClick={() => alert('Próximamente podrás reservar tus citas aquí!')}>Reserva tu cita</button>
      </div>
    </div>
  )
}
export default Home
