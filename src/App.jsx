import React from 'react'
//import { AuthProvider } from './context/AuthContext' // Adjust the import path as necessary
import { AuthProvider } from './contexts/auth-context'
import AppRoutes from './routes/AppRoutes'


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
