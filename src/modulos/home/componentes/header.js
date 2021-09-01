import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { css } from '@emotion/css'
import { ActionButton, Stack, Text } from '@fluentui/react'

export const Header = () => {
  const { logout } = useAuth()
  const { user } = useAuth()

  return <header className={css`
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 1rem;
    background-color: #ddd;
    align-items: center;
  `}>
      <Text variant="xLarge">Hiberus</Text>
      <Stack horizontal verticalAlign="center">
        <Text>Bienvenido { user.name}</Text>
        <ActionButton onClick={logout} >Cerrar sesión</ActionButton>
      </Stack>
    </header>
}
