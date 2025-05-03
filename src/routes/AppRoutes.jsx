import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import Dashboard from '../pages/dashboard/Dashboard'
import PageNotFound from '../pages/PageNotFound'
import { useAuth } from '../hooks/use-auth'
import ContactUs from '@/pages/ContactUs'

export default function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* public site under MainLayout (with Navbar + Footer) */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>

      {/* protected dashboard (no Navbar/Footer) */}
      <Route
        path="dashboard/*"
        element={
          user
            ? <DashboardLayout />
            : <Navigate replace to="/login" />
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* catch-all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
