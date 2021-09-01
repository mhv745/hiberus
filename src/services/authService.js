import axios from 'axios'
import https from 'https'

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

export const login = async credenciales => {
  if (!credenciales.email || !credenciales.password) throw new Error('Debe especificar el email y la contraseña.')

  try {
    const response = await instance
      .post(`${process.env.REACT_APP_BASE_API}auth/log-in`, credenciales)
      .then((res) => {
        const { data } = res
        if (typeof data !== 'undefined') {
          localStorage.setItem('token', JSON.stringify({ ...data }))
        } else {
          localStorage.removeItem('token')
        }
        return data
      })
      .catch((err) => {
        throw new Error(err.response?.data?.message || 'Error en el servidor')
      })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const registro = async (datos) => {
  if (!datos.email || !datos.password) throw new Error('Debe especificar el email y la contraseña.')
  try {
    const response = await instance
      .post(`${process.env.REACT_APP_BASE_API}auth/sign-up`, datos)
      .then(async (res) => await login({ email: datos.email, password: datos.password }))
      .catch((err) => { throw new Error(err.response?.data?.message || 'Error en el servidor') })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}
