const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.send(blogs)
})

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  const createdBlog = await blog.save()
  response.status(201).send(createdBlog)
})

module.exports = blogRouter
