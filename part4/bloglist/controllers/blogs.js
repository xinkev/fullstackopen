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

blogRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id
  await Blog.findByIdAndRemove(blogId)

  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  })
  response.json(updatedBlog)
})

module.exports = blogRouter
