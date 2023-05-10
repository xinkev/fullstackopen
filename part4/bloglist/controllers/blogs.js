const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.send(blogs)
})

blogRouter.post("/", async (request, response) => {
  const user = await User.findById(request.body.userId)
  const blog = new Blog({ ...request.body, user: user.id })

  const createdBlog = await blog.save()
  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()

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
