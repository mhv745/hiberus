import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { Text, PrimaryButton, TextField, Stack } from '@fluentui/react'
import { css } from '@emotion/css'

export const LoginForn = () => {
  const { control, handleSubmit } = useForm()
  const { login } = useAuth()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setError('')
    try {
      await login(data)
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
          <Text variant="large">Login</Text>
        </Stack.Item>
          <Controller name="email" control={control} defaultValue="" rules={{ required: true, minLength: 4 }} render={({ field }) =>
              <TextField
            {...field} label="Email"
            autoComplete="email"
                minLength={1} />
            } />
          <Controller name="password" control={control} defaultValue="" rules={{ required: true, minLength: 4 }} render={({ field }) =>
              <TextField
              {...field} label="Password"
            type="password"
            autoComplete="current-password"
                minLength={1} />
            } />
          <Text block className={'error'}>{error}</Text>
          <PrimaryButton type="submit" text="Iniciar sesión" />
        </Stack>
      </form>
  )
}
