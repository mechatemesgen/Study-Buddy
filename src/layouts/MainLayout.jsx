// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/NavBar/Navbar';
import { Footer } from '../components/Footer/Footer'
import Dashboard from '../pages/Dashboard';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
