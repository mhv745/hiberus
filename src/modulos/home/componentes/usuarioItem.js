import React, { useState } from 'react'
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
  const { handleSubmit, control, formState: { isValid, errors } } = useForm()
  const [error, setError] = useState()
  const { update } = useUsuarios()

  const onSubmit = async (data) => {
    if (!isValid) {
      setError(errors.first())
      return
    }
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
          <Controller name="name" control={control} defaultValue={usuario.name || ''} render={({ field }) =>
            <TextField
              {...field} label="Nombre"
              minLength={1} />
          } />
          <Controller name="surname" control={control} defaultValue={usuario.surname || ''} render={({ field }) =>
            <TextField
              {...field} label="Apellidos"
              minLength={1} />
          } />
          <Controller name="email" control={control} defaultValue={usuario.email || ''} render={({ field }) =>
            <TextField
              {...field} label="Email"
              minLength={1} />
          } />
          <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: '1rem', padding: '1rem 0 0' }}>
            <DefaultButton text="cancelar" onClick={() => setOpenModal(false)} />
          <PrimaryButton type="submit" text="Actualizar" />
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
