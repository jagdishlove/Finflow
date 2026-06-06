import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (username, password) => {
    if (username === 'user' && password === 'user') {
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, message: 'Invalid demo credentials.' }
  }

  const logout = () => setIsAuthenticated(false)

  const value = useMemo(() => ({
    isAuthenticated,
    login,
    logout,
  }), [isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
