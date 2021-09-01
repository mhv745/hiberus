import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useUsuarios } from '../../../hooks/useUsuarios'
import { DetailsList, Text, Stack, SelectionMode, FocusZone, SearchBox } from '@fluentui/react'
import { css } from '@emotion/css'
import { BtnEditar, BtnEliminar } from './usuarioItem'

/**
 * TODO: Crear un Context para no pasar onEditar y onEliminar hacia abajo
 */
export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [filtro, setFiltro] = useState('')

  const { get } = useUsuarios()

  const recibirUsuarios = useCallback(
    async () => {
      try {
        const datos = await get()
        setUsuarios(datos.items)
      } catch (error) {
        setUsuarios([])
      }
    },
    []
  )

  useEffect(() => {
    recibirUsuarios()
  }, [recibirUsuarios])

  useEffect(() => {
    setFiltrados(usuarios.filter((u) => {
      const text = filtro?.toLowerCase()
      const name = u.name?.toLowerCase() || ''
      const surname = u.surname?.toLowerCase() || ''
      const email = u.email?.toLowerCase() || ''
      return name.includes(text) ||
        surname.includes(text) ||
        email.includes(text)
    }))
  }, [filtro, usuarios])

  const onEditar = (id, usuario) => {
    setUsuarios(usuarios.map(u => (u.id === id) ? usuario : u))
  }

  const onEliminar = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id))
  }

  const columnas = useMemo(() => [
    {
      key: 'name',
      name: 'Nombre',
      ariaLabel: 'Nombre',
      isResizable: true,
      isRowHeader: true,
      minWidth: 100,
      maxWidth: 200,
      isPadded: true,
      onRender: (item) => `${item.name} ${item.surname}`
    },
    {
      key: 'email',
      fieldName: 'email',
      name: 'Email',
      ariaLabel: 'Email',
      isResizable: true,
      minWidth: 100,
      isPadded: true
    },
    {
      key: 'actions',
      name: 'Acciones',
      ariaLabel: 'Serie',
      minWidth: 100,
      maxWidth: 100,
      onRender: (item) => <Stack horizontal>
          <BtnEditar onEditar={onEditar} usuario={item} />
          <BtnEliminar onEliminar={onEliminar} usuario={item} />
      </Stack>
    }
  ], [filtrados])

  return (
    <div>
      <Text variant="xLarge">Listado de usuarios </Text>
      <SearchBox placeholder="Buscar" onChange={(ev, text) => setFiltro(text || '')} value={filtro} styles={{ root: { margin: '1rem 0' } }} />
      <div className={css`
        max-height: 500px;
        overflow: auto;
        border: 1px solid #ccc;
      `}>
        <FocusZone>
          <DetailsList items={filtrados} columns={columnas} selectionMode={SelectionMode.none} compact={true} />
        </FocusZone>
      </div>
      <Text variant="medium">Mostrando {filtrados.length} de { usuarios.length }</Text>
    </div>
  )
}
