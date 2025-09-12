import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Booking, History, Home, NotFound, Packages, Services } from '../pages/Index'
import ScrollTop from '../components/commons/ScrollTop'

const AppRoutes = () => {

  return (
    <Router basename="/">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/history" element={<History />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
