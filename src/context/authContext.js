import axios from 'axios'
import React, { createContext, useEffect, useState, useContext } from 'react'

const AuthContext = createContext({ user: undefined })

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const usuario = localStorage.getItem('token')
    if (typeof usuario !== 'undefined') {
      setUser(JSON.parse(usuario) || undefined)
    }
  }, [])

  const login = async credenciales => {
    if (!credenciales.email || !credenciales.password) throw new Error('Debe especificar el email y la contraseña.')

    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_API}auth/log-in`, credenciales)
        .then((res) => {
          const { data } = res
          if (typeof data !== 'undefined') {
            try {
              localStorage.setItem('token', JSON.stringify({ ...res }))
              setUser(res)
            } catch (error) {
              console.error('Token no válido')
            }
          }
          return res
        })
        .catch((err) => {
          throw new Error(err.response?.data?.message || 'Error en el servidor')
        })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const registro = async (datos) => {
    if (!datos.email || !datos.password) throw new Error('Debe especificar el email y la contraseña.')
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_BASE_API}auth/sign-up`, datos)
        .then(async (res) => await login({ email: datos.email, password: datos.password }))
        .catch((err) => { throw new Error(err.response?.data?.message || 'Error en el servidor') })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(undefined)
  }

  return <AuthContext.Provider value={{ user, login, registro, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return { ...context }
}
