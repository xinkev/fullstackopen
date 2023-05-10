const bcrypt = require("bcrypt")
const User = require("../../models/user")
const helper = require("./test_helper")
const supertest = require("supertest")
const app = require("../../app")
const api = supertest(app)

describe("when there is initially one user in db", () => {
  const userCreationUrl = "/api/users"
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("pass123", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation successful with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "clearwater",
      name: "Clear Water",
      password: "yaykyi",
    }

    await api
      .post(userCreationUrl)
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength((await usersAtStart).length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username is less than 3 chars", async () => {
    const usersAtStart = helper.usersInDb()

    const newUser = {
      username: "ab",
      name: "Min Is 3chars",
      password: "password",
    }

    const result = await api
      .post(userCreationUrl)
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("User validation failed: username")

    const usersAtEnd = helper.blogsInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("creation fails with proper statuscode and message if password is less than 3 chars", async () => {
    const usersAtStart = helper.usersInDb()

    const newUser = {
      username: "validusername",
      name: "Min Is 3chars",
      password: "ab",
    }

    const result = await api
      .post(userCreationUrl)
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("User validation failed: password")

    const usersAtEnd = helper.blogsInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "alpine",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("expected `username` to be unique")

    const usersAtEnd = helper.blogsInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})
