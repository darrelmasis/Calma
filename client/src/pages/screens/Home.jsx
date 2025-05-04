import React from 'react'
import { usePageTitle } from '@utils/utils'
import Header from '../../components/layout/Header'
import { Button } from '../../components/common/Button'
import { Icon } from '../../components/common/Icons'

const Home = () => {
  usePageTitle('Inicio')
  return (
    <div>
      <Header />
      <div className="container text-center">
        <h1>Bienvenido a Calma</h1>
        <p>Descubre la experiencia de belleza y relajación que mereces.</p>
        <div className="d-flex align-items-center">
          <Button variant="secondary" size="small" icon="calendar-check" label="Botón" classes="me-2" />
          <Button variant="secondary" size="small" icon="calendar-check" classes="me-2" />
          <Button variant="secondary" size="medium" icon="calendar-check" label="Botón" classes="me-2" />
          <Button variant="secondary" size="medium" icon="calendar-check" classes="me-2" />
          <Button variant="secondary" size="large" icon="calendar-check" label="Botón" classes="me-2" />
          <Button variant="secondary" size="large" icon="calendar-check" classes="me-2" />
        </div>
      </div>
    </div>
  )
}
export default Home
