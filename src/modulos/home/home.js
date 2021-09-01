import React from 'react'
import { ListaUsuarios } from './componentes/listaUsuarios'
import { Header } from './componentes/header'
import { css } from '@emotion/css'
import { Text } from '@fluentui/react'

export const Home = () => {
  return <div>
        <Header />
        <main className={css`padding: 1rem; max-width: 1000px; margin: 0 auto;`}>
          <Text block variant="xxLargePlus" styles={{ root: { textAlign: 'center' } }}>¡Bienvenido!</Text>
          <ListaUsuarios />
        </main>

    </div>
}
