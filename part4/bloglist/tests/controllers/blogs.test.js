const moongose = require("mongoose")
const supertest = require("supertest").agent
const app = require("../../app")
const Blog = require("../../models/blog")
const api = supertest(app)
const helper = require("./test_helper")
const User = require("../../models/user")

beforeAll(async () => {
  await User.deleteMany({})

  const user = { username: "user", password: "password", name: "Test User" }
  await api.post("/api/users").send(user)

  const result = await api.post("/api/login").send(user)
  api.auth(result.body.token, { type: "bearer" })
})

afterAll(async () => {
  await User.deleteMany({})
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const users = await helper.usersInDb()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: users[0].id })
    await blogObject.save()
  }
})

describe("when already have some blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs")

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain("React patterns")
  })

  test("blog have a property called id", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0].id).toBeDefined()
  })
})

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const latestBlogs = await helper.blogsInDb()
    expect(latestBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const titles = latestBlogs.map((blog) => blog.title)
    expect(titles).toContain(newBlog.title)
  })

  test("when likes is missing, it will be default to zero", async () => {
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const createdBlog = response.body
    delete createdBlog.id
    const users = await helper.usersInDb()
    expect(createdBlog).toEqual({ ...newBlog, likes: 0, user: users[0].id })
  })

  test("fails with 400 if title is missing", async () => {
    const newBlog = {
      author: "John Smith",
      url: "https://example.com",
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
  })

  test("fails with 400 if url is missing", async () => {
    const newBlog = {
      title: "A test",
      author: "John Smith",
    }

    await api.post("/api/blogs").send(newBlog).expect(400)
  })
})

describe("deletion", () => {
  test("succeeds with 200 if the id is valid", async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDeletion = await helper.blogsInDb()
    expect(blogsAfterDeletion).toHaveLength(blogs.length - 1)

    const titles = blogsAfterDeletion.map((b) => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe("updating a blog", () => {
  test("succeeds with 200 provided a valid blog object and a valid id", async () => {
    const blogToUpdate = (await helper.blogsInDb())[0]
    const newBlog = { ...blogToUpdate, title: "New title" }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const updatedBlog = response.body
    expect(updatedBlog.title).toBe(newBlog.title)

    const titles = (await helper.blogsInDb()).map((b) => b.title)
    expect(titles).toContain(newBlog.title)
  })
})

afterAll(async () => {
  await moongose.connection.close()
})
