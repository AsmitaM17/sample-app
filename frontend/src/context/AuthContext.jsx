import { createContext, useState, useContext, useEffect } from 'react'
import { authApi } from '../api/authApi'
import { setToken, getToken, setUser, getUser, clearAuth } from '../utils/storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = getToken()
    const user = getUser()
    
    if (token && user) {
      setAdmin(user)
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const data = await authApi.login(username, password)
      
      // Store token and user info
      setToken(data.token)
      const adminUser = { username: data.username }
      setUser(adminUser)
      setAdmin(adminUser)
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      return { success: false, message }
    }
  }

  const logout = () => {
    clearAuth()
    setAdmin(null)
  }

  const isAuthenticated = () => {
    return !!admin && !!getToken()
  }

  const value = {
    admin,
    login,
    logout,
    isAuthenticated,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
