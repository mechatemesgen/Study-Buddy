import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div>
      {/* You can add the sidebar, navbar, etc., for the dashboard layout here */}
      <h1>Dashboard Layout</h1>
      <Outlet /> {/* This will render the Dashboard component */}
    </div>
  )
}
