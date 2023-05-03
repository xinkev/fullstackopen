require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const Blog = require("./models/blog")

const mongoUri = process.env.MONGODB_URI
mongoose.connect(mongoUri)

app.use(cors())
app.use(express.json())

app.get("/api/blogs", (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})