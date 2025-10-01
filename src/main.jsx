import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/styles.scss'
import { LanguageProvider } from './i18n/LanguageContext'
import { SelectedServicesProvider } from './hooks/useSelectedService'
import { PWAInstallProvider } from './hooks/usePWAInstall.jsx'
import { Confetti } from './components/commons/Confetti.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import { Toaster } from 'react-hot-toast'
import { registerSW } from 'virtual:pwa-register'
import { OutboxProvider } from './context/OutboxContent.jsx'

const apiUrl = import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_DEV_URL : import.meta.env.VITE_API_PROD_URL

let updateSW

// registro del SW
updateSW = registerSW({
  onNeedRefresh() {
    console.log('⚡ Nueva versión disponible')
    // aquí puedes disparar un estado global o event bus para mostrar tu banner
    window.dispatchEvent(new Event('pwaUpdateAvailable'))
  },
  onOfflineReady() {
    console.log('✅ Listo para usar offline')
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <LanguageProvider>
        <Confetti confettiCount={50} speed={3} maxSize={12} shape='square' />
        <Toaster containerStyle={{ bottom: 116, right: 24, zIndex: 9 }} />
        <OutboxProvider apiUrl={apiUrl}>
          <PWAInstallProvider apiUrl={apiUrl}>
            <SelectedServicesProvider>
              <Header />
              <App updateSW={updateSW} />
              <Footer />
            </SelectedServicesProvider>
          </PWAInstallProvider>
        </OutboxProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)
