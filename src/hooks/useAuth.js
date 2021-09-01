import React, { createContext, useEffect, useState, useContext } from 'react'
import * as authService from '../services/authService'
import * as userService from '../services/userService'

const AuthContext = createContext({ token: undefined })

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    const usuario = localStorage.getItem('token')
    if (typeof usuario !== 'undefined') {
      setToken(JSON.parse(usuario) || undefined)
    }
  }, [])

  useEffect(() => {
    if (typeof token !== 'undefined') {
      try {
        userService.me(token).then((usuario) => {
          setUser(usuario)
          setLoading(false)
        })
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    } else {
      setUser(undefined)
      setLoading(false)
    }
  }, [token])

  const login = async credenciales => {
    try {
      const token = await authService.login(credenciales)
      setToken(token)
    } catch (error) {
      setToken(undefined)
      throw error
    }
  }

  const registro = async (datos) => {
    try {
      const data = await authService.registro(datos)
      setToken(data)
    } catch (error) {
      setToken(undefined)
      throw error
    }
  }

  const logout = async () => {
    authService.logout()
    setToken(undefined)
  }

  return <AuthContext.Provider value={{ token, user, login, registro, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return { ...context }
}
