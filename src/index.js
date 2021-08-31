import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { Core } from './modulos/core/core'
import { AuthContextProvider } from './context/authContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <Core />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('hiberus')
)
reportWebVitals()
