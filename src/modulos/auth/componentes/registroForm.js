import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { Text, PrimaryButton, TextField, Stack } from '@fluentui/react'
import { css } from '@emotion/css'

export const RegistroForm = () => {
  const { control, handleSubmit } = useForm()
  const { registro } = useAuth()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setError('')
    try {
      await registro(data)
    } catch (error) {
      setError(error.toString())
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className={css`
        width: 300px;
        border: 1px solid #ddd;
        padding: 2rem;
        border-radius: 5px;
        `} tokens={{ childrenGap: '0.5rem' }}>
        <Stack.Item align="center">
          <Text variant="large">Registro</Text>
        </Stack.Item>
        <Controller name="name" control={control} defaultValue="" render={({ field }) =>
              <TextField
            {...field} label="Nombre"
            autoComplete="given-name"
                minLength={1} />
            } />
        <Controller name="surname" control={control} defaultValue="" render={({ field }) =>
              <TextField
            {...field} label="Apellidos"
              autoComplete="family-name"
              minLength={1} />
            } />
          <Controller name="email" control={control} defaultValue="" render={({ field }) =>
              <TextField
            {...field} label="Email"
            autoComplete="new-password"
                minLength={1} />
            } />
          <Controller name="password" control={control} defaultValue="" render={({ field }) =>
              <TextField
            {...field} label="Password"
            autoComplete="email"
              type="password"
                minLength={1} />
            } />
          <Text block className={'error'}>{error}</Text>
          <PrimaryButton type="submit" text="Registro" />
        </Stack>

    </form>
  )
}
