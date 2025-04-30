// src/hooks/use-auth.js
import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/auth-context'

export function useAuth() {
  const context = useContext(AuthContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected routes
    if (!context.isLoading && !context.user) {
      const isProtectedRoute = pathname.startsWith('/dashboard')
      if (isProtectedRoute) {
        navigate('/login', { replace: true })
      }
    }

    // Redirect to dashboard if already authenticated and trying to access auth pages
    if (!context.isLoading && context.user) {
      const isAuthRoute = pathname === '/login' || pathname === '/signup'
      if (isAuthRoute) {
        navigate('/dashboard', { replace: true })
      }
    }
  }, [context.isLoading, context.user, pathname, navigate])

  return context
}
