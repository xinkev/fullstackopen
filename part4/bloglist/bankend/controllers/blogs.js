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
  const body = request.body
  const user = request.user
  const userModel = await User.findById(user.id)
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: userModel._id,
  })

  const createdBlog = await blog.save()
  userModel.blogs = userModel.blogs.concat(createdBlog._id)
  await userModel.save()

  await createdBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(201).send(createdBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  const user = request.user
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (user.id !== blog.user.toString()) {
    return response
      .status(401)
      .json({ error: "you do not have permission to delete this blog" })
  }
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
