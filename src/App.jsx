import React from 'react'
//import { AuthProvider } from './context/AuthContext' // Adjust the import path as necessary
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from "./hooks/use-auth";


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
