import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Booking, Contact, History, Home, NotFound, Packages, Services, Privacy } from '../pages/Index'

const AppRoutes = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
