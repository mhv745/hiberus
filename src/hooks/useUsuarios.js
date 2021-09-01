import * as userService from '../services/userService'
import { useAuth } from './useAuth'

export const useUsuarios = () => {
  const { token } = useAuth()

  const get = async (id) => {
    try {
      return (typeof id === 'undefined') ? userService.getAll(token) : userService.get(token, id)
    } catch (error) {
      console.error('Error obteniendo datos de usuario: ', error)
      throw error
    }
  }

  const update = (id, data) => {
    if (typeof data === 'undefined' || typeof id === 'undefined') throw new Error('Usuario no encontrado')
    try {
      return userService.update(token, id, data)
    } catch (error) {
      console.error('Error actualizando datos de usuario: ', error)
      throw error
    }
  }

  const remove = (id) => {
    if (typeof id === 'undefined') throw new Error('Usuario no encontrado')
    try {
      return userService.remove(token, id)
    } catch (error) {
      console.error('Error eliminando usuario: ', error)
      throw error
    }
  }

  return { get, update, remove }
}
