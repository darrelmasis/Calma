import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/styles.scss'
import { LanguageProvider } from './i18n/LanguageContext'
import { SelectedServicesProvider } from './hooks/useSelectedService'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <LanguageProvider>
        <SelectedServicesProvider>
          <App />
        </SelectedServicesProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)
