import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Core } from './modulos/core/core'
import { AuthContextProvider } from './hooks/useAuth'
import { initializeIcons } from '@fluentui/react/lib/Icons'
import './index.css'

console.log('Programación Miguel Angel Hernández Von Hartmann')
console.log('contacto@hernandezmiguel.es - https://hernandezmiguel.es ')

initializeIcons()
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Core />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('hiberus')
)
reportWebVitals()
