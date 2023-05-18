/// <reference types="Cypress"/>
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
      const blog = {
        title: "A Test",
        author: "Tester",
        url: "http://test.com",
      }
      beforeEach(function () {
        cy.login({ username: "tester", password: "sekret" })
      })

      it("a blog can be created", function () {
        cy.contains("new blog").click()
        cy.get("#title-input").type(blog.title)
        cy.get("#author-input").type(blog.author)
        cy.get("#url-input").type(blog.url)
        cy.get("#create-blog-button").click()

        cy.contains("a new blog A Test by Tester")
        cy.get(".success").should("have.css", "color", "rgb(0, 128, 0)")
        cy.get(".success").should("have.css", "border-style", "solid")
        cy.contains("A Test")
      })

      describe("when there's at least one blog", function () {
        beforeEach(() => {
          cy.createBlog({ blog })
          cy.reload()
          cy.get(":button").contains("view").as("viewButton").click()
          cy.contains(blog.title).parent().as("blog")
        })

        it("can like a blog", function () {
          cy.get("@blog").get(":button").contains("like").click()
          cy.get("@blog").contains("likes 1")
        })

        it("can be delete by the creator", function () {
          cy.contains("remove").click()
          cy.on("window:confirm", function () {
            return true
          })
          cy.should("not.have.text", blog.title)
        })
      })
      describe("when there's multiple blogs", function () {
        beforeEach(() => {
          cy.createBlog({ blog })
          cy.createBlog({
            blog: {
              title: "Test 2",
              author: "Tester One",
              url: "http://test.com",
            },
          })
          cy.createBlog({
            blog: {
              title: "Test 3",
              author: "Tester Two",
              url: "http://test.com",
            },
            withDifferentUser: true,
          })
          cy.reload()
        })

        it("remove button should only be visible to the creator", function () {
          cy.contains(blog.title).parent().as("blog1")
          cy.contains("Test 2").parent().as("blog2")
          cy.contains("Test 3").parent().as("blog3")

          cy.get("@blog1").contains("view").click()
          cy.get("@blog1").contains("remove")

          cy.get("@blog2").contains("view").click()
          cy.get("@blog2").contains("remove")

          cy.get("@blog3").contains("view").click()
          cy.get("@blog3").contains("remove").should("not.exist")
        })
      })
    })
  })
})
