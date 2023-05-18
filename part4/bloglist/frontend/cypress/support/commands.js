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

Cypress.Commands.add("login", (credentials) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, credentials).then(
    (response) => {
      localStorage.setItem("loggedin_user", JSON.stringify(response.body))
      cy.visit("http://localhost:3000")
    }
  )
})

Cypress.Commands.add(
  "createBlog",
  ({ blog, withDifferentUser: withDifferentUser }) => {
    if (withDifferentUser) {
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
        username: "tester2",
        password: "password",
        name: "Tester Two",
      }).then(() => {
        return cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
          username: "tester2",
          password: "password",
        })
      }).then(response => {
        cy.request({
          method: "POST",
          url: `${Cypress.env("BACKEND")}/blogs`,
          body: blog,
          headers: { Authorization: "Bearer " + response.body.token },
        })
      })
    } else {
      const userString = localStorage.getItem("loggedin_user")
      const user = JSON.parse(userString)
      cy.request({
        method: "POST",
        url: `${Cypress.env("BACKEND")}/blogs`,
        body: blog,
        headers: { Authorization: "Bearer " + user.token },
      })
    }
  }
)
