import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { api, clearToken, getToken, setToken } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [bootstrapping, setBootstrapping] = useState(!!getToken())

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setToken(data.token)
    setUser(data.user)
    return data.user
  }, [])

  const refreshMe = useCallback(async () => {
    if (!getToken()) {
      setBootstrapping(false)
      return
    }
    try {
      const me = await api('/auth/me')
      if (me.role !== 'admin') {
        clearToken()
        setUser(null)
      } else {
        setUser(me)
      }
    } catch {
      clearToken()
      setUser(null)
    } finally {
      setBootstrapping(false)
    }
  }, [])

  React.useEffect(() => {
    refreshMe()
  }, [refreshMe])

  const value = useMemo(
    () => ({
      user,
      bootstrapping,
      login,
      logout,
      isAuthenticated: !!user && user.role === 'admin',
    }),
    [user, bootstrapping, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
