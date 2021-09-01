import React, { useState, useEffect } from 'react'
import { useUsuarios } from '../../../hooks/useUsuarios'
import { Text, Stack, IconButton, Modal, PrimaryButton, DefaultButton, TextField } from '@fluentui/react'
import { css } from '@emotion/css'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'

const marginBottom = { root: { margin: '0 0 1rem' } }

export const UsuarioItem = ({ usuario, onEditar, onEliminar }) => {
  return <Stack horizontal verticalAlign="center" tokens={{ childrenGap: '1rem', padding: '0 1rem' }} styles={{ root: { borderBottom: '1px solid #ccc' } }}>
    <Stack.Item><Text>{usuario.name} {usuario.surname}</Text></Stack.Item>
    <Stack.Item grow><a href={`mailto:${usuario.email}`} className={css`text-decoration: none;`}><Text>{usuario.email}</Text></a></Stack.Item>
    <BtnEditar onEditar={onEditar} usuario={usuario} />
    <BtnEliminar onEliminar={onEliminar} usuario={usuario} />
  </Stack>
}

export const BtnEditar = ({ usuario, onEditar }) => {
  const [openModal, setOpenModal] = useState(false)
  const { handleSubmit, control, reset, formState: { errors, isValid, isDirty, isSubmitting } } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: usuario.name || '',
      surname: usuario.surname || '',
      email: usuario.email || ''
    }
  })
  const [error, setError] = useState()
  const { update } = useUsuarios()

  useEffect(() => {
    if (openModal) {
      reset()
    }
  }, [openModal])

  const onSubmit = async (data) => {
    if (!isValid) return
    try {
      const newUser = await update(usuario.id, data)
      onEditar(usuario.id, newUser)
      setOpenModal(false)
    } catch (error) {
      setError(error.toString())
    }
  }

  return <>
    <IconButton onClick={() => setOpenModal(true)} iconProps={{ iconName: 'Edit' }} />
    {openModal && <Modal isOpen={openModal} onDismiss={() => setOpenModal(false)}>
      <Stack tokens={{ padding: '1rem' }}>
        <Text variant="xLarge">Editar usuario</Text>
        <Text>ID: {usuario.id}</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
          name="name"
          control={control}
          rules={{ required: 'Campo nombre obligatorio', minLength: { value: 2, message: 'Al menos 2 dígitos' } }}
          render={({ field }) =>
            <TextField
              {...field} label="Nombre"
              errorMessage={errors.name?.message || ''}
               />
          } />
          <Controller
          name="surname"
          control={control}
          rules={{ required: 'Campo apellido obligatorio', minLength: { value: 2, message: 'Al menos 2 dígitos' } }}
          render={({ field }) =>
            <TextField
              {...field} label="Apellidos"
              errorMessage={errors.surname?.message || ''}
               />
          } />
          <Controller
          name="email"
          control={control}
          rules={{ required: 'Campo email obligatorio', minLength: { value: 4, message: 'Al menos 4 dígitos' } }}
          render={({ field }) =>
            <TextField
              {...field} label="Email"
              errorMessage={errors.email?.message || ''}
               />
          } />
          <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: '1rem', padding: '1rem 0 0' }}>
            <DefaultButton text="cancelar" onClick={() => setOpenModal(false)} />
          <PrimaryButton disabled={!isDirty || !isValid || isSubmitting} type="submit" text="Actualizar" />
          </Stack>
          <p>{error}</p>
        </form>
      </Stack>
    </Modal>}
  </>
}

export const BtnEliminar = ({ usuario, onEliminar }) => {
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState()
  const { remove } = useUsuarios()

  const { user: yo, logout } = useAuth()

  const eliminar = async () => {
    try {
      const { id } = usuario
      await remove(id)
      if (yo.id === id) {
        logout()
        return
      }

      setOpenModal(false)
      onEliminar(id)
    } catch (error) {
      setError(error.toString())
    }
  }

  return <>
    <IconButton onClick={() => setOpenModal(true)} iconProps={{ iconName: 'Delete' }} />
    {openModal && <Modal isOpen={openModal} onDismiss={() => setOpenModal(false)}>
      <Stack tokens={{ padding: '1rem' }}>
        <Text variant="xLarge">Eliminar usuario</Text>
        <Text styles={marginBottom} variant="large">Está seguro que desea eliminar el siguiente usuario:</Text>
        <Text>ID: {usuario.id}</Text>
        <Text>Nombre y apellidos: {usuario.nombre} {usuario.surname}</Text>
        <Text>Email: {usuario.email}</Text>
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: '1rem', padding: '1rem 0 0' }}>
          <DefaultButton text="cancelar" onClick={() => setOpenModal(false)} />
          <PrimaryButton onClick={eliminar} type="submit" text="Eliminar" />
        </Stack>
        <p>{error}</p>
      </Stack>
    </Modal>}
  </>
}
