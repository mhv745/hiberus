import React from 'react'
import { useAuth } from '../../context/authContext'
import { Auth } from '../auth/auth'

export const Core = () => {
  const { user } = useAuth()

  if (user) {
    return <p>Logueado</p>
  }
  return <Auth />
}
