// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const KEY_USER = "loggedin_user"

const createUser = (newUser) => {
  cy.request("POST", "http://localhost:3001/api/users", newUser)
}

const logout = () => {
  localStorage.removeItem(KEY_USER)
}

const login = (credentials) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, credentials).then(
    (response) => {
      localStorage.setItem(KEY_USER, JSON.stringify(response.body))
      cy.visit("http://localhost:3000")
    }
  )
}

const createBlog = (blog) => {
  const userString = localStorage.getItem("loggedin_user")
  const user = JSON.parse(userString)
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: blog,
    headers: { Authorization: "Bearer " + user.token },
  })
}

Cypress.Commands.addAll({ createUser, login, logout, createBlog })
