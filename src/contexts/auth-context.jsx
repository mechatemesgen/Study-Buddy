import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin, signup as apiSignup, refreshToken } from '../api/auth'

export const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          setUser(JSON.parse(stored))
        } else {
          const data = await refreshToken()
          if (data.user) {
            setUser(data.user)
            localStorage.setItem('user', JSON.stringify(data.user))
          }
        }
      } catch {
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    setIsLoading(true)
    try {
      const data = await apiLogin(credentials)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (details) => {
    setIsLoading(true)
    try {
      const data = await apiSignup(details)
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/', { replace: true })
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within <AuthProvider>')
  }
  return context
}
