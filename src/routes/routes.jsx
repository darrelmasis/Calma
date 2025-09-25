import { Routes, Route, Navigate } from 'react-router-dom'
import { Booking, Story, Home, NotFound, Packages, Services, Team, Empty, Success} from '../pages/Index'
import ScrollTop from '../components/commons/ScrollTop'
import { ScrollToHash } from '../utils/Scrollhash'
const AppRoutes = () => {

  return (
    <>
      <ScrollTop />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/story" element={<Story />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/team" element={<Team />} />
        <Route path="/empty" element={<Empty />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRoutes
