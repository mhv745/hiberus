import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../context/authContext'

export const RegistroForm = () => {
  const { register, handleSubmit } = useForm()
  const { registro } = useAuth()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    console.log(data)
    setError('')
    try {
      await registro(data)
    } catch (error) {
      setError(error.toString())
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="email">Email</label>
      <input defaultValue="" {...register('email', { required: true, minLength: 4 })} />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" {...register('password', { required: true, minLength: 4 })} />
    </div>
    <div>
      <label htmlFor="name">Nombre</label>
      <input defaultValue="" {...register('name', { required: true })} />
    </div>
    <div>
      <label htmlFor="surname">Apellidos</label>
      <input defaultValue="" {...register('surname', { required: true })} />
    </div>
    <p className="error">{error}</p>
    <input type="submit" value="Registro" />
    </form>
}
