const moongose = require("mongoose")
const supertest = require("supertest")
const app = require("../../app")
const Blog = require("../../models/blog")
const api = supertest(app)
const helper = require("./test_helper")

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
}, 10000)

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

  expect(createdBlog).toEqual({ ...newBlog, likes: 0 })
})

afterAll(async () => {
  await moongose.connection.close()
})
