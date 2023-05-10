const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { TOKEN_SECRET } = require("../utils/config")

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
  const decodedToken = jwt.verify(request.token, TOKEN_SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

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
