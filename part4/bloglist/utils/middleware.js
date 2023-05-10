const { TOKEN_SECRET } = require("./config")
const logger = require("./logger")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method)
  logger.info("Path:  ", request.path)
  logger.info("Body:  ", request.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  const errorName = error.name
  if (errorName === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (errorName === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (errorName === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  const prefix = "Bearer "
  let token = null
  if (authorization && authorization.startsWith(prefix)) {
    token = authorization.replace(prefix, "")
  }

  request.token = token

  next()
}

const userExtractor = (request, response, next) => {
  const user = jwt.verify(request.token, TOKEN_SECRET)
  if (!user.id) {
    return response.status(401).json({ error: "invalid token" })
  }
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
