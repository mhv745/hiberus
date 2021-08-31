import React, { useState } from 'react'
import { LoginForn } from './componentes/loginForm'
import { RegistroForm } from './componentes/registroForm'

export const Auth = () => {
  const [loginPage, setloginPage] = useState(true)

  const toggle = () => setloginPage(!loginPage)

  const enlace = <button onClick={toggle}>{ loginPage ? 'No tengo una cuenta, deseo registrarme' : 'Ya tengo cuenta, iniciar sesión'}</button>

  return <div>
        <h1>Bienvenido a Hiberus</h1>
        {loginPage ? <LoginForn /> : <RegistroForm />}
        {enlace}
    </div>
}
