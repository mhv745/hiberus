import React from 'react'
import { LoginForn } from './componentes/loginForm'
import { RegistroForm } from './componentes/registroForm'
import { Stack, Text } from '@fluentui/react'
import { css } from '@emotion/css'
import { useLocation, Link } from 'react-router-dom'

export const Auth = () => {
  // const [loginPage, setLoginPage] = useState(true)

  const { pathname } = useLocation()
  // useEffect(() => {
  //   if (pathname === '/register') {
  //     setLoginPage(false)
  //   }
  // }, [pathname])

  console.log(pathname)
  const isLoginPage = !pathname.includes('/register')

  // const toggle = () => setLoginPage(!loginPage)

  const enlace = isLoginPage
    ? <Text>No tengo cuenta, <Link to="/register">quiero registrarme</Link></Text>
    : <Text>Ya tengo cuenta, <Link to="/login">iniciar sesión</Link></Text>

  return (
    <div className={css`height: 100vh;`}>
      <Stack verticalFill verticalAlign="space-evenly" horizontalAlign="center">
        <Text variant="xxLargePlus">Bienvenido a Hiberus</Text>
        <Stack verticalAlign="center" className={css`min-height: 400px;`}>
          {isLoginPage ? <LoginForn /> : <RegistroForm />}
          </Stack>
        {enlace}
      </Stack>
    </div>
  )
}
