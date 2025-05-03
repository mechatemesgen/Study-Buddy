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
import GroupsPage from "../pages/dashboard/groups/GroupsPage";
import SessionsPage from "../pages/dashboard/sessions/SessionsPage";
import ResourcesPage from "../pages/dashboard/resources/ResourcesPage";
import ProfilePage from "../pages/dashboard/profile/ProfilePage";
import SettingsPage from "../pages/dashboard/settings/SettingsPage";

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
        <Route path="groups" element={<GroupsPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* catch-all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
