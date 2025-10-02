import { Routes, Route, Navigate } from 'react-router-dom'
import {
  Booking,
  Story,
  Home,
  NotFound,
  Contact,
  Packages,
  Services,
  Team,
  Empty,
  Success,
  Outbox
} from '../pages/Index'
import ScrollTop from '../components/commons/ScrollTop'
import { ScrollToHash } from '../utils/Scrollhash'
import Waiting from '../pages/screens/Waiting'
import { hasCountdownFinished } from '../utils/Countdown'

const ProtectedRoute = ({ children }) => {
  if (!hasCountdownFinished()) {
    return <Navigate to='/waiting' replace />
  }
  return children
}

const AppRoutes = () => {
  return (
    <>
      <ScrollTop />
      <ScrollToHash />
      <Routes>
        <Route path='/waiting' element={<Waiting />} />
        {/* Rutas protegidas */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path='/home' element={<Navigate to='/' replace />} />
        <Route
          path='/story'
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        <Route
          path='/packages'
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />
        <Route
          path='/services'
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path='/booking'
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path='/contact'
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path='/team'
          element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          }
        />
        <Route
          path='/empty'
          element={
            <ProtectedRoute>
              <Empty />
            </ProtectedRoute>
          }
        />
        <Route
          path='/success'
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path='/outbox'
          element={
            <ProtectedRoute>
              <Outbox />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRoutes
