import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { Text, PrimaryButton, TextField, Stack } from '@fluentui/react'
import { css } from '@emotion/css'

export const LoginForn = () => {
  const { control, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { login } = useAuth()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    if (!isValid) return
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
          <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'El campo email es obligatorio', minLength: { value: 4, message: 'Al menos 4 dígitos' } }}
          render={({ field }) =>
              <TextField
            {...field} label="Email"
            errorMessage={errors.email?.message || ''}
            autoComplete="email"
                />
            } />
          <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo password es obligatorio', minLength: { value: 4, message: 'Al menos 4 dígitos' } }}
          render={({ field }) =>
              <TextField
              {...field} label="Password"
            type="password"
            errorMessage={errors.password?.message || ''}
            canRevealPassword
            autoComplete="current-password"
                />
            } />
          <Text block className={'error'}>{error}</Text>
          <PrimaryButton disabled={!isDirty || !isValid || isSubmitting} type="submit" text="Iniciar sesión" />
        </Stack>
      </form>
  )
}
