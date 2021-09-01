import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { Text, PrimaryButton, TextField, Stack } from '@fluentui/react'
import { css } from '@emotion/css'

export const RegistroForm = () => {
  const { control, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const { registro } = useAuth()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    if (!isValid) return
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
        <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo nombre obligatorio', minLength: { value: 2, message: 'Al menos 2 dígitos' } }}
        render={({ field }) =>
              <TextField
            {...field} label="Nombre"
            autoComplete="given-name"
            errorMessage={errors.name?.message || ''}
                 />
            } />
        <Controller
        name="surname"
        control={control}
        defaultValue=""
        rules={{ required: 'Campo apellido obligatorio', minLength: { value: 2, message: 'Al menos 2 dígitos' } }}
        render={({ field }) =>
              <TextField
            {...field} label="Apellidos"
              autoComplete="family-name"
              errorMessage={errors.surname?.message || ''}
               />
            } />
          <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Campo email obligatorio', minLength: { value: 4, message: 'Al menos 4 dígitos' } }}
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
          rules={{ required: 'Campo password obligatorio', minLength: { value: 4, message: 'Al menos 4 dígitos' } }}
          render={({ field }) =>
              <TextField
            {...field} label="Password"
            autoComplete="new-password"
            errorMessage={errors.password?.message || ''}
            canRevealPassword
              type="password"
                minLength={1} />
            } />
          <Text block className={'error'}>{error}</Text>
          <PrimaryButton disabled={!isDirty || !isValid || isSubmitting} type="submit" text="Registro" />
        </Stack>

    </form>
  )
}
