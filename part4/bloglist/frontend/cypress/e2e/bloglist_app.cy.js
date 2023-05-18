describe("Bloglist app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      username: "tester",
      password: "sekret",
      name: "Tester One",
    }
    cy.request("POST", "http://localhost:3001/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("login form is shown", function () {
    cy.get("#login-form").should("be.visible").contains("log in to application")
  })

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("tester")
      cy.get("#password-input").type("sekret")
      cy.get("#login-button").click()

      cy.intercept("/api/blogs").as("getBlogs")
      cy.contains("Tester One logged in")
      cy.wait("@getBlogs")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("tester")
      cy.get("#password-input").type("wrongpassword")
      cy.get("#login-button").click()

      cy.contains("wrong username or password")
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
      cy.get(".error").should("have.css", "border-style", "solid")
    })

    describe("when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "tester", password: "sekret" })
      })

      it("a blog can be created", function () {
        cy.contains("new blog").click()
        cy.get("#title-input").type("A Test")
        cy.get("#author-input").type("Tester")
        cy.get("#url-input").type("http://test.com")
        cy.get("#create-blog-button").click()

        cy.contains("a new blog A Test by Tester")
        cy.get(".success").should("have.css", "color", "rgb(0, 128, 0)")
        cy.get(".success").should("have.css", "border-style", "solid")
        cy.contains("A Test")
      })
    })
  })
})
