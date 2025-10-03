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
import { createHead, UnheadProvider } from '@unhead/react/client'
import { useLocation } from 'react-router-dom'
import Waiting from './pages/screens/Waiting'
import { hasCountdownFinished } from './utils/countdown'
import { Navigate } from 'react-router-dom'

const apiUrl =
  import.meta.env.VITE_ENV === 'development'
    ? import.meta.env.VITE_API_DEV_URL
    : import.meta.env.VITE_API_PROD_URL

let updateSW = registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new Event('pwaUpdateAvailable'))
  },
  onOfflineReady() {
    console.log('✅ Listo para usar offline')
  }
})

const head = createHead()

const RootWrapper = () => {
  const location = useLocation()
  const showHeaderFooter = location.pathname !== '/waiting'

  return (
    <LanguageProvider>
      {!hasCountdownFinished() ? (
        location.pathname !== '/' && location.pathname !== '/waiting' ? (
          <Navigate to='/waiting' replace />
        ) : (
          <Waiting />
        )
      ) : (
        <>
          <Confetti confettiCount={50} speed={3} maxSize={12} shape='square' />
          <Toaster containerStyle={{ bottom: 116, right: 24, zIndex: 9 }} />
          <OutboxProvider apiUrl={apiUrl}>
            <PWAInstallProvider apiUrl={apiUrl}>
              <SelectedServicesProvider>
                {showHeaderFooter && <Header />}
                <App updateSW={updateSW} />
                {showHeaderFooter && <Footer />}
              </SelectedServicesProvider>
            </PWAInstallProvider>
          </OutboxProvider>
        </>
      )}
    </LanguageProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter basename='/'>
        <RootWrapper />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>
)
