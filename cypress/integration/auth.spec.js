/* global cy */

const url = 'http://localhost:3000'

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit(`${url}/logout`)
  })

  it('Cualquier ruta redirige a login', () => {
    cy.visit(`${url}/miguel`)
    cy.contains('Login')
  })
  it('Enlace a registro', () => {
    cy.visit(`${url}/register`)
    cy.contains('Registro')
  })
  describe('Registro, Login, Logout', () => {
    it('Registrar un usuario', () => {
      cy.visit(`${url}/register`)
      cy.get('input[name=name]').type('Miguel Angel')
      cy.get('input[name=surname]').type('Hernández Von Hartmann')
      cy.get('input[name=email]').type('miguelcypress@hernandezmiguel.es')
      cy.get('input[name=password]').type('miguel')
      cy.get('form').submit()
      cy.contains('Bienvenido Miguel Angel')
    })

    it('Iniciar sesion', () => {
      cy.visit(`${url}`)
      cy.get('input[name=email]').type('miguelcypress@hernandezmiguel.es')
      cy.get('input[name=password]').type('miguel')
      cy.get('form').submit()
      cy.contains('Bienvenido Miguel Angel')
      cy.contains('Cerrar sesión').click()
      cy.contains('Login')
    })

    it('Eliminar un usuario', () => {
      cy.visit(`${url}/login`)
      cy.get('input[name=email]').type('miguelcypress@hernandezmiguel.es')
      cy.get('input[name=password]').type('miguel')
      cy.get('form').submit()
      cy.get('input[placeholder=Buscar]').type('Hernández Von Hartmann')
      cy.contains('miguelcypress@hernandezmiguel.es')
      cy.get('i[data-icon-name=Delete]').click()
      cy.get('.ms-Button--primary').click()
      cy.visit(`${url}/logout`)
    })
  })
})
