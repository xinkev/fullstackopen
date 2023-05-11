const app = require("../../app")
const supertest = require("supertest")
const api = supertest(app)
const User = require("../../models/user")
const bcrypt = require("bcrypt")

describe("when initially have users", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash("pass123", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })

  test("can login with valid usernamd and password", async () => {
    const user = { username: "root", password: "pass123" }
    const response = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const body = response.body
    expect(body.token).toBeDefined()
    expect(body.username).toBe(user.username)
  })
})
