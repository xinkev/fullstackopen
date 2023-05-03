const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const blogRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})