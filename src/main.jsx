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
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <LanguageProvider>
        <Confetti confettiCount={50} speed={3} maxSize={12} shape='square' />
        <Toaster containerStyle={{ bottom: 116, right: 24, zIndex: 9 }} />
        <PWAInstallProvider>
          <SelectedServicesProvider>
            <Header />
            <App />
            <Footer />
          </SelectedServicesProvider>
        </PWAInstallProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
)
