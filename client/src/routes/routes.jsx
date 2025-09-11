import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Booking, History, Home, NotFound, Packages, Services, Privacy } from '../pages/Index'
import ScrollTop from '../components/commons/ScrollTop'

const AppRoutes = () => {
  return (
    <Router basename="/">
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/home" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
